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
      {/* Hero Section */}
      <section className="grain relative bg-[var(--charcoal)] pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--bone)]/50 mb-6 font-light">
              {year} · Celebraciones
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight text-[var(--bone)] mb-8">
              El calendario de<br />
              <span className="italic">nuestras tradiciones</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--bone)]/70 leading-relaxed max-w-2xl">
              Cada mes trae sus propias celebraciones — fechas que honran nuestras raíces mexicanas,
              la riqueza cultural que compartimos con nuestros vecinos en Estados Unidos,
              y los ingredientes que definen nuestro arte culinario.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Calendar Section */}
      <CalendarioClient upcoming={upcoming} year={year} />
    </>
  );
}
