"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, User, Trash2, Tag, Percent, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const {
    cart,
    cartCount,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    if (!promoCodeInput) return;
    const res = applyPromo(promoCodeInput);
    if (res.success) {
      setPromoSuccess(res.message);
      setPromoCodeInput("");
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <>
      {/* Moroccan Flag Premium Promo Banner */}
      <div className="w-full bg-[#C1272D] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-base">🇲🇦</span>
          <span className="text-[#006233] font-bold text-lg select-none">★</span>
        </span>
        <span>
          OFFRE COUPE DU MONDE 2026 : <strong className="text-gold-light font-bold">-10%</strong> dès 100€ avec le code <span className="bg-white/15 px-2 py-0.5 font-mono text-[11px] border border-white/20 select-all tracking-wider font-bold">MAROC2026</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-[#006233] font-bold text-lg select-none">★</span>
          <span className="text-base">🇲🇦</span>
        </span>
      </div>
 
      {/* Google Trust Rating Banner */}
      <div className="w-full bg-[#FAF9F6] border-b border-gold-champagne/10 py-1.5 px-4 text-center text-[10px] sm:text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 text-dark-soft">
        <span className="flex text-gold-dark gap-0.5">
          <Star className="h-3 w-3 fill-gold-dark text-gold-dark" />
          <Star className="h-3 w-3 fill-gold-dark text-gold-dark" />
          <Star className="h-3 w-3 fill-gold-dark text-gold-dark" />
          <Star className="h-3 w-3 fill-gold-dark text-gold-dark" />
          <Star className="h-3 w-3 fill-gold-dark text-gold-dark" />
        </span>
        <span>
          Note globale de <strong className="text-dark-deep">4,9/5</strong> sur Google Maps • <a href="https://www.google.com/search?sca_esv=d4689b59cf2d8a3f&sxsrf=APpeQnsTE5eu6Kssd6P5EBer6olqeg_qGw:1782552777131&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_0mxEaJ91xgRNZ1EBlP406gQROYRLfg2c9-bW0RpFMk8w8Ics4W4bnyDVhwCftWEPTERf3M836Xm_iQjmmVhDv3uiY1l&q=naturomiel+Avis&sa=X&ved=2ahUKEwj0x8vIjqeVAxUz9QIHHSfhPDYQ0bkNegQIKRAF&biw=1452&bih=632&dpr=1.69" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark font-semibold">69 avis clients vérifiables</a>
        </span>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-gold-champagne/10 bg-bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Branding */}
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="NaturoMiel Logo" className="h-12 w-auto object-contain" />
            <span className="font-serif text-xl tracking-widest text-dark-deep font-semibold hidden sm:inline">
              NATURO<span className="text-gold-dark">MIEL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-dark-soft">
            <Link href="/" className="hover:text-gold-dark transition-colors">Accueil</Link>
            <Link href="/products" className="hover:text-gold-dark transition-colors">Nos Miels</Link>
            <Link href="/melanges" className="hover:text-gold-dark transition-colors">Mélanges</Link>
            <Link href="/promotions" className="hover:text-gold-dark transition-colors">Promotions</Link>
            <Link href="/temoignages" className="hover:text-gold-dark transition-colors">Témoignages</Link>
            <Link href="/blog" className="hover:text-gold-dark transition-colors">Le Blog</Link>
          </nav>

          {/* Icons / Actions */}
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-dark-deep hover:text-gold-dark transition-colors" title="Mon Compte">
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-2 text-dark-deep hover:text-gold-dark transition-colors"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-dark text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-dark-deep hover:text-gold-dark transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-30 md:hidden border-b border-gold-champagne/10 bg-bg-cream/95 py-6 px-4 backdrop-blur-lg shadow-lg"
          >
            <div className="flex flex-col gap-4 text-center font-serif text-lg tracking-wide">
              <Link onClick={() => setIsMenuOpen(false)} href="/" className="py-2 border-b border-gold-champagne/5">Accueil</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/products" className="py-2 border-b border-gold-champagne/5">Nos Miels</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/melanges" className="py-2 border-b border-gold-champagne/5">Mélanges Thérapeutiques</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/promotions" className="py-2 border-b border-gold-champagne/5">Offres & Promos</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/temoignages" className="py-2 border-b border-gold-champagne/5">Témoignages</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/blog" className="py-2 border-b border-gold-champagne/5">Le Blog</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-bg-cream border-l border-gold-champagne/20 shadow-2xl"
            >
              {/* Header */}
              <div className="flex h-20 items-center justify-between border-b border-gold-champagne/10 px-6">
                <span className="font-serif text-xl tracking-wide font-medium flex items-center gap-2 text-dark-deep">
                  <ShoppingBag className="h-5 w-5 text-gold-dark" />
                  Votre Panier ({cartCount})
                </span>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 text-dark-deep hover:bg-gold-champagne/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart contents */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingBag className="h-16 w-16 text-gold-champagne/40 mb-4 stroke-[1]" />
                    <p className="font-serif text-lg text-dark-soft mb-2">Votre panier est vide</p>
                    <p className="text-xs text-olive-light mb-6">Découvrez nos miels rares et laissez-vous tenter.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                      }}
                      className="border border-gold-dark hover:bg-gold-dark hover:text-white px-6 py-2 text-xs font-medium tracking-widest uppercase transition-colors"
                    >
                      <Link href="/products">Parcourir les miels</Link>
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gold-champagne/10 pb-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-white border border-gold-champagne/10">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-sm font-serif font-medium text-dark-deep">
                            <h4>{item.name}</h4>
                            <p className="ml-4 font-sans font-semibold">{item.price} €</p>
                          </div>
                          <p className="mt-1 text-xs text-olive-light">{item.weight}</p>
                          
                          {/* If bundle / Offre Découverte */}
                          {item.isBundle && item.subItems && (
                            <ul className="mt-2 pl-3 border-l-2 border-gold-champagne/30 text-[10px] text-dark-soft/75 space-y-0.5">
                              {item.subItems.map((sub, idx) => (
                                <li key={idx}>• {sub.name} ({sub.weight})</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity control */}
                          <div className="flex items-center border border-gold-champagne/20 bg-white text-xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gold-champagne/10"
                            >
                              -
                            </button>
                            <span className="px-3 font-semibold text-dark-deep">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gold-champagne/10"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-800 hover:text-red-600 transition-colors"
                            title="Retirer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gold-champagne/25 bg-bg-ivory p-6">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-dark-soft mb-1">
                      Code promo
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-gold-champagne" />
                        <input
                          type="text"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          placeholder="MAROC2026"
                          className="w-full bg-white border border-gold-champagne/30 rounded-none py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-gold-dark"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-gold-dark hover:bg-gold-dark/90 text-white px-4 py-2 text-xs font-medium tracking-widest uppercase transition-colors"
                      >
                        Appliquer
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-700 mt-1">{promoError}</p>}
                    {promoSuccess && <p className="text-[10px] text-emerald-800 mt-1">{promoSuccess}</p>}
                  </form>

                  {/* Promo applied badge */}
                  {appliedPromo && (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-250 p-2 text-xs text-emerald-900 mb-4">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Percent className="h-3.5 w-3.5" />
                        {appliedPromo.code} (-{appliedPromo.discountPercent}%)
                      </span>
                      <button
                        onClick={removePromo}
                        className="text-red-700 hover:text-red-500 font-bold"
                      >
                        Retirer
                      </button>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="space-y-1.5 text-xs text-dark-soft font-medium">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="text-dark-deep font-semibold">{subtotal} €</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span>Réduction ({appliedPromo?.code})</span>
                        <span>-{discountAmount} €</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-800 font-semibold">Gratuit</span>
                      ) : (
                        <span className="text-dark-deep font-semibold">{shippingFee} €</span>
                      )}
                    </div>
                    <div className="flex justify-between border-t border-gold-champagne/10 pt-2.5 text-sm font-serif font-bold text-dark-deep">
                      <span>Total</span>
                      <span>{total} €</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="flex w-full items-center justify-center bg-dark-deep hover:bg-gold-dark text-white px-6 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
                    >
                      Passer la commande
                    </Link>
                    <p className="mt-2 text-center text-[10px] text-olive-light">
                      Livraison offerte en Europe dès 75 € d'achat.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
