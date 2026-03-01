import { getLang } from "@/lib/lang-server";
import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Sparkles, Timer, Wallet } from "lucide-react";
import { Card, CardBody, CardHeader, Button, Pill } from "@/components/ui";

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
              <Sparkles size={14} /> Современный интерфейс • Прозрачные правила
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {lang === "en" ? "NovaSwap — fast crypto to card exchange" : "NovaSwap — быстрый обмен криптовалют на карту"}
            </h1>
            <p className="mt-3 text-sm opacity-80">
              Курс обновляется автоматически, заявка фиксирует курс на короткое время, а выплаты делаются оператором вручную —
              с уведомлениями и понятными статусами.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/exchange" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm shadow-line hover:bg-white/15">
                {lang === "en" ? "Start exchange" : "Начать обмен"} <ArrowRight size={16} />
              </Link>
              <Link href="/trust" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-5 py-3 text-sm hover:bg-black/40">
                {lang === "en" ? "Why people trust us" : "Почему нам доверяют"} <ShieldCheck size={16} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill><Timer size={14} className="mr-2 opacity-80" /> фиксация курса</Pill>
              <Pill><Wallet size={14} className="mr-2 opacity-80" /> адрес + QR</Pill>
              <Pill><Globe size={14} className="mr-2 opacity-80" /> поддержка 24/7*</Pill>
            </div>

            <p className="mt-2 text-[11px] opacity-60">*Можно изменить часы работы в настройках.</p>
          </div>

          <Card className="bg-black/20">
            <CardHeader title="Быстрый старт" subtitle="Создай заявку — получи адрес — отправь крипту — получи выплату на карту." />
            <CardBody className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <div className="font-semibold">Прозрачная модель MVP</div>
                <div className="mt-1 text-xs opacity-75">
                  Мы не обещаем «магическую автоматическую выплату». Выплаты выполняются оператором вручную, чтобы снизить риск ошибок и ускорить запуск.
                </div>
              </div>
              <Link href="/exchange">
                <Button className="w-full py-3">Перейти к обмену</Button>
              </Link>
              <div className="text-[11px] opacity-65">
                Перед использованием прочитай <Link className="underline" href="/terms">условия</Link> и <Link className="underline" href="/aml">AML/KYC</Link>.
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Feature title="Автокурс" desc="Котировки обновляются, а курс фиксируется при создании заявки." icon={<Timer size={18} />} />
        <Feature title="Статусы" desc="Новая → Ожидаем оплату → Оплачено → В обработке → Выполнено." icon={<ShieldCheck size={18} />} />
        <Feature title="Поддержка" desc="Чёткие контакты и быстрые ответы по заявке." icon={<Wallet size={18} />} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="{lang === "en" ? "How it works" : "Как это работает"}" subtitle="Всё понятно даже с первого раза." />
          <CardBody>
            <ol className="list-decimal space-y-2 pl-5 text-sm opacity-85">
              <li>Выбираешь монету и сумму, вводишь карту получателя.</li>
              <li>Получаешь адрес для оплаты (и QR).</li>
              <li>Отправляешь крипту — заявка получает статус.</li>
              <li>Оператор подтверждает оплату и делает выплату на карту.</li>
              <li>Ты получаешь уведомление и статус «Выполнено».</li>
            </ol>
          </CardBody>
        </Card>

        <Card className="bg-black/20">
          <CardHeader title="Доверие" subtitle="Мы показываем правила и не скрываем процесс." />
          <CardBody className="space-y-3 text-sm opacity-85">
            <p>
              На странице «Доверие» — шаблоны документов и принципы работы: сроки, лимиты, возвраты, проверки при подозрительных операциях.
            </p>
            <div className="flex gap-3">
              <Link href="/trust"><Button>Открыть «Доверие»</Button></Link>
              <Link href="/status"><Button className="bg-white/5">Проверить заявку</Button></Link>
            </div>
            <p className="text-[11px] opacity-60">
              Не заявляй о лицензии, если её нет. В шаблонах предусмотрено поле для номера/юрисдикции — заполняется только при наличии.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="flex items-center gap-2 text-sm font-semibold">{icon} {title}</div>
      <div className="mt-2 text-sm opacity-75">{desc}</div>
    </div>
  );
}
