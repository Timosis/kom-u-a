import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/komsu/AppShell";
import { ScreenHeader } from "@/components/komsu/TopBar";
import { FeedCard } from "@/components/komsu/FeedCard";
import { feedItems } from "@/components/komsu/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ara")({
  head: () => ({
    meta: [
      { title: "Ara — Komşu Mahalle Uygulaması" },
      {
        name: "description",
        content:
          "Mahallendeki ödünç eşya, yardım taleplerini ve ilanları anahtar kelimeyle ara; popüler aramalarla hızlıca başla.",
      },
      { property: "og:title", content: "Ara — Komşu Mahalle Uygulaması" },
      {
        property: "og:description",
        content: "Komşu taleplerini ve ilanları hızlıca ara.",
      },
    ],
  }),
  component: SearchScreen,
});

const suggestions = ["matkap", "merdiven", "market", "bisiklet", "çocuk bakımı", "toplantı"];

function SearchScreen() {
  const [q, setQ] = useState("");
  const results = q.trim()
    ? feedItems.filter((i) =>
        `${i.title} ${i.body} ${i.author}`.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")),
      )
    : [];

  return (
    <AppShell header={<ScreenHeader title="Ara" subtitle="Mahalledeki talep ve ilanlar" />} className="pt-4">
      <div className="sticky top-0 z-10 -mx-4 bg-background/95 px-4 pt-1 pb-3 backdrop-blur">
        <label htmlFor="q" className="sr-only">
          Arama
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4">
          <span aria-hidden="true">🔍</span>
          <input
            id="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ne arıyorsun?"
            inputMode="search"
            className="touch-target w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          {q ? (
            <button onClick={() => setQ("")} aria-label="Aramayı temizle" className="pressable px-1 text-lg">
              <span aria-hidden="true">✕</span>
            </button>
          ) : null}
        </div>
      </div>

      <section aria-labelledby="oneri" className="mt-2">
        <h2 id="oneri" className="text-sm font-semibold text-muted-foreground">
          Popüler aramalar
        </h2>
        <div className="scroll-hide mt-3 flex gap-2 overflow-x-auto pb-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQ(s)}
              className={cn(
                "pressable shrink-0 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium",
                q === s && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section aria-live="polite" className="mt-6 grid gap-4">
        {q.trim() && results.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            “{q}” için sonuç yok. Yeni bir talep açabilirsin.
          </p>
        ) : (
          results.map((item) => <FeedCard key={item.id} item={item} />)
        )}
      </section>
    </AppShell>
  );
}
