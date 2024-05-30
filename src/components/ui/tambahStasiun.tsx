import React, { useState } from "react";
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/16/solid";

type TambahStationProps = {
  onClick: () => void;
};

const TambahStation: React.FC<TambahStationProps> = ({ onClick }) => {
  const [isUp, setIsUp] = useState(false);

  const handleClick = () => {
    setIsUp(!isUp);
    onClick();
  };

  return (
    <div onClick={handleClick} className="relative">
      <div
        className={`flex items-center justify-center gap-4 md:py-4 py-2 max-w-sm mx-auto shadow-md rounded-t-full md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10
        animate-fade animate-once animate-duration-1000 animate-delay-[1200ms] animate-ease-in
                      ${
                        !isUp
                          ? "bg-white rounded-full"
                          : "bg-green-600 text-white rounded-t-ful"
                      }`}
      >
        <div className="mx-auto my-auto text-center flex items-center justify-center gap-4 font-medium">
          <div
            className={`transition-transform duration-1000  ${
              isUp ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDoubleDownIcon
              className="size-3 md:size-4 animate-bounce"
              style={{ opacity: isUp ? 1 : 0, verticalAlign: "middle" }}
            />
          </div>
          <h1 className="font-medium text-xs md:text-base ">
            Pilih Stasiun Keberangkatan Kamu
          </h1>
          <div
            className={`transition-transform duration-1000   ${
              !isUp ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDoubleUpIcon
              className="size-3 md:size-4 animate-bounce"
              style={{ opacity: !isUp ? 1 : 0, verticalAlign: "middle" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TambahStation;
