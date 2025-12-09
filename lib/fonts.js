import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";

export const deco = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const ranade = localFont({ src: "../app/fonts/Ranade.ttf" });
