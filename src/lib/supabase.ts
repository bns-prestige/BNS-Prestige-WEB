import { createClient } from '@supabase/supabase-js';
// Clé publique (publishable) uniquement. Jamais de service_role dans le frontend.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);
