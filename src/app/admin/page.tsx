"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS as initialProducts, Product } from "@/lib/mockData";
import { BLOG_POSTS as initialBlogPosts, BlogPost } from "@/lib/blogData";
import { Package, ShoppingCart, Tag, BookOpen, Settings, Check, Save, Plus, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "promos" | "blog" | "settings">("products");
  
  // Manage entities in state/localstorage
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [promoCodes, setPromoCodes] = useState<{ code: string; discount: number; minAmount: number }[]>([]);
  const [orders, setOrders] = useState<{ id: string; name: string; total: number; status: string; date: string }[]>([]);
  const [settings, setSettings] = useState({
    whatsapp: "+212 716 01 41 48",
    email: "naturomiel@gmail.com",
    freeShippingThreshold: "75",
    standardShippingFee: "9.9",
  });

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

    // Load orders
    setOrders([
      { id: "NM-492810", name: "Sarah K.", total: 50.00, status: "PAID", date: "27/06/2026" },
      { id: "NM-394812", name: "Ahmed B.", total: 112.50, status: "PENDING", date: "26/06/2026" },
      { id: "NM-821903", name: "Mireille D.", total: 25.00, status: "DELIVERED", date: "24/06/2026" },
    ]);
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen bg-bg-cream">
      {/* Admin header */}
      <header className="bg-dark-deep text-white py-6 px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-widest font-bold">
          NATURO<span className="text-gold-champagne">MIEL</span> <span className="text-xs uppercase bg-gold-dark text-dark-deep px-2 py-0.5 ml-2 font-sans font-bold">Back-office</span>
        </Link>
        <Link href="/" className="text-xs text-gold-champagne border border-gold-champagne/30 px-3 py-1 hover:bg-gold-champagne/15 transition-colors">
          Aller sur le site
        </Link>
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
              <div>
                <h2 className="font-serif text-2xl text-dark-deep">Suivi des Commandes</h2>
                <p className="text-xs text-olive-light">Consultez l'historique et mettez à jour l'état de livraison.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold-champagne/20 text-olive-dark font-bold">
                      <th className="py-3 px-2">Référence</th>
                      <th className="py-3 px-2">Client</th>
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Montant</th>
                      <th className="py-3 px-2">Statut</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gold-champagne/5 hover:bg-bg-cream/20">
                        <td className="py-3 px-2 font-mono font-bold text-dark-deep">{order.id}</td>
                        <td className="py-3 px-2 font-medium">{order.name}</td>
                        <td className="py-3 px-2 text-olive-light">{order.date}</td>
                        <td className="py-3 px-2 font-semibold text-dark-soft">{order.total} €</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 font-semibold text-[10px] ${
                            order.status === "PAID" 
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-350" 
                              : order.status === "DELIVERED"
                              ? "bg-blue-50 text-blue-800"
                              : "bg-amber-50 text-amber-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => {
                              const updated = orders.map((o) =>
                                o.id === order.id ? { ...o, status: "DELIVERED" } : o
                              );
                              setOrders(updated);
                            }}
                            className="bg-dark-deep hover:bg-gold-dark text-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wider transition-colors"
                          >
                            Livrer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
    </div>
  );
}
