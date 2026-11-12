// Config centralisée : un seul endroit à modifier.
export const siteConfig = {
  name: 'BNS Prestige',
  tagline: 'Location de voitures sportives · Bruxelles',
  contactEmail: 'contact@bnsprestige.be',
  // Réseaux sociaux
  socials: [
    { label: 'Instagram', icon: 'instagram' as const, url: 'https://www.instagram.com/bnsprestige/' },
    { label: 'TikTok', icon: 'tiktok' as const, url: 'https://www.tiktok.com/@bnsprestige' },
    { label: 'Snapchat', icon: 'snapchat' as const, url: 'https://www.snapchat.com/@bnsprestige' },
  ],
  // Numéro WhatsApp Business, format international sans espaces ni "+".
  whatsappNumber: '212631967717',
  // Heures de départ / retour proposées au client (heure de Bruxelles).
  bookingHours: { open: 8, close: 22, stepMinutes: 30, defaultTime: '10:00' },
  // Paiement en ligne : passer à true quand Stripe (ou autre) sera réellement branché.
  onlinePaymentEnabled: false,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bnsprestige.be',
};
