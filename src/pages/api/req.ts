
export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

export const fetchScheduleData = async (apiUrl: string): Promise<Schedule[]> => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('404-Terputus Melalui Server');
  }

  const result: Schedule[] = await response.json();
  return result;
};
