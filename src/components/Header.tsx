'use client';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/voitures', label: 'Nos voitures' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/conditions-location', label: 'Conditions de location' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-line bg-white/95 px-5 py-3 backdrop-blur">
        <Logo />
        <nav className="hidden gap-7 text-sm text-muted md:flex" aria-label="Navigation principale">
          {links.map((l) => <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/voitures" className="btn-dark !py-2.5">Réserver</Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}
            aria-controls="mobile-navigation" onClick={() => setOpen((v) => !v)}>
            <span aria-hidden="true" className="text-xl leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-white p-3 shadow-lg md:hidden" aria-label="Navigation mobile">
          {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-ink hover:bg-paper">{l.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
