"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  type CalendarEvent,
  type EventCategory,
  CATEGORY_META,
  MONTHS_ES,
  getEventsForMonth,
  resolveDate,
  formatDateShort,
} from "@/lib/calendar";

/** Fondo suave detrás del emoji (sin bloques ni brillos en esquina). */
const emojiSurface: Record<EventCategory, string> = {
  mexico: "bg-cilantro/12",
  usa: "bg-oaxaca/12",
  both: "bg-maiz/18",
  food: "bg-salsa/12",
};

/** Pastilla de fecha alineada al color del filtro de categoría. */
const datePillByCategory: Record<EventCategory, string> = {
  mexico:
    "bg-cilantro/14 text-cilantro ring-1 ring-inset ring-cilantro/25",
  usa: "bg-oaxaca/14 text-oaxaca ring-1 ring-inset ring-oaxaca/25",
  both:
    "bg-maiz/28 text-charcoal ring-1 ring-inset ring-maiz/55",
  food: "bg-salsa/12 text-salsa ring-1 ring-inset ring-salsa/22",
};

/** Hover de tarjeta con acento del mismo color que el filtro. */
const cardHoverByCategory: Record<EventCategory, string> = {
  mexico:
    "hover:border-cilantro/40 hover:bg-cilantro/[0.06] hover:shadow-[0_12px_40px_-10px_rgba(47,125,58,0.28)] hover:-translate-y-0.5",
  usa:
    "hover:border-oaxaca/40 hover:bg-oaxaca/[0.06] hover:shadow-[0_12px_40px_-10px_rgba(31,78,168,0.22)] hover:-translate-y-0.5",
  both:
    "hover:border-maiz/55 hover:bg-maiz/14 hover:shadow-[0_12px_40px_-10px_rgba(242,204,47,0.35)] hover:-translate-y-0.5",
  food:
    "hover:border-salsa/40 hover:bg-salsa/[0.06] hover:shadow-[0_12px_40px_-10px_rgba(215,58,47,0.22)] hover:-translate-y-0.5",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type FilterOption = EventCategory | "all";

interface Props {
  upcoming: CalendarEvent[];
  year: number;
}

// ---------------------------------------------------------------------------
// Filter Legend with interactive categories
// ---------------------------------------------------------------------------
function FilterLegend({
  active,
  onChange,
}: {
  active: FilterOption;
  onChange: (f: FilterOption) => void;
}) {
  const filters: Array<{ value: FilterOption; label: string; flag: string }> = [
    { value: "all", label: "Todos", flag: "✨" },
    { value: "mexico", label: "México", flag: "🇲🇽" },
    { value: "usa", label: "EE.UU.", flag: "🇺🇸" },
    { value: "both", label: "Ambos", flag: "🌎" },
    { value: "food", label: "Comida", flag: "🍽️" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-8 sm:py-12">
      <p className="text-xs sm:text-sm text-[var(--charcoal)]/50 mb-6 font-semibold uppercase tracking-wider">
        Categorías
      </p>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
        {filters.map((f) => {
          const isActive = active === f.value;
          const meta = f.value === "all" ? null : CATEGORY_META[f.value as EventCategory];
          const bgColor = f.value === "all" ? "bg-[var(--charcoal)]" : meta?.bgClass;

          return (
            <button
              key={f.value}
              onClick={() => onChange(f.value)}
              className={`rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 font-medium transition-all duration-300 ${
                isActive
                  ? `${bgColor} text-white shadow-lg scale-105`
                  : `${bgColor} text-white/60 hover:text-white opacity-60 hover:opacity-100`
              }`}
            >
              <span className="text-lg sm:text-xl">{f.flag}</span>
              <span className="text-sm sm:text-base">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Upcoming Events — franja horizontal compacta con flechas
// ---------------------------------------------------------------------------
function UpcomingStrip({ events, year }: { events: CalendarEvent[]; year: number }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 1;
    setHasOverflow(overflow);
    setCanPrev(overflow && scrollLeft > 2);
    setCanNext(overflow && scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, events.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(240, Math.floor(el.clientWidth * 0.82));
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  if (events.length === 0) return null;

  return (
    <section className="border-b border-black/10 bg-white py-5 sm:py-6">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="mb-3 text-base font-light text-charcoal sm:mb-4 sm:text-lg">
          🎉 Próximas celebraciones
        </p>

        <div className="relative flex items-stretch gap-1 sm:gap-2">
          {hasOverflow && (
            <button
              type="button"
              aria-label="Ver eventos anteriores"
              disabled={!canPrev}
              onClick={() => scrollByDir(-1)}
              className="z-10 flex w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-charcoal shadow-sm transition hover:bg-bone disabled:pointer-events-none disabled:opacity-25 sm:w-10"
            >
              <span className="text-lg leading-none" aria-hidden>
                ‹
              </span>
            </button>
          )}

          <div
            ref={scrollerRef}
            className="flex min-h-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {events.map((event) => {
              const date = resolveDate(event, year) ?? resolveDate(event, year + 1);
              if (!date) return null;

              return (
                <article
                  key={event.id}
                  className={`group flex w-[min(100%,260px)] shrink-0 snap-start flex-col rounded-xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color,background-color] duration-300 sm:w-[min(100%,280px)] sm:p-3.5 ${cardHoverByCategory[event.category]}`}
                >
                  <div className="flex gap-2.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg leading-none sm:h-11 sm:w-11 sm:rounded-xl sm:text-xl ${emojiSurface[event.category]}`}
                      aria-hidden
                    >
                      {event.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-[13px] font-semibold leading-tight text-charcoal sm:text-sm">
                          {event.nameES}
                        </h3>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px] ${datePillByCategory[event.category]}`}
                        >
                          {formatDateShort(date)}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-charcoal/55 sm:text-xs">
                        {event.descriptionES}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {hasOverflow && (
            <button
              type="button"
              aria-label="Ver siguientes eventos"
              disabled={!canNext}
              onClick={() => scrollByDir(1)}
              className="z-10 flex w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-charcoal shadow-sm transition hover:bg-bone disabled:pointer-events-none disabled:opacity-25 sm:w-10"
            >
              <span className="text-lg leading-none" aria-hidden>
                ›
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Card — superficie limpia, categoría solo en emoji + tipografía
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  if (!visible) return null;

  return (
    <div
      className={`group cursor-default transition-opacity duration-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-20"
      }`}
    >
      <div
        className={`rounded-2xl border border-black/[0.06] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color,background-color] duration-300 sm:px-5 sm:py-5 ${cardHoverByCategory[event.category]}`}
      >
        <div className="flex gap-3.5 sm:gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl leading-none sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl ${emojiSurface[event.category]}`}
            aria-hidden
          >
            {event.emoji}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
              <h4 className="text-[15px] font-semibold leading-snug text-charcoal sm:text-base">
                {event.nameES}
              </h4>
              {!isBanner && date && (
                <span
                  className={`shrink-0 rounded-lg px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] sm:px-2.5 sm:py-1 ${datePillByCategory[event.category]}`}
                >
                  {formatDateShort(date)}
                </span>
              )}
              {isBanner && (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${datePillByCategory[event.category]}`}
                >
                  Todo el mes
                </span>
              )}
            </div>
            {!isBanner && event.nameEN && (
              <p className="mt-0.5 text-xs italic text-charcoal/45">{event.nameEN}</p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-charcoal/65 sm:text-sm">
              {event.restaurantNote || event.descriptionES}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Month Section
// ---------------------------------------------------------------------------
function MonthSection({
  monthIndex,
  year,
  activeFilter,
  isCurrentMonth,
}: {
  monthIndex: number;
  year: number;
  activeFilter: FilterOption;
  isCurrentMonth: boolean;
}) {
  const events = getEventsForMonth(monthIndex, year).filter(
    (e) => activeFilter === "all" || activeFilter === e.category
  );

  return (
    <div className="group">
      {/* Month header */}
      <div
        className={`sticky top-[140px] z-20 mb-4 rounded-xl border-b px-1 py-4 transition-colors duration-300 sm:static sm:z-0 sm:mb-5 sm:px-0 sm:py-0 sm:pb-4 ${
          isCurrentMonth
            ? "border-cilantro/35 bg-gradient-to-r from-cilantro/[0.08] to-transparent sm:rounded-none sm:bg-transparent"
            : "border-black/[0.08] sm:border-black/[0.1]"
        }`}
      >
        <h3
          className={`text-2xl font-light tracking-tight text-charcoal sm:text-[1.65rem] ${
            isCurrentMonth ? "text-cilantro" : ""
          }`}
        >
          {MONTHS_ES[monthIndex - 1]}
        </h3>
      </div>

      {/* Events — tarjetas sueltas con aire */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/[0.08] py-8 text-center text-sm italic text-charcoal/30">
            Sin eventos en esta categoría
          </div>
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} year={year} visible />
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CalendarioClient({ upcoming, year }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  return (
    <>
      {/* Upcoming Events */}
      <UpcomingStrip events={upcoming} year={year} />

      {/* Filter Legend */}
      <FilterLegend active={activeFilter} onChange={setActiveFilter} />

      {/* Calendar Grid */}
      <section className="bg-gradient-to-b from-white via-[var(--bone)]/15 to-[var(--bone)]/30 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {months.map((m) => (
              <MonthSection
                key={m}
                monthIndex={m}
                year={year}
                activeFilter={activeFilter}
                isCurrentMonth={m === currentMonth && year === currentYear}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[var(--cilantro)] to-[var(--cilantro)]/95 py-12 sm:py-20 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs sm:text-sm font-light uppercase tracking-[0.2em] text-white/75 mb-3">
            🎊 Celebraciones Especiales
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-5 sm:mb-6 leading-tight">
            ¿Celebras algo importante?
          </h2>
          <p className="text-sm sm:text-base text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Coordina con nosotros catering, eventos privados, menús especiales para tu grupo.
            El Tepeyac es el lugar perfecto para tus celebraciones.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-bold text-[var(--cilantro)] rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <span>✉️</span>
            <span>Contacta con nosotros</span>
          </Link>
        </div>
      </section>
    </>
  );
}
