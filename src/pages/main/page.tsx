"use client";
import { useState } from "react";
import TombolStasiun from "@/components/core/listStasiun";
import BoxComp from "@/components/core/box";
import TambahStation from "@/components/ui/tambahStasiun";

const MainPage: React.FC = () => {
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isTombolStasiunOpen, setIsTombolStasiunOpen] = useState<boolean>(false);

  const handleTambahStationClick = () => {
    setIsTombolStasiunOpen((prevState) => !prevState);
  };

  const handleSelectStation = (station: string) => {
    setSelectedSchedules((prevSelectedSchedules) => 
      prevSelectedSchedules.includes(station)
        ? prevSelectedSchedules.filter((s) => s !== station)
        : [...prevSelectedSchedules, station]
    );
  };

  return (
    <div className="space-y-2 min-h-screen bg-gray-200 pt-2 dark:bg-zinc-800 no-scrollbar overflow-y-auto">
      <div className="space-y-0">
        <TambahStation onClick={handleTambahStationClick} />
        {isTombolStasiunOpen && (
          <div className="transition-opacity duration-2000 ease-in-out opacity-100 animate-pulse">
            <TombolStasiun
              onSelectStation={handleSelectStation}
              isOpen={isTombolStasiunOpen}
            />
          </div>
        )}
      </div>

      {selectedSchedules.map((schedule) => (
        <BoxComp key={schedule} selectedSchedule={schedule} />
      ))}
    </div>
  );
};

export default MainPage;
