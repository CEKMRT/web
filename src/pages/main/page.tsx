"use client";


import { ModeToggle } from "../../components/ui/modeToogle";

import { getCurrentTime } from "@/lib/utils/currentTime";
import BoxComp from "@/components/core/box";
import TombolStasiun from "@/components/core/listStasiun";
import SplineBg from "@/components/core/spline";
export default function Main() {
  return (
    
    <div className="min-h-screen space-y-4 dark:transparent  ">
      <ModeToggle />
      <TombolStasiun />
      <BoxComp />
      {/* <SplineBg/> */}
    </div>
  );
}

{
  /* <h1 className="text-3xl font-bold text-center mb-4">
        {getCurrentTime()}
      </h1> */
}
