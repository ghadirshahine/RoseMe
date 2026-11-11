"use client"

import Image from "next/image"
import { useState } from "react"

import { getProductImage } from "@/lib/product-image"
import type { Product } from "@/lib/product-types"

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = product.images?.length ? product.images : [{}]

  return (
    <div>
      <div className="relative aspect-[0.95] overflow-hidden rounded-[32px] bg-[#fff1f6]">
        <Image src={getProductImage(product, activeIndex)} alt={images[activeIndex]?.alt || product.title} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2" aria-label="صور المنتج">
          {images.map((image, index) => (
            <button key={image._key ?? index} type="button" onClick={() => setActiveIndex(index)} aria-label={`عرض الصورة ${index + 1}`} aria-pressed={activeIndex === index} className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 ${activeIndex === index ? "border-[#9c536c]" : "border-transparent"}`}>
              <Image src={getProductImage(product, index)} alt={image.alt || `${product.title} ${index + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
