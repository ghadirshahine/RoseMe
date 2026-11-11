import { defineArrayMember, defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "المنتجات",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "اسم المنتج",
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
    defineField({
      name: "price",
      title: "السعر الأساسي (ل.س)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "images",
      title: "الصور",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "النص البديل", type: "string" })],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "shortDescription", title: "وصف قصير", type: "string" }),
    defineField({
      name: "body",
      title: "الوصف التفصيلي",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "category",
      title: "التصنيف",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      title: "الوسوم والمناسبات والألوان",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "isFeatured",
      title: "منتج مميز",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "متاح للطلب",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "stock",
      title: "المخزون",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "variants",
      title: "الأحجام",
      type: "array",
      of: [
        defineArrayMember({
          name: "variant",
          title: "حجم",
          type: "object",
          fields: [
            defineField({
              name: "sizeName",
              title: "اسم الحجم",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "priceModifier", title: "فرق السعر", type: "number" }),
            defineField({ name: "priceOverride", title: "سعر بديل (اختياري)", type: "number" }),
            defineField({
              name: "images",
              title: "صور خاصة بالحجم",
              type: "array",
              of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "bouquetOptions",
      title: "خيارات الباقة",
      type: "object",
      fields: [
        defineField({
          name: "wrappingStyles",
          title: "أنماط التغليف",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "addCard",
          title: "السماح بإضافة بطاقة",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "تحسين محركات البحث",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "عنوان الصفحة", type: "string" }),
        defineField({ name: "metaDescription", title: "وصف الصفحة", type: "text" }),
        defineField({
          name: "ogImage",
          title: "صورة المشاركة",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
