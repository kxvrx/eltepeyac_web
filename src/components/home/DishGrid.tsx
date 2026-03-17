import { popularDishes, type Dish } from "@/lib/restaurant";

function accentClasses(accent: Dish["accent"]) {
  if (accent === "cilantro") return "border-cilantro/25 hover:border-cilantro/45";
  if (accent === "oaxaca") return "border-oaxaca/25 hover:border-oaxaca/45";
  return "border-salsa/25 hover:border-salsa/45";
}

export function DishGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {popularDishes.map((dish) => (
        <div
          key={dish.id}
          className={`group relative overflow-hidden rounded-3xl border bg-card p-5 shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 ${accentClasses(
            dish.accent
          )}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] text-muted">POPULAR</div>
              <div className="mt-2 text-lg font-semibold tracking-tight text-charcoal">
                {dish.name}
              </div>
              {dish.note ? (
                <div className="mt-1 text-sm text-charcoal/70">{dish.note}</div>
              ) : null}
            </div>

            <div className="relative mt-1 h-12 w-12 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(47,125,58,0.22),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(215,58,47,0.18),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0))]" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-border" />
              <div className="absolute inset-0 grid place-items-center text-xs font-mono text-charcoal/55">
                {dish.id.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-muted">Made-to-order energy</div>
            <div className="text-xs font-mono text-charcoal/55 transition group-hover:translate-x-0.5">
              → view
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(31,78,168,0.18),transparent_60%)] blur-2xl" />
        </div>
      ))}
    </div>
  );
}

