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
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Blogs
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition h-full flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative w-full h-52">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {blog.shortDesc}
                </p>
              </div>

              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600 mt-4 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}