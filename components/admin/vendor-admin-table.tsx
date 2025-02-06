"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Vendor {
  id: string;
  company_name: string;
  registration_number: string;
  contact_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function VendorAdminTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateVendorStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchVendors();
    } catch (error) {
      console.error('Error updating vendor status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Уншиж байна...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Нийлүүлэгчийн удирдлага</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Байгууллагын нэр</TableHead>
              <TableHead>Регистрийн дугаар</TableHead>
              <TableHead>Цахим шуудан</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.company_name}</TableCell>
                <TableCell>{vendor.registration_number}</TableCell>
                <TableCell>{vendor.contact_email}</TableCell>
                <TableCell>
                  <Badge variant={
                    vendor.status === 'approved' ? 'secondary' :
                    vendor.status === 'rejected' ? 'destructive' : 'default'
                  }>
                    {vendor.status === 'pending' && 'Хүлээгдэж байна'}
                    {vendor.status === 'approved' && 'Баталгаажсан'}
                    {vendor.status === 'rejected' && 'Татгалзсан'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {vendor.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateVendorStatus(vendor.id, 'approved')}
                      >
                        Зөвшөөрөх
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateVendorStatus(vendor.id, 'rejected')}
                      >
                        Татгалзах
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
