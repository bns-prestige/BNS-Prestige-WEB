import { supabase } from './supabase';
import type { BookingResult, Quote, Slot } from './types';

export const ERRORS: Record<string, string> = {
  DATES_UNAVAILABLE: "Ces horaires ne sont plus disponibles. Choisissez d'autres dates ou heures.",
  INVALID_DATES: 'Dates ou heures invalides (durée minimale 24 h, départ dans le futur).',
  INVALID_INPUT: 'Vérifiez vos informations (nom, email, téléphone).',
  VEHICLE_NOT_FOUND: "Ce véhicule n'est plus disponible.",
};

const norm = (s: string) => s.slice(0, 16); // "2026-11-02T10:00:00" → "2026-11-02T10:00"

export async function getUnavailableSlots(slug: string): Promise<Slot[]> {
  const { data, error } = await supabase.rpc('get_unavailable_slots', { p_vehicle_slug: slug });
  if (error) throw new Error(error.message);
  return ((data ?? []) as Slot[]).map((s) => ({ start_local: norm(s.start_local), end_local: norm(s.end_local) }));
}

export async function quoteBooking(slug: string, start: string, end: string): Promise<Quote | null> {
  const { data, error } = await supabase.rpc('quote_booking', { p_vehicle_slug: slug, p_start_local: start, p_end_local: end });
  if (error) throw new Error(error.message);
  return (data as Quote | null) ?? null;
}

export type BookingInput = {
  slug: string; start: string; end: string; firstName: string; lastName: string;
  email: string; phone: string; paymentMethod: 'online' | 'on_site'; notes: string;
};

export async function createBookingRequest(i: BookingInput): Promise<BookingResult> {
  const { data, error } = await supabase.rpc('create_booking_request_timed', {
    p_vehicle_slug: i.slug, p_start_local: i.start, p_end_local: i.end, p_first_name: i.firstName,
    p_last_name: i.lastName, p_email: i.email, p_phone: i.phone,
    p_payment_method: i.paymentMethod, p_notes: i.notes || null,
  });
  if (error) {
    const code = Object.keys(ERRORS).find((k) => error.message.includes(k));
    throw new Error(code ? ERRORS[code] : "Impossible d'enregistrer la demande. Réessayez ou contactez-nous sur WhatsApp.");
  }
  return data as BookingResult;
}
