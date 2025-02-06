'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSupabase } from '@/app/supabase-provider'

interface FileRecord {
  id: string
  name: string
  url: string
  type: string
  size: number
  created_at: string
}

export function FilesTable() {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loading, setLoading] = useState(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, error } = await supabase
          .from('files')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) {
          console.error('Error fetching files:', error)
          return
        }

        setFiles(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [supabase])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds 5MB limit');
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Only PNG and PDF files allowed');
      return;
    }
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .upload(file.name, file, {
          upsert: true
        })

      if (error) {
        console.error('Error uploading file:', error)
        return
      }

      console.log('File uploaded successfully:', data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Files</h2>
        <Link 
          href="/admin/files/upload" 
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Upload File
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Size</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  No files uploaded yet
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.id} className="border-b">
                  <td className="px-4 py-2">
                    <a 
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="px-4 py-2">{file.type}</td>
                  <td className="px-4 py-2">{formatFileSize(file.size)}</td>
                  <td className="px-4 py-2">
                    {new Date(file.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Add file validation to upload process
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ALLOWED_TYPES = ['image/png', 'application/pdf'];
