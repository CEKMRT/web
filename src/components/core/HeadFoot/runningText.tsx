"use client";
import React, { useState, useEffect } from "react";

interface NewsItem {
  title: string;
  link: string;
  date: string;
  image: string;
}

const RunningText: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showRunningText, setShowRunningText] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news items');
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

  const handleClose = () => {
    setShowRunningText(false);
  };

  if (!showRunningText || newsItems.length === 0) {
    return null;
  }

  const currentItem = newsItems[currentTextIndex];

  return (
    <div className="relative w-full overflow-hidden bg-gray-800 dark:bg-slate-900 py-2 rounded-b-md">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 mr-2 mt-1 text-white cursor-pointer"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="whitespace-nowrap animate-marquee text-white text-xs md:font-medium md:text-md px-4">
        <span>{currentItem.title}{" "}
          <a
            href={`https://jakartamrt.co.id/${currentItem.link}`}
            className="text-green-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Informasi Detail...
          </a>
        </span>
      </div>
    </div>
  );
};

export default RunningText;