import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeedCard } from "@/components/komsu/FeedCard";
import { HelpFab, TopBar } from "@/components/komsu/TopBar";
import { Button, type FeedType } from "@/components/komsu/primitives";
import { feedItems, quickActions, urgentNeeds } from "@/components/komsu/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Komşu — Mahallendeki Dayanışma Panosu" },
      {
        name: "description",
        content:
          "Ödünç eşya talepleri, komşu yardımları, yerel ilanlar ve mahalle duyuruları tek bir sade panoda. Her yaşa uygun, erişilebilir tasarım.",
      },
      { property: "og:title", content: "Komşu — Mahallendeki Dayanışma Panosu" },
      {
        property: "og:description",
        content: "Ödünç eşya, yardım ve yerel ilanlar için mahalle panosu.",
      },
    ],
  }),
  component: Dashboard,
});

const tabs: { key: "tumu" | FeedType; label: string }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "odunc", label: "Ödünç" },
  { key: "yardim", label: "Yardım" },
  { key: "ilan", label: "İlan" },
  { key: "duyuru", label: "Duyuru" },
];

function Dashboard() {
  const [tab, setTab] = useState<"tumu" | FeedType>("tumu");
  const items = tab === "tumu" ? feedItems : feedItems.filter((i) => i.type === tab);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="mx-auto max-w-[1140px] px-4 pb-24">
        {/* Selam bandı */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h1 className="font-display text-3xl leading-tight font-bold text-card-foreground">
            Günaydın Ayşe Teyze <span aria-hidden="true">☀️</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Bugün mahallende <strong className="text-foreground">3 yeni talep</strong> ve{" "}
            <strong className="text-foreground">1 duyuru</strong> var.
          </p>
        </section>

        {/* Hızlı aksiyonlar */}
        <section aria-labelledby="hizli" className="mt-6">
          <h2 id="hizli" className="sr-only">
            Hızlı aksiyonlar
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="flex min-h-[104px] flex-col items-start gap-1 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
              >
                <span aria-hidden="true" className="text-2xl">
                  {a.icon}
                </span>
                <span className="text-base font-semibold text-card-foreground">{a.label}</span>
                <span className="text-sm text-muted-foreground">{a.hint}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Acil ihtiyaçlar */}
        <section aria-labelledby="acil" className="mt-8">
          <h2 id="acil" className="font-display text-2xl font-semibold">
            Acil ihtiyaçlar
          </h2>
          <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
            {urgentNeeds.map((u) => (
              <div
                key={u.title}
                className="w-[280px] shrink-0 snap-start rounded-2xl border border-l-4 border-border border-l-accent bg-card p-4"
              >
                <p className="font-semibold text-card-foreground">{u.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{u.meta}</p>
                <Button variant="secondary" className="mt-3 w-full">
                  Ben varım
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Akış sekmeleri */}
        <section aria-labelledby="akis" className="mt-8">
          <h2 id="akis" className="font-display text-2xl font-semibold">
            Mahalle panosu
          </h2>
          <div role="tablist" aria-label="Akış filtresi" className="mt-3 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "touch-target rounded-xl border px-5 text-base font-medium transition-colors",
                  tab === t.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="font-display text-xl font-semibold">Henüz sessiz bir gün</p>
              <p className="mt-2 text-muted-foreground">İlk merhabayı sen de!</p>
              <Button className="mt-4">Paylaşım yap</Button>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <HelpFab />
    </div>
  );
}
