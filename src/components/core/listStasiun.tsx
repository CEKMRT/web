import { useState } from "react";
import Button from "../ui/button1";
import { ModeToggle } from "../ui/themebutton";
import { NavigationMenuDemo } from "../ui/nav";


interface TombolStasiunProps {
  onSelectStation: (station: string) => void;
  isOpen: boolean;

}

const TombolStasiun: React.FC<TombolStasiunProps> = ({ onSelectStation, isOpen }) => {
  // State to track active stations
  const [activeStations, setActiveStations] = useState<string[]>([]);
  if (!isOpen) return null;

  // Function to handle station selection
  const handleSelectStation = (station: string) => {
    // Toggle the active state of the station
    toggleActive(station);
    // Call the provided onSelectStation function
    onSelectStation(station);
  };

  // Function to toggle active state of a station
  const toggleActive = (station: string) => {
    setActiveStations((prevActiveStations) => {
      // Check if station is already active
      const isActive = prevActiveStations.includes(station);
      // If active, remove it from the list, otherwise add it
      return isActive
        ? prevActiveStations.filter((s) => s !== station)
        : [...prevActiveStations, station];
    });
  };

  // Function to determine if a station is active
  const isActive = (station: string): boolean => {
    return activeStations.includes(station);
  };

  return (
    <div>
        <div className="relative overflow-hidden">
        <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-b-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
          <Button
            onClick={() => handleSelectStation("Bundaran HI")}
            active={isActive("Bundaran HI")}
          >
            Bundaran HI
          </Button>
          <Button
            onClick={() => handleSelectStation("DukuhAtas")}
            active={isActive("DukuhAtas")}
          >
            Dukuh Atas BNI
          </Button>
          {/* Repeat for other buttons */}
          <Button
            onClick={() => handleSelectStation("Setiabudi")}
            active={isActive("Setiabudi")}
          >
            Setiabudi Astra
          </Button>
          <Button
            onClick={() => handleSelectStation("Benhil")}
            active={isActive("Benhil")}
          >
            Bendungan Hilir
          </Button>
          <Button
            onClick={() => handleSelectStation("Mandiri")}
            active={isActive("Mandiri")}
          >
            Istora Mandiri
          </Button>
          <Button
            onClick={() => handleSelectStation("Senayan")}
            active={isActive("Senayan")}
          >
            Senayan
          </Button>
          <Button
            onClick={() => handleSelectStation("Asean")}
            active={isActive("Asean")}
          >
            Asean
          </Button>
          <Button
            onClick={() => handleSelectStation("Blok M")}
            active={isActive("Blok M")}
          >
            Blok M
          </Button>
          <Button
            onClick={() => handleSelectStation("Blok A")}
            active={isActive("Blok A")}
          >
            Blok A
          </Button>
          <Button
            onClick={() => handleSelectStation("Haji Nawi")}
            active={isActive("Haji Nawi")}
          >
            Haji Nawi
          </Button>
          <Button
            onClick={() => handleSelectStation("Cipete")}
            active={isActive("Cipete")}
          >
            Cipete Raya
          </Button>
          <Button
            onClick={() => handleSelectStation("Fatmawati")}
            active={isActive("Fatmawati")}
          >
            Fatmawati
          </Button>
          <Button
            onClick={() => handleSelectStation("Lebak Bulus")}
            active={isActive("Lebak Bulus")}
          >
            Lebak Bulus Grab
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TombolStasiun;
