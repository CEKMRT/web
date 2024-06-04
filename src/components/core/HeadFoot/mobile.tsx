"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MobileMenu: React.FC = () => {
  const currentPath = usePathname();
  return (
    <div className="block md:hidden fixed bottom-0 pb-6 left-0 w-full bg-gray-100 dark:bg-zinc-900 shadow-md py-2 text-center z-10 rounded-t-lg animate-flip-up animate-ease-in">
      <nav className="flex flex-wrap justify-center text-sm space-x-4">
        <Link
          href="/"
          className={currentPath === "/" ? "text-green-500" : "text-slate-600"}
        >
          Jadwal
        </Link>
        <Link
          href="/bantuan"
          className={
            currentPath === "/bantuan" ? "text-green-500" : "text-slate-600"
          }
        >
          Bantuan
        </Link>
        <Link
          href="/ai"
          className={
            currentPath === "/ai"
              ? "text-green-500 font-semibold"
              : "text-slate-600"
          }
        >
          MRT AI{" "}
          <span className="font-base text-xs row">
            <sup
              className={
                currentPath === "/ai" 
                  ? "text-green-500 font-light "
                  : "text-slate-600"
              }
            >
              by CekMRT
            </sup>
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
