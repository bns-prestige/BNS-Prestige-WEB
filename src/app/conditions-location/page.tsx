import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions de location',
  description: 'Découvrez les règles essentielles à connaître avant de louer un véhicule chez BNS Prestige à Bruxelles.',
};

const rules = [
  {
    icon: 'ID',
    title: 'Conducteur éligible',
    text: 'Le conducteur doit avoir au moins 21 ans et être titulaire d’un permis de conduire depuis au moins 2 ans.',
    tone: 'green',
  },
  {
    icon: '＋',
    title: 'Conducteurs déclarés',
    text: 'Seules les personnes déclarées et acceptées par BNS Prestige sont autorisées à prendre le volant.',
    tone: 'light',
  },
  {
    icon: 'KM',
    title: 'Kilométrage illimité',
    text: 'Profitez du véhicule sans limite de kilomètres. Les courses, compétitions et journées sur circuit sont interdites.',
    tone: 'dark',
  },
  {
    icon: '↗',
    title: 'Prêt du véhicule interdit',
    text: 'Le véhicule ne peut être ni prêté à une personne non autorisée, ni sous-loué à un tiers.',
    tone: 'light',
  },
  {
    icon: 'EU',
    title: 'Voyages à l’étranger',
    text: 'Les déplacements sont possibles dans les pays couverts. Tout voyage hors du territoire européen nécessite l’accord écrit préalable de BNS Prestige.',
    tone: 'green',
  },
  {
    icon: '!',
    title: 'Conduite responsable',
    text: 'Il est strictement interdit de conduire sous l’influence d’alcool ou de stupéfiants, ou d’utiliser le véhicule à des fins illégales.',
    tone: 'dark',
  },
  {
    icon: 'IMG',
    title: 'État du véhicule',
    text: 'Un état des lieux photographique est réalisé au départ et au retour. Tout incident ou dommage doit être signalé immédiatement.',
    tone: 'light',
  },
  {
    icon: '€',
    title: 'Amendes et infractions',
    text: 'Les amendes, frais de stationnement, péages et infractions liés à la période de location restent à la charge du locataire.',
    tone: 'green',
  },
  {
    icon: '↻',
    title: 'Restitution à l’heure',
    text: 'Le véhicule doit être restitué à la date, à l’heure et au lieu convenus avec BNS Prestige. Toute prolongation doit être approuvée à l’avance.',
    tone: 'dark',
  },
  {
    icon: 'PRO',
    title: 'Usage professionnel',
    text: 'Les trajets professionnels personnels sont possibles. Le transport rémunéré de personnes ou les livraisons payantes nécessitent une autorisation écrite préalable.',
    tone: 'light',
  },
];

export default function ConditionsLocationPage() {
  return (
    <div className="pb-8">
      <section className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-7 py-10 text-white sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[42px] border-brand/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 right-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              BNS Prestige · Bruxelles
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl">L’essentiel avant<br className="hidden sm:block" /> de prendre la route.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Quelques règles simples pour profiter de votre véhicule dans les meilleures conditions. Prenez un instant pour les consulter avant votre réservation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/voitures" className="btn-green !rounded-full !px-6">Choisir un véhicule <span aria-hidden="true" className="ml-2">↗</span></Link>
              <span className="text-xs text-white/45">La transparence fait partie de l’expérience BNS.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">À connaître</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Les règles essentielles</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">Des repères clairs, sans jargon inutile. Les conditions complètes sont remises avec le contrat de location.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule) => (
            <article key={rule.title} className={`group relative flex min-h-[218px] flex-col overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${rule.tone === 'dark' ? 'border-ink bg-ink text-white' : rule.tone === 'green' ? 'border-brand/30 bg-brand/10 text-ink' : 'border-line bg-white text-ink'}`}>
              <div className="flex items-start justify-between">
                <span className={`grid h-11 min-w-11 place-items-center rounded-xl px-2 text-xs font-bold tracking-wide ${rule.tone === 'dark' ? 'bg-white/10 text-brand' : rule.tone === 'green' ? 'bg-brand text-ink' : 'bg-paper text-ink'}`}>{rule.icon}</span>
                <span aria-hidden="true" className={`text-xl transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${rule.tone === 'dark' ? 'text-white/35' : 'text-muted/50'}`}>↗</span>
              </div>
              <h3 className="mt-7 text-lg font-semibold">{rule.title}</h3>
              <p className={`mt-2 text-sm leading-6 ${rule.tone === 'dark' ? 'text-white/60' : 'text-muted'}`}>{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-7 sm:flex-row sm:items-center sm:p-9">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">À lire avant de signer</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Les règles complètes vous accompagnent.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Cette page est un résumé des points principaux. Les conditions générales détaillées sont présentées avec votre contrat afin que vous puissiez les lire tranquillement avant de signer.</p>
          </div>
          <Link href="/voitures" className="btn-dark shrink-0 !rounded-full">Découvrir nos véhicules <span aria-hidden="true" className="ml-2">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
