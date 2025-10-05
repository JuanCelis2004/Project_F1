/* ====== Datos de ejemplo ====== */
const CIRCUITS = [
  {
    id:"suzuka", name:"Suzuka International Racing Course", country:"Japón", continent:"Asia",
    lengthKm:5.807, laps:53, firstGp:1987, record:"1:30.983 (Hamilton, 2019)",
    map:"https://picsum.photos/seed/suzuka/600/360",
    desc:"Clásico en ‘8’, fluido y técnico; enlaza ‘S’ rápidas con curvas icónicas como Degner y 130R.",
    lastResultDate:"2024-04-07",
    lastTop10:[
      {pos:1, driver:"Max Verstappen", team:"Red Bull", pts:26},
      {pos:2, driver:"Sergio Pérez",   team:"Red Bull", pts:18},
      {pos:3, driver:"Carlos Sainz",   team:"Ferrari",  pts:15},
      {pos:4, driver:"Charles Leclerc",team:"Ferrari",  pts:12},
      {pos:5, driver:"Lando Norris",   team:"McLaren",  pts:10},
      {pos:6, driver:"Fernando Alonso",team:"Aston Martin", pts:8},
      {pos:7, driver:"Oscar Piastri",  team:"McLaren",  pts:6},
      {pos:8, driver:"George Russell", team:"Mercedes", pts:4},
      {pos:9, driver:"Lewis Hamilton", team:"Mercedes", pts:2},
      {pos:10,driver:"Yuki Tsunoda",   team:"RB",       pts:1}
    ],
    recordTable:[
      {type:"Vuelta rápida", mark:"1:30.983", driver:"Lewis Hamilton", team:"Mercedes", year:2019},
      {type:"Pole",          mark:"1:27.064", driver:"Max Verstappen", team:"Red Bull", year:2024}
    ]
  },
  {
    id:"monza", name:"Autodromo Nazionale Monza", country:"Italia", continent:"Europa",
    lengthKm:5.793, laps:53, firstGp:1950, record:"1:21.046 (Rubens, 2004)",
    map:"https://picsum.photos/seed/monza/600/360",
    desc:"‘Temple of Speed’: rectas largas y chicanas rápidas; baja carga aerodinámica.",
    lastResultDate:"2024-09-08",
    lastTop10:[
      {pos:1, driver:"Charles Leclerc", team:"Ferrari", pts:25},
      {pos:2, driver:"Lando Norris",    team:"McLaren", pts:18},
      {pos:3, driver:"Max Verstappen",  team:"Red Bull", pts:15},
      {pos:4, driver:"Carlos Sainz",    team:"Ferrari", pts:12},
      {pos:5, driver:"Oscar Piastri",   team:"McLaren", pts:10},
      {pos:6, driver:"George Russell",  team:"Mercedes", pts:8},
      {pos:7, driver:"Lewis Hamilton",  team:"Mercedes", pts:6},
      {pos:8, driver:"Sergio Pérez",    team:"Red Bull", pts:4},
      {pos:9, driver:"Fernando Alonso", team:"Aston Martin", pts:2},
      {pos:10,driver:"Pierre Gasly",    team:"Alpine", pts:1}
    ],
    recordTable:[
      {type:"Vuelta rápida", mark:"1:21.046", driver:"Rubens Barrichello", team:"Ferrari", year:2004},
      {type:"Pole",          mark:"1:18.887", driver:"Max Verstappen",     team:"Red Bull", year:2024}
    ]
  },
  {
    id:"marina-bay", name:"Marina Bay Street Circuit", country:"Singapur", continent:"Asia",
    lengthKm:4.940, laps:63, firstGp:2008, record:"1:35.867 (Sainz, 2023)",
    map:"https://picsum.photos/seed/marinabay/600/360",
    desc:"Urbano nocturno exigente físicamente, múltiples curvas de 90° y baches.",
    lastResultDate:"2024-09-22",
    lastTop10:[
      {pos:1, driver:"Carlos Sainz", team:"Ferrari", pts:25},
      {pos:2, driver:"Charles Leclerc", team:"Ferrari", pts:18},
      {pos:3, driver:"Lando Norris", team:"McLaren", pts:15},
      {pos:4, driver:"Max Verstappen", team:"Red Bull", pts:12},
      {pos:5, driver:"Oscar Piastri", team:"McLaren", pts:10},
      {pos:6, driver:"George Russell", team:"Mercedes", pts:8},
      {pos:7, driver:"Lewis Hamilton", team:"Mercedes", pts:6},
      {pos:8, driver:"Sergio Pérez", team:"Red Bull", pts:4},
      {pos:9, driver:"Fernando Alonso", team:"Aston Martin", pts:2},
      {pos:10, driver:"Esteban Ocon", team:"Alpine", pts:1}
    ],
    recordTable:[
      {type:"Vuelta rápida", mark:"1:35.867", driver:"Carlos Sainz", team:"Ferrari", year:2023},
      {type:"Pole",          mark:"1:32.450", driver:"Lando Norris", team:"McLaren", year:2024}
    ]
  }
];

