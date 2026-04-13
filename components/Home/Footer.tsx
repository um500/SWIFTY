"use client";

import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white">

      {/* MAIN SECTION */}
      <div className="max-w-[1440px] mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* BRAND FIRST */}
          <div className="md:col-span-2">

            <h2 className="text-xl font-bold mb-3">
              Swasti Tours & Travels
            </h2>

            <p className="text-sm text-white/60 mb-5 max-w-md">
              Explore the world with comfort, safety, and unforgettable experiences.
              We plan everything — you just enjoy the journey.
            </p>

            {/* SUBSCRIBE */}
            <div>
              <p className="text-xs text-white/60 mb-2">
                Subscribe for updates
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-xs outline-none focus:border-orange-400"
                />
                <button className="bg-orange-400 text-black px-4 py-2 rounded text-xs font-semibold hover:bg-orange-300 transition">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* LINKS */}
          {[
            {
              title: "Company",
              items: ["About Us", "Careers", "Team", "Partners"],
            },
            {
              title: "Support",
              items: ["Contact", "FAQ", "Booking", "Feedback"],
            },
            {
              title: "Resources",
              items: ["Blog", "Guides", "Videos", "Tips"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-3">{section.title}</h4>

              {section.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-xs text-white/60 hover:text-orange-400 py-1.5 transition"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}

        </div>

      </div>

      {/* CONTACT SECTION (NOW BELOW ✅) */}
      <div className="border-t border-white/10 py-10">
        <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {[
            {
              title: "Our Offices",
              desc: "Find our offices across India and plan your journey.",
              link: "Locate Us",
            },
            {
              title: "Call Us",
              desc: "Talk to our travel experts anytime.",
              link: "1800 123 5555",
            },
            {
              title: "Email Us",
              desc: "We’re here to help you 24/7.",
              link: "info@swastitravels.com",
            },
            {
              title: "Connect",
              desc: "Follow us on social platforms",
              social: true,
            },
          ].map((item, i) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <h4 className="text-sm font-semibold mb-2 group-hover:text-orange-400 transition">
                {item.title}
              </h4>

              <p className="text-xs text-white/60 mb-2">{item.desc}</p>

              {item.social ? (
                <div className="flex gap-3 mt-2">
                  {[Facebook, Youtube, Linkedin, Instagram].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                      hover:bg-orange-400 hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer"
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>
              ) : (
                <a href="#" className="text-xs text-orange-400 hover:underline">
                  {item.link}
                </a>
              )}
            </motion.div>

          ))}

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()}
        <span className="text-white font-medium"> Swasti Tours & Travels</span>.
        All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;