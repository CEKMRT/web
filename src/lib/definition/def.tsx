interface Schedule {
    id: number;
    station_id: number;
    stasiun_name: string;
    arah: string;
    jadwal: string;
  }
  
  interface ScheduleComponentProps {
    apiUrl: string;
    title: string;
    subtitle: string;
  }

  interface ButtonProps {
    children: React.ReactNode;
    className?: string;
  }
  