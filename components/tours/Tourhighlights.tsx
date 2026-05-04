// ============================================
// 📁 components/tours/TourHighlights.tsx
// Tour highlights quick-view chips — no bullet icons
// ============================================

interface Props {
  items: string[];
}

export default function TourHighlights({ items = [] }: Props) {
  if (!items.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        Tour Highlights
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-sm bg-[#eef0f8] text-[#3b4fa8] border border-[#d8dbed] px-3 py-1.5 rounded-full font-medium hover:bg-[#e2e5f5] transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}