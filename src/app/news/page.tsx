import { Suspense } from "react";
import NewsItem from "@/components/ui/news";
import NewsItemSkeleton from "@/components/ui/news-skeleton";
import redis from "@/lib/utils/redis";

const CACHE_KEY = "NewsData";
async function getCombinedNews(): Promise<MRTNewsItem[]> {
  const cachedData = await redis.get(CACHE_KEY);

  if (cachedData && typeof cachedData === "string") {
    try {
      const { data, timestamp } = JSON.parse(cachedData);
      const isStale = Date.now() - timestamp > 60 * 60 * 1000; // 1 hour

      if (!isStale) {
        return data;
      }
    } catch (error) {
      console.error("Error parsing cached data:", error);
    }
  }

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.cekmrt.xyz"
    }/api/news?refresh=true`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const newsItems: MRTNewsItem[] = await res.json();
  return newsItems;
}
async function NewsGrid() {
  const newsItems = await getCombinedNews();

  const groupedNews = newsItems.reduce((acc, item) => {
    if (!acc[item.source]) {
      acc[item.source] = [];
    }
    acc[item.source].push(item);
    return acc;
  }, {} as Record<string, MRTNewsItem[]>);

  return (
    <>
      {Object.entries(groupedNews).map(([source, items]) => (
        <div key={source} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {source}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <NewsItem key={index} item={item} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function CombinedNews() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Berita Terbaru
      </h1>
      <h2 className="text-md font-light mb-6 text-gray-600 dark:text-gray-400">
        Informasi terbaru yang diambil melalui website resmi MRT Jakarta. serta
        portal berita Detik dan Tempo
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
