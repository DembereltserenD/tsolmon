'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSupabase } from '@/app/supabase-provider'

interface Announcement {
  id: string
  title: string
  created_at: string
  status: 'draft' | 'published'
}

export function AnnouncementsTable() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) {
          console.error('Error fetching announcements:', error)
          return
        }

        setAnnouncements(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [supabase])

  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="text-center text-gray-500">
          Одоогоор зарлал байхгүй байна
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Сүүлийн зарлалууд</h2>
        <Link 
          href="/admin/announcements/new" 
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Шинэ зарлал
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Гарчиг</th>
              <th className="px-4 py-2 text-left">Огноо</th>
              <th className="px-4 py-2 text-left">Төлөв</th>
              <th className="px-4 py-2 text-left">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id} className="border-b">
                <td className="px-4 py-2">{announcement.title}</td>
                <td className="px-4 py-2">
                  {new Date(announcement.created_at).toLocaleDateString('mn-MN')}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      announcement.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {announcement.status === 'published' ? 'Нийтлэгдсэн' : 'Ноорог'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/announcements/${announcement.id}`}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Засах
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
