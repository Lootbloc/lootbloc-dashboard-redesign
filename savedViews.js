// Saved list views for the prototype. Stored in this browser only (demo). Sharing here is simulated:
// no invitations, messages or permission changes are sent. Shared setups are always intersected
// with the current viewer's access by the page before they are applied.
const K = (page, role) => "lb-saved-views-v1:" + page + ":" + role;
const KS = page => "lb-saved-views-v1:" + page + ":shared";
const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
export const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clone = x => JSON.parse(JSON.stringify(x));

// o: { page, role, me, seedsMine, seedsShared, audiences, current, standard, intersect, apply, noun }
export function viewsModel(c, o) {
  const S = c.state.vm || {};
  const set = p => c.setState({ vm: { ...(c.state.vm || {}), ...p } });
  const kM = K(o.page, o.role), kS = KS(o.page);
  const mine = read(kM, null) || clone(o.seedsMine || []);
  const userShared = read(kS, []);
  const shared = [...(o.seedsShared || []), ...userShared].filter(v => v.audience.roles.includes(o.role));
  const std = { id: "std", name: "Standard view", cfg: o.standard, std: true };
  const find = id => id === "std" ? std : mine.find(v => v.id === id) || shared.find(v => v.id === id);
  const view = find(S.applied || "std") || std;
  const owned = v => !v.std && (!v.audience || (v.ownerRole === o.role && v.owner === o.me));
  const eff = o.intersect(view.cfg);
  const edited = !same(o.current, eff.cfg);
  const applyView = (v, extra) => { const e = o.intersect(v.cfg); o.apply(clone(e.cfg)); set({ applied: v.id, open: false, mode: null, toast: "", ...(extra || {}) }); };
  const saveMine = arr => write(kM, arr);
  const saveShared = arr => write(kS, arr);
  const upd = (id, patch) => {
    if (mine.some(v => v.id === id)) saveMine(mine.map(v => v.id === id ? { ...v, ...patch } : v));
    else saveShared(userShared.map(v => v.id === id ? { ...v, ...patch } : v));
  };
  const audLabel = v => v.audience ? v.audience.label : "Only you";
  const item = (v, sub) => { const on = v.id === view.id; return { name: v.name, sub, on: String(on), check: on ? "icon-check" : "", bg: on ? "var(--sunk)" : "transparent", fw: on ? 700 : 600,
    icon: v.std ? "icon-layout-list" : v.audience ? "icon-users" : "icon-lock", pick: () => applyView(v) }; };
  const ownerT = v => v.ownerRole === o.role && v.owner === o.me ? "You" : v.owner;
  const hiddenN = eff.hidden.length;
  const hiddenNote = hiddenN ? "Adapted for your access: " + [...new Set(eff.hidden)].join("; ") + ". Everything else in this " + (view.audience ? "shared " : "") + "view applies. Views never show extra records or fields." : "";
  const mode = S.mode || null;
  const canSave = edited && owned(view);
  return {
    vmLabel: view.name, vmEdited: edited, vmIcon: view.std ? "icon-layout-list" : view.audience ? "icon-users" : "icon-lock",
    vmOpen: !!S.open, vmToggle: () => set({ open: !S.open, mode: null, toast: "" }), vmClose: () => set({ open: false, mode: null }),
    vmScope: view.std ? "Default for everyone" : view.audience ? ownerT(view) + ", Shared with " + audLabel(view) : "Private, only you",
    vmStd: [item(std, "Default setup")],
    vmMine: mine.map(v => item(v, "Private, only you")), vmNoMine: mine.length === 0, vmHasMine: mine.length > 0,
    vmShared: shared.map(v => item(v, ownerT(v) + ", Shared with " + v.audience.label)), vmNoShared: shared.length === 0, vmHasShared: shared.length > 0,
    vmHidden: hiddenNote, vmHasHidden: !!hiddenNote,
    vmEditedNote: edited ? (canSave ? "You've changed this view. Save changes to update it" + (view.audience ? " for everyone it's shared with." : ".") : view.std ? "You've changed the standard view. Save as a new view to keep this setup." : "You've changed a view someone else owns. Save as a new view to keep your version.") : "",
    vmCanSave: canSave, vmSaveBg: canSave ? "var(--brand)" : "var(--sunk)", vmSaveFg: canSave ? "white" : "var(--fg3)", vmSaveCur: canSave ? "pointer" : "not-allowed",
    vmSave: () => { if (!canSave) return; upd(view.id, { cfg: clone(o.current) }); set({ toast: "Saved “" + view.name + "”." }); },
    vmOwned: owned(view), vmModeName: mode === "saveas" || mode === "rename", vmModeShare: mode === "share",
    vmNameTitle: mode === "rename" ? "Rename view" : "Save as a new private view", vmNameBtn: mode === "rename" ? "Rename" : "Save view",
    vmName: S.name ?? "", vmSetName: e => set({ name: e.target.value }),
    vmSaveAs: () => set({ mode: "saveas", name: view.std ? "" : view.name + " (copy)", toast: "" }),
    vmRename: () => set({ mode: "rename", name: view.name, toast: "" }),
    vmShare: () => set({ mode: "share", toast: "" }),
    vmCancel: () => set({ mode: null }),
    vmConfirm: () => { const nm = (S.name || "").trim(); if (!nm) return;
      if (mode === "rename") { upd(view.id, { name: nm }); set({ mode: null, toast: "Renamed to “" + nm + "”." }); return; }
      const id = "v" + Date.now(); saveMine([...mine, { id, name: nm, cfg: clone(o.current) }]); set({ applied: id, mode: null, toast: "Saved “" + nm + "” to My views. Only you can see it." }); },
    vmShareOpts: (o.audiences || []).map(a => { const on = (view.audience ? view.audience.key : "me") === a.key; return { label: a.label, sub: a.sub, on: String(on), check: on ? "icon-circle-check" : "icon-circle", bd: on ? "var(--brand)" : "var(--line)",
      pick: () => {
        if (a.key === "me") { if (!view.audience) return set({ mode: null }); const v = userShared.find(x => x.id === view.id); saveShared(userShared.filter(x => x.id !== view.id)); const { audience, owner, ownerRole, ...rest } = v; saveMine([...mine, rest]); set({ mode: null, toast: "“" + view.name + "” is private again." }); return; }
        const aud = { key: a.key, label: a.label, roles: a.roles };
        if (view.audience) upd(view.id, { audience: aud });
        else { saveMine(mine.filter(x => x.id !== view.id)); saveShared([...userShared, { ...view, audience: aud, owner: o.me, ownerRole: o.role }]); }
        set({ mode: null, toast: "Now shared with " + a.label + " (prototype, nobody is notified). They only see records and fields they already have access to." }); } }; }),
    vmCopy: () => { let url = ""; try { const u = new URL(location.href); u.searchParams.delete("role"); u.searchParams.set("view", view.id); url = u.toString(); navigator.clipboard && navigator.clipboard.writeText(url).catch(() => {}); } catch (e) {}
      set({ toast: view.audience ? "Link copied. It opens this view's setup; each person still only sees records they can already access." : view.std ? "Link copied to the standard view." : "Link copied. This view is private, so the link only works for you." }); },
    vmToast: S.toast || "", vmHasToast: !!S.toast,
    vmApplyId: id => { const v = find(id); if (v) applyView(v); },
  };
}
