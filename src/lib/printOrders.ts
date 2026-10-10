// Fonction utilitaire pour regrouper les pots identiques et compter les quantités
// Ex: ["Thym (450 g)", "Thym (450 g)", "Lavande (450 g)"] -> [{ name: "Thym (450 g)", qty: 2 }, { name: "Lavande (450 g)", qty: 1 }]
function groupPotsWithQuantities(pots: string[]): { name: string; qty: number }[] {
  if (!pots || !Array.isArray(pots)) return [];
  const map: Record<string, number> = {};
  for (const p of pots) {
    const clean = p.trim();
    map[clean] = (map[clean] || 0) + 1;
  }
  return Object.entries(map).map(([name, qty]) => ({ name, qty }));
}

// Fonction pour imprimer un bon de commande individuel en PDF
export function printIndividualOrder(order: any) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Veuillez autoriser les fenêtres pop-up pour imprimer la commande.");
    return;
  }

  const rawPots: string[] = order.pots || (order.compositionDetails ? JSON.parse(order.compositionDetails).pots : []);
  const groupedPots = groupPotsWithQuantities(rawPots);
  const totalPotsCount = rawPots.length;
  const coffretsCount = Math.max(1, Math.ceil(totalPotsCount / 5));

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Bon de Commande ${order.orderNumber || order.id}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 24px;
          color: #1a1a1a;
          background: #fff;
          font-size: 13px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #b76f27;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .brand {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #243a30;
        }
        .brand span {
          color: #b76f27;
        }
        .order-title {
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          background: #f3e8ff;
          color: #6b21a8;
          font-weight: 700;
          font-size: 11px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .card {
          background: #faf8f5;
          border: 1px solid #ebd9c2;
          padding: 14px;
          border-radius: 6px;
        }
        .card h4 {
          margin: 0 0 10px 0;
          font-size: 12px;
          text-transform: uppercase;
          color: #8c571e;
          letter-spacing: 0.5px;
        }
        .card p {
          margin: 4px 0;
          line-height: 1.4;
        }
        .card strong {
          color: #000;
        }
        .pots-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          margin-bottom: 20px;
        }
        .pots-table th {
          background: #243a30;
          color: #fff;
          text-align: left;
          padding: 8px 12px;
          font-size: 11px;
          text-transform: uppercase;
        }
        .pots-table td {
          padding: 8px 12px;
          border-bottom: 1px solid #e5e5e5;
        }
        .qty-badge {
          display: inline-block;
          background: #fef3c7;
          color: #92400e;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
          border: 1px solid #fde68a;
        }
        .total-box {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 15px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #ccc;
        }
        .absence-alert {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 10px;
          border-radius: 4px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .footer-note {
          margin-top: 35px;
          text-align: center;
          font-size: 10px;
          color: #777;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">NATURO<span>MIEL</span></div>
          <div style="font-size: 11px; color: #666; margin-top: 2px;">Tournée de Livraison Automne 2026</div>
        </div>
        <div style="text-align: right;">
          <div class="order-title">Bon de Précommande n° ${order.orderNumber || order.id}</div>
          <div style="margin-top: 4px;">
            <span class="badge">${order.status}</span>
          </div>
        </div>
      </div>

      ${order.absenceWindow ? `<div class="absence-alert">⚠️ Attention : ${order.absenceWindow}</div>` : ""}

      <div class="grid">
        <div class="card">
          <h4>👤 Client / Contact</h4>
          <p><strong>Nom :</strong> ${order.customerName || order.name || "-"}</p>
          <p><strong>Téléphone :</strong> ${order.phone || "-"}</p>
          <p><strong>E-mail :</strong> ${order.email || "-"}</p>
        </div>

        <div class="card">
          <h4>🚚 Destination & Logistique</h4>
          <p><strong>Adresse :</strong> ${order.shippingAddress || "-"}</p>
          <p><strong>Ville / CP :</strong> ${order.postalCode ? order.postalCode + " " : ""}${order.city || "-"}</p>
          <p><strong>Étape Tournée :</strong> ${order.highwayStep || "-"}</p>
          ${order.deliveryNotes ? `<p><strong>Notes :</strong> ${order.deliveryNotes}</p>` : ""}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
        <h4 style="text-transform: uppercase; color: #243a30; margin: 0;">📦 Composition Détaillée des Pots</h4>
        <div style="font-size: 12px; font-weight: bold; color: #b76f27;">
          ${coffretsCount > 1 ? `Commande de ${coffretsCount} coffrets — ` : ""}Total : ${totalPotsCount} pot${totalPotsCount > 1 ? "s" : ""}
        </div>
      </div>

      <table class="pots-table">
        <thead>
          <tr>
            <th style="width: 40px;">#</th>
            <th>Miel ou Produit Choisi</th>
            <th style="width: 100px;">Format</th>
            <th style="width: 120px; text-align: center;">Quantité exacte</th>
          </tr>
        </thead>
        <tbody>
          ${groupedPots && groupedPots.length > 0
            ? groupedPots.map((item, idx) => `
              <tr>
                <td><strong>${idx + 1}</strong></td>
                <td><strong style="font-size: 14px;">${item.name}</strong></td>
                <td>${item.name.includes("230") ? "230 g" : "450 g"}</td>
                <td style="text-align: center;">
                  <span class="qty-badge">x ${item.qty} pot${item.qty > 1 ? "s" : ""}</span>
                </td>
              </tr>
            `).join("")
            : `<tr><td colspan="4" style="text-align: center; color: #888;">Aucun détail de pot spécifique renseigné.</td></tr>`
          }
        </tbody>
      </table>

      <div class="total-box">
        <span>Montant Total à régler :</span>
        <span style="color: #b76f27; font-size: 20px;">${order.totalAmount || order.total} €</span>
      </div>
      <div style="text-align: right; font-size: 11px; color: #666; margin-top: 4px;">
        Mode de règlement prévu : ${order.paymentMethod || "Sur place"}
      </div>

      <div class="footer-note">
        NATUROMIEL — Miels Rares & Apithérapie Artisanale — Espagne ➔ A63 ➔ A10 ➔ Île-de-France
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

// Fonction pour imprimer le Manifeste Global de Préparation de toutes les commandes
export function printGlobalPreparationSheet(orders: any[], sortBy: "name" | "city" | "phone" = "city") {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Veuillez autoriser les fenêtres pop-up pour imprimer la fiche globale.");
    return;
  }

  // Tri des commandes
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = (a.customerName || a.name || "").toLowerCase();
      const nameB = (b.customerName || b.name || "").toLowerCase();
      return nameA.localeCompare(nameB);
    } else if (sortBy === "phone") {
      const phoneA = (a.phone || "").replace(/\D/g, "");
      const phoneB = (b.phone || "").replace(/\D/g, "");
      return phoneA.localeCompare(phoneB);
    } else {
      // Tri par ville par défaut
      const cityA = (a.city || "").toLowerCase();
      const cityB = (b.city || "").toLowerCase();
      return cityA.localeCompare(cityB);
    }
  });

  // Calcul du récapitulatif total des pots à préparer pour toute la tournée
  const potTotals: Record<string, number> = {};
  let totalRevenue = 0;
  let totalGlobalPotsCount = 0;

  sortedOrders.forEach((o) => {
    totalRevenue += parseFloat(o.totalAmount || o.total || 0);
    const pots: string[] = o.pots || (o.compositionDetails ? JSON.parse(o.compositionDetails).pots : []);
    if (pots && Array.isArray(pots)) {
      pots.forEach((p) => {
        potTotals[p] = (potTotals[p] || 0) + 1;
        totalGlobalPotsCount++;
      });
    }
  });

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Fiche Globale de Préparation — NATUROMIEL</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 24px;
          color: #1a1a1a;
          background: #fff;
          font-size: 11px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2px solid #b76f27;
          padding-bottom: 10px;
          margin-bottom: 16px;
        }
        .brand {
          font-size: 20px;
          font-weight: 800;
          color: #243a30;
        }
        .brand span {
          color: #b76f27;
        }
        .summary-card {
          background: #fbf7f0;
          border: 1px solid #ebd9c2;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        .summary-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #8c571e;
          margin-bottom: 8px;
        }
        .summary-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .summary-item {
          background: #fff;
          border: 1px solid #ded6c8;
          padding: 5px 9px;
          border-radius: 4px;
          font-size: 11px;
        }
        .summary-item strong {
          color: #b76f27;
          font-size: 12px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th {
          background: #243a30;
          color: #fff;
          text-align: left;
          padding: 8px 6px;
          font-size: 10px;
          text-transform: uppercase;
          border: 1px solid #243a30;
        }
        td {
          padding: 7px 6px;
          border: 1px solid #ddd;
          vertical-align: top;
        }
        tr:nth-child(even) {
          background: #fafafa;
        }
        .pot-item {
          display: inline-block;
          background: #fdf8f0;
          color: #222;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          margin: 1.5px 2px;
          border: 1px solid #ebd9c2;
        }
        .pot-qty {
          background: #b76f27;
          color: #fff;
          font-weight: bold;
          padding: 1px 4px;
          border-radius: 2px;
          font-size: 9.5px;
          margin-right: 3px;
        }
        .absence {
          color: #c2410c;
          font-weight: bold;
          font-size: 10px;
          margin-top: 2px;
        }
        .check-box {
          width: 14px;
          height: 14px;
          border: 1px solid #888;
          display: inline-block;
        }
        @media print {
          body { padding: 0; }
          .summary-card { break-inside: avoid; }
          tr { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">NATURO<span>MIEL</span> — Fiche Globale de Préparation</div>
          <div style="font-size: 11px; color: #555; margin-top: 3px;">
            Tournée A63 / A10 — Triée par : <strong>${sortBy === "city" ? "Ville" : sortBy === "name" ? "Nom Client" : "Téléphone"}</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; font-weight: bold;">${sortedOrders.length} Commandes (${totalGlobalPotsCount} pots au total)</div>
          <div style="font-size: 11px; color: #777;">Date d'impression : ${new Date().toLocaleDateString("fr-FR")}</div>
        </div>
      </div>

      <!-- Récapitulatif global des pots nécessaires -->
      <div class="summary-card">
        <div class="summary-title">📊 Total de tous les Pots à Préparer pour la Tournée (${totalGlobalPotsCount} pots) :</div>
        <div class="summary-grid">
          ${Object.entries(potTotals).map(([pot, qty]) => `
            <div class="summary-item">
              ${pot} : <strong>${qty} pot${qty > 1 ? "s" : ""}</strong>
            </div>
          `).join("")}
        </div>
        <div style="margin-top: 10px; font-weight: bold; color: #243a30; font-size: 12px;">
          Montant Global Cumulé : <span style="color: #b76f27;">${totalRevenue} €</span>
        </div>
      </div>

      <!-- Tableau détaillé des commandes avec quantités exactes par miel -->
      <table>
        <thead>
          <tr>
            <th style="width: 25px; text-align: center;">Prêt</th>
            <th style="width: 75px;">Réf.</th>
            <th style="width: 130px;">Client</th>
            <th style="width: 90px;">Téléphone</th>
            <th style="width: 120px;">Ville / CP</th>
            <th style="width: 150px;">Adresse</th>
            <th>Pots Choisis & Quantités</th>
            <th style="width: 50px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${sortedOrders.map((o) => {
            const rawPots: string[] = o.pots || (o.compositionDetails ? JSON.parse(o.compositionDetails).pots : []);
            const grouped = groupPotsWithQuantities(rawPots);
            const orderPotsCount = rawPots.length;

            return `
              <tr>
                <td style="text-align: center; vertical-align: middle;">
                  <span class="check-box"></span>
                </td>
                <td style="font-family: monospace; font-weight: bold;">
                  ${o.orderNumber || o.id}
                  <div style="font-size: 9px; color: #666; font-weight: normal;">${orderPotsCount} pot${orderPotsCount > 1 ? "s" : ""}</div>
                </td>
                <td>
                  <strong>${o.customerName || o.name || "-"}</strong>
                  ${o.highwayStep ? `<div style="color: #047857; font-size: 9px;">📍 ${o.highwayStep}</div>` : ""}
                </td>
                <td style="font-family: monospace; font-weight: bold;">
                  ${o.phone || "-"}
                </td>
                <td>
                  <strong>${o.city || "-"}</strong>
                  ${o.postalCode ? `<span style="color: #666;">(${o.postalCode})</span>` : ""}
                  ${o.absenceWindow ? `<div class="absence">⚠️ ${o.absenceWindow}</div>` : ""}
                </td>
                <td>
                  ${o.shippingAddress || "-"}
                </td>
                <td>
                  ${grouped && grouped.length > 0
                    ? grouped.map((item) => `
                        <span class="pot-item">
                          <span class="pot-qty">x${item.qty}</span>${item.name}
                        </span>
                      `).join(" ")
                    : "<span style='color: #999;'>Coffret standard</span>"
                  }
                </td>
                <td style="text-align: right; font-weight: bold; color: #b76f27;">
                  ${o.totalAmount || o.total} €
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
