/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", async () => {
  loadTheme();
  initFilters();
  renderList();
  bindEvents();
});

// Consultar info de los pilotos
async function getDrivers() {
  const url = "http://localhost:8080/ProjectF1/PilotosController";
  const resp = await fetch(url);

  const dataDrivers = await resp.json();

  return dataDrivers;
}

/* ====== Helpers ====== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

async function byIdSeason(code, season) {
  const dataDrivers = await getDrivers();

  return dataDrivers.find((d) => d.codigo === code && d.temporada.anio === season);
}

function unique(arr) {
  return [...new Set(arr)];
}

function formatDate(d) {
  const date = d;
  const newDate = date.split('-')

  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

function toCSV(rows) {
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      header.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(",")
    )
  );

  return lines.join("\n");
}

/* ====== Estado de UI ====== */
const state = {
  q: "",
  season: "2024",
  team: "all",
  nationality: "all",
  minWins: 0,
  sortBy: "points_desc",
};

/* ====== Inicialización de selects ====== */
async function initFilters() {
  const dataDrivers = await getDrivers();

  // Equipos y nacionalidades en base a todas las temporadas (para UX)
  const teams = unique(dataDrivers.map((d) => d.escuderia.nombre)).sort();
  const teamSel = $("#team");

  teams.forEach((t) => {
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t;
    teamSel.appendChild(o);
  });

  // Rango dinámico de victorias
  const maxWins = Math.max(...dataDrivers.map((d) => d.campeonatosGanados));
  $("#minWins").max = String(Math.max(5, maxWins));
}

/* ====== Filtrado y orden ====== */
async function getFiltered() {
  const { q, season, team, minWins, sortBy } = state;

  const dataDrivers = await getDrivers();
  let rows = dataDrivers.slice();

  if (season !== "all") {
    rows = rows.filter((r) => String(r.temporada.anio) === season);
  }

  if (team !== "all") {
    rows = rows.filter((r) => r.escuderia.nombre === team);
  }

  if (minWins > 0) {
    rows = rows.filter((r) => r.campeonatosGanados >= minWins);
  }

  if (q.trim()) {
    const qq = q.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.nombre.toLowerCase().includes(qq) || r.codigo.toLowerCase().includes(qq)
    );
  }

  switch (sortBy) {
    case "points_desc":
      rows.sort((a, b) => b.puntos - a.puntos);
      break;
    case "wins_desc":
      rows.sort((a, b) => b.campeonatosGanados - a.campeonatosGanados);
      break;
    case "name_asc":
      rows.sort((a, b) => a.nombre.localeCompare(b.name));
      break;
  }

  return rows;
}

/* ====== Render lista ====== */
async function renderList() {
  const rows = await getFiltered();

  $("#count").textContent = `${rows.length} ${
    rows.length === 1 ? "piloto" : "pilotos"
  }`;

  const grid = $("#driversGrid");
  grid.innerHTML = "";

  rows.forEach((d) => {
    const el = document.createElement("article");

    el.className = "card";
    el.innerHTML = `
      <div class="name">${d.nombre} <span class="tag">${d.codigo}</span></div>
      <div class="meta">${d.escuderia.nombre} ${d.temporada.anio}</div>
      <div class="kpis">
        <div class="kpi"><small>Puntos</small><b>${d.puntos}</b></div>
        <div class="kpi"><small>Campeonatos ganados</small><b>${d.campeonatosGanados}</b></div>
      </div>

      <div class="actions-row">
        <button class="row-btn" data-open="${d.codigo}:${d.temporada.anio}">Ver detalle</button>
        <button class="row-btn secondary" data-copy="${d.codigo}:${d.temporada.anio}">Copiar ID</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

/* ====== Detalle ====== */
async function openDetail(code, season) {
  const d = await byIdSeason(code, Number(season));

  if (!d) return;

  $("#dName").textContent = `${d.nombre} (${d.codigo})`;
  $('#dbirthPlace').textContent = d.lugarNacimiento;
  $('#dbirthDate').textContent = formatDate(d.fechaNacimiento);
  $("#dSubtitle").textContent = `${d.escuderia.nombre} • ${d.temporada.anio}`;
  $("#dNumDriver").textContent = d.noPiloto;
  $("#dPoints").textContent = d.puntos;
  $("#dWins").textContent = d.campeonatosGanados;
  $("#dPodiums").textContent = d.podios;
  $("#dHighestPosition").textContent = d.posicionMasAlta;

  // Deep-link en hash
  history.replaceState(null, "", `#driver=${d.codigo}&season=${d.temporada.anio}`);
  $("#detailPanel").classList.add("open");
}

function closeDetail() {
  $("#detailPanel").classList.remove("open");

  // limpiar hash si corresponde
  if (location.hash.includes("driver=")) {
    history.replaceState(null, "", location.pathname);
  }
}

/* ====== Export ====== */
async function exportCSV() {
  const rows = await getFiltered();

  const dataToPrint = rows.map((item) => ({
    'Código': item.codigo,
    Nombre: item.nombre,
    'Fecha de nacimiento': item.fechaNacimiento,
    'Lugar de nacimiento': item.lugarNacimiento,
    'Campeonatos ganados': item.campeonatosGanados,
    Podios: item.podios,
    Puntos: item.puntos,
    'Posición más alta': item.posicionMasAlta,
    'Escudería': item.escuderia.nombre,
    Temporada: item.temporada.anio
  }));

  const csv = toCSV(dataToPrint);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pilotos.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ====== Tema ====== */
function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

/* ====== Eventos ====== */
function bindEvents() {
  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    renderList();
  });

  $("#season").addEventListener("change", (e) => {
    state.season = e.target.value;
    renderList();
  });

  $("#team").addEventListener("change", (e) => {
    state.team = e.target.value;
    renderList();
  });

  $("#minWins").addEventListener("input", (e) => {
    state.minWins = Number(e.target.value);
    $("#minWinsOut").textContent = state.minWins;
    renderList();
  });

  $("#sortBy").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderList();
  });

  $("#resetBtn").addEventListener("click", () => {
    state.q = "";
    state.season = "2024";
    state.team = "all";
    state.nationality = "all";
    state.minWins = 0;
    state.sortBy = "points_desc";
    $("#q").value = "";
    $("#season").value = "all";
    $("#team").value = "all";
    $("#minWins").value = 0;
    $("#minWinsOut").textContent = "0";
    $("#sortBy").value = "points_desc";

    renderList();
  });

  $("#exportBtn").addEventListener("click", exportCSV);
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#closeDetail").addEventListener("click", closeDetail);

  // Delegación para botones de cada tarjeta
  $("#driversGrid").addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    const copy = e.target.closest("[data-copy]");

    if (open) {
      const [code, season] = open.dataset.open.split(":");
      openDetail(code, season);
    }

    if (copy) {
      const text = copy.dataset.copy;
      navigator.clipboard.writeText(text);
      copy.textContent = "Copiado ✓";
      setTimeout(() => {
        copy.textContent = "Copiar ID";
      }, 1200);
    }
  });

  // Abrir por hash (deep-link)
  if (location.hash.includes("driver=")) {
    const params = new URLSearchParams(location.hash.replace("#", ""));
    const code = params.get("driver");
    const season = Number(params.get("season")) || 2025;
    openDetail(code, season);
  }
}
