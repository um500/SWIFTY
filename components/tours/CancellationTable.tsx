"use client";

interface CancellationItem {
  amount: string;
  percent: string;
  days?: string;
  dateRange?: string;
}

interface Props {
  data: CancellationItem[];
}

function getBorderColor(percent: string) {
  const value = parseInt(percent, 10);
  if (isNaN(value)) return "border-l-gray-400";
  if (value <= 20) return "border-l-green-500";
  if (value <= 50) return "border-l-yellow-500";
  if (value < 100) return "border-l-orange-500";
  return "border-l-red-500";
}

export default function CancellationTable({ data }: Props) {
  if (!data.length) return null;

  return (
    <section className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0f8] text-xl">
          📄
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Cancellation Policy</h2>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-200 border-l-4 ${getBorderColor(
              item.percent
            )} rounded-lg px-4 py-3 bg-gray-50`}
          >
            {/* Amount + percent */}
            <div className="font-semibold text-gray-900">
              ₹{item.amount}{" "}
              <span className="text-gray-500 font-normal text-sm">
                ({item.percent}% deduction from tour amount)
              </span>
            </div>

            {/* Days */}
            {item.days && (
              <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item.days} days prior
              </div>
            )}

            {/* Date range */}
            {item.dateRange && (
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {item.dateRange}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
        {[
          { color: "bg-green-500", label: "Low penalty (≤ 20%)" },
          { color: "bg-yellow-500", label: "Moderate (≤ 50%)" },
          { color: "bg-orange-500", label: "High (< 100%)" },
          { color: "bg-red-500", label: "Full deduction (100%)" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-gray-500">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}