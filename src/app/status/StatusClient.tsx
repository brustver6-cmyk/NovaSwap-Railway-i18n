"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Pill } from "@/components/ui";
import Link from "next/link";

export default function StatusClient({ lang }: { lang: "ru"|"en" }) {
  const [id, setId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    setErr(null);
    setResult(null);
    try {
      const r = await fetch(`/api/orders/${encodeURIComponent(id)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Не найдено");
      setResult(j);
    } catch (e: any) {
      setErr(e?.message ?? "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader title={lang==="en" ? "Check order status" : "Проверка статуса заявки"} subtitle={lang==="en" ? "Enter the order ID (from /order/...)." : "Введи ID заявки (как в ссылке /order/...)."}/>
        <CardBody className="space-y-4">
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder={lang==="en" ? "order id..." : "cuid..."} />
          <div className="flex gap-3">
            <Button onClick={check} disabled={loading || !id.trim()}>{lang==="en" ? "Check" : "Проверить"}</Button>
            <Link href="/exchange"><Button className="bg-white/5">{lang==="en" ? "New order" : "Новая заявка"}</Button></Link>
          </div>
          {err ? <div className="text-sm text-rose-300">{err}</div> : null}
        </CardBody>
      </Card>

      {result ? (
        <Card className="bg-black/20">
          <CardHeader title={`Заявка #${result.id}`} subtitle={`Статус: ${result.status}`} />
          <CardBody className="space-y-3 text-sm opacity-85">
            <div className="flex flex-wrap gap-2">
              <Pill>{result.fromCoin} • {result.network}</Pill>
              <Pill>{result.amountFrom}</Pill>
              <Pill>{result.amountToPayout} {result.payoutCurrency}</Pill>
            </div>
            <div className="text-xs opacity-70">Если нужна помощь — напиши в поддержку.</div>
            <Link href={`/order/${result.id}`} className="underline text-sm">{lang==="en" ? "Open order page" : "Открыть страницу заявки"}</Link>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
