"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  type CalendarEvent,
  type EventCategory,
  CALENDAR_EVENTS,
  CATEGORY_META,
  MONTHS_ES,
  getEventsForMonth,
  resolveDate,
  formatDateShort,
} from "@/lib/calendar";

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
// Upcoming Events Strip — Reduced size
// ---------------------------------------------------------------------------
function UpcomingStrip({ events, year }: { events: CalendarEvent[]; year: number }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-white py-10 sm:py-14 border-b-4 border-[var(--cilantro)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="mb-6 sm:mb-8 text-lg sm:text-2xl font-light text-[var(--charcoal)]">
          🎉 Próximas celebraciones
        </p>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((event) => {
            const meta = CATEGORY_META[event.category];
            const date = resolveDate(event, year) ?? resolveDate(event, year + 1);
            if (!date) return null;

            return (
              <div
                key={event.id}
                className="group relative h-full cursor-pointer"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                  event.category === "mexico" ? "from-[var(--cilantro)]/15 to-[var(--cilantro)]/5" :
                  event.category === "usa" ? "from-[var(--oaxaca)]/15 to-[var(--oaxaca)]/5" :
                  event.category === "both" ? "from-[var(--maiz)]/15 to-[var(--maiz)]/5" :
                  "from-[var(--salsa)]/15 to-[var(--salsa)]/5"
                } border-2 ${meta.borderClass} transition-all duration-300 group-hover:shadow-lg group-hover:scale-102`} />

                <div className="relative p-4 sm:p-5 h-full flex flex-col">
                  <p className="text-4xl sm:text-5xl mb-2 leading-none">{event.emoji}</p>
                  <p className={`text-base sm:text-lg font-bold mb-2 ${meta.textClass}`}>
                    {formatDateShort(date)}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--charcoal)] mb-2">
                    {event.nameES}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--charcoal)]/70 leading-relaxed flex-grow">
                    {event.descriptionES}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Card — Reduced size
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  if (!visible) return null;

  if (isBanner) {
    return (
      <div className="relative group mb-2 last:mb-0">
        <div className={`flex items-center gap-3 w-full rounded-lg border-l-8 ${meta.borderClass} bg-gradient-to-r from-white/80 to-[var(--bone)]/40 p-3 sm:p-4 transition-all duration-200 hover:shadow-md hover:scale-101`}>
          <span className="text-3xl sm:text-4xl shrink-0">{event.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-bold text-[var(--charcoal)]">{event.nameES}</p>
            <p className={`text-xs mt-1 ${meta.textClass} font-bold uppercase tracking-wider`}>
              ⏰ TODO EL MES
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group mb-3 last:mb-0">
      {/* Timeline dot */}
      <div className="hidden sm:block absolute -left-7 top-4 w-3 h-3 rounded-full border-2 border-[var(--bone)] bg-white shadow-md group-hover:bg-[var(--charcoal)] transition-colors" />
      <div className={`hidden sm:block absolute -left-4 top-8 w-0.5 h-12 bg-black/10`} />

      {/* Card */}
      <div className={`rounded-xl border-l-8 ${meta.borderClass} overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102`}>
        <div className={`h-1.5 w-full ${meta.bgClass}`} />

        <div className={`bg-gradient-to-br ${
          event.category === "mexico" ? "from-white via-[var(--cilantro)]/[0.02] to-[var(--cilantro)]/[0.05]" :
          event.category === "usa" ? "from-white via-[var(--oaxaca)]/[0.02] to-[var(--oaxaca)]/[0.05]" :
          event.category === "both" ? "from-white via-[var(--maiz)]/[0.02] to-[var(--maiz)]/[0.05]" :
          "from-white via-[var(--salsa)]/[0.02] to-[var(--salsa)]/[0.05]"
        } p-4 sm:p-5`}>
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-4xl sm:text-5xl shrink-0 leading-none">{event.emoji}</span>
            {date && (
              <div className={`${meta.bgClass} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white flex-1 sm:flex-none`}>
                <p className="text-xs sm:text-sm font-mono font-black leading-tight">
                  {formatDateShort(date)}
                </p>
              </div>
            )}
          </div>

          {/* Event info */}
          <h4 className="text-xl sm:text-2xl font-semibold text-[var(--charcoal)] mb-1 leading-tight">
            {event.nameES}
          </h4>
          <p className="text-xs text-[var(--charcoal)]/60 italic mb-2">
            {event.nameEN}
          </p>
          <p className="text-xs sm:text-sm text-[var(--charcoal)]/75 leading-relaxed">
            {event.restaurantNote ? event.restaurantNote : event.descriptionES}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Month Section — Reduced size
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
    <div className="mb-8 sm:mb-0">
      {/* Month header */}
      <div className={`sticky sm:static top-[140px] z-20 sm:z-0 rounded-lg sm:rounded-xl border-b-4 p-4 sm:p-6 mb-4 sm:mb-0 transition-all duration-300 ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-gradient-to-r from-[var(--cilantro)]/20 via-white to-[var(--bone)]/20"
          : "border-black/10 bg-white shadow-sm"
      }`}>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-2xl sm:text-3xl font-light ${isCurrentMonth ? "text-[var(--cilantro)]" : "text-[var(--charcoal)]"}`}>
            {MONTHS_ES[monthIndex - 1]}
          </h3>
          {isCurrentMonth && <span className="text-xl">✨</span>}
        </div>
      </div>

      {/* Events */}
      <div className="sm:space-y-2 relative">
        {events.length === 0 ? (
          <div className="text-center py-8 sm:py-6 text-[var(--charcoal)]/40 italic">
            <p className="text-sm">—</p>
          </div>
        ) : (
          <>
            <div className="hidden sm:block absolute -left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--charcoal)]/20 to-[var(--charcoal)]/0" />
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                year={year}
                visible={true}
              />
            ))}
          </>
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

      {/* Calendar Section */}
      <section className="relative bg-gradient-to-b from-white via-[var(--bone)]/20 to-[var(--bone)]/50 py-10 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
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
            🎊 Haz que tu evento sea especial
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
