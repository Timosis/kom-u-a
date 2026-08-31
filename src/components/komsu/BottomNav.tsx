import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const items: { to: "/" | "/ara" | "/paylas" | "/profil"; icon: string; label: string; center?: boolean }[] = [
  { to: "/", icon: "🏠", label: "Pano" },
  { to: "/ara", icon: "🔍", label: "Ara" },
  { to: "/paylas", icon: "➕", label: "Paylaş", center: true },
  { to: "/profil", icon: "👤", label: "Profil" },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Ana gezinme"
      className="safe-bottom sticky bottom-0 z-40 shrink-0 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="flex items-stretch justify-between px-1">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <li key={item.label} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "pressable flex min-h-[62px] flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[0.68rem] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors",
                    item.center && "bg-primary text-primary-foreground shadow-md",
                    !item.center && active && "bg-primary/12",
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
