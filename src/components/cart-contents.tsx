"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { getProductImage } from "@/lib/product-image"

export function CartContents() {
  const { items, total, removeItem, setQuantity } = useCart()
  const orderMessage = [
    "مرحبًا، أود تأكيد الطلب التالي:",
    ...items.map((item) => `• ${item.product.title} (${item.size}) — ${item.quantity} × ${item.unitPrice.toLocaleString("ar-SY")} ل.س${item.wrapping ? `، ${item.wrapping}` : ""}${item.cardMessage ? `، البطاقة: ${item.cardMessage}` : ""}`),
    `المجموع: ${total.toLocaleString("ar-SY")} ل.س`,
  ].join("\n")
  const whatsappUrl = `https://wa.me/963936305204?text=${encodeURIComponent(orderMessage)}`

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-[#f1e2e7] bg-white px-6 py-16 text-center">
        <p className="mb-3 text-lg font-bold text-[#563743]">سلتك ما زالت فارغة</p>
        <p className="mb-6 text-sm text-[#806b74]">تصفحي باقاتنا واختاري ما يعبّر عنك.</p>
        <Button asChild><Link href="/products">تسوقي الباقات</Link></Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.key} className="flex gap-4 rounded-3xl border border-[#f1e2e7] bg-white p-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-[#fff1f6] sm:size-28">
              <Image src={getProductImage(item.product)} alt={item.product.images?.[0]?.alt || item.product.title} fill sizes="112px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <Link href={`/products/${item.product.slug}`} className="font-bold text-[#563743] hover:text-[#9c536c]">{item.product.title}</Link>
                <p className="mt-1 text-xs text-[#8b737c]">{item.size} · {item.wrapping}</p>
                {item.cardMessage && <p className="mt-1 line-clamp-1 text-xs text-[#8b737c]">«{item.cardMessage}»</p>}
                <p className="mt-2 text-sm font-bold text-[#855164]">{(item.unitPrice * item.quantity).toLocaleString("ar-SY")} ل.س</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-full border border-[#ead9df] p-1">
                  <button type="button" onClick={() => setQuantity(item.key, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`تقليل كمية ${item.product.title}`} className="grid size-8 place-items-center rounded-full hover:bg-[#fff1f6] disabled:opacity-40"><Minus size={14} /></button>
                  <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.key, item.quantity + 1)} aria-label={`زيادة كمية ${item.product.title}`} className="grid size-8 place-items-center rounded-full hover:bg-[#fff1f6]"><Plus size={14} /></button>
                </div>
                <button type="button" onClick={() => removeItem(item.key)} aria-label={`حذف ${item.product.title} من السلة`} className="grid size-9 place-items-center rounded-full text-[#a75c75] hover:bg-[#fff1f6]"><Trash2 size={17} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-3xl border border-[#f1e2e7] bg-white p-6">
        <h2 className="mb-5 text-lg font-bold text-[#563743]">ملخص الطلب</h2>
        <div className="mb-5 flex justify-between border-b border-[#f0e2e6] pb-5 text-sm">
          <span className="text-[#806b74]">المجموع</span>
          <strong className="text-[#855164]">{total.toLocaleString("ar-SY")} ل.س</strong>
        </div>
        <p className="mb-4 text-xs leading-6 text-[#8b737c]">يتم تأكيد أجور التوصيل وموعد التسليم هاتفيًا قبل تجهيز الطلب.</p>
        <Button asChild className="w-full"><a href={whatsappUrl} target="_blank" rel="noreferrer">أكملي الطلب عبر واتساب</a></Button>
        <a href="tel:0936305204" className="mt-4 block text-center text-xs text-[#9c536c] hover:underline">أو اتصلي بنا: 0936305204</a>
      </aside>
    </div>
  )
}
