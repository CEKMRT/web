"use client";

import { ModeToggle } from "../../components/ui/modeToogle";
import { useState } from "react";
import { getCurrentTime } from "@/lib/utils/currentTime";
import TombolStasiun from "@/components/core/listStasiun";
import BoxComp from "@/components/core/box";
import SplineBg from "@/components/core/spline";

const MainPage: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

  return (
    <div className="min-h-screen space-y-4 dark:transparent">
      <TombolStasiun onSelectStation={setSelectedSchedule} />
      <BoxComp selectedSchedule={selectedSchedule} />
    </div>
  );
};

export default MainPage;

{
  /* <h1 className="text-3xl font-bold text-center mb-4">
        {getCurrentTime()}
      </h1> */
}
