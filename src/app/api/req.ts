// utils/api.ts

export interface Schedule {
    id: number;
    station_id: number;
    stasiun_name: string;
    arah: string;
    jadwal: string;
  }
  
  export const fetchScheduleData = async (apiUrl: string): Promise<Schedule[]> => {
    const response = await fetch(apiUrl, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const result: Schedule[] = await response.json();
    return result;
  };
  