import { Card, CardBody, CardHeader } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader title="Политика конфиденциальности (шаблон)" subtitle="Коротко: какие данные, зачем и как храним." />
        <CardBody className="space-y-3 text-sm opacity-85">
          <p>Мы собираем данные, необходимые для выполнения заявки: контакт, реквизиты для выплаты, тех. логи.</p>
          <p>Данные используются только для обработки заявки и поддержки, и не продаются третьим лицам.</p>
          <p>Доступ к админке защищён, а сессии — httpOnly cookie.</p>
        </CardBody>
      </Card>
    </div>
  );
}
