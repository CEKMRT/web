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

const JamKeMenit = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const FilterData = (
  schedules: Schedule[],
  userTime: string | number
): Schedule[] => {
  const userTimeInMinutes =
    typeof userTime === "string" ? JamKeMenit(userTime) : userTime;

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
    .slice(0, 6);

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

const Jakarta = (): string => {
  const currentTime = new Date();
  const waktuJakarta = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);
  return waktuJakarta.toISOString().slice(11, 16);
};

const SelisihWaktu = (scheduleTime: string): number | string => {
  const currentTime = Jakarta();
  const [currentTimeHours, currentTimeMinutes] = currentTime
    .split(":")
    .map(Number);
  const [scheduleTimeHours, scheduleTimeMinutes] = scheduleTime
    .split(":")
    .map(Number);

  const diffMinutes =
    (scheduleTimeHours - currentTimeHours) * 60 +
    (scheduleTimeMinutes - currentTimeMinutes);
  return diffMinutes >= 0 ? diffMinutes : "N/A";
};

const formatTime = (time: string): string => time;

const ScheduleComponent: React.FC<{
  apiUrl: string;
  startStation: string;
  endStation: string;
}> = ({ apiUrl, startStation, endStation }) => {
  const [data, setData] = useState<Schedule[]>([]);
  const [now, setNow] = useState<string>(Jakarta());
  const [initialFetch, setInitialFetch] = useState(true);
  // Render
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  //Styling
  const randomWidth = Math.floor(Math.random() * (600 - 200 + 1)) + 200;

  const fetchData = async (isInitialFetch = false) => {
    if (isInitialFetch) {
      setLoading(true);
    } else {
      setIsFetching(true);
    }
    try {
      const result = await fetchScheduleData(apiUrl);
      setData(result);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(error as Error);
    } finally {
      if (isInitialFetch) {
        setLoading(false);
      }
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setInitialFetch(true);
    setData([]);
    setError(null); 
    fetchData(true);
    setInitialFetch(false);

    const dataInterval = setInterval(() => {
      fetchData(false);
    }, 30000);
    console.log(`Data Terbaru pada ${Jakarta()} (GMT+7).`);

    const timeInterval = setInterval(() => {
      setNow(Jakarta());
    }, 30000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);
  const handleRefresh = () => {
    window.location.reload(); // Manually refresh the page
  };
  if (loading) {
    return (
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <Skeleton
          className="h-4 custom-width"
          style={{ "--tw-custom-width": `${randomWidth}px` } as any}
        />{" "}
        <Skeleton className="h-[125px] w-[550px] rounded-xl" />
        <Skeleton
          className="h-8 custom-width"
          style={{ "--tw-custom-width": `${randomWidth}px` } as any}
        />
        <div className="space-y-2">
          <Skeleton
            className="h-4 custom-width"
            style={{ "--tw-custom-width": `${randomWidth}px` } as any}
          />{" "}
          <Skeleton
            className="h-4 custom-width"
            style={{ "--tw-custom-width": `${randomWidth}px` } as any}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <Skeleton className="w-[450px] h-[20px] rounded-full" />
        <Skeleton className="h-[125px] w-[550px] rounded-xl bg-red-800/60 dark:bg-red-800" />
        <div className="space-y-2">
          <h1 className="font-medium text-slate-600/80 dark:text-red-800/60">
            Gagal Menampilkan Data -{" "}
            <span  className="text-red-800">
              {error.message}
            </span><span/>
            <a onClick={handleRefresh} className="font-medium text-slate-600/80 dark:text-red-800/60 hover:text-green-800 hover:font-bold hover:underline">Refresh</a>
          </h1>
        </div>
      </div>
    );
  }

  const jadwalTerbaru = FilterData(data, now);
  console.log("----------------------------------");

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10">
      <div className="p-6 relative">
        <h2 className="text-lg font-semibold text-center text-black dark:text-white relative">
          {startStation} &rarr; {endStation}
          <OnlineIndicator isFetching={isFetching} />
        </h2>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pt-4 pb-10 ">
          {jadwalTerbaru.length > 0 ? (
            jadwalTerbaru.map((schedule, index) => (
              <div
                key={schedule.id}
                className={`py-2 rounded-full font-bold 
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
                  index === 0 &&
                  (SelisihWaktu(schedule.jadwal) === "N/A" ||
                    parseInt(SelisihWaktu(schedule.jadwal).toString()) < 3)
                    ? "bg-red-500 text-white hover:animate-ping"
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
            <div className="col-span-3 text-red-500 font-bold">
              Tutup / Closed
            </div>
          )}
        </div>
        {jadwalTerbaru.length > 0 && (
          <div
            className={`flex justify-around items-center p-1.5 rounded-b absolute inset-x-0 bottom-0 index-10 ${
              SelisihWaktu(jadwalTerbaru[0].jadwal) === "N/A"
                ? "bg-red-500 text-white "
                : parseInt(SelisihWaktu(jadwalTerbaru[0].jadwal).toString()) ===
                  0
                ? "bg-gray-500 text-white"
                : parseInt(SelisihWaktu(jadwalTerbaru[0].jadwal).toString()) < 3
                ? "bg-red-500 text-white animate-pulse  "
                : "bg-green-500 text-white"
            }`}
          >
            <div className="text-sm md:text-sm dark:font-medium">
              Jadwal Terdekat
            </div>
            <div className="text-lg font-bold">{jadwalTerbaru[0].jadwal}</div>
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
                  <div className="text-sm font-bold animate-bounce">
                    Kereta Tiba
                  </div>
                )
              ) : (
                SelisihWaktu(jadwalTerbaru[0].jadwal)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleComponent;
