"use client";

import { useState } from "react";
import Link from "next/link";
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

  const [indiaState, setIndiaState] = useState<any>(null);
  const [indiaArea, setIndiaArea] = useState<any>(null);

  const [worldCountry, setWorldCountry] = useState<any>(null);
  const [worldState, setWorldState] = useState<any>(null);
  const [worldArea, setWorldArea] = useState<any>(null);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white relative">

      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* ================= INDIA ================= */}
        <div
          onMouseEnter={() => {
            setActiveMenu("india");
            setIndiaState(null);
            setIndiaArea(null);
          }}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          India ▾

          {activeMenu === "india" && (
            <div className="absolute top-full left-0 flex shadow-2xl rounded-lg overflow-hidden z-50">
              <div className="w-[220px] bg-white text-black">
                {indiaStates.map((s: any) => (
                  <div
                    key={s._id}
                    onMouseEnter={() => {
                      setIndiaState(s);
                      setIndiaArea(null);
                    }}
                    className={`px-4 py-3 cursor-pointer ${indiaState?._id === s._id
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>

              {indiaState && (
                <div className="w-[220px] bg-gray-50 text-black">
                  {(areasByState[indiaState._id] || []).map((a: any) => (
                    <Link
                      key={a._id}
                      href={`/tours/${a.slug}`}
                      onMouseEnter={() => setIndiaArea(a)}
                      className={`block px-4 py-3 ${indiaArea?._id === a._id
                          ? "bg-gray-300"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= WORLD ================= */}
        <div
          onMouseEnter={() => {
            setActiveMenu("world");
            setWorldCountry(null);
            setWorldState(null);
            setWorldArea(null);
          }}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          World ▾

          {activeMenu === "world" && (
            <div className="absolute top-full left-0 flex shadow-2xl rounded-lg overflow-hidden z-50">
              <div className="w-[220px] bg-white text-black">
                {worldCountries.map((c: any) => (
                  <div
                    key={c._id}
                    onMouseEnter={() => {
                      setWorldCountry(c);
                      setWorldState(null);
                      setWorldArea(null);
                    }}
                    className={`px-4 py-3 cursor-pointer ${worldCountry?._id === c._id
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {c.name}
                  </div>
                ))}
              </div>

              {worldCountry && (
                <div className="w-[220px] bg-gray-50 text-black">
                  {(statesByCountry[worldCountry._id] || []).map((s: any) => (
                    <div
                      key={s._id}
                      onMouseEnter={() => {
                        setWorldState(s);
                        setWorldArea(null);
                      }}
                      className={`px-4 py-3 cursor-pointer ${worldState?._id === s._id
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}

              {worldState && (
                <div className="w-[220px] bg-gray-100 text-black">
                  {(areasByState[worldState._id] || []).map((a: any) => (
                    <Link
                      key={a._id}
                      href={`/tours/${a.slug}`}
                      onMouseEnter={() => setWorldArea(a)}
                      className={`block px-4 py-3 ${worldArea?._id === a._id
                          ? "bg-gray-300"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* ================= SPECIAL (FINAL FIXED) ================= */}
   <div
  onMouseEnter={() => setActiveMenu("special")}
  onMouseLeave={() => setActiveMenu(null)}
>
  <div className="cursor-pointer hover:text-yellow-300">
    Specialty Tours ▾
  </div>

  {activeMenu === "special" && (
    <div className="absolute left-0 top-full w-full flex justify-center z-50">

      {/* hover bridge */}
      <div className="absolute top-0 left-0 w-full h-3"></div>

      {/* dropdown */}
      <div className="mt-2 w-[1100px]">
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
          Customized Holidays ▾

          {activeMenu === "customized" && (
            <div className="absolute left-0 top-full mt-2 z-50">
              <CustomizedDropdown categories={customCategories} />
            </div>
          )}
        </div>

        <Link href="/blog" className="hover:text-yellow-300">
          Blog
        </Link>

        <Link href="/contact" className="hover:text-yellow-300 font-semibold">
          Contact Us
        </Link>
      </div>
    </div>
  );
}