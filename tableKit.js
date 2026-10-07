// Shared table utilities for the prototype: row selection, bulk bar, confirm/More-fields dialogs, toasts.
// Permissions here are MOCK display rules for the external Tweaks role, not backend authorization.
export const PERMS = {
  admin: ["*"],
  ops: ["resource.update", "resource.archive", "vendor.update", "vendor.archive", "partner.update", "partner.archive", "product.update", "product.archive", "purchaseOrder.update", "purchaseOrder.archive", "updatePoStatus", "shipment.update", "manageTracking", "carrier.edit", "inventory.adjust", "task.update", "manufacturerInvoice.update", "reimbursementInvoice.update"],
  finance: ["vendor.update", "manufacturerInvoice.update", "reimbursementInvoice.update", "reimbursementInvoice.recordPayment", "reimbursementInvoice.send", "task.update"],
  partner: [],
};
export const can = (role, p) => { const L = PERMS[role] || []; return L.includes("*") || L.includes(p); };
export const canAny = (role, ps) => ps.some(p => can(role, p));
const setK = (c, k, v) => c.setState(s => ({ [k]: typeof v === "function" ? v(s[k]) : v }));

// Selection. ids = visible, permitted rows in DISPLAY order. sig = reset signature (filters/sort/etc).
// preserve = keep selections across sig changes (shows hidden count).
export function selection(c, key, ids, o = {}) {
  const all = c.state.tsel || {}; const cur = all[key] || { ids: [], anchor: null, sig: o.sig };
  const put = p => c.setState(s => ({ tsel: { ...(s.tsel || {}), [key]: { ...((s.tsel || {})[key] || { ids: [], anchor: null, sig: o.sig }), ...p } } }));
  let chosen = c.__roleChanged ? [] : cur.ids;
  if (cur.sig !== o.sig) {
    if (!o.preserve) { chosen = []; c.__tk = c.__tk || {}; if (!c.__tk[key + o.sig]) { c.__tk[key + o.sig] = 1; queueMicrotask(() => { c.__tk[key + o.sig] = 0; put({ ids: [], anchor: null, sig: o.sig }); }); } }
    else { c.__tk = c.__tk || {}; if (!c.__tk[key + o.sig]) { c.__tk[key + o.sig] = 1; queueMicrotask(() => { c.__tk[key + o.sig] = 0; put({ sig: o.sig }); }); } }
  }
  if (o.universe) chosen = chosen.filter(id => o.universe.includes(id));
  const vis = new Set(ids); const visSel = chosen.filter(id => vis.has(id)); const hidden = o.preserve ? chosen.length - visSel.length : 0;
  const isSel = id => chosen.includes(id);
  const toggle = (id, e) => { if (e && e.stopPropagation) e.stopPropagation(); if (e && e.preventDefault && e.type === "keydown") e.preventDefault();
    const S0 = (c.state.tsel || {})[key] || { ids: [], anchor: null }; let next = S0.sig === o.sig || o.preserve ? [...S0.ids] : [];
    if (e && e.shiftKey && S0.anchor && ids.includes(S0.anchor)) { const a = ids.indexOf(S0.anchor), b = ids.indexOf(id); const rng = ids.slice(Math.min(a, b), Math.max(a, b) + 1); const on = !next.includes(id); next = on ? [...new Set([...next, ...rng])] : next.filter(x => !rng.includes(x)); }
    else next = next.includes(id) ? next.filter(x => x !== id) : [...next, id];
    put({ ids: next, anchor: id, sig: o.sig }); };
  const st = !visSel.length ? "none" : visSel.length === ids.length ? "all" : "some";
  const box = (on, mixed) => ({ bg: on || mixed ? "var(--brand)" : "var(--surface)", bd: on || mixed ? "var(--brand)" : "var(--fg3)", icon: on ? "icon-check" : mixed ? "icon-minus" : "", fg: "white" });
  const sz = o.phone ? "44px" : "28px";
  return {
    on: !!o.allowed && ids.length >= 0, allowed: !!o.allowed, count: chosen.length, visCount: visSel.length, hidden, ids: chosen, isSel,
    ck: (id, label) => { const on = isSel(id); return { show: !!o.allowed, on: String(on), aria: (on ? "Deselect " : "Select ") + label, ...box(on), sz, toggle: e => toggle(id, e), key: e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(id, e); } else if (e.key === "Escape") put({ ids: [], anchor: null }); }, rowBg: on ? "color-mix(in oklch, var(--brandSoft) 70%, transparent)" : null }; },
    head: { show: !!o.allowed && ids.length > 0, on: st === "some" ? "mixed" : String(st === "all"), aria: st === "all" ? "Deselect all visible rows" : "Select all " + ids.length + " visible rows", ...box(st === "all", st === "some"), sz,
      toggle: e => { if (e && e.stopPropagation) e.stopPropagation(); const S0 = (c.state.tsel || {})[key] || { ids: [] }; const base = S0.sig === o.sig || o.preserve ? S0.ids : []; put({ ids: st === "all" ? base.filter(x => !vis.has(x)) : [...new Set([...base, ...ids])], sig: o.sig }); },
      key: e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); e.currentTarget.click(); } } },
    clear: () => put({ ids: [], anchor: null }), escKey: e => { if (e.key === "Escape" && chosen.length) put({ ids: [], anchor: null }); },
  };
}

// Bulk bar values
export function bulkBar(sel, actions, noun) {
  const acts = actions.filter(a => a.show !== false).map(a => ({ label: a.label, icon: a.icon || "", do: a.do, bg: a.danger ? "transparent" : a.primary ? "var(--brand)" : "var(--surface)", fg: a.danger ? "var(--red)" : a.primary ? "white" : "var(--fg)", bd: a.danger ? "var(--redBar)" : a.primary ? "var(--brand)" : "var(--line)", dis: String(!!a.disabled), op: a.disabled ? 0.5 : 1, title: a.title || "" }));
  return { bulkOn: sel.allowed && sel.count > 0, bulkCount: sel.count + " " + noun + (sel.count === 1 ? "" : "s") + " selected", bulkHidden: sel.hidden ? sel.hidden + " selected " + (sel.hidden === 1 ? "is" : "are") + " hidden by filters" : "", bulkHasHidden: sel.hidden > 0, bulkClear: sel.clear, bulkActs: acts };
}

