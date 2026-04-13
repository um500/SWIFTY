"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { Heart, Clock } from "lucide-react";
import { client } from "@/lib/sanity";

export default function WishlistPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});

  // ✅ FETCH DATA
  useEffect(() => {
    const favIds = getFavorites();
    setFavorites(favIds);

    if (!favIds.length) return;

    client
      .fetch(
        `*[_type == "tour" && _id in $ids]{
          _id,
          title,
          "slug": slug.current,
          price,
          days,
          "images": images[].asset->url
        }`,
        { ids: favIds }
      )
      .then((res) => {
        setTours(res);
      });
  }, []);

  // ✅ IMAGE AUTO SLIDER
  useEffect(() => {
    if (!tours.length) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const updated: Record<string, number> = {};

        tours.forEach((tour) => {
          const len = tour?.images?.length || 1;

          updated[tour._id] =
            ((prev[tour._id] || 0) + 1) % len;
        });

        return { ...prev, ...updated };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [tours]);

  // ❌ EMPTY STATE
  if (!favorites.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">No favorites yet </h2>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Wishlist 
          </h2>
          <div className="w-12 h-[3px] bg-orange-500 mt-1 rounded" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {tours.map((tour) => {
            const isFav = favorites.includes(tour._id);
            const images = tour?.images || [];
            const currentIndex = imageIndex[tour._id] || 0;

            return (
              <div
                key={tour._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  {/* ❤️ REMOVE */}
                  <button
                    onClick={() => {
                      const updated = toggleFavorite(tour._id);
                      setFavorites(updated);
                      setTours((prev) =>
                        prev.filter((t) => t._id !== tour._id)
                      );

                      window.dispatchEvent(new Event("favoritesUpdated"));
                    }}
                    className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow hover:scale-110 transition"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>

                  {/* IMAGE SLIDER */}
                  {images.length > 0 ? (
                    <img
                      src={images[currentIndex]}
                      alt={tour.title}
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
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3" />
                    {tour.days}D/{tour.days - 1}N
                  </div>

                  <div className="border-t my-3"></div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Starts from</p>
                      <p className="font-bold text-gray-900">
                        ₹{tour.price}
                      </p>
                    </div>

                    <Link
                      href={`/tour/${tour.slug}`}
                      className="text-orange-500 text-sm font-medium hover:underline"
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