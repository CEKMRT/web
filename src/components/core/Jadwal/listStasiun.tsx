import React, { useEffect, useState } from "react";

interface TombolStasiunProps {
  onSelectStation: (station: string) => void;
  isOpen: boolean;
  activeStations: string[];
  onClearAll: () => void;
}

interface ButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, active, children }) => {
  return (
    <div className="flex flex-wrap grow shrink space-x-20">
      <button
        onClick={onClick}
        className={`flex-1 grow shrink px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium border transition transform delay-100 duration-300 ease-in-out
      ${
        active
          ? "text-white bg-green-600 border-green-700 scale-105 shadow-lg"
          : "text-black bg-slate-50 border-slate-200 hover:bg-gray-400 hover:text-white hover:scale-110 hover:shadow-xl dark:border-slate-800 dark:text-white dark:bg-zinc-800 dark:border-2"
      }
      ${active ? "no-animation animate-none	" : ""}
      `}
      >
        {children}
      </button>
    </div>
  );
};

const TombolStasiun: React.FC<TombolStasiunProps> = ({
  onSelectStation,
  isOpen,
  activeStations,
  onClearAll,
}) => {
  const [localActiveStations, setLocalActiveStations] =
    useState<string[]>(activeStations);

  useEffect(() => {
    setLocalActiveStations(activeStations);
  }, [activeStations]);

  if (!isOpen) return null;

  const handleSelectStation = (station: string) => {
    setLocalActiveStations((prevActiveStations) =>
      prevActiveStations.includes(station)
        ? prevActiveStations.filter((s) => s !== station)
        : [...prevActiveStations, station]
    );
    onSelectStation(station);
  };

  const isActive = (station: string): boolean =>
    localActiveStations.includes(station);

  const stations = [
    "Bundaran HI",
    "Dukuh Atas BNI",
    "Setiabudi Astra",
    "Bendungan Hilir",
    "Istora Mandiri",
    "Senayan Mastercard",
    "ASEAN",
    "Blok M BCA",
    "Blok A",
    "Haji Nawi",
    "Cipete Raya",
    "Fatmawati Indomaret",
    "Lebak Bulus Grab",
  ];

  return (
    <div
      className="relative overflow-hidden
    animate-fade-down animate-once animate-duration-500 animate-delay-100 animate-ease-in"
    >
      <div
        className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-b-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10
      
      "
      >
        {stations.map((station) => (
          <Button
            key={station}
            onClick={() => handleSelectStation(station)}
            active={isActive(station)}
          >
            {station}
          </Button>
        ))}
        <button
          onClick={onClearAll}
          className="px-4 py-2 rounded-md text-sm text-white bg-gray-600 hover:bg-red-700
          hover:animate-spin animate-once animate-ease-in"
        >
          Reset Stasiun
        </button>
      </div>
      <div className="flex justify-center mt-4"></div>
    </div>
  );
};

export default TombolStasiun;
