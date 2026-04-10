import type { Metadata } from "next";
import { CALENDAR_EVENTS, getUpcomingEvents } from "@/lib/calendar";
import CalendarioClient from "./ui/CalendarioClient";

export const metadata: Metadata = {
  title: "Calendario Cultural",
  description:
    "Fechas culturales, gastronómicas y patrias que celebramos todo el año en El Tepeyac Taqueria — tradiciones mexicanas, americanas y días especiales de comida.",
};

export default function CalendarioPage() {
  const today = new Date();
  const year = today.getFullYear();
  const upcoming = getUpcomingEvents(today, 45);

  return (
    <>
      {/* Hero */}
      <section className="grain relative bg-[var(--charcoal)] pb-16 pt-32 sm:pt-36">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.38em] text-[var(--bone)]/45">
            Calendario · El Tepeyac · {year}
          </p>
          <h1 className="mb-5 max-w-2xl font-heading text-4xl font-light leading-[1.05] text-[var(--bone)] sm:text-5xl lg:text-6xl">
            Celebramos todo el año
          </h1>
          <p className="max-w-xl text-base leading-7 text-[var(--bone)]/60 sm:text-lg">
            Fechas culturales, gastronómicas y patrias que dan sabor a cada mes —
            tradiciones de México, EE.UU. y la mesa que nos une.
          </p>

          {/* Category legend dots */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { color: "bg-[var(--cilantro)]", label: "México 🇲🇽" },
              { color: "bg-[var(--oaxaca)]", label: "EE.UU. 🇺🇸" },
              { color: "bg-[var(--maiz)]", label: "Ambos 🌎" },
              { color: "bg-[var(--salsa)]", label: "Comida 🍽️" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone)]/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client-side interactive section */}
      <CalendarioClient upcoming={upcoming} year={year} />
    </>
  );
}
