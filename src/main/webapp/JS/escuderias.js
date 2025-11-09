/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  renderList();
  bindEvents();
});

/* ====== Estado de los campos de filtrado ====== */
const state = {
  q: "",
  season: "2024",
  country: "all",
  powerUnit: "all",
};

/* ====== Consultar info de las escuderías ====== */
async function getConstructors() {
  const url = "http://localhost:8080/ProjectF1/EscuderiasController";
  const resp = await fetch(url);

  const dataConstructors = await resp.json();

  return dataConstructors;
}

/* ====== Helpers ====== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function unique(a) {
  return [...new Set(a)];
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

async function byId(id) {
  const dataConstructors = await getConstructors();

  return dataConstructors.find((t) => t.idEscuderia === parseInt(id));
}

/* ====== Filtros ====== */
async function initFilters() {
  const dataConstructors = await getConstructors();

  const pus = unique(dataConstructors.map((t) => t.unidad_potencia)).sort();

  const puSel = $("#powerUnit");

  pus.forEach((p) => {
    const o = document.createElement("option");
    o.value = p;
    o.textContent = p;
    puSel.appendChild(o);
  });
}

/* ====== Filtrar la información a mostrar ====== */
async function getFiltered() {
  const { q, season, powerUnit, sortBy } = state;

  const dataConstructors = await getConstructors();
  let rows = dataConstructors.slice();

  if (season !== "all")
    rows = rows.filter((t) => String(t.temporada.anio) === season);

  if (powerUnit !== "all")
    rows = rows.filter((t) => t.unidad_potencia === powerUnit);

  if (q.trim()) {
    const qq = q.trim().toLowerCase();

    rows = rows.filter(
      (t) =>
        t.nombre.toLowerCase().includes(qq) ||
        t.unidad_potencia.toLowerCase().includes(qq)
    );
  }

  return rows;
}

/* ====== Renderizar la tabla ====== */
async function renderList() {
  const rows = await getFiltered();

  $("#count").textContent = `${rows.length} equipos`;

  const grid = $("#teamsGrid");
  grid.innerHTML = "";

  rows.forEach((t) => {
    const el = document.createElement("article");

    el.className = "card";
    el.innerHTML = `
      <div class="name">${t.nombre} <br><span class="tag">${t.chasis}</span></div>
      <div class="meta"></div>

      <div class="actions-row">
        <button class="row-btn" data-open="${t.idEscuderia}">Ver detalle</button>
      </div>
    `;

    grid.appendChild(el);
  });
}

/* ====== Mostrar el detalle ====== */
async function openDetail(id) {
  const t = await byId(id);

  if (!t) return;

  $("#tName").textContent = t.nombre;
  $("#tSubtitle").textContent = `${t.temporada.anio}`;
  $("#tTechnicalBoss").textContent = t.jefe_tecnico;
  $("#tTeamBoss").textContent = t.jefe_equipo;
  $("#tBase").textContent = t.base;
  $("#tUnitPower").textContent = t.unidad_potencia;

  history.replaceState(null, "", `#team=${encodeURIComponent(t.idEscuderia)}`);
  $("#detailPanel").classList.add("open");
}

function closeDetail() {
  $("#detailPanel").classList.remove("open");

  if (location.hash.includes("team=")) {
    history.replaceState(null, "", location.pathname);
  }
}

async function exportCSV() {
  const rows = await getFiltered();

  const dataToPrint = rows.map((item) => ({
    Nombre: item.nombre,
    Chasis: item.chasis,
    'Jefe técnico': item.jefe_tecnico,
    'Jefe de equipo': item.jefe_equipo,
    'Unidad de potencia': item.unidad_potencia,
    Base: item.base,
    Temporada: item.temporada.anio
  }));

  const csv = toCSV(dataToPrint);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "escuderias.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ========= Manejador de eventos ========= */
function bindEvents() {
  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    renderList();
  });

  $("#season").addEventListener("change", (e) => {
    state.season = e.target.value;
    renderList();
  });

  $("#powerUnit").addEventListener("change", (e) => {
    state.powerUnit = e.target.value;
    renderList();
  });

  $("#resetBtn").addEventListener("click", () => {
    state.q = "";
    state.season = "2024";
    state.powerUnit = "all";
    state.sortBy = "points_desc";
    $("#q").value = "";
    $("#season").value = "all";
    $("#powerUnit").value = "all";
    renderList();
  });

  $("#exportBtn").addEventListener("click", exportCSV);

  $("#teamsGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) openDetail(btn.dataset.open);
  });

  $("#closeDetail").addEventListener("click", closeDetail);

  if (location.hash.includes("team=")) {
    const id = decodeURIComponent(location.hash.split("team=")[1] || "");
    if (id) openDetail(id);
  }
}
