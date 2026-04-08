"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { homeSelectedToursQuery } from "@/lib/queries";

type Tour = {
  slug: string;
  title: string;
  days: string;
  price: number;
  image: string;
};

const ContinuePlan = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await client.fetch(homeSelectedToursQuery);
      setTours(data?.tours || []);
      setTitle(data?.title || "");
    };

    loadData();
  }, []);

  return (
    <section className="py-10 bg-gradient-to-r from-[#3F4B5A] to-[#2C3440]">

      <div className="max-w-[1440px] mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-6">
          {title || "Continue your travel plan"}
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tour/${tour.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >

              {/* IMAGE */}
              <img
                src={tour.image}
                alt={tour.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              {/* CONTENT */}
              <div className="min-w-0">

                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-yellow-500 transition">
                  {tour.title}
                </h4>

                <p className="text-xs text-gray-500">
                  {tour.days}
                </p>

                <p className="text-sm font-bold text-gray-900 mt-1">
                  ₹{tour.price?.toLocaleString("en-IN")}
                  <span className="text-[10px] font-normal text-gray-500">
                    {" "} /pp twin sharing
                  </span>
                </p>

                <span className="text-xs text-yellow-500 font-semibold mt-1 inline-block">
                  View Details →
                </span>

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ContinuePlan;