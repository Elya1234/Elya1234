export interface DayAvailability {
  date: Date;
  slots: string[];
}

const SLOT_TIMES = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:30"];

/** Génère les 14 prochains jours ouvrés (hors dimanche) avec des créneaux disponibles déterministes. */
export function generateAvailability(startDate: Date = new Date()): DayAvailability[] {
  const days: DayAvailability[] = [];
  const cursor = new Date(startDate);
  cursor.setHours(0, 0, 0, 0);

  while (days.length < 14) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) continue; // fermé le dimanche
    const seed = cursor.getDate() % 3;
    const slots = SLOT_TIMES.filter((_, i) => (i + seed) % 3 !== 0);
    days.push({ date: new Date(cursor), slots });
  }
  return days;
}

export function formatDayLabel(date: Date, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(date);
}
