"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ShoppingBag } from "lucide-react"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { getProductImage } from "@/lib/product-image"
import type { Product } from "@/lib/product-types"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const image = getProductImage(product)
  const firstVariant = product.variants?.[0]
  const price = firstVariant?.priceOverride ?? product.price + (firstVariant?.priceModifier ?? 0)

  function addToCart() {
    addItem({
      product,
      size: firstVariant?.sizeName ?? "قياسي",
      wrapping: product.bouquetOptions?.wrappingStyles?.[0] ?? "تغليف أنيق",
      cardMessage: "",
      unitPrice: price,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article className="group overflow-hidden rounded-[26px] border border-[#f0e2e6] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(117,73,88,0.11)]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/4.2] overflow-hidden bg-[#fff1f6]" aria-label={`عرض ${product.title}`}>
        <Image src={image} alt={product.images?.[0]?.alt || product.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.isFeatured && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#9c536c] backdrop-blur">اختيارنا</span>}
      </Link>
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className="mb-1 text-[11px] text-[#a38891]">{product.category ?? "تنسيق يدوي"}</p>
            <Link href={`/products/${product.slug}`} className="font-bold text-[#503b44] hover:text-[#9c536c]">{product.title}</Link>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-[#855164]">{price.toLocaleString("ar-SY")} ل.س</span>
        </div>
        <p className="mb-4 line-clamp-2 min-h-10 text-xs leading-5 text-[#8b737c]">{product.shortDescription}</p>
        <Button size="sm" variant="outline" className="w-full" onClick={addToCart} aria-live="polite">
          {added ? <><Check size={15} /> أضيفت للسلة</> : <><ShoppingBag size={15} /> أضيفي للسلة</>}
        </Button>
      </div>
    </article>
  )
}
