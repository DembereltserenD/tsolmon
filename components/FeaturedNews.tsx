"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export interface FeaturedNewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string;
  published_at: string;
  category: {
    name: string;
    slug: string;
  };
}

interface FeaturedNewsProps {
  news: FeaturedNewsItem[];
}

export default function FeaturedNews({ news }: FeaturedNewsProps) {
  if (!news.length) return null;

  const mainNews = news[0];
  const sideNews = news.slice(1, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Main featured news */}
      <Card className="lg:col-span-2 overflow-hidden group">
        <Link href={`/news/${mainNews.slug}`} className="block">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={mainNews.featured_image}
              alt={mainNews.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-block bg-[#003277] text-white text-xs px-2 py-1 rounded">
                {mainNews.category.name}
              </span>
              <span className="text-gray-500 text-xs py-1">
                {new Date(mainNews.published_at).toLocaleDateString('mn-MN')}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-[#003277]">
              {mainNews.title}
            </h3>
            {mainNews.excerpt && (
              <p className="text-gray-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                {mainNews.excerpt}
              </p>
            )}
          </div>
        </Link>
      </Card>

      {/* Side news */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
        {sideNews.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <Link href={`/news/${item.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-block bg-[#003277] text-white text-xs px-2 py-1 rounded">
                    {item.category.name}
                  </span>
                  <span className="text-gray-500 text-xs py-1">
                    {new Date(item.published_at).toLocaleDateString('mn-MN')}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold line-clamp-2 group-hover:text-[#003277]">
                  {item.title}
                </h3>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
