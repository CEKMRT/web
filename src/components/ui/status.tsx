"use client"
import { MapIcon } from "@heroicons/react/16/solid";
import { ChartBarIcon } from "@heroicons/react/16/solid";
import { CodeBracketIcon } from "@heroicons/react/16/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import GeneralPopup from "../core/PopUpGeneral";
import { useState } from "react";

const StatusButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="flex flex-nowrap justify-center  gap-x-1 md:gap-x-4 text-xs md:text-base text-nowrap ">
      {/* <OnlineIndicator /> */}

      <a
        href="https://jakartamrt.co.id/sites/default/files/2020-09/Feb-2019%20%281%29.jpeg"
        target="_blank"
        className="flex gap-1 text-gray-500 hover:underline font-light md:font-medium content-['_↗'] align-middle	"
      >
        Peta
        <MapIcon className="h-4 w-4 " />
      </a>
      <a
        href="https://stats.uptimerobot.com/SGrhbYd1AL"
        target="_blank"
        className="text-gray-500 hover:underline font-medium flex gap-1 align-middle	"
      >
        Status
        <ChartBarIcon className="h-4 w-4 no-underline align-middle" />
      </a>
      <a
        href="/docs"
        className="text-gray-500 hover:underline font-medium flex gap-1 align-middle"
      >
        API
        <CodeBracketIcon className="h-4 w-4 no-underline align-middle" />
      </a>
      <button 
      className="text-gray-500 hover:underline font-medium flex gap-1 align-middle"
      onClick={handleOpenPopup}>Disclaimer</button>
      <GeneralPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        message="This is a disclaimer announcement!"
        
      />

      <a className="text-gray-500 hover:text-green-500 font-medium align-middle flex gap-1">
        V0.8.5 (Beta)
        <ExclamationTriangleIcon className="h-4 w-4 text-red-500 align-middle no-underline flex" />
      </a>
    </div>
  );
};

export default StatusButton;
