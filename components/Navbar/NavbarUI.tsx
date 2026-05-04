// "use client";

// import { useState } from "react";
// import { useEffect } from "react";
// import { Heart } from "lucide-react";
// import { getFavorites } from "@/lib/favorites";
// import Link from "next/link";
// import { Search, Phone, Menu, X, ChevronDown, User } from "lucide-react";
// import SpecialToursDropdown from "./SpecialToursDropdown";
// import CustomizedDropdown from "./CustomizedDropdown";

// export default function NavbarUI({
//   indiaStates,
//   worldCountries,
//   statesByCountry,
//   areasByState,
//   customCategories,
//   specialTours,
// }: any) {

//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState<any>({});
//   const [indiaState, setIndiaState] = useState<any>(null);
//   const [selectedCountry, setSelectedCountry] = useState<any>(null);
//   const [selectedState, setSelectedState] = useState<any>(null);
//   const [favCount, setFavCount] = useState(0);

//   useEffect(() => {
//     const updateFav = () => {
//       setFavCount(getFavorites().length);
//     };

//     updateFav();

//     // 🔥 custom event (real-time update)
//     window.addEventListener("favoritesUpdated", updateFav);

//     return () => {
//       window.removeEventListener("favoritesUpdated", updateFav);
//     };
//   }, []);


//   const toggle = (key: string) => {
//     setOpenMenu((prev: any) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <div className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white font-serif">

//       {/* ================= HEADER ================= */}
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

//         {/* LEFT */}
//         <div className="flex items-center gap-3">
//           <button className="xl:hidden" onClick={() => setOpen(true)}>
//             <Menu />
//           </button>

//           <div className="flex items-center gap-2 font-bold text-lg">
//             <div className="w-6 h-6 bg-yellow-400 rounded-sm"></div>
//             <span className="hidden sm:block">Swasti Tours</span>
//           </div>
//         </div>

//         {/* SEARCH */}
//         <div className="hidden xl:flex items-center bg-white rounded-full px-4 py-2 w-[450px]">
//           <Search size={16} className="text-gray-500" />
//           <input
//             placeholder='Search "Europe"'
//             className="ml-2 w-full text-black outline-none text-sm"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3">

//           {/* PHONE */}
//           <div className="hidden xl:flex items-center gap-2 bg-[#123447] px-4 py-2 rounded-full">
//             <Phone size={14} />
//             <span className="text-sm">+91 8969457707</span>
//           </div>

//           {/* ❤️ FAVORITE */}
//           <Link href="/wishlist" className="relative">
//             <div className="bg-white text-black p-2 rounded-full shadow cursor-pointer hover:scale-110 transition">
//               <Heart className="w-5 h-5" />
//             </div>

//             {favCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
//                 {favCount}
//               </span>
//             )}
//           </Link>

//           {/* COUNTRY */}
//           <div className="bg-white text-black px-3 py-1 rounded">
//             🇮🇳 India
//           </div>

//         </div>
//       </div>

//       {/* MOBILE SEARCH */}
//       <div className="xl:hidden px-4 pb-3">
//         <div className="flex items-center bg-white rounded-full px-4 py-2">
//           <Search size={16} className="text-gray-500" />
//           <input
//             placeholder='Search "Europe"'
//             className="ml-2 w-full text-black outline-none text-sm"
//           />
//         </div>
//       </div>

//       {/* 👇 YE LINE ADD KARO */}
//       <div className="border-t border-white/10"></div>

//       {/* ================= NAVBAR DESKTOP ================= */}
//       <div className="hidden xl:flex items-center justify-center flex-nowrap gap-8 px-6 py-1 bg-gradient-to-r from-[#0f172a] to-[#1e293b] font-medium relative whitespace-nowrap">

//         {/* ================= INDIA ================= */}
//         <div
//           className="relative group"
//           onMouseEnter={() => {
//             setActiveMenu("india");
//             setSelectedState(null);
//           }}
//           onMouseLeave={() => setActiveMenu(null)}
//         >
//           <div className="cursor-pointer hover:text-yellow-300 py-2">
//             India <ChevronDown size={14} className="inline ml-1" />
//           </div>

//           {/* HOVER BRIDGE (IMPORTANT) */}
//           {activeMenu === "india" && (
//             <>
//               <div className="absolute left-0 top-full h-3 w-full"></div>

