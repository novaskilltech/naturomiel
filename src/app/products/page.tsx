"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { PRODUCTS, Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Info, HelpCircle } from "lucide-react";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "HONEY" | "HIVE_PRODUCT">("ALL");
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (p.category === "THERAPEUTIC_BLEND") return false; // Handled on separate mixtures page
    if (selectedCategory === "ALL") return p.category === "HONEY" || p.category === "HIVE_PRODUCT";
    return p.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Trésors Rares & Sauvages
          </span>
          <h1 className="font-serif text-4xl font-light text-dark-deep sm:text-5xl">
            Notre Collection de Miels
          </h1>
          <p className="mx-auto max-w-lg text-xs text-olive-light">
            Une sélection pure de nectars naturels du Maroc et de produits de la ruche certifiés pour leur excellence aromatique et médicinale.
          </p>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {(["ALL", "HONEY", "HIVE_PRODUCT"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-dark-deep text-white border-dark-deep"
                  : "bg-white text-dark-soft border-gold-champagne/20 hover:border-gold-dark"
              }`}
            >
              {cat === "ALL" && "Tout afficher"}
              {cat === "HONEY" && "Miels rares"}
              {cat === "HIVE_PRODUCT" && "Produits de la ruche"}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || "");
            const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

            return (
              <div
                key={product.id}
                id={product.id}
                className="flex flex-col bg-white border border-gold-champagne/10 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-bg-cream">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {product.origin && (
                    <span className="absolute top-4 left-4 bg-dark-deep/90 text-bg-cream text-[9px] font-semibold uppercase tracking-widest px-3 py-1">
                      {product.origin}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 space-y-4 justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-dark-deep mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-olive-light line-clamp-3 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Specifications badges */}
                    {product.taste && (
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-dark-soft bg-bg-cream p-3 border border-gold-champagne/5">
                        <div>
                          <span className="font-bold text-olive-dark block">Saveur :</span>
                          <span className="line-clamp-1">{product.taste}</span>
                        </div>
                        <div>
                          <span className="font-bold text-olive-dark block">Texture :</span>
                          <span className="line-clamp-1">{product.texture}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gold-champagne/10 space-y-4">
                    {/* Weight selector */}
                    {product.variants.length > 1 && (
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-olive-light">
                          Format :
                        </label>
                        <div className="flex gap-2">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariantId(v.id)}
                              className={`px-2.5 py-1 text-[10px] font-semibold border transition-all ${
                                selectedVariantId === v.id
                                  ? "bg-gold-champagne text-dark-deep border-gold-dark"
                                  : "bg-white text-dark-soft border-gold-champagne/20 hover:border-gold-champagne"
                              }`}
                            >
                              {v.weight}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Add CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif font-bold text-dark-deep">
                        {currentVariant?.price} €
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProductDetails(product)}
                          className="border border-gold-champagne/45 hover:border-gold-dark p-2 text-dark-soft transition-colors"
                          title="Fiche technique complète"
                        >
                          <Info className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            addToCart({
                              id: currentVariant.id,
                              productId: product.id,
                              variantId: currentVariant.id,
                              name: product.name,
                              weight: currentVariant.weight,
                              price: currentVariant.price,
                              imageUrl: product.imageUrl,
                            })
                          }
                          className="bg-dark-deep hover:bg-gold-dark text-white px-5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors"
                        >
                          Ajouter au panier
                        </button>
                      </div>
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
                  Fiche Technique Officielle
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-dark-deep mt-1">
                  {selectedProductDetails.name}
                </h2>
                <div className="h-[1px] w-12 bg-gold-champagne mt-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {selectedProductDetails.origin && (
                  <div className="bg-white border border-gold-champagne/10 p-3">
                    <span className="font-semibold block text-olive-dark text-[10px] uppercase tracking-wider">Origine</span>
                    <p className="mt-0.5 text-dark-deep">{selectedProductDetails.origin}</p>
                  </div>
                )}
                {selectedProductDetails.taste && (
                  <div className="bg-white border border-gold-champagne/10 p-3">
                    <span className="font-semibold block text-olive-dark text-[10px] uppercase tracking-wider">Arôme & Goût</span>
                    <p className="mt-0.5 text-dark-deep">{selectedProductDetails.taste}</p>
                  </div>
                )}
                {selectedProductDetails.texture && (
                  <div className="bg-white border border-gold-champagne/10 p-3">
                    <span className="font-semibold block text-olive-dark text-[10px] uppercase tracking-wider">Texture</span>
                    <p className="mt-0.5 text-dark-deep">{selectedProductDetails.texture}</p>
                  </div>
                )}
                {selectedProductDetails.crystallization && (
                  <div className="bg-white border border-gold-champagne/10 p-3">
                    <span className="font-semibold block text-olive-dark text-[10px] uppercase tracking-wider">Cristallisation</span>
                    <p className="mt-0.5 text-dark-deep">{selectedProductDetails.crystallization}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-dark-deep mb-2">Description</h4>
                <p className="text-xs text-olive-light leading-relaxed">{selectedProductDetails.description}</p>
              </div>

              {selectedProductDetails.usageTips && (
                <div className="bg-bg-ivory border-l-2 border-gold-champagne p-4">
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-dark-deep mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-gold-dark" /> Conseil d'Apithérapie & Utilisation
                  </h4>
                  <p className="text-xs text-olive-light leading-relaxed">{selectedProductDetails.usageTips}</p>
                </div>
              )}

              {selectedProductDetails.benefits && (
                <div>
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-dark-deep mb-2">Bienfaits Reconnu</h4>
                  <ul className="list-disc pl-4 text-xs text-olive-light space-y-1">
                    {selectedProductDetails.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
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
