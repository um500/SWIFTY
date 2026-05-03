"use client";

import TourCard from "./TourCard";

export interface Tour {
  _id: string;
  title: string;
  slug: string;
  price?: number;
  days?: number;
  rating?: number;
  image?: string;
  images?: string[];
  state?: string;
  country?: string;
  highlights?: string[];
  groupType?: string;
  tourCode?: string;
}

export default function TourList({
  tours,
  view = "list",
}: {
  tours: Tour[];
  view?: "list" | "grid";
}) {
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
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} view="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} view="list" />
          ))}
        </div>
      )}
    </div>
  );
}
