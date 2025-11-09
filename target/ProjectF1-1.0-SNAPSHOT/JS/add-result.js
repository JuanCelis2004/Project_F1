/* ====== Claves de almacenamiento ====== */
const STORE = {
  FREEZE: "f1_rf07_freeze"
};

let dataDrivers = [];
let dataTeam = [];

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");

  bind();
  getDrivers();
  getTeams();
  getCircuits();
  setFrozzenDate();
});

/* ====== Consultar info de los pilotos para crea selectores ====== */
async function getDrivers() {
  const url = "http://localhost:8080/ProjectF1/PilotosController";
  const resp = await fetch(url);

  dataDrivers = await resp.json();

  let formatData = dataDrivers.map((driver) => ({
    ...driver,
    id: driver.idPiloto
  }));

  formatData = formatData.filter((item) => item.temporada.anio === 2025);

  createOptions("driver", formatData);
}

/* ====== Consultar info de las escuderías para crea selectores ====== */
async function getTeams() {
  const url = "http://localhost:8080/ProjectF1/EscuderiasController";
  const resp = await fetch(url);

  dataTeam = await resp.json();

  let formatData = dataTeam.map((team) => ({
    ...team,
    id: team.idEscuderia
  }));

  formatData = formatData.filter((item) => item.temporada.anio === 2025);

  createOptions("team", formatData);
}

/* ====== Consultar info de los circuitos para crear selectores ====== */
async function getCircuits() {
  const url = "http://localhost:8080/ProjectF1/CircuitoController";
  const resp = await fetch(url);

  const dataCircuits = await resp.json();

  let formatData = dataCircuits.map((team) => ({
    ...team,
    id: team.idCircuito
  }));

  createOptions("raceCircuit", formatData);
}

/* ====== Consultar fecha de congelación ====== */
async function setFrozzenDate() {
  const url = "http://localhost:8080/ProjectF1/FechaCongelacionController";
  const resp = await fetch(url);

  const frozzenDate = await resp.json();

  // Establecer fecha de congelación
  save(STORE.FREEZE, frozzenDate[0].fecha);
  updateGate();

  const formatDate = new Date(frozzenDate[0].fecha);
  const day = String(formatDate.getDate() + 1).padStart(2, "0");
  const month = String(formatDate.getMonth() + 1).padStart(2, "0");
  const year = formatDate.getFullYear();

  const frozenDateText = document.getElementById('frozenDate');
  frozenDateText.textContent = `${day}/${month}/${year}`;
}

async function createOptions(selectId, data) {
  const select = document.getElementById(selectId);

  const defaultOpt = document.createElement('option');
  defaultOpt.value = "";
  defaultOpt.text = "-- Seleccione --";
  select.appendChild(defaultOpt);

  data.forEach((item) => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.text = item.nombre

    // Añadir opción al selector
    select.appendChild(opt);
  });
}

/* ====== Helpers ====== */
const $ = (s) => document.querySelector(s);

function toast(msg, type = "success") {
  const t = $("#toast");
  t.textContent = msg;
  t.className = `toast ${type}`;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 2200);
}

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

/* ====== Estado ====== */
let FREEZE_DATE = load(STORE.FREEZE, null);

/* ====== Util ====== */
function canSaveResult(raceISO) {
  if (!FREEZE_DATE) return false;
  return new Date(raceISO) > new Date(FREEZE_DATE);
}

function updateGate() {
  const date = $("#raceDate").value;
  const allow = date && canSaveResult(date);

  $("#gateState").textContent = allow
    ? "Sí, permitido (posterior)"
    : FREEZE_DATE
    ? "No permitido"
    : "Define fecha de congelación";

  $("#gateState").style.color = allow ? "#2fe0a0" : "#ff6b6b";
  $("#saveBtn").disabled = !allow;
}

// Función para manejar y validar la temporada
function handleSeasonInput() {
  const season = $("#seasonInput").value;

  if (season < 2025 || season > 2025 || isNaN(season)) {
    $("#seasonInput").value = 2025;
  }
}

// Función para manejar y validar el circuito seleccionado
function handleCircuitInput() {
  const circuit = parseInt($("#raceCircuit").value);

  if (isNaN(circuit)) {
    toast("Debes seleccionar un circuito", "warning");
  }
}

// Función para manejar y validar la posición
function handlePositionInput() {
  const position = $("#position").value;

  if (position < 1 || position > 20 || isNaN(position)) {
    $("#position").value = 1;
  }
}

// Función para manejar y validar la parrilla de salida
function handleGridPositionInput() {
  const gridPosition = $("#gridPosition").value;

  if (gridPosition < 1 || gridPosition > 20 || isNaN(gridPosition)) {
    $("#gridPosition").value = 1;
  }
}

