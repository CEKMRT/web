"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const MobileMenu: React.FC = () => {
  const currentPath = usePathname();
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 w-full h-12 flex items-center justify-center bg-gray-100 dark:bg-zinc-900 py-2 text-center z-10 
    rounded-t-lg border-gray-200 shadow-lg
    
    animate-flip-up animate-ease-in"
    >
      <nav className="flex flex-wrap justify-center items-center text-sm">
        <Link
          href="/"
          className={`flex-1 text-center ${
            currentPath === "/" ? "text-green-500" : "text-slate-600"
          }`}
        >
          Jadwal
        </Link>
        <Link
          href="https://jakartamrt.co.id/id/promo"
          target="_blank"
          className={`flex-1 text-center ${
            currentPath === "https://jakartamrt.co.id/id/promo"
              ? "text-green-500"
              : "text-slate-600"
          }`}
        >
          Promo
        </Link>
        <Link
          href="/ai"
          className={`flex-1 text-center ${
            currentPath === "/ai"
              ? "text-green-500 font-semibold"
              : "text-slate-600"
          }`}
        >
          MRT AI
          <span className="relative inline-block">
            
            <sup
              className={`relative inline-block -top-1 -right-1 ${
                currentPath === "/ai"
                  ? "text-green-500 font-light"
                  : "text-slate-600"
              }`}
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
