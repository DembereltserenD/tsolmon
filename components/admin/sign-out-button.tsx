'use client'

import { useSupabase } from '@/app/supabase-provider'

export default function SignOutButton() {
  const { supabase } = useSupabase()

  return (
    <button
      onClick={() => supabase.auth.signOut()}
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      Гарах
    </button>
  )
}
