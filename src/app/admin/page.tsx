import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, Pill, Button } from "@/components/ui";
import { formatDateTime, formatMoney } from "@/lib/utils";

function tone(status: string): "neutral"|"ok"|"warn"|"bad" {
  if (status === "COMPLETED") return "ok";
  if (status === "PAID" || status === "PROCESSING") return "warn";
  if (status === "CANCELED" || status === "EXPIRED") return "bad";
  return "neutral";
}

export default async function AdminHome() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 30 });

  const today = new Date();
  today.setHours(0,0,0,0);
  const todayCount = await prisma.order.count({ where: { createdAt: { gte: today } } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Админ-панель</div>
          <div className="text-xs opacity-70">Заявок сегодня: {todayCount}. Последние 30 — ниже.</div>
        </div>
        <Link href="/admin/orders">
          <Button>Все заявки</Button>
        </Link>
      </div>

      <Card>
        <CardHeader title="Последние заявки" subtitle="Кликни, чтобы открыть карточку и изменить статус." />
        <CardBody className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs opacity-70">
              <tr className="border-b border-white/10">
                <th className="py-3 text-left">Время</th>
                <th className="py-3 text-left">ID</th>
                <th className="py-3 text-left">Отдаёт</th>
                <th className="py-3 text-left">Получает</th>
                <th className="py-3 text-left">Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 pr-3 whitespace-nowrap">{formatDateTime(o.createdAt)}</td>
                  <td className="py-3 pr-3">
                    <Link className="underline" href={`/admin/orders/${o.id}`}>{o.id.slice(0, 10)}…</Link>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">{o.amountFrom} {o.fromCoin}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{formatMoney(o.amountToPayout, o.payoutCurrency)}</td>
                  <td className="py-3">
                    <Pill tone={tone(o.status)}>{o.status}</Pill>
                  </td>
                </tr>
              ))}
              {orders.length === 0 ? (
                <tr><td className="py-6 text-sm opacity-70" colSpan={5}>Пока нет заявок.</td></tr>
              ) : null}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
