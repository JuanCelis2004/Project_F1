/* ======= UI Init ======= */
function fillRaceSelects(){
  const opts = RACES_2025.map(r => `<option value="${r.id}">${r.name} (${fmtDate(r.date)})</option>`).join("");
  $("#formResult select[name='race']").innerHTML = opts;
  $("#formPred   select[name='race']").innerHTML = opts;
}
function setThemeFromStorage(){
  const saved = localStorage.getItem("theme");
  if(saved === "light") document.body.classList.add("light");
}

/* ======= Render ======= */
function renderResults(){
  save(STORE_KEYS.RESULTS, RESULTS);
  const tb = $("#tblResults tbody"); tb.innerHTML = "";
  const rows = RESULTS.slice().sort((a,b)=> new Date(a.date) - new Date(b.date) || a.pos - b.pos);
  rows.forEach(r=>{
    const tr = document.createElement("tr");
    const raceName = RACES_2025.find(x=>x.id===r.race)?.name || r.race;
    tr.innerHTML = `
      <td>${raceName}</td>
      <td>${fmtDate(r.date)}</td>
      <td>${r.pos}</td>
      <td>${r.driver}</td>
      <td>${r.team}</td>
      <td>${r.points}</td>
      <td class="row-actions">
        <button class="icon" data-edit-res="${r.id}">✎</button>
        <button class="icon" data-del-res="${r.id}">🗑</button>
      </td>`;
    tb.appendChild(tr);
  });
}

function renderPreds(){
  save(STORE_KEYS.PREDS, PREDS);
  const tb = $("#tblPreds tbody"); tb.innerHTML = "";
  const rows = PREDS.slice().sort((a,b)=> new Date(a.raceDate||"2100-01-01") - new Date(b.raceDate||"2100-01-01"));
  rows.forEach(p=>{
    const raceName = RACES_2025.find(x=>x.id===p.race)?.name || p.race;
    const probs = Object.entries(p.probs||{}).map(([k,v])=>`${k}:${v}%`).join(" · ");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${raceName}</td>
      <td>${p.targetType}</td>
      <td>${p.targetName}</td>
      <td><b>${p.points_pred}</b></td>
      <td>${p.p10}</td>
      <td>${p.p90}</td>
      <td><span class="tiny">${probs || "—"}</span></td>
      <td class="row-actions">
        <button class="icon" data-edit-pred="${p.id}">✎</button>
        <button class="icon" data-del-pred="${p.id}">🗑</button>
      </td>`;
    tb.appendChild(tr);
  });
}

function renderHistory(){
  const hist = load(STORE_KEYS.HIST, []);
  const ul = $("#historyList"); ul.innerHTML = "";
  hist.forEach(h=>{
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="dot"></div>
      <div>
        <div><b>${h.action}</b></div>
        <div class="when">${fmtDate(h.when)} · ${new Date(h.when).toLocaleTimeString()}</div>
      </div>`;
    ul.appendChild(li);
  });
}

/* ======= CRUD Actions ======= */
function onSubmitResult(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const r = {
    id: uid(),
    race: fd.get("race"),
    date: fd.get("date"),
    driver: fd.get("driver").trim(),
    team: fd.get("team").trim(),
    pos: Number(fd.get("pos")),
    points: Number(fd.get("points"))
  };
  if(!r.driver || !r.team){ showToast("Piloto y Escudería son obligatorios","error"); return; }
  RESULTS.push(r);
  renderResults();
  pushHistory("Nuevo resultado", {race:r.race, driver:r.driver});
  e.target.reset();
  showToast("Resultado guardado");
}

function onSubmitPred(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const p = {
    id: uid(),
    race: fd.get("race"),
    targetType: fd.get("targetType"),
    targetName: fd.get("targetName").trim(),
    points_pred: Number(fd.get("points_pred")),
    p10: Number(fd.get("p10")),
    p90: Number(fd.get("p90")),
    probs: {}
  };
  ["P1","P2","P3","P4","P5"].forEach(k=>{
    const v = fd.get(`prob_${k}`); if(v!=="" && v!==null) p.probs[k] = Number(v);
  });
  if(!p.targetName){ showToast("El nombre del target es obligatorio","error"); return; }
  if(p.p90 < p.p10){ showToast("P90 no puede ser menor que P10","error"); return; }
  PREDS.push(p);
  renderPreds();
  pushHistory("Nueva predicción", {race:p.race, target:`${p.targetType}:${p.targetName}`});
  e.target.reset();
  showToast("Predicción guardada");
}

