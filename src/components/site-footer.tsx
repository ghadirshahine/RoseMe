import Link from "next/link"
import { Flower2, MapPin, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[#f0e2e6] bg-[#fff3f7]">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-3 inline-flex items-center gap-2 text-lg font-bold text-[#563743]">
            <Flower2 size={22} className="text-[#9c536c]" /> ورود الجنة
          </Link>
          <p className="max-w-sm text-sm leading-7 text-[#785f68]">نختار أجمل الزهور وننسقها بمحبة، لتصل مشاعركم كما هي.. رقيقة وصادقة.</p>
        </div>
        <div>
          <h2 className="mb-4 font-bold text-[#563743]">روابط سريعة</h2>
          <div className="flex flex-col gap-3 text-sm text-[#785f68]">
            <Link href="/products" className="hover:text-[#9c536c]">تسوقي الورد</Link>
            <Link href="/contact" className="hover:text-[#9c536c]">التواصل وموقعنا</Link>
            <Link href="/cart" className="hover:text-[#9c536c]">سلة المشتريات</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-bold text-[#563743]">يسعدنا زيارتكم</h2>
          <p className="mb-3 flex items-start gap-2 text-sm leading-6 text-[#785f68]"><MapPin size={17} className="mt-1 shrink-0 text-[#9c536c]" /> دمشق، شارع الحمرا</p>
          <a href="tel:0936305204" className="flex items-center gap-2 text-sm text-[#785f68] hover:text-[#9c536c]" dir="ltr"><Phone size={16} /> 0936305204</a>
          <a href="https://wa.me/963936305204" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-[#9c536c] underline underline-offset-4">اطلبي عبر واتساب</a>
        </div>
      </div>
      <div className="border-t border-[#f0e2e6] py-4 text-center text-xs text-[#927b83]">© {new Date().getFullYear()} ورود الجنة — دمشق</div>
    </footer>
  )
}
