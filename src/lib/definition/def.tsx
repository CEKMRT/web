interface Schedule {
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

interface AnnouncementPopupProps {
  isOpen: boolean;
  onClose: () => void;
}
interface MRTNewsItem {
  title: string;
  date: string;
  link: string;
  image: string;
  source: string;
}

interface CachedData {
  _id: string;
  data: MRTNewsItem[];
  timestamp: number;
}
