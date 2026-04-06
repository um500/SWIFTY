import Link from "next/link";

const FeatureCards = () => (
  <section className="py-10 bg-vw-light-bg">
    <div className="max-w-[1440px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Last Minute Departures */}
        <div className="bg-vw-dark rounded-xl overflow-hidden text-white">
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-display font-bold text-base mb-3">
              Last Minute departures, for you
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 px-5 pb-3">
            {[
              { img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80", label: "Highlights of Kerala" },
              { img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=80", label: "Women's Special Kerala" },
              { img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80", label: "Women's Special Shimla" },
              { img: "https://images.unsplash.com/photo-1597074866923-dc0589150bf6?w=300&q=80", label: "Shimla Manali" },
            ].map((item, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden h-[90px] cursor-pointer group">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute bottom-2 left-2 text-[11px] font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5">
            <Link href="/india/all" className="vw-btn-outline text-xs py-2 w-full text-center border-white/40 text-white hover:bg-white/10">
              View all 90+ Departures
            </Link>
          </div>
        </div>

        {/* Easy Visa Destinations */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl overflow-hidden text-white">
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-display font-bold text-base mb-3">
              Travel with zero visa stress
            </h3>
          </div>

          <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
            {[
              { img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80", label: "Singapore" },
              { img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=300&q=80", label: "Vietnam" },
              { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80", label: "UAE" },
            ].map((item, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden h-[120px] min-w-[120px] flex-1 cursor-pointer group">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-2 left-2 text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5 text-center">
            <p className="text-xs text-white/80 mb-3">
              Explore +80 More easy-visa destinations
            </p>

            <Link href="/india/all" className="vw-btn-outline text-xs py-2 w-full text-center border-white/40 text-white hover:bg-white/10">
              View all Destinations
            </Link>
          </div>
        </div>

        {/* Customized Holidays */}
        <div className="bg-vw-dark rounded-xl overflow-hidden text-white">
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-display font-bold text-base mb-1">
              Customized Holidays
            </h3>
            <p className="text-[11px] text-white/60">
              Starts from ₹21,000 | Book before 31st March
            </p>
          </div>

          <div className="flex gap-2 px-5 pb-3 justify-center">
            {[
              { img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&q=80", label: "Gangtok Darjeeling", price: "₹38,000" },
              { img: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=200&q=80", label: "Haridwar Rishikesh", price: "₹21,000" },
              { img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=200&q=80", label: "Shillong Cherrapunjee", price: "₹32,000" },
            ].map((item, i) => (
              <div key={i} className="text-center cursor-pointer group flex-1">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white/20 group-hover:border-vw-yellow transition-colors">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-semibold mt-2 leading-tight">{item.label}</p>
                <p className="text-[10px] text-vw-yellow">Starts {item.price}</p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-2 flex justify-center gap-4 text-[10px] text-white/60 border-t border-white/10 pt-3">
            <span>Personalised Itineraries</span>
            <span>Flexible Travel Dates</span>
            <span>Private Chauffeur</span>
          </div>

          <div className="px-5 pb-5 pt-2">
            <Link href="/india/all" className="vw-btn-outline text-xs py-2 w-full text-center border-white/40 text-white hover:bg-white/10">
              View all Holidays
            </Link>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default FeatureCards;