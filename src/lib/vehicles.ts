import { supabase } from './supabase';
import type { Vehicle } from './types';

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));
const map = (r: any): Vehicle => {
  const isGolf8R = /golf.*8.*r|8.*r.*golf/i.test(`${r.name ?? ''} ${r.slug ?? ''}`);
  return {
    ...r,
    images: isGolf8R
      ? ['/devant-8r.jpeg', '/arriere-8r.jpeg', '/interieur-8r.jpeg']
      : (Array.isArray(r.images) ? r.images : []),
    daily_price: Number(r.daily_price),
    weekend_price: num(r.weekend_price),
    weekly_price: num(r.weekly_price),
    deposit: Number(r.deposit),
  };
};

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase.from('vehicles').select('*').order('sort_order');
  if (error) throw new Error(error.message);
  return (data ?? []).map(map);
}
export async function getVehicle(slug: string): Promise<Vehicle | null> {
  const { data, error } = await supabase.from('vehicles').select('*').eq('slug', slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? map(data) : null;
}
