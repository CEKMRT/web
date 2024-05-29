export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

const clearCachedData = () => {
  const now = new Date();
  if (
    now.getHours() === 1 &&
    now.getMinutes() === 0 &&
    now.getSeconds() === 0
  ) {
    localStorage.removeItem("DataLocal");
  }
};

export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  clearCachedData(); // Check and clear cached data when fetching data

  const cachedData = localStorage.getItem("DataLocal");
  if (cachedData) {
    return JSON.parse(cachedData);
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

    // Store the fetched data in localStorage
    localStorage.setItem("scheduleData", JSON.stringify(result));

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
