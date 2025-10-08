/* ========= Datos de ejemplo (histórico & predicciones) ========= */
/* Carreras 2024/2025 (subset para demo) */
const RACES = [
  { id:"bah-2024", name:"Baréin",       date:"2024-03-02" },
  { id:"sau-2024", name:"Arabia Saudí", date:"2024-03-09" },
  { id:"aus-2024", name:"Australia",    date:"2024-03-24" },
  { id:"jpn-2024", name:"Japón",        date:"2024-04-07" },

  { id:"bah-2025", name:"Baréin",       date:"2025-03-02" },
  { id:"sau-2025", name:"Arabia Saudí", date:"2025-03-09" },
  { id:"aus-2025", name:"Australia",    date:"2025-03-23" },
  { id:"jpn-2025", name:"Japón",        date:"2025-04-06" },
  { id:"sgp-2025", name:"Singapur",     date:"2025-10-05" } // futura
];

/* Resultados históricos (tabla). Mezcla 2024/2025. */
const RESULTS = [
  // 2024 (muestra)
  { season:2024, race:"bah-2024", pos:1, driver:"Max Verstappen", team:"Red Bull", points:26, date:"2024-03-02" },
  { season:2024, race:"bah-2024", pos:2, driver:"Sergio Pérez",   team:"Red Bull", points:18, date:"2024-03-02" },
  { season:2024, race:"bah-2024", pos:3, driver:"Charles Leclerc",team:"Ferrari",  points:16, date:"2024-03-02" },
  { season:2024, race:"jpn-2024", pos:1, driver:"Max Verstappen", team:"Red Bull", points:25, date:"2024-04-07" },

  // 2025 (muestra)
  { season:2025, race:"bah-2025", pos:1, driver:"Max Verstappen", team:"Red Bull", points:26, date:"2025-03-02" },
  { season:2025, race:"bah-2025", pos:2, driver:"Charles Leclerc",team:"Ferrari",  points:18, date:"2025-03-02" },
  { season:2025, race:"bah-2025", pos:3, driver:"Lando Norris",   team:"McLaren",  points:16, date:"2025-03-02" },

  { season:2025, race:"sau-2025", pos:1, driver:"Lando Norris",   team:"McLaren",  points:26, date:"2025-03-09" },
  { season:2025, race:"sau-2025", pos:2, driver:"Max Verstappen", team:"Red Bull", points:18, date:"2025-03-09" },
  { season:2025, race:"sau-2025", pos:3, driver:"Carlos Sainz",   team:"Ferrari",  points:16, date:"2025-03-09" },

  { season:2025, race:"aus-2025", pos:1, driver:"Max Verstappen", team:"Red Bull", points:26, date:"2025-03-23" },
  { season:2025, race:"aus-2025", pos:2, driver:"Charles Leclerc",team:"Ferrari",  points:18, date:"2025-03-23" },
  { season:2025, race:"aus-2025", pos:3, driver:"Oscar Piastri",  team:"McLaren",  points:15, date:"2025-03-23" },

  { season:2025, race:"jpn-2025", pos:1, driver:"Max Verstappen", team:"Red Bull", points:25, date:"2025-04-06" },
  { season:2025, race:"jpn-2025", pos:2, driver:"Sergio Pérez",   team:"Red Bull", points:18, date:"2025-04-06" },
  { season:2025, race:"jpn-2025", pos:3, driver:"Carlos Sainz",   team:"Ferrari",  points:15, date:"2025-04-06" },

  // Singapur aún sin correr en 2025 (placeholder de futuro)
  { season:2025, race:"sgp-2025", pos:null, driver:"—", team:"—", points:0, date:"2025-10-05" },
];

/* Predicciones de ejemplo (para gráfico)
   key: "driver:Max Verstappen" o "team:Ferrari"
   series: [{raceId, points_pred, p10, p90}]
   probs: para la próxima carrera filtrada: {pos:prob}
*/
const PREDICTIONS = {
  "driver:Max Verstappen":{
    series: [
      { raceId:"bah-2025", points_pred:25, p10:20, p90:26 },
      { raceId:"sau-2025", points_pred:20, p10:12, p90:26 },
      { raceId:"aus-2025", points_pred:24, p10:18, p90:26 },
      { raceId:"jpn-2025", points_pred:25, p10:18, p90:26 },
      { raceId:"sgp-2025", points_pred:22, p10:12, p90:26 } // futura
    ],
    probs:{
      "sgp-2025":{1:0.35,2:0.22,3:0.18,4:0.10,5:0.08,6:0.04,7:0.02,8:0.01}
    }
  },
  "driver:Lando Norris":{
    series: [
      { raceId:"bah-2025", points_pred:16, p10:8, p90:21 },
      { raceId:"sau-2025", points_pred:26, p10:18, p90:26 },
      { raceId:"aus-2025", points_pred:12, p10:8, p90:18 },
      { raceId:"jpn-2025", points_pred:15, p10:10, p90:20 },
      { raceId:"sgp-2025", points_pred:18, p10:10, p90:25 }
    ],
    probs:{
      "sgp-2025":{1:0.15,2:0.22,3:0.20,4:0.16,5:0.12,6:0.08,7:0.04,8:0.03}
    }
  },
  "team:Ferrari":{
    series: [
      { raceId:"bah-2025", points_pred:34, p10:24, p90:40 },
      { raceId:"sau-2025", points_pred:31, p10:20, p90:38 },
      { raceId:"aus-2025", points_pred:33, p10:24, p90:38 },
      { raceId:"jpn-2025", points_pred:30, p10:20, p90:36 },
      { raceId:"sgp-2025", points_pred:35, p10:24, p90:42 }
    ],
    probs:{
      "sgp-2025":{1:0.28,2:0.26,3:0.20,4:0.12,5:0.08,6:0.04,7:0.02}
    }
  }
};

