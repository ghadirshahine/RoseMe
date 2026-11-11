import { groq } from "next-sanity"

const productFields = `
  _id,
  title,
  "slug": slug.current,
  price,
  shortDescription,
  "images": images[]{_key, alt, asset},
  "category": category->title,
  tags,
  isFeatured,
  available,
  stock,
  variants[]{_key, sizeName, priceModifier, priceOverride},
  bouquetOptions{wrappingStyles, addCard},
  body,
  seo{metaTitle, metaDescription, ogImage}
`

export const productsQuery = groq`*[_type == "product" && available == true] | order(isFeatured desc, _createdAt desc) {${productFields}}`
export const featuredProductsQuery = groq`*[_type == "product" && available == true && isFeatured == true] | order(_createdAt desc)[0...8] {${productFields}}`
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug && available == true][0] {${productFields}}`
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {_id, title, "slug": slug.current, description, image{alt, asset}}`
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {siteTitle, siteDescription, storeAddress, phone, heroImage{alt, asset}, colors, contactEmail, whatsappNumber}`
