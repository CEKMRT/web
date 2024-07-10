import redis from "@/lib/utils/redis";

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Jakarta MRT News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{item.date}</p>
              <a
                href={item.link}
                className="inline-block bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baca Lebih
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
