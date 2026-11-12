'use client';
import { useEffect, useMemo, useState } from 'react';
import type { BookingResult, Quote, Slot, Vehicle } from '@/lib/types';
import { createBookingRequest, getUnavailableSlots, quoteBooking } from '@/lib/booking';
import { formatDateTimeFR, formatShortFR, timeOptions } from '@/lib/dates';
import { eur, hoursLabel } from '@/lib/pricing';
import { buildWhatsAppLink, type Contact } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import DateRangePicker from './DateRangePicker';

type Step = 1 | 2 | 3;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_RE = /^\+?[0-9 ./()-]{6,20}$/;

export default function BookingForm({ vehicle }: { vehicle: Vehicle }) {
  const [step, setStep] = useState<Step>(1);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(siteConfig.bookingHours.defaultTime);
  const [endTime, setEndTime] = useState(siteConfig.bookingHours.defaultTime);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const times = useMemo(() => timeOptions(), []);
  const [c, setC] = useState<Contact>({ firstName: '', lastName: '', email: '', phone: '' });
  const [payment, setPayment] = useState<'online' | 'on_site'>('on_site');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ booking: BookingResult; link: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    getUnavailableSlots(vehicle.slug)
      .then((data) => { if (!cancelled) { setSlots(data); setLoadError(false); } })
      .catch(() => { if (!cancelled) setLoadError(true); })
      .finally(() => { if (!cancelled) setSlotsLoaded(true); });
    return () => { cancelled = true; };
  }, [vehicle.slug]);

  const start = startDate ? `${startDate}T${startTime}` : null;
  const end = endDate ? `${endDate}T${endTime}` : null;
  const hours = start && end ? (new Date(end).getTime() - new Date(start).getTime()) / 3600000 : 0;
  const problem = !start || !end ? null
    : new Date(start).getTime() <= Date.now() ? 'Le départ doit être dans le futur.'
    : hours < 24 ? 'La durée minimale est de 24 h.'
    : slots.some((sl) => start < sl.end_local && end > sl.start_local) ? 'Ces horaires chevauchent une location existante.'
    : null;
  const slotOk = !!start && !!end && !problem;

  // Le prix vient de la base (une seule règle de calcul)
  useEffect(() => {
    setQuote(null);
    setQuoteError(null);
    if (!slotOk || !slotsLoaded || !start || !end) return;
    let cancelled = false;
    quoteBooking(vehicle.slug, start, end)
      .then((q) => {
        if (cancelled) return;
        if (!q) setQuoteError("Le tarif n'a pas pu être calculé. Réessayez ou contactez-nous.");
        else setQuote(q);
      })
      .catch(() => { if (!cancelled) setQuoteError("Le calcul du prix est momentanément indisponible. Réessayez dans quelques instants."); });
    return () => { cancelled = true; };
  }, [slotOk, slotsLoaded, start, end, vehicle.slug]);
  const contactOk = c.firstName.trim() && c.lastName.trim() && EMAIL_RE.test(c.email.trim()) && PHONE_RE.test(c.phone.trim());
  const pluralDays = (n: number) => `${n} jour${n > 1 ? 's' : ''} facturé${n > 1 ? 's' : ''}`;

  async function submit() {
    if (!start || !end) return;
    setBusy(true); setError(null);
    try {
      const contact = { ...c, firstName: c.firstName.trim(), lastName: c.lastName.trim(), email: c.email.trim(), phone: c.phone.trim() };
      const booking = await createBookingRequest({ slug: vehicle.slug, start, end, ...contact, paymentMethod: payment, notes });
      const link = buildWhatsAppLink(booking, contact);
      setDone({ booking, link });
      window.open(link, '_blank', 'noopener'); // peut être bloqué par le navigateur : le bouton ci-dessous prend le relais
    } catch (e) {
      setError((e as Error).message);
      getUnavailableSlots(vehicle.slug).then(setSlots).catch(() => {});
    } finally { setBusy(false); }
  }

  if (done) {
    const b = done.booking;
    return (
      <div className="card p-6" role="status">
        <p className="text-xs font-medium uppercase tracking-wider text-brand">Demande reçue</p>
        <h2 className="mt-2 text-2xl">Référence {b.reference}</h2>
        <p className="mt-3 text-sm text-muted">Votre demande est enregistrée. Dernière étape : envoyez-nous le message sur WhatsApp pour que nous puissions vous contacter.</p>
        <dl className="mt-5 space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Véhicule</dt><dd>{b.vehicle}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Départ</dt><dd>{formatDateTimeFR(b.start_at)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Retour</dt><dd>{formatDateTimeFR(b.end_at)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Prix estimé</dt><dd>{eur(b.estimated_price)}</dd></div>
        </dl>
        <a href={done.link} target="_blank" rel="noopener noreferrer" className="btn-green mt-6 w-full">Envoyer sur WhatsApp</a>
        <p className="mt-3 text-xs text-muted">Une confirmation de réception par email sera ajoutée prochainement. Votre demande n'est pas encore une réservation confirmée.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <ol className="mb-5 flex gap-2 text-xs" aria-label="Étapes">
        {['Dates', 'Coordonnées', 'Récapitulatif'].map((t, i) => (
          <li key={t} className={`flex-1 border-t-2 pt-2 ${step >= i + 1 ? 'border-ink text-ink' : 'border-line text-muted'}`}>{i + 1}. {t}</li>
        ))}
      </ol>

      {step === 1 && (
        <div>
          {loadError && <p className="mb-3 text-sm text-red-600" role="alert">Impossible de vérifier les disponibilités. Rechargez la page ou contactez-nous sur WhatsApp avant de poursuivre.</p>}
          {!slotsLoaded && <p className="mb-3 text-sm text-muted" role="status">Vérification des disponibilités…</p>}
          <DateRangePicker start={startDate} end={endDate} slots={slots} onChange={(sd, ed) => { setStartDate(sd); setEndDate(ed); }} />
          {startDate && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="st">Heure de départ</label>
                <select id="st" className="input" value={startTime} onChange={(e) => setStartTime(e.target.value)}>{times.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label className="label" htmlFor="et">Heure de retour</label>
                <select id="et" className="input" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={!endDate}>{times.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
            </div>
          )}
          <div className="mt-5 rounded-xl bg-paper p-4 text-sm" aria-live="polite">
            {problem ? <p className="text-red-700">{problem}</p>
              : start && end && quote ? (
                <>
                  <p className="text-muted">{formatShortFR(start)} → {formatShortFR(end)}</p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-muted">{hoursLabel(quote.hours)} · {pluralDays(quote.billed_days)}</span>
                    <span className="font-display text-xl">{eur(quote.price)}</span>
                  </div>
                  {quote.pack === 'weekend' && <p className="mt-1 text-xs text-brand">Pack week-end appliqué</p>}
                  {quote.pack === 'week' && <p className="mt-1 text-xs text-brand">Pack semaine appliqué</p>}
                </>
              )  : <span className="text-muted">{quoteError ?? (start && end ? (slotsLoaded ? 'Calcul du prix…' : 'Vérification des disponibilités…') : 'Sélectionnez vos dates et heures pour voir le prix.')}</span>}
            <p className="mt-2 text-xs text-muted">Caution : {eur(vehicle.deposit)}. Tarif par tranche de 24 h. Prix indicatif, confirmé par BNS.</p>
          </div>
          <button type="button" className="btn-dark mt-5 w-full" disabled={!slotsLoaded || loadError || !slotOk || !quote} onClick={() => setStep(2)}>Continuer</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="fn">Prénom</label><input id="fn" className="input" autoComplete="given-name" value={c.firstName} onChange={(e) => setC({ ...c, firstName: e.target.value })} /></div>
            <div><label className="label" htmlFor="ln">Nom</label><input id="ln" className="input" autoComplete="family-name" value={c.lastName} onChange={(e) => setC({ ...c, lastName: e.target.value })} /></div>
          </div>
          <div><label className="label" htmlFor="em">Email</label><input id="em" type="email" className="input" autoComplete="email" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></div>
          <div><label className="label" htmlFor="ph">Téléphone</label><input id="ph" type="tel" className="input" autoComplete="tel" placeholder="+32…" value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} /></div>
          <fieldset>
            <legend className="label">Paiement</legend>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className={`card cursor-pointer p-3 ${payment === 'on_site' ? 'border-ink' : ''}`}><input type="radio" className="mr-2" checked={payment === 'on_site'} onChange={() => setPayment('on_site')} />Sur place</label>
              <label className={`card p-3 ${siteConfig.onlinePaymentEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} ${payment === 'online' ? 'border-ink' : ''}`}>
                <input type="radio" className="mr-2" disabled={!siteConfig.onlinePaymentEnabled} checked={payment === 'online'} onChange={() => setPayment('online')} />
                En ligne <span className="text-xs text-muted">{siteConfig.onlinePaymentEnabled ? '' : '(bientôt)'}</span>
              </label>
            </div>
          </fieldset>
          <div><label className="label" htmlFor="nt">Message (facultatif)</label><textarea id="nt" rows={3} maxLength={1000} className="input" value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          <div className="flex gap-3">
            <button type="button" className="btn-light" onClick={() => setStep(1)}>Retour</button>
            <button type="button" className="btn-dark flex-1" disabled={!contactOk} onClick={() => setStep(3)}>Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && start && end && quote && (
        <div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Véhicule</dt><dd>{vehicle.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Départ</dt><dd>{formatDateTimeFR(start)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Retour</dt><dd>{formatDateTimeFR(end)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Durée</dt><dd>{hoursLabel(quote.hours)} ({pluralDays(quote.billed_days)})</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Prix estimé</dt><dd className="font-semibold">{eur(quote.price)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Caution</dt><dd>{eur(vehicle.deposit)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Client</dt><dd>{c.firstName} {c.lastName}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Paiement</dt><dd>{payment === 'on_site' ? 'Sur place' : 'En ligne'}</dd></div>
          </dl>
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
          <div className="mt-5 flex gap-3">
            <button type="button" className="btn-light" onClick={() => setStep(2)} disabled={busy}>Retour</button>
            <button type="button" className="btn-dark flex-1" onClick={submit} disabled={busy}>{busy ? 'Envoi…' : 'Demander une réservation'}</button>
          </div>
          <p className="mt-3 text-xs text-muted">Il s'agit d'une demande : la réservation est confirmée après vérification par BNS.</p>
        </div>
      )}
    </div>
  );
}
