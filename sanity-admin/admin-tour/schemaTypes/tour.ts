import { defineType, defineField } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State / Destination",
      type: "reference",
      to: [{ type: "state" }],
    }),
  ],
});