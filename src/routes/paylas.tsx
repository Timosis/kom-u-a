import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/komsu/AppShell";
import { ScreenHeader } from "@/components/komsu/TopBar";
import { Button, typeMeta, type FeedType } from "@/components/komsu/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/paylas")({
  head: () => ({
    meta: [
      { title: "Paylaşım Yap — Komşu" },
      {
        name: "description",
        content:
          "Ödünç isteği, yardım çağrısı, ilan veya duyuru oluştur. Büyük dokunma alanlarıyla üç adımda paylaş.",
      },
      { property: "og:title", content: "Paylaşım Yap — Komşu" },
      {
        property: "og:description",
        content: "Mahalleye ödünç isteği, yardım çağrısı, ilan veya duyuru paylaş.",
      },
    ],
  }),
  component: ShareScreen,
});

const types: FeedType[] = ["odunc", "yardim", "ilan", "duyuru"];

function ShareScreen() {
  const [type, setType] = useState<FeedType>("odunc");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AppShell
      header={<ScreenHeader title="Paylaşım yap" subtitle="Mahallen görsün" />}
      fab={false}
      className="pt-5"
    >
      {sent ? (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
          <p aria-hidden="true" className="text-4xl">
            ✅
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold">Paylaşımın yayında</h2>
          <p className="mt-2 text-muted-foreground">Komşuların yanıt verdiğinde haber vereceğiz.</p>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              setSent(false);
              setTitle("");
              setBody("");
            }}
          >
            Yeni paylaşım
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-6"
        >
          <fieldset>
            <legend className="text-base font-semibold">Ne paylaşıyorsun?</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={cn(
                    "pressable flex min-h-[84px] flex-col items-start justify-center gap-1 rounded-2xl border p-4 text-left",
                    type === t ? "border-primary bg-primary/10" : "border-border bg-card",
                  )}
                >
                  <span aria-hidden="true" className="text-2xl">
                    {typeMeta[t].icon}
                  </span>
                  <span className="font-semibold">{typeMeta[t].label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="baslik" className="text-base font-semibold">
              Başlık
            </label>
            <input
              id="baslik"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Örn: Bir günlüğüne matkap lazım"
              className="touch-target mt-2 w-full rounded-2xl border border-border bg-card px-4 text-base outline-none focus-visible:border-primary"
            />
          </div>

          <div>
            <label htmlFor="detay" className="text-base font-semibold">
              Detay
            </label>
            <textarea
              id="detay"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Ne zaman, ne kadar süre, nasıl teslim?"
              className="mt-2 w-full rounded-2xl border border-border bg-card p-4 text-base outline-none focus-visible:border-primary"
            />
          </div>

          <button
            type="button"
            className="pressable flex min-h-[110px] w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border text-muted-foreground"
          >
            <span aria-hidden="true" className="text-2xl">
              📷
            </span>
            Fotoğraf ekle (isteğe bağlı)
          </button>

          <Button type="submit" className="w-full">
            Mahalleye gönder
          </Button>
        </form>
      )}
    </AppShell>
  );
}
