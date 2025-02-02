"use client";

import Image from "next/image";
import Link from "next/link";

export interface NewsItem {
  date: string;
  title: string;
  imageUrl: string;
  link?: string;
}

interface NewsGridProps {
  news: NewsItem[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <Link key={index} href={item.link || "#"}>
          <div className="relative aspect-[16/9]">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">{item.date}</p>
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
