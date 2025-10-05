/* ===== Datos de ejemplo 2025 ===== */
const DRIVERS_2025 = [
  { pos:1, code:"VER", name:"Max Verstappen", team:"Red Bull", points:325, wins:8, podiums:13, poles:7 },
  { pos:2, code:"NOR", name:"Lando Norris",   team:"McLaren",  points:282, wins:3, podiums:11, poles:2 },
  { pos:3, code:"LEC", name:"Charles Leclerc",team:"Ferrari",  points:261, wins:2, podiums:9,  poles:4 },
  { pos:4, code:"PIA", name:"Oscar Piastri",  team:"McLaren",  points:218, wins:1, podiums:7,  poles:0 },
  { pos:5, code:"SAI", name:"Carlos Sainz",   team:"Ferrari",  points:210, wins:1, podiums:6,  poles:1 },
  { pos:6, code:"RUS", name:"George Russell", team:"Mercedes", points:158, wins:1, podiums:4,  poles:1 },
  { pos:7, code:"PER", name:"Sergio Pérez",   team:"Red Bull", points:165, wins:0, podiums:5,  poles:0 },
  { pos:8, code:"HAM", name:"Lewis Hamilton", team:"Mercedes", points:170, wins:0, podiums:4,  poles:1 },
  { pos:9, code:"ALO", name:"Fernando Alonso",team:"Aston Martin", points:132, wins:0, podiums:3, poles:0 },
];

const TEAMS_2025 = [
  { pos:1, name:"Red Bull",    powerUnit:"Honda RBPT", points:540, wins:12, podiums:20 },
  { pos:2, name:"McLaren",     powerUnit:"Mercedes",   points:512, wins:5,  podiums:17 },
  { pos:3, name:"Ferrari",     powerUnit:"Ferrari",    points:498, wins:4,  podiums:16 },
  { pos:4, name:"Mercedes",    powerUnit:"Mercedes",   points:350, wins:1,  podiums:9  },
  { pos:5, name:"Aston Martin",powerUnit:"Mercedes",   points:220, wins:0,  podiums:4  },
];

/* Matriz de resultados por carrera (demo 5 GPs) */
const RACES_2025 = [
  { id:"bah", name:"Baréin",        date:"2025-03-02" },
  { id:"sau", name:"Arabia Saudí",  date:"2025-03-09" },
  { id:"aus", name:"Australia",     date:"2025-03-23" },
  { id:"jpn", name:"Japón",         date:"2025-04-06" },
  { id:"sgp", name:"Singapur",      date:"2025-10-05" }
];

/* Cada item: carrera, pos, piloto, team, puntos */
const RESULTS_2025 = [
  // Baréin
  { race:"bah", pos:1, driver:"Max Verstappen", team:"Red Bull", points:26, date:"2025-03-02" },
  { race:"bah", pos:2, driver:"Charles Leclerc", team:"Ferrari", points:18, date:"2025-03-02" },
  { race:"bah", pos:3, driver:"Lando Norris", team:"McLaren", points:16, date:"2025-03-02" },
  { race:"bah", pos:4, driver:"Sergio Pérez", team:"Red Bull", points:12, date:"2025-03-02" },
  // Arabia Saudí
  { race:"sau", pos:1, driver:"Lando Norris", team:"McLaren", points:26, date:"2025-03-09" },
  { race:"sau", pos:2, driver:"Max Verstappen", team:"Red Bull", points:18, date:"2025-03-09" },
  { race:"sau", pos:3, driver:"Carlos Sainz", team:"Ferrari", points:16, date:"2025-03-09" },
  { race:"sau", pos:4, driver:"George Russell", team:"Mercedes", points:12, date:"2025-03-09" },
  // Australia
  { race:"aus", pos:1, driver:"Max Verstappen", team:"Red Bull", points:26, date:"2025-03-23" },
  { race:"aus", pos:2, driver:"Charles Leclerc", team:"Ferrari", points:18, date:"2025-03-23" },
  { race:"aus", pos:3, driver:"Oscar Piastri", team:"McLaren", points:15, date:"2025-03-23" },
  { race:"aus", pos:5, driver:"Lewis Hamilton", team:"Mercedes", points:10, date:"2025-03-23" },
  // Japón
  { race:"jpn", pos:1, driver:"Max Verstappen", team:"Red Bull", points:25, date:"2025-04-06" },
  { race:"jpn", pos:2, driver:"Sergio Pérez", team:"Red Bull", points:18, date:"2025-04-06" },
  { race:"jpn", pos:3, driver:"Carlos Sainz", team:"Ferrari", points:15, date:"2025-04-06" },
  // Singapur (próxima – ejemplo de futuro)
  { race:"sgp", pos:null, driver:"—", team:"—", points:0, date:"2025-10-05" },
];

