import { useEffect, useState } from 'react';

interface CurrentTimeProps {
  currentTime: string;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ currentTime }) => {
  const [time, setTime] = useState<string>(currentTime);

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const response = await fetch('/api/time');
      const data = await response.json();
      setTime(data.currentTime);
    };

    fetchCurrentTime();
  }, []);

  return (
    <div>
      <h1>Current Time: {time}</h1>
    </div>
  );
};

export default CurrentTime;
