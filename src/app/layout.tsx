import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NaturoMiel | Miels Rares du Maroc & Apithérapie Premium",
  description: "Découvrez notre sélection exclusive de miels rares du Maroc, mélanges thérapeutiques artisanaux et produits de la ruche de qualité exceptionnelle.",
  metadataBase: new URL("https://www.naturomiel.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NaturoMiel | Miels Rares du Maroc",
    description: "Miels rares du Maroc, mélanges thérapeutiques et produits de la ruche de qualité exceptionnelle.",
    url: "https://www.naturomiel.fr",
    siteName: "NaturoMiel",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#0B0B0A] font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
