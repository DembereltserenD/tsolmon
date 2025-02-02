"use client";

interface FeedbackItem {
  label: string;
  percentage: number;
  count?: number;
}

interface FeedbackProps {
  title: string;
  middleText: string;
  subtitle: string;
  items: FeedbackItem[];
}

export default function Feedback({ title, middleText, subtitle, items }: FeedbackProps) {
  return (
    <div className="max-w-[1230px] mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-bold text-[#003277] uppercase mb-2">{title}</h2>
        <p className="text-sm text-gray-800 font-medium mb-3">{middleText}</p>
        <p className="text-sm text-gray-600 mb-6">{subtitle}</p>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-right text-sm text-[#003277] font-medium">
                {item.percentage.toFixed(2)}%
              </div>
              <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#003277] rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="flex-1 text-sm text-gray-600">
                {item.label}
                {item.count !== undefined && (
                  <span className="text-[#003277] ml-2">({item.count})</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button className="px-4 py-2 text-sm bg-[#003277] text-white rounded hover:bg-blue-800 transition-colors">
            Санал өгөх
          </button>
          <button className="px-4 py-2 text-sm border border-[#003277] text-[#003277] rounded hover:bg-gray-50 transition-colors">
            Бусад санал асуулга
          </button>
        </div>
      </div>
    </div>
  );
}
