// More tools / work destinations for the prototype. All data is SYNTHETIC and every action is a local preview.
// No real permissions, credentials, QuickBooks/Shopify calls, messages or file storage exist behind this.
export const ADMIN_ONLY = ["tasks", "calendar", "timeline", "vendors", "quickbooks", "shopify", "partners", "resources", "activity", "ai", "users", "hub", "payouts", "finance"];
export const MODULES = [
  ["Work", [["tasks", "Tasks", "list-checks", "Assigned work linked to records, one-time or recurring"], ["calendar", "Calendar", "calendar-days", "Launches, due dates, ETAs and factory holidays by month"], ["timeline", "Timeline", "chart-gantt", "POs, shipments and launches across the next quarter"]]],
  ["Records", [["vendors", "Vendors & factories", "factory", "Factories, service vendors, aliases and import matching"], ["partners", "Partners", "building-2", "Studios, brands, Shopify connection and access boundaries"], ["resources", "Resources", "library", "Specs, tech packs, boards, brand assets and documents"]]],
  ["Systems", [["quickbooks", "QuickBooks", "refresh-cw", "Mappings and invoice export readiness (mock)"], ["shopify", "Shopify sync", "store", "Store freshness, coverage, failures and backfill (mock)"], ["ai", "AI review", "sparkles", "Proposed matches and extractions waiting for review"], ["connections", "Connections", "plug-zap", "Health of Shopify, ShipHero, QuickBooks, OpenAI and carrier tracking"], ["activity", "Activity", "history", "Who changed what, where, and the result"]]],
  ["Admin", [["users", "Users & roles", "shield", "Roles, page access, field visibility and scope"], ["payouts", "Payouts", "hand-coins", "Coming soon"], ["finance", "Finance", "landmark", "Coming soon"]]],
];
export const NAV_LABEL = { tasks: "Tasks", calendar: "Calendar", timeline: "Timeline", vendors: "Vendors & factories", quickbooks: "QuickBooks", partners: "Partners", resources: "Resources", payouts: "Payouts", connections: "Connections", users: "Users & roles", settings: "Settings" };
const MO = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const MN = Object.keys(MO);
const D = (m, d, y = 2026) => Date.UTC(y, m, d);
const TODAY = D(8, 29);
const parse = (s, nextYearEarly) => { const m = /^([A-Z][a-z]{2}) (\d+)/.exec(s || ""); if (!m) return null; const mo = MO[m[1]]; return D(mo, +m[2], nextYearEarly && mo <= 4 ? 2027 : 2026); };
const fmt = t => MN[new Date(t).getUTCMonth()] + " " + new Date(t).getUTCDate();
const DAY = 86400000;

const STAFF = { JR: "Jordan Reyes", SK: "Sam Kim", MP: "Maya Park", PS: "Priya Shah", AN: "Andrew" };
export const USERS = [
  { id: "u1", name: "Andrew", role: "Admin", scope: "All partners", ip: "Office or VPN only", last: "Today", status: "Active" },
  { id: "u2", name: "Maya Park", role: "Admin", scope: "All partners", ip: "Office or VPN only", last: "Today", status: "Active" },
  { id: "u3", name: "Jordan Reyes", role: "Ops Staff", scope: "All partners", ip: "Any network", last: "Today", status: "Active" },
  { id: "u4", name: "Sam Kim", role: "Ops Staff", scope: "All partners", ip: "Any network", last: "Yesterday", status: "Active" },
  { id: "u5", name: "Priya Shah", role: "Finance", scope: "All partners", ip: "Office or VPN only", last: "Today", status: "Active" },
  { id: "u6", name: "Alex (Twin Atlas)", role: "Partner Admin", scope: "Twin Atlas", ip: "Any network", last: "Sep 28", status: "Active" },
  { id: "u7", name: "Riley (Twin Atlas)", role: "Partner Viewer", scope: "Twin Atlas", ip: "Any network", last: "Sep 22", status: "Active" },
  { id: "u8", name: "Test user K", role: "Partner Viewer", scope: "Sample Partner K (synthetic)", ip: "Any network", last: "Never", status: "Disabled (test)" },
];
const LVL = { F: "Full", V: "View", O: "Own products", B: "Billed to you", N: "No access", S: "Soon" };
export const ROLES = {
  "Admin": { desc: "Everything, including admin tools.", pages: "FFFFFFFFFFF", tools: "F", actions: [["Products", "Create, edit, change stage, archive"], ["POs", "Create, approve, record payments"], ["Invoices", "Allocate, record payment, mark sent"], ["Views", "Save private, share with any audience"], ["Users & roles", "View role summaries (editing not in prototype)"]], fields: [["Internal notes", "Visible"], ["Vendor names", "Real names"], ["Quote prices and tiers", "Visible"], ["Actual PO costs", "Visible"], ["Target landed cost", "Visible"], ["Sales", "Total Sales, whole store"], ["Attachments", "All"]], partners: "All partners", stores: "All four reference stores", ip: "Office or VPN only (203.0.113.0/24, documentation range)", intersect: [["Partner and owner filters", "Kept"], ["Internal notes column", "Kept"], ["Needs stage review queue", "Kept"], ["Store selection on Home sales", "Kept"]] },
  "Ops Staff": { desc: "Day-to-day product, PO, shipment and inventory work.", pages: "FFFFFFFFVVV", tools: "V", actions: [["Products", "Create, edit, change stage, archive"], ["POs", "Create, edit; approval needs Admin"], ["Invoices", "View and add factory invoices"], ["Views", "Save private, share with team or team + partner"]], fields: [["Internal notes", "Visible"], ["Vendor names", "Real names"], ["Quote prices and tiers", "Visible"], ["Actual PO costs", "Visible"], ["Target landed cost", "Visible"], ["Sales", "Total Sales, whole store"], ["Attachments", "All"]], partners: "All partners", stores: "All four reference stores", ip: "No restriction", intersect: [["Partner and owner filters", "Kept"], ["Internal notes column", "Kept"], ["Needs stage review queue", "Kept"], ["Store selection on Home sales", "Kept"]] },
  "Finance": { desc: "Invoices, reimbursements and QuickBooks readiness.", pages: "FVVVVVVFFVV", tools: "V", actions: [["Invoices", "Allocate, record payment, mark sent"], ["QuickBooks", "Review mappings and readiness (mock)"], ["Views", "Save private, share with team or team + partner"]], fields: [["Internal notes", "Visible"], ["Vendor names", "Real names"], ["Quote prices and tiers", "Visible"], ["Actual PO costs", "Visible"], ["Target landed cost", "Visible"], ["Sales", "Total Sales, whole store"], ["Attachments", "All"]], partners: "All partners", stores: "All four reference stores", ip: "Office or VPN only (203.0.113.0/24, documentation range)", intersect: [["Partner and owner filters", "Kept"], ["Internal notes column", "Kept"], ["Needs stage review queue", "Kept"], ["Store selection on Home sales", "Kept"]] },
  "Partner Admin": { desc: "Twin Atlas users who approve samples and follow their products. Matches the external Partner role.", pages: "FOOOOOOOBNN", tools: "N", actions: [["Approvals", "Approve or request changes on their products"], ["Products", "View; edit partner notes"], ["Views", "Save private, share with Twin Atlas team"]], fields: [["Internal notes", "Removed"], ["Vendor names", "Aliases only (Manufacturer Alpha, Bravo…)"], ["Quote prices and tiers", "Visible for their products"], ["Actual PO costs", "Visible for their POs"], ["Target landed cost", "Visible"], ["Sales", "Twin Atlas store only; scoped product sales in shared stores"], ["Attachments", "Shared files only"]], partners: "Twin Atlas (World Zero, Creatures of Sonaria)", stores: "Twin Atlas Official Store", ip: "No restriction", intersect: [["Partner filter", "Cut to Twin Atlas brands; others removed without naming them"], ["Owner filter and grouping", "Kept (owners already show on their products)"], ["Internal notes column", "Removed"], ["Needs stage review queue", "Team-only; view shows All with a note"], ["Archive queue", "Team-only; view shows All with a note"], ["Store selection on Home sales", "Cut to Twin Atlas Official Store"]] },
  "Partner Viewer": { desc: "Read-only Twin Atlas users.", pages: "VOOOOOOONNN", tools: "N", actions: [["Products", "View only"], ["Views", "Save private only"]], fields: [["Internal notes", "Removed"], ["Vendor names", "Aliases only"], ["Quote prices and tiers", "Hidden"], ["Actual PO costs", "Hidden"], ["Target landed cost", "Visible"], ["Sales", "Twin Atlas store only"], ["Attachments", "Shared files only"]], partners: "Twin Atlas", stores: "Twin Atlas Official Store", ip: "No restriction", intersect: [["Partner filter", "Cut to Twin Atlas brands"], ["Internal notes column", "Removed"], ["Price columns", "Removed"], ["Needs stage review queue", "Team-only; view shows All with a note"]] },
};
const PAGES = ["Home", "Products", "Quotes", "Purchase orders", "Inventory", "Shipments", "Approvals", "Invoices", "QuickBooks", "Vendors & factories", "Users & roles"];

export const ALIAS_HISTORY = { "Shenzhen Apparel Co.": [["Jun 2026", "Legal name changed from “SZ Apparel Trading”. Alias Bravo kept."]], "Hangzhou Knitworks": [["Sep 2026", "Added as a new factory. Alias Golf assigned."]] };
export const MATCHES = [
  { raw: "Dongguan Toys Co., Ltd.", src: "INV-3312 PDF", vendor: "Dongguan Toys", how: "Exact legal name on file", conf: 0.99, inv: "INV-3312" },
  { raw: "DG Toys Ltd", src: "INV-3325 PDF", vendor: "Dongguan Toys", how: "AI proposal AI-104, approved by Priya Shah", conf: 0.86, inv: "INV-3325", ai: "AI-104" },
  { raw: "Yiwu Pkg", src: "INV-3301 PDF", vendor: "Yiwu Packaging", how: "AI proposal AI-101, auto-applied (tax ID match)", conf: 0.98, inv: "INV-3301", ai: "AI-101" },
  { raw: "Ningbo Metal Works Co", src: "INV-3318 PDF", vendor: "Ningbo Metalworks", how: "Matched by hand after AI-095 was dismissed", conf: null, inv: "INV-3318", ai: "AI-095" },
  { raw: "Shenzhen Apparel", src: "INV-3330, typed in", vendor: "Shenzhen Apparel Co.", how: "Name contains a known name", conf: 0.93, inv: "INV-3330" },
];
export const SERVICE_VENDORS = [{ name: "Harborline Freight (synthetic)", type: "Freight forwarder", region: "Shenzhen / Long Beach" }, { name: "PackRight 3PL (synthetic)", type: "Warehouse", region: "Ontario, CA" }];

export const QB_MAP = [
  ["Customers", "Twin Atlas", "Twin Atlas Studios (mock customer)", null], ["Customers", "Sample Partner K (synthetic)", "Partner K (mock customer)", null],
  ["Products / items", "SON-PW2-STD, Sonaria Plush Wave 2", "Plush, Wave 2 (mock item)", null], ["Products / items", "WZ-HD-BLK, World Zero Hoodie", "Apparel, Hoodie Black (mock item)", null], ["Products / items", "SON-PW1-RST, Wave 1 restock", "", "INV-3325"],
  ["Cost accounts", "Production", "COGS, Production (mock)", null], ["Cost accounts", "Samples", "COGS, Samples (mock)", null], ["Cost accounts", "Freight", "COGS, Freight (mock)", null], ["Cost accounts", "Tooling", "Fixed assets, Molds (mock)", null], ["Cost accounts", "Packaging", "", "INV-3301"],
  ["Invoice categories", "Factory bill: deposit / balance / sample", "Bill (mock)", null], ["Invoice categories", "Reimbursement to partner", "Invoice, Reimbursed costs (mock)", null],
  ["Tax", "Factory bills", "No tax (mock)", null], ["Tax", "Reimbursement invoices", "Out of scope (mock)", null],
  ["Payment terms", "30/70", "Custom 30/70 (mock)", null], ["Payment terms", "100% upfront", "Due on receipt (mock)", null], ["Payment terms", "Partner invoices", "Net 30 (mock)", null],
];
export const QB_ACCOUNT_OPTS = ["COGS, Packaging (mock)", "COGS, Production (mock)", "Expenses, Supplies (mock)"];
export const QB_ITEM_OPTS = ["Plush, Wave 1 (mock item)", "Plush, Wave 2 (mock item)"];

export const STORES = [
  { id: "twinatlas", name: "Twin Atlas Official Store", status: "Needs attention", last: "Sep 29, 9:41 AM", eligible: 18, covered: 16, unmapped: 1, failures: [["Sep 28, 6:10 PM", "Price push failed", "Sonaria Plush Wave 2"], ["Sep 29, 9:41 AM", "Variant not mapped", "World Zero Hoodie (Black)"]], history: "Jan 1, 2024 to today", gaps: [] },
  { id: "quataun", name: "Quataun Store", status: "Healthy", last: "Sep 29, 9:40 AM", eligible: 24, covered: 24, unmapped: 0, failures: [], history: "Jan 1, 2024 to today", gaps: [] },
  { id: "ftf", name: "Flee The Facility Store", status: "Partial", last: "Sep 29, 9:38 AM", eligible: 31, covered: 27, unmapped: 4, failures: [], history: "Partial: Mar 2–9, 2025 missing", gaps: [["Mar 2–9, 2025", 8]] },
  { id: "lootbloc", name: "Lootbloc", status: "Unknown", last: "No successful check in 3 days", eligible: 12, covered: null, unmapped: null, failures: [["Sep 26, 11:02 AM", "Mock check timed out", ""]], history: "Unknown before Jun 1, 2025 (never backfilled)", gaps: [["Jan 1, 2024 – May 31, 2025", 517]] },
];

