import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FeedType = "odunc" | "yardim" | "ilan" | "duyuru";

export const typeMeta: Record<FeedType, { label: string; icon: string; className: string }> = {
  odunc: {
    label: "Ödünç",
    icon: "🧰",
    className: "bg-primary/12 text-primary border-primary/30",
  },
  yardim: {
    label: "Yardım",
    icon: "🤝",
    className: "bg-secondary/15 text-secondary border-secondary/35",
  },
  ilan: {
    label: "İlan",
    icon: "📌",
    className: "bg-accent/25 text-accent-foreground border-accent/50",
  },
  duyuru: {
    label: "Duyuru",
    icon: "📣",
    className: "bg-info/12 text-info border-info/30",
  },
};

export function Chip({ type }: { type: FeedType }) {
  const meta = typeMeta[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
        meta.className,
      )}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {meta.label}
    </span>
  );
}

export function VerifiedBadge({ label = "Doğrulanmış komşu" }: { label?: string }) {
  return (
    <span
      title={label}
      className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary"
    >
      <span aria-hidden="true">✓</span>
      <span className="sr-only">{label}</span>
      Doğrulandı
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    ghost: "bg-transparent text-foreground border border-border hover:bg-muted",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };
  return (
    <button
      {...props}
      className={cn(
        "touch-target inline-flex items-center justify-center gap-2 rounded-xl px-5 text-base font-medium transition-colors disabled:opacity-60",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted font-display text-lg font-semibold text-foreground"
    >
      {initials}
    </div>
  );
}
