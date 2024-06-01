// components/MobileMenu.tsx
import Link from "next/link";
import { ModeToggle } from "@/components/ui/themebutton";
const MobileMenu: React.FC = () => {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-zinc-900 shadow-md py-2 text-center z-50 rounded-t-lg animate-flip-up animate-ease-in">
      <nav className="flex flex-wrap justify-center text-sm">
        <Link href="/">
          <button className="text-gray-600 dark:text-gray-200 hover:text-black m-2">Jadwal</button>
        </Link>
        <Link href="/">
          <button className="text-gray-600 dark:text-gray-600 hover:text-black m-2">
            Stasiun
          </button>
        </Link>
        <div className="relative m-2  ">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-black dark:text-gray-600 absolute bottom-full left-1/2 transform -translate-x-1/2 overflow-hidden flex justify-center items-center border-2 border-emerald-900">
            <div className="mb-4 dark:bg-black">
              <ModeToggle />
            </div>
          </div>
        </div>
        <Link href="/">
          <button className="text-gray-600 dark:text-gray-600 hover:text-black m-2">
            Bantuan
          </button>
        </Link>
        <Link href="/">
          <button className="text-gray-600 dark:text-gray-600 hover:text-black m-2">
            Teknologi
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
