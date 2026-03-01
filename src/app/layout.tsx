import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { getLang } from "@/lib/lang-server";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "NovaSwap — быстрый обмен криптовалют",
  description: "Современный крипто-обменник с прозрачными правилами и ручными выплатами на карту."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SiteHeader lang={getLang()} />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">{children}</main>
        <SiteFooter lang={getLang()} />
      </body>
    </html>
  );
}
