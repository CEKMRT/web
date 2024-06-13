import { JamKeMenit } from './timeUtils';

export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string; // (HH:MM)
}

export const FilterData = (schedules: Schedule[], userTime: string | number): Schedule[] => {
  const userTimeInMinutes = typeof userTime === "string" ? JamKeMenit(userTime) : userTime;

  if (!schedules || schedules.length === 0) {
    console.log("Error: schedules is null, undefined, or empty.");
    return [];
  }

  const filteredSchedules = schedules
    .map((schedule) => ({
      ...schedule,
      jadwalInMinutes: JamKeMenit(schedule.jadwal),
    }))
    .filter((schedule) => schedule.jadwalInMinutes >= userTimeInMinutes)
    .sort((a, b) => a.jadwalInMinutes - b.jadwalInMinutes)
    // .slice(0, 6);

  if (process.env.NODE_ENV === "development") {
    console.log("Filtered Schedules:");
    if (filteredSchedules.length === 0) {
      console.log("Tidak ada Jadwal Kereta.");
    } else {
      filteredSchedules.forEach((schedule, index) => {
        console.log(
          `${index + 1}. Schedule ID: ${schedule.id}, Jadwal: ${
            schedule.jadwal
          }, Jadwal in Minutes: ${schedule.jadwalInMinutes}`
        );
      });
    }
  }
  return filteredSchedules;
};
export const findLatestJadwal = (schedules: Schedule[]): string | null => {
    if (!schedules || schedules.length === 0) {
      return null;
    }
    const latestSchedule = schedules.reduce((latest, current) => {
      return JamKeMenit(current.jadwal) > JamKeMenit(latest.jadwal) ? current : latest;
    });
    return latestSchedule.jadwal;
  };