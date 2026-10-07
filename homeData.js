// Shared mock data for the Home redesign directions. Values are illustrative.
export const USERS = {
  ops: { name: "Jordan", initial: "J", role: "Ops Staff" },
  finance: { name: "Priya", initial: "P", role: "Finance" },
  partner: { name: "Twin Atlas", initial: "T", role: "Partner Admin" },
};

export const ATTENTION = {
  ops: [
    { id: "a1", tone: "red", icon: "truck", group: "Overdue", title: "Shipment SH-2291 is 3 days late", ctx: "1,200 units of Sonaria Plush Wave 2 on a Maersk ship from Yantian to Long Beach", why: "It was due Sep 26. Two plush SKUs run out Oct 4 if it slips another week.", action: "Check tracking", step: "In transit", stepN: 3, stepOf: 5 },
    { id: "a2", tone: "red", icon: "package", group: "Today", title: "Reorder World Zero Hoodie (Black, L)", ctx: "19 days of stock left and no PO on the way", why: "Sells about 24 a day. Factory lead time is 38 days, so a PO today still leaves a gap.", action: "Start a PO", stepN: 0, stepOf: 0 },
    { id: "a3", tone: "amber", icon: "square-check-big", group: "Today", title: "Approve factory sample: Sonaria Glacier Plush", ctx: "Sample from Dongguan Toys has waited 2 days", why: "Production can't start until this sample is approved.", action: "Review sample", step: "Sampling", stepN: 3, stepOf: 8 },
    { id: "a4", tone: "amber", icon: "receipt", group: "Today", title: "Add the deposit invoice for PO-1043", ctx: "$6,400 owed to Shenzhen Apparel by Oct 2", why: "The factory sent it by email yesterday. Nothing is recorded yet.", action: "Add invoice", step: "Deposit", stepN: 2, stepOf: 7 },
    { id: "a5", tone: "blue", icon: "calendar-days", group: "This week", title: "PO-1051 has no ship date", ctx: "Production finishes Oct 8", why: "Without a ship date the inventory forecast can't count these units.", action: "Add ship date", step: "Production", stepN: 4, stepOf: 7 },
  ],
  finance: [
    { id: "f1", tone: "red", icon: "receipt", group: "Overdue", title: "Invoice INV-3312 is 6 days overdue", ctx: "$6,450 balance owed to Dongguan Toys for PO-1038", why: "The factory is holding the next shipment until it's paid.", action: "Record payment", step: "Balance", stepN: 5, stepOf: 7 },
    { id: "f2", tone: "red", icon: "refresh-cw", group: "Today", title: "3 invoices failed to sync to QuickBooks", ctx: "Vendor isn't mapped yet, last tried 2 hours ago", why: "Map \"Shenzhen Apparel Co.\" to a QuickBooks vendor and retry.", action: "Fix mapping", stepN: 0, stepOf: 0 },
    { id: "f3", tone: "amber", icon: "receipt", group: "Today", title: "Add the deposit invoice for PO-1043", ctx: "$6,400 owed to Shenzhen Apparel by Oct 2", why: "Received by email yesterday. Nothing is recorded yet.", action: "Add invoice", step: "Deposit", stepN: 2, stepOf: 7 },
    { id: "f4", tone: "amber", icon: "hand-coins", group: "Today", title: "2 reimbursements to approve", ctx: "$412.80 for sample shipping and a trade show", why: "Submitted Friday. Staff are paid out on Thursdays.", action: "Review", stepN: 0, stepOf: 0 },
    { id: "f5", tone: "blue", icon: "dollar-sign", group: "This week", title: "September partner payouts are ready to review", ctx: "$21,740 across 4 partners", why: "Numbers are final once Shopify's Sep 30 sync lands.", action: "Open payouts", stepN: 0, stepOf: 0 },
  ],
  partner: [
    { id: "p1", tone: "amber", icon: "badge-check", group: "Today", title: "Approve sample: Sonaria Glacier Plush", ctx: "Lootbloc uploaded photos 2 days ago", why: "Production starts as soon as you approve. Each day of waiting pushes the launch.", action: "Review sample", step: "Partner review", stepN: 4, stepOf: 8 },
    { id: "p2", tone: "amber", icon: "badge-check", group: "Today", title: "Approve artwork: World Zero Keychain Set", ctx: "3 designs waiting on you since yesterday", why: "Final artwork goes to the factory after your sign-off.", action: "Review artwork", step: "Partner review", stepN: 4, stepOf: 8 },
    { id: "p3", tone: "blue", icon: "truck", group: "This week", title: "Sonaria Keychains arrive Oct 3", ctx: "2,000 units on DHL, on schedule", why: "They'll be live in the store about 2 days after arrival.", action: "Track shipment", step: "In transit", stepN: 3, stepOf: 5 },
    { id: "p4", tone: "blue", icon: "warehouse", group: "This week", title: "Sonaria Plush Wave 1 is running low", ctx: "About 5 days left with a restock arriving", why: "Lootbloc already ordered more. Nothing needed from you.", action: "See forecast", stepN: 0, stepOf: 0 },
  ],
};

