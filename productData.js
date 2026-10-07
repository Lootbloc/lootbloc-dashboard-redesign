// SYNTHETIC product-breadth fixture for the prototype (queues, catalog, integrations, resources, activity).
// Shopify IDs, sync times and file versions are mock. Nothing here connects to Shopify or any file store.
export const NOTE = "Synthetic demo data. Shopify IDs and sync times are mock; previews never call Shopify.";

// Extra records so every queue has examples. Discontinued = lifecycle ended (still visible in All).
// Archived = hidden record that can be restored. They are different things and can overlap.
export const EXTRA_PRODUCTS = [
  { name: "Sonaria Plush Wave 0", partner: "Creatures of Sonaria", type: "Plush", stage: "live", lifecycle: "discontinued", status: "Discontinued", days: 410, owner: "SK", launch: "Aug 14", retail: "$24.99", cost: "$5.90", shopify: "Archived", orders: 0, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "approved" } },
  { name: "World Zero Cap (2025)", partner: "World Zero", type: "Apparel", stage: "live", lifecycle: "discontinued", status: "Sell-through, no restock", days: 220, owner: "JR", launch: "Feb 3", retail: "$27.99", cost: "$5.10", shopify: "Active", orders: 0, tasks: 1, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "approved" } },
  { name: "Sonaria Keyring (cancelled)", partner: "Creatures of Sonaria", type: "Accessories", stage: "concept", archived: true, archivedOn: "Sep 2", archivedBy: "Maya Park", status: "Idea Logged", days: 40, owner: "MP", launch: "—", retail: "—", cost: "—", shopify: "—", orders: 0, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "not_started", partnerSample: "not_started", goLive: "not_started" } },
  { name: "Mystery Box S1", partner: "Lootbloc", type: "Bundle", stage: "live", lifecycle: "discontinued", archived: true, archivedOn: "Jul 20", archivedBy: "Sam Kim", status: "Discontinued", days: 600, owner: "SK", launch: "Mar 1", retail: "$34.99", cost: "$4.20", shopify: "Archived", orders: 0, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "approved" } },
];
// Explicit needsStageReview flag (staff-only). Usually the lifecycle stage sits below the floor derived from linked records.
export const STAGE_REVIEW = {
  "Mystery Box S4": { floor: "sampling", why: "Stage is Concept, but a sample PO (PO-1050) already exists, so the derived floor is Sampling." },
  "Sonaria Tote Bag": { floor: "design_dev", why: "Stage is Concept, but quote QT-0431 was received, so the derived floor is Design / Dev." },
};

const SIZES = ["S", "M", "L", "XL", "XXL"];
export const CATALOG = {
  "World Zero Hoodie (Black)": { handle: "world-zero-hoodie-black", baseSku: "WZ-HD-BLK", barcode: "UPC, per variant", category: "Apparel > Hoodies",
    attributes: [["Material", "80% cotton, 20% polyester fleece"], ["Weight", "420 gsm"], ["Fit", "Unisex, relaxed"], ["Care", "Machine wash cold"]], options: [["Size", SIZES.join(", ")], ["Color", "Black"]],
    variants: [["S", 5999, 64, 60, "Active"], ["M", 5999, 8, 5, "Low stock"], ["L", 5999, 3, 0, "Out of stock"], ["XL", 5999, 41, 39, "Active"], ["XXL", 6299, 22, 22, "Not on Shopify"]].map(([s, price, onHand, avail, status], i) => ({ name: "Size " + s, sku: "WZ-HD-BLK-" + s, barcode: "0 84512 3301" + i + " " + (i + 2), price, onHand, avail, status })) },
  "Sonaria Glacier Plush": { handle: "sonaria-glacier-plush", baseSku: "SON-GLC", barcode: "Not assigned yet", category: "Toys > Plush",
    attributes: [["Material", "Minky plush, PP cotton fill"], ["Size", "30 cm"], ["Age", "3+"], ["Embroidery", "Pantone 2905 C crystals"]], options: [["Edition", "Standard"]],
    variants: [{ name: "Standard", sku: "SON-GLC-01", barcode: "Not assigned", price: 3499, onHand: 0, avail: 0, status: "Draft" }] },
};
export function catalogFor(p) {
  if (CATALOG[p.name]) return CATALOG[p.name];
  const base = (p.partner === "World Zero" ? "WZ-" : p.partner === "Lootbloc" ? "LB-" : "SON-") + p.name.replace(/[^A-Z0-9]/gi, "").slice(0, 5).toUpperCase();
  const price = Math.round(parseFloat(String(p.retail).replace(/[$,]/g, "")) * 100) || null;
  const st = p.lifecycle === "discontinued" ? "Discontinued" : p.stage === "live" ? "Active" : "Draft";
  return { handle: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""), baseSku: base, barcode: "Not assigned", category: p.type, attributes: [["Type", p.type]], options: [["Edition", "Standard"]],
    variants: [{ name: "Standard", sku: base + "-01", barcode: "Not assigned", price, onHand: p.stage === "live" ? 120 : 0, avail: p.stage === "live" ? 112 : 0, status: st }] };
}

