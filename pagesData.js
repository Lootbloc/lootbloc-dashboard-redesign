// Mock data for the redesigned pages. Values are illustrative.
export const PO_PIPE = {
  production: ["draft", "submitted_order", "payment_needed", "sourcing_materials", "molding_tooling", "in_production", "testing", "finished", "shipped", "received", "waiting_approval", "completed"],
  sample: ["draft", "concept", "designing", "submitted_order", "payment_needed", "sourcing_materials", "molding_tooling", "in_sampling", "finished", "shipped", "received", "waiting_approval", "completed"],
};
export const PO_LABEL = { draft: "Draft", concept: "Concept", designing: "Designing", submitted_order: "Submitted order", payment_needed: "Payment needed", sourcing_materials: "Sourcing materials", molding_tooling: "Molding / tooling", in_sampling: "In sampling", in_production: "In production", testing: "Testing", finished: "Finished", shipped: "Shipped", received: "Received", waiting_approval: "Waiting approval", completed: "Completed", revision_requested: "Revision requested", rejected: "Rejected", attention_needed: "Attention needed", cancelled: "Cancelled" };
// Friendly phases that group the raw statuses (shown as the progress bar)
export const PO_PHASES = [
  { key: "setup", label: "Set up", st: ["draft", "concept", "designing", "submitted_order"] },
  { key: "pay", label: "Deposit", st: ["payment_needed"] },
  { key: "make", label: "Making", st: ["sourcing_materials", "molding_tooling", "in_sampling", "in_production", "testing", "finished"] },
  { key: "ship", label: "Shipping", st: ["shipped"] },
  { key: "receive", label: "Receive & approve", st: ["received", "waiting_approval"] },
  { key: "done", label: "Done", st: ["completed"] },
];

