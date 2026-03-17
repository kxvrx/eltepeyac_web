import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { galleryCollections } from "@/lib/restaurant";

export const metadata = {
  title: "Gallery",
  description: "A growing collection of moments from El Tepeyac.",
};

function PlaceholderGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="aspect-square overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_25%_20%,rgba(47,125,58,0.16),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(215,58,47,0.12),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.02),rgba(0,0,0,0))]"
          aria-label="Gallery placeholder"
        />
      ))}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(47,125,58,0.16),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(31,78,168,0.12),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0.03),transparent_30%)]" />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.22em] text-muted">GALLERY</div>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.0] tracking-tight text-charcoal sm:text-5xl">
              Different moments. Same warmth.
            </h1>
            <p className="mt-5 text-base leading-7 text-charcoal/75">
              This section is designed to grow: general gallery, seasonal stories, and
              catering sets — each as its own page.
            </p>
          </div>
        </Container>
      </section>

      <section className="mt-2">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {galleryCollections.map((c) => (
              <Link
                key={c.slug}
                href={c.href}
                className="group relative overflow-hidden rounded-[2.25rem] border border-border bg-card p-7 shadow-[0_18px_55px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(215,58,47,0.10),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(47,125,58,0.12),transparent_65%)]" />
                <div className="relative">
                  <div className="text-xs font-mono tracking-[0.22em] text-muted">
                    COLLECTION
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-charcoal">
                    {c.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-charcoal/70">
                    {c.subtitle}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-border">
                    Open <span className="font-mono">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-border bg-card p-7 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-mono tracking-[0.22em] text-muted">GRID</div>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
                  General gallery (placeholder)
                </h2>
              </div>
              <div className="text-sm text-charcoal/70">
                Add real photos later — layout, spacing, and lazy-loading strategy are ready.
              </div>
            </div>

            <div className="mt-6">
              <PlaceholderGrid count={18} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

