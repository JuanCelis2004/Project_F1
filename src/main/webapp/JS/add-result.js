/* ====== Claves de almacenamiento ====== */
const STORE = {
  FREEZE: "f1_rf07_freeze",
  RESULTS: "f1_rf07_results", // guardo aquí aunque no mostremos tabla
};

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");

  updateCompliance();
  updateGate();
  bind();
  getDrivers();
  getTeams();
  getCircuits();
});

/* ====== Consultar info de los pilotos para crea selectores ====== */
async function getDrivers() {
  const url = "http://localhost:8080/ProjectF1/PilotosController";
  const resp = await fetch(url);

  const dataDrivers = await resp.json();

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

  const dataTeam = await resp.json();

  let formatData = dataTeam.map((team) => ({
    ...team,
    id: team.idEscuderia
  }));

  formatData = formatData.filter((item) => item.temporada.anio === 2024);

  createOptions("team", formatData);
}

/* ====== Consultar info de los circuitos para crear selectores ====== */
async function getCircuits() {
  const url = "http://localhost:8080/ProjectF1/CarreraController";
  const resp = await fetch(url);
  const dataCarreras = await resp.json();

  const carreras2025 = dataCarreras.filter(c => c.temporada?.anio === 2025);

  const formatData = carreras2025.map(c => ({
    id: c.idCarrera,
    nombre: c.circuito.nombre
  }));

  createOptions("raceCircuit", formatData);
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

function updateCompliance() {
  const lbl = $("#compliance");

  if (!FREEZE_DATE) {
    lbl.textContent = "Define una fecha";
    lbl.style.color = "#f7c04a";
    return;
  }

  lbl.textContent = "Regla activa";
  lbl.style.color = "#2fe0a0";
}

/* ====== Eventos ====== */
function bind() {
  // Freeze date
  const fz = $("#freezeDate");

  if (FREEZE_DATE) {
    fz.value = FREEZE_DATE
  };

  fz.addEventListener("change", () => {
    FREEZE_DATE = fz.value || null;
    save(STORE.FREEZE, FREEZE_DATE);
    updateCompliance();
    updateGate();
    toast("Fecha de congelación actualizada");
  });

  // Formulario
  $("#raceDate").addEventListener("change", updateGate);

  $("#saveBtn").addEventListener("click", async () => {
    console.log('Entro en crear registro');

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

    const body = {
      carrera: { idCarrera: parseInt(raceCircuit.value) },
      piloto: { idPiloto: parseInt(driver.value) },
      posicion: parseInt(position.value),
      posicionParrillaSalida: parseInt(gridPosition.value),
      vueltas: parseInt(laps.value),
      tiempoCarrera: raceTime.value,
      puntos: parseFloat(points.value),
      mejorTiempo: bestLap.value
    };

    console.log("Datos a enviar:", body);

    if (!canSaveResult(raceDate.value)) {
      toast(
        "La fecha de la carrera no puede ser anterior a la fecha de congelación",
        "error"
      );

      return;
    }
    

    // Guardar info
    try {
      const resp = await fetch("http://localhost:8080/ProjectF1/HistorialCarrerasController", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (resp.ok) {
        toast("Historial guardado correctamente ✅");
      } else {
        toast("Error al guardar el historial ❌", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Error de conexión con el servidor", "error");
    }
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
  });

  // Imprimir
  $("#printBtn").addEventListener("click", () => window.print());
}
