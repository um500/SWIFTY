const WhyChooseUs = () => (
  <>
    <section className="py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-xl font-display font-bold text-vw-dark mb-2">Veena World offers ∞ <span className="underline decoration-vw-yellow decoration-2 underline-offset-4">All Inclusive</span> tour packages</h2>
        <p className="text-sm text-vw-text-light mb-6">No matter where you are in India or around the World, Choose from a wide range of tours, conveniently departing from your city.</p>
      </div>
    </section>

    <section className="py-12 max-w-[1440px] mx-auto px-4">
      <h2 className="text-xl font-display font-bold text-vw-dark text-center mb-8">Why Travel with Us?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: "✈️", title: "All Inclusive", desc: "Flight, Hotel, Meals & Sightseeing included" },
          { icon: "👨‍✈️", title: "Tour Manager", desc: "Experienced tour managers on every trip" },
          { icon: "⭐", title: "9L+ Happy Guests", desc: "Trusted by 9 lakh+ happy travellers" },
          { icon: "🛡️", title: "Safe & Secure", desc: "Comprehensive travel insurance & support" },
        ].map((item) => (
          <div key={item.title} className="text-center p-5 rounded-xl border border-vw-border bg-white hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-display font-semibold text-sm text-vw-dark">{item.title}</h3>
            <p className="text-xs text-vw-text-light mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default WhyChooseUs;
