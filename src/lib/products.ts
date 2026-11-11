import "server-only"

import {
  categoriesQuery,
  featuredProductsQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries"
import { sanityConfigured } from "@/lib/sanity/client"
import { sanityServerClient } from "@/lib/sanity/server-client"
import type { Category, Product, SiteSettings } from "@/lib/product-types"

export type { Category, Product, SiteSettings } from "@/lib/product-types"

const demoProducts: Product[] = [
  {
    _id: "demo-rose-blush",
    title: "همسات الورد",
    slug: "hamasat-alward",
    price: 185000,
    shortDescription: "باقة رقيقة من الورود الوردية بتنسيق يفيض حبًا.",
    images: [{ url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85", alt: "باقة ورود وردية ناعمة" }],
    category: "باقات ورد زهرية",
    tags: ["وردي", "ذكرى", "رومانسي"],
    isFeatured: true,
    available: true,
    variants: [
      { sizeName: "صغير", priceModifier: 0 },
      { sizeName: "متوسط", priceModifier: 45000 },
      { sizeName: "كبير", priceModifier: 90000 },
    ],
    bouquetOptions: { wrappingStyles: ["ورق عاجي", "وردي ناعم", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-sunrise",
    title: "صباح الياسمين",
    slug: "sabah-alyasmeen",
    price: 220000,
    shortDescription: "ألوان مشرقة تترك ابتسامة في كل صباح.",
    images: [{ url: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1000&q=85", alt: "تنسيق زهور بألوان مشرقة" }],
    category: "باقات الورد",
    tags: ["أصفر", "عيد ميلاد", "مميز"],
    isFeatured: true,
    available: true,
    variants: [
      { sizeName: "صغير", priceModifier: 0 },
      { sizeName: "متوسط", priceModifier: 55000 },
      { sizeName: "كبير", priceModifier: 100000 },
    ],
    bouquetOptions: { wrappingStyles: ["ورق عاجي", "وردي ناعم"], addCard: true },
  },
  {
    _id: "demo-white-garden",
    title: "حديقة من السلام",
    slug: "hadeeqat-alsalam",
    price: 195000,
    shortDescription: "ورود بيضاء أنيقة للمناسبات التي لا تُنسى.",
    images: [{ url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85", alt: "ورود بيضاء أنيقة" }],
    category: "باقات ورد بيضاء",
    tags: ["أبيض", "تهنئة", "أناقة"],
    isFeatured: true,
    available: true,
    variants: [{ sizeName: "صغير", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 80000 }],
    bouquetOptions: { wrappingStyles: ["ورق عاجي", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-romance",
    title: "وعد من الورد",
    slug: "waad-min-alward",
    price: 260000,
    shortDescription: "باقة حمراء تعبر عن أجمل الحكايات.",
    images: [{ url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85", alt: "ورود حمراء رومانسية" }],
    category: "باقات ورد فخمة حمراء",
    tags: ["أحمر", "حب", "ذكرى"],
    isFeatured: false,
    available: true,
    variants: [{ sizeName: "متوسط", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 95000 }],
    bouquetOptions: { wrappingStyles: ["وردي ناعم", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-royal-red",
    title: "حكاية باللون الأحمر",
    slug: "hekaya-biallawn-alahmar",
    price: 385000,
    shortDescription: "باقة فاخرة من الورود الحمراء بتغليف أنيق يليق بأجمل المناسبات.",
    images: [{ url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85", alt: "باقة فاخرة من الورود الحمراء" }],
    category: "باقات ورد فخمة حمراء",
    tags: ["أحمر", "فاخر", "ذكرى", "حب"],
    isFeatured: true,
    available: true,
    variants: [
      { sizeName: "متوسط", priceModifier: 0 },
      { sizeName: "كبير", priceModifier: 95000 },
      { sizeName: "ملكي", priceModifier: 180000 },
    ],
    bouquetOptions: { wrappingStyles: ["تغليف فاخر", "ورق عاجي"], addCard: true },
  },
  {
    _id: "demo-crimson-velvet",
    title: "مخمل قرمزي",
    slug: "mukhmal-qirmizi",
    price: 330000,
    shortDescription: "تنسيق أحمر غني بلمسات خضراء وتغليف فاخر لافت للنظر.",
    images: [{ url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=1000&q=85", alt: "ورود حمراء بتنسيق مميز" }],
    category: "باقات ورد فخمة حمراء",
    tags: ["أحمر", "فاخر", "احتفال"],
    isFeatured: true,
    available: true,
    variants: [{ sizeName: "متوسط", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 85000 }],
    bouquetOptions: { wrappingStyles: ["تغليف فاخر", "وردي ناعم"], addCard: true },
  },
  {
    _id: "demo-white-elegance",
    title: "أناقة بيضاء",
    slug: "anaqa-bayda",
    price: 245000,
    shortDescription: "ورود بيضاء هادئة في باقة أنيقة تصلح للتهنئة واللحظات الخاصة.",
    images: [{ url: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85", alt: "باقة ورود بيضاء أنيقة" }],
    category: "باقات ورد بيضاء",
    tags: ["أبيض", "أناقة", "تهنئة"],
    isFeatured: true,
    available: true,
    variants: [{ sizeName: "صغير", priceModifier: 0 }, { sizeName: "متوسط", priceModifier: 65000 }, { sizeName: "كبير", priceModifier: 125000 }],
    bouquetOptions: { wrappingStyles: ["ورق عاجي", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-white-cloud",
    title: "غيمة من الزهور",
    slug: "ghayma-min-alzohour",
    price: 285000,
    shortDescription: "تدرجات بيضاء ناعمة وتنسيق مميز يضفي لمسة من الصفاء.",
    images: [{ url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85", alt: "تنسيق زهور بيضاء وناعمة" }],
    category: "باقات ورد بيضاء",
    tags: ["أبيض", "فاخر", "هدية"],
    isFeatured: false,
    available: true,
    variants: [{ sizeName: "متوسط", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 90000 }],
    bouquetOptions: { wrappingStyles: ["ورق عاجي", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-pink-dream",
    title: "حلم وردي",
    slug: "hulm-wardi",
    price: 235000,
    shortDescription: "باقة وردية جذابة تجمع درجات ناعمة وتفاصيل مرحة.",
    images: [{ url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85", alt: "باقة زهرية بألوان وردية متنوعة" }],
    category: "باقات ورد زهرية",
    tags: ["وردي", "عيد ميلاد", "مميز"],
    isFeatured: true,
    available: true,
    variants: [{ sizeName: "صغير", priceModifier: 0 }, { sizeName: "متوسط", priceModifier: 60000 }, { sizeName: "كبير", priceModifier: 115000 }],
    bouquetOptions: { wrappingStyles: ["وردي ناعم", "ورق عاجي", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-pink-peony",
    title: "فاونيا بيوني",
    slug: "faonia-peony",
    price: 275000,
    shortDescription: "باقة فاونيا وردية ببتلاتها الغنية وتنسيق ربيعي أنيق.",
    images: [{ url: "https://images.unsplash.com/photo-1589832331026-62c755f29214?auto=format&fit=crop&w=1000&q=85", alt: "باقة فاونيا بيوني وردية" }],
    category: "باقات ورد زهرية",
    tags: ["وردي", "ربيع", "هدية"],
    isFeatured: true,
    available: true,
    variants: [{ sizeName: "متوسط", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 85000 }],
    bouquetOptions: { wrappingStyles: ["وردي ناعم", "تغليف فاخر"], addCard: true },
  },
  {
    _id: "demo-pink-celebration",
    title: "فرحة وردية",
    slug: "farha-wardiya",
    price: 320000,
    shortDescription: "باقة زهرية وفيرة لتجعل التهاني والاحتفالات أكثر جمالًا.",
    images: [{ url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85", alt: "باقة وردية وفيرة للاحتفالات" }],
    category: "باقات ورد زهرية",
    tags: ["وردي", "احتفال", "فاخر"],
    isFeatured: false,
    available: true,
    variants: [{ sizeName: "متوسط", priceModifier: 0 }, { sizeName: "كبير", priceModifier: 100000 }],
    bouquetOptions: { wrappingStyles: ["تغليف فاخر", "وردي ناعم"], addCard: true },
  },
]

const demoCategories: Category[] = [
  { _id: "demo-category-bouquets", title: "باقات الورد", slug: "bouquets" },
  { _id: "demo-category-red", title: "باقات ورد فخمة حمراء", slug: "luxury-red" },
  { _id: "demo-category-white", title: "باقات ورد بيضاء", slug: "white" },
  { _id: "demo-category-pink", title: "باقات ورد زهرية", slug: "pink" },
]

export async function getProducts(): Promise<Product[]> {
  if (!sanityConfigured) return demoProducts
  return sanityServerClient.fetch(productsQuery)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!sanityConfigured) return demoProducts.filter((product) => product.isFeatured)
  return sanityServerClient.fetch(featuredProductsQuery)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!sanityConfigured) return demoProducts.find((product) => product.slug === slug) ?? null
  return sanityServerClient.fetch(productBySlugQuery, { slug })
}

export async function getCategories(): Promise<Category[]> {
  if (!sanityConfigured) return demoCategories
  return sanityServerClient.fetch(categoriesQuery)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    siteTitle: "ورود الجنة",
    siteDescription: "باقات ورد مختارة بعناية من قلب دمشق.",
    storeAddress: "دمشق، شارع الحمرا",
    phone: "0936305204",
    whatsappNumber: "963936305204",
  }
  if (!sanityConfigured) return fallback
  const settings = await sanityServerClient.fetch(siteSettingsQuery)
  return settings ? { ...fallback, ...settings } : fallback
}
