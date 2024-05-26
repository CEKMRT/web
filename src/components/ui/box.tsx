import React, { useState, useEffect } from "react";
import { fetchScheduleData } from "@/app/api/req";
import { Skeleton } from "./skeleton";
import OnlineIndicator from "./indicator";
interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string; // (HH:MM)
}

function JamKeMenit(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function FilterData(
  schedules: Schedule[],
  userTime: string | number
): Schedule[] {
  // Helper function to convert time from "HH:MM" format to minutes
  const JamKeMenit = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  // Convert userTime to minutes
  const userTimeInMinutes =
    typeof userTime === "string" ? JamKeMenit(userTime) : userTime;

  // Convert jadwal to minutes, filter schedules, and sort them
  const filteredSchedules = schedules
    .map((schedule) => ({
      ...schedule,
      jadwalInMinutes: JamKeMenit(schedule.jadwal),
    }))
    .filter((schedule) => schedule.jadwalInMinutes >= userTimeInMinutes)
    .sort((a, b) => a.jadwalInMinutes - b.jadwalInMinutes);

  // Log filtered schedules for debugging
  console.log("Filtered Schedules:");
  filteredSchedules.forEach((schedule, index) => {
    console.log(
      `${index + 1}. Schedule ID: ${schedule.id}, Jadwal: ${
        schedule.jadwal
      }, Jadwal in Minutes: ${schedule.jadwalInMinutes}`
    );
  });

  // Return only the first 6 filtered schedules
  return filteredSchedules.slice(0, 6);
}

function Jakarta(): string {
  const currentTime = new Date();
  const waktuJakarta = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);
  return waktuJakarta.toISOString().slice(11, 16);
}

function SelisihWaktu(scheduleTime: string): number | string {
  const currentTime = Jakarta();
  const currentTimeHours = parseInt(currentTime.slice(0, 2));
  const currentTimeMinutes = parseInt(currentTime.slice(3, 5));

  const scheduleTimeHours = parseInt(scheduleTime.slice(0, 2));
  const scheduleTimeMinutes = parseInt(scheduleTime.slice(3, 5));

  const diffMinutes =
    (scheduleTimeHours - currentTimeHours) * 60 +
    (scheduleTimeMinutes - currentTimeMinutes);

  // Convert to seconds for more accuracy
  const diffSeconds = diffMinutes * 1;

  return diffSeconds >= 0 ? diffSeconds : "N/A";
}

function formatTime(time: string): string {
  return time;
}

const ScheduleComponent: React.FC<{
  apiUrl: string;
  startStation: string;
  endStation: string;
}> = ({ apiUrl, startStation, endStation }) => {
  const [data, setData] = useState<Schedule[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [now, setNow] = useState<string>(Jakarta());

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = async () => {
    setIsFetching(true);
    try {
      const result = await fetchScheduleData(apiUrl);
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  
    const dataInterval = setInterval(fetchData, 5000);
    console.log(`Data revalidated at ${Jakarta()} (GMT+7).`);
  
    // Update current time every 60 seconds
    const timeInterval = setInterval(() => {
      setNow(Jakarta());
    }, 5000);
  
    // Cleanup intervals on component unmount
    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
  }, [apiUrl, setNow]);
  ; // Run fetchData when apiUrl changes

  if (loading)
    return (
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10ex-col space-y-3 justify-center gap-4 py-4 max-w-sm mx-auto">
        <Skeleton
          className=" 
     w-[450px] h-[20px] rounded-full"
        />
        <Skeleton className="h-[125px] w-[550px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[600px]" />
          <h1 className="font-medium text-slate-600/80 "> </h1>
          <Skeleton className="h-4 w-[600px]" />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10ex-col space-y-3 justify-center gap-4 py-4 max-w-sm mx-auto">
        <Skeleton
          className=" 
 w-[450px] h-[20px] rounded-full"
        />
        <Skeleton className="h-[125px] w-[550px] rounded-xl bg-red-800/60 dark:bg-red-800" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[600px]" />
          <h1 className="font-medium text-slate-600/80 dark:text-red-800/60 ">
            {" "}
            Gagal Menampilkan Data -{" "}
            <span className="text-red-800">{error.message}</span>
          </h1>
          <Skeleton className="h-4 w-[600px]" />
        </div>
      </div>
    );

  const jadwalTerbaru = FilterData(data, now);
  console.log(jadwalTerbaru);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10">
      <div className="p-6 relative">
        <h2 className="text-lg font-semibold text-center text-black dark:text-white relative">
          {startStation} &rarr; {endStation}
          <OnlineIndicator isFetching={isFetching} />
        </h2>
        <p className="text-center text-gray-500 mb-4"></p>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pb-10">
          {jadwalTerbaru.length > 0 ? (
            jadwalTerbaru.slice(0, 6).map((schedule, index) => (
              <div
                key={schedule.id}
                className={`py-2 rounded-full font-bold ${
                  index === 0 &&
                  (SelisihWaktu(schedule.jadwal) === "N/A" ||
                    parseInt(SelisihWaktu(schedule.jadwal).toString()) < 3)
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
            ))
          ) : (
            <div className="col-span-3 text-red-500 font-bold">Tutup</div>
          )}
        </div>
        <div
          className={`flex justify-around items-center p-1.5 rounded-b absolute inset-x-0 bottom-0 index-10 ${
            SelisihWaktu(jadwalTerbaru[0].jadwal) === "N/A"
              ? "bg-red-500 text-white"
              : parseInt(SelisihWaktu(jadwalTerbaru[0].jadwal).toString()) === 0
              ? "bg-gray-500 text-white"
              : parseInt(SelisihWaktu(jadwalTerbaru[0].jadwal).toString()) < 3
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div className="text-sm md:text-sm dark:font-medium">
            Jadwal Terdekat
          </div>
          <div className="text-lg font-bold">{jadwalTerbaru[0].jadwal} </div>
          <div className="text-sm dark:font-medium">
            {typeof SelisihWaktu(jadwalTerbaru[0].jadwal) === "number" ? (
              SelisihWaktu(jadwalTerbaru[0].jadwal) !== 0 ? (
                <>
                  Dalam{" "}
                  <span className="font-bold">
                    {SelisihWaktu(jadwalTerbaru[0].jadwal)}
                  </span>{" "}
                  menit
                </>
              ) : (
                <div className="text-sm font-bold"> Kereta Tiba </div>
              )
            ) : (
              SelisihWaktu(jadwalTerbaru[0].jadwal)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
