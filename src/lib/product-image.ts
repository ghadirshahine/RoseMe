import { imageUrl } from "@/lib/sanity/image"
import type { Product, ProductImage } from "@/lib/product-types"

export function getProductImage(product: Product, index = 0) {
  const image = product.images?.[index]
  if (!image) return "/flower-placeholder.svg"
  if (image.url) return image.url
  if (image.asset?._ref) {
    return imageUrl({ _type: "image", asset: image.asset }).width(1100).fit("max").auto("format").url()
  }
  return "/flower-placeholder.svg"
}

export function getImageUrl(image?: ProductImage) {
  if (!image) return "/flower-placeholder.svg"
  if (image.url) return image.url
  if (image.asset?._ref) {
    return imageUrl({ _type: "image", asset: image.asset }).width(1800).fit("max").auto("format").url()
  }
  return "/flower-placeholder.svg"
}
