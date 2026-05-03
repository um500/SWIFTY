"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: <MapPin size={22} />,
    label: "Our Office",
    value: "Kolkata, West Bengal, India",
    sub: "Mon – Sat: 9 AM – 7 PM",
    color: "#f59e0b",
    bg: "#fef9ee",
    href: "https://maps.google.com/?q=Kolkata,WestBengal",
  },
  {
    icon: <Phone size={22} />,
    label: "Call Us",
    value: "+91 89694 57707",
    sub: "Available 7 days a week",
    color: "#3b82f6",
    bg: "#eff6ff",
    href: "tel:+918969457707",
  },
  {
    icon: <MessageCircle size={22} />,
    label: "WhatsApp",
    value: "+91 89694 57707",
    sub: "Chat with us instantly",
    color: "#22c55e",
    bg: "#f0fdf4",
    href: "https://wa.me/918969457707",
  },
  {
    icon: <Mail size={22} />,
    label: "Email Us",
    value: "swastiyatra1@gmail.com",
    sub: "Reply within 24 hours",
    color: "#ec4899",
    bg: "#fdf2f8",
    href: "mailto:swastiyatra1@gmail.com",
  },
];

const PAYMENT_METHODS = [
  { symbol: "VISA",        bg: "#1a1f71", text: "#fff",    style: { fontStyle: "italic" as const, fontWeight: 900, fontSize: 18, letterSpacing: -1 } },
  { symbol: "UPI",         bg: "#5f259f", text: "#fff",    style: { fontWeight: 800, fontSize: 13, letterSpacing: 2 } },
  { symbol: "Paytm",       bg: "#00baf2", text: "#fff",    style: { fontWeight: 800, fontSize: 13 } },
  { symbol: "RuPay",       bg: "#006400", text: "#fff",    style: { fontWeight: 800, fontSize: 12 } },
  { symbol: "NET",         bg: "#0f172a", text: "#f59e0b", style: { fontWeight: 800, fontSize: 12, letterSpacing: 2 } },
  { symbol: "Credit card", bg: "#f59e0b", text: "#0f172a", style: { fontWeight: 900, fontSize: 14, letterSpacing: 1 } },
];

const TRUST = [
  { icon: "🔒", text: "256-bit SSL" },
  { icon: "✅", text: "100% Secure" },
  { icon: "🛡️", text: "PCI Compliant" },
  { icon: "↩️", text: "Easy Refunds" },
];

