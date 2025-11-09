<%-- 
    Document   : index2
    Created on : 5/10/2025, 6:02:10 p. m.
    Author     : niroc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es-CO">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>F1 Dashboard</title>

  <!-- Fuente limpia y pro -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="./CSS/style.css" />
</head>

<body>
  <header class="site-header">
    <div class="brand">
      <div class="logo">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40h26l8-16h18l-8 16h-8l-8 16H8z" />
        </svg>
      </div>
      <div class="titles">
        <h1>F1 Dashboard</h1>
        <p class="subtitle">Resumen rápido de la temporada</p>
      </div>
    </div>

    <nav class="main-nav" aria-label="Secciones principales">
      <a href="../index.jsp" class="nav-link is-active">Dashboard</a>
      <a href="./PAGES/pilotos.jsp" class="nav-link">Pilotos</a>
      <a href="./PAGES/escuderias.jsp" class="nav-link">Escuderías</a>
      <a href="./PAGES/circuitos.jsp" class="nav-link">Circuitos</a>
      <a href="./PAGES/posicionConstructor.jsp" class="nav-link">Posicion constructor</a>
      <a href="./PAGES/historial-carreras.jsp" class="nav-link">Historial de carreras</a>
      <a href="./PAGES/addResult.jsp" class="nav-link">Añadir resultado</a>
    </nav>

    <!-- <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button> -->
  </header>

  <main class="container">
    <!-- Grid Resumen -->
    <section class="grid">
      <!-- Accesos rápidos -->
      <article class="card quick-links">
        <div class="card-header">
          <h3>Accesos rápidos</h3>
        </div>
        <div class="link-grid">
          <a class="quick" href="./PAGES/pilotos.jsp">
            <span>🏁</span>
            <b>Pilotos</b>
            <small>Info & stats</small>
          </a>
          <a class="quick" href="./PAGES/escuderias.jsp">
            <span>🛠️</span>
            <b>Escuderías</b>
            <small>Info</small>
          </a>
          <a class="quick" href="./PAGES/historial-carreras.jsp">
            <span>📊</span>
            <b>Historial</b>
            <small>Comparativas</small>
          </a>
        </div>
      </article>

      <!-- Top 3 Pilotos -->
      <article class="card" id="drivers">
        <div class="card-header">
          <h3>Top 3 Pilotos</h3>
          <a href="./PAGES/pilotos.jsp" class="link">Ver más →</a>
        </div>
        <div class="standings" id="topDrivers">
          <!-- JS -->
        </div>
      </article>

      <!-- Top 3 Constructores -->
      <article class="card" id="constructors">
        <div class="card-header">
          <h3>Top 3 Constructores</h3>
          <a href="./PAGES/posicionConstructor.jsp" class="link">Ver clasificación →</a>
        </div>
        <div class="standings" id="topConstructors">
          <!-- JS -->
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <small>Hecho con ❤️ • UCompensar</small>
  </footer>

  <script src="JS/app.js"></script>
</body>

</html>