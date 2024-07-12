import { Suspense } from 'react';
import NewsItem from "@/components/ui/news";
import NewsItemSkeleton from "@/components/ui/news-skeleton";
import redis from "@/lib/utils/redis";

async function getCombinedNews(): Promise<MRTNewsItem[]> {
  const CACHE_KEY = "combined_news_latest";
  const cachedData = await redis.get(CACHE_KEY);

  if (cachedData && typeof cachedData === "string") {
    try {
      return JSON.parse(cachedData);
    } catch (error) {
      console.error("Error parsing cached data:", error);
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.cekmrt.xyz"}/api/news`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const newsItems: MRTNewsItem[] = await res.json();
  await redis.set(CACHE_KEY, JSON.stringify(newsItems));

  return newsItems;
}

async function NewsGrid() {
  const newsItems = await getCombinedNews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((item, index) => (
        <NewsItem key={index} item={item} />
      ))}
    </div>
  );
}

export default function CombinedNews() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Berita Terbaru
      </h1>
      <h2 className="text-md font-light mb-6 text-gray-600 dark:text-gray-400">
        Informasi terbaru yang diambil melalui website resmi{" "}
        <span className="text-green-600 font-medium dark:text-green-400">
          {" "}
          MRT Jakarta.
        </span>{" "}
        <br />
        <span className="text-xs text-gray-400 mb-0 dark:text-gray-500">
          *Informasi diupdate secara rutin dan berkala.
        </span>
      </h2>
      <Suspense fallback={<NewsGridSkeleton />}>
        <NewsGrid />
      </Suspense>
    </div>
  );
}

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <NewsItemSkeleton key={index} />
      ))}
    </div>
  );
}