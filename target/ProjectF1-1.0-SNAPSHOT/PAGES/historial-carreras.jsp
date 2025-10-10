<%-- 
    Document   : historial-carreras
    Created on : 5/10/2025, 6:09:48 p. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 – Historial de carreras</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/consultas.css" />
</head>

<body>
  <header class="site-header">
    <div class="brand">
      <a class="logo" href="index.html" aria-label="Volver al Dashboard">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40h26l8-16h18l-8 16h-8l-8 16H8z" />
        </svg>
      </a>

      <div class="titles">
        <h1>Historial de carreras</h1>
        <p class="subtitle">CU6 – Filtros por carrera, piloto, escudería • Históricos & Predicciones</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link">Circuitos</a>
      <a href="./posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./historial-carreras.jsp" class="nav-link is-active">Historial de carreras</a>
    </nav>

    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <!-- Filtros -->
    <section class="filters">
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
          <span>Carrera</span>
          <select id="fRace">
            <option value="all">Todas</option>
          </select>
        </label>

        <label class="field">
          <span>Piloto</span>
          <select id="fDriver">
            <option value="all">Todos</option>
          </select>
        </label>

        <label class="field">
          <span>Escudería</span>
          <select id="fTeam">
            <option value="all">Todas</option>
          </select>
        </label>

        <label class="field">
          <span>Ordenar</span>
          <select id="fSort">
            <option value="pos_asc">Posición (asc)</option>
            <option value="points_desc">Puntos (desc)</option>
            <option value="name_asc">Piloto (A–Z)</option>
            <option value="team_asc">Escudería (A–Z)</option>
            <option value="bestTime_asc">Mejor tiempo (asc)</option>
          </select>
        </label>

        <div class="field actions">
          <button id="btnReset" class="btn outline">Limpiar</button>
          <button id="btnCSV" class="btn primary">Exportar CSV</button>
        </div>
      </div>

      <!--
      <div class="hint">
        <small>
          Consejo: para ver **predicciones**, selecciona un <b>piloto</b> o una <b>escudería</b>.
          La tablita muestra históricos (2024/2025), las gráficas mezclan histórico + forecast 2025.
        </small>
       -->
      </div>
    </section>

    <!-- Resumen -->
    <section class="summary">
      <div class="kpi"><b id="kCount">0</b><span>Resultados</span></div>
      <div class="kpi"><b id="kPts">0</b><span>Puntos totales</span></div>
      <div class="kpi"><b id="kAvg">0.0</b><span>Puntos promedio</span></div>
      <div class="kpi"><b id="kWins">0</b><span>Victorias</span></div>
    </section>

    <!-- Tabla histórica -->
    <section class="results">
      <div class="results-head">
        <h2>Resultados históricos</h2>
        <div class="pill" id="rCount">0</div>
      </div>

      <table class="table" id="tblResults">
        <thead>
          <tr>
            <th>Temporada</th>
            <th>Carrera</th>
            <th>Posición</th>
            <th>Posición parrila salida</th>
            <th>Piloto</th>
            <th>Escudería</th>
            <th>Puntos</th>
            <th>Vueltas</th>
            <th>Tiempo de Carrera</th>
            <th>Mejor tiempo</th>
          </tr>
        </thead>
        <tbody><!-- JS --></tbody>
      </table>
    </section>

    <!-- Visualización -->
    <section class="viz" style="display: none;">
      <div class="viz-head">
        <h2>Visualización de predicciones</h2>
        <div class="pill" id="vizTarget">—</div>
      </div>

      <div class="charts">
        <div class="chart">
          <h4>Historia vs Predicción de puntos por GP</h4>
          <canvas id="chartSeries" height="140"></canvas>
        </div>

        <div class="chart">
          <h4>Probabilidad de posición – Próximo GP filtrado</h4>
          <canvas id="chartProbs" height="140"></canvas>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <!-- Chart.js CDN (para las gráficas) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="../JS/historialCarreras.js"></script>
</body>

</html>
