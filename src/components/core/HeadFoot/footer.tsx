// Footer.js
import StatusButton from "../../ui/status";
import MobileMenu from "./mobile";
import { ModeToggle } from "@/components/ui/themebutton";

export default function Footer() {
  return (
    <div className="relative bottom-0 w-full h-100 bg-gray-200 dark:bg-zinc-800 p-2 md:p-4 opacity-100 z-10">
      <StatusButton />
      <MobileMenu />
      <div className="fixed top-1 left-2 w-12 h-12 flex justify-center items-center opacity-40 hover:opacity-100 md:hidden">
        <div className="w-full h-full animate-fadeOut">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