export const POS = [
  { id: "PO-1043", type: "Production", partner: "World Zero", vendor: "Shenzhen Apparel Co.", products: ["World Zero Hoodie (Black)"], status: "payment_needed", total: "$12,800.00", units: "2,400", next: "Add the deposit invoice", who: "You", tone: "amber", due: "Due Oct 2", tasks: 1, created: "Sep 18", eta: "Nov 14", terms: "30/70", inco: "FOB Shenzhen", view: "action" },
  { id: "PO-1038", type: "Production", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", products: ["Sonaria Plush Wave 2"], status: "shipped", total: "$18,240.00", units: "1,200", next: "Shipment SH-2291 is 3 days late", who: "Carrier", tone: "red", due: "Was due Sep 26", tasks: 2, created: "Jul 30", eta: "Sep 26", terms: "30/70", inco: "FOB Yantian", view: "action" },
  { id: "PO-1050", type: "Sample", partner: "Lootbloc", vendor: "Guangzhou Figures", products: ["Mystery Box S4 Figure"], status: "attention_needed", total: "$1,100.00", units: "20", next: "Factory flagged a material problem", who: "You", tone: "red", due: "Since Sep 27", tasks: 1, created: "Sep 10", eta: "—", terms: "100%", inco: "EXW", view: "action" },
  { id: "PO-1047", type: "Sample", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", products: ["Sonaria Glacier Plush"], status: "in_sampling", total: "$1,450.00", units: "12", next: "Factory sample due today", who: "Factory", tone: "amber", due: "Today", tasks: 2, created: "Sep 2", eta: "Oct 3", terms: "100%", inco: "FOB Yantian", view: "action" },
  { id: "PO-1051", type: "Production", partner: "Creatures of Sonaria", vendor: "Yiwu Packaging", products: ["Sonaria Pin Set"], status: "in_production", total: "$2,380.00", units: "3,000", next: "Add an expected ship date", who: "You", tone: "amber", due: "Finishes Oct 8", tasks: 0, created: "Sep 5", eta: "Not set", terms: "50/50", inco: "FOB Ningbo", view: "action" },
  { id: "PO-1052", type: "Sample", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", products: ["Sonaria Glacier Plush"], status: "waiting_approval", total: "$900.00", units: "6", next: "Waiting for Twin Atlas to approve", who: "Partner", tone: "blue", due: "2 days", tasks: 0, created: "Aug 28", eta: "—", terms: "100%", inco: "FOB Yantian", view: "making" },
  { id: "PO-1044", type: "Production", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", products: ["Sonaria Plush Wave 1 restock"], status: "in_production", total: "$9,860.00", units: "800", next: "On track. Finishes Oct 6", who: "Factory", tone: "none", due: "Oct 6", tasks: 0, created: "Aug 20", eta: "Oct 8", terms: "30/70", inco: "FOB Yantian", view: "making" },
  { id: "PO-1045", type: "Production", partner: "World Zero", vendor: "Ningbo Metalworks", products: ["World Zero Keychain Set"], status: "testing", total: "$4,120.00", units: "2,000", next: "QC report due Oct 1", who: "Factory", tone: "none", due: "Oct 1", tasks: 1, created: "Aug 14", eta: "Oct 3", terms: "30/70", inco: "FOB Ningbo", view: "making" },
  { id: "PO-1049", type: "Sample", partner: "World Zero", vendor: "Guangzhou Figures", products: ["World Zero Figure"], status: "molding_tooling", total: "$3,200.00", units: "8", next: "On track. Molds ready Oct 4", who: "Factory", tone: "none", due: "Oct 4", tasks: 0, created: "Sep 1", eta: "Oct 20", terms: "50/50", inco: "EXW", view: "making" },
  { id: "PO-1053", type: "Production", partner: "World Zero", vendor: "Shenzhen Apparel Co.", products: ["World Zero Beanie", "World Zero Hoodie (Black)", "World Zero Keychain Set"], qtyBy: { "World Zero Beanie": 800, "World Zero Hoodie (Black)": 400 }, status: "draft", total: "—", units: "—", next: "Finish the draft: add quantities", who: "You", tone: "neutral", due: "Started Sep 28", tasks: 0, created: "Sep 28", eta: "—", terms: "—", inco: "—", view: "draft" },
  { id: "PO-1040", type: "Production", partner: "Lootbloc", vendor: "Yiwu Packaging", products: ["Mystery Box S3"], status: "received", total: "$6,700.00", units: "1,500", next: "Confirm the counts that arrived", who: "Warehouse", tone: "blue", due: "Arrived today", tasks: 1, created: "Jul 22", eta: "Sep 29", terms: "30/70", inco: "DDP Reno", view: "making" },
  { id: "PO-1036", type: "Production", partner: "Creatures of Sonaria", vendor: "Ningbo Metalworks", products: ["Sonaria Enamel Pins"], status: "completed", total: "$5,300.00", units: "2,500", next: "Complete", who: "", tone: "green", due: "Sep 12", tasks: 0, created: "Jun 30", eta: "Sep 10", terms: "30/70", inco: "FOB Ningbo", view: "done" },
];

export const INV = [
  { name: "Sonaria Glacier Keychain", sku: "COS-KC-GLC", partner: "Creatures of Sonaria", onHand: 0, alloc: 0, avail: 0, backorder: 216, incoming: 2000, incomingPo: "PO-1053", incomingIn: 60, rate: 14.0, days: 0, orderBy: "Overdue", reorderAt: 400, reorderQty: 2000, status: "gap", lead: 45 },
  { name: "Sonaria Plush Wave 1", sku: "COS-PL-W1", partner: "Creatures of Sonaria", onHand: 140, alloc: 22, avail: 118, incoming: 800, incomingPo: "PO-1044", incomingIn: 9, rate: 23.6, days: 5, orderBy: "Overdue", reorderAt: 600, reorderQty: 1200, status: "gap", lead: 38 },
  { name: "World Zero Hoodie (Black, L)", sku: "WZ-HD-BLK-L", partner: "World Zero", onHand: 492, alloc: 36, avail: 456, incoming: 0, incomingPo: null, incomingIn: null, rate: 24.0, days: 19, orderBy: "Today", reorderAt: 900, reorderQty: 1800, status: "order_now", lead: 38 },
  { name: "World Zero Hoodie (Black, M)", sku: "WZ-HD-BLK-M", partner: "World Zero", onHand: 610, alloc: 40, avail: 570, incoming: 0, incomingPo: null, incomingIn: null, rate: 21.2, days: 27, orderBy: "Today", reorderAt: 800, reorderQty: 1600, status: "order_now", lead: 38 },
  { name: "Sonaria Pin Set", sku: "COS-PN-SET", partner: "Creatures of Sonaria", onHand: 930, alloc: 12, avail: 918, incoming: 3000, incomingPo: "PO-1051", incomingIn: null, rate: 29.5, days: 31, orderBy: "Oct 12", reorderAt: 700, reorderQty: 3000, status: "order_soon", lead: 30 },
  { name: "World Zero Mug (Logo)", sku: "WZ-MG-LOGO", partner: "World Zero", onHand: 540, alloc: 8, avail: 532, incoming: 1000, incomingPo: "PO-1046", incomingIn: 21, rate: 20.4, days: 26, orderBy: "Covered", reorderAt: 400, reorderQty: 1000, status: "on_track", lead: 34 },
  { name: "Sonaria Keychains", sku: "COS-KC-MIX", partner: "Creatures of Sonaria", onHand: 210, alloc: 4, avail: 206, incoming: 2000, incomingPo: "SH-2307", incomingIn: 4, rate: 12.1, days: 17, orderBy: "Covered", reorderAt: 300, reorderQty: 2000, status: "on_track", lead: 30 },
  { name: "Mystery Box S3", sku: "LB-MB-S3", partner: "Lootbloc", onHand: 1500, alloc: 120, avail: 1380, incoming: 0, incomingPo: null, incomingIn: null, rate: 18.7, days: 74, orderBy: "Nov 20", reorderAt: 500, reorderQty: 1500, status: "on_track", lead: 45 },
  { name: "World Zero Socks", sku: "WZ-SK-2PK", partner: "World Zero", onHand: 880, alloc: 10, avail: 870, incoming: 0, incomingPo: null, incomingIn: null, rate: 9.8, days: 89, orderBy: "Dec 4", reorderAt: 300, reorderQty: 1000, status: "on_track", lead: 30 },
  { name: "Sonaria Sticker Pack", sku: "COS-ST-PK", partner: "Creatures of Sonaria", onHand: 2400, alloc: 0, avail: 2400, incoming: 0, incomingPo: null, incomingIn: null, rate: 0, days: null, orderBy: "—", reorderAt: 0, reorderQty: 0, status: "unknown", lead: 21 },
  { name: "World Zero Poster Set", sku: "WZ-PS-SET", partner: "World Zero", onHand: 360, alloc: 0, avail: 360, incoming: 0, incomingPo: null, incomingIn: null, rate: 0, days: null, orderBy: "—", reorderAt: 0, reorderQty: 0, status: "unknown", lead: 21 },
];

export const SHIPS = [
  { id: "SH-2291", carrier: "Maersk", tracking: "MAEU 4812 3390", products: "Sonaria Plush Wave 2", po: "PO-1038", partner: "Creatures of Sonaria", type: "Ocean freight", from: "Yantian, CN", to: "Long Beach, US", step: 3, eta: "Sep 26", etaText: "3 days late", tone: "red", tasks: 2, view: "late", units: "1,200", trk: { src: "carrier", state: "stale", updated: "2 days ago", at: "Sep 27, 6:10 PM" }, actual: null },
  { id: "SH-2302", items: [{ name: "World Zero Hoodie (Black)", qty: 600 }], carrier: "FedEx", tracking: "7749 2018 5561", products: "World Zero Hoodies", po: "PO-1039", partner: "World Zero", type: "Air", from: "Shenzhen, CN", to: "Reno, US", step: 4, eta: "Sep 30", etaText: "Tomorrow", tone: "amber", tasks: 0, view: "week", units: "600", trk: { src: "carrier", state: "fresh", updated: "12 min ago", at: "Today, 9:02 AM" }, actual: null },
  { id: "SH-2307", carrier: "DHL", tracking: "JD01 4600 2231", products: "Sonaria Keychains", po: "PO-1042", partner: "Creatures of Sonaria", type: "Air", from: "Ningbo, CN", to: "Reno, US", step: 3, eta: "Oct 3", etaText: "In 4 days", tone: "none", tasks: 0, view: "week", units: "2,000", trk: { src: "carrier", state: "fresh", updated: "40 min ago", at: "Today, 8:34 AM" }, actual: null },
  { id: "SH-2311", items: [{ name: "World Zero Keychain Set", qty: 1500 }, { name: "World Zero Mug (Logo)", qty: 500 }, { name: "World Zero Beanie", qty: null }], carrier: "Flexport", tracking: "FLXT 88213", products: "World Zero Keychain Set", po: "PO-1045", partner: "World Zero", type: "Ocean freight", from: "Ningbo, CN", to: "Long Beach, US", step: 1, eta: "Oct 28", etaText: "Oct 28", tone: "none", tasks: 1, view: "transit", units: "2,000", trk: { src: "carrier", state: "unavailable", updated: "No reply on the last check", at: "Today, 7:00 AM" }, actual: null },
  { id: "SH-2309", carrier: "UPS", tracking: "1Z 999 AA1 0123", products: "Glacier Plush samples", po: "PO-1047", partner: "Creatures of Sonaria", type: "Sample courier", from: "Dongguan, CN", to: "Los Angeles, US", step: 2, eta: "Oct 3", etaText: "In 4 days", tone: "none", tasks: 0, view: "week", units: "12", trk: { src: "carrier", state: "fresh", updated: "1 hr ago", at: "Today, 8:10 AM" }, actual: null },
  { id: "SH-2310", carrier: "UPS", tracking: "1Z 999 AA1 0456", products: "Mystery Box S3", po: "PO-1040", partner: "Lootbloc", type: "Ground", from: "Los Angeles, US", to: "Reno, US", step: 5, eta: "Sep 29", etaText: "Delivered today", tone: "green", tasks: 1, view: "delivered", units: "1,500", trk: { src: "carrier", state: "closed", updated: "Delivered, tracking closed", at: "Sep 29, 11:40 AM" }, actual: "Sep 29" },
  { id: "SH-2288", carrier: "Evergreen", tracking: "EGLV 1420 5572", products: "Sonaria Enamel Pins", po: "PO-1036", partner: "Creatures of Sonaria", type: "Ocean freight", from: "Ningbo, CN", to: "Long Beach, US", step: 5, eta: "Sep 10", etaText: "Delivered Sep 10", tone: "green", tasks: 0, view: "delivered", units: "2,500", trk: { src: "manual", state: "closed", updated: "Entered by hand", at: "Sep 10" }, actual: "Sep 10" },
];
export const SHIP_STEPS = ["Picked up", "Left origin", "In transit", "Out for delivery", "Delivered"];

export const APPROVALS = [
  { id: "ap1", product: "Sonaria Glacier Plush", partner: "Creatures of Sonaria", type: "Partner sample", po: "PO-1052", rev: 2, waiting: "2 days", from: "Lootbloc (Jordan)", note: "Revision 2: fixed the ice-crystal embroidery and softened the blue. Photos in natural light plus a size comparison.", checks: ["Colors match the approved artwork", "Embroidery is clean", "Tag and label are correct", "Size matches spec: 30 cm"], photos: 4 },
  { id: "ap2", product: "World Zero Keychain Set", partner: "World Zero", type: "Tech pack", po: "PO-1045", rev: 1, waiting: "1 day", from: "Ningbo Metalworks", note: "Final artwork for 3 designs. Enamel colors are Pantone-matched.", checks: ["All 3 designs included", "Pantone colors listed", "Backing card approved"], photos: 3 },
  { id: "ap3", product: "Sonaria Hoodie", partner: "Creatures of Sonaria", type: "Internal sample", po: "PO-1048", rev: 1, waiting: "4 days", from: "Shenzhen Apparel Co.", note: "First sample. Check print placement and fabric weight (380 gsm).", checks: ["Print placement", "Fabric weight 380 gsm", "Stitching", "Size run S–XL"], photos: 6 },
];
export const APPROVAL_HISTORY = [
  { product: "World Zero Mug (Logo)", type: "Go-Live", decision: "Approved", tone: "green", date: "Sep 26", by: "Twin Atlas" },
  { product: "Sonaria Glacier Plush", type: "Partner sample", decision: "Revisions requested", tone: "amber", date: "Sep 19", by: "Twin Atlas" },
  { product: "Mystery Box S3", type: "Go-Live", decision: "Approved", tone: "green", date: "Sep 12", by: "Jordan Reyes" },
  { product: "World Zero Figure", type: "Concept", decision: "Approved", tone: "green", date: "Sep 1", by: "Twin Atlas" },
  { product: "Sonaria Tote Bag", type: "Concept", decision: "Rejected", tone: "red", date: "Aug 28", by: "Twin Atlas" },
];

export const INVOICES = [
  { id: "INV-3312", vendor: "Dongguan Toys", po: "PO-1038", products: "Sonaria Plush Wave 2", kind: "Balance", amount: "$6,450.00", paid: "$0.00", due: "Sep 23", dueText: "6 days overdue", status: "Overdue", tone: "red", view: "overdue", tasks: 1 },
  { id: "INV-3320", vendor: "Shenzhen Apparel Co.", po: "PO-1043", products: "World Zero Hoodie (Black)", kind: "Deposit", amount: "$3,840.00", paid: "$0.00", due: "Oct 2", dueText: "Due in 3 days", status: "Unpaid", tone: "amber", view: "week", tasks: 0 },
  { id: "INV-3318", vendor: "Ningbo Metalworks", po: "PO-1045", products: "World Zero Keychain Set", kind: "Balance", amount: "$2,884.00", paid: "$1,236.00", due: "Oct 6", dueText: "Due in 1 week", status: "Partly paid", tone: "blue", view: "open", tasks: 0 },
  { id: "INV-3322", vendor: "Guangzhou Figures", po: "PO-1049", products: "World Zero Figure (sample)", kind: "Sample", amount: "$1,600.00", paid: "$0.00", due: "Oct 1", dueText: "Due in 2 days", status: "Ready to pay", tone: "amber", view: "week", tasks: 0 },
  { id: "INV-3301", vendor: "Yiwu Packaging", po: "PO-1040", products: "Mystery Box S3", kind: "Balance", amount: "$4,690.00", paid: "$0.00", due: "Oct 14", dueText: "Due in 2 weeks", status: "Unpaid", tone: "none", view: "open", tasks: 0 },
  { id: "INV-3325", vendor: "Dongguan Toys", po: "PO-1044", products: "Sonaria Plush Wave 1 restock", kind: "Deposit", amount: "$2,958.00", paid: "$0.00", due: "Oct 20", dueText: "Due in 3 weeks", status: "Unpaid", tone: "none", view: "open", tasks: 0 },
  { id: "INV-3290", vendor: "Ningbo Metalworks", po: "PO-1036", products: "Sonaria Enamel Pins", kind: "Balance", amount: "$3,710.00", paid: "$3,710.00", due: "Sep 15", dueText: "Paid Sep 14", status: "Paid", tone: "green", view: "paid", tasks: 0 },
];
export const REIMB = [
  { id: "QB-7711", to: "Twin Atlas", products: "Sonaria Plush Wave 2", covers: "Sample shipping, Aug", amount: "$412.80", sent: "Sep 22", due: "Oct 22", status: "Sent", tone: "blue" },
  { id: "QB-7704", to: "Twin Atlas", products: "World Zero Figure", covers: "Molds & tooling", amount: "$1,850.00", sent: "Sep 9", due: "Oct 9", status: "Sent", tone: "blue" },
  { id: "—", to: "Twin Atlas", products: "Sonaria Glacier Plush", covers: "Sample rounds 1–2", amount: "$660.00", sent: "Not sent", due: "—", status: "Draft", tone: "neutral" },
  { id: "QB-7690", to: "Twin Atlas", products: "Sonaria Enamel Pins", covers: "Freight", amount: "$1,204.50", sent: "Aug 28", due: "Sep 27", status: "Paid", tone: "green" },
];

export const STAGES = [
  { key: "concept", label: "Concept" }, { key: "design_dev", label: "Design / Dev" }, { key: "sampling", label: "Sampling" }, { key: "partner_review", label: "Partner review" },
  { key: "production", label: "Production" }, { key: "inbound", label: "Inbound" }, { key: "at_warehouse", label: "At warehouse" }, { key: "live", label: "Live" },
];
export const PRODUCTS = [
  { name: "Sonaria Glacier Plush", partner: "Creatures of Sonaria", type: "Plush", stage: "partner_review", status: "Partner Reviewing", days: 2, owner: "JR", launch: "Nov 15", retail: "$34.99", cost: "$7.40", shopify: "Draft", orders: 2, tasks: 1, flag: "Waiting on partner", tone: "amber", approvals: { internalSample: "approved", partnerSample: "pending", goLive: "not_started" } },
  { name: "World Zero Hoodie (Black)", partner: "World Zero", type: "Apparel", stage: "live", status: "Low Stock", days: 96, owner: "JR", launch: "Jun 24", retail: "$59.99", cost: "$14.20", shopify: "Active", orders: 1, tasks: 1, flag: "Low stock, reorder", tone: "red", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "approved" } },
  { name: "Sonaria Plush Wave 2", partner: "Creatures of Sonaria", type: "Plush", stage: "inbound", status: "Delayed", days: 34, owner: "SK", launch: "Oct 10", retail: "$29.99", cost: "$6.90", shopify: "Draft", orders: 1, tasks: 2, flag: "Shipment 3 days late", tone: "red", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "pending" } },
  { name: "World Zero Keychain Set", partner: "World Zero", type: "Accessories", stage: "production", status: "In Production", days: 12, owner: "SK", launch: "Oct 1", retail: "$14.99", cost: "$2.06", shopify: "Draft", orders: 1, tasks: 1, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "pending" } },
  { name: "World Zero Figure", partner: "World Zero", type: "Figure", stage: "sampling", status: "Sample in Production", days: 28, owner: "JR", launch: "Dec 1", retail: "$44.99", cost: "$9.80", shopify: "—", orders: 1, tasks: 0, flag: "Stuck 28 days", tone: "amber", approvals: { internalSample: "not_started", partnerSample: "not_started", goLive: "not_started" } },
  { name: "Sonaria Hoodie", partner: "Creatures of Sonaria", type: "Apparel", stage: "sampling", status: "Sample Received - Internal Review", days: 4, owner: "JR", launch: "Dec 5", retail: "$59.99", cost: "$14.60", shopify: "—", orders: 1, tasks: 1, flag: "Review the sample", tone: "amber", approvals: { internalSample: "pending", partnerSample: "not_started", goLive: "not_started" } },
  { name: "Sonaria Pin Set", partner: "Creatures of Sonaria", type: "Accessories", stage: "production", status: "In Production", days: 20, owner: "SK", launch: "Oct 20", retail: "$19.99", cost: "$0.79", shopify: "Draft", orders: 1, tasks: 0, flag: "No ship date", tone: "amber", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "not_started" } },
  { name: "Mystery Box S3", partner: "Lootbloc", type: "Bundle", stage: "at_warehouse", status: "Receiving / QC", days: 1, owner: "MP", launch: "Oct 2", retail: "$39.99", cost: "$4.47", shopify: "Draft", orders: 1, tasks: 1, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "pending" } },
  { name: "World Zero Beanie", partner: "World Zero", type: "Apparel", stage: "design_dev", status: "Tech Pack Ready", days: 6, owner: "MP", launch: "Jan 12", retail: "$24.99", cost: "$4.10", shopify: "—", orders: 1, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "not_started", partnerSample: "not_started", goLive: "not_started" } },
  { name: "Sonaria Tote Bag", partner: "Creatures of Sonaria", type: "Accessories", stage: "concept", status: "Idea Logged", days: 11, owner: "MP", launch: "—", retail: "$22.99", cost: "—", shopify: "—", orders: 0, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "not_started", partnerSample: "not_started", goLive: "not_started" } },
  { name: "World Zero Mug (Logo)", partner: "World Zero", type: "Drinkware", stage: "live", status: "In Stock", days: 120, owner: "SK", launch: "May 30", retail: "$17.99", cost: "$3.10", shopify: "Active", orders: 1, tasks: 0, flag: "", tone: "none", approvals: { internalSample: "approved", partnerSample: "approved", goLive: "approved" } },
  { name: "Mystery Box S4", partner: "Lootbloc", type: "Bundle", stage: "concept", status: "On Hold", days: 18, owner: "MP", launch: "—", retail: "$39.99", cost: "—", shopify: "—", orders: 1, tasks: 1, flag: "Material problem on sample PO", tone: "red", approvals: { internalSample: "not_started", partnerSample: "not_started", goLive: "not_started" } },
];

