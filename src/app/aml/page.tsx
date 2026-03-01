import { Card, CardBody, CardHeader } from "@/components/ui";

export default function AmlPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader title="AML / KYC (шаблон)" subtitle="Пиши честно и кратко. Не имитируй лицензии, если их нет." />
        <CardBody className="space-y-3 text-sm opacity-85">
          <p>Мы можем запросить подтверждение личности или происхождения средств, если:</p>
          <ul className="list-disc pl-5 space-y-1 opacity-85">
            <li>операция выглядит нетипично или слишком крупная для лимитов;</li>
            <li>есть признаки мошенничества/обмана третьих лиц;</li>
            <li>поступления идут из высокорискованных источников.</li>
          </ul>
          <p>Возможные документы: фото документа, селфи, подтверждение источника средств (по ситуации).</p>
          <p>Если пользователь отказывается предоставить данные — операция может быть отменена согласно правилам.</p>
        </CardBody>
      </Card>
    </div>
  );
}
