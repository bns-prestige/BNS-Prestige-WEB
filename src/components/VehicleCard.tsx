import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { eur } from '@/lib/pricing';
import CarImage from './CarImage';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/vehicules/${vehicle.slug}`} className="card group block overflow-hidden transition-shadow hover:shadow-md">
      <CarImage vehicle={vehicle} className="aspect-[16/10] w-full" />
      <div className="flex items-end justify-between p-6">
        <div>
          <h3 className="font-display text-xl">{vehicle.name}</h3>
          <p className="mt-1 text-sm text-muted">À partir de {eur(vehicle.daily_price)} / jour</p>
        </div>
        <span className="text-sm font-semibold group-hover:text-brand">Voir →</span>
      </div>
    </Link>
  );
}
