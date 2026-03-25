"use client";

import { Search, Phone } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-[#0b1d2a] text-white">
      
      {/* CENTER CONTAINER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        
        {/* LEFT LOGO */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="w-6 h-6 bg-yellow-400 rounded-sm"></div>
          Swasti Tours and Travels
        </div>

        {/* CENTER SEARCH */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-[450px]">
          <Search size={16} className="text-gray-500" /> {/* ✅ icon add */}
          
          <input
            type="text"  
            className="ml-2 outline-none text-black w-full text-sm"
            placeholder='Search "Europe"'
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* CALL */}
          <div className="flex items-center gap-2 bg-[#123447] px-4 py-2 rounded-full">
            <Phone size={16} />
            <span className="text-sm">1800 313 5555</span>
          </div>

          {/* COUNTRY */}
          <div className="bg-white text-black px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
            🇮🇳 India
          </div>

        </div>
      </div>
    </div>
  );
}