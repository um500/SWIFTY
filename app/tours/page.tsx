// ============================================
// 📁 app/tours/page.tsx
// Tour Listing Page — Next.js 15+ App Router (Server Component)
// URL params: ?country=<slug> | ?state=<slug> | ?city=<slug>
// ============================================

import { client } from "@/lib/sanity";
import { TOURS_LISTING_QUERY } from "@/lib/queries";
import ToursClient from "@/components/tours/ToursClient";

interface SearchParams {
  country?: string;
  state?: string;
  city?: string;
  special?: string;
  custom?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ToursPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  // All filters use slug values (matching Sanity slug.current)
  const areaSlug    = resolvedParams?.city    ?? "";
  const stateSlug   = resolvedParams?.state   ?? "";
  const countrySlug = resolvedParams?.country ?? "";
  const specialSlug = resolvedParams?.special ?? "";
  const customSlug  = resolvedParams?.custom  ?? "";

  const tours = await client.fetch(
    TOURS_LISTING_QUERY,
    { areaSlug, stateSlug, countrySlug },
    { next: { revalidate: 60 } }
  );

  const safeTours = Array.isArray(tours) ? tours : [];

  // Build a human-readable filter label for the UI heading
  // Priority: special > custom > city > state > country
  const rawLabel =
    specialSlug || customSlug || areaSlug || stateSlug || countrySlug || "";

  const filterLabel = rawLabel
    ? rawLabel
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "";

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