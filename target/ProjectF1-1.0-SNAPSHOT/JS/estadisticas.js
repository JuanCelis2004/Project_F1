/* =================== Datos de ejemplo =================== */
/* Resultados por GP (subset) – estructura mínima para las métricas y gráficas. */
const DATA = {
  2024: {
    races: ["BHR","KSA","AUS","JPN","CHN","MIA","EMI","MON"],
    drivers: [
      { code:"VER", name:"Max Verstappen", team:"Red Bull",
        perRacePoints:[26,18,25,25,25,26,18,18],
        perRaceQualVsFinish:[{q:1,f:1},{q:2,f:2},{q:1,f:1},{q:1,f:1},{q:1,f:1},{q:1,f:1},{q:2,f:5},{q:2,f:2}],
        wins:6, podiums:7
      },
      { code:"LEC", name:"Charles Leclerc", team:"Ferrari",
        perRacePoints:[16,12,18,12,10,18,26,25],
        perRaceQualVsFinish:[{q:3,f:3},{q:4,f:5},{q:2,f:2},{q:4,f:4},{q:3,f:3},{q:3,f:2},{q:1,f:1},{q:1,f:1}],
        wins:2, podiums:6
      },
      { code:"NOR", name:"Lando Norris", team:"McLaren",
        perRacePoints:[15,26,10,10,18,15,12,18],
        perRaceQualVsFinish:[{q:5,f:3},{q:1,f:1},{q:5,f:6},{q:5,f:5},{q:2,f:2},{q:2,f:3},{q:5,f:4},{q:3,f:3}],
        wins:1, podiums:5
      },
    ]
  },
  2025: {
    races: ["BHR","KSA","AUS","JPN","CHN","MIA","EMI","MON","CAN"],
    drivers: [
      { code:"VER", name:"Max Verstappen", team:"Red Bull",
        perRacePoints:[26,18,26,25,22,25,18,15,26],
        perRaceQualVsFinish:[{q:1,f:1},{q:2,f:2},{q:1,f:1},{q:1,f:1},{q:4,f:2},{q:1,f:1},{q:3,f:4},{q:5,f:5},{q:2,f:1}],
        wins:7, podiums:9
      },
      { code:"NOR", name:"Lando Norris", team:"McLaren",
        perRacePoints:[16,26,12,15,18,12,26,18,18],
        perRaceQualVsFinish:[{q:3,f:3},{q:1,f:1},{q:4,f:4},{q:3,f:3},{q:3,f:3},{q:4,f:4},{q:1,f:1},{q:2,f:2},{q:3,f:3}],
        wins:3, podiums:7
      },
      { code:"LEC", name:"Charles Leclerc", team:"Ferrari",
        perRacePoints:[18,18,18,12,25,18,15,26,12],
        perRaceQualVsFinish:[{q:2,f:2},{q:3,f:3},{q:2,f:2},{q:4,f:4},{q:1,f:1},{q:2,f:2},{q:4,f:3},{q:1,f:1},{q:4,f:4}],
        wins:2, podiums:6
      },
      { code:"PIA", name:"Oscar Piastri", team:"McLaren",
        perRacePoints:[10,15,15,6,12,10,18,10,15],
        perRaceQualVsFinish:[{q:6,f:6},{q:4,f:4},{q:3,f:3},{q:6,f:8},{q:5,f:5},{q:6,f:6},{q:2,f:2},{q:6,f:6},{q:5,f:5}],
        wins:1, podiums:3
      }
    ]
  }
};

/* =================== Helpers =================== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function setThemeFromStorage(){
  const saved = localStorage.getItem("theme");
  if(saved==="light") document.body.classList.add("light");
}

function sum(a){ return a.reduce((s,v)=>s+(v||0),0); }
function cumulative(arr){ const out=[]; let acc=0; arr.forEach(v=>{ acc+=v||0; out.push(acc); }); return out; }
function groupBy(arr, key){ return arr.reduce((m,i)=>((m[i[key]]=(m[i[key]]||[])).push(i),m),{}); }
function downloadPNG(canvasId, name){
  const c = document.getElementById(canvasId);
  const a = document.createElement("a");
  a.href = c.toDataURL("image/png"); a.download = `${name||canvasId}.png`; a.click();
}
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]??"").replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function downloadCSV(filename, rows){
  if(!rows.length) return;
  const blob = new Blob([toCSV(rows)], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob); const a=document.createElement("a");
  a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}

/* =================== Estado =================== */
const state = {
  season: 2025,
  selectedDrivers: ["VER","NOR","LEC"] // por defecto
};

