<%-- 
    Document   : constructores
    Created on : 5/10/2025, 6:08:15 p. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 – Constructores</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/constructors.css" />
</head>
<body>
  <header class="site-header">
    <div class="brand">
      <a class="logo" href="index.html" aria-label="Volver al Dashboard">
        <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 40h26l8-16h18l-8 16h-8l-8 16H8z"/></svg>
      </a>
      <div class="titles">
        <h1>Constructores</h1>
        <p class="subtitle">CU2 – Consultar escuderías (2024/2025)</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index.html" class="nav-link is-active">Dashboard</a>
      <a href="#calendar" class="nav-link">Calendario</a>
      <a href="../PAGES/drivers.html" class="nav-link">Pilotos</a>
      <a href="../PAGES/constructors.html" class="nav-link">Constructores</a>
      <a href="../PAGES/circuits.html" class="nav-link">Circuito</a>
      <a href="../PAGES/standings.html" class="nav-link">Rankings</a>
      <a href="" class="nav-link">Estadísticas</a>
    </nav>
    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <!-- Filtros -->
    <section class="filters">
      <div class="search-box">
        <input id="q" type="search" placeholder="Buscar por nombre o motor..." autocomplete="off" />
      </div>
      <div class="filters-grid">
        <label class="field">
          <span>Temporada</span>
          <select id="season">
            <option value="all">2024 y 2025</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </label>

        <label class="field">
          <span>País</span>
          <select id="country">
            <option value="all">Todos</option>
          </select>
        </label>

        <label class="field">
          <span>Unidad de Potencia</span>
          <select id="powerUnit">
            <option value="all">Todas</option>
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

        <div class="field actions">
          <button id="resetBtn" class="btn outline">Limpiar</button>
          <button id="exportBtn" class="btn primary">Exportar CSV</button>
        </div>
      </div>
    </section>

    <!-- Resultados -->
    <section class="results">
      <div class="results-head">
        <h2>Escuderías</h2>
        <div class="pill" id="count">0</div>
      </div>

      <div id="teamsGrid" class="grid">
        <!-- Tarjetas por JS -->
      </div>
    </section>
  </main>

  <!-- Panel detalle -->
  <aside id="detailPanel" class="detail">
    <button id="closeDetail" class="detail-close" aria-label="Cerrar">✕</button>
    <div class="detail-body">
      <div class="detail-head">
        <img id="tLogo" alt="" />
        <div>
          <h3 id="tName">—</h3>
          <p class="meta" id="tSubtitle">—</p>
        </div>
      </div>

      <div class="stats">
        <div class="stat"><b id="tPoints">0</b><span>Puntos</span></div>
        <div class="stat"><b id="tWins">0</b><span>Victorias</span></div>
        <div class="stat"><b id="tPodiums">0</b><span>Podios</span></div>
      </div>

      <div class="section">
        <h4>Plantilla de Pilotos</h4>
        <ul id="tDrivers" class="list"></ul>
      </div>

      <div class="section">
        <h4>Información del equipo</h4>
        <table class="table">
          <tbody>
            <tr><th>Motor</th><td id="tPowerUnit">—</td></tr>
            <tr><th>País</th><td id="tCountry">—</td></tr>
            <tr><th>Director</th><td id="tPrincipal">—</td></tr>
            <tr><th>Fundación</th><td id="tFounded">—</td></tr>
            <tr><th>Monoplaza</th><td id="tCar">—</td></tr>
            <tr><th>Base</th><td id="tBase">—</td></tr>
            <tr><th>Website</th><td><a id="tSite" href="#" target="_blank" rel="noopener">—</a></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </aside>

  <footer class="site-footer">
    <small>Hecho con ❤️ • Datos de ejemplo (2024/2025)</small>
  </footer>

  <script src="../JS/constructors.js"></script>
</body>
</html>
