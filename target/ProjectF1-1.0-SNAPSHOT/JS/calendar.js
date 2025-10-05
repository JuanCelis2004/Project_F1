/* =================== Datos de ejemplo (2025) =================== */
/* Guarda todos los horarios en UTC (YYYY-MM-DDTHH:mm:00Z) y convertimos a local. */
const GP_2025 = [
  {
    id:"bah", gp:"Gran Premio de Baréin", country:"Baréin", continent:"Asia", circuit:"Sakhir",
    weekend:["2025-02-28","2025-03-02"], sprint:false, night:true,
    image:"https://picsum.photos/seed/bahrain/800/480",
    sessions:{
      FP1:"2025-02-28T14:30:00Z",
      Qualy:"2025-02-28T18:00:00Z",
      Race:"2025-03-02T15:00:00Z"
    }
  },
  {
    id:"sau", gp:"Gran Premio de Arabia Saudí", country:"Arabia Saudí", continent:"Asia", circuit:"Jeddah Corniche",
    weekend:["2025-03-06","2025-03-09"], sprint:false, night:true,
    image:"https://picsum.photos/seed/jeddah/800/480",
    sessions:{
      FP1:"2025-03-06T16:30:00Z",
      Qualy:"2025-03-07T18:00:00Z",
      Race:"2025-03-09T18:00:00Z"
    }
  },
  {
    id:"aus", gp:"Gran Premio de Australia", country:"Australia", continent:"Oceanía", circuit:"Albert Park",
    weekend:["2025-03-21","2025-03-23"], sprint:false, night:false,
    image:"https://picsum.photos/seed/australia/800/480",
    sessions:{
      FP1:"2025-03-21T01:30:00Z",
      Qualy:"2025-03-22T05:00:00Z",
      Race:"2025-03-23T04:00:00Z"
    }
  },
  {
    id:"jpn", gp:"Gran Premio de Japón", country:"Japón", continent:"Asia", circuit:"Suzuka",
    weekend:["2025-04-04","2025-04-06"], sprint:false, night:false,
    image:"https://picsum.photos/seed/japan/800/480",
    sessions:{
      FP1:"2025-04-04T02:30:00Z",
      Qualy:"2025-04-05T06:00:00Z",
      Race:"2025-04-06T05:00:00Z"
    }
  },
  {
    id:"sgp", gp:"Gran Premio de Singapur", country:"Singapur", continent:"Asia", circuit:"Marina Bay",
    weekend:["2025-10-03","2025-10-05"], sprint:true, night:true,
    image:"https://picsum.photos/seed/singapore/800/480",
    sessions:{
      FP1:"2025-10-03T10:30:00Z",
      SprintQualy:"2025-10-04T12:00:00Z",
      Sprint:"2025-10-04T16:30:00Z",
      Qualy:"2025-10-04T20:00:00Z",
      Race:"2025-10-05T12:00:00Z"
    }
  }
];

/* =================== Helpers =================== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const pad = n => (n<10 ? "0"+n : n);
const monthName = (m)=> new Date(2025, m, 1).toLocaleDateString(undefined,{month:"long"});
const fmtLocal = (utcStr) => new Date(utcStr).toLocaleString(undefined,{weekday:"short", day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit"});
const fmtLocalShort = (utcStr) => new Date(utcStr).toLocaleTimeString(undefined,{hour:"2-digit", minute:"2-digit"});
const dateISO = (d)=> `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
function toCSV(rows){
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(rows.map(r => header.map(h => `"${String(r[h]??"").replace(/"/g,'""')}"`).join(",")));
  return lines.join("\n");
}
function download(filename, content, mime){
  const blob = new Blob([content], {type:mime}); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}

/* Favoritos */
const FAV_KEY = "f1_calendar_favs";
function loadFavs(){ try{return JSON.parse(localStorage.getItem(FAV_KEY)||"[]");}catch{return []} }
function saveFavs(v){ localStorage.setItem(FAV_KEY, JSON.stringify(v)); }
let favs = loadFavs();

/* =================== Estado =================== */
const state = {
  ym: { y: 2025, m: new Date().getMonth() }, // mes visible
  q: "", continent:"all", sprint:"all", night:"all",
  view: "grid"
};

/* =================== Filtros =================== */
function initFilters(){
  const continents = [...new Set(GP_2025.map(g=>g.continent))].sort();
  const sel = $("#fContinent");
  continents.forEach(c => {
    const o = document.createElement("option"); o.value=c; o.textContent=c; sel.appendChild(o);
  });
}

