import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";

export const metadata = {
  title: "Catering Gallery",
  description: "Catering setups and large-format plates.",
};

export default function CateringGalleryPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(47,125,58,0.14),transparent_60%),radial-gradient(circle_at_88%_20%,rgba(215,58,47,0.12),transparent_62%),linear-gradient(180deg,rgba(0,0,0,0.03),transparent_30%)]" />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.22em] text-muted">CATERING</div>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.0] tracking-tight text-charcoal sm:text-5xl">
              Catering Gallery
            </h1>
            <p className="mt-5 text-base leading-7 text-charcoal/75">
              A visual portfolio for events — designed to help decisions happen fast.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ExternalButtonLink href={restaurant.orderUrl} tone="salsa">
                Order / Inquire
              </ExternalButtonLink>
              <span className="text-xs text-muted">
                Add real catering photos later; layout supports mixed aspect ratios.
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-2">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[2.25rem] border border-border bg-card shadow-[0_18px_55px_rgba(0,0,0,0.06)]"
              >
                <div className="aspect-[4/3] bg-[radial-gradient(circle_at_20%_20%,rgba(31,78,168,0.10),transparent_55%),radial-gradient(circle_at_85%_65%,rgba(215,58,47,0.10),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.02),rgba(0,0,0,0))]" />
                <div className="p-5">
                  <div className="text-xs font-mono tracking-[0.22em] text-muted">
                    SETUP
                  </div>
                  <div className="mt-2 text-sm font-semibold text-charcoal">
                    Event moment #{idx + 1}
                  </div>
                  <div className="mt-1 text-xs text-charcoal/70">
                    Replace this caption with dish names or package notes.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

