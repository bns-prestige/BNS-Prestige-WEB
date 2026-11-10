import type { Metadata } from 'next';
import { whatsappGeneric } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
export const metadata: Metadata = { title: 'Contact' };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Contact</h1>
      <p className="mt-4 text-muted">Une question avant de réserver ? Écrivez-nous, nous répondons le plus vite possible.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" className="card block p-6 hover:shadow-md">
          <p className="label">WhatsApp</p><p className="font-semibold">Ouvrir la conversation</p>
        </a>
        <a href={`mailto:${siteConfig.contactEmail}`} className="card block p-6 hover:shadow-md">
          <p className="label">Email</p><p className="font-semibold">{siteConfig.contactEmail}</p>
        </a>
      </div>
    </div>
  );
}