// Función para manejar y validar el piloto seleccionado
function handleDriverInput() {
  const driver = parseInt($("#driver").value);

  if (isNaN(driver)) {
    $("#team").value = '';
    toast("Debes seleccionar un piloto", "warning");
    return;
  }

  const teamToTeamSelect = dataDrivers.find((item) => item.idPiloto === driver);

  console.log(teamToTeamSelect);

  $("#team").value = teamToTeamSelect.escuderia.idEscuderia;
}

// Función para manejar y validar la escudería seleccionado
function handleTeamInput() {
  const team = parseInt($("#team").value);

  if (isNaN(team)) {
    toast("Debes seleccionar un escudería", "warning");
  }
}

// Función para manejar y validar la posición
function handlePointsInput() {
  const points = $("#points").value;

  if (points < 0 || points > 34 || isNaN(points)) {
    $("#points").value = 0;
  }
}

// Función para manejar y validar la posición
function handleLapsInput() {
  const laps = $("#laps").value;

  if (laps < 1 || laps > 78 || isNaN(laps)) {
    $("#laps").value = 1;
  }
}

// Función para manejar y validar el tiempo de carrera
function handleRaceTimeInput() {
  const raceTime = $("#raceTime").value;
  const raceTimeRefex = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;

  if (!raceTimeRefex.test(raceTime)) {
    toast("El valor ingresado no cumple con el formato", "warning");
  } else {
    toast("El valor ingresado es correcto", "success");
  }
}

// Función para manejar y validar el mejor tiempo
function handleBestLapInput() {
  const bestLap = $("#bestLap").value;
  const bestLapRegex = /^\d{2}:\d{2}\.\d{3}$/;

  if (!bestLapRegex.test(bestLap)) {
    toast("El valor ingresado no cumple con el formato", "warning");
  } else {
    toast("El valor ingresado es correcto", "success");
  }
}

// Función para validar el formulario
function validForm() {
  if ($("#raceCircuit").value === '') {
    handleCircuitInput();
    return false;
  }

  if ($("#position").value === '') {
    toast('Debes ingresar una posición', "warning");
    return false;
  }

  if ($("#gridPosition").value === '') {
    toast('Debes ingresar una posición de parrilla', "warning");
    return false;
  }
  
  if ($("#driver").value === '') {
    handleDriverInput();
    return false;
  }

  if ($("#points").value === '') {
    toast('Debes ingresar el puntaje', "warning");
    return false;
  }

  if ($("#laps").value === '') {
    toast('Debes ingresar el número de vueltas', "warning");
    return false;
  }

  if ($("#raceTime").value === '') {
    toast('Debes ingresar el tiempo de carrera', "warning");
    return false;
  }

  if ($("#bestLap").value === '') {
    toast('Debes ingresar el mejor tiempo obtenido', "warning");
    return false;
  }

  return true;
}

/* ====== Eventos ====== */
function bind() {
  $("#seasonInput").addEventListener("change", handleSeasonInput);
  $("#raceCircuit").addEventListener("change", handleCircuitInput);
  $("#raceDate").addEventListener("change", updateGate);
  $("#position").addEventListener("change", handlePositionInput);
  $("#gridPosition").addEventListener("change", handleGridPositionInput);
  $("#driver").addEventListener("change", handleDriverInput);
  $("#team").addEventListener("change", handleTeamInput);
  $("#points").addEventListener("change", handlePointsInput);
  $("#laps").addEventListener("change", handleLapsInput);
  $("#raceTime").addEventListener("change", handleRaceTimeInput);
  $("#bestLap").addEventListener("change", handleBestLapInput);

  $("#saveBtn").addEventListener("click", () => {
    if (!validForm()) return;

    const season = document.getElementById("seasonInput");
    const raceCircuit = document.getElementById("raceCircuit");
    const raceDate = document.getElementById("raceDate");
    const position = document.getElementById("position");
    const gridPosition = document.getElementById("gridPosition");
    const driver = document.getElementById("driver");
    const team = document.getElementById("team");
    const points = document.getElementById("points");
    const laps = document.getElementById("laps");
    const raceTime = document.getElementById("raceTime");
    const bestLap = document.getElementById("bestLap");

    console.log({
      season: season.value,
      race: raceCircuit.value,
      raceDate: raceDate.value,
      position: position.value,
      gridPosition: gridPosition.value,
      driver: parseInt(driver.value),
      team: parseInt(team.value),
      points: points.value,
      laps: laps.value,
      raceTime: raceTime.value,
      bestLap: bestLap.value
    });

    if (!canSaveResult(raceDate.value)) {
      toast("La fecha de la carrera no puede ser anterior a la fecha de congelación", "error");

      return;
    }

    // Guardar info
    //

    // Limpiar formulario
    season.value = "2025";
    raceCircuit.value = "";
    raceDate.value = "";
    position.value = "";
    gridPosition.value = "";
    driver.value = "";
    team.value = "";
    points.value = "";
    laps.value = "";
    raceTime.value = "";
    bestLap.value = "";
    updateGate();
  });
}
