"use client";

import Image from "next/image";
import Link from "next/link";

export interface FeaturedNewsItem {
  date: string;
  title: string;
  imageUrl: string;
  link?: string;
}

interface FeaturedNewsProps {
  news: FeaturedNewsItem[];
}

export default function FeaturedNews({ news }: FeaturedNewsProps) {
  if (news.length < 3) return null;

  const [mainNews, ...sideNews] = news;

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-8">
      {/* Main featured item - 2/3 width */}
      <div className="md:w-2/3">
        <Link href={mainNews.link || "#"} className="block h-full">
          <div className="relative h-[calc(27rem+1.5rem)]">
            <Image
              src={mainNews.imageUrl}
              alt={mainNews.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/60">
              <p className="text-sm mb-1">{mainNews.date}</p>
              <h3 className="text-xl font-bold">{mainNews.title}</h3>
            </div>
          </div>
        </Link>
      </div>

      {/* Side items - 1/3 width with spacing */}
      <div className="md:w-1/3 flex flex-col gap-2">
        {sideNews.slice(0, 2).map((item, index) => (
          <Link key={index} href={item.link || "#"} className="block">
            <div className="relative h-[14rem]">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/60">
                <p className="text-sm mb-1">{item.date}</p>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
