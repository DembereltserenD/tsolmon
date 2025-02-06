import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AnnouncementForm } from '@/components/admin/announcement-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function NewAnnouncementPage() {
  const supabase = createServerComponentClient({ cookies })
  
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="mb-4"
        >
          <Link href="/admin/announcements">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Announcements
          </Link>
        </Button>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Create New Announcement</h1>
          <AnnouncementForm />
        </div>
      </div>
    </div>
  )
}
