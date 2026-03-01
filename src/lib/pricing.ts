import type { CoinCode } from "./coins";

const CG_IDS: Record<CoinCode, string> = {
  BTC: "bitcoin",
  USDT: "tether",
  TRX: "tron",
  LTC: "litecoin",
  ETH: "ethereum",
  TON: "the-open-network",
  NOT: "notcoin",
  SOL: "solana",
  DOGE: "dogecoin"
};

export type PayoutCurrency = "UAH" | "EUR" | "USD";

export async function fetchPricesUsd(codes: CoinCode[]) {
  const ids = codes.map(c => CG_IDS[c]).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch prices");
  const j = await r.json();

  const prices: Record<CoinCode, number> = {} as any;
  for (const c of codes) {
    const id = CG_IDS[c];
    const p = j?.[id]?.usd;
    prices[c] = typeof p === "number" && p > 0 ? p : 0;
  }
  // USDT should be ~1; keep fetched but ensure fallback
  if (!prices.USDT) prices.USDT = 1;
  return prices;
}

// MVP FX: fixed approximations; replace with real FX provider later
const FX: Record<PayoutCurrency, number> = {
  USD: 1,
  EUR: 0.92,
  UAH: 40
};

export function computePayout(amountFrom: number, priceUsd: number, payoutCurrency: PayoutCurrency, markupPercent: number) {
  const amountFiatRaw = amountFrom * priceUsd * FX[payoutCurrency];
  const amountFiat = amountFiatRaw * (1 - markupPercent / 100);
  return Math.round(amountFiat * 100) / 100;
}
