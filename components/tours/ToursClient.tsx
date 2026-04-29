"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FilterSidebar from "./FilterSidebar";
import TourCard from "./TourCard";
import { LayoutGrid, AlignJustify, X, ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Deals", value: "deals" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Duration: Shortest", value: "days_asc" },
  { label: "Rating", value: "rating" },
];

interface ToursClientProps {
  tours: any[];
  filterLabel?: string;
  areaSlug?: string;
  stateSlug?: string;
  countrySlug?: string;
}

function sortTours(tours: any[], sortBy: string) {
  const arr = [...tours];
  if (sortBy === "price_asc") return arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sortBy === "price_desc") return arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sortBy === "days_asc") return arr.sort((a, b) => (a.days ?? 0) - (b.days ?? 0));
  if (sortBy === "rating") return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return arr;
}

export default function ToursClient({
  tours,
  filterLabel = "",
  areaSlug = "",
  stateSlug = "",
  countrySlug = "",
}: ToursClientProps) {
  const [filtered, setFiltered] = useState<any[]>(tours);
  const [sorted, setSorted] = useState<any[]>(tours);
  const [sortBy, setSortBy] = useState("deals");
  const [view, setView] = useState<"list" | "grid">("list");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Re-sync when server sends new tours (e.g. URL change)
  useEffect(() => {
    setFiltered(tours);
    setSorted(sortTours(tours, sortBy));
  }, [tours]);

  const handleFilterChange = (f: any[]) => {
    setFiltered(f);
    setSorted(sortTours(f, sortBy));
  };

  const handleSort = (val: string) => {
    setSortBy(val);
    setSorted(sortTours(filtered, val));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <span>/</span>
        <Link href="/tours" className="hover:text-blue-500">Tours</Link>
        {filterLabel && (
          <>
            <span>/</span>
            <span className="text-gray-600 font-medium">{filterLabel}</span>
          </>
        )}
      </div>

      {/* ── Page heading ───────────────────────────────────────── */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">
          {sorted.length}{" "}
          {filterLabel ? `${filterLabel} ` : ""}
          Holiday Package{sorted.length !== 1 ? "s" : ""}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Showing 1–{sorted.length} packages from {tours.length} packages
        </p>
      </div>

      {/* ── Sort bar ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 px-4 py-2.5 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Active filter chip */}
          {filterLabel && (
            <span className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2.5 py-1.5 rounded-full font-medium">
              {filterLabel}
              <Link href="/tours">
                <X size={11} className="ml-0.5 hover:text-blue-900 cursor-pointer" />
              </Link>
            </span>
          )}
          <span className="text-xs text-gray-400 hidden sm:inline">
            {sorted.length} result{sorted.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden text-xs border border-gray-300 rounded-lg px-3 py-1.5 text-gray-600 hover:border-blue-400 transition"
          >
            Filters
          </button>

          {/* Sort dropdown */}
          <div className="relative flex items-center gap-1.5">
            <span className="text-xs text-gray-500 hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg pl-2.5 pr-7 py-1.5 bg-white text-gray-700 outline-none cursor-pointer appearance-none hover:border-blue-400 transition"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("list")}
              className={`p-1.5 transition-colors ${
                view === "list" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <AlignJustify size={14} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 transition-colors ${
                view === "grid" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main layout ────────────────────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* SIDEBAR — desktop */}
        <aside className="hidden lg:block w-[270px] min-w-[270px] sticky top-[80px]">
          <FilterSidebar
            tours={tours}
            areaSlug={areaSlug}
            stateSlug={stateSlug}
            countrySlug={countrySlug}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* TOUR LIST */}
        <div className="flex-1 min-w-0">
          {sorted.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 py-24 flex flex-col items-center text-gray-400">
              <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
                <path d="M20 44 Q32 22 44 44" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="24" cy="28" r="3" fill="currentColor" />
                <circle cx="40" cy="28" r="3" fill="currentColor" />
              </svg>
              <p className="text-lg font-semibold text-gray-500">No tours found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
              <button
                onClick={() => {
                  setFiltered(tours);
                  setSorted(sortTours(tours, sortBy));
                }}
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : view === "list" ? (
            <div className="flex flex-col gap-4">
              {sorted.map((tour) => (
                <TourCard key={tour._id} tour={tour} view="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sorted.map((tour) => (
                <TourCard key={tour._id} tour={tour} view="grid" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ───────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-[85%] max-w-sm h-full bg-white overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-bold text-gray-800">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                tours={tours}
                areaSlug={areaSlug}
                stateSlug={stateSlug}
                countrySlug={countrySlug}
                onFilterChange={(f) => {
                  handleFilterChange(f);
                  setMobileFilterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}