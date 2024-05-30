"use client";
import CodeBlockk from "@/components/ui/codeBlock";
import DownloadButton from "@/components/ui/downloadjson";
import Link from "next/link";


const Page = () => {
  return (
    <div className="p-4 relative overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <h1>Akan Hadir Dokumentasi API</h1>
        <p>
          Akses Link API
          <Link
            rel="stylesheet"
            href="https://mrt-production.up.railway.app/api/schedules"
            target="_blank"
            className="font-bold"
          >
            {" "}
            Disini
          </Link>
        </p>
        {/* <CodeBlockk /> */}
        <div>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
