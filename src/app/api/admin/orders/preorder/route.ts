import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fetchSupabaseOrders, upsertSupabaseOrder, deleteSupabaseOrder } from "@/lib/supabaseOrders";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "preorders.json");

function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (e) {
    // Dans certains environnements serverless purs (Vercel read-only), l'écriture disque peut être limitée
  }
}

function getStoredOrders(): any[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredOrders(orders: any[]) {
  ensureStorage();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (e) {
    // Repli silencieux
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      totalAmount,
      shippingAddress,
      postalCode,
      city,
      highwayStep,
      absenceWindow,
      deliveryNotes,
      rawWhatsAppText,
      paymentMethod = "PREORDER_UNPAID",
      compositionDetails,
      pots = [],
    } = body;

    if (!phone || !shippingAddress) {
      return NextResponse.json(
        { error: "Le téléphone et l'adresse de livraison sont requis." },
        { status: 400 }
      );
    }

    const orderNumber = `PRE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: "ord_" + Date.now(),
      orderNumber,
      customerName: customerName || "Client WhatsApp",
      phone,
      email: email || null,
      status: "PREORDER_PENDING",
      totalAmount: parseFloat(totalAmount) || 55,
      shippingAddress,
      postalCode: postalCode || "",
      city: city || "",
      highwayStep: highwayStep || "Île-de-France (A10)",
      absenceWindow: absenceWindow || null,
      deliveryNotes: deliveryNotes || "",
      rawWhatsAppText: rawWhatsAppText || "",
      paymentMethod,
      compositionDetails: typeof compositionDetails === "string" ? compositionDetails : JSON.stringify(pots),
      pots,
      createdAt: new Date().toISOString(),
    };

    // 1. Sauvegarde Supabase
    await upsertSupabaseOrder(newOrder);

    // 2. Sauvegarde locale (fallback)
    const existing = getStoredOrders();
    existing.unshift(newOrder);
    saveStoredOrders(existing);

    return NextResponse.json({
      success: true,
      message: "Précommande enregistrée avec succès !",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Erreur API preorder:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de la précommande.", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 1. Récupération prioritaire depuis Supabase
    const supaOrders = await fetchSupabaseOrders();
    if (supaOrders && supaOrders.length > 0) {
      // Mettre à jour le cache local
      saveStoredOrders(supaOrders);
      return NextResponse.json(supaOrders);
    }

    // 2. Repli local si Supabase est encore vide ou indisponible
    const localOrders = getStoredOrders();
    // Synchroniser vers Supabase si Supabase était vide mais des commandes existent localement
    if (localOrders.length > 0) {
      Promise.allSettled(localOrders.map((o) => upsertSupabaseOrder(o))).catch(() => {});
    }

    return NextResponse.json(localOrders);
  } catch (error: any) {
    const orders = getStoredOrders();
    return NextResponse.json(orders);
  }
}

// Mise à jour d'une commande (modification du statut, client, adresse, montant...)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json({ error: "L'identifiant de la commande est requis." }, { status: 400 });
    }

    const orders = getStoredOrders();
    const index = orders.findIndex((o) => o.id === id || o.orderNumber === id);

    let updatedOrder = null;
    if (index !== -1) {
      orders[index] = {
        ...orders[index],
        ...updatedFields,
        updatedAt: new Date().toISOString(),
      };
      updatedOrder = orders[index];
      saveStoredOrders(orders);
    } else {
      updatedOrder = { id, ...updatedFields };
    }

    // Mettre à jour Supabase
    await upsertSupabaseOrder(updatedOrder);

    return NextResponse.json({
      success: true,
      message: "Commande modifiée avec succès !",
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erreur lors de la modification.", details: error.message },
      { status: 500 }
    );
  }
}

// Suppression d'une commande
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "L'identifiant de la commande est requis." }, { status: 400 });
    }

    // 1. Supprimer de Supabase
    await deleteSupabaseOrder(id);

    // 2. Supprimer du stockage local
    const orders = getStoredOrders();
    const filtered = orders.filter((o) => o.id !== id && o.orderNumber !== id);
    saveStoredOrders(filtered);

    return NextResponse.json({
      success: true,
      message: "Commande supprimée avec succès !",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression.", details: error.message },
      { status: 500 }
    );
  }
}
