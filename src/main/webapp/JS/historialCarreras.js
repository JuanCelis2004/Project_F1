/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  // Tema guardado
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");

  initFilters();
  renderTable();
  renderCharts();
  bindEvents();
});

/* ====== Estado de los campos de filtrado ====== */
const state = {
  season: "2024",
  race: "all",
  driver: "all",
  team: "all",
  sort: "pos_asc",
};

/* ====== Consultar info del historia de carreras ====== */
async function getHistorialCarreras() {
  const url = "http://localhost:8080/ProjectF1/HistorialCarrerasController";
  const resp = await fetch(url);

  const dataHistorialCarreras = await resp.json();

  return dataHistorialCarreras;
}

/* ========= Helpers ========= */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const fmtDate = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const unique = (arr) => [...new Set(arr)];

function toCSV(rows) {
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      header.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")
    )
  );

  return lines.join("\n");
}

async function downloadCSV(name, rows) {
  const csv = "\uFEFF" + toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function formatRowsForCSV(rows) {
  return rows.map((r) => ({
    Carrera: r.carrera.circuito.nombre,
    Temporada: r.carrera.temporada.anio,
    Piloto: r.piloto.nombre,
    Escudería: r.piloto.escuderia.nombre,
    Posición: r.posicion,
    Puntos: r.puntos,
  }));
}

/* ========= Cargar filtros ========= */
async function initFilters() {
  const dataHistorialCarreras = await getHistorialCarreras();

  const races = unique(dataHistorialCarreras.map((r) => r.carrera.circuito.nombre))
    .filter((n) => n !== "—")
    .sort();

  const drivers = unique(dataHistorialCarreras.map((r) => r.piloto.nombre))
    .filter((n) => n !== "—")
    .sort();

  const teams = unique(dataHistorialCarreras.map((r) => r.piloto.escuderia.nombre))
    .filter((n) => n !== "—")
    .sort();

  const dSel = $("#fDriver"),
    tSel = $("#fTeam"),
    rSel = $("#fRace");

  drivers.forEach((n) => {
    const o = document.createElement("option");
    o.value = n;
    o.textContent = n;
    dSel.appendChild(o);
  });

  teams.forEach((n) => {
    const o = document.createElement("option");
    o.value = n;
    o.textContent = n;
    tSel.appendChild(o);
  });

  races.forEach((n) => {
    const o = document.createElement("option");
    o.value = n;
    o.textContent = n;
    rSel.appendChild(o);
  });
}

/* ========= Query & tabla ========= */
async function getFilteredRows() {
  const dataHistorialCarreras = await getHistorialCarreras();
  let rows = dataHistorialCarreras.slice().filter((r) => r.posicion !== null);

  if (state.season !== "all") {
    rows = rows.filter((r) => String(r.carrera.temporada.anio) === state.season);
  }

  if (state.race !== "all") {
    rows = rows.filter((r) => r.carrera.circuito.nombre === state.race);
  }

  if (state.driver !== "all") {
    rows = rows.filter((r) => r.piloto.nombre === state.driver);
  }

  if (state.team !== "all") {
    rows = rows.filter((r) => r.piloto.escuderia.nombre === state.team);
  }

  switch (state.sort) {
    case "pos_asc":
      rows.sort((a, b) => (a.posicion ?? 99) - (b.posicion ?? 99));
      break;
    case "points_desc":
      rows.sort((a, b) => b.puntos - a.puntos);
      break;
    case "name_asc":
      rows.sort((a, b) => a.piloto.nombre.localeCompare(b.piloto.nombre));
      break;
    case "team_asc":
      rows.sort((a, b) => a.piloto.escuderia.nombre.localeCompare(b.piloto.escuderia.nombre));
      break;
    case "bestTime_asc":
      rows.sort((a, b) => a.mejorTiempo.localeCompare(b.mejorTiempo));
      break;
  }

  return rows;
}

async function renderTable() {
  const rows = await getFilteredRows();
  $("#rCount").textContent = `${rows.length}`;
  $("#kCount").textContent = rows.length.toString();

  const pts = rows.reduce((s, r) => s + (r.puntos || 0), 0);
  $("#kPts").textContent = pts.toString();
  $("#kAvg").textContent = rows.length ? (pts / rows.length).toFixed(1) : "0.0";
  $("#kWins").textContent = rows.filter((r) => r.posicion === 1).length;

  const tb = $("#tblResults tbody");
  tb.innerHTML = "";

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.carrera.temporada.anio}</td>
      <td>${r.carrera.circuito.nombre}</td>
      <td>${r.posicion ?? "—"}</td>
      <td>${r.posicionParrillaSalida}</td>
      <td>${r.piloto.nombre}</td>
      <td>${r.piloto.escuderia.nombre}</td>
      <td>${r.puntos}</td>
      <td>${r.vueltas}</td>
      <td>${r.tiempoCarrera}</td>
      <td>${r.mejorTiempo}</td>
    `;
    tb.appendChild(tr);
  });
}

/* ========= Preparar series para gráficos ========= */
function getVizTargetKey() {
  if (state.driver !== "all") return `driver:${state.driver}`;
  if (state.team !== "all") return `team:${state.team}`;

  return null;
}

function buildSeriesForTarget() {
  const key = getVizTargetKey();
  if (!key) return { labels: [], hist: [], pred: [], p10: [], p90: [] };

  // Históricos del target (por carrera 2025)
  const histRows = RESULTS.filter((r) => r.season === 2025)
    .filter((r) => (state.driver !== "all" ? r.driver === state.driver : true))
    .filter((r) => (state.team !== "all" ? r.team === state.team : true))
    .filter((r) => r.pos !== null);

  const races2025 = RACES.filter((r) => r.id.endsWith("2025")).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Mapa raceId -> puntos históricos (sumar si es team y hay 2 pilotos)
  const histMap = {};
  races2025.forEach((rc) => (histMap[rc.id] = 0));
  histRows.forEach((r) => {
    histMap[r.race] = (histMap[r.race] || 0) + (r.points || 0);
  });

  // Predicciones
  const predData = (PREDICTIONS[key] || {}).series || [];

  const labels = races2025.map(
    (r) => `${r.name} ${new Date(r.date).toLocaleDateString(undefined, { month: "short", })}`
  );

  const hist = races2025.map((r) => histMap[r.id] ?? null);

  // Para pred: usar null en pasadas y valor en futuras/definidas
  const pred = races2025.map((r) => {
    const p = predData.find((x) => x.raceId === r.id);
    return p ? p.points_pred : null;
  });

  const p10 = races2025.map((r) => {
    const p = predData.find((x) => x.raceId === r.id);
    return p ? p.p10 : null;
  });

  const p90 = races2025.map((r) => {
    const p = predData.find((x) => x.raceId === r.id);
    return p ? p.p90 : null;
  });

  return { key, labels, hist, pred, p10, p90 };
}

function buildProbsForNext() {
  const key = getVizTargetKey();

  if (!key || state.race === "all") return { labels: [], values: [] };

  const pred = (PREDICTIONS[key] || {}).probs || {};
  const p = pred[state.race];

  if (!p) return { labels: [], values: [] };

  const entries = Object.entries(p) // [pos, prob]
    .map(([pos, prob]) => ({ pos: Number(pos), prob }))
    .sort((a, b) => a.pos - b.pos);

  return {
    labels: entries.map((e) => `P${e.pos}`),
    values: entries.map((e) => Math.round(e.prob * 100)),
  };
}

/* ========= Charts ========= */
let seriesChart = null;
let probsChart = null;

function renderCharts() {
  const targetKey = getVizTargetKey();

  $("#vizTarget").textContent = targetKey
    ? targetKey.replace("driver:", "Piloto: ").replace("team:", "Equipo: ")
    : "Selecciona piloto o equipo";

  // Series
  const { labels, hist, pred, p10, p90 } = buildSeriesForTarget();

  // Destroy prev
  if (seriesChart) {
    seriesChart.destroy();
    seriesChart = null;
  }

  const ctx1 = document.getElementById("chartSeries").getContext("2d");

  seriesChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Histórico 2025",
          data: hist,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: "Predicción",
          data: pred,
          tension: 0.3,
          borderWidth: 2,
          borderDash: [6, 6],
          pointRadius: 3,
        },
        {
          label: "P90",
          data: p90,
          tension: 0.3,
          borderWidth: 0,
          pointRadius: 0,
          fill: "+1",
        },
        {
          label: "P10",
          data: p10,
          tension: 0.3,
          borderWidth: 0,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { boxWidth: 14 } },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y ?? "—"} pts`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Puntos por GP" },
        },
      },
      elements: {
        line: { spanGaps: true },
      },
    },
  });

  // Probs
  const { labels: pl, values: pv } = buildProbsForNext();

  if (probsChart) {
    probsChart.destroy();
    probsChart = null;
  }

  const ctx2 = document.getElementById("chartProbs").getContext("2d");
  probsChart = new Chart(ctx2, {
    type: "bar",
    data: { labels: pl, datasets: [{ label: "Probabilidad (%)", data: pv }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 100, title: { display: true, text: "%" } },
      },
    },
  });
}

