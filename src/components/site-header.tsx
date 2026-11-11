"use client"

import Link from "next/link"
import { Menu, Search, ShoppingBag, Flower2, X } from "lucide-react"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "تسوقي الورد" },
  { href: "/contact", label: "تواصلي معنا" },
]

export function SiteHeader() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#f1e2e7] bg-[#fff8fb]/95 backdrop-blur-md">
      <div className="page-shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ورود الجنة - الصفحة الرئيسية">
          <span className="grid size-10 place-items-center rounded-full bg-[#fff1f6] text-[#9c536c]">
            <Flower2 size={22} strokeWidth={1.7} />
          </span>
          <span>
            <span className="block text-lg font-bold text-[#563743]">ورود الجنة</span>
            <span className="block text-[10px] tracking-wide text-[#9b7884]">تفاصيل صغيرة.. حب كبير</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[#654c56] transition-colors hover:text-[#9c536c]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/products" className="grid size-10 place-items-center rounded-full text-[#654c56] hover:bg-[#fff1f6]" aria-label="ابحثي عن باقة">
            <Search size={19} />
          </Link>
          <Link href="/cart" className="relative grid size-10 place-items-center rounded-full text-[#654c56] hover:bg-[#fff1f6]" aria-label={`السلة، ${itemCount} منتجات`}>
            <ShoppingBag size={19} />
            {itemCount > 0 && <span className="absolute -top-0.5 -left-0.5 grid size-[18px] place-items-center rounded-full bg-[#9c536c] text-[10px] font-bold text-white">{itemCount}</span>}
          </Link>
          <button type="button" className="grid size-10 place-items-center rounded-full text-[#654c56] hover:bg-[#fff1f6] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="page-shell flex flex-col gap-1 border-t border-[#f1e2e7] py-3 md:hidden" aria-label="التنقل للجوال">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm text-[#654c56] hover:bg-[#fff1f6]">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