//               <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded z-50">

//                 {/* STATES */}
//                 <div className="w-[250px] border-r bg-gray-50">
//                   {indiaStates.map((s: any) => (
//                     <div
//                       key={s._id}
//                       onMouseEnter={() => setSelectedState(s)}
//                       className="px-5 py-3 hover:bg-white cursor-pointer flex justify-between"
//                     >
//                       {s.name} <span>›</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* AREAS */}
//                 {selectedState && (
//                   <div className="w-[300px] bg-white">
//                     <div className="px-4 py-3 font-semibold border-b">
//                       {selectedState.name}
//                     </div>

//                     {(areasByState[selectedState._id] || []).map((a: any) => (
//                       <Link
//                         key={a._id}
//                         href={`/tours/${a.slug}`}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         {a.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         {/* ================= WORLD ================= */}
//         <div
//           className="relative group"
//           onMouseEnter={() => {
//             setActiveMenu("world");
//             setSelectedCountry(null);
//             setSelectedState(null);
//           }}
//           onMouseLeave={() => setActiveMenu(null)}
//         >
//           <div className="cursor-pointer hover:text-yellow-300 py-2">
//             World <ChevronDown size={14} className="inline ml-1" />
//           </div>

//           {/* HOVER BRIDGE */}
//           {activeMenu === "world" && (
//             <>
//               <div className="absolute left-0 top-full h-3 w-full"></div>

//               <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded z-50">

//                 {/* COUNTRIES */}
//                 <div className="w-[260px] bg-gray-50 border-r">
//                   {worldCountries.map((c: any) => (
//                     <div
//                       key={c._id}
//                       onMouseEnter={() => {
//                         setSelectedCountry(c);
//                         setSelectedState(null);
//                       }}
//                       className="px-5 py-3 hover:bg-white cursor-pointer flex justify-between"
//                     >
//                       {c.name} <span>›</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* STATES */}
//                 {selectedCountry && (
//                   <div className="w-[260px] border-r bg-white">
//                     <div className="px-4 py-3 font-semibold border-b">
//                       {selectedCountry.name}
//                     </div>

//                     {(statesByCountry[selectedCountry._id] || []).map((s: any) => (
//                       <div
//                         key={s._id}
//                         onMouseEnter={() => setSelectedState(s)}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
//                       >
//                         {s.name} <span>›</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* AREAS */}
//                 {selectedState && (
//                   <div className="w-[260px] bg-gray-50">
//                     <div className="px-4 py-3 font-semibold border-b">
//                       {selectedState.name}
//                     </div>

//                     {(areasByState[selectedState._id] || []).map((a: any) => (
//                       <Link
//                         key={a._id}
//                         href={`/tours/${a.slug}`}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         {a.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         {/* ================= SPECIAL ================= */}
//         <div
//           onMouseEnter={() => setActiveMenu("special")}
//           onMouseLeave={() => setActiveMenu(null)}
//           className="relative cursor-pointer hover:text-yellow-300"
//         >
//           Specialty Tours <ChevronDown size={14} className="inline ml-1" />

//           {activeMenu === "special" && (
//             <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
//               <div className="w-[95vw] max-w-[1100px]">
//                 <SpecialToursDropdown data={specialTours} />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ================= CUSTOM ================= */}
//         <div
//           onMouseEnter={() => setActiveMenu("customized")}
//           onMouseLeave={() => setActiveMenu(null)}
//           className="relative cursor-pointer hover:text-yellow-300"
//         >
//           Customized Holidays <ChevronDown size={14} className="inline ml-1" />

//           {activeMenu === "customized" && (
//             <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-full flex justify-center px-4">
//               <CustomizedDropdown categories={customCategories} />
//             </div>
//           )}
//         </div>

//         <Link
//   href="/blog"
//   className="cursor-pointer hover:text-yellow-300 py-2 transition"
// >
//   Blog
// </Link>

// <Link
//   href="/contact"
//   className="cursor-pointer hover:text-yellow-300 py-2 transition"
// >
//   Contact Us
// </Link>
//       </div>

