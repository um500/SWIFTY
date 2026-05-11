"use client";

// ============================================
// 📁 components/tours/TourDetails.tsx
// Flight / Accommodation / Reporting & Dropping
// Fully responsive: cards on mobile, table on desktop
// ============================================

import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type TabKey = "flight" | "accommodation" | "reporting";
type RichValue = string | PortableTextBlock[] | null | undefined;

interface FlightDetail {
  from: RichValue;
  to: RichValue;
  airline?: RichValue;
  departure?: RichValue;
  arrival?: RichValue;
  flightNo?: RichValue;
}

interface AccommodationDetail {
  city: RichValue;
  country: RichValue;
  hotel: RichValue;
  checkIn: RichValue;
  checkOut: RichValue;
}

interface ReportingDetail {
  guestType: RichValue;
  reportingPoint: RichValue;
  droppingPoint: RichValue;
}

interface TourDetailsProps {
  flights?: FlightDetail[];
  accommodations?: AccommodationDetail[];
  reporting?: ReportingDetail;
}

const TABS: { key: TabKey; label: string; short: string }[] = [
  { key: "flight",        label: "Flight Details",        short: "Flights"       },
  { key: "accommodation", label: "Accommodation Details", short: "Hotels"        },
  { key: "reporting",     label: "Reporting & Dropping",  short: "Reporting"     },
];

function toPlainText(value: RichValue, fallback = ""): string {
  if (value == null || value === "") return fallback;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const text = value
      .map((b: any) =>
        b?._type === "block" && Array.isArray(b.children)
          ? b.children.map((c: any) => c?.text ?? "").join("")
          : ""
      )
      .join(" ")
      .trim();
    return text || fallback;
  }
  return fallback;
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm text-gray-800 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-800">{children}</ol>
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

function RichField({ value }: { value: RichValue }) {
  if (value == null || value === "") return null;
  if (typeof value === "string") return <span>{value}</span>;
  if (Array.isArray(value)) return <PortableText value={value} components={ptComponents} />;
  return null;
}

// ── Empty state ──
function Empty({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center p-6">
      <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-sm text-gray-400 italic">{message}</p>
    </div>
  );
}

