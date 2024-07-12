'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./3dcard";

interface NewsItemProps {
  item: MRTNewsItem;
}

export default function NewsItem({ item }: NewsItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white dark:bg-gray-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-black/[0.1] w-full h-auto rounded-lg p-4 border">
        <Link href={`https://jakartamrt.co.id${item.link}`} className="block">
          <CardItem
            translateZ="100"
            className="w-full"
          >
            <div className="relative aspect-video w-full">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
              )}
              <Image
                src={`https://jakartamrt.co.id${item.image}`}
                alt={item.title}
                fill
                className={`rounded-lg object-cover ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300 group-hover/card:shadow-xl`}
                onLoad={() => setImageLoaded(true)}
                unoptimized
              />
            </div>
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-md md:text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200 line-clamp-2"
          >
            {item.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-sm text-gray-400 dark:text-gray-400 mb-4"
          >
            {item.date}
          </CardItem>
          <CardItem
            translateZ="40"
            as="span"
            className="inline-block bg-emerald-500 dark:bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors duration-600"
          >
            Baca Lebih
          </CardItem>
        </Link>
      </CardBody>
    </CardContainer>
  );
}