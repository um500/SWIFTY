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
    <div className="bg-[#f1f3f6] rounded-xl shadow-lg p-6">

      <h2 className="text-blue-700 font-semibold mb-6 text-sm uppercase">
        BESTSELLING TOURS
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {data.length === 0 ? (
          <p className="text-gray-400 text-sm col-span-4">
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
    <div className="bg-white rounded-lg border hover:shadow-xl transition cursor-pointer overflow-hidden group">

      <div className="relative h-[150px] w-full overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[index]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.count} Departures
        </p>

        <p className="text-sm text-blue-600 mt-2 hover:underline">
          View Tours →
        </p>
      </div>
    </div>
  );
}