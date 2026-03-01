import { NextResponse } from "next/server";
import { z } from "zod";
import { COIN_CODES } from "@/lib/coins";
import { fetchPricesUsd, computePayout } from "@/lib/pricing";

const schema = z.object({
  fromCoin: z.string(),
  amountFrom: z.number().positive(),
  payoutCurrency: z.enum(["UAH","EUR","USD"]),
  markupPercent: z.number().min(0).max(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = schema.parse(body);

    if (!COIN_CODES.includes(input.fromCoin as any)) {
      return NextResponse.json({ error: "Unknown coin" }, { status: 400 });
    }

    const prices = await fetchPricesUsd(COIN_CODES as any);
    const price = (prices as any)[input.fromCoin] as number;
    if (!price || price <= 0) return NextResponse.json({ error: "Price unavailable" }, { status: 503 });

    const amountToPayout = computePayout(input.amountFrom, price, input.payoutCurrency, input.markupPercent);

    return NextResponse.json({
      amountToPayout,
      rateLockedUsd: price
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
  }
}
