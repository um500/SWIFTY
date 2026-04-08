import { defineType, defineField } from "sanity";

export const state = defineType({
  name: "state",
  title: "State / Destination",
  type: "document",

  fields: [
    // ✅ STATE NAME
    defineField({
      name: "name",
      title: "State Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ✅ SLUG
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ COUNTRY REFERENCE (India / UAE / Singapore etc.)
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    // ✅ IMAGE (MOST IMPORTANT 🔥)
    defineField({
      name: "image",
      title: "State Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  // ✅ PREVIEW (SANITY UI me achha dikhega)
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "country.name",
    },
  },
});