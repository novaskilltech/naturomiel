"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // unique cart item id (can be variantId or a combination for bundle)
  productId: string;
  variantId: string;
  name: string;
  weight: string;
  price: number;
  imageUrl: string;
  quantity: number;
  isBundle?: boolean;
  subItems?: { name: string; weight: string; imageUrl: string }[];
}

export interface PromoInfo {
  code: string;
  discountPercent: number;
  minAmount: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: PromoInfo | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoInfo | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("naturo_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    const savedPromo = localStorage.getItem("naturo_promo");
    if (savedPromo) {
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (e) {
        console.error("Failed to parse promo", e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("naturo_cart", JSON.stringify(newCart));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">, qty = 1) => {
    const existing = cart.find((item) => item.id === newItem.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...newItem, quantity: qty }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    saveCart([]);
    removePromo();
  };

  const applyPromo = (code: string) => {
    const uppercaseCode = code.toUpperCase();
    if (uppercaseCode === "MAROC2026") {
      const promo = { code: "MAROC2026", discountPercent: 10, minAmount: 100 };
      setAppliedPromo(promo);
      localStorage.setItem("naturo_promo", JSON.stringify(promo));
      return { success: true, message: "Code MAROC2026 appliqué ! 10% de réduction." };
    }
    return { success: false, message: "Code promotionnel invalide." };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    localStorage.removeItem("naturo_promo");
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Rule: MAROC2026 requires minimum 100 EUR
  const isPromoValid = appliedPromo && subtotal >= appliedPromo.minAmount;
  const discountAmount = isPromoValid
    ? Number(((subtotal * appliedPromo.discountPercent) / 100).toFixed(2))
    : 0;

  // Shipping calculation
  // Free delivery above 80 EUR, otherwise flat rate of 6 EUR (MA) or 12 EUR (Europe)
  // Let's assume standard Europe rate 9.90 EUR, free above 75 EUR.
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 75 ? 0 : 9.9;
  const total = Number((subtotal - discountAmount + shippingFee).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo: isPromoValid ? appliedPromo : null,
        applyPromo,
        removePromo,
        cartCount,
        subtotal,
        discountAmount,
        shippingFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
