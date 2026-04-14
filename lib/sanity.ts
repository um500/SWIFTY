import { createClient } from "next-sanity";
import {
  MENU_QUERY,
  CUSTOMIZED_WITH_TOURS_QUERY,
  SINGLE_CUSTOMIZED_QUERY,
  homeBannerQuery,
  TRAVELLING_NOW_QUERY,
  FEATURE_CARDS_QUERY,
  COUNTRY_FAV_QUERY,
  POPULAR_TOURS_QUERY,
  reviewsQuery,
  SINGLE_BLOG_QUERY,
  BLOGS_QUERY,
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

// ================= TRAVELLING NOW =================
export const getTravellingNow = async () => {
  try {
    return await client.fetch(TRAVELLING_NOW_QUERY);
  } catch (error) {
    console.error("TravellingNow fetch error:", error);
    return null;
  }
};

// ================= FEATURE CARDS =================
export const getFeatureCards = async () => {
  try {
    return await client.fetch(FEATURE_CARDS_QUERY);
  } catch (error) {
    console.error("FeatureCards Fetch Error:", error);
    return null;
  }
};

// ================= COUNTRY FAV =================
export const getCountryFav = async () => {
  try {
    const data = await client.fetch(COUNTRY_FAV_QUERY);
    const countries = data.flatMap((item: any) => item?.countries || []);
    const unique = Array.from(
      new Map(countries.map((c: any) => [c._id, c])).values()
    );
    return unique;
  } catch (error) {
    console.error("CountryFav Fetch Error:", error);
    return [];
  }
};

// ================= POPULAR TOURS =================
export const getPopularTours = async () => {
  try {
    const data = await client.fetch(POPULAR_TOURS_QUERY);
    return data || [];
  } catch (error) {
    console.error("PopularTours Fetch Error:", error);
    return [];
  }
};

// ================= REVIEWS =================
export const getReviews = async () => {
  try {
    const data = await client.fetch(reviewsQuery);
    return data || [];
  } catch (error) {
    console.error("Reviews Fetch Error:", error);
    return [];
  }
};

// BLOG LIST
export const getBlogs = async () => {
  try {
    const data = await client.fetch(BLOGS_QUERY);
    return data || [];
  } catch (error) {
    console.error("Blogs Fetch Error:", error);
    return [];
  }
};

// SINGLE BLOG
export const getBlogBySlug = async (slug: string) => {
  try {
    console.log("Fetching blog:", slug);

    const data = await client.fetch(SINGLE_BLOG_QUERY, { slug });

    console.log("Blog Data:", data);

    return data || null;
  } catch (error) {
    console.error("Single Blog Fetch Error:", error);
    return null;
  }
};