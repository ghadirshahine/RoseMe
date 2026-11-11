import type { Metadata } from "next"

import { CartContents } from "@/components/cart-contents"

export const metadata: Metadata = { title: "سلة المشتريات" }

export default function CartPage() {
  return (
    <div className="page-shell py-12 sm:py-16">
      <h1 className="serif-heading mb-8 text-4xl text-[#563743]">سلتك الجميلة</h1>
      <CartContents />
    </div>
  )
}
