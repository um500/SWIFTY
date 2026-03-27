import NavbarUI from "./NavbarUI";
import { client } from "@/lib/sanity";
import {
  MENU_QUERY,
  CUSTOMIZED_WITH_TOURS_QUERY,
  SPECIAL_TOURS_QUERY,
} from "@/lib/queries";

export default async function Navbar() {
  const data = await client.fetch(MENU_QUERY);

  const customCategories = await client.fetch(CUSTOMIZED_WITH_TOURS_QUERY);
  const specialTours = await client.fetch(SPECIAL_TOURS_QUERY);

  // ✅ INDIA FIND
  const india = data?.countries?.find(
    (c: any) => c.name.toLowerCase() === "india"
  );

  // ✅ INDIA STATES (FIXED 🔥)
  const indiaStates =
    data?.states?.filter(
      (s: any) => s.country === india?._id
    ) || [];

  // ✅ WORLD COUNTRIES
  const worldCountries =
    data?.countries?.filter(
      (c: any) => c.name.toLowerCase() !== "india"
    ) || [];

  // ✅ STATES BY COUNTRY (FIXED 🔥)
  const statesByCountry: Record<string, any[]> = {};
  data?.states?.forEach((state: any) => {
    const countryId = state.country; // ✅ direct id

    if (!countryId) return;

    if (!statesByCountry[countryId]) {
      statesByCountry[countryId] = [];
    }

    statesByCountry[countryId].push(state);
  });

  // ✅ 🔥 AREAS BY STATE (NEW ADD - MOST IMPORTANT)
  const areasByState: Record<string, any[]> = {};
  data?.areas?.forEach((area: any) => {
    const stateId = area.state; // ✅ direct id

    if (!stateId) return;

    if (!areasByState[stateId]) {
      areasByState[stateId] = [];
    }

    areasByState[stateId].push(area);
  });

  return (
    <NavbarUI
      indiaStates={indiaStates}
      worldCountries={worldCountries}
      statesByCountry={statesByCountry}
      areasByState={areasByState} // ✅ MUST PASS
      customCategories={customCategories}
      specialTours={specialTours}
    />
  );
}