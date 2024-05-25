import { ModeToggle } from "../ui/themebutton";
import { NavigationMenuDemo } from "../ui/nav";
import { getCurrentTime } from "@/lib/utils/currentTime";

export default function Header() {
  return (
    <div className="bg-gray-200 space-y-4 dark:bg-zinc-800">
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 py-4 max-w-sm mx-auto bg-white shadow-md rounded-lg md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-neutral-800 dark:border-2 z-10">
        <ModeToggle />
        <h1 className="px-4 md:py-2 text-sm font-bold text-center">
          CekMRT{" "}
          <a className="font-normal md:text-lg text-sm">
            &#169; Copyright 2055 - PT. Yapping Jaya &nbsp; &nbsp;
          </a>
          <span className="text-3xl font-bold text-center mb-4">
            {getCurrentTime()}
          </span>
        </h1>
        <NavigationMenuDemo />
      </div>
    </div>
  );
}