export const QUICK = {
  ops: [
    { icon: "package", label: "New purchase order", hint: "Order from a factory" },
    { icon: "receipt", label: "Add invoice", hint: "From a factory or vendor" },
    { icon: "list-checks", label: "Add task", hint: "For you or a teammate" },
    { icon: "sticky-note", label: "Note on a product", hint: "Visible to your team" },
    { icon: "warehouse", label: "Check stock", hint: "Look up any SKU" },
  ],
  finance: [
    { icon: "receipt", label: "Add invoice", hint: "From a factory or vendor" },
    { icon: "credit-card", label: "Record payment", hint: "Mark an invoice paid" },
    { icon: "refresh-cw", label: "Sync QuickBooks", hint: "Last synced 2h ago" },
    { icon: "hand-coins", label: "Reimbursement", hint: "Submit or approve" },
    { icon: "download", label: "Export report", hint: "CSV for any period" },
  ],
  partner: [
    { icon: "badge-check", label: "Review approvals", hint: "2 waiting on you" },
    { icon: "layers", label: "My products", hint: "Where each one is" },
    { icon: "warehouse", label: "Check stock", hint: "Days left per item" },
    { icon: "truck", label: "Track shipments", hint: "What's on the way" },
    { icon: "message-square", label: "Message Lootbloc", hint: "Replies within a day" },
  ],
};

export const KPIS = {
  ops: [
    { label: "In transit", value: "5", note: "1 late", tone: "red", icon: "truck" },
    { label: "Waiting for approval", value: "3", note: "oldest 4 days", tone: "amber", icon: "square-check-big" },
    { label: "Open purchase orders", value: "19", note: "8 in production", tone: "none", icon: "package" },
    { label: "SKUs low on stock", value: "12", note: "3 critical", tone: "red", icon: "warehouse" },
  ],
  finance: [
    { label: "Owed to factories", value: "$48.2k", note: "$6.4k overdue", tone: "red", icon: "receipt" },
    { label: "Due this week", value: "$12.9k", note: "3 invoices", tone: "amber", icon: "calendar-days" },
    { label: "30-day sales", value: "$182.4k", note: "+12% vs Aug", tone: "green", icon: "trending-up" },
    { label: "Payouts to review", value: "$21.7k", note: "4 partners", tone: "none", icon: "hand-coins" },
  ],
  partner: [
    { label: "Products in progress", value: "23", note: "4 in production", tone: "none", icon: "layers" },
    { label: "Waiting on you", value: "2", note: "approvals", tone: "amber", icon: "badge-check" },
    { label: "Live products", value: "38", note: "across 3 games", tone: "none", icon: "circle-check" },
    { label: "30-day sales", value: "$64.1k", note: "+8% vs Aug", tone: "green", icon: "trending-up" },
  ],
};

export const SHIP_STEPS = ["Pickup", "Departed", "In transit", "Out for delivery", "Delivered"];
export const SHIPMENTS = [
  { id: "SH-2291", name: "Sonaria Plush Wave 2", carrier: "Maersk", route: "Yantian → Long Beach", step: 3, eta: "3 days late", tone: "red" },
  { id: "SH-2302", name: "World Zero Hoodies", carrier: "FedEx", route: "Shenzhen → Reno", step: 4, eta: "Tomorrow", tone: "amber" },
  { id: "SH-2307", name: "Sonaria Keychains", carrier: "DHL", route: "Ningbo → Reno", step: 3, eta: "Oct 3", tone: "none" },
  { id: "SH-2310", name: "Mystery Box S3", carrier: "UPS", route: "Los Angeles → Reno", step: 5, eta: "Delivered today", tone: "green" },
];

export const INVENTORY = {
  critical: 3, low: 9, healthy: 128, nodata: 14,
  atRisk: [
    { name: "World Zero Hoodie (Black, L)", sku: "WZ-HD-BLK-L", days: 19, restock: null, ref: null, verdict: "Order now", tone: "red" },
    { name: "Sonaria Plush Wave 1", sku: "COS-PL-W1", days: 5, restock: 9, ref: "PO-1044", verdict: "4-day gap", tone: "red" },
    { name: "World Zero Mug (Logo)", sku: "WZ-MG-LOGO", days: 26, restock: 21, ref: "PO-1046", verdict: "On track", tone: "green" },
    { name: "World Zero Hoodie (Black, M)", sku: "WZ-HD-BLK-M", days: 27, restock: null, ref: null, verdict: "Order now", tone: "red" },
    { name: "Sonaria Keychains", sku: "COS-KC-MIX", days: 17, restock: 4, ref: "SH-2307", verdict: "On track", tone: "green" },
    { name: "Sonaria Pin Set", sku: "COS-PN-SET", days: 31, restock: null, ref: "PO-1051", refNote: "PO-1051 has no ship date yet", verdict: "Order soon", tone: "amber" },
  ],
};

