import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { HelpFab } from "./TopBar";
import { cn } from "@/lib/utils";

/**
 * Mobil uygulama kabuğu: sabit başlık + kaydırılabilir içerik + alt gezinme.
 * Sayfa gövdesi yerine sadece içerik alanı kayar (native app hissi).
 */
export function AppShell({
  header,
  children,
  fab = true,
  className,
}: {
  header?: ReactNode;
  children: ReactNode;
  fab?: boolean;
  className?: string;
}) {
  return (
    <div className="relative mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden bg-background">
      {header}
      <main
        className={cn(
          "screen-enter scroll-hide flex-1 overflow-y-auto overscroll-contain px-4 pb-28",
          className,
        )}
      >
        {children}
      </main>
      {fab ? <HelpFab /> : null}
      <BottomNav />
    </div>
  );
}
