interface Schedule {
    id: number;
    station_id: number;
    stasiun_name: string;
    arah: string;
    jadwal: string;
  }
  interface JSONExample {
    id: number;
    station_id: number;
    stasiun_name: string;
    arah: string;
    jadwal: string;
  }
  
  interface ScheduleComponentProps {
    apiUrl: string;
    startStation: string;
    endStation: string;
  }

  interface ButtonProps {
    
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    active?: boolean; 
  }
  