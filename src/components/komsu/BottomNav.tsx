import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", icon: "🏠", label: "Pano" },
  { to: "/", icon: "🔍", label: "Ara" },
  { to: "/", icon: "➕", label: "Paylaş" },
  { to: "/dogrulama", icon: "🛡️", label: "Doğrula" },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Ana gezinme"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-[480px] items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item, i) => {
          const active = pathname === item.to && (item.to !== "/" || i === 0);
          return (
            <li key={item.label} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl py-1 text-xs font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span aria-hidden="true" className="text-xl">
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
