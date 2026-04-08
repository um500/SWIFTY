import { defineType, defineField } from "sanity";

export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",

  fields: [
    // ================= NAME =================
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),

    // ================= SLUG =================
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ================= IMAGE (🔥 NAVBAR + UI) =================
    defineField({
      name: "image",
      title: "Country Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // ================= ORDER (🔥 SORT CONTROL) =================
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = higher priority (Navbar order)",
    }),
  ],

  // ================= PREVIEW =================
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});