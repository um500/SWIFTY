"use client";

import { useState } from "react";
import SpecialToursDropdown from "./SpecialToursDropdown";
import CustomizedDropdown from "./CustomizedDropdown";

export default function NavbarUI({
  indiaStates,
  worldCountries,
  statesByCountry,
  toursByState,
  customCategories,
  specialTours,
}: any) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [worldCountry, setWorldCountry] = useState<any>(null);
  const [worldState, setWorldState] = useState<any>(null);
  const [indiaState, setIndiaState] = useState<any>(null);

  return (
    <div
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white relative"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 font-medium">

        {/* WORLD */}
        <div
          onMouseEnter={() => {
            setActiveMenu("world");
            setWorldCountry(null);
            setWorldState(null);
          }}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          World ▾
          {activeMenu === "world" && (
            <div className="absolute top-full left-0 flex shadow-2xl rounded-lg overflow-hidden z-50">
              <div className="w-[260px] bg-white text-black">
                <p className="font-bold p-3 bg-orange-500 text-white">
                  Countries
                </p>
                {worldCountries.map((c: any) => (
                  <p
                    key={c._id}
                    onMouseEnter={() => {
                      setWorldCountry(c);
                      setWorldState(null);
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {c.name}
                  </p>
                ))}
              </div>

              {worldCountry && (
                <div className="w-[260px] bg-gray-50 text-black">
                  <p className="font-bold p-3 bg-orange-500 text-white">
                    States of {worldCountry.name}
                  </p>
                  {(statesByCountry[worldCountry._id] || []).map((s: any) => (
                    <p
                      key={s._id}
                      onMouseEnter={() => setWorldState(s)}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      {s.name}
                    </p>
                  ))}
                </div>
              )}

              {worldState && (
                <div className="w-[260px] bg-gray-200 text-black">
                  <p className="font-bold p-3 bg-orange-500 text-white">
                    Tours of {worldState.name}
                  </p>
                  {(toursByState[worldState._id] || []).map((t: any) => (
                    <p key={t._id} className="p-3 hover:bg-green-200">
                      {t.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* INDIA */}
        <div
          onMouseEnter={() => {
            setActiveMenu("india");
            setIndiaState(null);
          }}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          India ▾
          {activeMenu === "india" && (
            <div className="absolute top-full left-0 flex shadow-2xl rounded-lg overflow-hidden z-50">
              <div className="w-[260px] bg-white text-black">
                <p className="font-bold p-3 bg-orange-500 text-white">
                  States of India
                </p>
                {indiaStates.map((s: any) => (
                  <p
                    key={s._id}
                    onMouseEnter={() => setIndiaState(s)}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {s.name}
                  </p>
                ))}
              </div>

              {indiaState && (
                <div className="w-[260px] bg-gray-200 text-black">
                  <p className="font-bold p-3 bg-orange-500 text-white">
                    Tours of {indiaState.name}
                  </p>
                  {(toursByState[indiaState._id] || []).map((t: any) => (
                    <p key={t._id} className="p-3 hover:bg-green-200">
                      {t.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SPECIAL */}
        <div
          onMouseEnter={() => setActiveMenu("special")}
          className="cursor-pointer hover:text-yellow-300"
        >
          Speciality Tours ▾
        </div>

        {/* CUSTOMIZED */}
        <div
          onMouseEnter={() => setActiveMenu("customized")}
          className="relative cursor-pointer hover:text-yellow-300"
        >
          Customized Holidays ▾

          {activeMenu === "customized" && (
            <div className="absolute left-0 top-full mt-2 z-50">
              <CustomizedDropdown categories={customCategories} />
            </div>
          )}
        </div>
      </div>

      {/* ✅ SPECIAL DROPDOWN (VEENA STYLE) */}
      {activeMenu === "special" && (
        <div className="absolute left-0 top-full w-full z-50">
          <div className="max-w-7xl mx-auto px-6">
            <SpecialToursDropdown data={specialTours} />
          </div>
        </div>
      )}
    </div>
  );
}