export interface ParsedWhatsAppOrder {
  rawText: string;
  coffretsCount: number;
  potsPerCoffret: number;
  basePrice: number;
  extraCharge: number;
  totalAmount: number;
  pots: string[]; // Liste brute des pots détectés
  customer: {
    name: string;
    whatsapp: string;
    email: string;
  };
  delivery: {
    recipient: string;
    address: string;
    postalCode: string;
    city: string;
    highwayStep: string;
    usefulNotes: string;
    absenceWindow: string;
    isDeferred: boolean;
  };
  payment: {
    suggestedMethod: string;
    unpaidNotice: boolean;
    notes: string;
  };
}

export function parseWhatsAppOrder(text: string): ParsedWhatsAppOrder {
  const result: ParsedWhatsAppOrder = {
    rawText: text,
    coffretsCount: 1,
    potsPerCoffret: 5,
    basePrice: 55,
    extraCharge: 0,
    totalAmount: 55,
    pots: [],
    customer: {
      name: "",
      whatsapp: "",
      email: "",
    },
    delivery: {
      recipient: "La personne qui commande",
      address: "",
      postalCode: "",
      city: "",
      highwayStep: "",
      usefulNotes: "",
      absenceWindow: "",
      isDeferred: false,
    },
    payment: {
      suggestedMethod: "PREORDER_UNPAID",
      unpaidNotice: true,
      notes: "",
    },
  };

  if (!text || typeof text !== "string") return result;

  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  // 1. Détection du nombre de coffrets et prix
  // ex: 1 coffret de 5 pots × 55 € = 55 €
  const coffretRegex = /(\d+)\s*coffret(?:s)?\s*(?:de\s*(\d+)\s*pots)?/i;
  const coffretMatch = text.match(coffretRegex);
  if (coffretMatch) {
    result.coffretsCount = parseInt(coffretMatch[1], 10) || 1;
    if (coffretMatch[2]) {
      result.potsPerCoffret = parseInt(coffretMatch[2], 10) || 5;
    }
  }

  // Montant total indicatif
  // ex: TOTAL INDICATIF : 55 € ou 55€
  const totalRegex = /TOTAL\s*(?:INDICATIF)?\s*[:=]\s*(\d+(?:[.,]\d+)?)\s*€?/i;
  const totalMatch = text.match(totalRegex);
  if (totalMatch) {
    result.totalAmount = parseFloat(totalMatch[1].replace(",", "."));
  }

  // 2. Détection de la composition des pots (lignes numérotées)
  // ex: 1. Romarin (450 g)
  const potLines = lines.filter((l) => /^\d+[\.\)]\s*(.+)/.test(l));
  if (potLines.length > 0) {
    result.pots = potLines.map((l) => {
      const match = l.match(/^\d+[\.\)]\s*(.+)/);
      return match ? match[1].trim() : l.trim();
    });
  }

  // 3. Tarification / Suppléments (+5 € : thym ou thym rose)
  const extraRegex = /\+(\d+(?:[.,]\d+)?)\s*€?\s*[:\-]?\s*(.+)/i;
  const extraMatch = text.match(extraRegex);
  if (extraMatch) {
    result.extraCharge = parseFloat(extraMatch[1].replace(",", "."));
  }

  // 4. Personne qui commande
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^Nom\s*[:\-]\s*(.+)/i.test(l)) {
      result.customer.name = l.match(/^Nom\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^(?:WhatsApp|Téléphone|Tel|Mobile)\s*[:\-]\s*(.+)/i.test(l)) {
      result.customer.whatsapp = l.match(/^(?:WhatsApp|Téléphone|Tel|Mobile)\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^(?:E-mail|Email|Mail)\s*[:\-]\s*(.+)/i.test(l)) {
      result.customer.email = l.match(/^(?:E-mail|Email|Mail)\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^Destinataire\s*[:\-]\s*(.+)/i.test(l)) {
      result.delivery.recipient = l.match(/^Destinataire\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^Adresse\s*(?:de\s*livraison)?\s*[:\-]\s*(.+)/i.test(l)) {
      result.delivery.address = l.match(/^Adresse\s*(?:de\s*livraison)?\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^Code\s*postal\s*\/?\s*ville(?:\s*de\s*livraison)?\s*[:\-]\s*(.+)/i.test(l)) {
      const cpVille = l.match(/^Code\s*postal\s*\/?\s*ville(?:\s*de\s*livraison)?\s*[:\-]\s*(.+)/i)![1].trim();
      const cpMatch = cpVille.match(/^(\d{4,5})\s+(.+)/);
      if (cpMatch) {
        result.delivery.postalCode = cpMatch[1];
        result.delivery.city = cpMatch[2];
      } else {
        result.delivery.city = cpVille;
      }
    }
    if (/^Étape\s*(?:A63\/A10)?\s*(?:la\s*plus\s*proche)?\s*[:\-]\s*(.+)/i.test(l)) {
      result.delivery.highwayStep = l.match(/^Étape\s*(?:A63\/A10)?\s*(?:la\s*plus\s*proche)?\s*[:\-]\s*(.+)/i)![1].trim();
    }
    if (/^Informations\s*utiles\s*[:\-]\s*(.+)/i.test(l)) {
      const info = l.match(/^Informations\s*utiles\s*[:\-]\s*(.+)/i)![1].trim();
      result.delivery.usefulNotes = info;
      if (/différ/i.test(info) || /absent/i.test(info)) {
        result.delivery.isDeferred = true;
      }
      const absentMatch = info.match(/absent\s+du\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\s+au\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i);
      if (absentMatch) {
        result.delivery.absenceWindow = `Absent du ${absentMatch[1]} au ${absentMatch[2]}`;
      }
    }
  }

  // Règlements
  if (/Stripe/i.test(text)) {
    result.payment.suggestedMethod = "STRIPE_PAYMENT_LINK";
  } else if (/Espèces/i.test(text)) {
    result.payment.suggestedMethod = "ESPECES";
  } else if (/Virement/i.test(text)) {
    result.payment.suggestedMethod = "VIREMENT";
  }

  return result;
}
