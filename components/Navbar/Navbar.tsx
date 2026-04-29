import NavbarUI from "./NavbarUI";
import { client } from "@/lib/sanity";
import {
  MENU_QUERY,
  CUSTOMIZED_WITH_TOURS_QUERY,
  SPECIAL_TOURS_QUERY,
} from "@/lib/queries";

export default async function Navbar() {
  const [data, customCategories, specialTours] = await Promise.all([
    client.fetch(MENU_QUERY),
    client.fetch(CUSTOMIZED_WITH_TOURS_QUERY),
    client.fetch(SPECIAL_TOURS_QUERY),
  ]);

  const countries = data?.countries || [];
  const states = data?.states || [];
  const areas = data?.areas || [];

  // INDIA
  const india = countries.find(
    (c: any) => c?.name?.toLowerCase() === "india"
  );

  const indiaStates = states.filter(
    (s: any) => s?.country === india?._id
  );

  const worldCountries = countries.filter(
    (c: any) => c?.name?.toLowerCase() !== "india"
  );

  // STATES GROUP
  const statesByCountry: Record<string, any[]> = {};
  states.forEach((s: any) => {
    if (!s?.country) return;
    if (!statesByCountry[s.country]) statesByCountry[s.country] = [];
    statesByCountry[s.country].push(s);
  });

  // AREAS GROUP
  const areasByState: Record<string, any[]> = {};
  areas.forEach((a: any) => {
    if (!a?.state) return;
    if (!areasByState[a.state]) areasByState[a.state] = [];
    areasByState[a.state].push(a);
  });

  return (
    <NavbarUI
      indiaStates={indiaStates}
      worldCountries={worldCountries}
      statesByCountry={statesByCountry}
      areasByState={areasByState}
      customCategories={customCategories || []}
      specialTours={specialTours || []}
    />
  );
}