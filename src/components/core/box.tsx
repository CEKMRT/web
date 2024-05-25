import React from "react";
import ScheduleComponent from "../ui/box";

interface BoxCompProps {
  selectedSchedule: string | null;
}
const apiUrlUtama = "https://mrt-production.up.railway.app/api/schedules/";
const arah1 = "/Arah%20Bundaran%20HI";
const arah2 = "/Arah%20Lebak%20Bulus";

// ${apiUrlUtama}/38/{arah2}` // yang ini arah Bundaran Hi
// ${apiUrlUtama}/38/{arah2}` // yang ini arah Lebak Bulus

const schedules = [
  {
    id: "Bundaran HI",
    routes: [
      {
        apiUrl: `${apiUrlUtama}39${arah2}`,
        startStation: "Bundaran HI",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "DukuhAtas",
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
    id: "Setiabudi",
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
    id: "Benhil",
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
    id: "Mandiri",
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
    id: "Senayan",
    routes: [
      {
        apiUrl: `${apiUrlUtama}34${arah1}`,
        startStation: "Senayan",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}34${arah2}`,
        startStation: "Senayan",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Asean",
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
    id: "Blok M",
    routes: [
      {
        apiUrl: `${apiUrlUtama}32${arah1}`,
        startStation: "Blok M",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}32${arah2}`,
        startStation: "Blok M",
        endStation: "Lebak Bulus Grab",
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
      },
      {
        apiUrl: `${apiUrlUtama}31${arah2}`,
        startStation: "Blok A",
        endStation: "Lebak Bulus Grab",
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
      },
      {
        apiUrl: `${apiUrlUtama}30${arah2}`,
        startStation: "Haji Nawi",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Cipete",
    routes: [
      {
        apiUrl: `${apiUrlUtama}29${arah1}`,
        startStation: "Cipete",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}29${arah2}`,
        startStation: "Cipete",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Fatmawati",
    routes: [
      {
        apiUrl: `${apiUrlUtama}21${arah1}`,
        startStation: "Fatmawati",
        endStation: "Bundaran HI",
      },
      {
        apiUrl: `${apiUrlUtama}21${arah2}`,
        startStation: "Fatmawati",
        endStation: "Lebak Bulus Grab",
      },
    ],
  },
  {
    id: "Lebak Bulus",
    routes: [
      {
        apiUrl: `${apiUrlUtama}20${arah1}`,
        startStation: "Lebak Bulus Grab",
        endStation: "Bundaran HI",
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
          />
        ))}
    </>
  );
};

export default BoxComp;
