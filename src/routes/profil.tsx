import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/komsu/AppShell";
import { ScreenHeader } from "@/components/komsu/TopBar";
import { Avatar, VerifiedBadge } from "@/components/komsu/primitives";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profilim — Komşu" },
      {
        name: "description",
        content:
          "Komşuluk rozetlerin, yardım geçmişin ve erişilebilirlik ayarların tek yerde. Yazı boyutu, bildirim ve gizlilik tercihleri.",
      },
      { property: "og:title", content: "Profilim — Komşu" },
      {
        property: "og:description",
        content: "Rozetlerin, yardım geçmişin ve erişilebilirlik ayarların.",
      },
    ],
  }),
  component: ProfileScreen,
});

const stats = [
  { label: "Yardım", value: "12" },
  { label: "Ödünç", value: "8" },
  { label: "Teşekkür", value: "31" },
];

const rows = [
  { icon: "🔔", label: "Bildirimler", hint: "Açık" },
  { icon: "🔤", label: "Yazı boyutu ve kontrast", hint: "Standart" },
  { icon: "🔒", label: "Gizlilik ve konum", hint: "Yaklaşık mesafe" },
  { icon: "🗣️", label: "Sesli okuma", hint: "Kapalı" },
  { icon: "❓", label: "Yardım ve destek", hint: "" },
];

function ProfileScreen() {
  return (
    <AppShell header={<ScreenHeader title="Profilim" />} fab={false} className="pt-5">
      <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <Avatar name="Ayşe Demir" />
        <div className="min-w-0">
          <h2 className="truncate font-display text-xl font-bold">Ayşe Demir</h2>
          <p className="text-sm text-muted-foreground">Fıstıkağacı Mah. · 3 yıldır komşu</p>
          <div className="mt-2">
            <VerifiedBadge />
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="ayarlar" className="mt-6">
        <h2 id="ayarlar" className="text-sm font-semibold text-muted-foreground">
          Ayarlar
        </h2>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {rows.map((r) => (
            <li key={r.label}>
              <button className="pressable flex min-h-[60px] w-full items-center gap-3 px-4 text-left">
                <span aria-hidden="true" className="text-xl">
                  {r.icon}
                </span>
                <span className="flex-1 font-medium">{r.label}</span>
                <span className="text-sm text-muted-foreground">{r.hint}</span>
                <span aria-hidden="true" className="text-muted-foreground">
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/dogrulama"
        className="pressable mt-6 flex min-h-[60px] items-center justify-center rounded-2xl bg-primary px-5 font-semibold text-primary-foreground"
      >
        Doğrulama durumunu gör
      </Link>
    </AppShell>
  );
}
