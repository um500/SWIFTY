import { defineType, defineField } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",

  fields: [
    // ================= BASIC =================
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

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "Used in cards / preview UI",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // ================= LOCATION =================
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "state",
      title: "State / Destination",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),

      options: {
        filter: ({ document }) => {
          const countryId = (document as any)?.country?._ref;

          if (!countryId) return { filter: "false" };

          return {
            filter: "country._ref == $countryId",
            params: { countryId },
          };
        },
      },

      hidden: ({ document }) => !(document as any)?.country,
    }),

    defineField({
      name: "area",
      title: "Select Area",
      type: "reference",
      to: [{ type: "area" }],

      options: {
        filter: ({ document }) => {
          const stateId = (document as any)?.state?._ref;

          if (!stateId) return { filter: "false" };

          return {
            filter: "state._ref == $stateId",
            params: { stateId },
          };
        },
      },

      hidden: ({ document }) => !(document as any)?.state,
    }),

    // ================= CATEGORY =================
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

    // ================= IMAGES =================
    defineField({
      name: "images",
      title: "Tour Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ================= FLAGS =================
    defineField({
      name: "featured",
      title: "Featured Tour",
      type: "boolean",
      initialValue: false,
    }),

    // 🔥 NEW: FEATURE CARD SECTION CONTROL
    defineField({
      name: "sections",
      title: "Show in Feature Sections",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Last Minute", value: "last" },
              { title: "Visa", value: "visa" },
              { title: "Customized", value: "custom" },
            ],
          },
        },
      ],
      description: "Select where this tour should appear",
    }),
  ],

  // ================= PREVIEW =================
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