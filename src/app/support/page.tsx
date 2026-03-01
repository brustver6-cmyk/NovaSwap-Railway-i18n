import { Card, CardBody, CardHeader } from "@/components/ui";
import { getLang } from "@/lib/lang-server";

export default function SupportPage() {
  const lang = getLang();
  const tg = process.env.SUPPORT_TELEGRAM || "@novaswap_support";
  const email = process.env.SUPPORT_EMAIL || "support@example.com";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader
          title={lang === "en" ? "Support" : "Поддержка"}
          subtitle={lang === "en" ? "Message us — we’ll help with your order status and payment." : "Напиши — мы подскажем по статусу заявки и оплате."}
        />
        <CardBody className="space-y-3 text-sm opacity-85">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs opacity-70">Telegram</div>
            <div className="mt-1 font-semibold">{tg}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs opacity-70">Email</div>
            <div className="mt-1 font-semibold">{email}</div>
          </div>
          <div className="text-xs opacity-70">
            {lang === "en"
              ? "When contacting support, include your order ID (from /order/...)."
              : "При обращении укажи ID заявки (из ссылки /order/...). Это ускорит ответ."}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
