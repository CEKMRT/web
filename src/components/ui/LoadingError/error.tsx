import React from "react";
import { Skeleton } from "../skeleton";

interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
      <Skeleton className="w-[450px] h-[20px] rounded-full" />
      <Skeleton className="h-[125px] w-[550px] rounded-xl bg-red-800/60 dark:bg-red-800" />
      <div className="space-y-2">
        <h1 className="font-medium text-slate-600/80 dark:text-red-800/60">
          Gagal Menampilkan Data -{" "}
          <span className="text-red-800">{errorMessage}</span>
        </h1>
      </div>
    </div>
  );
};

export default ErrorComponent;
