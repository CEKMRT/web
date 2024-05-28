import SplineBg from "@/components/core/spline";
import Spline from "@splinetool/react-spline";
const Page = () => {
  return (
    <div className="p-4 relative overflow-hidden">
      <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <h1>Akan Hadir Dokumentasi Teknologi</h1>;
        <div className="h-screen flex items-center justify-center">
          <div
            className="bg-white dark:bg-p-2 rounded-lg
          dark:bg-zinc-900 dark:border-slate-800 dark:border-2"
          >
            <SplineBg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
