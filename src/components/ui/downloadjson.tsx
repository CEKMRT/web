import { useState } from 'react';
import { fetchScheduleData } from '@/app/api/req';
const DownloadButton = () => {
    const [scheduleData, setScheduleData] = useState<Schedule[] | null>(null); // Set initial state as null or Schedule[]
  
    const fetchData = async () => {
      try {
        const data = await fetchScheduleData('https://mrt-production.up.railway.app/api/schedules');
        setScheduleData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDownload = () => {
      if (scheduleData) {
        const json = JSON.stringify(scheduleData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedule.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    };
  
    return (
      <div className='space-x-4'>
        <button
          onClick={fetchData}
          className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Data Jadwal MRT
        </button>
        {scheduleData && (
          <button
            onClick={handleDownload}
            className="mt-4 bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download JSON
          </button>
        )}
      </div>
    );
  };
  
  export default DownloadButton;