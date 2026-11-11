import Link from 'next/link';
import Logo from './Logo';
import { whatsappGeneric } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import SocialIcon from './SocialIcon';

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
            <li><Link href="/voitures" className="hover:text-ink">Nos voitures</Link></li>
            <li><Link href="/comment-ca-marche" className="hover:text-ink">Comment ça marche</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="label">Contact</p>
          <ul className="space-y-2.5 text-muted">
            <li><a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-ink"><SocialIcon name="whatsapp" className="h-4 w-4" />WhatsApp</a></li>
            <li><a href={`mailto:${siteConfig.contactEmail}`} className="flex items-center gap-2.5 hover:text-ink"><SocialIcon name="email" className="h-4 w-4" />{siteConfig.contactEmail}</a></li>
            {siteConfig.socials.map((s) => (<li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-ink"><SocialIcon name={s.icon} className="h-4 w-4" />{s.label}</a></li>))}
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} BNS Prestige</p>
    </footer>
  );
}
