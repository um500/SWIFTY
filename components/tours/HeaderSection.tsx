"use client";

import Link from "next/link";

interface HeaderProps {
  title?: string;
  categories?: {
    name: string;
    slug: string;
  }[];
}

export default function HeaderSection({
  title = "India",
  categories = [],
}: HeaderProps) {
  return (
    <div className="mb-8">

      {/* 🔹 TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
        {title} Tour Packages
      </h1>

      {/* 🔹 DESCRIPTION */}
      <p className="text-gray-600 max-w-3xl text-sm md:text-base mb-4">
        Discover the beauty, culture, and adventure of {title}. Explore curated
        travel experiences designed for comfort, excitement, and unforgettable
        memories.
      </p>

      {/* 🔹 RATING */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-yellow-500 text-lg">★★★★★</span>
        <span className="text-gray-700 text-sm font-medium">
          5.0 | 3,800+ Reviews
        </span>
      </div>

      {/* 🔹 CATEGORY TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

        {/* ALL BUTTON */}
        <Link
          href="/tours"
          className="px-4 py-1.5 text-sm rounded-full border bg-blue-600 text-white whitespace-nowrap hover:bg-blue-700 transition"
        >
          All
        </Link>

        {/* DYNAMIC CATEGORIES */}
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/tours/category/${cat.slug}`}
            className="px-4 py-1.5 text-sm rounded-full border text-gray-700 bg-white hover:bg-gray-100 whitespace-nowrap transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 🔹 DIVIDER */}
      <div className="mt-6 border-b" />

    </div>
  );
}