export const STORE_FOR = { "World Zero": "Twin Atlas Official Store", "Creatures of Sonaria": "Twin Atlas Official Store", Lootbloc: "Lootbloc" };
export const INTEG = {
  "World Zero Hoodie (Black)": { state: "partial", productRef: "Shopify product #7731 (mock)", lastSync: "Sep 29, 9:41 AM (simulated)", error: "", unmapped: ["WZ-HD-BLK-XXL"],
    pull: [["Inventory, Size M", "Prototype shows 5 available; mock Shopify shows 4", "5 → 4"], ["Inventory, Size XL", "Same on both", "No change"]],
    push: [["Create variant Size XXL", "New variant WZ-HD-BLK-XXL at $62.99", "Creates 1 variant"], ["Price, Sizes S–XL", "Already $59.99", "No change"]] },
  "Sonaria Plush Wave 2": { state: "error", productRef: "Shopify product #7802 (mock)", lastSync: "Sep 28, 6:10 PM (simulated)", error: "Last mock push failed: Shopify price $27.99 doesn't match $29.99 here.", unmapped: [],
    pull: [["Price", "Mock Shopify has $27.99", "$29.99 → $27.99"]], push: [["Price", "Set Shopify to $29.99", "$27.99 → $29.99"]] },
  "Sonaria Glacier Plush": { state: "unmapped", productRef: "", lastSync: "Never", error: "", unmapped: ["SON-GLC-01"], pull: [], push: [["Create Shopify draft product", "Title, description, 1 variant at $34.99, status Draft", "Creates 1 draft product"]] },
};
export function integFor(p) {
  if (INTEG[p.name]) return INTEG[p.name];
  if (p.shopify === "—" || p.archived) return { state: "unmapped", productRef: "", lastSync: "Never", error: "", unmapped: [], pull: [], push: [] };
  return { state: "ok", productRef: "Shopify product #7" + (p.name.length * 37 % 900 + 100) + " (mock)", lastSync: "Sep 29, 9:41 AM (simulated)", error: "", unmapped: [], pull: [["All fields", "Matches mock Shopify", "No change"]], push: [["All fields", "Matches mock Shopify", "No change"]] };
}

