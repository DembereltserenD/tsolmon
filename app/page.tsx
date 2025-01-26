"use client";

import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-[1230px] mx-auto flex justify-between items-center px-4">
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              du.spa.gov.mn/mn
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Худалдан авах ажиллагааны цахим систем tender.gov.mn
            </Link>
            <Button variant="ghost" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#003876] text-white">
        <div className="max-w-[1230px] mx-auto py-6 px-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-12 h-12 bg-[#003876] rounded-full" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-1">ӨМНӨГОВЬ АЙМАГ</h1>
              <p className="text-lg">ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ГАЗАР</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#003876] text-white border-t border-blue-700">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="flex flex-col text-[13px]">
            {[
              "НҮҮР ХУУДАС",
              "БАЙГУУЛЛАГЫН ТАНИЛЦУУЛГА",
              "ЦАГ ҮЕИЙН МЭДЭЭ, МЭДЭЭЛЭЛ",
              "ИЛ ТОД БАЙДАЛ",
              "ТӨРИЙН ҮЙЛЧИЛГЭЭ",
              "ШИЛЭН ТООЦОО",
              "ХУУЛЬ, ЭРХ ЗҮЙ",
              "ХУДАЛДАН АВАХ АЖИЛЛАГАА",
              "ХОЛБОО БАРИХ",
              "САНАЛ АСУУЛГА, ХЭЛЭЛЦҮҮЛЭГ",
            ].map((item) => (
              <Link
                key={item}
                href="/"
                className="px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1230px] mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-4 gap-6">
          {/* Main News Section */}
          <div className="col-span-3">
            <Card className="relative overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                alt="Business Analysis"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <span className="text-white text-sm">2025-01-02</span>
                <h2 className="text-white text-2xl font-bold mt-2">
                  АЙМГИЙН 2025 ОНЫ ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ТӨЛӨВЛӨГӨӨ БАТЛАГДЛАА
                </h2>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2"
                  alt="Team Meeting"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500">2025-01-02</span>
                  <h3 className="font-bold mt-2">
                    ТЕНДЕР ШАЛГАРУУЛАЛТЫН ЗАРЛАЛ
                  </h3>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40"
                  alt="Conference Room"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500">2025-01-02</span>
                  <h3 className="font-bold mt-2">
                    ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ МЭРГЭШСЭН АЖИЛТАН БЭЛТГЭХ СУРГАЛТЫН ЗАР
                  </h3>
                </div>
              </Card>
            </div>
          </div>

          {/* Side News */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2"
                alt="Team Meeting"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <span className="text-sm text-gray-500">2025-01-02</span>
                <h3 className="font-bold text-sm mt-1">
                  "НАРАНТАЙ ТӨСӨЛ"-ИЙН ЦЭГ БАЙГУУЛАХ ТЕНДЕР ЗАРЛАГДЛАА
                </h3>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40"
                alt="Conference Room"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <span className="text-sm text-gray-500">2025-01-02</span>
                <h3 className="font-bold text-sm mt-1">
                  ЭРҮҮЛ МЭНДИЙН САЛБАРТ ШААРДЛАГАТАЙ ТОНОГ ТӨХӨӨРӨМЖ
                </h3>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003876] text-white py-12">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-bold mb-4">ХОЛБОГДОХ</h3>
              <div className="space-y-2 text-sm">
                <p>Өмнөговь аймаг, Сайншанд сумын 7-р баг, Нарлаг, Бүгчимэхийн өргөн чөлөө-2, 213 тоот</p>
                <p>Утас: 70593399</p>
                <p>Факс: 70593399</p>
                <p>И-мэйл: info@spa.du.gov.mn</p>
                <div className="mt-4">
                  <Button variant="ghost" size="icon" className="hover:bg-blue-700">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
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
          <div className="mt-8 pt-8 border-t border-blue-700 text-center text-sm">
            <p>© 2025, Өмнөговь аймаг Худалдан авах ажиллагааны газар</p>
          </div>
        </div>
      </footer>
    </div>
  );
}