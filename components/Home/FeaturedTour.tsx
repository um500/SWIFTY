import Link from "next/link";
import { Star } from "lucide-react";

const FeaturedTour = () => (
  <section className="max-w-[1440px] mx-auto px-4 pb-8">
    <Link
      href="/tour/highlights-of-kerala"
      className="block relative rounded-xl overflow-hidden h-[350px] group"
    >
      <img
        src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=80"
        alt="Featured Tour"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-1 bg-vw-yellow rounded px-2 py-1">
          <Star className="w-3 h-3 fill-vw-dark text-vw-dark" />
          <span className="text-xs font-bold text-vw-dark">
            9L+ Happy Travellers
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 max-w-lg">
        <p className="text-white/80 text-sm mb-1">
          Cochin | Alleppey | +2 more cities
        </p>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-vw-yellow">
          Highlights of Kerala
        </h2>

        <div className="mt-4 bg-black/40 backdrop-blur-sm rounded-lg px-5 py-4 inline-block">
          <p className="text-white/70 text-xs">Starts from</p>

          <p className="text-3xl font-display font-bold text-white">
            ₹34,000
          </p>

          <p className="text-white/60 text-xs">
            / per person on twin sharing
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
            <span>Flight</span>
            <span>•</span>
            <span>Hotel</span>
            <span>•</span>
            <span>Meals</span>
            <span>•</span>
            <span>Sightseeing</span>
            <span>•</span>
            <span>Transport</span>
          </div>
        </div>
      </div>
    </Link>
  </section>
);

export default FeaturedTour;