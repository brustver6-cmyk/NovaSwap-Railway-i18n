import { cookies } from "next/headers";
import { normalizeLang, type Lang } from "./i18n";

export function getLang(): Lang {
  const v = cookies().get("ns_lang")?.value;
  return normalizeLang(v);
}
