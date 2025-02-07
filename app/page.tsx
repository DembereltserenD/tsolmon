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
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  interface Category {
    id: string;
    name: string;
    slug: string;
  }

  interface NewsItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string;
    published_at: string;
    is_featured: boolean;
    category_id: string | null;
    category: Category | null;
  }

  // Fetch all news with error handling
  let allNews: NewsItem[] = [];
  try {
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*)
      `)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      throw error;
    }

    allNews = data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    // Continue with empty news array
  }

  // Transform the data to match the component interface
  const transformedNews = allNews.map(news => ({
    id: news.id,
    title: news.title,
    slug: news.slug,
    excerpt: news.excerpt,
    featured_image: news.featured_image,
    published_at: news.published_at,
    is_featured: news.is_featured,
    category: news.category || {
      id: '',
      name: 'Ерөнхий',
      slug: 'general'
    }
  }));

  // Split news into featured and regular
  const featuredNews = transformedNews.filter(news => news.is_featured);
  const regularNews = transformedNews.filter(news => !news.is_featured);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#003277]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0">
            <Link href="/" className="text-xs sm:text-sm text-white hover:text-gray-200 text-center sm:text-left">
              Худалдан авах ажиллагааны цахим систем tender.gov.mn
            </Link>
            <span className="text-xs sm:text-sm text-white">
              Сүүлд зарлагдсан Тендерийн урилга
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#003277] text-white">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-start">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
              <Image 
                src="https://du.spa.gov.mn/include/image/title.jpg"
                alt="Өвөрхангай аймгийн Худалдан авах ажиллагааны газар"
                width={55}
                height={55}
                className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              />
              <div className="flex flex-col">
                <h2 className="text-[11px] sm:text-[13px] leading-tight tracking-wide opacity-90">
                  ӨВӨРХАНГАЙ АЙМАГ
                </h2>
                <h1 className="text-[16px] sm:text-[19px] font-medium leading-tight">
                  <span className="flex flex-col">
                    <span>ХУДАЛДАН АВАХ</span>
                    <span>АЖИЛЛАГААНЫ ГАЗАР</span>
                  </span>
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#003277] border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white py-2">
            {['Нүүр', 'Мэдээ', 'Тендер', 'Тайлан', 'Холбоо барих'].map((item) => (
              <Link 
                key={item}
                href={`/${item === 'Нүүр' ? '' : item.toLowerCase()}`} 
                className="text-xs sm:text-sm py-1 hover:text-gray-200 whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Онцлох мэдээ</h2>
              <FeaturedNews news={featuredNews} />
            </section>
          )}

          {/* Latest News */}
          {regularNews.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Сүүлийн мэдээ</h2>
                <Link href="/news">
                  <Button variant="outline" className="text-sm">
                    Бүх мэдээ
                  </Button>
                </Link>
              </div>
              <NewsGrid news={regularNews} />
            </section>
          )}

          {/* Icon Links */}
          <section className="mb-8 sm:mb-12">
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
          </section>

          {/* Videos */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Видео сан</h2>
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
          </section>

          {/* Stats */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Тоон үзүүлэлт</h2>
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
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Санал хүсэлт</h2>
            <Feedback
              title="САНАЛ АСУУЛГА"
              middleText="Манай байгууллагад ирсэн санал, гомдол, хүсэлт, хандсан асуудлын хүрээнд шаардлагатай хариу мэдээлдэг байдал"
              subtitle="Өвөрхангай аймгийн Худалдан авах ажиллагааны газрын үйлчилгээний чанар, ил тод, шуурхай байдал, үйлчилгээний хүртээмжийн бодит байдлыг үнэлүүлж, түүнд дүн шинжилгээ хийн цаашид өөрчлөх, сайжруулах, хэрэгжүүлэх, зохион байгуулах үйл ажиллагааг тодорхойлоход оршино.."
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
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003277] text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Холбоо барих</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Өвөрхангай аймаг, Даланзадгад сум</p>
                <p>Худалдан авах ажиллагааны газар</p>
                <p>Утас: +976 7053-3333</p>
                <p>Факс: +976 7053-3333</p>
                <p>Имэйл: info@omnogovi.gov.mn</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Холбоосууд</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p><Link href="/" className="hover:underline">Тендерийн урилга</Link></p>
                <p><Link href="/" className="hover:underline">Үнэлгээний хорооны бүрэлдэхүүн</Link></p>
                <p><Link href="/" className="hover:underline">Худалдан авах ажиллагааны төлөвлөгөө</Link></p>
                <p><Link href="/" className="hover:underline">Тайлан, мэдээ</Link></p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Бусад</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p><Link href="/" className="hover:underline">Нүүр</Link></p>
                <p><Link href="/" className="hover:underline">Мэдээ, мэдээлэл</Link></p>
                <p><Link href="/" className="hover:underline">Холбоо барих</Link></p>
                <p><Link href="/" className="hover:underline">Тусламж</Link></p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-xs sm:text-sm">
            <p> 2025, Өвөрхангай аймгийн Худалдан авах ажиллагааны газар. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}