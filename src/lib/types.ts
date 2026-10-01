export type Vehicle = {
  id: string; slug: string; name: string; tagline: string | null; description: string | null;
  images: string[]; daily_price: number; weekend_price: number | null; weekly_price: number | null;
  deposit: number; status: string; specs: Record<string, string>; sort_order: number;
};
export type DateRange = { start_date: string; end_date: string };
export type BookingResult = {
  reference: string; vehicle: string; start_date: string; end_date: string; days: number;
  estimated_price: number; deposit: number; payment_method: 'online' | 'on_site'; status: string;
};
