import { ModeToggle } from "../ui/themebutton";
import { NavigationMenuDemo } from "../ui/nav";
// import { getCurrentTime } from "@/lib/utils/currentTime";

export default function Header() {
  return (
    <div className="bg-gray-200 space-y-4 dark:bg-zinc-800">
      <div className="justify-center content-center place-content-evenly gap-4 py-4 max-w-sm mx-auto bg-white shadow-md rounded-lg md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-neutral-800 dark:border-2 z-10">
        <ModeToggle />
        <div className="px-4 text-sm font-bold text-center flex-col pb-2">
          <h1>CekMRT </h1>
          <div className="text-3xl font-bold text-center">
            {/* {getCurrentTime()} */}
          </div>
          <a className="font-normal md:text-xs text-sm">
            &#169; Copyright 2055 - PT. Yapping Jaya &nbsp; &nbsp;
          </a>
        </div>
        <NavigationMenuDemo />
      </div>
    </div>
  );
}
