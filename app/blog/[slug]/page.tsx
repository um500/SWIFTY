import { getBlogBySlug } from "@/lib/sanity";
import Image from "next/image";

export default async function BlogDetail({ params }: any) {
  const blog = await getBlogBySlug(params.slug);

  return (
    <div className="px-6 md:px-16 py-10 max-w-5xl mx-auto">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8">
        {blog.title}
      </h1>

      {/* CONTENT */}
      <div className="space-y-8">
        {blog.content?.map((block: any, i: number) => {

          // TEXT
          if (block._type === "block") {
            return (
              <p key={i} className="text-gray-700 leading-7 text-lg">
                {block.children?.map((c: any) => c.text).join("")}
              </p>
            );
          }

          // IMAGE
          if (block._type === "image") {
            return (
              <div key={i} className="relative w-full h-96">
                <Image
                  src={block.url}
                  alt=""
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            );
          }

          // TOUR SECTION
          if (block._type === "tourSection") {
            return (
              <div key={i}>
                <h2 className="text-2xl font-semibold mb-4">
                  {block.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {block.tours?.map((tour: any, j: number) => (
                    <div
                      key={j}
                      className="border rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="relative w-full h-40">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-3">
                        <h3 className="font-semibold">
                          {tour.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ₹ {tour.price} • {tour.days} Days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}