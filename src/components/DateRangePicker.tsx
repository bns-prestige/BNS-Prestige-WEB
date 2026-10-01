'use client';
import { useMemo, useState } from 'react';
import type { DateRange } from '@/lib/types';
import { fromISO, toISO } from '@/lib/dates';

type Props = {
  start: string | null; end: string | null; blocked: DateRange[];
  onChange: (start: string | null, end: string | null) => void;
};
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function DateRangePicker({ start, end, blocked, onChange }: Props) {
  const today = toISO(new Date());
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });

  // Une location occupe les jours [début, fin[ : le jour de retour reste libre pour un nouveau départ.
  const isBlocked = (iso: string) => blocked.some((r) => iso >= r.start_date && iso < r.end_date);
  const overlaps = (a: string, b: string) => blocked.some((r) => a < r.end_date && b > r.start_date);

  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, i) => toISO(new Date(month.getFullYear(), month.getMonth(), i + 1)))] as (string | null)[];
  }, [month]);

  function pick(iso: string) {
    if (!start || (start && end)) { if (!isBlocked(iso) && iso >= today) onChange(iso, null); return; }
    if (iso <= start) { if (!isBlocked(iso) && iso >= today) onChange(iso, null); return; }
    if (overlaps(start, iso)) { onChange(isBlocked(iso) ? null : iso, null); return; }
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
          const past = iso < today;
          const off = past || isBlocked(iso);
          const isStart = iso === start; const isEnd = iso === end;
          const inside = !!(start && end && iso > start && iso < end);
          const cls = isStart || isEnd ? 'bg-ink text-white' : inside ? 'bg-brand/25 text-ink' : off ? 'text-line line-through' : 'text-ink hover:bg-paper';
          return (
            <button key={iso} type="button" disabled={off && !isEnd} onClick={() => pick(iso)}
              aria-label={fromISO(iso).toLocaleDateString('fr-BE', { dateStyle: 'full' })} aria-pressed={isStart || isEnd}
              className={`aspect-square rounded-lg text-sm transition-colors ${cls}`}>
              {Number(iso.slice(8))}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Cliquez sur le jour de départ, puis sur le jour de retour.</p>
    </div>
  );
}
