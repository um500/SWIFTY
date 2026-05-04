"use client";

import { useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/lib/useWishlist";
import { MapPin, Clock, Star, Zap, Trash2, ArrowLeft } from "lucide-react";

function getSlug(slug: any): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug?.current ?? "";
}

export default function WishlistPage() {
  const { wishlist, count, remove, clear } = useWishlist();
  const [removing, setRemoving] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleRemove = (id: string) => {
    setRemoving(id);
    setTimeout(() => {
      remove(id);
      setRemoving(null);
    }, 300);
  };

  const handleClear = () => {
    setShowConfirmClear(false);
    clear();
  };

  /* ─── EMPTY STATE ─── */
  if (count === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f5f5f5] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          Heart kisi bhi tour pe click karo — woh yahan save ho jaayega.
        </p>
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#1e293b] transition-colors"
        >
          <ArrowLeft size={16} />
          Tours Explore Karo
        </Link>
      </div>
    );
  }

  /* ─── WISHLIST PAGE ─── */
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {count} {count === 1 ? "tour" : "tours"} saved
            </p>
          </div>

          <div className="flex items-center gap-3">
            {showConfirmClear ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                <span className="text-sm text-red-700 font-medium">
                  Sab hatao?
                </span>
                <button
                  onClick={handleClear}
                  className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Haan
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="text-xs text-gray-500 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Nahi
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* ── TOUR LIST ── */}
        <div className="flex flex-col gap-4">
          {wishlist.map((tour) => {
            const slug = getSlug(tour.slug);
            const isRemoving = removing === tour._id;
            const seed = tour.title.length;
            const reviewCount = (seed % 30) + 5;

            return (
              <div
                key={tour._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col sm:flex-row"
                style={{
                  opacity: isRemoving ? 0 : 1,
                  transform: isRemoving ? "scale(0.97)" : "scale(1)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                  pointerEvents: isRemoving ? "none" : "auto",
                }}
              >
                {/* IMAGE */}
                <div className="relative sm:w-[220px] sm:min-w-[220px] h-[190px] sm:h-auto overflow-hidden bg-gray-100">
                  {tour.image ? (
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin size={32} className="text-gray-300" />
                    </div>
                  )}

                  {/* Remove heart button */}
                  <button
                    onClick={() => handleRemove(tour._id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col sm:flex-row min-w-0">

                  {/* MIDDLE INFO */}
                  <div className="flex-1 p-4 min-w-0">
                    <Link href={slug ? `/tours/${slug}` : "#"}>
                      <h2 className="font-bold text-gray-900 text-[15px] leading-snug hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                        {tour.title}
                      </h2>
                    </Link>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < 4
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

                    {/* Days */}
                    {tour.days && (
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                        <Clock size={11} className="text-gray-400" />
                        {tour.days} Days
                      </div>
                    )}

                    {/* Location */}
                    {tour.location && (
                      <p className="flex items-center gap-1 text-[11px] text-gray-400 mt-1.5">
                        <MapPin size={10} />
                        {tour.location}
                      </p>
                    )}
                  </div>

                  {/* PRICE PANEL */}
                  <div className="sm:w-[185px] sm:min-w-[185px] border-t sm:border-t-0 sm:border-l border-gray-100 p-4 flex flex-col justify-between bg-gray-50/50">
                    <div>
                      <p className="text-[11px] text-gray-400">Starts from</p>
                      <p className="text-[26px] font-extrabold text-gray-900 leading-tight mt-0.5">
                        ₹{(tour.price ?? 0).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                        per person on twin sharing
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Link
                        href={slug ? `/tours/${slug}` : "#"}
                        className="block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm text-center py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        Book Online
                      </Link>
                      <Link
                        href={slug ? `/tours/${slug}` : "#"}
                        className="block border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-medium text-sm text-center py-2.5 rounded-xl transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM LINK ── */}
        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} />
            More Tours
          </Link>
        </div>

      </div>
    </div>
  );
}