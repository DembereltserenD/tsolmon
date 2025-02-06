'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'

interface TenderStatsChartProps {
  data: {
    created_at: string;
  }[];
}

export function TenderStatsChart({ data }: TenderStatsChartProps) {
  // Memoize the chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    const counts: { [key: string]: number } = {}
    
    // Count tenders by month
    data.forEach(item => {
      const date = format(parseISO(item.created_at), 'yyyy-MM')
      counts[date] = (counts[date] || 0) + 1
    })

    // Convert to chart format and sort by date
    return Object.entries(counts)
      .map(([date, count]) => ({
        date,
        count
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [data])

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Сүүлийн 6 сарын тендерийн статистик</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(parseISO(date), 'MM/yyyy')}
            />
            <YAxis
              width={50}
              tickCount={5}
              allowDecimals={false}
              label={{ value: 'Тендерийн тоо', angle: -90, position: 'insideLeft', offset: 0 }}
            />
            <Tooltip
              labelFormatter={(date) => format(parseISO(date as string), 'MM/yyyy')}
              formatter={(value) => [(value as number), 'Тендерийн тоо']}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
