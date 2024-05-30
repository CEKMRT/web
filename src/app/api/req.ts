// Define cachedData outside of fetchScheduleData function
const cachedData: Map<string, Schedule[]> = new Map();

// Function to initialize cache on the client side
const initializeCache = () => {
  if (typeof window !== "undefined") {
    const cachedDataString = localStorage.getItem("cachedData");
    if (cachedDataString) {
      try {
        const parsedCachedData: [string, Schedule[]][] =
          JSON.parse(cachedDataString);
        parsedCachedData.forEach(([key, value]) => {
          cachedData.set(key, value);
        });
      } catch (error) {
        console.error("Error parsing cached data from localStorage:", error);
      }
    }
  }
};

initializeCache();

// Function to save cached data to localStorage
const saveCachedDataToLocalStorage = (cachedData: Map<string, Schedule[]>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "cachedData",
      JSON.stringify(Array.from(cachedData.entries()))
    );
  }
};

// Function to clear cache if it's 2 AM Jakarta time
const clearCacheAt2AM = (() => {
  let clearedToday = false;
  return (cachedData: Map<string, Schedule[]>) => {
    const currentTime = new Date();
    const currentTimeJakarta = new Date(
      currentTime.getTime() + 7 * 60 * 60 * 1000
    );

    if (currentTimeJakarta.getHours() === 2 && !clearedToday) {
      cachedData.clear();
      saveCachedDataToLocalStorage(cachedData);
      console.log("Cache cleared at 2 AM Jakarta time.");
      clearedToday = true;
    }

    if (currentTimeJakarta.getHours() !== 2) {
      clearedToday = false;
    }
  };
})();

// Periodically check and clear cache at 2 AM Jakarta time
if (typeof window !== "undefined") {
  setInterval(() => clearCacheAt2AM(cachedData), 3600000); // Check every hour
}

// Define fetchScheduleData function
export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  if (typeof window !== "undefined") {
    // Check if data is cached
    if (cachedData.has(apiUrl)) {
      return cachedData.get(apiUrl)!;
    }
  }

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
    cachedData.set(apiUrl, result); // Cache the fetched data
    if (typeof window !== "undefined") {
      saveCachedDataToLocalStorage(cachedData); // Save cached data to localStorage
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Kamu terputus " + error.message);
    } else {
      throw new Error("Error fetching data");
    }
  }
};
