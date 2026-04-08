import { createClient } from "next-sanity";
import {
  MENU_QUERY,
  CUSTOMIZED_WITH_TOURS_QUERY,
  SINGLE_CUSTOMIZED_QUERY,
  homeBannerQuery,
} from "./queries";

export const client = createClient({
  projectId: "sr3qi7j7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ================= MENU =================
export async function getMenuData() {
  return await client.fetch(MENU_QUERY);
}

// ================= CUSTOMIZED =================
export async function getCustomizedCategories() {
  return await client.fetch(CUSTOMIZED_WITH_TOURS_QUERY);
}

// ================= SINGLE CATEGORY =================
export async function getSingleCategory(slug: string) {
  return await client.fetch(SINGLE_CUSTOMIZED_QUERY, { slug });
}

export const getHomeBanner = async () => {
  return await client.fetch(homeBannerQuery);
};