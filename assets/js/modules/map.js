/**
 * SoluciónSegura — Módulo de Mapas Reutilizable (Leaflet & OpenStreetMap)
 * Configuración centralizada para la Home, Explorar y Nuevo Reclamo.
 * Maqueta académica de La Matanza.
 */

import { LOCALIDADES_LA_MATANZA, MAPA_CONFIG } from '../data/localidades.js';
import { formatters } from '../utils/formatters.js';

/**
 * SVGs de categorías para los marcadores del mapa
 */
const CATEGORY_ICONS_SVG = {
  pavimento: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20L8 4h8l4 16"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="11" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="19"/></svg>`,
  residuos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M5 6l1.2 13.2A2 2 0 0 0 8.2 21h7.6a2 2 0 0 0 2-1.8L19 6"/><line x1="10" y1="11" x2="10" y2="16"/><line x1="14" y1="11" x2="14" y2="16"/></svg>`,
  alumbrado: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 21V5a3 3 0 0 1 3-3h7a2 2 0 0 1 2 2v3"/><path d="M15 7h6l-1.5 5h-3z"/><line x1="15" y1="15" x2="13" y2="19"/><line x1="18" y1="15" x2="18" y2="20"/><line x1="21" y1="15" x2="23" y2="19"/></svg>`
};

/**
 * Crea un icono de marcador personalizado para Leaflet
 */
export function createCategoryIcon(categoria, titulo = '') {
  if (typeof L === 'undefined') return null;

  const svgIcon = CATEGORY_ICONS_SVG[categoria] || CATEGORY_ICONS_SVG.pavimento;
  const catLabel = formatters.categoryLabel(categoria);

  return L.divIcon({
    className: `custom-map-pin custom-map-pin--${categoria}`,
    html: `
      <div class="pin-marker" title="${catLabel}: ${titulo}" role="button" aria-label="Reclamo de ${catLabel}">
        <div class="pin-marker__body">
          ${svgIcon}
        </div>
        <div class="pin-marker__tip" aria-hidden="true"></div>
      </div>
    `,
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42]
  });
}

/**
 * Genera el HTML de la ficha compacta para el Popup de Leaflet
 */
export function createClaimPopupHtml(claim, basePath = '') {
  const catLabel = formatters.categoryLabel(claim.categoria);
  const stateLabel = formatters.stateLabel(claim.estado);
  const dateFormatted = formatters.relativeDate(claim.fecha);
  const countVecinos = claim.participantes ? claim.participantes.length : 1;
  const claimUrl = `${basePath}pages/detalle-reclamo.html?id=${encodeURIComponent(claim.id)}`;

  // Mapeo seguro de clase de estado para el badge
  let stateClass = 'recibido';
  if (claim.estado === 'en_revision') stateClass = 'revision';
  else if (claim.estado === 'en_proceso') stateClass = 'proceso';
  else if (claim.estado === 'resuelto') stateClass = 'resuelto';
  else if (claim.estado === 'reabierto') stateClass = 'reabierto';
  else if (claim.estado === 'rechazado') stateClass = 'rechazado';

  return `
    <article class="claim-popup" role="dialog" aria-labelledby="popup-title-${claim.id}">
      <div class="claim-popup__header">
        <span class="badge badge--cat-${claim.categoria}">${catLabel}</span>
        <span class="badge badge--${stateClass}">${stateLabel}</span>
      </div>

      <h4 id="popup-title-${claim.id}" class="claim-popup__title">
        <a href="${claimUrl}" class="claim-popup__title-link">${claim.titulo}</a>
      </h4>

      <p class="claim-popup__address">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>${claim.direccion}</span>
      </p>

      <div class="claim-popup__meta">
        <span class="claim-popup__participants" title="Vecinos que apoyan este reclamo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <strong>${countVecinos}</strong> ${countVecinos === 1 ? 'vecino sumado' : 'vecinos sumados'}
        </span>
        <span class="claim-popup__date">${dateFormatted}</span>
      </div>

      <div class="claim-popup__footer">
        <a href="${claimUrl}" class="btn btn--primary btn--sm claim-popup__btn">
          <span>Ver reclamo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </article>
  `;
}

