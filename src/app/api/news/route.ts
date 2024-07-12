import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import redis from "@/lib/utils/redis";

const CACHE_KEY = "WebData";
const CACHE_TTL = 24 * 60 * 60; // 24 hours
const SWR_TTL = 60 * 60; // 1 hour

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface NewsItem {
  title: string;
  date: string;
  link: string;
  image: string;
}
async function scrapeOtherWebsite(): Promise<NewsItem[]> {
  const { data } = await axios.get("https://jakartamrt.co.id/id", {
    headers: {
      "User-Agent": "News Feed (cekmrt.xyz)",
    },
  });
  const $ = cheerio.load(data);

  const newsItems: NewsItem[] = [];
  $(".thumb-item").each((index, element) => {
    const title = $(element).find("h3").text().trim();
    const date = $(element).find("span").text().trim();
    const link = $(element).attr("href") || "";
    const image = $(element).find("img").attr("src") || "";

    newsItems.push({ title, date, link, image });
  });

  return newsItems;
}
async function scrapeMRTWebsite(): Promise<NewsItem[]> {
  const { data } = await axios.get("https://jakartamrt.co.id/id/siaran-pers", {
    headers: {
      "User-Agent": "News Feed (cekmrt.xyz)",
    },
  });
  const $ = cheerio.load(data);

  const newsItems: NewsItem[] = [];
  $(".thumb-item").each((index, element) => {
    const title = $(element).find("h3").text().trim();
    const date = $(element).find("span").text().trim();
    const link = $(element).attr("href") || "";
    const image = $(element).find("img").attr("src") || "";

    newsItems.push({ title, date, link, image });
  });

  return newsItems;
}
export async function GET() {
  try {
    let cachedData = await redis.get(CACHE_KEY);
    let newsItems: NewsItem[] | null = null;

    if (cachedData && typeof cachedData === "string") {
      newsItems = JSON.parse(cachedData);
      // Check if the cache is stale
      const cacheAge = await redis.ttl(CACHE_KEY);
      if (cacheAge <= SWR_TTL) {
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
  const [HeadNews, mrtNews] = await Promise.all([
    scrapeOtherWebsite(),
    scrapeMRTWebsite(),
  ]);
  const newsItems = [...HeadNews, ...mrtNews];

  try {
    await redis.set(CACHE_KEY, JSON.stringify(newsItems), {
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
    await redis.set(CACHE_KEY, JSON.stringify(freshData), {
      ex: CACHE_TTL,
    });
  } catch (error) {
    console.error("Error revalidating data:", error);
  }
}