import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  status: z.enum(["NEW","WAITING_PAYMENT","PAID","PROCESSING","COMPLETED","CANCELED","REVIEW","EXPIRED"]),
  adminNote: z.string().optional(),
  payinTxHash: z.string().optional()
});

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const input = schema.parse(body);

    const o = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: input.status,
        adminNote: input.adminNote ?? "",
        payinTxHash: input.payinTxHash ?? ""
      }
    });

    return NextResponse.json({ ok: true, status: o.status });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
  }
}
