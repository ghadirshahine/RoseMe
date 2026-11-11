import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "إعدادات الموقع",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "اسم المتجر", type: "string", initialValue: "ورود الجنة" }),
    defineField({ name: "siteDescription", title: "وصف المتجر", type: "text" }),
    defineField({ name: "storeAddress", title: "عنوان المتجر", type: "string", initialValue: "دمشق، شارع الحمرا" }),
    defineField({ name: "phone", title: "رقم الهاتف", type: "string", initialValue: "0936305204" }),
    defineField({
      name: "heroImage",
      title: "صورة الواجهة",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "النص البديل", type: "string" })],
    }),
    defineField({ name: "contactEmail", title: "البريد الإلكتروني", type: "string" }),
    defineField({ name: "whatsappNumber", title: "رقم واتساب الدولي", type: "string", initialValue: "963936305204" }),
    defineField({
      name: "colors",
      title: "ألوان العلامة التجارية",
      type: "object",
      fields: [
        defineField({ name: "background", title: "الخلفية", type: "string", initialValue: "#FFF8FB" }),
        defineField({ name: "card", title: "البطاقات", type: "string", initialValue: "#FFF1F6" }),
        defineField({ name: "accent", title: "اللون المميز", type: "string", initialValue: "#F7BACD" }),
        defineField({ name: "neutral", title: "العاجي", type: "string", initialValue: "#F6F0EE" }),
        defineField({ name: "text", title: "النص", type: "string", initialValue: "#3B2F2F" }),
      ],
    }),
  ],
})
