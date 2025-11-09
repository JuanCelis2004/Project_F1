/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  renderStandingsTop3();
});

/* ====== Utilidades ====== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/* ====== Consultar info de los pilotos para crea selectores ====== */
async function getDrivers() {
  const url = "http://localhost:8080/ProjectF1/PilotosController";
  const resp = await fetch(url);

  const dataDrivers = await resp.json();

  let drivers2025 = dataDrivers.filter((item) => item.temporada.anio === 2025);

  return drivers2025;
}

/* ====== Consultar info de la posición de los constructores ====== */
async function getPosicionConstructors() {
  const url = "http://localhost:8080/ProjectF1/PositionConstructorController";
  const resp = await fetch(url);

  const dataPositions = await resp.json();

  let positions2025 = dataPositions.filter(
    (item) => item.temporada.anio === 2025
  );

  return positions2025;
}

async function renderStandingsTop3() {
  const drivers = await getDrivers();
  const positionsConstructors = await getPosicionConstructors();

  // Top 3 pilotos
  const driverStandings = drivers
    .map((d) => ({
      name: d.nombre,
      team: d.escuderia.nombre,
      points: d.puntos,
    }))
    .sort((a, b) => b.points - a.points);

  // Top 3 constructores
  const constructorStandings = positionsConstructors
    .map((c) => ({
      name: c.constructor.nombre,
      points: c.puntos,
    }))
    .sort((a, b) => b.points - a.points);

  const maxDriver = driverStandings[0]?.points || 1;
  const maxConstr = constructorStandings[0]?.points || 1;

  // Mostrar pilotos
  const dWrap = $("#topDrivers");
  dWrap.innerHTML = "";

  driverStandings.slice(0, 3).forEach((d, i) => {
    const row = document.createElement("div");

    row.className = "st-row";
    row.innerHTML = `
      <div class="badge">${i + 1}</div>
      <div class="name">${d.name}</div>
      <div class="points">${d.points}</div>
      <div class="progress"><i style="width:${(d.points / maxDriver) * 100}%"></i></div>
    `;

    dWrap.appendChild(row);
  });

  // Mostrar constructores
  const cWrap = $("#topConstructors");
  cWrap.innerHTML = "";

  constructorStandings.slice(0, 3).forEach((c, i) => {
    const row = document.createElement("div");

    row.className = "st-row";
    row.innerHTML = `
      <div class="badge">${i + 1}</div>
      <div class="name">${c.name}</div>
      <div class="points">${c.points}</div>
      <div class="progress"><i style="width:${(c.points / maxConstr) * 100}%"></i></div>
    `;

    cWrap.appendChild(row);
  });
}
