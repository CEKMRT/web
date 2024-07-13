'use client';
import { useState, useEffect } from "react";
import TombolStasiun from "@/components/core/Jadwal/listStasiun";
import BoxComp from "@/components/core/Jadwal/routeJadwal";
import TambahStation from "@/components/ui/tambahStasiun";
import CookiesPopup from "@/components/core/Popups/CookiesPopup";
import ScrollAnimation from "@/components/framer/animation";
import { bounceVariants } from "@/components/framer/anima";

const MainPage: React.FC = () => {
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isTombolStasiunOpen, setIsTombolStasiunOpen] =
    useState<boolean>(false);

  // Load from localStorage when the component mounts
  useEffect(() => {
    const savedSchedules = localStorage.getItem("selectedSchedules");
    if (savedSchedules) {
      setSelectedSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  // Save to localStorage whenever selectedSchedules changes
  useEffect(() => {
    localStorage.setItem(
      "selectedSchedules",
      JSON.stringify(selectedSchedules)
    );
  }, [selectedSchedules]);

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

  const handleClearAll = () => {
    setSelectedSchedules([]);
    localStorage.removeItem("selectedSchedules");
  };

  return (
    <div className="space-y-2 min-h-screen bg-gray-200 pt-2 dark:bg-zinc-800 no-scrollbar overflow-y-auto pb-16">
      <ScrollAnimation variants={bounceVariants} className="space-y-0">
        <CookiesPopup />
        <TambahStation onClick={handleTambahStationClick} />
        {isTombolStasiunOpen && (
          <div className="transition-opacity duration-2000 ease-in-out opacity-100 animate-pulse">
            <TombolStasiun
              onSelectStation={handleSelectStation}
              isOpen={isTombolStasiunOpen}
              activeStations={selectedSchedules}
              onClearAll={handleClearAll}
            />
          </div>
        )}
      </ScrollAnimation>
      
      {selectedSchedules.map((schedule) => (
        <BoxComp key={schedule} selectedSchedule={schedule} />
      ))}
    </div>
  );
};

export default MainPage;
