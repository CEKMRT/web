import { useEffect, useState } from "react";
import { fetchScheduleData, Schedule } from "@/app/api/req"; // Adjust the path according to your directory structure

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
  console.log("Future schedules:", futureSchedules);

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

const ScheduleComponent = ({
  apiUrl,
  startStation,
  endStation,
}: {
  apiUrl: string;
  startStation: string;
  endStation: string;
}) => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [now, setNow] = useState(getUserTime());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchScheduleData(apiUrl);
        console.log("Fetched data:", result);
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set interval to update the current time every 60 seconds
    const interval = setInterval(() => {
      setNow(getUserTime());
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading)
    return <div className="flex items-center space-x-4">Mohon Tunggu</div>;

  if (error)
    return (
      <div className="flex items-center space-x-4">Error: {error.message}</div>
    );

  console.log("Current time:", now);

  const futureSchedules = data
    ? data
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.jadwal);
          const scheduleMinutes = getMinutesSinceMidnight(
            scheduleDate.getUTCHours(),
            scheduleDate.getUTCMinutes()
          );
          const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);
          // console.log(`Nilai ======= scheduleMinutes: ${scheduleMinutes} & nowMinutes: ${nowMinutes}`)
          return scheduleMinutes > nowMinutes;
        })
        .slice(0, 6)
    : [];

  console.log("Jadwal:", futureSchedules);

  const nearestSchedule = getNearestSchedule(futureSchedules);
  const nearestTime = nearestSchedule
    ? formatTime(nearestSchedule.jadwal)
    : "N/A";

  const remainingMinutes = nearestSchedule
    ? Math.floor(
        (new Date(nearestSchedule.jadwal).getUTCMinutes() - 
        new Date().getUTCMinutes()) *
          1
      )
    : "N/A";

    

  console.log("Nearest schedule:", nearestSchedule);
  console.log("Nearest time:", nearestTime);
  console.log("Remaining minutes:", remainingMinutes);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10">
      <div className="p-6 relative">
        <h2 className="text-lg font-semibold text-center text-black dark:text-white">
          {startStation} &rarr; {endStation}
        </h2>
        <p className="text-center text-gray-500 mb-4"></p>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pb-10">
          {futureSchedules.map((schedule, index) => (
            <div
            key={schedule.id}
            className={`py-2 rounded font-bold ${
              index === 0 && (remainingMinutes === "N/A" || parseInt(remainingMinutes.toString()) < 5)
                ? "bg-red-500 text-white"
                : index === 0
                ? "bg-green-400 text-green-000"
                : index === 1
                ? "bg-green-300 text-green-600"
                : index === 2
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
              {formatTime(schedule.jadwal)}
            </div>
          ))}
        </div>
        <div
          className={`flex justify-around items-center p-1.5 rounded-b absolute inset-x-0 bottom-0 index-10 ${
            remainingMinutes === "N/A" ||
            parseInt(remainingMinutes.toString()) < 5
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div className="text-sm md:text-sm dark:font-medium">
            Jadwal Terdekat
          </div>
          <div className="text-lg font-bold">{nearestTime}</div>
          <div className="text-sm dark:font-medium">
            {typeof remainingMinutes === "number"
              ? `Dalam ${remainingMinutes} menit`
              : remainingMinutes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
