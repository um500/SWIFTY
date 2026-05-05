"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface Props {
  tourName: string;
  price?: number;
  days?: string;
  pdfUrl?: string | null;
  inclusions?: string[];
  exclusions?: string[];
  itineraryCount?: number;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "918969457707";

interface FormState {
  name: string;
  phone: string;
  persons: string;
  address: string;
  travelFrom: string;
  travelTo: string;
}

interface Errors {
  name?: string;
  phone?: string;
  persons?: string;
  travelFrom?: string;
  travelTo?: string;
}

export default function BookingFormModal({
  tourName,
  price,
  days,
  pdfUrl,
  inclusions = [],
  exclusions = [],
  itineraryCount = 0,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    persons: "1",
    address: "",
    travelFrom: "",
    travelTo: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => onClose(), 250);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const totalPayment =
    price && Number(form.persons) >= 1
      ? price * Number(form.persons)
      : null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!form.persons || Number(form.persons) < 1) {
      newErrors.persons = "At least 1 person required.";
    }
    if (!form.travelFrom) newErrors.travelFrom = "Select travel start date.";
    if (!form.travelTo) newErrors.travelTo = "Select return date.";
    if (form.travelFrom && form.travelTo && form.travelTo < form.travelFrom) {
      newErrors.travelTo = "End date cannot be before start date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSending, setIsSending] = useState(false);

  const shortenUrl = async (url: string): Promise<string> => {
    try {
      const res = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
      );
      if (res.ok) {
        const short = await res.text();
        if (short.startsWith("https://tinyurl.com")) return short;
      }
    } catch (_) {}
    return url; // fallback to original if fails
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSending(true);

    const total = totalPayment
      ? `₹${totalPayment.toLocaleString("en-IN")} (${form.persons} persons × ₹${price!.toLocaleString("en-IN")})`
      : "—";

    // Shorten PDF URL if present
    let pdfLine = "";
    if (pdfUrl) {
      const shortUrl = await shortenUrl(pdfUrl);
      pdfLine = ` *Itinerary PDF:* ${shortUrl}\n`;
    }

    const message =
      ` *New Tour Booking Request*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      ` *TOUR DETAILS*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      ` *Tour Name:* ${tourName}\n` +
      ` *Price per Person:* ₹${price ? price.toLocaleString("en-IN") : "—"}\n` +
    ` *Duration:* ${days || "—"}\n` +
      (itineraryCount > 0 ? ` *Destinations:* ${itineraryCount} planned\n` : "") +
      (inclusions.length > 0 ? ` *Inclusions:* ${inclusions.length} items included\n` : "") +
      (exclusions.length > 0 ? ` *Exclusions:* ${exclusions.length} items excluded\n` : "") +
      pdfLine +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      ` *TRAVEL DATES*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      ` *Travel From:* ${formatDate(form.travelFrom)}\n` +
      ` *Travel To:* ${formatDate(form.travelTo)}\n` +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      ` *TRAVELLER DETAILS*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      ` *Name:* ${form.name.trim()}\n` +
      ` *Phone:* ${form.phone.trim()}\n` +
      ` *No. of Persons:* ${form.persons}\n` +
      ` *Address:* ${form.address.trim() || "Not provided"}\n` +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      ` *PAYMENT SUMMARY*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      ` *Total Amount:* ${total}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Sent via Tour Booking Portal_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsSending(false);
    setSubmitted(true);
  };

  if (!mounted) return null;

  const today = new Date().toISOString().split("T")[0];

  const inputClass = (field: keyof Errors) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400
     bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition
     ${errors[field]
      ? "border-rose-400 focus:ring-rose-200"
      : "border-gray-200 focus:ring-amber-200 focus:border-amber-400"}`;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        animation: isAnimatingOut
          ? "fadeOut 0.25s ease forwards"
          : "fadeIn 0.25s ease forwards",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          maxHeight: "92vh",
          animation: isAnimatingOut
            ? "slideDown 0.25s ease forwards"
            : "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div className="h-1.5 w-full flex-shrink-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

        {/* Header */}
        <div className="px-7 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1">
                Booking Request
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                Book Your Tour
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 truncate">{tourName}</p>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {days && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">
                📅 {days}
              </span>
            )}
            {price && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
                💰 ₹{price.toLocaleString("en-IN")}/person
              </span>
            )}
            {inclusions.length > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">
                ✅ {inclusions.length} inclusions
              </span>
            )}
            {pdfUrl && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2.5 py-0.5">
                📄 PDF attached
              </span>
            )}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="px-7 py-5 overflow-y-auto flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Sent! </h3>
              <p className="text-gray-500 text-sm mb-6">
                Your request has been sent on WhatsApp. Our team will contact you shortly.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={inputClass("name")}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Phone + Persons */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    inputMode="numeric"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Persons <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="persons"
                    value={form.persons}
                    onChange={handleChange}
                    type="number"
                    min={1}
                    max={50}
                    className={inputClass("persons")}
                  />
                  {errors.persons && (
                    <p className="text-xs text-rose-500 mt-1">{errors.persons}</p>
                  )}
                  {/* Live total */}
                  {price && Number(form.persons) >= 1 && !errors.persons && (
                    <div className="mt-1.5 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                     
                      <p className="text-xs text-amber-700 font-medium leading-tight">
                        Total:{" "}
                        <span className="font-bold">
                          ₹{(price * Number(form.persons)).toLocaleString("en-IN")}
                        </span>
                        <span className="text-amber-500 font-normal">
                          {" "}({form.persons} × ₹{price.toLocaleString("en-IN")})
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Dates */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Travel Dates <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">From</p>
                    <input
                      name="travelFrom"
                      value={form.travelFrom}
                      onChange={handleChange}
                      type="date"
                      min={today}
                      className={inputClass("travelFrom")}
                    />
                    {errors.travelFrom && (
                      <p className="text-xs text-rose-500 mt-1">{errors.travelFrom}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">To</p>
                    <input
                      name="travelTo"
                      value={form.travelTo}
                      onChange={handleChange}
                      type="date"
                      min={form.travelFrom || today}
                      className={inputClass("travelTo")}
                    />
                    {errors.travelTo && (
                      <p className="text-xs text-rose-500 mt-1">{errors.travelTo}</p>
                    )}
                  </div>
                </div>
                {/* Date summary pill */}
                {form.travelFrom && form.travelTo && !errors.travelFrom && !errors.travelTo && (
                  <div className="mt-1.5 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                   
                    <p className="text-xs text-blue-700 font-medium">
                      {formatDate(form.travelFrom)} → {formatDate(form.travelTo)}
                    </p>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Address{" "}
                  <span className="text-gray-400 font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Complete address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400
                    bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400
                    transition resize-none"
                />
              </div>

              {/* Booking Summary Card — shows when enough data filled */}
              {totalPayment && form.travelFrom && form.travelTo && !errors.travelFrom && !errors.travelTo && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-2.5 text-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                     Booking Summary
                  </p>
                  <div className="flex justify-between text-gray-600">
                    <span>Tour</span>
                    <span className="font-medium text-gray-900 text-right max-w-[55%] truncate">{tourName}</span>
                  </div>
                  {days && (
                    <div className="flex justify-between text-gray-600">
                      <span>Duration</span>
                      <span className="font-medium text-gray-900">{days}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Travel From</span>
                    <span className="font-medium text-gray-900">{formatDate(form.travelFrom)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Travel To</span>
                    <span className="font-medium text-gray-900">{formatDate(form.travelTo)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Persons</span>
                    <span className="font-medium text-gray-900">{form.persons}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Price/Person</span>
                    <span className="font-medium text-gray-900">₹{price!.toLocaleString("en-IN")}</span>
                  </div>
                  {pdfUrl && (
                    <div className="flex justify-between text-gray-600">
                      <span>PDF Itinerary</span>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 font-medium underline underline-offset-2 hover:text-purple-800"
                      >
                        View PDF ↗
                      </a>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2.5 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total Payment</span>
                    <span className="font-extrabold text-xl text-amber-600">
                      ₹{totalPayment.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <>
            <div className="px-7 pt-3 pb-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={handleSubmit}
                disabled={isSending}
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] active:bg-[#17a552]
                  text-white font-bold py-3.5 px-5 rounded-2xl transition-all duration-150 shadow-lg shadow-green-200
                  hover:shadow-green-300 hover:scale-[1.02] active:scale-[0.98] text-sm
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isSending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Shortening PDF link...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Submit & WhatsApp
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="sm:w-32 flex items-center justify-center py-3.5 px-5 rounded-2xl border-2 border-gray-200
                  text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all text-sm"
              >
                Cancel
              </button>
            </div>
        
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes slideDown { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(30px) scale(0.96) } }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}