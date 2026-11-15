# Correcciones Integrales de Responsive Móvil — SoluciónSegura

**Fecha:** 15 de noviembre de 2026  
**Documento de referencia:** `docs/auditoria-responsive-mobile.md`  
**Alcance:** Corrección de los 18 hallazgos (2 críticos, 6 altos, 7 medios, 3 bajos) preservando intactos el diseño general, la identidad visual, las tipografías (`Outfit` e `Inter`), la composición del Hero de escritorio y todas las funcionalidades existentes.

---

## 1. Resumen de estado

| Severidad | Cantidad | Estado final |
| :--- | :---: | :--- |
| **Crítico** | 2 | Corregido mediante análisis estático, pendiente de prueba visual |
| **Alto** | 6 | Corregido mediante análisis estático, pendiente de prueba visual |
| **Medio** | 7 | Corregido mediante análisis estático, pendiente de prueba visual |
| **Bajo** | 3 | Corregido mediante análisis estático, pendiente de prueba visual |
| **Total** | **18** | **18/18 corregidos en código** |

---

## 2. Detalle de correcciones por hallazgo

### Prioridad crítica

#### `MOB-CRIT-01` — Solapamiento del header fijo móvil sobre el Hero en `index.html`
- **Problema detectado:** En `< 768 px`, `.hero-section` tenía `padding-top: var(--space-8)` (`32 px`) mientras `.site-header` (`position: fixed`) ocupa `64 px`, cubriendo la parte superior del Hero.
- **Solución implementada:** Se actualizó el `padding-top` base móvil de `.hero-section` a `calc(var(--header-height-mobile) + var(--space-6))` sin alterar las reglas de escritorio (`>= 768 px`).
- **Archivos modificados:** `assets/css/layout.css`
- **Resultado de comprobaciones técnicas:** Llaves CSS balanceadas; sin impacto en escritorio.
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-CRIT-02` — Modal de gestión `.mgmt-modal-backdrop` debajo del header y barra inferior
- **Problema detectado:** `.mgmt-modal-backdrop` tenía `z-index: 1000`, menor que `z-index: 1020` de `.site-header` y `.mobile-bottom-nav`.
- **Solución implementada:** Se elevó `z-index` de `.mgmt-modal-backdrop` a `1200`, igualando la jerarquía de `.modal-backdrop` en `modals.css`.
- **Archivos modificados:** `assets/css/pages/claim-form.css`
- **Resultado de comprobaciones técnicas:** Llaves CSS balanceadas; jerarquía `z-index` consistente (`1200 > 1020`).
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

---

### Prioridad alta

#### `MOB-ALT-01` — Desborde de `.claim-map-tip` y choque con controles de zoom Leaflet
- **Problema detectado:** `white-space: nowrap` y centrado absoluto causaban recorte lateral y superposición con el control `+ / -` de Leaflet en `320–414 px`.
- **Solución implementada:** Se agregó `@media (max-width: 639px)` para `.claim-map-tip` con `left: 10px; transform: none; max-width: calc(100% - 68px); white-space: normal; text-align: left; line-height: 1.3;`.
- **Archivos modificados:** `assets/css/pages/claim-form.css`
- **Resultado de comprobaciones técnicas:** Llaves CSS balanceadas.
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-ALT-02` — Popups de Leaflet propensos a recorte en `320 px`
- **Problema detectado:** `minWidth: 260` y `maxWidth: 320` fijos en `renderClaimMarkers()`.
- **Solución implementada:** En `window.innerWidth < 480`, se calcula dinámicamente `maxWidth: Math.min(280, window.innerWidth - 48)` y `minWidth: Math.min(220, window.innerWidth - 64)`.
- **Archivos modificados:** `assets/js/modules/map.js`
- **Resultado de comprobaciones técnicas:** Sintaxis JS válida (`node --check`).
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-ALT-03` — Detección de teclado virtual poco fiable en Android Chrome e iOS Safari
- **Problema detectado:** La comparación aislada `window.innerHeight - window.visualViewport.height > 150` fallaba en Android Chrome y generaba falsos positivos con *pinch-to-zoom* en iOS Safari.
- **Solución implementada:** Se combinó `baseViewportHeight` (actualizada en `orientationchange`), detección de foco activo en elementos editables (`focusin`/`focusout`), verificación de escala (`scale <= 1.05`) y reducción de altura (`< 78%` o `> 150 px`).
- **Archivos modificados:** `assets/js/components/navbar.js`
- **Resultado de comprobaciones técnicas:** Sintaxis JS válida (`node --check`).
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-ALT-04` — Controles táctiles `< 44×44 px` en Explorar y Autenticación
- **Problema detectado:** `.view-toggle-btn`, `.category-chip`, `.btn-clear-filters` y `.password-toggle-btn` tenían dimensiones inferiores a `44×44 px` en móvil.
- **Solución implementada:** En `@media (max-width: 767px)`, se estableció `min-height: 44px` con alineación flex en los controles de `explorar.css` y `width: 44px; height: 44px;` para `.password-toggle-btn` en `auth.css`.
- **Archivos modificados:** `assets/css/pages/explorar.css`, `assets/css/pages/auth.css`
- **Resultado de comprobaciones técnicas:** Llaves CSS balanceadas.
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-ALT-05` — Selectores `<select>` con `font-size < 16 px` en iOS Safari
- **Problema detectado:** `.explorar-select` (`12 px`), `.stats-filter-select` (`14 px`) y `.help-mobile-select` (`14 px`) disparaban zoom automático en iOS Safari.
- **Solución implementada:** Se estableció `font-size: var(--font-size-base)` (`16 px`) dentro de `@media (max-width: 767px)` para los tres selectores.
- **Archivos modificados:** `assets/css/pages/explorar.css`, `assets/css/pages/estadisticas.css`, `assets/css/pages/ayuda.css`
- **Resultado de comprobaciones técnicas:** Llaves CSS balanceadas.
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-ALT-06` — Atributos `inputmode`, `autocomplete` y `enterkeyhint` faltantes
- **Problema detectado:** Faltaban atributos de asistencia de teclado móvil en `#input-profile-email`, `#help-search-input` y `#input-address-search`.
- **Solución implementada:** Se agregaron `inputmode="email" autocomplete="email"` en `#input-profile-email`, `inputmode="search" enterkeyhint="search"` en `#help-search-input` y `enterkeyhint="search"` en `#input-address-search`.
- **Archivos modificados:** `pages/perfil.html`, `pages/ayuda.html`, `pages/nuevo-reclamo.html`
- **Resultado de comprobaciones técnicas:** Atributos HTML válidos sin alterar IDs ni scripts.
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

