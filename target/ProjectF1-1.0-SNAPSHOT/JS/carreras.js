/* ===== Lista de 24 carreras (según tu captura) ===== */
const CIRCUITS_2024 = [
  { no: 1, season: 2024, circuit: "Bahréin International Circuit" },
  { no: 2, season: 2024, circuit: "Indianapolis Motor Speedway" },
  { no: 3, season: 2024, circuit: "Albert Park Grand Prix Circuit" },
  { no: 4, season: 2024, circuit: "SuzReino Unioda Circuit" }, // tal cual en imagen
  { no: 5, season: 2024, circuit: "Shanghai International Circuit" },
  { no: 6, season: 2024, circuit: "Le Mans" },
  { no: 7, season: 2024, circuit: "Buddh International Circuit" },
  { no: 8, season: 2024, circuit: "Autódromo do Estoril" },
  { no: 9, season: 2024, circuit: "Rouen-Les-Essarts" },
  { no: 10, season: 2024, circuit: "Fair Park" },
  { no: 11, season: 2024, circuit: "Circuit de Pedralbes" },
  { no: 12, season: 2024, circuit: "Silverstone Circuit" },
  { no: 13, season: 2024, circuit: "Autodromo Enzo e Dino Ferrari" },
  { no: 14, season: 2024, circuit: "Circuit de Spa-Francorchamps" },
  { no: 15, season: 2024, circuit: "Circuit Park Zandvoort" },
  { no: 16, season: 2024, circuit: "Detroit Street Circuit" },
  { no: 17, season: 2024, circuit: "Baku City Circuit" },
  { no: 18, season: 2024, circuit: "Las Vegas Street Circuit" },
  { no: 19, season: 2024, circuit: "Circuit of the Americas" },
  { no: 20, season: 2024, circuit: "Autódromo Hermanos Rodríguez" },
  { no: 21, season: 2024, circuit: "Charade Circuit" },
  { no: 22, season: 2024, circuit: "Jeddah Corniche Circuit" },
  { no: 23, season: 2024, circuit: "Kyalami" },
  { no: 24, season: 2024, circuit: "Korean International Circuit" },
];

// Init
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
  render();
  bind();
});

const $ = (s) => document.querySelector(s);
const state = { q: "", sort: "no_asc" };

function toCSV(rows) {
  const header = Object.keys(rows[0] || {});
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      header.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(",")
    )
  );

  return lines.join("\n");
}

function filtered() {
  let rows = CIRCUITS_2024.slice();

  if (state.q.trim()) {
    const q = state.q.toLowerCase();
    rows = rows.filter((r) => r.circuit.toLowerCase().includes(q));
  }

  switch (state.sort) {
    case "no_asc":
      rows.sort((a, b) => a.no - b.no);
      break;
    case "name_asc":
      rows.sort((a, b) => a.circuit.localeCompare(b.circuit));
      break;
  }

  return rows;
}

function render() {
  const rows = filtered();

  $("#count").textContent = `${rows.length} filas`;

  const tb = $("#tbl tbody");
  tb.innerHTML = "";

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.no}</td><td>${r.season}</td><td>${r.circuit}</td>`;
    tb.appendChild(tr);
  });
}

function bind() {
  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });

  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  $("#resetBtn").addEventListener("click", () => {
    state.q = "";
    state.sort = "no_asc";
    $("#q").value = "";
    $("#sort").value = "no_asc";
    render();
  });

  $("#csvBtn").addEventListener("click", () => {
    const csv = toCSV(filtered());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carreras_2024.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
}
