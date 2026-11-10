import type { Metadata } from 'next';
import { getVehicles } from '@/lib/vehicles';
import VehicleCard from '@/components/VehicleCard';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Nos voitures',
  description: 'Audi RS3 et Golf 8 GTI Clubsport à louer à Bruxelles. Tarifs 24 h, week-end et semaine.',
};

export default async function VoituresPage() {
  const vehicles = await getVehicles();
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Nos voitures</h1>
      <p className="mt-4 max-w-xl text-muted">Choisissez une voiture, puis vos dates et heures. Tarif par tranche de 24 h, pack week-end du vendredi au dimanche soir, pack semaine sur 7 jours.</p>
      <div className="mt-10 space-y-6">{vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}</div>
    </div>
  );
}
