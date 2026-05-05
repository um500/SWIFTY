"use client";

import { useState } from "react";
import LeadModal from "@/components/tours/LeadModal";
import BookingFormModal from "@/components/tours/BookingFormModal";

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
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

        <div className="p-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Starting from
          </p>

          <p className="text-4xl font-extrabold text-gray-900 mt-1 tracking-tight">
            ₹{typeof price === "number" ? price.toLocaleString("en-IN") : "—"}
          </p>

          <p className="text-xs text-gray-400 mt-1">per person on twin sharing</p>

          {/* Tour meta */}
          <div className="mt-5 space-y-2.5 text-sm text-gray-600">
            {days && (
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-base">🗓️</span>
                <span>{days}</span>
              </div>
            )}
            {itinerary.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-base">📍</span>
                <span>{itinerary.length} destinations planned</span>
              </div>
            )}
            {inclusions.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-green-50 text-base">✅</span>
                <span>{inclusions.length} inclusions</span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 space-y-3">
            {/* Book Now */}
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600
                px-4 py-3.5 text-white font-bold text-sm
                hover:from-amber-600 hover:to-orange-700 active:scale-[0.98]
                transition-all duration-150 shadow-md shadow-amber-200 hover:shadow-amber-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </button>

            {/* Download Itinerary */}
            {pdfUrl ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-[#3b4fa8]
                  px-4 py-3 text-[#3b4fa8] font-semibold text-sm
                  hover:bg-[#eef0f8] active:scale-[0.98] transition-all duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Itinerary
              </button>
            ) : (
              <p className="text-center text-sm text-gray-400 py-2">PDF not available</p>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
            {[
              { icon: "🔒", label: "Secure Booking" },
              { icon: "💬", label: "24/7 Support" },
              { icon: "✅", label: "Best Price" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="text-lg">{icon}</div>
                <div className="leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF / Lead Modal */}
      {showModal && pdfUrl && (
        <LeadModal
          tourName={title}
          pdfUrl={pdfUrl}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Booking Form Modal — passing ALL details */}
      {showBookingForm && (
        <BookingFormModal
          tourName={title}
          price={price}
          days={days}
          pdfUrl={pdfUrl}
          inclusions={inclusions}
          exclusions={exclusions}
          itineraryCount={itinerary.length}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
}