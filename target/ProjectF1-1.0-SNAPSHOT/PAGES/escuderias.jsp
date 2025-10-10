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
  <title>F1 – Escuderías</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/constructors.css" />
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
        <h1>Escuderías</h1>
        <p class="subtitle">CU2 – Consultar escuderías (2024/2025)</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index2.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link is-active">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link">Circuitos</a>
      <!-- <a href="./carreras.jsp" class="nav-link">Carreras</a> -->
      <a href="./posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./historial-carreras.jsp" class="nav-link">Historial de carreras</a>
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
            <option value="2024" selected>2024</option>
            <option value="2025">2025</option>
          </select>
        </label>

        <label class="field">
          <span>Unidad de Potencia</span>
          <select id="powerUnit">
            <option value="all">Todas</option>
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
        <div>
          <h3 id="tName">—</h3>
          <p class="meta" id="tSubtitle">—</p>
        </div>
      </div>

      <!-- <div class="section">
        <h4>Plantilla de Pilotos</h4>
        <ul id="tDrivers" class="list"></ul>
      </div> -->

      <div class="section">
        <h4>Información del equipo</h4>
        <table class="table">
          <tbody>
            <tr>
              <th>Director técnico</th>
              <td id="tTechnicalBoss">—</td>
            </tr>
            <tr>
              <th>Director de equipo</th>
              <td id="tTeamBoss">—</td>
            </tr>
            <tr>
              <th>Base</th>
              <td id="tBase">—</td>
            </tr>
            <tr>
              <th>Unidad de potencia</th>
              <td id="tUnitPower">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </aside>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <script src="../JS/constructors.js"></script>
</body>

</html>
