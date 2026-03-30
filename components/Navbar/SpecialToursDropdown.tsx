"use client";

import { useEffect, useState } from "react";

type Category = {
  _id: string;
  title: string;
  count: number;
  images?: string[];
};

export default function SpecialToursDropdown({ data = [] }: { data: Category[] }) {
  return (
    <div className="bg-[#f5f7fb] rounded-xl shadow-xl p-6 w-full">

      <h2 className="text-blue-700 font-semibold mb-5 text-sm uppercase tracking-wide">
        BESTSELLING TOURS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.length === 0 ? (
          <p className="text-gray-400 text-sm col-span-full">
            No tours available
          </p>
        ) : (
          data.map((item) => <Card key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

function Card({ item }: { item: Category }) {
  const images = item.images || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="bg-white rounded-lg overflow-hidden border hover:shadow-2xl transition-all duration-300 group">

      {/* IMAGE */}
      <div className="relative h-[140px] overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[index]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.count} Departures
        </p>

        <p className="text-sm text-blue-600 mt-2 font-medium group-hover:underline">
          View Tours →
        </p>
      </div>
    </div>
  );
}