"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { CreditCard, Truck, CheckCircle2, Lock, Landmark } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "FR", // Default France
    paymentMethod: "STRIPE",
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Simulate order placement securely
    const id = `NM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setIsOrdered(true);
    clearCart();
  };

  // Rule: Cash on Delivery (COD) only available in Morocco (MA)
  const isCODAllowed = formData.country === "MA";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {isOrdered ? (
          <div className="bg-white border border-gold-champagne/20 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="rounded-full bg-emerald-50 text-emerald-700 p-4 w-16 h-16 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="font-serif text-3xl text-dark-deep">Votre commande est confirmée</h1>
            <p className="text-xs text-olive-light">
              Merci pour votre confiance. Votre commande <span className="font-mono font-bold text-dark-deep">{orderId}</span> a été enregistrée avec succès.
            </p>
            <div className="bg-bg-cream p-4 border border-gold-champagne/10 text-[11px] text-left text-dark-soft space-y-1.5">
              <p><strong>Destinataire :</strong> {formData.fullName}</p>
              <p><strong>Adresse :</strong> {formData.address}, {formData.city} ({formData.country})</p>
              <p><strong>Méthode de paiement :</strong> {formData.paymentMethod}</p>
              <p><strong>Statut :</strong> {formData.paymentMethod === "COD" ? "En attente de livraison" : "Traitement en cours (Stripe Sandbox)"}</p>
            </div>
            <p className="text-xs text-olive-light">
              Un e-mail de confirmation détaillant votre facture et le suivi de livraison vous a été envoyé.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="bg-dark-deep hover:bg-gold-dark text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Retourner à la boutique
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-light text-dark-deep">Finaliser votre Commande</h1>
              <div className="h-[1px] w-12 bg-gold-champagne mt-2" />
            </div>

            {cart.length === 0 ? (
              <div className="bg-white border border-gold-champagne/15 p-8 text-center">
                <p className="text-sm text-olive-light mb-4">Votre panier est vide.</p>
                <Link href="/products" className="bg-dark-deep text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider">
                  Retour au catalogue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Shipping & Payment Form (3 cols) */}
                <div className="lg:col-span-3 space-y-6 bg-white border border-gold-champagne/15 p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-medium text-dark-deep border-b border-gold-champagne/10 pb-2">
                    Informations de Livraison
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Nom complet</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Jean Dupont"
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Adresse e-mail</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jean.dupont@gmail.com"
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Téléphone (WhatsApp)</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Pays</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          handleInputChange(e);
                          // Reset payment method if changing away from Morocco and COD was selected
                          if (e.target.value !== "MA" && formData.paymentMethod === "COD") {
                            setFormData((prev) => ({ ...prev, country: e.target.value, paymentMethod: "STRIPE" }));
                          }
                        }}
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      >
                        <option value="FR">France</option>
                        <option value="MA">Maroc</option>
                        <option value="BE">Belgique</option>
                        <option value="CH">Suisse</option>
                        <option value="ES">Espagne</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Adresse de livraison</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="12 Rue de la Paix"
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-olive-light">Ville</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                        className="w-full bg-white border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark text-xs"
                      />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-dark-deep border-b border-gold-champagne/10 pb-2 pt-4">
                    Méthode de Paiement
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 border border-gold-champagne/15 p-3 cursor-pointer hover:bg-bg-cream/40">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="STRIPE"
                        checked={formData.paymentMethod === "STRIPE"}
                        onChange={handleInputChange}
                        className="accent-gold-dark"
                      />
                      <CreditCard className="h-4 w-4 text-gold-dark" />
                      <div className="text-xs">
                        <span className="font-bold text-dark-deep block">Carte bancaire (Stripe)</span>
                        <span className="text-[10px] text-olive-light">Paiement 100% sécurisé et crypté.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 border border-gold-champagne/15 p-3 cursor-pointer hover:bg-bg-cream/40">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="PAYPAL"
                        checked={formData.paymentMethod === "PAYPAL"}
                        onChange={handleInputChange}
                        className="accent-gold-dark"
                      />
                      <span className="font-bold text-blue-700 text-sm">PayPal</span>
                      <div className="text-xs">
                        <span className="text-[10px] text-olive-light">Utilisez votre compte PayPal sécurisé.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 border border-gold-champagne/15 p-3 cursor-pointer hover:bg-bg-cream/40">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="BANK_TRANSFER"
                        checked={formData.paymentMethod === "BANK_TRANSFER"}
                        onChange={handleInputChange}
                        className="accent-gold-dark"
                      />
                      <Landmark className="h-4 w-4 text-gold-dark" />
                      <div className="text-xs">
                        <span className="font-bold text-dark-deep block">Virement bancaire</span>
                        <span className="text-[10px] text-olive-light">Expédition après réception des fonds.</span>
                      </div>
                    </label>

                    {isCODAllowed && (
                      <label className="flex items-center gap-3 border border-emerald-champagne/20 bg-emerald-50/20 p-3 cursor-pointer hover:bg-emerald-50/40">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={formData.paymentMethod === "COD"}
                          onChange={handleInputChange}
                          className="accent-gold-dark"
                        />
                        <Truck className="h-4 w-4 text-emerald-800" />
                        <div className="text-xs">
                          <span className="font-bold text-emerald-900 block">Paiement à la livraison</span>
                          <span className="text-[10px] text-emerald-800">Disponible uniquement pour le Maroc. Payez en espèces lors de la livraison.</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Summary (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-bg-ivory border border-gold-champagne/20 p-6 space-y-6">
                    <h3 className="font-serif text-lg font-medium text-dark-deep border-b border-gold-champagne/10 pb-2">
                      Résumé de la Commande
                    </h3>

                    <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-start text-xs text-dark-soft">
                          <div>
                            <span className="font-bold text-dark-deep">{item.name}</span>
                            <span className="block text-[10px] text-olive-light">{item.weight} x {item.quantity}</span>
                          </div>
                          <span className="font-semibold text-dark-deep">{item.price * item.quantity} €</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gold-champagne/15 pt-4 space-y-2 text-xs font-medium text-dark-soft">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{subtotal} €</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-800">
                          <span>Réduction ({appliedPromo?.code})</span>
                          <span>-{discountAmount} €</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Livraison</span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-800 font-semibold">Gratuite</span>
                        ) : (
                          <span>{shippingFee} €</span>
                        )}
                      </div>

                      <div className="flex justify-between border-t border-gold-champagne/15 pt-3 text-sm font-serif font-bold text-dark-deep">
                        <span>Total</span>
                        <span>{total} €</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-dark-deep hover:bg-gold-dark text-white py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="h-3.5 w-3.5" /> Confirmer et Payer {total} €
                    </button>

                    <p className="text-[9px] text-center text-olive-light">
                      En validant, vous acceptez nos CGV et notre Politique de Confidentialité (RGPD).
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
