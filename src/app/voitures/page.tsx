import type { Metadata } from 'next';
import { getVehicles } from '@/lib/vehicles';
import VehicleCard from '@/components/VehicleCard';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Nos voitures',
  description: 'Audi RS3 et Golf 8 R à louer à Bruxelles. Tarifs 24 h, week-end et semaine.',
};

export default async function VoituresPage() {
  const vehicles = await getVehicles();
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Nos voitures</h1>
      <p className="mt-4 max-w-xl text-muted">Choisissez une voiture, puis vos dates et heures. Tarif par tranche de 24 h, pack week-end du vendredi au dimanche soir, pack semaine sur 7 jours.</p>
      
      {/* Galerie des photos de l'Audi RS3 */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <img src="/rs3-devant.jpeg" alt="Audi RS3 de devant" className="rounded-lg object-cover w-full h-48" />
        <img src="/rs3-arriere.jpeg" alt="Audi RS3 de derrière" className="rounded-lg object-cover w-full h-48" />
        <img src="/rs3-interieur.jpeg" alt="Intérieur de l'Audi RS3" className="rounded-lg object-cover w-full h-48" />
      </div>

      <div className="mt-10 space-y-6">{vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}</div>
    </div>
  );
}