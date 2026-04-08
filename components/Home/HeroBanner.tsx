"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getHomeBanner } from "@/lib/sanity";

const HeroBanner = () => {
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getHomeBanner().then((res) => {
      const filtered = res.filter((item: any) => item?.tour);
      setData(filtered);
    });
  }, []);

  return (
    <section className="relative">

      {/* Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
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

      {/* 🔥 SINGLE BOX (PRICE + TITLE SAME PLACE) */}
      <div className="max-w-[1200px] mx-auto -mt-16 relative z-10 px-4">
        <div className="rounded-xl overflow-hidden shadow-xl flex bg-[#1e293b] text-white">

          {data.map((item, i) => (
            <Link
              key={i}
              href={`/tour/${item.tour.slug}`}
              onClick={() => setActiveTab(i)}
              className={`flex-1 flex flex-col items-center justify-center py-5 px-3 text-center border-r border-gray-600 last:border-r-0 transition ${
                activeTab === i
                  ? "bg-[#334155]"
                  : "hover:bg-[#273449]"
              }`}
            >
              {/* Price */}
              <div className="text-lg md:text-2xl font-bold text-yellow-400">
                ₹{item.tour?.price}
              </div>

              {/* Small Divider */}
              <div className="w-8 h-[1px] bg-gray-500 my-2"></div>

              {/* Title */}
              <div className="text-sm md:text-base font-medium">
                {item.tour?.title}
              </div>

              {/* Days */}
              <div className="text-xs text-gray-300">
                ({item.tour?.days})
              </div>

            </Link>
          ))}

        </div>
      </div>

    </section>
  );
};

export default HeroBanner;