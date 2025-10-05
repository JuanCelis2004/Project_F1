/* ====== Datos de ejemplo (2024/2025) ======
   Puedes conectar a una API en el futuro y reemplazar este bloque por fetch().
*/
const DRIVERS = [
  // 2025
  {
    code: "VER", name: "Max Verstappen", number: 1, nationality: "Países Bajos",
    team: "Red Bull", season: 2025, points: 325, wins: 8, podiums: 13, poles: 7, fastest: 5,
    avatar: "https://picsum.photos/seed/ver/200/200",
    bio: "Tricampeón, referencia del rendimiento contemporáneo. Estilo agresivo y consistente.",
    results: [
      { gp: "Baréin", pos: 1, pts: 26, date: "2025-03-02" },
      { gp: "Arabia Saudí", pos: 2, pts: 18, date: "2025-03-09" },
      { gp: "Australia", pos: 1, pts: 26, date: "2025-03-23" },
      { gp: "Japón", pos: 3, pts: 15, date: "2025-04-06" }
    ]
  },
  { code: "NOR", name: "Lando Norris", number: 4, nationality: "Reino Unido",
    team: "McLaren", season: 2025, points: 282, wins: 3, podiums: 11, poles: 2, fastest: 3,
    avatar: "https://picsum.photos/seed/nor/200/200",
    bio: "Talento joven consolidado. Ritmo fuerte en clasificación y alta regularidad.",
    results: [
      { gp: "Baréin", pos: 3, pts: 16, date: "2025-03-02" },
      { gp: "Arabia Saudí", pos: 1, pts: 26, date: "2025-03-09" },
      { gp: "Australia", pos: 4, pts: 12, date: "2025-03-23" }
    ]
  },
  { code: "LEC", name: "Charles Leclerc", number: 16, nationality: "Mónaco",
    team: "Ferrari", season: 2025, points: 261, wins: 2, podiums: 9, poles: 4, fastest: 2,
    avatar: "https://picsum.photos/seed/lec/200/200",
    bio: "Clasificador brillante, gestor de neumáticos en progreso. Firme en Ferrari.",
    results: [
      { gp: "Baréin", pos: 2, pts: 18, date: "2025-03-02" },
      { gp: "Australia", pos: 2, pts: 18, date: "2025-03-23" }
    ]
  },
  { code: "SAI", name: "Carlos Sainz", number: 55, nationality: "España",
    team: "Ferrari", season: 2025, points: 210, wins: 1, podiums: 6, poles: 1, fastest: 2,
    avatar: "https://picsum.photos/seed/sai/200/200",
    bio: "Sólido en ritmo de carrera y gran gestión estratégica.",
    results: [
      { gp: "Arabia Saudí", pos: 3, pts: 16, date: "2025-03-09" }
    ]
  },
  { code: "PIA", name: "Oscar Piastri", number: 81, nationality: "Australia",
    team: "McLaren", season: 2025, points: 218, wins: 1, podiums: 7, poles: 0, fastest: 1,
    avatar: "https://picsum.photos/seed/pia/200/200",
    bio: "Rookie del año 2023, ya actúa como veterano. Muy fino en tandas largas.",
    results: [
      { gp: "Australia", pos: 3, pts: 15, date: "2025-03-23" }
    ]
  },
  { code: "HAM", name: "Lewis Hamilton", number: 44, nationality: "Reino Unido",
    team: "Mercedes", season: 2025, points: 170, wins: 0, podiums: 4, poles: 1, fastest: 1,
    avatar: "https://picsum.photos/seed/ham/200/200",
    bio: "Múltiple campeón mundial. Experiencia y lectura de carrera top.",
    results: [
      { gp: "Australia", pos: 5, pts: 10, date: "2025-03-23" }
    ]
  },
  { code: "PER", name: "Sergio Pérez", number: 11, nationality: "México",
    team: "Red Bull", season: 2025, points: 165, wins: 0, podiums: 5, poles: 0, fastest: 2,
    avatar: "https://picsum.photos/seed/per/200/200",
    bio: "Maestro del cuidado de neumáticos y remontadas.",
    results: [
      { gp: "Baréin", pos: 4, pts: 12, date: "2025-03-02" }
    ]
  },
  { code: "ALO", name: "Fernando Alonso", number: 14, nationality: "España",
    team: "Aston Martin", season: 2025, points: 132, wins: 0, podiums: 3, poles: 0, fastest: 0,
    avatar: "https://picsum.photos/seed/alo/200/200",
    bio: "Veteranía y estrategia. Extrae más del coche en domingos complejos.",
    results: [
      { gp: "Australia", pos: 6, pts: 8, date: "2025-03-23" }
    ]
  },
  { code: "RUS", name: "George Russell", number: 63, nationality: "Reino Unido",
    team: "Mercedes", season: 2025, points: 158, wins: 1, podiums: 4, poles: 1, fastest: 1,
    avatar: "https://picsum.photos/seed/rus/200/200",
    bio: "Constante, fuerte en clasificación, margen de crecimiento en gestión.",
    results: [
      { gp: "Arabia Saudí", pos: 4, pts: 12, date: "2025-03-09" }
    ]
  },

  // 2024 (muestra)
  { code: "VER", name: "Max Verstappen", number: 1, nationality: "Países Bajos",
    team: "Red Bull", season: 2024, points: 575, wins: 19, podiums: 21, poles: 12, fastest: 9,
    avatar: "https://picsum.photos/seed/ver24/200/200",
    bio: "Temporada dominante 2024.",
    results: [
      { gp: "Baréin", pos: 1, pts: 26, date: "2024-03-02" }
    ]
  },
  { code: "LEC", name: "Charles Leclerc", number: 16, nationality: "Mónaco",
    team: "Ferrari", season: 2024, points: 293, wins: 3, podiums: 12, poles: 6, fastest: 4,
    avatar: "https://picsum.photos/seed/lec24/200/200",
    bio: "Gran salto en 2024.",
    results: [
      { gp: "Mónaco", pos: 1, pts: 25, date: "2024-05-26" }
    ]
  },
  { code: "PER", name: "Sergio Pérez", number: 11, nationality: "México",
    team: "Red Bull", season: 2024, points: 285, wins: 2, podiums: 11, poles: 1, fastest: 2,
    avatar: "https://picsum.photos/seed/per24/200/200",
    bio: "Fuerte primera mitad 2024.",
    results: [
      { gp: "Arabia Saudí", pos: 1, pts: 25, date: "2024-03-09" }
    ]
  }
];

