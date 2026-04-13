"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { client } from "@/lib/sanity";
import { featuredBannersQuery } from "@/lib/queries";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Banner = {
  title: string;
  subtitle: string;
  price: number;
  image: string;
  slug: string;
  features: string[];
};

const FeaturedTour = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [dotIndex, setDotIndex] = useState(0); // only for dot UI
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(1); // source of truth — no setState
  const isAnimating = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    client.fetch(featuredBannersQuery).then((data: Banner[]) => {
      if (!data?.length) return;
      setBanners(data);
    });
  }, []);

  // extended = [last, ...all, first]
  const extended =
    banners.length > 0
      ? [banners[banners.length - 1], ...banners, banners[0]]
      : [];

  // ── Set slider position instantly (no transition) ──────────
  const jumpTo = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${index * 100}%)`;
    currentRef.current = index;
  }, []);

  // ── Animate to index ────────────────────────────────────────
  const slideTo = useCallback(
    (index: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimating.current) return;

      isAnimating.current = true;
      slider.style.transition = "transform 0.65s ease-in-out";
      slider.style.transform = `translateX(-${index * 100}%)`;
      currentRef.current = index;

      // Update dot
      const realIndex =
        index <= 0
          ? banners.length - 1
          : index >= banners.length + 1
          ? 0
          : index - 1;
      setDotIndex(realIndex);
    },
    [banners.length]
  );

  // ── After transition ends → handle infinite jump ───────────
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onEnd = () => {
      const cur = currentRef.current;
      const total = banners.length;

      if (cur >= total + 1) {
        // Was on last clone → snap to real first (index 1)
        jumpTo(1);
        setDotIndex(0);
      } else if (cur <= 0) {
        // Was on first clone → snap to real last
        jumpTo(total);
        setDotIndex(total - 1);
      }

      isAnimating.current = false;
    };

    slider.addEventListener("transitionend", onEnd);
    return () => slider.removeEventListener("transitionend", onEnd);
  }, [banners.length, jumpTo]);

  // ── Init position once banners load ────────────────────────
  useEffect(() => {
    if (!banners.length) return;
    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      jumpTo(1);
      setDotIndex(0);
    });
  }, [banners.length, jumpTo]);

  // ── Autoplay ────────────────────────────────────────────────
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      slideTo(currentRef.current + 1);
    }, 3500);
  }, [slideTo, stopAutoPlay]);

  useEffect(() => {
    if (!banners.length) return;
    startAutoPlay();
    return stopAutoPlay;
  }, [banners.length, startAutoPlay, stopAutoPlay]);

  // ── Arrow handlers ──────────────────────────────────────────
  const nextSlide = () => {
    slideTo(currentRef.current + 1);
    startAutoPlay();
  };

  const prevSlide = () => {
    slideTo(currentRef.current - 1);
    startAutoPlay();
  };

  const goToDot = (i: number) => {
    slideTo(i + 1);
    startAutoPlay();
  };

  // ── Skeleton ────────────────────────────────────────────────
  if (!banners.length) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8">
          <div className="h-[420px] rounded-2xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8">
        <div
          className="overflow-hidden rounded-2xl relative"
          style={{ height: "420px" }}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* ── TRACK ── */}
          <div
            ref={sliderRef}
            className="flex h-full will-change-transform"
            style={{ transform: "translateX(-100%)" }}
          >
            {extended.map((banner, index) => (
              <div
                key={index}
                className="min-w-full h-full relative flex-shrink-0"
              >
                {/* BG IMAGE */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/75" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <p className="text-white/75 text-xs mb-2 tracking-[0.2em] uppercase font-medium">
                    {banner.subtitle}
                  </p>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-lg mb-5">
                    {banner.title}
                  </h2>

                  {/* PRICE CARD */}
                  <div className="bg-white/92 backdrop-blur-md rounded-2xl px-8 py-5 w-[92%] max-w-[480px] shadow-2xl border border-white/50">
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold mb-1">
                      Starts from
                    </p>

                    <p className="text-[2.6rem] font-extrabold text-gray-900 leading-none">
                      ₹{banner.price?.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-400 text-xs mt-1 mb-3">
                      per person on twin sharing
                    </p>

                    {/* FEATURES */}
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[11px] text-gray-500 mb-4">
                      {banner.features?.map((f, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          {i !== 0 && (
                            <span className="w-[3px] h-[3px] rounded-full bg-gray-300 inline-block" />
                          )}
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/tour/${banner.slug}`}
                      className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded-xl transition-colors w-full text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── LEFT ARROW ── */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* ── RIGHT ARROW ── */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          {/* ── DOTS ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goToDot(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === dotIndex
                    ? "w-6 h-2 bg-yellow-400"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTour;