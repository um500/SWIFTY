import Link from "next/link";

const StudentBanner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 bg-vw-light-bg border-b border-vw-border">

      <p className="text-sm text-vw-text text-center">
        Discover handpicked travel experiences across India and the world — plan your perfect journey today.
      </p>

      <Link
        href="/india/all"
        className="mt-4 inline-flex items-center justify-center px-7 py-2.5 text-sm font-medium rounded-lg border border-[#1e3a8a] text-[#1e3a8a] bg-white transition-all duration-200 hover:bg-[#1e3a8a] hover:text-white hover:shadow-md"
      >
        View all Tours →
      </Link>

    </div>
  );
};

export default StudentBanner;