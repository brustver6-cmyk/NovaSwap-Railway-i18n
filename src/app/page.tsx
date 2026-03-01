import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Sparkles, Timer, Wallet } from "lucide-react";
import { Card, CardBody, CardHeader, Button, Pill } from "@/components/ui";
import { getLang } from "@/lib/lang-server";

export default function HomePage() {
  const lang = getLang();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-emerald-400/10 p-8 shadow-soft">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] opacity-90">
              <Sparkles size={14} />
              {lang === "en"
                ? "Modern UI • Clear rules"
                : "Современный интерфейс • Прозрачные правила"}
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {lang === "en"
                ? "NovaSwap — fast crypto to card exchange"
                : "NovaSwap — быстрый обмен криптовалют на карту"}
            </h1>

            <p className="mt-3 text-sm opacity-80">
              {lang === "en"
                ? "Rates update automatically, the order locks the rate for a short time, and payouts are processed manually by an operator — with clear statuses."
                : "Курс обновляется автоматически, заявка фиксирует курс на короткое время, а выплаты делаются оператором вручную — с понятными статусами."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/exchange"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm shadow-line hover:bg-white/15"
              >
                {lang === "en" ? "Start exchange" : "Начать обмен"} <ArrowRight size={16} />
              </Link>

              <Link
                href="/trust"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-5 py-3 text-sm hover:bg-black/40"
              >
                {lang === "en" ? "Why people trust us" : "Почему нам доверяют"} <ShieldCheck size={16} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>
                <Timer size={14} className="mr-2 opacity-80" />
                {lang === "en" ? "rate lock" : "фиксация курса"}
              </Pill>
              <Pill>
                <Wallet size={14} className="mr-2 opacity-80" />
                {lang === "en" ? "address + QR" : "адрес + QR"}
              </Pill>
              <Pill>
                <Globe size={14} className="mr-2 opacity-80" />
                {lang === "en" ? "support 24/7*" : "поддержка 24/7*"}
              </Pill>
            </div>

            <p className="mt-2 text-[11px] opacity-60">
              {lang === "en" ? "*You can change support hours." : "*Можно изменить часы работы в настройках."}
            </p>
          </div>

          <Card className="bg-black/20">
            <CardHeader
              title={lang === "en" ? "Quick start" : "Быстрый старт"}
              subtitle={
                lang === "en"
                  ? "Create an order → get deposit details → send crypto → receive a card payout."
                  : "Создай заявку → получи адрес → отправь крипту → получи выплату на карту."
              }
            />
            <CardBody className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <div className="font-semibold">
                  {lang === "en" ? "Transparent MVP model" : "Прозрачная модель MVP"}
                </div>
                <div className="mt-1 text-xs opacity-75">
                  {lang === "en"
                    ? "We don’t pretend payouts are “magic auto”. Manual payouts help reduce errors and ship faster."
                    : "Мы не обещаем «магическую автоматическую выплату». Ручные выплаты снижают риск ошибок и ускоряют запуск."}
                </div>
              </div>

              <Link href="/exchange">
                <Button className="w-full py-3">
                  {lang === "en" ? "Go to exchange" : "Перейти к обмену"}
                </Button>
              </Link>

              <div className="text-[11px] opacity-65">
                {lang === "en" ? "Before use, read " : "Перед использованием прочитай "}
                <Link className="underline" href="/terms">
                  {lang === "en" ? "terms" : "условия"}
                </Link>{" "}
                {lang === "en" ? "and " : "и "}
                <Link className="underline" href="/aml">
                  AML/KYC
                </Link>
                .
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Feature
          title={lang === "en" ? "Live rates" : "Автокурс"}
          desc={lang === "en" ? "Quotes update and the rate locks on order creation." : "Котировки обновляются, а курс фиксируется при создании заявки."}
          icon={<Timer size={18} />}
        />
        <Feature
          title={lang === "en" ? "Statuses" : "Статусы"}
          desc={lang === "en" ? "New → Waiting payment → Paid → Processing → Completed." : "Новая → Ожидаем оплату → Оплачено → В обработке → Выполнено."}
          icon={<ShieldCheck size={18} />}
        />
        <Feature
          title={lang === "en" ? "Support" : "Поддержка"}
          desc={lang === "en" ? "Clear contacts and quick responses." : "Чёткие контакты и быстрые ответы по заявке."}
          icon={<Wallet size={18} />}
        />
      </section>
    </div>
  );
}

function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </div>
      <div className="mt-2 text-sm opacity-75">{desc}</div>
    </div>
  );
}
