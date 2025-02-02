"use client";

interface StatItem {
  title: string;
  value: string;
  color: string;
}

interface StatsGridProps {
  title: string;
  stats: StatItem[];
}

export default function StatsGrid({ title, stats }: StatsGridProps) {
  return (
    <div className="max-w-[1230px] mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold uppercase text-[#003277] mb-6 flex items-center justify-between">
          {title}
          <button className="text-sm bg-[#003277] text-white px-3 py-1 rounded">
            ↑
          </button>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#00800014] rounded-lg p-6 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: stat.color }}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
