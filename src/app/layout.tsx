import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: 'BNS Prestige — Location de voitures sportives à Bruxelles', template: '%s · BNS Prestige' },
  description: 'Louez une Audi RS3 Sportback ou une Volkswagen Golf 8 R à Bruxelles. Choisissez vos dates et envoyez votre demande de réservation.',
  openGraph: { title: 'BNS Prestige — Location de voitures sportives à Bruxelles', description: 'Location de l’Audi RS3 Sportback et de la Volkswagen Golf 8 R à Bruxelles. Consultez les véhicules et envoyez votre demande.', type: 'website', locale: 'fr_BE', siteName: 'BNS Prestige', url: siteConfig.siteUrl },
  twitter: { card: 'summary_large_image', title: 'BNS Prestige — Location de voitures sportives à Bruxelles', description: 'Audi RS3 Sportback et Volkswagen Golf 8 R à louer à Bruxelles.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
