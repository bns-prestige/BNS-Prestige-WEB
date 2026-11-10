import { siteConfig } from '@/config/site';

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const fromISO = (s: string) => { const [y, m, d] = s.slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); };

const pad = (n: number) => String(n).padStart(2, '0');
export function timeOptions(): string[] {
  const { open, close, stepMinutes } = siteConfig.bookingHours;
  const out: string[] = [];
  for (let m = open * 60; m <= close * 60; m += stepMinutes) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return out;
}
/** "2026-11-02T10:00" → "02/11/2026 à 10:00" */
export function formatDateTimeFR(s: string): string {
  const d = fromISO(s);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} à ${s.slice(11, 16)}`;
}
/** "2026-11-02T10:00" → "lun. 02/11 à 10:00" */
export function formatShortFR(s: string): string {
  const d = fromISO(s);
  return `${d.toLocaleDateString('fr-BE', { weekday: 'short' })} ${pad(d.getDate())}/${pad(d.getMonth() + 1)} à ${s.slice(11, 16)}`;
}
