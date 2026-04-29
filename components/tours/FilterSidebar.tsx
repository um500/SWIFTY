"use client";

import { useEffect, useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

const PRICE_RANGES = [
  { label: "Under ₹20,000", min: 0, max: 20000 },
  { label: "₹20,000 – ₹40,000", min: 20000, max: 40000 },
  { label: "₹40,000 – ₹70,000", min: 40000, max: 70000 },
  { label: "₹70,000 – ₹1 Lakh", min: 70000, max: 100000 },
  { label: "₹1 Lakh & above", min: 100000, max: 99999999 },
];

const DURATION_OPTIONS = [
  { label: "1 – 3 Days", min: 1, max: 3 },
  { label: "4 – 6 Days", min: 4, max: 6 },
  { label: "7 – 10 Days", min: 7, max: 10 },
  { label: "10+ Days", min: 11, max: 999 },
];

// ─── Collapsible section ────────────────────────────────────────────────────
function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {open ? (
          <ChevronUp size={14} className="text-gray-400" />
        ) : (
          <ChevronDown size={14} className="text-gray-400" />
        )}
      </button>
      {open && <div className="pb-4 space-y-2">{children}</div>}
    </div>
  );
}

// ─── Custom checkbox ────────────────────────────────────────────────────────
function Checkbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
        checked
          ? "bg-blue-500 border-blue-500"
          : "border-gray-300 hover:border-blue-400"
      }`}
    >
      {checked && (
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface FilterSidebarProps {
  tours: any[];
  areaSlug?: string;
  stateSlug?: string;
  countrySlug?: string;
  onFilterChange: (filtered: any[]) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function FilterSidebar({
  tours,
  areaSlug = "",
  stateSlug = "",
  countrySlug = "",
  onFilterChange,
}: FilterSidebarProps) {
  const [selCountry, setSelCountry] = useState("");
  const [selState, setSelState] = useState("");
  const [selPrices, setSelPrices] = useState<number[]>([]);
  const [selDurations, setSelDurations] = useState<number[]>([]);
  const [autoApplied, setAutoApplied] = useState(false);

  // ── Unique values ────────────────────────────────────────────────
  const allCountries = useMemo(
    () => [...new Set(tours.map((t) => t.country).filter(Boolean))].sort() as string[],
    [tours]
  );

  // States filtered by selected country
  const allStates = useMemo(() => {
    const base = selCountry
      ? tours.filter((t) => t.country === selCountry)
      : tours;
    return [...new Set(base.map((t) => t.state).filter(Boolean))].sort() as string[];
  }, [tours, selCountry]);

  // ── Auto-select from navbar slug (runs once when tours load) ─────
  useEffect(() => {
    if (!tours.length || autoApplied) return;

    if (areaSlug || stateSlug || countrySlug) {
      const first = tours[0];
      if (first?.country) setSelCountry(first.country);
      if (first?.state && (areaSlug || stateSlug)) setSelState(first.state);
      setAutoApplied(true);
    }
  }, [tours, areaSlug, stateSlug, countrySlug, autoApplied]);

  // ── Apply filters whenever selections change ─────────────────────
  useEffect(() => {
    let result = [...tours];

    if (selCountry) result = result.filter((t) => t.country === selCountry);
    if (selState) result = result.filter((t) => t.state === selState);

    if (selPrices.length > 0) {
      result = result.filter((t) =>
        selPrices.some((idx) => {
          const r = PRICE_RANGES[idx];
          return t.price >= r.min && t.price <= r.max;
        })
      );
    }

    if (selDurations.length > 0) {
      result = result.filter((t) =>
        selDurations.some((idx) => {
          const d = DURATION_OPTIONS[idx];
          return (t.days ?? 0) >= d.min && (t.days ?? 0) <= d.max;
        })
      );
    }

    onFilterChange(result);
  }, [selCountry, selState, selPrices, selDurations, tours]);

  // ── Toggle helpers ───────────────────────────────────────────────
  const togglePrice = (idx: number) =>
    setSelPrices((p) => (p.includes(idx) ? p.filter((i) => i !== idx) : [...p, idx]));

  const toggleDuration = (idx: number) =>
    setSelDurations((p) => (p.includes(idx) ? p.filter((i) => i !== idx) : [...p, idx]));

  const resetAll = () => {
    setSelCountry("");
    setSelState("");
    setSelPrices([]);
    setSelDurations([]);
  };

  const activeCount =
    (selCountry ? 1 : 0) +
    (selState ? 1 : 0) +
    selPrices.length +
    selDurations.length;

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-gray-600" />
          <span className="font-bold text-gray-800 text-sm">Filter Your Tour</span>
          {activeCount > 0 && (
            <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold"
          >
            Reset <X size={11} />
          </button>
        )}
      </div>

      {/* Total count pill */}
      <div className="px-4 py-2.5 border-b border-gray-100 bg-blue-50/60">
        <p className="text-xs text-gray-600">
          <span className="font-bold text-blue-600 text-sm">{tours.length}</span>{" "}
          package{tours.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="px-4 divide-y divide-gray-100">

        {/* PRICE RANGE */}
        <Section title="Price Range">
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={idx}
                onClick={() => togglePrice(idx)}
                className={`w-full text-xs px-3 py-2 rounded-lg border text-left transition-all font-medium ${
                  selPrices.includes(idx)
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </Section>

        {/* DURATION */}
        <Section title="Duration">
          <div className="space-y-2.5">
            {DURATION_OPTIONS.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => toggleDuration(idx)}
              >
                <Checkbox
                  checked={selDurations.includes(idx)}
                  onClick={() => toggleDuration(idx)}
                />
                <span className="text-sm text-gray-600 hover:text-gray-800 select-none">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* COUNTRY */}
        {allCountries.length > 0 && (
          <Section title="Country">
            <div className="space-y-2.5">
              {allCountries.map((country) => {
                const count = tours.filter((t) => t.country === country).length;
                const active = selCountry === country;
                return (
                  <div
                    key={country}
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => {
                      const next = active ? "" : country;
                      setSelCountry(next);
                      if (!next) setSelState(""); // clear state if country cleared
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        checked={active}
                        onClick={() => {
                          const next = active ? "" : country;
                          setSelCountry(next);
                          if (!next) setSelState("");
                        }}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 select-none">
                        {country}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">({count})</span>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* STATE / REGION */}
        {allStates.length > 0 && (
          <Section title="State / Region">
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {allStates.map((state) => {
                const count = tours.filter((t) => t.state === state).length;
                const active = selState === state;
                return (
                  <div
                    key={state}
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => setSelState(active ? "" : state)}
                  >
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        checked={active}
                        onClick={() => setSelState(active ? "" : state)}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 select-none">
                        {state}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">({count})</span>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* RATING */}
        <Section title="Rating" defaultOpen={false}>
          <div className="space-y-2.5">
            {[5, 4, 3].map((r) => (
              <div key={r} className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox checked={false} onClick={() => {}} />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm leading-none ${
                        i < r ? "text-yellow-400" : "text-gray-200"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1 select-none">& above</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}