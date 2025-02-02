"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import NewsGrid from "@/components/NewsGrid";
import FeaturedNews from "@/components/FeaturedNews";
import IconLinks from "@/components/IconLinks";
import VideoGrid from "@/components/VideoGrid";
import StatsGrid from "@/components/StatsGrid";
import Feedback from "@/components/Feedback";
import type { NewsItem } from "@/components/NewsGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#003277]">
        <div className="max-w-[1230px] mx-auto flex justify-end items-center px-4 py-1">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[12px] text-white hover:text-gray-200">
              Худалдан авах ажиллагааны цахим систем tender.gov.mn
            </Link>
            <span className="text-[12px] text-white">
              Сүүлд зарлагдсан Тендерийн урилга
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#003277] text-white">
        <div className="max-w-[1230px] mx-auto py-2 px-4">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-3">
                <Image 
                  src="https://du.spa.gov.mn/include/image/title.jpg"
                  alt="Өмнөговь аймгийн Худалдан авах ажиллагааны газар"
                  width={55}
                  height={55}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col">
                  <h2 className="text-[13px] leading-tight tracking-wide opacity-90">ӨМНӨГОВЬ АЙМАГ</h2>
                  <h1 className="text-[19px] font-medium leading-tight flex">
                    <span className="flex flex-col">
                      <span>ХУДАЛДАН АВАХ</span>
                      <span>АЖИЛЛАГААНЫ ГАЗАР</span>
                    </span>
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#003277] text-white border-t border-opacity-10 border-white sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex justify-between">
            <Link href="/нүүр" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>НҮҮР</span>
              <span>ХУУДАС</span>
            </Link>
            <Link href="/байгууллагын-танилцуулга" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>БАЙГУУЛЛАГЫН</span>
              <span>ТАНИЛЦУУЛГА</span>
            </Link>
            <Link href="/цаг-үеийн-мэдээ" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ЦАГ ҮЕИЙН</span>
              <span>МЭДЭЭ</span>
            </Link>
            <Link href="/ил-тод-байдал" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ИЛ ТОД</span>
              <span>БАЙДАЛ</span>
            </Link>
            <Link href="/төлөвлөгөө" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ТӨЛӨВЛӨГӨӨ</span>
              <span>ТАЙЛАН</span>
            </Link>
            <Link href="/шилэн" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ШИЛЭН</span>
              <span>ТООЦОО</span>
            </Link>
            <Link href="/хууль" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ХУУЛЬ</span>
              <span>ЭРХ ЗҮЙ</span>
            </Link>
            <Link href="/худалдан-авах-ажиллагаа" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ХУДАЛДАН АВАХ</span>
              <span>АЖИЛЛАГАА</span>
            </Link>
            <Link href="/холбоо-барих" className="py-4 px-2 text-[12px] hover:bg-gray-600 text-center flex flex-col justify-center">
              <span>ХОЛБОО</span>
              <span>БАРИХ</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-[1230px] mx-auto px-4 py-8">
          {/* Featured News Section */}
          <FeaturedNews news={[
            {
              date: "2024-01-15",
              title: "ӨМНӨГОВЬ АЙМГИЙН ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ГАЗРЫН 2024 ОНЫ ТӨЛӨВЛӨГӨӨ",
              imageUrl: "https://placehold.co/800x400/003277/white?text=Featured+News+1",
              link: "/news/1"
            },
            {
              date: "2024-01-13",
              title: "ТЕНДЕРИЙН УРИЛГА ЗАРЛАЛАА",
              imageUrl: "https://placehold.co/400x300/003277/white?text=Featured+News+2",
              link: "/news/2"
            },
            {
              date: "2024-01-12",
              title: "СУРГАЛТ ЗОХИОН БАЙГУУЛЛАА",
              imageUrl: "https://placehold.co/400x300/003277/white?text=Featured+News+3",
              link: "/news/3"
            }
          ]} />

          {/* News Grid */}
          <div className="mt-8">
            <NewsGrid news={[
              {
                date: "2024-01-09",
                title: "ТЕНДЕР ШАЛГАРУУЛАЛТЫН ЖУРАМ",
                imageUrl: "https://placehold.co/400x300/003277/white?text=News+1",
                link: "/news/4"
              },
              {
                date: "2024-01-08",
                title: "ЦАХИМ СИСТЕМИЙН ШИНЭЧЛЭЛ",
                imageUrl: "https://placehold.co/400x300/003277/white?text=News+2",
                link: "/news/5"
              },
              {
                date: "2024-01-07",
                title: "АЖЛЫН БАЙРНЫ ЗАРЛАЛ",
                imageUrl: "https://placehold.co/400x300/003277/white?text=News+3",
                link: "/news/6"
              }
            ]} />
          </div>
        </div>

        {/* Icon Links Section */}
        <IconLinks links={[
          {
            icon: "file",
            title: "Худалдан авах ажиллагааны төлөвлөгөө",
            href: "/planning"
          },
          {
            icon: "tender",
            title: "Худалдан авах ажиллагааны төлөвлөгөөний гүйцэтгэл",
            href: "/performance"
          },
          {
            icon: "announcement",
            title: "Тендер шалгаруулалтын урилга",
            href: "/tenders"
          },
          {
            icon: "report",
            title: "Худалдан авах ажиллагааны тайлан",
            href: "/reports"
          },
          {
            icon: "file",
            title: "Тендер шалгаруулалтын зарлал",
            href: "/announcements"
          },
          {
            icon: "user",
            title: "Худалдан авах ажиллагаа, мэргэжил арга зүй",
            href: "/methodology"
          },
          {
            icon: "stats",
            title: "Худалдан авах ажиллагааны тайлан",
            href: "/stats"
          },
          {
            icon: "search",
            title: "Эрэлт хайгуулын ажлуудын жагсаалт",
            href: "/search"
          }
        ]} />

        {/* Video Grid Section */}
        <VideoGrid 
          title="ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ЦАХИМ СИСТЕМИЙН ГАРЫН АВЛАГА"
          videos={[
            {
              title: "ЦАХИМ ДЭЛГҮҮР АШИГЛАХ ГАРЫН АВЛАГА",
              thumbnailUrl: "https://placehold.co/400x300/003277/white?text=Video+1",
              videoUrl: "/video/1",
              date: "2024-01-15"
            },
            {
              title: "ГЭРЭЭНИЙ МЭДЭЭЛЭЛ БҮРТГЭХ ГАРЫН АВЛАГА",
              thumbnailUrl: "https://placehold.co/400x300/003277/white?text=Video+2",
              videoUrl: "/video/2",
              date: "2024-01-14"
            },
            {
              title: "ТЕНДЕР ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ЦАХИМ СИСТЕМИЙН ТАНИЛЦУУЛГА",
              thumbnailUrl: "https://placehold.co/400x300/003277/white?text=Video+3",
              videoUrl: "/video/3",
              date: "2024-01-13"
            }
          ]}
        />

        {/* Stats Grid Section */}
        <StatsGrid
          title="СҮҮЛИЙН ТӨЛӨВЛӨГӨӨНИЙ ГҮЙЦЭТГЭЛ"
          stats={[
            {
              title: "Төлөвлөгөөний тоо",
              value: "77.7%",
              color: "#00800014"
            },
            {
              title: "Гүйцэтгэлийн тоо",
              value: "82.9%",
              color: "#00800014"
            },
            {
              title: "Сүүлийн төлөвлөгөөний дүн",
              value: "206",
              color: "#00800014"
            },
            {
              title: "Гүйцэтгэлийн дүн",
              value: "189",
              color: "#00800014"
            }
          ]}
        />

        {/* Feedback Section */}
        <Feedback
          title="САНАЛ АСУУЛГА"
          middleText="Манай байгууллагад ирсэн санал, гомдол, хүсэлт, хандсан асуудлын хүрээнд шаардлагатай хариу мэдээлдэг байдал"
          subtitle="Өмнөговь аймгийн Худалдан авах ажиллагааны газрын үйлчилгээний чанар, ил тод, шуурхай байдал, үйлчилгээний хүртээмжийн бодит байдлыг үнэлүүлж, түүнд дүн шинжилгээ хийн цаашид өөрчлөх, сайжруулах, хэрэгжүүлэх, зохион байгуулах үйл ажиллагааг тодорхойлоход оршино.."
          items={[
            {
              label: "1-2 хоногт хариу мэдэгддэг",
              percentage: 100,
            },
            {
              label: "3-7 хоногт хариу мэдэгддэг",
              percentage: 0,
            },
            {
              label: "7-14 хоногт хариу мэдэгддэг",
              percentage: 0,
            },
            {
              label: "14-с дээш хугацаанд хариу мэдэгддэг",
              percentage: 0,
            },
          ]}
        />
      </main>

      {/* Footer */}
      <footer className="bg-[#003277] text-white py-12">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-bold mb-4">ХОЛБОГДОХ</h3>
              <div className="space-y-2 text-sm">
                <p>Өмнөговь аймаг</p>
                <p>Утас:</p>
                <p>Факс: </p>
                <p>И-мэйл:</p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold mb-4">БҮХ ХОЛБООС</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:underline">Монгол улсын Сангийн яам</Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Төрийн худалдан авах ажиллагааны газар</Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Төрийн худалдан авах ажиллагааны цахим систем</Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">Өмнөговь аймгийн Засаг даргын Тамгын газар</Link>
                </li>
              </ul>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="font-bold mb-4">ХАНДАЛТ</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Өнөөдөр</span>
                  <span>35</span>
                </div>
                <div className="flex justify-between">
                  <span>Өчигдөр</span>
                  <span>71</span>
                </div>
                <div className="flex justify-between">
                  <span>Сүүлийн 7 хоног</span>
                  <span>648</span>
                </div>
                <div className="flex justify-between">
                  <span>Сүүлийн сар</span>
                  <span>2465</span>
                </div>
                <div className="flex justify-between">
                  <span>Нийт</span>
                  <span>20203</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white text-center text-sm">
            <p>2025, Өмнөговь аймаг Худалдан авах ажиллагааны газар</p>
          </div>
        </div>
      </footer>
    </div>
  );
}