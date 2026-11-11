import type { Metadata } from 'next';
import { whatsappGeneric } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  const rows: [string, string, string][] = [
    ['WhatsApp', 'Écrire sur WhatsApp', whatsappGeneric()],
    ['Email', siteConfig.contactEmail, `mailto:${siteConfig.contactEmail}`],
    ...siteConfig.socials.map((s): [string, string, string] => [s.label, '@bnsprestige', s.url]),
  ];
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Contact</h1>
      <p className="mt-4 text-muted">Une question avant de réserver ? Écrivez-nous, nous répondons le plus vite possible.</p>
      <ul className="card mt-8 divide-y divide-line">
        {rows.map(([label, text, href]) => (
          <li key={label}>
            <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center justify-between px-6 py-4 hover:bg-paper">
              <span className="label !mb-0">{label}</span>
              <span className="font-semibold">{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