export const PIPELINE = [
  { key: "concept", label: "Concept", count: 14, stuck: 0, items: ["Sonaria Tote Bag", "World Zero Beanie", "Sonaria Sticker Pack", "Mystery Box S4"] },
  { key: "design", label: "Design", count: 9, stuck: 0, items: ["World Zero Keychain Set", "Sonaria Desk Mat", "World Zero Poster"] },
  { key: "sampling", label: "Sampling", count: 7, stuck: 2, items: ["Sonaria Glacier Plush", "World Zero Figure", "Sonaria Hoodie"] },
  { key: "review", label: "Partner review", count: 4, stuck: 1, items: ["World Zero Keychain Set", "Sonaria Glacier Plush"] },
  { key: "production", label: "Production", count: 11, stuck: 0, items: ["World Zero Hoodie restock", "Sonaria Mug", "PO-1051 Pins"] },
  { key: "inbound", label: "On the way", count: 5, stuck: 1, items: ["Sonaria Plush Wave 2", "World Zero Hoodies", "Sonaria Keychains"] },
  { key: "warehouse", label: "At warehouse", count: 3, stuck: 0, items: ["Mystery Box S3", "World Zero Socks"] },
  { key: "live", label: "Live", count: 142, stuck: 0, items: ["142 products selling"] },
];

export const MONEY = {
  owed: "$48,210", overdue: "$6,450", dueWeek: "$12,900",
  aging: [
    { label: "Not due yet", value: 31800, text: "$31.8k", tone: "neutral" },
    { label: "1–30 days late", value: 9960, text: "$10.0k", tone: "amber" },
    { label: "31–60 days late", value: 6450, text: "$6.5k", tone: "red" },
  ],
  sales: [42, 38, 45, 51, 47, 55, 60, 58, 49, 62, 70, 66, 72, 68, 75, 81, 77, 74, 88, 92, 85, 90, 97, 94, 101, 96, 108, 112, 104, 118],
};

export const WEEK = [
  { d: "Mon", n: "28", past: true, events: [{ t: "PO-1047 deposit paid", k: "money", tone: "green" }] },
  { d: "Tue", n: "29", today: true, events: [
    { t: "SH-2291 is 3 days late", k: "truck", tone: "red" },
    { t: "Glacier Plush sample due", k: "square-check-big", tone: "amber" },
    { t: "Hoodies out for delivery", k: "truck", tone: "blue" } ] },
  { d: "Wed", n: "30", events: [
    { t: "World Zero Hoodies arrive", k: "truck", tone: "blue" },
    { t: "Sep payouts close", k: "hand-coins", tone: "neutral" } ] },
  { d: "Thu", n: "1", events: [{ t: "Keychain Set goes live", k: "sparkles", tone: "brand" }] },
  { d: "Fri", n: "2", events: [
    { t: "$6,400 invoice due", k: "receipt", tone: "amber" },
    { t: "Twin Atlas recap", k: "list-checks", tone: "neutral" } ] },
  { d: "Sat", n: "3", events: [{ t: "Sonaria Keychains arrive", k: "truck", tone: "blue" }] },
  { d: "Sun", n: "4", events: [{ t: "Plush Wave 1 runs out", k: "warehouse", tone: "red" }] },
];

export const TASKS = [
  { t: "Confirm carton sizes with Dongguan Toys", link: "PO-1047", due: "1 day late", tone: "red" },
  { t: "Upload QC photos for PO-1047", link: "PO-1047", due: "Today", tone: "amber" },
  { t: "Update SKU list for World Zero S2", link: "World Zero", due: "Oct 1", tone: "none" },
  { t: "Send Twin Atlas monthly recap", link: "Twin Atlas", due: "Oct 2", tone: "none" },
];

export const FOCUS = {
  title: "World Zero Hoodie restock (PO-1043)",
  sub: "2,400 units from Shenzhen Apparel for $12,800",
  steps: [
    { label: "Quote approved", state: "done", meta: "Sep 18" },
    { label: "Deposit invoice recorded", state: "now", meta: "Needs you" },
    { label: "Deposit paid", state: "next", meta: "Finance" },
    { label: "In production", state: "next", meta: "~21 days" },
    { label: "Quality check", state: "next", meta: "" },
    { label: "Shipped", state: "next", meta: "" },
    { label: "Received at warehouse", state: "next", meta: "" },
  ],
};
