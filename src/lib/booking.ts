import { supabase } from './supabase';
import type { BookingResult, DateRange } from './types';

export const ERRORS: Record<string, string> = {
  DATES_UNAVAILABLE: "Ces dates ne sont plus disponibles. Choisissez d'autres dates.",
  INVALID_DATES: 'Dates invalides. Vérifiez le départ et le retour.',
  INVALID_INPUT: 'Vérifiez vos informations (nom, email, téléphone).',
  VEHICLE_NOT_FOUND: "Ce véhicule n'est plus disponible.",
};

export async function getUnavailableRanges(slug: string): Promise<DateRange[]> {
  const { data, error } = await supabase.rpc('get_unavailable_ranges', { p_vehicle_slug: slug });
  if (error) throw new Error(error.message);
  return (data ?? []) as DateRange[];
}

export type BookingInput = {
  slug: string; start: string; end: string; firstName: string; lastName: string;
  email: string; phone: string; paymentMethod: 'online' | 'on_site'; notes: string;
};

export async function createBookingRequest(i: BookingInput): Promise<BookingResult> {
  const { data, error } = await supabase.rpc('create_booking_request', {
    p_vehicle_slug: i.slug, p_start: i.start, p_end: i.end, p_first_name: i.firstName,
    p_last_name: i.lastName, p_email: i.email, p_phone: i.phone,
    p_payment_method: i.paymentMethod, p_notes: i.notes || null,
  });
  if (error) {
    const code = Object.keys(ERRORS).find((k) => error.message.includes(k));
    throw new Error(code ? ERRORS[code] : "Impossible d'enregistrer la demande. Réessayez ou contactez-nous sur WhatsApp.");
  }
  return data as BookingResult;
}