// access: "all" = team and partner, "team" = Lootbloc only (never sent to partner view).
export const RESOURCES = {
  "World Zero Hoodie (Black)": [
    { id: "r1", kind: "Tech pack", icon: "icon-file-text", name: "Hoodie tech pack", fmt: "PDF, 8 pages", access: "all", source: "Uploaded by Maya Park", versions: [["v3", "Sep 12", "Added XXL grading"], ["v2", "Aug 20", "Cuff rib change"], ["v1", "Aug 2", "First draft"]], preview: ["Page 1: front and back flats", "Page 3: size chart S–XXL", "Page 6: label and hang-tag placement"] },
    { id: "r2", kind: "Specification", icon: "icon-table", name: "Measurement spec", fmt: "Sheet, 5 sizes", access: "all", source: "Lootbloc spec library", versions: [["v2", "Sep 12", "XXL row added"], ["v1", "Aug 2", "First draft"]], preview: ["Chest, length, sleeve for S–XXL", "Tolerance ±1 cm"] },
    { id: "r3", kind: "Whiteboard", icon: "icon-presentation", name: "Hoodie concept board", fmt: "Whiteboard, 14 frames", access: "all", source: "Shared board", versions: [["Live", "Sep 3", "Last edited by Twin Atlas"]], preview: ["Frame 1: moodboard", "Frame 6: chest print options", "Frame 12: approved direction"] },
    { id: "r4", kind: "Brand assets", icon: "icon-image", name: "World Zero logo pack", fmt: "4 files", access: "all", source: "Provided by Twin Atlas, read-only", versions: [["2026.1", "Jan 10", "Brand refresh"]], preview: ["Logo, black and white", "Wordmark", "Clear-space guide"] },
    { id: "r5", kind: "Costing", icon: "icon-calculator", name: "Factory costing sheet", fmt: "Sheet", access: "team", source: "Lootbloc ops", versions: [["v4", "Sep 18", "Restock quote"]], preview: ["Vendor quote comparison", "Freight assumptions"] },
    { id: "r6", kind: "QC", icon: "icon-clipboard-check", name: "QC checklist", fmt: "Checklist, 22 items", access: "team", source: "Lootbloc QC", versions: [["v1", "Sep 1", "First draft"]], preview: ["Seams, print, labels"] },
  ],
};
export function resourcesFor(p) {
  if (RESOURCES[p.name]) return RESOURCES[p.name];
  return [
    { id: "g1", kind: "Specification", icon: "icon-file-text", name: p.name + " spec", fmt: "PDF", access: "all", source: "Uploaded by " + ({ JR: "Jordan Reyes", SK: "Sam Kim", MP: "Maya Park" }[p.owner] || "Lootbloc"), versions: [["v1", "Sep 1", "First draft"]], preview: ["Dimensions and materials"] },
    { id: "g2", kind: "Costing", icon: "icon-calculator", name: "Factory costing notes", fmt: "Sheet", access: "team", source: "Lootbloc ops", versions: [["v1", "Sep 1", "First draft"]], preview: ["Quote assumptions"] },
  ];
}
export function activityFor(p) {
  const who = { JR: "Jordan Reyes", SK: "Sam Kim", MP: "Maya Park" }[p.owner] || "Lootbloc";
  const base = [["Sep 29, 9:41 AM", "System (mock)", "Shopify sync checked (simulated)", false], ["Sep 26", who, "Launch date set to " + (p.launch || "—"), false], ["Sep 18", who, "Stage changed to " + p.stage.replace("_", " "), false], ["Sep 12", "Maya Park", "Internal note edited", true]];
  if (p.name === "World Zero Hoodie (Black)") return [["Sep 29, 9:41 AM", "System (mock)", "Shopify sync: XXL still unmapped (simulated)", false], ["Sep 28", "Jordan Reyes", "Task added: Create restock PO for L and M", false], ["Sep 18", "Jordan Reyes", "PO-1043 linked (2,400 units)", false], ["Sep 12", "Maya Park", "Tech pack v3 uploaded", false], ["Sep 12", "Maya Park", "Internal note: bump L and M on restock", true], ["Jun 24", "Sam Kim", "Go-live approved; status Live", false]];
  if (p.archived) return [[p.archivedOn, p.archivedBy, "Archived (hidden, can be restored)", false], ...base.slice(1)];
  return base;
}
