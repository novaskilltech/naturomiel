export interface OffreProduct {
  id: string;
  name: string;
  weight: string;
  cartonsStock: number; // Nombre de cartons de 12 pots
  potsStock: number;    // Stock unitaire calculé (cartonsStock * 12)
  extra?: number;
  isSpecial?: boolean;
  category: "MIEL" | "PRODUIT_RUCHE";
}

// Votre inventaire réel en cartons de 12 pots :
// 2 thym (24 pots), 2 thym rose (24 pots), 1 chene vert (12 pots), 1 tilleul (12 pots),
// 1 pollen (12 pots), 1 miel gelee royale (12 pots), 1 garrigue (12 pots),
// 1 lavande de culture (12 pots), 1 citronnier (12 pots), 1 coriandre (12 pots), 1 romarin (12 pots).
// (Lavande papillon retirée)
export const OFFRE_PRODUCTS: OffreProduct[] = [
  { id: "romarin", name: "Miel de Romarin", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "thym", name: "Miel de Thym sauvage", weight: "450 g", cartonsStock: 2, potsStock: 24, extra: 5, isSpecial: true, category: "MIEL" },
  { id: "thym-rose", name: "Miel de Thym rose", weight: "450 g", cartonsStock: 2, potsStock: 24, extra: 5, isSpecial: true, category: "MIEL" },
  { id: "citronnier", name: "Miel de Citronnier", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "lavande", name: "Miel de Lavande cultivée", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "chene", name: "Miellat de Chêne vert", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "tilleul", name: "Miel de Tilleul", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "garrigue", name: "Miel de Garrigue", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "coriandre", name: "Miel de Coriandre", weight: "450 g", cartonsStock: 1, potsStock: 12, category: "MIEL" },
  { id: "royal", name: "Miel à la Gelée Royale", weight: "450 g", cartonsStock: 1, potsStock: 12, extra: 10, isSpecial: true, category: "MIEL" },
  { id: "pollen", name: "Pollen de montagne", weight: "230 g", cartonsStock: 1, potsStock: 12, category: "PRODUIT_RUCHE" },
];

export interface RealTimeProductStock extends OffreProduct {
  consumedPots: number;
  remainingPots: number;
  remainingCartons: number;
  remainingLoosePots: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface StockSummary {
  totalInitialPots: number;
  totalInitialCartons: number;
  totalConsumedPots: number;
  totalRemainingPots: number;
  totalRemainingCartons: number;
  totalRemainingLoosePots: number;
  productsStock: RealTimeProductStock[];
  lowStockCount: number;
  outOfStockCount: number;
}

/**
 * Normalise et associe le libellé d'un pot saisi à un id produit OFFRE_PRODUCTS.
 */
export function resolveProductIdFromPotName(potName: string): string | null {
  if (!potName || typeof potName !== "string") return null;
  const clean = potName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (clean.includes("thym rose") || clean.includes("rose")) return "thym-rose";
  if (clean.includes("thym")) return "thym";
  if (clean.includes("romarin")) return "romarin";
  if (clean.includes("citron")) return "citronnier";
  if (clean.includes("lavande")) return "lavande";
  if (clean.includes("chene") || clean.includes("miellat")) return "chene";
  if (clean.includes("tilleul")) return "tilleul";
  if (clean.includes("garrigue")) return "garrigue";
  if (clean.includes("coriandre")) return "coriandre";
  if (clean.includes("gelee") || clean.includes("royal") || clean.includes("reine")) return "royal";
  if (clean.includes("pollen")) return "pollen";

  return null;
}

/**
 * Calcule l'état dynamique des stocks en temps réel en déduisant les pots commandés.
 */
export function computeRealTimeStock(orders: any[]): StockSummary {
  const consumedMap: Record<string, number> = {};
  OFFRE_PRODUCTS.forEach((p) => {
    consumedMap[p.id] = 0;
  });

  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      // Ignorer les commandes annulées si le statut l'indique
      const status = (order.status || "").toUpperCase();
      if (status === "CANCELLED" || status === "ANNULEE" || status === "REFUNDED") {
        return;
      }

      let pots: string[] = [];
      let multiplier = 1;

      if (order.pots && Array.isArray(order.pots)) {
        pots = order.pots;
      }

      if (order.compositionDetails) {
        try {
          const details = typeof order.compositionDetails === "string" 
            ? JSON.parse(order.compositionDetails) 
            : order.compositionDetails;
          if (Array.isArray(details.pots) && details.pots.length > 0) {
            pots = details.pots;
          }
          if (details.coffrets && typeof details.coffrets === "number" && details.coffrets > 1) {
            multiplier = details.coffrets;
          }
        } catch {
          // Fallback
        }
      }

      // Si le champ order.coffretsCount ou order.order_count existe
      if (order.coffretsCount && typeof order.coffretsCount === "number" && order.coffretsCount > 1) {
        multiplier = Math.max(multiplier, order.coffretsCount);
      }

      pots.forEach((potStr) => {
        const prodId = resolveProductIdFromPotName(potStr);
        if (prodId && consumedMap[prodId] !== undefined) {
          consumedMap[prodId] += multiplier;
        }
      });
    });
  }

  let totalInitialPots = 0;
  let totalConsumedPots = 0;
  let totalRemainingPots = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;

  const productsStock: RealTimeProductStock[] = OFFRE_PRODUCTS.map((prod) => {
    const consumed = consumedMap[prod.id] || 0;
    const remaining = Math.max(0, prod.potsStock - consumed);
    const remainingCartons = Math.floor(remaining / 12);
    const remainingLoosePots = remaining % 12;

    let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
    if (remaining === 0) {
      status = "OUT_OF_STOCK";
      outOfStockCount++;
    } else if (remaining <= 3) {
      status = "LOW_STOCK";
      lowStockCount++;
    }

    totalInitialPots += prod.potsStock;
    totalConsumedPots += consumed;
    totalRemainingPots += remaining;

    return {
      ...prod,
      consumedPots: consumed,
      remainingPots: remaining,
      remainingCartons,
      remainingLoosePots,
      status,
    };
  });

  return {
    totalInitialPots,
    totalInitialCartons: Math.floor(totalInitialPots / 12),
    totalConsumedPots,
    totalRemainingPots,
    totalRemainingCartons: Math.floor(totalRemainingPots / 12),
    totalRemainingLoosePots: totalRemainingPots % 12,
    productsStock,
    lowStockCount,
    outOfStockCount,
  };
}

export const TOURNEE_AXE_STEPS = [
  "Espagne (Départ)",
  "Saint-Jean-de-Luz",
  "Biarritz",
  "Bayonne",
  "Bordeaux (A63)",
  "Saintes",
  "Niort",
  "Poitiers",
  "Châtellerault",
  "Tours",
  "Blois",
  "Orléans",
  "Île-de-France (A10)",
];
