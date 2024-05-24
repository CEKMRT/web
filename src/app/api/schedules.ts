import { NextApiRequest, NextApiResponse } from 'next';

interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

const schedules: Schedule[] = [
  {
    id: 1,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T08:00:00Z"
  },
  {
    id: 2,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T09:00:00Z"
  },
  {
    id: 3,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T10:00:00Z"
  },
  {
    id: 4,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "2024-01-01T11:10:00Z"
  },
  {
    id: 5,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T12:13:00Z"
  },
  {
    id: 6,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T13:24:00Z"
  },
  {
    id: 7,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T14:34:00Z"
  },
  {
    id: 8,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T15:36:00Z"
  },
  {
    id: 9,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "2024-01-01T16:36:00Z"
  },
  
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Schedule[]>) {
  res.status(200).json(schedules);
}
