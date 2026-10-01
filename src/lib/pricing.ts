import type { Vehicle } from './types';
import { diffDays, fromISO } from './dates';

export const eur = (n: number) => `${new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 0 }).format(n)} €`;

/**
 * Estimation affichée au client. Le prix officiel est recalculé côté serveur
 * (fonction SQL compute_price) : les deux règles doivent rester identiques.
 * - Week-end : vendredi → dimanche (2 jours) = prix week-end
 * - 7 jours et + : semaines complètes × prix semaine + jours restants × prix 24h
 * - Sinon : jours × prix 24h
 */
export function estimatePrice(v: Vehicle, start: string, end: string): number {
  const d = diffDays(start, end);
  const isoDow = ((fromISO(start).getDay() + 6) % 7) + 1; // 1 = lundi … 5 = vendredi
  if (d === 2 && isoDow === 5 && v.weekend_price != null) return v.weekend_price;
  if (d >= 7 && v.weekly_price != null) return Math.floor(d / 7) * v.weekly_price + (d % 7) * v.daily_price;
  return d * v.daily_price;
}
