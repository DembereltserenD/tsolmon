"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AuditLog {
  id: string;
  action: string;
  table_name: string;
  record_id: string;
  user_id: string;
  changes: any;
  created_at: string;
  user?: {
    email: string;
  };
}

export default function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          *,
          user:profiles(email)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatChanges = (changes: any) => {
    if (!changes) return 'No changes';
    try {
      const formatted = Object.entries(changes)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(', ');
      return formatted;
    } catch (e) {
      return 'Invalid changes format';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Уншиж байна...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Системийн түүх</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Огноо</TableHead>
              <TableHead>Үйлдэл</TableHead>
              <TableHead>Хэрэглэгч</TableHead>
              <TableHead>Хүснэгт</TableHead>
              <TableHead>Өөрчлөлт</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Badge variant={
                    log.action === 'INSERT' ? 'secondary' :
                    log.action === 'UPDATE' ? 'default' :
                    'destructive'
                  }>
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>{log.user?.email || 'Unknown'}</TableCell>
                <TableCell>{log.table_name}</TableCell>
                <TableCell className="max-w-md truncate">
                  {formatChanges(log.changes)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
