import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Comment ça marche' };
const steps = [
  ['Choisissez votre voiture et vos dates', 'Le prix estimé s’affiche tout de suite.'],
  ['Envoyez votre demande', 'Prénom, nom, email, téléphone et mode de paiement. Ce n’est pas encore une réservation.'],
  ['WhatsApp s’ouvre', 'Un message est déjà prêt : appuyez sur Envoyer.'],
  ['Nous vous contactons', 'Nous vérifions votre demande et vous demandons les documents nécessaires (pièce d’identité, permis).'],
  ['Réservation confirmée', 'Une fois la demande acceptée, la réservation est confirmée.'],
];
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Comment ça marche</h1>
      <ol className="mt-10 space-y-4">
        {steps.map(([t, d], i) => (
          <li key={t} className="card flex gap-5 p-6">
            <span className="font-display text-xl text-brand">0{i + 1}</span>
            <div><h2 className="font-sans text-base font-semibold">{t}</h2><p className="mt-1 text-sm text-muted">{d}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
