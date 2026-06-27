"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative flex h-[90vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-dark-deep">
      {/* Background Image with Zoom effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1920&auto=format&fit=crop"
          alt="Miel doré de prestige"
          className="h-full w-full object-cover opacity-45 scale-105 filter brightness-95"
        />
        {/* Subtle radial overlay for focus and luxury atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-dark-deep/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gold-champagne">
            L'excellence de l'apiculture marocaine
          </span>
          
          <h1 className="font-serif text-4xl font-light tracking-wide text-bg-cream sm:text-6xl lg:text-7xl leading-tight">
            Les trésors de la ruche,<br />
            <span className="italic font-normal text-gold-champagne">sélectionnés avec passion.</span>
          </h1>

          <p className="mx-auto max-w-xl text-sm font-light tracking-wider text-bg-cream/75 sm:text-base">
            Miels rares du Maroc • Produits de la ruche • Mélanges artisanaux
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-gold-champagne hover:bg-gold-dark text-dark-deep hover:text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg"
            >
              Découvrir nos miels
            </Link>
            <Link
              href="/promotions"
              className="w-full sm:w-auto border border-bg-cream/60 hover:border-bg-cream hover:bg-bg-cream/10 text-bg-cream px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Offres Spéciales
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-55">
        <span className="text-[9px] uppercase tracking-[0.2em] text-bg-cream">Faire défiler</span>
        <div className="h-8 w-[1px] bg-bg-cream animate-bounce" />
      </div>
    </div>
  );
}
