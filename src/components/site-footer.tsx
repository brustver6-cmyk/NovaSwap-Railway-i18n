import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">NovaSwap</div>
            <p className="mt-2 text-xs opacity-70">
              {lang === "en"
                ? "MVP exchanger: crypto deposits and manual card payouts by an operator. All conditions are on the Trust page."
                : "MVP-обменник: приём криптовалют и ручные выплаты на карту оператором. Все условия — на странице «Доверие»."}
            </p>
          </div>

          <div className="text-xs">
            <div className="font-semibold opacity-90">{t(lang,"footer_nav")}</div>
            <div className="mt-3 grid gap-2 opacity-80">
              <Link href="/exchange">{t(lang,"nav_exchange")}</Link>
              <Link href="/status">{t(lang,"nav_status")}</Link>
              <Link href="/trust">{t(lang,"nav_trust")}</Link>
              <Link href="/support">{t(lang,"nav_support")}</Link>
            </div>
          </div>

          <div className="text-xs">
            <div className="font-semibold opacity-90">{t(lang,"footer_important")}</div>
            <div className="mt-3 grid gap-2 opacity-80">
              <Link href="/terms">{lang==="en" ? "Terms" : "Пользовательское соглашение"}</Link>
              <Link href="/aml">AML / KYC</Link>
              <Link href="/privacy">{lang==="en" ? "Privacy policy" : "Политика конфиденциальности"}</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-[11px] opacity-60">
          © {new Date().getFullYear()} NovaSwap. Demo build for MVP.
        </div>
      </div>
    </footer>
  );
}
