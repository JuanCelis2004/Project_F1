<%-- 
    Document   : circuitos
    Created on : 5/10/2025, 6:06:22 p. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 – Circuitos</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/circuits.css" />
</head>
<body>
  <header class="site-header">
    <div class="brand">
      <a class="logo" href="index.html" aria-label="Volver al Dashboard">
        <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 40h26l8-16h18l-8 16h-8l-8 16H8z"/></svg>
      </a>
      <div class="titles">
        <h1>Circuitos</h1>
        <p class="subtitle">CU3 – Listar circuitos (tarjeta/tabla + detalle con mapa y posiciones)</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index2.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link is-active">Circuitos</a>
      <!-- <a href="./carreras.jsp" class="nav-link">Carreras</a> -->
      <a href="./posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./historial-carreras.jsp" class="nav-link">Historial de carreras</a>
    </nav>

    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <section class="filters">
      <div class="search-box">
        <input id="q" type="search" placeholder="Buscar por nombre o país..." autocomplete="off" />
      </div>
      <div class="filters-grid">
        <label class="field">
          <span>Continente</span>
          <select id="continent">
            <option value="all">Todos</option>
          </select>
        </label>

        <label class="field">
          <span>País</span>
          <select id="country">
            <option value="all">Todos</option>
          </select>
        </label>

        <label class="field">
          <span>Vista</span>
          <select id="viewMode">
            <option value="cards">Tarjetas</option>
            <option value="table">Tabla</option>
          </select>
        </label>

        <label class="field">
          <span>Ordenar</span>
          <select id="sortBy">
            <option value="name_asc">Nombre (A–Z)</option>
            <option value="length_desc">Longitud (desc)</option>
            <option value="laps_desc">Vueltas (desc)</option>
          </select>
        </label>

        <div class="field actions">
          <button id="resetBtn" class="btn outline">Limpiar</button>
          <button id="exportBtn" class="btn primary">Exportar CSV</button>
        </div>
      </div>
    </section>

    <section class="results">
      <div class="results-head">
        <h2 id="title">Circuitos</h2>
        <div class="pill" id="count">0</div>
      </div>

      <div id="cardsGrid" class="grid"></div>

      <table id="tableView" class="table hidden">
        <thead>
          <tr>
            <th>Circuito</th><th>País</th><th>Longitud</th><th>Vueltas</th><th>Primer GP</th><th>Récord</th><th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  </main>

  <!-- Panel detalle -->
  <aside id="detailPanel" class="detail">
    <button id="closeDetail" class="detail-close" aria-label="Cerrar">✕</button>
    <div class="detail-body">
      <div class="detail-head">
        <img id="cMap" alt="Mapa del circuito" />
        <div>
          <h3 id="cName">—</h3>
          <p class="meta" id="cSubtitle">—</p>
        </div>
      </div>

      <div class="stats">
        <div class="stat"><b id="cLength">0</b><span>Longitud (km)</span></div>
        <div class="stat"><b id="cLaps">0</b><span>Vueltas</span></div>
        <div class="stat"><b id="cDistance">0</b><span>Distancia total (km)</span></div>
        <div class="stat"><b id="cFirst">—</b><span>Primer GP</span></div>
        <div class="stat"><b id="cRecord">—</b><span>Récord</span></div>
      </div>

      <div class="section">
        <h4>Descripción</h4>
        <p id="cDesc">—</p>
      </div>

      <div class="section">
        <h4>Tablas de posiciones</h4>
        <div class="tabs">
          <button class="tab is-active" data-tab="last">Último GP (Top 10)</button>
          <button class="tab" data-tab="records">Récords</button>
        </div>

        <!-- Último GP -->
        <table class="table" id="tblLast">
          <thead>
            <tr>
              <th>#</th><th>Piloto</th><th>Constructor</th><th>Puntos</th><th>Fecha</th>
            </tr>
          </thead>
          <tbody><!-- JS --></tbody>
        </table>

        <!-- Récords -->
        <table class="table hidden" id="tblRecords">
          <thead>
            <tr>
              <th>Tipo</th><th>Marca</th><th>Piloto</th><th>Equipo</th><th>Año</th>
            </tr>
          </thead>
          <tbody><!-- JS --></tbody>
        </table>
      </div>
    </div>
  </aside>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <script src="../JS/circuits.js"></script>
</body>
</html>
