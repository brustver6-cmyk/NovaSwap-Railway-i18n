import { clsx } from "clsx";

export function cn(...args: any[]) {
  return clsx(args);
}

export function maskCard(card: string) {
  const digits = card.replace(/\D/g, "");
  if (digits.length < 8) return "****";
  return `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`;
}

export function formatMoney(amount: number, currency: string) {
  const nf = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
  return `${nf.format(amount)} ${currency}`;
}

export function formatDateTime(iso: string | Date) {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleString("ru-RU", { hour12: false });
}