// Confirm dialog. cfg: { title, lead, items:[label], blocked:[{label, why}], cons:[text], confirm, danger, run: () => ({ ok, msg }) , focusBack }
export function openDialog(c, cfg) { c.__tkFocus = document.activeElement; c.setState({ tdlg: { ...cfg, phase: "idle", closing: false } }); }
const hiddenDoc = () => typeof document !== "undefined" && document.hidden;
export function closeDialog(c) { const D = c.state.tdlg; if (!D) return; const fin = () => { c.setState({ tdlg: null, tmf: null }); try { c.__tkFocus && c.__tkFocus.focus && c.__tkFocus.focus(); } catch (e) {} };
  if (D.closing || hiddenDoc()) { clearTimeout(c.__tkT); fin(); return; } c.setState({ tdlg: { ...D, closing: true } }); clearTimeout(c.__tkT); c.__tkT = setTimeout(fin, 160); }
export function dialogVals(c) {
  const D = c.state.tdlg; const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!D) return { dlgOn: false, dlgItems: [], dlgBlocked: [], dlgCons: [], dlgFields: [] };
  const run = () => { if (D.phase !== "idle" || D.noConfirm) return; if (D.fields && !Object.values(c.state.tmf || {}).some(v => v !== "" && v != null)) return; c.setState({ tdlg: { ...D, phase: "pending" } }); (hiddenDoc() ? f => queueMicrotask(f) : f => setTimeout(f, 650))(() => { let r; try { r = D.run ? D.run(c.state.tmf || {}) : { ok: true }; } catch (e) { r = { ok: false, msg: String(e) }; } c.setState(s => ({ tdlg: s.tdlg ? { ...s.tdlg, phase: r && r.ok === false ? "error" : "done", result: (r && r.msg) || "Done." } : null })); }); };
  const items = D.items || []; const shown = items.slice(0, 6);
  const fields = (D.fields || []).map(f => { const ed = (c.state.tmf || {})[f.key]; const vals = [...new Set(f.values.map(v => v == null || v === "" ? "—" : String(v)))];
    const cur = vals.length > 1 ? "Mixed (" + vals.length + " values)" : vals[0];
    const set = e => { const v = e && e.target ? e.target.value : e; c.setState(s => ({ tmf: { ...(s.tmf || {}), [f.key]: v } })); };
    return { label: f.label, cur, isSel: f.kind === "select", isText: f.kind !== "select", inType: f.kind === "number" ? "number" : f.kind === "date" ? "text" : "text", ph: f.kind === "date" ? "e.g. Oct 20" : vals.length > 1 ? "Leave blank to keep each value" : "Leave blank to keep", value: ed ?? "", set,
      opts: [{ v: "", l: "Keep current" }, ...(f.options || []).map(o => ({ v: o, l: o }))], changed: ed != null && ed !== "", bd: ed != null && ed !== "" ? "var(--brand)" : "var(--line)", warn: f.kind === "notes" && ed ? "This replaces the existing notes on " + f.values.length + " records." : f.warn && ed ? f.warn : "" }; });
  const nChanged = fields.filter(f => f.changed).length;
  const phase = D.phase; const pend = phase === "pending";
  return { dlgOn: true, dlgTitle: D.title, dlgLead: D.lead || "", dlgItems: shown.map(x => ({ t: x })), dlgMore: items.length > 6 ? "and " + (items.length - 6) + " more" : "", dlgHasItems: items.length > 0,
    dlgBlocked: (D.blocked || []).map(b => ({ t: b.label, why: b.why })), dlgHasBlocked: !!(D.blocked && D.blocked.length), dlgCons: (D.cons || []).map(t => ({ t })), dlgHasCons: !!(D.cons && D.cons.length),
    dlgFields: fields, dlgHasFields: fields.length > 0, dlgFieldNote: D.fields ? (nChanged ? nChanged + " field" + (nChanged > 1 ? "s" : "") + " will change. Fields you leave alone keep their current values." : "Only fields you change are updated. Mixed values stay as they are.") : "",
    dlgConfirmL: pend ? "Working…" : D.confirm || "Confirm", dlgConfirmDis: String(pend || D.noConfirm || (D.fields && !nChanged)), dlgConfirmOp: pend || D.noConfirm || (D.fields && !nChanged) ? 0.5 : 1, dlgConfirmBg: D.danger ? "var(--red)" : "var(--brand)",
    dlgIdle: phase === "idle" || pend, dlgDone: phase === "done", dlgErr: phase === "error", dlgResult: D.result || "", dlgCancelL: "Cancel",
    dlgOp: D.closing ? 0 : 1, dlgScale: D.closing || reduce ? "none" : "none", dlgAnim: D.closing ? "none" : reduce ? "tkFade 150ms linear" : "tkPop 200ms cubic-bezier(.16,1,.3,1)", dlgTrans: "opacity 160ms cubic-bezier(.7,0,.84,0)",
    dlgConfirm: run, dlgCancel: () => closeDialog(c), dlgKey: e => { if (e.key === "Escape") { e.stopPropagation(); closeDialog(c); } }, dlgProto: "Prototype: changes apply to demo data in this browser tab only." };
}
export function toast(c, msg, undo) { clearTimeout(c.__tkToast); c.setState({ ttoast: { msg, undo } }); c.__tkToast = setTimeout(() => c.setState({ ttoast: null }), 5000); }
export function toastVals(c) { const T = c.state.ttoast; return { toastOn: !!T, toastMsg: T ? T.msg : "", toastHasUndo: !!(T && T.undo), toastUndo: () => { if (T && T.undo) T.undo(); c.setState({ ttoast: null }); }, toastClose: () => c.setState({ ttoast: null }) }; }
// local overrides store: c.state.tov[page][id] = {...}
export const ov = (c, page) => ((c.state.tov || {})[page] || {});
export function patchOv(c, page, ids, patch) { const prev = {}; const cur = ov(c, page); ids.forEach(id => { prev[id] = cur[id] ? { ...cur[id] } : null; });
  c.setState(s => { const P = { ...((s.tov || {})[page] || {}) }; ids.forEach(id => { P[id] = { ...(P[id] || {}), ...(typeof patch === "function" ? patch(id) : patch) }; }); return { tov: { ...(s.tov || {}), [page]: P } }; });
  return () => c.setState(s => { const P = { ...((s.tov || {})[page] || {}) }; ids.forEach(id => { if (prev[id]) P[id] = prev[id]; else delete P[id]; }); return { tov: { ...(s.tov || {}), [page]: P } }; }); }

