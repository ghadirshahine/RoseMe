import type { Metadata } from "next"
import { Clock3, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "تواصلي معنا",
  description: "زوري ورود الجنة في دمشق، شارع الحمرا، أو تواصلي معنا عبر الهاتف وواتساب.",
}

export default function ContactPage() {
  return (
    <div className="page-shell py-12 sm:py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-bold tracking-widest text-[#a46b7d]">نحن بالقرب منك</p>
        <h1 className="serif-heading mb-3 text-4xl text-[#563743] sm:text-5xl">يسعدنا تواصلك</h1>
        <p className="text-sm leading-7 text-[#816b74]">لأي استفسار أو طلب خاص، نحن هنا بكل محبة.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <div className="mb-6 space-y-5 rounded-3xl border border-[#f1e2e7] bg-white p-6 sm:p-8">
            <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fff1f6] text-[#9c536c]"><MapPin size={19} /></span><div><h2 className="font-bold text-[#563743]">عنوان المتجر</h2><p className="mt-1 text-sm leading-6 text-[#806b74]">دمشق، شارع الحمرا</p></div></div>
            <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fff1f6] text-[#9c536c]"><Phone size={19} /></span><div><h2 className="font-bold text-[#563743]">اتصلي بنا</h2><a href="tel:0936305204" className="mt-1 inline-block text-sm text-[#806b74] hover:text-[#9c536c]" dir="ltr">0936305204</a></div></div>
            <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fff1f6] text-[#9c536c]"><Clock3 size={19} /></span><div><h2 className="font-bold text-[#563743]">أوقات العمل</h2><p className="mt-1 text-sm leading-6 text-[#806b74]">يرجى التواصل هاتفيًا لمعرفة أوقات العمل والتوصيل.</p></div></div>
            <a href="https://maps.google.com/?q=Al+Hamra+Street+Damascus+Syria" target="_blank" rel="noreferrer" className="inline-block text-sm font-bold text-[#9c536c] underline underline-offset-4">افتحي الموقع على الخريطة</a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#f1e2e7] bg-[#f6f0ee]">
            <iframe title="خريطة شارع الحمرا في دمشق" src="https://maps.google.com/maps?q=Al%20Hamra%20Street%2C%20Damascus%2C%20Syria&t=&z=14&ie=UTF8&iwloc=&output=embed" className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-bold text-[#563743]">اكتبي لنا</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  )
}
