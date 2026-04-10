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
// Upcoming Events Strip
// ---------------------------------------------------------------------------
function UpcomingStrip({ events, year }: { events: CalendarEvent[]; year: number }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-white py-10 sm:py-14 border-b border-black/10">
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
              <div key={event.id} className="group cursor-pointer">
                <div className={`relative h-full p-5 sm:p-6 rounded-xl border-2 ${meta.borderClass} bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  <p className="text-5xl mb-3">{event.emoji}</p>
                  <p className={`text-sm sm:text-base font-bold mb-2 ${meta.textClass}`}>
                    {formatDateShort(date)}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--charcoal)] mb-2">
                    {event.nameES}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--charcoal)]/65 leading-relaxed">
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
// NEW: Event Card Design — Super Clean & Minimal
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  if (!visible) return null;

  return (
    <div className={`group cursor-default transition-all duration-300 ${visible ? "opacity-100" : "opacity-20 pointer-events-none"}`}>
      <div className={`flex items-start gap-4 px-4 sm:px-5 py-4 sm:py-5 rounded-lg hover:bg-[var(--bone)]/30 transition-colors duration-200 border-l-4 ${meta.borderClass}`}>
        {/* Emoji + Date Column */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span className={`text-3xl sm:text-4xl`}>{event.emoji}</span>
          {!isBanner && date && (
            <span className={`text-xs sm:text-sm font-black ${meta.textClass} text-center leading-tight`}>
              {formatDateShort(date)}
            </span>
          )}
          {isBanner && (
            <span className={`text-xs ${meta.textClass} font-bold uppercase tracking-wider`}>
              TODO MES
            </span>
          )}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-base sm:text-lg font-semibold text-[var(--charcoal)] leading-snug mb-1">
            {event.nameES}
          </h4>
          {!isBanner && event.nameEN && (
            <p className="text-xs text-[var(--charcoal)]/50 italic mb-2">
              {event.nameEN}
            </p>
          )}
          <p className="text-xs sm:text-sm text-[var(--charcoal)]/70 leading-relaxed">
            {event.restaurantNote || event.descriptionES}
          </p>
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
      <div className={`sticky sm:static top-[140px] z-20 sm:z-0 px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-b-4 transition-all duration-300 mb-3 sm:mb-4 ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-gradient-to-r from-[var(--cilantro)]/10 to-transparent"
          : "border-black/8 bg-white/50"
      }`}>
        <h3 className={`text-2xl sm:text-2xl font-light ${isCurrentMonth ? "text-[var(--cilantro)]" : "text-[var(--charcoal)]"}`}>
          {MONTHS_ES[monthIndex - 1]}
        </h3>
      </div>

      {/* Events list */}
      <div className="space-y-0 border-l-4 border-black/5 rounded-lg overflow-hidden">
        {events.length === 0 ? (
          <div className="text-center py-6 sm:py-5 text-[var(--charcoal)]/30 text-sm italic">
            —
          </div>
        ) : (
          events.map((event, idx) => (
            <div key={event.id} className={idx !== events.length - 1 ? "border-b border-black/5" : ""}>
              <EventCard
                event={event}
                year={year}
                visible={true}
              />
            </div>
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
