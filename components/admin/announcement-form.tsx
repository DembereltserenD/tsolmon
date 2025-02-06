'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AnnouncementData {
  id?: string
  title: string
  content: string
  status: 'draft' | 'published' | 'archived'
}

export function AnnouncementForm({ initialData }: { initialData?: AnnouncementData }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [formData, setFormData] = useState<AnnouncementData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    status: initialData?.status || 'draft'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const { error: submitError } = await supabase
        .from('announcements')
        .upsert({
          ...(initialData?.id && { id: initialData.id }),
          ...formData,
          updated_at: new Date().toISOString()
        })
      
      if (submitError) throw submitError
      
      router.push('/admin/announcements')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save announcement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter announcement title"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Enter announcement content"
            rows={8}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value: 'draft' | 'published' | 'archived') => 
              setFormData(prev => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update' : 'Create'} Announcement
        </Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => router.push('/admin/announcements')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
