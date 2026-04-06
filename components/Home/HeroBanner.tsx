"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { priceCategories } from "@/components/data/tours";

// ✅ Types define karo
type Tour = {
  slug: string;
  name: string;
};

type PriceCategory = {
  amount: string;
  tours: Tour[];
};

const HeroBanner = () => {
  const [activePriceTab, setActivePriceTab] = useState<number>(0);

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
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white">
              All-inclusive tours with airfare
            </h1>
            <p className="text-white/90 mt-2 text-lg font-display">
              Go India · Go Foreign
            </p>
          </div>
        </div>
      </div>

      {/* Price Tabs Section */}
      <div className="max-w-[1200px] mx-auto -mt-16 relative z-10 px-4">
        <div className="bg-vw-dark rounded-xl overflow-hidden shadow-xl">

          {/* Tabs */}
          <div className="flex overflow-x-auto">
            {(priceCategories as PriceCategory[]).map((cat, i) => (
              <button
                key={i}
                onClick={() => setActivePriceTab(i)}
                className={`vw-price-tab ${
                  activePriceTab === i ? "active" : ""
                }`}
              >
                <div className="vw-price-tab-amount">
                  {cat.amount}
                </div>
              </button>
            ))}
          </div>

          {/* Tours List */}
          <div className="px-6 py-4 bg-white rounded-b-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">

              {(priceCategories as PriceCategory[])[activePriceTab].tours.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tour/${tour.slug}`}
                  className="flex items-center gap-1 text-sm text-vw-text hover:text-vw-orange transition-colors py-1.5"
                >
                  {tour.name}
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
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