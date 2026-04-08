"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  const isPaused = useRef(false); // 🔥 control auto scroll

  // ✅ Fetch data
  useEffect(() => {
    const loadData = async () => {
      const data = await client.fetch(destinationQuery);
      setDestinations(data);
    };
    loadData();
  }, []);

  // ✅ Dynamic loop
  const getLoopData = (data: Destination[]) => {
    if (!data.length) return [];

    const minItems = 30;
    const repeatCount = Math.ceil(minItems / data.length);

    let result: Destination[] = [];

    for (let i = 0; i < repeatCount; i++) {
      result = [...result, ...data];
    }

    return result;
  };

  const loopData = getLoopData(destinations);

  // ✅ 🔥 AUTO SCROLL (HOVER PAUSE SUPPORT)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;

    const scroll = () => {
      if (!isPaused.current) {
        el.scrollLeft += 0.5;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      raf = requestAnimationFrame(scroll);
    };

    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ✅ Arrow click
  const handleScroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    isPaused.current = true;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });

    setTimeout(() => {
      isPaused.current = false;
    }, 1000);
  };

  return (
    <section className="py-8 max-w-[1440px] mx-auto px-4 relative">

      {/* LEFT */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        ◀
      </button>

      {/* RIGHT */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        ▶
      </button>

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-scroll whitespace-nowrap scrollbar-hide w-full"
      >
        {loopData.map((dest, index) => (
          <Link
            key={index}
            href={`/${dest.country?.slug}/${dest.slug}`}
            onMouseEnter={() => (isPaused.current = true)}  // 🔥 HOVER PAUSE
            onMouseLeave={() => (isPaused.current = false)} // 🔥 RESUME
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent group-hover:border-yellow-400"
            />

            <span className="text-xs font-semibold text-center max-w-[80px] truncate">
              {dest.name}
            </span>

            <span className="text-[10px] text-gray-500">
              {dest.tours} tours
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestinationScroller;