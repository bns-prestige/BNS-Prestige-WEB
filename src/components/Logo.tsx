import Link from 'next/link';
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="BNS Prestige — accueil">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-sm text-brand">BN</span>
      <span className="leading-none">
        <span className="font-display text-sm tracking-wide">BNS <span className="text-brand">PRESTIGE</span></span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted">Location · Bruxelles</span>
      </span>
    </Link>
  );
}
