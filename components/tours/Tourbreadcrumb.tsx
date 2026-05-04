// ============================================
// 📁 components/tours/TourBreadcrumb.tsx
// Breadcrumb navigation for tour detail page
// ============================================

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function TourBreadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-gray-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {isLast ? (
                <span className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-xs text-[#3b4fa8] hover:text-[#2d3d8a] hover:underline transition-colors font-medium"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}