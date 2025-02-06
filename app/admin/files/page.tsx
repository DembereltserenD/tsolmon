'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FileUploader } from '@/components/admin/file-uploader'
import { FileList } from '@/components/admin/file-list'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileIcon, FileSpreadsheet, FileText } from 'lucide-react'

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  storage_path: string
  created_at: string
}

interface FilesByType {
  [key: string]: FileItem[]
}

export default function FileManagementPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFilesByType = () => {
    const filesByType: FilesByType = {
      'document': [],
      'spreadsheet': [],
      'other': []
    }

    files.forEach(file => {
      if (file.type.includes('spreadsheet') || file.type.includes('excel')) {
        filesByType.spreadsheet.push(file)
      } else if (file.type.includes('document') || file.type.includes('pdf')) {
        filesByType.document.push(file)
      } else {
        filesByType.other.push(file)
      }
    })

    return filesByType
  }

  const filesByType = getFilesByType()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Файлын удирдлага</h1>
          <p className="text-sm text-gray-600 mt-1">
            Тендерийн баримт бичиг болон хавсралтуудын удирдлага
          </p>
        </div>
        <FileUploader />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 bg-white p-4 rounded-lg shadow">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" className="flex-1">Бүгд</TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">Бичиг</TabsTrigger>
              <TabsTrigger value="spreadsheets" className="flex-1">Excel</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="all">
                <div className="space-y-2">
                  {files.map((file) => (
                    <FileListItem key={file.id} file={file} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="space-y-2">
                  {filesByType.document.map((file) => (
                    <FileListItem key={file.id} file={file} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="spreadsheets">
                <div className="space-y-2">
                  {filesByType.spreadsheet.map((file) => (
                    <FileListItem key={file.id} file={file} />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <FileList initialFiles={files} onUpdate={fetchFiles} />
        </div>
      </div>
    </div>
  )
}

function FileListItem({ file }: { file: FileItem }) {
  const getFileIcon = () => {
    if (file.type.includes('spreadsheet') || file.type.includes('excel')) {
      return <FileSpreadsheet className="h-4 w-4" />
    } else if (file.type.includes('document') || file.type.includes('pdf')) {
      return <FileText className="h-4 w-4" />
    }
    return <FileIcon className="h-4 w-4" />
  }

  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
      {getFileIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-500">
          {new Date(file.created_at).toLocaleDateString('mn-MN')}
        </p>
      </div>
    </div>
  )
}
