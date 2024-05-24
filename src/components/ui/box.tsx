// components/ScheduleComponent.tsx

import { useEffect, useState } from "react";
import { fetchScheduleData, Schedule } from "@/app/api/req"; // Adjust the path according to your directory structure

const ScheduleComponent = ({
  apiUrl,
  title,
  subtitle,
}: {
  apiUrl: string;
  title: string;
  subtitle: string;
}) => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchScheduleData(apiUrl);
        console.log("Fetched data:", result); // Debug log
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const getUserTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return { hours, minutes };
  };

  const formatTime = (jadwal: string): string => {
    const date = new Date(jadwal);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getMinutesSinceMidnight = (hours: number, minutes: number) => {
    return hours * 60 + minutes;
  };

  const getNearestSchedule = (schedules: Schedule[]) => {
    const now = getUserTime();
    const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);

    const futureSchedules = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.jadwal);
      const scheduleMinutes = getMinutesSinceMidnight(
        scheduleDate.getUTCHours(),
        scheduleDate.getUTCMinutes()
      );
      return scheduleMinutes > nowMinutes;
    });

    console.log("nowMinute:", nowMinutes);

    console.log("Future schedules:", futureSchedules); // Debug log

    if (futureSchedules.length === 0) return null;

    futureSchedules.sort((a, b) => {
      const timeA = new Date(a.jadwal);
      const timeB = new Date(b.jadwal);
      const minutesA = getMinutesSinceMidnight(
        timeA.getHours(),
        timeA.getMinutes()
      );
      const minutesB = getMinutesSinceMidnight(
        timeB.getHours(),
        timeB.getMinutes()
      );
      return minutesA - minutesB;
    });

    return futureSchedules[0];
  };

  if (loading)
    return (
      <div className="flex items-center space-x-4">
        {/* <SkeletonCard /> */}
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const now = getUserTime();
  console.log("Current time:", now); // Debug log

  const futureSchedules = data
    ? data
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.jadwal);
          const scheduleMinutes = getMinutesSinceMidnight(
            scheduleDate.getUTCHours(),
            scheduleDate.getUTCMinutes()
          );
          const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);
          return scheduleMinutes > nowMinutes;
        })
        .slice(0, 9) // Limit to 9 items
    : [];

  console.log("Jadwal:", futureSchedules); // Debug log

  const nearestSchedule = getNearestSchedule(futureSchedules);
  const nearestTime = nearestSchedule
    ? formatTime(nearestSchedule.jadwal)
    : "N/A";

  const remainingMinutes = nearestSchedule
    ? Math.floor(
        new Date(nearestSchedule.jadwal).getUTCMinutes() -
          new Date().getUTCMinutes()
      )
    : "N/A";

  console.log("Nearest schedule:", nearestSchedule); // Debug log
  console.log("Nearest time:", nearestTime); // Debug log
  console.log("Remaining minutes:", remainingMinutes); // Debug log

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 dark:border-neutral-800 dark:border-2 z-10">
      <div className="p-4 relative">
        <h2 className="text-lg font-semibold text-center text-black dark:text-white">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-4">{subtitle}</p>
        <div className="grid grid-cols-3 gap-2 text-center mb-4 pb-20">
          {futureSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="py-2 rounded bg-green-200 text-green-800 font-bold"
            >
              {formatTime(schedule.jadwal)}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center bg-green-500 text-white p-2 rounded-b absolute inset-x-0 bottom-0 index-10">
          <div className="text-sm dark:font-medium">Jadwal Terdekat</div>
          <div className="text-lg font-bold">{nearestTime}</div>
          <div className="text-sm dark:font-medium">
            {typeof remainingMinutes === "number"
              ? `${remainingMinutes} menit`
              : remainingMinutes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
