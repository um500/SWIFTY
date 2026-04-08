import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredBanner",
  title: "Featured Banner",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Top Text (Cities etc)",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tour",
      title: "Select Tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "features",
      title: "Features (Flight, Hotel...)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});