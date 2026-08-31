import { cn } from "@/lib/utils";
import { Avatar, Button, Chip, VerifiedBadge, type FeedType } from "./primitives";

export type FeedItem = {
  id: string;
  type: FeedType;
  author: string;
  distance: string;
  verified: boolean;
  title: string;
  body: string;
  time: string;
  cta: string;
  urgent?: boolean;
};

export function FeedCard({ item }: { item: FeedItem }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)]",
        item.urgent && "border-l-4 border-l-accent",
      )}
    >
      <header className="flex items-center gap-3">
        <Avatar name={item.author} />
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 font-medium text-card-foreground">
            {item.author}
            {item.verified && <VerifiedBadge />}
          </p>
          <p className="text-sm text-muted-foreground">
            {item.distance} uzakta · {item.time}
          </p>
        </div>
      </header>

      <div className="space-y-2">
        <Chip type={item.type} />
        <h3 className="text-xl leading-snug font-semibold text-card-foreground">{item.title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground">{item.body}</p>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 pt-1">
        <Button variant={item.type === "yardim" ? "secondary" : "primary"} className="flex-1">
          {item.cta}
        </Button>
        <Button variant="ghost" aria-label={`${item.author} kaydet`} className="px-0">
          <span aria-hidden="true">🔖</span>
        </Button>
      </footer>
    </article>
  );
}
