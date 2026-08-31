import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/komsu/TopBar";
import { AppShell } from "@/components/komsu/AppShell";
import { Button } from "@/components/komsu/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dogrulama")({
  head: () => ({
    meta: [
      { title: "Mahalle Doğrulama — Komşu" },
      {
        name: "description",
        content:
          "Konum veya belge ile mahalle doğrulaması: kademeli güven adımları, gizlilik açıklamaları ve her adımda 'şimdilik geç' seçeneği.",
      },
      { property: "og:title", content: "Mahalle Doğrulama — Komşu" },
      {
        property: "og:description",
        content: "Komşuluğunu kanıtla: konum tabanlı veya belgeyle kademeli doğrulama akışı.",
      },
    ],
  }),
  component: Verification,
});

const steps = [
  {
    title: "Neden doğrulama?",
    body: "Mahallendeki herkesin gerçekten komşun olduğundan emin olmak için. Adresin hiçbir zaman diğer komşulara gösterilmez — sadece “150 m uzakta” gibi yaklaşık mesafe paylaşılır.",
    action: "Anladım, başlayalım",
  },
  {
    title: "Mahalleni seç",
    body: "Konumunu açtığında seni en yakın mahalleye eşleştiririz. Dilersen listeden elle de seçebilirsin.",
    action: "Konumumu kullan",
  },
  {
    title: "Kanıt yöntemini seç",
    body: "İki yol var: 3 gün boyunca konum eşleşmesi (belge gerekmez) veya fatura/kira sözleşmesi yükleme (anında sonuç).",
    action: "Devam et",
  },
  {
    title: "Belgeni yükle veya bekle",
    body: "Belge yüklersen sadece adres satırını okuruz, kalanını maskeleyebilirsin. Belge 30 gün sonra otomatik silinir.",
    action: "Belge yükle",
  },
  {
    title: "Onay ve rozet",
    body: "İnceleme genellikle 1 saat sürer. Onaylanınca profilinde “Doğrulanmış komşu ✓” rozeti görünür ve tüm taleplere yazabilirsin.",
    action: "Bitir",
  },
];

const methods = [
  {
    icon: "📍",
    title: "Konum tabanlı",
    body: "3 gün boyunca arka planda 2 konum eşleşmesi. Belge yok, en gizlilik dostu yol.",
    badge: "Önerilen",
  },
  {
    icon: "📄",
    title: "Belge ile",
    body: "Fatura, kira sözleşmesi veya muhtar yazısı. Genelde 1 saat içinde onay.",
    badge: "Hızlı",
  },
];

function Verification() {
  const [step, setStep] = useState(0);
  const total = steps.length;
  const current = steps[step]!;

  return (
    <AppShell header={<ScreenHeader title="Mahalle doğrulama" subtitle="Güvenli komşuluk için 5 adım" />} className="pt-6">
        <p className="text-sm font-medium text-muted-foreground">
          Adım {step + 1} / {total}
        </p>
        <div
          className="mt-2 flex gap-1.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Doğrulama ilerlemesi"
        >
          {steps.map((s, i) => (
            <span
              key={s.title}
              className={cn("h-2 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-muted")}
            />
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <h1 className="font-display text-2xl leading-tight font-bold text-card-foreground">
            {current.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{current.body}</p>

          {step === 2 && (
            <div className="mt-5 grid gap-3">
              {methods.map((m) => (
                <button
                  key={m.title}
                  className="rounded-2xl border border-border p-4 text-left transition-colors hover:bg-muted"
                >
                  <span aria-hidden="true" className="text-2xl">
                    {m.icon}
                  </span>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-card-foreground">
                    {m.title}
                    <span className="rounded-full bg-accent/25 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      {m.badge}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <label className="mt-5 flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-center hover:bg-muted">
              <span aria-hidden="true" className="text-3xl">
                ⬆️
              </span>
              <span className="font-medium">Belgeni buraya sürükle ya da dokun</span>
              <span className="text-sm text-muted-foreground">PDF veya fotoğraf · en fazla 10 MB</span>
              <input type="file" className="sr-only" accept="image/*,.pdf" />
            </label>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => setStep((s) => Math.min(s + 1, total - 1))}
              className="flex-1 sm:flex-none"
            >
              {current.action}
            </Button>
            {step > 0 && (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                Geri
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.min(s + 1, total - 1))}
              className="ml-auto"
            >
              Şimdilik geç
            </Button>
          </div>
        </section>

        <p className="mt-5 rounded-2xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden="true">🔒</span> Konum verin yalnızca mahalle eşleşmesi için kullanılır,
          komşularla paylaşılmaz. Doğrulamayı istediğin an ayarlardan geri alabilirsin.
        </p>
    </AppShell>
  );
}
