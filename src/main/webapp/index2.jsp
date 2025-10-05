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
        <!-- Mini logo SVG (ligero y escalable) -->
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
      <a href="#" class="nav-link is-active">Dashboard</a>
      <a href="PAGES/calendario.html" class="nav-link">Calendario</a>
      <a href="./PAGES/drivers.html" class="nav-link">Pilotos</a>
      <a href="PAGES/constructors.html" class="nav-link">Constructores</a>
      <a href="./PAGES/circuits.html" class="nav-link">Circuito</a>
      <a href="./PAGES/standings.html" class="nav-link">Rankings</a>
      <a href="./PAGES/estadisticas.html" class="nav-link">Estadísticas</a>
      <a href="./PAGES/consultas.html" class="nav-link is-active">Consultas 2025</a>
      <a href="./PAGES/admin.html" class="nav-link is-active">Resultados/Predicciones</a>
    </nav>

    <button id="themeToggle" class="theme-toggle" aria-label="Cambiar tema">🌓</button>
  </header>

  <main class="container">
    <!-- Próximo GP / Hero -->
    <section class="hero" id="nextGP" aria-live="polite">
      <div class="hero-left">
        <h2>Próximo Gran Premio</h2>
        <p class="gp-title" id="nextGpTitle">Cargando…</p>
        <p class="gp-meta" id="nextGpMeta">—</p>
        <div class="countdown" id="countdown">
          <div class="cd-item"><span id="cdDays">--</span><label>Días</label></div>
          <div class="cd-item"><span id="cdHours">--</span><label>Horas</label></div>
          <div class="cd-item"><span id="cdMinutes">--</span><label>Min</label></div>
          <div class="cd-item"><span id="cdSeconds">--</span><label>Seg</label></div>
        </div>
        <a href="#calendar" class="btn btn-primary">Ver calendario</a>
      </div>
      <div class="hero-right">
        <div class="hero-card">
          <h3>Pista</h3>
          <p id="nextGpCircuit">—</p>
          <div class="tag" id="nextGpFlag">🏁</div>
        </div>
        <div class="hero-card">
          <h3>Sesión</h3>
          <ul class="session-list" id="nextGpSessions">
            <!-- Se completa por JS -->
          </ul>
        </div>
      </div>
    </section>

    <!-- Grid Resumen -->
    <section class="grid">
      <!-- Próximos GP -->
      <article class="card" id="calendar">
        <div class="card-header">
          <h3>Próximos GP</h3>
          <a href="#calendar" class="link">Ver todo →</a>
        </div>
        <ul class="list" id="upcomingGps">
          <!-- JS -->
        </ul>
      </article>

      <!-- Top 3 Pilotos -->
      <article class="card" id="drivers">
        <div class="card-header">
          <h3>Top 3 Pilotos</h3>
          <a href="#drivers" class="link">Ver clasificación →</a>
        </div>
        <div class="standings" id="topDrivers">
          <!-- JS -->
        </div>
      </article>

      <!-- Top 3 Constructores -->
      <article class="card" id="constructors">
        <div class="card-header">
          <h3>Top 3 Constructores</h3>
          <a href="#constructors" class="link">Ver clasificación →</a>
        </div>
        <div class="standings" id="topConstructors">
          <!-- JS -->
        </div>
      </article>

      <!-- Accesos rápidos -->
      <article class="card quick-links">
        <div class="card-header">
          <h3>Accesos rápidos</h3>
        </div>
        <div class="link-grid">
          <a class="quick" href="#calendar">
            <span>🗓️</span>
            <b>Calendario</b>
            <small>Fechas & circuitos</small>
          </a>
          <a class="quick" href="#drivers">
            <span>🏁</span>
            <b>Pilotos</b>
            <small>Perfil & stats</small>
          </a>
          <a class="quick" href="#constructors">
            <span>🛠️</span>
            <b>Constructores</b>
            <small>Rendimiento</small>
          </a>
          <a class="quick" href="#stats">
            <span>📊</span>
            <b>Estadísticas</b>
            <small>Comparativas</small>
          </a>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <small>Hecho con ❤️ para fans de la F1. Datos de ejemplo para demo.</small>
  </footer>

  <script src="JS/app.js"></script>
</body>
</html>

