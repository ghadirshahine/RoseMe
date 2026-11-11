import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"

import { ProductDetails } from "@/components/product-details"
import { ProductGallery } from "@/components/product-gallery"
import { getProductImage } from "@/lib/product-image"
import { getProductBySlug } from "@/lib/products"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "المنتج غير موجود" }
  return {
    title: product.seo?.metaTitle || product.title,
    description: product.seo?.metaDescription || product.shortDescription,
    openGraph: {
      title: product.seo?.metaTitle || product.title,
      description: product.seo?.metaDescription || product.shortDescription,
      images: [getProductImage(product)],
      type: "website",
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const priceCurrency = "SYP"

  return (
    <div className="page-shell py-10 sm:py-14">
      <div className="mb-8 text-sm text-[#967d86]"><Link href="/products" className="hover:text-[#9c536c]">الباقات</Link> <span aria-hidden="true">/</span> <span className="text-[#563743]">{product.title}</span></div>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <ProductGallery product={product} />
        <section>
          <p className="mb-3 text-xs font-bold tracking-widest text-[#a46b7d]">{product.category || "تنسيق يدوي"}</p>
          <h1 className="serif-heading mb-4 text-4xl text-[#563743] sm:text-5xl">{product.title}</h1>
          <p className="mb-5 text-base leading-8 text-[#816b74]">{product.shortDescription}</p>
          <p className="mb-7 text-2xl font-bold text-[#855164]">{product.price.toLocaleString("ar-SY")} ل.س</p>
          <ProductDetails product={product} />
          {product.body && product.body.length > 0 && (
            <div className="mt-8 border-t border-[#f0e2e6] pt-6 text-sm leading-8 text-[#816b74]">
              <h2 className="mb-3 font-bold text-[#563743]">عن هذه الباقة</h2>
              <PortableText value={product.body as never} />
            </div>
          )}
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.seo?.metaDescription || product.shortDescription || "",
        image: product.images.map((_, index) => getProductImage(product, index)),
        offers: { "@type": "Offer", price: product.price, priceCurrency, availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
      }).replace(/</g, "\\u003c") }} />
    </div>
  )
}
