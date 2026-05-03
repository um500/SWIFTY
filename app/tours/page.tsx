// import { client } from "@/lib/sanity";
// import { TOURS_LISTING_QUERY } from "@/lib/queries";
// import Link from "next/link";
// import FilterSidebar from "@/components/tours/FilterSidebar";
// import TourCard from "@/components/tours/TourCard";

// export default async function ToursPage({ searchParams }: any) {
//   const resolvedParams = await searchParams;

//   const areaSlug = resolvedParams?.city ?? "";
//   const stateSlug = resolvedParams?.state ?? "";
//   const countrySlug = resolvedParams?.country ?? "";

//   const tours = await client.fetch(TOURS_LISTING_QUERY, {
//     areaSlug,
//     stateSlug,
//     countrySlug,
//   });

//   const safeTours = Array.isArray(tours) ? tours : [];

//   const filterLabel = areaSlug || stateSlug || countrySlug;

//   return (
//     <div className="min-h-screen bg-gray-100">

//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* FILTER BADGE */}
//         {filterLabel && (
//           <div className="mb-6 flex items-center gap-2">
//             <span className="text-gray-600 text-sm">
//               Showing results for:
//             </span>

//             <span className="bg-yellow-200 text-black px-3 py-1 rounded-full text-sm font-medium">
//               {filterLabel}
//             </span>

//             <Link href="/tours" className="text-sm text-blue-500 underline">
//               Clear filter
//             </Link>
//           </div>
//         )}

//         <div className="flex gap-6">

//           {/* SIDEBAR */}
//           <div className="w-64 hidden lg:block">
//             <div className="bg-white p-4 rounded-xl shadow">
//               <FilterSidebar data={safeTours} />
//             </div>
//           </div>

//           {/* TOUR LIST */}
//           <div className="flex-1">

//             {safeTours.length === 0 ? (
//               <div className="text-center py-20 text-gray-500">
//                 No tours found
//               </div>
//             ) : (
//               <div className="flex flex-col gap-6">
//                 {safeTours.map((tour: any) => (
//                   <TourCard key={tour._id} tour={tour} />
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { client } from "@/lib/sanity";
import { TOURS_LISTING_QUERY } from "@/lib/queries";
import ToursClient from "@/components/tours/ToursClient";

export default async function ToursPage({ searchParams }: any) {
  const resolvedParams = await searchParams;

  const areaSlug    = resolvedParams?.city     ?? "";
  const stateSlug   = resolvedParams?.state    ?? "";
  const countrySlug = resolvedParams?.country  ?? "";
  const specialSlug = resolvedParams?.special  ?? "";
  const customSlug  = resolvedParams?.custom   ?? "";

  const tours = await client.fetch(
    TOURS_LISTING_QUERY,
    { areaSlug, stateSlug, countrySlug },
    { next: { revalidate: 60 } }
  );

  const safeTours = Array.isArray(tours) ? tours : [];

  // Build human-readable label
  // Priority: special > custom > city > state > country
  let filterLabel = "";
  if (specialSlug) {
    filterLabel = specialSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  } else if (customSlug) {
    filterLabel = customSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  } else {
    const rawLabel = areaSlug || stateSlug || countrySlug;
    filterLabel = rawLabel
      ? rawLabel.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
      : "";
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <ToursClient
        tours={safeTours}
        filterLabel={filterLabel}
        areaSlug={areaSlug}
        stateSlug={stateSlug}
        countrySlug={countrySlug}
        specialSlug={specialSlug}
        customSlug={customSlug}
      />
    </div>
  );
}