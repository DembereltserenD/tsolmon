'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/supabase-provider'

interface Stats {
  announcements: number
  files: number
  users: number
}

interface StatsCardProps {
  title: string;
  value: string;
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}

export function StatsCardContainer() {
  const [stats, setStats] = useState<Stats>({ announcements: 0, files: 0, users: 0 })
  const [loading, setLoading] = useState(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get announcements count
        const { count: announcementsCount } = await supabase
          .from('announcements')
          .select('*', { count: 'exact', head: true })

        // Get files count
        const { count: filesCount } = await supabase
          .from('files')
          .select('*', { count: 'exact', head: true })

        // Get users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        setStats({
          announcements: announcementsCount || 0,
          files: filesCount || 0,
          users: usersCount || 0,
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const items = [
    { name: 'Total Announcements', value: stats.announcements },
    { name: 'Uploaded Files', value: stats.files },
    { name: 'Registered Users', value: stats.users },
  ]

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border bg-white p-6 shadow-sm animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {items.map((item) => (
        <StatsCard key={item.name} title={item.name} value={item.value.toString()} />
      ))}
    </>
  )
}
