import Image from "next/image";
import Link from "next/link";

const btnYellow =
  "bg-vw-yellow text-vw-dark font-semibold px-6 py-2.5 rounded-lg hover:bg-vw-yellow-hover transition-all duration-200 text-sm inline-flex items-center justify-center";

const EuropePromo = () => (
  <section className="max-w-[1440px] mx-auto px-4 py-8">
    
    <div className="relative rounded-xl overflow-hidden h-[380px]">

      {/* Image */}
      <Image
        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1400&q=80"
        alt="Europe Tour"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute top-8 left-8 max-w-lg">

        <p className="text-white/70 text-sm border-l-2 border-vw-yellow pl-2">
          Europe
        </p>

        <h2 className="text-2xl md:text-4xl font-display font-extrabold text-white mt-2">
          London Paris Swiss Italy With Disneyland
        </h2>

        <p className="text-white/70 text-sm mt-3">
          London · Paris · Versailles · Lucerne · Engelberg · Pisa · Florence · Milan
        </p>

        <p className="text-white text-sm mt-4 font-semibold">
          9 Days | 07 May | from Ex-Mumbai{" "}
          <span className="text-vw-yellow">₹3,05,000</span>
        </p>

        <p className="text-sm text-vw-yellow mt-1">
          Joining Leaving price from{" "}
          <span className="font-bold">₹2,25,000</span>
        </p>

        <p className="text-xs text-white/50 mt-1">
          Book your own flight tickets and join the tour directly at the first destination.
        </p>

        {/* CTA */}
        <Link
          href="/tour/europe-special"
          className={`${btnYellow} mt-4 text-sm py-2.5 px-8`}
        >
          Book now
        </Link>

        <p className="text-[10px] text-white/40 mt-1">
          *T&C Apply
        </p>

      </div>

    </div>

  </section>
);

export default EuropePromo;