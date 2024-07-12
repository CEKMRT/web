"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollAnimation from "../framer/animation";
import { fadeInUpVariants } from "../framer/anima";

interface NewsItemProps {
  item: MRTNewsItem;
}

export default function NewsItem({ item }: NewsItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <ScrollAnimation variants={fadeInUpVariants}>
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`https://jakartamrt.co.id${item.link}`}>
        <div className="relative aspect-video w-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
          )}
          <Image
            src={`https://jakartamrt.co.id${item.image}`}
            alt={item.title}
            fill
            // objectFit="cover"
            className={`transition-transform duration-300 hover:scale-105 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            // unoptimized
          />
        </div>
        <div className="p-2 md:p-6">
          <h3 className="text-md md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-400 md:mb-4">
            {item.date}
          </p>
          <span
            className="md:inline-block bg-emerald-500 dark:bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors duration-300 hidden"
          >
            Baca Lebih
          </span>
        </div>
      </Link>
    </div>
    </ScrollAnimation>
  );
}