/* ====== Helpers ====== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function byIdSeason(code, season){
  return DRIVERS.find(d => d.code === code && d.season === season);
}
function unique(arr){ return [...new Set(arr)]; }
function formatDate(d){ return new Date(d).toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'}); }

function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}

/* ====== Estado de UI ====== */
const state = {
  q: "",
  season: "all",
  team: "all",
  nationality: "all",
  minWins: 0,
  sortBy: "points_desc"
};

/* ====== Inicialización de selects ====== */
function initFilters(){
  // Equipos y nacionalidades en base a todas las temporadas (para UX)
  const teams = unique(DRIVERS.map(d => d.team)).sort();
  const nats  = unique(DRIVERS.map(d => d.nationality)).sort();

  const teamSel = $("#team"); const natSel = $("#nationality");
  teams.forEach(t => { const o=document.createElement("option"); o.value=t; o.textContent=t; teamSel.appendChild(o); });
  nats.forEach(n => { const o=document.createElement("option"); o.value=n; o.textContent=n; natSel.appendChild(o); });

  // Rango dinámico de victorias
  const maxWins = Math.max(...DRIVERS.map(d => d.wins));
  $("#minWins").max = String(Math.max(5, maxWins));
}

/* ====== Filtrado y orden ====== */
function getFiltered(){
  const { q, season, team, nationality, minWins, sortBy } = state;

  let rows = DRIVERS.slice();

  if(season !== "all"){ rows = rows.filter(r => String(r.season) === season); }
  if(team !== "all"){ rows = rows.filter(r => r.team === team); }
  if(nationality !== "all"){ rows = rows.filter(r => r.nationality === nationality); }
  if(minWins > 0){ rows = rows.filter(r => r.wins >= minWins); }

  if(q.trim()){
    const qq = q.trim().toLowerCase();
    rows = rows.filter(r =>
      r.name.toLowerCase().includes(qq) ||
      r.code.toLowerCase().includes(qq)
    );
  }

  switch(sortBy){
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "wins_desc": rows.sort((a,b)=> b.wins - a.wins); break;
    case "name_asc": rows.sort((a,b)=> a.name.localeCompare(b.name)); break;
  }

  return rows;
}

