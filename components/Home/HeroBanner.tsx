"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { priceCategories } from "@/components/data/tours";

const HeroBanner = () => {
  const [activePriceTab, setActivePriceTab] = useState(0);

  return (
    <section className="relative">

      {/* Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Travel Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              All-inclusive tours with airfare
            </h1>
            <p className="text-white/90 mt-2 text-lg">
              Go India · Go Foreign
            </p>
          </div>
        </div>
      </div>

      {/* Price Tabs */}
      <div className="max-w-[1200px] mx-auto -mt-16 relative z-10 px-4">
        <div className="rounded-xl overflow-hidden shadow-xl">

          {/* Tabs (Dark Background like 2nd image) */}
          <div className="flex overflow-x-auto bg-[#1e293b] text-white">

            {priceCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActivePriceTab(i)}
                className={`min-w-[90px] md:flex-1 text-center py-4 cursor-pointer transition-all border-r border-gray-600 last:border-r-0 ${
                  activePriceTab === i
                    ? "bg-[#334155]"
                    : "hover:bg-[#273449]"
                }`}
              >
                <div className="text-lg md:text-2xl font-bold text-yellow-400">
                  {cat.amount}
                </div>
              </button>
            ))}

          </div>

          {/* Tours Section */}
          <div className="px-6 py-4 bg-white">
            <div className="flex flex-wrap justify-between gap-y-2 text-sm">

              {priceCategories[activePriceTab]?.tours.map((tour: any) => (
                <Link
                  key={tour.slug}
                  href={`/tour/${tour.slug}`}
                  className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {tour.name}
                  <ChevronRight className="w-3 h-3" />
                </Link>
              ))}

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroBanner;