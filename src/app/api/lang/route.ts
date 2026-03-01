import { NextResponse } from "next/server";
import { normalizeLang } from "@/lib/i18n";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = normalizeLang(url.searchParams.get("v"));
  const back = url.searchParams.get("back") || "/";
  const res = NextResponse.redirect(new URL(back, url.origin));
  res.cookies.set("ns_lang", lang, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
  return res;
}
