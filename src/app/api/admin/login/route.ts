import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { setAdminSession } from "@/lib/auth";

const schema = z.object({ password: z.string().min(4) });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = schema.parse(body);

    const hash = process.env.ADMIN_PASSWORD_HASH || "";
    if (!hash) return NextResponse.json({ error: "Admin password not configured" }, { status: 500 });

    const ok = await bcrypt.compare(input.password, hash);
    if (!ok) return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });

    setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
  }
}
