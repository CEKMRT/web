/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";

const RunningText: React.FC = () => {
  const texts = [
    <span>
      Pengubahan Alur Pelanggan di Stasiun Lebak Bulus Grab{" "}
      <a
        href="https://www.instagram.com/p/C8HJwNSSlpP/?img_index=1"
        className="text-green-400 hover:underline"
      >
        lihat lebih...
      </a>
    </span>,
    <span>
      Rayakan HUT Kota Jakarta Bersama MRT Jakarta di Taman Literasi{" "}
      <a
        href="https://www.instagram.com/p/C8Eup_bvxrZ/?img_index=2"
        className="text-green-400 hover:underline"
      >
        lihat lebih...
      </a>
    </span>,
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showRunningText, setShowRunningText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 20000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setShowRunningText(false);
  };

  if (!showRunningText) {
    return null; // If showRunningText is false, don't render anything (component is closed)
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-800 dark:bg-slate-900 py-2 rounded-b-md">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 mr-2 mt-1 text-white cursor-pointer"
      >
        &times;
      </button>
      <div className="whitespace-nowrap animate-marquee text-white text-xs md:font-medium md:text-md">
        {texts[currentTextIndex]}
      </div>
    </div>
  );
};

export default RunningText;