function applyFilters(list){
  let rows = list.slice();
  if(state.q.trim()){
    const q = state.q.toLowerCase();
    rows = rows.filter(g => [g.gp, g.country, g.circuit].some(x => x.toLowerCase().includes(q)));
  }
  if(state.continent!=="all") rows = rows.filter(g => g.continent===state.continent);
  if(state.sprint!=="all")   rows = rows.filter(g => state.sprint==="yes" ? g.sprint : !g.sprint);
  if(state.night!=="all")    rows = rows.filter(g => state.night==="yes" ? g.night  : !g.night);
  return rows;
}

/* =================== Rejilla mensual =================== */
function eventsInMonth(y,m){
  const start = new Date(y,m,1);
  const end   = new Date(y,m+1,0);
  const monthISO = (d)=> `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
  return applyFilters(GP_2025).filter(g => g.weekend[0].startsWith(monthISO(start)) || g.weekend[1].startsWith(monthISO(start)));
}

function renderGrid(){
  $("#gridView").classList.toggle("hidden", state.view!=="grid");
  const {y,m} = state.ym;
  $("#monthTitle").textContent = `${monthName(m).replace(/^\w/,c=>c.toUpperCase())} ${y}`;

  const first = new Date(y,m,1);
  const last  = new Date(y,m+1,0);
  const startDay = (first.getDay()+6)%7; // lunes=0
  const totalCells = startDay + last.getDate();
  const weeks = Math.ceil(totalCells/7);

  const container = $("#weeksContainer");
  container.innerHTML = "";
  const monthEvents = eventsInMonth(y,m);

  let day = 1;
  for(let w=0; w<weeks; w++){
    const row = document.createElement("div");
    row.className = "week";
    row.style.gridTemplateColumns = "repeat(7,1fr)";
    for(let d=0; d<7; d++){
      const cell = document.createElement("div");
      if(w===0 && d<startDay || day>last.getDate()){
        cell.className="day empty";
        row.appendChild(cell);
        continue;
      }
      const isToday = (y===new Date().getFullYear() && m===new Date().getMonth() && day===new Date().getDate());
      cell.className = "day" + (isToday ? " today" : "");
      cell.innerHTML = `<div class="dnum">${day}</div>`;
      const dateStr = `${y}-${pad(m+1)}-${pad(day)}`;

      // eventos del día (mostrar tarjeta principal el domingo de la carrera)
      const evs = monthEvents.filter(g => g.weekend[1]===dateStr);
      evs.forEach(g=>{
        const el = document.createElement("div");
        el.className = "card" + (favs.includes(g.id) ? " faved" : "");
        el.innerHTML = `
          <div>
            <div class="name">${g.gp}</div>
            <div class="tag">${g.country} • ${g.circuit}</div>
          </div>
          <button class="fav" data-fav="${g.id}" title="Favorito">★</button>
        `;
        el.addEventListener("click", (e)=> {
          if(e.target.closest("[data-fav]")) return;
          openDetail(g.id);
        });
        cell.appendChild(el);
      });

      row.appendChild(cell);
      day++;
    }
    container.appendChild(row);
  }
}

/* =================== Lista =================== */
function renderList(){
  $("#listView").classList.toggle("hidden", state.view!=="list");
  const rows = applyFilters(GP_2025).sort((a,b)=> new Date(a.sessions.Race) - new Date(b.sessions.Race));
  $("#countList").textContent = rows.length.toString();

  const ul = $("#listContainer");
  ul.innerHTML = "";
  rows.forEach(g=>{
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div>
        <div><b>${g.gp}</b> <span class="tag">${g.country}</span> <span class="tag">${g.continent}</span> ${g.sprint?'<span class="tag">Sprint</span>':''} ${g.night?'<span class="tag">Nocturna</span>':''}</div>
        <div class="meta">Carrera: ${fmtLocal(g.sessions.Race)} • Circuito: ${g.circuit}</div>
      </div>
      <div class="actions">
        <button class="btn outline" data-open="${g.id}">Detalle</button>
        <button class="btn" data-fav="${g.id}">${favs.includes(g.id)?'★':'☆'}</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

/* =================== Detalle =================== */
function openDetail(id){
  const g = GP_2025.find(x=>x.id===id); if(!g) return;
  $("#gpImage").src = g.image; $("#gpImage").alt = `Imagen ${g.circuit}`;
  $("#gpTitle").textContent = g.gp;
  $("#gpMeta").textContent = `${g.country} • ${g.circuit}`;
  $("#gpWeekend").textContent = `${new Date(g.weekend[0]).toLocaleDateString()} → ${new Date(g.weekend[1]).toLocaleDateString()}`;
  $("#gpSprint").textContent = g.sprint ? "Sí" : "No";
  $("#gpNight").textContent = g.night ? "Sí" : "No";
  $("#gpContinent").textContent = g.continent;

  const ul = $("#gpSchedule"); ul.innerHTML = "";
  Object.entries(g.sessions).forEach(([name,utc])=>{
    const li = document.createElement("li");
    li.textContent = `${name}: ${fmtLocal(utc)} (${fmtLocalShort(utc)} local)`;
    ul.appendChild(li);
  });

  $("#tzNote").textContent = `Zona horaria: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  $("#favBtn").dataset.fav = g.id;
  $("#favBtn").classList.toggle("primary", favs.includes(g.id));
  $("#icsBtn").dataset.ics = g.id;

  history.replaceState(null,"",`#gp=${encodeURIComponent(g.id)}`);
  $("#detailPanel").classList.add("open");
}
function closeDetail(){
  $("#detailPanel").classList.remove("open");
  if(location.hash.includes("gp=")) history.replaceState(null,"",location.pathname);
}

