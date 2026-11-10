'use client';
import { useMemo, useState } from 'react';
import type { Slot } from '@/lib/types';
import { fromISO, toISO } from '@/lib/dates';

type Props = { start: string | null; end: string | null; slots: Slot[]; onChange: (start: string | null, end: string | null) => void };
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const nextDay = (iso: string) => { const d = fromISO(iso); d.setDate(d.getDate() + 1); return toISO(d); };

export default function DateRangePicker({ start, end, slots, onChange }: Props) {
  const today = toISO(new Date());
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });

  // Jour entièrement pris : aucune heure possible. Jour partiel : sélectionnable, les heures sont vérifiées ensuite.
  const fullyBlocked = (iso: string) => slots.some((s) => s.start_local <= `${iso}T00:00` && s.end_local >= `${iso}T23:59`);
  const partlyBlocked = (iso: string) => slots.some((s) => s.start_local < `${nextDay(iso)}T00:00` && s.end_local > `${iso}T00:00`);

  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, i) => toISO(new Date(month.getFullYear(), month.getMonth(), i + 1)))] as (string | null)[];
  }, [month]);

  function pick(iso: string) {
    if (fullyBlocked(iso) || iso < today) return;
    if (!start || end || iso <= start) { onChange(iso, null); return; }
    onChange(start, iso);
  }

  const canPrev = month > new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const title = month.toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button type="button" className="btn-light !px-3 !py-1.5" disabled={!canPrev} aria-label="Mois précédent"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
        <p className="text-sm font-semibold capitalize">{title}</p>
        <button type="button" className="btn-light !px-3 !py-1.5" aria-label="Mois suivant"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {DAYS.map((d, i) => <span key={i} className="py-1">{d}</span>)}
        {cells.map((iso, i) => {
          if (!iso) return <span key={i} />;
          const off = iso < today || fullyBlocked(iso);
          const isStart = iso === start; const isEnd = iso === end;
          const inside = !!(start && end && iso > start && iso < end);
          const cls = isStart || isEnd ? 'bg-ink text-white' : inside ? 'bg-brand/25 text-ink' : off ? 'text-line line-through' : 'text-ink hover:bg-paper';
          return (
            <button key={iso} type="button" disabled={off} onClick={() => pick(iso)}
              aria-label={fromISO(iso).toLocaleDateString('fr-BE', { dateStyle: 'full' })} aria-pressed={isStart || isEnd}
              className={`relative aspect-square rounded-lg text-sm transition-colors ${cls}`}>
              {Number(iso.slice(8))}
              {!off && partlyBlocked(iso) && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Choisissez le jour de départ puis le jour de retour. Un point vert = déjà loué une partie de la journée.</p>
    </div>
  );
}
