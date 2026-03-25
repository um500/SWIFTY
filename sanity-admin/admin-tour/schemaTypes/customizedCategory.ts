export default {
  name: "customizedCategory",
  title: "Customized Holiday Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },

    // ✅ ICON FIELD (IMAGE)
    {
      name: "icon",
      title: "Category Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }
  ]
};