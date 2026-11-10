/**
 * SoluciónSegura — Shared Layout Component (DRY)
 * Genera de forma declarativa e inyecta la cabecera (<header>), 
 * la barra inferior táctil (<nav>) y el pie de página (<footer>)
 * para todas las páginas de la aplicación, evitando duplicación de código.
 */

import { auth } from '../modules/auth.js';

export function setupNavigation({ activePage = 'inicio', basePath = '' } = {}) {
  const root = basePath ? basePath : '';
  const pages = basePath ? '' : 'pages/';

  // 1. INYECTAR O ACTUALIZAR HEADER INSTITUCIONAL
  let header = document.querySelector('.site-header');
  if (!header) {
    header = document.createElement('header');
    header.className = 'site-header';
    header.setAttribute('role', 'banner');
    document.body.insertAdjacentElement('afterbegin', header);
  }

  const user = auth.getCurrentUser();
  const userActionsHtml = user
    ? `
      <a href="${pages}notificaciones.html" class="icon-btn" aria-label="Notificaciones" title="Notificaciones">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="icon-btn__badge" aria-hidden="true"></span>
      </a>
      <a href="${pages}perfil.html" class="icon-btn" aria-label="Mi Perfil" title="${user.nombre}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a>
    `
    : `
      <a href="${pages}iniciar-sesion.html" class="btn btn--outline-inverse btn--sm">
        Ingresar
      </a>
    `;

  header.innerHTML = `
    <div class="container-desktop site-header__inner">
      <a href="${root}index.html" class="brand-link" aria-label="SoluciónSegura: Inicio">
        <img src="${root}assets/img/branding/logo-soluciones-segura.png" alt="SoluciónSegura: Reclamos Urbanos La Matanza" class="brand-logo-img">
      </a>

      <nav class="desktop-nav" role="navigation" aria-label="Navegación principal">
        <a href="${root}index.html" class="nav-link ${activePage === 'inicio' ? 'is-active' : ''}" data-page="inicio" ${activePage === 'inicio' ? 'aria-current="page"' : ''}>Inicio</a>
        <a href="${pages}explorar.html" class="nav-link ${activePage === 'explorar' ? 'is-active' : ''}" data-page="explorar" ${activePage === 'explorar' ? 'aria-current="page"' : ''}>Explorar</a>
        <a href="${pages}estadisticas.html" class="nav-link ${activePage === 'estadisticas' ? 'is-active' : ''}" data-page="estadisticas" ${activePage === 'estadisticas' ? 'aria-current="page"' : ''}>Estadísticas</a>
        <a href="${pages}ayuda.html" class="nav-link ${activePage === 'ayuda' ? 'is-active' : ''}" data-page="ayuda" ${activePage === 'ayuda' ? 'aria-current="page"' : ''}>Ayuda</a>
        <a href="${pages}nuevo-reclamo.html" class="btn btn--primary btn--sm js-btn-reportar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Reportar</span>
        </a>
      </nav>

      <div class="header-actions">
        ${userActionsHtml}
      </div>
    </div>
  `;

  // 2. INYECTAR O ACTUALIZAR NAVEGACIÓN MÓVIL TÁCTIL (Thumb Zone)
  let bottomNav = document.querySelector('.mobile-bottom-nav');
  if (!bottomNav) {
    bottomNav = document.createElement('nav');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.setAttribute('role', 'navigation');
    bottomNav.setAttribute('aria-label', 'Navegación inferior móvil');
    document.body.appendChild(bottomNav);
  }

  bottomNav.innerHTML = `
    <a href="${root}index.html" class="mobile-nav-item ${activePage === 'inicio' ? 'is-active' : ''}" data-page="inicio" ${activePage === 'inicio' ? 'aria-current="page"' : ''}>
      <span class="mobile-nav-item__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      </span>
      <span>Inicio</span>
    </a>
    <a href="${pages}explorar.html" class="mobile-nav-item ${activePage === 'explorar' ? 'is-active' : ''}" data-page="explorar" ${activePage === 'explorar' ? 'aria-current="page"' : ''}>
      <span class="mobile-nav-item__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </span>
      <span>Explorar</span>
    </a>
    <a href="${pages}nuevo-reclamo.html" class="mobile-nav-item js-btn-reportar ${activePage === 'reportar' ? 'is-active' : ''}" data-page="reportar" ${activePage === 'reportar' ? 'aria-current="page"' : ''}>
      <span class="mobile-nav-item__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
      </span>
      <span>Reportar</span>
    </a>
  `;

  // 3. INYECTAR O ACTUALIZAR FOOTER INSTITUCIONAL
  let footer = document.querySelector('.site-footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('role', 'contentinfo');
    document.body.appendChild(footer);
  }

  footer.innerHTML = `
    <div class="container-desktop">
      <div class="site-footer__grid">
        
        <!-- Columna 1: Identidad y Propósito -->
        <div class="site-footer__col">
          <a href="${root}index.html" class="brand-link" aria-label="SoluciónSegura: Inicio">
            <img src="${root}assets/img/branding/logo-soluciones-segura.png" alt="SoluciónSegura: Reclamos Urbanos La Matanza" class="site-footer__logo-img">
          </a>
          <p class="site-footer__desc">
            Plataforma comunitaria de reporte, visibilización y seguimiento colaborativo de reclamos urbanos para La Matanza.
          </p>
        </div>

        <!-- Columna 2: Navegación Principal -->
        <div class="site-footer__col">
          <h3 class="site-footer__heading">Navegación</h3>
          <ul class="site-footer__links" role="list">
            <li><a href="${root}index.html" class="site-footer__link">Inicio</a></li>
            <li><a href="${pages}explorar.html" class="site-footer__link">Explorar reclamos</a></li>
            <li><a href="${pages}estadisticas.html" class="site-footer__link">Estadísticas cívicas</a></li>
            <li><a href="${pages}ayuda.html" class="site-footer__link">Ayuda y preguntas frecuentes</a></li>
          </ul>
        </div>

        <!-- Columna 3: Participación Ciudadana -->
        <div class="site-footer__col">
          <h3 class="site-footer__heading">Participación</h3>
          <ul class="site-footer__links" role="list">
            <li><a href="${pages}nuevo-reclamo.html" class="site-footer__link js-btn-reportar">Realizar reclamo</a></li>
            <li><a href="${pages}mis-reclamos.html" class="site-footer__link">Mis reclamos</a></li>
            <li><a href="${pages}iniciar-sesion.html" class="site-footer__link">Iniciar sesión</a></li>
            <li><a href="${pages}perfil.html" class="site-footer__link">Mi perfil</a></li>
          </ul>
        </div>

        <!-- Columna 4: Cobertura Territorial -->
        <div class="site-footer__col">
          <h3 class="site-footer__heading">Cobertura Territorial</h3>
          <p style="font-size: var(--font-size-xs); color: #94A3B8; margin-bottom: var(--space-3);">
            Partido de La Matanza (16 localidades):
          </p>
          <div class="site-footer__locations" aria-label="Localidades comprendidas">
            <span class="site-footer__loc-tag">San Justo</span>
            <span class="site-footer__loc-tag">Ramos Mejía</span>
            <span class="site-footer__loc-tag">Isidro Casanova</span>
            <span class="site-footer__loc-tag">Laferrere</span>
            <span class="site-footer__loc-tag">González Catán</span>
            <span class="site-footer__loc-tag">Ciudad Evita</span>
            <span class="site-footer__loc-tag">Virrey del Pino</span>
            <span class="site-footer__loc-tag">Villa Luzuriaga</span>
            <span class="site-footer__loc-tag site-footer__loc-tag--more">+8 localidades</span>
          </div>
        </div>

      </div>

      <!-- Barra Inferior -->
      <div class="site-footer__bottom">
        <p class="site-footer__disclaimer">
          SoluciónSegura es una iniciativa ciudadana independiente de gestión de reclamos urbanos barriales orientada a visibilizar incidencias y fortalecer el seguimiento colaborativo en La Matanza.
        </p>
        <p class="site-footer__copy">
          © 2026 SoluciónSegura. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;

  // 4. INTERCEPTOR ACCIONES DE REPORTE: Comprobar sesión en enlaces con clase .js-btn-reportar
  document.querySelectorAll('.js-btn-reportar').forEach(btn => {
    if (btn.dataset.authBound) return;
    btn.dataset.authBound = 'true';

    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href) return;
      e.preventDefault();

      const targetUrl = new URL(href, window.location.href).href;
      if (auth.isLoggedIn()) {
        window.location.href = targetUrl;
      } else {
        auth.setRedirectUrl(targetUrl);
        window.location.href = `${pages}iniciar-sesion.html?redirect=${encodeURIComponent(targetUrl)}`;
      }
    });
  });
}

