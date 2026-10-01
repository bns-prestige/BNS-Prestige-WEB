import { siteConfig } from '@/config/site';
import type { BookingResult } from './types';
import { formatFR } from './dates';
import { eur } from './pricing';

export type Contact = { firstName: string; lastName: string; email: string; phone: string };

export function buildWhatsAppLink(b: BookingResult, c: Contact): string {
  const lines = [
    'Bonjour BNS Prestige,',
    'Je souhaite effectuer une demande de réservation.',
    '',
    `Référence : ${b.reference}`,
    `Véhicule : ${b.vehicle}`,
    `Date de départ : ${formatFR(b.start_date)}`,
    `Date de retour : ${formatFR(b.end_date)}`,
    `Durée : ${b.days} jour${b.days > 1 ? 's' : ''}`,
    `Prix estimé : ${eur(b.estimated_price)}`,
    '',
    `Nom : ${c.firstName} ${c.lastName}`,
    `Email : ${c.email}`,
    `Téléphone : ${c.phone}`,
    '',
    `Mode de paiement : ${b.payment_method === 'online' ? 'paiement en ligne' : 'paiement sur place'}`,
    '',
    'Merci de me contacter afin de finaliser ma demande.',
  ];
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}
export const whatsappGeneric = () => `https://wa.me/${siteConfig.whatsappNumber}`;
