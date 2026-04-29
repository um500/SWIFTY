"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Tour {
  _id: string;
  title: string;
  slug?: { current?: string };
  price: number;
  days?: string;
  image: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Tour[]>([]);

  // ✅ LOAD FUNCTION
  const loadWishlist = () => {
    try {
      const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(data);
    } catch (err) {
      console.error("Wishlist load error:", err);
      setWishlist([]);
    }
  };

  // ✅ INITIAL + SYNC
  useEffect(() => {
    loadWishlist();

    const handleUpdate = () => loadWishlist();

    window.addEventListener("wishlistUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // ✅ REMOVE FUNCTION
  const removeFromWishlist = (id: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const updated = stored.filter((t: any) => t._id !== id);

      localStorage.setItem("wishlist", JSON.stringify(updated));

      // 🔥 update all pages
      window.dispatchEvent(new Event("wishlistUpdated"));

      setWishlist(updated);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {/* ❌ EMPTY */}
      {wishlist.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No tours in wishlist 😢</p>
          <Link href="/">
            <button className="mt-4 px-6 py-2 bg-yellow-400 rounded-lg">
              Explore Tours
            </button>
          </Link>
        </div>
      )}

      {/* ✅ LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-48">
              <Image
                src={tour.image || "/placeholder.jpg"}
                alt={tour.title}
                fill
                className="object-cover"
              />

              {/* ❤️ REMOVE */}
              <button
                onClick={() => removeFromWishlist(tour._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                ❤️
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{tour.title}</h2>

              <p className="text-sm text-gray-500 mt-1">
                {tour.days || 5} Days
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-500 font-semibold">
                  ₹{tour.price?.toLocaleString()}
                </span>

                <Link href={`/tours/${tour.slug?.current || "#"}`}>
                  <button className="text-sm text-blue-600">
                    View →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}