/* =================== UI: Filtros =================== */
function renderDriverChips(){
  const box = $("#driversBox"); box.innerHTML="";
  const dlist = DATA[state.season].drivers;
  dlist.forEach(d=>{
    const id = `chip-${d.code}`;
    const checked = state.selectedDrivers.includes(d.code) ? "checked" : "";
    const chip = document.createElement("label");
    chip.className="chip";
    chip.innerHTML = `<input type="checkbox" id="${id}" value="${d.code}" ${checked}/> ${d.name} <small>(${d.code})</small>`;
    box.appendChild(chip);
  });
}
function bindDriverChips(){
  $("#driversBox").addEventListener("change",(e)=>{
    if(e.target.type==="checkbox"){
      const val = e.target.value;
      const idx = state.selectedDrivers.indexOf(val);
      if(e.target.checked){
        if(state.selectedDrivers.length>=3){
          e.target.checked = false;
          alert("Puedes seleccionar hasta 3 pilotos.");
          return;
        }
        if(idx===-1) state.selectedDrivers.push(val);
      }else{
        if(idx>-1) state.selectedDrivers.splice(idx,1);
      }
      renderAll();
      renderScatterSelectors(); // actualizar selector de scatter si cambia
    }
  });
}

/* =================== KPIs =================== */
function renderKPIs(){
  const season = state.season;
  const races = DATA[season].races.length;

  // KPIs calculados sobre los pilotos seleccionados (sumados)
  const drivers = DATA[season].drivers.filter(d=> state.selectedDrivers.includes(d.code));
  const totalPoints = sum(drivers.map(d=> sum(d.perRacePoints)));
  const totalWins = sum(drivers.map(d=> d.wins));
  const totalPods = sum(drivers.map(d=> d.podiums));
  const totalEntries = sum(drivers.map(d=> d.perRacePoints.length));

  $("#kRaces").textContent = races;
  $("#kPoints").textContent = totalPoints.toString();
  $("#kAvg").textContent = totalEntries ? (totalPoints/totalEntries).toFixed(1) : "0.0";
  $("#kWins").textContent = totalWins.toString();
  $("#kPodiums").textContent = totalPods.toString();
}

/* =================== Gráficas =================== */
let lineCumChart, barTeamsChart, scatterQRChart, donutPodiumsChart;

function buildLineCumData(){
  const season = state.season;
  const labels = DATA[season].races;
  const datasets = DATA[season].drivers
    .filter(d=> state.selectedDrivers.includes(d.code))
    .map(d=> ({
      label: d.name,
      data: cumulative(d.perRacePoints),
      tension:.3, borderWidth:2, pointRadius:3
    }));
  return { labels, datasets };
}
function renderLineCum(){
  const { labels, datasets } = buildLineCumData();
  if(lineCumChart) lineCumChart.destroy();
  lineCumChart = new Chart(document.getElementById("lineCum"), {
    type:"line",
    data:{ labels, datasets },
    options:{
      responsive:true,
      interaction:{mode:"index",intersect:false},
      scales:{ y:{ beginAtZero:true, title:{display:true, text:"Puntos acumulados"} } }
    }
  });
}

function buildTeamsTotals(){
  const season = state.season;
  const teams = groupBy(DATA[season].drivers, "team");
  const labels = Object.keys(teams);
  const totals = labels.map(team => sum(teams[team].map(d=> sum(d.perRacePoints))));
  // ordenar desc
  const paired = labels.map((l,i)=>({l, v:totals[i]})).sort((a,b)=> b.v - a.v);
  return { labels: paired.map(p=>p.l), values: paired.map(p=>p.v) };
}
function renderBarTeams(){
  const { labels, values } = buildTeamsTotals();
  if(barTeamsChart) barTeamsChart.destroy();
  barTeamsChart = new Chart(document.getElementById("barTeams"), {
    type:"bar",
    data:{ labels, datasets:[{ label:"Puntos totales", data: values }] },
    options:{
      responsive:true,
      scales:{ y:{ beginAtZero:true, title:{display:true, text:"Puntos"} } },
      plugins:{ legend:{display:false} }
    }
  });
}