//       {/* ================= MOBILE SIDEBAR ================= */}
//       {/* ================= MOBILE SIDEBAR ================= */}
//       {open && (
//         <div className="fixed top-0 left-0 w-[85%] h-full bg-white text-black z-50 overflow-y-auto shadow-xl">

//           {/* TOP */}
//           <div className="flex justify-between p-4 border-b">
//             <button onClick={() => setOpen(false)}><X /></button>
//             <div className="border px-3 py-1 rounded">🇮🇳 India</div>
//           </div>

//           <div className="p-4 space-y-6 text-[15px]">

//             {/* ================= INDIA ================= */}
//             <div>
//               <div
//                 onClick={() => toggle("india")}
//                 className="flex justify-between font-semibold cursor-pointer"
//               >
//                 India <span>{openMenu["india"] ? "-" : "+"}</span>
//               </div>

//               {openMenu["india"] && (
//                 <div className="pl-3 mt-2 border-l space-y-2">

//                   {indiaStates.map((state: any) => (
//                     <div key={state._id}>

//                       <div
//                         onClick={() => toggle(state._id)}
//                         className="flex justify-between cursor-pointer"
//                       >
//                         {state.name}
//                         <span>{openMenu[state._id] ? "-" : "+"}</span>
//                       </div>

//                       {openMenu[state._id] && (
//                         <div className="pl-3 mt-1 border-l text-sm text-gray-500 space-y-1">

//                           {(areasByState[state._id] || []).map((area: any) => (
//                             <div key={area._id}>{area.name}</div>
//                           ))}

//                         </div>
//                       )}
//                     </div>
//                   ))}

//                 </div>
//               )}
//             </div>

//             {/* ================= WORLD (FULL FIX) ================= */}
//             <div>
//               <div
//                 onClick={() => toggle("world")}
//                 className="flex justify-between font-semibold cursor-pointer"
//               >
//                 World <span>{openMenu["world"] ? "-" : "+"}</span>
//               </div>

//               {openMenu["world"] && (
//                 <div className="pl-3 mt-2 border-l space-y-3">

//                   {worldCountries.map((country: any) => (
//                     <div key={country._id}>

//                       <div
//                         onClick={() => toggle(country._id)}
//                         className="flex justify-between cursor-pointer"
//                       >
//                         {country.name}
//                         <span>{openMenu[country._id] ? "-" : "+"}</span>
//                       </div>

//                       {openMenu[country._id] && (
//                         <div className="pl-3 mt-1 border-l space-y-2">

//                           {(statesByCountry[country._id] || []).map((state: any) => (
//                             <div key={state._id}>

//                               <div
//                                 onClick={() => toggle(state._id)}
//                                 className="flex justify-between cursor-pointer text-gray-600"
//                               >
//                                 {state.name}
//                                 <span>{openMenu[state._id] ? "-" : "+"}</span>
//                               </div>

//                               {openMenu[state._id] && (
//                                 <div className="pl-3 mt-1 border-l text-sm text-gray-500 space-y-1">

//                                   {(areasByState[state._id] || []).map((area: any) => (
//                                     <div key={area._id}>{area.name}</div>
//                                   ))}

//                                 </div>
//                               )}
//                             </div>
//                           ))}

//                         </div>
//                       )}
//                     </div>
//                   ))}

//                 </div>
//               )}
//             </div>

//             {/* ================= SPECIAL ================= */}
//             <div>
//               <div
//                 onClick={() => toggle("special")}
//                 className="flex justify-between font-semibold cursor-pointer"
//               >
//                 Speciality Tours
//                 <span>{openMenu["special"] ? "-" : "+"}</span>
//               </div>

//               {openMenu["special"] && (
//                 <div className="mt-3 space-y-3">

//                   {specialTours?.slice(0, 4).map((t: any) => (
//                     <div
//                       key={t._id}
//                       className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition cursor-pointer"
//                     >
//                       {/* IMAGE */}
//                       <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0">
//                         {t.images?.[0] ? (
//                           <img
//                             src={t.images[0]}
//                             alt={t.title}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-xs">
//                             No Image
//                           </div>
//                         )}
//                       </div>

//                       {/* TEXT */}
//                       <div>
//                         <div className="text-sm font-medium text-gray-800">
//                           {t.title}
//                         </div>

//                         <div className="text-xs text-gray-500">
//                           {t.count} Departures
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                 </div>
//               )}
//             </div>

