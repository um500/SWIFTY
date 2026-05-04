"use client";

// ============================================
// 📁 components/tours/TourTabs.tsx
// Tour Inclusions / Exclusions / Preparation
// Supports plain string OR Sanity Portable Text
// ============================================

import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type TabKey = "inclusions" | "exclusions" | "preparation";
type RichItem = string | PortableTextBlock[];

interface TourTabsProps {
  inclusions?: RichItem[];
  exclusions?: RichItem[];
  preparation?: RichItem[];
}

const TABS: { key: TabKey; label: string; emptyMsg: string }[] = [
  { key: "inclusions",  label: "Tour Inclusions",     emptyMsg: "No inclusions listed." },
  { key: "exclusions",  label: "Tour Exclusions",     emptyMsg: "No exclusions listed." },
  { key: "preparation", label: "Advance Preparation", emptyMsg: "No preparation notes listed." },
];

const ACCENT: Record<TabKey, string> = {
  inclusions:  "border-l-green-500",
  exclusions:  "border-l-red-400",
  preparation: "border-l-teal-500",
};

// ── Inline Portable Text renderer ──
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-gray-800 mt-2 mb-1">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#3b4fa8] underline hover:no-underline"
      >
        {children}
      </a>
    ),
  },
};

function RenderItem({ value }: { value: RichItem }) {
  if (value == null) return null;
  if (typeof value === "string") {
    return <p className="text-sm text-gray-700 leading-relaxed">{value}</p>;
  }
  if (Array.isArray(value)) {
    return <PortableText value={value} components={ptComponents} />;
  }
  return null;
}

export default function TourTabs({
  inclusions = [],
  exclusions = [],
  preparation = [],
}: TourTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("inclusions");

  const dataMap: Record<TabKey, RichItem[]> = { inclusions, exclusions, preparation };
  const activeData = dataMap[activeTab] ?? [];

  return (
    <div className="mt-10">
      {/* ── Section Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-7 bg-[#3b4fa8] rounded-full" />
        <h2 className="text-2xl font-bold text-gray-800">Tour Information</h2>
      </div>
      <p className="text-sm text-gray-400 italic mb-5 ml-4">
        Read this to prepare for your tour in the best way!
      </p>

      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
        {/* ── Tab Strip ── */}
        <div className="flex">
          {TABS.map(({ key, label }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-4 px-3 text-sm font-semibold text-center transition-all duration-200 border-b-2 ${
                  isActive
                    ? "bg-[#3b4fa8] text-white border-[#3b4fa8]"
                    : "bg-[#eef0f8] text-gray-500 border-[#d8dbed] hover:bg-[#e2e5f5] hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Content ── */}
        <div className="p-6 min-h-[200px]">
          {activeData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-sm text-gray-400 italic">
                {TABS.find((t) => t.key === activeTab)?.emptyMsg}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {activeData.map((item, i) => (
                <div key={i} className={`border-l-4 pl-4 py-1 ${ACCENT[activeTab]}`}>
                  <RenderItem value={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
