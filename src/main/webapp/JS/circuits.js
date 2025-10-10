/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", async () => {
    loadTheme();
    await initFilters();
    await render();
    bindEvents();
});

/* ====== Consultar info de los circuitos ====== */
async function getCircuits() {
    const url = "http://localhost:8080/ProjectF1/CircuitoController";
    const resp = await fetch(url);

    const dataCircuits = await resp.json();

    return dataCircuits;
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
function km(v) {
    return Number(v).toFixed(3);
}
function totalDistance(c) {
    return (c.lengthKm * c.laps).toFixed(1);
}
async function byId(id) {
    const dataCircuits = await getCircuits();
    return dataCircuits.find((c) => c.idCircuito === id);
}
function fdate(d) {
    return new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/* ====== Estado ====== */
const state = {
    q: "",
    country: "all",
    viewMode: "cards",
    sortBy: "name_asc"
};

/* ====== Filtros ====== */
async function initFilters() {

    const dataCircuits = await getCircuits();
    const countries = unique(dataCircuits.map((c) => c.pais)).sort();
    const pSel = $("#country");
    countries.forEach((v) => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = v;
        pSel.appendChild(o);
    });
}

/* ====== Query ====== */
async function getFiltered() {
    const {q, country, sortBy} = state;
    const dataCircuits = await getCircuits();

    let rows = dataCircuits.slice();

    if (country !== "all")
        rows = rows.filter((c) => c.pais === country);

    if (q.trim()) {
        const qq = q.trim().toLowerCase();
        rows = rows.filter(
                (c) =>
            c.nombre.toLowerCase().includes(qq) ||
                    c.pais.toLowerCase().includes(qq)
        );
    }

    switch (sortBy) {
        case "name_asc":
            rows.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case "length_desc":
            rows.sort((a, b) => b.lng - a.lng);
            break;
        case "lat_desc":
            rows.sort((a, b) => b.lat - a.lat);
            break;
    }

    return rows;
}

/* ====== Render ====== */
async function renderCards() {
    const rows = await getFiltered();

    $("#count").textContent = `${rows.length} circuitos`;


    const grid = $("#cardsGrid");
    grid.innerHTML = "";
    rows.forEach((c) => {
        const el = document.createElement("article");
        el.className = "card";
        el.innerHTML = `
      <div>
        <div class="name">${c.nombre} <span class="tag">${c.pais}</span></div>
        <div class="kpis">
          <div class="kpi"><small>Localidad</small><b>${c.localidad}</b></div>
          <div class="kpi"><small>Longitud</small><b>${km(c.lng)} km</b></div>
          <div class="kpi"><small>Latitud</small><b>${c.lat}</b></div>
        </div>
      </div>
    `;
        grid.appendChild(el);
    });
}

async function renderTable() {
    const rows = await getFiltered();

    $("#count").textContent = `${rows.length} circuitos`;
    const tb = $("#tableView tbody");

    tb.innerHTML = "";
    rows.forEach((c) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${c.nombre}</td>
      <td>${c.pais}</td>
      <td>${c.localidad}</td>
      <td>${km(c.lng)} km</td> 
      <td>${c.lat}</td>
    `;
        tb.appendChild(tr);
    });
}

async function render() {
    const view = state.viewMode;
    $("#cardsGrid").classList.toggle("hidden", view !== "cards");
    $("#tableView").classList.toggle("hidden", view !== "table");
    if (view === "cards")
        await renderCards();
    else
        await renderTable();
}

/* ====== Detalle 
 function renderLastTop10(c) {
 const tb = $("#tblLast tbody");
 tb.innerHTML = "";
 (c.lastTop10 || []).forEach((r) => {
 const tr = document.createElement("tr");
 tr.innerHTML = `<td>${r.pos}</td><td>${r.driver}</td><td>${
 r.team
 }</td><td>${r.pts}</td><td>${fdate(c.lastResultDate)}</td>`;
 tb.appendChild(tr);
 });
 }
 
 
 function renderRecords(c) {
 const tb = $("#tblRecords tbody");
 tb.innerHTML = "";
 (c.recordTable || []).forEach((r) => {
 const tr = document.createElement("tr");
 tr.innerHTML = `<td>${r.type}</td><td>${r.mark}</td><td>${r.driver}</td><td>${r.team}</td><td>${r.year}</td>`;
 tb.appendChild(tr);
 });
 }
 ====== */

async function openDetail(id) {
    const c = await byId(id);
    if (!c)
        return;

    $("#cName").textContent = c.nombre;
    $("#cSubtitle").textContent = `${c.pais}`;
    $("#cLength").textContent = km(c.lng);
    $("#cLocalidad").textContent = c.localidad;
    $("#cLaps").textContent = c.lat;

    // Tablas

    history.replaceState(null, "", `#circuit=${encodeURIComponent(c.idCircuito)}`);
    $("#detailPanel").classList.add("open");
}
function closeDetail() {
    $("#detailPanel").classList.remove("open");
    if (location.hash.includes("circuit="))
        history.replaceState(null, "", location.pathname);
}

/* ====== Tabs ====== */
function setActiveTab(key) {
    $$(".tab").forEach((t) =>
        t.classList.toggle("is-active", t.dataset.tab === key)
    );
    $("#tblLast").classList.toggle("hidden", key !== "last");
    $("#tblRecords").classList.toggle("hidden", key !== "records");
}

/* ====== Export ====== */
async function exportCSV() {
    const data = await getFiltered();
    const rows = data.map(
            ({ map, desc, lastTop10, recordTable, ...keep }) => keep
    );
    const csv = "\uFEFF" + toCSV(rows);
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "circuitos.csv";
    a.click();
    URL.revokeObjectURL(url);
}

/* ====== Tema ====== */
function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light")
        document.body.classList.add("light");
}
function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem(
            "theme",
            document.body.classList.contains("light") ? "light" : "dark"
            );
}

/* ====== Eventos / Init ====== */
function bindEvents() {
    $("#q").addEventListener("input", (e) => {
        state.q = e.target.value;
        render();
    });
    $("#country").addEventListener("change", (e) => {
        state.country = e.target.value;
        render();
    });
    $("#viewMode").addEventListener("change", (e) => {
        state.viewMode = e.target.value;
        render();
    });
    $("#sortBy").addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        render();
    });
    $("#resetBtn").addEventListener("click", () => {
        state.q = "";
        state.country = "all";
        state.viewMode = "cards";
        state.sortBy = "name_asc";
        $("#q").value = "";
        $("#country").value = "all";
        $("#viewMode").value = "cards";
        $("#sortBy").value = "name_asc";
        render();
    });
    $("#exportBtn").addEventListener("click", exportCSV);
    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#closeDetail").addEventListener("click", closeDetail);

    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-open]");
        if (btn)
            openDetail(btn.dataset.open);
        const tab = e.target.closest(".tab");
        if (tab)
            setActiveTab(tab.dataset.tab);
    });

    if (location.hash.includes("circuit=")) {
        const id = decodeURIComponent(location.hash.split("circuit=")[1] || "");
        if (id)
            openDetail(id);
    }
}