/* ===== Helpers ===== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function downloadCSV(filename, rows){
  const csv = toCSV(rows);
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function setThemeFromStorage(){
  const saved = localStorage.getItem("theme");
  if(saved === "light"){ document.body.classList.add("light"); }
}

/* ===== Tabs ===== */
function setActiveTab(key){
  $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.tab===key));
  $$(".pane").forEach(p => p.classList.toggle("open", p.id === `pane-${key}`));
}

/* ===== CU4 – Pilotos ===== */
const dState = { q:"", sort:"points_desc" };

function renderDrivers(){
  let rows = DRIVERS_2025.slice();
  if(dState.q.trim()){
    const qq = dState.q.trim().toLowerCase();
    rows = rows.filter(r => r.name.toLowerCase().includes(qq) || r.code.toLowerCase().includes(qq));
  }
  switch(dState.sort){
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "wins_desc": rows.sort((a,b)=> b.wins - a.wins); break;
    case "name_asc": rows.sort((a,b)=> a.name.localeCompare(b.name)); break;
  }
  $("#d-count").textContent = `${rows.length} pilotos`;

  const tb = $("#d-table tbody");
  tb.innerHTML = "";
  rows.forEach((r,i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${r.name}</td>
      <td>${r.code}</td>
      <td>${r.team}</td>
      <td><b>${r.points}</b></td>
      <td>${r.wins}</td>
      <td>${r.podiums}</td>
      <td>${r.poles}</td>`;
    tb.appendChild(tr);
  });
}

/* ===== CU5 – Constructores ===== */
const cState = { q:"", sort:"points_desc" };

function renderConstructors(){
  let rows = TEAMS_2025.slice();
  if(cState.q.trim()){
    const qq = cState.q.trim().toLowerCase();
    rows = rows.filter(r => r.name.toLowerCase().includes(qq) || r.powerUnit.toLowerCase().includes(qq));
  }
  switch(cState.sort){
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "wins_desc": rows.sort((a,b)=> b.wins - a.wins); break;
    case "name_asc": rows.sort((a,b)=> a.name.localeCompare(b.name)); break;
  }
  $("#c-count").textContent = `${rows.length} equipos`;

  const tb = $("#c-table tbody");
  tb.innerHTML = "";
  rows.forEach((r,i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${r.name}</td>
      <td>${r.powerUnit}</td>
      <td><b>${r.points}</b></td>
      <td>${r.wins}</td>
      <td>${r.podiums}</td>`;
    tb.appendChild(tr);
  });
}

/* ===== CU6 – Consultas 2025 (carrera, piloto, escudería) ===== */
const qState = { race:"all", driver:"all", team:"all", sort:"pos_asc" };

function initQueryFilters(){
  // Carreras
  const raceSel = $("#q-race");
  RACES_2025.forEach(r => {
    const o = document.createElement("option");
    o.value = r.id; o.textContent = `${r.name} (${new Date(r.date).toLocaleDateString()})`;
    raceSel.appendChild(o);
  });

  // Pilotos y equipos a partir de resultados
  const drivers = [...new Set(RESULTS_2025.map(r=>r.driver))].filter(v=>v !== "—").sort();
  const teams   = [...new Set(RESULTS_2025.map(r=>r.team))].filter(v=>v !== "—").sort();

  const dSel = $("#q-driver"), tSel = $("#q-team");
  drivers.forEach(n => { const o=document.createElement("option"); o.value=n; o.textContent=n; dSel.appendChild(o); });
  teams.forEach(n => { const o=document.createElement("option"); o.value=n; o.textContent=n; tSel.appendChild(o); });
}

