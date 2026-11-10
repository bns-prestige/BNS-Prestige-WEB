import Link from 'next/link';
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="BNS Prestige — accueil">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-bns.png" alt="BNS" width={96} height={40} className="h-10 w-auto rounded-xl" />
      <span className="leading-none">
        <span className="font-display text-sm tracking-wide text-brand">PRESTIGE</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted">Location · Bruxelles</span>
      </span>
    </Link>
  );
}
