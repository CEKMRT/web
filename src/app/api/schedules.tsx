import { NextApiRequest, NextApiResponse } from "next";

interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}

const schedules: Schedule[] = [
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:00:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:12:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:24:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:36:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:46:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T05:55:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:03:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:10:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:17:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:24:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:31:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:38:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:44:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:49:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:54:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T06:59:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T07:04:00Z",
  },
  {
    id: 0,
    station_id: 20,
    stasiun_name: "Stasiun Lebak Bulus Grab",
    arah: "Arah Bundaran HI",
    jadwal: "0000-01-01T07:09:00Z",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Schedule[]>
) {
  res.status(200).json(schedules);
}
