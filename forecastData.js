// SYNTHETIC inventory forecast fixture for the prototype. Not live Shopify, ShipHero or PO data.
// Mirrors the current live chart semantics: 60 days of daily sales history, 90 days of projected demand,
// and a 168-day (about six months) stock projection from today.
export const TODAY = Date.UTC(2026, 8, 29);
export const HIST = 60, DEMAND_FUTURE = 90, STOCK_DAYS = 168;
const DAY = 86400000;
export const fmtD = t => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
export const fmtM = t => new Date(t).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
// Days with no synced sales data (partial coverage). Unknown, never zero.
export const MISSING = { "WZ-SK-2PK": [40, 41, 42, 43, 44, 45] };
const rnd = (a, b) => { const x = Math.sin(a * 91.7 + b * 47.3) * 10000; return x - Math.floor(x); };

// Daily actual units sold, oldest first, ending yesterday. Varies naturally, with a short spike.
export function history(r) {
  const miss = new Set(MISSING[r.sku] || []);
  return Array.from({ length: HIST }, (_, i) => {
    const t = TODAY - (HIST - i) * DAY; if (!r.rate) return { t, v: null, none: true };
    if (miss.has(i)) return { t, v: null, missing: true };
    const dow = new Date(t).getUTCDay(); const trend = 0.86 + 0.26 * (i / HIST);
    const spike = i >= 18 && i <= 21 ? 1.9 - (i - 18) * 0.25 : 1;
    const v = r.rate * trend * spike * (dow === 0 || dow === 6 ? 1.18 : 1) * (0.62 + 0.76 * rnd(r.sku.length + i, i * 3 + 1));
    return { t, v: Math.max(0, Math.round(v)) };
  });
}
// Trailing 7-day average: for day i >= 6, (sum of days i-6..i) / 7, rounded to 1 decimal. Gaps if any day is missing.
export function avg7(H) { return H.map((d, i) => { if (i < 6) return null; const w = H.slice(i - 6, i + 1); if (w.some(x => x.v == null)) return null; return Math.round(w.reduce((a, b) => a + b.v, 0) / 7 * 10) / 10; }); }

// Net balance model: start from available today, subtract the daily sell rate, add dated arrivals.
// Available = max(0, net). Backordered = max(0, -net). Undated arrivals are not scheduled.
export function stock(r) {
  const rate = r.rate || 0;
  const arrivals = r.incoming && r.incomingIn != null ? [{ day: r.incomingIn, qty: r.incoming, ref: r.incomingPo, t: TODAY + r.incomingIn * DAY }] : [];
  const days = []; let net = r.avail;
  for (let d = 0; d <= STOCK_DAYS; d++) {
    if (d > 0) net -= rate;
    const a = arrivals.find(x => x.day === d); if (a) net += a.qty;
    days.push({ d, t: TODAY + d * DAY, net, available: Math.max(0, net > 1e-6 ? net : 0), backordered: Math.max(0, net < -1e-6 ? -net : 0), arrival: a || null });
  }
  return { days, arrivals, undated: r.incoming && r.incomingIn == null ? [{ qty: r.incoming, ref: r.incomingPo }] : [] };
}
// Fritsch–Carlson monotone cubic path through points [[x,y],...]; breaks on null y.
export function monotonePath(pts) {
  const segs = []; let cur = []; pts.forEach(p => { if (p[1] == null) { if (cur.length) segs.push(cur); cur = []; } else cur.push(p); }); if (cur.length) segs.push(cur);
  return segs.map(P => { const n = P.length; if (n === 1) return "M" + P[0][0].toFixed(1) + " " + P[0][1].toFixed(1);
    const dx = [], m = [], t = []; for (let i = 0; i < n - 1; i++) { dx[i] = P[i + 1][0] - P[i][0]; m[i] = (P[i + 1][1] - P[i][1]) / dx[i]; }
    t[0] = m[0]; t[n - 1] = m[n - 2]; for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
    for (let i = 0; i < n - 1; i++) { if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; } const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b; if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; } }
    let d = "M" + P[0][0].toFixed(1) + " " + P[0][1].toFixed(1);
    for (let i = 0; i < n - 1; i++) { const h = dx[i] / 3; d += " C" + (P[i][0] + h).toFixed(1) + " " + (P[i][1] + h * t[i]).toFixed(1) + " " + (P[i + 1][0] - h).toFixed(1) + " " + (P[i + 1][1] - h * t[i + 1]).toFixed(1) + " " + P[i + 1][0].toFixed(1) + " " + P[i + 1][1].toFixed(1); }
    return d; }).join(" ");
}
