/* ====== Datos de ejemplo ====== */
const TEAMS = [
  {
    id:"RBR-2025", name:"Red Bull Racing", short:"Red Bull", season:2025,
    country:"Austria", powerUnit:"Honda RBPT", principal:"Christian Horner",
    car:"RB21", base:"Milton Keynes (UK)", founded:2005,
    points:540, wins:12, podiums:20,
    drivers:["Max Verstappen (VER)","Sergio Pérez (PER)"],
    logo:"https://picsum.photos/seed/rbr/200/200",
    site:"https://www.redbullracing.com"
  },
  {
    id:"MCL-2025", name:"McLaren F1 Team", short:"McLaren", season:2025,
    country:"Reino Unido", powerUnit:"Mercedes", principal:"Andrea Stella",
    car:"MCL39", base:"Woking (UK)", founded:1963,
    points:512, wins:5, podiums:17,
    drivers:["Lando Norris (NOR)","Oscar Piastri (PIA)"],
    logo:"https://picsum.photos/seed/mcl/200/200",
    site:"https://www.mclaren.com/racing/"
  },
  {
    id:"FER-2025", name:"Scuderia Ferrari", short:"Ferrari", season:2025,
    country:"Italia", powerUnit:"Ferrari", principal:"Frédéric Vasseur",
    car:"SF-25", base:"Maranello (ITA)", founded:1929,
    points:498, wins:4, podiums:16,
    drivers:["Charles Leclerc (LEC)","Carlos Sainz (SAI)"],
    logo:"https://picsum.photos/seed/fer/200/200",
    site:"https://www.ferrari.com/en-EN/formula1"
  },
  {
    id:"MER-2025", name:"Mercedes-AMG Petronas", short:"Mercedes", season:2025,
    country:"Alemania", powerUnit:"Mercedes", principal:"Toto Wolff",
    car:"W16", base:"Brackley (UK)", founded:2010,
    points:350, wins:1, podiums:9,
    drivers:["Lewis Hamilton (HAM)","George Russell (RUS)"],
    logo:"https://picsum.photos/seed/mer/200/200",
    site:"https://www.mercedesamgf1.com"
  },

  /* 2024 ejemplos */
  {
    id:"RBR-2024", name:"Red Bull Racing", short:"Red Bull", season:2024,
    country:"Austria", powerUnit:"Honda RBPT", principal:"Christian Horner",
    car:"RB20", base:"Milton Keynes (UK)", founded:2005,
    points:860, wins:21, podiums:28,
    drivers:["Max Verstappen (VER)","Sergio Pérez (PER)"],
    logo:"https://picsum.photos/seed/rbr24/200/200",
    site:"https://www.redbullracing.com"
  },
  {
    id:"FER-2024", name:"Scuderia Ferrari", short:"Ferrari", season:2024,
    country:"Italia", powerUnit:"Ferrari", principal:"Frédéric Vasseur",
    car:"SF-24", base:"Maranello (ITA)", founded:1929,
    points:522, wins:5, podiums:19,
    drivers:["Charles Leclerc (LEC)","Carlos Sainz (SAI)"],
    logo:"https://picsum.photos/seed/fer24/200/200",
    site:"https://www.ferrari.com/en-EN/formula1"
  }
];

/* ====== Helpers ====== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function unique(a){ return [...new Set(a)]; }
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function byId(id){ return TEAMS.find(t => t.id === id); }

/* ====== Estado ====== */
const state = { q:"", season:"all", country:"all", powerUnit:"all", sortBy:"points_desc" };

/* ====== Filtros ====== */
function initFilters(){
  const countries = unique(TEAMS.map(t=>t.country)).sort();
  const pus = unique(TEAMS.map(t=>t.powerUnit)).sort();

  const cSel = $("#country"); const puSel = $("#powerUnit");
  countries.forEach(c=>{ const o=document.createElement("option"); o.value=c; o.textContent=c; cSel.appendChild(o); });
  pus.forEach(p=>{ const o=document.createElement("option"); o.value=p; o.textContent=p; puSel.appendChild(o); });
}