export const AI = [
  { id: "AI-107", status: "pending", kind: "Line mapping", source: "Invoice import, INV-3325 PDF", proposal: "Map line “Wave1 restock plush” to QuickBooks item “Plush, Wave 1 (mock item)”", conf: 0.74, reason: "SKU prefix SON-PW1 and description match an existing product; no earlier mapping.", entity: ["Invoice", "INV-3325", "Invoices.dc.html?open=INV-3325"], change: [["QuickBooks item for SON-PW1-RST", "Not mapped", "Plush, Wave 1 (mock item)"]] },
  { id: "AI-108", status: "pending", kind: "Quote extraction", source: "Quote email, Sep 27", proposal: "Create a quote draft for Sonaria Pin Set: 3,000 pcs at $0.74", conf: 0.68, reason: "Read a price table from the PDF attachment. MOQ wording is unclear.", entity: ["Product", "Sonaria Pin Set", "Products.dc.html?open=Sonaria%20Pin%20Set&tab=costs"], change: [["New quote draft", "—", "3,000 pcs, $0.74/unit, Manufacturer Echo"]] },
  { id: "AI-109", status: "pending", kind: "Shopify match", source: "Shopify sync, Twin Atlas Official Store", proposal: "Link Shopify variant “Hoodie / XXL” to WZ-HD-BLK-XXL", conf: 0.81, reason: "Title and option match; the Shopify SKU is blank.", entity: ["Product", "World Zero Hoodie (Black)", "Products.dc.html?open=World%20Zero%20Hoodie%20(Black)&tab=integrations"], change: [["Variant mapping", "Unmapped", "WZ-HD-BLK-XXL"]] },
  { id: "AI-104", status: "approved", kind: "Vendor match", source: "Invoice import, INV-3325 PDF", proposal: "Match supplier “DG Toys Ltd” to Dongguan Toys (Alpha)", conf: 0.86, reason: "Same bank account and address as 3 earlier invoices; name is an abbreviation.", entity: ["Invoice", "INV-3325", "Invoices.dc.html?open=INV-3325"], decided: "Sep 24, Priya Shah", change: [["Vendor", "Unmatched", "Dongguan Toys"]] },
  { id: "AI-101", status: "auto", kind: "Vendor match", source: "Invoice import, INV-3301 PDF", proposal: "Match “Yiwu Pkg” to Yiwu Packaging (Echo)", conf: 0.98, reason: "Tax ID matches the vendor on file.", entity: ["Invoice", "INV-3301", "Invoices.dc.html?open=INV-3301"], decided: "Sep 14, auto-applied (rule: 95%+ with ID match, mock)", change: [["Vendor", "Unmatched", "Yiwu Packaging"]] },
  { id: "AI-102", status: "auto", kind: "Inventory", source: "Shopify sync, Twin Atlas Official Store", proposal: "Update on-hand for World Zero Mug (Logo) from 140 to 138", conf: 0.99, reason: "Two orders shipped outside the warehouse feed.", entity: ["Product", "World Zero Mug (Logo)", "Products.dc.html?open=World%20Zero%20Mug%20(Logo)"], decided: "Sep 28, auto-applied (mock)", change: [["On hand", "140", "138"]] },
  { id: "AI-095", status: "dismissed", kind: "Vendor match", source: "Invoice import, INV-3318 PDF", proposal: "Create new vendor “Ningbo Metal Works Co”", conf: 0.41, reason: "Low similarity to known vendors.", entity: ["Invoice", "INV-3318", "Invoices.dc.html?open=INV-3318"], decided: "Sep 15, Sam Kim: matched by hand to Ningbo Metalworks", change: [["Vendor", "Unmatched", "New vendor"]] },
];
export const UNMAPPED = [
  ["Shopify variant “Hoodie / XXL”", "Twin Atlas Official Store", "shopify", "Proposal AI-109"],
  ["Invoice line “Wave1 restock plush”", "INV-3325 PDF", "quickbooks", "Proposal AI-107"],
  ["Expense category “Packaging”", "INV-3301 export", "quickbooks", "No proposal yet"],
  ["4 variants without SKUs", "Flee The Facility Store", "shopify", "No proposal yet"],
];

export const ACTIVITY = [
  ["Sep 29, 10:02 AM", "System (prototype)", "Saved view", "", "Shared view “Stage review by owner” opened by a Twin Atlas user", "Adapted for their access: a Lootbloc-only column and a team-only queue weren't applied", "Views", "Adapted"],
  ["Sep 29, 9:41 AM", "System (mock)", "Product", "World Zero Hoodie (Black)", "Shopify check: variant XXL still unmapped", "", "Shopify sync", "Warning"],
  ["Sep 29, 9:12 AM", "Priya Shah", "Invoice", "R-DRAFT-2", "Added INV-3312 rework fee ($150.00) to reimbursement draft", "", "Invoices", "Done"],
  ["Sep 28, 6:10 PM", "System (mock)", "Product", "Sonaria Plush Wave 2", "Price push to Shopify", "Shopify price $27.99 doesn't match $29.99", "Shopify sync", "Failed"],
  ["Sep 28, 3:30 PM", "System (mock)", "Product", "World Zero Mug (Logo)", "AI-102 auto-applied: on hand 140 → 138", "", "AI review", "Done"],
  ["Sep 27, 4:05 PM", "Jordan Reyes", "Invoice", "INV-3330", "Typed in by hand, no PDF", "", "Invoices", "Done"],
  ["Sep 24, 11:20 AM", "Priya Shah", "Invoice", "INV-3325", "Approved AI-104: supplier matched to Dongguan Toys", "", "AI review", "Done"],
  ["Sep 22, 2:00 PM", "Priya Shah", "Invoice", "QB-7711", "Marked sent to Twin Atlas (mock QuickBooks)", "", "Invoices", "Done"],
  ["Sep 18, 10:15 AM", "Jordan Reyes", "Purchase order", "PO-1043", "Created, 2,400 units", "", "Purchase orders", "Done"],
  ["Sep 15, 9:00 AM", "System (mock)", "Invoice", "INV-3301", "QuickBooks export", "No expense account for Packaging", "QuickBooks", "Failed"],
  ["Sep 15, 8:45 AM", "Sam Kim", "Invoice", "INV-3318", "Dismissed AI-095; matched vendor by hand", "", "AI review", "Done"],
  ["Sep 12, 5:40 PM", "Maya Park", "Product", "World Zero Hoodie (Black)", "Tech pack v3 uploaded", "", "Resources", "Done"],
];

export const TASKS = [
  { id: "T-201", t: "Chase partner approval", ent: ["Product", "Sonaria Glacier Plush"], who: "JR", due: "Sep 29", status: "To do" },
  { id: "T-202", t: "Send rev 2 photos to Twin Atlas", ent: ["Product", "Sonaria Glacier Plush"], who: "JR", due: "Sep 27", status: "Done" },
  { id: "T-203", t: "Create restock PO for L and M", ent: ["Product", "World Zero Hoodie (Black)"], who: "JR", due: "Sep 29", status: "To do" },
  { id: "T-204", t: "Weekly stock check", ent: ["Page", "Inventory"], who: "SK", due: "Oct 5", status: "To do", rule: "Every Monday", every: 7, until: D(11, 31) },
  { id: "T-205", t: "QuickBooks reconciliation", ent: ["Tool", "QuickBooks"], who: "PS", due: "Oct 1", status: "To do", rule: "Monthly on the 1st", monthly: true },
  { id: "T-206", t: "Pay INV-3322 sample invoice", ent: ["Invoice", "INV-3322"], who: "PS", due: "Oct 1", status: "To do" },
  { id: "T-207", t: "Ask factory for the INV-3330 PDF", ent: ["Invoice", "INV-3330"], who: "JR", due: "Sep 30", status: "In progress" },
  { id: "T-208", t: "Confirm QC report", ent: ["Purchase order", "PO-1045"], who: "SK", due: "Oct 1", status: "In progress" },
  { id: "T-209", t: "Check SH-2291 tracking", ent: ["Shipment", "SH-2291"], who: "SK", due: "Sep 28", status: "To do" },
  { id: "T-211", t: "Split deposit invoice with factory", ent: ["Purchase order", "PO-1043"], who: "PS", due: "Oct 2", status: "To do" },
  { id: "T-212", t: "Ask carrier for new ETA", ent: ["Purchase order", "PO-1038"], who: "SK", due: "Sep 30", status: "In progress" },
  { id: "T-213", t: "Book receiving slot at warehouse", ent: ["Purchase order", "PO-1038"], who: "SK", due: "Oct 3", status: "To do" },
  { id: "T-214", t: "Review S4 figure sample photos", ent: ["Purchase order", "PO-1050"], who: "MP", due: "Oct 4", status: "To do" },
  { id: "T-215", t: "Confirm colorway with factory", ent: ["Purchase order", "PO-1047"], who: "JR", due: "Sep 26", status: "Done" },
  { id: "T-216", t: "Log sample arrival", ent: ["Purchase order", "PO-1047"], who: "JR", due: "Oct 3", status: "To do" },
  { id: "T-217", t: "Approve S3 carton labels", ent: ["Purchase order", "PO-1040"], who: "MP", due: "Oct 6", status: "To do" },
  { id: "T-218", t: "Tell Twin Atlas about the delay", ent: ["Shipment", "SH-2291"], who: "MP", due: "Sep 29", status: "Done" },
  { id: "T-219", t: "Check customs paperwork", ent: ["Shipment", "SH-2311"], who: "SK", due: "Oct 2", status: "To do" },
  { id: "T-220", t: "Count S3 boxes on arrival", ent: ["Shipment", "SH-2310"], who: "SK", due: "Oct 8", status: "To do" },
  { id: "T-210", t: "Partner launch check-in", ent: ["Partner", "Twin Atlas"], who: "MP", due: "Oct 2", status: "To do", rule: "Every 2 weeks on Friday", every: 14, until: D(11, 31) },
];
export const STUDIOS = [
  { id: "ta", name: "Twin Atlas", type: "Licensing partner (studio)", status: "Active", tier: "Not set in prototype", royalty: "Terms live in the signed agreement. Not shown or calculated here.", brands: ["World Zero", "Creatures of Sonaria"], shopify: "Twin Atlas Official Store, mapped (mock)", users: 2 },
  { id: "lb", name: "Lootbloc (in-house)", type: "In-house brand", status: "Active", tier: "—", royalty: "Not applicable", brands: ["Lootbloc"], shopify: "Lootbloc, status unknown (mock)", users: 5 },
  { id: "k", name: "Sample Partner K (synthetic)", type: "Synthetic test partner", status: "Test only", tier: "—", royalty: "Not recorded", brands: [], shopify: "Not connected", users: 1 },
];
const HOLIDAYS = [[D(8, 25), D(8, 25), "Mid-Autumn holiday (typical factory closure)"], [D(9, 1), D(9, 7), "National Day week (typical factory closure)"]];

