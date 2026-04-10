import { defineType, defineField } from "sanity";

export const state = defineType({
  name: "state",
  title: "State / Destination",
  type: "document",

  fields: [
    // ================= NAME =================
    defineField({
      name: "name",
      title: "State Name",
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

    // ================= COUNTRY =================
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    // ================= IMAGE =================
    defineField({
      name: "image",
      title: "State Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // ================= OPTIONAL (🔥 SEO / UI) =================
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      country: "country.name",
    },
    prepare({ title, media, country }) {
      return {
        title,
        subtitle: country ? `🌍 ${country}` : "",
        media,
      };
    },
  },
});