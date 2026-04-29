"use client";

import TourCard from "./TourCard";

interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  duration: number;
  rating?: number;
  image: string;
  category?: { name: string };
  state?: { name: string };
}

export default function TourList({ tours }: { tours: Tour[] }) {
  // ❌ No data
  if (!tours || tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Tours Found 😕
        </h2>
        <p className="text-gray-500 text-sm">
          Filters change karo ya dusra destination try karo
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 🔹 RESULT COUNT */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{tours.length}</span> tours
        </p>
      </div>

      {/* 🔹 TOUR CARDS */}
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}

    </div>
  );
}