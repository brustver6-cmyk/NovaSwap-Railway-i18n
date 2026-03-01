import StatusClient from "./StatusClient";
import { getLang } from "@/lib/lang-server";

export default function Page() {
  return <StatusClient lang={getLang()} />;
}
