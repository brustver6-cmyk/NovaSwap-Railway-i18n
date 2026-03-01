import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "ns_admin";
const SECRET = process.env.AUTH_COOKIE_SECRET || "change_me";

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function setAdminSession() {
  const payload = `${Date.now()}`;
  const value = `${payload}.${sign(payload)}`;
  cookies().set(COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE, "", { path: "/", maxAge: 0 });
}

export function isAdmin() {
  const v = cookies().get(COOKIE)?.value;
  if (!v) return false;
  const [payload, sig] = v.split(".");
  if (!payload || !sig) return false;
  return sign(payload) === sig;
}
