const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qvmuuvjufsnubsimuqub.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bXV1dmp1ZnNudWJzaW11cXViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQ0MDM5MywiZXhwIjoyMTA2MDE2MzkzfQ.RcNP35RHgaoJb1zkgT3WsJmdrPVmPLo-BjByHo1R9xs";

export async function fetchSupabaseOrders(): Promise<any[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/naturomiel_orders?select=*&order=created_at.desc`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Supabase fetch failed:", res.status, res.statusText);
      return [];
    }

    const rows = await res.json();
    return rows.map((r: any) => ({
      id: r.id,
      orderNumber: r.id.startsWith("PRE-") ? r.id : `PRE-${r.id.slice(-4)}`,
      customerName: r.client_name,
      phone: r.phone,
      email: null,
      status: r.status || "PREORDER_PENDING",
      totalAmount: parseFloat(r.total_price) || 0,
      shippingAddress: r.address || "",
      city: r.city || "",
      highwayStep: r.step_tournee || "Île-de-France (A10)",
      absenceWindow: null,
      deliveryNotes: r.notes || "",
      rawWhatsAppText: r.raw_message || "",
      paymentMethod: r.is_paid ? "STRIPE_PAID" : "PREORDER_UNPAID",
      compositionDetails: typeof r.quantities === "object" ? JSON.stringify(r.quantities) : r.quantities,
      pots: r.honey_pots || [],
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.error("Supabase client fetch error:", err);
    return [];
  }
}

export async function upsertSupabaseOrder(order: any): Promise<boolean> {
  try {
    const payload = {
      id: order.id,
      client_name: order.customerName || "Client WhatsApp",
      phone: order.phone || "",
      city: order.city || "",
      address: order.shippingAddress || "",
      honey_pots: order.pots || [],
      quantities: typeof order.compositionDetails === "string" ? { raw: order.compositionDetails } : order.compositionDetails || {},
      total_pots: (order.pots || []).length,
      order_count: 1,
      total_price: parseFloat(order.totalAmount) || 0,
      is_paid: order.paymentMethod?.includes("PAID") || false,
      status: order.status || "CONFIRMED",
      step_tournee: order.highwayStep || "Île-de-France (A10)",
      notes: order.deliveryNotes || "",
      raw_message: order.rawWhatsAppText || "",
      updated_at: new Date().toISOString(),
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/naturomiel_orders`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (err) {
    console.error("Supabase upsert error:", err);
    return false;
  }
}

export async function deleteSupabaseOrder(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/naturomiel_orders?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("Supabase delete error:", err);
    return false;
  }
}