// Generic table wiring. cfg: { key, page, rows (displayed, mutated with .ck), all (all records incl. archived), id, label, noun,
//   allowed, sig, preserve, phone, bgKey, fields: {k: field}, quick: [keys], moreKeys: [keys], canU, canA, canD, archive: bool,
//   archMode: bool, setArch: fn(bool), deleteNoun, deleteOnly: bool, extraActs: [], blocked: fn(rec) -> why|null, onArchiveCons, onDeleteCons }
export function generic(c, cfg) {
  const rid = cfg.rowId || cfg.id; const recOf = id => cfg.all.find(x => cfg.id(x) === id);
  const sel = selection(c, cfg.key, cfg.rows.map(rid), { allowed: cfg.allowed, sig: cfg.sig + "|" + !!cfg.archMode, phone: cfg.phone, preserve: cfg.preserve });
  cfg.rows.forEach(r => { const id = rid(r); const rec = recOf(id) || r; r.ck = sel.ck(id, cfg.label(rec)); if (sel.isSel(id)) r[cfg.bgKey || "bg"] = r.ck.rowBg; });
  const pick = () => cfg.all.filter(r => sel.ids.includes(cfg.id(r))); const n = x => x + " " + cfg.noun + (x === 1 ? "" : "s");
  const F = cfg.fields || {};
  const fieldsDlg = (title, keys) => { const ps = pick(); openDialog(c, { title, lead: "Editing " + n(ps.length) + ".", items: ps.map(cfg.label), fields: keys.map(k2 => ({ ...F[k2], key: k2, values: ps.map(F[k2].get) })), confirm: "Apply changes",
    run: ed => { const ch = Object.entries(ed).filter(([, v]) => v !== "" && v != null); if (!ch.length) return { ok: false, msg: "Nothing changed." };
      const patch = Object.fromEntries(ch.map(([k2, v]) => [k2, F[k2] && F[k2].kind === "number" ? +v : v])); const undo = patchOv(c, cfg.page, ps.map(cfg.id), patch); sel.clear();
      const msg = "Updated " + ch.map(([k2]) => (F[k2].label || k2).replace(/ \(.*/, "")).join(", ") + " on " + n(ps.length) + "."; toast(c, msg, F.__noUndo ? null : undo); return { ok: true, msg }; } }); };
  const archive = () => { const ps = pick(); const blocked = cfg.blocked ? ps.map(r => ({ r, why: cfg.blocked(r) })).filter(x => x.why).map(x => ({ label: cfg.label(x.r), why: x.why })) : []; const ok = ps.filter(r => !blocked.some(b => b.label === cfg.label(r)));
    openDialog(c, { title: "Archive " + n(ok.length) + "?", lead: ok.length ? "Archived " + cfg.noun + "s leave the active list and become read-only. You can restore them." : "None of the selected " + cfg.noun + "s can be archived.", items: ok.map(cfg.label), blocked, noConfirm: !ok.length, cons: ok.length ? (cfg.onArchiveCons || []) : [], confirm: "Archive " + ok.length,
      run: () => { patchOv(c, cfg.page, ok.map(cfg.id), { archived: true, archivedOn: "Oct 1" }); sel.clear(); return { ok: true, msg: "Archived " + n(ok.length) + ". Open Archive to see or restore them." }; } }); };
  const restore = () => { const ps = pick(); openDialog(c, { title: "Restore " + n(ps.length) + "?", lead: "They return to the active list and can be edited again.", items: ps.map(cfg.label), confirm: "Restore", run: () => { patchOv(c, cfg.page, ps.map(cfg.id), { archived: false }); sel.clear(); return { ok: true, msg: "Restored " + n(ps.length) + "." }; } }); };
  const del = () => { const ps = pick(); openDialog(c, { title: (cfg.deleteOnly ? "Delete " : "Permanently delete ") + n(ps.length) + "?", lead: "This can't be undone.", items: ps.map(cfg.label), danger: true, confirm: cfg.deleteOnly ? "Delete " + n(ps.length) : "Delete permanently", cons: cfg.onDeleteCons || [],
    run: () => { patchOv(c, cfg.page, ps.map(cfg.id), { deleted: true }); sel.clear(); return { ok: true, msg: "Deleted " + n(ps.length) + " in this prototype (demo data only)." }; } }); };
  let acts;
  if (cfg.archMode) acts = [{ label: "Restore", icon: "icon-archive-restore", do: restore, show: cfg.canR ?? cfg.canA, primary: true }, { label: "Permanently delete", icon: "icon-trash-2", do: del, show: cfg.canD, danger: true }];
  else acts = [...(cfg.quick || []).map(k2 => ({ label: F[k2].short || F[k2].label, icon: F[k2].icon || "", do: () => fieldsDlg("Set " + (F[k2].short || F[k2].label).toLowerCase(), [k2]), show: F[k2].show ?? cfg.canU })),
    ...(cfg.moreKeys && cfg.moreKeys.length ? [{ label: "More fields", icon: "icon-sliders-horizontal", do: () => fieldsDlg("Edit fields", cfg.moreKeys), show: cfg.canU }] : []), ...(cfg.extraActs || []).map(a => ({ ...a, do: () => a.run(pick(), sel) })),
    ...(cfg.archive ? [{ label: "Archive", icon: "icon-archive", do: archive, show: cfg.canA }] : []), ...(cfg.deleteOnly ? [{ label: "Delete " + cfg.noun + "s", icon: "icon-trash-2", do: del, show: cfg.canD, danger: true }] : [])];
  const nArch = cfg.all.filter(r => r.archived).length;
  return { sel, pick, hdck: sel.head, phSelAll: sel.head.show && !!cfg.phone, tkEsc: sel.escKey, ...bulkBar(sel, acts, cfg.noun),
    archShow: !!cfg.archive && cfg.archVisible !== false, archOn: !!cfg.archMode, archOnS: String(!!cfg.archMode), archBd: cfg.archMode ? "var(--brand)" : "var(--line)", archBg: cfg.archMode ? "var(--brandSoft)" : "var(--surface)",
    archBtnL: cfg.archMode ? "Leave archive" : "Archive (" + nArch + ")", archCountT: n(nArch).replace(/^(\d+) /, "$1 archived "), archToggle: () => cfg.setArch(!cfg.archMode), archExit: () => cfg.setArch(false) };
}
export const mergeOv = (c, page, list, id) => { const O = ov(c, page); return list.map(r => O[id(r)] ? { ...r, ...O[id(r)] } : r).filter(r => !r.deleted); };

// ---- Product images (synthetic demo assets only). Same asset is used in rows, record panel and lightbox.
export const PRODUCT_IMGS = { "Sonaria Glacier Plush": "assets/products/sonaria-glacier-plush.png", "Sonaria Plush Wave 2": "assets/products/sonaria-plush-wave-2.png", "World Zero Hoodie (Black)": "assets/products/world-zero-hoodie-black.png", "World Zero Keychain Set": "assets/products/world-zero-keychain-set.png", "Mystery Box S3": "assets/products/mystery-box-s3.png" };
export function openImage(c, o) { c.__lbFocus = document.activeElement; c.setState({ tlb: o }); }
export function closeImage(c) { c.setState({ tlb: null }); const f = c.__lbFocus; queueMicrotask(() => { try { f && f.focus && f.focus(); } catch (e) {} }); }
export function thumb(c, name, o = {}) { const src = (o.allowed === false) ? null : PRODUCT_IMGS[name] || null;
  return { has: !!src, none: !src, src: src || "", bgImg: src ? 'url("' + src + '")' : "none", alt: "", aria: "View image for " + name, noneAria: o.allowed === false ? "Image not available" : "No image uploaded for " + name,
    open: e => { if (e) { e.stopPropagation(); if (e.preventDefault) e.preventDefault(); } if (src) openImage(c, { src, name, ctx: o.ctx || "" }); },
    key: e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); if (src) openImage(c, { src, name, ctx: o.ctx || "" }); } } }; }
