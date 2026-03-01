"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldCheck, Timer } from "lucide-react";

import { Card, CardBody, CardHeader, Button, Divider, Input, Pill, Select } from "@/components/ui";
import { COINS } from "@/lib/coins";

type Lang = "ru" | "en";

type NetworkItem = {
  network: string;
  label: string;
  depositAddress?: string; // ты потом подставишь свои адреса
};

type CoinItem = {
  code: string;
  name: string;
  networks?: NetworkItem[];
};

type Quote = {
  amountToPayout: number;
  rateLockedUsd: number;
  expiresAt: string; // ISO
};

type PayoutCurrency = "EUR" | "USD" | "UAH";

// helper: деньги красиво
function formatMoney(v: number, cur: PayoutCurrency) {
  const n = Number.isFinite(v) ? v : 0;
  return new Intl.NumberFormat(cur === "UAH" ? "uk-UA" : "en-US", {
    style: "currency",
    currency: cur,
    maximumFractionDigits: cur === "UAH" ? 0 : 2
  }).format(n);
}

// helper: безопасная проверка coin code
const COIN_CODES = (COINS as unknown as CoinItem[]).map((c) => c.code);
function isCoinCode(v: string): boolean {
  return COIN_CODES.includes(v);
}

export default function ExchangeClient({ lang }: { lang: Lang }) {
  const coins = useMemo(() => (COINS as unknown as CoinItem[]), []);

  const [coin, setCoin] = useState<string>(coins[0]?.code ?? "BTC");
  const [networks, setNetworks] = useState<NetworkItem[]>(coins[0]?.networks ?? []);
  const [network, setNetwork] = useState<string>((coins[0]?.networks ?? [])[0]?.network ?? "");

  const [amountFrom, setAmountFrom] = useState<string>("");
  const [payoutCurrency, setPayoutCurrency] = useState<PayoutCurrency>("EUR");

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string>("");

  const markup = Number(process.env.NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT ?? 2);

  // когда меняется coin — обновляем сети
  useEffect(() => {
    const found = coins.find((c) => c.code === coin);
    const nets = found?.networks ?? [];
    setNetworks(nets);
    setNetwork(nets[0]?.network ?? "");
    // сбрасываем расчёт, если пользователь меняет coin
    setQuote(null);
    setError("");
  }, [coin, coins]);

  function onCoinChange(v: string) {
    if (!isCoinCode(v)) return;
    setCoin(v);
  }

  function getDepositAddress() {
    const n = networks.find((x) => x.network === network);
    return n?.depositAddress || "WALLET_ADDRESS_PLACEHOLDER";
  }

  async function getQuote() {
    setError("");
    setQuote(null);

    const amount = Number(String(amountFrom).replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) {
      setError(lang === "en" ? "Enter a valid amount." : "Введи корректную сумму.");
      return;
    }
    if (!network) {
      setError(lang === "en" ? "Select a network." : "Выбери сеть.");
      return;
    }

    setLoading(true);
    try {
      // ВАЖНО: эндпоинт может отличаться в твоём проекте.
      // Если у тебя другой — скажи, и я подстрою.
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coin,
          network,
          amountFrom: amount,
          payoutCurrency
        })
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "QUOTE_FAILED");
      }

      const data = (await res.json()) as Quote;
      setQuote(data);
    } catch (e: any) {
      setError(
        lang === "en"
          ? "Failed to calculate. Try again."
          : "Не удалось рассчитать. Попробуй ещё раз."
      );
    } finally {
      setLoading(false);
    }
  }

  async function createOrder() {
    setError("");

    if (!quote) {
      setError(lang === "en" ? "Calculate first." : "Сначала нажми «Рассчитать».");
      return;
    }
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 12) {
      setError(lang === "en" ? "Enter card number." : "Введи номер карты.");
      return;
    }
    if (!cardHolder || cardHolder.length < 3) {
      setError(lang === "en" ? "Enter recipient name." : "Введи имя получателя.");
      return;
    }
    if (!contact || contact.length < 3) {
      setError(lang === "en" ? "Enter contact." : "Введи контакт (TG или Email).");
      return;
    }

    setCreating(true);
    try {
      // ВАЖНО: эндпоинт может отличаться.
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coin,
          network,
          amountFrom: Number(String(amountFrom).replace(",", ".")),
          payoutCurrency,
          cardNumber,
          cardHolder,
          contact
        })
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "ORDER_FAILED");
      }

      const data = await res.json();
      // ожидаем { id: string }
      const id = data?.id as string | undefined;
      if (!id) throw new Error("NO_ID");

      // редирект на страницу заявки
      window.location.href = `/order/${id}`;
    } catch (e: any) {
      setError(lang === "en" ? "Failed to create order." : "Не удалось создать заявку.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      <Card>
        <CardHeader
          title={lang === "en" ? "Crypto to card exchange" : "Обмен криптовалюты на карту"}
          subtitle={
            lang === "en"
              ? "Rates update automatically. Payout is processed manually by an operator."
              : "Курс обновляется автоматически. Выплата — вручную оператором."
          }
        />
        <CardBody className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs opacity-70">{lang === "en" ? "You send" : "Отдаёшь"}</div>
              <Select value={coin} onChange={(e) => onCoinChange(e.target.value)}>
                {coins.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 text-xs opacity-70">{lang === "en" ? "Network" : "Сеть"}</div>
              <Select value={network} onChange={(e) => setNetwork(e.target.value)}>
                {(networks ?? []).map((n) => (
                  <option key={n.network} value={n.network}>
                    {n.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs opacity-70">{lang === "en" ? "Amount" : "Сумма"}</div>
            <Input
              value={amountFrom}
              onChange={(e) => setAmountFrom(e.target.value)}
              placeholder={lang === "en" ? "Example: 0.05" : "Например: 0.05"}
            />
          </div>

          <div>
            <div className="mb-2 text-xs opacity-70">
              {lang === "en" ? "Payout currency" : "Получаешь на карту в"}
            </div>
            <Select value={payoutCurrency} onChange={(e) => setPayoutCurrency(e.target.value as PayoutCurrency)}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="UAH">UAH</option>
            </Select>
          </div>

          <Divider />

          <div className="grid gap-3">
            <div>
              <div className="mb-2 text-xs opacity-70">
                {lang === "en" ? "Card number (Visa/Mastercard)" : "Номер карты (Visa/Mastercard)"}
              </div>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div>
              <div className="mb-2 text-xs opacity-70">
                {lang === "en" ? "Recipient name (as on card)" : "Имя получателя (как на карте)"}
              </div>
              <Input
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder={lang === "en" ? "IVAN IVANOV" : "IVAN IVANOV"}
              />
            </div>

            <div>
              <div className="mb-2 text-xs opacity-70">
                {lang === "en" ? "Contact (Telegram or Email)" : "Контакт (Telegram или Email)"}
              </div>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={lang === "en" ? "@username or email@example.com" : "@username или email@example.com"}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Pill>
              <Timer size={14} className="mr-2 opacity-80" />
              {lang === "en" ? "rate lock 15 minutes" : "фиксация курса 15 минут"}
            </Pill>
            <Pill>
              <ShieldCheck size={14} className="mr-2 opacity-80" />
              {lang === "en" ? "statuses & tracking" : "статусы и отслеживание"}
            </Pill>
            <Pill>{lang === "en" ? `markup ${markup}%` : `маржа ${markup}%`}</Pill>
          </div>

          <div className="flex gap-3">
            <Button onClick={getQuote} disabled={loading}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> {lang === "en" ? "Calculating" : "Считаю"}
                </span>
              ) : (
                (lang === "en" ? "Calculate" : "Рассчитать")
              )}
            </Button>

            <Button className="bg-white/5" onClick={createOrder} disabled={!quote || creating}>
              {creating ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> {lang === "en" ? "Creating" : "Создаю"}
                </span>
              ) : (
                (lang === "en" ? "Create order" : "Создать заявку")
              )}
            </Button>
          </div>

          {error ? <div className="text-sm text-rose-300">{error}</div> : null}
        </CardBody>
      </Card>

      <Card className="bg-black/20">
        <CardHeader
          title={lang === "en" ? "Summary" : "Итог"}
          subtitle={
            lang === "en"
              ? "First click “Calculate”, then “Create order”."
              : "Сначала нажми «Рассчитать», потом «Создать заявку»."
          }
        />
        <CardBody className="space-y-4 text-sm opacity-85">
          {quote ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs opacity-70">{lang === "en" ? "Estimated payout" : "Примерный результат"}</div>
              <div className="mt-2 text-2xl font-semibold">{formatMoney(quote.amountToPayout, payoutCurrency)}</div>
              <div className="mt-2 text-xs opacity-70">
                {lang === "en"
                  ? `Rate: 1 ${coin} ≈ $${quote.rateLockedUsd}`
                  : `Курс: 1 ${coin} ≈ $${quote.rateLockedUsd}`}
              </div>
              <div className="mt-4 text-xs opacity-70">
                {lang === "en"
                  ? "After creating an order the rate is locked for 15 minutes. If payment doesn’t arrive, the order expires and needs recalculation."
                  : "После создания заявки курс фиксируется на 15 минут. Если оплата не поступила — заявка истечёт и понадобится пересчёт."}
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs">
                <div className="opacity-70">{lang === "en" ? "Deposit address" : "Адрес для оплаты"}</div>
                <div className="mt-1 break-all font-mono text-[12px] opacity-90">{getDepositAddress()}</div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm opacity-75">
              {lang === "en" ? "Fill the fields and click “Calculate”." : "Заполни данные и нажми «Рассчитать»."}
            </div>
          )}

          <div className="text-xs opacity-70">
            {lang === "en" ? "By using the service you agree to the " : "Используя сервис, ты соглашаешься с "}
            <Link className="underline" href="/terms">
              {lang === "en" ? "terms" : "условиями"}
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
  );
}
