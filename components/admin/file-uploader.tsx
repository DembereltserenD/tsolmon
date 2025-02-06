'use client'

import { useState, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

export function FileUploader() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setError('')

    try {
      for (const file of acceptedFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`

        // Upload to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
          .from('procurement-docs')
          .upload(fileName, file)

        if (storageError) throw storageError

        // Create file record in database
        const { error: dbError } = await supabase
          .from('files')
          .insert({
            name: file.name,
            storage_path: fileName,
            size: file.size,
            type: file.type
          })

        if (dbError) throw dbError
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file')
    } finally {
      setUploading(false)
    }
  }, [supabase, router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here ...</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag and drop files here, or click to select files</p>
            <p className="text-sm text-gray-500 mt-1">
              PDF, DOC, DOCX, XLS, XLSX up to 10MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {uploading && (
        <div className="mt-4 text-center text-gray-500">
          Uploading files...
        </div>
      )}
    </div>
  )
}
