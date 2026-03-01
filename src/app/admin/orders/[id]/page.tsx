"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Select, Pill, Divider } from "@/components/ui";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const STATUSES = ["NEW","WAITING_PAYMENT","PAID","PROCESSING","COMPLETED","CANCELED","REVIEW","EXPIRED"] as const;

function tone(status: string): "neutral"|"ok"|"warn"|"bad" {
  if (status === "COMPLETED") return "ok";
  if (status === "PAID" || status === "PROCESSING") return "warn";
  if (status === "CANCELED" || status === "EXPIRED") return "bad";
  return "neutral";
}

export default function AdminOrderPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<string>("NEW");
  const [note, setNote] = useState<string>("");
  const [tx, setTx] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function load() {
    setErr(null);
    const r = await fetch(`/api/admin/orders/${params.id}`);
    const j = await r.json();
    if (!r.ok) { setErr(j?.error || "Ошибка"); return; }
    setData(j);
    setStatus(j.status);
    setNote(j.adminNote || "");
    setTx(j.payinTxHash || "");
  }

  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true);
    setErr(null);
    try {
      const r = await fetch(`/api/admin/orders/${params.id}/status`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ status, adminNote: note, payinTxHash: tx })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Ошибка сохранения");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Ошибка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Заявка</div>
          <div className="text-xs opacity-70">{params.id}</div>
        </div>
        <Link href="/admin/orders"><Button className="bg-white/5">Назад</Button></Link>
      </div>

      <Card>
        <CardHeader title="Карточка заявки" subtitle="Меняй статус, фиксируй tx hash и заметки." />
        <CardBody className="space-y-4">
          {!data ? (
            <div className="text-sm opacity-70 inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Загружаю…</div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 items-center">
                <Pill tone={tone(data.status)}>{data.status}</Pill>
                <Pill>{data.fromCoin} • {data.network}</Pill>
                <Pill>{data.amountFrom}</Pill>
                <Pill>{formatMoney(data.amountToPayout, data.payoutCurrency)}</Pill>
              </div>

              <Divider />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  <div className="text-xs opacity-70">Адрес приёма</div>
                  <div className="mt-2 font-mono text-xs break-all">{data.depositAddress}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  <div className="text-xs opacity-70">Карта (маска)</div>
                  <div className="mt-2 font-semibold">{data.cardNumberMask}</div>
                  <div className="mt-1 text-xs opacity-70">{data.cardHolder}</div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-xs opacity-70">Статус</div>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 text-xs opacity-70">Tx hash (если есть)</div>
                  <Input value={tx} onChange={(e) => setTx(e.target.value)} placeholder="0x… / …" />
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs opacity-70">Заметка оператора</div>
                <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Например: выплата сделана 14:32" />
              </div>

              <div className="flex gap-3">
                <Button onClick={save} disabled={saving}>
                  {saving ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Сохраняю</span> : "Сохранить"}
                </Button>
                <a className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm hover:bg-black/40" href={`/order/${params.id}`} target="_blank">
                  Открыть как клиент
                </a>
              </div>

              {err ? <div className="text-sm text-rose-300">{err}</div> : null}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
