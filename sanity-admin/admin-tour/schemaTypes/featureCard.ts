import { defineType, defineField } from "sanity";

export default defineType({
  name: "featureCard",
  title: "Feature Cards",
  type: "document",

  fields: [
    // 🔥 TOUR SELECT
    defineField({
      name: "tour",
      title: "Select Tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: (Rule) => Rule.required(),
    }),

    // 🔥 SECTION SELECT
    defineField({
      name: "sections",
      title: "Show In Sections",
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
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "tour.title",
      media: "tour.images.0",
    },
  },
});