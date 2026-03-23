import "./globals.css";
import TopHeader from "@/components/Navbar/TopHeader";
import MainNavbar from "@/components/Navbar/MainNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopHeader />
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}