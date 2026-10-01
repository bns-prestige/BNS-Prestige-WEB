import type { Vehicle } from '@/lib/types';
// Affiche la 1re photo du véhicule, ou un emplacement neutre tant qu'il n'y en a pas.
export default function CarImage({ vehicle, className = '' }: { vehicle: Vehicle; className?: string }) {
  const src = vehicle.images?.[0];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={vehicle.name} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div className={`grid place-items-center bg-[#EFEFEA] text-sm text-muted ${className}`} role="img" aria-label={`Photo de ${vehicle.name} à venir`}>
      Photo à venir
    </div>
  );
}
