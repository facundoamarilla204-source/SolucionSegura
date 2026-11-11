/**
 * SoluciónSegura — Shared Layout Component (DRY)
 * Genera de forma declarativa e inyecta la cabecera (<header>), 
 * la barra inferior táctil (<nav>) y el pie de página (<footer>)
 * para todas las páginas de la aplicación, evitando duplicación de código.
 */

import { auth } from '../modules/auth.js';
import { notificationsService } from '../modules/notifications.js';
import { formatters } from '../utils/formatters.js';

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
  const unreadCount = user ? notificationsService.getUnreadCount(user.id) : 0;
  const badgeText = unreadCount > 9 ? '9+' : String(unreadCount);
  const bellAriaLabel = unreadCount > 0
    ? `Notificaciones: ${unreadCount} ${unreadCount === 1 ? 'aviso no leído' : 'avisos no leídos'}`
    : 'Notificaciones: sin avisos pendientes';

  const userActionsHtml = user
    ? `
      <div class="notifications-menu-wrapper">
        <button type="button" class="icon-btn header-notification-btn" id="notif-bell-btn" aria-haspopup="dialog" aria-expanded="false" aria-label="${bellAriaLabel}" title="Notificaciones">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notif-badge" id="notif-bell-badge" aria-hidden="true" style="${unreadCount > 0 ? '' : 'display: none;'}">${badgeText}</span>
        </button>

        <div class="notifications-dropdown" id="notif-dropdown" role="region" aria-label="Avisos recientes" hidden>
          <div class="notif-dropdown__header">
            <div class="notif-dropdown__title-wrap">
              <span class="notif-dropdown__title">Notificaciones</span>
              <span class="notif-dropdown__pill" id="notif-dropdown-unread-pill" style="${unreadCount > 0 ? '' : 'display: none;'}">${unreadCount} ${unreadCount === 1 ? 'nueva' : 'nuevas'}</span>
            </div>
            <button type="button" class="notif-dropdown__mark-all js-notif-mark-all" id="notif-dropdown-mark-all" ${unreadCount === 0 ? 'disabled' : ''}>
              Marcar leídas
            </button>
          </div>

          <div class="notif-dropdown__body" id="notif-dropdown-list" role="list">
            <!-- Items generados dinámicamente -->
          </div>

          <div class="notif-dropdown__footer">
            <a href="${pages}notificaciones.html" class="notif-dropdown__view-all" id="notif-view-all-link">
              <span>Ver todas las notificaciones</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="user-menu-wrapper">
        <button type="button" class="icon-btn user-menu-trigger" id="user-menu-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Menú de cuenta: ${user.nombre}" title="${user.nombre}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <div class="user-menu-dropdown" id="user-menu-dropdown" role="menu" aria-labelledby="user-menu-btn" hidden>
          <div class="user-menu-header">
            <span class="user-menu-name">${user.nombre}</span>
            <span class="user-menu-email">${user.email}</span>
          </div>
          <hr class="user-menu-divider" role="separator">
          <a href="${pages}mis-reclamos.html" class="user-menu-item ${activePage === 'mis-reclamos' ? 'is-active' : ''}" role="menuitem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Mis reclamos</span>
          </a>
          <a href="${pages}perfil.html" class="user-menu-item ${activePage === 'perfil' ? 'is-active' : ''}" role="menuitem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mi perfil</span>
          </a>
          <a href="${pages}estadisticas.html" class="user-menu-item ${activePage === 'estadisticas' ? 'is-active' : ''}" role="menuitem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span>Estadísticas</span>
          </a>
          <a href="${pages}ayuda.html" class="user-menu-item ${activePage === 'ayuda' ? 'is-active' : ''}" role="menuitem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Ayuda</span>
          </a>
          <hr class="user-menu-divider" role="separator">
          <button type="button" class="user-menu-item user-menu-item--danger js-logout-action" role="menuitem">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
      <a href="${pages}nuevo-reclamo.html" class="btn btn--primary btn-header-cta js-btn-reportar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Realizar reclamo</span>
      </a>
    `
    : `
      <a href="${pages}iniciar-sesion.html" class="btn btn-header-login" id="btn-header-login">
        Ingresar
      </a>
      <a href="${pages}nuevo-reclamo.html" class="btn btn--primary btn-header-cta js-btn-reportar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Realizar reclamo</span>
      </a>
    `;

  header.innerHTML = `
    <div class="container-desktop site-header__inner">
      <div class="header-zone header-zone--brand">
        <a href="${root}index.html" class="brand-link" aria-label="SoluciónSegura: Inicio">
          <img src="${root}assets/img/branding/logo-soluciones-segura.png" alt="SoluciónSegura: Reclamos Urbanos La Matanza" class="brand-logo-img">
        </a>
      </div>

      <nav class="desktop-nav header-zone header-zone--nav" role="navigation" aria-label="Navegación principal">
        <a href="${root}index.html" class="nav-link ${activePage === 'inicio' ? 'is-active' : ''}" data-page="inicio" ${activePage === 'inicio' ? 'aria-current="page"' : ''}>Inicio</a>
        <a href="${pages}explorar.html" class="nav-link ${activePage === 'explorar' ? 'is-active' : ''}" data-page="explorar" ${activePage === 'explorar' ? 'aria-current="page"' : ''}>Explorar</a>
        <a href="${pages}estadisticas.html" class="nav-link ${activePage === 'estadisticas' ? 'is-active' : ''}" data-page="estadisticas" ${activePage === 'estadisticas' ? 'aria-current="page"' : ''}>Estadísticas</a>
        <a href="${pages}ayuda.html" class="nav-link ${activePage === 'ayuda' ? 'is-active' : ''}" data-page="ayuda" ${activePage === 'ayuda' ? 'aria-current="page"' : ''}>Ayuda</a>
      </nav>

      <div class="header-actions header-zone header-zone--actions">
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

  // 5. INTERACTIVIDAD DEL MENÚ CONTEXTUAL DE PERFIL Y DEL PANEL DE NOTIFICACIONES
  let closeMenuFn = null;
  let closeNotifDropdownFn = null;

  const menuBtn = header.querySelector('#user-menu-btn');
  const menuDropdown = header.querySelector('#user-menu-dropdown');

  if (menuBtn && menuDropdown) {
    const menuItems = Array.from(menuDropdown.querySelectorAll('[role="menuitem"]'));

    const openMenu = () => {
      if (typeof closeNotifDropdownFn === 'function') {
        closeNotifDropdownFn();
      }
      menuDropdown.removeAttribute('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.classList.add('is-active');
    };

    const closeMenu = (returnFocus = false) => {
      menuDropdown.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.classList.remove('is-active');
      if (returnFocus) {
        menuBtn.focus();
      }
    };
    closeMenuFn = closeMenu;

    const toggleMenu = () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    menuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
        if (menuItems.length > 0) {
          menuItems[0].focus();
        }
      } else if (e.key === 'Escape') {
        closeMenu(true);
      }
    });

    menuDropdown.addEventListener('keydown', (e) => {
      const currentIndex = menuItems.indexOf(document.activeElement);

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (menuItems.length > 0) menuItems[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        if (menuItems.length > 0) menuItems[menuItems.length - 1].focus();
      } else if (e.key === 'Tab') {
        closeMenu();
      }
    });

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        closeMenu();
      }
    });

    const logoutBtn = menuDropdown.querySelector('.js-logout-action');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.logout();
        closeMenu();
        const currentPath = window.location.pathname.toLowerCase();
        if (currentPath.includes('mis-reclamos') || currentPath.includes('perfil') || currentPath.includes('detalle-reclamo') || currentPath.includes('nuevo-reclamo') || currentPath.includes('notificaciones')) {
          window.location.href = `${root}index.html`;
        } else {
          setupNavigation({ activePage, basePath });
        }
      });
    }
  }

  // 6. INTERACTIVIDAD DEL PANEL DESPLEGABLE DE NOTIFICACIONES (Campana en Navbar)
  const notifBtn = header.querySelector('#notif-bell-btn');
  const notifDropdown = header.querySelector('#notif-dropdown');
  const notifBadge = header.querySelector('#notif-bell-badge');
  const notifList = header.querySelector('#notif-dropdown-list');
  const notifPill = header.querySelector('#notif-dropdown-unread-pill');
  const notifMarkAllBtn = header.querySelector('#notif-dropdown-mark-all');

  if (notifBtn && notifDropdown && user) {
    const renderDropdownContent = () => {
      const unread = notificationsService.getUnreadCount(user.id);
      const recent = notificationsService.getRecent(user.id, 5);

      // 1. Actualizar Badge en la Campana
      if (notifBadge) {
        if (unread > 0) {
          notifBadge.style.display = '';
          notifBadge.textContent = unread > 9 ? '9+' : String(unread);
        } else {
          notifBadge.style.display = 'none';
          notifBadge.textContent = '0';
        }
      }

      // 2. Actualizar atributo accesible en el botón
      const ariaLabel = unread > 0
        ? `Notificaciones: ${unread} ${unread === 1 ? 'aviso no leído' : 'avisos no leídos'}`
        : 'Notificaciones: sin avisos pendientes';
      notifBtn.setAttribute('aria-label', ariaLabel);

      // 3. Actualizar Pill de No Leídas en cabecera del panel
      if (notifPill) {
        if (unread > 0) {
          notifPill.style.display = '';
          notifPill.textContent = `${unread} ${unread === 1 ? 'nueva' : 'nuevas'}`;
        } else {
          notifPill.style.display = 'none';
        }
      }

      // 4. Actualizar botón "Marcar leídas"
      if (notifMarkAllBtn) {
        notifMarkAllBtn.disabled = unread === 0;
      }

      // 5. Renderizar lista de notificaciones recientes
      if (!notifList) return;

      if (!recent || recent.length === 0) {
        notifList.innerHTML = `
          <div class="notif-dropdown__empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <p>No tenés notificaciones</p>
            <span>Los avisos sobre tus reclamos y participación aparecerán acá.</span>
          </div>
        `;
        return;
      }

      notifList.innerHTML = recent.map(n => {
        const timeAgo = formatters.relativeDate(n.fecha);
        const unreadClass = n.leida ? 'is-read' : 'is-unread';
        const unreadAria = n.leida ? 'Leída' : 'No leída';
        const claimBadge = n.claimId ? `<span style="font-size: 10px; font-weight: 700; color: var(--color-brand-sky); margin-left: 4px;">#${n.claimId}</span>` : '';

        return `
          <div class="notif-dropdown__item ${unreadClass}" role="listitem" tabindex="0" data-notif-id="${n.id}" data-claim-id="${n.claimId || ''}" aria-label="${n.titulo} — ${unreadAria}">
            <div class="notif-dropdown__item-indicator" aria-hidden="true"></div>
            <div class="notif-dropdown__item-content">
              <div class="notif-dropdown__item-header">
                <h4 class="notif-dropdown__item-title">
                  ${n.titulo}
                </h4>
                <time class="notif-dropdown__item-time">${timeAgo}</time>
              </div>
              <p class="notif-dropdown__item-text">${n.mensaje}</p>
            </div>
          </div>
        `;
      }).join('');

      // Enlazar clics en items
      notifList.querySelectorAll('.notif-dropdown__item').forEach(itemEl => {
        const notifId = itemEl.dataset.notifId;
        const claimId = itemEl.dataset.claimId;

        const handleSelect = (e) => {
          e.preventDefault();
          notificationsService.markAsRead(notifId);
          closeNotifDropdown();

          if (claimId) {
            window.location.href = `${pages}detalle-reclamo.html?id=${encodeURIComponent(claimId)}&from=notificaciones`;
          } else {
            renderDropdownContent();
          }
        };

        itemEl.addEventListener('click', handleSelect);
        itemEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSelect(e);
          }
        });
      });
    };

    const openNotifDropdown = () => {
      if (typeof closeMenuFn === 'function') {
        closeMenuFn();
      }
      renderDropdownContent();
      notifDropdown.removeAttribute('hidden');
      notifBtn.setAttribute('aria-expanded', 'true');
      notifBtn.classList.add('is-active');

      // Foco accesible al primer item interactivo
      const firstItem = notifDropdown.querySelector('.notif-dropdown__item, .notif-dropdown__mark-all, .notif-dropdown__view-all');
      if (firstItem) {
        firstItem.focus();
      }
    };

    const closeNotifDropdown = (returnFocus = false) => {
      notifDropdown.setAttribute('hidden', '');
      notifBtn.setAttribute('aria-expanded', 'false');
      notifBtn.classList.remove('is-active');
      if (returnFocus) {
        notifBtn.focus();
      }
    };
    closeNotifDropdownFn = closeNotifDropdown;

    const toggleNotifDropdown = () => {
      const isExpanded = notifBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeNotifDropdown();
      } else {
        openNotifDropdown();
      }
    };

    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNotifDropdown();
    });

    notifBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openNotifDropdown();
      } else if (e.key === 'Escape') {
        closeNotifDropdown(true);
      }
    });

    notifDropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeNotifDropdown(true);
      }
    });

    // Clic en "Marcar todas como leídas" dentro del dropdown
    if (notifMarkAllBtn) {
      notifMarkAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsService.markAllAsRead(user.id);
        renderDropdownContent();
      });
    }

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        closeNotifDropdown();
      }
    });

    // Render inicial del contenido y badge
    renderDropdownContent();

    // Sincronización reactiva ante cambios en almacenamiento o eventos
    window.addEventListener('notifications:updated', renderDropdownContent);
    window.addEventListener('storage:updated', (e) => {
      if (e.detail && (e.detail.key === 'solucionsegura_notificaciones' || e.detail.key === 'solucionsegura_current_user')) {
        renderDropdownContent();
      }
    });
  }
}

