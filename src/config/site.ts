// Config centralisée : un seul endroit à modifier.
export const siteConfig = {
  name: 'BNS Prestige',
  tagline: 'Location de voitures sportives · Bruxelles',
  // Numéro WhatsApp Business, format international sans espaces ni "+".
  whatsappNumber: '212631967717',
  // Paiement en ligne : passer à true quand Stripe (ou autre) sera réellement branché.
  onlinePaymentEnabled: false,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
};
