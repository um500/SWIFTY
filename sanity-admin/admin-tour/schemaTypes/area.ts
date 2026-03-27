import { defineType, defineField } from "sanity";

export const area = defineType({
  name: "area",
  title: "Area / Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Area Name (Kolkata, Siliguri)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "state",
      title: "Select State",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});