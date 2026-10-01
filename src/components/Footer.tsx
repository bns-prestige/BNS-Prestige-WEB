import Link from 'next/link';
import Logo from './Logo';
import { whatsappGeneric } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">Location de voitures sportives à Bruxelles.</p>
        </div>
        <nav className="text-sm" aria-label="Pages">
          <p className="label">Pages</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/#voitures" className="hover:text-ink">Nos voitures</Link></li>
            <li><Link href="/comment-ca-marche" className="hover:text-ink">Comment ça marche</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="label">Contact</p>
          <a href={whatsappGeneric()} className="text-muted hover:text-ink">WhatsApp</a>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} BNS Prestige</p>
    </footer>
  );
}
