// Define cachedData outside of fetchScheduleData function
const cachedData: Map<string, Schedule[]> = new Map<string, Schedule[]>();

// Function to save cached data to localStorage
const saveCachedDataToLocalStorage = (cachedData: Map<string, Schedule[]>) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    localStorage.setItem(
      "cachedData",
      JSON.stringify(Array.from(cachedData.entries()))
    );
  }
};

// Function to clear cache
const clearCache = () => {
  cachedData.clear();
  saveCachedDataToLocalStorage(cachedData);
  localStorage.setItem("lastCacheClearDate", new Date().toISOString());
  if (process.env.NODE_ENV === "development") {
    console.log("Cache cleared");
  }
};

// Function to check and clear stale cache on initialization
const checkAndClearStaleCache = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const lastCacheClearDate = localStorage.getItem("lastCacheClearDate");
    console.log("Last cache clear date from localStorage:", lastCacheClearDate);
    if (lastCacheClearDate) {
      const lastClearDate = new Date(lastCacheClearDate);
      const currentTime = new Date();
      const currentTimeJakarta = new Date(
        currentTime.getTime() + 7 * 60 * 60 * 1000
      );

      // Calculate the difference in days between the last clear date and current date in Jakarta time
      const timeDifference =
        currentTimeJakarta.getTime() - lastClearDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference >= 1) {
        clearCache();
      }
    } else {
      // No record of cache clear date, clear cache
      clearCache();
    }
  }
};

// Function to initialize cache on the client side
const initializeCache = () => {
  checkAndClearStaleCache();

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const cachedDataString = localStorage.getItem("cachedData");
    if (cachedDataString) {
      try {
        const parsedCachedData: [string, Schedule[]][] =
          JSON.parse(cachedDataString);
        parsedCachedData.forEach(([key, value]) => {
          cachedData.set(key, value);
        });
        console.log("Cached data loaded from localStorage:", cachedData);
      } catch (error) {
        console.error("Error parsing cached data from localStorage:", error);
      }
    }
  }
};

initializeCache();

// Function to clear cache if it's 2 AM Jakarta time
const clearCacheAt2AM = (() => {
  let clearedToday = false;
  return (cachedData: Map<string, Schedule[]>) => {
    const currentTime = new Date();
    const currentTimeJakarta = new Date(
      currentTime.getTime() + 7 * 60 * 60 * 1000
    );

    if (currentTimeJakarta.getHours() === 2 && !clearedToday) {
      clearCache();
      clearedToday = true;
    }

    if (currentTimeJakarta.getHours() !== 2) {
      clearedToday = false;
    }
  };
})();

// Periodically check and clear cache at 2 AM Jakarta time
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  setInterval(() => clearCacheAt2AM(cachedData), 3600000); // Check every hour
}

// Define fetchScheduleData function
export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    // Check if data is cached
    if (cachedData.has(apiUrl)) {
      console.log(`Showing data from cached data`);
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
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      saveCachedDataToLocalStorage(cachedData); // Save cached data to localStorage
      console.log(`Data fetched and cached in LocalStorage`);
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
