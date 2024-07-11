"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsItemProps {
  item: MRTNewsItem;
}

export default function NewsItem({ item }: NewsItemProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video w-full">
        <Link href={`https://jakartamrt.co.id${item.link}`}>
          <Image
            src={`https://jakartamrt.co.id${item.image}`}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{item.date}</p>
        <a
          href={`https://jakartamrt.co.id${item.link}`}
          className="md:inline-block bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition-colors duration-300 hidden"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baca Lebih
        </a>
      </div>
    </div>
  );
}
