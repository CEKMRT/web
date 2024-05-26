

// import { useEffect, useState } from "react";
// import { fetchScheduleData, Schedule } from "@/app/api/req";
// import {
//   getUserTime,
//   formatTime,
//   getMinutesSinceMidnight,
//   calculateRemainingMinutes,
//   getNearestSchedule,
//   log,
// } from "@/lib/utiltest";
// import { Skeleton } from "@/components/ui/skeleton";

// if (process.env.NODE_ENV === "development") {
//   console.log(
//     " <=========================== HELPER FUNCTION ===========================> "
//   );
// }

// const ScheduleComponent = ({
//   apiUrl,
//   startStation,
//   endStation,
// }: {
//   apiUrl: string;
//   startStation: string;
//   endStation: string;
// }) => {
//   const [data, setData] = useState<Schedule[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [now, setNow] = useState(getUserTime());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchScheduleData(apiUrl);
//         if (process.env.NODE_ENV === "development") {
//           console.log(" ==============> fetchData <============== ", result);
//         }
//         setData(result);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     // Set interval to update the current time every 60 seconds
//     const interval = setInterval(() => {
//       setNow(getUserTime());
//     }, 60000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, [apiUrl]);

//   if (loading)
//     return (
//       <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10ex-col space-y-3 justify-center gap-4 py-4 max-w-sm mx-auto">
//         <Skeleton className="w-[450px] h-[20px] rounded-full" />
//         <Skeleton className="h-[125px] w-[550px] rounded-xl" />
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-[600px]" />
//           <h1 className="font-medium text-slate-600/80 "></h1>
//           <Skeleton className="h-4 w-[600px]" />
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10ex-col space-y-3 justify-center gap-4 py-4 max-w-sm mx-auto">
//         <Skeleton className="w-[450px] h-[20px] rounded-full" />
//         <Skeleton className="h-[125px] w-[550px] rounded-xl bg-red-800/60 dark:bg-red-800" />
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-[600px]" />
//           <h1 className="font-medium text-slate-600/80 dark:text-red-800/60 ">
//             Gagal Menampilkan Data - <span className="text-red-800">{error.message}</span>
//           </h1>
//           <Skeleton className="h-4 w-[600px]" />
//         </div>
//       </div>
//     );

//   const futureSchedules = data
//     ? data
//         .filter((schedule) => {
//           const scheduleDate = new Date(`2024-05-26T${schedule.jadwal}:00Z`); // Assuming `schedule.jadwal` is in "HH:MM" format
//           const scheduleMinutes = getMinutesSinceMidnight(
//             scheduleDate.getUTCHours(),
//             scheduleDate.getUTCMinutes()
//           );

//           const now = getUserTime();
//           const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);

//           return scheduleMinutes > nowMinutes;
//         })
//         .slice(0, 6)
//     : [];

//   const nearestSchedule = getNearestSchedule(futureSchedules);
//   const nearestTime = nearestSchedule ? formatTime(`2024-05-26T${nearestSchedule.jadwal}:00Z`) : "Tidak Tersedia";

//   const remainingMinutes = nearestSchedule
//     ? calculateRemainingMinutes(new Date(`2024-05-26T${nearestSchedule.jadwal}:00Z`), new Date())
//     : "N/A";

//   if (process.env.NODE_ENV === "development") {
//     console.log(" now, nearestSchedule, remainingMinutes ==>", now, nearestSchedule, remainingMinutes);
//   }

//   return (
//     <div className="schedule-component">
//       <h1>Jadwal Terdekat: {nearestTime}</h1>
//       <p>Sisa Waktu: {remainingMinutes} menit</p>
//     </div>
//   );
  


