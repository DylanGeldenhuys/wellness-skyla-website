/**
 * Formats a ZAR price. Outputs "R 750" (space, no decimals).
 */
export function formatPrice(zar: number): string {
  return `R ${zar.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;
}

/**
 * Formats a duration in minutes into a human-readable string.
 * 30 → "30 min" | 60 → "1 hr" | 90 → "1 hr 30 min" | 95 → "1 hr 35 min"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}
