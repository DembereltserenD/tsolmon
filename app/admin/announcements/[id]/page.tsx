import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AnnouncementForm } from '@/components/admin/announcement-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditAnnouncementPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: announcement, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !announcement) {
    notFound()
  }

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
          <h1 className="text-2xl font-bold mb-6">Edit Announcement</h1>
          <AnnouncementForm initialData={announcement} />
        </div>
      </div>
    </div>
  )
}
