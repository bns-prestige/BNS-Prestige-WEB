import Link from 'next/link';
import { getVehicles } from '@/lib/vehicles';

export const revalidate = 60;

const steps = [
  ['Choisissez', 'Une voiture et vos dates.'],
  ['Envoyez votre demande', 'Quelques informations, un clic.'],
  ['Confirmez sur WhatsApp', 'Nous vous répondons et finalisons ensemble.'],
];

export default async function Home() {
  const vehicles = await getVehicles();
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-brand" />{vehicles.length} voitures disponibles · Bruxelles
        </p>
        <h1 className="mt-8 text-5xl leading-[1.05] sm:text-7xl">La performance <span className="text-brand">à votre portée.</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Audi RS3 et Golf 8 GTI Clubsport. Choisissez vos dates, envoyez votre demande, nous confirmons par WhatsApp.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/voitures" className="btn-dark">Voir les voitures</Link>
          <Link href="/comment-ca-marche" className="btn-light">Comment ça marche</Link>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="steps-titre">
        <h2 id="steps-titre" className="mb-8 text-3xl">Simple en 3 étapes</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="card p-6">
              <span className="font-display text-brand">0{i + 1}</span>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-6 text-center">
        <h2 className="text-3xl">Prêt à rouler ?</h2>
        <p className="mt-3 text-muted">Choisissez votre voiture, vos dates et vos heures.</p>
        <Link href="/voitures" className="btn-dark mt-6">Voir nos voitures</Link>
      </section>
    </>
  );
}