export const NOTES = [
  { who: "Jordan Reyes", initial: "J", when: "Yesterday, 4:12 PM", text: "Factory confirmed the blue is Pantone 2905 C. Revision 2 photos are uploaded.", internal: true },
  { who: "Twin Atlas", initial: "T", when: "Sep 19", text: "Love it. The crystals on the back look messy, can we clean up the embroidery?", internal: false },
];

export const PRODUCT_NOTES = {
  "Sonaria Glacier Plush": { internal: "Factory confirmed Pantone 2905 C. Rev 2 photos uploaded.", partner: "Rev 2 fixes the back embroidery. Please approve by Oct 1 to hold the Nov 15 launch." },
  "World Zero Hoodie (Black)": { internal: "L and M sell out first. Bump those sizes on the restock.", partner: "" },
  "Sonaria Plush Wave 2": { internal: "Vessel skipped Yantian. Maersk says new ETA Oct 2.", partner: "Arrival slipped about a week. Launch moves to Oct 10." },
  "World Zero Figure": { internal: "Molds took longer than quoted. Ask Guangzhou for a date.", partner: "" },
  "Sonaria Hoodie": { internal: "", partner: "" },
  "Sonaria Pin Set": { internal: "Yiwu hasn't confirmed a ship date.", partner: "" },
  "Mystery Box S4": { internal: "Resin supplier is out. Looking at alternatives.", partner: "" },
};
export const RELATED = {
  "Sonaria Glacier Plush": {
    tasks: [ { t: "Send rev 2 photos to Twin Atlas", status: "done", due: "Sep 27", who: "JR" }, { t: "Chase partner approval", status: "todo", due: "Today", who: "JR", tone: "amber" } ],
    pos: [ { id: "PO-1052", type: "Sample", vendor: "Dongguan Toys", status: "waiting_approval", units: 6, date: "Aug 28", amount: "$900.00", tasks: 0, internal: "Rev 2 fixes the embroidery.", partner: "" },
           { id: "PO-1047", type: "Sample", vendor: "Dongguan Toys", status: "in_sampling", units: 12, date: "Sep 2", amount: "$1,450.00", tasks: 2, internal: "", partner: "Final colorway sample for sign-off." } ],
    ships: [ { id: "SH-2309", type: "Sample courier", carrier: "UPS", tracking: "1Z 999 AA1 0123", step: 2, status: "In transit", eta: "Oct 3", internal: "", partner: "" } ],
    invoices: [ { id: "INV-3319", kind: "Sample", vendor: "Dongguan Toys", amount: "$1,450.00", status: "Paid", tone: "green", due: "Paid Sep 5" } ],
  },
  "World Zero Hoodie (Black)": {
    tasks: [ { t: "Create restock PO for L and M", status: "todo", due: "Today", who: "JR", tone: "amber" } ],
    pos: [ { id: "PO-1043", type: "Production", vendor: "Shenzhen Apparel Co.", status: "payment_needed", units: 2400, date: "Sep 18", amount: "$12,800.00", tasks: 1, internal: "Factory asked to split the deposit.", partner: "" },
           { id: "PO-1039", type: "Production", vendor: "Shenzhen Apparel Co.", status: "shipped", units: 600, date: "Aug 1", amount: "$8,520.00", tasks: 0, internal: "", partner: "" } ],
    ships: [ { id: "SH-2302", type: "Air", carrier: "FedEx", tracking: "7749 2018 5561", step: 4, status: "Out for delivery", eta: "Tomorrow", internal: "", partner: "" } ],
    invoices: [ { id: "INV-3320", kind: "Deposit", vendor: "Shenzhen Apparel Co.", amount: "$3,840.00", status: "Unpaid", tone: "amber", due: "Due Oct 2" }, { id: "INV-3288", kind: "Balance", vendor: "Shenzhen Apparel Co.", amount: "$5,964.00", status: "Paid", tone: "green", due: "Paid Aug 30" } ],
  },
  "Sonaria Plush Wave 2": {
    tasks: [ { t: "Get a new ETA from Maersk", status: "todo", due: "1 day late", who: "SK", tone: "red" }, { t: "Tell Twin Atlas about the delay", status: "done", due: "Sep 27", who: "SK" } ],
    pos: [ { id: "PO-1038", type: "Production", vendor: "Dongguan Toys", status: "shipped", units: 1200, date: "Jul 30", amount: "$18,240.00", tasks: 2, internal: "Balance held until arrival.", partner: "Shipped Sep 4." } ],
    ships: [ { id: "SH-2291", type: "Ocean freight", carrier: "Maersk", tracking: "MAEU 4812 3390", step: 3, status: "Delayed", eta: "3 days late", late: true, internal: "Vessel skipped a port.", partner: "Running about a week late." } ],
    invoices: [ { id: "INV-3312", kind: "Balance", vendor: "Dongguan Toys", amount: "$6,450.00", status: "Overdue", tone: "red", due: "6 days overdue" }, { id: "INV-3280", kind: "Deposit", vendor: "Dongguan Toys", amount: "$5,472.00", status: "Paid", tone: "green", due: "Paid Aug 2" } ],
  },
};