/* ====== Render lista ====== */
function renderList(){
  const rows = getFiltered();
  $("#count").textContent = `${rows.length} ${rows.length===1?'piloto':'pilotos'}`;

  const grid = $("#driversGrid");
  grid.innerHTML = "";

  rows.forEach(d => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <img src="${d.avatar}" alt="Foto de ${d.name}">
      <div>
        <div class="name">${d.name} <span class="tag">${d.code}</span></div>
        <div class="meta">${d.team} • ${d.nationality} • ${d.season}</div>
        <div class="kpis">
          <div class="kpi"><small>Puntos</small><b>${d.points}</b></div>
          <div class="kpi"><small>Victorias</small><b>${d.wins}</b></div>
          <div class="kpi"><small>Podios</small><b>${d.podiums}</b></div>
        </div>
      </div>
      <div class="actions-row">
        <button class="row-btn" data-open="${d.code}:${d.season}">Ver detalle</button>
        <button class="row-btn secondary" data-copy="${d.code}:${d.season}">Copiar ID</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

/* ====== Detalle ====== */
function openDetail(code, season){
  const d = byIdSeason(code, Number(season));
  if(!d) return;

  $("#dAvatar").src = d.avatar;
  $("#dAvatar").alt = `Foto de ${d.name}`;
  $("#dName").textContent = `${d.name} (${d.code})`;
  $("#dSubtitle").textContent = `${d.team} • ${d.nationality} • ${d.season}`;
  $("#dPoints").textContent = d.points;
  $("#dWins").textContent = d.wins;
  $("#dPodiums").textContent = d.podiums;
  $("#dPoles").textContent = d.poles;
  $("#dFastest").textContent = d.fastest;
  $("#dBio").textContent = d.bio;

  const tbody = $("#dResults tbody");
  tbody.innerHTML = "";
  (d.results || []).forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.gp}</td><td>${r.pos}</td><td>${r.pts}</td><td>${formatDate(r.date)}</td>`;
    tbody.appendChild(tr);
  });

  // Deep-link en hash
  history.replaceState(null, "", `#driver=${d.code}&season=${d.season}`);
  $("#detailPanel").classList.add("open");
}

function closeDetail(){
  $("#detailPanel").classList.remove("open");
  // limpiar hash si corresponde
  if(location.hash.includes("driver=")) history.replaceState(null, "", location.pathname);
}

/* ====== Export ====== */
function exportCSV(){
  const rows = getFiltered().map(({avatar,bio,results, ...keep}) => keep);
  const csv = toCSV(rows);
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "pilotos.csv"; a.click();
  URL.revokeObjectURL(url);
}

/* ====== Tema ====== */
function loadTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "light"){ document.body.classList.add("light"); }
}
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

/* ====== Eventos ====== */
function bindEvents(){
  $("#q").addEventListener("input", (e)=>{ state.q = e.target.value; renderList(); });
  $("#season").addEventListener("change", (e)=>{ state.season = e.target.value; renderList(); });
  $("#team").addEventListener("change", (e)=>{ state.team = e.target.value; renderList(); });
  $("#nationality").addEventListener("change", (e)=>{ state.nationality = e.target.value; renderList(); });
  $("#minWins").addEventListener("input", (e)=>{ state.minWins = Number(e.target.value); $("#minWinsOut").textContent = state.minWins; renderList(); });
  $("#sortBy").addEventListener("change", (e)=>{ state.sortBy = e.target.value; renderList(); });
  $("#resetBtn").addEventListener("click", ()=>{
    state.q=""; state.season="all"; state.team="all"; state.nationality="all"; state.minWins=0; state.sortBy="points_desc";
    $("#q").value=""; $("#season").value="all"; $("#team").value="all"; $("#nationality").value="all"; $("#minWins").value=0; $("#minWinsOut").textContent="0"; $("#sortBy").value="points_desc";
    renderList();
  });
  $("#exportBtn").addEventListener("click", exportCSV);
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#closeDetail").addEventListener("click", closeDetail);

  // Delegación para botones de cada tarjeta
  $("#driversGrid").addEventListener("click", (e)=>{
    const open = e.target.closest("[data-open]");
    const copy = e.target.closest("[data-copy]");
    if(open){
      const [code, season] = open.dataset.open.split(":");
      openDetail(code, season);
    }
    if(copy){
      const text = copy.dataset.copy;
      navigator.clipboard.writeText(text);
      copy.textContent = "Copiado ✓";
      setTimeout(()=>{ copy.textContent = "Copiar ID"; }, 1200);
    }
  });

  // Abrir por hash (deep-link)
  if(location.hash.includes("driver=")){
    const params = new URLSearchParams(location.hash.replace("#",""));
    const code = params.get("driver");
    const season = Number(params.get("season")) || 2025;
    openDetail(code, season);
  }
}

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", ()=>{
  loadTheme();
  initFilters();
  renderList();
  bindEvents();
});
