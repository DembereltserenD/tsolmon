'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/app/supabase-provider'
import AdminDashboardLayout from '@/components/admin/dashboard-layout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { supabase } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
      }
    }
    checkSession()
  }, [supabase, router])

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>
}
