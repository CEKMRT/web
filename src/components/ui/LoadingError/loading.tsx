import React from "react";
import { Skeleton } from "../skeleton";

interface LoadingComponentProps {
  randomWidth: number;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ randomWidth }) => {
  return (
    <div className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 md:py-4 py-2 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4 dark:bg-zinc-900 dark:border-slate-800 dark:border-2 z-10">
      <Skeleton
        className="h-4 custom-width"
        style={{ "--tw-custom-width": `${randomWidth}px` } as any}
      />{" "}
      <Skeleton className="h-[125px] w-[550px] rounded-xl" />
      <Skeleton
        className="h-8 custom-width"
        style={{ "--tw-custom-width": `${randomWidth}px` } as any}
      />
      <div className="space-y-2">
        <Skeleton
          className="h-4 custom-width"
          style={{ "--tw-custom-width": `${randomWidth}px` } as any}
        />{" "}
        <Skeleton
          className="h-4 custom-width"
          style={{ "--tw-custom-width": `${randomWidth}px` } as any}
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
