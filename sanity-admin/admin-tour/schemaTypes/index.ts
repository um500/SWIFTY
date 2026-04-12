import { country } from "./country";
import { state } from "./state";
import { area } from "./area"; // ✅ FIXED
import tour from "./tour";
import category from "./category";
import customizedCategory from "./customizedCategory";
import homeBanner from "./homeBanner";
import homeSection from "./homeSection";
import featuredBanner from "./featuredBanner";
import travellingNow from "./travellingNow";
import featureCard from "./featureCard";
import countryFav from "./countryFav";
import popular from "./popular";


export const schemaTypes = [
  country,
  state,
  area, 
  tour,
  category,
  customizedCategory,
   homeBanner,
    homeSection,
    featuredBanner,
    travellingNow,
    featureCard,
    countryFav,
    popular,

];