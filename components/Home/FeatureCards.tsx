// ============================================
// 📁 components/home/FeatureCards.tsx
// ✅ FIXED: /tours/<slug>  (was /tour/<slug> → 404)
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeatureCards } from "@/lib/sanity";

export default function FeatureCards() {
  const [last, setLast]     = useState<any[]>([]);
  const [visa, setVisa]     = useState<any[]>([]);
  const [custom, setCustom] = useState<any[]>([]);

  useEffect(() => {
    getFeatureCards().then((data) => {
      if (!data) return;
      setLast(data.filter((i: any)   => i.sections?.includes("last")));
      setVisa(data.filter((i: any)   => i.sections?.includes("visa")));
      setCustom(data.filter((i: any) => i.sections?.includes("custom")));
    });
  }, []);

  return (
    <section className="py-10 bg-[#F3F4F6] space-y-6">
      <ScrollRow title="Last Minute departures"      data={last}   direction="left"  />
      <ScrollRow title="Travel with zero visa stress" data={visa}  direction="right" isDark />
      <ScrollRow title="Customized Holidays"          data={custom} direction="left"  />
    </section>
  );
}

const CARD_WIDTH = 300;
const CARD_GAP   = 24;
const CARD_UNIT  = CARD_WIDTH + CARD_GAP;

const ScrollRow = ({
  title, data = [], isDark, direction = "left",
}: {
  title: string; data: any[]; isDark?: boolean; direction?: "left" | "right";
}) => {
  const trackRef         = useRef<HTMLDivElement>(null);
  const offsetRef        = useRef(0);
  const pausedRef        = useRef(false);
  const rafRef           = useRef<number>(0);
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const SPEED = 0.6;

  useEffect(() => {
    if (!data.length) return;
    const totalWidth = data.length * CARD_UNIT;
    offsetRef.current = direction === "right" ? totalWidth : 0;

    const animate = () => {
      if (!pausedRef.current && trackRef.current) {
        if (direction === "left") {
          offsetRef.current += SPEED;
          if (offsetRef.current >= totalWidth) offsetRef.current -= totalWidth;
        } else {
          offsetRef.current -= SPEED;
          if (offsetRef.current <= 0) offsetRef.current += totalWidth;
        }
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [data, direction]);

  const handleArrow = (dir: "left" | "right") => {
    pausedRef.current = true;
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    const totalWidth = data.length * CARD_UNIT;
    const delta = dir === "left" ? -CARD_UNIT : CARD_UNIT;
    const start = offsetRef.current;
    const duration = 400;
    const startTime = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateManual = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let current    = start + delta * ease(progress);
      current = ((current % totalWidth) + totalWidth) % totalWidth;
      offsetRef.current = current;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${-current}px)`;
      if (progress < 1) requestAnimationFrame(animateManual);
      else manualPauseTimer.current = setTimeout(() => { pausedRef.current = false; }, 200);
    };
    requestAnimationFrame(animateManual);
  };

  const items = data.length > 0 ? [...data, ...data, ...data] : [];

  return (
    <div className={`relative rounded-2xl py-6 ${isDark ? "bg-[#4B5563]" : "bg-white shadow-sm border border-gray-100"}`}>
      <div className="max-w-[1400px] mx-auto px-8">
        <h2 className={`text-lg font-semibold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
        <div className="relative">
          <button onClick={() => handleArrow("left")} aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors">
            ◀
          </button>
          <button onClick={() => handleArrow("right")} aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors">
            ▶
          </button>
          <div
            className="overflow-hidden px-10"
            onMouseEnter={() => { pausedRef.current = true; if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current); }}
            onMouseLeave={() => { if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current); pausedRef.current = false; }}
          >
            <div ref={trackRef} className="flex will-change-transform"
              style={{ gap: `${CARD_GAP}px`, width: `${items.length * CARD_UNIT}px` }}>
              {items.map((item: any, i: number) => <Card key={i} item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ item }: any) => (
  // ✅ /tours/<slug>
  <Link href={`/tours/${item.slug}`}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 flex items-center gap-3 cursor-pointer border border-gray-100"
      style={{ minWidth: `${CARD_WIDTH}px`, width: `${CARD_WIDTH}px` }}
    >
      <img src={item.image} alt={item.title} className="w-[70px] h-[70px] rounded-lg object-cover flex-shrink-0" />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.days || "4D/3N"}</p>
        <p className="text-sm font-bold text-black mt-1">
          ₹{item.price}
          <span className="text-xs text-gray-500"> /pp twin sharing</span>
        </p>
        <span className="text-yellow-500 text-xs mt-1 inline-block">View Details →</span>
      </div>
    </motion.div>
  </Link>
);