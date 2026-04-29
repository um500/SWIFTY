// "use client";

// import { useEffect, useState } from "react";
// import { client } from "@/lib/sanity";
// import { useParams } from "next/navigation";

// import FilterSidebar from "@/components/tours/FilterSidebar";
// import TourCard from "@/components/tours/TourCard";

// export default function Page() {
//   const params = useParams();

//   const slug =
//     typeof params?.slug === "string"
//       ? decodeURIComponent(params.slug).toLowerCase().trim()
//       : "";

//   const [allTours, setAllTours] = useState<any[]>([]);
//   const [filteredTours, setFilteredTours] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (slug) fetchTours();
//   }, [slug]);

//   const fetchTours = async () => {
//     setLoading(true);

//     try {
//       const data = await client.fetch(
//         `
//         *[_type == "tour"
//           && defined(area)
//           && area->slug.current == $slug
//         ]{
//           _id,
//           title,
//           slug,
//           "image": images[0].asset->url,
//           price,
//           days,
//           "areaName": area->name,
//           country->{name},
//           state->{name},
//           categories[]->{name}
//         }
//         `,
//         { slug }
//       );

//       setAllTours(data || []);
//       setFilteredTours(data || []);
//     } catch (err) {
//       console.error(err);
//       setAllTours([]);
//       setFilteredTours([]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-6 py-6">

//         {/* 🔥 FILTER */}
//         <div className="w-1/4 hidden md:block">
//           <div className="bg-white rounded-2xl shadow p-4">
//             <FilterSidebar
//               data={allTours || []}
//               setFiltered={setFilteredTours}
//             />
//           </div>
//         </div>

//         {/* 🔥 RIGHT */}
//         <div className="w-full md:w-3/4">

//           <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
//             {slug || "Tours"}
//           </h1>

//           {loading && (
//             <p className="text-gray-500">Loading tours...</p>
//           )}

//           {!loading && filteredTours.length === 0 && (
//             <p className="text-red-500">No tours found</p>
//           )}

//           <div className="flex flex-col gap-6">
//             {filteredTours.map((tour) => (
//               <div
//                 key={tour._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-md transition"
//               >
//                 <TourCard tour={tour} />
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import { client } from "@/lib/sanity";

const SINGLE_TOUR_QUERY = `
*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  price,
  duration,
  category,
  country,
  state,
  city,
  description,
  "image": mainImage.asset->url
}
`;

export default async function Page({ params }: any) {

  // ✅ IMPORTANT FIX (Next 16)
  const resolvedParams = await params;

  const slug = resolvedParams.slug;

  console.log("SLUG:", slug); // ✅ ab correct aayega

  if (!slug) {
    return <div>Invalid URL</div>;
  }

  const tour = await client.fetch(SINGLE_TOUR_QUERY, {
    slug: slug, // ✅ ab proper pass ho raha hai
  });

  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="p-6">
      <img src={tour.image} className="w-full h-96 object-cover rounded-xl" />

      <h1 className="text-3xl font-bold mt-4">{tour.title}</h1>
      <p className="text-xl mt-2">₹ {tour.price}</p>
      <p className="mt-2">{tour.city}, {tour.state}</p>

      <p className="mt-4">{tour.description}</p>
    </div>
  );
}