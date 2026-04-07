import Link from "next/link";

const btnOutline =
  "border border-vw-dark text-vw-dark font-medium px-6 py-2.5 rounded-lg hover:bg-vw-dark hover:text-white transition-all duration-200 text-sm inline-flex items-center justify-center";

const travellingNowData = [
  { img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80", count: 17, dest: "Himachal Pradesh" },
  { img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", count: 16, dest: "Europe" },
  { img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", count: 16, dest: "Kerala" },
  { img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80", count: 14, dest: "Japan China Korea" },
];

const TravellingNow = () => (
  <section className="py-10 bg-white">
    <div className="max-w-[1440px] mx-auto px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left */}
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-vw-dark mb-2">
            Guests are travelling right now with Veena World
          </h2>

          <p className="text-sm text-vw-text-light mb-4">
            From Europe to Japan, our groups are exploring the world today – guided, cared for, and fully managed.
          </p>

          <Link
            href="/india/all"
            className={`${btnOutline} text-xs py-2 px-6`}
          >
            Explore Upcoming Tours
          </Link>
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-2 gap-3">
          {travellingNowData.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden h-[180px] group cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.dest}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-vw-green animate-pulse"></span>

                <span className="bg-vw-green text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.count} TOURS
                </span>

                <span className="text-white text-[10px]">
                  in <span className="font-semibold underline">{item.dest}</span> right now
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review */}
      <div className="flex items-center gap-4 mt-6 p-4 bg-vw-light-bg rounded-xl">
        <div className="w-10 h-10 rounded-full bg-vw-green text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          S
        </div>

        <div>
          <p className="text-sm text-vw-text italic">
            "Awesome experience, well managed tour!"
          </p>

          <p className="text-xs text-vw-text-light mt-0.5">
            – Subodh Janardan N. ·{" "}
            <span className="font-semibold">Shimla Manali</span>
          </p>
        </div>
      </div>

    </div>
  </section>
);

export default TravellingNow;