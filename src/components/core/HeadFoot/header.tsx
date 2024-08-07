import { ModeToggle } from "../../ui/themebutton";
import { NavigationMenuDemo } from "../../ui/nav";
import Link from "next/link";
import RunningText from "./runningText";

export default function Header() {
  return (
    <div>
      <div
        className="bg-gray-200 dark:bg-zinc-800 relative z-20
        animate-flip-down animate-once animate-delay-200 animate-ease-in md:block hidden
        "
      >
        {/* <RunningText /> */}
        <div className="justify-center content-center place-content-evenly max-w-sm mx-auto bg-white shadow-md rounded-lg md:max-w-2xl px-4 dark:bg-black dark:border-neutral-800 dark:border-2 z-10 pb-2  sm:pb-0 relative">
          <ModeToggle />
          <div className="px-2 text-sm font-bold text-center flex-col ">
            <h1>MRT Jakarta </h1>
            <div className="text-3xl font-bold text-center">
              {/* {getCurrentTime()} */}
            </div>
            <h1 className="font-normal md:text-sm text-xs">
              Lacak Jadwal MRT secara Realtime -{">"} Made by{" "}
              <Link
                className="text-green-500 font-bold"
                target="_blank"
                href="https://github.com/CEKMRT"
              >
                Cek MRT
              </Link>
            </h1>
          </div>
          <NavigationMenuDemo />
        </div>
      </div>
    </div>
  );
}
