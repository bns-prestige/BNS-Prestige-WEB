export type Vehicle = {
  id: string; slug: string; name: string; tagline: string | null; description: string | null;
  images: string[]; daily_price: number; weekend_price: number | null; weekly_price: number | null;
  deposit: number; status: string; specs: Record<string, string>; sort_order: number;
};
// Dates et heures locales de Bruxelles, format "YYYY-MM-DDTHH:MM".
export type Slot = { start_local: string; end_local: string };
export type Quote = { price: number; billed_days: number; hours: number; pack: 'day' | 'weekend' | 'week'; deposit: number };
export type BookingResult = {
  reference: string; vehicle: string; start_at: string; end_at: string; hours: number; billed_days: number;
  estimated_price: number; deposit: number; payment_method: 'online' | 'on_site'; status: string;
};
