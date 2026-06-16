import "./globals.css";
import { deco, ranade } from "@/lib/fonts";
import Script from "next/script";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import WeddingConsultationPopup from "@/components/WeddingConsultationPopup";

export const metadata = {
  // Home page title; other routes (like /blog and /blog/[slug])
  // can override this with their own metadata.
  title: "Elegant Indian Wedding Decor Services | Nirali Decor",
  description:
    "Indian wedding decor services in New Jersey and Atlanta, GA by Nirali Decor. We create elegant, creative, and traditional designs for your perfect celebration.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${ranade.className} antialiased`} suppressHydrationWarning>
        {/* Start cookieyes banner */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/88d5c7bc58b0a23bbbb711775dc8ff5a/script.js"
          strategy="beforeInteractive"
        />
        {/* End cookieyes banner */}
        <Script id="google-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKKC7S45X4"
          strategy="afterInteractive"
          data-cookieyes="cookieyes-analytics"
        />
        <Script id="ga-gtag" strategy="afterInteractive" data-cookieyes="cookieyes-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKKC7S45X4');
          `}
        </Script>
        {children}
        <ScrollToTopButton />
        <WeddingConsultationPopup />
      </body>
    </html>
  );
}
