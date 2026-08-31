import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/komsu/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kayit")({
  head: () => ({
    meta: [
      { title: "Mahallene Katıl — Komşu" },
      {
        name: "description",
        content:
          "Komşu'ya hoş geldin. Belge yüklemeden, yalnızca beyanınla mahalleni seç ve dayanışma panosuna katıl.",
      },
      { property: "og:title", content: "Mahallene Katıl — Komşu" },
      {
        property: "og:description",
        content: "Yalnızca beyanınla mahalleni seç, komşularınla tanış.",
      },
    ],
  }),
  component: Onboarding,
});

const mahalleler = [
  "Fıstıkağacı Mah.",
  "Bahçelievler Mah.",
  "Kuzguncuk Mah.",
  "Selami Ali Mah.",
  "İcadiye Mah.",
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [declared, setDeclared] = useState(false);

  const finish = () => {
    try {
      localStorage.setItem(
        "komsu:onboarding",
        JSON.stringify({ name, mahalle, declaredAt: new Date().toISOString() }),
      );
    } catch {
      /* depolama kapalıysa yine de devam et */
    }
    navigate({ to: "/" });
  };

  const canNext =
    step === 0 ? true : step === 1 ? name.trim().length >= 2 : mahalle !== "" && declared;

  return (
    <div className="relative mx-auto flex h-dvh max-w-[480px] flex-col bg-background">
      <main className="screen-enter scroll-hide flex flex-1 flex-col overflow-y-auto px-6 pt-14 pb-10">
        {/* İlerleme */}
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("h-2 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-muted")}
            />
          ))}
        </div>

        {step === 0 && (
          <section className="flex flex-1 flex-col justify-center">
            <span aria-hidden="true" className="text-5xl">🏡</span>
            <h1 className="mt-4 font-display text-4xl leading-tight font-bold">
              Komşu'ya hoş geldin
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Burası mahallenin dayanışma panosu. Ödünç bir matkap, bir el yardımı ya da sadece
              bir merhaba — hepsi bir dokunuş uzağında.
            </p>
            <p className="mt-4 rounded-2xl border border-border bg-muted/60 p-4 text-base leading-relaxed text-muted-foreground">
              <span aria-hidden="true">🤝</span> Belge yüklemene gerek yok. Mahallende yaşadığını
              beyan etmen yeterli — komşuluk güvenle başlar.
            </p>
          </section>
        )}

        {step === 1 && (
          <section className="flex flex-1 flex-col justify-center">
            <h1 className="font-display text-3xl font-bold">Sana nasıl seslenelim?</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Adın ya da komşularının bildiği bir lakap yeterli.
            </p>
            <label htmlFor="name" className="sr-only">
              Adın
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn. Ayşe Teyze"
              className="mt-6 min-h-[56px] w-full rounded-2xl border border-border bg-card px-5 text-lg outline-none focus:border-primary"
            />
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-1 flex-col justify-center">
            <h1 className="font-display text-3xl font-bold">Hangi mahallede oturuyorsun?</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Listeden mahalleni seç. Adresin hiçbir zaman paylaşılmaz.
            </p>
            <div className="mt-5 grid gap-2" role="radiogroup" aria-label="Mahalle seçimi">
              {mahalleler.map((m) => (
                <button
                  key={m}
                  role="radio"
                  aria-checked={mahalle === m}
                  onClick={() => setMahalle(m)}
                  className={cn(
                    "pressable flex min-h-[56px] items-center gap-3 rounded-2xl border px-5 text-left text-lg font-medium",
                    mahalle === m
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2",
                      mahalle === m ? "border-primary bg-primary" : "border-border",
                    )}
                  >
                    {mahalle === m && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </span>
                  {m}
                </button>
              ))}
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-card p-4">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
                className="mt-1 h-6 w-6 shrink-0 accent-primary"
              />
              <span className="text-base leading-relaxed">
                Seçtiğim mahallede yaşadığımı <strong>beyan ederim</strong>. Komşularıma karşı
                dürüst ve saygılı olacağıma söz veriyorum.
              </span>
            </label>
          </section>
        )}

        {/* Alt aksiyonlar */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Geri
            </Button>
          )}
          <Button
            className="flex-1"
            disabled={!canNext}
            onClick={() => (step < 2 ? setStep((s) => s + 1) : finish())}
          >
            {step === 0 ? "Başlayalım" : step === 1 ? "Devam et" : "Mahalleme katıl 🎉"}
          </Button>
        </div>
      </main>
    </div>
  );
}
