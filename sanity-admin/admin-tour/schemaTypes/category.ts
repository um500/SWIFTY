export default {
  name: "category",
  title: "Tour Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },

    // ✅ ADD THIS (IMPORTANT)
    {
      name: "images",
      title: "Category Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    },
  ],
};