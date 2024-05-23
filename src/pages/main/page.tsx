"use client";
import ScheduleComponent from "../../lib/jadwal";
import Top from "../../../kuburan/top";

import { ModeToggle } from "../../components/ui/modeToogle";

import { getCurrentTime } from "@/lib/utils/currentTime";
import BoxComp from "@/components/box";
import TombolStasiun from "@/components/listStasiun";
import SplineBg from "@/components/spline";
export default function Main() {
  return (
    <div className="min-h-screen space-y-4 dark:transparent  ">
        <ModeToggle />
        <TombolStasiun/>
        <BoxComp/>
        <SplineBg/>


      {/* <Top/> */}
      {/* <ScheduleComponent /> */}
    </div>
  );
}

      {/* <h1 className="text-3xl font-bold text-center mb-4">
        {getCurrentTime()}
      </h1> */}