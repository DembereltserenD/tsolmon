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
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold uppercase text-[#003277] mb-4 sm:mb-6 flex items-center justify-between">
        {title}
        <button className="text-sm bg-[#003277] text-white px-3 py-1 rounded hover:bg-[#002255] transition-colors">
          ↑
        </button>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg"
            style={{ backgroundColor: stat.color }}
          >
            <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
              {stat.title}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-[#003277]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
