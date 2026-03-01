import Link from "next/link";
import { ShieldCheck, Zap, LifeBuoy, LockKeyhole } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Lang }) {
  const back = "/";
  const other = lang === "en" ? "ru" : "en";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/90 via-sky-500/80 to-emerald-400/70 shadow-soft" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">NovaSwap</div>
            <div className="text-[11px] opacity-70">Crypto → Card • Manual payout</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/exchange" className="opacity-90 hover:opacity-100">{t(lang,"nav_exchange")}</Link>
          <Link href="/status" className="opacity-90 hover:opacity-100">{t(lang,"nav_status")}</Link>
          <Link href="/trust" className="opacity-90 hover:opacity-100">{t(lang,"nav_trust")}</Link>
          <Link href="/support" className="opacity-90 hover:opacity-100">{t(lang,"nav_support")}</Link>
          <Link href="/admin" className="opacity-90 hover:opacity-100">{t(lang,"nav_admin")}</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Badge icon={<ShieldCheck size={14} />} text={lang==="en" ? "Clear rules" : "Прозрачные правила"} />
          <Badge icon={<LockKeyhole size={14} />} text={lang==="en" ? "Data protection" : "Защита данных"} />
          <Badge icon={<Zap size={14} />} text={lang==="en" ? "Live rates" : "Курс обновляется"} />
          <Badge icon={<LifeBuoy size={14} />} text={lang==="en" ? "Human support" : "Живая поддержка"} />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/api/lang?v=${other}&back=${encodeURIComponent(back)}`}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs hover:bg-black/40"
            title={lang==="en" ? "Switch to Russian" : "Switch to English"}
          >
            {other.toUpperCase()}
          </Link>
          <Link
            href="/exchange"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm shadow-line hover:bg-white/15"
          >
            {t(lang,"cta_start")}
          </Link>
        </div>
      </div>
    </header>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] opacity-90">
      {icon}
      {text}
    </span>
  );
}
