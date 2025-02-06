import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default async function AnnouncementsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: announcements, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <Link 
          href={`/admin/announcements/${row.original.id}`}
          className="text-blue-600 hover:underline"
        >
          {row.getValue('title')}
        </Link>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'published' 
              ? 'bg-green-100 text-green-800'
              : status === 'draft'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
        )
      },
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
      cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link href={`/admin/announcements/${row.original.id}`}>
              Edit
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button asChild>
          <Link href="/admin/announcements/new">
            <PlusIcon className="w-4 h-4 mr-2" />
            New Announcement
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={announcements || []}
        error={error?.message}
      />
    </div>
  )
}
