"use client";
import React, { useState, useEffect } from "react";
import { XMarkIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import ScrollAnimation from "@/components/framer/animation";
import {
  fadeInLeftVariants,
  fadeInUpVariants,
} from "@/components/framer/anima";

interface NewsItem {
  title: string;
  link: string;
  date: string;
  source: string;
}

const RunningText: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showRunningText, setShowRunningText] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news items");
        }
        const data: NewsItem[] = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Error fetching news items:", error);
      }
    };

    fetchNewsItems();
  }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 20000); // Change text every 20 seconds

    return () => clearInterval(interval);
  }, [newsItems]);

  const handleToggle = () => {
    setShowRunningText((prev) => !prev);
  };

  if (newsItems.length === 0) {
    return null;
  }

  const currentItem = newsItems[currentTextIndex];

  return (
    <>
      {showRunningText ? (
        <ScrollAnimation variants={fadeInLeftVariants}>
          <button
            onClick={handleToggle}
            className=" opacity-50 hover:opacity-100 fixed top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 md:py-2 px-2 md:px-4 rounded-full flex items-center transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Buka running text"
          >
            <NewspaperIcon className="h-5 w-5 mr-2" />
            Berita
          </button>
        </ScrollAnimation>
      ) : (
        <ScrollAnimation variants={fadeInUpVariants}>
          <div className="relative w-full overflow-hidden bg-gray-800 dark:bg-slate-900 py-2 rounded-b-md transition-all duration-300 ease-in-out">
            <button
              onClick={handleToggle}
              className="z-50 absolute top-1/2 transform -translate-y-1/2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded flex items-center transition-colors duration-200"
              aria-label="Tutup running text"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Tutup
            </button>
            <div className="whitespace-nowrap animate-marquee text-white text-xs md:text-sm lg:text-base px-4 py-1 -z-10">
              <a
                href={`https://jakartamrt.co.id/${currentItem.link}`}
                className="mr-4 z-0"
              >
                {currentItem.source} - {currentItem.date} - {currentItem.title}
              </a>
              <a
                href={`https://jakartamrt.co.id/${currentItem.link}`}
                className="text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Informasi Detail...
              </a>
            </div>
          </div>
        </ScrollAnimation>
      )}
    </>
  );
};

export default RunningText;
