"use client";

import Link from "next/link";
import Image from "next/image";

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
    <div className="max-w-[1230px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold uppercase text-[#003277]">{title}</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center bg-[#003277] text-white rounded">
            ←
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#003277] text-white rounded">
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <Link key={index} href={video.videoUrl} className="group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#003277] border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-500">{video.date}</p>
              <h3 className="text-lg font-medium mt-1">{video.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
