"use client";

import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "✈️",
      title: "All Inclusive",
      desc: "Flight, Hotel, Meals & Sightseeing included",
    },
    {
      icon: "👨‍✈️",
      title: "Tour Manager",
      desc: "Experienced tour managers on every trip",
    },
    {
      icon: "⭐",
      title: "9L+ Happy Guests",
      desc: "Trusted by thousands of happy travellers",
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      desc: "Comprehensive travel insurance & 24/7 support",
    },
  ];

  return (
    <>
      {/* TOP SECTION */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          >
            Explore{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-orange-500">
                All Inclusive
              </span>
              <span className="absolute left-0 bottom-0 w-full h-2 bg-orange-200/60 -z-0 rounded"></span>
            </span>{" "}
            Tour Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500 max-w-2xl mx-auto"
          >
            Discover hassle-free travel with everything included — flights, stays,
            meals, and experiences — all planned for you.
          </motion.p>

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-14 max-w-[1440px] mx-auto px-4">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10"
        >
          Why Travel with Us?
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {features.map((item, i) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                group relative overflow-hidden
                p-6 rounded-2xl bg-white border border-gray-100
                shadow-sm transition-all duration-300
                hover:-translate-y-3 hover:shadow-xl hover:border-orange-200
              "
            >

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Icon */}
              <div className="relative text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="relative font-semibold text-gray-900 text-sm md:text-base group-hover:text-orange-500 transition">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative text-xs text-gray-500 mt-2 leading-relaxed group-hover:text-gray-700 transition">
                {item.desc}
              </p>

              {/* Bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-400 group-hover:w-full transition-all duration-300" />

            </motion.div>

          ))}

        </div>

      </section>
    </>
  );
};

export default WhyChooseUs;