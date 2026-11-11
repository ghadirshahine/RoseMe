import type { Metadata } from "next"

import { ProductGrid } from "@/components/product-grid"
import { getCategories, getProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "تسوقي الباقات",
  description: "اكتشفي باقات ورود الجنة المنسقة بعناية في دمشق.",
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="page-shell py-12 sm:py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-bold tracking-widest text-[#a46b7d]">زهور لكل حكاية</p>
        <h1 className="serif-heading mb-3 text-4xl text-[#563743] sm:text-5xl">تصفّحي باقاتنا</h1>
        <p className="text-sm leading-7 text-[#816b74]">اختاري ما يشبه مشاعرك، ودعينا نجهزه لكِ بكل حب.</p>
      </div>
      <ProductGrid products={products} categories={categories} />
    </div>
  )
}
