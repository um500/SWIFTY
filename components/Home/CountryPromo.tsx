"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountryFav } from "@/lib/sanity";

export default function CountryPromo() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryFav()
      .then((res) => {
        // ✅ DIRECT USE (NO FLATTEN)
        setCountries(res?.slice(0, 4) || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full bg-[#4b5563] py-12">
      <div className="max-w-[1440px] mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT CARD */}
          <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[360px] group shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
              alt="Explore World"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="absolute bottom-5 left-5">
              <p className="text-white/80 text-xs">Travel World</p>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Explore The World
              </h3>

              <p className="text-white/90 text-sm mt-1">
                Discover your next destination
              </p>

              <Link href="/tours">
                <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                  Explore All Tours ✈️
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            {/* HEADER */}
            <div className="flex items-start gap-3 mb-5">
              <span className="text-2xl">🌍</span>

              <div>
                <h3 className="font-semibold text-lg text-white">
                  Most Loved Destinations
                </h3>

                <p className="text-sm text-gray-200">
                  Top countries based on tours
                </p>

                <div className="mt-1 w-10 h-[2px] bg-orange-400 rounded" />
              </div>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="h-[120px] rounded-xl bg-gray-600 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">

                {countries.map((item, i) => (
                  <Link
                    key={item?._id || i}
                    href={`/international/${item?.slug || ""}`}
                    className="relative rounded-xl overflow-hidden h-[120px] group shadow-md"
                  >
                    {/* IMAGE */}
                    <img
                      src={item?.image || "https://via.placeholder.com/400x300"}
                      alt={item?.name || "country"}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* TOUR COUNT */}
                    <div className="absolute top-2 left-2 px-2 py-[2px] rounded bg-black/60 backdrop-blur-sm">
                      <span className="text-[10px] text-white font-medium">
                        {item?.tourCount ?? 0} Tours
                      </span>
                    </div>

                    {/* NAME */}
                    <div className="absolute bottom-2 left-2">
                      <p className="text-sm font-semibold text-white drop-shadow-md">
                        {item?.name || "Unknown"}
                      </p>
                    </div>

                    {/* HOVER */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
                  </Link>
                ))}

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}