/* ====== Helpers ====== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function unique(a){ return [...new Set(a)] }
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function km(v){ return Number(v).toFixed(3); }
function totalDistance(c){ return (c.lengthKm * c.laps).toFixed(1); }
function byId(id){ return CIRCUITS.find(c=>c.id===id); }
function fdate(d){ return new Date(d).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }

/* ====== Estado ====== */
const state = { q:"", continent:"all", country:"all", viewMode:"cards", sortBy:"name_asc" };

/* ====== Filtros ====== */
function initFilters(){
  const continents = unique(CIRCUITS.map(c=>c.continent)).sort();
  const countries = unique(CIRCUITS.map(c=>c.country)).sort();
  const cSel=$("#continent"), pSel=$("#country");
  continents.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=v; cSel.appendChild(o); });
  countries.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=v; pSel.appendChild(o); });
}

/* ====== Query ====== */
function getFiltered(){
  const { q, continent, country, sortBy } = state;
  let rows = CIRCUITS.slice();

  if(continent!=="all") rows = rows.filter(c=>c.continent===continent);
  if(country!=="all") rows = rows.filter(c=>c.country===country);

  if(q.trim()){
    const qq = q.trim().toLowerCase();
    rows = rows.filter(c =>
      c.name.toLowerCase().includes(qq) ||
      c.country.toLowerCase().includes(qq)
    );
  }

  switch(sortBy){
    case "name_asc": rows.sort((a,b)=> a.name.localeCompare(b.name)); break;
    case "length_desc": rows.sort((a,b)=> b.lengthKm - a.lengthKm); break;
    case "laps_desc": rows.sort((a,b)=> b.laps - a.laps); break;
  }

  return rows;
}

/* ====== Render ====== */
function renderCards(){
  const rows = getFiltered();
  $("#count").textContent = `${rows.length} circuitos`;
  const grid = $("#cardsGrid");
  grid.innerHTML = "";
  rows.forEach(c=>{
    const el = document.createElement("article");
    el.className="card";
    el.innerHTML = `
      <img src="${c.map}" alt="Mapa ${c.name}">
      <div>
        <div class="name">${c.name} <span class="tag">${c.country}</span></div>
        <div class="meta">${c.continent}</div>
        <div class="kpis">
          <div class="kpi"><small>Longitud</small><b>${km(c.lengthKm)} km</b></div>
          <div class="kpi"><small>Vueltas</small><b>${c.laps}</b></div>
          <div class="kpi"><small>Distancia</small><b>${totalDistance(c)} km</b></div>
        </div>
      </div>
      <div class="actions-row">
        <button class="row-btn" data-open="${c.id}">Ver detalle</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

function renderTable(){
  const rows = getFiltered();
  $("#count").textContent = `${rows.length} circuitos`;
  const tb = $("#tableView tbody");
  tb.innerHTML = "";
  rows.forEach(c=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.country}</td>
      <td>${km(c.lengthKm)} km</td>
      <td>${c.laps}</td>
      <td>${c.firstGp}</td>
      <td>${c.record}</td>
      <td><button class="row-btn" data-open="${c.id}">Detalle</button></td>
    `;
    tb.appendChild(tr);
  });
}

