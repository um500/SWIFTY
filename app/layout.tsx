import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Home/Footer";
import { Poppins } from "next/font/google";

// ✅ FONT
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50`}>
        
        <Navbar /> {/* ✅ data prop removed (server fetch inside Navbar) */}
        {children}

        <Footer />
      </body>
    </html>
  );
}