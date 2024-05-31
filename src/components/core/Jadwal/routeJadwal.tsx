import React from "react";
import ScheduleComponent from "./renderJadwal";

interface BoxCompProps {
  selectedSchedule: string | null;
}
const apiUrlUtama = process.env.NEXT_PUBLIC_API_URL;
const arah1 = process.env.NEXT_PUBLIC_API_URL1;
const arah2 = process.env.NEXT_PUBLIC_API_URL2;

// ${apiUrlUtama}/38/{arah1}` // yang ini arah Bundaran Hi
// ${apiUrlUtama}/38/{arah2}` // yang ini arah Lebak Bulus

const schedules = [
  {
    id: "Bundaran HI",
    routes: [
      {
        apiUrl: `${apiUrlUtama}39${arah2}`,
        startStation: "Bundaran HI",
        endStation: "Lebak Bulus Grab",
        startLrt: [],
        endLrt: ["7A", "8", "D21"],
      },
    ],
  },
  {
    id: "Dukuh Atas BNI",
    routes: [
      {
        apiUrl: `${apiUrlUtama}38${arah1}`,
        startStation: "Dukuh Atas BNI",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}38${arah2}`,
        startStation: "Dukuh Atas BNI",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Setiabudi Astra",
    routes: [
      {
        apiUrl: `${apiUrlUtama}37${arah1}`,
        startStation: "Setiabudi Astra",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}37${arah2}`,
        startStation: "Setiabudi Astra",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Bendungan Hilir",
    routes: [
      {
        apiUrl: `${apiUrlUtama}36${arah1}`,
        startStation: "Bendungan Hilir",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}36${arah2}`,
        startStation: "Bendungan Hilir",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Istora Mandiri",
    routes: [
      {
        apiUrl: `${apiUrlUtama}35${arah1}`,
        startStation: "Istora Mandiri",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}35${arah2}`,
        startStation: "Istora Mandiri",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Senayan Mastercard",
    routes: [
      {
        apiUrl: `${apiUrlUtama}34${arah1}`,
        startStation: "Senayan Mastercard",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}34${arah2}`,
        startStation: "Senayan Mastercard",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "ASEAN",
    routes: [
      {
        apiUrl: `${apiUrlUtama}33${arah1}`,
        startStation: "Asean",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}33${arah2}`,
        startStation: "Asean",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Blok M BCA",
    routes: [
      {
        apiUrl: `${apiUrlUtama}32${arah1}`,
        startStation: "Blok M BCA",
        endStation: "Bundaran HI",
        startLrt: ["1", "1E", "1K", "1M", "1Q", "6M", "7B", "8D", "13A"],
        endLrt: [],
      },
      {
        apiUrl: `${apiUrlUtama}32${arah2}`,
        startStation: "Blok M BCA",
        endStation: "Lebak Bulus Grab",
        startLrt: ["1", "1E", "1K", "1M", "1Q", "6M", "7B", "8D", "13A"],
        endLrt: [],
      },
    ],
  },
  {
    id: "Blok A",
    routes: [
      {
        apiUrl: `${apiUrlUtama}31${arah1}`,
        startStation: "Blok A",
        endStation: "Bundaran HI",
        startLrt: ["1E"],
        endLrt: [],
      },
      {
        apiUrl: `${apiUrlUtama}31${arah2}`,
        startStation: "Blok A",
        endStation: "Lebak Bulus Grab",
        startLrt: ["1E"],
        endLrt: [],
      },
    ],
  },
  {
    id: "Haji Nawi",
    routes: [
      {
        apiUrl: `${apiUrlUtama}30${arah1}`,
        startStation: "Haji Nawi",
        endStation: "Bundaran HI",
        startLrt: ["1E"],
        endLrt: [],
      },
      {
        apiUrl: `${apiUrlUtama}30${arah2}`,
        startStation: "Haji Nawi",
        endStation: "Lebak Bulus Grab",
        startLrt: ["1E"],
        endLrt: [],
      },
    ],
  },
  {
    id: "Cipete Raya",
    routes: [
      {
        apiUrl: `${apiUrlUtama}29${arah1}`,
        startStation: "Cipete Raya",
        endStation: "Bundaran HI",
        startLrt: ["1E"],
        endLrt: [],
      },
      {
        apiUrl: `${apiUrlUtama}29${arah2}`,
        startStation: "Cipete Raya",
        endStation: "Lebak Bulus Grab",
        startLrt: ["1E"],
        endLrt: [],
      },
    ],
  },
  {
    id: "Fatmawati Indomaret",
    routes: [
      {
        apiUrl: `${apiUrlUtama}21${arah1}`,
        startStation: "Fatmawati Indomaret",
        endStation: "Bundaran HI",
        startLrt: [],
        endLrt: ["7A", "8", "D21"],
      },
      {
        apiUrl: `${apiUrlUtama}21${arah2}`,
        startStation: "Fatmawati Indomaret",
        endStation: "Lebak Bulus Grab",
        startLrt: [],
        endLrt: ["7A", "8", "D21"],
      },
    ],
  },
  {
    id: "Lebak Bulus Grab",
    routes: [
      {
        apiUrl: `${apiUrlUtama}20${arah1}`,
        startStation: "Lebak Bulus Grab",
        endStation: "Bundaran HI",
        startLrt: ["7A", "8", "D21"],
        endLrt: [],
      },
    ],
  },
];

const BoxComp: React.FC<BoxCompProps> = ({ selectedSchedule }) => {
  return (
    <>
      {schedules
        .filter((schedule) => schedule.id === selectedSchedule)
        .flatMap((schedule) => schedule.routes)
        .map((route, index) => (
          <ScheduleComponent
            key={index}
            apiUrl={route.apiUrl}
            startStation={route.startStation}
            endStation={route.endStation}
            // startLrt={route.startLrt}
            // endLrt={route.endLrt}
          />
        ))}
    </>
  );
};

export default BoxComp;
