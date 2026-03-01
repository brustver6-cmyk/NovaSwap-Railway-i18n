import { prisma } from "@/lib/db";
import { COINS } from "@/lib/coins";
import { Card, CardBody, CardHeader, Pill, Button, Divider } from "@/components/ui";
import { formatDateTime, formatMoney } from "@/lib/utils";
import Link from "next/link";

function tone(status: string): "neutral"|"ok"|"warn"|"bad" {
  if (status === "COMPLETED") return "ok";
  if (status === "PAID" || status === "PROCESSING") return "warn";
  if (status === "CANCELED" || status === "EXPIRED") return "bad";
  return "neutral";
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id } });
  if (!order) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card><CardHeader title="Заявка не найдена" /><CardBody><Link className="underline" href="/exchange">Создать новую</Link></CardBody></Card>
      </div>
    );
  }

  const coin = COINS.find(c => c.code === order.fromCoin);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader title={`Заявка #${order.id}`} subtitle={`Создана: ${formatDateTime(order.createdAt)}`} />
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={tone(order.status)}>{order.status}</Pill>
            <Pill>Курс зафиксирован до: {formatDateTime(order.rateExpiresAt)}</Pill>
          </div>

          <Divider />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs opacity-70">Отдаёшь</div>
              <div className="mt-1 text-lg font-semibold">{order.amountFrom} {order.fromCoin}</div>
              <div className="mt-2 text-xs opacity-70">Сеть: {order.network}</div>

              <div className="mt-4 text-xs opacity-70">Адрес для оплаты</div>
              <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs break-all">
                {order.depositAddress}
              </div>

              {order.depositMemo ? (
                <>
                  <div className="mt-4 text-xs opacity-70">Memo/Comment</div>
                  <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs break-all">
                    {order.depositMemo}
                  </div>
                </>
              ) : null}

              <div className="mt-4 text-xs opacity-70">
                Важно: отправляй только в указанной сети. Неверная сеть может привести к потере средств.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs opacity-70">Получаешь на карту</div>
              <div className="mt-1 text-lg font-semibold">{formatMoney(order.amountToPayout, order.payoutCurrency)}</div>

              <div className="mt-3 text-xs opacity-70">Статусы</div>
              <ul className="mt-2 space-y-2 text-sm opacity-85">
                <li>WAITING_PAYMENT — ждём оплату</li>
                <li>PAID — оплата подтверждена</li>
                <li>PROCESSING — выполняется выплата</li>
                <li>COMPLETED — выплата выполнена</li>
              </ul>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs opacity-80">
                После отправки крипты оператор подтверждает оплату и выполняет выплату вручную. Обычно это быстрее, чем сложная автоматизация на старте.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/status"><Button>Проверить статус</Button></Link>
            <Link href="/support"><Button className="bg-white/5">Связаться с поддержкой</Button></Link>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-black/20">
        <CardHeader title="Подсказка" subtitle="Если курс истёк — создай новую заявку." />
        <CardBody className="text-sm opacity-80">
          Если заявка перешла в EXPIRED, просто создай новую — курс пересчитается автоматически.
        </CardBody>
      </Card>
    </div>
  );
}