/* ========= Manejador de eventos ========= */
function bindEvents() {
  $("#season").addEventListener("change", (e) => {
    state.season = e.target.value;
    renderTable();
    renderCharts();
  });

  $("#fRace").addEventListener("change", (e) => {
    state.race = e.target.value;
    renderTable();
    renderCharts();
  });

  $("#fDriver").addEventListener("change", (e) => {
    state.driver = e.target.value;
    renderTable();
    renderCharts();
  });

  $("#fTeam").addEventListener("change", (e) => {
    state.team = e.target.value;
    renderTable();
    renderCharts();
  });

  $("#fSort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderTable();
  });

  $("#btnReset").addEventListener("click", () => {
    state.season = "2024";
    state.race = "all";
    state.driver = "all";
    state.team = "all";
    state.sort = "pos_asc";
    $("#fRace").value = "all";
    $("#fDriver").value = "all";
    $("#season").value = "all";
    $("#fTeam").value = "all";
    $("#fSort").value = "pos_asc";
    renderTable();
    renderCharts();
  });

  $("#btnCSV").addEventListener("click", async () => {
    const filteredRows = await getFilteredRows();
    const csvRows = formatRowsForCSV(filteredRows);
    if (csvRows.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    downloadCSV("Historial de carreras.csv", csvRows);
  });
}
