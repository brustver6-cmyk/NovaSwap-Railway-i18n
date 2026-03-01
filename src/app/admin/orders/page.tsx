import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, Pill, Button, Input } from "@/components/ui";
import { formatDateTime, formatMoney } from "@/lib/utils";

function tone(status: string): "neutral"|"ok"|"warn"|"bad" {
  if (status === "COMPLETED") return "ok";
  if (status === "PAID" || status === "PROCESSING") return "warn";
  if (status === "CANCELED" || status === "EXPIRED") return "bad";
  return "neutral";
}

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Все заявки</div>
          <div className="text-xs opacity-70">Показаны последние 200.</div>
        </div>
        <Link href="/admin"><Button className="bg-white/5">Назад</Button></Link>
      </div>

      <Card>
        <CardHeader title="Список заявок" subtitle="Поиск можно быстро добавить по контактам/статусу." />
        <CardBody className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs opacity-70">
              <tr className="border-b border-white/10">
                <th className="py-3 text-left">Время</th>
                <th className="py-3 text-left">ID</th>
                <th className="py-3 text-left">Контакт</th>
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
                  <td className="py-3 pr-3 max-w-[180px] truncate">{o.contact}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{o.amountFrom} {o.fromCoin} • {o.network}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{formatMoney(o.amountToPayout, o.payoutCurrency)}</td>
                  <td className="py-3"><Pill tone={tone(o.status)}>{o.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
