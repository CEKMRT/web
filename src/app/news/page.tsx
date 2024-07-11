import redis from "@/lib/utils/redis";
import NewsItem from "@/components/ui/news";

async function getMRTNews(): Promise<MRTNewsItem[]> {
  const CACHE_KEY = "mrt_news_latest";
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
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const newsItems: MRTNewsItem[] = await res.json();
  await redis.set(CACHE_KEY, JSON.stringify(newsItems));

  return newsItems;
}

export default async function MRTNews() {
  const newsItems = await getMRTNews();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">Berita Terbaru</h1>
      <h2 className="text-md font-light mb-6 text-gray-600">
        Informasi terbaru yang diambil melalui website resmi{" "}
        <span className="text-green-600 font-medium"> MRT Jakarta.</span> <br />
        <span className="text-xs text-gray-400 mb-0">
          *Informasi diupdate secara rutin dan berkala.
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <NewsItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
