// DEMO sales data for the prototype. Every number here is generated; nothing comes from a live Shopify store.
// "Total Sales" mirrors the existing dashboard metric: order totals (totalPrice) from included Shopify orders.
// AOV is always aggregate sales / aggregate orders, never an average of store AOVs.
export const TODAY = Date.UTC(2026, 8, 29); // Tue Sep 29 2026 (demo "today")
export const NOW_HOUR = 10; // demo data runs through 10:00 AM today
export const SYNC_NOTE = "Demo data, simulated sync 12 min ago. Not connected to Shopify.";
export const DEFINITION = "Total Sales = order totals from included Shopify orders, in USD. Not net sales, profit or payouts.";
const DAY = 86400000;
const START = Date.UTC(2024, 0, 1);
export const STORES = [
  { id: "twinatlas", name: "Twin Atlas Official Store", short: "Twin Atlas", currency: "USD", color: "var(--brand)", base: 74, aov: 42 },
  { id: "quataun", name: "Quataun Store", short: "Quataun", currency: "USD", color: "var(--blueBar)", base: 38, aov: 36 },
  { id: "ftf", name: "Flee The Facility Store", short: "Flee The Facility", currency: "USD", color: "var(--amberBar)", base: 52, aov: 31 },
  { id: "lootbloc", name: "Lootbloc", short: "Lootbloc", currency: "USD", color: "var(--greenBar)", base: 21, aov: 47 },
  { id: "shared", name: "Sample Shared Store (synthetic)", short: "Sample Shared", currency: "USD", color: "var(--fg2)", base: 34, synthetic: true },
];
// SYNTHETIC shared-store scenario (Tweaks: scenario = "shared"). A fictional store that sells products from several
// partners. It does not represent any real store or a real Twin Atlas relationship.
export const SHARED_CATALOG = [
  { sku: "SS-STK", name: "Sonaria Sticker Sheet", price: 9, owner: "twinatlas" },
  { sku: "SS-PIN", name: "World Zero Enamel Pin", price: 12, owner: "twinatlas" },
  { sku: "SS-TEE", name: "Nova Kids Tee", price: 24, owner: "other" },
  { sku: "SS-MUG", name: "Ember Mug", price: 16, owner: "other" },
  { sku: "SS-CAP", name: "Orbit Cap", price: 21, owner: "other" },
];
export const SHIP = 5.95, TAX = 0.08;
// Worked example: three synthetic orders from one day in the shared store.
export const WORKED = [
  { id: "S-1041", lines: [["SS-STK", 1], ["SS-MUG", 1]] },
  { id: "S-1042", lines: [["SS-TEE", 1]] },
  { id: "S-1043", lines: [["SS-STK", 2], ["SS-PIN", 1]] },
];
export const orderCalc = (o, owner) => { const items = o.lines.map(([sku, q]) => { const c = SHARED_CATALOG.find(x => x.sku === sku); return { ...c, qty: q, amount: c.price * q, mine: c.owner === owner }; });
  const sub = items.reduce((a, b) => a + b.amount, 0); const tax = Math.round(sub * TAX * 100) / 100; const total = Math.round((sub + SHIP + tax) * 100) / 100;
  const scoped = items.filter(i => i.mine).reduce((a, b) => a + b.amount, 0); return { items, sub, tax, total, scoped, counts: scoped > 0 }; };