export default function TourDetails({
  flights = [],
  accommodations = [],
  reporting,
}: TourDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("accommodation");

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-7 bg-[#3b4fa8] rounded-full" />
        <h2 className="text-2xl font-bold text-gray-800">Tour Details</h2>
      </div>
      <p className="text-sm text-gray-400 italic mb-5 ml-4">
        Best facilities with no added cost.
      </p>

      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">

        {/* Tab Strip */}
        <div className="flex">
          {TABS.map(({ key, label, short }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-3.5 px-2 text-xs sm:text-sm font-semibold text-center transition-all duration-200 border-b-2 leading-tight ${
                  isActive
                    ? "bg-[#3b4fa8] text-white border-[#3b4fa8]"
                    : "bg-[#eef0f8] text-gray-500 border-[#d8dbed] hover:bg-[#e2e5f5] hover:text-gray-700"
                }`}
              >
                {/* Short label on mobile, full label on sm+ */}
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── FLIGHT DETAILS ── */}
        {activeTab === "flight" && (
          <div className="min-h-[200px]">
            {flights.length === 0 ? (
              <Empty message="Flight details not available yet." />
            ) : (
              <>
                {/* Mobile: cards */}
                <div className="md:hidden divide-y divide-gray-100">
                  {flights.map((f, i) => {
                    const flightNo = toPlainText(f.flightNo);
                    return (
                      <div key={i} className="p-4 space-y-3">
                        {/* Route */}
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800 text-sm">
                            {toPlainText(f.from)}
                          </span>
                          <svg className="w-4 h-4 text-[#3b4fa8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          <span className="font-semibold text-gray-800 text-sm">
                            {toPlainText(f.to)}
                          </span>
                        </div>
                        {/* Airline */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-gray-400 w-24 shrink-0 text-xs">Airline</span>
                          <span className="font-medium">{toPlainText(f.airline, "TBA")}</span>
                          {flightNo && (
                            <span className="text-xs bg-[#eef0f8] text-[#3b4fa8] px-2 py-0.5 rounded-full font-medium">
                              {flightNo}
                            </span>
                          )}
                        </div>
                        {/* Times */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-xs text-gray-400 mb-0.5">Departure</p>
                            <p className="text-sm font-semibold text-gray-800">{toPlainText(f.departure, "TBA")}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-xs text-gray-400 mb-0.5">Arrival</p>
                            <p className="text-sm font-semibold text-gray-800">{toPlainText(f.arrival, "TBA")}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">From → To</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Train / Flight</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Departure</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Arrival</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {flights.map((f, i) => {
                        const flightNo = toPlainText(f.flightNo);
                        return (
                          <tr key={i} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                            <td className="px-5 py-4 font-medium text-gray-800">
                              {toPlainText(f.from)}
                              <span className="mx-1 text-[#3b4fa8]">→</span>
                              {toPlainText(f.to)}
                            </td>
                            <td className="px-5 py-4 text-gray-600">
                              {toPlainText(f.airline, "TBA")}
                              {flightNo && (
                                <span className="ml-2 text-xs bg-[#eef0f8] text-[#3b4fa8] px-2 py-0.5 rounded-full font-medium">
                                  {flightNo}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-gray-600">{toPlainText(f.departure, "TBA")}</td>
                            <td className="px-5 py-4 text-gray-600">{toPlainText(f.arrival, "TBA")}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ACCOMMODATION DETAILS ── */}
        {activeTab === "accommodation" && (
          <div className="min-h-[200px]">
            {accommodations.length === 0 ? (
              <Empty message="Accommodation details not available yet." />
            ) : (
              <>
                {/* Mobile: cards */}
                <div className="md:hidden divide-y divide-gray-100">
                  {accommodations.map((a, i) => (
                    <div key={i} className="p-4 space-y-2">
                      {/* City / Country */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#3b4fa8] flex-shrink-0" />
                        <span className="font-semibold text-gray-800 text-sm">
                          {toPlainText(a.city)}
                        </span>
                        <span className="text-xs text-gray-400">
                          — {toPlainText(a.country)}
                        </span>
                      </div>
                      {/* Hotel */}
                      <p className="text-sm text-gray-700 font-medium pl-4">
                        {toPlainText(a.hotel)}{" "}
                        <span className="text-xs text-gray-400 font-normal italic">or similar</span>
                      </p>
                      {/* Dates */}
                      <div className="flex items-center gap-2 pl-4 text-sm text-gray-600">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">
                          {toPlainText(a.checkIn)}
                          <span className="text-gray-400 mx-1">–</span>
                          {toPlainText(a.checkOut)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80">
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-[28%]">City — Country</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-[42%]">Hotel</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-[30%]">Check In — Check Out</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {accommodations.map((a, i) => (
                        <tr key={i} className={`hover:bg-[#eef0f8]/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-800">{toPlainText(a.city)}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{toPlainText(a.country)}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-gray-700 font-medium">{toPlainText(a.hotel)}</p>
                            <p className="text-xs text-gray-400 mt-0.5 italic">or similar</p>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm font-medium">
                                {toPlainText(a.checkIn)}
                                <span className="text-gray-400 mx-1">–</span>
                                {toPlainText(a.checkOut)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── REPORTING & DROPPING ── */}
        {activeTab === "reporting" && (
          <div className="min-h-[200px]">
            {!reporting ? (
              <Empty message="Reporting details not available yet." />
            ) : (
              <div className="divide-y divide-gray-100">
                {[
                  { label: "Guest Type",      value: reporting.guestType      },
                  { label: "Reporting Point", value: reporting.reportingPoint },
                  { label: "Dropping Point",  value: reporting.droppingPoint  },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-5 py-4 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide sm:w-40 sm:shrink-0 sm:pt-0.5">
                      {label}
                    </span>
                    <span className="text-sm text-gray-800 font-medium">
                      <RichField value={value} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Note */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-600 mb-1.5">Note:</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">
              Flight details are tentative only. The airline, departure, arrival times and routing may change.
            </p>
            <p className="text-xs text-gray-500">
              Hotel details are tentative only. The hotel or place of accommodation may change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}