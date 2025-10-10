<%-- 
    Document   : carreras
    Created on : 10/10/2025, 8:16:49 a. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 – Carreras</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/carreras.css" />
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
        <h1>Carreras</h1>
        <p class="subtitle">Listado de carreras</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index2.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link">Circuitos</a>
      <!-- <a href="./carreras.jsp" class="nav-link is-active">Carreras</a> -->
      <a href="./posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./historial-carreras.jsp" class="nav-link">Historial de carreras</a>
    </nav>

    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <section class="controls">
      <div class="filters">
        <label class="field">
          The<span>Buscar</span>
          <input id="q" type="search" placeholder="Buscar circuito..." autocomplete="off" />
        </label>
        <label class="field">
          <span>Ordenar</span>
          <select id="sort">
            <option value="no_asc">No. (asc)</option>
            <option value="name_asc">Circuito (A–Z)</option>
          </select>
        </label>
        <div class="field actions">
          <button id="resetBtn" class="btn outline">Limpiar</button>
          <button id="csvBtn" class="btn primary">Exportar CSV</button>
        </div>
      </div>
      <div class="results-head">
        <div class="pill" id="count">0 filas</div>
      </div>
    </section>

    <section class="table-wrap">
      <table class="table" id="tbl">
        <thead>
          <tr>
            <th>No.</th>
            <th>Temporada</th>
            <th>Circuito</th>
          </tr>
        </thead>
        <tbody><!-- JS --></tbody>
      </table>
    </section>
  </main>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <script src="../JS/carreras.js"></script>
</body>

</html>