// Which Shopify stores each demo viewer may see. Prototype display rule only, not backend access control.
export const ACCESS = { ops: ["twinatlas", "quataun", "ftf", "lootbloc"], finance: ["twinatlas", "quataun", "ftf", "lootbloc"], partner: ["twinatlas"] };
export const access = (role, scenario) => scenario === "shared" ? (role === "partner" ? ["twinatlas", "shared"] : ["twinatlas", "quataun", "ftf", "lootbloc", "shared"]) : (ACCESS[role] || []);
// Partner sales in the shared-store scenario use the scoped basis everywhere (one basis, never mixed).
export const basisFor = (role, scenario) => role === "partner" && scenario === "shared" ? "scoped" : "total";
const D = (y, m, d) => Date.UTC(y, m - 1, d);
export const LAUNCHES = [
  { id: "l1", product: "Mystery Box S2", store: "lootbloc", date: D(2026, 7, 18), kind: "actual" },
  { id: "l2", product: "World Zero Mug (Logo)", store: "twinatlas", date: D(2026, 5, 30), kind: "actual", record: true },
  { id: "l3", product: "World Zero Hoodie (Black)", store: "twinatlas", date: D(2026, 6, 24), kind: "actual", record: true },
  { id: "l4", product: "Beast Plush", store: "ftf", date: D(2026, 8, 21), kind: "actual" },
  { id: "l5", product: "Glow Pin Pack", store: "ftf", date: D(2026, 8, 21), kind: "actual" },
  { id: "l6", product: "Quataun Crest Tee", store: "quataun", date: D(2026, 9, 12), kind: "actual" },
  { id: "l7", product: "Sonaria Sticker Sheet", store: "twinatlas", date: D(2026, 9, 15), kind: "actual" },
  { id: "l8", product: "Mystery Box S2 restock", store: "lootbloc", date: D(2026, 9, 15), kind: "actual" },
  { id: "l9", product: "World Zero Keychain Set", store: "twinatlas", date: D(2026, 10, 1), kind: "planned", record: true },
  { id: "l10", product: "Mystery Box S3", store: "lootbloc", date: D(2026, 10, 2), kind: "planned", record: true },
  { id: "l11", product: "Sonaria Plush Wave 2", store: "twinatlas", date: D(2026, 10, 10), kind: "planned", record: true },
  { id: "l12", product: "Sonaria Pin Set", store: "twinatlas", date: D(2026, 10, 20), kind: "planned", record: true },
  { id: "l13", product: "World Zero Enamel Pin", store: "shared", date: D(2026, 9, 8), kind: "actual", owner: "twinatlas", sku: "SS-PIN" },
  { id: "l14", product: "Ember Mug", store: "shared", date: D(2026, 9, 8), kind: "actual", owner: "other", sku: "SS-MUG" },
  { id: "l15", product: "Orbit Cap", store: "shared", date: D(2026, 10, 6), kind: "planned", owner: "other" },
];
// Who may see a launch marker. Dedicated Twin Atlas store launches belong to Twin Atlas.
export const launchVisible = (l, role) => role !== "partner" || (l.owner ? l.owner === "twinatlas" : l.store === "twinatlas");
const rnd = (a, b) => { let x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const cache = {};
// Daily {orders, sales} per store, START..TODAY (today = partial through NOW_HOUR).
export function daily(storeId) {
  if (cache[storeId]) return cache[storeId];
  const si = STORES.findIndex(s => s.id === storeId), st = STORES[si];
  const n = Math.round((TODAY - START) / DAY) + 1; const out = [];
  const boosts = {}; LAUNCHES.filter(l => l.store === storeId && l.kind === "actual").forEach(l => { const i = Math.round((l.date - START) / DAY); boosts[i] = (boosts[i] || 0) + 0.75; boosts[i + 1] = (boosts[i + 1] || 0) + 0.3; boosts[i + 2] = (boosts[i + 2] || 0) + 0.12; });
  for (let i = 0; i < n; i++) {
    const t = START + i * DAY, dt = new Date(t), dow = dt.getUTCDay(), mo = dt.getUTCMonth();
    const growth = 0.7 + 0.45 * (i / n);
    const season = mo === 10 ? 1.45 : mo === 11 ? 1.6 : mo === 0 ? 0.8 : 1;
    const wk = dow === 0 || dow === 6 ? 1.18 : dow === 1 ? 0.9 : 1;
    let orders = st.base * growth * season * wk * (0.78 + 0.44 * rnd(si + 1, i)) * (1 + (boosts[i] || 0));
    if (i === n - 1) orders *= (NOW_HOUR / 24) * 0.8;
    orders = Math.max(0, Math.round(orders));
    if (st.synthetic) {
      // order-level simulation so scoped figures come from real line items
      let sales = 0, sOrders = 0, sSales = 0;
      const lb = {}; LAUNCHES.filter(l => l.store === storeId && l.kind === "actual").forEach(l => { const k = Math.round((l.date - START) / DAY); if (k === i || k === i - 1) lb[l.sku] = k === i ? 2.2 : 1.5; });
      for (let o = 0; o < orders; o++) {
        const nItems = 1 + Math.floor(rnd(i * 31 + o, 3) * 2.6); let sub = 0, sc = 0;
        for (let k = 0; k < nItems; k++) { const ws = SHARED_CATALOG.map(c => (c.owner === "twinatlas" ? 0.8 : 1) * (lb[c.sku] || 1)); const tot = ws.reduce((a, b) => a + b, 0); let r = rnd(i * 97 + o * 7 + k, 5) * tot, ci = 0; while (r > ws[ci] && ci < ws.length - 1) { r -= ws[ci]; ci++; }
          const c = SHARED_CATALOG[ci], q = rnd(i + o * 3 + k, 9) > 0.85 ? 2 : 1; sub += c.price * q; if (c.owner === "twinatlas") sc += c.price * q; }
        sales += sub + SHIP + Math.round(sub * TAX * 100) / 100; if (sc > 0) { sOrders++; sSales += sc; }
      }
      out.push({ t, orders, sales: Math.round(sales * 100) / 100, sOrders, sSales }); continue;
    }
    const sales = Math.round(orders * st.aov * (0.9 + 0.2 * rnd(si + 7, i)) * 100) / 100;
    // scoped (line-item) basis for a dedicated partner store: every product belongs to that partner, minus shipping and tax
    const sSales = Math.max(0, Math.round(((sales - orders * SHIP) / (1 + TAX)) * 100) / 100);
    out.push({ t, orders, sales, sOrders: orders, sSales });
  }
  return (cache[storeId] = out);
}
export const dayIndex = t => Math.round((t - START) / DAY);
export const fmtDay = (t, yr) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC", ...(yr ? { year: "numeric" } : {}) });
export const fmtMoney = (n, cents) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
export const RANGES = [["today", "Today"], ["7d", "7D"], ["30d", "30D"], ["90d", "90D"], ["year", "Year"], ["all", "All time"]];
// Returns aligned buckets for the range: [{label, start, end, cur:{orders,sales}, prev:{orders,sales}|null}]
export const pickB = (d, basis) => basis === "scoped" ? { orders: d.sOrders, sales: d.sSales } : { orders: d.orders, sales: d.sales };
export function buckets(storeIds, range, basis) {
  const ti = dayIndex(TODAY), yi = ti - 1;
  if (range === "today") {
    const hrs = []; for (let h = 0; h < NOW_HOUR; h++) hrs.push(h);
    const hourShare = h => { const w = [0.5, 0.35, 0.25, 0.2, 0.2, 0.3, 0.55, 0.8, 1, 1.15, 1.25, 1.3, 1.35, 1.3, 1.25, 1.2, 1.25, 1.35, 1.5, 1.6, 1.55, 1.35, 1.05, 0.75]; return w[h] / w.reduce((a, b) => a + b, 0); };
    const day = (sid, i) => pickB(daily(sid)[i], basis);
    const todayShare = hrs.reduce((a, h) => a + hourShare(h), 0);
    return { unit: "hour", period: "Today so far, 12:00 AM to " + NOW_HOUR + ":00 AM", prevPeriod: "Yesterday, same hours (" + fmtDay(TODAY - DAY) + ")", list: hrs.map(h => {
      const sum = (i, share) => storeIds.reduce((a, sid) => { const d = day(sid, i); return { orders: a.orders + d.orders * share, sales: a.sales + d.sales * share }; }, { orders: 0, sales: 0 });
      const cur = sum(ti, hourShare(h) / todayShare), prev = sum(ti - 1, hourShare(h));
      const lab = (h % 12 || 12) + (h < 12 ? " AM" : " PM");
      return { label: lab, long: "Today " + lab, prevLong: "Yesterday " + lab, start: TODAY, end: TODAY, cur: { orders: Math.round(cur.orders), sales: cur.sales }, prev: { orders: Math.round(prev.orders), sales: prev.sales } }; }) };
  }
  let startI, size, prevShift;
  if (range === "7d" || range === "30d" || range === "90d") { const n = +range.replace("d", ""); startI = yi - n + 1; size = 1; prevShift = n; }
  else if (range === "year") { startI = dayIndex(Date.UTC(2026, 0, 1)); size = 7; prevShift = dayIndex(Date.UTC(2026, 0, 1)) - dayIndex(Date.UTC(2025, 0, 1)); }
  else { startI = 0; size = 30; prevShift = null; }
  const list = [];
  for (let i = startI; i <= yi; i += size) {
    const j = Math.min(yi, i + size - 1);
    const agg = (a, b) => { if (a < 0) return null; let o = 0, s = 0; for (let k = a; k <= b; k++) storeIds.forEach(sid => { const d = pickB(daily(sid)[k], basis); o += d.orders; s += d.sales; }); return { orders: o, sales: s }; };
    const t0 = START + i * DAY, t1 = START + j * DAY;
    const prev = prevShift != null ? agg(i - prevShift, j - prevShift) : null;
    const pt0 = prevShift != null ? START + (i - prevShift) * DAY : null, pt1 = prevShift != null ? START + (j - prevShift) * DAY : null;
    list.push({ label: size === 30 ? new Date(t0).toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" }) : fmtDay(t0), long: size === 1 ? fmtDay(t0, true) : fmtDay(t0) + " – " + fmtDay(t1, true), prevLong: prev ? (size === 1 ? fmtDay(pt0, true) : fmtDay(pt0) + " – " + fmtDay(pt1, true)) : "", start: t0, end: t1, i0: i, i1: j, cur: agg(i, j), prev });
  }
  const first = list[0], last = list[list.length - 1];
  const period = fmtDay(first.start) + " – " + fmtDay(last.end, true);
  const prevPeriod = prevShift != null ? fmtDay(START + (first.i0 - prevShift) * DAY) + " – " + fmtDay(START + (last.i1 - prevShift) * DAY, true) : "";
  return { unit: size === 1 ? "day" : size === 7 ? "week" : "month", period, prevPeriod, list };
}
export const metricOf = (x, m) => !x ? null : m === "orders" ? x.orders : m === "aov" ? (x.orders ? x.sales / x.orders : null) : x.sales;
export const fmtMetric = (v, m, short) => v == null ? "—" : m === "orders" ? Math.round(v).toLocaleString("en-US") : m === "aov" ? fmtMoney(v, true) : short && v >= 10000 ? "$" + (v / 1000).toFixed(v >= 100000 ? 0 : 1) + "k" : fmtMoney(v, false);
