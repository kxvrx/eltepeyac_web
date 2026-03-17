import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Altar Día de Muertos",
  description: "A seasonal story: marigolds, candles, and remembrance.",
};

export default function AltarDiaDeMuertosPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(215,58,47,0.14),transparent_60%),radial-gradient(circle_at_90%_25%,rgba(31,78,168,0.14),transparent_62%),radial-gradient(circle_at_45%_90%,rgba(47,125,58,0.10),transparent_65%),linear-gradient(180deg,rgba(0,0,0,0.04),transparent_30%)]" />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.22em] text-muted">
              SEASONAL STORY
            </div>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.0] tracking-tight text-charcoal sm:text-5xl">
              Altar Día de Muertos
            </h1>
            <p className="mt-5 text-base leading-7 text-charcoal/75">
              Minimal text, maximum atmosphere. This page is intentionally image-led —
              perfect for a future photo drop.
            </p>
          </div>
        </Container>
      </section>

      <section className="mt-2">
        <Container>
          <div className="rounded-[2.75rem] border border-border bg-card p-7 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_25%_20%,rgba(215,58,47,0.16),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(31,78,168,0.14),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.02),rgba(0,0,0,0))]"
                  aria-label="Altar photo placeholder"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

