"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Phone, Menu, X, ChevronDown, User } from "lucide-react";
import SpecialToursDropdown from "./SpecialToursDropdown";
import CustomizedDropdown from "./CustomizedDropdown";

export default function NavbarUI({
  indiaStates,
  worldCountries,
  statesByCountry,
  areasByState,
  customCategories,
  specialTours,
}: any) {

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<any>({});
  const [indiaState, setIndiaState] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);

  const toggle = (key: string) => {
    setOpenMenu((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white font-serif">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button className="xl:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm"></div>
            <span className="hidden sm:block">Swasti Tours</span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden xl:flex items-center bg-white rounded-full px-4 py-2 w-[450px]">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder='Search "Europe"'
            className="ml-2 w-full text-black outline-none text-sm"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <div className="hidden xl:flex items-center gap-2 bg-[#123447] px-4 py-2 rounded-full">
            <Phone size={14} />
            <span className="text-sm">+91 8969457707</span>
          </div>

          <div className="bg-white text-black px-3 py-1 rounded">
            🇮🇳 India
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="xl:hidden px-4 pb-3">
        <div className="flex items-center bg-white rounded-full px-4 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder='Search "Europe"'
            className="ml-2 w-full text-black outline-none text-sm"
          />
        </div>
      </div>

      {/* 👇 YE LINE ADD KARO */}
      <div className="border-t border-white/10"></div>

      {/* ================= NAVBAR DESKTOP ================= */}
      <div className="hidden xl:flex items-center justify-center flex-nowrap gap-8 px-6 py-1 bg-gradient-to-r from-[#0f172a] to-[#1e293b] font-medium relative whitespace-nowrap">

        {/* ================= INDIA ================= */}
        <div
          className="relative group"
          onMouseEnter={() => {
            setActiveMenu("india");
            setSelectedState(null);
          }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="cursor-pointer hover:text-yellow-300 py-2">
            India <ChevronDown size={14} className="inline ml-1" />
          </div>

          {/* HOVER BRIDGE (IMPORTANT) */}
          {activeMenu === "india" && (
            <>
              <div className="absolute left-0 top-full h-3 w-full"></div>

              <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded z-50">

                {/* STATES */}
                <div className="w-[250px] border-r bg-gray-50">
                  {indiaStates.map((s: any) => (
                    <div
                      key={s._id}
                      onMouseEnter={() => setSelectedState(s)}
                      className="px-5 py-3 hover:bg-white cursor-pointer flex justify-between"
                    >
                      {s.name} <span>›</span>
                    </div>
                  ))}
                </div>

                {/* AREAS */}
                {selectedState && (
                  <div className="w-[300px] bg-white">
                    <div className="px-4 py-3 font-semibold border-b">
                      {selectedState.name}
                    </div>

                    {(areasByState[selectedState._id] || []).map((a: any) => (
                      <Link
                        key={a._id}
                        href={`/tours/${a.slug}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {a.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ================= WORLD ================= */}
        <div
          className="relative group"
          onMouseEnter={() => {
            setActiveMenu("world");
            setSelectedCountry(null);
            setSelectedState(null);
          }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="cursor-pointer hover:text-yellow-300 py-2">
            World <ChevronDown size={14} className="inline ml-1" />
          </div>

          {/* HOVER BRIDGE */}
          {activeMenu === "world" && (
            <>
              <div className="absolute left-0 top-full h-3 w-full"></div>

              <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded z-50">

                {/* COUNTRIES */}
                <div className="w-[260px] bg-gray-50 border-r">
                  {worldCountries.map((c: any) => (
                    <div
                      key={c._id}
                      onMouseEnter={() => {
                        setSelectedCountry(c);
                        setSelectedState(null);
                      }}
                      className="px-5 py-3 hover:bg-white cursor-pointer flex justify-between"
                    >
                      {c.name} <span>›</span>
                    </div>
                  ))}
                </div>

                {/* STATES */}
                {selectedCountry && (
                  <div className="w-[260px] border-r bg-white">
                    <div className="px-4 py-3 font-semibold border-b">
                      {selectedCountry.name}
                    </div>

                    {(statesByCountry[selectedCountry._id] || []).map((s: any) => (
                      <div
                        key={s._id}
                        onMouseEnter={() => setSelectedState(s)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                      >
                        {s.name} <span>›</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* AREAS */}
                {selectedState && (
                  <div className="w-[260px] bg-gray-50">
                    <div className="px-4 py-3 font-semibold border-b">
                      {selectedState.name}
                    </div>

                    {(areasByState[selectedState._id] || []).map((a: any) => (
                      <Link
                        key={a._id}
                        href={`/tours/${a.slug}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {a.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ================= SPECIAL ================= */}
        <div
          onMouseEnter={() => setActiveMenu("special")}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          Specialty Tours <ChevronDown size={14} className="inline ml-1" />

          {activeMenu === "special" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
              <div className="w-[95vw] max-w-[1100px]">
                <SpecialToursDropdown data={specialTours} />
              </div>
            </div>
          )}
        </div>

        {/* ================= CUSTOM ================= */}
        <div
          onMouseEnter={() => setActiveMenu("customized")}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          Customized Holidays <ChevronDown size={14} className="inline ml-1" />

          {activeMenu === "customized" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-full flex justify-center px-4">
              <CustomizedDropdown categories={customCategories} />
            </div>
          )}
        </div>

        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact Us</Link>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {/* ================= MOBILE SIDEBAR ================= */}
      {open && (
        <div className="fixed top-0 left-0 w-[85%] h-full bg-white text-black z-50 overflow-y-auto shadow-xl">

          {/* TOP */}
          <div className="flex justify-between p-4 border-b">
            <button onClick={() => setOpen(false)}><X /></button>
            <div className="border px-3 py-1 rounded">🇮🇳 India</div>
          </div>

          <div className="p-4 space-y-6 text-[15px]">

            {/* ================= INDIA ================= */}
            <div>
              <div
                onClick={() => toggle("india")}
                className="flex justify-between font-semibold cursor-pointer"
              >
                India <span>{openMenu["india"] ? "-" : "+"}</span>
              </div>

              {openMenu["india"] && (
                <div className="pl-3 mt-2 border-l space-y-2">

                  {indiaStates.map((state: any) => (
                    <div key={state._id}>

                      <div
                        onClick={() => toggle(state._id)}
                        className="flex justify-between cursor-pointer"
                      >
                        {state.name}
                        <span>{openMenu[state._id] ? "-" : "+"}</span>
                      </div>

                      {openMenu[state._id] && (
                        <div className="pl-3 mt-1 border-l text-sm text-gray-500 space-y-1">

                          {(areasByState[state._id] || []).map((area: any) => (
                            <div key={area._id}>{area.name}</div>
                          ))}

                        </div>
                      )}
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* ================= WORLD (FULL FIX) ================= */}
            <div>
              <div
                onClick={() => toggle("world")}
                className="flex justify-between font-semibold cursor-pointer"
              >
                World <span>{openMenu["world"] ? "-" : "+"}</span>
              </div>

              {openMenu["world"] && (
                <div className="pl-3 mt-2 border-l space-y-3">

                  {worldCountries.map((country: any) => (
                    <div key={country._id}>

                      <div
                        onClick={() => toggle(country._id)}
                        className="flex justify-between cursor-pointer"
                      >
                        {country.name}
                        <span>{openMenu[country._id] ? "-" : "+"}</span>
                      </div>

                      {openMenu[country._id] && (
                        <div className="pl-3 mt-1 border-l space-y-2">

                          {(statesByCountry[country._id] || []).map((state: any) => (
                            <div key={state._id}>

                              <div
                                onClick={() => toggle(state._id)}
                                className="flex justify-between cursor-pointer text-gray-600"
                              >
                                {state.name}
                                <span>{openMenu[state._id] ? "-" : "+"}</span>
                              </div>

                              {openMenu[state._id] && (
                                <div className="pl-3 mt-1 border-l text-sm text-gray-500 space-y-1">

                                  {(areasByState[state._id] || []).map((area: any) => (
                                    <div key={area._id}>{area.name}</div>
                                  ))}

                                </div>
                              )}
                            </div>
                          ))}

                        </div>
                      )}
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* ================= SPECIAL ================= */}
            <div>
              <div
                onClick={() => toggle("special")}
                className="flex justify-between font-semibold cursor-pointer"
              >
                Speciality Tours
                <span>{openMenu["special"] ? "-" : "+"}</span>
              </div>

              {openMenu["special"] && (
                <div className="mt-3 space-y-3">

                  {specialTours?.slice(0, 4).map((t: any) => (
                    <div
                      key={t._id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition cursor-pointer"
                    >
                      {/* IMAGE */}
                      <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {t.images?.[0] ? (
                          <img
                            src={t.images[0]}
                            alt={t.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* TEXT */}
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {t.title}
                        </div>

                        <div className="text-xs text-gray-500">
                          {t.count} Departures
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* ================= CUSTOM ================= */}
            <div>
              <div
                onClick={() => toggle("custom")}
                className="flex justify-between font-semibold cursor-pointer"
              >
                Customized Holidays
                <span>{openMenu["custom"] ? "-" : "+"}</span>
              </div>

              {openMenu["custom"] && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3 space-y-2 shadow-inner">

                  {customCategories?.map((c: any) => (
                    <div
                      key={c._id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-white hover:shadow-sm transition cursor-pointer"
                    >
                      {/* ICON */}
                      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-sm">
                        ✈️
                      </div>

                      {/* TEXT */}
                      <span className="text-sm text-gray-700 font-medium">
                        {c.title}
                      </span>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* ================= EXTRA LINKS ================= */}
            <div className="pt-2 border-t space-y-3">

              <Link href="/blog" className="block text-gray-600">
                Blog
              </Link>

              <Link href="/contact" className="block font-medium">
                Contact Us
              </Link>



            </div>

          </div>
        </div>
      )}

    </div>
  );
}