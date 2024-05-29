import React from "react";

type TambahStationProps = {
  onClick: () => void;
};

const TambahStation: React.FC<TambahStationProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="relative">
      <div className="flex items-center justify-center gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <div className="mx-auto my-auto text-center flex items-center justify-center gap-4 font-medium">
          <h1 className="font-medium"> Pilih Stasiun Keberangkatan Kamu </h1>
          {/* <OnlineIndicator /> */}
          {/* <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold px-auto mx-4 rounded"
          >
            Cari
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TambahStation;
