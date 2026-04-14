import { getBlogBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogDetail(props: any) {
  const params = await props.params;
  const slug = params.slug;

  if (!slug) return notFound();

  const blog = await getBlogBySlug(slug);
  if (!blog) return notFound();

  const components = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-5 text-gray-900">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-gray-600 text-lg leading-8 mb-5">
          {children}
        </p>
      ),
    },

    types: {
      // 🔥 BLOG IMAGE (clean)
      image: ({ value }: any) => (
        <div className="relative w-full h-[240px] md:h-[380px] my-8 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={value.url}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      ),

      // 🔥 ULTRA CLEAN COMPACT TOUR CARD
      tourSection: ({ value }: any) => (
        <div className="my-12">

          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            {value.title}
          </h2>

          <div className="space-y-4">

            {value.tours?.map((tour: any) => (
              <Link
                key={tour._id}
                href={`/tours/${tour.slug}`}
                className="group relative block h-[160px] md:h-[180px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
              >

                {/* IMAGE */}
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* TEXT */}
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">

                  <h3 className="text-lg font-semibold">
                    {tour.title}
                  </h3>

                  <p className="text-xs opacity-90 mt-1">
                    {tour.days} Days • ₹ {tour.price}
                  </p>

                  <span className="inline-block mt-2 text-xs text-yellow-300">
                    Explore →
                  </span>

                </div>

              </Link>
            ))}

          </div>
        </div>
      ),
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 PREMIUM HERO */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 py-14">

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>

          <p className="mt-3 text-gray-300 text-lg">
            Travel Guide • Explore • Discover
          </p>

        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-10">

        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
          <PortableText value={blog.content} components={components} />
        </div>

      </div>
    </div>
  );
}