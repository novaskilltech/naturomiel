"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { PRODUCTS } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { ChevronRight, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const { addToCart } = useCart();
  
  // Show 3 flagship products on home page
  const featuredProducts = PRODUCTS.filter(p => 
    ["miel-jujubier", "miel-zaggoum", "melange-immunite"].includes(p.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Immersive Hero */}
        <Hero />

        {/* Brand Values / Trust Section */}
        <section className="bg-bg-ivory py-16 border-y border-gold-champagne/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-gold-champagne/15 p-4 text-gold-dark">
                  <Award className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-deep">Qualité Sans Compromis</h3>
                <p className="max-w-xs text-xs text-olive-light leading-relaxed">
                  Chaque pot est le fruit d’une sélection rigoureuse, analysé en laboratoire pour garantir sa pureté et son origine florale.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-gold-champagne/15 p-4 text-gold-dark">
                  <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-deep">Origine Certifiée</h3>
                <p className="max-w-xs text-xs text-olive-light leading-relaxed">
                  Directement récoltés auprès de nos apiculteurs partenaires dans les régions les plus préservées du Maroc (Atlas, Souss).
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-gold-champagne/15 p-4 text-gold-dark">
                  <Heart className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-deep">Apiculture Durable</h3>
                <p className="max-w-xs text-xs text-olive-light leading-relaxed">
                  Respect des abeilles et des traditions artisanales pour vous offrir le meilleur de la ruche de manière éco-responsable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
              Sélection d'Exception
            </span>
            <h2 className="font-serif text-3xl font-light text-dark-deep sm:text-5xl">
              Nos Nectars Phares
            </h2>
            <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const defaultVariant = product.variants[0];
              return (
                <div 
                  key={product.id} 
                  className="flex flex-col bg-white border border-gold-champagne/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-80 w-full overflow-hidden bg-bg-cream">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-dark-deep/95 text-bg-cream text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5">
                      {product.category === "HONEY" ? "Miel Rare" : "Therpeutique"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 space-y-4 justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-serif text-xl font-medium text-dark-deep">{product.name}</h3>
                        <span className="text-sm font-semibold text-gold-dark">{defaultVariant.price} €</span>
                      </div>
                      <p className="text-xs text-olive-light line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-gold-champagne/5">
                      <Link 
                        href={`/products#${product.id}`}
                        className="text-xs font-semibold tracking-wider uppercase text-dark-soft hover:text-gold-dark inline-flex items-center gap-1"
                      >
                        En savoir plus <ChevronRight className="h-3 w-3" />
                      </Link>
                      
                      <button
                        onClick={() => addToCart({
                          id: defaultVariant.id,
                          productId: product.id,
                          variantId: defaultVariant.id,
                          name: product.name,
                          weight: defaultVariant.weight,
                          price: defaultVariant.price,
                          imageUrl: product.imageUrl
                        })}
                        className="bg-dark-deep hover:bg-gold-dark text-white px-4 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-b border-dark-deep hover:border-gold-dark text-dark-deep hover:text-gold-dark pb-1 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Découvrir toute la gamme <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* Promotion World Cup FIFA 2026 */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-ivory border-t border-gold-champagne/10">
          <div className="mx-auto max-w-5xl bg-white border border-gold-champagne/20 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-sm">
            {/* Image Section */}
            <div className="relative h-64 md:h-auto min-h-[320px]">
              <img
                src="/images/fifa_promo_banner.png"
                alt="FIFA 2026 Coupe du Monde Maroc Promotion"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/30 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 relative">
              <div className="space-y-4">
                <span className="inline-block bg-[#006233] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                  Événement Spécial FIFA 2026
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-dark-deep font-semibold">
                  Célébrez la Coupe du Monde
                </h3>
                <p className="text-xs text-olive-light leading-relaxed">
                  Soutenez l'équipe nationale et profitez de <strong className="text-dark-deep">10% de réduction immédiate</strong> sur tout le site (hors frais de port) à partir de 100 € d'achat avec le code ci-dessous.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 bg-bg-cream border border-dashed border-gold-champagne p-6">
                <span className="text-[10px] uppercase tracking-wider text-olive-light font-bold">Votre Code Promo</span>
                <span className="font-mono text-2xl font-bold tracking-widest text-[#C1272D] bg-white px-4 py-1.5 border border-gold-champagne/30">MAROC2026</span>
                <span className="text-[9px] text-gold-dark font-medium mt-1">Dès 100 € de commande</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="relative bg-dark-deep py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img
              src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1920&auto=format&fit=crop"
              alt="Apiculture traditionnelle maroc"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-champagne">
              L'Art de l'Apiculture
            </span>
            <h2 className="font-serif text-3xl font-light text-bg-cream sm:text-5xl leading-tight">
              Un savoir-faire préservé au cœur du Maroc
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-bg-cream/80 leading-relaxed font-light">
              Des montagnes du Moyen-Atlas aux régions semi-arides du Souss, les abeilles de NaturoMiel butinent des fleurs sauvages uniques pour produire des nectars d'une pureté exceptionnelle. Nous soutenons des méthodes d'apiculture traditionnelles, respectueuses de l'écosystème local et garantissant une qualité brute, jamais surchauffée, pour préserver toutes ses vertus originelles.
            </p>
            <div className="pt-4">
              <Link
                href="/blog"
                className="inline-block bg-gold-champagne hover:bg-gold-dark text-dark-deep hover:text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
              >
                Visiter Notre Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Word from the Founder */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gold-champagne/10">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] border border-gold-champagne/20 p-3 bg-bg-cream shadow-sm">
                <img
                  src="/images/fondateur.png"
                  alt="Fondateur de NaturoMiel"
                  className="w-full h-full object-cover filter sepia-[5%] contrast-[1.01]"
                />
                <div className="absolute -bottom-4 -right-4 bg-dark-deep text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest border border-gold-champagne/20">
                  Apiculteur Amateur & Expert
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-dark block">
                  Engagement & Pureté
                </span>
                <h2 className="font-serif text-3xl font-light text-dark-deep sm:text-4xl">
                  Le Mot du Fondateur
                </h2>
                <p className="text-xs text-olive-dark font-medium italic">
                  Conseiller en Apithérapie & Apiculteur Passionné
                </p>
              </div>

              <div className="h-[1px] w-20 bg-gold-champagne mx-auto lg:mx-0" />

              <div className="space-y-4 text-xs sm:text-sm text-dark-soft leading-relaxed font-light">
                <p>
                  "Passionné depuis de nombreuses années par le monde fascinant des abeilles, j'ai fondé **NaturoMiel** avec une mission claire : vous faire découvrir la quintessence des terroirs marocains à travers des nectars bruts d'exception. En combinant mon expertise de conseiller en apithérapie et ma passion d'apiculteur amateur, je m'engage à vous proposer des préparations qui préservent toutes les forces de la ruche."
                </p>
                <p>
                  "Chaque miel que nous vous proposons est le fruit d'une sélection rigoureuse et sans compromis. Je me déplace personnellement dans les régions sauvages et préservées du Maroc — des forêts d'eucalyptus du Moyen-Atlas aux plaines arides du Souss — pour collaborer avec des apiculteurs locaux traditionnels. Nous n'utilisons que des méthodes douces : aucun miel n'est surchauffé pour préserver ses enzymes actives et toutes ses vertus médicinales originelles. Enfin, chaque récolte est systématiquement analysée en laboratoire indépendant afin de certifier son origine, son taux d'humidité optimal et sa pureté totale."
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="text-center lg:text-left">
                  <h4 className="font-serif text-sm font-bold text-dark-deep">Votre Conseiller NaturoMiel</h4>
                  <p className="text-[10px] text-olive-light mt-0.5">Expert Apithérapie certifié • Suivi & Traçabilité</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Real Customer Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="bg-dark-deep text-bg-cream/65 py-16 border-t border-gold-champagne/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-bg-cream tracking-widest font-semibold">NATURO<span className="text-gold-champagne">MIEL</span></h4>
            <p className="text-xs font-light leading-relaxed">
              Sélection d'exception de miels rares et produits de la ruche du Maroc. Luxe, bien-être et authenticité au service de votre santé.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-bg-cream font-bold mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><Link href="/products" className="hover:text-gold-champagne transition-colors">Tous nos Miels</Link></li>
              <li><Link href="/melanges" className="hover:text-gold-champagne transition-colors">Mélanges Thérapeutiques</Link></li>
              <li><Link href="/promotions" className="hover:text-gold-champagne transition-colors">Offres Spéciales</Link></li>
              <li><Link href="/blog" className="hover:text-gold-champagne transition-colors">Le Blog Santé</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-bg-cream font-bold mb-4">Contact & Commandes</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>WhatsApp : <a href="https://wa.me/212716014148" className="hover:text-gold-champagne transition-colors font-mono">+212 716 01 41 48</a></li>
              <li>Email : <a href="mailto:naturomiel@gmail.com" className="hover:text-gold-champagne transition-colors font-mono">naturomiel@gmail.com</a></li>
              <li>Livraison : France, Maroc, Europe</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-bg-cream font-bold mb-4">Mentions légales</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><Link href="/legal" className="hover:text-gold-champagne transition-colors">Mentions Légales & CGV</Link></li>
              <li><Link href="/rgpd" className="hover:text-gold-champagne transition-colors">Politique de Confidentialité</Link></li>
              <li>© {new Date().getFullYear()} NaturoMiel. Tous droits réservés.</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
