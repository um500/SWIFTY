"use client";

import Link from "next/link";
import {
  Star,
  Clock,
  MapPin,
  Zap,
} from "lucide-react";
import { useWishlist } from "@/lib/useWishlist";

export interface Tour {
  _id: string;
  title: string;
  slug: string;
  price?: number;
  days?: number;
  rating?: number;
  image?: string;
  images?: string[];
  state?: string;
  country?: string;
  highlights?: string[];
  groupType?: string;
  tourCode?: string;
}

// ─── LIST CARD ───────────────────────────────────────────────────────────────
function ListCard({ tour }: { tour: Tour }) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(tour._id);

  const seed = tour.title.length;
  const reviewCount = (seed % 30) + 5;

  const wishlistPayload = {
    _id: tour._id,
    title: tour.title,
    slug: tour.slug,
    price: tour.price ?? 0,
    days: tour.days,
    image: tour.image,
    location: [tour.state, tour.country].filter(Boolean).join(", "),
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row">
      {/* IMAGE */}
      <div className="relative sm:w-[230px] sm:min-w-[230px] h-[200px] sm:h-auto overflow-hidden group/img">
        {tour.image ? (
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <MapPin size={32} className="text-gray-400" />
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(wishlistPayload);
          }}
          aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
          className={`
            absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
            shadow-sm transition-all duration-200 active:scale-90 z-10
            ${active ? "bg-red-500" : "bg-white/90 backdrop-blur-sm hover:scale-110"}
          `}
        >
          <svg
            width="15" height="15"
            viewBox="0 0 24 24"
            fill={active ? "white" : "none"}
            stroke={active ? "none" : "#9ca3af"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col sm:flex-row min-w-0">
        {/* MIDDLE */}
        <div className="flex-1 p-4 min-w-0">
          {/* Title */}
          <Link href={`/tours/${tour.slug}`}>
            <h3 className="font-bold text-gray-900 text-[15px] leading-snug hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
              {tour.title}
            </h3>
          </Link>

          {/* Stars + reviews */}
          <div className="flex items-center gap-1.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < Math.round(tour.rating ?? 4)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
            <span className="text-xs text-gray-400 ml-0.5">
              {reviewCount} Reviews
            </span>
          </div>

          {/* All Inclusive */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
              <Zap size={9} className="text-white" />
            </div>
            <span className="text-xs text-teal-600 font-semibold">
              All Inclusive
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            {tour.days && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={11} className="text-gray-400" />
                {tour.days} Days
              </span>
            )}
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mt-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Tour Highlights
              </p>
              <p className="text-xs text-gray-500 line-clamp-2">
                {tour.highlights.slice(0, 4).join(" • ")}
                {tour.highlights.length > 4 && (
                  <Link href={`/tours/${tour.slug}`}>
                    <span className="text-blue-500 cursor-pointer"> More</span>
                  </Link>
                )}
              </p>
            </div>
          )}

          {/* Location */}
          {(tour.state || tour.country) && (
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <MapPin size={10} />
              {[tour.state, tour.country].filter(Boolean).join(", ")}
            </p>
          )}
        </div>

        {/* PRICE PANEL */}
        <div className="sm:w-[190px] sm:min-w-[190px] border-t sm:border-t-0 sm:border-l border-gray-100 p-4 flex flex-col justify-between bg-gray-50/50">
          <div>
            <p className="text-[11px] text-gray-400">Starts from</p>
            <p className="text-[26px] font-extrabold text-gray-900 leading-tight mt-0.5">
              ₹{tour.price?.toLocaleString("en-IN") ?? "—"}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
              per person on twin sharing
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href={`/tours/${tour.slug}`}
              className="block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm text-center py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Book Online
            </Link>
            <Link
              href={`/tours/${tour.slug}`}
              className="block border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-medium text-sm text-center py-2.5 rounded-xl transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GRID CARD ───────────────────────────────────────────────────────────────
function GridCard({ tour }: { tour: Tour }) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(tour._id);

  const seed = tour.title.length;
  const reviewCount = (seed % 30) + 5;

  const wishlistPayload = {
    _id: tour._id,
    title: tour.title,
    slug: tour.slug,
    price: tour.price ?? 0,
    days: tour.days,
    image: tour.image,
    location: [tour.state, tour.country].filter(Boolean).join(", "),
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        {tour.image ? (
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <MapPin size={32} className="text-gray-400" />
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(wishlistPayload);
          }}
          aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
          className={`
            absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
            shadow-sm transition-all duration-200 active:scale-90
            ${active ? "bg-red-500" : "bg-white/90 hover:scale-110"}
          `}
        >
          <svg
            width="15" height="15"
            viewBox="0 0 24 24"
            fill={active ? "white" : "none"}
            stroke={active ? "none" : "#9ca3af"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {tour.days && (
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
            <Clock size={10} /> {tour.days} Days
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {tour.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={
                i < Math.round(tour.rating ?? 4)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          <span className="text-[11px] text-gray-400 ml-0.5">{reviewCount}</span>
        </div>

        {(tour.state || tour.country) && (
          <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
            <MapPin size={9} />
            {[tour.state, tour.country].filter(Boolean).join(", ")}
          </p>
        )}

        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-[10px] text-gray-400">From</p>
            <p className="text-lg font-extrabold text-gray-900">
              ₹{tour.price?.toLocaleString("en-IN") ?? "—"}
            </p>
          </div>
          <Link
            href={`/tours/${tour.slug}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
export default function TourCard({
  tour,
  view = "list",
}: {
  tour: Tour;
  view?: "list" | "grid";
}) {
  return view === "grid" ? <GridCard tour={tour} /> : <ListCard tour={tour} />;
}