import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// utils.ts
export const getUserTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return { hours, minutes };
};

export const formatTime = (jadwal: string): string => {
  const date = new Date(jadwal);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getMinutesSinceMidnight = (hours: number, minutes: number) => {
  return hours * 60 + minutes;
};

export const calculateRemainingMinutes = (scheduleTime: string): number => {
  const currentTime = new Date();
  const scheduleDate = new Date(scheduleTime);
  if (process.env.NODE_ENV === "development") {
    console.log("Current Time:", currentTime);
    console.log("Schedule Date:", scheduleDate);
  }

  const currentMinutesSinceMidnight = getMinutesSinceMidnight(
    currentTime.getHours(),
    currentTime.getMinutes()
  );
  if (process.env.NODE_ENV === "development") {
    console.log("Current Minutes Since Midnight:", currentMinutesSinceMidnight);
  }

  const scheduleMinutesSinceMidnight = getMinutesSinceMidnight(
    scheduleDate.getHours(),
    scheduleDate.getMinutes()
  );
  if (process.env.NODE_ENV === "development") {
    console.log(
      "Schedule Minutes Since Midnight:",
      scheduleMinutesSinceMidnight
    );
  }

  let remainingMinutes =
    scheduleMinutesSinceMidnight - currentMinutesSinceMidnight;
  if (process.env.NODE_ENV === "development") {
    console.log("Initial Remaining Minutes:", remainingMinutes);
  }

  if (remainingMinutes < 0) {
    remainingMinutes += 24 * 60; // Adjust for next day schedules
    if (process.env.NODE_ENV === "development") {
      console.log("Adjusted Remaining Minutes for Next Day:", remainingMinutes);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Final Remaining Minutes:", remainingMinutes);
  }
  return remainingMinutes;
};
