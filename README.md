# NovaSwap (MVP)

Современный MVP-обменник: crypto → card (выплаты вручную оператором).

## Важно про доверие
Этот шаблон **не заявляет лицензии**, если их нет. На странице `/trust` предусмотрены поля для заполнения лицензии/юрисдикции **только при наличии**.

## Запуск локально

1) Установи зависимости:
```bash
npm i
```

2) Создай `.env` на основе `.env.example`.

3) Настрой админ-пароль:
```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_ADMIN_PASSWORD', 10))"
```
Скопируй хэш в `ADMIN_PASSWORD_HASH`.

4) Подними БД (PostgreSQL (Railway) / SQLite (локально)):
```bash
npm run prisma:push
```

5) Запусти:
```bash
npm run dev
```

Открой:
- `http://localhost:3000` — сайт
- `http://localhost:3000/admin/login` — админка

## Где вставить кошельки
`src/lib/coins.ts` → `depositAddress` для каждой сети.

## Что дальше улучшать
- Реальный FX для EUR/UAH (с API)
- Автопроверка поступления крипты (по блокчейну)
- Telegram-уведомления
- Ограничения по лимитам + антифрод
- 2FA для админки


## Deploy на Railway (PostgreSQL)

1) Залей проект на GitHub.
2) В Railway: New Project → Deploy from GitHub → выбери репо.
3) Add → Database → PostgreSQL.
4) В Variables добавь:
- DATABASE_URL (из Railway Postgres)
- ADMIN_PASSWORD_HASH
- AUTH_COOKIE_SECRET (длинная случайная строка)
- (опц.) DEFAULT_MARKUP_PERCENT, ORDER_RATE_LOCK_MINUTES, SUPPORT_TELEGRAM, SUPPORT_EMAIL

5) После первого деплоя выполни миграции:
```bash
npx prisma migrate deploy
```
(Если используешь `prisma:push`, можно запустить `npx prisma db push`, но для продакшна лучше migrate.)

