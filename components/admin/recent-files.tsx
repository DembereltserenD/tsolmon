'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { FileText, FileSpreadsheet, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  created_at: string
}

export function RecentFiles({ initialFiles }: { initialFiles: FileItem[] }) {
  const [files, setFiles] = useState(initialFiles)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel('files')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'files' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFiles(prev => [payload.new as FileItem, ...prev].slice(0, 5))
          } else if (payload.eventType === 'DELETE') {
            setFiles(prev => prev.filter(f => f.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  const getFileIcon = (type: string) => {
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return FileSpreadsheet
    }
    return FileText
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Files</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/files">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {files.map(file => {
          const Icon = getFileIcon(file.type)
          return (
            <div
              key={file.id}
              className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-gray-50"
            >
              <Icon className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(file.created_at).toLocaleDateString()} • 
                  {(file.size / 1024).toFixed(1)}KB
                </p>
              </div>
            </div>
          )
        })}

        {files.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No recent files
          </div>
        )}
      </div>
    </div>
  )
}
