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
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    // ================= IMAGE =================
    defineField({
      name: "image",
      title: "Country Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ================= DESCRIPTION =================
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // ================= ORDER =================
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = higher priority",
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});