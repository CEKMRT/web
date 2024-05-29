import { useState } from "react";
import Button from "../ui/button1";

interface TombolStasiunProps {
  onSelectStation: (station: string) => void;
  isOpen: boolean;
}

const TombolStasiun: React.FC<TombolStasiunProps> = ({
  onSelectStation,
  isOpen,
}) => {
  const [activeStations, setActiveStations] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSelectStation = (station: string) => {
    setActiveStations((prevActiveStations) =>
      prevActiveStations.includes(station)
        ? prevActiveStations.filter((s) => s !== station)
        : [...prevActiveStations, station]
    );
    onSelectStation(station);
  };

  const isActive = (station: string): boolean =>
    activeStations.includes(station);

  const stations = [
    "Bundaran HI",
    "DukuhAtas",
    "Setiabudi",
    "Benhil",
    "Mandiri",
    "Senayan",
    "Asean",
    "Blok M",
    "Blok A",
    "Haji Nawi",
    "Cipete",
    "Fatmawati",
    "Lebak Bulus",
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-b-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        {stations.map((station) => (
          <Button
            key={station}
            onClick={() => handleSelectStation(station)}
            active={isActive(station)}
          >
            {station}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default TombolStasiun;
