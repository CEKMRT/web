import { useEffect, useState } from 'react';

interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

const ScheduleComponent = ({ apiUrl, title, subtitle }: { apiUrl: string, title: string, subtitle: string }) => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Schedule[] = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const formatTime = (jadwal: string): string => {
    const date = new Date(jadwal);
    const localTime = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Adjusting to GMT+7
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getNearestSchedule = (schedules: Schedule[]) => {
    const now = new Date();
    let nearestSchedule = schedules[0];
    let minDifference = Infinity;

    schedules.forEach(schedule => {
      const scheduleDate = new Date(schedule.jadwal);
      const difference = scheduleDate.getTime() - now.getTime();
      if (difference > 0 && difference < minDifference) {
        minDifference = difference;
        nearestSchedule = schedule;
      }
    });

    return nearestSchedule;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const nearestSchedule = data ? getNearestSchedule(data) : null;
  const nearestTime = nearestSchedule ? formatTime(nearestSchedule.jadwal) : 'N/A';
  const remainingMinutes = nearestSchedule
  ? Math.floor((new Date(nearestSchedule.jadwal).getTime() - new Date().getTime()) / 60000)
  : 'N/A';

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 dark:border-neutral-800 dark:border-2">
      <div className="p-4 relative">
        <h2 className="text-lg font-semibold text-center text-black dark:text-white">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-4">{subtitle}</p>
        <div className="grid grid-cols-3 gap-2 text-center mb-4 pb-20">
          {data?.map((schedule) => (
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
          <div className="text-sm dark:font-medium">{remainingMinutes} menit</div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