export function imageVals(c) { const L = c.state.tlb; return { lbOn: !!L, lbSrc: L ? L.src : "", lbBg: L ? 'url("' + L.src + '")' : "none", lbName: L ? L.name : "", lbCtx: L ? L.ctx : "", lbAlt: L ? "Image of " + L.name + " (synthetic demo image)" : "",
  lbClose: e => { if (e && e.stopPropagation) e.stopPropagation(); closeImage(c); }, lbKey: e => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeImage(c); } else if (e.key === "Tab") { e.preventDefault(); const b = e.currentTarget.querySelector("button"); b && b.focus(); } }, lbStop: e => e.stopPropagation() }; }
// ---- Circular product chips with per-product quantities
// items: [{ name, qty (number|null) }], max visible, link(name) -> href|null
export function chips(c, items, o = {}) { const max = o.max || 2; const vis = items.slice(0, max);
  const list = vis.map(it => { const ok = o.allowed ? o.allowed(it.name) : true; const t = thumb(c, it.name, { allowed: ok, ctx: o.ctx }); const href = ok && o.link ? o.link(it.name) : "";
    return { ...t, name: it.name, href, hasHref: !!href, noHref: !href, qtyT: it.qty == null ? "Qty unknown" : "×" + Number(it.qty).toLocaleString("en-US") + " units", qtyInk: it.qty == null ? "var(--amber)" : "var(--fg2)", stopNav: e => e.stopPropagation() }; });
  return { chips: list, more: items.length > max ? "+" + (items.length - max) + " more" : "", hasMore: items.length > max, moreTitle: items.slice(max).map(it => it.name + (it.qty == null ? " (qty unknown)" : " ×" + it.qty)).join(", ") }; }
// ---- Inline related-record sections. sections: [{ key, title, icon, show, cards: [{ id, title, sub, right, ink, href, date }] , empty }]
const MOd = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }; export const pday = s => { const m = /([A-Z][a-z]{2}) (\d+)/.exec(s || ""); return m ? MOd[m[1]] * 40 + +m[2] : -1; };
export function related(secs) { return secs.filter(s => s.show !== false).map(s => { const cards = [...s.cards].sort((a, b) => pday(b.date) - pday(a.date)); return { title: s.title, icon: s.icon, countT: String(cards.length), cards: cards.map(x => ({ ...x, stop: e => e.stopPropagation() })), none: !cards.length, empty: s.empty || "Nothing linked." }; }); }
// ---- Remember list state across navigation to a related record and back (this tab only)
export function saveList(page, st) { try { sessionStorage.setItem("lb-list-" + page, JSON.stringify(st)); } catch (e) {} }
export function loadList(page) { try { return JSON.parse(sessionStorage.getItem("lb-list-" + page) || "null"); } catch (e) { return null; } }