function onTableClick(e){
  // borrar/editar resultado
  const delR = e.target.closest("[data-del-res]");
  const editR = e.target.closest("[data-edit-res]");
  const delP = e.target.closest("[data-del-pred]");
  const editP = e.target.closest("[data-edit-pred]");

  if(delR){
    const id = delR.dataset.delRes;
    RESULTS = RESULTS.filter(x=>x.id!==id);
    renderResults();
    pushHistory("Eliminar resultado", {id});
    showToast("Resultado eliminado");
  }
  if(editR){
    const id = editR.dataset.editRes;
    const r = RESULTS.find(x=>x.id===id); if(!r) return;
    // precargar en el form
    const f = $("#formResult");
    f.race.value = r.race; f.date.value = r.date; f.driver.value = r.driver; f.team.value = r.team; f.pos.value = r.pos; f.points.value = r.points;
    // al guardar, creará uno nuevo; si quieres update-in-place, puedes eliminar el viejo:
    RESULTS = RESULTS.filter(x=>x.id!==id); renderResults();
    pushHistory("Editar resultado (precargado)", {id});
  }

  if(delP){
    const id = delP.dataset.delPred;
    PREDS = PREDS.filter(x=>x.id!==id);
    renderPreds();
    pushHistory("Eliminar predicción", {id});
    showToast("Predicción eliminada");
  }
  if(editP){
    const id = editP.dataset.editPred;
    const p = PREDS.find(x=>x.id===id); if(!p) return;
    const f = $("#formPred");
    f.race.value = p.race; f.targetType.value = p.targetType; f.targetName.value = p.targetName;
    f.points_pred.value = p.points_pred; f.p10.value = p.p10; f.p90.value = p.p90;
    ["P1","P2","P3","P4","P5"].forEach(k=>{
      const el = f[`prob_${k}`]; if(el) el.value = (p.probs?.[k] ?? "");
    });
    PREDS = PREDS.filter(x=>x.id!==id); renderPreds();
    pushHistory("Editar predicción (precargada)", {id});
  }
}

/* ======= Recalcular/Actualizar ======= */
/* Aquí podrías llamar a tu backend; simulamos progreso y “rebuild” de tablas */
function recalc(){
  const bar = $("#recalcBar"); const msg = $("#recalcMsg");
  bar.classList.remove("hidden"); msg.textContent = "Recalculando métricas, por favor espera...";
  setTimeout(()=>{
    // Simula: re-ordenar, consolidar duplicados simples, normalizar tipos
    RESULTS.forEach(r=>{ r.points = Number(r.points); r.pos = Number(r.pos); });
    PREDS.forEach(p=>{ p.points_pred=Number(p.points_pred); p.p10=Number(p.p10); p.p90=Number(p.p90); });
    renderResults(); renderPreds();

    bar.classList.add("hidden");
    showToast("Tablas actualizadas correctamente","success");
    pushHistory("Recalcular/Actualizar tablas");
  }, 1100);
}

/* ======= Tabs / Tema / Eventos ======= */
function setActiveTab(key){
  $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.tab===key));
  $$(".pane").forEach(p => p.classList.toggle("open", p.id === `pane-${key}`));
}

function bindEvents(){
  // Tabs
  document.body.addEventListener("click",(e)=>{
    const t = e.target.closest(".tab"); if(t) setActiveTab(t.dataset.tab);
  });

  // Resultados
  $("#formResult").addEventListener("submit", onSubmitResult);
  $("#tblResults").addEventListener("click", onTableClick);
  $("#exportResults").addEventListener("click", ()=>{
    const rows = RESULTS.map(r=>({
      race: RACES_2025.find(x=>x.id===r.race)?.name || r.race,
      date: r.date, pos:r.pos, driver:r.driver, team:r.team, points:r.points
    }));
    downloadCSV("resultados_2025.csv", rows);
  });

  // Predicciones
  $("#formPred").addEventListener("submit", onSubmitPred);
  $("#tblPreds").addEventListener("click", onTableClick);
  $("#exportPreds").addEventListener("click", ()=>{
    const rows = PREDS.map(p=>({
      race: RACES_2025.find(x=>x.id===p.race)?.name || p.race,
      targetType:p.targetType, targetName:p.targetName,
      points_pred:p.points_pred, p10:p.p10, p90:p.p90,
      probs:Object.entries(p.probs||{}).map(([k,v])=>`${k}:${v}%`).join(" ")
    }));
    downloadCSV("predicciones_2025.csv", rows);
  });

  // Recalcular
  $("#recalcBtn").addEventListener("click", recalc);

  // Tema
  $("#themeToggle").addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Historial
  $("#clearHistory").addEventListener("click", ()=>{
    localStorage.removeItem(STORE_KEYS.HIST);
    renderHistory();
    showToast("Historial vaciado");
  });
}

/* ======= Init ======= */
document.addEventListener("DOMContentLoaded", ()=>{
  setThemeFromStorage();
  fillRaceSelects();
  renderResults();
  renderPreds();
  renderHistory();
  bindEvents();
});
