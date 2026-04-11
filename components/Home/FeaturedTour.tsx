"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [current, setCurrent] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.fetch(featuredBannersQuery).then((data) => {
      setBanners(data);
    });
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      setCurrent(1);
    }
  }, [banners]);

  const extended =
    banners.length > 0
      ? [banners[banners.length - 1], ...banners, banners[0]]
      : [];

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || banners.length === 0) return;

    const handleTransitionEnd = () => {
      if (current === extended.length - 1) {
        slider.style.transition = "none";
        setCurrent(1);
      }

      if (current === 0) {
        slider.style.transition = "none";
        setCurrent(banners.length);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [current, banners, extended.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    requestAnimationFrame(() => {
      slider.style.transition = "transform 0.7s ease-in-out";
    });
  }, [current]);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  if (!banners.length) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8">
          <div className="h-[360px] rounded-xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    // ✅ FULL WHITE BG FIX
    <section className="w-full bg-white">

      <div className="max-w-[1440px] mx-auto px-4 mt-6 pb-8 relative">

        <div className="overflow-hidden rounded-xl h-[360px] relative">

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {extended.map((banner, index) => (
              <div key={index} className="min-w-full relative">

                {/* IMAGE */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[360px] object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

                  <p className="text-white/80 text-sm mb-2">
                    {banner.subtitle}
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
                    {banner.title}
                  </h2>

                  {/* BOX */}
                  <div className="mt-6 bg-white/90 backdrop-blur-md rounded-2xl px-10 py-7 w-[90%] max-w-[520px] shadow-xl border border-gray-200">

                    <p className="text-gray-600 text-sm mb-1">
                      Starts from
                    </p>

                    <p className="text-4xl font-bold text-gray-900">
                      ₹{banner.price?.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      / per person on twin sharing
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mt-3 text-sm text-gray-600">
                      {banner.features?.map((f, i) => (
                        <span key={i}>
                          {f} {i !== banner.features.length - 1 && "•"}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/tour/${banner.slug}`}
                      className="mt-5 inline-flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition w-full"
                    >
                      View Details →
                    </Link>

                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default FeaturedTour;