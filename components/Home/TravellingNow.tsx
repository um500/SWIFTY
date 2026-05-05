// ============================================
// 📁 components/home/TravellingNow.tsx
// Clicking a card → /tours?state=<slug> or /tours?country=<slug>
// ============================================

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

  // Fetch data
  useEffect(() => {
    getTravellingNow().then((res) => {
      if (res) {
        setData(res);
        setIndexes(new Array(res.cards?.length ?? 0).fill(0));
      }
    });
  }, []);

  // Image slider per card
  useEffect(() => {
    if (!data?.cards?.length) return;
    const interval = setInterval(() => {
      setIndexes((prev) =>
        prev.map((val, i) => {
          const total = data.cards[i]?.images?.length ?? 1;
          return (val + 1) % total;
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [data]);

  // Review slider
  useEffect(() => {
    if (!data?.reviews?.length) return;
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % data.reviews!.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [data]);

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

          {/* LEFT — title + review */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{data.title}</h2>
            <p className="text-sm text-gray-300 mb-6">{data.description}</p>

            {currentReview && (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-500">
                <p className="text-sm italic text-gray-200">
                  &ldquo;{currentReview.text}&rdquo;
                </p>
                <p className="text-xs mt-2 text-gray-400">
                  – {currentReview.name} ·{" "}
                  <span className="font-semibold text-white">
                    {currentReview.location}
                  </span>
                </p>
                {currentReview.rating && (
                  <div className="text-yellow-400 text-sm mt-1">
                    {"⭐".repeat(currentReview.rating)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — destination cards */}
          <div className="grid grid-cols-2 gap-5">
            {data.cards?.slice(0, 4).map((item, i) => {
              /**
               * ✅ FIXED link logic:
               *   india       → /tours?state=<slug>
               *   international → /tours?country=<slug>
               */
              const href =
                item.type === "international"
                  ? `/tours?country=${item.slug}`
                  : `/tours?state=${item.slug}`;

              const imageSrc =
                item.images?.[indexes[i]] ?? item.image ?? "/placeholder.jpg";

              return (
                <Link key={i} href={href}>
                  <div className="relative h-[220px] rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src={imageSrc}
                      alt={item.destination ?? "destination"}
                      fill
                      sizes="300px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

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