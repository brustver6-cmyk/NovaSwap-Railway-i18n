import { getLang } from "@/lib/lang-server";
import { Card, CardBody, CardHeader, Pill, Divider } from "@/components/ui";
import Link from "next/link";

export default function TrustPage() {
  const lang = getLang();
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader
          title={lang==="en" ? "Trust & transparency" : "Доверие и прозрачность"}
          subtitle={lang==="en" ? "A page that explains the process step by step." : "Страница, которая помогает пользователю понять, что происходит на каждом шаге."}
        />
        <CardBody className="space-y-4 text-sm opacity-85">
          <div className="flex flex-wrap gap-2">
            <Pill>Понятные статусы</Pill>
            <Pill>Прозрачные правила</Pill>
            <Pill>Проверки при рисках</Pill>
            <Pill>Поддержка</Pill>
          </div>

          <Divider />

          <div className="space-y-2">
            <div className="font-semibold">1) Как мы работаем</div>
            <ul className="list-disc pl-5 space-y-1 opacity-85">
              <li>Курс обновляется автоматически и фиксируется на ограниченное время.</li>
              <li>Оплата принимается только в выбранной сети.</li>
              <li>Выплата на карту выполняется оператором вручную.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">2) Сроки</div>
            <p className="opacity-85">
              MVP-формат предполагает ручную обработку. Среднее время зависит от загруженности и может быть указано в поддержке.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">3) AML/KYC</div>
            <p className="opacity-85">
              При подозрительных операциях мы можем запросить подтверждение происхождения средств или личности. Подробности — на странице{" "}
              <Link className="underline" href="/aml">AML/KYC</Link>.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">4) Лицензии и юрисдикция</div>
            <p className="opacity-85">
              Если у сервиса есть лицензия — укажи номер и юрисдикцию здесь. Если лицензии нет, лучше честно написать «лицензирование в процессе» или
              вовсе убрать этот блок, чтобы не вводить людей в заблуждение.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs opacity-80">
              Поле для заполнения владельцем сайта: <br />
              • Юрисдикция: ________ <br />
              • Номер лицензии/регистрации (если есть): ________ <br />
              • Контакт компании: ________
            </div>
          </div>

          <Divider />

          <div className="text-xs opacity-70">
            Хочешь повысить доверие быстро? Добавь реальные контакты, Telegram поддержки, понятные сроки и честные правила возвратов.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
