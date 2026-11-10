import { siteConfig } from '@/config/site';
import type { BookingResult } from './types';
import { formatDateTimeFR } from './dates';
import { eur, hoursLabel } from './pricing';

export type Contact = { firstName: string; lastName: string; email: string; phone: string };

export function buildWhatsAppLink(b: BookingResult, c: Contact): string {
  const lines = [
    'Bonjour BNS Prestige,',
    'Je souhaite effectuer une demande de réservation.',
    '',
    `Référence : ${b.reference}`,
    `Véhicule : ${b.vehicle}`,
    `Départ : ${formatDateTimeFR(b.start_at)}`,
    `Retour : ${formatDateTimeFR(b.end_at)}`,
    `Durée : ${hoursLabel(b.hours)} (${b.billed_days} jour${b.billed_days > 1 ? 's' : ''} facturé${b.billed_days > 1 ? 's' : ''})`,
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
