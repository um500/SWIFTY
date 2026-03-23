import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "sr3qi7j7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // 🔥 IMPORTANT
});