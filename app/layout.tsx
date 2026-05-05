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

// ✅ METADATA (FULL FIXED)
export const metadata: Metadata = {
  title: "Swasti Tours and Travels",
  description:
    "Book your dream tour with Swasti Tours and Travels. Best travel packages across India at affordable prices.",
  keywords: [
    "tours",
    "travels",
    "travel packages",
    "India tours",
    "Swasti Tours",
  ],
  authors: [{ name: "Swasti Tours and Travels" }],
  creator: "Swasti Tours and Travels",
  publisher: "Swasti Tours and Travels",

  // ✅ Open Graph (WhatsApp / Facebook)
  openGraph: {
    title: "Swasti Tours and Travels",
    description:
      "Book your dream tour with Swasti Tours and Travels. Best travel packages across India at affordable prices.",
    url: "https://swifty-nu.vercel.app",
    siteName: "Swasti Tours and Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swasti Tours and Travels",
      },
    ],
  },

  // ✅ Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Swasti Tours and Travels",
    description:
      "Book your dream tour with Swasti Tours and Travels. Best travel packages across India.",
    images: ["/og-image.jpg"],
  },

  // ✅ FAVICON (IMPORTANT FIX)
  icons: {
  icon: "/logo-2.png",
  shortcut: "/logo-2.png",
  apple: "/logo-2.png",
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