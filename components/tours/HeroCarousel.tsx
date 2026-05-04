"use client";

// ============================================
// 📁 components/tours/HeroCarousel.tsx
// Auto-sliding image carousel — smooth slide animation
// ============================================

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  images: string[];
  title?: string;
}

export default function HeroCarousel({ images = [], title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, resetTimer]);

  if (!images.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl h-[380px] lg:h-[440px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-400 text-sm">No images available</p>
        </div>
      </div>
    );
  }

  const goTo = (index: number, dir: "next" | "prev" = "next") => {
    if (isAnimating) return;
    setDirection(dir);
    setCurrentIndex(index);
    resetTimer();
  };

  const goPrev = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goTo(newIndex, "prev");
  };

  const goNext = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex + 1) % images.length;
    goTo(newIndex, "next");
  };

  // Show thumbnail strip (up to 5 thumbnails)
  const thumbCount = Math.min(images.length, 5);
  const thumbStart = Math.max(0, Math.min(currentIndex - 2, images.length - thumbCount));

  return (
    <div className="space-y-2">
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-2xl h-[320px] sm:h-[380px] lg:h-[440px] shadow-lg group bg-gray-900">

        {/* Images */}
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === currentIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={src}
              alt={title ? `${title} - image ${i + 1}` : `Tour image ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent z-20 pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 z-30 flex gap-2">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            {images.length} Photos
          </div>
        </div>

        {/* Image counter badge */}
        <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && images.length <= 8 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > currentIndex ? "next" : "prev")}
                className={`rounded-full transition-all duration-400 ${
                  i === currentIndex
                    ? "bg-white w-5 h-2"
                    : "bg-white/50 hover:bg-white/80 w-2 h-2"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.slice(thumbStart, thumbStart + thumbCount).map((src, idx) => {
            const realIdx = thumbStart + idx;
            return (
              <button
                key={realIdx}
                onClick={() => goTo(realIdx, realIdx > currentIndex ? "next" : "prev")}
                className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:opacity-90 ${
                  realIdx === currentIndex
                    ? "border-blue-500 shadow-md scale-[1.03]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${realIdx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
          {images.length > thumbCount && (
            <div className="flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg bg-gray-900/80 flex items-center justify-center text-white text-xs font-semibold">
              +{images.length - thumbCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
}