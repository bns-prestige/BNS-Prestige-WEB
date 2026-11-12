'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">BNS Prestige</p>
      <h1 className="mt-4 text-3xl">Une erreur est survenue</h1>
      <p className="mt-3 text-sm leading-6 text-muted">La page n’a pas pu être chargée correctement. Réessayez dans quelques instants ou contactez notre équipe si le problème persiste.</p>
      <button type="button" onClick={() => reset()} className="btn-dark mt-7">Réessayer</button>
    </section>
  );
}
