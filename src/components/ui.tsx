"use client";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-white/10 bg-white/5 shadow-soft", className)}>{children}</div>;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-white/10 px-6 py-5">
      <div className="text-base font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-xs opacity-70">{subtitle}</div> : null}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm shadow-line hover:bg-white/15 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none placeholder:opacity-50 focus:border-indigo-400/60",
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none focus:border-indigo-400/60",
        props.className
      )}
    />
  );
}

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "ok" | "warn" | "bad" }) {
  const map = {
    neutral: "border-white/10 bg-white/5",
    ok: "border-emerald-400/20 bg-emerald-400/10",
    warn: "border-amber-400/20 bg-amber-400/10",
    bad: "border-rose-400/20 bg-rose-400/10"
  }[tone];
  return <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[12px]", map)}>{children}</span>;
}

export function Divider() {
  return <div className="my-5 h-px w-full bg-white/10" />;
}
