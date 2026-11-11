import type { Metadata } from 'next';
import { whatsappGeneric } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import SocialIcon, { type IconName } from '@/components/SocialIcon';
export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  const rows: { label: string; text: string; href: string; icon: IconName }[] = [
    { label: 'WhatsApp', text: 'Écrire sur WhatsApp', href: whatsappGeneric(), icon: 'whatsapp' },
    { label: 'Email', text: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}`, icon: 'email' },
    ...siteConfig.socials.map((s) => ({ label: s.label, text: '@bnsprestige', href: s.url, icon: s.icon })),
  ];
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Contact</h1>
      <p className="mt-4 text-muted">Une question avant de réserver ? Écrivez-nous, nous répondons le plus vite possible.</p>
      <ul className="card mt-8 divide-y divide-line">
        {rows.map((r) => (
          <li key={r.label}>
            <a href={r.href} {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-4 px-5 py-4 hover:bg-paper">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-ink"><SocialIcon name={r.icon} /></span>
              <span className="label !mb-0 flex-1">{r.label}</span>
              <span className="font-semibold">{r.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
