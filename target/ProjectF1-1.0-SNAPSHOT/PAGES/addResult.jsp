<%-- 
    Document   : addResult
    Created on : 25/10/2025, 11:36:11 a. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ingresar resultado o predicción</title>

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../CSS/add-result.css" />
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
        <h1>Ingreso de resultados</h1>
        <p class="subtitle">Ingresa resultados o predicciones</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index.jsp" class="nav-link">Dashboard</a>
      <a href="./pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./circuitos.jsp" class="nav-link">Circuitos</a>
      <a href="./posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./historial-carreras.jsp" class="nav-link">Historial de carreras</a>
      <a href="./addResult.jsp" class="nav-link is-active">Añadir resultado</a>
    </nav>
  </header>

  <main class="container">
    <!-- Formulario -->
    <section class="card">
      <h2>Formulario de ingreso</h2>
      <form id="formResult" class="form-grid">
        <label class="field">
          <span>Temporada</span>
          <input
            name="season"
            id="seasonInput"
            type="number"
            min="2025"
            max="2025"
            value="2025"
            disabled
            required
          />
        </label>

        <label class="field">
          <span>Circuito</span>
          <select name="raceCircuit" id="raceCircuit" required></select>
        </label>

        <label class="field">
          <span>Fecha de la carrera</span>
          <input
            name="date"
            id="raceDate"
            type="date"
            required
          />
        </label>

        <label class="field">
          <span>Posición</span>
          <input
            name="pos"
            id="position"
            type="number"
            min="1"
            max="20"
            required
          />
        </label>

        <label class="field">
          <span>Posición parrilla de salida</span>
          <input
            name="grid"
            id="gridPosition"
            type="number"
            min="1"
            max="20"
            required
          />
        </label>

        <label class="field">
          <span>Piloto</span>
          <select name="driver" id="driver" required></select>
        </label>

        <label class="field">
          <span>Escudería</span>
          <select name="team" id="team" disabled required></select>
        </label>

        <label class="field">
          <span>Puntos</span>
          <input
            name="points"
            id="points"
            type="number"
            min="0"
            step="0.5"
            max="34"
            required
          />
        </label>

        <label class="field">
          <span>Vueltas</span>
          <input
            name="laps"
            id="laps"
            type="number"
            min="1"
            max="78"
            required
          />
        </label>

        <label class="field">
          <span>Tiempo de carrera (hh:mm:ss.mmm)</span>
          <input
            name="raceTime"
            id="raceTime"
            type="text"
            placeholder="Ejm: 01:32:14.824"
            required
          />
        </label>

        <label class="field">
          <span>Mejor tiempo (mm:ss.mmm)</span>
          <input
            name="bestLap"
            id="bestLap"
            type="text"
            placeholder="Ejm: 01:20.123"
            required
          />
        </label>

        <div class="gate">
          <span>Fecha de congelación <span id="frozenDate"></span></span>
          <b id="gateState">—</b>
        </div>

        <div class="form-actions">
          <button type="reset" class="btn outline">Limpiar</button>
          <button id="saveBtn" type="button" class="btn" disabled>Guardar</button>
        </div>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <div id="toast" class="toast hidden" role="status" aria-live="polite"></div>

  <script src="../JS/add-result.js"></script>
</body>

</html>
