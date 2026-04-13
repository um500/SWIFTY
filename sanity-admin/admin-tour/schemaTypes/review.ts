import { defineField, defineType } from "sanity";

export default defineType({
    name: "review",
    title: "Review",
    type: "document",
    fields: [
        defineField({
            name: "bgImage",
            title: "Background Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "name",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location (City, Country)",
            type: "string",
        }),
        defineField({
            name: "avatar",
            title: "Profile Photo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "rating",
            title: "Rating (1–5)",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: "tourName",
            title: "Tour Name",
            type: "string",
        }),
        defineField({
            name: "reviewText",
            title: "Review Text",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: "date",
            title: "Travel Date",
            type: "string",
            description: "e.g. March 2025",
        }),
        defineField({
            name: "isActive",
            title: "Show on Website",
            type: "boolean",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "tourName",
            media: "avatar",
        },
    },
});