//             {/* ================= CUSTOM ================= */}
//             <div>
//               <div
//                 onClick={() => toggle("custom")}
//                 className="flex justify-between font-semibold cursor-pointer"
//               >
//                 Customized Holidays
//                 <span>{openMenu["custom"] ? "-" : "+"}</span>
//               </div>

//               {openMenu["custom"] && (
//                 <div className="mt-3 bg-gray-50 rounded-lg p-3 space-y-2 shadow-inner">

//                   {customCategories?.map((c: any) => (
//                     <div
//                       key={c._id}
//                       className="flex items-center gap-3 p-2 rounded-md hover:bg-white hover:shadow-sm transition cursor-pointer"
//                     >
//                       {/* ICON */}
//                       <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-sm">
//                         ✈️
//                       </div>

//                       {/* TEXT */}
//                       <span className="text-sm text-gray-700 font-medium">
//                         {c.title}
//                       </span>
//                     </div>
//                   ))}

//                 </div>
//               )}
//             </div>

//             {/* ================= EXTRA LINKS ================= */}
//             <div className="pt-2 border-t space-y-3">

//               <Link
//                 href="/blog"
//                 className="cursor-pointer hover:text-yellow-300 py-2 transition"
//               >
//                 Blog
//               </Link>

//               <Link
//                 href="/contact"
//                 className="cursor-pointer hover:text-yellow-300 py-2 transition"
//               >
//                 Contact Us
//               </Link>



