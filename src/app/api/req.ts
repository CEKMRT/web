// Function to save cached data to localStorage
const saveCachedDataToLocalStorage = (cachedData: Map<string, Schedule[]>) => {
  localStorage.setItem('cachedData', JSON.stringify(Array.from(cachedData.entries())));
};


// // Function to clear cache manually
// const clearCacheManually = () => {
//   localStorage.removeItem('cachedData'); // Remove cached data from localStorage
//   console.log("Cache manually cleared.");
// };

// Function to clear cache if it's 2 AM Jakarta time
const clearCacheAt2AM = (cachedData: Map<string, Schedule[]>) => {
  const currentTime = new Date();
  const currentTimeJakarta = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);

  // Check if it's 2 AM Jakarta time
  if (currentTimeJakarta.getHours() === 2 && currentTimeJakarta.getMinutes() === 0) {
    cachedData.clear(); // Clear the cache
    saveCachedDataToLocalStorage(cachedData); // Save updated cache to localStorage
    console.log("Cache cleared at 2 AM Jakarta time.");
  }
};

// Define fetchScheduleData function
export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  // Load cached data from localStorage on startup
  const cachedDataString = localStorage.getItem('cachedData');
  const cachedData: Map<string, Schedule[]> = new Map(JSON.parse(cachedDataString || '[]'));

  // Check if data is cached
  if (cachedData.has(apiUrl)) {
    return cachedData.get(apiUrl)!; // Use cached data if available
  }

  // If data is not cached, fetch from backend
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
    saveCachedDataToLocalStorage(cachedData); // Save cached data to localStorage
    return result;
    
  } catch (error) {
    // Ensure that error is of type Error
    if (error instanceof Error) {
      throw new Error("Kamu terputus " + error.message);
    } else {
      throw new Error("Error fetching data");
    }
  }
};