// ============================================
// 📁 components/home/DestinationScroller.tsx
// State destination pills — clicking navigates to /tours?state=<slug>
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { destinationQuery } from "@/lib/queries";

type Destination = {
  name: string;
  slug: string;
  image: string;
  tours: number;
  country?: {
    name: string;
    slug: string;
  };
};

const DestinationScroller = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    client.fetch(destinationQuery).then((data: Destination[]) => {
      setDestinations(Array.isArray(data) ? data : []);
    });
  }, []);

  // Duplicate items enough times for a seamless infinite scroll loop
  const getLoopData = (data: Destination[]): Destination[] => {
    if (!data.length) return [];
    const minItems = 30;
    const repeatCount = Math.ceil(minItems / data.length);
    return Array.from({ length: repeatCount }, () => data).flat();
  };

  const loopData = getLoopData(destinations);

  // Auto-scroll via RAF
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;

    const scroll = () => {
      if (!isPaused.current) {
        el.scrollLeft += 0.5;
        // Seamless wrap: reset when we've scrolled through the first half
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      raf = requestAnimationFrame(scroll);
    };

    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [loopData.length]);

  const handleArrow = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    isPaused.current = true;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

    setTimeout(() => {
      isPaused.current = false;
    }, 1000);
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1440px] mx-auto px-4 relative">

        {/* LEFT ARROW */}
        <button
          onClick={() => handleArrow("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-100 text-gray-800 shadow-md rounded-full p-2 hover:bg-gray-200 cursor-pointer"
          aria-label="Scroll left"
        >
          ◀
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => handleArrow("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gray-100 text-gray-800 shadow-md rounded-full p-2 hover:bg-gray-200 cursor-pointer"
          aria-label="Scroll right"
        >
          ▶
        </button>

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll whitespace-nowrap scrollbar-hide w-full"
        >
          {loopData.map((dest, index) => (
            // ✅ FIXED: /tours?state=<stateSlug> for proper filtering
            <Link
              key={index}
              href={`/tours?state=${dest.slug}`}
              onMouseEnter={() => { isPaused.current = true; }}
              onMouseLeave={() => { isPaused.current = false; }}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent group-hover:border-yellow-400"
              />
              <span className="text-xs font-semibold text-center max-w-[80px] truncate text-gray-900">
                {dest.name}
              </span>
              <span className="text-[10px] text-gray-500">
                {dest.tours} tours
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationScroller;