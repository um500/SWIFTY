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
      const filtered = res?.filter((item: any) => item?.tour) || [];
      setData(filtered);
    });
  }, []);

  return (
    <section className="relative">

      {/* ================= BANNER ================= */}
      <div className="relative h-[260px] md:h-[320px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="banner"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        {/* content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-tight">
              All-inclusive tours with airfare
            </h1>
            <p className="text-white/90 mt-2 text-sm md:text-lg">
              Go India · Go Foreign
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="max-w-[1200px] mx-auto -mt-14 md:-mt-16 relative z-10 px-4">
        <div className="rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-[#1e293b] text-white">

          {data.length > 0 ? (
            data.map((item, i) => (
              <Link
                key={i}
                href={`/tour/${item.tour?.slug}`}
                onClick={() => setActiveTab(i)}
                className={`flex-1 flex flex-col items-center justify-center py-4 md:py-6 px-3 text-center border-b md:border-b-0 md:border-r border-gray-600 last:border-r-0 transition-all duration-300 ${
                  activeTab === i
                    ? "bg-[#334155]"
                    : "hover:bg-[#273449]"
                }`}
              >
                {/* PRICE */}
                <div className="text-lg md:text-2xl font-bold text-yellow-400">
                  ₹{item.tour?.price}
                </div>

                {/* divider */}
                <div className="w-8 h-[1px] bg-gray-500 my-2"></div>

                {/* TITLE */}
                <div className="text-sm md:text-base font-medium">
                  {item.tour?.title}
                </div>

                {/* DAYS */}
                <div className="text-xs text-gray-300">
                  ({item.tour?.days})
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-gray-300 w-full">
              No tours available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;