export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

const cachedData: Map<string, Schedule[]> = new Map(); // Define a cache Map

export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {

  if (cachedData.has(apiUrl)) {
    return cachedData.get(apiUrl)!; // Use cached data if available
  }

  if (!navigator.onLine) {
    throw new Error(
      "Jaringan Internet Anda Terputus. Pastikan Jaringan Anda Aktif."
    );
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
