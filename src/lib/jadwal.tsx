import { useEffect, useState } from 'react';


const ScheduleComponent = () => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/schedules');
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
  }, []);

  const formatTime = (jadwal: string): string => {
    const date = new Date(jadwal);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
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
    
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-center text-black">Bundaran HI &gt; Lebak Bulus Grab</h2>
        <p className="text-center text-gray-500 mb-4">Stasiun Akhir</p>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          {data?.map(schedule => (
            <div
              key={schedule.id}
              className="py-2 rounded bg-green-200 text-green-800 font-bold"
            >
              {formatTime(schedule.jadwal)}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center bg-green-500 text-white p-2 rounded-b">
          <div className="text-sm">Jadwal Terdekat</div>
          <div className="text-lg font-bold">{nearestTime}</div>
          <div className="text-sm">{remainingMinutes} menit</div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
