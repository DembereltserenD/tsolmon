'use client'

import { NewsManagement } from '@/components/admin/news-management'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useSupabase } from '@/app/supabase-provider'
import NewsGrid, { NewsItem } from '@/components/NewsGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Extend NewsItem to include is_featured
interface ExtendedNewsItem extends NewsItem {
  is_featured: boolean
}

export default function NewsPage() {
  const { supabase } = useSupabase()
  const [isAddingNews, setIsAddingNews] = useState(false)
  const [news, setNews] = useState<ExtendedNewsItem[]>([])
  const [featuredNews, setFeaturedNews] = useState<ExtendedNewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data: allNews, error } = await supabase
        .from('news')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          published_at,
          is_featured,
          categories (
            id,
            name,
            slug
          )
        `)
        .order('published_at', { ascending: false })

      if (error) throw error

      if (allNews) {
        const formattedNews = allNews.map(news => ({
          id: news.id,
          title: news.title,
          slug: news.slug,
          excerpt: news.excerpt,
          featured_image: news.featured_image,
          published_at: news.published_at,
          is_featured: news.is_featured,
          category: {
            name: news.categories?.[0]?.name || '',
            slug: news.categories?.[0]?.slug || ''
          }
        })) as ExtendedNewsItem[]

        setNews(formattedNews.filter(n => !n.is_featured))
        setFeaturedNews(formattedNews.filter(n => n.is_featured))
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    // Will be handled by NewsManagement component
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchNews() // Refresh the news list
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Мэдээний удирдлага</h1>
        <Button 
          onClick={() => setIsAddingNews(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Шинэ мэдээ нэмэх
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 bg-white p-4 rounded-lg shadow">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">Бүх мэдээ</TabsTrigger>
              <TabsTrigger value="featured" className="flex-1">Онцлох</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-2">
                {news.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleEdit(item.id)}
                  >
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(item.published_at).toLocaleDateString('mn-MN')}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="featured">
              <div className="space-y-2">
                {featuredNews.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleEdit(item.id)}
                  >
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(item.published_at).toLocaleDateString('mn-MN')}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <NewsGrid 
            news={news} 
            showAdminControls={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <NewsManagement 
        isOpen={isAddingNews} 
        onClose={() => {
          setIsAddingNews(false)
          fetchNews() // Refresh the news list after adding
        }} 
      />
    </div>
  )
}
