import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TourCard from "@/components/card/TourCard";
import { tours } from "@/components/data/tours"

const PopularTours = () => (
  <section className="py-10 bg-vw-light-bg">
    <div className="max-w-[1440px] mx-auto px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-vw-dark">
          Popular Tours
        </h2>

        <Link
          href="/india/all"
          className="text-sm text-vw-orange hover:underline font-medium flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tours.slice(0, 8).map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
      </div>

    </div>
  </section>
);

export default PopularTours;