import React from 'react';
import ScheduleComponent from "../ui/box";

interface BoxCompProps {
  selectedSchedule: string | null;
}
const apiUrlUtama = "http://localhost:8080/schedules";
const arah1 = "Arah%20Bundaran%20HI";
const arah2 = "Arah%20Lebak%20Bulus";


// ${apiUrlUtama}/38/{arah2}` // yang ini arah Bundaran Hi
// ${apiUrlUtama}/38/{arah2}` // yang ini arah Bundaran Hi

const schedules = [
  {
    id: "Bundaran HI",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/39/Arah Lebak Bulus", startStation: "Bundaran HI", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "DukuhAtas",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/38/Arah%20Bundaran%20HI", startStation: "Dukuh Atas BNI", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/38/Arah%20Lebak%20Bulus", startStation: "Dukuh Atas BNI", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Setiabudi",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/37/Arah%20Bundaran%20HI", startStation: "Setiabudi Astra", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/37/Arah%20Lebak%20Bulus", startStation: "Setiabudi Astra", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Benhil",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/36/Arah%20Bundaran%20HI", startStation: "Bendungan Hilir", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/36/Arah%20Lebak%20Bulus", startStation: "Bendungan Hilir", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Mandiri",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/35/Arah%20Bundaran%20HI", startStation: "Istora Mandiri", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/35/Arah%20Lebak%20Bulus", startStation: "Istora Mandiri", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Senayan",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/34/Arah%20Bundaran%20HI", startStation: "Senayan", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/34/Arah%20Lebak%20Bulus", startStation: "Senayan", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Asean",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/33/Arah%20Bundaran%20HI", startStation: "Asean", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/33/Arah%20Lebak%20Bulus", startStation: "Asean", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Blok M",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/32/Arah%20Bundaran%20HI", startStation: "Blok M", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/32/Arah%20Lebak%20Bulus", startStation: "Blok M", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Blok A",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/31/Arah%20Bundaran%20HI", startStation: "Blok A", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/31/Arah%20Lebak%20Bulus", startStation: "Blok A", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Haji Nawi",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/30/Arah%20Bundaran%20HI", startStation: "Haji Nawi", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/30/Arah%20Lebak%20Bulus", startStation: "Haji Nawi", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Cipete",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/29/Arah%20Bundaran%20HI", startStation: "Cipete", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/29/Arah%20Lebak%20Bulus", startStation: "Cipete", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Fatmawati",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/21/Arah%20Bundaran%20HI", startStation: "Fatmawati", endStation: "Bundaran HI" },
      { apiUrl: "http://localhost:8080/schedules/21/Arah%20Lebak%20Bulus", startStation: "Fatmawati", endStation: "Lebak Bulus Grab" }
    ]
  },
  {
    id: "Lebak Bulus",
    routes: [
      { apiUrl: "http://localhost:8080/schedules/20/Arah%20Bundaran%20HI", startStation: "Lebak Bulus Grab", endStation: "Bundaran HI" }
    ]
  }
];

const BoxComp: React.FC<BoxCompProps> = ({ selectedSchedule }) => {
  return (
    <>
      {schedules
        .filter(schedule => schedule.id === selectedSchedule)
        .flatMap(schedule => schedule.routes)
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