function renderScatterSelectors(){
  const sel = $("#scatterDriver");
  const list = DATA[state.season].drivers;
  sel.innerHTML = list.map(d=> `<option value="${d.code}">${d.name}</option>`).join("");
  // por defecto: primero de seleccionados, si existe
  const preferred = state.selectedDrivers[0] || list[0].code;
  sel.value = preferred;
}
function renderScatter(){
  const code = $("#scatterDriver").value;
  const d = DATA[state.season].drivers.find(x=>x.code===code);
  const pts = d?.perRaceQualVsFinish || [];
  const labels = DATA[state.season].races;

  if(scatterQRChart) scatterQRChart.destroy();
  scatterQRChart = new Chart(document.getElementById("scatterQR"), {
    type:"scatter",
    data:{
      datasets:[{
        label:`${d.name}: Q vs F`,
        data: pts.map((p,i)=>({ x:p.q, y:p.f, r:6, label:labels[i] }))
      }]
    },
    options:{
      responsive:true,
      scales:{
        x:{ reverse:false, title:{display:true, text:"Posición de clasificación (Q)"} , ticks:{ stepSize:1, precision:0 } },
        y:{ reverse:false, title:{display:true, text:"Resultado final (F)"} , ticks:{ stepSize:1, precision:0 } }
      },
      plugins:{
        tooltip:{ callbacks:{
          label: ctx => {
            const l = ctx.raw.label || "";
            return `${l}: Q${ctx.raw.x} → F${ctx.raw.y}`;
          }
        }}
      }
    }
  });
}

function buildPodiumShare(){
  const season = state.season;
  const teams = groupBy(DATA[season].drivers, "team");
  const labels = Object.keys(teams);
  const values = labels.map(t => sum(teams[t].map(d => d.podiums)));
  return { labels, values };
}
function renderDonutPodiums(){
  const { labels, values } = buildPodiumShare();
  if(donutPodiumsChart) donutPodiumsChart.destroy();
  donutPodiumsChart = new Chart(document.getElementById("donutPodiums"), {
    type:"doughnut",
    data:{ labels, datasets:[{ label:"Podios", data: values }] },
    options:{
      responsive:true,
      plugins:{
        legend:{ position:"right" }
      }
    }
  });
}

/* =================== Tabla de ranking =================== */
function buildDriverRanking(){
  const season = state.season;
  const rows = DATA[season].drivers.map(d => ({
    code:d.code, name:d.name, team:d.team,
    points: sum(d.perRacePoints),
    wins: d.wins,
    podiums: d.podiums
  })).sort((a,b)=> b.points - a.points);
  return rows;
}
function renderTable(){
  const tb = $("#tblDrivers tbody"); tb.innerHTML="";
  const rows = buildDriverRanking();
  rows.forEach((r,i)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td>${r.name}</td><td>${r.team}</td><td><b>${r.points}</b></td><td>${r.wins}</td><td>${r.podiums}</td>`;
    tb.appendChild(tr);
  });
}

/* =================== Eventos =================== */
function bindEvents(){
  // Tema
  $("#themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light":"dark");
  });

  // Temporada
  $("#season").addEventListener("change",(e)=>{
    state.season = Number(e.target.value);
    // Reset selección a tres pilotos por defecto de esa temporada (los tres primeros por puntos)
    const top3 = buildDriverRanking().slice(0,3).map(r=> r.code);
    state.selectedDrivers = top3;
    renderDriverChips();
    renderAll();
    renderScatterSelectors();
    renderScatter();
  });

  // Reset
  $("#resetBtn").addEventListener("click", ()=>{
    $("#season").value = "2025";
    state.season = 2025;
    state.selectedDrivers = buildDriverRanking().slice(0,3).map(r=> r.code);
    renderDriverChips();
    renderAll();
    renderScatterSelectors();
    renderScatter();
  });

  // Scatter selector
  $("#scatterDriver").addEventListener("change", renderScatter);

  // Descargar PNG
  document.body.addEventListener("click",(e)=>{
    const btn = e.target.closest("[data-dl]");
    if(btn){
      const id = btn.getAttribute("data-dl");
      downloadPNG(id, id);
    }
  });

  // Export CSV ranking
  $("#exportCSV").addEventListener("click", ()=>{
    const rows = buildDriverRanking();
    downloadCSV(`ranking_${state.season}.csv`, rows);
  });
}

/* =================== Render principal =================== */
function renderAll(){
  renderKPIs();
  renderLineCum();
  renderBarTeams();
  renderDonutPodiums();
  renderTable();
}

/* =================== Init =================== */
document.addEventListener("DOMContentLoaded", ()=>{
  setThemeFromStorage();

  // Inicializar chips y scatter selector
  state.selectedDrivers = buildDriverRanking().slice(0,3).map(r=> r.code);
  $("#season").value = String(state.season);
  renderDriverChips();
  bindDriverChips();
  renderScatterSelectors();

  // Render
  renderAll();
  renderScatter();
  bindEvents();
});
