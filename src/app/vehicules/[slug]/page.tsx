import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVehicle } from '@/lib/vehicles';
import { eur } from '@/lib/pricing';
import BookingForm from '@/components/BookingForm';
import CarImage from '@/components/CarImage';

export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVehicle((await params).slug);
  return v ? { title: v.name, description: `Louez la ${v.name} à Bruxelles. À partir de ${eur(v.daily_price)} par jour.` } : {};
}

export default async function VehiclePage({ params }: Props) {
  const v = await getVehicle((await params).slug);
  if (!v || v.status !== 'active') notFound();
  const specs = Object.entries(v.specs ?? {});
  const prices: [string, number | null][] = [['24h (par tranche entamée)', v.daily_price], ['Week-end (ven → dim)', v.weekend_price], ['Semaine (7 jours)', v.weekly_price], ['Caution', v.deposit]];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <h1 className="text-4xl sm:text-6xl">{v.name}</h1>
      {v.tagline && <p className="mt-3 text-muted">{v.tagline}</p>}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="card overflow-hidden"><CarImage vehicle={v} className="aspect-[16/10] w-full" /></div>
          {v.description && <p className="mt-6 text-muted">{v.description}</p>}
          {specs.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              {specs.map(([k, val]) => (<div key={k} className="card p-4"><dt className="label !mb-1">{k}</dt><dd>{val}</dd></div>))}
            </dl>
          )}
          <h2 className="mt-10 text-2xl">Tarifs</h2>
          <ul className="card mt-4 divide-y divide-line text-sm">
            {prices.filter(([, p]) => p != null).map(([k, p]) => (<li key={k} className="flex justify-between px-5 py-3"><span className="text-muted">{k}</span><span className="font-semibold">{eur(p!)}</span></li>))}
          </ul>
          <p className="mt-3 text-xs text-muted">Choisissez l'heure de départ et de retour : la durée exacte est calculée par tranches de 24 h. Le pack week-end s'applique du vendredi au dimanche. Le pack semaine s'applique à 7 jours.</p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Demande de réservation">
          <BookingForm vehicle={v} />
        </aside>
      </div>
    </div>
  );
}
