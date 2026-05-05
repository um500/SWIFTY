import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Home/Footer";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

// ✅ FONT
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ METADATA — WhatsApp, Google, Browser tab sab yahan se aata hai
export const metadata: Metadata = {
  title: "Swati Tours and Travels",
  description:
    "Book your dream tour with Swati Tours and Travels. Best travel packages across India at affordable prices.",
  keywords: ["tours", "travels", "travel packages", "India tours", "Swati Tours"],
  authors: [{ name: "Swati Tours and Travels" }],
  creator: "Swati Tours and Travels",
  publisher: "Swati Tours and Travels",

  // ✅ Open Graph — WhatsApp / Facebook preview
  openGraph: {
    title: "Swati Tours and Travels",
    description:
      "Book your dream tour with Swati Tours and Travels. Best travel packages across India at affordable prices.",
    url: "https://swifty-nu.vercel.app", // 🔁 Apna domain daalo
    siteName: "Swati Tours and Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 🔁 /public/og-image.jpg rakho (1200x630 px recommended)
        width: 1200,
        height: 630,
        alt: "Swati Tours and Travels",
      },
    ],
  },

  // ✅ Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "Swati Tours and Travels",
    description:
      "Book your dream tour with Swati Tours and Travels. Best travel packages across India.",
    images: ["/og-image.jpg"],
  },

  // ✅ Browser tab favicon
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}