/**
 * Inicializa un mapa de Leaflet centrado en La Matanza o en una localidad específica
 */
export function initLeafletMap(containerId, options = {}) {
  if (typeof L === 'undefined') {
    console.warn(`Leaflet no está cargado en window.L. No se pudo inicializar #${containerId}`);
    return null;
  }

  const container = document.getElementById(containerId);
  if (!container) return null;

  // Determinar centro inicial: localidad preferida o centro por defecto
  let center = MAPA_CONFIG.centroDefault;
  let zoom = options.zoom || MAPA_CONFIG.zoomDefault;

  if (options.localidadId) {
    const loc = LOCALIDADES_LA_MATANZA.find(l => l.id === options.localidadId);
    if (loc) {
      center = [loc.lat, loc.lng];
      zoom = MAPA_CONFIG.zoomLocalidad || 13;
    }
  } else if (options.center) {
    center = options.center;
  }

  // Detección de dispositivo móvil para experiencia táctil no intrusiva
  const isMobile = window.innerWidth < 768;

  const map = L.map(containerId, {
    center: center,
    zoom: zoom,
    minZoom: 10,
    maxZoom: 17,
    scrollWheelZoom: false, // Desactivado para evitar "scroll trap" en la navegación vertical
    dragging: !isMobile || options.enableTouchDragging === true, // Control táctil deliberado
    tap: true,
    zoomControl: false // Ubicaremos el control de zoom en una posición más limpia
  });

  // Agregar control de zoom en la esquina superior derecha
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Capa base de OpenStreetMap con atribución oficial
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  return map;
}

/**
 * Renderiza los marcadores de los reclamos en el mapa
 */
export function renderClaimMarkers(map, claims = [], basePath = '') {
  if (!map || typeof L === 'undefined') return [];

  const markers = [];

  claims.forEach(claim => {
    if (!claim.lat || !claim.lng) return;

    const icon = createCategoryIcon(claim.categoria, claim.titulo);
    const marker = L.marker([claim.lat, claim.lng], { icon: icon });

    const popupContent = createClaimPopupHtml(claim, basePath);
    marker.bindPopup(popupContent, {
      maxWidth: 320,
      minWidth: 260,
      className: 'custom-leaflet-popup'
    });

    marker.addTo(map);
    markers.push(marker);
  });

  return markers;
}

/**
 * Renderiza un fallback accesible en caso de fallo de red o Leaflet no disponible
 */
export function renderMapFallback(containerId, claims = [], basePath = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const activeClaims = claims.slice(0, 4);

  container.innerHTML = `
    <div class="map-fallback-box" role="region" aria-label="Vista alternativa de reclamos en La Matanza">
      <div class="map-fallback-box__header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        <div>
          <h3 class="map-fallback-box__title">Vista previa de reclamos recientes</h3>
          <p class="map-fallback-box__desc">Reclamos activos informados por vecinos en La Matanza:</p>
        </div>
      </div>
      
      <ul class="map-fallback-list" role="list">
        ${activeClaims.map(c => `
          <li class="map-fallback-item">
            <span class="badge badge--cat-${c.categoria}">${formatters.categoryLabel(c.categoria)}</span>
            <a href="${basePath}pages/detalle-reclamo.html?id=${encodeURIComponent(c.id)}" class="map-fallback-item__link">
              ${c.titulo}
            </a>
            <span class="map-fallback-item__address">${c.direccion}</span>
          </li>
        `).join('')}
      </ul>

      <div class="map-fallback-box__action">
        <a href="${basePath}pages/explorar.html" class="btn btn--primary btn--sm">
          Explorar todos en el mapa completo →
        </a>
      </div>
    </div>
  `;
}

