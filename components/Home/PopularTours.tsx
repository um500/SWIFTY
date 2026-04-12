"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Heart } from "lucide-react";

import { getPopularTours } from "@/lib/sanity";
import {
  getFavorites,
  toggleFavorite,
} from "@/lib/favorites";

export default function PopularTours() {
  const [tours, setTours] = useState<any[]>([]);
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  // ✅ FETCH + FLATTEN
  useEffect(() => {
    getPopularTours().then((res) => {
      if (!res) return;

      const flat = res.flatMap((item: any) => item?.tours || []);

      const unique = Array.from(
        new Map(flat.map((t: any) => [t._id, t])).values()
      );

      setTours(unique.slice(0, 4));
    });
  }, []);

  // ✅ LOAD FAVORITES
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // ✅ IMAGE AUTO SLIDER
  useEffect(() => {
    if (!tours.length) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const updated: Record<string, number> = {};

        tours.forEach((tour: any) => {
          const length = tour?.images?.length || 1;

          updated[tour._id] =
            ((prev[tour._id] || 0) + 1) % length;
        });

        return { ...prev, ...updated };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [tours]);

  if (!tours.length) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Tours
            </h2>

            <div className="w-12 h-[3px] bg-orange-500 mt-1 rounded" />
          </div>

          <Link
            href="/tours"
            className="text-sm font-medium text-gray-700 flex items-center gap-1 group hover:text-orange-500 transition"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {tours.map((tour: any) => {
            const images = tour?.images || [];
            const currentIndex = imageIndex[tour._id] || 0;
            const isFav = favorites.includes(tour._id);

            return (
              <div
                key={tour._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  {/* ❤️ FAVORITE BUTTON */}
                  <button
                    onClick={() => {
                      const updated = toggleFavorite(tour._id);
                      setFavorites(updated);
                    }}
                    className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow hover:scale-110 transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>

                  {/* IMAGE SLIDER */}
                  {images.length > 0 ? (
                    <img
                      src={images[currentIndex]}
                      alt={tour?.title}
                      className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {tour?.title}
                  </h3>

                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tour?.days || 0}D
                    </span>
                  </div>

                  <div className="border-t my-3"></div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Starts from</p>
                      <p className="font-bold text-gray-900">
                        ₹{tour?.price || 0}
                      </p>
                    </div>

                    <Link
                      href={`/tour/${tour?.slug}`}
                      className="text-gray-700 hover:text-orange-500 transition"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}