import { defineType, defineField } from "sanity";

export const area = defineType({
  name: "area",
  title: "Area / Location",
  type: "document",

  fields: [
    // ================= AREA NAME =================
    defineField({
      name: "name",
      title: "Area Name (e.g. Kolkata, Siliguri)",
      type: "string",
      validation: (Rule) => Rule.required(),
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

    // ================= STATE (IMPORTANT) =================
    defineField({
      name: "state",
      title: "Select State",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),
    }),
  ],

  // ✅ Better preview in Sanity UI
  preview: {
    select: {
      title: "name",
      subtitle: "state.name",
    },
  },
});