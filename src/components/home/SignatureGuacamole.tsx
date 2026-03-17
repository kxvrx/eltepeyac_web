import { ExternalButtonLink } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";

const ingredients = [
  "Tomato",
  "Onion",
  "Cilantro",
  "Serranos",
  "Lime",
] as const;

export function SignatureGuacamole() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(47,125,58,0.16),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(215,58,47,0.14),transparent_55%),radial-gradient(circle_at_45%_90%,rgba(31,78,168,0.10),transparent_60%)]" />
      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs font-mono tracking-[0.22em] text-muted">
            SIGNATURE ITEM
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-4xl">
            This is how we make our famous{" "}
            <span className="text-cilantro">signature Guacamole</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-charcoal/75">
            Fresh ingredients, hand-prepped. The kind of simple that only works
            when every detail matters.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {ingredients.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-bone px-3 py-1 text-xs font-semibold text-charcoal/80"
              >
                {i}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ExternalButtonLink href={restaurant.orderUrl} tone="salsa">
              Order Now
            </ExternalButtonLink>
            <span className="text-xs text-muted">
              Tip: add notes for spice level on the order page.
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[5/4] overflow-hidden rounded-[2.25rem] border border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0)),radial-gradient(circle_at_25%_20%,rgba(47,125,58,0.35),transparent_58%),radial-gradient(circle_at_75%_80%,rgba(215,58,47,0.25),transparent_60%)] shadow-[0_18px_50px_rgba(0,0,0,0.10)]" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(47,125,58,0.25),transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(215,58,47,0.22),transparent_60%)] blur-2xl" />

          <div className="pointer-events-none absolute left-5 top-5 rounded-2xl bg-charcoal/85 px-4 py-3 text-bone shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
            <div className="text-[10px] font-mono tracking-[0.22em] text-bone/65">
              MADE FRESH
            </div>
            <div className="mt-1 text-sm font-semibold">Crushed by hand</div>
          </div>
        </div>
      </div>
    </section>
  );
}

