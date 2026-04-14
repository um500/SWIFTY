"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/sanity";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  return (
    <div className="bg-gray-50">

      {/* 🔥 CONTAINER FIX */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Blogs
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative w-full h-44">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col justify-between flex-1">

                <div>
                  <h2 className="text-base font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {blog.shortDesc}
                  </p>
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 mt-4 text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}