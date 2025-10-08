/* ====== Datos de ejemplo (puedes reemplazar por fetch a una API en el futuro) ====== */
const races = [
  {
    round: 16,
    name: "Gran Premio de Singapur",
    country: "Singapur",
    flag: "🇸🇬",
    circuit: "Marina Bay Street Circuit",
    // Usa fecha/hora local del evento (ISO). Ajusta a tu huso si deseas.
    date: "2025-10-05T13:00:00+08:00",
    sessions: [
      { label: "FP1", date: "2025-10-03T16:30:00+08:00" },
      { label: "Clasificación", date: "2025-10-04T21:00:00+08:00" },
      { label: "Carrera", date: "2025-10-05T20:00:00+08:00" }
    ]
  },
  {
    round: 17,
    name: "Gran Premio de Japón",
    country: "Japón",
    flag: "🇯🇵",
    circuit: "Suzuka International Racing Course",
    date: "2025-10-19T14:00:00+09:00",
    sessions: [
      { label: "FP1", date: "2025-10-17T13:30:00+09:00" },
      { label: "Clasificación", date: "2025-10-18T16:00:00+09:00" },
      { label: "Carrera", date: "2025-10-19T14:00:00+09:00" }
    ]
  },
  {
    round: 18,
    name: "Gran Premio de México",
    country: "México",
    flag: "🇲🇽",
    circuit: "Autódromo Hermanos Rodríguez",
    date: "2025-10-26T14:00:00-06:00",
    sessions: [
      { label: "FP1", date: "2025-10-24T12:30:00-06:00" },
      { label: "Clasificación", date: "2025-10-25T15:00:00-06:00" },
      { label: "Carrera", date: "2025-10-26T14:00:00-06:00" }
    ]
  }
];

const driverStandings = [
  { name: "Max Verstappen", team: "Red Bull", points: 325 },
  { name: "Lando Norris", team: "McLaren", points: 282 },
  { name: "Charles Leclerc", team: "Ferrari", points: 261 },
  { name: "Oscar Piastri", team: "McLaren", points: 218 },
  { name: "Carlos Sainz", team: "Ferrari", points: 210 }
];

const constructorStandings = [
  { name: "Red Bull", points: 540 },
  { name: "McLaren", points: 512 },
  { name: "Ferrari", points: 498 },
  { name: "Mercedes", points: 350 }
];

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
    minute: "2-digit"
  });

/* ====== Próximo GP (el primero con fecha futura) ====== */
function getNextRace() {
  const now = new Date();
  const future = races.filter(r => new Date(r.date) > now);
  return future.sort((a,b)=> new Date(a.date) - new Date(b.date))[0] || null;
}

/* ====== Render ====== */
function renderNextGp() {
  const next = getNextRace();
  if(!next){
    $("#nextGpTitle").textContent = "Temporada finalizada";
    $("#nextGpMeta").textContent = "Vuelve pronto para más acción 🏁";
    return;
  }

  $("#nextGpTitle").textContent = `${next.name} ${next.flag}`;
  $("#nextGpMeta").textContent = `${next.country} • Ronda ${next.round} • ${formatDate(next.date)}`;
  $("#nextGpCircuit").textContent = next.circuit;
  $("#nextGpFlag").textContent = next.flag;

  const ul = $("#nextGpSessions");
  ul.innerHTML = "";
  next.sessions.forEach(s => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `<strong>${s.label}</strong> — <span class="meta">${formatDate(s.date)}</span>`;
    ul.appendChild(li);
  });

  startCountdown(next.date);
}

function renderUpcoming() {
  const now = new Date();
  const upcoming = races
    .filter(r => new Date(r.date) > now)
    .sort((a,b)=> new Date(a.date) - new Date(b.date))
    .slice(0,3);

  const ul = $("#upcomingGps");
  ul.innerHTML = "";

  upcoming.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${r.name} ${r.flag}</strong>
        <div class="meta">${r.circuit}</div>
      </div>
      <div class="meta">${formatDate(r.date)}</div>
    `;
    ul.appendChild(li);
  });
}

function renderStandingsTop3() {
  const maxDriver = driverStandings[0]?.points || 1;
  const maxConstr = constructorStandings[0]?.points || 1;

  // Pilotos
  const dWrap = $("#topDrivers");
  dWrap.innerHTML = "";
  driverStandings.slice(0,3).forEach((d, i) => {
    const row = document.createElement("div");
    row.className = "st-row";
    row.innerHTML = `
      <div class="badge">${i+1}</div>
      <div class="name">${d.name} <span class="meta">• ${d.team}</span></div>
      <div class="points">${d.points}</div>
      <div class="progress"><i style="width:${(d.points/maxDriver)*100}%"></i></div>
    `;
    dWrap.appendChild(row);
  });

  // Constructores
  const cWrap = $("#topConstructors");
  cWrap.innerHTML = "";
  constructorStandings.slice(0,3).forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "st-row";
    row.innerHTML = `
      <div class="badge">${i+1}</div>
      <div class="name">${c.name}</div>
      <div class="points">${c.points}</div>
      <div class="progress"><i style="width:${(c.points/maxConstr)*100}%"></i></div>
    `;
    cWrap.appendChild(row);
  });
}

/* ====== Countdown ====== */
let cdTimer = null;
function startCountdown(isoDate){
  if(cdTimer) clearInterval(cdTimer);
  const target = new Date(isoDate).getTime();

  const update = () => {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((diff % (1000*60*60)) / (1000*60));
    const s = Math.floor((diff % (1000*60)) / 1000);

    $("#cdDays").textContent = String(d).padStart(2,"0");
    $("#cdHours").textContent = String(h).padStart(2,"0");
    $("#cdMinutes").textContent = String(m).padStart(2,"0");
    $("#cdSeconds").textContent = String(s).padStart(2,"0");
  };

  update();
  cdTimer = setInterval(update, 1000);
}

/* ====== Tema (oscuro/claro) ====== */
const themeToggle = $("#themeToggle");
function loadTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "light"){ document.body.classList.add("light"); }
}
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  renderNextGp();
  renderUpcoming();
  renderStandingsTop3();
  themeToggle.addEventListener("click", toggleTheme);
});
