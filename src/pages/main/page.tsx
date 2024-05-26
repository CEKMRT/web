"use client";
// import { ModeToggle } from "../../components/ui/modeToogle";
import { useState } from "react";
// import { getCurrentTime } from "@/lib/utils/currentTime";
import TombolStasiun from "@/components/core/listStasiun";
import BoxComp from "@/components/core/box";
import TambahStation from "@/components/ui/tambahStasiun";

const MainPage: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [isTombolStasiunOpen, setIsTombolStasiunOpen] =
    useState<boolean>(false);

  const handleTambahStationClick = () => {
    setIsTombolStasiunOpen((prevState) => !prevState);
    // console.log("Tambah Station clicked");
  };

  return (
    <div className="space-y-2 min-h-screen bg-gray-200 pt-2 dark:bg-zinc-800 no-scrollbar overflow-y-auto">
      <div className="space-y-0">
        <TambahStation onClick={handleTambahStationClick} />
        {isTombolStasiunOpen && (
          <div className="transition-opacity duration-2000 ease-in-out opacity-100 animate-pulse">
            <TombolStasiun
              onSelectStation={setSelectedSchedule}
              isOpen={isTombolStasiunOpen}
            />
          </div>
        )}
      </div>

      <BoxComp selectedSchedule={selectedSchedule} />
    </div>
  );
};
export default MainPage;
