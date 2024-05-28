
export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}
const authToken = process.env.NEXT_PUBLIC_API_URL;

export const fetchScheduleData = async (apiUrl: string): Promise<Schedule[]> => {
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      // other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error('#404 Server Terputus');
  }
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const result: Schedule[] = await response.json();
  return result;
}