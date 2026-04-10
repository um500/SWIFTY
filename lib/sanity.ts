import { createClient } from "next-sanity";
import {
  MENU_QUERY,
  CUSTOMIZED_WITH_TOURS_QUERY,
  SINGLE_CUSTOMIZED_QUERY,
  homeBannerQuery,
  TRAVELLING_NOW_QUERY, // ✅ ADD THIS
} from "./queries";

// ================= CLIENT =================
export const client = createClient({
  projectId: "sr3qi7j7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ================= MENU =================
export const getMenuData = async () => {
  try {
    return await client.fetch(MENU_QUERY);
  } catch (error) {
    console.error("Menu Fetch Error:", error);
    return null;
  }
};

// ================= CUSTOMIZED =================
export const getCustomizedCategories = async () => {
  try {
    return await client.fetch(CUSTOMIZED_WITH_TOURS_QUERY);
  } catch (error) {
    console.error("Customized Fetch Error:", error);
    return null;
  }
};

// ================= SINGLE CATEGORY =================
export const getSingleCategory = async (slug: string) => {
  try {
    return await client.fetch(SINGLE_CUSTOMIZED_QUERY, { slug });
  } catch (error) {
    console.error("Single Category Fetch Error:", error);
    return null;
  }
};

// ================= HOME BANNER =================
export const getHomeBanner = async () => {
  try {
    return await client.fetch(homeBannerQuery);
  } catch (error) {
    console.error("Home Banner Fetch Error:", error);
    return null;
  }
};

// ================= TRAVELLING NOW ================= ✅ NEW
export const getTravellingNow = async () => {
  try {
    const data = await client.fetch(TRAVELLING_NOW_QUERY);
    return data;
  } catch (error) {
    console.error("TravellingNow fetch error:", error);
    return null;
  }
};