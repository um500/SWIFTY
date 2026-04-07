import Link from "next/link";

const KashmirPromo = () => (
  <section className="max-w-[1440px] mx-auto px-4 py-8">
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Main Card */}
      <Link
        href="/tour/best-of-kashmir"
        className="relative rounded-xl overflow-hidden h-[350px] group block"
      >
        <img
          src="https://images.unsplash.com/photo-1597074866923-dc0589150bf6?w=800&q=80"
          alt="Kashmir"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-6 left-6">
          <p className="text-white/70 text-xs">Veena World</p>

          <h3 className="text-3xl font-display font-extrabold text-white">
            Kashmir
          </h3>

          <p className="text-white/80 text-sm mt-1">
            Have you been there yet?
          </p>

          <p className="text-xs text-white/60 mt-2">
            Best of Kashmir (6 Days)
          </p>

          <p className="text-sm text-white mt-1">
            Price From{" "}
            <span className="text-vw-yellow font-bold">
              ₹53K to 120K
            </span>
          </p>

          <div className="mt-3 bg-vw-orange text-white text-xs font-bold px-4 py-2 rounded inline-block">
            Ex-Pune Departures Available · Book Now
          </div>
        </div>
      </Link>

      {/* Right Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="font-display font-bold text-lg text-vw-dark">
              Most Loved by Our Guests
            </h3>
            <p className="text-xs text-vw-text-light">
              1,24,012 guest's have travelled so far.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Best of Kashmir", price: "₹53,000", guests: "17.2k", img: "https://images.unsplash.com/photo-1597074866923-dc0589150bf6?w=400&q=80" },
            { title: "Highlights of Kerala", price: "₹35,000", guests: "10.3k", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80" },
            { title: "Best of Andaman", price: "₹75,000", guests: "8k", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
            { title: "Shimla Manali", price: "₹53,000", guests: "9k", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80" },
          ].map((item, i) => (
            <Link
              key={i}
              href="/india/all"
              className="relative rounded-xl overflow-hidden h-[130px] group block"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

              <div className="absolute top-2 left-2">
                <span className="text-[10px] text-white/80">
                  From{" "}
                  <span className="font-bold text-white">
                    {item.price}
                  </span>
                </span>
              </div>

              <div className="absolute bottom-2 left-2">
                <p className="text-xs font-bold text-white">
                  {item.title}
                </p>
              </div>

              <p className="absolute bottom-2 right-2 text-[9px] text-white/70">
                {item.guests} guests
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default KashmirPromo;