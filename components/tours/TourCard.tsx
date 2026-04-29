// import Link from "next/link";

// export default function TourCard({ tour }: any) {
//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">

//       {/* IMAGE */}
//       <div className="relative md:w-72 h-52 md:h-auto">
//         <img
//           src={tour.image}
//           alt={tour.title}
//           className="w-full h-full object-cover"
//         />

//         {/* ❤️ Wishlist icon */}
//         <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
//           ❤️
//         </div>
//       </div>

//       {/* CENTER CONTENT */}
//       <div className="flex-1 p-5 flex flex-col justify-between">

//         <div>
//           {/* TITLE */}
//           <h2 className="text-xl font-semibold text-gray-900">
//             {tour.title}
//           </h2>

//           {/* ⭐ RATING */}
//           <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
//             ⭐⭐⭐⭐⭐
//             <span>4.5 Reviews</span>
//           </div>

//           {/* ALL INCLUSIVE */}
//           <p className="text-blue-600 text-sm mt-2">
//             🔗 All Inclusive
//           </p>

//           {/* DETAILS */}
//           <div className="flex gap-4 mt-3 text-sm text-gray-700">
//             {tour.days && <span><b>{tour.days}</b> Days</span>}
//             <span>4 Cities</span>
//             <span>2 Dates</span>
//           </div>

//           {/* DESCRIPTION */}
//           <p className="text-gray-500 text-sm mt-2">
//             Experience the best of {tour.title} with guided tours...
//           </p>

//           {/* LOCATION */}
//           <p className="text-sm text-gray-500 mt-2">
//             📍 {tour.country}
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE PRICE */}
//       <div className="md:w-64 bg-gray-50 p-5 flex flex-col justify-between border-l">

//         <div>
//           <p className="text-sm text-gray-500">Starts from</p>

//           <p className="text-2xl font-bold text-gray-900">
//             ₹ {tour.price?.toLocaleString("en-IN")}
//           </p>

//           <p className="text-xs text-gray-500 mt-1">
//             per person on twin sharing
//           </p>

//           <p className="text-xs text-gray-400 mt-1">
//             EMI from ₹1000/mo
//           </p>
//         </div>

//         {/* BUTTONS */}
//         <div className="mt-4 space-y-2">
//           <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold transition">
//             Book Online
//           </button>

//           <Link href={`/tours/${tour.slug?.current}`}>
//             <button className="w-full border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
//               View Tour Details
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { Heart, Star, Clock, MapPin, Users, Zap, ChevronRight } from "lucide-react";
import { useState } from "react";

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
  const [liked, setLiked] = useState(false);

  // Deterministic-ish numbers based on title length
  const seed = tour.title.length;
  const reviewCount = (seed % 30) + 5;
  const cityCount = (seed % 5) + 2;
  const dateCount = (seed % 15) + 6;
  const emi = tour.price ? Math.round(tour.price / 10.34) : null;

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

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
        >
          <Heart
            size={15}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            GROUP TOUR
          </span>
          {tour.groupType && (
            <span className="bg-white/90 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow">
              {tour.groupType}
            </span>
          )}
        </div>
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
            <span className="text-xs text-teal-600 font-semibold">All Inclusive</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            {tour.days && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={11} className="text-gray-400" />
                {tour.days} Days
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={11} className="text-gray-400" />
              {cityCount} Cities
            </span>
            <Link
              href={`/tours/${tour.slug}`}
              className="text-xs text-blue-500 font-semibold hover:underline flex items-center gap-0.5"
            >
              {dateCount} Dates <ChevronRight size={11} />
            </Link>
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
            {emi && (
              <p className="text-[11px] text-gray-500 mt-1.5">
                EMI from{" "}
                <span className="font-bold text-gray-700">
                  ₹{emi.toLocaleString("en-IN")}/mo
                </span>
              </p>
            )}
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
            <div className="flex items-center justify-center gap-2 pt-1">
              <button className="text-[11px] text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                <Users size={11} /> Compare
              </button>
              <span className="text-gray-200 text-xs">|</span>
              <button className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors">
                Enquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GRID CARD ───────────────────────────────────────────────────────────────
function GridCard({ tour }: { tour: Tour }) {
  const [liked, setLiked] = useState(false);
  const seed = tour.title.length;
  const reviewCount = (seed % 30) + 5;

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
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={15}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
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