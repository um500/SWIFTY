import { defineType, defineField } from "sanity";

export default defineType({
  name: "travellingNow",
  title: "Travelling Now Section",
  type: "document",

  fields: [
    // ================= TITLE =================
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Guests are travelling right now with Veena World",
      validation: (Rule) => Rule.required(),
    }),

    // ================= DESCRIPTION =================
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // ================= REVIEWS (NEW 🔥) =================
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "User Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Review Text",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5),
            }),
          ],
        },
      ],
    }),

    // ================= CARDS =================
    defineField({
      name: "cards",
      title: "Cards (Max 4)",
      type: "array",
      validation: (Rule) => Rule.max(4).required(),

      of: [
        {
          type: "object",
          name: "card",
          title: "Card",

          fields: [
            // ✅ TYPE
            defineField({
              name: "type",
              title: "Select Type",
              type: "string",
              options: {
                list: [
                  { title: "India (State)", value: "india" },
                  { title: "International (Country)", value: "international" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),

            // ✅ STATE
            defineField({
              name: "state",
              title: "Select State",
              type: "reference",
              to: [{ type: "state" }],
              hidden: ({ parent }) => parent?.type !== "india",
              validation: (Rule) =>
                Rule.custom((val, context) => {
                  const parent = context.parent as any;
                  if (parent?.type === "india" && !val) {
                    return "State is required";
                  }
                  return true;
                }),
            }),

            // ✅ COUNTRY
            defineField({
              name: "country",
              title: "Select Country",
              type: "reference",
              to: [{ type: "country" }],
              hidden: ({ parent }) => parent?.type !== "international",
              validation: (Rule) =>
                Rule.custom((val, context) => {
                  const parent = context.parent as any;
                  if (parent?.type === "international" && !val) {
                    return "Country is required";
                  }
                  return true;
                }),
            }),

            // ✅ SINGLE IMAGE (fallback)
            defineField({
              name: "image",
              title: "Single Image (Fallback)",
              type: "image",
              options: { hotspot: true },
            }),

            // ✅ MULTIPLE IMAGES (slider)
            defineField({
              name: "images",
              title: "Multiple Images (Slider)",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                },
              ],
              validation: (Rule) => Rule.max(5),
            }),
          ],

          // ================= PREVIEW =================
          preview: {
            select: {
              state: "state.name",
              country: "country.name",
              image: "image",
              images: "images",
              type: "type",
            },
            prepare({ state, country, image, images, type }) {
              return {
                title: state || country || "No Destination",
                subtitle:
                  type === "india" ? "🇮🇳 State" : "🌍 International",
                media: images?.[0] || image,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});