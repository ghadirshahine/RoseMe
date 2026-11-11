import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpLeft, Flower2, Heart, Sparkles } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts, getSiteSettings } from "@/lib/products"
import { getImageUrl } from "@/lib/product-image"

const heroImage = "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=90"

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedProducts(), getSiteSettings()])
  const hero = settings.heroImage ? getImageUrl(settings.heroImage) : heroImage

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="page-shell grid min-h-[610px] items-center gap-8 py-10 md:grid-cols-[0.92fr_1.08fr] md:py-14">
          <div className="relative z-10 py-5 md:py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f1dce4] bg-white/70 px-4 py-2 text-xs font-medium text-[#946879]">
              <Sparkles size={14} /> من قلب دمشق.. بكل محبة
            </div>
            <h1 className="serif-heading mb-6 max-w-xl text-5xl leading-[1.3] text-[#563743] sm:text-6xl lg:text-7xl">
              لأن بعض <span className="text-[#bd718a]">المشاعر</span><br />تُهدى وردًا
            </h1>
            <p className="mb-8 max-w-md text-base leading-8 text-[#816b74] sm:text-lg">
              ننسّق لكِ أجمل الباقات لتصل محمّلة بالحب، من متجرنا في شارع الحمرا إلى قلب من تحبين.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="default" className="h-12 px-7">
                <Link href="/products">تسوقي الباقات <ArrowLeft size={17} /></Link>
              </Button>
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#805a69] hover:text-[#9c536c]">
                زوري متجرنا <ArrowUpLeft size={16} />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs text-[#9b838c]">
              <span className="flex -space-x-2 space-x-reverse">
                {["#d89aaa", "#e7c8a9", "#c68091"].map((color) => <span key={color} className="size-7 rounded-full border-2 border-[#fff8fb]" style={{ backgroundColor: color }} />)}
              </span>
              <span>كل باقة تُنسّق يدويًا بمحبة</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[610px]">
            <div className="absolute -inset-4 rounded-[45%_45%_28px_28px] border border-[#edcfda] md:-inset-6" />
            <div className="relative aspect-[0.95] overflow-hidden rounded-[45%_45%_28px_28px] bg-[#f7e6eb] shadow-[0_30px_75px_rgba(117,73,88,0.15)]">
              <Image src={hero} alt={settings.heroImage?.alt || "تنسيق زهور وردية فاتحة بألوان رقيقة"} fill priority sizes="(max-width: 768px) 90vw, 52vw" className="object-cover" />
              <div className="absolute bottom-5 right-5 left-5 flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 p-4 backdrop-blur-md">
                <div>
                  <p className="text-xs text-[#947b84]">تفاصيل من القلب</p>
                  <p className="mt-1 font-bold text-[#563743]">باقة اليوم.. لمن تحبين</p>
                </div>
                <span className="grid size-11 place-items-center rounded-full bg-[#fff1f6] text-[#a75c75]"><Heart size={20} /></span>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden size-[74px] place-items-center rounded-full bg-[#f8e9dc] text-[#b58d57] shadow-md sm:grid"><Flower2 size={32} strokeWidth={1.4} /></div>
          </div>
        </div>
        <div className="pointer-events-none absolute -left-20 top-28 size-56 rounded-full bg-[#fce8ef] blur-3xl" />
      </section>

      <section className="page-shell py-20">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest text-[#a46b7d]">اختيرت بمحبة</p>
            <h2 className="serif-heading text-3xl text-[#563743] sm:text-4xl">باقات تلامس القلب</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-bold text-[#9c536c] hover:gap-2">كل الباقات <ArrowLeft size={16} /></Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 4).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        ) : (
          <p className="rounded-3xl bg-white p-8 text-center text-sm text-[#806b74]">لا توجد باقات مميزة حاليًا. عودي قريبًا.</p>
        )}
      </section>

      <section className="bg-[#fff1f6] py-16">
        <div className="page-shell grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#a46b7d]"><Heart size={20} /></span>
            <div>
              <h2 className="serif-heading mb-2 text-2xl text-[#563743]">هدية صغيرة.. ذكرى كبيرة</h2>
              <p className="max-w-2xl text-sm leading-7 text-[#816b74]">أضيفي بطاقة بكلماتك الخاصة، واختاري التغليف الذي يشبه مناسبتك. نحن نهتم بكل تفصيل حتى تصل باقتك كما تخيلتها.</p>
            </div>
          </div>
          <Button asChild variant="outline"><Link href="/products">اختاري باقتك <ArrowLeft size={16} /></Link></Button>
        </div>
      </section>
    </>
  )
}
