import { defineType, defineField } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",

  fields: [
    // ================= TITLE =================
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ================= SLUG =================
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ================= STATE =================
    defineField({
      name: "state",
      title: "State / Destination",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),
    }),

    // ================= SPECIAL CATEGORY =================
    defineField({
      name: "categories",
      title: "Special Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),

    // ================= CUSTOMIZED HOLIDAYS =================
    defineField({
      name: "customizedCategories",
      title: "Customized Holiday Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "customizedCategory" }],
        },
      ],
    }),

    // ================= IMAGES =================
    defineField({
      name: "images",
      title: "Tour Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true, // ✅ correct place
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0",
      subtitle: "state.name",
    },
  },
});