// ---- PO / Shipment inline expansion + product chips (shared). ctx: { P, IV, W, role, rh, phone }
const num = v => { const n = parseFloat(String(v == null ? "" : v).replace(/[^0-9.]/g, "")); return isFinite(n) ? n : null; };
export function opsRow(c, kind, r, ctx) {
  const { P, IV, W, role, rh } = ctx; const part = role === "partner"; const exp = !!((c.state.texp || {})[kind + ":" + r.id]);
  const prodOk = name => { const p = (P.PRODUCTS || []).find(x => x.name === name) || (ctx.extra || []).find(x => x.name === name); return !!p && (!part || p.partner !== "Lootbloc"); };
  const link = name => prodOk(name) ? rh("Products.dc.html?open=" + encodeURIComponent(name)) : "";
  let items;
  if (kind === "po") items = (r.products || []).map(n => ({ name: n, qty: r.qtyBy ? (r.qtyBy[n] ?? null) : r.products.length === 1 ? num(r.units) : null }));
  else { const po = (P.POS || []).find(p => p.id === r.po); items = r.items || (po && po.products.length === 1 ? [{ name: po.products[0], qty: num(r.units) }] : [{ name: r.products, qty: null }]); }
  const pch = chips(c, items, { max: kind === "ship" && ctx.phone ? 3 : 2, allowed: prodOk, link, ctx: r.id });
  const ST = s => ({ ...s, cards: s.cards });
  const facts = IV ? IV.FACTORY : []; const tasks = W ? W.TASKS : []; const SL = P.PO_LABEL || {};
  const money = n => "$" + (n / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const invSec = poIds => ({ title: "Manufacturer invoices", icon: "icon-receipt", show: !part, empty: "No manufacturer invoices linked.", cards: facts.filter(f => (f.pos || []).some(x => poIds.includes(x))).map(f => ({ id: f.id, title: f.id + ", " + f.type, sub: f.vendor + ", due " + f.due, right: money(f.total), ink: f.overdue ? "var(--red)" : "var(--fg2)", date: f.date, href: rh("Invoices.dc.html?open=" + f.id) })) });
  const taskSec = id => ({ title: "Tasks", icon: "icon-list-checks", show: !part, empty: "No tasks on this " + (kind === "po" ? "order" : "shipment") + ".", cards: tasks.filter(t => t.ent && t.ent[1] === id).map(t => ({ id: t.id, title: t.t, sub: t.id + ", due " + t.due + (t.rule ? ", " + t.rule : ""), right: t.status, ink: t.status === "Done" ? "var(--green)" : "var(--fg2)", date: t.due, href: rh("Workspace.dc.html?m=tasks&sel=" + t.id) })) });
  let secs;
  if (kind === "po") secs = [{ title: "Shipments", icon: "icon-truck", empty: "No shipments yet.", cards: (P.SHIPS || []).filter(s => s.po === r.id).map(s => ({ id: s.id, title: s.id + ", " + s.type, sub: s.carrier + ", " + (P.SHIP_STEPS ? P.SHIP_STEPS[s.step - 1] : "") + ", ETA " + s.eta, right: s.etaText, ink: s.tone === "red" ? "var(--red)" : "var(--fg2)", date: s.eta, href: rh("Shipments.dc.html?open=" + s.id) })) }, invSec([r.id]), taskSec(r.id)];
  else secs = [{ title: "Purchase orders", icon: "icon-package", empty: "No purchase order linked.", cards: (P.POS || []).filter(p => p.id === r.po && (!part || p.partner !== "Lootbloc")).map(p => ({ id: p.id, title: p.id + ", " + p.type, sub: (P.vendorLabel ? P.vendorLabel(p.vendor, part) : p.vendor) + ", " + p.units + " units", right: SL[p.status] || p.status, ink: "var(--fg2)", date: p.created, href: rh("Purchase Orders.dc.html?open=" + p.id) })) }, invSec([r.po]), taskSec(r.id)];
  const rel = exp ? related(secs) : []; const n = related(secs).reduce((a, s) => a + s.cards.length, 0);
  const key = kind + ":" + r.id;
  return { pch, expanded: exp, expS: String(exp), chev: exp ? "icon-chevron-down" : "icon-chevron-right", chevBd: exp ? "var(--brand)" : "var(--line)", chevBg: exp ? "var(--brandSoft)" : "var(--surface)",
    chevAria: (exp ? "Hide linked records for " : "Show linked records for ") + r.id + " (" + n + ")", relCountT: n + " linked", rel, relAria: "Linked records for " + r.id,
    toggle: e => { if (e) e.stopPropagation(); c.setState(s => ({ texp: { ...(s.texp || {}), [key]: !(s.texp || {})[key] } })); } };
}


// Shopify-style search + filter bar. Tokens: { k, op: "is"|"not", v }. Fields may own their "is" values via ext (so saved views keep them).
// o: { q, setQ, ph, rows, fields: [{ k, label, icon, get(row) -> string|string[], values?, ext?: { val: [], set(arr) } }], sort?: { opts: [[k,label]], cur, dir, set(k), setDir(d), dirL?: [asc, desc] }, group?: { opts: [[k,label]], cur, set(k) }, cols?: [{ k, label, on, toggle, up, down, lock }] }
export function filterBar(c, key, o) {
  const all = c.state.fbs || {}; const st = all[key] || { tok: [], raw: "", focus: false, hi: -1, menu: null };
  const put = p => c.setState(s => ({ fbs: { ...(s.fbs || {}), [key]: { ...((s.fbs || {})[key] || { tok: [], raw: "", focus: false, hi: -1, menu: null }), ...p } } }));
  const F = o.fields || [];
  const tokens = [...F.flatMap(f => f.ext ? (f.ext.val || []).filter(v => v !== "__none__").map(v => ({ k: f.k, op: "is", v, ext: true })) : []), ...st.tok];
  const raw = st.raw != null ? st.raw : (o.q || "");
  const low = raw.trim().toLowerCase();
  const vals = f => { const set = new Set(f.values || []); (o.rows || []).forEach(r => { const g = f.get(r); (Array.isArray(g) ? g : [g]).forEach(x => { if (x != null && x !== "" && x !== "—") set.add(String(x)); }); }); return [...set].sort((a, b) => a.localeCompare(b)); };
  const parse = () => { for (const f of F) { const fl = f.label.toLowerCase(); if (low === fl || low.startsWith(fl + " ")) { const rest = low.slice(fl.length).trim(); let op = null, v = ""; if (rest.startsWith("is not")) { op = "not"; v = rest.slice(6).trim(); } else if (rest.startsWith("is")) { op = "is"; v = rest.slice(2).trim(); } else if (rest === "") op = "?"; return { f, op, v }; } } return null; };
  const pz = parse(); const fieldMode = !!pz;
  const textQ = fieldMode ? "" : raw;
  const addTok = t => { const f = F.find(x => x.k === t.k); if (f && f.ext && t.op === "is") { const cur = (f.ext.val || []).filter(v => v !== "__none__"); if (!cur.includes(t.v)) f.ext.set([...cur, t.v]); put({ raw: "", hi: -1 }); }
    else { const cur = (c.state.fbs || {})[key] || st; if (!(cur.tok || []).some(x => x.k === t.k && x.op === t.op && x.v === t.v)) put({ tok: [...(cur.tok || []), { k: t.k, op: t.op, v: t.v }], raw: "", hi: -1 }); else put({ raw: "", hi: -1 }); }
    if (o.setQ) o.setQ(""); };
  const rmTok = t => { const f = F.find(x => x.k === t.k); if (t.ext && f && f.ext) f.ext.set((f.ext.val || []).filter(v => v !== t.v)); else { const cur = (c.state.fbs || {})[key] || st; put({ tok: (cur.tok || []).filter(x => !(x.k === t.k && x.op === t.op && x.v === t.v)) }); } };
  let sug = [];
  const S1 = (f, op, v, hint) => ({ f, op, v, hint: hint || "" });
  if (st.focus) {
    if (pz) { const { f, op, v } = pz;
      if (op === "?") sug = [{ ...S1(f, "is", "", ""), fill: f.label + " is " }, ...(f.noNot ? [] : [{ ...S1(f, "not", "", ""), fill: f.label + " is not " }])];
      else { const L = vals(f).filter(x => !v || x.toLowerCase().includes(v)).slice(0, 8); sug = L.map(x => S1(f, op, x)); if (!sug.length) sug = []; }
    } else if (!low) sug = F.map(f => ({ ...S1(f, "", "", ""), fill: f.label + " " }));
    else { const byF = F.filter(f => f.label.toLowerCase().startsWith(low)).flatMap(f => [{ ...S1(f, "is", "", ""), fill: f.label + " is " }, ...(f.noNot ? [] : [{ ...S1(f, "not", "", ""), fill: f.label + " is not " }])]);
      const byV = F.flatMap(f => vals(f).filter(x => x.toLowerCase().includes(low)).slice(0, 3).map(x => S1(f, "is", x))).slice(0, 6);
      sug = [...byF, ...byV]; }
  }
  const hi = Math.min(st.hi, sug.length - 1);
  const pick = s => { if (s.fill != null) { put({ raw: s.fill, hi: -1, focus: true }); if (o.setQ) o.setQ(""); return; } addTok({ k: s.f.k, op: s.op, v: s.v }); };
  const OPL = { is: "is", not: "is not", "": "" };
  const fbSug = sug.map((s, i) => ({ icon: s.f.icon || "icon-list-filter", f: s.f.label, op: OPL[s.op] || "", opC: s.op === "not" ? "var(--red)" : "var(--brandInk)", v: s.v || (s.fill != null && s.op ? "…" : ""), hint: s.fill != null && !s.op ? "Filter" : "", bg: i === hi ? "var(--hover)" : "transparent",
    pick: e => { if (e) e.preventDefault(); pick(s); } }));
  const archT = o.archTok && o.archTok.on ? [{ f: "Archived", op: "is", opC: "var(--brandInk)", v: "Yes", aria: "Remove Archived filter", remove: e => { if (e) e.stopPropagation(); o.archTok.off(); } }] : [];
  const fbTokens0 = tokens.map(t => { const f = F.find(x => x.k === t.k) || { label: t.k }; return { f: f.label, op: OPL[t.op], opC: t.op === "not" ? "var(--red)" : "var(--brandInk)", v: t.v, aria: "Remove filter " + f.label + " " + OPL[t.op] + " " + t.v, remove: e => { if (e) e.stopPropagation(); rmTok(t); } }; }); const fbTokens = [...archT, ...fbTokens0];
  const test = r => { for (const f of F) { const ts = tokens.filter(t => t.k === f.k); if (!ts.length) continue; const g = f.get(r); const have = (Array.isArray(g) ? g : [g]).map(x => String(x));
      const isT = ts.filter(t => t.op === "is"); if (isT.length && !isT.some(t => have.includes(t.v))) return false;
      if (ts.some(t => t.op === "not" && have.includes(t.v))) return false; } return true; };
  const menu = st.menu; const tip = (t, sub) => c.tipH ? c.tipH(t, { sub, place: "below" }) : () => {};
  const so = o.sort, go = o.group;
  const fbSortOpts = so ? so.opts.map(([k, l]) => ({ label: l, on: so.cur === k, onS: String(so.cur === k), pick: () => { so.set(k); } })) : [];
  const fbGroupOpts = go ? go.opts.map(([k, l]) => ({ label: l, on: go.cur === k, onS: String(go.cur === k), pick: () => { go.set(k); } })) : [];
  const dirL = (so && so.dirL) || ["Ascending", "Descending"];
  return { fbQ: raw, fbPh: o.ph || "Search and filter", fbTokens, fbHasTokens: !!tokens.length, fbSug, fbSugOpen: st.focus && !!fbSug.length, fbSugHead: pz && pz.op && pz.op !== "?" ? pz.f.label + " " + OPL[pz.op] : low ? "Suggestions" : "Filter by",
    fbBd: st.focus ? "var(--brand)" : "var(--line)", fbSh: st.focus ? "0 0 0 3px color-mix(in oklch, var(--brand) 18%, transparent)" : "none",
    fbSet: e => { const v = e.target.value; put({ raw: v, hi: -1, focus: true }); if (o.setQ) { const fl = F.some(f => { const x = f.label.toLowerCase(), l = v.trim().toLowerCase(); return l === x || l.startsWith(x + " "); }); o.setQ(fl ? "" : v); } },
    fbFocus: () => put({ focus: true, menu: null }), fbBlur: () => setTimeout(() => put({ focus: false, hi: -1 }), 120),
    fbKey: e => { if (e.key === "ArrowDown") { e.preventDefault(); put({ hi: Math.min(hi + 1, sug.length - 1) }); } else if (e.key === "ArrowUp") { e.preventDefault(); put({ hi: Math.max(hi - 1, -1) }); }
      else if (e.key === "Enter") { if (hi >= 0 && sug[hi]) { e.preventDefault(); pick(sug[hi]); } else put({ focus: false }); } else if (e.key === "Escape") { put({ focus: false, hi: -1 }); e.target.blur(); }
      else if (e.key === "Backspace" && !raw && tokens.length) rmTok(tokens[tokens.length - 1]); },
    fbHasClear: !!(tokens.length || raw || archT.length), fbClear: () => { if (archT.length) o.archTok.off(); F.forEach(f => { if (f.ext) f.ext.set([]); }); put({ tok: [], raw: "", hi: -1 }); if (o.setQ) o.setQ(""); },
    fbHasSort: !!(so || go), fbSortOpen: menu === "sort", fbSortToggle: () => put({ menu: menu === "sort" ? null : "sort", focus: false }), fbSortTip: tip("Sort and group"), fbSortOpts, fbHasGroup: !!go, fbGroupOpts,
    fbDirs: so ? [["asc", dirL[0], "icon-arrow-up"], ["desc", dirL[1], "icon-arrow-down"]].map(([k, l, ic]) => ({ label: l, icon: ic, on: (so.dir || "asc") === k, bg: (so.dir || "asc") === k ? "var(--surface)" : "transparent", sh: (so.dir || "asc") === k ? "0 1px 2px var(--shc), 0 0 0 1px var(--line)" : "none", pick: () => so.setDir(k) })) : [],
    fbSortBg: menu === "sort" ? "var(--hover)" : "transparent",
    fbHasCols: !!(o.cols && o.cols.length), fbColsOpen: menu === "cols", fbColsToggle: () => put({ menu: menu === "cols" ? null : "cols", focus: false }), fbColsTip: tip("Columns"), fbColsBg: menu === "cols" ? "var(--hover)" : "transparent",
    fbCols: (o.cols || []).map((cl, i, A) => ({ label: cl.label, on: !!cl.on, onS: String(!!cl.on), lock: !!cl.lock, canToggle: !cl.lock, box: cl.on ? "var(--brand)" : "var(--surface)", boxBd: cl.on ? "var(--brand)" : "var(--fg3)", ic: cl.on ? "icon-check" : "", toggle: () => cl.toggle && cl.toggle(), upOp: i === 0 || !cl.up ? 0.3 : 1, downOp: i === A.length - 1 || !cl.down ? 0.3 : 1, canDrag: !!cl.moveTo, dragOn: cl.moveTo ? "true" : "false", rowOp: st.cdrag === i ? 0.4 : 1,
      dropSh: st.cdrag != null && st.cover === i && st.cdrag !== i ? (st.cdrag < i ? "inset 0 -2px 0 var(--brand)" : "inset 0 2px 0 var(--brand)") : "none",
      dragStart: e => { if (!cl.moveTo) return; try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", cl.label); } catch (x) {} put({ cdrag: i, cover: i }); },
      dragOver: e => { if (st.cdrag == null) return; e.preventDefault(); if (st.cover !== i) put({ cover: i }); },
      drop: e => { e.preventDefault(); const from = st.cdrag; put({ cdrag: null, cover: null }); if (from == null || from === i) return; const src = A[from]; if (src && src.moveTo) src.moveTo(cl.k); },
      dragEnd: () => put({ cdrag: null, cover: null }) })),
    fbHasArch: !!o.arch, fbArchOn: String(!!(o.arch && o.arch.on)), fbArchL: o.arch ? (o.arch.on ? "Archived" : "Archive") : "", fbArchN: o.arch && o.arch.n ? String(o.arch.n) : "", fbArchBg: o.arch && o.arch.on ? "var(--brandSoft)" : "transparent", fbArchBd: o.arch && o.arch.on ? "var(--brand)" : "var(--line)", fbArchFg: o.arch && o.arch.on ? "var(--brandInk)" : "var(--fg)",
    fbArchToggle: () => { put({ menu: null }); if (o.arch) o.arch.toggle(); }, fbArchTip: tip(o.arch && o.arch.on ? "Back to active" : "Show archived", o.arch && !o.arch.on ? "Hidden records you can restore" : ""),
    fbMenuClose: () => put({ menu: null }), fbTest: test, fbText: textQ, fbTokCount: tokens.length };
}

// Column order/visibility helper. defs: [[k, label, track, lock?, hiddenByDefault?]]. Stored in c.state.colcfg[key].
export function columns(c, key, defs) {
  const all = c.state.colcfg || {}; const st = all[key] || { order: defs.map(d => d[0]), hide: defs.filter(d => d[4]).map(d => d[0]) };
  const order = [...st.order.filter(k => defs.some(d => d[0] === k)), ...defs.map(d => d[0]).filter(k => !st.order.includes(k))];
  const put = p => c.setState(s => ({ colcfg: { ...(s.colcfg || {}), [key]: { ...st, ...p } } }));
  const mv = (k, d) => { const o = [...order]; const i = o.indexOf(k), j = i + d; if (j < 0 || j >= o.length) return; [o[i], o[j]] = [o[j], o[i]]; put({ order: o }); };
  const shown = k => !st.hide.includes(k);
  const ord = {}; const show = {}; order.forEach((k, i) => { ord[k] = String(i + 2); show[k] = shown(k); });
  const tracks = order.filter(shown).map(k => defs.find(d => d[0] === k)[2]).join(" ");
  return { ord, show, tracks, menu: order.map(k => { const d = defs.find(x => x[0] === k); return { k, label: d[1], on: shown(k), lock: !!d[3], toggle: () => put({ hide: shown(k) ? [...st.hide, k] : st.hide.filter(x => x !== k) }), up: () => mv(k, -1), down: () => mv(k, 1), moveTo: t => { const o = [...order]; const i = o.indexOf(k), j = o.indexOf(t); if (i < 0 || j < 0 || i === j) return; o.splice(i, 1); o.splice(j, 0, k); put({ order: o }); } }; }) };
}

// Shopify-style contextual save pill. o: { dirty, label, doneMsg, validate?() -> "" | message, onSave(), onDiscard(), ms? }
export function saveBar(c, o) {
  const st = c.state.svb || null; const phase = st ? st.phase : (o.dirty ? "dirty" : null); c.__svDirty = phase === "dirty" || phase === "saving"; if (!phase && c.state.svbShake && !c.__svRst) { c.__svRst = 1; queueMicrotask(() => { c.__svRst = 0; c.setState({ svbShake: 0, svbErr: "" }); }); }
  const save = () => { if (c.state.svb) return; const err = o.validate ? o.validate() : ""; if (err) { c.setState({ svbErr: err, svbShake: (c.state.svbShake || 0) + 1 }); return; }
    c.setState({ svb: { phase: "saving", msg: o.doneMsg }, svbErr: "" });
    setTimeout(() => { try { o.onSave(); } catch (e) { console.error(e); } c.setState({ svb: { phase: "done", msg: o.doneMsg } });
      setTimeout(() => c.setState({ svb: { phase: "out", msg: o.doneMsg } }), 1500); setTimeout(() => c.setState({ svb: null }), 1800); }, o.ms || 1100); };
  const W = { dirty: "min(400px, calc(100vw - 24px))", saving: "220px", done: "230px", out: "230px" };
  return { svOn: !!phase, svDirty: phase === "dirty", svSaving: phase === "saving", svDone: phase === "done" || phase === "out", svW: W[phase] || "0px",
    svOp: phase === "out" ? 0 : 1, svY: phase === "out" ? "-14px" : "0px", svBg: phase === "done" || phase === "out" ? "var(--green)" : "var(--solid)", svFg: phase === "done" || phase === "out" ? "white" : "var(--onSolid)",
    svLabel: c.state.svbErr || o.label || "Unsaved changes", svLabelC: c.state.svbErr ? "var(--amberBar)" : "inherit", svIcon: c.state.svbErr ? "icon-triangle-alert" : "icon-circle-dot-dashed", svKey: "k" + (c.state.svbShake || 0), svShake: c.state.svbShake ? (c.state.svbShake % 2 ? "lbShake" : "lbShake2") + " 380ms cubic-bezier(.36,.07,.19,.97)" : "none",
    svMsg: (st && st.msg) || o.doneMsg || "Saved", svMs: (o.ms || 1100) + "ms",
    svSave: save, svDiscard: () => { c.setState({ svbErr: "", svbShake: 0 }); if (o.onDiscard) o.onDiscard(); } };
}

// Blocks starting a new edit while the save pill has unsaved changes. Shakes the pill instead.
export function svGuard(c) { if (!c.__svDirty) return false; c.setState(s => ({ svbShake: (s.svbShake || 0) + 1 })); return true; }

// ---- Shared create-flow pieces. Every "New …" flow uses these so steps and the game picker look and behave the same.
export const GAMES = [["Creatures of Sonaria", "COS", "38 live products"], ["World Zero", "WZ", "21 live products"], ["Fisch", "FSH", "6 live products"], ["Lootbloc", "LB", "Our own products"]];
export function gamePicker(c, key, cur, onPick, o = {}) { const q = (c.state.gpq || {})[key] || ""; const ql = q.trim().toLowerCase(); const all = o.list || GAMES; const L = all.filter(g => !ql || (g[0] + " " + g[1]).toLowerCase().includes(ql));
  return { pq: q, setPQ: e => c.setState(s => ({ gpq: { ...(s.gpq || {}), [key]: e.target.value } })), pCount: ql ? L.length + " of " + all.length : all.length + " games", noPartners: !L.length,
    partners: L.map(([label, code, meta]) => { const on = cur === label; return { label, code, meta, bd: on ? "var(--brand)" : "var(--line)", bg: on ? "var(--brandSoft)" : "var(--surface)", check: on ? "icon-circle-check" : "", pick: () => onPick(label) }; }) }; }
// shorts: pill labels. done(n) -> bool. Reached steps are clickable.
export function stepPills(shorts, step, max, done, go) { const mx = Math.max(max || 1, step); return shorts.map((short, i) => { const n = i + 1, cur = n === step, ok = n < step && done(n), reach = n <= mx;
  return { short, bar: ok ? "var(--greenBar)" : cur ? "var(--brand)" : "var(--line)", fw: cur ? 700 : 600, tc: reach ? "var(--fg)" : "var(--fg3)", icon: ok ? "icon-check" : "", cur: reach && !cur ? "pointer" : "default", go: () => { if (reach && !cur) go(n); } }; }); }

// Task-complete celebration: confetti burst + short chime.
export function celebrate() {
  try { const AC = window.AudioContext || window.webkitAudioContext; if (AC) { const ac = celebrate.__ac || (celebrate.__ac = new AC()); if (ac.state === "suspended") ac.resume(); const t0 = ac.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o.frequency.value = f; const t = t0 + i * 0.07; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.16, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.5); }); } } catch (e) {}
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.createElement("canvas"); const W = window.innerWidth, H = window.innerHeight, dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = H * dpr; Object.assign(cv.style, { position: "fixed", inset: "0", width: W + "px", height: H + "px", pointerEvents: "none", zIndex: "9999" }); document.body.appendChild(cv);
  const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr); const COL = ["#5b5bd6", "#e5484d", "#f5a524", "#30a46c", "#0090ff", "#d6409f"];
  const P = []; [[W * 0.25, -0.35], [W * 0.75, 0.35]].forEach(([x, dx]) => { for (let i = 0; i < 70; i++) { const a = -Math.PI / 2 + dx + (Math.random() - 0.5) * 1.1, v = 9 + Math.random() * 9; P.push({ x, y: H + 10, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 6 + Math.random() * 6, h: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COL[(Math.random() * COL.length) | 0] }); } });
  const start = performance.now(); const step = now => { const t = now - start; ctx.clearRect(0, 0, W, H); P.forEach(p => { p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.globalAlpha = Math.max(0, 1 - t / 2200); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); });
    if (t < 2200) requestAnimationFrame(step); else cv.remove(); }; requestAnimationFrame(step);
}
