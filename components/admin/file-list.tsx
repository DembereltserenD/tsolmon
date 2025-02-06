'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { 
  FileIcon, 
  Download, 
  Trash2, 
  FileText,
  FileSpreadsheet
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  storage_path: string
  created_at: string
}

interface FileListProps {
  initialFiles: FileItem[]
  onUpdate?: () => void
}

export function FileList({ initialFiles, onUpdate }: FileListProps) {
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [deleteFile, setDeleteFile] = useState<FileItem | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    setFiles(initialFiles)
  }, [initialFiles])

  useEffect(() => {
    const channel = supabase
      .channel('files')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'files' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFiles(prev => [payload.new as FileItem, ...prev])
            onUpdate?.()
          } else if (payload.eventType === 'DELETE') {
            setFiles(prev => prev.filter(f => f.id !== payload.old.id))
            onUpdate?.()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, onUpdate])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return <FileSpreadsheet className="h-5 w-5" />
    } else if (type.includes('document') || type.includes('pdf')) {
      return <FileText className="h-5 w-5" />
    }
    return <FileIcon className="h-5 w-5" />
  }

  const handleDownload = async (file: FileItem) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .storage
        .from('files')
        .download(file.storage_path)

      if (error) throw error

      // Create a download link and click it
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(data)
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading file:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteFile) return

    try {
      setLoading(true)
      // Delete from storage
      const { error: storageError } = await supabase
        .storage
        .from('files')
        .remove([deleteFile.storage_path])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', deleteFile.id)

      if (dbError) throw dbError

      setFiles(prev => prev.filter(f => f.id !== deleteFile.id))
      setDeleteFile(null)
      onUpdate?.()
    } catch (error) {
      console.error('Error deleting file:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getFileIcon(file.type)}
                <div>
                  <h3 className="font-medium text-sm line-clamp-2">{file.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(file.created_at).toLocaleDateString('mn-MN')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(file)}
                  disabled={loading}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteFile(file)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteFile} onOpenChange={(open) => !open && setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Файл устгах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Энэ үйлдлийг буцаах боломжгүй. Файл бүр мөсөн устах болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
