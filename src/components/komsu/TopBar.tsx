import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "./primitives";

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
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[480px] items-center gap-2 px-4 py-3">

        <p className="flex min-w-0 items-center gap-2 text-base font-medium">
          <span aria-hidden="true">📍</span>
          <span className="truncate">Fıstıkağacı Mah.</span>
        </p>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            aria-pressed={large}
            aria-label="Yazı boyutunu büyüt"
            onClick={() => setLarge((v) => !v)}
            className="px-0"
          >
            <span aria-hidden="true" className="font-display font-bold">
              A+
            </span>
          </Button>
          <Button
            variant="ghost"
            aria-pressed={dark}
            aria-label={dark ? "Aydınlık moda geç" : "Karanlık moda geç"}
            onClick={() => setDark((v) => !v)}
            className="px-0"
          >
            <span aria-hidden="true">{dark ? "☀️" : "🌙"}</span>
          </Button>
          <Link
            to="/dogrulama"
            className="touch-target inline-flex items-center justify-center rounded-xl border border-border px-4 text-base font-medium hover:bg-muted"
          >
            Doğrulama
          </Link>
        </div>
      </div>
    </header>
  );
}

export function HelpFab() {
  return (
    <button
      className="fixed right-5 bottom-5 z-40 h-14 w-14 rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
      aria-label="Yardım iste: sesli okuma, yazı büyütme, komşudan yardım"
    >
      <span aria-hidden="true">?</span>
    </button>
  );
}
