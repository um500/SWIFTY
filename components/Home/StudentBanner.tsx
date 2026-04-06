import Link from "next/link";

const StudentBanner = () => (
  <div className="text-center py-4 bg-vw-light-bg border-b border-vw-border mt-4">
    
    <p className="text-sm text-vw-text">
      Exams are over! Enjoy our Student Benefit with{" "}
      <span className="font-semibold text-vw-orange">
        5% off (World)
      </span>{" "}
      -{" "}
      <span className="font-semibold text-vw-orange">
        10% off (India)
      </span>
    </p>

    <Link
      href="/india/all"
      className="vw-btn-outline mt-3 inline-flex text-xs py-2 px-6"
    >
      View all Tours
    </Link>

  </div>
);

export default StudentBanner;