import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/** Uygulama başlığı: konum, erişilebilirlik kontrolleri, bildirim. */
export function TopBar() {
  const [dark, setDark] = useState(false);
  const [large, setLarge] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.fontSize = large ? "21px" : "18px";
  }, [large]);

  return (
    <header className="safe-top sticky top-0 z-30 shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-3">
        <p className="flex min-w-0 items-center gap-2 text-base font-medium">
          <span aria-hidden="true">📍</span>
          <span className="truncate">Fıstıkağacı Mah.</span>
        </p>
        <div className="ml-auto flex items-center gap-1">
          <IconButton
            label="Yazı boyutunu büyüt"
            pressed={large}
            onClick={() => setLarge((v) => !v)}
          >
            <span className="font-display text-base font-bold">A+</span>
          </IconButton>
          <IconButton
            label={dark ? "Aydınlık moda geç" : "Karanlık moda geç"}
            pressed={dark}
            onClick={() => setDark((v) => !v)}
          >
            {dark ? "☀️" : "🌙"}
          </IconButton>
          <Link
            to="/profil"
            aria-label="Bildirimler ve profil"
            className="pressable relative flex h-11 w-11 items-center justify-center rounded-full bg-muted text-lg"
          >
            <span aria-hidden="true">🔔</span>
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Geri düğmeli iç sayfa başlığı. */
export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();
  return (
    <header className="safe-top sticky top-0 z-30 shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center gap-3 px-3 py-3">
        <button
          onClick={() => router.history.back()}
          aria-label="Geri dön"
          className="pressable flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-muted"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl font-bold">{title}</h1>
          {subtitle ? (
            <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="pressable flex h-11 w-11 items-center justify-center rounded-full text-lg hover:bg-muted aria-pressed:bg-muted"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

export function HelpFab() {
  return (
    <button
      className="pressable fixed right-4 bottom-[calc(84px+env(safe-area-inset-bottom))] z-40 h-14 w-14 rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg"
      aria-label="Yardım iste: sesli okuma, yazı büyütme, komşudan yardım"
    >
      <span aria-hidden="true">?</span>
    </button>
  );
}
