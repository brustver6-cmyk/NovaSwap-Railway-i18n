import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { COINS } from "@/lib/coins";
import { fetchPricesUsd, computePayout } from "@/lib/pricing";
import { maskCard } from "@/lib/utils";

const schema = z.object({
  fromCoin: z.string(),
  network: z.string(),
  amountFrom: z.number().positive(),
  payoutCurrency: z.enum(["UAH","EUR","USD"]),
  cardNumber: z.string().min(8),
  cardHolder: z.string().min(2),
  contact: z.string().min(2)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = schema.parse(body);

    const coin = COINS.find(c => c.code === input.fromCoin);
    if (!coin) return NextResponse.json({ error: "Unknown coin" }, { status: 400 });

    const net = coin.networks.find(n => n.network === input.network);
    if (!net) return NextResponse.json({ error: "Unknown network" }, { status: 400 });

    const markup = Number(process.env.DEFAULT_MARKUP_PERCENT || "1.5");
    const lockMin = Number(process.env.ORDER_RATE_LOCK_MINUTES || "15");

    const prices = await fetchPricesUsd(COINS.map(c => c.code) as any);
    const priceUsd = (prices as any)[input.fromCoin] as number;
    if (!priceUsd || priceUsd <= 0) return NextResponse.json({ error: "Price unavailable" }, { status: 503 });

    const amountToPayout = computePayout(input.amountFrom, priceUsd, input.payoutCurrency, markup);

    const now = new Date();
    const rateExpiresAt = new Date(now.getTime() + lockMin * 60 * 1000);

    const order = await prisma.order.create({
      data: {
        fromCoin: input.fromCoin,
        network: input.network,
        amountFrom: input.amountFrom,
        payoutCurrency: input.payoutCurrency,
        amountToPayout,
        rateLockedUsd: priceUsd,
        markupPercent: markup,
        rateExpiresAt,
        depositAddress: net.depositAddress,
        depositMemo: "",
        cardNumberMask: maskCard(input.cardNumber),
        cardHolder: input.cardHolder,
        contact: input.contact,
        status: "WAITING_PAYMENT"
      }
    });

    return NextResponse.json({ id: order.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
  }
}
