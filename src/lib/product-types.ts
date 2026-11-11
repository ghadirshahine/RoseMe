export type ProductImage = {
  _key?: string
  alt?: string
  asset?: { _ref?: string; _id?: string; url?: string }
  url?: string
}

export type ProductVariant = {
  _key?: string
  sizeName: string
  priceModifier?: number
  priceOverride?: number
}

export type Product = {
  _id: string
  title: string
  slug: string
  price: number
  shortDescription?: string
  images: ProductImage[]
  category?: string
  tags?: string[]
  isFeatured?: boolean
  available?: boolean
  stock?: number
  variants?: ProductVariant[]
  bouquetOptions?: { wrappingStyles?: string[]; addCard?: boolean }
  body?: unknown[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export type Category = {
  _id: string
  title: string
  slug: string
  description?: string
}

export type SiteSettings = {
  siteTitle: string
  siteDescription: string
  storeAddress: string
  phone: string
  heroImage?: ProductImage
  whatsappNumber: string
}
