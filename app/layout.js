import "./globals.css";
import { deco, ranade } from "@/lib/fonts";
import Script from "next/script";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
    <html lang="en">
      <body className={`${ranade.className} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKKC7S45X4"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKKC7S45X4');
          `}
        </Script>
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
