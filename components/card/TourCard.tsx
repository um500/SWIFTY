"use client";

import Link from "next/link";
import { Star, Clock, MapPin, ChevronRight, Heart } from "lucide-react";
import type { Tour } from "@/components/data/tours";

interface TourCardProps {
  tour: Tour;
  layout?: "grid" | "list";
}

const TourCard = ({ tour, layout = "grid" }: TourCardProps) => {

  // ================= LIST VIEW =================
  if (layout === "list") {
    return (
      <div className="vw-tour-card flex flex-col md:flex-row">

        {/* Image */}
        <div className="relative md:w-[260px] h-[200px] md:h-auto flex-shrink-0">
          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
          
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
            <Heart className="w-4 h-4 text-vw-text-light" />
          </button>
        </div>

        {/* Center */}
        <div className="flex-1 p-4 flex flex-col">

          <div className="flex items-center gap-2 mb-1">
            <span className="vw-badge vw-badge-group">{tour.category}</span>
            <span className="vw-badge vw-badge-code">{tour.code}</span>
            {tour.tags.map((tag) => (
              <span key={tag} className="vw-badge vw-badge-tag">{tag}</span>
            ))}
          </div>

          <h3 className="font-display font-semibold text-base text-vw-dark mt-1">
            {tour.title}
          </h3>

          {/* Reviews */}
          {tour.reviewCount > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(tour.rating)
                      ? "fill-vw-yellow text-vw-yellow"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-vw-text-light">
                {tour.reviewCount} Reviews
              </span>
            </div>
          )}

          {/* Info */}
          <div className="flex items-center gap-4 mt-2 text-sm text-vw-text">
            <span className="font-semibold">{tour.days} Days</span>
            <span className="text-vw-text-light">
              {tour.cities.length} Cities
            </span>

            <Link
              href={`/tour/${tour.slug}`}
              className="text-vw-blue text-xs hover:underline flex items-center gap-0.5"
            >
              {(tour.departureDates?.filter((d: any) => d.status !== "sold_out").length) || 0} Dates
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Filling Fast */}
          {tour.departureDates?.some((d: any) => d.status === "filling_fast") && (
            <div className="mt-2">
              <span className="text-xs font-semibold text-vw-red">
                Dates Filling Fast
              </span>

              {tour.departureDates
                .filter((d: any) => d.status === "filling_fast")
                .map((d: any, i: number) => (
                  <span key={i} className="text-xs text-vw-orange ml-2">
                    {new Date(d.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                    {d.seats && (
                      <span className="text-vw-red ml-1">
                        ({d.seats} seats)
                      </span>
                    )}
                  </span>
                ))}
            </div>
          )}

          <div className="mt-auto pt-3 flex gap-4 border-t border-vw-border text-xs text-vw-text-light">
            <button>🔄 Compare</button>
            <button>💬 Enquire Now</button>
          </div>
        </div>

        {/* Price */}
        <div className="md:w-[200px] border-l border-vw-border p-4 flex flex-col items-end bg-vw-light-bg">
          <p className="text-xs text-vw-text-light">Starts from</p>
          <p className="text-2xl font-bold text-vw-dark">
            ₹{tour.price.toLocaleString("en-IN")}
          </p>

          <div className="flex flex-col gap-2 w-full mt-4">
            <Link href={`/tour/${tour.slug}`} className="vw-btn-yellow text-center text-xs">
              Book Online
            </Link>
            <Link href={`/tour/${tour.slug}`} className="vw-btn-outline text-center text-xs">
              View Details
            </Link>
          </div>
        </div>

      </div>
    );
  }

  // ================= GRID VIEW =================
  return (
    <Link href={`/tour/${tour.slug}`} className="vw-tour-card group block">

      <div className="relative h-[180px] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        <button
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-3.5 h-3.5 text-vw-text-light" />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-display font-semibold text-sm text-vw-dark">
          {tour.title}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-xs text-vw-text-light">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {tour.days}D
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {tour.cities.length} Cities
          </span>
        </div>

        <div className="mt-2 pt-2 border-t border-vw-border flex justify-between">
          <div>
            <p className="text-[10px] text-vw-text-light">Starts from</p>
            <p className="text-base font-bold text-vw-dark">
              ₹{tour.price.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="text-xs text-vw-orange">View →</span>
        </div>
      </div>

    </Link>
  );
};

export default TourCard;