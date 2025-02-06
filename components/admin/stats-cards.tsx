interface StatsCardsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Нийт тендер</h3>
        <p className="text-3xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Идэвхтэй тендер</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Дууссан тендер</h3>
        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
      </div>
    </div>
  )
}
