import type { Metadata } from 'next';
import { whatsappGeneric } from '@/lib/whatsapp';
export const metadata: Metadata = { title: 'Contact' };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16">
      <h1 className="text-4xl sm:text-5xl">Contact</h1>
      <p className="mt-4 text-muted">Une question avant de réserver ? Écrivez-nous sur WhatsApp.</p>
      <a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" className="btn-green mt-8">Ouvrir WhatsApp</a>
    </div>
  );
}
