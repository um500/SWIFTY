// ============================================
// 📁 components/home/PopularTours.tsx
// ✅ FIXED: /tours/<slug>  (was /tour/<slug> → 404)
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Heart } from "lucide-react";
import { getPopularTours } from "@/lib/sanity";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

const CARD_WIDTH = 280;
const CARD_GAP   = 24;
const CARD_UNIT  = CARD_WIDTH + CARD_GAP;
const SPEED      = 0.5;

export default function PopularTours() {
  const [tours, setTours]           = useState<any[]>([]);
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
  const [favorites, setFavorites]   = useState<string[]>([]);

  useEffect(() => {
    getPopularTours().then((res: any[]) => {
      if (!res?.length) return;
      const isGrouped = res[0] && Array.isArray(res[0].tours);
      const flat: any[] = isGrouped
        ? res.flatMap((item: any) => item?.tours ?? [])
        : res;
      const unique = Array.from(new Map(flat.map((t: any) => [t._id, t])).values()) as any[];
      setTours(unique);
    });
  }, []);

  useEffect(() => { setFavorites(getFavorites()); }, []);

  useEffect(() => {
    if (!tours.length) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const updated: Record<string, number> = {};
        tours.forEach((tour: any) => {
          const len = tour?.images?.length || 1;
          updated[tour._id] = ((prev[tour._id] || 0) + 1) % len;
        });
        return { ...prev, ...updated };
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [tours]);

  if (!tours.length) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Tours</h2>
            <div className="w-12 h-[3px] bg-orange-500 mt-1 rounded" />
          </div>
          <Link href="/tours"
            className="text-sm font-medium text-gray-700 flex items-center gap-1 group hover:text-orange-500 transition">
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
        <InfiniteCarousel tours={tours} imageIndex={imageIndex} favorites={favorites} setFavorites={setFavorites} />
      </div>
    </section>
  );
}

function InfiniteCarousel({
  tours, imageIndex, favorites, setFavorites,
}: {
  tours: any[];
  imageIndex: Record<string, number>;
  favorites: string[];
  setFavorites: (v: string[]) => void;
}) {
  const trackRef       = useRef<HTMLDivElement>(null);
  const offsetRef      = useRef(0);
  const pausedRef      = useRef(false);
  const rafRef         = useRef<number>(0);
  const manualTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalWidth     = tours.length * CARD_UNIT;
  const items          = [...tours, ...tours, ...tours];

  useEffect(() => {
    if (!tours.length) return;
    offsetRef.current = totalWidth;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${totalWidth}px)`;

    const animate = () => {
      if (!pausedRef.current && trackRef.current) {
        offsetRef.current += SPEED;
        if (offsetRef.current >= totalWidth * 2) offsetRef.current -= totalWidth;
        if (offsetRef.current < totalWidth)      offsetRef.current += totalWidth;
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tours, totalWidth]);

  const handleArrow = (dir: "left" | "right") => {
    pausedRef.current = true;
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    const delta = dir === "left" ? -CARD_UNIT : CARD_UNIT;
    const start = offsetRef.current;
    const duration = 380;
    const startTime = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateManual = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let current    = start + delta * ease(progress);
      if (current >= totalWidth * 2) current -= totalWidth;
      if (current < totalWidth)      current += totalWidth;
      offsetRef.current = current;
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${current}px)`;
      if (progress < 1) requestAnimationFrame(animateManual);
      else manualTimerRef.current = setTimeout(() => { pausedRef.current = false; }, 300);
    };
    requestAnimationFrame(animateManual);
  };

  return (
    <div className="relative">
      <button onClick={() => handleArrow("left")} aria-label="Scroll left"
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-orange-50 border border-gray-200 text-gray-700 hover:text-orange-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => handleArrow("right")} aria-label="Scroll right"
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-orange-50 border border-gray-200 text-gray-700 hover:text-orange-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; if (manualTimerRef.current) clearTimeout(manualTimerRef.current); }}
        onMouseLeave={() => { if (manualTimerRef.current) clearTimeout(manualTimerRef.current); pausedRef.current = false; }}>
        <div ref={trackRef} className="flex will-change-transform"
          style={{ gap: `${CARD_GAP}px`, width: `${items.length * CARD_UNIT}px` }}>
          {items.map((tour: any, i: number) => {
            const images       = tour?.images ?? [];
            const currentIndex = imageIndex[tour._id] ?? 0;
            const isFav        = favorites.includes(tour._id);

            return (
              <div key={`${tour._id}-${i}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}>
                <div className="relative overflow-hidden">
                  <button
                    onClick={() => { const updated = toggleFavorite(tour._id); setFavorites(updated); }}
                    className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow hover:scale-110 transition"
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}>
                    <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                  </button>
                  {images.length > 0 ? (
                    <img src={images[currentIndex]} alt={tour?.title}
                      className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{tour?.title}</h3>
                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{tour?.days ?? 0}D
                    </span>
                  </div>
                  <div className="border-t my-3" />
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Starts from</p>
                      <p className="font-bold text-gray-900">
                        ₹{tour?.price?.toLocaleString("en-IN") ?? 0}
                      </p>
                    </div>
                    {/* ✅ /tours/<slug> */}
                    <Link href={`/tours/${tour?.slug}`}
                      className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}