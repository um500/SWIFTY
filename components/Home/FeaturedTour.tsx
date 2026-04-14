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
  const [dotIndex, setDotIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(1);
  const isAnimating = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    client.fetch(featuredBannersQuery).then((data: Banner[]) => {
      if (!data?.length) return;
      setBanners(data);
    });
  }, []);

  const extended =
    banners.length > 0
      ? [banners[banners.length - 1], ...banners, banners[0]]
      : [];

  const jumpTo = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${index * 100}%)`;
    currentRef.current = index;
  }, []);

  const slideTo = useCallback(
    (index: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimating.current) return;

      isAnimating.current = true;
      slider.style.transition = "transform 0.6s ease-in-out";
      slider.style.transform = `translateX(-${index * 100}%)`;
      currentRef.current = index;

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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onEnd = () => {
      const cur = currentRef.current;
      const total = banners.length;

      if (cur >= total + 1) {
        jumpTo(1);
        setDotIndex(0);
      } else if (cur <= 0) {
        jumpTo(total);
        setDotIndex(total - 1);
      }

      isAnimating.current = false;
    };

    slider.addEventListener("transitionend", onEnd);
    return () => slider.removeEventListener("transitionend", onEnd);
  }, [banners.length, jumpTo]);

  useEffect(() => {
    if (!banners.length) return;
    requestAnimationFrame(() => {
      jumpTo(1);
      setDotIndex(0);
    });
  }, [banners.length, jumpTo]);

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

  if (!banners.length) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8">
          <div className="h-[260px] sm:h-[360px] md:h-[420px] rounded-2xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8">
        <div
          className="overflow-hidden rounded-2xl relative 
          h-[260px] xs:h-[280px] sm:h-[340px] md:h-[420px]"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* TRACK */}
          <div
            ref={sliderRef}
            className="flex h-full"
            style={{ transform: "translateX(-100%)" }}
          >
            {extended.map((banner, index) => (
              <div key={index} className="min-w-full h-full relative">
                {/* IMAGE */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">

                  <p className="text-white/80 text-[8px] sm:text-xs mb-1 uppercase tracking-widest">
                    {banner.subtitle}
                  </p>

                  <h2 className="text-[16px] sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                    {banner.title}
                  </h2>

                  {/* CARD */}
                  <div className="bg-white/95 rounded-xl px-3 sm:px-6 py-2 sm:py-4 w-full max-w-[260px] sm:max-w-[380px] shadow-lg">

                    <p className="text-gray-400 text-[8px] sm:text-xs uppercase">
                      Starts from
                    </p>

                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      ₹{banner.price?.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-400 text-[8px] sm:text-xs mb-2">
                      per person
                    </p>

                    <div className="flex flex-wrap justify-center gap-1 text-[8px] sm:text-xs text-gray-500 mb-2">
                      {banner.features?.map((f, i) => (
                        <span key={i}>{f}</span>
                      ))}
                    </div>

                    <Link
                      href={`/tour/${banner.slug}`}
                      className="block bg-yellow-400 text-black font-semibold py-1.5 rounded-md text-[11px] sm:text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ARROWS */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow"
          >
            <ChevronRight size={18} />
          </button>

          {/* DOTS */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goToDot(i)}
                className={`h-1.5 rounded-full ${
                  i === dotIndex ? "w-5 bg-yellow-400" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTour;