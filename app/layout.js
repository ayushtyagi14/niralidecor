import localFont from "next/font/local";
import { Cinzel_Decorative } from 'next/font/google';
import "./globals.css";

export const deco = Cinzel_Decorative({ subsets: ['latin'], weight: ['400', '700', '900'] });
export const ranade = localFont({ src: './fonts/Ranade.ttf' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Nirali Decor</title>
        <meta name='description' content='Description' />
      </head>
      <body className={`${ranade.className} antialiased`}>
        <video
          className="background-video"
          src="/assets/background-video.mp4" // Replace with the actual path to your video file
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="background-content">
          {children}
        </div>
      </body>
    </html>
  );
}