export function buildModule(m, X) {
  const { S, set, go, P, IV, PD, href, tones, TK, comp, role, phone } = X; const T = tones;
  const tn = k => !k || k === "neutral" || k === "none" || !T[k] ? { ink: "var(--fg2)", soft: "var(--sunk)", bar: "var(--fg3)" } : T[k];
  const pill = (label, k) => ({ label, ink: tn(k).ink, soft: tn(k).soft });
  const linkV = (type, id) => { if (type === "Product") { const th = TK && comp ? TK.thumb(comp, id) : { has: false }; return { hasImg: true, hasChip: false, img: { has: !!th.has, none: !th.has, src: th.src || "", bgImg: th.bgImg || "none", ini: String(id).slice(0, 1), name: id }, chip: {} }; }
    const IC = { "Purchase order": "icon-package", Invoice: "icon-receipt", Shipment: "icon-truck", Partner: "icon-building-2", Page: "icon-layout-grid", Tool: "icon-wrench", Quote: "icon-badge-dollar-sign" };
    return { hasImg: false, hasChip: true, img: {}, chip: { label: id, icon: IC[type] || "icon-link", aria: type + " " + id } }; };
  const cell = (t, o = {}) => ({ hasImg: !!(o.link && o.link.hasImg), hasChip: !!(o.link && o.link.hasChip), img: o.link ? o.link.img : {}, chip: o.link ? o.link.chip : {}, t: o.link || t == null ? "" : String(t), sub: o.sub || "", b: o.b ? 700 : 500, hasPill: !!o.pill && !o.sel, pl: o.pill ? o.pill.label : "", pInk: o.pill ? o.pill.ink : "", pSoft: o.pill ? o.pill.soft : "", align: o.right ? "right" : "left", hasSel: !!o.sel, selAria: o.sel ? o.sel.aria : "", stop: e => e.stopPropagation(),
    selOpen: o.sel ? e => { e.stopPropagation(); e.preventDefault(); const b = e.currentTarget.getBoundingClientRect(); const wd = 240, h = 52 + 40 * o.sel.opts.length; let x = Math.min(b.left, window.innerWidth - wd - 8); let y = b.bottom + 6; if (y + h > window.innerHeight - 8) y = Math.max(8, b.top - 6 - h); comp.setState({ wdd: { x, y, w: wd, title: o.sel.title, current: o.sel.v, options: o.sel.opts, onPick: o.sel.pick } }); } : null });
  const L = (label, icon, fn) => ({ label, icon, go: fn, isBtn: true, isA: false });
  const A = (label, icon, h) => ({ label, icon, href: href(h), isBtn: false, isA: true });
  const row = (main, o = {}) => ({ main, sub: o.sub || "", right: o.right || "", tag: o.tag ? o.tag.label : "", tagInk: o.tag ? o.tag.ink : "", tagSoft: o.tag ? o.tag.soft : "", links: o.links || [], hasLinks: !!(o.links && o.links.length), fw: o.fw || 600 });
  const blk = (title, o = {}) => ({ title: title || "", sub: o.sub || "", note: o.note || "", noteIcon: o.noteIcon || "icon-info", noteInk: o.noteInk || "var(--blue)", noteSoft: o.noteSoft || "var(--blueSoft)", rows: o.rows || [], hasRows: !!((o.rows && o.rows.length) || (o.totals && o.totals.length)), totals: (o.totals || []).map(([l, v]) => ({ l, v, fw: 700, ink: "var(--fg)" })), actions: o.actions || [], hasActions: !!(o.actions && o.actions.length), actionNote: o.actionNote || "", fields: o.fields || [], hasFields: !!(o.fields && o.fields.length) });
  const btn = (label, fn, primary, pressed) => ({ label, do: fn, bg: primary ? "var(--brand)" : "var(--surface)", fg: primary ? "white" : "var(--fg)", bd: primary ? "var(--brand)" : "var(--line)", pressed: String(!!pressed) });
  const sub = (list, cur, key) => list.map(([k, l, n]) => ({ label: l, count: n == null ? "" : String(n), on: String(cur === k), bd: cur === k ? "var(--brand)" : "transparent", fg: cur === k ? "var(--fg)" : "var(--fg2)", bg: cur === k ? "var(--surface)" : "transparent", sh: cur === k ? "0 1px 2px var(--shc), 0 0 0 1px var(--line)" : "none", pick: () => { if (guard()) return; set({ [key || "sub"]: k, sel: null, pv: null }); } }));
  const flt = (key, label, opts, any) => ({ label, aria: label + " filter", value: S.f[key] || "any", bd: (S.f[key] || "any") !== "any" ? "var(--brand)" : "var(--line)", opts: [{ v: "any", l: any || "Any" }, ...opts.map(o => Array.isArray(o) ? { v: o[0], l: o[1] } : { v: o, l: o })], set: e => set({ f: { ...S.f, [key]: e.target.value }, sel: null }) });
  const fv = k => S.f[k] || "any";
  const entHref = (type, id) => type === "Product" ? "Products.dc.html?open=" + encodeURIComponent(id) : type === "Invoice" ? "Invoices.dc.html?open=" + id : type === "Purchase order" ? "Purchase Orders.dc.html?open=" + id : type === "Shipment" ? "Shipments.dc.html" : type === "Page" ? id + ".dc.html" : null;
  const entLink = (type, id) => { if (type === "Tool") return L("Open " + id, "icon-arrow-right", () => go(id.toLowerCase().replace(/ .*/, ""))); if (type === "Partner") return L("Open " + id, "icon-building-2", () => go("partners", { sel: "ta" })); if (type === "Saved view") return L("Open Products views", "icon-layout-list", () => { location.href = href("Products.dc.html"); }); const h = entHref(type, id); return h ? A("Open " + id, "icon-arrow-up-right", h) : null; };
  const vm = { tabs: [], filters: [], kpis: [], notes: [], actions: [], view: "table", table: null, board: null, cal: null, tl: null, det: null, empty: "" };
  const WS = S.ws || {}; const sortBy = (list, key, fns) => { const f = fns[key]; if (!f) return list; const d = WS.d === "desc" ? -1 : 1; return [...list].sort((a, b) => d * f(a, b)); };
  const sh = (label, k) => ({ __s: true, label, k });
  if (comp) comp.__wsEd = null;
  const guard = () => !!(TK && comp && TK.svGuard(comp));
  // In-panel editing: drafts live in S.wed until the save pill commits them to the local overrides store.
  const edFields = (page, id, rec, defs, canEd, name, after) => { const k = page + ":" + id; const ed = S.wed && S.wed.k === k ? S.wed : { k, f: {} };
    const upd = (key, v) => { if (S.svb) return; comp.setState(st => { const cur = st.wed && st.wed.k === k ? st.wed : { k, f: {} }; const f = { ...cur.f }; if (String(v) === String(rec[key] ?? "")) delete f[key]; else f[key] = v; return { wed: { k, f } }; }); };
    if (canEd && comp && TK && Object.keys(ed.f).length) comp.__wsEd = { dirty: true, label: "Unsaved changes", doneMsg: name + " saved", ms: 700,
      validate: () => { const req = defs.find(d => d[3] && d[3].req && !String(ed.f[d[0]] ?? rec[d[0]] ?? "").trim()); if (req) return req[1] + " can't be empty"; const nb = defs.find(d => d[3] && d[3].num && d[0] in ed.f && String(ed.f[d[0]]).trim() !== "" && !/^\d+$/.test(String(ed.f[d[0]]).trim())); return nb ? nb[1] + " must be a whole number" : ""; },
      onSave: () => { const patch = { ...ed.f }; defs.forEach(d => { if (d[3] && d[3].num && d[0] in patch) patch[d[0]] = String(patch[d[0]]).trim() === "" ? null : +patch[d[0]]; }); TK.patchOv(comp, page, [id], patch); comp.setState({ wed: null }); if (after) after(patch); },
      onDiscard: () => comp.setState({ wed: null }) };
    return defs.map(([key, label, kf, o = {}]) => { const v = key in ed.f ? ed.f[key] : (rec[key] ?? ""); const kk = canEd && kf !== "ro" ? kf : "ro"; const opts = (o.opts || []).map(x => ({ v: x, l: x })); if (kk === "sel" && v !== "" && !opts.some(x => x.v === v)) opts.unshift({ v, l: v });
      return { label, ro: kk === "ro", isSel: kk === "sel", isText: kk === "text", isArea: kk === "area", draft: v == null ? "" : String(v), value: v === "" || v == null ? "—" : String(v), c: "var(--fg)", bd: key in ed.f ? "var(--brand)" : "var(--line)", opts, set: e => upd(key, e.target.value), ph: o.ph || "", im: o.num ? "numeric" : "text", hint: o.hint || "", col: kf === "area" || o.wide ? "1 / -1" : "auto" }; }); };
  const table = (cols0, grid0, rows, selId, off) => { const labOf = c => c && c.__s ? c.label : Array.isArray(c) ? c[0] : c; const hid = (S.wsHide || {})[m] ?? (off || []);
    const tracks = String(grid0).match(/(?:[^\s(]|\([^)]*\))+/g) || []; const canHide = tracks.length === cols0.length;
    const vis = i => !canHide || i === 0 || !labOf(cols0[i]) || !hid.includes(labOf(cols0[i]));
    const ordL = (S.wsOrd || {})[m] || []; const pos = i => { const p = ordL.indexOf(labOf(cols0[i])); return p < 0 ? 1000 + i : p; };
    const rest = cols0.map((_, i) => i).slice(1); if (canHide) rest.sort((a, b) => pos(a) - pos(b)); const idx = [0, ...rest].filter(vis); const cols = idx.map(i => cols0[i]); const grid = canHide ? idx.map(i => tracks[i]).join(" ") : grid0;
    const restL = rest.map(i => labOf(cols0[i])).filter(Boolean);
    const colMenu = canHide ? restL.map(l => { const on = !hid.includes(l); return { k: l, label: l, on, toggle: () => set({ wsHide: { ...(S.wsHide || {}), [m]: on ? [...hid, l] : hid.filter(x => x !== l) } }),
      moveTo: t => { const o = [...restL]; const i = o.indexOf(l), j = o.indexOf(t); if (i < 0 || j < 0 || i === j) return; o.splice(i, 1); o.splice(j, 0, l); set({ wsOrd: { ...(S.wsOrd || {}), [m]: o } }); } }; }) : [];
    const sortOpts = cols0.filter(c => c && c.__s).map(c => [c.k, c.label]);
    return { colMenu, sortOpts, cols: cols.map(c => { if (c && c.__s) { const on = WS.k === c.k, d = on && WS.d === "desc"; return { label: c.label, align: "left", sortable: true, plain: false, icon: on ? (d ? "icon-arrow-down" : "icon-arrow-up") : "icon-arrow-up-down", c: on ? "var(--fg)" : "inherit", aria: "Sort by " + c.label + (on ? (d ? ", descending" : ", ascending") : ""), do: () => set({ ws: { k: c.k, d: on && !d ? "desc" : "asc" } }) }; } return { label: Array.isArray(c) ? c[0] : c, align: Array.isArray(c) && c[1] ? "right" : "left", sortable: false, plain: true }; }), grid, rows: rows.map(r => ({ id: r.id, cells: idx.map(i => ({ ...r.cells[i], lab: labOf(cols0[i]) })).filter(c => c.lab !== undefined || true), open: () => { if (S.sel !== r.id && guard()) return; set({ sel: r.id, dtab: "overview", pv: null }); }, key: e => { if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) { e.preventDefault(); if (S.sel !== r.id && guard()) return; set({ sel: r.id, dtab: "overview", pv: null }); } }, bg: selId === r.id ? "var(--sunk)" : "transparent", aria: "Open " + (r.aria || r.id) })) }; };
  const detail = (o) => ({ kind: o.kind, title: o.title, sub: o.sub || "", pills: o.pills || [], tabs: (o.tabs || []).map(([k, l]) => ({ label: l, on: String((S.dtab || "overview") === k), bd: (S.dtab || "overview") === k ? "var(--brand)" : "transparent", fg: (S.dtab || "overview") === k ? "var(--fg)" : "var(--fg2)", bg: (S.dtab || "overview") === k ? "var(--surface)" : "transparent", sh: (S.dtab || "overview") === k ? "0 1px 2px var(--shc), 0 0 0 1px var(--line)" : "none", pick: () => set({ dtab: k, pv: null }) })), blocks: o.blocks, titleEd: o.titleEd || null, close: () => { if (guard()) return; set({ sel: null, pv: null }); } });
  const dtab = S.dtab || "overview";
  const wire = (cfg) => { if (!TK || !comp || !vm.table) return; const g = TK.generic(comp, { phone, bgKey: "bg", rows: vm.table.rows, rowId: r => r.id, ...cfg }); Object.assign(vm, { tk: g }); };
  const archM = k => !!(S.warch || {})[k]; const setArchM = k => v => set({ warch: { ...(S.warch || {}), [k]: v }, sel: null });

  if (m === "users") {
    const tab = S.sub || "users";
    vm.tabs = sub([["users", "Users", USERS.length], ["roles", "Roles", Object.keys(ROLES).length], ["check", "Access check", null]], tab);
    vm.notes = ["Mock roles. Edits only change this prototype, never real access. Contact details are hidden."];
    const listU = TK && comp ? TK.mergeOv(comp, "users", USERS, u => u.id) : USERS; const canUU = !!(TK && TK.can(role, "user.update"));
    const roleDetail = (name) => { const R = ROLES[name]; const pv = S.pv && S.pv.role === name ? S.pv : null;
      const lv = c => ({ F: "green", V: "blue", O: "blue", B: "amber", N: "neutral" })[c];
      const blocks = [];
      if (dtab === "overview") blocks.push(blk("Scope", { rows: [row("Studio / partner", { right: R.partners }), row("Shopify stores", { right: R.stores }), row("IP restriction", { right: R.ip }), row("Users with this role", { right: String(USERS.filter(u => u.role === name).length) })] }), blk("Who has it", { rows: USERS.filter(u => u.role === name).map(u => row(u.name, { sub: u.scope + ", last active " + u.last, tag: pill(u.status, u.status === "Active" ? "green" : "neutral") })) }));
      if (dtab === "pages") blocks.push(blk("Page access", { rows: PAGES.map((p, i) => row(p, { tag: pill(LVL[R.pages[i]], lv(R.pages[i])), sub: R.pages[i] === "B" ? "Prototype proposal: the live nav marks Invoices admin-only" : "" })).concat([row("More tools (tasks, calendar, AI review…)", { tag: pill(LVL[R.tools], lv(R.tools)) })]) }));
      if (dtab === "actions") blocks.push(blk("Object actions", { rows: R.actions.map(([o, a]) => row(o, { sub: a })) }));
      if (dtab === "fields") { blocks.push(blk("Field visibility", { rows: R.fields.map(([f, v]) => row(f, { right: v, links: name.startsWith("Partner") && f === "Target landed cost" ? [L(pv ? "Hide preview" : "Preview hiding it", "icon-eye", () => set({ pv: pv ? null : { role: name, field: f } }))] : [] })) }));
        if (pv) blocks.push(blk("Preview (not saved)", { rows: [row(pv.field + " for " + name, { right: "Visible → Hidden" }), row("Users affected", { right: String(USERS.filter(u => u.role === name).length) }), row("Where it would disappear", { sub: "Product Overview details, list Cost column, shared views with that column" })], actions: [btn("Discard preview", () => set({ pv: null }))], actionNote: "Preview only. No role is changed." })); }
      if (dtab === "views") blocks.push(blk("When this role opens a shared view", { sub: "Applied on every load", rows: R.intersect.map(([k, v]) => row(k, { right: v, tag: /Kept|Kept \(/.test(v) ? pill("Kept", "green") : pill("Adapted", "amber") })) }), blk("", { note: "Shared views never widen access. Example in Activity: “Stage review by owner” adapted for a Twin Atlas user.", actions: [btn("See it in Activity", () => go("activity", { f: { src: "Views" } }))] }));
      return detail({ kind: "Role", title: name, sub: R.desc, pills: [pill(R.partners, "blue")], tabs: [["overview", "Scope"], ["pages", "Page access"], ["actions", "Actions"], ["fields", "Fields"], ["views", "Shared views"]], blocks }); };
    if (tab === "users") { const rows = listU.filter(u => (fv("role") === "any" || u.role === fv("role")) && (fv("scope") === "any" || u.scope === fv("scope")));
      vm.filters = [flt("role", "Role", Object.keys(ROLES)), flt("scope", "Scope", [...new Set(USERS.map(u => u.scope))])];
      vm.table = table(["Name", "Role", "Scope", "IP restriction", "Last active", "Status", "More tools"], "minmax(0,1.2fr) 140px minmax(0,1.2fr) 150px 110px 130px 120px", rows.map(u => ({ id: u.id, aria: u.name, cells: [cell(u.name, { b: 1, sub: "Contact hidden in prototype" }), cell(u.role), cell(u.scope), cell(u.ip), cell(u.last), cell("", { pill: pill(u.status, u.status === "Active" ? "green" : "neutral") }), cell(ROLES[u.role] ? LVL[ROLES[u.role].tools] : "—")] })), S.sel, ["More tools"]);
      const scopes = [...new Set(USERS.map(x => x.scope))], ips = [...new Set(USERS.map(x => x.ip))], sts = [...new Set(["Active", "Invited", "Deactivated", ...USERS.map(x => x.status)])];
      wire({ key: "users", page: "users", all: listU, id: x => x.id, label: x => x.name, noun: "user", sig: JSON.stringify([S.f]), allowed: canUU, canU: canUU,
        fields: { role: { label: "Role", kind: "select", options: Object.keys(ROLES), get: x => x.role, icon: "icon-shield" }, status: { label: "Status", kind: "select", options: sts, get: x => x.status, icon: "icon-power" }, scope: { label: "Scope", kind: "select", options: scopes, get: x => x.scope }, ip: { label: "IP restriction", kind: "select", options: ips, get: x => x.ip } },
        quick: ["role", "status"], moreKeys: ["role", "status", "scope", "ip"] });
      const u = listU.find(x => x.id === S.sel); if (u && ROLES[u.role]) { const rd = roleDetail(u.role);
        const ub = blk("User", { sub: canUU ? "" : "Only admins can edit users", fields: edFields("users", u.id, u, [["name", "Name", "text", { req: 1 }], ["role", "Role", "sel", { opts: Object.keys(ROLES) }], ["scope", "Scope", "sel", { opts: scopes }], ["ip", "IP restriction", "sel", { opts: ips }], ["status", "Status", "sel", { opts: sts }], ["last", "Last active", "ro"]], canUU, u.name) });
        vm.det = { ...rd, blocks: dtab === "overview" ? [ub, ...rd.blocks] : rd.blocks, kind: "User", title: u.name, sub: u.role + ", " + u.scope + ". " + ROLES[u.role].desc, pills: [pill(u.status, u.status === "Active" ? "green" : "neutral")] }; }
      vm.empty = "No users match these filters."; }
    if (tab === "roles") { vm.table = table(["Role", "Scope", "Users", "More tools", "IP restriction"], "minmax(0,1fr) minmax(0,1.3fr) 80px 120px minmax(0,1.2fr)", Object.entries(ROLES).map(([n, R]) => ({ id: n, cells: [cell(n, { b: 1, sub: R.desc }), cell(R.partners), cell(USERS.filter(u => u.role === n).length), cell("", { pill: pill(LVL[R.tools], R.tools === "N" ? "neutral" : "blue") }), cell(R.ip)] })), S.sel);
      if (ROLES[S.sel]) vm.det = roleDetail(S.sel); }
    if (tab === "check") { const uid = S.f.cu || "u6", area = S.f.ca || "Invoices"; const u = USERS.find(x => x.id === uid); const R = ROLES[u.role]; const i = PAGES.indexOf(area); const c = i >= 0 ? R.pages[i] : R.tools;
      vm.filters = [{ label: "User", aria: "User", value: uid, bd: "var(--line)", opts: USERS.map(x => ({ v: x.id, l: x.name })), set: e => set({ f: { ...S.f, cu: e.target.value } }) }, { label: "Area", aria: "Area", value: area, bd: "var(--line)", opts: [...PAGES, "More tools"].map(p => ({ v: p, l: p })), set: e => set({ f: { ...S.f, ca: e.target.value } }) }];
      vm.view = "blocks"; vm.blocks = [blk("Result", { rows: [row(u.name + " → " + area, { tag: pill(LVL[c], c === "N" ? "neutral" : c === "F" ? "green" : "blue"), sub: "Because role " + u.role + (c === "N" ? " has no access to this area." : " gives " + LVL[c].toLowerCase() + " access, limited to " + R.partners + ".") }), row("Fields", { sub: R.fields.map(f => f[0] + ": " + f[1]).join(", ") }), row("Stores", { right: R.stores })], actions: [btn("Open role " + u.role, () => set({ sub: "roles", sel: u.role, dtab: "overview" }))] })]; }
    return vm;
  }
  if (m === "vendors") {
    const VA = P.VENDOR_ALIAS; const fac = Object.keys(VA);
    const LEAD = { "Dongguan Toys": 35, "Shenzhen Apparel Co.": 38, "Guangzhou Figures": 45, "Ningbo Metalworks": 30, "Yiwu Packaging": 21, "Suzhou Softgoods": 42, "Hangzhou Knitworks": 33 }; const UPD = { "Dongguan Toys": "Sep 24", "Shenzhen Apparel Co.": "Sep 26", "Guangzhou Figures": "Sep 8", "Ningbo Metalworks": "Sep 15", "Yiwu Packaging": "Sep 14", "Suzhou Softgoods": "Sep 5", "Hangzhou Knitworks": "Sep 27" };
    const list0 = [...fac.map(n => ({ name: n, kind: "Factory", alias: "Manufacturer " + VA[n], region: "China", country: "China", lead: LEAD[n] || null, updated: UPD[n] || "Aug 1", active: "Active" })), ...SERVICE_VENDORS.map(v => ({ name: v.name, kind: v.type, alias: "Not shown to partners", region: v.region, country: /Long Beach|Ontario/.test(v.region) ? "United States" : "China", lead: null, updated: "Aug 20", active: "Active" }))];
    const listAll = TK && comp ? TK.mergeOv(comp, "vendors", list0, v => v.name) : list0; const list = listAll.filter(v => !!v.archived === archM("vendors"));
    const q = (P.QUOTES || []), pos = P.POS, inv = IV.FACTORY;
    vm.tabs = sub([["list", "Vendors", list.length], ["matches", "Import matches", MATCHES.length]], S.sub || "list");
    vm.notes = ["Real names are for the Lootbloc team. Partners only ever see the stable alias. Aliases are never reused."];
    if ((S.sub || "list") === "list") { const VS = { name: ["Name, A to Z", (a, b) => a.name.localeCompare(b.name)], nameZ: ["Name, Z to A", (a, b) => b.name.localeCompare(a.name)], country: ["Country", (a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name)], active: ["Active first", (a, b) => (a.active === "Active" ? 0 : 1) - (b.active === "Active" ? 0 : 1)], lead: ["Shortest lead time", (a, b) => (a.lead ?? 1e9) - (b.lead ?? 1e9)], upd: ["Recently updated", (a, b) => parse(b.updated) - parse(a.updated)] };
      const vsk = S.f.vsort || "name";
      vm.filters = [flt("kind", "Type", ["Factory", "Freight forwarder", "Warehouse"]), flt("act", "Status", ["Active", "Inactive"]), { label: "Sort", aria: "Sort vendors", value: vsk, bd: "var(--line)", opts: Object.entries(VS).map(([v, [l]]) => ({ v, l })), set: e => set({ f: { ...S.f, vsort: e.target.value }, sel: null }) }];
      const vq = (S.f.q || "").trim().toLowerCase(); vm.search = { value: S.f.q || "", ph: "Search vendors", set: e => set({ f: { ...S.f, q: e.target.value } }) };
      const rows = [...list.filter(v => (fv("kind") === "any" || v.kind === fv("kind")) && (fv("act") === "any" || v.active === fv("act")) && (!vq || (v.name + " " + v.country).toLowerCase().includes(vq)))].sort(VS[vsk][1]);
      vm.table = table(["Name", "Type", "Partner sees", "Quotes", "POs", "Open invoices", "Status", "Country", "Region", "Lead time", "Last updated", "Notes"], "minmax(0,1.3fr) 150px minmax(0,1fr) 80px 70px 120px 100px 130px minmax(0,1fr) 100px 120px minmax(0,1.2fr)", rows.map(v => ({ id: v.name, cells: [cell(v.name, { b: 1, sub: v.region }), cell(v.kind), cell(v.alias), cell(q.filter(x => x.vendor === v.name).length), cell(pos.filter(x => x.vendor === v.name).length), cell(inv.filter(x => x.vendor === v.name && !x.archived && x.payments.reduce((s, p) => s + p.amount, 0) < x.total).length), cell("", { pill: pill(v.active || "Active", (v.active || "Active") === "Active" ? "green" : "neutral") }), cell(v.country || "—"), cell(v.region || "—"), cell(v.lead ? v.lead + " days" : "—"), cell(v.updated || "—"), cell(v.notes || "—")] })), S.sel, ["Status", "Country", "Region", "Lead time", "Last updated", "Notes"]);
      wire({ key: "vendors", page: "vendors", all: listAll, id: x => x.name, label: x => x.name, noun: "vendor", sig: JSON.stringify([archM("vendors"), S.f]), allowed: TK && TK.canAny(role, ["vendor.update", "vendor.archive", "vendor.delete"]),
        canU: TK && TK.can(role, "vendor.update"), canA: TK && TK.can(role, "vendor.archive"), canR: TK && TK.can(role, "vendor.update"), canD: TK && TK.can(role, "vendor.delete"), archive: true, archVisible: TK && TK.canAny(role, ["vendor.update", "vendor.archive", "vendor.delete"]), archMode: archM("vendors"), setArch: setArchM("vendors"),
        onArchiveCons: ["Aliases stay reserved and are never reused.", "Quotes, POs and invoices keep the vendor link."],
        fields: { active: { label: "Active", kind: "select", options: ["Active", "Inactive"], get: x => x.active || "Active", icon: "icon-power" }, country: { label: "Country", kind: "text", get: x => x.country || (x.region === "China" ? "China" : "United States") }, lead: { label: "Lead time (days)", kind: "number", get: x => x.lead || "" }, notes: { label: "Notes (Lootbloc only)", kind: "notes", get: x => x.notes || "" } },
        quick: ["active"], moreKeys: ["active", "country", "lead", "notes"] });
      const v = list.find(x => x.name === S.sel);
      if (v) { const blocks = [];
        const canEV = !!(TK && TK.can(role, "vendor.update")) && !v.archived;
        if (dtab === "overview") blocks.push(blk("Details", { sub: v.archived ? "Archived, read-only" : "", fields: edFields("vendors", v.name, v, [["name", "Real name", "ro", { hint: "Lootbloc team only" }], ["kind", "Type", "ro", { hint: v.kind === "Factory" ? "Makes product. Gets an alias for partners." : "Service vendor. Never shown to partners." }], ["alias", "Partners see", "ro", { hint: "Aliases are never reused" }], ["active", "Status", "sel", { opts: ["Active", "Inactive"] }], ["country", "Country", "text"], ["region", "Region", "text"], ["lead", "Lead time (days)", "text", { num: 1, ph: "e.g. 35" }], ["notes", "Notes (Lootbloc only)", "area", { ph: "Only the Lootbloc team sees this" }]], canEV, v.name) }), ...(ALIAS_HISTORY[v.name] ? [blk("Alias history", { rows: ALIAS_HISTORY[v.name].map(([d, t]) => row(t, { sub: d, fw: 500 })) })] : v.kind === "Factory" ? [blk("Alias history", { rows: [row("Alias " + VA[v.name] + " assigned", { sub: "Unchanged since assigned", fw: 500 })] })] : []));
        if (dtab === "linked") { const vq = q.filter(x => x.vendor === v.name), vp = pos.filter(x => x.vendor === v.name), vi = inv.filter(x => x.vendor === v.name);
          blocks.push(blk("Quotes", { sub: "Feed the vendor-grouped Costs on each product", rows: vq.map(x => row(x.id + ", " + x.product, { sub: x.status + ", " + x.tiers.map(t => t.qty + "+ $" + t.unit.toFixed(2)).join(", "), links: [A("Compare in Costs", "icon-badge-dollar-sign", "Products.dc.html?open=" + encodeURIComponent(x.product) + "&tab=costs")] })) }));
          blocks.push(blk("Purchase orders", { rows: vp.map(x => row(x.id + ", " + x.products.join(", "), { right: x.total, links: [A("Open " + x.id, "icon-package", "Purchase Orders.dc.html?open=" + x.id)] })) }));
          blocks.push(blk("Factory invoices", { rows: vi.map(x => row(x.id + ", " + x.type, { right: "$" + (x.total / 100).toFixed(2), links: [A("Open " + x.id, "icon-receipt", "Invoices.dc.html?open=" + x.id)] })) }));
          if (!vq.length && !vp.length && !vi.length) blocks.push(blk("", { note: "Nothing linked to this vendor in the demo data." })); }
        if (dtab === "matches") { const mm = MATCHES.filter(x => x.vendor === v.name); blocks.push(mm.length ? blk("How imported names matched this vendor", { rows: mm.map(x => row("“" + x.raw + "”", { sub: x.src + ", " + x.how, right: x.conf ? Math.round(x.conf * 100) + "%" : "Manual", links: [A("Open " + x.inv, "icon-receipt", "Invoices.dc.html?open=" + x.inv), ...(x.ai ? [L("Open " + x.ai, "icon-sparkles", () => go("ai", { sub: AI.find(a => a.id === x.ai).status, sel: x.ai }))] : [])] })) }) : blk("", { note: "No import matches recorded for this vendor." })); }
        vm.det = detail({ kind: v.kind, title: v.name, sub: "Partners see: " + v.alias, pills: [pill(v.kind, v.kind === "Factory" ? "blue" : "neutral")], tabs: [["overview", "Overview"], ["linked", "Quotes, POs, invoices"], ["matches", "Import matches"]], blocks }); }
    } else {
      vm.table = table(["Name on the document", "Source", "Matched to", "How", ["Confidence", 1], "Invoice", "AI proposal"], "minmax(0,1.1fr) 150px minmax(0,1fr) minmax(0,1.4fr) 100px 110px 110px", MATCHES.map(x => ({ id: x.raw, cells: [cell("“" + x.raw + "”", { b: 1 }), cell(x.src), cell(x.vendor, { sub: "Partners see Manufacturer " + VA[x.vendor] }), cell(x.how), cell(x.conf ? Math.round(x.conf * 100) + "%" : "Manual", { right: 1 }), cell(x.inv), cell(x.ai || "—")] })), S.sel, ["Invoice", "AI proposal"]);
      const x = MATCHES.find(y => y.raw === S.sel); if (x) vm.det = detail({ kind: "Import match", title: "“" + x.raw + "”", sub: x.src, blocks: [blk("", { rows: [row("Matched vendor", { right: x.vendor, links: [L("Open vendor", "icon-factory", () => set({ sub: "list", sel: x.vendor, dtab: "matches" }))] }), row("Method", { sub: x.how }), row("Invoice", { links: [A("Open " + x.inv, "icon-receipt", "Invoices.dc.html?open=" + x.inv)] })] })] });
    }
    return vm;
  }
  if (m === "quickbooks") {
    const conn = S.qbConn !== false; const fixed = S.qbFixed || {};
    vm.actions = [btn(conn ? "Mock state: connected" : "Mock state: not connected", () => (set({ qbConn: !conn }), TK && TK.toast(comp, conn ? "QuickBooks disconnected" : "QuickBooks connected")), false, conn)];
    vm.notes = [conn ? "Connected to “Lootbloc Sandbox (mock company)”. No real credentials. Nothing is exported." : "Not connected (mock). Mappings are kept, but nothing can be checked or exported."];
    const issues = IV.FACTORY.filter(f => !f.archived && f.qb.state !== "ok").map(f => { const mp = QB_MAP.find(r => r[3] === f.id); const ok = mp && fixed[mp[1]]; return { f, mp, ok }; });
    vm.tabs = sub([["ready", "Invoice readiness", issues.filter(i => !i.ok).length], ["map", "Mappings", QB_MAP.length]], S.sub || "ready");
    vm.kpis = [{ label: "Needs QB", value: String(issues.filter(i => !i.ok).length), sub: "Invoices blocked" }, { label: "Unmapped", value: String(QB_MAP.filter(r => !r[2] && !fixed[r[1]]).length), sub: "Mappings missing" }, { label: "Last mock check", value: conn ? "9:41 AM" : "—", sub: conn ? "Simulated" : "Not connected" }];
    if ((S.sub || "ready") === "ready") {
      vm.table = table(["Invoice", "Problem", "Fix in", "Status"], "120px minmax(0,1.6fr) minmax(0,1fr) 150px", issues.map(({ f, mp, ok }) => ({ id: f.id, cells: [cell(f.id, { b: 1, sub: f.vendor }), cell(f.qb.issue), cell(mp ? mp[0] + ", " + mp[1] : "Invoice documents"), cell("", { pill: ok ? pill("Ready (prototype)", "green") : pill({ mapping: "Needs mapping", export: "Export error", source: "Source problem" }[f.qb.state], f.qb.state === "mapping" ? "amber" : "red") })] })), S.sel);
      const it = issues.find(i => i.f.id === S.sel);
      if (it) { const { f, mp, ok } = it; const blocks = [blk("Why it's blocked", { note: f.qb.issue, noteIcon: "icon-circle-alert", noteInk: ok ? "var(--green)" : "var(--red)", noteSoft: ok ? "var(--greenSoft)" : "var(--redSoft)" })];
        if (mp) { blocks.push(blk("Mapping", { rows: [row(mp[0] + ": " + mp[1], { right: fixed[mp[1]] || "Not mapped", tag: fixed[mp[1]] ? pill("Mapped (prototype)", "green") : pill("Not mapped", "amber"), links: [L("Open mapping", "icon-link", () => set({ sub: "map", sel: mp[1], dtab: "overview" }))] })] })); }
        else blocks.push(blk("", { note: "Not a mapping problem. The invoice needs its source PDF.", actions: [], noteIcon: "icon-file-x" }));
        blocks.push(blk("Affected invoice", { rows: [row(f.id + ", " + f.type + ", $" + (f.total / 100).toFixed(2), { sub: f.vendor + ", " + f.products.join(", "), links: [A("Open " + f.id + " in Invoices", "icon-receipt", "Invoices.dc.html?open=" + f.id)] })] }));
        if (ok) blocks.push(blk("", { actions: [btn(S.pv === "exp" ? "Hide export preview" : "Preview export", () => set({ pv: S.pv === "exp" ? null : "exp" }))], actionNote: "Shows what would be sent. Nothing is sent." }));
        if (S.pv === "exp") blocks.push(blk("Export preview (mock)", { rows: [row("Bill for " + f.vendor, { right: "$" + (f.total / 100).toFixed(2) }), row("Account", { right: fixed[mp[1]] }), row("Terms", { right: "Custom 30/70 (mock)" })], note: conn ? "Not sent. The prototype has no QuickBooks connection." : "Not connected (mock), so this couldn't be sent anyway." }));
        vm.det = detail({ kind: "Invoice readiness", title: f.id, sub: f.vendor, pills: [pill(ok ? "Ready (prototype)" : "Blocked", ok ? "green" : "red")], blocks }); }
      vm.empty = "Nothing blocked.";
    } else {
      vm.filters = [flt("cat", "Category", [...new Set(QB_MAP.map(r => r[0]))]), flt("st", "Status", ["Mapped", "Not mapped"])];
      const rows = QB_MAP.filter(r => (fv("cat") === "any" || r[0] === fv("cat")) && (fv("st") === "any" || (fv("st") === "Mapped") === !!(r[2] || fixed[r[1]])));
      vm.table = table(["Category", "In Lootbloc", "In QuickBooks (mock)", "Affects"], "150px minmax(0,1.3fr) minmax(0,1.3fr) 120px", rows.map(r => ({ id: r[1], cells: [cell(r[0]), cell(r[1], { b: 1 }), cell(r[2] || fixed[r[1]] || "", { pill: r[2] || fixed[r[1]] ? null : pill("Not mapped", "amber") }), cell(r[3] || "—")] })), S.sel);
      const r = QB_MAP.find(x => x[1] === S.sel);
      if (r) { const opts = r[0] === "Cost accounts" ? QB_ACCOUNT_OPTS : QB_ITEM_OPTS; const cur = r[2] || fixed[r[1]]; const pv = S.pv && S.pv.k === r[1] ? S.pv.v : null;
        const blocks = [blk("", { rows: [row("Lootbloc value", { right: r[1] }), row("QuickBooks value (mock)", { right: cur || "Not mapped" }), ...(r[3] ? [row("Blocks", { links: [A("Open " + r[3], "icon-receipt", "Invoices.dc.html?open=" + r[3]), L("Back to readiness", "icon-arrow-left", () => set({ sub: "ready", sel: r[3] }))] })] : [])] })];
        if (!r[2]) { blocks.push(blk("Choose a mock QuickBooks value", { actions: opts.map(o => btn(o, () => set({ pv: { k: r[1], v: o } }), false, pv === o)), actionNote: "Preview first. Nothing is saved to QuickBooks." }));
          if (pv) blocks.push(blk("Preview", { rows: [row(r[1], { right: (cur || "Not mapped") + " → " + pv }), row("Invoices that become ready", { right: r[3] || "None" })], actions: [btn("Apply in prototype", () => (set({ qbFixed: { ...fixed, [r[1]]: pv }, pv: null }), TK && TK.toast(comp, "Mapping saved for " + r[1])), true), btn("Cancel", () => set({ pv: null }))], actionNote: "Local only. The Invoices page keeps its own mock state." })); }
        vm.det = detail({ kind: r[0], title: r[1], pills: [pill(cur ? "Mapped" : "Not mapped", cur ? "green" : "amber")], blocks }); }
    }
    return vm;
  }
  if (m === "connections") {
    const CX = [
      { id: "shopify", name: "Shopify", icon: "store", what: "Products, variants and sales speed", status: "Healthy", tone: "green", last: "1 hour ago", next: "Every hour", used: ["Products", "Inventory", "Home"], errors: 0, detail: [["Stores connected", "4 reference stores"], ["Sales speed", "Synced 1 hour ago"], ["Products covered", "142 of 156 SKUs"]], page: "Workspace.dc.html?m=shopify" },
      { id: "shiphero", name: "ShipHero", icon: "warehouse", what: "On hand, allocated and available stock", status: "Healthy", tone: "green", last: "2 hours ago", next: "6 AM and 6 PM ET", used: ["Inventory", "Home"], errors: 0, detail: [["Stock coverage", "142 of 156 SKUs (all partners)"], ["Last full sync", "Today, 6:02 AM ET"], ["Warehouses", "Ontario, CA (PackRight)"]] },
      { id: "quickbooks", name: "QuickBooks", icon: "refresh-cw", what: "Reimbursement invoices billed to partners", status: "Needs attention", tone: "amber", last: "3 hours ago", next: "When an invoice is sent", used: ["Invoices"], errors: 2, detail: [["Mapped partners", "3 of 4"], ["Waiting to sync", "2 reimbursement invoices"], ["Account", "Lootbloc LLC (mock)"]], page: "Workspace.dc.html?m=quickbooks" },
      { id: "openai", name: "OpenAI", icon: "sparkles", what: "AI review: invoice and quote extraction, record matching", status: "Healthy", tone: "green", last: "14 min ago", next: "On upload", used: ["AI review", "Invoices", "Quotes"], errors: 0, detail: [["Model", "gpt-4.1 (mock)"], ["Requests today", "38"], ["Average response", "2.4 seconds"]], page: "Workspace.dc.html?m=ai" },
      { id: "carriers", name: "Carrier tracking", icon: "truck", what: "UPS, FedEx, DHL and ocean freight updates", status: "Partial", tone: "amber", last: "12 min ago", next: "Every 30 minutes", used: ["Shipments", "Home"], errors: 1, detail: [["Carriers live", "UPS, FedEx, DHL"], ["Stale", "Maersk, 2 days without an update"], ["Unavailable", "Flexport"]] }];
    const ck = S.ck || {};
    vm.kpis = [{ label: "Connections", value: String(CX.length), sub: "Outside services" }, { label: "Healthy", value: String(CX.filter(c => c.tone === "green").length), sub: "No known problems" }, { label: "Need a look", value: String(CX.filter(c => c.tone !== "green").length), sub: "Errors or stale data" }];
    vm.table = table(["Service", "Status", "Last sync", "Schedule", "Used on", ["Errors, 24 hours", 1]], "minmax(0,1.3fr) 150px 130px 160px minmax(0,1fr) 130px", CX.map(c => ({ id: c.id, aria: c.name, cells: [cell(c.name, { b: 1, sub: c.what }), cell("", { pill: pill(c.status, c.tone) }), cell(ck[c.id] ? "Just now" : c.last), cell(c.next), cell(c.used.join(", ")), cell(String(c.errors), { right: 1, b: c.errors ? 1 : 0 })] })), S.sel);
    const c = CX.find(x => x.id === S.sel);
    if (c) { const blocks = [blk("Status", { rows: [row("Status", { tag: pill(c.status, c.tone) }), row("Last sync", { right: ck[c.id] ? "Just now" : c.last }), row("Schedule", { right: c.next }), ...c.detail.map(([k, v]) => row(k, { right: v }))] }),
        blk("Used on", { rows: c.used.map(u => row(u)) }),
        blk("", { actions: [btn(ck[c.id] ? "Checked just now" : "Run a health check", () => (set({ ck: { ...ck, [c.id]: true } }), TK && TK.toast(comp, c.name + " is healthy")), !ck[c.id]), ...(c.page ? [btn("Open " + c.name + " settings", () => { location.href = href(c.page); })] : [])], actionNote: "Simulated. Nothing is called." })];
      vm.det = detail({ kind: "Connection", title: c.name, pills: [pill(c.status, c.tone)], tabs: [["overview", "Overview"]], blocks }); }
    return vm;
  }
  if (m === "shopify") {
    const ST = { Healthy: "green", "Needs attention": "amber", Partial: "amber", Unknown: "neutral" };
    vm.notes = ["Mock monitor. No tokens, no refresh calls. Unknown means we don't know; it's never counted as zero or healthy."];
    vm.kpis = [{ label: "Stores", value: String(STORES.length), sub: "Reference stores" }, { label: "Healthy", value: String(STORES.filter(s => s.status === "Healthy").length), sub: "No known problems" }, { label: "Unknown", value: String(STORES.filter(s => s.status === "Unknown").length), sub: "Not the same as zero" }];
    vm.table = table(["Store", "Status", "Last order check", "Products covered", "Unmapped variants", "Sales history"], "minmax(0,1.2fr) 140px 170px 140px 130px minmax(0,1.2fr)", STORES.map(s => ({ id: s.id, aria: s.name, cells: [cell(s.name, { b: 1 }), cell("", { pill: pill(s.status, ST[s.status]) }), cell(s.last, { sub: "Simulated" }), cell(s.covered == null ? "Unknown" : s.covered + " of " + s.eligible), cell(s.unmapped == null ? "Unknown" : s.unmapped), cell(s.history)] })), S.sel);
    const s = STORES.find(x => x.id === S.sel);
    if (s) { const blocks = []; const done = (S.backfill || {})[s.id];
      if (dtab === "overview") { blocks.push(blk("Coverage", { rows: [row("Eligible products", { right: String(s.eligible), sub: "Live or launching products that should be on this store" }), row("Covered", { right: s.covered == null ? "Unknown" : String(s.covered), tag: s.covered == null ? pill("Unknown", "neutral") : s.covered < s.eligible ? pill((s.eligible - s.covered) + " missing", "amber") : pill("All covered", "green") }), row("Last order check", { right: s.last + " (simulated)" })] }));
        blocks.push(blk("Sales on Home", { note: "Home's Sales overview uses this store's demo data on its existing basis (Total Sales, or scoped product sales for partners). This monitor doesn't change the metric.", actions: [btn("Open Home sales", () => { location.href = href("Home Custom.dc.html"); })] })); }
      if (dtab === "failures") blocks.push(s.failures.length ? blk("Recent failures and warnings", { rows: s.failures.map(([w, t, p]) => row(t, { sub: w + (p ? ", " + p : ""), links: p ? [A("Open product integration", "icon-plug", "Products.dc.html?open=" + encodeURIComponent(p) + "&tab=integrations")] : [] })) }) : blk("", { note: "No failures in the last 7 days (mock)." }));
      if (dtab === "backfill") { blocks.push(blk("Sales history", { rows: [row("Covered", { right: s.history })].concat(s.gaps.map(([r2, n]) => row("Gap: " + r2, { right: n + " days", tag: pill("Unknown, not $0", "neutral") }))) }));
        if (s.gaps.length) { blocks.push(blk("", { actions: [btn(S.pv === "bf" ? "Hide backfill preview" : "Preview backfill", () => set({ pv: S.pv === "bf" ? null : "bf" }))] }));
          if (S.pv === "bf") blocks.push(blk("Backfill preview (mock)", { rows: s.gaps.map(([r2, n]) => row("Request orders for " + r2, { right: n + " days" })).concat([row("While it runs", { sub: "Those days stay Unknown on charts, never $0." }), row("Metric basis", { sub: "Unchanged: order totals (Total Sales)." })]), actions: [btn("Mark as previewed (prototype)", () => (set({ backfill: { ...(S.backfill || {}), [s.id]: true }, pv: null }), TK && TK.toast(comp, "Backfill previewed")), true)], actionNote: "Nothing is requested from Shopify." }));
          if (done) blocks.push(blk("", { note: "Backfill previewed in the prototype only. No request was made, so the gap is still Unknown.", noteIcon: "icon-flask-conical", noteInk: "var(--fg2)", noteSoft: "var(--sunk)" })); }
        else blocks.push(blk("", { note: "No known gaps." })); }
      vm.det = detail({ kind: "Shopify store (mock)", title: s.name, pills: [pill(s.status, ST[s.status])], tabs: [["overview", "Overview"], ["failures", "Failures"], ["backfill", "History & backfill"]], blocks }); }
    return vm;
  }
  if (m === "ai") {
    const loc = S.aiLocal || {}; const items = AI.map(a => loc[a.id] ? { ...a, status: loc[a.id], decided: "Sep 29, you (prototype)" } : a);
    const tab = S.sub || "pending"; const cnt = k => items.filter(a => a.status === k).length;
    vm.tabs = sub([["pending", "Pending", cnt("pending")], ["auto", "Auto-applied", cnt("auto")], ["approved", "Approved", cnt("approved")], ["dismissed", "Dismissed", cnt("dismissed")], ["unmapped", "Unmapped sources", UNMAPPED.length]], tab);
    vm.notes = ["Mock proposals. Approving or dismissing here only changes this prototype; nothing is applied to live data."];
    if (tab === "unmapped") { vm.table = table(["Source item", "From", "Proposal", "Go to"], "minmax(0,1.4fr) minmax(0,1fr) 150px 160px", UNMAPPED.map(([a, b, c, d]) => ({ id: a, cells: [cell(a, { b: 1 }), cell(b), cell(d), cell(c === "shopify" ? "Shopify sync" : "QuickBooks")] })), S.sel);
      const u = UNMAPPED.find(x => x[0] === S.sel); if (u) vm.det = detail({ kind: "Unmapped source", title: u[0], sub: u[1], blocks: [blk("", { rows: [row("Where to fix it", { links: [L(u[2] === "shopify" ? "Open Shopify sync" : "Open QuickBooks mappings", "icon-arrow-right", () => go(u[2], u[2] === "quickbooks" ? { sub: "map" } : {}))] })] })] });
      return vm; }
    vm.filters = [flt("kind", "Kind", [...new Set(AI.map(a => a.kind))])];
    const rows = items.filter(a => a.status === tab && (fv("kind") === "any" || a.kind === fv("kind")));
    vm.table = table(["Proposal", "Kind", "Source", ["Confidence", 1], "Linked record"], "minmax(0,1.8fr) 130px minmax(0,1fr) 100px 170px", rows.map(a => ({ id: a.id, aria: a.id, cells: [cell(a.proposal, { b: 1, sub: a.id + (a.decided ? ", " + a.decided : "") }), cell(a.kind), cell(a.source), cell(Math.round(a.conf * 100) + "%", { right: 1 }), cell(a.entity[1], { sub: a.entity[0] })] })), S.sel);
    const a = items.find(x => x.id === S.sel);
    if (a) { const decide = st => set({ aiLocal: { ...loc, [a.id]: st }, actLocal: [["Sep 29, now", "You (prototype)", a.entity[0], a.entity[1], (st === "approved" ? "Approved " : "Dismissed ") + a.id + ": " + a.proposal, "Prototype only; not applied", "AI review", "Done"], ...(S.actLocal || [])], sub: st, sel: a.id }) || (TK && TK.toast(comp, st === "approved" ? "Approved" : "Dismissed", () => set({ aiLocal: { ...loc } })));
      const blocks = [blk("Proposal", { rows: [row(a.proposal, { sub: a.kind + ", " + a.source }), row("Confidence", { right: Math.round(a.conf * 100) + "%", tag: pill(a.conf >= 0.9 ? "High" : a.conf >= 0.7 ? "Medium" : "Low", a.conf >= 0.9 ? "green" : a.conf >= 0.7 ? "amber" : "red") }), row("Reasoning", { sub: a.reason, fw: 500 })] }),
        blk("What would change", { rows: a.change.map(([f, from, to]) => row(f, { right: from + " → " + to })) }),
        blk("Linked record", { rows: [row(a.entity[0] + ": " + a.entity[1], { links: [A("Open " + a.entity[1], "icon-arrow-up-right", a.entity[2]), L("See Activity for it", "icon-history", () => go("activity", { f: { ent: a.entity[1] } }))] })] })];
      if (a.status === "pending") blocks.push(blk("", { actions: [btn("Approve (prototype)", () => decide("approved"), true), btn("Dismiss (prototype)", () => decide("dismissed"))], actionNote: "Local demo only. Live data isn't touched." }));
      else blocks.push(blk("", { note: "Decided: " + (a.decided || "—") }));
      vm.det = detail({ kind: "AI proposal", title: a.id, sub: a.kind, pills: [pill({ pending: "Pending", auto: "Auto-applied", approved: "Approved", dismissed: "Dismissed" }[a.status], a.status === "pending" ? "amber" : a.status === "dismissed" ? "neutral" : "green")], blocks }); }
    vm.empty = "Nothing here.";
    return vm;
  }
  if (m === "activity") {
    const all = [...(S.actLocal || []), ...ACTIVITY];
    vm.filters = [flt("actor", "Actor", [...new Set(all.map(a => a[1]))]), flt("type", "Record", [...new Set(all.map(a => a[2]))]), flt("src", "Source", [...new Set(all.map(a => a[6]))]), flt("res", "Result", [...new Set(all.map(a => a[7]))]), flt("ent", "Record name", [...new Set(all.map(a => a[3]).filter(Boolean))], "Any record")];
    const rows = all.map((a, i) => ({ a, id: "a" + i })).filter(({ a }) => (fv("actor") === "any" || a[1] === fv("actor")) && (fv("type") === "any" || a[2] === fv("type")) && (fv("src") === "any" || a[6] === fv("src")) && (fv("res") === "any" || a[7] === fv("res")) && (fv("ent") === "any" || a[3] === fv("ent")));
    const RT = { Done: "green", Failed: "red", Warning: "amber", Adapted: "blue" };
    vm.table = table(["When", "Who", "Record", "What changed", "Source", "Result"], "140px 140px minmax(0,1fr) minmax(0,1.8fr) 120px 100px", rows.map(({ a, id }) => ({ id, aria: a[4], cells: [cell(a[0]), cell(a[1]), cell(a[3] || a[2], { b: 1, sub: a[3] ? a[2] : "" }), cell(a[4], { sub: a[5] }), cell(a[6]), cell("", { pill: pill(a[7], RT[a[7]]) })] })), S.sel);
    const hit = rows.find(r => r.id === S.sel); if (hit) { const a = hit.a; const ln = a[3] ? entLink(a[2], a[3]) : a[2] === "Saved view" ? entLink("Saved view", "") : null;
      vm.det = detail({ kind: "Activity", title: a[4], sub: a[0] + ", " + a[1], pills: [pill(a[7], RT[a[7]])], blocks: [blk("", { rows: [row("Record", { right: (a[3] || "—"), sub: a[2], links: ln ? [ln] : [] }), row("Source", { right: a[6] }), ...(a[5] ? [row("Detail", { sub: a[5], fw: 500 })] : [])] }), ...(a[2] === "Saved view" ? [blk("", { note: "Audit entries for adapted views describe what kind of setting was dropped, never the hidden names or fields." })] : [])] }); }
    vm.empty = "No activity matches these filters.";
    return vm;
  }
  // tasks + calendar + timeline share events
  const loc = S.taskLocal || {};
  const tasks = (TK && comp ? TK.mergeOv(comp, "tasks", TASKS, t => t.id) : TASKS).map(t => loc[t.id] ? { ...t, status: loc[t.id] } : t);
  const occ = t => { const d0 = parse(t.due); if (!t.rule) return [d0]; const out = []; if (t.monthly) { for (let mo = 9; mo <= 11; mo++) out.push(D(mo, 1)); return out; } for (let d = d0; d <= t.until; d += t.every * DAY) out.push(d); return out; };
  const PRI = ["Low", "Medium", "High"]; const setPri = (tk, p) => { if (!TK || !comp) return; const prev = tk.priority; TK.patchOv(comp, "tasks", [tk.id], { priority: p }); TK.toast(comp, tk.t + " set to " + p + " priority", () => TK.patchOv(comp, "tasks", [tk.id], { priority: prev })); };
  const setStatus = (tk, st) => { if (!TK || !comp) return; const prev = tk.status; TK.patchOv(comp, "tasks", [tk.id], { status: st }); if (st === "Done") TK.celebrate(); TK.toast(comp, tk.t + " moved to " + st, () => TK.patchOv(comp, "tasks", [tk.id], { status: prev })); }; const normP = p => p === "High" || p === "Urgent" ? "High" : p === "Low" ? "Low" : "Medium";
  const priP = t => { const p = normP(t.priority); return pill(p, p === "High" ? "red" : p === "Low" ? "green" : "amber"); };
  if (m === "tasks") {
    const lay = S.lay || "list";
    vm.tabs = sub([["list", "List", null], ["board", "Board", null]], lay, "lay");
    vm.filters = [flt("who", "Assignee", Object.entries(STAFF).filter(([k]) => tasks.some(t => t.who === k)).map(([k, v]) => [k, v])), flt("st", "Status", ["To do", "In progress", "Done"]), flt("rep", "Repeats", ["One-time", "Recurring"]), flt("ent", "Linked to", [...new Set(tasks.map(t => t.ent[0]))]), flt("pri", "Priority", PRI), flt("dueF", "Due", ["Overdue", "Today", "Next 7 days", "Later"])];
    const qq = (S.f.q || "").trim().toLowerCase(); vm.search = { value: S.f.q || "", ph: "Search tasks", set: e => set({ f: { ...S.f, q: e.target.value } }) };
    const dueB = t => { const d = parse(t.due); return t.status !== "Done" && d < TODAY ? "Overdue" : d === TODAY ? "Today" : d <= TODAY + 7 * DAY ? "Next 7 days" : "Later"; };
    const rows = tasks.filter(t => (fv("who") === "any" || t.who === fv("who")) && (fv("st") === "any" || t.status === fv("st")) && (fv("rep") === "any" || (fv("rep") === "Recurring") === !!t.rule) && (fv("ent") === "any" || t.ent[0] === fv("ent")) && (fv("pri") === "any" || (t.priority || "Normal") === fv("pri")) && (fv("dueF") === "any" || dueB(t) === fv("dueF")) && (!qq || (t.id + " " + t.t + " " + t.ent[1]).toLowerCase().includes(qq)));
    const od = t => t.status !== "Done" && parse(t.due) < TODAY;
    const stP = t => od(t) ? pill("Overdue", "red") : pill(t.status, t.status === "Done" ? "green" : t.status === "In progress" ? "blue" : "neutral");
    const canT = !!(TK && TK.can(role, "task.update"));
    if (lay === "list") vm.table = table([sh("Task", "t"), "Linked to", "Assignee", sh("Priority", "pri"), sh("Due", "due"), "Repeats", "Status", "Task ID", "Record type"], "minmax(0,1.4fr) minmax(0,1.1fr) 130px 100px 90px 170px 120px 90px 130px", sortBy(rows, WS.k, { t: (a, b) => a.t.localeCompare(b.t), pri: (a, b) => PRI.indexOf(normP(a.priority)) - PRI.indexOf(normP(b.priority)), due: (a, b) => parse(a.due) - parse(b.due) }).map(t => ({ id: t.id, aria: t.t, cells: [cell(t.t, { b: 1 }), cell("", { link: linkV(t.ent[0], t.ent[1]) }), cell(STAFF[t.who]), cell("", { pill: priP(t), sel: canT ? { v: normP(t.priority), title: "Priority", opts: [["High", "var(--redBar)"], ["Medium", "var(--amberBar)"], ["Low", "var(--greenBar)"]].map(([value, dot]) => ({ value, label: value, dot })), pick: v => setPri(t, v), aria: "Change priority for " + t.t } : null }), cell(t.due), cell(t.rule || "One-time"), cell("", { pill: stP(t), sel: canT ? { v: t.status, title: "Status", opts: [["To do", "var(--fg3)"], ["In progress", "var(--blueBar)"], ["Done", "var(--greenBar)"]].map(([value, dot]) => ({ value, label: value, dot })), pick: v => setStatus(t, v), aria: "Change status for " + t.t } : null }), cell(t.id), cell(t.ent[0])] })), S.sel, ["Task ID", "Record type"]);
    else { vm.view = "board"; const canMv = !!(TK && TK.can(role, "task.update")); const BD = S.bdrag || null;
      vm.board = { cols: ["To do", "In progress", "Done"].map(c => { const cs = rows.filter(t => t.status === c); const ov = !!BD && BD.over === c && BD.from !== c;
        return { label: c, count: String(cs.length), dropBg: ov ? "var(--brandSoft)" : "var(--sunk)", dropBd: ov ? "var(--brand)" : "transparent",
          over: e => { if (!BD) return; e.preventDefault(); if (BD.over !== c) set({ bdrag: { ...BD, over: c } }); },
          drop: e => { e.preventDefault(); set({ bdrag: null }); if (!BD) return; const tk = tasks.find(x => x.id === BD.id); if (tk && tk.status !== c) setStatus(tk, c); },
          cards: cs.map(t => { const lk = linkV(t.ent[0], t.ent[1]); const pp = priP(t); return { title: t.t, hasLink: true, link: lk, meta: STAFF[t.who] + ", due " + t.due + (t.rule ? ", " + t.rule : ""), hasPill: od(t), pl: "Overdue", pInk: "var(--red)", pSoft: "var(--redSoft)", pri: pp.label, priInk: pp.ink, priSoft: pp.soft,
            bd: S.sel === t.id ? "var(--brand)" : "var(--line)", op: BD && BD.id === t.id ? 0.4 : 1, drag: canMv ? "true" : "false", cur: canMv ? "grab" : "pointer",
            dragStart: e => { if (!canMv) return; try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", t.id); } catch (x) {} set({ bdrag: { id: t.id, from: c, over: c } }); },
            dragEnd: () => set({ bdrag: null }), open: () => { if (S.sel !== t.id && guard()) return; set({ sel: t.id, dtab: "overview" }); } }; }) }; }) }; }
    const t = tasks.find(x => x.id === S.sel);
    if (t) { const o = occ(t); const ln = entLink(t.ent[0], t.ent[1]);
      const canEdT = !!(TK && TK.can(role, "task.update")); const rec = { ...t, priority: normP(t.priority), desc: t.desc || "" };
      const doneFx = patch => { if (patch.status === "Done" && t.status !== "Done" && TK && TK.celebrate) TK.celebrate(); };
      const TF = edFields("tasks", t.id, rec, [["t", "Name", "text", { req: 1 }], ["status", "Status", "sel", { opts: ["To do", "In progress", "Done"] }], ["priority", "Priority", "sel", { opts: PRI }], ["due", "Due", "text"], ["desc", "Description", "area", { ph: "Add notes, links or context for this task" }]], canEdT, "Task", doneFx);
      const nf = TF[0]; const titleEd = canEdT && !nf.ro ? { draft: nf.draft, set: nf.set, bd: nf.bd === "var(--brand)" ? "var(--brand)" : "transparent" } : null;
      vm.det = detail({ titleEd, kind: t.rule ? "Recurring task" : "Task", title: t.t, sub: STAFF[t.who], pills: [stP(t), priP(t), ...(t.rule ? [pill(t.rule, "blue")] : [])], blocks: [
        blk("", { fields: TF.slice(1) }),
        blk("", { rows: [row("Linked to", { right: t.ent[1], sub: t.ent[0], links: ln ? [ln] : [] }), row("Assignee", { right: STAFF[t.who] }), row("Repeats", { right: t.rule || "One-time" })] }),
        ...(t.rule ? [blk("Next occurrences", { rows: o.slice(0, 5).map(d => row(fmt(d), { fw: 500 })) })] : []),
        blk("", { actions: [btn("See on Calendar", () => go("calendar", { month: new Date(o.find(d => d >= TODAY) || o[0]).getUTCMonth(), focus: t.id })), btn("See on Timeline", () => go("timeline", { focus: t.id }))] })] }); }
    vm.empty = "No tasks match these filters.";
    if (lay === "list") wire({ key: "tasks", page: "tasks", all: tasks, id: x => x.id, label: x => x.id + ", " + x.t, noun: "task", preserve: true, sig: "tasks", allowed: TK && (TK.can(role, "task.update") || TK.can(role, "task.delete")),
      canU: TK && TK.can(role, "task.update"), canD: TK && TK.can(role, "task.delete"), deleteOnly: true, onDeleteCons: ["Tasks are deleted, not archived. There's no restore.", "Recurring tasks stop creating future occurrences."],
      fields: { status: { label: "Status", kind: "select", options: ["To do", "In progress", "Done"], get: x => x.status, icon: "icon-circle-dot" }, priority: { label: "Priority", kind: "select", options: ["Low", "Medium", "High"], get: x => normP(x.priority), icon: "icon-flag" },
        rule: { label: "Recurrence", kind: "select", options: ["One-time", "Every Monday", "Every 2 weeks on Friday", "Monthly on the 1st"], get: x => x.rule || "One-time" }, due: { label: "Due date", kind: "date", get: x => x.due }, desc: { label: "Description", kind: "notes", get: x => x.desc || "" } },
      quick: ["status", "priority"], moreKeys: ["status", "priority", "rule", "due", "desc"] });
    return vm;
  }
  // events
  const ev = [];
  const prods = P.PRODUCTS.filter(p => p.launch && p.launch !== "—");
  prods.forEach(p => { const d = parse(p.launch, p.stage !== "live"); if (d) ev.push({ id: "L:" + p.name, kind: "launch", label: (d > TODAY ? "Planned launch: " : "Launched: ") + p.name, d0: d, d1: d, state: d > TODAY ? "projected" : "actual", href: "Products.dc.html?open=" + encodeURIComponent(p.name), rec: p.name }); });
  P.POS.forEach(o => { const s = parse(o.created), e = parse(o.eta); if (!s) return; const due = /Was due/.test(o.due); ev.push({ id: "P:" + o.id, kind: "po", label: o.id + ", " + o.products.join(", "), d0: s, d1: e || s, state: due ? "overdue" : e && e < TODAY ? "actual" : "projected", href: "Purchase Orders.dc.html?open=" + o.id, rec: o.id, point: !e, pointLabel: e ? "ETA " + o.eta : "" }); });
  ev.push({ id: "S:SH-2291", kind: "ship", label: "SH-2291, was due Sep 26, now projected Oct 2", d0: D(8, 12), d1: D(9, 2), state: "overdue", href: "Shipments.dc.html", rec: "SH-2291" });
  ev.push({ id: "S:SH-2309", kind: "ship", label: "SH-2309, sample courier, ETA Oct 3", d0: D(8, 27), d1: D(9, 3), state: "projected", href: "Shipments.dc.html", rec: "SH-2309" });
  IV.FACTORY.filter(f => !f.archived && f.payments.reduce((s, p) => s + p.amount, 0) < f.total).forEach(f => { const d = parse(f.due); ev.push({ id: "I:" + f.id, kind: "invoice", label: f.id + " due, " + f.vendor, d0: d, d1: d, state: f.overdue ? "overdue" : "projected", href: "Invoices.dc.html?open=" + f.id, rec: f.id }); });
  tasks.forEach(t => occ(t).forEach((d, i) => ev.push({ id: "T:" + t.id + ":" + i, task: t.id, kind: "task", label: t.t + (t.rule ? " (repeats)" : ""), d0: d, d1: d, state: t.status === "Done" ? "actual" : d < TODAY ? "overdue" : "projected" })));
  HOLIDAYS.forEach(([a, b, l], i) => ev.push({ id: "H:" + i, kind: "holiday", label: l, d0: a, d1: b, state: a < TODAY && b < TODAY ? "actual" : "projected" }));
  const KIND = { launch: ["Launches", "var(--brand)"], po: ["PO dates", "var(--blueBar)"], ship: ["Shipments", "var(--amberBar)"], invoice: ["Invoices due", "var(--greenBar)"], task: ["Tasks", "var(--fg2)"], holiday: ["Factory holidays", "var(--fg3)"] };
  const kf = S.kinds || {}; const showK = k => kf[k] !== false;
  vm.filters = [];
  vm.chips = Object.entries(KIND).map(([k, [l, c]]) => ({ label: l, color: c, on: String(showK(k)), bg: showK(k) ? "var(--surface)" : "transparent", op: showK(k) ? 1 : 0.45, pick: () => set({ kinds: { ...kf, [k]: !showK(k) } }) }));
  vm.legend = [["Actual", "solid"], ["Projected", "dashed"], ["Overdue", "overdue"]].map(([l, s]) => ({ label: l, bd: s === "overdue" ? "2px solid var(--red)" : s === "dashed" ? "2px dashed var(--fg2)" : "2px solid var(--fg2)" }));
  const sty = e => ({ bg: e.kind === "holiday" ? "repeating-linear-gradient(135deg, var(--sunk) 0 6px, var(--line2) 6px 8px)" : "var(--surface)", bd: e.state === "overdue" ? "2px solid var(--red)" : e.state === "projected" ? "2px dashed " + KIND[e.kind][1] : "2px solid " + KIND[e.kind][1], ink: e.state === "overdue" ? "var(--red)" : "var(--fg)" });
  const evs = ev.filter(e => showK(e.kind));
  const selE = ev.find(e => e.id === S.sel) || (S.focus ? ev.find(e => e.task === S.focus && e.d0 >= TODAY) : null);
  const evDet = e => { const blocks = [blk("", { rows: [row("Dates", { right: e.d0 === e.d1 ? fmt(e.d0) : fmt(e.d0) + " – " + fmt(e.d1) }), row("Type", { right: KIND[e.kind][0] }), row("State", { tag: pill(e.state === "overdue" ? "Overdue" : e.state === "projected" ? "Projected" : "Actual", e.state === "overdue" ? "red" : e.state === "projected" ? "blue" : "green") })] })];
    if (e.href) blocks.push(blk("", { rows: [row("Record", { right: e.rec, links: [A("Open " + e.rec, "icon-arrow-up-right", e.href)] })] }));
    if (e.task) blocks.push(blk("", { rows: [row("Task", { links: [L("Open in Tasks", "icon-list-checks", () => go("tasks", { sel: e.task }))] })] }));
    if (e.kind === "holiday") blocks.push(blk("", { note: "Typical closure dates. Confirm with each factory." }));
    return detail({ kind: KIND[e.kind][0], title: e.label, blocks }); };
  if (selE) vm.det = evDet(selE);
  if (m === "calendar") {
    const mo = S.month ?? 9; const first = D(mo, 1); const start = first - new Date(first).getUTCDay() * DAY; const last = D(mo + 1, 0);
    vm.view = "cal"; vm.calTitle = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][mo] + " 2026";
    vm.calPrev = () => set({ month: Math.max(8, mo - 1), sel: null }); vm.calNext = () => set({ month: Math.min(11, mo + 1), sel: null });
    const weeks = []; for (let w = start; w <= last; w += 7 * DAY) { const days = []; for (let i = 0; i < 7; i++) { const d = w + i * DAY; const de = evs.filter(e => e.d0 <= d && e.d1 >= d && (!["po", "ship"].includes(e.kind) || e.d0 === d || e.d1 === d));
      days.push({ n: String(new Date(d).getUTCDate()), dim: new Date(d).getUTCMonth() !== mo ? 0.45 : 1, today: d === TODAY ? "var(--brand)" : "transparent", todayFw: d === TODAY ? 700 : 600,
        events: de.slice(0, 3).map(e => { const s2 = sty(e); return { t: e.kind === "po" ? (e.d0 === d ? "Start " : "ETA ") + e.rec : e.kind === "launch" ? "Launch: " + e.rec : e.kind === "invoice" ? e.rec + " due" : e.kind === "ship" ? e.rec + (e.d1 === d ? " arrives" : " leaves") : e.label, ...s2, sel: S.sel === e.id || (selE && selE.id === e.id) ? "0 0 0 2px var(--brand)" : "none", open: () => set({ sel: e.id, focus: null }) }; }), more: de.length > 3 ? "+" + (de.length - 3) + " more" : "" }); } weeks.push({ days }); }
    vm.cal = { weeks, dows: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
    return vm;
  }
  if (m === "timeline") {
    const r0 = D(7, 15), r1 = D(11, 15); const span = r1 - r0; const X = t => Math.max(0, Math.min(100, (t - r0) / span * 100));
    vm.view = "tl"; const ticks = []; for (let mo = 8; mo <= 11; mo++) ticks.push({ left: X(D(mo, 1)) + "%", label: ["Sep", "Oct", "Nov", "Dec"][mo - 8] + " 1" });
    const groups = [["po", "Purchase orders"], ["ship", "Shipments"], ["launch", "Launches"], ["task", "Recurring tasks"], ["holiday", "Factory holidays"]];
    const rows = [];
    groups.filter(([k]) => showK(k)).forEach(([k, gl]) => { let list = evs.filter(e => e.kind === k && e.d1 >= r0 && e.d0 <= r1); if (k === "task") list = list.filter(e => TASKS.find(t => t.id === e.task).rule);
      if (k === "launch" || k === "task" || k === "holiday") { const keyed = k === "task" ? [...new Set(list.map(e => e.task))].map(id => [TASKS.find(t => t.id === id).t + " (" + TASKS.find(t => t.id === id).rule.toLowerCase() + ")", list.filter(e => e.task === id)]) : [[gl, list]];
        keyed.forEach(([lab, es]) => rows.push({ label: lab, sub: k === "task" ? "Each mark is one occurrence" : "", bars: es.map(e => { const s2 = sty(e); const pt = e.d0 === e.d1; return { left: X(e.d0) + "%", width: pt ? "12px" : Math.max(0.8, X(e.d1) - X(e.d0)) + "%", ...s2, rad: pt ? "99px" : "6px", h: pt ? "12px" : "18px", top: pt ? "9px" : "6px", label: pt ? "" : e.kind === "holiday" ? "" : "", title: e.label + ", " + fmt(e.d0), sel: selE && selE.id === e.id ? "0 0 0 2px var(--brand)" : "none", open: () => set({ sel: e.id, focus: null }) }; }) })); }
      else list.forEach(e => { const s2 = sty(e); rows.push({ label: e.rec, sub: e.label.replace(e.rec + ", ", ""), bars: [{ left: X(e.d0) + "%", width: Math.max(0.8, X(e.d1) - X(e.d0)) + "%", ...s2, rad: "6px", h: "18px", top: "6px", title: e.label + ", " + fmt(e.d0) + " – " + fmt(e.d1), sel: selE && selE.id === e.id ? "0 0 0 2px var(--brand)" : "none", open: () => set({ sel: e.id, focus: null }) }] }); }); });
    vm.tl = { ticks, today: X(TODAY) + "%", rows };
    return vm;
  }
  if (m === "partners") {
    vm.notes = ["Royalty terms aren't shown or calculated. Other studios on the live dashboard aren't modeled here."];
    const studios = (TK && comp ? TK.mergeOv(comp, "partners", STUDIOS, s => s.id) : STUDIOS).filter(s => !!s.archived === archM("partners"));
    const pq = (S.f.q || "").trim().toLowerCase(); vm.search = { value: S.f.q || "", ph: "Search partners", set: e => set({ f: { ...S.f, q: e.target.value } }) };
    const shopSt = s => /not connected/i.test(s.shopify) ? "Not connected" : /unknown/i.test(s.shopify) ? "Unknown" : "Mapped";
    vm.filters = [flt("st", "Status", [...new Set(studios.map(s => s.status))]), flt("tier", "Tier", [...new Set(studios.map(s => s.tier))]), flt("type", "Studio / type", [...new Set(studios.map(s => s.type))]), flt("shop", "Shopify", ["Mapped", "Unknown", "Not connected"])];
    const studiosF = sortBy(studios.filter(s => (fv("st") === "any" || s.status === fv("st")) && (fv("tier") === "any" || s.tier === fv("tier")) && (fv("type") === "any" || s.type === fv("type")) && (fv("shop") === "any" || shopSt(s) === fv("shop")) && (!pq || (s.name + " " + s.brands.join(" ")).toLowerCase().includes(pq))), WS.k,
      { name: (a, b) => a.name.localeCompare(b.name), type: (a, b) => a.type.localeCompare(b.type), status: (a, b) => a.status.localeCompare(b.status), tier: (a, b) => a.tier.localeCompare(b.tier), shop: (a, b) => shopSt(a).localeCompare(shopSt(b)) });
    vm.empty = "No partners match these filters.";
    vm.table = table([sh("Studio", "name"), sh("Type", "type"), "Brands", sh("Status", "status"), sh("Tier", "tier"), sh("Shopify", "shop"), "Users", "Products", "Notes"], "minmax(0,1fr) 180px minmax(0,1.2fr) 110px 150px minmax(0,1.2fr) 80px 90px minmax(0,1.2fr)", studiosF.map(s => ({ id: s.id, aria: s.name, cells: [cell(s.name, { b: 1 }), cell(s.type), cell(s.brands.join(", ") || "—"), cell("", { pill: pill(s.status, s.status === "Active" ? "green" : "neutral") }), cell(s.tier), cell(s.shopify), cell(s.users), cell(P.PRODUCTS.filter(p => s.brands.includes(p.partner)).length), cell(s.notes || "—")] })), S.sel, ["Users", "Products", "Notes"]);
    wire({ key: "partners", page: "partners", all: TK && comp ? TK.mergeOv(comp, "partners", STUDIOS, s => s.id) : STUDIOS, id: x => x.id, label: x => x.name, noun: "partner", sig: JSON.stringify([archM("partners"), S.f, WS]), allowed: TK && TK.canAny(role, ["partner.update", "partner.archive", "partner.delete"]),
      canU: TK && TK.can(role, "partner.update"), canA: TK && TK.canAny(role, ["partner.archive", "partner.update"]), canR: TK && TK.can(role, "partner.update"), canD: TK && TK.can(role, "partner.delete"), archive: true, archVisible: TK && TK.canAny(role, ["partner.update", "partner.archive", "partner.delete"]), archMode: archM("partners"), setArch: setArchM("partners"),
      onArchiveCons: ["Their users keep their accounts until access is changed separately.", "Linked products aren't archived."],
      fields: { status: { label: "Status", kind: "select", options: ["Active", "Paused", "Test only"], get: x => x.status, icon: "icon-circle-dot" }, tier: { label: "Tier", kind: "select", options: ["Standard", "Priority", "Not set in prototype"], get: x => x.tier, icon: "icon-layers" }, type: { label: "Studio / type", kind: "text", get: x => x.type }, notes: { label: "Notes (Lootbloc only)", kind: "notes", get: x => x.notes || "" } },
      quick: ["status", "tier"], moreKeys: ["status", "tier", "type", "notes"] });
    const s = studios.find(x => x.id === S.sel);
    if (s) { const prods = P.PRODUCTS.filter(p => s.brands.includes(p.partner)); const blocks = [];
      const canEP = !!(TK && TK.can(role, "partner.update")) && !s.archived;
      if (dtab === "overview") blocks.push(blk("Details", { sub: s.archived ? "Archived, read-only" : "", fields: edFields("partners", s.id, s, [["name", "Studio name", "text", { req: 1 }], ["type", "Studio / type", "text"], ["status", "Status", "sel", { opts: ["Active", "Paused", "Test only"] }], ["tier", "Tier", "sel", { opts: ["Standard", "Priority", "Not set in prototype"] }], ["notes", "Notes (Lootbloc only)", "area", { ph: "Only the Lootbloc team sees this" }]], canEP, s.name) }));
      if (dtab === "overview") blocks.push(blk("", { rows: [row("Royalty terms", { sub: s.royalty, fw: 500 }), row("Shopify", { right: s.shopify }), row("Users", { right: String(s.users), links: s.id !== "lb" ? [L("See roles", "icon-shield", () => go("users", { sub: "users", f: { scope: s.id === "ta" ? "Twin Atlas" : "Sample Partner K (synthetic)" } }))] : [] })] }));
      if (dtab === "products") blocks.push(prods.length ? blk("Linked products", { sub: prods.length + " products", rows: prods.map(p => row(p.name, { sub: p.partner + ", " + p.status, links: [A("Open product", "icon-layers", "Products.dc.html?open=" + encodeURIComponent(p.name)), L("Resources", "icon-library", () => go("resources", { f: { prod: p.name } }))] })) }) : blk("", { note: "No products linked." }));
      if (dtab === "access") blocks.push(s.id === "ta" ? blk("What Twin Atlas users can see", { rows: [row("Products, quotes, POs, shipments, inventory", { right: "Their brands only" }), row("Vendor names", { right: "Aliases only" }), row("Internal notes and Lootbloc-only files", { right: "Never" }), row("Sales", { right: "Twin Atlas Official Store" }), row("More tools (this area)", { right: "No access" })], actions: [btn("Open Partner Admin role", () => go("users", { sub: "roles", sel: "Partner Admin" }))] }) : blk("", { note: s.id === "lb" ? "In-house brand. Only Lootbloc staff." : "Synthetic test partner used to check that other partners never see each other's data." }));
      vm.det = detail({ kind: "Studio", title: s.name, sub: s.type, pills: [pill(s.status, s.status === "Active" ? "green" : "neutral")], tabs: [["overview", "Overview"], ["products", "Products"], ["access", "Access boundary"]], blocks }); }
    return vm;
  }
  if (m === "resources") {
    const res = [];
    P.PRODUCTS.forEach(p => PD.resourcesFor(p).forEach(r => res.push({ ...r, key: p.name + "|" + r.id, product: p.name, partner: p.partner, rec: ["Product", p.name, "Products.dc.html?open=" + encodeURIComponent(p.name) + "&tab=resources"] })));
    IV.FACTORY.forEach(f => f.docs.forEach((d, i) => res.push({ key: f.id + "|" + i, name: d.name, kind: d.kind.includes("QC") ? "QC" : "Invoice document", icon: "icon-receipt", fmt: d.name.split(".").pop().toUpperCase(), access: "team", source: "Attached to " + f.id, versions: [["v1", f.date, "Uploaded"]], preview: ["Demo document for " + f.id], product: f.products[0], partner: f.partner === "ta" ? (P.PRODUCTS.find(p => p.name === f.products[0]) || {}).partner || "—" : f.partner ? "Sample Partner K (synthetic)" : "Lootbloc", rec: ["Invoice", f.id, "Invoices.dc.html?open=" + f.id] })));
    const AL = { all: "Team + partner", team: "Lootbloc only" };
    const resAll = (TK && comp ? TK.mergeOv(comp, "resources", res, x => x.key) : res).map(x => { const inv = x.rec[0] === "Invoice"; const acc = inv ? "team" : x.accessL ? (x.accessL === AL.all ? "all" : "team") : x.access; return { ...x, access: acc, accessL: AL[acc] }; });
    const canUR = !!(TK && TK.can(role, "resource.update")), canAR = !!(TK && TK.can(role, "resource.archive"));
    const resV = resAll.filter(x => !x.deleted && !!x.archived === archM("resources"));
    vm.search = { value: S.f.q || "", ph: "Search files", set: e => set({ f: { ...S.f, q: e.target.value } }) }; const rq = (S.f.q || "").trim().toLowerCase();
    vm.filters = [flt("type", "Type", [...new Set(res.map(r => r.kind))]), flt("partner", "Partner", [...new Set(res.map(r => r.partner))]), flt("prod", "Product", [...new Set(res.map(r => r.product))]), flt("acc", "Access", [["all", "Team + partner"], ["team", "Lootbloc only"]])];
    const rows = resV.filter(r => (!rq || (r.name + " " + r.rec[1] + " " + r.product).toLowerCase().includes(rq)) && (fv("type") === "any" || r.kind === fv("type")) && (fv("partner") === "any" || r.partner === fv("partner")) && (fv("prod") === "any" || r.product === fv("prod")) && (fv("acc") === "any" || r.access === fv("acc")));
    vm.table = table(["File", "Type", "Linked record", "Partner", "Access", "Version", "Format", "Source", "Product", "Versions"], "minmax(0,1.3fr) 130px minmax(0,1.1fr) minmax(0,0.9fr) 140px 120px 90px minmax(0,1fr) minmax(0,1fr) 90px", rows.map(r => ({ id: r.key, aria: r.name, cells: [cell(r.name, { b: 1, sub: r.fmt + ", " + r.source }), cell(r.kind), cell(r.rec[1], { sub: r.rec[0] }), cell(r.partner), cell("", { pill: r.access === "all" ? pill("Team + partner", "blue") : pill("Lootbloc only", "neutral") }), cell(r.versions[0][0], { sub: r.versions[0][1] }), cell(r.fmt), cell(r.source), cell(r.product || "—"), cell(r.versions.length)] })), S.sel, ["Format", "Source", "Product", "Versions"]);
    wire({ key: "resources", page: "resources", all: resAll, id: x => x.key, label: x => x.name, noun: "file", sig: JSON.stringify([archM("resources"), S.f]), allowed: canUR || canAR,
      canU: canUR, canA: canAR, canR: canAR, canD: TK && TK.can(role, "resource.delete"), archive: true, archVisible: canUR || canAR, archMode: archM("resources"), setArch: setArchM("resources"),
      onArchiveCons: ["Partners stop seeing archived files right away.", "The linked product or invoice keeps its version history."],
      fields: { accessL: { label: "Who can see it", kind: "select", options: [AL.all, AL.team], get: x => x.accessL, icon: "icon-eye" }, kind: { label: "Type", kind: "select", options: [...new Set(res.map(x => x.kind))], get: x => x.kind, icon: "icon-tag" } },
      quick: ["accessL"], moreKeys: ["accessL", "kind"] });
    const r = resV.find(x => x.key === S.sel);
    if (r) { const blocks = []; const inv = r.rec[0] === "Invoice";
      if (dtab === "overview") blocks.push(blk("Details", { sub: r.archived ? "Archived, read-only" : "", fields: edFields("resources", r.key, r, [["name", "File name", "text", { req: 1, wide: 1 }], ["kind", "Type", "sel", { opts: [...new Set(res.map(x => x.kind))] }], ["accessL", "Who can see it", inv ? "ro" : "sel", { opts: [AL.all, AL.team], hint: inv ? "Invoice documents are always Lootbloc only." : r.access === "all" ? "Partners see this in their product's Resources tab." : "Never shown to partners." }], ["fmt", "Format", "ro"]], canUR && !r.archived, r.name) }));
      if (dtab === "overview") blocks.push(blk("Preview (in prototype)", { rows: r.preview.map(x => row(x, { fw: 500 })), note: "Demo file. There is no real attachment or public link." }), blk("", { rows: [row("Linked to", { right: r.rec[1], sub: r.rec[0], links: [A("Open " + r.rec[1], "icon-arrow-up-right", r.rec[2])] }), row("Source", { sub: r.source })] }));
      if (dtab === "versions") blocks.push(blk("Versions", { rows: r.versions.map(([v, d, w]) => row(v + ", " + d, { sub: w, fw: 500 })) }));
      vm.det = detail({ kind: r.kind, title: r.name, sub: r.fmt, pills: [pill(r.access === "all" ? "Team + partner" : "Lootbloc only", r.access === "all" ? "blue" : "neutral")], tabs: [["overview", "Preview"], ["versions", "Versions"]], blocks }); }
    vm.empty = "No files match these filters.";
    return vm;
  }
  return vm;
}