function render(){
  const view = state.viewMode;
  $("#cardsGrid").classList.toggle("hidden", view!=="cards");
  $("#tableView").classList.toggle("hidden", view!=="table");
  if(view==="cards") renderCards(); else renderTable();
}

/* ====== Detalle ====== */
function renderLastTop10(c){
  const tb = $("#tblLast tbody");
  tb.innerHTML = "";
  (c.lastTop10 || []).forEach(r=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.pos}</td><td>${r.driver}</td><td>${r.team}</td><td>${r.pts}</td><td>${fdate(c.lastResultDate)}</td>`;
    tb.appendChild(tr);
  });
}

function renderRecords(c){
  const tb = $("#tblRecords tbody");
  tb.innerHTML = "";
  (c.recordTable || []).forEach(r=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.type}</td><td>${r.mark}</td><td>${r.driver}</td><td>${r.team}</td><td>${r.year}</td>`;
    tb.appendChild(tr);
  });
}

function openDetail(id){
  const c = byId(id); if(!c) return;
  $("#cMap").src=c.map; $("#cMap").alt=`Mapa ${c.name}`;
  $("#cName").textContent=c.name;
  $("#cSubtitle").textContent=`${c.country} • ${c.continent}`;
  $("#cLength").textContent=km(c.lengthKm);
  $("#cLaps").textContent=c.laps;
  $("#cDistance").textContent=totalDistance(c);
  $("#cFirst").textContent=c.firstGp;
  $("#cRecord").textContent=c.record;
  $("#cDesc").textContent=c.desc;

  // Tablas
  renderLastTop10(c);
  renderRecords(c);
  setActiveTab("last");

  history.replaceState(null,"",`#circuit=${encodeURIComponent(c.id)}`);
  $("#detailPanel").classList.add("open");
}
function closeDetail(){
  $("#detailPanel").classList.remove("open");
  if(location.hash.includes("circuit=")) history.replaceState(null,"",location.pathname);
}

/* ====== Tabs ====== */
function setActiveTab(key){
  $$(".tab").forEach(t=>t.classList.toggle("is-active", t.dataset.tab===key));
  $("#tblLast").classList.toggle("hidden", key!=="last");
  $("#tblRecords").classList.toggle("hidden", key!=="records");
}

/* ====== Export ====== */
function exportCSV(){
  const rows = getFiltered().map(({map,desc,lastTop10,recordTable,...keep})=>keep);
  const csv = toCSV(rows);
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="circuitos.csv"; a.click();
  URL.revokeObjectURL(url);
}

/* ====== Tema ====== */
function loadTheme(){
  const saved=localStorage.getItem("theme");
  if(saved==="light") document.body.classList.add("light");
}
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light":"dark");
}

/* ====== Eventos / Init ====== */
function bindEvents(){
  $("#q").addEventListener("input",(e)=>{ state.q=e.target.value; render(); });
  $("#continent").addEventListener("change",(e)=>{ state.continent=e.target.value; render(); });
  $("#country").addEventListener("change",(e)=>{ state.country=e.target.value; render(); });
  $("#viewMode").addEventListener("change",(e)=>{ state.viewMode=e.target.value; render(); });
  $("#sortBy").addEventListener("change",(e)=>{ state.sortBy=e.target.value; render(); });
  $("#resetBtn").addEventListener("click",()=>{
    state.q=""; state.continent="all"; state.country="all"; state.viewMode="cards"; state.sortBy="name_asc";
    $("#q").value=""; $("#continent").value="all"; $("#country").value="all"; $("#viewMode").value="cards"; $("#sortBy").value="name_asc";
    render();
  });
  $("#exportBtn").addEventListener("click", exportCSV);
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#closeDetail").addEventListener("click", closeDetail);

  document.body.addEventListener("click",(e)=>{
    const btn = e.target.closest("[data-open]");
    if(btn) openDetail(btn.dataset.open);
    const tab = e.target.closest(".tab");
    if(tab) setActiveTab(tab.dataset.tab);
  });

  if(location.hash.includes("circuit=")){
    const id = decodeURIComponent(location.hash.split("circuit=")[1]||"");
    if(id) openDetail(id);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  loadTheme();
  initFilters();
  render();
  bindEvents();
});
