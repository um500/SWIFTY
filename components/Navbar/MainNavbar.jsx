"use client";

import { useState } from "react";
import IndiaMenu from "./IndiaMenu";
import WorldMenu from "./WorldMenu";

export default function MainNavbar() {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-[#102c3d] text-white relative">
      <div className="max-w-7xl mx-auto flex gap-8 py-3 text-sm">

        <div
          onMouseEnter={() => setActive("india")}
          onMouseLeave={() => setActive(null)}
          className="cursor-pointer"
        >
          India
          {active === "india" && <IndiaMenu />}
        </div>

        <div
          onMouseEnter={() => setActive("world")}
          onMouseLeave={() => setActive(null)}
          className="cursor-pointer"
        >
          World
          {active === "world" && <WorldMenu />}
        </div>

      </div>
    </div>
  );
}