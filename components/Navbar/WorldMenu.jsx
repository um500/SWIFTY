"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { MENU_QUERY } from "@/lib/queries";

export default function WorldMenu() {
  const [data, setData] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeState, setActiveState] = useState(null);

  useEffect(() => {
    client.fetch(MENU_QUERY)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  const countries = data.countries.filter(c => c.name !== "India");

  const states = data.states.filter(
    s => s.country?._id === activeCountry
  );

  const tours = data.tours.filter(
    t => t.state?._id === activeState
  );

  return (
    <div className="absolute left-0 top-full w-full bg-white text-black shadow-xl p-6">
      <div className="max-w-6xl mx-auto flex gap-10">

        {/* COUNTRIES */}
        <div className="w-1/3 border-r">
          {countries.map((c) => (
            <div
              key={c._id}
              onMouseEnter={() => {
                setActiveCountry(c._id);
                setActiveState(null);
              }}
              className="cursor-pointer py-1 hover:text-blue-600"
            >
              {c.name}
            </div>
          ))}
        </div>

        {/* STATES */}
        <div className="w-1/3 border-r">
          {states.map((s) => (
            <div
              key={s._id}
              onMouseEnter={() => setActiveState(s._id)}
              className="cursor-pointer py-1"
            >
              {s.name}
            </div>
          ))}
        </div>

        {/* TOURS */}
        <div className="w-1/3">
          {tours.map((t, i) => (
            <div key={i} className="py-1 text-sm">
              {t.title}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}