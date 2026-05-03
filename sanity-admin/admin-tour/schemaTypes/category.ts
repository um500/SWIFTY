// schemas/category.ts
export default {
  name: "category",
  title: "Tour Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required(),
    },
    // ✅ REQUIRED — tells FilterSidebar which section to show this in
    {
      name: "categoryType",
      title: "Category Type",
      type: "string",
      options: {
        list: [
          { title: "Special Tours (e.g. Family, Honeymoon, Senior Special)", value: "special" },
          { title: "Customized Holidays (e.g. Cruise, Air Inclusive)",       value: "customized" },
        ],
        layout: "radio",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "images",
      title: "Category Images",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "categoryType",
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle: subtitle === "special" ? "⭐ Special Tour" : "✈️ Customized Holiday",
      };
    },
  },
};