import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import MainNavigation from '@/components/layout/MainNavigation';
import MainFooter from '@/components/layout/MainFooter';
import AuthProvider from '@/components/auth/AuthProvider';
import GlobalStyles from '@/components/layout/GlobalStyles';
import ClientScripts from '@/components/layout/ClientScripts';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import Script from 'next/script';

// Optimize font loading - preload only essential weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '600'], // Reduce font weights to essential ones
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Divine Models - Premium Modeling Agency in Romania',
  description: 'Divine Models - Premium modeling agency in Romania offering professional modeling services for fashion, advertising and events.',
};

// Create a cached settings fetcher
let cachedSettings: any = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedSettings() {
  const now = Date.now();

  if (!cachedSettings || now - cacheTime > CACHE_TTL) {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      cachedSettings = await prisma.siteSettings.findFirst();
      cacheTime = now;
    } catch (error) {
      console.error('Error fetching settings:', error);
      cachedSettings = null;
    } finally {
      await prisma.$disconnect();
    }
  }

  return cachedSettings;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getCachedSettings();

  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <head>
        {/* Preload critical CSS */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

        {/* Load FontAwesome */}
        <link rel="preload" href="https://kit-pro.fontawesome.com/releases/v6.3.0/css/pro.min.css" as="style" />
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.3.0/css/pro.min.css" />

        <GlobalStyles />
      </head>
      <body className="bg-white text-black">
        <PerformanceMonitor />
        <AuthProvider>
          <MainNavigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <MainFooter
            siteName={settings?.siteName}
            contactEmail={settings?.contactEmail}
            phoneNumber={settings?.phoneNumber}
            facebookUrl={settings?.facebookUrl}
            instagramUrl={settings?.instagramUrl}
            twitterUrl={settings?.twitterUrl}
          />
          <ClientScripts />
        </AuthProvider>

        {/* Load JavaScript libraries asynchronously after page load */}
        <Script
          src="https://unpkg.com/aos@2.3.1/dist/aos.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
