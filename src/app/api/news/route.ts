import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import redis from "@/lib/utils/redis";
import { RateLimiter } from "limiter";

const CACHE_KEY = "NewsData";
const CACHE_TTL = 24 * 60 * 60; // 24 hours
const STALE_TTL = 60 * 60; // 1 hour

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface NewsItem {
  title: string;
  date: string;
  link: string;
  image: string;
  source: string;
}

// Rate limiter: 5 requests per minute
const limiter = new RateLimiter({ tokensPerInterval: 5, interval: "minute" });

async function scrapeNews(
  url: string,
  selector: string,
  source: string,
  limit: number = 10
): Promise<NewsItem[]> {
  try {
    await limiter.removeTokens(1);
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      timeout: 10000, // 10 seconds timeout
    });
    const $ = cheerio.load(data);

    const newsItems: NewsItem[] = [];
    $(selector).each((index, element) => {
      if (index >= limit) return false;

      const title = $(element).find("h3, h2").first().text().trim();
      const date = $(element).find("span, .date").first().text().trim();
      const link = $(element).find("a").attr("href") || "https://jakartamrt.co.id";
      const image =
        $(element).find("img").attr("src") ||
        $(element).find("img").attr("data-src") ||
        "";

      newsItems.push({ title, date, link, image, source });
    });

    return newsItems;
  } catch (error) {
    console.error(`Error scraping ${source}:`, error);
    return [];
  }
}

async function BeritaUtama(): Promise<NewsItem[]> {
  return scrapeNews(
    "https://jakartamrt.co.id/id",
    ".thumb-item",
    "Berita Utama"
  );
}

async function BeritaTambahan(): Promise<NewsItem[]> {
  return scrapeNews(
    "https://jakartamrt.co.id/id/siaran-pers",
    ".thumb-item",
    "Berita Tambahan"
  );
}

async function BeritaDetik(): Promise<NewsItem[]> {
  return scrapeNews(
    "https://www.detik.com/tag/mrt",
    ".list.media_rows.list-berita article",
    "Berita Detik",
    3
  );
}

async function BeritaTempo(): Promise<NewsItem[]> {
  return scrapeNews(
    "https://www.tempo.co/tag/mrt-jakarta",
    ".card-box.ft240",
    "Berita Tempo",
    3
  );
}
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';
    
    let cachedData = await redis.get(CACHE_KEY);
    let newsItems: NewsItem[] | null = null;

    if (cachedData && typeof cachedData === "string" && !forceRefresh) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isStale = Date.now() - timestamp > STALE_TTL * 1000;
      
      if (!isStale) {
        return NextResponse.json(data);
      } else {
        newsItems = data;
        // Trigger background revalidation
        revalidateData();
      }
    }

    if (!newsItems) {
      newsItems = await fetchFreshData();
    }

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error("Error fetching combined news:", error);
    return NextResponse.json(
      { error: "Error fetching combined news" },
      { status: 500 }
    );
  }
}

async function fetchFreshData(): Promise<NewsItem[]> {
  const [detik, tempo, utama, tambahan] = await Promise.allSettled([
    BeritaDetik(),
    BeritaTempo(),
    BeritaUtama(),
    BeritaTambahan(),
  ]);

  const newsItems = [
    ...(detik.status === 'fulfilled' ? detik.value : []),
    ...(tempo.status === 'fulfilled' ? tempo.value : []),
    ...(utama.status === 'fulfilled' ? utama.value : []),
    ...(tambahan.status === 'fulfilled' ? tambahan.value : []),
  ];

  try {
    await redis.set(CACHE_KEY, JSON.stringify({
      data: newsItems,
      timestamp: Date.now()
    }), {
      ex: CACHE_TTL,
    });
  } catch (error) {
    console.error("Error caching data:", error);
  }

  return newsItems;
}

async function revalidateData() {
  try {
    const freshData = await fetchFreshData();
    await redis.set(CACHE_KEY, JSON.stringify({
      data: freshData,
      timestamp: Date.now()
    }), {
      ex: CACHE_TTL,
    });
  } catch (error) {
    console.error("Error revalidating data:", error);
  }
}