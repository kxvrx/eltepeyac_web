// ---------------------------------------------------------------------------
// Calendar data & utilities for El Tepeyac Taqueria
// ---------------------------------------------------------------------------

export type EventCategory = "both" | "mexico" | "usa" | "food";

export type RecurrenceRule =
  | { kind: "fixed"; month: number; day: number }
  | { kind: "nthWeekday"; month: number; nth: number; weekday: number } // weekday: 0=Sun
  | { kind: "range"; month: number; dayStart: number; dayEnd?: number; monthEnd?: number }
  | { kind: "monthSpan"; month: number }
  | { kind: "variable"; note: string };

export type CalendarEvent = {
  id: string;
  nameES: string;
  nameEN: string;
  emoji: string;
  category: EventCategory;
  recurrence: RecurrenceRule;
  descriptionES: string;
  restaurantNote?: string;
};

// ---------------------------------------------------------------------------
// Easter Sunday lookup table (Computus pre-computed)
// ---------------------------------------------------------------------------
const EASTER: Record<number, [number, number]> = {
  2024: [3, 31], // March 31
  2025: [4, 20], // April 20
  2026: [4, 5],  // April 5
  2027: [3, 28], // March 28
  2028: [4, 16], // April 16
  2029: [4, 1],  // April 1
  2030: [4, 21], // April 21
};

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------
export const CATEGORY_META: Record<
  EventCategory,
  { labelES: string; labelEN: string; flag: string; borderClass: string; bgClass: string; textClass: string; pillActive: string }
> = {
  both: {
    labelES: "Ambos",
    labelEN: "Both",
    flag: "🌎",
    borderClass: "border-[var(--maiz)]",
    bgClass: "bg-[var(--maiz)]",
    textClass: "text-[var(--maiz)]",
    pillActive: "bg-[var(--maiz)] text-[var(--charcoal)]",
  },
  mexico: {
    labelES: "México",
    labelEN: "Mexico",
    flag: "🇲🇽",
    borderClass: "border-[var(--cilantro)]",
    bgClass: "bg-[var(--cilantro)]",
    textClass: "text-[var(--cilantro)]",
    pillActive: "bg-[var(--cilantro)] text-[var(--bone)]",
  },
  usa: {
    labelES: "EE.UU.",
    labelEN: "USA",
    flag: "🇺🇸",
    borderClass: "border-[var(--oaxaca)]",
    bgClass: "bg-[var(--oaxaca)]",
    textClass: "text-[var(--oaxaca)]",
    pillActive: "bg-[var(--oaxaca)] text-[var(--bone)]",
  },
  food: {
    labelES: "Comida",
    labelEN: "Food",
    flag: "🍽️",
    borderClass: "border-[var(--salsa)]",
    bgClass: "bg-[var(--salsa)]",
    textClass: "text-[var(--salsa)]",
    pillActive: "bg-[var(--salsa)] text-[var(--bone)]",
  },
};

