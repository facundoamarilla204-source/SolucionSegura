# Informe de Correcciones UX/UI y Accesibilidad — SoluciónSegura (Etapa 11.3)

**Fecha de implementación:** 13 de noviembre de 2026  
**Documento base:** [auditoria-ux-ui.md](file:///j:/PROYECTOS/SolucionSegura/docs/auditoria-ux-ui.md) (25 hallazgos)  
**Restricciones respetadas:** Se preservó íntegramente la identidad visual (`#062F66`, `#0284C7`, `#F98001`, `Outfit` + `Inter`), la navegación desktop, la barra inferior móvil de 5 destinos con botón central *Reportar*, y la persistencia en `localStorage` sin añadir frameworks ni backend.

---

## 1. Resumen de estado de los 25 hallazgos

| Estado | Cantidad | IDs |
| :--- | :---: | :--- |
| **Corregido y verificado** | **16** | `AUD-CRIT-01`, `AUD-CRIT-02`, `AUD-CRIT-03`, `AUD-ALT-01`, `AUD-ALT-02`, `AUD-ALT-03`, `AUD-ALT-05`, `AUD-ALT-07`, `AUD-ALT-08`, `AUD-MED-01`, `AUD-MED-02`, `AUD-MED-03`, `AUD-MED-04`, `AUD-MED-05`, `AUD-MED-07`, `AUD-BAJ-01` |
| **Implementado, pendiente de verificación visual** | **7** | `AUD-ALT-04`, `AUD-ALT-06`, `AUD-ALT-09`, `AUD-MED-06`, `AUD-BAJ-03`, `AUD-BAJ-04`, `AUD-BAJ-05` |
| **Descartado, con justificación** | **2** | `AUD-MED-08`, `AUD-BAJ-02` |
| **Pendiente** | **0** | — |

---

## 2. Detalle por hallazgo

### Hallazgos Críticos

- **`AUD-CRIT-01` — Contraste WCAG 2.2 AA en badges de estado, enlaces `#0284C7` y badge de campana**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/css/variables.css`, `assets/css/components/navigation.css`, `pages/detalle-reclamo.html`, `pages/perfil.html`, `pages/mis-reclamos.html`
  - **Cambios:** Se ajustaron `--color-link` (`#0369A1`), `--color-link-hover` (`#075985`), los 6 tokens `--state-*` con falla (`recibido: #0369A1`, `revision: #92400E`, `resuelto: #15803D`, `rechazado: #B91C1C`, `reabierto: #C2410C`, `cancelado: #475569`) y el fondo del `.notif-badge` y `.skip-link` a `var(--color-brand-sky-hover)` (`#0369A1`). Se reemplazó el badge inline en `detalle-reclamo.html` por `.badge--recibido`.
  - **Verificación:** Cálculo programático de luminancia sRGB: todos los pares superan **4.5:1** (`recibido` 5.17:1, `revision` 6.37:1, `proceso` 5.62:1, `resuelto` 4.57:1, `rechazado` 5.30:1, `reabierto` 4.52:1, `cancelado` 6.92:1, enlaces 5.93:1, campana/skip-link 5.93:1).

- **`AUD-CRIT-02` — Modales sin *focus trap*, sin restauración de foco y con fuga de *listener***
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/js/components/modal.js`
  - **Cambios:** Se implementó registro `Map` de modales activos, guardado de `previousFocus` al abrir, ciclo de foco `Tab` / `Shift+Tab` dentro de `.modal-dialog`, cierre por `Escape` o clic en backdrop, y remoción garantizada de listeners + restauración de foco en `close()`.
  - **Verificación:** Prueba en Playwright Chromium (`modal.open` -> foco en primer botón `m-first`, `Tab` -> `m-last`, `Tab` -> envuelve a `m-first`, `Escape` -> restaura foco a `test-opener`).

- **`AUD-CRIT-03` — Ausencia de `skip-link` en las 12 subpáginas y `z-index` inferior al header**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/js/components/navbar.js`, `assets/css/components/navigation.css`
  - **Cambios:** `setupNavigation()` inyecta `<a href="#main-content" class="skip-link">Saltar al contenido principal</a>` al inicio de `body` si no existe. En `navigation.css`, `.skip-link` pasó a `position: fixed; z-index: 2000` (por encima de `.site-header` `z-index: 1020`).
  - **Verificación:** Playwright Chromium confirmó `skip=1` en las **13 páginas** y `active='skip-link'` con `zIndex: '2000'` al presionar `Tab` al cargar.

### Hallazgos Altos

- **`AUD-ALT-01` — Gráfico SVG de Estadísticas ilegible en móviles**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/css/pages/estadisticas.css`
  - **Cambios:** Se estableció `min-width: 640px` en `.stats-svg-chart` y se retiró `min-height: 240px` forzado, activando el desplazamiento horizontal fluido dentro de `.stats-chart-wrapper` (`overflow-x: auto`).
  - **Verificación:** En Playwright Chromium a `360 px`, `.stats-svg-chart` mantiene `640 px` de ancho efectivo dentro de un contenedor de `278 px` (`scrollWidth: 640`), sin desbordamiento de página (`overflow_360=False`).

- **`AUD-ALT-02` — 7 variables CSS referenciadas sin declarar**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/css/variables.css`
  - **Cambios:** Se declararon `--color-success`, `--color-surface-subtle`, `--color-text-primary`, `--font-weight-normal`, `--line-height-normal`, `--space-7` y `--header-height` reutilizando los tokens semánticos existentes.
  - **Verificación:** Escaneo estático en los 17 CSS y 13 HTML: `Undefined CSS vars: 0`.

- **`AUD-ALT-03` — Tipografía `Outfit` anulada por `Inter` en `base.css`**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/css/base.css`
  - **Cambios:** Se actualizó `h1, h2, h3, h4, h5, h6` a `font-family: var(--font-family-display)`.
  - **Verificación:** Playwright Chromium confirmó `getComputedStyle(h1).fontFamily` comenzando con `Outfit` en las 13 páginas.

- **`AUD-ALT-04` — Objetivos táctiles `< 44×44 px`**
  - **Estado:** **Implementado, pendiente de verificación visual**
  - **Archivos:** `assets/css/components/buttons.css`, `assets/css/components/modals.css`, `assets/css/components/map.css`, `assets/css/pages/claim-form.css`, `assets/css/pages/explorar.css`, `assets/css/pages/ayuda.css`, `assets/css/pages/perfil.css`, `pages/detalle-reclamo.html`, `pages/nuevo-reclamo.html`
  - **Cambios:** Se amplió `.modal-close-btn` y `.help-search-bar__clear` a `44×44 px`, `.btn--sm` a `min-height: 44px` en `< 768 px`, `.help-quick-tag` a `min-height: 44px` en móvil, se retiró `min-height: 34px` inline en `detalle-reclamo.html`, y se agregaron pseudo-elementos `::after` de `44×44 px` en `.leaflet-popup-close-button`, `.existing-claim-panel__close-btn`, `.explorar-mobile-card__close` y `.ui-switch` para mantener compacto el ícono visual.
  - **Pendiente:** Verificación táctil manual sobre dispositivo móvil y popups Leaflet en vivo.

- **`AUD-ALT-05` — Semántica inválida en Notificaciones (controles anidados / `div role="listitem"`)**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/js/components/navbar.js`, `pages/notificaciones.html`
  - **Cambios:** En `navbar.js`, los ítems del dropdown pasaron de `<div role="listitem" tabindex="0">` a `<button type="button">` nativos (y se retiró `role="list"` del contenedor). En `notificaciones.html`, se eliminaron `role="button"` y `tabindex="0"` del `<article>` para evitar elementos interactivos anidados sobre los enlaces `<a>` y botones `<button>` internos.

- **`AUD-ALT-06` — Descubribilidad de *Ayuda* desde móvil y *Mis reclamos***
  - **Estado:** **Implementado, pendiente de verificación visual**
  - **Archivos:** `pages/perfil.html`
  - **Cambios:** Manteniendo intactos los 5 destinos de `.mobile-bottom-nav` (sin 6ª pestaña), se agregó un acceso directo destacado «Centro de ayuda y preguntas frecuentes» (`#link-to-ayuda`) inmediatamente debajo del enlace a «Mis reclamos» en `pages/perfil.html`.
  - **Pendiente:** Revisión visual con sesión iniciada en `perfil.html` y menú de usuario en escritorio.

- **`AUD-ALT-07` — `outline: none` en `explorar.css` y `cards.css`**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/css/pages/explorar.css`, `assets/css/components/cards.css`
  - **Cambios:** `.explorar-select` usa `outline: 2px solid transparent` y `:focus-visible` con `outline: 2px solid var(--color-focus-ring)`. Se eliminó `outline: none` del estado base de `.category-card__link`.

- **`AUD-ALT-08` — Barra segmentada y gráfico de Estadísticas sin descripción accesible completa**
  - **Estado:** **Corregido y verificado**
  - **Archivos:** `assets/js/pages/estadisticas.js`
  - **Cambios:** Se añadió `role="img"` con `aria-label` resumen al contenedor `#stats-status-bar` y etiquetas `<title>` + `<desc>` enlazadas por `aria-labelledby` dentro del `<svg>` de evolución temporal.

- **`AUD-ALT-09` — Terminología engañosa en «Fotografías adjuntas» de `nuevo-reclamo.html`**
  - **Estado:** **Implementado, pendiente de verificación visual**
  - **Archivos:** `pages/nuevo-reclamo.html`
  - **Cambios:** Se actualizó el texto del Bloque 3 a «Fotografías de ejemplo» y «3 imágenes ilustrativas», aclarando que se generan según la categoría seleccionada para simular la inspección técnica, sin añadir subida de archivos.

### Hallazgos Medios y Bajos

- **`AUD-MED-01` (`index.html`):** Unificado texto del CTA header a «Realizar reclamo» — **Corregido y verificado**.
- **`AUD-MED-02` (`pages/explorar.html`):** `#mobile-card-title` cambiado de `<h3>` a `<h2>` (`headings=['1', '2', '2', '3']`) — **Corregido y verificado**.
- **`AUD-MED-03` (CSS global):** Reemplazadas las 18 ocurrencias de `transition: all` por propiedades explícitas (`Remaining transition:all: 0`) — **Corregido y verificado**.
- **`AUD-MED-04` (`base.css`):** `prefers-reduced-motion: reduce` ahora conserva transiciones breves de `opacity/color/background-color/border-color` (`120ms`) mientras anula animaciones y `scroll-behavior` — **Corregido y verificado**.
- **`AUD-MED-05` (`ayuda.js`):** Añadido `aria-pressed` a `.js-help-mobile-pill` y eliminado `role="list"` inválido en `.help-faq-list` — **Corregido y verificado**.
- **`AUD-MED-06` (`explorar.html`, `nuevo-reclamo.html`, `mis-reclamos.html`, `detalle-reclamo.html`):** Reemplazados emojis (`📍`, `🔍`, `👥`, `💡`) por iconos SVG lineales del mismo set — **Implementado, pendiente de verificación visual**.
- **`AUD-MED-07` (`ayuda.css`):** Placeholder del buscador ajustado de `#94A3B8` (2.56:1) a `#64748B` (4.76:1) — **Corregido y verificado**.
- **`AUD-MED-08` (`estadisticas.js`):** **Descartado, con justificación.** El informe de auditoría confirmó exactitud matemática en `DEMO_STATS`; modificar la lógica de datos para mezclar registros de `localStorage` excede el alcance de correcciones UX/UI sin alterar funcionalidad ni métricas de demostración.
- **`AUD-BAJ-01` (`variables.css`):** Corregido comentario técnico a `WCAG AA 5.05:1 / hover 5.68:1` — **Corregido y verificado**.
- **`AUD-BAJ-02` (`detalle-reclamo.html`, `perfil.html`):** **Descartado, con justificación.** Crear nuevas hojas CSS o refactorizar estilos inline estructurales que no producen fallos visuales ni de accesibilidad conlleva riesgo de regresión sin beneficio funcional inmediato.
- **`AUD-BAJ-03` (`detalle-reclamo.html`):** Reemplazada clase inexistente `.form-control` por `.form-textarea` — **Implementado, pendiente de verificación visual**.
- **`AUD-BAJ-04` (`nuevo-reclamo.html`):** Botón `✕` del lightbox reemplazado por SVG de cierre con área mínima `44×44 px` — **Implementado, pendiente de verificación visual**.
- **`AUD-BAJ-05` (`recuperar-contrasena.html`):** Reemplazado copy «enlace de recuperación simulado» por «instrucciones para restablecer tu acceso» — **Implementado, pendiente de verificación visual**.

---

## 3. Comprobaciones ejecutadas y alcance pendiente

### Comprobaciones ejecutadas tras las últimas ediciones
1. **Validación estática CSS/HTML (Python):**
   - Variables CSS indefinidas: **0**
   - Reglas con `transition: all`: **0**
   - Jerarquía `explorar.html`: `['1', '2', '2', '3']`
2. **Cálculo de contraste WCAG 2.2 AA:** Todos los badges de estado, enlaces (`5.93:1`), notificaciones (`5.93:1`), skip-link (`5.93:1`), placeholder (`4.76:1`) y CTA naranja (`5.05:1`) pasan **≥ 4.5:1**.
3. **Suite automatizada en Playwright Chromium (`http://localhost:8765`):**
   - **13/13 páginas cargadas con 0 errores de consola/runtime**, `skip-link` inyectado (`skip=1`), tipografía `Outfit` aplicada a `h1`, y `overflow=False` en `360 px`.
   - **Matriz responsive (`320, 360, 390, 430, 768, 1024, 1440, 1920 px`)** en `index.html`, `explorar.html`, `estadisticas.html`, `ayuda.html`, `perfil.html`, `notificaciones.html`, `iniciar-sesion.html`: `0` desbordamientos horizontales (`overflow_widths=[]`).
   - **Gráfico de Estadísticas a `360 px`:** `svgWidth=640`, `wrapClientWidth=278`, `wrapScrollWidth=640`.
   - **Focus trap y restauración de foco en `modal.js`:** verificado flujo completo `open -> Tab -> wrap -> Escape -> restore`.

### Comprobaciones que requieren prueba manual en navegador / dispositivo
- Flujo completo autenticado en `perfil.html`, `nuevo-reclamo.html`, `detalle-reclamo.html` y `notificaciones.html` con datos reales de usuario en `localStorage`.
- Interacción táctil sobre mapas Leaflet (`Explorar` y `Nuevo reclamo`), apertura de popups cercanos al borde inferior y comportamiento con teclado virtual real en móvil.