/* =================== Export .ics de la carrera =================== */
function buildICS(g){
  const dt = (s)=> new Date(s).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
  const uid = `${g.id}@f1.local`;
  const start = dt(g.sessions.Race);
  const end   = dt(new Date(new Date(g.sessions.Race).getTime() + 2*60*60*1000)); // 2h
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//F1 Demo//Calendar//ES",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${g.gp}`,
    `LOCATION:${g.circuit} - ${g.country}`,
    `DESCRIPTION:${g.sprint?"Incluye Sprint. ":""}Horarios locales en la app.`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

/* =================== Export CSV =================== */
function exportCSV(){
  const rows = applyFilters(GP_2025).map(g=>({
    gp:g.gp, country:g.country, continent:g.continent, circuit:g.circuit,
    sprint:g.sprint?"sí":"no", night:g.night?"sí":"no",
    start:g.weekend[0], end:g.weekend[1],
    raceUTC:g.sessions.Race
  }));
  download("calendario_2025.csv", toCSV(rows), "text/csv;charset=utf-8");
}

/* =================== Eventos / Init =================== */
function bindEvents(){
  $("#themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light":"dark");
  });

  $("#prevBtn").addEventListener("click", ()=>{ state.ym.m = (state.ym.m+11)%12; if(state.ym.m===11) state.ym.y--; renderGrid(); });
  $("#nextBtn").addEventListener("click", ()=>{ state.ym.m = (state.ym.m+1)%12;  if(state.ym.m===0)  state.ym.y++; renderGrid(); });
  $("#todayBtn").addEventListener("click", ()=>{ const now = new Date(); state.ym.y=now.getFullYear(); state.ym.m=now.getMonth(); renderGrid(); });

  $("#viewMode").addEventListener("change",(e)=>{ state.view = e.target.value; renderGrid(); renderList(); });
  $("#q").addEventListener("input",(e)=>{ state.q=e.target.value; renderGrid(); renderList(); });
  $("#fContinent").addEventListener("change",(e)=>{ state.continent=e.target.value; renderGrid(); renderList(); });
  $("#fSprint").addEventListener("change",(e)=>{ state.sprint=e.target.value; renderGrid(); renderList(); });
  $("#fNight").addEventListener("change",(e)=>{ state.night=e.target.value; renderGrid(); renderList(); });
  $("#resetFilters").addEventListener("click", ()=>{
    state.q=""; state.continent="all"; state.sprint="all"; state.night="all";
    $("#q").value=""; $("#fContinent").value="all"; $("#fSprint").value="all"; $("#fNight").value="all";
    renderGrid(); renderList();
  });
  $("#exportCSV").addEventListener("click", exportCSV);

  // clicks globales (detalle + favoritos + ics)
  document.body.addEventListener("click",(e)=>{
    const open = e.target.closest("[data-open]");
    if(open){ openDetail(open.dataset.open); }

    const favEl = e.target.closest("[data-fav]");
    if(favEl){
      const id = favEl.dataset.fav;
      if(favs.includes(id)) favs = favs.filter(x=>x!==id); else favs.push(id);
      saveFavs(favs);
      renderGrid(); renderList();
      const btn = $("#favBtn"); if(btn && btn.dataset.fav===id) btn.classList.toggle("primary", favs.includes(id));
    }

    if(e.target.id==="icsBtn"){
      const id = e.target.dataset.ics; const g = GP_2025.find(x=>x.id===id); if(!g) return;
      const ics = buildICS(g);
      download(`${g.id}_${g.country.replace(/\s+/g,'')}.ics`, ics, "text/calendar;charset=utf-8");
    }
  });

  $("#closeDetail").addEventListener("click", closeDetail);

  // deep-link
  if(location.hash.includes("gp=")){
    const id = decodeURIComponent(location.hash.split("gp=")[1]||"");
    if(id) openDetail(id);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const saved = localStorage.getItem("theme"); if(saved==="light") document.body.classList.add("light");
  initFilters();
  renderGrid();
  renderList();
  bindEvents();
});
