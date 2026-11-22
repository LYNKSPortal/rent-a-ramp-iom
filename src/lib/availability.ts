import { BOOKING_HOURS } from "@/lib/site-config";

export interface TimeSlot {
  time: string; // "09:00"
  hour: number;
  available: boolean;
}

/** Formats a decimal hour (e.g. 9.25) as a 24h time string (e.g. "09:15"). */
export function formatHour(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getTimeSlotsForDate(dateStr: string, rampId: string, durationHours: number): TimeSlot[] {
  if (!dateStr || !rampId || !Number.isFinite(durationHours) || durationHours <= 0) return [];
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay();
  const hoursForDay = BOOKING_HOURS.dayHours[day];
  if (!hoursForDay) return [];

  const { open, close } = hoursForDay;
  const slots: TimeSlot[] = [];

  for (let hour = open; hour + durationHours <= close; hour += BOOKING_HOURS.slotLengthHours) {
    slots.push({
      time: formatHour(hour),
      hour,
      available: true,
    });
  }

  return slots;
}

export function isDateOpenable(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay();
  return BOOKING_HOURS.dayHours[day] !== null;
}

/** Returns today's date as YYYY-MM-DD, used to constrain the date input. */
export function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}
