'use client';
import { useRef, useState } from 'react';

// Une photo principale + miniatures en dessous. Flèches, clavier et balayage (swipe) sur téléphone.
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const n = images.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  if (n === 0) {
    return <div className="grid aspect-[16/10] w-full place-items-center bg-[#EFEFEA] text-sm text-muted" role="img" aria-label={`Photo de ${name} à venir`}>Photo à venir</div>;
  }
  return (
    <div className="bg-white">
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden bg-[#EFEFEA]"
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { if (startX.current == null || n < 2) return; const dx = e.changedTouches[0].clientX - startX.current; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); startX.current = null; }}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }} tabIndex={0} aria-roledescription="carrousel" aria-label={`Photos ${name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt={`${name} — photo ${i + 1} sur ${n}`} loading={i === 0 ? 'eager' : 'lazy'} className="h-full w-full object-cover" draggable={false} />
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(i - 1)} aria-label="Photo précédente" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white">‹</button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Photo suivante" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white">›</button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="flex gap-2 p-3">
          {images.map((src, k) => (
            <button key={src} type="button" onClick={() => setI(k)} aria-label={`Voir la photo ${k + 1}`} aria-current={k === i}
              className={`aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${k === i ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
