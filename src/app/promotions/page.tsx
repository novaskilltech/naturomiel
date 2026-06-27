"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { PRODUCTS, Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Check, Plus, Trash2, Gift } from "lucide-react";

export default function PromotionsPage() {
  const { addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<{ product: Product; variantId: string; weight: string }[]>([]);

  // Configurator Rules
  // Excluded: Jujubier, Thym.
  // Allowed: Zaggoum, Fenouil, Eucalyptus, Ronces, Caroubier, Campagne, Pollen.
  const allowedProducts = PRODUCTS.filter((p) => 
    ["miel-zaggoum", "miel-fenouil", "miel-eucalyptus", "miel-caroubier", "miel-ronces", "miel-campagne", "pollen-sec"].includes(p.id)
  );

  const handleSelectItem = (product: Product) => {
    if (selectedItems.length >= 4) return;
    
    // For honeys, use 500g variant. For Pollen, use 250g.
    const defaultVariant = product.id === "pollen-sec" 
      ? product.variants.find(v => v.weight === "250 g")! 
      : product.variants.find(v => v.weight === "500 g")!;
      
    setSelectedItems([
      ...selectedItems,
      { product, variantId: defaultVariant.id, weight: defaultVariant.weight }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleAddBundleToCart = () => {
    if (selectedItems.length !== 4) return;

    const subItemsDescription = selectedItems.map(item => ({
      name: item.product.name,
      weight: item.weight,
      imageUrl: item.product.imageUrl
    }));

    // Add unique bundle item to cart
    addToCart({
      id: `bundle-decouverte-${Date.now()}`,
      productId: "offre-decouverte-bundle",
      variantId: "bundle-decouverte-var",
      name: "Offre Découverte (4 Pots)",
      weight: "4 x Pots",
      price: 50.0,
      imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=300&auto=format&fit=crop",
      isBundle: true,
      subItems: subItemsDescription
    });

    // Reset configurator
    setSelectedItems([]);
    alert("Votre coffret Découverte a été ajouté au panier !");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Offres Privilèges
          </span>
          <h1 className="font-serif text-4xl font-light text-dark-deep sm:text-5xl">
            Nos Promotions
          </h1>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Grid for promos: 1 configurator + 1 promotional info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Configurator block (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-8 bg-white border border-gold-champagne/15 p-6 sm:p-8 shadow-sm">
            <div>
              <span className="inline-flex items-center gap-2 text-gold-dark text-[10px] font-bold uppercase tracking-wider mb-2">
                <Gift className="h-4 w-4" /> Offre Découverte Personnalisable
              </span>
              <h2 className="font-serif text-2xl text-dark-deep">
                Composez votre coffret de 4 Pots pour 50 €
              </h2>
              <p className="text-xs text-olive-light mt-1.5 leading-relaxed">
                Sélectionnez exactement 4 produits parmi nos variétés de 500 g autorisées (ou remplacez l'un des miels par un pot de Pollen sec de 250 g). *Les miels rares de Thym et de Jujubier sont exclus de cette offre.*
              </p>
            </div>

            {/* Slots visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gold-champagne/10">
              {[0, 1, 2, 3].map((slotIndex) => {
                const item = selectedItems[slotIndex];
                return (
                  <div
                    key={slotIndex}
                    className={`relative flex flex-col items-center justify-center border h-40 p-4 text-center ${
                      item 
                        ? "border-gold-champagne bg-bg-ivory/40" 
                        : "border-dashed border-gold-champagne/45 bg-bg-cream/20"
                    }`}
                  >
                    {item ? (
                      <>
                        <button
                          onClick={() => handleRemoveItem(slotIndex)}
                          className="absolute top-2 right-2 text-red-800 hover:text-red-600 transition-colors p-1"
                          title="Retirer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-14 w-14 object-cover rounded-full border border-gold-champagne/10 mb-2"
                        />
                        <span className="font-serif text-xs font-semibold text-dark-deep line-clamp-1">
                          {item.product.name.replace("Miel de ", "")}
                        </span>
                        <span className="text-[9px] text-olive-light mt-0.5">{item.weight}</span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-gold-champagne">
                        <Plus className="h-5 w-5 stroke-[1.5]" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Slot {slotIndex + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Configurator choices list */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-dark-soft mb-4">
                Choix Disponibles (Ajoutez 4 produits)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allowedProducts.map((product) => {
                  const isSelectedCount = selectedItems.filter(item => item.product.id === product.id).length;
                  const isLimitReached = selectedItems.length >= 4;

                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between border border-gold-champagne/10 p-3 bg-bg-cream/40"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-12 w-12 object-cover"
                        />
                        <div>
                          <h4 className="font-serif text-xs font-semibold text-dark-deep">
                            {product.name}
                          </h4>
                          <span className="text-[9px] text-olive-light">
                            {product.id === "pollen-sec" ? "Pollen sec (250 g)" : "Miel sauvage (500 g)"}
                          </span>
                        </div>
                      </div>

                      <button
                        disabled={isLimitReached}
                        onClick={() => handleSelectItem(product)}
                        className={`p-2 border transition-colors ${
                          isLimitReached
                            ? "border-gold-champagne/20 text-gold-champagne/40 cursor-not-allowed"
                            : "border-gold-champagne hover:border-gold-dark text-dark-deep hover:bg-gold-champagne/10"
                        }`}
                      >
                        {isSelectedCount > 0 ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-gold-dark">
                            <Check className="h-3.5 w-3.5" /> ({isSelectedCount})
                          </span>
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action panel */}
            <div className="flex items-center justify-between pt-6 border-t border-gold-champagne/10">
              <div>
                <span className="text-xs text-olive-light block">Prix unique du coffret</span>
                <span className="font-serif text-2xl font-bold text-dark-deep">50.00 €</span>
              </div>

              <button
                disabled={selectedItems.length !== 4}
                onClick={handleAddBundleToCart}
                className={`px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                  selectedItems.length === 4
                    ? "bg-dark-deep hover:bg-gold-dark text-white"
                    : "bg-gold-champagne/30 text-gold-champagne/60 cursor-not-allowed border border-gold-champagne/10"
                }`}
              >
                Ajouter le coffret
              </button>
            </div>

          </div>

          {/* Sidebar / FIFA Cup promo info */}
          <div className="space-y-6">
            <div className="bg-bg-ivory border border-gold-champagne/20 p-6 space-y-4">
              <span className="bg-[#006233] text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 inline-block">
                Offre Limitée
              </span>
              <h3 className="font-serif text-xl font-semibold text-dark-deep">
                Offre Coupe du Monde FIFA 2026
              </h3>
              <p className="text-xs text-olive-light leading-relaxed">
                Profitez de 10% de réduction sur l'ensemble de votre commande à l'occasion de la Coupe du Monde 2026.
              </p>
              
              <div className="border-t border-gold-champagne/15 pt-4">
                <span className="text-[10px] text-olive-light uppercase font-bold block mb-1">Code promotionnel</span>
                <div className="flex justify-between items-center bg-white border border-gold-champagne/20 px-3 py-2">
                  <span className="font-mono text-sm font-bold tracking-widest text-dark-deep">MAROC2026</span>
                  <span className="text-[10px] text-emerald-800 font-bold">-10%</span>
                </div>
              </div>

              <ul className="text-[10px] text-olive-light space-y-1 pl-4 list-disc">
                <li>Valable dès 100 € d'achat</li>
                <li>Hors frais de livraison</li>
                <li>Cumulable avec l'Offre Découverte</li>
              </ul>
            </div>

            <div className="border border-gold-champagne/10 p-6 bg-white space-y-3">
              <h4 className="font-serif text-sm font-semibold text-dark-deep">Des questions sur nos miels ?</h4>
              <p className="text-xs text-olive-light">
                Notre expert en apithérapie est disponible via WhatsApp pour vous conseiller sur le meilleur miel à associer à votre pollen ou selon vos besoins de santé.
              </p>
              <a
                href="https://wa.me/212716014148"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
