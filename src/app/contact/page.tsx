import type { Metadata } from 'next';
import { whatsappGeneric } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import SocialIcon, { type IconName } from '@/components/SocialIcon';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez BNS Prestige pour toute question concernant nos voitures sportives et vos demandes de réservation à Bruxelles.',
};

export default function Page() {
  const contactMethods: { label: string; description: string; action: string; href: string; icon: IconName; primary?: boolean }[] = [
    {
      label: 'WhatsApp',
      description: 'Le moyen le plus direct pour nous joindre.',
      action: 'Nous écrire',
      href: whatsappGeneric(),
      icon: 'whatsapp',
      primary: true,
    },
    {
      label: 'E-mail',
      description: 'Pour vos questions et demandes détaillées.',
      action: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
      icon: 'email',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-8 pt-14 sm:pt-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">BNS Prestige · Bruxelles</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Parlons de votre <span className="text-muted">projet.</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Une question sur nos véhicules ou une demande particulière avant de réserver ?
          Notre équipe est à votre écoute. Choisissez le moyen de contact qui vous convient.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl bg-ink p-7 text-white sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Nous contacter</p>
          <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">Un échange simple, <span className="text-white/55">sans détour.</span></h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
            Pour une demande de réservation, indiquez-nous le véhicule souhaité ainsi que vos dates.
            Cela nous aidera à vous répondre plus précisément.
          </p>
          <div className="mt-9 border-t border-white/15 pt-5">
            <p className="text-xs uppercase tracking-wider text-white/45">Basés à</p>
            <p className="mt-2 font-medium">Bruxelles, Belgique</p>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactMethods.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex min-h-56 flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${item.primary ? 'border-ink bg-white' : 'border-line bg-white hover:border-ink/30'}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-ink">
                <SocialIcon name={item.icon} className="h-6 w-6" />
              </span>
              <span className="mt-6 text-xl font-semibold">{item.label}</span>
              <span className="mt-2 text-sm leading-6 text-muted">{item.description}</span>
              <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold">
                {item.action}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <section className="mt-14 border-t border-line pt-8 sm:mt-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Retrouvez-nous</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">Suivez BNS Prestige</h2>
            <p className="mt-2 text-sm text-muted">Nos actualités et nos véhicules sur les réseaux sociaux.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`BNS Prestige sur ${social.label}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-ink hover:bg-paper"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
