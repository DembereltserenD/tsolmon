'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/app/supabase-provider'
import { NewsItem } from '../NewsGrid'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Category {
  id: string
  name: string
  slug: string
}

interface NewsFormData {
  title: string
  excerpt: string
  content: string
  featured_image: string
  category_id: string
  is_featured: boolean
}

const INITIAL_FORM_DATA: NewsFormData = {
  title: '',
  excerpt: '',
  content: '',
  featured_image: '',
  category_id: '',
  is_featured: false,
}

interface NewsManagementProps {
  isOpen?: boolean
  onClose?: () => void
}

export function NewsManagement({ isOpen = false, onClose }: NewsManagementProps) {
  const { supabase } = useSupabase()
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<NewsFormData>(INITIAL_FORM_DATA)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Ангилал ачаалахад алдаа гарлаа')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const newsData = {
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: formData.featured_image,
        category_id: formData.category_id,
        is_featured: formData.is_featured,
        published_at: new Date().toISOString()
      }

      if (editingId) {
        const { error } = await supabase
          .from('news')
          .update(newsData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Мэдээ шинэчлэгдлээ')
      } else {
        const { error } = await supabase
          .from('news')
          .insert([newsData])

        if (error) throw error
        toast.success('Шинэ мэдээ нэмэгдлээ')
      }

      setFormData(INITIAL_FORM_DATA)
      setEditingId(null)
      onClose?.()
    } catch (error) {
      console.error('Error saving news:', error)
      toast.error('Мэдээ хадгалахад алдаа гарлаа')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editingId ? 'Мэдээ засах' : 'Шинэ мэдээ нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Гарчиг</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Хураангуй</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Агуулга</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="featured_image">Зургийн URL</Label>
            <Input
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Ангилал</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ангилал сонгох" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
            />
            <Label htmlFor="is_featured">Онцлох мэдээ</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Цуцлах
            </Button>
            <Button type="submit" disabled={isLoading}>
              {editingId ? 'Хадгалах' : 'Нэмэх'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
