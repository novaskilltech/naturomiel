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
  metadataBase: new URL("https://naturomiel.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NaturoMiel | Miels Rares du Maroc & Apithérapie Premium",
    description: "Découvrez notre sélection exclusive de miels rares du Maroc, mélanges thérapeutiques artisanaux et produits de la ruche de qualité exceptionnelle.",
    url: "https://naturomiel.vercel.app",
    siteName: "NaturoMiel",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/naturomiel_opengraph.png",
        width: 1200,
        height: 630,
        alt: "NaturoMiel - Miels Rares & Apithérapie Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NaturoMiel | Miels Rares du Maroc & Apithérapie Premium",
    description: "Découvrez notre sélection exclusive de miels rares du Maroc, mélanges thérapeutiques artisanaux et produits de la ruche de qualité exceptionnelle.",
    images: ["/images/naturomiel_opengraph.png"],
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
