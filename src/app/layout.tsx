import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ورود الجنة | زهور ومحبة من قلب دمشق",
    template: "%s | ورود الجنة",
  },
  description: "باقات ورد مختارة بعناية من ورود الجنة في دمشق، شارع الحمرا. أرسلي مشاعرك بأجمل تنسيق.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "ورود الجنة | زهور ومحبة من قلب دمشق",
    description: "باقات ورد مختارة بعناية من قلب دمشق.",
    locale: "ar_SY",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
