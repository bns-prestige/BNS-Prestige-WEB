'use client';
import { useEffect, useMemo, useState } from 'react';
import type { BookingResult, DateRange, Vehicle } from '@/lib/types';
import { createBookingRequest, getUnavailableRanges } from '@/lib/booking';
import { diffDays, formatFR } from '@/lib/dates';
import { estimatePrice, eur } from '@/lib/pricing';
import { buildWhatsAppLink, type Contact } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import DateRangePicker from './DateRangePicker';

type Step = 1 | 2 | 3;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_RE = /^\+?[0-9 ./()-]{6,20}$/;

export default function BookingForm({ vehicle }: { vehicle: Vehicle }) {
  const [step, setStep] = useState<Step>(1);
  const [blocked, setBlocked] = useState<DateRange[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [c, setC] = useState<Contact>({ firstName: '', lastName: '', email: '', phone: '' });
  const [payment, setPayment] = useState<'online' | 'on_site'>('on_site');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ booking: BookingResult; link: string } | null>(null);

  useEffect(() => { getUnavailableRanges(vehicle.slug).then(setBlocked).catch(() => setLoadError(true)); }, [vehicle.slug]);

  const days = start && end ? diffDays(start, end) : 0;
  const price = useMemo(() => (start && end ? estimatePrice(vehicle, start, end) : null), [vehicle, start, end]);
  const contactOk = c.firstName.trim() && c.lastName.trim() && EMAIL_RE.test(c.email.trim()) && PHONE_RE.test(c.phone.trim());

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
      getUnavailableRanges(vehicle.slug).then(setBlocked).catch(() => {});
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
          <div className="flex justify-between"><dt className="text-muted">Dates</dt><dd>{formatFR(b.start_date)} → {formatFR(b.end_date)}</dd></div>
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
          {loadError && <p className="mb-3 text-sm text-red-600">Disponibilités indisponibles pour le moment. Réessayez ou écrivez-nous sur WhatsApp.</p>}
          <DateRangePicker start={start} end={end} blocked={blocked} onChange={(s, e) => { setStart(s); setEnd(e); }} />
          <div className="mt-5 rounded-xl bg-paper p-4 text-sm">
            {price != null ? (
              <div className="flex items-baseline justify-between">
                <span className="text-muted">{days} jour{days > 1 ? 's' : ''} · estimation</span>
                <span className="font-display text-xl">{eur(price)}</span>
              </div>
            ) : <span className="text-muted">Sélectionnez vos dates pour voir le prix.</span>}
            <p className="mt-2 text-xs text-muted">Caution : {eur(vehicle.deposit)}. Prix indicatif, confirmé par BNS.</p>
          </div>
          <button type="button" className="btn-dark mt-5 w-full" disabled={!start || !end} onClick={() => setStep(2)}>Continuer</button>
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

      {step === 3 && start && end && price != null && (
        <div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Véhicule</dt><dd>{vehicle.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Départ</dt><dd>{formatFR(start)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Retour</dt><dd>{formatFR(end)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Durée</dt><dd>{days} jour{days > 1 ? 's' : ''}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Prix estimé</dt><dd className="font-semibold">{eur(price)}</dd></div>
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
