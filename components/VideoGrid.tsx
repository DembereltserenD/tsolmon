"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface VideoItem {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
}

interface VideoGridProps {
  title: string;
  videos: VideoItem[];
}

export default function VideoGrid({ title, videos }: VideoGridProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold text-[#003277]">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video, index) => (
          <Card key={index} className="overflow-hidden group">
            <Link href={video.videoUrl} className="block">
              <div className="relative aspect-video w-full">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#003277] border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium line-clamp-2 group-hover:text-[#003277]">
                  {video.title}
                </h4>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(video.date).toLocaleDateString('mn-MN')}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
