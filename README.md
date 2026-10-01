# BNS Prestige

Next.js 15 + TypeScript + Tailwind + Supabase.

## Lancer en local
1. `npm install`
2. Copier `.env.example` en `.env.local` et remplir l'URL Supabase + la clé publishable.
3. `npm run dev` → http://localhost:3000

## Où modifier quoi
- Numéro WhatsApp, paiement en ligne on/off : `src/config/site.ts`
- Prix, photos, caractéristiques : table `vehicles` (Supabase, bientôt via /admin)
- Règle de prix : fonction SQL `compute_price` (officielle) + `src/lib/pricing.ts` (affichage, doit rester identique)
- Message WhatsApp : `src/lib/whatsapp.ts`

## Sécurité
Seule la clé publishable est utilisée dans le frontend. Les clients/demandes ne sont lisibles que par les admins (RLS) ;
le public passe uniquement par les fonctions `create_booking_request` et `get_unavailable_ranges`.
