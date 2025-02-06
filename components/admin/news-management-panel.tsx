"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const newsSchema = z.object({
  title: z.string().min(5, 'Гарчиг хамгийн багадаа 5 тэмдэгт байх ёстой'),
  content: z.string().min(10, 'Агуулга хамгийн багадаа 10 тэмдэгт байх ёстой'),
  featured_image: z.string().url('Зөв URL оруулна уу'),
});

type NewsFormData = z.infer<typeof newsSchema>;

interface NewsItem extends NewsFormData {
  id: string;
  slug: string;
  published_at: string;
}

export function NewsManagementPanel() {
  const supabase = createClientComponentClient();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: selectedNews || {
      title: '',
      content: '',
      featured_image: ''
    }
  });

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNewsItems(data);
    } catch (error) {
      toast.error('Мэдээ ачаалахад алдаа гарлаа');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        ...data,
        slug: generateSlug(data.title),
        published_at: new Date().toISOString(),
      };

      // Optimistic update
      if (selectedNews) {
        setNewsItems(prev => prev.map(item => 
          item.id === selectedNews.id ? { ...item, ...payload } : item
        ));
      } else {
        const optimisticId = crypto.randomUUID();
        setNewsItems(prev => [{ ...payload, id: optimisticId } as NewsItem, ...prev]);
      }

      const { error } = selectedNews
        ? await supabase.from('news').update(payload).eq('id', selectedNews.id)
        : await supabase.from('news').insert(payload);

      if (error) throw error;

      toast.success(selectedNews ? 'Мэдээ шинэчлэгдлээ' : 'Шинэ мэдээ нэмэгдлээ');
      setOpenDialog(false);
      reset();
      // Refresh to get the actual data
      fetchNews();
    } catch (error) {
      toast.error('Мэдээ хадгалахад алдаа гарлаа');
      console.error('Error saving news:', error);
      // Revert optimistic update
      fetchNews();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Optimistic delete
      setNewsItems(prev => prev.filter(item => item.id !== id));

      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;

      toast.success('Мэдээ устгагдлаа');
    } catch (error) {
      toast.error('Мэдээ устгахад алдаа гарлаа');
      console.error('Error deleting news:', error);
      // Revert optimistic delete
      fetchNews();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Мэдээллийн удирдлага</h2>
        <Button 
          onClick={() => { setSelectedNews(null); setOpenDialog(true); }}
          disabled={submitting}
        >
          Шинэ мэдээ нэмэх
        </Button>
      </div>

      <div className="grid gap-4">
        {newsItems.map((news) => (
          <div key={news.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-medium">{news.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(news.published_at).toLocaleDateString('mn-MN')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedNews(news);
                  setOpenDialog(true);
                }}
                disabled={submitting}
              >
                Засах
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(news.id)}
                disabled={submitting}
              >
                Устгах
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedNews ? 'Мэдээ засах' : 'Шинэ мэдээ нэмэх'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                {...register('title')}
                defaultValue={selectedNews?.title}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="content">Агуулга</Label>
              <Textarea
                id="content"
                {...register('content')}
                defaultValue={selectedNews?.content}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="featured_image">Зургийн URL</Label>
              <Input
                id="featured_image"
                {...register('featured_image')}
                defaultValue={selectedNews?.featured_image}
              />
              {errors.featured_image && (
                <p className="text-sm text-red-500">{errors.featured_image.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                disabled={submitting}
              >
                Цуцлах
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Хадгалж байна...' : 'Хадгалах'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
