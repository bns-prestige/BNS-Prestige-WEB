import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { eur } from '@/lib/pricing';
import Gallery from './Gallery';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const prices: [string, number | null][] = [['24 h', vehicle.daily_price], ['Week-end', vehicle.weekend_price], ['Semaine', vehicle.weekly_price]];
  return (
    <article className="card overflow-hidden md:grid md:grid-cols-[1.2fr_1fr]">
      <Gallery images={vehicle.images ?? []} name={vehicle.name} />
      <div className="flex flex-col p-6 md:p-8">
        <h2 className="text-2xl">{vehicle.name}</h2>
        {vehicle.tagline && <p className="mt-1 text-sm text-muted">{vehicle.tagline}</p>}
        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
          {prices.filter(([, p]) => p != null).map(([k, p]) => (
            <div key={k}><dt className="label !mb-1">{k}</dt><dd className="font-display text-lg">{eur(p!)}</dd></div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted">Caution : {eur(vehicle.deposit)}</p>
        <Link href={`/vehicules/${vehicle.slug}`} className="btn-dark mt-6 md:mt-auto">Voir et réserver</Link>
      </div>
    </article>
  );
}
