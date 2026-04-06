import Link from "next/link";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="vw-footer">
    
    {/* Top Section */}
    <div className="border-b border-white/10 py-8">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div>
          <h4 className="font-display font-semibold text-sm mb-2 flex items-center gap-2">🏢 Our Offices</h4>
          <p className="text-xs text-white/60">Located across the country, ready to plan your dream vacation today!</p>
          <a href="#" className="text-xs text-vw-yellow mt-1 inline-block hover:underline">Locate Us</a>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-2 flex items-center gap-2">📞 Call us</h4>
          <p className="text-xs text-white/60">Request a quote or chat – we're here to help anytime!</p>
          <a href="tel:18001235555" className="text-xs text-vw-yellow mt-1 inline-block hover:underline">1800 123 5555</a>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-2 flex items-center gap-2">✉️ Write to us</h4>
          <p className="text-xs text-white/60">We're always happy to help!</p>
          <a href="mailto:info@veenaworld.com" className="text-xs text-vw-yellow mt-1 inline-block hover:underline">info@veenaworld.com</a>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-2 flex items-center gap-2">🔗 Connect with us</h4>
          <div className="flex gap-2 mt-2">
            {[Facebook, Youtube, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-vw-yellow hover:text-vw-dark transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>

    {/* Middle Section */}
    <div className="max-w-[1440px] mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 mb-4">
            <svg width="28" height="28" viewBox="0 0 40 40">
              <path d="M8 8L20 32L32 8" fill="none" stroke="hsl(var(--vw-yellow))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display font-bold text-sm">VEENA WORLD</span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            Travel. Explore. Celebrate Life.
          </p>

          <div className="mt-4">
            <p className="text-xs text-white/60 mb-2">Keep travelling all year round!</p>
            <input
              type="email"
              placeholder="Email ID"
              className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/40 outline-none focus:border-vw-yellow"
            />
            <button className="vw-btn-yellow mt-2 text-xs py-2 w-full">
              Subscribe
            </button>
          </div>
        </div>

        {/* Discover */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Discover us</h4>
          {["Guest Reviews", "About Us", "Our Team", "Tour Managers", "Sales Partners", "Careers"].map((l) => (
            <Link key={l} href="#" className="block text-xs text-white/60 hover:text-vw-yellow py-1.5 transition-colors">
              {l}
            </Link>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Support</h4>
          {["Contact Us", "How To Book", "FAQ", "Travel Deals", "Leave Feedback"].map((l) => (
            <Link key={l} href="#" className="block text-xs text-white/60 hover:text-vw-yellow py-1.5 transition-colors">
              {l}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Resources</h4>
          {["Tour Status", "Blog", "Podcasts", "Video Blogs", "Travel Planners"].map((l) => (
            <Link key={l} href="#" className="block text-xs text-white/60 hover:text-vw-yellow py-1.5 transition-colors">
              {l}
            </Link>
          ))}
        </div>

        {/* Popular Tours */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Popular Tours</h4>
          {["Kerala Tours", "Rajasthan Tours", "Kashmir Tours", "Goa Tours", "Europe Tours"].map((l) => (
            <Link key={l} href="#" className="block text-xs text-white/60 hover:text-vw-yellow py-1.5 transition-colors">
              {l}
            </Link>
          ))}
        </div>

      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
      © 2026 Veena World. All rights reserved.
    </div>

  </footer>
);

export default Footer;