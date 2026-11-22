import { BOOKING_DURATIONS, Ramp } from "@/lib/site-config";

export type DurationId = (typeof BOOKING_DURATIONS)[number]["id"];

export function computePrice(ramp: Ramp, durationId: DurationId): number {
  switch (durationId) {
    case "1h":
      return ramp.pricing.firstHour;
    case "2h":
      return ramp.pricing.firstHour + ramp.pricing.additionalHour;
    case "half":
      return ramp.pricing.halfDay;
    case "full":
      return ramp.pricing.fullDay;
    default:
      return 0;
  }
}

export function durationHours(durationId: DurationId): number {
  return BOOKING_DURATIONS.find((d) => d.id === durationId)?.hours ?? 1;
}
