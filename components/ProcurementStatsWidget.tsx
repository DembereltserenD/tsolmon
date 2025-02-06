"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatsData {
  totalProcurements: number;
  activeTenders: number;
  completedTenders: number;
  monthlyStats: {
    month: string;
    count: number;
  }[];
}

export default function ProcurementStatsWidget() {
  const [stats, setStats] = useState<StatsData>({
    totalProcurements: 0,
    activeTenders: 0,
    completedTenders: 0,
    monthlyStats: []
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total procurements
      const { count: total } = await supabase
        .from('procurements')
        .select('*', { count: 'exact' });

      // Fetch active tenders
      const { count: active } = await supabase
        .from('procurements')
        .select('*', { count: 'exact' })
        .eq('status', 'active');

      // Fetch completed tenders
      const { count: completed } = await supabase
        .from('procurements')
        .select('*', { count: 'exact' })
        .eq('status', 'completed');

      // Fetch monthly stats
      const { data: monthly } = await supabase
        .from('procurements')
        .select('created_at')
        .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());

      // Process monthly data
      const monthlyStats = monthly ? processMonthlyData(monthly) : [];

      setStats({
        totalProcurements: total || 0,
        activeTenders: active || 0,
        completedTenders: completed || 0,
        monthlyStats
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const processMonthlyData = (data: any[]) => {
    const months: { [key: string]: number } = {};
    data.forEach(item => {
      const month = new Date(item.created_at).toLocaleString('mn-MN', { month: 'short' });
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  };

  const chartData = {
    labels: stats.monthlyStats.map(item => item.month),
    datasets: [
      {
        label: 'Сарын тендерийн тоо',
        data: stats.monthlyStats.map(item => item.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Сүүлийн 6 сарын тендерийн статистик',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Нийт тендер</h3>
          <p className="mt-2 text-3xl font-semibold">{stats.totalProcurements}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Идэвхтэй тендер</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.activeTenders}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Дууссан тендер</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{stats.completedTenders}</p>
        </Card>
      </div>

      <Card className="p-6">
        <Bar options={chartOptions} data={chartData} />
      </Card>
    </div>
  );
}
