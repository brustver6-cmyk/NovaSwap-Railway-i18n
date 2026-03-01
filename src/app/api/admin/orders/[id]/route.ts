import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const o = await prisma.order.findUnique({ where: { id: params.id } });
  if (!o) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: o.id,
    createdAt: o.createdAt,
    status: o.status,
    fromCoin: o.fromCoin,
    network: o.network,
    amountFrom: o.amountFrom,
    payoutCurrency: o.payoutCurrency,
    amountToPayout: o.amountToPayout,
    depositAddress: o.depositAddress,
    depositMemo: o.depositMemo,
    cardNumberMask: o.cardNumberMask,
    cardHolder: o.cardHolder,
    contact: o.contact,
    adminNote: o.adminNote,
    payinTxHash: o.payinTxHash
  });
}
