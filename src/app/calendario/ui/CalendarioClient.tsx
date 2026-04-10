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
    <div className="border-b border-black/8 bg-white">
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
// Upcoming Events Strip
// ---------------------------------------------------------------------------
function UpcomingStrip({ events, year }: { events: CalendarEvent[]; year: number }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="mb-8 text-lg font-light text-[var(--charcoal)]/60 sm:text-xl">
          Próximas celebraciones
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((event) => {
            const meta = CATEGORY_META[event.category];
            const date = resolveDate(event, year) ?? resolveDate(event, year + 1);
            if (!date) return null;
            return (
              <div
                key={event.id}
                className="group cursor-default rounded-lg border border-black/5 bg-gradient-to-br from-white to-[var(--bone)]/30 p-6 transition-all duration-300 hover:border-black/15 hover:shadow-lg"
              >
                <p className={`text-5xl mb-3 ${meta.textClass}`}>{event.emoji}</p>
                <p className={`text-base font-bold mb-1 ${meta.textClass}`}>
                  {formatDateShort(date)}
                </p>
                <h3 className="text-lg font-semibold text-[var(--charcoal)] mb-2">
                  {event.nameES}
                </h3>
                <p className="text-sm text-[var(--charcoal)]/60">{event.descriptionES}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Card — Redesigned for clarity
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  return (
    <div
      title={event.descriptionES}
      className={`rounded-lg border-l-4 bg-gradient-to-r from-white to-[var(--bone)]/20 p-5 transition-all duration-200 hover:shadow-md ${
        meta.borderClass
      } ${visible ? "opacity-100" : "pointer-events-none opacity-20"}`}
    >
      {isBanner ? (
        // Month-span banner layout
        <div className="flex items-start gap-3">
          <span className="mt-1 text-3xl">{event.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--charcoal)]">{event.nameES}</p>
            <p className={`text-xs mt-1 ${meta.textClass} font-semibold uppercase tracking-wide`}>
              todo el mes
            </p>
          </div>
        </div>
      ) : (
        // Regular event card
        <div className="flex items-start gap-4">
          <span className="text-2xl shrink-0 mt-0.5">{event.emoji}</span>
          <div className="flex-1 min-w-0">
            {date && (
              <p className={`text-lg font-bold mb-1 ${meta.textClass}`}>
                {formatDateShort(date)}
              </p>
            )}
            <h4 className="text-base font-semibold text-[var(--charcoal)] leading-tight">
              {event.nameES}
            </h4>
            {event.nameEN && (
              <p className="text-xs text-[var(--charcoal)]/50 mt-1">{event.nameEN}</p>
            )}
          </div>
        </div>
      )}
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
  const events = getEventsForMonth(monthIndex, year);

  return (
    <div
      className={`rounded-xl border-t-4 p-8 transition-all duration-300 ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-gradient-to-br from-[var(--cilantro)]/8 via-white to-white shadow-md"
          : "border-black/8 bg-white"
      }`}
    >
      {/* Month Header */}
      <h3 className="text-2xl font-light text-[var(--charcoal)] mb-8">
        {MONTHS_ES[monthIndex - 1]}
      </h3>

      {/* Events */}
      {events.length === 0 ? (
        <p className="text-sm text-[var(--charcoal)]/30 italic">Sin celebraciones este mes</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              year={year}
              visible={activeFilter === "all" || activeFilter === event.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------
function Legend() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-10">
      <p className="text-sm text-[var(--charcoal)]/50 mb-4">Categorías</p>
      <div className="flex flex-wrap gap-6">
        {(Object.keys(CATEGORY_META) as EventCategory[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat} className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${meta.bgClass}`} />
              <span className="text-sm text-[var(--charcoal)]/70">
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

      {/* Calendar Grid */}
      <section className="bg-gradient-to-b from-white via-[var(--bone)]/20 to-[var(--bone)]/40 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="bg-[var(--cilantro)] py-20 sm:py-24 text-white">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-sm font-light uppercase tracking-[0.2em] text-white/70 mb-4">
            Celebraciones Especiales
          </p>
          <h2 className="text-4xl sm:text-5xl font-light mb-8 leading-tight">
            ¿Planeas algo para tu grupo?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Coordenemos una celebración especial en El Tepeyac. Catering, eventos privados,
            menús personalizados — hacemos que tu fecha sea inolvidable.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white px-10 py-4 text-base font-semibold text-[var(--cilantro)] rounded-lg transition hover:shadow-lg hover:-translate-y-0.5"
          >
            Reservar una celebración
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
