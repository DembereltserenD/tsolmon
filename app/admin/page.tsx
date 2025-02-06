import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import SignOutButton from '@/components/admin/sign-out-button'
import { StatsCards } from '@/components/admin/stats-cards'
import { NewsManagement } from '@/components/admin/news-management'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch data in parallel
  const [
    { count: activeCount },
    { count: completedCount }
  ] = await Promise.all([
    supabase.from('tenders').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('tenders').select('*', { count: 'exact', head: true }).eq('status', 'completed')
  ])

  const stats = {
    total: ((activeCount || 0) + (completedCount || 0)),
    active: (activeCount || 0),
    completed: (completedCount || 0)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Удирдлагын самбар</h1>
        <SignOutButton />
      </div>

      <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>}>
        <StatsCards stats={stats} />
      </Suspense>

      <div className="mt-8">
        <NewsManagement />
      </div>
    </div>
  )
}
