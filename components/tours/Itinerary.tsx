"use client";

// ============================================
// 📁 components/tours/Itinerary.tsx
// Expandable day-wise itinerary with Portable Text support
// ============================================

import { useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type PortableDescription = PortableTextBlock[] | string | null | undefined;

interface ItineraryDay {
  _key?: string;
  day?: number;
  title?: string;
  description?: PortableDescription;
  highlights?: string[];
  stay?: string;
  meals?: string[];
}

interface Props {
  data?: ItineraryDay[] | null;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 leading-7 text-gray-600 last:mb-0">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-5 text-base font-bold text-gray-900 first:mt-0">
        {children}
      </h3>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 mt-2 list-disc space-y-2 pl-5 text-gray-600 marker:text-blue-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 mt-2 list-decimal space-y-2 pl-5 text-gray-600 marker:font-semibold marker:text-blue-600">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

function DescriptionRenderer({ value }: { value: PortableDescription }) {
  if (!value) return null;

  // Backward compatibility:
  // If some older Sanity documents still contain plain string descriptions,
  // render them safely instead of crashing.
  if (typeof value === "string") {
    return <p className="leading-7 text-gray-600">{value}</p>;
  }

  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className="max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}

function AccordionItem({
  day,
  index,
  isOpen,
  onToggle,
}: {
  day: ItineraryDay;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasMeals = Boolean(day.meals?.length);
  const hasHighlights = Boolean(day.highlights?.length);

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        {/* Day badge */}
        <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
          <span className="text-[10px] font-medium uppercase leading-none">
            Day
          </span>
          <span className="mt-1 text-lg font-bold leading-none">
            {day.day ?? index + 1}
          </span>
        </div>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-bold text-gray-900 sm:text-lg">
            {day.title || `Day ${day.day ?? index + 1}`}
          </h3>

          {!isOpen && day.stay && (
            <p className="mt-1 truncate text-sm text-gray-500">🏨 {day.stay}</p>
          )}
        </div>

        {/* Meta pills desktop only when closed */}
        {!isOpen && (
          <div className="hidden items-center gap-2 md:flex">
            {hasMeals && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                🍽️ {day.meals?.length} meals
              </span>
            )}

            {hasHighlights && (
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                ✨ {day.highlights?.length} highlights
              </span>
            )}
          </div>
        )}

        {/* Toggle icon */}
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 7.5L10 12.5L15 7.5" />
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-5 pb-5 pt-5 sm:pl-[92px]">
            {/* Description */}
            <DescriptionRenderer value={day.description} />

            {/* Highlights */}
            {hasHighlights && (
              <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                <h4 className="mb-3 text-sm font-bold text-blue-900">
                  ✨ Highlights
                </h4>

                <ul className="space-y-2">
                  {day.highlights?.map((highlight, i) => (
                    <li
                      key={`${highlight}-${i}`}
                      className="flex gap-2 text-sm leading-6 text-blue-800"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stay + Meals */}
            {(day.stay || hasMeals) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {day.stay && (
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
                    🏨 {day.stay}
                  </span>
                )}

                {day.meals?.map((meal, i) => (
                  <span
                    key={`${meal}-${i}`}
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700"
                  >
                    🍽️ {meal}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Itinerary({ data }: Props) {
  const days = Array.isArray(data) ? data : [];

  const [openIndexes, setOpenIndexes] = useState<number[]>(() =>
    days.length > 0 ? [0] : []
  );

  if (!days.length) return null;

  const isAllOpen = openIndexes.length === days.length;

  function toggleDay(index: number) {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function expandAll() {
    setOpenIndexes(days.map((_, index) => index));
  }

  function collapseAll() {
    setOpenIndexes([]);
  }

  return (
    <section className="mt-8">
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Day-wise Itinerary
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Your travel plan
          </h2>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            disabled={isAllOpen}
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300"
          >
            Expand All
          </button>

          <span className="text-gray-300">·</span>

          <button
            type="button"
            onClick={collapseAll}
            disabled={openIndexes.length === 0}
            className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Day pills quick jump */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {days.map((day, i) => {
          const active = openIndexes.includes(i);

          return (
            <button
              type="button"
              key={day._key ?? `${day.day}-${i}`}
              onClick={() => toggleDay(i)}
              className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              Day {day.day ?? i + 1}
            </button>
          );
        })}
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {days.map((day, index) => (
          <AccordionItem
            key={day._key ?? `${day.day}-${index}`}
            day={day}
            index={index}
            isOpen={openIndexes.includes(index)}
            onToggle={() => toggleDay(index)}
          />
        ))}
      </div>
    </section>
  );
}
