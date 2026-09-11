import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Tangerine } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data/brand";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { CookieBanner } from "@/components/layout/CookieBanner";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const script = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elya-joaillerie.fr"),
  title: {
    default: `${brand.name} — Haute joaillerie et bagues de fiançailles sur mesure`,
    template: `%s — ${brand.name}`,
  },
  description: brand.tagline,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="flex min-h-dvh flex-col bg-ivoire font-sans text-noir-texte antialiased">
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-bleu-roi focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <AnnouncementBar />
        <Header />
        <main id="contenu-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <CartDrawer />
        <ToastViewport />
        <CookieBanner />
        <ScrollReveal />
      </body>
    </html>
  );
}