// ---------------------------------------------------------------------------
// All events
// ---------------------------------------------------------------------------
export const CALENDAR_EVENTS: CalendarEvent[] = [
  // ── Ambos (Mexico & USA) ──────────────────────────────────────────────────
  {
    id: "ano-nuevo",
    nameES: "Año Nuevo",
    nameEN: "New Year's Day",
    emoji: "🥂",
    category: "both",
    recurrence: { kind: "fixed", month: 1, day: 1 },
    descriptionES: "Inicio del año nuevo, celebrado con familia y brindis.",
    restaurantNote: "Menú especial de Año Nuevo y ambiente festivo.",
  },
  {
    id: "semana-santa",
    nameES: "Semana Santa",
    nameEN: "Holy Week / Easter",
    emoji: "✝️",
    category: "both",
    recurrence: { kind: "variable", note: "Easter Sunday (lookup table)" },
    descriptionES: "Observancia religiosa más importante en México. Pascua de Resurrección.",
    restaurantNote: "Menú cuaresmal con especialidades de mariscos y mole.",
  },
  {
    id: "cinco-de-mayo",
    nameES: "Cinco de Mayo",
    nameEN: "Cinco de Mayo",
    emoji: "🎉",
    category: "both",
    recurrence: { kind: "fixed", month: 5, day: 5 },
    descriptionES: "Victoria mexicana en la Batalla de Puebla (1862). Muy celebrado en EE.UU.",
    restaurantNote: "Fiesta con platillos poblanos, música y decoración especial.",
  },
  {
    id: "dia-del-padre",
    nameES: "Día del Padre",
    nameEN: "Father's Day",
    emoji: "👨‍👧",
    category: "both",
    recurrence: { kind: "nthWeekday", month: 6, nth: 3, weekday: 0 },
    descriptionES: "Celebración para los padres, coincide en México y EE.UU. el mismo día.",
    restaurantNote: "Paquetes especiales para grupos familiares.",
  },
  {
    id: "dia-de-muertos",
    nameES: "Día de Muertos",
    nameEN: "Day of the Dead",
    emoji: "💀",
    category: "both",
    recurrence: { kind: "range", month: 11, dayStart: 1, dayEnd: 2 },
    descriptionES: "Celebración mexicana de raíces prehispánicas y católicas. Patrimonio Inmaterial de la UNESCO.",
    restaurantNote: "Altar de muertos en el restaurante, pan de muerto y platillos tradicionales.",
  },
  {
    id: "navidad",
    nameES: "Navidad",
    nameEN: "Christmas",
    emoji: "🎄",
    category: "both",
    recurrence: { kind: "fixed", month: 12, day: 25 },
    descriptionES: "Celebración navideña con reunión familiar y tradiciones.",
    restaurantNote: "Menú navideño y ambiente festivo para toda la familia.",
  },

  // ── México / MEX-AM ───────────────────────────────────────────────────────
  {
    id: "dia-de-reyes",
    nameES: "Día de Reyes",
    nameEN: "Three Kings Day",
    emoji: "👑",
    category: "mexico",
    recurrence: { kind: "fixed", month: 1, day: 6 },
    descriptionES: "Epifanía: llegada de los Reyes Magos. Los niños reciben regalos y se comparte la Rosca de Reyes.",
    restaurantNote: "Ofrecemos Rosca de Reyes con chocolate caliente y pan dulce.",
  },
  {
    id: "dia-candelaria",
    nameES: "Día de la Candelaria",
    nameEN: "Candlemas",
    emoji: "🫔",
    category: "mexico",
    recurrence: { kind: "fixed", month: 2, day: 2 },
    descriptionES: "Tradición de comer tamales. ¡México consume ~40 millones de tamales este día!",
    restaurantNote: "Festival de tamales: variedades tradicionales y regionales.",
  },
  {
    id: "dia-madres-mx",
    nameES: "Día de las Madres",
    nameEN: "Mother's Day (MX)",
    emoji: "🌹",
    category: "mexico",
    recurrence: { kind: "fixed", month: 5, day: 10 },
    descriptionES: "Fecha fija en México para honrar a las madres. Mariachis, mole y festejo familiar.",
    restaurantNote: "Serenata con mariachi, menú especial y ambiente celebratorio.",
  },
  {
    id: "independencia",
    nameES: "Fiestas Patrias",
    nameEN: "Mexican Independence Day",
    emoji: "🎆",
    category: "mexico",
    recurrence: { kind: "range", month: 9, dayStart: 15, dayEnd: 16 },
    descriptionES: "El Grito de Dolores (1810) y celebración de la Independencia de México.",
    restaurantNote: "¡El Grito!, pozole, menudo, música regional y decoración tricolor.",
  },
  {
    id: "heritage-month",
    nameES: "Mes de la Herencia Hispana",
    nameEN: "Hispanic Heritage Month",
    emoji: "🌮",
    category: "mexico",
    recurrence: { kind: "range", month: 9, dayStart: 15, monthEnd: 10 },
    descriptionES: "30 días de reconocimiento a las contribuciones hispanas en EE.UU. (15 sep – 15 oct).",
    restaurantNote: "Programación cultural mensual, cocina regional de diferentes estados mexicanos.",
  },
  {
    id: "dia-revolucion",
    nameES: "Día de la Revolución",
    nameEN: "Revolution Day",
    emoji: "🏇",
    category: "mexico",
    recurrence: { kind: "nthWeekday", month: 11, nth: 3, weekday: 1 },
    descriptionES: "Conmemoración de la Revolución Mexicana (1910–1920).",
    restaurantNote: "Decoración histórica y platillos tradicionales de la época.",
  },
  {
    id: "virgen-guadalupe",
    nameES: "Virgen de Guadalupe",
    nameEN: "Our Lady of Guadalupe",
    emoji: "🕯️",
    category: "mexico",
    recurrence: { kind: "fixed", month: 12, day: 12 },
    descriptionES: "Patrona de México. Celebración religiosa y cultural con peregrinaciones y misas especiales.",
    restaurantNote: "Tributo a la Virgen de Guadalupe, comida tradicional y ambiente devocional.",
  },

  // ── EE.UU. ────────────────────────────────────────────────────────────────
  {
    id: "super-bowl",
    nameES: "Super Bowl",
    nameEN: "Super Bowl Sunday",
    emoji: "🏈",
    category: "usa",
    recurrence: { kind: "nthWeekday", month: 2, nth: 1, weekday: 0 },
    descriptionES: "El mayor evento deportivo de EE.UU. — 53 millones de libras de guacamole consumidas.",
    restaurantNote: "Super especial de guacamole y botanas. El mejor guac para el partido.",
  },
  {
    id: "san-valentin",
    nameES: "San Valentín",
    nameEN: "Valentine's Day",
    emoji: "💘",
    category: "usa",
    recurrence: { kind: "fixed", month: 2, day: 14 },
    descriptionES: "Día del amor y la amistad. Cenas románticas y celebraciones en pareja.",
    restaurantNote: "Menú romántico para parejas, margaritas especiales y ambiente íntimo.",
  },
  {
    id: "dia-madres-us",
    nameES: "Día de las Madres (EE.UU.)",
    nameEN: "Mother's Day (US)",
    emoji: "💐",
    category: "usa",
    recurrence: { kind: "nthWeekday", month: 5, nth: 2, weekday: 0 },
    descriptionES: "Segundo domingo de mayo en EE.UU. — puede coincidir con el Día de las Madres en México (10 mayo).",
    restaurantNote: "Celebración especial para mamás, menú de lujo y mariachi.",
  },
  {
    id: "independence-us",
    nameES: "Día de la Independencia",
    nameEN: "Independence Day (US)",
    emoji: "🇺🇸",
    category: "usa",
    recurrence: { kind: "fixed", month: 7, day: 4 },
    descriptionES: "Independencia de EE.UU. Celebración nacional con fuegos artificiales y reuniones.",
    restaurantNote: "Ambiente festivo con mezcla de tradiciones mexicanas y americanas.",
  },
  {
    id: "avocado-day",
    nameES: "Día Nacional del Aguacate",
    nameEN: "National Avocado Day",
    emoji: "🥑",
    category: "usa",
    recurrence: { kind: "fixed", month: 7, day: 31 },
    descriptionES: "Celebración del aguacate, ingrediente fundamental de la cocina mexicana.",
    restaurantNote: "Guacamole gratis con cualquier orden. ¡El mejor aguacate de la ciudad!",
  },
  {
    id: "labor-day",
    nameES: "Día del Trabajo",
    nameEN: "Labor Day (US)",
    emoji: "🛠️",
    category: "usa",
    recurrence: { kind: "nthWeekday", month: 9, nth: 1, weekday: 1 },
    descriptionES: "Feriado federal que marca el fin del verano en EE.UU.",
    restaurantNote: "Especiales de temporada y ambiente familiar para el puente.",
  },
  {
    id: "taco-day-us",
    nameES: "Día Nacional del Taco (EE.UU.)",
    nameEN: "National Taco Day",
    emoji: "🌮",
    category: "usa",
    recurrence: { kind: "nthWeekday", month: 10, nth: 1, weekday: 2 },
    descriptionES: "El taco más celebrado en EE.UU. Creado en San Antonio (1967).",
    restaurantNote: "Descuentos en tacos y showcase de variedades tradicionales.",
  },
  {
    id: "thanksgiving",
    nameES: "Día de Acción de Gracias",
    nameEN: "Thanksgiving",
    emoji: "🦃",
    category: "usa",
    recurrence: { kind: "nthWeekday", month: 11, nth: 4, weekday: 4 },
    descriptionES: "Feriado familiar americano. Reuniones con toda la familia.",
    restaurantNote: "Menú especial de Acción de Gracias con toque mexicano.",
  },

  // ── Comida ────────────────────────────────────────────────────────────────
  {
    id: "dia-taco-mx",
    nameES: "Día del Taco",
    nameEN: "Taco Day (MX)",
    emoji: "🌮",
    category: "food",
    recurrence: { kind: "fixed", month: 3, day: 31 },
    descriptionES: "Día Nacional del Taco en México. Celebra el platillo más icónico del país.",
    restaurantNote: "Degustación de tacos tradicionales y modernos. Historia del taco mexicano.",
  },
  {
    id: "burrito-day",
    nameES: "Día Nacional del Burrito",
    nameEN: "National Burrito Day",
    emoji: "🌯",
    category: "food",
    recurrence: { kind: "nthWeekday", month: 4, nth: 1, weekday: 4 },
    descriptionES: "Primer jueves de abril. Celebración del burrito como ícono de la cocina mexicana-americana.",
    restaurantNote: "Especiales y variedades de burritos del día.",
  },
  {
    id: "salsa-month",
    nameES: "Mes de la Salsa",
    nameEN: "National Salsa Month",
    emoji: "💃",
    category: "food",
    recurrence: { kind: "monthSpan", month: 5 },
    descriptionES: "Todo mayo dedicado a celebrar la salsa — condimento fundamental de la cocina mexicana.",
    restaurantNote: "Clases de salsa, degustaciones y diferentes variedades todo el mes.",
  },
  {
    id: "guacamole-day",
    nameES: "Día Nacional del Guacamole",
    nameEN: "National Guacamole Day",
    emoji: "🥑",
    category: "food",
    recurrence: { kind: "fixed", month: 9, day: 16 },
    descriptionES: "¡Coincide con el Día de la Independencia de México! Doble celebración.",
    restaurantNote: "Guacamole gratis con cualquier orden. ¡Viva México y el guac!",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the nth weekday of a given month/year. nth=1 means "first", nth=3 "third", etc. */
function nthWeekdayDate(year: number, month: number, nth: number, weekday: number): Date {
  // month is 1-based here
  const first = new Date(year, month - 1, 1);
  const firstWd = first.getDay(); // 0=Sun
  let diff = weekday - firstWd;
  if (diff < 0) diff += 7;
  const day = 1 + diff + (nth - 1) * 7;
  return new Date(year, month - 1, day);
}

/**
 * Resolves the primary start Date for an event in a given year.
 * Returns null if the year is not in the Easter lookup table for variable events.
 */
export function resolveDate(event: CalendarEvent, year: number): Date | null {
  const { recurrence } = event;
  switch (recurrence.kind) {
    case "fixed":
      return new Date(year, recurrence.month - 1, recurrence.day);
    case "range":
      return new Date(year, recurrence.month - 1, recurrence.dayStart);
    case "monthSpan":
      return new Date(year, recurrence.month - 1, 1);
    case "nthWeekday":
      return nthWeekdayDate(year, recurrence.month, recurrence.nth, recurrence.weekday);
    case "variable": {
      const entry = EASTER[year];
      if (!entry) return null;
      return new Date(year, entry[0] - 1, entry[1]);
    }
  }
}

/** Format a Date as "DD MMM" in Spanish, e.g. "16 SEP" */
export function formatDateShort(date: Date): string {
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  return `${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]}`;
}

/**
 * Returns all events that fall within a given month (1-based) and year.
 * Handles cross-month ranges (e.g. Hispanic Heritage Month Sep 15 – Oct 15).
 */
export function getEventsForMonth(month: number, year: number): CalendarEvent[] {
  return CALENDAR_EVENTS.filter((event) => {
    const r = event.recurrence;
    if (r.kind === "fixed") return r.month === month;
    if (r.kind === "nthWeekday") return r.month === month;
    if (r.kind === "monthSpan") return r.month === month;
    if (r.kind === "range") {
      const startMonth = r.month;
      const endMonth = r.monthEnd ?? r.month;
      return month >= startMonth && month <= endMonth;
    }
    if (r.kind === "variable") {
      const date = resolveDate(event, year);
      return date !== null && date.getMonth() + 1 === month;
    }
    return false;
  });
}

/**
 * Returns events whose resolved date falls within the next `windowDays` days from `today`.
 * Sorted by ascending date.
 */
export function getUpcomingEvents(today: Date, windowDays = 45): CalendarEvent[] {
  const year = today.getFullYear();
  const windowEnd = new Date(today);
  windowEnd.setDate(windowEnd.getDate() + windowDays);

  const results: Array<{ event: CalendarEvent; date: Date }> = [];

  for (const year2 of [year, year + 1]) {
    for (const event of CALENDAR_EVENTS) {
      const date = resolveDate(event, year2);
      if (!date) continue;
      if (date >= today && date <= windowEnd) {
        results.push({ event, date });
      }
    }
  }

  results.sort((a, b) => a.date.getTime() - b.date.getTime());
  // deduplicate by id (can appear in both years loop if window crosses new year)
  const seen = new Set<string>();
  return results.filter(({ event }) => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  }).map(({ event }) => event);
}

export const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
