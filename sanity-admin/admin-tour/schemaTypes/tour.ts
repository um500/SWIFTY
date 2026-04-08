import { defineType, defineField } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "days",
      title: "Days / Nights",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ✅ COUNTRY
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    // 🔥 STATE FILTERED BY COUNTRY
    defineField({
      name: "state",
      title: "State / Destination",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),

      options: {
        filter: ({ document }) => {
          const countryId = (document as any)?.country?._ref;

          if (!countryId) {
            return { filter: "false" };
          }

          return {
            filter: "country._ref == $countryId",
            params: { countryId },
          };
        },
      },

      hidden: ({ document }) => !(document as any)?.country,
    }),

    // 🔥 AREA FILTER (already correct)
    defineField({
      name: "area",
      title: "Select Area",
      type: "reference",
      to: [{ type: "area" }],

      options: {
        filter: ({ document }) => {
          const stateId = (document as any)?.state?._ref;

          if (!stateId) {
            return { filter: "false" };
          }

          return {
            filter: "state._ref == $stateId",
            params: { stateId },
          };
        },
      },

      hidden: ({ document }) => !(document as any)?.state,
    }),

    defineField({
      name: "categories",
      title: "Special Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    defineField({
      name: "customizedCategories",
      title: "Customized Holiday Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "customizedCategory" }] }],
    }),

    defineField({
      name: "images",
      title: "Tour Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "featured",
      title: "Featured Tour",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0",
      state: "state.name",
      country: "country.name",
    },
    prepare({ title, media, state, country }) {
      return {
        title,
        media,
        subtitle: `${state || "No State"} • ${country || "No Country"}`,
      };
    },
  },
});