// Vendor aliases for partner-facing views (prototype display rule only, not access control).
export const VENDOR_ALIAS = { "Dongguan Toys": "Alpha", "Shenzhen Apparel Co.": "Bravo", "Guangzhou Figures": "Charlie", "Ningbo Metalworks": "Delta", "Yiwu Packaging": "Echo", "Suzhou Softgoods": "Foxtrot", "Hangzhou Knitworks": "Golf" };
export const vendorLabel = (v, partner) => !partner ? v : VENDOR_ALIAS[v] ? "Manufacturer " + VENDOR_ALIAS[v] : "Manufacturer";
export const partnerSafe = (text, partner) => { if (!partner || text == null) return text; let t = String(text);
  const extra = [["Shenzhen Apparel", "Bravo"], ["ShenzhenApparel", "Bravo"], ["Guangzhou Figures", "Charlie"], ["Ningbo Metalworks", "Delta"], ["Yiwu Packaging", "Echo"], ["Dongguan_", "Alpha_"], ["Yiwu", "Echo"]];
  for (const [v, a] of Object.entries(VENDOR_ALIAS)) t = t.split(v).join("Manufacturer " + a);
  for (const [v, a] of extra) t = t.split(v).join(a.endsWith("_") ? a : "Manufacturer " + a);
  return t; };

