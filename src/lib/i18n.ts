export type Lang = "ru" | "en";

export function normalizeLang(v?: string | null): Lang {
  return v === "en" ? "en" : "ru";
}

type Dict = Record<string, string>;

const RU: Dict = {
  nav_exchange: "Обмен",
  nav_status: "Статус",
  nav_trust: "Доверие",
  nav_support: "Поддержка",
  nav_admin: "Админ",
  cta_start: "Начать обмен",
  footer_nav: "Навигация",
  footer_important: "Важно",
  support_title: "Поддержка",
  support_subtitle: "Напиши — мы подскажем по статусу заявки и оплате.",
  status_title: "Проверка статуса заявки",
  status_subtitle: "Введи ID заявки (как в ссылке /order/...).",
  exchange_title: "Обмен криптовалюты на карту",
  exchange_subtitle: "Курс обновляется автоматически. Выплата — вручную оператором."
};

const EN: Dict = {
  nav_exchange: "Exchange",
  nav_status: "Status",
  nav_trust: "Trust",
  nav_support: "Support",
  nav_admin: "Admin",
  cta_start: "Start exchange",
  footer_nav: "Navigation",
  footer_important: "Important",
  support_title: "Support",
  support_subtitle: "Message us — we’ll help with your order status and payment.",
  status_title: "Check order status",
  status_subtitle: "Enter the order ID (from /order/...).",
  exchange_title: "Crypto to card exchange",
  exchange_subtitle: "Rates update automatically. Payout is processed manually by an operator."
};

export function t(lang: Lang, key: keyof typeof RU) {
  const dict = lang === "en" ? EN : RU;
  return dict[key] ?? (RU as any)[key] ?? key;
}
