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
// Filter Tabs
// ---------------------------------------------------------------------------
function FilterTabs({
  active,
  onChange,
}: {
  active: FilterOption;
  onChange: (f: FilterOption) => void;
}) {
  const filters: Array<{ value: FilterOption; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "mexico", label: "🇲🇽 México" },
    { value: "usa", label: "🇺🇸 EE.UU." },
    { value: "both", label: "🌎 Ambos" },
    { value: "food", label: "🍽️ Comida" },
  ];

  return (
    <div className="border-b border-black/8 bg-white sticky top-[68px] z-30">
      <div className="mx-auto flex w-full max-w-6xl gap-8 overflow-x-auto px-5 sm:px-8 py-6">
        {filters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onChange(f.value)}
              className={`shrink-0 pb-2 text-base font-medium transition-colors duration-200 border-b-2 ${
                isActive
                  ? "border-[var(--charcoal)] text-[var(--charcoal)]"
                  : "border-transparent text-[var(--charcoal)]/50 hover:text-[var(--charcoal)]/75"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Upcoming Events Strip — HERO style
// ---------------------------------------------------------------------------
function UpcomingStrip({ events, year }: { events: CalendarEvent[]; year: number }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-20 border-b-4 border-[var(--cilantro)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="mb-10 text-2xl sm:text-3xl font-light text-[var(--charcoal)]">
          🎉 Próximas celebraciones
        </p>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((event) => {
            const meta = CATEGORY_META[event.category];
            const date = resolveDate(event, year) ?? resolveDate(event, year + 1);
            if (!date) return null;

            return (
              <div
                key={event.id}
                className="group relative h-full cursor-pointer"
              >
                {/* Card background with dynamic color */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                  event.category === "mexico" ? "from-[var(--cilantro)]/15 to-[var(--cilantro)]/5" :
                  event.category === "usa" ? "from-[var(--oaxaca)]/15 to-[var(--oaxaca)]/5" :
                  event.category === "both" ? "from-[var(--maiz)]/15 to-[var(--maiz)]/5" :
                  "from-[var(--salsa)]/15 to-[var(--salsa)]/5"
                } border-2 ${meta.borderClass} transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`} />

                {/* Content */}
                <div className="relative p-6 sm:p-8 h-full flex flex-col">
                  {/* Giant emoji */}
                  <p className="text-7xl sm:text-8xl mb-4 leading-none">{event.emoji}</p>

                  {/* Date badge */}
                  <p className={`text-xl sm:text-2xl font-black mb-3 ${meta.textClass}`}>
                    {formatDateShort(date)}
                  </p>

                  {/* Event name */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-[var(--charcoal)] mb-3">
                    {event.nameES}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[var(--charcoal)]/70 leading-relaxed flex-grow">
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
// Event Card — Completely new design (MOBILE FIRST)
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  if (!visible) return null;

  if (isBanner) {
    // Month-span banner
    return (
      <div className="relative group mb-3 last:mb-0">
        <div className={`flex items-center gap-4 w-full rounded-xl border-l-8 ${meta.borderClass} bg-gradient-to-r from-white/80 to-[var(--bone)]/40 p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:scale-102`}>
          <span className="text-4xl sm:text-5xl shrink-0">{event.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-base sm:text-lg font-bold text-[var(--charcoal)]">{event.nameES}</p>
            <p className={`text-xs sm:text-sm mt-1.5 ${meta.textClass} font-bold uppercase tracking-wider`}>
              ⏰ TODO EL MES
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group mb-4 last:mb-0">
      {/* Timeline dot (visible on sm+) */}
      <div className="hidden sm:block absolute -left-7 top-6 w-4 h-4 rounded-full border-2 border-[var(--bone)] bg-white shadow-md group-hover:bg-[var(--charcoal)] transition-colors" />
      <div className={`hidden sm:block absolute -left-4 top-10 w-0.5 h-16 bg-black/10`} />

      {/* Main card */}
      <div className={`rounded-2xl border-l-8 ${meta.borderClass} overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-102 group/card`}>
        {/* Top color bar */}
        <div className={`h-2 w-full ${meta.bgClass}`} />

        {/* Content wrapper with gradient */}
        <div className={`bg-gradient-to-br ${
          event.category === "mexico" ? "from-white via-[var(--cilantro)]/[0.02] to-[var(--cilantro)]/[0.05]" :
          event.category === "usa" ? "from-white via-[var(--oaxaca)]/[0.02] to-[var(--oaxaca)]/[0.05]" :
          event.category === "both" ? "from-white via-[var(--maiz)]/[0.02] to-[var(--maiz)]/[0.05]" :
          "from-white via-[var(--salsa)]/[0.02] to-[var(--salsa)]/[0.05]"
        } p-5 sm:p-7`}>
          {/* Header row: emoji + date */}
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl sm:text-6xl shrink-0 leading-none">{event.emoji}</span>
            {date && (
              <div className={`${meta.bgClass} rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white flex-1 sm:flex-none`}>
                <p className="text-sm sm:text-base font-mono font-black leading-tight">
                  {formatDateShort(date)}
                </p>
              </div>
            )}
          </div>

          {/* Event name */}
          <h4 className="text-2xl sm:text-3xl font-semibold text-[var(--charcoal)] mb-2 leading-tight">
            {event.nameES}
          </h4>

          {/* English name + description */}
          <p className="text-xs sm:text-sm text-[var(--charcoal)]/60 italic mb-3">
            {event.nameEN}
          </p>
          <p className="text-sm sm:text-base text-[var(--charcoal)]/75 leading-relaxed">
            {event.restaurantNote ? event.restaurantNote : event.descriptionES}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Month Section — REDESIGNED for mobile
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
    <div className="mb-12 sm:mb-0">
      {/* Month header — STICKY on mobile */}
      <div className={`sticky sm:static top-[140px] z-20 sm:z-0 rounded-xl sm:rounded-2xl border-b-4 p-6 sm:p-8 mb-6 sm:mb-0 transition-all duration-300 ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-gradient-to-r from-[var(--cilantro)]/20 via-white to-[var(--bone)]/20"
          : "border-black/10 bg-white shadow-sm"
      }`}>
        <div className="flex items-baseline gap-3">
          <h3 className={`text-3xl sm:text-4xl font-light ${isCurrentMonth ? "text-[var(--cilantro)]" : "text-[var(--charcoal)]"}`}>
            {MONTHS_ES[monthIndex - 1]}
          </h3>
          {isCurrentMonth && (
            <span className="text-2xl">✨</span>
          )}
        </div>
        {isCurrentMonth && (
          <p className="text-sm text-[var(--cilantro)] mt-2 font-semibold uppercase tracking-wider">
            Celebraciones este mes
          </p>
        )}
      </div>

      {/* Events list */}
      <div className="sm:space-y-3 relative">
        {events.length === 0 ? (
          <div className="text-center py-12 sm:py-8 text-[var(--charcoal)]/40 italic">
            <p className="text-lg">—</p>
            <p className="text-sm mt-2">Sin celebraciones</p>
          </div>
        ) : (
          <>
            {/* Timeline line for desktop */}
            <div className="hidden sm:block absolute -left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--charcoal)]/20 to-[var(--charcoal)]/0" />

            {/* Event cards */}
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
// Legend
// ---------------------------------------------------------------------------
function Legend() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-8 sm:py-12">
      <p className="text-sm sm:text-base text-[var(--charcoal)]/50 mb-6 font-semibold uppercase tracking-wider">
        Categorías
      </p>
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 sm:gap-8">
        {(Object.keys(CATEGORY_META) as EventCategory[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat} className="flex items-center gap-3">
              <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-lg ${meta.bgClass} ring-2 ring-offset-1 ring-black/10`} />
              <span className="text-sm sm:text-base font-medium text-[var(--charcoal)]">
                {meta.labelES}
              </span>
            </div>
          );
        })}
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

      {/* Filter Tabs */}
      <FilterTabs active={activeFilter} onChange={setActiveFilter} />

      {/* Legend */}
      <Legend />

      {/* Calendar Section */}
      <section className="relative bg-gradient-to-b from-white via-[var(--bone)]/20 to-[var(--bone)]/50 py-12 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {/* Mobile: Vertical list, Desktop: 3-column grid */}
          <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-10 lg:gap-14">
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
      <section className="bg-gradient-to-br from-[var(--cilantro)] to-[var(--cilantro)]/95 py-16 sm:py-24 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-sm sm:text-base font-light uppercase tracking-[0.2em] text-white/75 mb-4">
            🎊 Haz que tu evento sea especial
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight">
            ¿Celebras algo importante?
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Coordina con nosotros catering, eventos privados, menús especiales para tu grupo.
            El Tepeyac es el lugar perfecto para tus celebraciones.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-[var(--cilantro)] rounded-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            <span>✉️</span>
            <span>Contacta con nosotros</span>
          </Link>
        </div>
      </section>
    </>
  );
}
