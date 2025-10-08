<%-- 
    Document   : pilotos
    Created on : 5/10/2025, 6:14:03 p. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 – Pilotos</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/drivers.css" />
</head>

<body>
  <header class="site-header">
    <div class="brand">
      <a class="logo" href="index.html" title="Volver al Dashboard" aria-label="Volver al Dashboard">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40h26l8-16h18l-8 16h-8l-8 16H8z" />
        </svg>
      </a>
      <div class="titles">
        <h1>Pilotos</h1>
        <p class="subtitle">CU1 – Consultar pilotos (2024/2025)</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index2.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link is-active">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link">Circuitos</a>
      <a href="./historial-carreras.jsp" class="nav-link">Historial de carreras</a>
    </nav>
    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <!-- Filtros y buscador -->
    <section class="filters">
      <div class="search-box">
        <input id="q" type="search" placeholder="Buscar por nombre o código (p. ej., VER, LEC)..." autocomplete="off" />
      </div>
      <div class="filters-grid">
        <label class="field">
          <span>Temporada</span>
          <select id="season">
            <option value="all">2024 y 2025</option>
            <option value="2024" selected>2024</option>
            <option value="2025">2025</option>
          </select>
        </label>

        <label class="field">
          <span>Equipo</span>
          <select id="team">
            <option value="all">Todos</option>
          </select>
        </label>

        <label class="field">
          <span>Ordenar por</span>
          <select id="sortBy">
            <option value="points_desc">Puntos (desc)</option>
            <option value="wins_desc">Victorias (desc)</option>
            <option value="name_asc">Nombre (A–Z)</option>
          </select>
        </label>

        <label class="field">
          <span>Mín. victorias</span>
          <input id="minWins" type="range" min="0" max="25" step="1" value="0" />
          <output id="minWinsOut">0</output>
        </label>

        <div class="field actions">
          <button id="resetBtn" class="btn outline">Limpiar</button>
          <button id="exportBtn" class="btn primary">Exportar CSV</button>
        </div>
      </div>
    </section>

    <!-- Resultados -->
    <section class="results">
      <div class="results-head">
        <h2 id="resultsTitle">Resultados</h2>
        <div class="pill" id="count">0 pilotos</div>
      </div>

      <div id="driversGrid" class="grid">
        <!-- Tarjetas generadas por JS -->
      </div>
    </section>
  </main>

  <!-- Panel lateral Detalle -->
  <aside id="detailPanel" class="detail">
    <button id="closeDetail" class="detail-close" aria-label="Cerrar">✕</button>

    <div class="detail-body">
      <div class="detail-head">
        <div>
          <h3 id="dName">—</h3>
          <h4 id="dbirthPlace"></h4>
          <h4 id="dbirthDate"></h4>
          <p class="meta" id="dSubtitle">—</p>
        </div>
      </div>

      <div class="stats">
        <div class="stat">
          <b id="dNumDriver">0</b>
          <p># Piloto</p>
        </div>
        <div class="stat">
          <b id="dPoints">0</b>
          <p>Puntos</p>
        </div>
        <div class="stat">
          <b id="dWins">0</b>
          <p>Campeonatos ganados</p>
          </div>
        <div class="stat">
          <b id="dPodiums">0</b>
          <p>Podios</p>
        </div>
        <div class="stat">
          <b id="dHighestPosition">0</b>
          <p>Pisición más alta</p>
        </div>
      </div>
    </div>
  </aside>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <script src="../JS/drivers.js"></script>
</body>

</html>

