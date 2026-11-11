"use client"

import { useState, type FormEvent } from "react"

export function ContactForm() {
  const [message, setMessage] = useState("")

  function sendToWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = [
      `مرحبًا، أنا ${formData.get("name")}.`,
      `رقم التواصل: ${formData.get("phone")}`,
      `رسالتي: ${formData.get("message")}`,
    ].join("\n")
    window.open(`https://wa.me/963936305204?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    setMessage("تم فتح واتساب لإرسال رسالتك. أكملي الإرسال من التطبيق.")
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={sendToWhatsApp} className="space-y-4 rounded-3xl border border-[#f1e2e7] bg-white p-6 sm:p-8">
      <label className="block text-sm font-bold text-[#563743]">الاسم
        <input name="name" required maxLength={80} className="mt-2 h-12 w-full rounded-xl border border-[#ead9df] px-4 font-normal" placeholder="اسمك الكريم" />
      </label>
      <label className="block text-sm font-bold text-[#563743]">رقم الهاتف
        <input name="phone" type="tel" required maxLength={30} className="mt-2 h-12 w-full rounded-xl border border-[#ead9df] px-4 font-normal" placeholder="09xxxxxxxx" dir="ltr" />
      </label>
      <label className="block text-sm font-bold text-[#563743]">رسالتك
        <textarea name="message" required maxLength={1000} rows={4} className="mt-2 w-full rounded-xl border border-[#ead9df] px-4 py-3 font-normal leading-6" placeholder="كيف يمكننا مساعدتك؟" />
      </label>
      <p className="text-xs leading-6 text-[#927b83]">سيُفتح واتساب برسالتك الجاهزة؛ لا يتم إرسال البيانات أو تخزينها على الموقع.</p>
      <button type="submit" className="h-11 w-full rounded-full bg-[#9c536c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#82445a]">أرسلي عبر واتساب</button>
      <p role="status" className="min-h-5 text-center text-xs text-[#46735c]">{message}</p>
    </form>
  )
}
