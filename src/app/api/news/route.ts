import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import redis from "@/lib/utils/redis";
import { RateLimiter } from "limiter";
import scrapingConfigs from "@/lib/definition/scrappingConfig";
import { handleScrapingError, logger } from "@/lib/definition/scrappingHandler";
import { NewsItem, ScrapingConfig } from "@/lib/definition/scrapdata";

const CACHE_KEY = "NewsData";
const CACHE_TTL = 6 * 60 * 60; // 6 hours
const STALE_TTL = 60 * 60; // 1 hour

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Rate limiter: 5 requests per minute
const limiter = new RateLimiter({ tokensPerInterval: 5, interval: "minute" });

async function scrapeNews(
  config: ScrapingConfig,
  source: string,
  limit: number
): Promise<NewsItem[]> {
  try {
    await limiter.removeTokens(1);
    const { data } = await axios.get(config.url, {
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
    $(config.articleSelector).each((index, element) => {
      if (index >= limit) return false;

      const $el = $(element);

      const title = config.transformers?.title 
        ? config.transformers.title($el.find(config.titleSelector))
        : $el.find(config.titleSelector).first().text().trim();

      const date = config.transformers?.date
        ? config.transformers.date($el.find(config.dateSelector))
        : $el.find(config.dateSelector).first().text().trim();

      let link = config.transformers?.link
        ? config.transformers.link($el.find(config.linkSelector), config.baseUrl || '')
        : $el.find(config.linkSelector).attr("href") || "";

      let image = config.transformers?.image
        ? config.transformers.image($el.find(config.imageSelector), config.baseUrl || '')
        : $el.find(config.imageSelector).attr("src") || $el.find(config.imageSelector).attr("data-src") || "";

      if (config.baseUrl) {
        if (!link.startsWith("http")) {
          link = `${config.baseUrl}${link}`;
        }
        if (!image.startsWith("http")) {
          image = `${config.baseUrl}${image}`;
        }
      }

      newsItems.push({ title, date, link, image, source });
    });

    return newsItems;
  } catch (error) {
    handleScrapingError(error, source);
    return [];
  }
}

async function fetchNewsForSource(source: string, limit: number): Promise<NewsItem[]> {
  const config = scrapingConfigs[source];
  if (!config) {
    logger.error(`No scraping configuration found for source: ${source}`);
    return [];
  }
  return scrapeNews(config, source, limit);
}

async function fetchFreshData(): Promise<NewsItem[]> {
  const sources = Object.keys(scrapingConfigs);
  const results = await Promise.allSettled(
    sources.map(source => {
      const limit = source === 'BeritaUtama' || source === 'BeritaTambahan' ? 3 : 6;
      return fetchNewsForSource(source, limit);
    })
  );

  const newsItems = results.flatMap((result, index) => 
    result.status === 'fulfilled' ? result.value : []
  );

  try {
    await redis.set(CACHE_KEY, JSON.stringify({
      data: newsItems,
      timestamp: Date.now()
    }), {
      ex: CACHE_TTL,
    });
  } catch (error) {
    logger.error("Error caching data:", error);
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
    logger.error("Error revalidating data:", error);
  }
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
    logger.error("Error fetching combined news:", error);
    return NextResponse.json(
      { error: "Error fetching combined news" },
      { status: 500 }
    );
  }
}