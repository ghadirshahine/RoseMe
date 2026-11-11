"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useMemo, useState } from "react"

import { ProductCard } from "@/components/product-card"
import type { Category, Product } from "@/lib/product-types"

export function ProductGrid({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("الكل")
  const [tag, setTag] = useState("الكل")
  const [priceLimit, setPriceLimit] = useState("all")
  const [sort, setSort] = useState("featured")

  const tags = useMemo(
    () => [...new Set(products.flatMap((product) => product.tags ?? []))],
    [products],
  )
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = `${product.title} ${product.shortDescription ?? ""} ${(product.tags ?? []).join(" ")}`
        .toLocaleLowerCase("ar")
        .includes(query.trim().toLocaleLowerCase("ar"))
      const matchesCategory = category === "الكل" || product.category === category
      const matchesTag = tag === "الكل" || (product.tags ?? []).includes(tag)
      const matchesPrice = priceLimit === "all" || product.price <= Number(priceLimit)
      return matchesQuery && matchesCategory && matchesTag && matchesPrice
    })
    if (sort === "low") filtered.sort((a, b) => a.price - b.price)
    if (sort === "high") filtered.sort((a, b) => b.price - a.price)
    return filtered
  }, [products, query, category, tag, priceLimit, sort])

  return (
    <div>
      <div className="mb-7 grid gap-3 rounded-3xl border border-[#f1e2e7] bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <label className="flex h-11 items-center gap-3 rounded-full bg-[#fff8fb] px-4 text-[#987985]">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">ابحثي عن باقة</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحثي باسم الباقة أو المناسبة..." className="w-full bg-transparent text-sm text-[#3b2f2f] outline-none placeholder:text-[#b49ea6]" />
        </label>
        <label className="flex h-11 items-center gap-2 rounded-full bg-[#fff8fb] px-4 text-xs text-[#806b74]">
          <SlidersHorizontal size={15} aria-hidden="true" />
          <span>الترتيب:</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent font-bold outline-none">
            <option value="featured">الأجمل أولًا</option>
            <option value="low">السعر: الأقل</option>
            <option value="high">السعر: الأعلى</option>
          </select>
        </label>
      </div>
      <div className="mb-7 flex flex-wrap items-center gap-2" aria-label="خيارات الفلترة">
        {["الكل", ...categories.map((item) => item.title)].map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-4 py-2 text-xs transition-colors ${category === item ? "border-[#9c536c] bg-[#9c536c] text-white" : "border-[#ead9df] bg-white text-[#795c67] hover:border-[#d8a9b8]"}`}>
            {item}
          </button>
        ))}
        {tags.length > 0 && (
          <label className="mr-auto flex h-9 items-center gap-2 rounded-full border border-[#ead9df] bg-white px-3 text-xs text-[#795c67]">
            المناسبة / اللون
            <select value={tag} onChange={(event) => setTag(event.target.value)} className="bg-transparent font-bold outline-none">
              <option value="الكل">الكل</option>
              {tags.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        )}
        <label className="flex h-9 items-center gap-2 rounded-full border border-[#ead9df] bg-white px-3 text-xs text-[#795c67]">
          السعر
          <select value={priceLimit} onChange={(event) => setPriceLimit(event.target.value)} className="bg-transparent font-bold outline-none">
            <option value="all">كل الأسعار</option>
            <option value="200000">حتى 200,000 ل.س</option>
            <option value="250000">حتى 250,000 ل.س</option>
            <option value="350000">حتى 350,000 ل.س</option>
            <option value="500000">حتى 500,000 ل.س</option>
          </select>
        </label>
      </div>
      {visibleProducts.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      ) : (
        <div className="rounded-3xl bg-white px-6 py-16 text-center text-sm text-[#806b74]">لم نعثر على باقة بهذا الوصف. جرّبي كلمة أخرى.</div>
      )}
    </div>
  )
}