function getQueryRows(){
  let rows = RESULTS_2025.slice().filter(r => r.pos !== null); // ignora futuras
  if(qState.race !== "all") rows = rows.filter(r => r.race === qState.race);
  if(qState.driver !== "all") rows = rows.filter(r => r.driver === qState.driver);
  if(qState.team !== "all") rows = rows.filter(r => r.team === qState.team);

  switch(qState.sort){
    case "pos_asc": rows.sort((a,b)=> a.pos - b.pos); break;
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "name_asc": rows.sort((a,b)=> a.driver.localeCompare(b.driver)); break;
  }

  return rows;
}

function renderQuery(){
  const rows = getQueryRows();
  $("#q-count").textContent = `${rows.length} resultados`;

  const tb = $("#q-table tbody");
  tb.innerHTML = "";
  rows.forEach(r => {
    const raceName = RACES_2025.find(x=>x.id===r.race)?.name || r.race;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${raceName}</td>
      <td>${r.pos}</td>
      <td>${r.driver}</td>
      <td>${r.team}</td>
      <td>${r.points}</td>
      <td>${new Date(r.date).toLocaleDateString()}</td>`;
    tb.appendChild(tr);
  });
}

/* ===== Eventos ===== */
function bindEvents(){
  // Tabs
  document.body.addEventListener("click",(e)=>{
    const t = e.target.closest(".tab");
    if(t){ setActiveTab(t.dataset.tab); }
  });

  // Tema
  $("#themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Pilotos
  $("#d-q").addEventListener("input", e=>{ dState.q = e.target.value; renderDrivers(); });
  $("#d-sort").addEventListener("change", e=>{ dState.sort = e.target.value; renderDrivers(); });
  $("#d-reset").addEventListener("click", ()=>{
    dState.q=""; dState.sort="points_desc";
    $("#d-q").value=""; $("#d-sort").value="points_desc";
    renderDrivers();
  });
  $("#d-export").addEventListener("click", ()=>{
    const rows = DRIVERS_2025.slice().map(({pos,code,name,team,points,wins,podiums,poles}) => ({pos,code,name,team,points,wins,podiums,poles}));
    downloadCSV("pilotos_2025.csv", rows);
  });

  // Constructores
  $("#c-q").addEventListener("input", e=>{ cState.q = e.target.value; renderConstructors(); });
  $("#c-sort").addEventListener("change", e=>{ cState.sort = e.target.value; renderConstructors(); });
  $("#c-reset").addEventListener("click", ()=>{
    cState.q=""; cState.sort="points_desc";
    $("#c-q").value=""; $("#c-sort").value="points_desc";
    renderConstructors();
  });
  $("#c-export").addEventListener("click", ()=>{
    const rows = TEAMS_2025.slice().map(({pos,name,powerUnit,points,wins,podiums}) => ({pos,name,powerUnit,points,wins,podiums}));
    downloadCSV("constructores_2025.csv", rows);
  });

  // Consultas
  $("#q-race").addEventListener("change", e=>{ qState.race = e.target.value; renderQuery(); });
  $("#q-driver").addEventListener("change", e=>{ qState.driver = e.target.value; renderQuery(); });
  $("#q-team").addEventListener("change", e=>{ qState.team = e.target.value; renderQuery(); });
  $("#q-sort").addEventListener("change", e=>{ qState.sort = e.target.value; renderQuery(); });
  $("#q-reset").addEventListener("click", ()=>{
    qState.race="all"; qState.driver="all"; qState.team="all"; qState.sort="pos_asc";
    $("#q-race").value="all"; $("#q-driver").value="all"; $("#q-team").value="all"; $("#q-sort").value="pos_asc";
    renderQuery();
  });
  $("#q-export").addEventListener("click", ()=>{
    const rows = getQueryRows().map(({race,pos,driver,team,points,date})=>{
      const raceName = RACES_2025.find(x=>x.id===race)?.name || race;
      return {race:raceName,pos,driver,team,points,date};
    });
    downloadCSV("consulta_resultados_2025.csv", rows);
  });
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", ()=>{
  setThemeFromStorage();

  renderDrivers();
  renderConstructors();
  initQueryFilters();
  renderQuery();

  bindEvents();
});
