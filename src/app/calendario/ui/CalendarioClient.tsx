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
// Filter Bar
// ---------------------------------------------------------------------------
function FilterBar({
  active,
  onChange,
}: {
  active: FilterOption;
  onChange: (f: FilterOption) => void;
}) {
  const filters: Array<{ value: FilterOption; label: string; flag: string }> = [
    { value: "all", label: "Todos", flag: "✨" },
    { value: "mexico", label: "México", flag: CATEGORY_META.mexico.flag },
    { value: "usa", label: "EE.UU.", flag: CATEGORY_META.usa.flag },
    { value: "both", label: "Ambos", flag: CATEGORY_META.both.flag },
    { value: "food", label: "Comida", flag: CATEGORY_META.food.flag },
  ];

  return (
    <div className="sticky top-[68px] z-40 border-b border-black/10 bg-[var(--bone)]/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
        {filters.map((f) => {
          const isActive = active === f.value;
          let activeClass = "bg-[var(--charcoal)] text-[var(--bone)]";
          if (f.value !== "all" && isActive) {
            activeClass = CATEGORY_META[f.value as EventCategory].pillActive;
          }
          return (
            <button
              key={f.value}
              onClick={() => onChange(f.value)}
              className={`flex shrink-0 items-center gap-1.5 border px-4 py-2 text-[11px] font-mono tracking-[0.12em] uppercase transition-colors duration-150 ${
                isActive
                  ? `border-transparent ${activeClass}`
                  : "border-black/20 text-[var(--charcoal)]/55 hover:border-black/40 hover:text-[var(--charcoal)]/80"
              }`}
            >
              <span>{f.flag}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Upcoming Banner
// ---------------------------------------------------------------------------
function ProximasBanner({ events, year }: { events: CalendarEvent[]; year: number }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-[var(--bone)] py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--charcoal)]/45">
          Próximas celebraciones
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {events.map((event) => {
            const meta = CATEGORY_META[event.category];
            const date = resolveDate(event, year) ?? resolveDate(event, year + 1);
            return (
              <div
                key={event.id}
                className={`flex w-44 shrink-0 flex-col gap-2 border-l-4 bg-white/70 px-3 py-3 ring-1 ring-black/8 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${meta.borderClass}`}
              >
                <span className="text-2xl">{event.emoji}</span>
                <div>
                  <p className="font-heading text-[15px] font-semibold leading-tight text-[var(--charcoal)]">
                    {event.nameES}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--charcoal)]/40">
                    {event.nameEN}
                  </p>
                </div>
                {date && (
                  <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${meta.textClass}`}>
                    {formatDateShort(date)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Card
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);

  // monthSpan events get a wider "banner" style
  const isBanner = event.recurrence.kind === "monthSpan";

  return (
    <div
      title={event.descriptionES}
      className={`border-l-[3px] bg-white/60 px-3 transition-all duration-200 hover:bg-white hover:shadow-sm ${meta.borderClass} ${
        isBanner ? "py-2.5" : "py-2"
      } ${visible ? "opacity-100" : "pointer-events-none opacity-20"}`}
    >
      {isBanner ? (
        // Banner layout for month-span events
        <div className="flex items-center gap-2">
          <span className="text-base">{event.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[var(--charcoal)]/85">{event.nameES}</p>
            <p className={`font-mono text-[9px] uppercase tracking-[0.12em] ${meta.textClass}`}>
              todo el mes
            </p>
          </div>
        </div>
      ) : (
        // Compact inline layout
        <div className="flex items-center gap-2">
          <span className="text-sm">{event.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1.5">
              {date && (
                <span className={`shrink-0 font-mono text-[10px] font-semibold uppercase ${meta.textClass}`}>
                  {formatDateShort(date)}
                </span>
              )}
              <span className="truncate text-[12px] font-semibold text-[var(--charcoal)]/85">
                {event.nameES}
              </span>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--charcoal)]/35">
              {event.nameEN}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Month Column
// ---------------------------------------------------------------------------
function MonthColumn({
  monthIndex,
  year,
  activeFilter,
  isCurrentMonth,
}: {
  monthIndex: number; // 1-based
  year: number;
  activeFilter: FilterOption;
  isCurrentMonth: boolean;
}) {
  const events = getEventsForMonth(monthIndex, year);
  const monthNum = String(monthIndex).padStart(2, "0");

  return (
    <div
      className={`relative overflow-hidden border-t-2 pt-4 ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-[var(--cilantro)]/[0.04]"
          : "border-black/10"
      }`}
    >
      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 top-0 select-none font-heading text-[72px] font-light leading-none text-[var(--charcoal)]/[0.04]"
      >
        {monthNum}
      </span>

      {/* Month name */}
      <h3
        className={`mb-3 font-mono text-[11px] uppercase tracking-[0.22em] ${
          isCurrentMonth ? "text-[var(--cilantro)]" : "text-[var(--charcoal)]/35"
        }`}
      >
        {MONTHS_ES[monthIndex - 1]}
      </h3>

      {/* Event cards */}
      <div className="flex flex-col gap-1.5">
        {events.length === 0 ? (
          <p className="font-mono text-[10px] text-[var(--charcoal)]/20">—</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              year={year}
              visible={activeFilter === "all" || activeFilter === event.category}
            />
          ))
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
    <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-4 px-5 py-6 sm:px-8">
      {(Object.keys(CATEGORY_META) as EventCategory[]).map((cat) => {
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat} className="flex items-center gap-2">
            <span className={`h-3 w-1 ${meta.bgClass}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--charcoal)]/50">
              {meta.flag} {meta.labelES}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Client Component
// ---------------------------------------------------------------------------
export default function CalendarioClient({ upcoming, year }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const currentMonth = new Date().getMonth() + 1; // 1-based
  const currentYear = new Date().getFullYear();

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  return (
    <>
      {/* Upcoming Strip */}
      <ProximasBanner events={upcoming} year={year} />

      {/* Ornament divider */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="ornament" />
      </div>

      {/* Filter Bar */}
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      {/* Legend */}
      <Legend />

      {/* Year Grid */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {months.map((m) => (
            <MonthColumn
              key={m}
              monthIndex={m}
              year={year}
              activeFilter={activeFilter}
              isCurrentMonth={m === currentMonth && year === currentYear}
            />
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[var(--cilantro)] py-16 text-center">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.32em] text-white/50">
            Reservaciones · Catering · Eventos
          </p>
          <h2 className="mb-6 font-heading text-3xl font-light text-white sm:text-4xl">
            ¿Celebras algo especial?
          </h2>
          <p className="mb-8 text-white/70">
            Cuéntanos la ocasión y hacemos que sea inolvidable.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--cilantro)] transition hover:brightness-95"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  );
}
