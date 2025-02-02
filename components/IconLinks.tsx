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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link, index) => {
            const Icon = IconComponent[link.icon];
            return (
              <Link 
                key={index} 
                href={link.href}
                className="flex items-start gap-3 p-4 text-white hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                <span className="text-sm leading-tight">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
