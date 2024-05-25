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
    <div className="min-h-screen bg-gray-200 space-y-4 dark:bg-zinc-800 no-scrollbar overflow-y-auto">
      <TombolStasiun onSelectStation={setSelectedSchedule} />
      <BoxComp selectedSchedule={selectedSchedule} />
      {/* <a data-theme="dark" data-layers="1,2,3,4" data-stack-embed="true" href="https://embed.stackshare.io/stacks/embed/18534deb60d088567033cd19bf09f1"></a><script async src="https://cdn1.stackshare.io/javascripts/client-code.js" charSet="utf-8"></script> */}
      {/* <SplineBg /> */}
    </div>
  );
};

export default MainPage;

{
  /* <h1 className="text-3xl font-bold text-center mb-4">
        {getCurrentTime()}
      </h1> */
}
