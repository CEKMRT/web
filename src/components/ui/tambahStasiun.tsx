import OnlineIndicator from "./indicator";

const TambahStation = ({  })  => {
  return (
    <div className="p-2 relative overflow-hidden">
      <div className="flex items-center justify-center gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
        <div className="mx-auto my-auto text-center flex items-center justify-center gap-4 font-medium">
          <h1> Pilih Stasiun Kamu </h1>
            {/* <OnlineIndicator /> */}

        </div>
      </div>
    </div>
  );
};

export default TambahStation;
