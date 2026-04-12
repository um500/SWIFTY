"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeatureCards } from "@/lib/sanity";

// ============= MAIN =============
export default function FeatureCards() {
  const [last, setLast] = useState<any[]>([]);
  const [visa, setVisa] = useState<any[]>([]);
  const [custom, setCustom] = useState<any[]>([]);

  useEffect(() => {
    getFeatureCards().then((data) => {
      if (!data) return;

      setLast(data.filter((i: any) => i.sections?.includes("last")));
      setVisa(data.filter((i: any) => i.sections?.includes("visa")));
      setCustom(data.filter((i: any) => i.sections?.includes("custom")));
    });
  }, []);

  return (
    <section className="py-10 bg-[#F3F4F6] space-y-6">
      <ScrollRow title="Last Minute departures" data={last} direction="left" />
      <ScrollRow
        title="Travel with zero visa stress"
        data={visa}
        direction="right"
        isDark
      />
      <ScrollRow title="Customized Holidays" data={custom} direction="left" />
    </section>
  );
}

//////////////////////////////////////////////////////////

const ScrollRow = ({
  title,
  data = [],
  isDark,
  direction = "left",
}: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !Array.isArray(data) || data.length === 0) return;

    let raf: number;
    const speed = 0.5;

    const start = () => {
      const singleWidth = el.scrollWidth / 2;

      // 👉 start from middle
      el.scrollLeft = singleWidth;

      const scroll = () => {
        if (!isPaused.current) {
          if (direction === "left") {
            el.scrollLeft += speed;

            if (el.scrollLeft >= singleWidth * 2) {
              el.scrollLeft = singleWidth;
            }
          } else {
            el.scrollLeft -= speed;

            if (el.scrollLeft <= 0) {
              el.scrollLeft = singleWidth;
            }
          }
        }

        raf = requestAnimationFrame(scroll);
      };

      raf = requestAnimationFrame(scroll);
    };

    // ✅ IMPORTANT (fix for 1st & 3rd section issue)
    requestAnimationFrame(() => {
      requestAnimationFrame(start);
    });

    return () => cancelAnimationFrame(raf);
  }, [data.length, direction]);

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
    }, 600);
  };

  return (
    <div
      className={`relative rounded-2xl py-5 ${
        isDark
          ? "bg-[#4B5563]"
          : "bg-white shadow-sm border border-gray-100"
      }`}
    >
      {/* TITLE */}
      <h2
        className={`text-lg font-semibold mb-4 px-8 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>

      {/* ARROWS */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
      >
        ◀
      </button>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
      >
        ▶
      </button>

      {/* SCROLL */}
      <div className="px-10 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {/* ✅ REQUIRED for infinite loop */}
          {[...data, ...data, ...data, ...data, ...data, ...data, ...data,...data,...data,...data,].map((item: any, i: number) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

//////////////////////////////////////////////////////////

const Card = ({ item }: any) => {
  return (
    <Link href={`/tour/${item.slug}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="min-w-[300px] bg-white rounded-xl shadow-sm hover:shadow-md p-4 flex items-center gap-3 cursor-pointer border border-gray-100"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-[70px] h-[70px] rounded-lg object-cover"
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {item.title}
          </h3>

          <p className="text-xs text-gray-500">
            {item.days || "4D/3N"}
          </p>

          <p className="text-sm font-bold text-black mt-1">
            ₹{item.price}
            <span className="text-xs text-gray-500">
              {" "} /pp twin sharing
            </span>
          </p>

          <span className="text-yellow-500 text-xs mt-1 inline-block">
            View Details →
          </span>
        </div>
      </motion.div>
    </Link>
  );
};