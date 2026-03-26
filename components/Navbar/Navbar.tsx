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

  const india = data?.countries?.find(
    (c: any) => c.name.toLowerCase() === "india"
  );

  const indiaStates =
    data?.states?.filter(
      (s: any) => s.country?._id === india?._id
    ) || [];

  const worldCountries =
    data?.countries?.filter(
      (c: any) => c.name.toLowerCase() !== "india"
    ) || [];

  // ✅ states map
  const statesByCountry: Record<string, any[]> = {};
  data?.states?.forEach((state: any) => {
    const countryId = state.country?._id;
    if (!countryId) return;

    if (!statesByCountry[countryId]) {
      statesByCountry[countryId] = [];
    }
    statesByCountry[countryId].push(state);
  });

  // ✅ tours map
  const toursByState: Record<string, any[]> = {};
  data?.tours?.forEach((tour: any) => {
    const stateId = tour.state?._id;
    if (!stateId) return;

    if (!toursByState[stateId]) {
      toursByState[stateId] = [];
    }
    toursByState[stateId].push(tour);
  });

  return (
    <NavbarUI
      indiaStates={indiaStates}
      worldCountries={worldCountries}
      statesByCountry={statesByCountry}
      toursByState={toursByState}
      customCategories={customCategories}
      specialTours={specialTours}
    />
  );
}