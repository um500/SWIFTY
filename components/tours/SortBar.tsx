"use client";

import { useState, useEffect } from "react";

interface Tour {
  _id: string;
  price: number;
  duration: number;
  rating?: number;
}

interface Props {
  tours: Tour[];
  setSortedTours: (data: Tour[]) => void;
}

export default function SortBar({ tours, setSortedTours }: Props) {
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (!tours) return;

    let sortedTours = [...tours];

    switch (sortOption) {
      case "price-low":
        sortedTours.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        sortedTours.sort((a, b) => b.price - a.price);
        break;

      case "duration-low":
        sortedTours.sort((a, b) => a.duration - b.duration);
        break;

      case "duration-high":
        sortedTours.sort((a, b) => b.duration - a.duration);
        break;

      case "rating-high":
        sortedTours.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      default:
        sortedTours = [...tours]; // reset
    }

    setSortedTours(sortedTours);
  }, [sortOption, tours]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

      {/* 🔹 LEFT TEXT */}
      <p className="text-sm text-gray-600 font-medium">
        Explore & sort tours easily
      </p>

      {/* 🔹 DROPDOWN */}
      <div className="flex items-center gap-2">

        <span className="text-sm text-gray-500">Sort by:</span>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="default">Recommended</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="duration-low">Duration: Short → Long</option>
          <option value="duration-high">Duration: Long → Short</option>
          <option value="rating-high">Rating: High → Low</option>
        </select>

      </div>
    </div>
  );
}