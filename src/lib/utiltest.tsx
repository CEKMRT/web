// utils.ts

const isDev = process.env.NODE_ENV !== 'production';

export const log = (...args: any[]) => {
  if (isDev) {
    console.log(...args);
  }
};

export const getUserTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (process.env.NODE_ENV === "development") {
    console.log("getUserTime:", { hours, minutes });
  }
  return { hours, minutes };
};

export const formatTime = (jadwal: string): string => {
  const date = new Date(jadwal);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getMinutesSinceMidnight = (hours: number, minutes: number) => {
  const totalMinutes = hours * 60 + minutes;
  log("getMinutesSinceMidnight:", { hours, minutes, totalMinutes });
  return totalMinutes;
};

export const calculateRemainingMinutes = (scheduleTime: Date, now: Date): number => {
  const scheduleMinutes = getMinutesSinceMidnight(
    scheduleTime.getUTCHours(),
    scheduleTime.getUTCMinutes()
  );
  const nowMinutes = getMinutesSinceMidnight(now.getUTCHours(), now.getUTCMinutes());
  let remainingMinutes = scheduleMinutes - nowMinutes;
  
  if (process.env.NODE_ENV === "development") {
    console.log("scheduleMinutes, nowMinutes ==>", scheduleMinutes, nowMinutes);
  }
  if (remainingMinutes < 0) {
    remainingMinutes += 1440; // Adjust for next day (1440 minutes = 24 * 60)
  }
  log("calculateRemainingMinutes:", { scheduleMinutes, nowMinutes, remainingMinutes });
  return remainingMinutes;
};

export const getNearestSchedule = (schedules: { jadwal: string }[]) => {
  const now = getUserTime();
  const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);

  const futureSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(`2024-05-26T${schedule.jadwal}:00Z`); // Assuming `schedule.jadwal` is in "HH:MM" format
    const scheduleMinutes = getMinutesSinceMidnight(
      scheduleDate.getUTCHours(),
      scheduleDate.getUTCMinutes()
    );
    return scheduleMinutes > nowMinutes;
  });

  if (futureSchedules.length === 0) return null;

  futureSchedules.sort((a, b) => {
    const timeA = new Date(`2024-05-26T${a.jadwal}:00Z`);
    const timeB = new Date(`2024-05-26T${b.jadwal}:00Z`);
    const minutesA = getMinutesSinceMidnight(
      timeA.getUTCHours(),
      timeA.getUTCMinutes()
    );
    const minutesB = getMinutesSinceMidnight(
      timeB.getUTCHours(),
      timeB.getUTCMinutes()
    );
    return minutesA - minutesB;
  });

  log("getNearestSchedule:", { nowMinutes, futureSchedules, nearestSchedule: futureSchedules[0] });

  return futureSchedules[0];
};

if (process.env.NODE_ENV === "development") {
  console.log("=========================== UTILS ================================");
}