/* ====== Query ====== */
function getFiltered(){
  const { q, season, country, powerUnit, sortBy } = state;
  let rows = TEAMS.slice();

  if(season!=="all") rows = rows.filter(t=> String(t.season)===season);
  if(country!=="all") rows = rows.filter(t=> t.country===country);
  if(powerUnit!=="all") rows = rows.filter(t=> t.powerUnit===powerUnit);

  if(q.trim()){
    const qq=q.trim().toLowerCase();
    rows = rows.filter(t =>
      t.name.toLowerCase().includes(qq) ||
      t.short.toLowerCase().includes(qq) ||
      t.powerUnit.toLowerCase().includes(qq)
    );
  }

  switch(sortBy){
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "wins_desc": rows.sort((a,b)=> b.wins - a.wins); break;
    case "name_asc": rows.sort((a,b)=> a.name.localeCompare(b.name)); break;
  }

  return rows;
}

/* ====== Render ====== */
function renderList(){
  const rows = getFiltered();
  $("#count").textContent = `${rows.length} equipos`;

  const grid = $("#teamsGrid");
  grid.innerHTML = "";

  rows.forEach(t=>{
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <img src="${t.logo}" alt="Logo ${t.name}">
      <div>
        <div class="name">${t.name} <span class="tag">${t.short}</span></div>
        <div class="meta">${t.country} • ${t.powerUnit} • ${t.season}</div>
        <div class="kpis">
          <div class="kpi"><small>Puntos</small><b>${t.points}</b></div>
          <div class="kpi"><small>Victorias</small><b>${t.wins}</b></div>
          <div class="kpi"><small>Podios</small><b>${t.podiums}</b></div>
        </div>
      </div>
      <div class="actions-row">
        <button class="row-btn" data-open="${t.id}">Ver detalle</button>
        <a class="row-btn secondary" href="${t.site}" target="_blank" rel="noopener">Sitio</a>
      </div>
    `;
    grid.appendChild(el);
  });
}

/* ====== Detalle ====== */
function openDetail(id){
  const t = byId(id); if(!t) return;
  $("#tLogo").src = t.logo; $("#tLogo").alt = `Logo ${t.name}`;
  $("#tName").textContent = t.name;
  $("#tSubtitle").textContent = `${t.country} • ${t.powerUnit} • ${t.season}`;
  $("#tPoints").textContent = t.points;
  $("#tWins").textContent = t.wins;
  $("#tPodiums").textContent = t.podiums;
  $("#tPowerUnit").textContent = t.powerUnit;
  $("#tCountry").textContent = t.country;
  $("#tPrincipal").textContent = t.principal;
  $("#tFounded").textContent = t.founded;
  $("#tCar").textContent = t.car;
  $("#tBase").textContent = t.base;
  $("#tSite").textContent = new URL(t.site).hostname.replace("www.","");
  $("#tSite").href = t.site;

  const ul = $("#tDrivers"); ul.innerHTML="";
  (t.drivers||[]).forEach(d=>{ const li=document.createElement("li"); li.textContent=d; ul.appendChild(li); });

  history.replaceState(null,"",`#team=${encodeURIComponent(t.id)}`);
  $("#detailPanel").classList.add("open");
}
function closeDetail(){
  $("#detailPanel").classList.remove("open");
  if(location.hash.includes("team=")) history.replaceState(null,"",location.pathname);
}

/* ====== Export ====== */
function exportCSV(){
  const rows = getFiltered().map(({logo,site,drivers,...keep})=>keep);
  const csv = toCSV(rows);
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="constructores.csv"; a.click();
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
  $("#q").addEventListener("input",(e)=>{ state.q=e.target.value; renderList(); });
  $("#season").addEventListener("change",(e)=>{ state.season=e.target.value; renderList(); });
  $("#country").addEventListener("change",(e)=>{ state.country=e.target.value; renderList(); });
  $("#powerUnit").addEventListener("change",(e)=>{ state.powerUnit=e.target.value; renderList(); });
  $("#sortBy").addEventListener("change",(e)=>{ state.sortBy=e.target.value; renderList(); });
  $("#resetBtn").addEventListener("click",()=>{
    state.q=""; state.season="all"; state.country="all"; state.powerUnit="all"; state.sortBy="points_desc";
    $("#q").value=""; $("#season").value="all"; $("#country").value="all"; $("#powerUnit").value="all"; $("#sortBy").value="points_desc";
    renderList();
  });
  $("#exportBtn").addEventListener("click", exportCSV);
  $("#teamsGrid").addEventListener("click",(e)=>{
    const btn = e.target.closest("[data-open]");
    if(btn) openDetail(btn.dataset.open);
  });
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#closeDetail").addEventListener("click", closeDetail);

  if(location.hash.includes("team=")){
    const id = decodeURIComponent(location.hash.split("team=")[1]||"");
    if(id) openDetail(id);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  loadTheme();
  initFilters();
  renderList();
  bindEvents();
});
