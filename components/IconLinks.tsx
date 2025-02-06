"use client";

import Link from "next/link";
import {
  FileIcon,
  TenderIcon,
  AnnouncementIcon,
  ReportIcon,
  UserIcon,
  StatsIcon,
  SearchIcon,
} from "./Icons";

interface IconLinkItem {
  icon: "file" | "tender" | "announcement" | "report" | "user" | "stats" | "search";
  title: string;
  href: string;
}

interface IconLinksProps {
  links: IconLinkItem[];
}

const IconComponent = {
  file: FileIcon,
  tender: TenderIcon,
  announcement: AnnouncementIcon,
  report: ReportIcon,
  user: UserIcon,
  stats: StatsIcon,
  search: SearchIcon,
};

export default function IconLinks({ links }: IconLinksProps) {
  return (
    <div className="bg-[#003277] py-8">
      <div className="max-w-[1230px] mx-auto px-4">
        <h2 className="text-white text-xl mb-6 uppercase">Худалдан авах ажиллагаа</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {links.map((link, index) => {
            const Icon = IconComponent[link.icon];
            return (
              <Link
                key={index}
                href={link.href}
                className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#003277] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
                  {link.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
