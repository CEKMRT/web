import React, { useState, useEffect, useCallback } from "react";
import { fetchScheduleData } from "@/app/api/req";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import ErrorComponent from "../../ui/LoadingError/error";
import LoadingComponent from "../../ui/LoadingError/loading";
import {
  JamKeMenit,
  Jakarta,
  SelisihWaktu,
  formatTime,
} from "@/lib/utils/timeUtils";
import {
  Schedule,
  FilterData,
  findLatestJadwal,
} from "@/lib/utils/scheduleUtils";

interface ScheduleComponentProps {
  apiUrl: string;
  startStation: string;
  endStation: string;
}

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({
  apiUrl,
  startStation,
  endStation,
}) => {
  const [data, setData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [now, setNow] = useState<string>(Jakarta());
  const [initialFetch, setInitialFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const randomWidth = Math.floor(Math.random() * (600 - 200 + 1)) + 200;

  const fetchData = useCallback(
    async (isInitialFetch = false) => {
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
    },
    [apiUrl]
  );

  useEffect(() => {
    setInitialFetch(true);
    setData([]); // Reset data when apiUrl changes
    setError(null); // Reset error state when apiUrl changes
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
  }, [apiUrl, fetchData]);

  const handleRefresh = () => {
    window.location.reload(); // Manually refresh the page
  };

  if (loading) {
    return <LoadingComponent randomWidth={randomWidth} />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error.message} />;
  }

  const jadwalTerbaru = FilterData(data, now);
  const latestJadwal = findLatestJadwal(data);

  return (
    <div className="max-w-72 mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10 animate-fade-up animate-once animate-delay-200 animate-ease-in">
      <div className="p-6 relative  ">
        <div className="flex justify-center w-full">
          <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-black dark:text-white relative flex items-center">
            <span className="animate-fade-right animate-once animate-delay-[800ms] animate-ease-in text-center">
              {startStation}
            </span>
            <ChevronDoubleRightIcon
              className="size-4 md:size-6 sm:mx-2  animate-fade-right animate-once animate-delay-[500ms] animate-ease-in"
              style={{ verticalAlign: "middle" }}
            />
            <span className="animate-fade-left animate-once animate-delay-[1000ms] animate-ease-in text-center">
              {endStation}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pt-4 pb-10 ">
          {jadwalTerbaru.length > 0 ? (
            jadwalTerbaru.map((schedule, index) => (
              <div
                key={schedule.id}
                className={`py-2 rounded-full font-bold 
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 
                
                ${
                  index === 0 &&
                  (SelisihWaktu(schedule.jadwal) === "N/A" ||
                    parseInt(SelisihWaktu(schedule.jadwal).toString()) < 3)
                    ? "bg-red-500 text-white animate-fade animate-once animate-delay-1000 animate-ease-in"
                    : index === 0
                    ? "bg-green-400 dark:bg-emerald-600 text-green-000 animate-fade animate-once animate-delay-[1200ms] animate-ease-in"
                    : index === 1
                    ? "bg-green-300 dark:bg-emerald-700  dark:text-white animate-fade animate-once animate-delay-[1400ms] animate-ease-in"
                    : index === 2
                    ? "bg-green-200 dark:bg-emerald-800 text-green-800 dark:text-white animate-fade animate-once animate-delay-[1600ms] animate-ease-in"
                    : "bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 animate-fade animate-once animate-delay-[2000ms] animate-ease-in"
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
            className={`flex grow justify-around items-center p-2 rounded-b absolute inset-x-0 bottom-0 index-10 transition-colors duration-1000 ease-in-out 
            animate-flip-up animate-once animate-ease-in px-2 
             ${
               SelisihWaktu(jadwalTerbaru[0].jadwal) === "N/A"
                 ? "bg-red-500 text-white "
                 : parseInt(
                     SelisihWaktu(jadwalTerbaru[0].jadwal).toString()
                   ) === 0
                 ? "bg-gray-500 text-white motion-safe:animate-pulse"
                 : parseInt(SelisihWaktu(jadwalTerbaru[0].jadwal).toString()) <
                   3
                 ? "bg-red-500 text-white motion-safe:animate-pulse  "
                 : "bg-green-500 text-white"
             }`}
          >
            <div className="text-xs md:text-sm dark:font-medium">
              <span className="hidden sm:block">Jadwal Terdekat</span>
              <span className="sm:hidden"> Terdekat</span>
            </div>
            <div className="text-xs md:text-sm font-bold">
              {jadwalTerbaru[0].jadwal}
            </div>
            <div className="text-xs md:text-base dark:font-medium">
              {typeof SelisihWaktu(jadwalTerbaru[0].jadwal) === "number" ? (
                SelisihWaktu(jadwalTerbaru[0].jadwal) !== 0 ? (
                  <>
                    -Dalam{" "}
                    <span className="font-bold ">
                      {SelisihWaktu(jadwalTerbaru[0].jadwal)}
                    </span>{" "}
                    Menit-
                  </>
                ) : (
                  <div className="text-sm font-bold animate-wiggle animate-infinite animate-duration-200 animate-ease-in-out">
                    Kereta Tiba
                  </div>
                )
              ) : (
                SelisihWaktu(jadwalTerbaru[0].jadwal)
              )}
            </div>

            <div className="text-xs md:text-sm font-bold">
              {latestJadwal}
            </div>
            <div className="text-xs md:text-sm dark:font-medium">
              <span className="hidden sm:block">Jadwal Terakhir</span>
              <span className="sm:hidden">Terakhir</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleComponent;

/* const statusClass = () => {
  const selisih = SelisihWaktu(jadwalTerbaru[0].jadwal);

  if (selisih === "N/A") {
    return "bg-red-500 text-white";
  } else if (parseInt(selisih.toString()) === 0) {
    return "bg-gray-500 text-white";
  } else if (parseInt(selisih.toString()) < 3) {
    return "bg-red-500 text-white animate-pulse";
  } else {
    return "bg-green-500 text-white";
  }
}; */