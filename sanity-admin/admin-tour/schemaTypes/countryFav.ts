import { defineType, defineField } from "sanity";

export default defineType({
  name: "countryFav",
  title: "Country Fav",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Most Loved Destinations",
    }),

    defineField({
      name: "countries",
      title: "Select Countries",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "country" }],
        },
      ],
      validation: (Rule) =>
        Rule.max(4).error("You can select only 4 countries"),
    }),
  ],
});