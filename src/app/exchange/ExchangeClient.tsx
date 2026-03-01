"use client";

import { useMemo, useState } from "react";
import { COINS } from "@/lib/coins";
import { Card, CardBody, CardHeader, Button, Input, Select, Divider, Pill } from "@/components/ui";
import { formatMoney } from "@/lib/utils";
import { Loader2, ShieldCheck, Timer } from "lucide-react";
import Link from "next/link";

type Quote = {
  amountToPayout: number;
  rateLockedUsd: number;
};

export default function ExchangeClient({ lang }: { lang: "ru"|"en" }) {
  const [coin, setCoin] = useState(COINS[0].code);
  const networks = useMemo(() => COINS.find(c => c.code === coin)?.networks ?? [], [coin]);
  const [network, setNetwork] = useState(networks[0]?.network ?? "");
  const [amountFrom, setAmountFrom] = useState("0.01");
  const [payoutCurrency, setPayoutCurrency] = useState<"UAH"|"EUR"|"USD">("EUR");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [contact, setContact] = useState("");

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markup = 1.5;

  function onCoinChange(v: string) {
    setCoin(v);
    const n = COINS.find(c => c.code === v)?.networks ?? [];
    const nextNet = n[0]?.network ?? "";
    setNetwork(nextNet);
    setQuote(null);
  }

  async function getQuote() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromCoin: coin, amountFrom: Number(amountFrom), payoutCurrency, markupPercent: markup })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Ошибка котировки");
      setQuote({ amountToPayout: j.amountToPayout, rateLockedUsd: j.rateLockedUsd });
    } catch (e: any) {
      setError(e?.message ?? "Ошибка");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }

  async function createOrder() {
    setCreating(true);
    setError(null);
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromCoin: coin, network, amountFrom: Number(amountFrom), payoutCurrency, cardNumber, cardHolder, contact })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Ошибка создания заявки");
      window.location.href = `/order/${j.id}`;
    } catch (e: any) {
      setError(e?.message ?? "Ошибка");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      <Card>
        <CardHeader title={lang==="en" ? "Crypto to card exchange" : "Обмен криптовалюты на карту"} subtitle={lang==="en" ? "Rates update automatically. Payout is processed manually by an operator." : "Курс обновляется автоматически. Выплата — вручную оператором."} />
        <CardBody className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs opacity-70">Отдаёшь</div>
              <Select value={coin} onChange={(e) => onCoinChange(e.target.value)}>
                {COINS.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
              </Select>
            </div>
            <div>
              <div className="mb-2 text-xs opacity-70">Сеть</div>
              <Select value={network} onChange={(e) => setNetwork(e.target.value)}>
                {networks.map(n => <option key={n.network} value={n.network}>{n.label}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs opacity-70">Сумма</div>
            <Input value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)} placeholder="Например: 0.05" />
          </div>

          <div>
            <div className="mb-2 text-xs opacity-70">Получаешь на карту в</div>
            <Select value={payoutCurrency} onChange={(e) => setPayoutCurrency(e.target.value as any)}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="UAH">UAH</option>
            </Select>
          </div>

          <Divider />

          <div className="grid gap-3">
            <div>
              <div className="mb-2 text-xs opacity-70">Номер карты (Visa/Mastercard)</div>
              <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" />
            </div>
            <div>
              <div className="mb-2 text-xs opacity-70">Имя получателя (как на карте)</div>
              <Input value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="IVAN IVANOV" />
            </div>
            <div>
              <div className="mb-2 text-xs opacity-70">Контакт (Telegram или Email)</div>
              <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@username или email@example.com" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Pill><Timer size={14} className="mr-2 opacity-80" /> фиксация курса 15 минут</Pill>
            <Pill><ShieldCheck size={14} className="mr-2 opacity-80" /> статусы и уведомления</Pill>
            <Pill>маржа {markup}%</Pill>
          </div>

          <div className="flex gap-3">
            <Button onClick={getQuote} disabled={loading}>
              {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Считаю</span> : "Рассчитать"}
            </Button>
            <Button className="bg-white/5" onClick={createOrder} disabled={!quote || creating}>
              {creating ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Создаю</span> : "Создать заявку"}
            </Button>
          </div>

          {error ? <div className="text-sm text-rose-300">{error}</div> : null}
        </CardBody>
      </Card>

      <Card className="bg-black/20">
        <CardHeader title="Итог" subtitle="Сначала нажми «Рассчитать», потом «Создать заявку»." />
        <CardBody className="space-y-4 text-sm opacity-85">
          {quote ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs opacity-70">Примерный результат</div>
              <div className="mt-2 text-2xl font-semibold">{formatMoney(quote.amountToPayout, payoutCurrency)}</div>
              <div className="mt-2 text-xs opacity-70">Курс: 1 {coin} ≈ ${quote.rateLockedUsd}</div>
              <div className="mt-4 text-xs opacity-70">
                После создания заявки курс фиксируется на 15 минут. Если оплата не поступила — заявка истечёт и понадобится пересчёт.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm opacity-75">
              Заполни данные и нажми «Рассчитать».
            </div>
          )}

          <div className="text-xs opacity-70">
            Используя сервис, ты соглашаешься с <Link className="underline" href="/terms">условиями</Link> и <Link className="underline" href="/aml">AML/KYC</Link>.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
