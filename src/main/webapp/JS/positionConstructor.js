/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
  render();
  bind();
});

/* ====== Estado de los campos de filtrado ====== */
const state = { q: "", sort: "pos_asc", season: "2024" };

const $ = (s) => document.querySelector(s);

/* ====== Consultar info de la posición de los constructores ====== */
async function getPosicionConstructors() {
  const url = "http://localhost:8080/ProjectF1/PositionConstructorController";
  const resp = await fetch(url);

  const dataPositions = await resp.json();

  return dataPositions;
}

async function toCSV(rows) {
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      header.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(",")
    )
  );
  return lines.join("\n");
}

async function filtered() {
  const dataPositions = await getPosicionConstructors();
  let rows = dataPositions.slice();
  
  if (state.q.trim()) {
    const q = state.q.toLowerCase();
    rows = rows.filter((r) => r.constructor.nombre.toLowerCase().includes(q));
  }

  if (state.season !== "all") {
    rows = rows.filter((t) => String(t.temporada.anio) === state.season);
  }

  switch (state.sort) {
    case "pos_asc":
      rows.sort((a, b) => a.posicion - b.posicion);
      break;
    case "points_desc":
      rows.sort((a, b) => b.puntos - a.puntos);
      break;
    case "wins_desc":
      rows.sort((a, b) => b.victorias - a.victorias);
      break;
    case "name_asc":
      rows.sort((a, b) => a.constructor.nombre.localeCompare(b.constructor.nombre));
      break;
  }

  return rows;
}

async function render() {
  const rows = await filtered();

  $("#count").textContent = `${rows.length} filas`;

  const tb = $("#tbl tbody");
  tb.innerHTML = "";

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.idPosicion}</td>
      <td>${r.temporada.anio}</td>
      <td>${r.constructor.nombre}</td>
      <td>${r.posicion}</td>
      <td><b>${r.puntos.toFixed(1)}</b></td>
      <td>${r.victorias}</td>`;
    tb.appendChild(tr);
  });
}

/* ========= Manejador de eventos ========= */
function bind() {
  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });

  $("#season").addEventListener("change", (e) => {
    state.season = e.target.value;
    render();
  });

  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  $("#resetBtn").addEventListener("click", () => {
    state.q = "";
    state.sort = "pos_asc";
    $("#q").value = "";
    $("#sort").value = "pos_asc";
    $("#season").value = 2024;
    render();
  });

  $("#csvBtn").addEventListener("click", async () => {
    const rows = await filtered();

    const dataToPrint = rows.map((item) => ({
      Nombre: item.constructor.nombre,
      Temporada: item.temporada.anio,
      'Posición': item.posicion,
      Puntos: item.puntos,
      Victorias: item.victorias
    }));

    console.log(dataToPrint);

    const csv = toCSV(dataToPrint);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Posiciones por constructor.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
}


