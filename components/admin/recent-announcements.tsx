'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Announcement {
  id: string
  title: string
  status: string
  created_at: string
}

export function RecentAnnouncements({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel('announcements')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'announcements' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAnnouncements(prev => [payload.new as Announcement, ...prev].slice(0, 5))
          } else if (payload.eventType === 'DELETE') {
            setAnnouncements(prev => prev.filter(a => a.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Announcements</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/announcements">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {announcements.map(announcement => (
          <Link
            key={announcement.id}
            href={`/admin/announcements/${announcement.id}`}
            className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-gray-50"
          >
            <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{announcement.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  announcement.status === 'published' 
                    ? 'bg-green-100 text-green-800'
                    : announcement.status === 'draft'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {announcement.status}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {announcements.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No recent announcements
          </div>
        )}
      </div>
    </div>
  )
}