---

### Prioridad media y baja

#### `MOB-MED-01` — Espacio superior redundante entre Hero y `.main-content`
- **Problema detectado:** `.main-content` aplicaba `padding-top` debajo de `.hero-section` en `index.html`.
- **Solución implementada:** Se agregó `.hero-section + .main-content { padding-top: 0; }`.
- **Archivos modificados:** `assets/css/layout.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-02` — Tarjeta de mapa en Inicio con `100vw` y colisión de `.map-floating-cta`
- **Problema detectado:** `width: 100vw` en `.map-container-card` y colisión potencial de `.map-floating-cta` con la atribución de Leaflet en `320 px`.
- **Solución implementada:** Se reemplazó `100vw` por `width: calc(100% + var(--space-8)); margin-inline: calc(var(--space-4) * -1);` y se elevó `.map-floating-cta` a `bottom: 28px` en `@media (max-width: 479px)`.
- **Archivos modificados:** `assets/css/components/map.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-03` — Riesgo de truncamiento de «Estadísticas» en `.mobile-bottom-nav` a `320 px`
- **Problema detectado:** Etiqueta de 12 caracteres al límite de truncamiento en `320 px`.
- **Solución implementada:** Se agregó `@media (max-width: 359px)` con `font-size: clamp(9.5px, 2.6vw, 11.5px); letter-spacing: -0.025em;`.
- **Archivos modificados:** `assets/css/components/navigation.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-04` — Área táctil reducida en `.notif-dropdown__mark-all`
- **Problema detectado:** Altura menor a `32 px` en móvil.
- **Solución implementada:** Se agregó `@media (max-width: 767px)` con `min-height: 44px; display: inline-flex; align-items: center; padding: 0 8px;`.
- **Archivos modificados:** `assets/css/components/navigation.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-05` — Modal `.mgmt-modal-container` sin patrón *bottom-sheet* en móvil
- **Problema detectado:** En `<= 640 px`, el modal de gestión permanecía centrado con padding amplio.
- **Solución implementada:** Se aplicó el patrón *bottom-sheet* en `@media (max-width: 640px)` con `align-items: flex-end`, `border-radius` superior redondeado, `max-height: min(88dvh, calc(100vh - 32px))` y paddings `var(--space-4)`.
- **Archivos modificados:** `assets/css/pages/claim-form.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-06` — Uso de `100vh` sin respaldo `dvh` en contenedores modales y dropdowns
- **Problema detectado:** `.notifications-dropdown`, `.mgmt-modal-container`, `.photo-lightbox__content` y `.photo-lightbox__img` dependían solo de `vh`.
- **Solución implementada:** Se añadió la declaración progresiva `dvh` inmediatamente después de cada `vh`.
- **Archivos modificados:** `assets/css/components/navigation.css`, `assets/css/pages/claim-form.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-MED-07` — Estilos inline de padding fijo en `detalle-reclamo.html`
- **Problema detectado:** `style="padding: var(--space-6);"` impedía reducir el padding en `320–360 px`.
- **Solución implementada:** Se creó `.card--padded-responsive` (`var(--space-6)` en escritorio, `var(--space-4)` en `<= 479 px`) y se aplicó en las tarjetas de `detalle-reclamo.html`.
- **Archivos modificados:** `pages/detalle-reclamo.html`, `assets/css/pages/claim-form.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-BAJ-01` — Enlaces del footer con área táctil `< 44 px` en móvil
- **Problema detectado:** `.site-footer__contact-link` tenía altura estándar de línea sin mínimo táctil en móvil.
- **Solución implementada:** Se agregó `@media (max-width: 767px)` con `min-height: 44px; padding: 8px 0;`.
- **Archivos modificados:** `assets/css/layout.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-BAJ-02` — Declaración duplicada de `z-index` para `.mobile-bottom-nav`
- **Problema detectado:** `layout.css` declaraba `z-index: 950` sobrescrito por `navigation.css` (`1020`).
- **Solución implementada:** Se eliminó el `z-index: 950` redundante de `layout.css`.
- **Archivos modificados:** `assets/css/layout.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

#### `MOB-BAJ-03` — Falta de pista visual de desplazamiento horizontal en Estadísticas
- **Problema detectado:** `.stats-chart-wrapper` no indicaba visualmente el scroll horizontal en móvil.
- **Solución implementada:** Se agregó un indicador sutil `.stats-chart-wrapper::after` (`"Deslizá →"`) visible únicamente en `@media (max-width: 639px)`.
- **Archivos modificados:** `assets/css/pages/estadisticas.css`
- **Estado final:** Corregido mediante análisis estático, pendiente de prueba visual.

---

## 3. Verificaciones realizadas y comprobaciones pendientes

- **Verificaciones estáticas ejecutadas:**
  - Balanceo de llaves `{}` en los 8 archivos CSS modificados (0 errores).
  - Validación sintáctica de JavaScript con `node --check` en `assets/js/modules/map.js` y `assets/js/components/navbar.js` (OK).
- **Comprobaciones pendientes (requieren navegador/dispositivo real):**
  - Inspección visual en `320`, `360`, `375`, `390`, `414` y `430 px` (vertical y horizontal).
  - Prueba táctil de popups Leaflet, `.claim-map-tip` y `.map-floating-cta` en `index.html`, `explorar.html` y `nuevo-reclamo.html`.
  - Validación en dispositivo físico iOS Safari y Android Chrome del teclado virtual (`visualViewport`) y ausencia de zoom automático en `<select>`.
