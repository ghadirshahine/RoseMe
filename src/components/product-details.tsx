"use client"

import { Check, MessageCircle, Phone, ShoppingBag } from "lucide-react"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/product-types"

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart()
  const variants = product.variants?.length
    ? product.variants
    : [{ sizeName: "قياسي", priceModifier: 0 }]
  const wrappingStyles = product.bouquetOptions?.wrappingStyles?.length
    ? product.bouquetOptions.wrappingStyles
    : ["ورق عاجي", "وردي ناعم", "تغليف فاخر"]
  const [size, setSize] = useState(variants[0].sizeName)
  const [wrapping, setWrapping] = useState(wrappingStyles[0])
  const [cardMessage, setCardMessage] = useState("")
  const [status, setStatus] = useState("")
  const selectedVariant = variants.find((variant) => variant.sizeName === size) ?? variants[0]
  const price = selectedVariant.priceOverride ?? product.price + (selectedVariant.priceModifier ?? 0)

  function makeOrderMessage() {
    return [
      `مرحبًا، أود طلب باقة «${product.title}».`,
      `الحجم: ${size}`,
      `التغليف: ${wrapping}`,
      cardMessage ? `رسالة البطاقة: ${cardMessage}` : "",
      `السعر: ${price.toLocaleString("ar-SY")} ل.س`,
    ].filter(Boolean).join("\n")
  }

  function orderOnWhatsApp() {
    window.open(`https://wa.me/963936305204?text=${encodeURIComponent(makeOrderMessage())}`, "_blank", "noopener,noreferrer")
  }

  function addToCart() {
    addItem({ product, size, wrapping, cardMessage, unitPrice: price })
    setStatus("أضيفت الباقة إلى سلتك.")
    window.setTimeout(() => setStatus(""), 2500)
  }

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-[#563743]">اختاري الحجم</legend>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button key={variant._key ?? variant.sizeName} type="button" onClick={() => setSize(variant.sizeName)} aria-pressed={size === variant.sizeName} className={`min-w-20 rounded-full border px-4 py-2.5 text-sm transition ${size === variant.sizeName ? "border-[#9c536c] bg-[#fff1f6] font-bold text-[#855164]" : "border-[#ead9df] bg-white text-[#806b74]"}`}>
              {variant.sizeName}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-3 block text-sm font-bold text-[#563743]">التغليف</span>
        <select value={wrapping} onChange={(event) => setWrapping(event.target.value)} className="h-12 w-full rounded-2xl border border-[#ead9df] bg-white px-4 text-sm text-[#654c56]">
          {wrappingStyles.map((style) => <option key={style}>{style}</option>)}
        </select>
      </label>
      {product.bouquetOptions?.addCard !== false && (
        <label className="block">
          <span className="mb-3 block text-sm font-bold text-[#563743]">كلماتك على البطاقة <span className="font-normal text-[#9b838c]">(اختياري)</span></span>
          <textarea value={cardMessage} onChange={(event) => setCardMessage(event.target.value)} maxLength={180} rows={3} placeholder="اكتبي رسالة قصيرة لمن تحبين..." className="w-full resize-y rounded-2xl border border-[#ead9df] bg-white px-4 py-3 text-sm leading-6 text-[#654c56] placeholder:text-[#b49ea6]" />
          <span className="mt-1 block text-left text-[11px] text-[#9b838c]" dir="ltr">{cardMessage.length}/180</span>
        </label>
      )}
      <div className="flex items-center justify-between border-t border-[#f0e2e6] pt-5">
        <span className="text-sm text-[#806b74]">السعر حسب الحجم</span>
        <span className="text-xl font-bold text-[#855164]">{price.toLocaleString("ar-SY")} ل.س</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button onClick={addToCart}><ShoppingBag size={17} /> أضيفي للسلة</Button>
        <Button variant="outline" onClick={orderOnWhatsApp}><MessageCircle size={17} /> اطلبي عبر واتساب</Button>
      </div>
      <a href="tel:0936305204" className="flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-[#805a69] hover:bg-[#fff1f6]"><Phone size={16} /> اتصلي بنا: <span dir="ltr">0936305204</span></a>
      <p className="min-h-5 text-center text-sm font-medium text-[#46735c]" role="status">{status && <><Check size={15} className="ml-1 inline" />{status}</>}</p>
    </div>
  )
}
