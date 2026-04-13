"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getReviews } from "@/lib/sanity";
import { motion } from "framer-motion";

type Review = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  tourName: string;
  reviewText: string;
  date: string;
  avatar: string | null;
  bgImage?: string; // ✅ ADD THIS
};

// const BG_IMAGES = [
//   "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80",
//   "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80",
//   "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80",
//   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
//   "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=80",
// ];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews().then((data) => {
      if (data?.length) setReviews(data);
    });
  }, []);

  if (!reviews.length) return null;

  return (
    <section className="py-14 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
            What our travellers say
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Real Stories, Real Experiences
          </h2>
          <div className="w-12 h-[3px] bg-orange-500 rounded mx-auto mt-3" />
        </div>

        {/* SLIDER (same as your existing) */}
        <ReviewSlider reviews={reviews} />

        {/* BOTTOM STATS */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { number: "10,000+", label: "Happy Travellers" },
            { number: "4.9 ★", label: "Average Rating" },
            { number: "500+", label: "Tours Completed" },
            { number: "98%", label: "Would Recommend" },
          ].map((stat, i) => (
            
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                group relative overflow-hidden
                bg-white border border-gray-100 rounded-2xl py-5 px-4 text-center
                shadow-sm transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-xl hover:border-orange-200
              "
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Content */}
              <p className="relative text-2xl font-extrabold text-gray-900 transition-all duration-300 group-hover:text-orange-500">
                {stat.number}
              </p>

              <p className="relative text-xs text-gray-500 mt-1 transition-all duration-300 group-hover:text-gray-700">
                {stat.label}
              </p>
            </motion.div>

          ))}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SLIDER
// ─────────────────────────────────────────
function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const [dotIndex, setDotIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(1);
  const isAnimating = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // extended = [last, ...all, first]
  const extended = [reviews[reviews.length - 1], ...reviews, reviews[0]];

  // ── Get slide width from container ──────────────────────────
  const getSlideWidth = useCallback(() => {
    return containerRef.current?.offsetWidth ?? 0;
  }, []);

  // ── Jump instantly ──────────────────────────────────────────
  const jumpTo = useCallback(
    (index: number) => {
      const slider = sliderRef.current;
      if (!slider) return;
      const w = getSlideWidth();
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${index * w}px)`;
      currentRef.current = index;
    },
    [getSlideWidth]
  );

  // ── Animate slide ───────────────────────────────────────────
  const slideTo = useCallback(
    (index: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimating.current) return;
      isAnimating.current = true;

      const w = getSlideWidth();
      slider.style.transition = "transform 0.7s ease-in-out";
      slider.style.transform = `translateX(-${index * w}px)`;
      currentRef.current = index;

      const realIdx =
        index <= 0
          ? reviews.length - 1
          : index >= reviews.length + 1
          ? 0
          : index - 1;
      setDotIndex(realIdx);
    },
    [getSlideWidth, reviews.length]
  );

  // ── Transitionend → infinite wrap ──────────────────────────
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onEnd = () => {
      const cur = currentRef.current;
      if (cur >= reviews.length + 1) {
        jumpTo(1);
        setDotIndex(0);
      } else if (cur <= 0) {
        jumpTo(reviews.length);
        setDotIndex(reviews.length - 1);
      }
      isAnimating.current = false;
    };

    slider.addEventListener("transitionend", onEnd);
    return () => slider.removeEventListener("transitionend", onEnd);
  }, [reviews.length, jumpTo]);

  // ── Init ────────────────────────────────────────────────────
  useEffect(() => {
    // Wait for layout to paint
    const raf = requestAnimationFrame(() => {
      jumpTo(1);
      setDotIndex(0);
    });
    return () => cancelAnimationFrame(raf);
  }, [reviews.length, jumpTo]);

  // ── Resize → recalculate position ──────────────────────────
  useEffect(() => {
    const handleResize = () => jumpTo(currentRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [jumpTo]);

  // ── Autoplay ────────────────────────────────────────────────
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      slideTo(currentRef.current + 1);
    }, 4000);
  }, [slideTo, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const nextSlide = () => { slideTo(currentRef.current + 1); startAutoPlay(); };
  const prevSlide = () => { slideTo(currentRef.current - 1); startAutoPlay(); };
  const goToDot = (i: number) => { slideTo(i + 1); startAutoPlay(); };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden h-[420px]"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* TRACK — width = slides * 100% of container */}
      <div
        ref={sliderRef}
        className="flex h-full will-change-transform"
        style={{ width: `${extended.length * 100}%` }}
      >
        {extended.map((review, index) => {
          const bgImage = review.bgImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400";
          const initials = review.name
            .split(" ")
            .map((w: string) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          const avatarColors = [
            "bg-orange-200 text-orange-700",
            "bg-blue-200 text-blue-700",
            "bg-green-200 text-green-700",
            "bg-purple-200 text-purple-700",
            "bg-pink-200 text-pink-700",
          ];
          const colorClass =
            avatarColors[review.name.charCodeAt(0) % avatarColors.length];

          return (
            <div
              key={index}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / extended.length}%` }}
            >
              {/* BG IMAGE */}
              <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/80" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

                {/* Big quote */}
                <div className="text-yellow-400 text-7xl leading-none font-serif opacity-50 mb-2 select-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-400" : "text-white/20"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-white text-base md:text-lg font-medium leading-relaxed max-w-2xl line-clamp-3 mb-5">
                  {review.reviewText}
                </p>

                {/* Tour badge */}
                {review.tourName && (
                  <span className="text-[11px] font-semibold text-yellow-400 bg-yellow-400/15 border border-yellow-400/30 px-3 py-1 rounded-full uppercase tracking-widest mb-5">
                    {review.tourName}
                  </span>
                )}

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/40"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/30 ${colorClass}`}
                    >
                      {initials}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-white/60 text-xs">
                      {[review.location, review.date].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="ml-3 text-[10px] text-green-400 bg-green-400/15 border border-green-400/30 px-2 py-0.5 rounded-full font-medium">
                    ✓ Verified
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 border border-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
      >
        ◀
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 border border-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
      >
        ▶
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goToDot(i)}
            className={`rounded-full transition-all duration-300 ${
              i === dotIndex
                ? "w-6 h-2 bg-yellow-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}