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