// ─── Floating Label Input ────────────────────────────────────────────────────
function FancyInput({
  label,
  type = "text",
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  const sharedClass = `w-full bg-white border-2 rounded-xl px-4 text-gray-800 text-sm transition-all duration-200 resize-none outline-none ${
    focused ? "border-yellow-400 shadow-[0_0_0_3px_rgba(245,158,11,0.12)]" : "border-gray-200"
  } ${textarea ? "pt-6 pb-3 min-h-[130px]" : "pt-5 pb-3"}`;

  return (
    <div className="relative">
      <label
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          raised
            ? "top-1.5 text-[10px] font-bold uppercase tracking-wide text-yellow-500"
            : "top-4 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          required
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
        />
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cardsRef = useRef(null);
  const formRef  = useRef(null);
  const payRef   = useRef(null);

  const cardsVis = useInView(cardsRef, { once: true, margin: "-80px" });
  const formVis  = useInView(formRef,  { once: true, margin: "-80px" });
  const payVis   = useInView(payRef,   { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.query) {
      alert("Please fill all fields ❗");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.query,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", query: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to send ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cf-root { font-family: 'DM Sans', sans-serif; }
        .cf-disp { font-family: 'Playfair Display', serif; }
        @keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,35px)} }
        .orb1 { animation: orb1 9s ease-in-out infinite; }
        .orb2 { animation: orb2 11s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        .pdot { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      <div className="cf-root bg-[#f8f7f4] min-h-screen">
        {/* ══════════ HERO ══════════ */}
        <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
          <div className="orb1 absolute top-10 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="orb2 absolute bottom-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
              <Link href="/" className="hover:text-yellow-400">Home</Link>
              <span>/</span>
              <span className="text-yellow-400">Contact</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="pdot w-2 h-2 bg-green-400 rounded-full inline-block" />
              <span className="text-xs text-white font-semibold">We're Online — Ready to Help</span>
            </div>

            <h1 className="cf-disp text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Let's Plan Your<br />
              <span className="text-yellow-400">Dream Journey</span>
            </h1>

            <p className="text-white/70 max-w-2xl mx-auto text-base">
              Our travel experts are a message away. Reach out via call, WhatsApp, or the form below — we'll craft the perfect itinerary for you.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8f7f4]" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />
        </div>

        {/* ══════════ CONTACT CARDS ══════════ */}
        <div ref={cardsRef} className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_CARDS.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={cardsVis ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow no-underline block"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: c.bg, color: c.color }}
                >
                  {c.icon}
                </div>
                <div className="w-10 h-1 rounded-full mb-3" style={{ backgroundColor: c.color }} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{c.label}</p>
                <p className="text-base font-bold text-gray-900 mb-1">{c.value}</p>
                <p className="text-xs text-gray-500 mb-4">{c.sub}</p>
                <p className="text-xs font-bold" style={{ color: c.color }}>Connect →</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ══════════ FORM + MAP ══════════ */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <p className="text-[11px] font-black text-yellow-500 tracking-widest uppercase mb-2">Send a Message</p>
              <h2 className="cf-disp text-3xl font-black text-gray-900 mb-3 leading-tight">
                We'd Love to<br />Hear From You
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Fill the form and our team will reply within 24 hours with a personalised travel plan.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-green-500" size={36} />
                  </div>
                  <h3 className="cf-disp text-2xl font-black text-gray-900 mb-2">Message Sent! ✈️</h3>
                  <p className="text-gray-500 text-sm">Our team will reach out shortly. Get ready for an amazing trip!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FancyInput label="Your Name"   value={form.name}  onChange={(v) => setForm({ ...form, name: v })} />
                  <FancyInput label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <FancyInput label="Your Message" value={form.query} onChange={(v) => setForm({ ...form, query: v })} textarea />

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    🔒 Your data is safe. We never share your information.
                  </p>
                </form>
              )}
            </motion.div>

            {/* MAP + QUICK + HOURS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-64">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29470.5!2d88.36!3d22.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzEyLjAiTiA4OMKwMjEnMzYuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: "tel:+918969457707", bg: "bg-blue-50 hover:bg-blue-100 border-blue-100", iconBg: "bg-blue-500",
                    sub: "Call Now", val: "+91 89694 57707", hoverText: "group-hover:text-blue-600",
                    icon: <Phone size={15} className="text-white" /> },
                  { href: "https://wa.me/918969457707", bg: "bg-green-50 hover:bg-green-100 border-green-100", iconBg: "bg-green-500",
                    sub: "WhatsApp", val: "Chat Instantly", hoverText: "group-hover:text-green-600",
                    icon: <MessageCircle size={15} className="text-white" /> },
                ].map((b, i) => (
                  <motion.a
                    key={i}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`flex items-center gap-3 ${b.bg} border rounded-xl px-4 py-3.5 transition-all group no-underline`}
                  >
                    <div className={`w-9 h-9 ${b.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>{b.icon}</div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{b.sub}</p>
                      <p className={`text-sm font-bold text-gray-800 ${b.hoverText} transition-colors`}>{b.val}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className="pdot w-2 h-2 bg-green-400 rounded-full inline-block" />
                  <span className="text-[10px] font-black text-green-400 tracking-widest uppercase">Office Hours</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    ["Monday – Friday", "9:00 AM – 7:00 PM"],
                    ["Saturday",        "9:00 AM – 5:00 PM"],
                    ["Sunday",          "9:00 AM – 5:00 PM"],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-sm text-white/60">{day}</span>
                      <span className="text-sm font-bold text-yellow-400">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════ PAYMENT ══════════ */}
        <div className="bg-white py-16">
          <div ref={payRef} className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={payVis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <p className="text-[11px] font-black text-yellow-500 tracking-widest uppercase mb-2">Secure Payments</p>
              <h2 className="cf-disp text-4xl font-black text-gray-900 mb-3">
                We Accept All<br />Major Payment Methods
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Book with confidence — all transactions are encrypted and 100% secure.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {PAYMENT_METHODS.map((pm, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={payVis ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, rotate: -2, boxShadow: "0 12px 30px rgba(0,0,0,0.16)" }}
                  className="w-[96px] h-[60px] rounded-xl flex items-center justify-center shadow-md cursor-default select-none"
                  style={{ backgroundColor: pm.bg }}
                >
                  <span style={{ color: pm.text, ...pm.style }}>{pm.symbol}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {TRUST.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={payVis ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <span className="text-lg">{b.icon}</span>
                  <span className="font-semibold">{b.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM CTA ══════════ */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-14 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="cf-disp text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-gray-800/65 mb-7 text-sm">
              Join 10,000+ happy travellers who chose Swasti Tours for their dream holidays.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/tours"
                  className="bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-black hover:shadow-xl transition-shadow inline-block no-underline"
                >
                  Browse Tours →
                </Link>
              </motion.div>
              <motion.a
                href="https://wa.me/918969457707"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-black hover:shadow-xl transition-shadow inline-block no-underline"
              >
                💬 WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
