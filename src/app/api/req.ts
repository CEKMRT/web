// import { fetchScheduleData } from "@/pages/api/req";

// Define a Map for caching
const cachedData: Map<string, Schedule[]> = new Map();

// Function to clear cache if it's 2 AM Jakarta time
const clearCacheAt2AM = () => {
  const currentTime = new Date();
  const currentTimeJakarta = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);

  // Check if it's 2 AM Jakarta time
  if (currentTimeJakarta.getHours() === 2 && currentTimeJakarta.getMinutes() === 0) {
    cachedData.clear(); // Clear the cache
    console.log("Cache cleared at 2 AM Jakarta time.");
  }
};

// Periodically check and clear cache at 2 AM Jakarta time
setInterval(clearCacheAt2AM, 60000); // Check every minute

// Modify fetchScheduleData function to utilize the cache
export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  // Check if data is cached
  if (cachedData.has(apiUrl)) {
    return cachedData.get(apiUrl)!; // Use cached data if available
  }

  // if (!navigator.onLine) {
  //   throw new Error(
  //     "Jaringan Internet Anda Terputus. Pastikan Jaringan Anda Aktif."
  //   );
  // }
  const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!authToken) {
    throw new Error(
      "Authorization token is not defined. Hubungi Admin support@cekmrt.com."
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result: Schedule[] = await response.json();
    cachedData.set(apiUrl, result);

    return result;
    
  } catch (error) {
    // Ensure that error is of type Error
    if (error instanceof Error) {
      throw new Error("Error fetching data: " + error.message);
    } else {
      throw new Error("Error fetching data");
    }
  }
};