/* ========= Helpers ========= */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmtDate = (d) => new Date(d).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});
const unique = (arr) => [...new Set(arr)];
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h] ?? "").replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function downloadCSV(name, rows){
  const csv = toCSV(rows);
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=name; a.click();
  URL.revokeObjectURL(url);
}

/* ========= Estado ========= */
const state = {
  race:"all",
  driver:"all",
  team:"all",
  sort:"pos_asc"
};

/* ========= Cargar filtros ========= */
function initFilters(){
  // Carreras (solo 2025 en primer bloque de la lista, pero incluimos 2024 en tabla)
  const raceSel = $("#fRace");
  RACES.filter(r => r.id.endsWith("2025")).forEach(r=>{
    const o = document.createElement("option"); o.value=r.id; o.textContent=`${r.name} (${fmtDate(r.date)})`; raceSel.appendChild(o);
  });

  const drivers = unique(RESULTS.map(r=>r.driver)).filter(n=>n!=="—").sort();
  const teams   = unique(RESULTS.map(r=>r.team)).filter(n=>n!=="—").sort();

  const dSel = $("#fDriver"), tSel = $("#fTeam");
  drivers.forEach(n=>{ const o=document.createElement("option"); o.value=n; o.textContent=n; dSel.appendChild(o); });
  teams.forEach(n=>{ const o=document.createElement("option"); o.value=n; o.textContent=n; tSel.appendChild(o); });
}

/* ========= Query & tabla ========= */
function getFilteredRows(){
  let rows = RESULTS.slice().filter(r => r.pos !== null || r.date < new Date().toISOString().slice(0,10));
  if(state.race !== "all")  rows = rows.filter(r => r.race === state.race);
  if(state.driver !== "all")rows = rows.filter(r => r.driver === state.driver);
  if(state.team !== "all")  rows = rows.filter(r => r.team === state.team);

  switch(state.sort){
    case "pos_asc": rows.sort((a,b)=> (a.pos??99) - (b.pos??99)); break;
    case "points_desc": rows.sort((a,b)=> b.points - a.points); break;
    case "name_asc": rows.sort((a,b)=> a.driver.localeCompare(b.driver)); break;
    case "team_asc": rows.sort((a,b)=> a.team.localeCompare(b.team)); break;
    case "date_desc": rows.sort((a,b)=> new Date(b.date)-new Date(a.date)); break;
  }
  return rows;
}

