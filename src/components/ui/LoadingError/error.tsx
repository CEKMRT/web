import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <div className="max-w-72 mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl dark:bg-zinc-950 border-1 dark:border-neutral-800 dark:border-2 z-10 animate-fade-up animate-once animate-delay-200 animate-ease-in">
      <div className="p-6 relative">
        <div className="flex justify-center w-full">
          <div className="rounded-lg animate-fade-right animate-once animate-delay-[800ms] animate-ease-in text-center w-16 h-4 bg-red-300 dark:bg-red-700"></div>
          <ChevronDoubleRightIcon
            className="size-4 md:size-6 sm:mx-2 animate-fade-right animate-once animate-delay-[500ms] animate-ease-in"
            style={{ verticalAlign: "middle" }}
          />
          <div className="rounded-lg animate-fade-left animate-once animate-delay-[1000ms] animate-ease-in text-center w-16 h-4 bg-red-300 dark:bg-red-700"></div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-auto pt-4 pb-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="py-2 rounded-full bg-red-200 dark:bg-slate-800 text-red-800 dark:text-red-200 animate-fade animate-once animate-delay-1000 animate-ease-in w-full h-6"
            ></div>
          ))}
        </div>
        <div
          className={`flex grow justify-around items-center p-2 rounded-b absolute inset-x-0 bottom-0 index-10 transition-colors duration-1000 ease-in-out 
          animate-flip-up animate-once animate-ease-in px-2 bg-red-200 dark:bg-slate-800 text-red-800 dark:text-red-200`}
        >
          <div className="rounded-lg text-xs md:text-sm dark:font-medium w-16 h-4 bg-red-300 dark:bg-red-700"></div>
          <div className="rounded-lg text-xs md:text-sm font-bold hidden sm:block w-16 h-4 bg-red-300 dark:bg-red-700"></div>
          <div className=" rounded-lg text-xs md:text-base dark:font-medium w-16 h-4 bg-red-300 dark:bg-red-700"></div>
          <div className=" rounded-lg text-xs md:text-sm dark:font-medium w-16 h-4 bg-red-300 dark:bg-red-700"></div>
          <div className=" rounded-lg text-xs md:text-sm font-bold w-16 h-4 bg-red-300 dark:bg-red-700"></div>
        </div>

        {/* Show more button */}
        {/* <div className="mb-6 md:mb-7">
          <div className="bg-red-200 dark:bg-slate-800 hover:dark:bg-emerald-700 hover:bg-green-500 text-white px-2 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-full mx-auto block w-24 h-8"></div>
          <div className="bg-red-200 dark:bg-slate-800 hover:dark:bg-red-900 hover:bg-red-600 text-white px-2 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-full mx-auto block w-24 h-8 mt-2"></div>
        </div> */}
      </div>
    </div>
  );
};

export default ErrorComponent;