//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Heart, Search, Phone, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";
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
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateFav = () => setFavCount(getFavorites().length);
    updateFav();
    window.addEventListener("favoritesUpdated", updateFav);
    return () => window.removeEventListener("favoritesUpdated", updateFav);
  }, []);

  const toggle = (key: string) =>
    setOpenMenu((prev: any) => ({ ...prev, [key]: !prev[key] }));

  const areaHref = (area: any, state?: any) => {
    const areaSlug  = area.slug?.current ?? area.slug ?? "";
    const stateSlug = state?.slug?.current ?? state?.slug ?? "";
    const params = new URLSearchParams();
    if (areaSlug)  params.set("city",  areaSlug);
    if (stateSlug) params.set("state", stateSlug);
    return `/tours?${params.toString()}`;
  };

  const stateHref = (state: any) => {
    const slug = state.slug?.current ?? state.slug ?? "";
    return `/tours?state=${slug}`;
  };

  const countryHref = (country: any) => {
    const slug = country.slug?.current ?? country.slug ?? "";
    return `/tours?country=${slug}`;
  };

  useEffect(() => {
  const getCount = () => {
    try {
      const data = localStorage.getItem("wishlist");
      const parsed = data ? JSON.parse(data) : [];
      setFavCount(parsed.length);
    } catch {
      setFavCount(0);
    }
  };

  // initial load
  getCount();

  // 🔥 sync with other pages
  window.addEventListener("wishlistUpdated", getCount);
  window.addEventListener("storage", getCount);

  return () => {
    window.removeEventListener("wishlistUpdated", getCount);
    window.removeEventListener("storage", getCount);
  };
}, []);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white font-serif">

      {/* ═══════════════ HEADER ═══════════════ */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

        {/* LEFT — logo */}
        <div className="flex items-center gap-3">
          <button className="xl:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm" />
            <span className="hidden sm:block">Swasti Tours</span>
          </Link>
        </div>

        {/* SEARCH — desktop */}
        <div className="hidden xl:flex items-center bg-white rounded-full px-4 py-2 w-[450px]">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder='Search "Europe"'
            className="ml-2 w-full text-black outline-none text-sm bg-transparent"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 bg-[#123447] px-4 py-2 rounded-full">
            <Phone size={14} />
            <span className="text-sm">+91 8969457707</span>
          </div>

          <Link href="/wishlist" className="relative">
            <div className="bg-white text-black p-2 rounded-full shadow hover:scale-110 transition">
              <Heart className="w-5 h-5" />
            </div>
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {favCount}
              </span>
            )}
          </Link>

          <div className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
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
            className="ml-2 w-full text-black outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* ═══════════════ DESKTOP NAV ═══════════════ */}
      <div className="hidden xl:flex items-center justify-center flex-nowrap gap-8 px-6 py-1 font-medium relative whitespace-nowrap">

        {/* ── INDIA ── */}
        <div
          className="relative"
          onMouseEnter={() => { setActiveMenu("india"); setSelectedState(null); }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link
            href="/tours?country=india"
            className="flex items-center gap-1 hover:text-yellow-300 py-2 transition-colors"
          >
            India <ChevronDown size={14} />
          </Link>

          {activeMenu === "india" && (
            <>
              <div className="absolute left-0 top-full h-3 w-full" />
              <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded-xl z-50 overflow-hidden">

                <div className="w-[240px] border-r bg-gray-50 py-2">
                  {indiaStates.map((s: any) => (
                    <div key={s._id} onMouseEnter={() => setSelectedState(s)} className="group">
                      <Link
                        href={stateHref(s)}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between px-5 py-2.5 hover:bg-white transition-colors"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                          {s.name}
                        </span>
                        {(areasByState[s._id] || []).length > 0 && (
                          <span className="text-gray-400 text-xs">›</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                {selectedState && (
                  <div className="w-[280px] bg-white py-2">
                    <Link
                      href={stateHref(selectedState)}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-2.5 font-bold text-gray-800 border-b mb-1 hover:text-blue-600 transition-colors text-sm"
                    >
                      All {selectedState.name} Tours →
                    </Link>
                    {(areasByState[selectedState._id] || []).map((a: any) => (
                      <Link
                        key={a._id}
                        href={areaHref(a, selectedState)}
                        onClick={() => setActiveMenu(null)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
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

        {/* ── WORLD ── */}
        <div
          className="relative"
          onMouseEnter={() => { setActiveMenu("world"); setSelectedCountry(null); setSelectedState(null); }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link
            href="/tours"
            className="flex items-center gap-1 hover:text-yellow-300 py-2 transition-colors"
          >
            World <ChevronDown size={14} />
          </Link>

          {activeMenu === "world" && (
            <>
              <div className="absolute left-0 top-full h-3 w-full" />
              <div className="absolute left-0 top-full flex bg-white text-black shadow-2xl rounded-xl z-50 overflow-hidden">

                <div className="w-[240px] bg-gray-50 border-r py-2">
                  {worldCountries.map((c: any) => (
                    <div
                      key={c._id}
                      onMouseEnter={() => { setSelectedCountry(c); setSelectedState(null); }}
                      className="group"
                    >
                      <Link
                        href={countryHref(c)}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between px-5 py-2.5 hover:bg-white transition-colors"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                          {c.name}
                        </span>
                        {(statesByCountry[c._id] || []).length > 0 && (
                          <span className="text-gray-400 text-xs">›</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                {selectedCountry && (
                  <div className="w-[240px] border-r bg-white py-2">
                    <Link
                      href={countryHref(selectedCountry)}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-2.5 font-bold text-gray-800 border-b mb-1 hover:text-blue-600 transition-colors text-sm"
                    >
                      All {selectedCountry.name} Tours →
                    </Link>
                    {(statesByCountry[selectedCountry._id] || []).map((s: any) => (
                      <div key={s._id} onMouseEnter={() => setSelectedState(s)} className="group">
                        <Link
                          href={stateHref(s)}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">
                            {s.name}
                          </span>
                          {(areasByState[s._id] || []).length > 0 && (
                            <span className="text-gray-400 text-xs">›</span>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {selectedState && (
                  <div className="w-[240px] bg-gray-50 py-2">
                    <Link
                      href={stateHref(selectedState)}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-2.5 font-bold text-gray-800 border-b mb-1 hover:text-blue-600 transition-colors text-sm"
                    >
                      All {selectedState.name} Tours →
                    </Link>
                    {(areasByState[selectedState._id] || []).map((a: any) => (
                      <Link
                        key={a._id}
                        href={areaHref(a, selectedState)}
                        onClick={() => setActiveMenu(null)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 transition-colors"
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

        {/* ── SPECIALTY TOURS ── */}
        <div
          onMouseEnter={() => setActiveMenu("special")}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative"
        >
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-300 py-2 transition-colors">
            Specialty Tours <ChevronDown size={14} />
          </div>
          {activeMenu === "special" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
              <div className="w-[95vw] max-w-[1100px]">
                <SpecialToursDropdown data={specialTours} />
              </div>
            </div>
          )}
        </div>

        {/* ── CUSTOMIZED HOLIDAYS ── */}
        <div
          onMouseEnter={() => setActiveMenu("customized")}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative"
        >
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-300 py-2 transition-colors">
            Customized Holidays <ChevronDown size={14} />
          </div>
          {activeMenu === "customized" && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-full flex justify-center px-4">
              <CustomizedDropdown categories={customCategories} />
            </div>
          )}
        </div>

        <Link href="/blog" className="hover:text-yellow-300 py-2 transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="hover:text-yellow-300 py-2 transition-colors">
          Contact Us
        </Link>
      </div>

      {/* ═══════════════ MOBILE SIDEBAR ═══════════════ */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />

          <div className="fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white text-black z-50 overflow-y-auto shadow-2xl">

            {/* Top bar */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-bold">
                <div className="w-5 h-5 bg-yellow-400 rounded-sm" />
                <span>Swasti Tours</span>
              </Link>
              <button onClick={() => setOpen(false)}>
                <X size={22} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-1 text-[15px]">

              {/* ── INDIA ── */}
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between">
                  <Link
                    href="/tours?country=india"
                    onClick={() => setOpen(false)}
                    className="flex-1 font-semibold py-3 px-4 hover:text-yellow-600 transition-colors"
                  >
                    India
                  </Link>
                  <button
                    onClick={() => toggle("india")}
                    className="px-4 py-3 text-gray-500 text-lg font-bold hover:bg-gray-50"
                  >
                    {openMenu["india"] ? "−" : "+"}
                  </button>
                </div>

                {openMenu["india"] && (
                  <div className="bg-gray-50 border-t">
                    {indiaStates.map((state: any) => (
                      <div key={state._id} className="border-b border-gray-100 last:border-0">
                        <div className="flex items-center justify-between">
                          <Link
                            href={stateHref(state)}
                            onClick={() => setOpen(false)}
                            className="flex-1 text-sm text-gray-700 font-medium py-2.5 px-5 hover:text-yellow-600 transition-colors"
                          >
                            {state.name}
                          </Link>
                          {(areasByState[state._id] || []).length > 0 && (
                            <button
                              onClick={() => toggle(state._id)}
                              className="px-4 py-2.5 text-gray-400 text-base font-bold hover:bg-gray-100"
                            >
                              {openMenu[state._id] ? "−" : "+"}
                            </button>
                          )}
                        </div>
                        {openMenu[state._id] && (
                          <div className="bg-white border-t border-gray-100">
                            {(areasByState[state._id] || []).map((area: any) => (
                              <Link
                                key={area._id}
                                href={areaHref(area, state)}
                                onClick={() => setOpen(false)}
                                className="block text-sm text-gray-500 py-2 px-7 hover:text-yellow-600 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                              >
                                {area.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── WORLD ── */}
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between">
                  <Link
                    href="/tours"
                    onClick={() => setOpen(false)}
                    className="flex-1 font-semibold py-3 px-4 hover:text-yellow-600 transition-colors"
                  >
                    World
                  </Link>
                  <button
                    onClick={() => toggle("world")}
                    className="px-4 py-3 text-gray-500 text-lg font-bold hover:bg-gray-50"
                  >
                    {openMenu["world"] ? "−" : "+"}
                  </button>
                </div>

                {openMenu["world"] && (
                  <div className="bg-gray-50 border-t">
                    {worldCountries.map((country: any) => (
                      <div key={country._id} className="border-b border-gray-100 last:border-0">
                        <div className="flex items-center justify-between">
                          <Link
                            href={countryHref(country)}
                            onClick={() => setOpen(false)}
                            className="flex-1 text-sm text-gray-700 font-medium py-2.5 px-5 hover:text-yellow-600 transition-colors"
                          >
                            {country.name}
                          </Link>
                          {(statesByCountry[country._id] || []).length > 0 && (
                            <button
                              onClick={() => toggle(country._id)}
                              className="px-4 py-2.5 text-gray-400 text-base font-bold hover:bg-gray-100"
                            >
                              {openMenu[country._id] ? "−" : "+"}
                            </button>
                          )}
                        </div>

                        {openMenu[country._id] && (
                          <div className="bg-white border-t border-gray-100">
                            {(statesByCountry[country._id] || []).map((state: any) => (
                              <div key={state._id}>
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={stateHref(state)}
                                    onClick={() => setOpen(false)}
                                    className="flex-1 text-sm text-gray-500 py-2 px-7 hover:text-yellow-600 hover:bg-gray-50 transition-colors"
                                  >
                                    {state.name}
                                  </Link>
                                  {(areasByState[state._id] || []).length > 0 && (
                                    <button
                                      onClick={() => toggle(state._id)}
                                      className="px-4 py-2 text-gray-400 text-sm font-bold hover:bg-gray-100"
                                    >
                                      {openMenu[state._id] ? "−" : "+"}
                                    </button>
                                  )}
                                </div>
                                {openMenu[state._id] && (
                                  <div className="border-t border-gray-100">
                                    {(areasByState[state._id] || []).map((area: any) => (
                                      <Link
                                        key={area._id}
                                        href={areaHref(area, state)}
                                        onClick={() => setOpen(false)}
                                        className="block text-xs text-gray-400 py-2 px-10 hover:text-yellow-600 hover:bg-gray-50 transition-colors"
                                      >
                                        {area.name}
                                      </Link>
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

              {/* ── SPECIALTY TOURS ── */}
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between">
                  {/* ✅ Header text is now also a link to all specialty tours */}
                  <Link
                    href="/tours?special="
                    onClick={() => setOpen(false)}
                    className="flex-1 font-semibold py-3 px-4 hover:text-yellow-600 transition-colors"
                  >
                    Specialty Tours
                  </Link>
                  <button
                    onClick={() => toggle("special")}
                    className="px-4 py-3 text-gray-500 text-lg font-bold hover:bg-gray-50"
                  >
                    {openMenu["special"] ? "−" : "+"}
                  </button>
                </div>

                {openMenu["special"] && (
                  <div className="bg-gray-50 border-t p-3 space-y-2">
                    {specialTours?.length === 0 && (
                      <p className="text-xs text-gray-400 px-2">No specialty tours found</p>
                    )}
                    {specialTours?.map((t: any) => (
                      // ✅ Each item is now a proper Link
                      <Link
                        key={t._id}
                        href={`/tours?special=${t.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition"
                      >
                        <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {t.images?.[0] ? (
                            <img
                              src={t.images[0]}
                              alt={t.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 leading-tight">{t.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{t.count} Departures</p>
                          <p className="text-xs text-blue-500 mt-0.5">View Tours →</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ── CUSTOMIZED HOLIDAYS ── */}
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between">
                  {/* ✅ Header text is now also a link */}
                  <Link
                    href="/tours"
                    onClick={() => setOpen(false)}
                    className="flex-1 font-semibold py-3 px-4 hover:text-yellow-600 transition-colors"
                  >
                    Customized Holidays
                  </Link>
                  <button
                    onClick={() => toggle("custom")}
                    className="px-4 py-3 text-gray-500 text-lg font-bold hover:bg-gray-50"
                  >
                    {openMenu["custom"] ? "−" : "+"}
                  </button>
                </div>

                {openMenu["custom"] && (
                  <div className="bg-gray-50 border-t p-3 space-y-1">
                    {customCategories?.length === 0 && (
                      <p className="text-xs text-gray-400 px-2">No categories found</p>
                    )}
                    {customCategories?.map((c: any) => (
                      // ✅ Each item is now a proper Link
                      <Link
                        key={c._id}
                        href={`/tours?custom=${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm flex-shrink-0">
                          {c.icon ? (
                            <img src={c.icon} alt={c.title} className="w-4 h-4 object-contain" />
                          ) : (
                            <span style={{ fontSize: "16px" }}>✈️</span>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-gray-700 font-medium">{c.title}</span>
                          <p className="text-xs text-blue-500">View Tours →</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ── EXTRA LINKS ── */}
              <div className="pt-2 flex flex-col gap-1">
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="font-semibold py-3 px-4 rounded-lg border border-gray-100 hover:text-yellow-600 hover:bg-gray-50 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="font-semibold py-3 px-4 rounded-lg border border-gray-100 hover:text-yellow-600 hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}