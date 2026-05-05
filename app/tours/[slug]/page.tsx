// ============================================
// 📁 app/tour/[slug]/page.tsx
// Single Tour Details Page — Next.js 15+ App Router
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/lib/sanity";
import { tourBySlugQuery } from "@/lib/queries";

import HeroCarousel from "@/components/tours/HeroCarousel";
import Itinerary from "@/components/tours/Itinerary";
import TourTabs from "@/components/tours/TourTabs";
import PriceCard from "@/components/tours/PriceCard";
import TourDetails from "@/components/tours/TourDetails";
import CancellationTable from "@/components/tours/CancellationTable";

// ── Types ──────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CancellationPolicy {
  _key?: string;
  /** Raw percentage string e.g. "25" or "25%" */
  amount?: string;
  /** Explicit percent field if schema has it */
  percent?: string;
  days?: string;
  dateRange?: string;
}

interface TourItineraryDay {
  _key?: string;
  day?: number;
  title?: string;
  description?: PortableTextBlock[] | string | null;
  highlights?: string[];
  stay?: string;
  meals?: string[];
}

interface Tour {
  _id: string;
  title: string;
  price?: number;
  days?: string;
  shortDescription?: string;
  rating?: number;
  highlights?: string[];
  images?: string[];
  country?: { name?: string; slug?: string };
  state?: { name?: string; slug?: string };
  area?: { name?: string; slug?: string };
  categories?: { title?: string }[];
  customizedCategories?: { title?: string }[];
  flights?: any[];
  accommodations?: any[];
  reporting?: any;
  itinerary?: TourItineraryDay[];
  inclusions?: (string | PortableTextBlock[])[];
  exclusions?: (string | PortableTextBlock[])[];
  preparation?: (string | PortableTextBlock[])[];
  cancellation?: CancellationPolicy[];
  pdf?: { asset?: { url?: string } };
}

// ── Helpers ────────────────────────────────────────────────────────────

/** Derive INR amount from a percentage and the tour price */
function calculateAmount(percent: string, price?: number): string {
  if (!price || !percent) return "";
  const value = (parseInt(percent, 10) / 100) * price;
  return Math.round(value).toLocaleString("en-IN");
}

/** Extract the numeric percent string from a CancellationPolicy row */
function resolvePercent(item: CancellationPolicy): string {
  if (item.percent) return item.percent.replace("%", "");
  if (item.amount)  return item.amount.replace("%", "");
  return "0";
}

// ── Sub-components ─────────────────────────────────────────────────────

function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-gray-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">/</span>}
              {isLast ? (
                <span className="text-gray-700 font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#3b4fa8] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-6 bg-[#3b4fa8] rounded-full" />
        <h3 className="text-lg font-bold text-gray-800">Tour Highlights</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm bg-[#eef0f8] text-[#3b4fa8] px-3 py-1.5 rounded-full font-medium"
          >
            ✨ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TourNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tour not found</h1>
        <p className="text-gray-500 mb-6">
          The tour you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/tours"
          className="inline-block px-6 py-3 bg-[#3b4fa8] text-white rounded-lg font-semibold hover:bg-[#2d3d8a] transition-colors"
        >
          Browse All Tours
        </Link>
      </div>
    </div>
  );
}

// ── SEO Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Tour Not Found" };

  const tour: Tour | null = await client.fetch(tourBySlugQuery, { slug });

  return {
    title: tour?.title ? `${tour.title} | Tour Details` : "Tour Details",
    description: tour?.shortDescription ?? "",
    openGraph: {
      title: tour?.title ?? "Tour Details",
      description: tour?.shortDescription ?? "",
      images: tour?.images?.[0] ? [{ url: tour.images[0] }] : [],
    },
  };
}

// ── Main Page ──────────────────────────────────────────────────────────

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return <TourNotFound />;

  const tour: Tour | null = await client.fetch(
    tourBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!tour) return <TourNotFound />;

  // Location string shown in header
  const location = [tour.area?.name, tour.state?.name, tour.country?.name]
    .filter(Boolean)
    .join(" • ");

  // Breadcrumb — country link uses ?country=<slug> to filter /tours listing
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    ...(tour.country?.slug
      ? [
          {
            label: tour.country.name ?? tour.country.slug,
            href: `/tours?country=${tour.country.slug}`,
          },
        ]
      : []),
    { label: tour.title, href: "#" },
  ];

  // Build cancellation table data
  const cancellationData =
    (tour.cancellation ?? [])
      .map((item: CancellationPolicy) => {
        const percent = resolvePercent(item);
        return {
          percent,
          amount: calculateAmount(percent, tour.price),
          days: item.days ?? "",
          dateRange: item.dateRange ?? "",
        };
      })
      .sort((a, b) => Number(a.percent) - Number(b.percent));

  const pdfUrl = tour.pdf?.asset?.url ?? null;

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TITLE — mobile only */}
        <div className="lg:hidden mb-5">
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
            {tour.days    && <span>🗓️ {tour.days}</span>}
            {location     && <span>📍 {location}</span>}
            {tour.rating  && <span>⭐ {tour.rating} / 5</span>}
          </div>
        </div>

        {/* HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Carousel + Title card + Highlights */}
          <div className="lg:col-span-2 space-y-5">
            <HeroCarousel images={tour.images ?? []} title={tour.title} />

            {/* Title card — desktop only */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-sm text-gray-500">
                {tour.days   && <span>🗓️ {tour.days}</span>}
                {location    && <span>📍 {location}</span>}
                {tour.rating && <span>⭐ {tour.rating} / 5</span>}
              </div>
              {tour.shortDescription && (
                <p className="mt-4 text-gray-600 leading-7">
                  {tour.shortDescription}
                </p>
              )}
            </div>

            <Highlights items={tour.highlights} />
          </div>

          {/* Right: Price Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <PriceCard
                price={tour.price}
                days={tour.days}
                title={tour.title}
                pdfUrl={pdfUrl}
              />
            </div>
          </div>
        </div>

        {/* SHORT DESC — mobile only */}
        {tour.shortDescription && (
          <section className="lg:hidden mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="leading-7 text-gray-600">{tour.shortDescription}</p>
          </section>
        )}

        {/* DAY-WISE ITINERARY */}
        <Itinerary data={tour.itinerary ?? []} />

        {/* TOUR INFO TABS */}
        <TourTabs
          inclusions={tour.inclusions ?? []}
          exclusions={tour.exclusions ?? []}
          preparation={tour.preparation ?? []}
        />

        {/* TOUR DETAILS */}
        <TourDetails
          flights={tour.flights ?? []}
          accommodations={tour.accommodations ?? []}
          reporting={tour.reporting}
        />

        {/* CANCELLATION POLICY */}
        {cancellationData.length > 0 && (
          <CancellationTable data={cancellationData} />
        )}
      </div>
    </main>
  );
}