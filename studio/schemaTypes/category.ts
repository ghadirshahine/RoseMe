import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "التصنيفات",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "اسم التصنيف",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "الرابط",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "الوصف", type: "text" }),
    defineField({
      name: "image",
      title: "الصورة",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "النص البديل", type: "string" })],
    }),
  ],
})
