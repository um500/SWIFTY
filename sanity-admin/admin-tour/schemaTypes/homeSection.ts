import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeSection",
  title: "Home Continue Plan",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Hey Guest, Continue your travel plan",
    }),

    defineField({
      name: "tours",
      title: "Select Tours",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tour" }],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});