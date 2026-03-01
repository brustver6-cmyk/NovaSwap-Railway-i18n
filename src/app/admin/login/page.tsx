"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input } from "@/components/ui";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function login() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ password })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Ошибка");
      window.location.href = "/admin";
    } catch (e: any) {
      setErr(e?.message ?? "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader title="Вход в админку" subtitle="Пароль хранится как bcrypt-хэш в .env" />
        <CardBody className="space-y-4">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
          <Button onClick={login} disabled={loading || password.length < 4} className="w-full py-3">
            {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Вхожу</span> : "Войти"}
          </Button>
          {err ? <div className="text-sm text-rose-300">{err}</div> : null}
        </CardBody>
      </Card>
    </div>
  );
}
