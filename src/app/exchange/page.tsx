import ExchangeClient from "./ExchangeClient";
import { getLang } from "@/lib/lang-server";

export default function Page() {
  return <ExchangeClient lang={getLang()} />;
}
