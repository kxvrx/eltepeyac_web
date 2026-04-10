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

            // Map category to color values for more vibrant styling
            const colorMap: Record<EventCategory, { bg: string; border: string; accent: string }> = {
              mexico: { bg: "from-[var(--cilantro)]/10", border: "border-[var(--cilantro)]", accent: "bg-[var(--cilantro)]" },
              usa: { bg: "from-[var(--oaxaca)]/10", border: "border-[var(--oaxaca)]", accent: "bg-[var(--oaxaca)]" },
              both: { bg: "from-[var(--maiz)]/10", border: "border-[var(--maiz)]", accent: "bg-[var(--maiz)]" },
              food: { bg: "from-[var(--salsa)]/10", border: "border-[var(--salsa)]", accent: "bg-[var(--salsa)]" },
            };

            const colors = colorMap[event.category];

            return (
              <div
                key={event.id}
                className={`group rounded-xl border-t-4 ${colors.border} bg-gradient-to-br ${colors.bg} to-white/50 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden`}
              >
                {/* Decorative top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent}`} />

                <p className="text-5xl mb-4">{event.emoji}</p>
                <p className={`text-sm font-bold mb-2 ${meta.textClass}`}>
                  {formatDateShort(date)}
                </p>
                <h3 className="text-lg font-semibold text-[var(--charcoal)] mb-3">
                  {event.nameES}
                </h3>
                <p className="text-sm text-[var(--charcoal)]/65 leading-relaxed">
                  {event.descriptionES}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Event Card — Distinctive & Characterful
// ---------------------------------------------------------------------------
function EventCard({ event, year, visible }: { event: CalendarEvent; year: number; visible: boolean }) {
  const meta = CATEGORY_META[event.category];
  const date = resolveDate(event, year);
  const isBanner = event.recurrence.kind === "monthSpan";

  // Map category to vibrant colors and visual style
  const styleMap: Record<EventCategory, { topBg: string; cardBg: string; textColor: string; accentColor: string; lightBg: string }> = {
    mexico: {
      topBg: "bg-[var(--cilantro)]",
      cardBg: "from-[var(--cilantro)]/8",
      textColor: "text-[var(--cilantro)]",
      accentColor: "bg-[var(--cilantro)]/20",
      lightBg: "bg-[var(--cilantro)]/[0.03]"
    },
    usa: {
      topBg: "bg-[var(--oaxaca)]",
      cardBg: "from-[var(--oaxaca)]/8",
      textColor: "text-[var(--oaxaca)]",
      accentColor: "bg-[var(--oaxaca)]/20",
      lightBg: "bg-[var(--oaxaca)]/[0.03]"
    },
    both: {
      topBg: "bg-[var(--maiz)]",
      cardBg: "from-[var(--maiz)]/8",
      textColor: "text-[var(--maiz)]",
      accentColor: "bg-[var(--maiz)]/20",
      lightBg: "bg-[var(--maiz)]/[0.03]"
    },
    food: {
      topBg: "bg-[var(--salsa)]",
      cardBg: "from-[var(--salsa)]/8",
      textColor: "text-[var(--salsa)]",
      accentColor: "bg-[var(--salsa)]/20",
      lightBg: "bg-[var(--salsa)]/[0.03]"
    },
  };

  const style = styleMap[event.category];

  return (
    <div
      title={event.descriptionES}
      className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:scale-102 group ${
        visible ? "opacity-100" : "pointer-events-none opacity-20"
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 ${style.topBg} w-full`} />

      <div className={`bg-gradient-to-br ${style.cardBg} to-white p-6`}>
        {isBanner ? (
          // Month-span banner layout
          <div className="flex items-start gap-4">
            <span className="text-4xl shrink-0">{event.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-[var(--charcoal)]">{event.nameES}</p>
              <p className={`text-xs mt-2 ${style.textColor} font-bold uppercase tracking-wider`}>
                📅 TODO EL MES
              </p>
            </div>
          </div>
        ) : (
          // Regular event card with prominent date
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <span className="text-3xl shrink-0">{event.emoji}</span>
              <div className={`${style.accentColor} rounded-lg px-3 py-2 text-right`}>
                {date && (
                  <p className={`text-sm font-black ${style.textColor} leading-tight`}>
                    {formatDateShort(date)}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[var(--charcoal)] leading-snug">
                {event.nameES}
              </h4>
              {event.nameEN && (
                <p className="text-xs text-[var(--charcoal)]/50 mt-1 italic">{event.nameEN}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Month Section — With visual hierarchy
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
      className={`rounded-2xl border-t-4 transition-all duration-300 overflow-hidden ${
        isCurrentMonth
          ? "border-[var(--cilantro)] bg-gradient-to-br from-[var(--cilantro)]/12 via-white to-[var(--bone)]/30 shadow-lg ring-2 ring-[var(--cilantro)]/20"
          : "border-black/10 bg-white shadow-sm hover:shadow-md"
      }`}
    >
      {/* Month header with background */}
      <div className={`px-8 py-6 border-b ${isCurrentMonth ? "border-[var(--cilantro)]/20 bg-gradient-to-r from-[var(--cilantro)]/8 to-transparent" : "border-black/5"}`}>
        <h3 className={`text-2xl font-light ${isCurrentMonth ? "text-[var(--cilantro)]" : "text-[var(--charcoal)]"}`}>
          {MONTHS_ES[monthIndex - 1]}
        </h3>
        {isCurrentMonth && (
          <p className="text-xs text-[var(--cilantro)] mt-1 uppercase tracking-wide font-bold">
            ✨ Mes actual
          </p>
        )}
      </div>

      {/* Events list */}
      <div className="p-6 space-y-4">
        {events.length === 0 ? (
          <p className="text-sm text-[var(--charcoal)]/30 italic py-8 text-center">
            Sin celebraciones este mes
          </p>
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
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-10">
      <p className="text-sm text-[var(--charcoal)]/50 mb-5 font-semibold uppercase tracking-wider">
        Categorías
      </p>
      <div className="flex flex-wrap gap-6">
        {(Object.keys(CATEGORY_META) as EventCategory[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat} className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${meta.bgClass} ring-2 ring-offset-1 ring-black/10`} />
              <span className="text-base font-medium text-[var(--charcoal)]">
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

      {/* Calendar Grid with vibrant background */}
      <section className="relative bg-gradient-to-b from-white via-[var(--bone)]/30 to-[var(--bone)]/50 py-20 sm:py-28">
        {/* Decorative background element */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(31,78,168,.05) 35px, rgba(31,78,168,.05) 70px)"
        }} />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
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

      {/* CTA Section with personality */}
      <section className="bg-gradient-to-br from-[var(--cilantro)] via-[var(--cilantro)] to-[var(--cilantro)]/90 py-20 sm:py-24 text-white relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-sm font-light uppercase tracking-[0.2em] text-white/70 mb-4">
            🎉 Celebraciones Especiales
          </p>
          <h2 className="text-4xl sm:text-5xl font-light mb-8 leading-tight">
            ¿Planeas algo para tu grupo?
          </h2>
          <p className="text-lg text-white/85 mb-10 leading-relaxed">
            Coordenemos una celebración especial en El Tepeyac. Catering, eventos privados,
            menús personalizados — hacemos que tu fecha sea inolvidable.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white px-10 py-4 text-base font-bold text-[var(--cilantro)] rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            Reservar una celebración
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
