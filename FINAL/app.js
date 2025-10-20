// ===== Mock taxonomy (replace with real data later) =====
const ALL_BRANDS = ["KAMA", "Sakura Beauty", "Cherry Love", "Moonlight", "Unicorn", "Swan Ballet"];
const ALL_LABELS = [
  { key: "new", label: "Mới" },
  { key: "collection", label: "Bộ sưu tập" },
  { key: "suggested", label: "Gợi ý" },
  { key: "best_seller", label: "Bán chạy" },
  { key: "flash_sale", label: "Flashsale" },
  { key: "list", label: "Danh mục" },
  { key: "membership", label: "Thành viên" }
];

const state = { q: "", brands: new Set(), labels: new Set(), recent: [] };
const els = {
  form: document.getElementById("search-form"),
  q: document.getElementById("q"),
  chips: document.getElementById("chips"),
  qs: document.getElementById("qs"),
  panel: document.getElementById("filter-panel"),
  btnFilter: document.getElementById("btn-filter"),
  btnApply: document.getElementById("btn-apply"),
  btnClear: document.getElementById("btn-clear"),
  brandList: document.getElementById("brand-list"),
  labelList: document.getElementById("label-list"),
  recent: document.getElementById("recent")
};

(function init(){
  // Hydrate from URL
  const params = new URLSearchParams(location.search);
  state.q = params.get("q") || "";
  params.getAll("brands").forEach(b=>state.brands.add(b));
  params.getAll("labels").forEach(l=>state.labels.add(l));

  // Load recent
  try { state.recent = JSON.parse(localStorage.getItem("kama_recent")||"[]"); } catch { state.recent = []; }

  els.q.value = state.q;
  mountFacet(els.brandList, ALL_BRANDS, "brand");
  mountFacet(els.labelList, ALL_LABELS.map(x=>x.label), "label");
  renderAll();
})();

function mountFacet(container, items, type){
  container.innerHTML = "";
  items.forEach((display) => {
    const row = document.createElement("label");
    row.className = "row";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.type = type;
    input.value = display;

    if(type === "label"){
      const map = Object.fromEntries(ALL_LABELS.map(o=>[o.label,o.key]));
      const key = map[display];
      input.checked = state.labels.has(key);
      input.dataset.key = key;
    } else {
      input.checked = state.brands.has(display);
    }

    input.addEventListener("change", () => {
      if(type === "brand"){ toggleSet(state.brands, display); }
      else { toggleSet(state.labels, input.dataset.key); }
      renderAll();
    });

    const span = document.createElement("span");
    span.textContent = display;
    row.appendChild(input); row.appendChild(span);
    container.appendChild(row);
  });
}

function toggleSet(set, v){ set.has(v) ? set.delete(v) : set.add(v); }

function buildQuery(){
  const params = new URLSearchParams();
  const q = els.q.value.trim();
  if(q) params.set("q", q);
  [...state.brands].forEach(b => params.append("brands", b));
  [...state.labels].forEach(l => params.append("labels", l));
  return params.toString();
}

function renderChips(){
  els.chips.innerHTML = "";
  const qVal = els.q.value.trim();
  if(qVal){ els.chips.appendChild(chip("Từ khóa:", qVal, ()=>{ els.q.value=""; renderAll(); })); }
  [...state.brands].forEach(b => {
    els.chips.appendChild(chip("Brand:", b, ()=>{ state.brands.delete(b); syncFacetChecks(); renderAll(); }));
  });
  [...state.labels].forEach(k => {
    const label = (ALL_LABELS.find(x=>x.key===k)||{}).label || k;
    els.chips.appendChild(chip("Nhãn:", label, ()=>{ state.labels.delete(k); syncFacetChecks(); renderAll(); }));
  });
  if(qVal || state.brands.size || state.labels.size){
    const clear = document.createElement("button");
    clear.type = "button"; clear.className = "chip"; clear.textContent = "Xóa tất cả";
    clear.addEventListener("click", ()=>{ els.q.value=""; state.brands.clear(); state.labels.clear(); syncFacetChecks(); renderAll(); });
    els.chips.appendChild(clear);
  }
}

function chip(prefix, text, onRemove){
  const wrap = document.createElement("span"); wrap.className = "chip";
  const b = document.createElement("b"); b.textContent = prefix + " ";
  const t = document.createElement("span"); t.textContent = text;
  const x = document.createElementNS("http://www.w3.org/2000/svg","svg"); x.classList.add("x");
  const use = document.createElementNS("http://www.w3.org/2000/svg","use"); use.setAttribute("href","#icon-x");
  x.appendChild(use); x.addEventListener("click", onRemove);
  wrap.appendChild(b); wrap.appendChild(t); wrap.appendChild(x);
  return wrap;
}

function syncFacetChecks(){
  document.querySelectorAll('#brand-list input[type="checkbox"]').forEach(cb => {
    cb.checked = state.brands.has(cb.value);
  });
  document.querySelectorAll('#label-list input[type="checkbox"]').forEach(cb => {
    cb.checked = state.labels.has(cb.dataset.key);
  });
}

function renderQS(){ els.qs.textContent = `Querystring: ${buildQuery() || '(trống)'}`; }
function renderAll(){ renderChips(); renderQS(); }

// Events
els.btnFilter.addEventListener("click", ()=>{
  const hidden = els.panel.hasAttribute("hidden");
  if(hidden) els.panel.removeAttribute("hidden"); else els.panel.setAttribute("hidden","");
  els.btnFilter.setAttribute("aria-expanded", String(hidden));
});

els.btnApply.addEventListener("click", ()=>{
  renderAll();
  els.panel.setAttribute("hidden","");
  els.btnFilter.setAttribute("aria-expanded","false");
});

els.btnClear.addEventListener("click", ()=>{ state.brands.clear(); state.labels.clear(); syncFacetChecks(); renderAll(); });

els.form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const term = els.q.value.trim();
  if(term){
    state.recent = [term, ...state.recent.filter(x=>x!==term)].slice(0,5);
    localStorage.setItem("kama_recent", JSON.stringify(state.recent));
  }
  const qs = buildQuery();
  // In production: location.href = `/search?${qs}`
  console.log("Submit → /search?" + qs);
  alert("Search submitted: /search?" + qs);
});

// Recent UI
els.q.addEventListener("focus", ()=>{ renderRecent(); if(state.recent.length) els.recent.hidden = false; });
els.q.addEventListener("input", ()=>{ renderQS(); });
els.q.addEventListener("blur", ()=>{ setTimeout(()=> els.recent.hidden = true, 120); });
els.recent.addEventListener("click", (e)=>{
  const item = e.target.closest(".recent-item"); if(!item) return;
  els.q.value = item.dataset.q || ""; renderAll();
});

function renderRecent(){
  if(!state.recent.length){ els.recent.hidden = true; return; }
  els.recent.innerHTML = state.recent.map(r => `<div class="recent-item" data-q="${r}">${r}</div>`).join("");
}