// DEMO quotes for the prototype. Prices are quote-specific; they never change a product's cost or a PO.
// Tier prices apply to orders of at least that many units. Unknown parts stay null / "unknown".
export const QUOTE_STATUS = ["requested", "received", "accepted", "declined", "expired"];
export const QUOTE_LABEL = { requested: "Requested", received: "Received", accepted: "Accepted", declined: "Declined", expired: "Expired" };
export const QUOTES = [
  { id: "QT-0412", product: "Sonaria Glacier Plush", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", status: "received", received: "Sep 3", valid: "Oct 3", currency: "USD", terms: "FOB Yantian", lead: "35 days", moq: 500,
    tiers: [{ qty: 500, unit: 6.10 }, { qty: 1000, unit: 5.70 }, { qty: 2500, unit: 5.35 }], pack: { state: "quoted", label: "Hang tag and polybag", unit: 0.12 }, tooling: { state: "none" }, file: "Dongguan_Glacier_quote_Sep3.pdf", via: "PDF emailed by the factory", po: null },
  { id: "QT-0419", product: "Sonaria Glacier Plush", partner: "Creatures of Sonaria", vendor: "Suzhou Softgoods", status: "received", received: "Sep 12", valid: "Oct 12", currency: "USD", terms: "FOB Shanghai", lead: "42 days", moq: 1000,
    tiers: [{ qty: 1000, unit: 5.95 }, { qty: 2500, unit: 5.40 }, { qty: 5000, unit: 4.95 }], pack: { state: "included" }, tooling: { state: "quoted", label: "Embroidery setup", amount: 350 }, file: "Suzhou_Softgoods_plush_quote.pdf", via: "PDF emailed by the factory", po: null },
  { id: "QT-0398", product: "World Zero Hoodie (Black)", partner: "World Zero", vendor: "Shenzhen Apparel Co.", status: "accepted", received: "Sep 10", valid: "Accepted Sep 18", currency: "USD", terms: "FOB Shenzhen", lead: "38 days", moq: 1200,
    tiers: [{ qty: 1200, unit: 5.60 }, { qty: 2400, unit: 5.20 }, { qty: 5000, unit: 4.90 }], pack: { state: "quoted", label: "Hang tags and polybags", unit: 0.12 }, tooling: { state: "none" }, file: "ShenzhenApparel_WZ_hoodie_quote.pdf", via: "PDF emailed by the factory", po: "PO-1043" },
  { id: "QT-0421", product: "World Zero Hoodie (Black)", partner: "World Zero", vendor: "Hangzhou Knitworks", status: "requested", received: "Asked Sep 26", valid: "Not received yet", currency: "USD", terms: "Not given yet", lead: "Not given yet", moq: null,
    tiers: [], pack: { state: "unknown" }, tooling: { state: "unknown" }, file: null, via: "Request sent by email", po: null },
  { id: "QT-0385", product: "Sonaria Plush Wave 2", partner: "Creatures of Sonaria", vendor: "Dongguan Toys", status: "accepted", received: "Jul 24", valid: "Accepted Jul 28", currency: "USD", terms: "FOB Yantian", lead: "40 days", moq: 600,
    tiers: [{ qty: 600, unit: 16.10 }, { qty: 1200, unit: 15.20 }, { qty: 2400, unit: 14.40 }], pack: { state: "unknown" }, tooling: { state: "unknown" }, file: "Dongguan_Wave2_quote_Jul24.pdf", via: "PDF emailed by the factory", po: "PO-1038" },
  { id: "QT-0424", product: "World Zero Beanie", partner: "World Zero", vendor: "Shenzhen Apparel Co.", status: "received", received: "Sep 27", valid: "Oct 27", currency: "USD", terms: "FOB Shenzhen", lead: "30 days", moq: 1200,
    tiers: [{ qty: 1200, unit: 3.60 }, { qty: 2400, unit: 3.35 }], pack: { state: "quoted", label: "Hang tag", unit: 0.10 }, tooling: { state: "none" }, file: "ShenzhenApparel_WZ_beanie_quote.pdf", via: "PDF emailed by the factory", po: null },
  { id: "QT-0409", product: "World Zero Figure", partner: "World Zero", vendor: "Guangzhou Figures", status: "received", received: "Aug 29", valid: "Oct 29", currency: "USD", terms: "EXW Guangzhou", lead: "50 days", moq: 1000,
    tiers: [{ qty: 1000, unit: 8.90 }, { qty: 3000, unit: 8.20 }], pack: { state: "quoted", label: "Window box", unit: 0.65 }, tooling: { state: "quoted", label: "Molds and tooling", amount: 1850 }, file: "GuangzhouFigures_WZ_figure_quote.pdf", via: "PDF emailed by the factory", po: null },
  { id: "QT-0417", product: "Mystery Box S4", partner: "Lootbloc", vendor: "Guangzhou Figures", status: "expired", received: "Aug 20", valid: "Expired Sep 20", currency: "USD", terms: "EXW Guangzhou", lead: "45 days", moq: 1500,
    tiers: [{ qty: 1500, unit: 3.10 }], pack: { state: "unknown" }, tooling: { state: "unknown" }, file: "GuangzhouFigures_S4_quote.pdf", via: "PDF emailed by the factory", po: null },
];
