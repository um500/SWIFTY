import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "shortDesc",
      title: "Short Description",
      type: "text",
    }),

    // 🔥 CONTENT BUILDER
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },

        {
          type: "image",
          options: { hotspot: true },
        },

        {
          type: "object",
          name: "tourSection",
          title: "Tour Section",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "tours",
              type: "array",
              of: [{ type: "reference", to: [{ type: "tour" }] }],
            },
          ],
        },
      ],
    }),
  ],
});