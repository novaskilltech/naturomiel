"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { Star, ShieldCheck, MapPin } from "lucide-react";

export default function TemoignagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center space-y-6 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Satisfaction & Confiance
          </span>
          <h1 className="font-serif text-4xl font-light text-dark-deep sm:text-5xl">
            Témoignages de nos Clients
          </h1>
          <p className="mx-auto max-w-lg text-xs text-olive-light">
            Découvrez les retours authentiques de notre communauté d'amateurs de miels rares et de produits de la ruche.
          </p>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Global Rating Card (CRO booster) */}
        <div className="max-w-3xl mx-auto bg-white border border-gold-champagne/15 p-8 text-center space-y-4 mb-16 shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-gold-dark">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-gold-dark text-gold-dark" />
            ))}
          </div>
          
          <h2 className="font-serif text-3xl text-dark-deep font-semibold">4.9 / 5 étoiles</h2>
          <p className="text-xs text-olive-light max-w-md mx-auto leading-relaxed">
            Note moyenne calculée sur plus de 69 avis clients déposés sur notre fiche officielle Google Maps. Chaque retour fait l'objet d'un suivi rigoureux pour garantir notre engagement de qualité.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-medium text-dark-soft">
            <span className="flex items-center gap-1.5 text-olive-dark">
              <ShieldCheck className="h-4 w-4" /> Avis 100% vérifiés
            </span>
            <span className="flex items-center gap-1.5 text-olive-dark">
              <MapPin className="h-4 w-4" /> Clientèle France & Maroc
            </span>
          </div>

          <div className="pt-4">
            <a
              href="https://www.google.com/search?sca_esv=d4689b59cf2d8a3f&sxsrf=APpeQnsTE5eu6Kssd6P5EBer6olqeg_qGw:1782552777131&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_0mxEaJ91xgRNZ1EBlP406gQROYRLfg2c9-bW0RpFMk8w8Ics4W4bnyDVhwCftWEPTERf3M836Xm_iQjmmVhDv3uiY1l&q=naturomiel+Avis&sa=X&ved=2ahUKEwj0x8vIjqeVAxUz9QIHHSfhPDYQ0bkNegQIKRAF&biw=1452&bih=632&dpr=1.69"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-dark-deep hover:bg-gold-dark text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Vérifier les avis sur Google
            </a>
          </div>
        </div>

        {/* Dynamic Testimonials Component Grid */}
        <Testimonials />
        
      </main>
    </div>
  );
}
