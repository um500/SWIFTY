import Link from "next/link";

const StudentBanner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4 bg-gray-100 border-b border-gray-200">

      {/* TEXT */}
      <p className="text-sm md:text-base text-gray-700 text-center max-w-2xl">
        Discover handpicked travel experiences across India and the world — plan your perfect journey today.
      </p>

      {/* BUTTON */}
      <Link
        href="/india/all"
        className="mt-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg border border-blue-900 text-blue-900 bg-white transition-all duration-200 hover:bg-blue-900 hover:text-white hover:shadow-lg"
      >
        View all Tours →
      </Link>

    </div>
  );
};

export default StudentBanner;