import { defineType, defineField } from "sanity";

export default defineType({
  name: "popularTours",
  title: "Popular Tours",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Popular Tours",
    }),

    defineField({
      name: "tours",
      title: "Select Tours",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tour" }], // 🔥 yaha tour schema link hoga
        },
      ],
      validation: (Rule) =>
        Rule.max(4).error("You can select only 4 tours"),
    }),
  ],
});