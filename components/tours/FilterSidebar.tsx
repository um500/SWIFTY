"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { client } from "@/lib/sanity";

const PRICE_RANGES = [
  { label: "Under ₹20,000",      min: 0,      max: 20000    },
  { label: "₹20,000 – ₹40,000", min: 20000,  max: 40000    },
  { label: "₹40,000 – ₹70,000", min: 40000,  max: 70000    },
  { label: "₹70,000 – ₹1 Lakh", min: 70000,  max: 100000   },
  { label: "₹1 Lakh & above",   min: 100000, max: 99999999 },
];

const DURATION_OPTIONS = [
  { label: "1 – 3 Days",  min: 1,  max: 3   },
  { label: "4 – 6 Days",  min: 4,  max: 6   },
  { label: "7 – 10 Days", min: 7,  max: 10  },
  { label: "10+ Days",    min: 11, max: 999  },
];

const SPECIAL_QUERY    = `*[_type == "category"]           | order(title asc){ _id, "name": title, "slug": slug.current }`;
const CUSTOMIZED_QUERY = `*[_type == "customizedCategory"] | order(title asc){ _id, "name": title, "slug": slug.current }`;

const str = (v: any): string => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v.name ?? v.title ?? "";
};

const hasCat = (arr: any[] | undefined, name: string): boolean =>
  Array.isArray(arr) && arr.some((c) => str(c) === name);

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
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {open
          ? <ChevronUp   size={14} className="text-gray-400 flex-shrink-0" />
          : <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function CheckBox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors select-none ${
        checked ? "bg-blue-500 border-blue-500" : "border-gray-300 hover:border-blue-400"
      }`}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}

interface FilterSidebarProps {
  tours:          any[];
  areaSlug?:      string;
  stateSlug?:     string;
  countrySlug?:   string;
  specialSlug?:   string;
  customSlug?:    string;
  onFilterChange: (filtered: any[]) => void;
}

export default function FilterSidebar({
  tours,
  areaSlug    = "",
  stateSlug   = "",
  countrySlug = "",
  specialSlug = "",
  customSlug  = "",
  onFilterChange,
}: FilterSidebarProps) {

  // ── All filter state in one object to avoid race conditions ──────────────
  const [filters, setFilters] = useState({
    country:    "",
    state:      "",
    area:       "",
    special:    "",
    customized: "",
    prices:     [] as number[],
    durations:  [] as number[],
  });

  const [sanitySpecial,    setSanitySpecial]    = useState<any[]>([]);
  const [sanityCustomized, setSanityCustomized] = useState<any[]>([]);

  // Track the last URL params we initialised from, so we only init once per navigation
  const initKey = useRef("");

  // ── Fetch Sanity category lists once ─────────────────────────────────────
  useEffect(() => {
    client.fetch(SPECIAL_QUERY).then(setSanitySpecial).catch(console.error);
    client.fetch(CUSTOMIZED_QUERY).then(setSanityCustomized).catch(console.error);
  }, []);

  // ── Init filters from URL params ─────────────────────────────────────────
  // Runs when: URL params change OR sanity lists load (needed for special/custom)
  useEffect(() => {
    const key = `${specialSlug}|${customSlug}|${areaSlug}|${stateSlug}|${countrySlug}`;

    // For geo filters we just need tours; for category filters we need sanity lists
    const needsSpecial    = !!specialSlug && sanitySpecial.length === 0;
    const needsCustomized = !!customSlug  && sanityCustomized.length === 0;
    if (needsSpecial || needsCustomized) return; // wait for data

    if (initKey.current === key) return; // already applied this exact combination
    initKey.current = key;

    // Resolve special name from slug
    let specialName = "";
    if (specialSlug && sanitySpecial.length) {
      const match = sanitySpecial.find((x) => x.slug === specialSlug);
      specialName = match?.name ?? "";
    }

    // Resolve customized name from slug
    let customizedName = "";
    if (customSlug && sanityCustomized.length) {
      const match = sanityCustomized.find((x) => x.slug === customSlug);
      customizedName = match?.name ?? "";
    }

    // Resolve geo names from first matching tour
    let countryName = "";
    let stateName   = "";
    let areaName    = "";
    if ((countrySlug || stateSlug || areaSlug) && tours.length) {
      const first = tours[0];
      countryName = str(first.country);
      if (stateSlug || areaSlug) stateName = str(first.state);
      if (areaSlug)              areaName  = str(first.area);
    }

    setFilters({
      country:    countryName,
      state:      stateName,
      area:       areaName,
      special:    specialName,
      customized: customizedName,
      prices:     [],
      durations:  [],
    });
  }, [specialSlug, customSlug, areaSlug, stateSlug, countrySlug, sanitySpecial, sanityCustomized, tours]);

  // ── Apply filters → emit result ───────────────────────────────────────────
  useEffect(() => {
    let result = [...tours];

    if (filters.country)    result = result.filter((t) => str(t.country) === filters.country);
    if (filters.state)      result = result.filter((t) => str(t.state)   === filters.state);
    if (filters.area)       result = result.filter((t) => str(t.area)    === filters.area);
    if (filters.special)    result = result.filter((t) => hasCat(t.categories,           filters.special));
    if (filters.customized) result = result.filter((t) => hasCat(t.customizedCategories, filters.customized));

    if (filters.prices.length > 0) {
      result = result.filter((t) =>
        filters.prices.some((idx) => {
          const r = PRICE_RANGES[idx];
          return (t.price ?? 0) >= r.min && (t.price ?? 0) <= r.max;
        })
      );
    }

    if (filters.durations.length > 0) {
      result = result.filter((t) => {
        const d = parseInt(String(t.days ?? "0"), 10);
        return filters.durations.some((idx) => {
          const o = DURATION_OPTIONS[idx];
          return d >= o.min && d <= o.max;
        });
      });
    }

    onFilterChange(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tours]);

  // ── Derived option lists ──────────────────────────────────────────────────
  const allCountries = useMemo(
    () => [...new Set(tours.map((t) => str(t.country)).filter(Boolean))].sort(),
    [tours]
  );
  const allStates = useMemo(() => {
    const base = filters.country ? tours.filter((t) => str(t.country) === filters.country) : tours;
    return [...new Set(base.map((t) => str(t.state)).filter(Boolean))].sort();
  }, [tours, filters.country]);
  const allAreas = useMemo(() => {
    let base = [...tours];
    if (filters.country) base = base.filter((t) => str(t.country) === filters.country);
    if (filters.state)   base = base.filter((t) => str(t.state)   === filters.state);
    return [...new Set(base.map((t) => str(t.area)).filter(Boolean))].sort();
  }, [tours, filters.country, filters.state]);

  // ── Setters ───────────────────────────────────────────────────────────────
  const set = (patch: Partial<typeof filters>) =>
    setFilters((f) => ({ ...f, ...patch }));

  const handleCountryClick = (v: string) => {
    const next = filters.country === v ? "" : v;
    set({ country: next, ...(next ? {} : { state: "", area: "" }) });
  };
  const handleStateClick = (v: string) => {
    const next = filters.state === v ? "" : v;
    set({ state: next, ...(next ? {} : { area: "" }) });
  };
  const handleAreaClick       = (v: string) => set({ area:       filters.area       === v ? "" : v });
  const handleSpecialClick    = (v: string) => set({ special:    filters.special    === v ? "" : v });
  const handleCustomizedClick = (v: string) => set({ customized: filters.customized === v ? "" : v });

  const togglePrice = (idx: number) =>
    set({ prices: filters.prices.includes(idx) ? filters.prices.filter((i) => i !== idx) : [...filters.prices, idx] });
  const toggleDuration = (idx: number) =>
    set({ durations: filters.durations.includes(idx) ? filters.durations.filter((i) => i !== idx) : [...filters.durations, idx] });

  const resetAll = () => {
    initKey.current = "";
    set({ country: "", state: "", area: "", special: "", customized: "", prices: [], durations: [] });
  };

  // ── Count helpers ─────────────────────────────────────────────────────────
  const countByField    = (field: string, value: string) => tours.filter((t) => str(t[field]) === value).length;
  const countSpecial    = (name: string) => tours.filter((t) => hasCat(t.categories,           name)).length;
  const countCustomized = (name: string) => tours.filter((t) => hasCat(t.customizedCategories, name)).length;

  const activeCount =
    (filters.country ? 1 : 0) + (filters.state ? 1 : 0) + (filters.area ? 1 : 0) +
    (filters.special ? 1 : 0) + (filters.customized ? 1 : 0) +
    filters.prices.length + filters.durations.length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full">

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
          <button onClick={resetAll} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold">
            Reset <X size={11} />
          </button>
        )}
      </div>

      {/* Package count */}
      <div className="px-4 py-2.5 border-b border-gray-100 bg-blue-50/50">
        <p className="text-xs text-gray-500">
          <span className="font-bold text-blue-600 text-sm">{tours.length}</span>{" "}
          package{tours.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="px-4 divide-y divide-gray-100">

        {/* Price */}
        <Section title="Price Range">
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={idx}
                onClick={() => togglePrice(idx)}
                className={`w-full text-xs px-3 py-2 rounded-lg border text-left transition-all font-medium ${
                  filters.prices.includes(idx)
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Duration */}
        <Section title="Duration">
          <div className="space-y-2.5">
            {DURATION_OPTIONS.map((opt, idx) => (
              <div key={idx} onClick={() => toggleDuration(idx)} className="flex items-center gap-2.5 cursor-pointer group">
                <CheckBox checked={filters.durations.includes(idx)} onChange={() => toggleDuration(idx)} />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{opt.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Country */}
        {allCountries.length > 0 && (
          <Section title="Country">
            <div className="space-y-2.5">
              {allCountries.map((country) => (
                <div key={country} onClick={() => handleCountryClick(country)} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <CheckBox checked={filters.country === country} onChange={() => handleCountryClick(country)} />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{country}</span>
                  </div>
                  <span className="text-xs text-gray-400 tabular-nums">({countByField("country", country)})</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* State */}
        {allStates.length > 0 && (
          <Section title="State / Region">
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-0.5">
              {allStates.map((state) => (
                <div key={state} onClick={() => handleStateClick(state)} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <CheckBox checked={filters.state === state} onChange={() => handleStateClick(state)} />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{state}</span>
                  </div>
                  <span className="text-xs text-gray-400 tabular-nums">({countByField("state", state)})</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* City */}
        {allAreas.length > 0 && (
          <Section title="City">
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-0.5">
              {allAreas.map((area) => (
                <div key={area} onClick={() => handleAreaClick(area)} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <CheckBox checked={filters.area === area} onChange={() => handleAreaClick(area)} />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{area}</span>
                  </div>
                  <span className="text-xs text-gray-400 tabular-nums">({countByField("area", area)})</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Special Tours — open by default when specialSlug active */}
        {sanitySpecial.length > 0 && (
          <Section title="Special Tours" defaultOpen={!!specialSlug}>
            <div className="space-y-2.5">
              {sanitySpecial.map((cat) => {
                const count = countSpecial(cat.name);
                return (
                  <div key={cat._id} onClick={() => handleSpecialClick(cat.name)} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <CheckBox checked={filters.special === cat.name} onChange={() => handleSpecialClick(cat.name)} />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{cat.name}</span>
                    </div>
                    {count > 0 && <span className="text-xs text-gray-400 tabular-nums">({count})</span>}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Customized Tours — open by default when customSlug active */}
        {sanityCustomized.length > 0 && (
          <Section title="Customized Tours" defaultOpen={!!customSlug}>
            <div className="space-y-2.5">
              {sanityCustomized.map((cat) => {
                const count = countCustomized(cat.name);
                return (
                  <div key={cat._id} onClick={() => handleCustomizedClick(cat.name)} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <CheckBox checked={filters.customized === cat.name} onChange={() => handleCustomizedClick(cat.name)} />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 select-none">{cat.name}</span>
                    </div>
                    {count > 0 && <span className="text-xs text-gray-400 tabular-nums">({count})</span>}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Rating */}
        <Section title="Rating" defaultOpen={false}>
          <div className="space-y-2.5">
            {[5, 4, 3].map((r) => (
              <div key={r} className="flex items-center gap-2.5 cursor-pointer group">
                <CheckBox checked={false} onChange={() => {}} />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-sm leading-none ${i < r ? "text-yellow-400" : "text-gray-200"}`}>★</span>
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