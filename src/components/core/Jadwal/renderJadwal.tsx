import React, { useState, useEffect, useCallback } from "react";
import { fetchScheduleData } from "@/app/api/req";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import ErrorComponent from "../../ui/LoadingError/error";
import LoadingComponent from "../../ui/LoadingError/loading";

import ScrollAnimation from "@/components/framer/animation";
import {
  bounceVariants,
  fadeInLeftVariants,
  fadeInUpVariants,
} from "@/components/framer/anima";
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
  const [visibleCount, setVisibleCount] = useState<number>(6); // State to track number of visible schedules

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
    }, 10000);

    const timeInterval = setInterval(() => {
      setNow(Jakarta());
    }, 10000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
  }, [apiUrl, fetchData]);

  // const handleRefresh = () => {
  //   window.location.reload(); // Manually refresh the page
  // };

  const handleShowMore = () => {
    setVisibleCount(jadwalTerbaru.length);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  if (loading) {
    return <LoadingComponent  />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error.message} />;
  }

  const jadwalTerbaru = FilterData(data, now);
  const latestJadwal = findLatestJadwal(data);

  return (
    <ScrollAnimation
      variants={fadeInUpVariants}
      className="max-w-72 mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10 animate-fade-up animate-once animate-delay-200 animate-ease-in"
    >
      <ScrollAnimation variants={fadeInUpVariants} className="p-6 relative  ">
        <ScrollAnimation
          variants={bounceVariants}
          className="flex justify-center w-full"
        >
          <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-black dark:text-white relative flex items-center">
            <ScrollAnimation
              variants={fadeInUpVariants}
              className="animate-fade-right animate-once animate-delay-[800ms] animate-ease-in text-center"
            >
              {startStation}
            </ScrollAnimation>
            <ChevronDoubleRightIcon
              className="size-4 md:size-6 sm:mx-2  animate-fade-right animate-once animate-delay-[500ms] animate-ease-in"
              style={{ verticalAlign: "middle" }}
            />
            <ScrollAnimation
              variants={fadeInUpVariants}
              className="animate-fade-left animate-once animate-delay-[1000ms] animate-ease-in text-center"
            >
              {endStation}
            </ScrollAnimation>
          </h2>
        </ScrollAnimation>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pt-4 pb-4 ">
          {jadwalTerbaru.length > 0 ? (
            jadwalTerbaru.slice(0, visibleCount).map((schedule, index) => (
              <ScrollAnimation
                variants={fadeInUpVariants}
                key={schedule.id}
                className={`py-2 rounded-full font-bold 
                  hover:-translate-y-1 hover:scale-140 duration-300
                
                ${
                  index === 0 &&
                  (SelisihWaktu(schedule.jadwal) === "N/A" ||
                    parseInt(SelisihWaktu(schedule.jadwal).toString()) < 3)
                    ? "bg-red-500 text-white  " 
                    // animate-fade animate-once animate-delay-1000 animate-ease-in
                    : index === 0
                    ? "bg-green-400 dark:bg-emerald-600 text-green-000 "
                    // animate-fade animate-once animate-delay-[1200ms] animate-ease-in
                    : index === 1
                    ? "bg-green-300 dark:bg-emerald-700  dark:text-white "
                    // animate-fade animate-once animate-delay-[1400ms] animate-ease-in
                    : index === 2
                    ? "bg-green-200 dark:bg-emerald-800 text-green-800 dark:text-white "
                    // animate-fade animate-once animate-delay-[1600ms] animate-ease-in
                    : "bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                    //  animate-fade animate-once animate-delay-[2000ms] animate-ease-in
                }`}
              >
                {formatTime(schedule.jadwal)}
              </ScrollAnimation>
            ))
          ) : (
            <div className="col-span-3 text-red-500 font-bold">
              Tutup / Closed
            </div>
          )}
        </div>
        {jadwalTerbaru.length > 0 && (
          <ScrollAnimation
            variants={bounceVariants}
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
            <div className="text-xs md:text-sm font-bold hidden sm:block">
              {jadwalTerbaru[0].jadwal}
            </div>
            <div className="text-xs md:text-base dark:font-medium">
              {typeof SelisihWaktu(jadwalTerbaru[0].jadwal) === "number" ? (
                SelisihWaktu(jadwalTerbaru[0].jadwal) !== 0 ? (
                  <>
                    Dalam{" "}
                    <span className="font-bold ">
                      {SelisihWaktu(jadwalTerbaru[0].jadwal)}
                    </span>{" "}
                    Menit
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

            <div className="text-xs md:text-sm dark:font-medium">
              <span className="hidden sm:block">Jadwal Terakhir</span>
              <span className="sm:hidden">Terakhir</span>
            </div>
            <div className="text-xs md:text-sm font-bold">{latestJadwal}</div>
          </ScrollAnimation>
        )}

        {/* Show more button */}
        <ScrollAnimation variants={bounceVariants} className="mb-6 md:mb-7">
          
        {!initialFetch && visibleCount < jadwalTerbaru.length && (
          <button
          className="bg-gray-200 dark:bg-slate-800 hover:dark:bg-emerald-700 hover:bg-green-500 text-white  px-2 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-full mx-auto block"
          onClick={handleShowMore}
          >
            Lihat Semua
          </button>
        )}
        {visibleCount !== 6 && (
          <button
          className="bg-gray-200 dark:bg-slate-800 hover:dark:bg-red-900 hover:bg-red-600 text-white px-2 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-full mx-auto block"
          onClick={handleShowLess}
          >
            Sembunyikan
          </button>
        )}
      </ScrollAnimation>
      </ScrollAnimation>
    </ScrollAnimation>
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
