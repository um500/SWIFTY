import Link from "next/link";
import { tours } from "@/components/data/tours";

const ContinuePlan = () => (
  <section className="py-8 bg-white border-y border-vw-border">
    <div className="max-w-[1440px] mx-auto px-4">
      <h2 className="text-lg font-display font-bold text-vw-dark mb-5">
        Hey Guest, Continue your travel plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tours.slice(0, 4).map((tour) => (
          <Link
            key={tour.slug}
            href={`/tour/${tour.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl border border-vw-border hover:shadow-md transition-shadow bg-white"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />

            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-vw-dark truncate">
                {tour.title}
              </h4>

              <p className="text-xs text-vw-text-light">
                {tour.duration}
              </p>

              <p className="text-sm font-bold text-vw-dark">
                ₹{tour.price.toLocaleString("en-IN")}
                <span className="text-[10px] font-normal text-vw-text-light">
                  {" "} /pp twin sharing
                </span>
              </p>

              <span className="text-xs text-vw-orange font-medium">
                Book Now ›
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ContinuePlan;