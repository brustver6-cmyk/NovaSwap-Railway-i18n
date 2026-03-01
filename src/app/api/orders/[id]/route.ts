import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: order.id,
    status: order.status,
    fromCoin: order.fromCoin,
    network: order.network,
    amountFrom: order.amountFrom,
    payoutCurrency: order.payoutCurrency,
    amountToPayout: order.amountToPayout
  });
}