function renderTable(){
  const rows = getFilteredRows();
  $("#rCount").textContent = `${rows.length}`;
  $("#kCount").textContent = rows.length.toString();
  const pts = rows.reduce((s,r)=>s+(r.points||0),0);
  $("#kPts").textContent = pts.toString();
  $("#kAvg").textContent = rows.length ? (pts/rows.length).toFixed(1) : "0.0";
  $("#kWins").textContent = rows.filter(r=>r.pos===1).length;

  const tb = $("#tblResults tbody");
  tb.innerHTML = "";
  rows.forEach(r=>{
    const raceName = RACES.find(x=>x.id===r.race)?.name || r.race;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.season}</td>
      <td>${raceName}</td>
      <td>${r.pos ?? "—"}</td>
      <td>${r.driver}</td>
      <td>${r.team}</td>
      <td>${r.points}</td>
      <td>${fmtDate(r.date)}</td>
    `;
    tb.appendChild(tr);
  });
}

/* ========= Preparar series para gráficos ========= */
function getVizTargetKey(){
  if(state.driver !== "all") return `driver:${state.driver}`;
  if(state.team   !== "all") return `team:${state.team}`;
  return null;
}

function buildSeriesForTarget(){
  const key = getVizTargetKey();
  if(!key) return { labels:[], hist:[], pred:[], p10:[], p90:[] };

  // Históricos del target (por carrera 2025)
  const histRows = RESULTS
    .filter(r => r.season===2025)
    .filter(r => (state.driver!=="all" ? r.driver===state.driver : true))
    .filter(r => (state.team!=="all"   ? r.team===state.team     : true))
    .filter(r => r.pos !== null);

  const races2025 = RACES.filter(r=>r.id.endsWith("2025")).sort((a,b)=> new Date(a.date)-new Date(b.date));

  // Mapa raceId -> puntos históricos (sumar si es team y hay 2 pilotos)
  const histMap = {};
  races2025.forEach(rc => histMap[rc.id] = 0);
  histRows.forEach(r => { histMap[r.race] = (histMap[r.race]||0) + (r.points||0); });

  // Predicciones
  const predData = (PREDICTIONS[key] || {}).series || [];

  const labels = races2025.map(r => `${r.name} ${new Date(r.date).toLocaleDateString(undefined,{month:"short"})}`);
  const hist   = races2025.map(r => histMap[r.id] ?? null);

  // Para pred: usar null en pasadas y valor en futuras/definidas
  const pred   = races2025.map(r => {
    const p = predData.find(x=>x.raceId===r.id);
    return p ? p.points_pred : null;
  });
  const p10    = races2025.map(r => {
    const p = predData.find(x=>x.raceId===r.id);
    return p ? p.p10 : null;
  });
  const p90    = races2025.map(r => {
    const p = predData.find(x=>x.raceId===r.id);
    return p ? p.p90 : null;
  });

  return { key, labels, hist, pred, p10, p90 };
}

function buildProbsForNext(){
  const key = getVizTargetKey();
  if(!key || state.race==="all") return { labels:[], values:[] };

  const pred = (PREDICTIONS[key] || {}).probs || {};
  const p = pred[state.race];
  if(!p) return { labels:[], values:[] };

  const entries = Object.entries(p) // [pos, prob]
    .map(([pos,prob])=>({pos:Number(pos),prob}))
    .sort((a,b)=>a.pos-b.pos);

  return { labels: entries.map(e=>`P${e.pos}`), values: entries.map(e=> Math.round(e.prob*100)) };
}

/* ========= Charts ========= */
let seriesChart = null;
let probsChart  = null;

function renderCharts(){
  const targetKey = getVizTargetKey();
  $("#vizTarget").textContent = targetKey ? targetKey.replace("driver:","Piloto: ").replace("team:","Equipo: ") : "Selecciona piloto o equipo";

  // Series
  const { labels, hist, pred, p10, p90 } = buildSeriesForTarget();

  // Destroy prev
  if(seriesChart) { seriesChart.destroy(); seriesChart = null; }

  const ctx1 = document.getElementById("chartSeries").getContext("2d");
  seriesChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label:"Histórico 2025", data: hist, tension:.3, borderWidth:2, pointRadius:3 },
        { label:"Predicción", data: pred, tension:.3, borderWidth:2, borderDash:[6,6], pointRadius:3 },
        { label:"P90", data: p90, tension:.3, borderWidth:0, pointRadius:0, fill:"+1" },
        { label:"P10", data: p10, tension:.3, borderWidth:0, pointRadius:0 },
      ]
    },
    options: {
      responsive:true,
      interaction:{ mode:"index", intersect:false },
      plugins:{
        legend:{ labels:{ boxWidth:14 } },
        tooltip:{ callbacks:{
          label: (ctx)=> `${ctx.dataset.label}: ${ctx.parsed.y ?? "—"} pts`
        }}
      },
      scales:{
        y:{ beginAtZero:true, title:{display:true, text:"Puntos por GP"} }
      },
      elements:{
        line:{ spanGaps:true }
      }
    }
  });

  // Probs
  const { labels:pl, values:pv } = buildProbsForNext();
  if(probsChart){ probsChart.destroy(); probsChart = null; }

  const ctx2 = document.getElementById("chartProbs").getContext("2d");
  probsChart = new Chart(ctx2, {
    type: "bar",
    data: { labels: pl, datasets:[{ label:"Probabilidad (%)", data: pv }] },
    options:{
      responsive:true,
      plugins:{ legend:{display:false} },
      scales:{
        y:{ beginAtZero:true, max:100, title:{display:true, text:"%"} }
      }
    }
  });
}

/* ========= Eventos ========= */
function bindEvents(){
  $("#themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light":"dark");
  });

  $("#fRace").addEventListener("change", e=>{ state.race = e.target.value; renderTable(); renderCharts(); });
  $("#fDriver").addEventListener("change", e=>{ state.driver = e.target.value; renderTable(); renderCharts(); });
  $("#fTeam").addEventListener("change", e=>{ state.team = e.target.value; renderTable(); renderCharts(); });
  $("#fSort").addEventListener("change", e=>{ state.sort = e.target.value; renderTable(); });

  $("#btnReset").addEventListener("click", ()=>{
    state.race="all"; state.driver="all"; state.team="all"; state.sort="pos_asc";
    $("#fRace").value="all"; $("#fDriver").value="all"; $("#fTeam").value="all"; $("#fSort").value="pos_asc";
    renderTable(); renderCharts();
  });

  $("#btnCSV").addEventListener("click", ()=>{
    const rows = getFilteredRows().map(r => ({
      season:r.season, carrera:(RACES.find(x=>x.id===r.race)?.name||r.race),
      pos:r.pos, driver:r.driver, team:r.team, points:r.points, date:r.date
    }));
    downloadCSV("consultas_2025.csv", rows);
  });
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", ()=>{
  // Tema guardado
  const saved = localStorage.getItem("theme");
  if(saved === "light") document.body.classList.add("light");

  initFilters();
  renderTable();
  renderCharts();
  bindEvents();
});