//   return (
//     <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10">
//       <div className="p-6 relative">
//         <h2 className="text-lg font-semibold text-center text-black dark:text-white">
//           {startStation} &rarr; {endStation}
//         </h2>
//         <p className="text-center text-gray-500 mb-4"></p>
//         <div className="grid grid-cols-3 gap-2 text-center mb-auto pb-10">
//           {future.map((schedule, index) => (
//             <div
//               key={schedule.id}
//               className={`py-2 rounded-full  font-bold ${
//                 index === 0 &&
//                 (remainingMinutes === "N/A" ||
//                   parseInt(remainingMinutes.toString()) < 3)
//                   ? "bg-red-500 text-white"
//                   : index === 0
//                   ? "bg-green-400 text-green-000"
//                   : index === 1
//                   ? "bg-green-300 text-green-600"
//                   : index === 2
//                   ? "bg-green-200 text-green-800"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {formatTime(schedule.jadwal)}
//             </div>
//           ))}
//         </div>
//         <div
//           className={`flex justify-around items-center p-1.5 rounded-b absolute inset-x-0 bottom-0 index-10 ${
//             remainingMinutes === "N/A"
//               ? "bg-red-500 text-white"
//               : parseInt(remainingMinutes.toString()) === 0
//               ? "bg-gray-500 text-white"
//               : parseInt(remainingMinutes.toString()) < 3
//               ? "bg-red-500 text-white"
//               : "bg-green-500 text-white"
//           }`}
//         >
//           <div className="text-sm md:text-sm dark:font-medium">
//             Jadwal Terdekat
//           </div>
//           <div className="text-lg font-bold">{nearestTime} </div>
//           <div className="text-sm dark:font-medium">
//             {typeof remainingMinutes === "number" ? (
//               <>
//                 Dalam <span className="font-bold">{remainingMinutes}</span>{" "}
//                 menit
//               </>
//             ) : (
//               remainingMinutes
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// export default ScheduleComponent;
/////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { fetchScheduleData, Schedule } from "@/app/api/req";
import {
  getUserTime,
  formatTime,
  getMinutesSinceMidnight,
  calculateRemainingMinutes,
} from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";





// Helper functions
const getNearestSchedule = (schedules: Schedule[]) => {
  const now = getUserTime();
  const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);

  const futureSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.jadwal);
    const scheduleMinutes = getMinutesSinceMidnight(
      scheduleDate.getHours(),
      scheduleDate.getMinutes()
    );
    return scheduleMinutes > nowMinutes;
  });

  if (process.env.NODE_ENV === "development") {
    console.log("nowMinute:", nowMinutes);
    console.log("Future schedules:", futureSchedules);
  }

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
        if (process.env.NODE_ENV === "development") {
          console.log("Fetched data:", result);
        }
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

  if (process.env.NODE_ENV === "development") {
    console.log("Current time:", now);
  }

  const futureSchedules = data
    ? data
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.jadwal);
          const scheduleMinutes = getMinutesSinceMidnight(
            scheduleDate.getHours(),
            scheduleDate.getMinutes()
          );
          const nowMinutes = getMinutesSinceMidnight(now.hours, now.minutes);

          return scheduleMinutes > nowMinutes;
        })
        .slice(0, 6)
    : [];
  if (process.env.NODE_ENV === "development") {
    console.log("Filtered Future Schedules:", futureSchedules);
  }

  const nearestSchedule = getNearestSchedule(futureSchedules);
  const nearestTime = nearestSchedule
    ? formatTime(nearestSchedule.jadwal)
    : "Tidak Tersedia";

  const remainingMinutes = nearestSchedule
    ? calculateRemainingMinutes(nearestSchedule.jadwal)
    : "N/A";

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
              className={`py-2 rounded-full  font-bold ${
                index === 0 &&
                (remainingMinutes === "N/A" ||
                  parseInt(remainingMinutes.toString()) < 3)
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
            remainingMinutes === "N/A"
              ? "bg-red-500 text-white"
              : parseInt(remainingMinutes.toString()) === 0
              ? "bg-gray-500 text-white"
              : parseInt(remainingMinutes.toString()) < 3
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div className="text-sm md:text-sm dark:font-medium">
            Jadwal Terdekat
          </div>
          <div className="text-lg font-bold">{nearestTime} </div>
          <div className="text-sm dark:font-medium">
            {typeof remainingMinutes === "number" ? (
              <>
                Dalam <span className="font-bold">{remainingMinutes}</span>{" "}
                menit
              </>
            ) : (
              remainingMinutes
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
