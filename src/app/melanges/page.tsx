"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { PRODUCTS, Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

export default function MelangesPage() {
  const { addToCart } = useCart();
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  const mixtures = PRODUCTS.filter((p) => p.category === "THERAPEUTIC_BLEND");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Synergies & Apithérapie
          </span>
          <h1 className="font-serif text-4xl font-light text-dark-deep sm:text-5xl">
            Mélanges Thérapeutiques
          </h1>
          <p className="mx-auto max-w-lg text-xs text-olive-light">
            Préparations artisanales à base de nos miels précieux combinés à des super-aliments de la ruche et plantes bio pour cibler naturellement votre bien-être.
          </p>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Mixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mixtures.map((product) => {
            const defaultVariant = product.variants[0];

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white border border-gold-champagne/10 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-bg-cream">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-gold-champagne text-dark-deep text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                    Synergie Active
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 space-y-4 justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-medium text-dark-deep">
                      {product.name}
                    </h3>
                    <p className="text-xs text-olive-light line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Composition quick view */}
                    {product.composition && (
                      <div className="text-[10px] text-dark-soft">
                        <span className="font-bold text-olive-dark block mb-1">Ingrédients :</span>
                        <div className="flex flex-wrap gap-1">
                          {product.composition.map((c, idx) => (
                            <span key={idx} className="bg-bg-cream px-2 py-0.5 border border-gold-champagne/5 rounded-full">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gold-champagne/10 flex items-center justify-between">
                    <span className="text-lg font-serif font-bold text-dark-deep">
                      {defaultVariant.price} € <span className="text-[10px] text-olive-light font-sans font-normal">({defaultVariant.weight})</span>
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProductDetails(product)}
                        className="border border-gold-champagne/45 hover:border-gold-dark p-2 text-dark-soft transition-colors"
                        title="Détails, bienfaits et précautions"
                      >
                        <Info className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          addToCart({
                            id: defaultVariant.id,
                            productId: product.id,
                            variantId: defaultVariant.id,
                            name: product.name,
                            weight: defaultVariant.weight,
                            price: defaultVariant.price,
                            imageUrl: product.imageUrl,
                          })
                        }
                        className="bg-dark-deep hover:bg-gold-dark text-white px-5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal - Complete Technical Sheet */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-2xl bg-bg-cream border border-gold-champagne/30 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 text-dark-deep hover:text-gold-dark text-sm uppercase tracking-widest font-bold"
            >
              Fermer [X]
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-gold-dark font-bold">
                  Formulation Apicole & Bienfaits
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-dark-deep mt-1">
                  {selectedProductDetails.name}
                </h2>
                <div className="h-[1px] w-12 bg-gold-champagne mt-2" />
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-dark-deep mb-2">Description</h4>
                <p className="text-xs text-olive-light leading-relaxed">{selectedProductDetails.description}</p>
              </div>

              {selectedProductDetails.composition && (
                <div className="bg-white border border-gold-champagne/10 p-4">
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-dark-deep mb-2">Composition exacte</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-dark-soft">
                    {selectedProductDetails.composition.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-gold-dark flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProductDetails.benefits && (
                <div>
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-dark-deep mb-2">Propriétés & Actions</h4>
                  <ul className="space-y-2 text-xs text-olive-light">
                    {selectedProductDetails.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-dark mt-1.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProductDetails.usageTips && (
                <div>
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-dark-deep mb-2">Conseils de cure</h4>
                  <p className="text-xs text-olive-light leading-relaxed">{selectedProductDetails.usageTips}</p>
                </div>
              )}

              {selectedProductDetails.precautions && (
                <div className="bg-amber-50 border-l-2 border-amber-500 p-4">
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-600" /> Précautions & Contre-indications
                  </h4>
                  <ul className="list-disc pl-4 text-xs text-amber-850 space-y-1">
                    {selectedProductDetails.precautions.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
