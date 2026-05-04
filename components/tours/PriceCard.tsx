// components/tours/PriceCard.tsx
"use client";

import { useState } from "react";
import LeadModal from "@/components/tours/LeadModal";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  stay: string;
  meals: string[];
}

interface Props {
  price?: number;
  title: string;
  days?: string;
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  pdfUrl?: string | null;
}

export default function PriceCard({
  price,
  title,
  days,
  itinerary = [],
  inclusions = [],
  exclusions = [],
  pdfUrl,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600" />
        <div className="p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Starting from</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ₹{typeof price === "number" ? price.toLocaleString("en-IN") : "—"}
          </p>
          <p className="text-xs text-gray-500 mt-1">per person on twin sharing</p>

          <div className="mt-6 space-y-2 text-sm text-gray-700">
            {days && <p>🗓️ {days}</p>}
            {itinerary.length > 0 && <p>📍 {itinerary.length} destinations planned</p>}
            {inclusions.length > 0 && <p>✅ {inclusions.length} inclusions</p>}
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full rounded-lg bg-amber-600 px-4 py-3 text-white font-semibold hover:bg-amber-700 transition">
              Book Online
            </button>

            {pdfUrl ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#3b4fa8] px-4 py-3 text-[#3b4fa8] font-semibold hover:bg-[#eef0f8] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Itinerary
              </button>
            ) : (
              <p className="text-center text-sm text-gray-400 py-2">
                PDF not available
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
            {[
              { icon: "🔒", label: "Secure Booking" },
              { icon: "💬", label: "24/7 Support" },
              { icon: "✅", label: "Best Price" },
            ].map(({ icon, label }) => (
              <div key={label}>
                <div>{icon}</div>
                <div>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && pdfUrl && (
        <LeadModal
          tourName={title}
          pdfUrl={pdfUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}