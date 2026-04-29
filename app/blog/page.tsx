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
    <div className="bg-white">

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

        {/* 🔥 HEADING */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Our Blogs
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog, i) => (
            <Link
              key={i}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col justify-between flex-1">

                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {blog.shortDesc}
                  </p>
                </div>

                {/* BUTTON */}
                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}