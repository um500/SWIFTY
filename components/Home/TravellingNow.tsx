"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTravellingNow } from "@/lib/sanity";

interface CardType {
  tourCount: number;
  destination: string;
  type: "india" | "international";
  slug: string;
  images?: string[];
  image?: string;
}

interface ReviewType {
  name: string;
  text: string;
  location: string;
  rating?: number;
}

interface TravellingNowType {
  title: string;
  description: string;
  cards: CardType[];
  reviews?: ReviewType[];
}

const TravellingNow = () => {
  const [data, setData] = useState<TravellingNowType | null>(null);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTravellingNow();
      if (res) {
        setData(res);
        setIndexes(new Array(res.cards?.length || 0).fill(0));
      }
    };
    fetchData();
  }, []);

  // ✅ IMAGE SLIDER (PER CARD)
  useEffect(() => {
    if (!data?.cards?.length) return;

    const interval = setInterval(() => {
      setIndexes((prev) =>
        prev.map((val, i) => {
          const total = data.cards[i]?.images?.length || 1;
          return (val + 1) % total;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [data]);

  // ✅ REVIEW SLIDER
  useEffect(() => {
    if (!data?.reviews?.length) return;

    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % data.reviews!.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [data]);

  // ✅ LOADING
  if (!data) {
    return (
      <section className="py-16 bg-[#2c3440] text-center text-gray-300">
        Loading...
      </section>
    );
  }

  const currentReview = data.reviews?.[reviewIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-[#2c3440] via-[#3f4b5a] to-[#1f2937] text-white">
      <div className="max-w-[1440px] mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {data.title}
            </h2>

            <p className="text-sm text-gray-300 mb-6">
              {data.description}
            </p>

            {/* ✅ REVIEW */}
            {currentReview && (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-500">

                <p className="text-sm italic text-gray-200">
                  “{currentReview.text}”
                </p>

                <p className="text-xs mt-2 text-gray-400">
                  – {currentReview.name} ·{" "}
                  <span className="font-semibold text-white">
                    {currentReview.location}
                  </span>
                </p>

                {/* ⭐ OPTIONAL RATING */}
                {currentReview.rating && (
                  <div className="text-yellow-400 text-sm mt-1">
                    {"⭐".repeat(currentReview.rating)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-2 gap-5">
            {data.cards?.slice(0, 4).map((item, i) => {
              const link =
                item.type === "international"
                  ? `/international/${item.slug}`
                  : `/india/${item.slug}`;

              const imageSrc =
                item.images?.[indexes[i]] ||
                item.image ||
                "/placeholder.jpg";

              return (
                <Link key={i} href={link}>
                  <div className="relative h-[220px] rounded-2xl overflow-hidden group shadow-lg">

                    <Image
                      src={imageSrc}
                      alt={item.destination || "destination"}
                      fill
                      sizes="300px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* TEXT */}
                    <div className="absolute top-3 left-3 text-[11px]">

                      <span className="bg-green-500 px-2 py-0.5 rounded font-bold">
                        {item.tourCount ?? 0} TOURS
                      </span>

                      <div className="mt-1">
                        in{" "}
                        <span className="underline font-semibold">
                          {item.destination}
                        </span>{" "}
                        right now
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TravellingNow;