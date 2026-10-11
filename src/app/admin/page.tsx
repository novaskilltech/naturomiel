"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS as initialProducts, Product } from "@/lib/mockData";
import { BLOG_POSTS as initialBlogPosts, BlogPost } from "@/lib/blogData";
import { Package, ShoppingCart, Tag, BookOpen, Settings, Check, Save, Plus, Trash2, MessageSquarePlus, Box, Truck, Edit3, X, RefreshCw, Printer, FileText, LogOut, AlertTriangle, AlertCircle } from "lucide-react";
import WhatsAppOrderModal from "@/components/WhatsAppOrderModal";
import { OFFRE_PRODUCTS, TOURNEE_AXE_STEPS, computeRealTimeStock } from "@/lib/offreCatalog";
import { printIndividualOrder, printGlobalPreparationSheet } from "@/lib/printOrders";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "coffrets" | "orders" | "promos" | "blog" | "settings">("orders");
  
  // Manage entities in state/localstorage
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [promoCodes, setPromoCodes] = useState<{ code: string; discount: number; minAmount: number }[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    whatsapp: "+212 716 01 41 48",
    email: "naturomiel@gmail.com",
    freeShippingThreshold: "75",
    standardShippingFee: "9.9",
  });

  // Verify Admin Session
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/admin/login");
        } else {
          setIsAuthChecking(false);
        }
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  // Load from database mock or localstorage on mount
  useEffect(() => {
    // Load products
    const savedProducts = localStorage.getItem("admin_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }

    // Load blogs
    const savedBlogs = localStorage.getItem("admin_blogs");
    if (savedBlogs) {
      setBlogPosts(JSON.parse(savedBlogs));
    } else {
      setBlogPosts(initialBlogPosts);
    }

    // Load Promos
    const savedPromos = localStorage.getItem("admin_promos");
    if (savedPromos) {
      setPromoCodes(JSON.parse(savedPromos));
    } else {
      setPromoCodes([
        { code: "MAROC2026", discount: 10, minAmount: 100 }
      ]);
    }

    // Load orders strictly from API / Supabase
    fetch("/api/admin/orders/preorder")
      .then((res) => (res.ok ? res.json() : []))
      .then((dbOrders) => {
        if (Array.isArray(dbOrders)) {
          setOrders(dbOrders);
        } else {
          setOrders([]);
        }
      })
      .catch(() => setOrders([]));
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette commande ?")) return;

    try {
      const res = await fetch(`/api/admin/orders/preorder?id=${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
      } else {
        // Fallback local
        setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
      }
    } catch {
      setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    try {
      const res = await fetch("/api/admin/orders/preorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingOrder),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === editingOrder.id || o.orderNumber === editingOrder.orderNumber ? data.order : o))
        );
      } else {
        // Fallback local
        setOrders((prev) =>
          prev.map((o) => (o.id === editingOrder.id || o.orderNumber === editingOrder.orderNumber ? editingOrder : o))
        );
      }
    } catch {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id || o.orderNumber === editingOrder.orderNumber ? editingOrder : o))
      );
    }

    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("admin_products", JSON.stringify(newProducts));
  };

  const handleStockChange = (productId: string, variantId: string, value: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map((v) =>
            v.id === variantId ? { ...v, stock: value } : v
          ),
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  const handlePriceChange = (productId: string, variantId: string, value: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map((v) =>
            v.id === variantId ? { ...v, price: value } : v
          ),
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  const handleAddPromo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const code = data.get("code") as string;
    const discount = Number(data.get("discount"));
    const minAmount = Number(data.get("minAmount"));

    if (!code) return;
    const updated = [...promoCodes, { code: code.toUpperCase(), discount, minAmount }];
    setPromoCodes(updated);
    localStorage.setItem("admin_promos", JSON.stringify(updated));
    e.currentTarget.reset();
  };

  const handleDeletePromo = (code: string) => {
    const updated = promoCodes.filter((p) => p.code !== code);
    setPromoCodes(updated);
    localStorage.setItem("admin_promos", JSON.stringify(updated));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    alert("Configurations enregistrées avec succès !");
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#223b30] animate-spin" />
        <p className="text-sm font-semibold text-[#223b30]">Vérification de session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-cream">
      {/* Admin header */}
      <header className="bg-dark-deep text-white py-6 px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-widest font-bold">
          NATURO<span className="text-gold-champagne">MIEL</span> <span className="text-xs uppercase bg-gold-dark text-dark-deep px-2 py-0.5 ml-2 font-sans font-bold">Back-office</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-gold-champagne border border-gold-champagne/30 px-3 py-1 hover:bg-gold-champagne/15 transition-colors">
            Aller sur le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-300 hover:text-white bg-red-900/40 hover:bg-red-800/80 border border-red-500/30 px-3 py-1 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-8 gap-8">
        {/* Navigation tabs sidebar */}
        <aside className="w-full md:w-64 bg-white border border-gold-champagne/15 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider w-full text-left transition-colors ${
              activeTab === "products" ? "bg-dark-deep text-white" : "text-dark-soft hover:bg-bg-cream"
            }`}
          >
            <Package className="h-4 w-4" /> Produits & Stocks
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider w-full text-left transition-colors ${
              activeTab === "orders" ? "bg-dark-deep text-white" : "text-dark-soft hover:bg-bg-cream"
            }`}
          >
            <ShoppingCart className="h-4 w-4" /> Commandes
          </button>
          <button
            onClick={() => setActiveTab("coffrets")}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider w-full text-left transition-colors ${
              activeTab === "coffrets" ? "bg-dark-deep text-white" : "text-dark-soft hover:bg-bg-cream"
            }`}
          >
            <Box className="h-4 w-4 text-emerald-400" /> Coffret 5 Pots & Tournée
          </button>
          <button
            onClick={() => setActiveTab("promos")}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider w-full text-left transition-colors ${
              activeTab === "promos" ? "bg-dark-deep text-white" : "text-dark-soft hover:bg-bg-cream"
            }`}
          >
            <Tag className="h-4 w-4" /> Codes Promo
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider w-full text-left transition-colors ${
              activeTab === "settings" ? "bg-dark-deep text-white" : "text-dark-soft hover:bg-bg-cream"
            }`}
          >
            <Settings className="h-4 w-4" /> Paramètres
          </button>
        </aside>

        {/* Tab contents panel */}
        <main className="flex-1 bg-white border border-gold-champagne/15 p-6 sm:p-8">
          
          {/* Products Panel */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-dark-deep">Gestion des Produits & Stocks</h2>
                <p className="text-xs text-olive-light">Mettez à jour les prix et l'état des stocks directement.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold-champagne/20 text-olive-dark font-bold">
                      <th className="py-3 px-2">Image</th>
                      <th className="py-3 px-2">Désignation</th>
                      <th className="py-3 px-2">Catégorie</th>
                      <th className="py-3 px-2">Format</th>
                      <th className="py-3 px-2 w-24">Prix (€)</th>
                      <th className="py-3 px-2 w-24">Stock (U)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) =>
                      product.variants.map((v, index) => (
                        <tr key={`${product.id}-${v.id}`} className="border-b border-gold-champagne/5 hover:bg-bg-cream/20">
                          <td className="py-3 px-2">
                            {index === 0 && (
                              <img src={product.imageUrl} alt={product.name} className="h-10 w-10 object-cover" />
                            )}
                          </td>
                          <td className="py-3 px-2 font-serif font-medium text-dark-deep">
                            {index === 0 ? product.name : ""}
                          </td>
                          <td className="py-3 px-2 text-olive-light">
                            {index === 0 ? product.category : ""}
                          </td>
                          <td className="py-3 px-2 font-semibold text-dark-soft">{v.weight}</td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={v.price}
                              onChange={(e) => handlePriceChange(product.id, v.id, Number(e.target.value))}
                              className="w-16 border border-gold-champagne/30 p-1 font-bold text-center"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={v.stock}
                              onChange={(e) => handleStockChange(product.id, v.id, Number(e.target.value))}
                              className="w-16 border border-gold-champagne/30 p-1 text-center"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Panel */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-dark-deep">Suivi des Commandes & Précommandes</h2>
                  <p className="text-xs text-olive-light">Consultez l'historique, importez les messages WhatsApp et gérez la tournée.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Menu Impression Globale */}
                  <div className="flex items-center bg-white border border-gray-300 rounded-xs shadow-2xs">
                    <button
                      onClick={() => printGlobalPreparationSheet(orders, "city")}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-dark-deep hover:bg-bg-cream flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Imprimer le manifeste global de préparation"
                    >
                      <FileText className="w-4 h-4 text-amber-700" />
                      Fiche Préparation Globale
                    </button>
                    <select
                      onChange={(e) => printGlobalPreparationSheet(orders, e.target.value as any)}
                      defaultValue=""
                      className="text-[11px] border-l border-gray-300 bg-gray-50 py-2 px-2 text-gray-700 focus:outline-hidden cursor-pointer"
                      title="Changer le tri de la fiche globale"
                    >
                      <option value="" disabled>Trier par...</option>
                      <option value="city">Par Ville</option>
                      <option value="name">Par Nom Client</option>
                      <option value="phone">Par Téléphone</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-emerald-300" />
                    + Importer WhatsApp
                  </button>
                </div>
              </div>

              {/* Quick Real Time Stock Banner on Coffret Orders */}
              {(() => {
                const stockSummary = computeRealTimeStock(orders);
                return (
                  <div className="bg-white border border-gold-champagne/20 p-4 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold uppercase tracking-wider text-dark-deep">
                          État du Stock Réel — Offre Coffret 5 Pots (13 cartons au départ)
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {stockSummary.totalConsumedPots} pots commandés
                        </span>
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {stockSummary.totalRemainingPots} / {stockSummary.totalInitialPots} pots restants
                        </span>
                      </div>
                    </div>

                    {/* Mini pills of remaining stock per honey */}
                    <div className="flex flex-wrap gap-1.5">
                      {stockSummary.productsStock.map((prod) => (
                        <div
                          key={prod.id}
                          className={`text-[11px] px-2.5 py-1 border flex items-center gap-1.5 rounded-xs ${
                            prod.status === "OUT_OF_STOCK"
                              ? "bg-red-50 text-red-900 border-red-300 font-bold"
                              : prod.status === "LOW_STOCK"
                              ? "bg-amber-50 text-amber-900 border-amber-300 font-bold"
                              : "bg-gray-50 text-dark-deep border-gray-200"
                          }`}
                        >
                          <span className="font-medium">{prod.name.replace("Miel de ", "").replace("Miel à la ", "").replace("Miellat de ", "")}:</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-xs font-bold ${
                              prod.status === "OUT_OF_STOCK"
                                ? "bg-red-600 text-white"
                                : prod.status === "LOW_STOCK"
                                ? "bg-amber-500 text-white"
                                : "bg-emerald-100 text-emerald-900"
                            }`}
                          >
                            {prod.remainingPots}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold-champagne/20 text-olive-dark font-bold">
                      <th className="py-3 px-2">Référence</th>
                      <th className="py-3 px-2">Client / Contact</th>
                      <th className="py-3 px-2">Destination / Étape</th>
                      <th className="py-3 px-2">Montant</th>
                      <th className="py-3 px-2">Statut</th>
                      <th className="py-3 px-2">Date / Absence</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gold-champagne/5 hover:bg-bg-cream/20">
                        <td className="py-3 px-2 font-mono font-bold text-dark-deep">
                          {order.orderNumber || order.id}
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-medium text-dark-deep">{order.customerName || order.name}</div>
                          {order.phone && <div className="text-[10px] text-gray-500 font-mono">{order.phone}</div>}
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-medium">{order.city || order.shippingAddress?.slice(0, 25) || "-"}</div>
                          {order.highwayStep && (
                            <div className="text-[10px] text-emerald-700 font-semibold">{order.highwayStep}</div>
                          )}
                        </td>
                        <td className="py-3 px-2 font-semibold text-dark-soft">
                          {order.totalAmount || order.total} €
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 font-semibold text-[10px] ${
                            order.status === "PAID" 
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-350" 
                              : order.status === "DELIVERED"
                              ? "bg-blue-50 text-blue-800"
                              : order.status === "PREORDER_PENDING"
                              ? "bg-purple-50 text-purple-800 border border-purple-200"
                              : "bg-amber-50 text-amber-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-olive-light">
                          <div>{order.date || new Date(order.createdAt || Date.now()).toLocaleDateString("fr-FR")}</div>
                          {order.absenceWindow && (
                            <div className="text-[10px] text-amber-700 font-semibold">{order.absenceWindow}</div>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Bouton Impression Bon Individuel */}
                            <button
                              onClick={() => printIndividualOrder(order)}
                              title="Imprimer le bon de commande individuel (PDF)"
                              className="p-1 text-amber-800 hover:text-amber-950 hover:bg-amber-50 rounded-xs transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {order.status !== "DELIVERED" && (
                              <button
                                onClick={() => {
                                  const updated = orders.map((o) =>
                                    o.id === order.id || o.orderNumber === order.orderNumber ? { ...o, status: "DELIVERED" } : o
                                  );
                                  setOrders(updated);
                                }}
                                title="Marquer comme livré"
                                className="bg-dark-deep hover:bg-gold-dark text-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Livrer
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setEditingOrder({ ...order });
                                setIsEditModalOpen(true);
                              }}
                              title="Modifier la commande"
                              className="p-1 text-gray-600 hover:text-emerald-700 hover:bg-gray-100 rounded-xs transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id || order.orderNumber)}
                              title="Supprimer la commande"
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Coffrets 5 Pots & Tournée Panel */}
          {activeTab === "coffrets" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-950 text-white p-6 border border-gold-champagne/30">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold">Catalogue Dédié</span>
                  <h2 className="font-serif text-2xl text-white">Offre Coffret 5 Pots & Tournée A63/A10</h2>
                  <p className="text-xs text-gray-300 mt-1">
                    Les 13 références officielles de la landing page avec décompte des stocks et gestion de l'axe logistique.
                  </p>
                </div>
                <button
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  + Importer commande WhatsApp
                </button>
              </div>

              {/* Tournée Itinerary Reminder */}
              <div className="p-4 bg-bg-cream/40 border border-gold-champagne/20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark-deep flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-gold-dark" /> Axe Logistique Tournée A63 / A10
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {TOURNEE_AXE_STEPS.map((step, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white border border-gray-200 px-2.5 py-1 text-dark-soft font-medium flex items-center gap-1"
                    >
                      <span className="text-gold-dark font-bold">{idx + 1}.</span> {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Stocks Computed from Orders */}
              {(() => {
                const stockSummary = computeRealTimeStock(orders);

                return (
                  <div className="space-y-6">
                    {/* Alerte globale si ruptures ou stocks bas */}
                    {(stockSummary.outOfStockCount > 0 || stockSummary.lowStockCount > 0) && (
                      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Attention Ruptures & Stocks Critiques</span>
                        </div>
                        <p className="text-xs">
                          {stockSummary.outOfStockCount > 0 && (
                            <strong className="text-red-700">
                              {stockSummary.outOfStockCount} variété(s) en RUPTURE TOTALE (0 pot restant).{" "}
                            </strong>
                          )}
                          {stockSummary.lowStockCount > 0 && (
                            <span className="text-amber-800">
                              {stockSummary.lowStockCount} variété(s) avec un stock critique (&le; 3 pots).
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* Synthèse globale en cartes */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-white p-4 border border-gold-champagne/20 shadow-2xs">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Stock Initial</span>
                        <div className="text-xl font-serif font-bold text-dark-deep mt-1">
                          {stockSummary.totalInitialPots} pots
                        </div>
                        <span className="text-[11px] text-olive-dark">
                          {stockSummary.totalInitialCartons} cartons pleins
                        </span>
                      </div>

                      <div className="bg-white p-4 border border-gold-champagne/20 shadow-2xs">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Pots Commandés</span>
                        <div className="text-xl font-serif font-bold text-amber-700 mt-1">
                          {stockSummary.totalConsumedPots} pots
                        </div>
                        <span className="text-[11px] text-gray-500">
                          déduits sur {orders.length} commande(s)
                        </span>
                      </div>

                      <div className="bg-white p-4 border border-gold-champagne/20 shadow-2xs">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Stock Réel Restant</span>
                        <div className="text-xl font-serif font-bold text-emerald-800 mt-1">
                          {stockSummary.totalRemainingPots} pots
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          {stockSummary.totalRemainingCartons} carton{stockSummary.totalRemainingCartons > 1 ? "s" : ""}
                          {stockSummary.totalRemainingLoosePots > 0 ? ` + ${stockSummary.totalRemainingLoosePots} pots` : ""}
                        </span>
                      </div>

                      <div className="bg-white p-4 border border-gold-champagne/20 shadow-2xs">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Taux d'Écoulement</span>
                        <div className="text-xl font-serif font-bold text-blue-900 mt-1">
                          {stockSummary.totalInitialPots > 0
                            ? Math.round((stockSummary.totalConsumedPots / stockSummary.totalInitialPots) * 100)
                            : 0} %
                        </div>
                        <span className="text-[11px] text-gray-500">
                          de la tournée réservé
                        </span>
                      </div>
                    </div>

                    {/* Products list & real carton stocks */}
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                        <div>
                          <h3 className="font-serif text-lg text-dark-deep font-semibold">
                            Inventaire Réel Dynamique & Décompte des Stocks
                          </h3>
                          <p className="text-xs text-olive-dark">
                            Chaque commande enregistrée soustrait automatiquement les pots commandés du stock.
                          </p>
                        </div>
                        <span className="text-xs bg-emerald-100 text-emerald-900 px-3 py-1 font-semibold rounded-full">
                          Reste : {stockSummary.totalRemainingPots} / {stockSummary.totalInitialPots} pots
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse bg-white border border-gold-champagne/15">
                          <thead>
                            <tr className="border-b border-gold-champagne/20 bg-bg-cream/30 text-olive-dark font-bold">
                              <th className="py-3 px-3">Réf.</th>
                              <th className="py-3 px-3">Variété</th>
                              <th className="py-3 px-3">Format</th>
                              <th className="py-3 px-3 text-center">Stock Initial</th>
                              <th className="py-3 px-3 text-center">Commandés</th>
                              <th className="py-3 px-3 text-center bg-amber-50/50">Stock Restant Réel</th>
                              <th className="py-3 px-3 text-center">Équiv. Cartons</th>
                              <th className="py-3 px-3 text-center">Disponibilité</th>
                              <th className="py-3 px-3">Tarif / Coffret</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stockSummary.productsStock.map((prod) => (
                              <tr
                                key={prod.id}
                                className={`border-b border-gold-champagne/5 hover:bg-bg-cream/20 ${
                                  prod.status === "OUT_OF_STOCK"
                                    ? "bg-red-50/40"
                                    : prod.status === "LOW_STOCK"
                                    ? "bg-amber-50/30"
                                    : ""
                                }`}
                              >
                                <td className="py-3 px-3 font-mono font-bold text-dark-deep">{prod.id}</td>
                                <td className="py-3 px-3 font-medium text-dark-deep">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{prod.name}</span>
                                    {prod.isSpecial && (
                                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                                        +{prod.extra} €
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-3 font-semibold text-dark-soft">{prod.weight}</td>
                                <td className="py-3 px-3 text-center text-gray-600">
                                  {prod.potsStock} pots ({prod.cartonsStock} ctn)
                                </td>
                                <td className="py-3 px-3 text-center font-bold">
                                  {prod.consumedPots > 0 ? (
                                    <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                                      -{prod.consumedPots} pot{prod.consumedPots > 1 ? "s" : ""}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">0</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-center font-bold bg-amber-50/40">
                                  <span
                                    className={`px-3 py-1 rounded-sm text-xs font-bold inline-block min-w-16 ${
                                      prod.status === "OUT_OF_STOCK"
                                        ? "bg-red-600 text-white shadow-2xs"
                                        : prod.status === "LOW_STOCK"
                                        ? "bg-amber-500 text-white"
                                        : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                    }`}
                                  >
                                    {prod.remainingPots} pot{prod.remainingPots > 1 ? "s" : ""}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-center text-gray-700 font-mono text-[11px]">
                                  {prod.remainingCartons > 0 && (
                                    <span>
                                      {prod.remainingCartons} ctn{prod.remainingCartons > 1 ? "s" : ""}
                                    </span>
                                  )}
                                  {prod.remainingLoosePots > 0 && (
                                    <span className="text-gray-500">
                                      {prod.remainingCartons > 0 ? " + " : ""}
                                      {prod.remainingLoosePots} pot{prod.remainingLoosePots > 1 ? "s" : ""}
                                    </span>
                                  )}
                                  {prod.remainingPots === 0 && (
                                    <span className="text-red-500 font-bold">Épuisé</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  {prod.status === "OUT_OF_STOCK" ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                      <AlertCircle className="w-3 h-3 text-red-600" />
                                      Rupture
                                    </span>
                                  ) : prod.status === "LOW_STOCK" ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                                      Critique
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      En stock
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-3 font-mono text-[11px]">
                                  {prod.id === "royal" ? (
                                    <span className="text-purple-700 font-semibold">+10 € en coffret</span>
                                  ) : prod.extra ? (
                                    <span className="text-amber-700 font-semibold">+5 € par coffret</span>
                                  ) : (
                                    <span className="text-emerald-700 font-semibold">Inclus dans 50 €</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Promos Panel */}
          {activeTab === "promos" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-dark-deep">Gestion des Codes Promotionnels</h2>
                <p className="text-xs text-olive-light">Créez ou supprimez des codes promos applicables au panier.</p>
              </div>

              {/* Add Promo Form */}
              <form onSubmit={handleAddPromo} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 border border-gold-champagne/15 bg-bg-cream/20 text-xs">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Code</label>
                  <input
                    required
                    name="code"
                    placeholder="PROMO2026"
                    className="w-full border border-gold-champagne/30 p-2 focus:outline-none focus:border-gold-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Réduction (%)</label>
                  <input
                    required
                    type="number"
                    name="discount"
                    placeholder="15"
                    className="w-full border border-gold-champagne/30 p-2 focus:outline-none focus:border-gold-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Panier Min. (€)</label>
                  <input
                    required
                    type="number"
                    name="minAmount"
                    placeholder="80"
                    className="w-full border border-gold-champagne/30 p-2 focus:outline-none focus:border-gold-dark"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-dark-deep hover:bg-gold-dark text-white py-2 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Créer le code
                  </button>
                </div>
              </form>

              {/* Promos Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold-champagne/20 text-olive-dark font-bold">
                      <th className="py-3 px-2">Code</th>
                      <th className="py-3 px-2">Remise</th>
                      <th className="py-3 px-2">Minimum Panier</th>
                      <th className="py-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo) => (
                      <tr key={promo.code} className="border-b border-gold-champagne/5">
                        <td className="py-3 px-2 font-mono font-bold text-dark-deep">{promo.code}</td>
                        <td className="py-3 px-2 text-emerald-800 font-semibold">-{promo.discount}%</td>
                        <td className="py-3 px-2 text-olive-light">Dès {promo.minAmount} €</td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleDeletePromo(promo.code)}
                            className="text-red-700 hover:text-red-500 font-bold"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {activeTab === "settings" && (
            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs text-dark-soft">
              <div>
                <h2 className="font-serif text-2xl text-dark-deep">Paramètres Généraux du Site</h2>
                <p className="text-xs text-olive-light">Configurez les variables de contact et logistique sans toucher au code.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">WhatsApp de contact</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Adresse e-mail support</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Seuil Livraison Gratuite (€)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                    className="w-full border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-olive-light">Frais de Port Standards (€)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.standardShippingFee}
                    onChange={(e) => setSettings({ ...settings, standardShippingFee: e.target.value })}
                    className="w-full border border-gold-champagne/30 p-2.5 focus:outline-none focus:border-gold-dark"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gold-champagne/10 text-right">
                <button
                  type="submit"
                  className="bg-dark-deep hover:bg-gold-dark text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors inline-flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" /> Enregistrer les configurations
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

      {/* Modale d'importation WhatsApp & Décompte des stocks */}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onOrderCreated={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
        }}
      />

      {/* Modale de Modification de Commande */}
      {isEditModalOpen && editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-gold-champagne/30 w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gold-champagne/20">
              <div>
                <h3 className="text-lg font-serif font-bold text-dark-deep">
                  Modifier la commande {editingOrder.orderNumber || editingOrder.id}
                </h3>
                <p className="text-xs text-olive-dark">Mettez à jour les coordonnées, la livraison ou le statut.</p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingOrder(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateOrder} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Nom Client</label>
                  <input
                    type="text"
                    value={editingOrder.customerName || editingOrder.name || ""}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, customerName: e.target.value, name: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="text"
                    value={editingOrder.phone || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, phone: e.target.value })}
                    className="w-full border border-gray-300 p-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Adresse de livraison</label>
                  <input
                    type="text"
                    value={editingOrder.shippingAddress || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, shippingAddress: e.target.value })}
                    className="w-full border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Ville / Commune</label>
                  <input
                    type="text"
                    value={editingOrder.city || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, city: e.target.value })}
                    className="w-full border border-gray-300 p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Étape A63 / A10</label>
                  <input
                    type="text"
                    value={editingOrder.highwayStep || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, highwayStep: e.target.value })}
                    className="w-full border border-gray-300 p-2 text-emerald-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Créneau d'absence</label>
                  <input
                    type="text"
                    value={editingOrder.absenceWindow || ""}
                    placeholder="ex: Absent du 14/10 au 23/10"
                    onChange={(e) => setEditingOrder({ ...editingOrder, absenceWindow: e.target.value })}
                    className="w-full border border-gray-300 p-2 text-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Montant Total (€)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingOrder.totalAmount || editingOrder.total || 0}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        totalAmount: parseFloat(e.target.value) || 0,
                        total: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Statut</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    className="w-full border border-gray-300 p-2 font-semibold"
                  >
                    <option value="PREORDER_PENDING">PREORDER_PENDING</option>
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="REFUNDED">REFUNDED</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingOrder(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold uppercase tracking-wider text-[11px] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-dark-deep hover:bg-gold-dark text-white px-5 py-2 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
