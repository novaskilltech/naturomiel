"use client";

import React, { useState } from "react";
import { parseWhatsAppOrder, ParsedWhatsAppOrder } from "@/lib/whatsappParser";
import { Sparkles, Check, AlertCircle, RefreshCw, X, MapPin, Truck, Calendar, CreditCard, Box } from "lucide-react";

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (order: any) => void;
}

export default function WhatsAppOrderModal({
  isOpen,
  onClose,
  onOrderCreated,
}: WhatsAppOrderModalProps) {
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState<ParsedWhatsAppOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleParse = () => {
    setError(null);
    if (!rawText.trim()) {
      setError("Veuillez coller le texte reçu sur WhatsApp.");
      return;
    }
    const data = parseWhatsAppOrder(rawText);
    setParsed(data);
  };

  const handleSaveToDatabase = async () => {
    if (!parsed) return;
    setLoading(true);
    setError(null);

    try {
      const payload = {
        customerName: parsed.customer.name,
        phone: parsed.customer.whatsapp,
        email: parsed.customer.email,
        totalAmount: parsed.totalAmount,
        shippingAddress: parsed.delivery.address,
        postalCode: parsed.delivery.postalCode,
        city: parsed.delivery.city,
        highwayStep: parsed.delivery.highwayStep,
        absenceWindow: parsed.delivery.absenceWindow,
        deliveryNotes: parsed.delivery.usefulNotes,
        rawWhatsAppText: parsed.rawText,
        paymentMethod: parsed.payment.suggestedMethod,
        pots: parsed.pots,
        compositionDetails: JSON.stringify({
          coffrets: parsed.coffretsCount,
          pots: parsed.pots,
          extraCharge: parsed.extraCharge,
        }),
      };

      const res = await fetch("/api/admin/orders/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || json.details || "Erreur de sauvegarde");
      }

      setSuccess(true);
      setTimeout(() => {
        onOrderCreated(json.order);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-gold-champagne/30 w-full max-w-4xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gold-champagne/20">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-50 text-emerald-800 rounded-full">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold text-dark-deep">
                Coller & Importer une Commande WhatsApp
              </h2>
              <p className="text-xs text-olive-dark">
                Extraction instantanée, décompte des stocks de chaque pot et enregistrement en base Supabase.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-semibold">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Commande enregistrée avec succès en base de données ! Décompte des stocks appliqué.</span>
          </div>
        )}

        {/* Input Text Area */}
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark-soft">
            Message WhatsApp brut du client :
          </label>
          <textarea
            rows={5}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Collez ici le message WhatsApp (ex: 🍯 NATUROMIEL — DEMANDE DE PRÉCOMMANDE...)"
            className="w-full text-xs p-3 font-mono border border-gold-champagne/40 bg-bg-cream/30 focus:outline-hidden focus:ring-1 focus:ring-gold-dark"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={handleParse}
              type="button"
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Analyser le message
            </button>
            {parsed && (
              <span className="text-xs text-emerald-800 font-medium">
                ✓ Message analysé avec succès
              </span>
            )}
          </div>
        </div>

        {/* Preview / Edition form if parsed */}
        {parsed && (
          <div className="mt-6 border-t border-gold-champagne/20 pt-6 space-y-6">
            <h3 className="font-serif text-lg text-dark-deep font-semibold">
              Vérification des Données Extraites
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Client Info */}
              <div className="p-4 bg-bg-cream/40 border border-gold-champagne/20 space-y-3">
                <h4 className="font-bold text-dark-deep uppercase tracking-wider flex items-center gap-2">
                  👤 Client
                </h4>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">Nom complet</label>
                  <input
                    type="text"
                    value={parsed.customer.name}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        customer: { ...parsed.customer, name: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">WhatsApp / Téléphone</label>
                  <input
                    type="text"
                    value={parsed.customer.whatsapp}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        customer: { ...parsed.customer, whatsapp: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">E-mail</label>
                  <input
                    type="text"
                    value={parsed.customer.email}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        customer: { ...parsed.customer, email: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5"
                  />
                </div>
              </div>

              {/* Delivery Info */}
              <div className="p-4 bg-bg-cream/40 border border-gold-champagne/20 space-y-3">
                <h4 className="font-bold text-dark-deep uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-dark" /> Livraison & Tournée
                </h4>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">Adresse</label>
                  <input
                    type="text"
                    value={parsed.delivery.address}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        delivery: { ...parsed.delivery, address: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase">Code Postal</label>
                    <input
                      type="text"
                      value={parsed.delivery.postalCode}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          delivery: { ...parsed.delivery, postalCode: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-gray-300 p-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase">Ville</label>
                    <input
                      type="text"
                      value={parsed.delivery.city}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          delivery: { ...parsed.delivery, city: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-gray-300 p-1.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">Étape A63/A10</label>
                  <input
                    type="text"
                    value={parsed.delivery.highwayStep}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        delivery: { ...parsed.delivery, highwayStep: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5 font-semibold text-emerald-800"
                  />
                </div>
              </div>

              {/* Composition Pots */}
              <div className="p-4 bg-bg-cream/40 border border-gold-champagne/20 space-y-3">
                <h4 className="font-bold text-dark-deep uppercase tracking-wider flex items-center gap-2">
                  <Box className="w-4 h-4 text-gold-dark" /> Coffret & Pots à décompter ({parsed.pots.length})
                </h4>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {parsed.pots.map((pot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white px-2.5 py-1 border border-gray-200 text-[11px]"
                    >
                      <span className="font-medium text-dark-deep">
                        {idx + 1}. {pot}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                        Stock -1
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistique & Montant */}
              <div className="p-4 bg-bg-cream/40 border border-gold-champagne/20 space-y-3">
                <h4 className="font-bold text-dark-deep uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold-dark" /> Détails & Total
                </h4>
                {parsed.delivery.absenceWindow && (
                  <div className="bg-amber-50 text-amber-900 border border-amber-300 p-2 text-[11px] rounded-xs">
                    <strong>Absence signalée :</strong> {parsed.delivery.absenceWindow}
                  </div>
                )}
                <div>
                  <label className="text-[10px] text-gray-500 uppercase">Instructions utiles</label>
                  <input
                    type="text"
                    value={parsed.delivery.usefulNotes}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        delivery: { ...parsed.delivery, usefulNotes: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-1.5"
                  />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xs uppercase font-bold text-dark-soft">
                    Total de la commande :
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={parsed.totalAmount}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          totalAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-20 text-right font-bold text-sm bg-white border border-gray-300 p-1"
                    />
                    <span className="font-bold text-sm">€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gold-champagne/20">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveToDatabase}
                disabled={loading}
                className="bg-dark-deep hover:bg-gold-dark text-white px-6 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enregistrement Supabase...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Valider & Décompter les stocks
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
