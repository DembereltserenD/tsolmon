"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export interface NewsItem {
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

interface NewsGridProps {
  news: NewsItem[];
  showAdminControls?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => Promise<void>;
}

export default function NewsGrid({ news, showAdminControls, onEdit, onDelete }: NewsGridProps) {
  if (!news.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {news.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <div className="relative">
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
                <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2 group-hover:text-[#003277]">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </Link>
            {showAdminControls && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => onEdit?.(item.id)}
                  className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(item.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
