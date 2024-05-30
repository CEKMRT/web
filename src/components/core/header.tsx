import { ModeToggle } from "../ui/themebutton";
import { NavigationMenuDemo } from "../ui/nav";
import Link from "next/link";
// import { getCurrentTime } from "@/lib/utils/currentTime";

export default function Header() {
  return (
    <div className="bg-gray-200 space-y-4 dark:bg-zinc-800 relative">
      <div className="justify-center content-center place-content-evenly max-w-sm mx-auto bg-white shadow-md rounded-lg md:max-w-2xl px-4 dark:bg-gray-900 dark:border-neutral-800 dark:border-2 z-10 relative">
        <ModeToggle />
        <div className="px-4 text-sm font-bold text-center flex-col ">
          <h1>MRT Jakarta </h1>
          <div className="text-3xl font-bold text-center">
            {/* {getCurrentTime()} */}
          </div>
          <h1 className="font-normal md:text-sm text-xs">
           Lacak Jadwal MRT secara Realtime -{">"} Made by <Link className="text-green-500 font-bold" target="_blank" href="https://github.com/CEKMRT">Cek MRT</Link>
          </h1>
        </div>
        <NavigationMenuDemo />
      </div>
    </div>
  );
}
