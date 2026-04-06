import Link from "next/link";
import { destinations } from "@/components/data/tours";

const DestinationScroller = () => (
  <section className="py-8 max-w-[1440px] mx-auto px-4">
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {destinations.map((dest) => (
        <Link
          key={dest.slug}
          href={`/india/${dest.slug}`}
          className="vw-dest-icon flex-shrink-0"
        >
          <img src={dest.image} alt={dest.name} />

          <span className="text-xs font-semibold text-vw-text text-center leading-tight max-w-[80px] truncate">
            {dest.name}
          </span>

          <span className="text-[10px] text-vw-text-light">
            {dest.tours} tours
          </span>
        </Link>
      ))}
    </div>
  </section>
);

export default DestinationScroller;