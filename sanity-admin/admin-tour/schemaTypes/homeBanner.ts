import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeBanner",
  title: "Home Banner",
  type: "document",

  fields: [
    defineField({
      name: "tour",
      title: "Select Tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: (Rule) => Rule.required(),
    }),
  ],

  // 🔥 FIX: yaha title show hoga
  preview: {
    select: {
      title: "tour.title",
      subtitle: "tour.price",
    },
    prepare(selection) {
      return {
        title: selection.title || "No Tour Selected",
        subtitle: selection.subtitle
          ? `₹${selection.subtitle}`
          : "No Price",
      };
    },
  },
});