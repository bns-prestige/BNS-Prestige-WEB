import Link from 'next/link';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/voitures', label: 'Nos voitures' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-line bg-white/90 px-5 py-3 backdrop-blur">
        <Logo />
        <nav className="hidden gap-7 text-sm text-muted md:flex" aria-label="Navigation principale">
          {links.map((l) => (<Link key={l.href} href={l.href} className="hover:text-ink">{l.label}</Link>))}
        </nav>
        <Link href="/voitures" className="btn-dark !py-2.5">Réserver</Link>
      </div>
    </header>
  );
}
