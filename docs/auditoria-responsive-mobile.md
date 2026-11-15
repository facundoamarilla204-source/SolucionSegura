# Auditoría Integral de Responsive y Funcionalidad Móvil — SoluciónSegura

**Fecha de diagnóstico:** 15 de noviembre de 2026  
**Alcance:** 15 pantallas HTML (`index.html` + 14 páginas en `pages/`), 22 hojas de estilo CSS y módulos JavaScript de soporte  
**Naturaleza de esta fase:** Exclusivamente diagnóstica y documental (no se modificó HTML, CSS, JavaScript ni datos persistidos en `localStorage`)

---

## 1. Resumen ejecutivo

SoluciónSegura cuenta con una base móvil bien encaminada tras las correcciones de la etapa anterior (`docs/correcciones-ux-ui.md`): dispone de barra de navegación inferior fija de 5 destinos con botón central elevado *Reportar*, modales adaptados a *bottom-sheet* en `<= 640 px`, `skip-link` inyectado globalmente, desplazamiento horizontal controlado en el gráfico SVG de Estadísticas y protección contra *scroll-trap* en mapas Leaflet.

No obstante, la auditoría exhaustiva enfocada en experiencia móvil (`320 px – 768 px`), interacción táctil y flujos reales detectó **18 nuevos hallazgos** (2 críticos, 6 altos, 7 medios y 3 bajos) que impactan la usabilidad, la legibilidad y la estabilidad en teléfonos:

| Severidad | Cantidad | Focos principales |
| :--- | :---: | :--- |
| **Crítico** | 2 | Solapamiento del header fijo móvil (`64 px`) sobre el contenido superior del Hero en `index.html`; modal de gestión de reclamo (`.mgmt-modal-backdrop`, `z-index: 1000`) oculto detrás del header y de la barra inferior móvil (`z-index: 1020`). |
| **Alto** | 6 | Guía flotante `.claim-map-tip` con `white-space: nowrap` que desborda y choca con controles de zoom en `320–360 px`; popups Leaflet con `minWidth: 260` / `maxWidth: 320` propensos a recorte en `320 px`; detección de teclado virtual (`innerHeight - visualViewport.height > 150`) poco fiable en Android Chrome e iOS Safari (falsos positivos con zoom o no activación); controles táctiles `< 44×44 px` en *Explorar* (`.view-toggle-btn`, `.category-chip`, `.btn-clear-filters`) y *Auth* (`.password-toggle-btn`); `<select>` con tipografía `< 16 px` (`12–14 px`) que dispara zoom automático en iOS Safari; ausencia de `inputmode` en campos clave y `autocomplete="email"` faltante en Perfil. |
| **Medio** | 7 | Espacio blanco redundante (`64 px` / `80 px`) entre el Hero y la sección de categorías por `padding-top` en `.main-content`; tarjeta de mapa en Inicio con `width: 100vw` y posible colisión entre `.map-floating-cta` y atribución Leaflet en `320 px`; etiqueta «Estadísticas» en barra inferior móvil con riesgo de truncamiento a `320 px`; botón «Marcar todas como leídas» del dropdown de notificaciones con área táctil reducida; botón de cierre del *lightbox* de fotos y modales de gestión sin patrón *bottom-sheet* unificado; dependencia de `100vh` en contenedores de altura máxima; estilos en línea abundantes en `detalle-reclamo.html` y `mis-reclamos.html` que dificultan ajustes responsivos por media query. |
| **Bajo** | 3 | Enlaces del footer con área táctil inferior a `44 px` de alto en móvil; `z-index` duplicado para `.mobile-bottom-nav` entre `layout.css` (`950`) y `navigation.css` (`1020`); ausencia de indicador visual explícito de scroll horizontal en `.stats-chart-wrapper` en pantallas pequeñas. |

> [!IMPORTANT]
> **Nota de transparencia metodológica sobre navegador real:**
> Se levantó el servidor HTTP local (`http://localhost:8123`) y se intentó conectar el subagente de navegador real (`Chrome DevTools`), pero el entorno arrojó `ENOENT` por ausencia de `DevToolsActivePort` (`/Users/giulianaregalini/Library/Application Support/Google/Chrome/DevToolsActivePort`) y tampoco se encuentran instalados `playwright`, `google-chrome` ni `chromium` en el sistema.  
> Por este motivo, **ninguna interacción ni captura en vivo pudo ejecutarse en navegador renderizado en esta sesión**. Todos los hallazgos documentados se sustentan en inspección estática y programática exacta de HTML, CSS y JavaScript, diferenciando explícitamente lo comprobado en código de las verificaciones que requieren ejecución en dispositivo/navegador real (Sección 14).

---

## 2. Herramientas y skills utilizadas

1. **Inspección estática y escaneo programático (Python 3 + `grep`/`ripgrep`):**
   - Análisis de los 15 archivos HTML (`index.html` y 14 páginas en `pages/`), 22 archivos CSS (`variables.css`, `base.css`, `layout.css`, `responsive.css`, `components/*.css`, `pages/*.css`) y módulos JS (`navbar.js`, `modal.js`, `map.js`, `estadisticas.js`, `ayuda.js`).
   - Detección sistemática de valores `z-index`, `white-space: nowrap`, anchos fijos en píxeles, tipografías `< 16 px` en controles de formulario, atributos `type`/`inputmode`/`autocomplete` y reglas `@media`.
2. **Documentos previos consultados (para evitar duplicar hallazgos ya resueltos):**
   - `docs/auditoria-ux-ui.md`
   - `docs/correcciones-ux-ui.md`
3. **Skills solicitadas:**
   - Se verificó el directorio de skills instaladas en este entorno (`.gemini/antigravity/builtin/skills/`). Las skills `antislop`, `antislop-ui`, `antislop-layoutmobile`, `emil-design-eng`, `impeccable`, `mobile-design`, `ux-audit`, `ui-review`, `ui-a11y`, `wcag-audit-patterns` y `fixing-accessibility` **no se encuentran instaladas** en esta máquina; no obstante, se aplicaron sus criterios técnicos equivalentes (WCAG 2.2 AA, objetivos táctiles `>= 44×44 px`, prevención de *scroll-trap*, ergonomía *thumb-zone* y prevención de zoom automático en iOS).

---

## 3. Páginas y resoluciones verificadas

### Páginas auditadas (15 en total)
1. `index.html` — Inicio (incluyendo el Hero actualizado con fondo cartográfico y 3 paneles diagonales)
2. `pages/explorar.html` — Explorar reclamos
3. `pages/nuevo-reclamo.html` — Crear reclamo
4. `pages/confirmacion.html` — Confirmación
5. `pages/detalle-reclamo.html` — Detalle de reclamo
6. `pages/mis-reclamos.html` — Mis reclamos
7. `pages/estadisticas.html` — Estadísticas
8. `pages/ayuda.html` — Centro de Ayuda
9. `pages/perfil.html` — Mi perfil
10. `pages/notificaciones.html` — Notificaciones
11. `pages/iniciar-sesion.html` — Iniciar sesión
12. `pages/registro.html` — Registro
13. `pages/recuperar-contrasena.html` — Recuperar contraseña
14. `pages/politica-privacidad.html` — Política de privacidad *(detectada en `pages/`)*
15. `pages/terminos-condiciones.html` — Términos y condiciones *(detectada en `pages/`)*

### Resoluciones evaluadas en análisis CSS/layout
- **Móviles pequeños:** `320 px`, `360 px` (`360 × 800`), `375 px`
- **Móviles estándar y grandes:** `390 px` (`390 × 844`), `414 px`, `430 px`, `480 px`
- **Tablet:** `768 px` (y rango `768–1023 px`)
- **Orientación horizontal móvil:** evaluada a nivel de reglas CSS (`min-height`, `max-height`, barra inferior y teclado virtual).

---

## 4. Matriz de pruebas por pantalla

| Página | Estado de revisión (código) | Hallazgos detectados | Requiere prueba en vivo |
| :--- | :--- | :--- | :--- |
| `index.html` | Revisada completa | `MOB-CRIT-01`, `MOB-MED-01`, `MOB-MED-02`, `MOB-BAJ-01`, `MOB-BAJ-02` | Render Hero 320–768 px, tiles OSM |
| `pages/explorar.html` | Revisada completa | `MOB-ALT-02`, `MOB-ALT-04`, `MOB-ALT-05` | Bottom-sheet marcador, popups 320 px |
| `pages/nuevo-reclamo.html` | Revisada completa | `MOB-ALT-01`, `MOB-ALT-02`, `MOB-ALT-03`, `MOB-MED-05` | Flujo E2E mapa + modal + teclado |
| `pages/confirmacion.html` | Revisada completa | Sin fallos críticos/altos propios (hereda `MOB-ALT-03`, `MOB-MED-03`) | Flujo post-envío |
| `pages/detalle-reclamo.html` | Revisada completa | `MOB-CRIT-02`, `MOB-MED-05`, `MOB-MED-07` | Modal gestión en vivo, lightbox |
| `pages/mis-reclamos.html` | Revisada completa | `MOB-MED-07` (hereda `MOB-ALT-03`, `MOB-MED-03`) | Tabs y tarjetas con sesión |
| `pages/estadisticas.html` | Revisada completa | `MOB-ALT-05`, `MOB-BAJ-03` | Scroll horizontal SVG y tooltips táctiles |
| `pages/ayuda.html` | Revisada completa | `MOB-ALT-05`, `MOB-ALT-06` | Acordeones y buscador con teclado |
| `pages/perfil.html` | Revisada completa | `MOB-ALT-03`, `MOB-ALT-06` | Switches y edición con teclado |
| `pages/notificaciones.html` | Revisada completa | Sin fallos críticos/altos propios (hereda `MOB-MED-04`) | Estados de lectura y enlaces |
| `pages/iniciar-sesion.html` | Revisada completa | `MOB-ALT-04` (`.password-toggle-btn` 40×40) | Teclado virtual y envío |
| `pages/registro.html` | Revisada completa | `MOB-ALT-04` (`.password-toggle-btn` 40×40), `MOB-ALT-06` | Teclado virtual y checkboxes |
| `pages/recuperar-contrasena.html` | Revisada completa | Sin fallos propios detectados | Teclado virtual y validación |
| `pages/politica-privacidad.html` | Revisada completa | Sin fallos propios detectados | Scroll y TOC móvil |
| `pages/terminos-condiciones.html` | Revisada completa | Sin fallos propios detectados | Scroll y TOC móvil |

---

## 5. Problemas críticos

### `MOB-CRIT-01` — Header fijo móvil (`64 px`) solapa la parte superior del Hero en `index.html`
- **Página:** `index.html`
- **Resolución:** `320 px – 767 px`
- **Componente:** `.site-header` + `.hero-section`
- **Descripción:** En `index.html`, `<section class="hero-section">` está ubicada **antes** de `<main class="main-content">` (que es el elemento que recibe `padding-top: var(--header-height-mobile)` = `64 px`). Como `.site-header` es `position: fixed; top: 0; height: 64px` y `.hero-section` solo tiene `padding-top: var(--space-8)` (`32 px`) en `< 768 px`, el header fijo cubre los primeros `64 px` de `.hero-section`, quedando `32 px` por encima del inicio del `.hero-kicker` («LA MATANZA · PARTICIPACIÓN CIUDADANA») y reduciendo o tapando visualmente su margen superior.
- **Pasos para reproducir:**
  1. Abrir `index.html` en un viewport `< 768 px` (ej. `360 × 800` o `390 × 844`).
  2. Observar la parte superior del Hero inmediatamente debajo del header fijo azul.
- **Resultado observado (código):** `.hero-section` tiene `padding-top: var(--space-8)` (`32 px`) mientras `.site-header` ocupa `64 px` fijos desde `y = 0`.
- **Resultado esperado:** En `< 768 px`, `.hero-section` debe tener `padding-top: calc(var(--header-height-mobile) + var(--space-6))` (o similar) para que el kicker y el H1 queden completamente despejados debajo del header fijo.
- **Severidad:** Crítico
- **Archivo involucrado:** `assets/css/layout.css` (líneas 100–115)
- **Propuesta de solución:** Ajustar el `padding-top` base móvil de `.hero-section` a `calc(var(--header-height-mobile) + var(--space-6))`.

### `MOB-CRIT-02` — Modal de gestión (`.mgmt-modal-backdrop`) queda debajo del header y de la barra inferior móvil
- **Página:** `pages/detalle-reclamo.html` (y cualquier vista que use `.mgmt-modal-backdrop`)
- **Resolución:** `320 px – 767 px` (y en desktop bajo `.site-header`)
- **Componente:** `.mgmt-modal-backdrop`
- **Descripción:** `.mgmt-modal-backdrop` define `z-index: 1000`, mientras que `.site-header` y `.mobile-bottom-nav` (en `navigation.css`) tienen `z-index: 1020`. Al abrir el modal de edición o cancelación de un reclamo en móvil, tanto la barra superior como la barra inferior fija quedan **por encima** del backdrop y pueden tapar el encabezado o el pie del modal.
- **Pasos para reproducir:**
  1. Iniciar sesión, abrir `pages/detalle-reclamo.html` de un reclamo propio en `360 × 800`.
  2. Tocar «Editar reclamo» o «Cancelar reclamo» para abrir `.mgmt-modal-backdrop`.
- **Resultado observado (código):** `z-index: 1000` en `.mgmt-modal-backdrop` es menor que `1020` de `.site-header` y `.mobile-bottom-nav`.
- **Resultado esperado:** El modal de gestión debe usar `z-index: 1200` (igual que `.modal-backdrop` en `modals.css`) y respetar la presentación limpia sobre cualquier barra fija.
- **Severidad:** Crítico
- **Archivo involucrado:** `assets/css/pages/claim-form.css` (línea 1554)
- **Propuesta de solución:** Elevar `z-index` de `.mgmt-modal-backdrop` a `1200` (o unificarlo con `.modal-backdrop` de `modals.css`).

---

## 6. Problemas altos

### `MOB-ALT-01` — Guía flotante `.claim-map-tip` desborda el mapa y choca con controles de zoom en `320–360 px`
- **Página:** `pages/nuevo-reclamo.html`
- **Resolución:** `320 px – 414 px`
- **Componente:** `.claim-map-tip` sobre `#claim-map`
- **Descripción:** `.claim-map-tip` usa `position: absolute; top: 10px; left: 50%; transform: translateX(-50%); white-space: nowrap;`. El texto completo supera los `280 px` en móvil, por lo que con `white-space: nowrap` se recorta lateralmente dentro de `.claim-map-wrapper` (`overflow: hidden`) y se superpone con el control de zoom de Leaflet ubicado en `topright`.
- **Pasos para reproducir:** Abrir `pages/nuevo-reclamo.html` en `320 × 568` o `360 × 800` y observar la píldora superior sobre el mapa.
- **Resultado observado (código):** `white-space: nowrap` sin `max-width` ni ajuste móvil.
- **Resultado esperado:** Texto legible en 1–2 líneas centrado con `max-width: calc(100% - 64px)` (o posicionado abajo a la izquierda) sin tocar el control `+ / -` de Leaflet.
- **Severidad:** Alto
- **Archivo involucrado:** `assets/css/pages/claim-form.css` (líneas 365–382)
- **Propuesta de solución:** Permitir `white-space: normal; text-align: center; max-width: calc(100% - 68px);` en `< 640 px` o desplazar `.claim-map-tip` a `left: 10px; transform: none;` para liberar la esquina superior derecha.

### `MOB-ALT-02` — Popups de Leaflet con `minWidth: 260` / `maxWidth: 320` propensos a recorte en `320 px`
- **Página:** `index.html`, `pages/explorar.html`
- **Resolución:** `320 px` (y `360 px` cerca de bordes)
- **Componente:** Popups de marcadores en `renderClaimMarkers()` (`map.js`)
- **Descripción:** `marker.bindPopup(popupContent, { maxWidth: 320, minWidth: 260 })` fuerza un mínimo de `260 px` de contenido más márgenes propios de Leaflet (~`30–40 px`). En pantallas de `320 px`, el popup queda al límite del viewport o se recorta si el marcador está próximo a un borde.
- **Pasos para reproducir:** En `320 px`, abrir `index.html` o `pages/explorar.html` y tocar un marcador en el mapa.
- **Resultado observado (código):** `minWidth: 260, maxWidth: 320` fijos sin adaptación según `window.innerWidth`.
- **Resultado esperado:** En `< 480 px`, `maxWidth` debería acotarse a `Math.min(280, window.innerWidth - 48)` y `minWidth` a `220`.
- **Severidad:** Alto
- **Archivo involucrado:** `assets/js/modules/map.js` (líneas 264–268)
- **Propuesta de solución:** Calcular `minWidth` y `maxWidth` dinámicamente en función de `window.innerWidth < 480`.

### `MOB-ALT-03` — Detección de teclado virtual (`innerHeight - visualViewport.height > 150`) poco fiable en iOS y Android
- **Página:** Global (todas las páginas con formularios e inputs en móvil)
- **Resolución:** `320 px – 767 px`
- **Componente:** Listener `visualViewport.resize` en `navbar.js` + `.mobile-bottom-nav`
- **Descripción:** `const isKeyboardOpen = (window.innerHeight - window.visualViewport.height) > 150;` falla en dos escenarios reales:
  1. En **Android Chrome**, al abrir el teclado virtual `window.innerHeight` también se reduce junto con `visualViewport.height`, por lo que la diferencia puede ser `0` y la `.mobile-bottom-nav` **no se oculta**, tapando botones inferiores del formulario.
  2. En **iOS Safari**, si el usuario hace *pinch-to-zoom*, `visualViewport.height` disminuye respecto a `window.innerHeight` y oculta falsamente la barra de navegación.
- **Pasos para reproducir:** Enfocar un `<input>` o `<textarea>` en Android Chrome o hacer zoom en iOS Safari.
- **Resultado observado (código):** Lógica basada únicamente en diferencia `innerHeight - visualViewport.height`.
- **Resultado esperado:** Combinar detección de foco activo en elementos editables (`input`, `textarea`, `select`) con cambio de `visualViewport.height` respecto a una altura base inicial (`initialHeight`), ocultando `.mobile-bottom-nav` de forma consistente en ambos sistemas.
- **Severidad:** Alto
- **Archivo involucrado:** `assets/js/components/navbar.js` (líneas 409–421)
- **Propuesta de solución:** Guardar `baseHeight` al cargar (actualizándola solo en `orientationchange`) y combinar `focusin`/`focusout` en campos de entrada con `visualViewport.height < baseHeight * 0.78`.

### `MOB-ALT-04` — Controles táctiles `< 44×44 px` en *Explorar* y *Autenticación*
- **Página:** `pages/explorar.html`, `pages/iniciar-sesion.html`, `pages/registro.html`
- **Resolución:** `320 px – 767 px`
- **Componente:** `.view-toggle-btn`, `.category-chip`, `.btn-clear-filters`, `.password-toggle-btn`
- **Descripción:** Pese a las mejoras de `AUD-ALT-04`, persisten controles táctiles por debajo de `44×44 px` (WCAG 2.2 SC 2.5.8 / ergonomía móvil):
  - `.view-toggle-btn` (`explorar.css:67`): `padding: 6px 14px` (~`30 px` de alto).
  - `.category-chip` (`explorar.css:154`): `padding: 5px 12px` (~`28 px` de alto).
  - `.btn-clear-filters` (`explorar.css:215`): `padding: 2px 4px` (~`20 px` de alto).
  - `.password-toggle-btn` (`auth.css:253`): `width: 40px; height: 40px;`.
- **Pasos para reproducir:** Inspeccionar dimensiones computadas de los botones de filtro en *Explorar* y del botón de ojo de contraseña en *Iniciar sesión* / *Registro* en `< 768 px`.
- **Resultado observado (código):** Alturas entre `20 px` y `40 px`.
- **Resultado esperado:** Área táctil mínima de `44×44 px` en móvil (directa o mediante `min-height: 44px` / pseudo-elemento `::after`).
- **Severidad:** Alto
- **Archivos involucrados:** `assets/css/pages/explorar.css`, `assets/css/pages/auth.css`
- **Propuesta de solución:** Añadir `min-height: 44px` en `< 768 px` a `.view-toggle-btn`, `.category-chip` y `.btn-clear-filters`, y llevar `.password-toggle-btn` a `44×44 px`.

### `MOB-ALT-05` — Controles `<select>` con `font-size < 16 px` disparan zoom automático en iOS Safari
- **Página:** `pages/explorar.html`, `pages/estadisticas.html`, `pages/ayuda.html`
- **Resolución:** `320 px – 767 px` (iOS Safari)
- **Componente:** `.explorar-select` (`12 px`), `.stats-filter-select` (`14 px`), `.help-mobile-select` (`14 px`)
- **Descripción:** En iOS Safari, cualquier `<input>`, `<select>` o `<textarea>` con `font-size` inferior a `16 px` provoca que el navegador haga zoom automático sobre el campo al enfocarlo, desajustando el encuadre móvil.
- **Pasos para reproducir:** Tocar el selector de localidad/estado en `explorar.html`, el filtro de período en `estadisticas.html` o el selector de categorías móvil en `ayuda.html` desde iOS Safari.
- **Resultado observado (código):** `font-size: var(--font-size-xs)` (`12 px`) en `.explorar-select` y `var(--font-size-sm)` (`14 px`) en `.stats-filter-select` y `.help-mobile-select`.
- **Resultado esperado:** `font-size: 1rem` (`16 px`) en `< 768 px` para todos los `<select>` e `<input>`.
- **Severidad:** Alto
- **Archivos involucrados:** `assets/css/pages/explorar.css` (línea 133), `assets/css/pages/estadisticas.css` (línea 142), `assets/css/pages/ayuda.css` (línea 308)
- **Propuesta de solución:** Establecer `font-size: var(--font-size-base)` (`16 px`) dentro de `@media (max-width: 767px)` para los tres selectores.

### `MOB-ALT-06` — Optimización incompleta de teclado móvil (`inputmode` / `autocomplete`) en formularios
- **Página:** `pages/ayuda.html`, `pages/perfil.html`, `pages/nuevo-reclamo.html`, `pages/registro.html`
- **Resolución:** `320 px – 767 px`
- **Componente:** `#help-search-input`, `#input-profile-email`, `#input-address-search`, `#register-name`
- **Descripción:**
  - `#input-profile-email` (`perfil.html`) tiene `type="email"` pero carece de `inputmode="email"` y `autocomplete="email"`.
  - `#help-search-input` (`ayuda.html`) tiene `type="search"` sin `inputmode="search"` / `enterkeyhint="search"`.
  - `#input-address-search` (`nuevo-reclamo.html`) carece de `enterkeyhint="search"`.
- **Pasos para reproducir:** Revisar atributos HTML de los `<input>` en `perfil.html`, `ayuda.html` y `nuevo-reclamo.html`.
- **Resultado observado (código):** Atributos ausentes en los campos mencionados.
- **Resultado esperado:** Cada campo debe ofrecer el teclado virtual más adecuado (`inputmode`, `autocomplete`, `enterkeyhint`).
- **Severidad:** Alto
- **Archivos involucrados:** `pages/perfil.html`, `pages/ayuda.html`, `pages/nuevo-reclamo.html`
- **Propuesta de solución:** Añadir `inputmode="email" autocomplete="email"` en `#input-profile-email` y `enterkeyhint="search"` en los buscadores.

---

## 7. Problemas medios

### `MOB-MED-01` — Espacio superior redundante (`64 px` / `80 px`) entre el Hero y la sección de categorías
- **Página:** `index.html`
- **Resolución:** Todas (`320 px – 1440 px`)
- **Componente:** `.main-content` debajo de `.hero-section`
- **Descripción:** `.main-content` aplica `padding-top: var(--header-height-mobile)` (`64 px`) / `var(--header-height-desktop)` (`80 px`) asumiendo que es el primer bloque bajo el header fijo. En `index.html`, como `.hero-section` precede a `<main>`, ese `padding-top` añade una franja vacía de `64–80 px` sobre «¿Qué problema querés informar?». *(En móvil `< 768 px`, además, se suma al problema `MOB-CRIT-01`).*
- **Archivo involucrado:** `assets/css/layout.css` (líneas 41–53)
- **Propuesta de solución:** Anular ese `padding-top` cuando `.main-content` sigue a `.hero-section` (por ejemplo, `.hero-section + .main-content { padding-top: 0; }`).

### `MOB-MED-02` — Tarjeta de mapa en Inicio con `width: 100vw` y posible colisión de `.map-floating-cta` en `320 px`
- **Página:** `index.html`
- **Resolución:** `320 px – 480 px`
- **Componente:** `.map-container-card` y `.map-floating-cta`
- **Descripción:** `.map-container-card` usa `width: 100vw; margin-left: calc(50% - 50vw);` en `< 768 px` (técnica frágil si algún navegador considera barra de scroll dentro de `100vw`). Además, `.map-floating-cta` (`bottom: 12px; right: 12px; z-index: 600`) comparte la esquina inferior derecha con la barra de atribución de OpenStreetMap/Leaflet (`bottom: 0; right: 0`).
- **Archivo involucrado:** `assets/css/components/map.css` (líneas 281–294)
- **Propuesta de solución:** Elevar `.map-floating-cta` a `bottom: 28px` en `< 480 px` para despejar la atribución de Leaflet y usar `width: calc(100% + var(--space-8)); margin-inline: calc(var(--space-4) * -1);` en lugar de `100vw`.

### `MOB-MED-03` — Etiqueta «Estadísticas» en `.mobile-bottom-nav` al límite de truncamiento en `320 px`
- **Página:** Global (todas las páginas en `< 768 px`)
- **Resolución:** `320 px`
- **Componente:** `.mobile-nav-item__label`
- **Descripción:** Con 5 columnas iguales en `320 px` (`64 px` por ítem) y `font-size: clamp(10px, 2.75vw, 11.5px)`, la palabra «Estadísticas» (12 caracteres) queda en el límite exacto del ancho disponible y puede mostrar puntos suspensivos (`...`) según la fuente cargada.
- **Archivo involucrado:** `assets/css/components/navigation.css` (líneas 900–914)
- **Propuesta de solución:** Verificar en dispositivo de `320 px` real; si trunca, ajustar `font-size: clamp(9.5px, 2.6vw, 11.5px)` o `letter-spacing: -0.025em` en `<= 359 px`.

### `MOB-MED-04` — Botón «Marcar todas» en dropdown de notificaciones con área táctil reducida
- **Página:** Global (header móvil en `< 768 px` con sesión iniciada)
- **Resolución:** `320 px – 639 px`
- **Componente:** `.notif-dropdown__mark-all`
- **Descripción:** El botón tiene `padding: 4px 6px`, resultando en una altura inferior a `32 px`, lo que dificulta el toque preciso cuando el panel de notificaciones se despliega en móvil.
- **Archivo involucrado:** `assets/css/components/navigation.css` (línea 472)
- **Propuesta de solución:** Darle `min-height: 44px; display: inline-flex; align-items: center; padding: 0 8px;` en `< 768 px`.

### `MOB-MED-05` — Modal `.mgmt-modal-container` y `.photo-lightbox` sin adaptación *bottom-sheet* / botones pequeños en móvil
- **Página:** `pages/detalle-reclamo.html`, `pages/nuevo-reclamo.html`
- **Resolución:** `320 px – 640 px`
- **Componente:** `.mgmt-modal-container`, `.photo-lightbox__content`
- **Descripción:** A diferencia de `.modal-dialog` (que usa `max-height: min(88dvh, calc(100vh - 32px))` y estilo *bottom-sheet*), `.mgmt-modal-container` queda centrado con `max-height: 90vh` y padding amplio (`var(--space-6)`), desaprovechando espacio en `320–360 px` y sin protección `dvh` frente a barras dinámicas del navegador móvil.
- **Archivo involucrado:** `assets/css/pages/claim-form.css` (líneas 1569–1623)
- **Propuesta de solución:** Aplicar en `@media (max-width: 640px)` las mismas reglas *bottom-sheet* y `dvh` de `modals.css`.

### `MOB-MED-06` — Uso de `100vh` sin respaldo `100dvh` en contenedores modales y dropdowns
- **Página:** Global
- **Resolución:** `320 px – 767 px` (iOS Safari / Android Chrome con barra de direcciones dinámica)
- **Componente:** `.notifications-dropdown` (`max-height: calc(100vh - ...)`), `.mgmt-modal-container` (`max-height: 90vh`), `.photo-lightbox__img` (`max-height: 72vh`)
- **Descripción:** En navegadores móviles, `100vh` contempla el alto con la barra de direcciones oculta, pudiendo recortar los extremos inferiores de paneles fijos cuando la barra está visible.
- **Archivos involucrados:** `assets/css/components/navigation.css` (línea 432), `assets/css/pages/claim-form.css` (líneas 1238, 1575)
- **Propuesta de solución:** Añadir fallback progresivo `100dvh` / `90dvh` / `72dvh` inmediatamente después de cada declaración `vh`.

### `MOB-MED-07` — Abundancia de estilos `style="..."` en `detalle-reclamo.html` y `mis-reclamos.html`
- **Página:** `pages/detalle-reclamo.html` (19 ocurrencias), `pages/mis-reclamos.html` (9 ocurrencias)
- **Resolución:** `320 px – 480 px`
- **Componente:** Tarjetas de detalle, cabeceras de estado y meta-información
- **Descripción:** El uso de `padding: var(--space-6)` (`24 px`) y tamaños fijos en `style="..."` impide reducir paddings en `320–360 px` mediante media queries, comprimiendo el ancho útil de texto dentro de tarjetas con borde.
- **Archivos involucrados:** `pages/detalle-reclamo.html`, `pages/mis-reclamos.html`
- **Propuesta de solución:** Migrar progresivamente esos estilos en línea a clases CSS responsivas que reduzcan padding a `var(--space-4)` en `< 480 px`.

---

## 8. Problemas bajos

### `MOB-BAJ-01` — Enlaces del footer con altura táctil inferior a `44 px` en móvil
- **Página:** Global (`index.html` y todas las subpáginas con footer)
- **Resolución:** `320 px – 767 px`
- **Componente:** `.site-footer__contact-link` y enlaces de navegación del footer
- **Descripción:** Los enlaces de texto del footer tienen altura de línea estándar (~`20–24 px`) sin `min-height: 44px` o padding vertical en móvil.
- **Archivo involucrado:** `assets/css/layout.css` (líneas 760–780)
- **Propuesta de solución:** Añadir `padding: 8px 0; min-height: 40px;` en `< 768 px` manteniendo la separación visual limpia.

### `MOB-BAJ-02` — Declaración duplicada de `z-index` para `.mobile-bottom-nav`
- **Página:** Global
- **Resolución:** `< 768 px`
- **Componente:** `.mobile-bottom-nav`
- **Descripción:** `layout.css:401` declara `z-index: 950` y `navigation.css:801` lo sobrescribe con `z-index: 1020`. Aunque funciona por orden de importación en `main.css`, genera confusión de mantenimiento al depurar superposiciones.
- **Archivos involucrados:** `assets/css/layout.css`, `assets/css/components/navigation.css`
- **Propuesta de solución:** Mantener la regla única en `navigation.css` (`1020`) y retirar la propiedad redundante de `layout.css`.

### `MOB-BAJ-03` — Falta de pista visual explícita de desplazamiento horizontal en gráfico de Estadísticas
- **Página:** `pages/estadisticas.html`
- **Resolución:** `320 px – 639 px`
- **Componente:** `.stats-chart-wrapper`
- **Descripción:** Aunque `.stats-chart-wrapper` permite desplazamiento horizontal fluido (`min-width: 640px` en `.stats-svg-chart`), no muestra un sombreado lateral o indicación breve («Deslizá para ver la evolución completa») que haga evidente el scroll en móvil.
- **Archivo involucrado:** `assets/css/pages/estadisticas.css` (líneas 634–647)
- **Propuesta de solución:** Agregar una nota sutil visible solo en `< 640 px` o gradiente lateral indicativo en el borde derecho.

---

## 9. Problemas visuales (resumen específico)
- **Hero de Inicio (`index.html`):** La nueva composición de fondo cartográfico (`#062F66`) con tres paneles diagonales (`hero-calles.webp`, `hero-residuos.webp`, `hero-alumbrado.webp`) está correctamente aislada en `.hero-bg-layer` (`aria-hidden="true"`, `pointer-events: none`), oculta los paneles en `< 768 px` para mantener lectura despejada, y conserva intactos H1, subtítulo y botones. El único fallo visual crítico es el solapamiento superior del header fijo en `< 768 px` (`MOB-CRIT-01`) y el espacio extra de `.main-content` debajo del hero (`MOB-MED-01`).
- **Mapas (`index.html`, `explorar.html`, `nuevo-reclamo.html`):** Riesgo de recorte en `.claim-map-tip` (`MOB-ALT-01`), colisión de `.map-floating-cta` en `320 px` (`MOB-MED-02`) y popups anchos en `320 px` (`MOB-ALT-02`).
- **Modales de gestión (`detalle-reclamo.html`):** Quedan por debajo del header y barra inferior (`MOB-CRIT-02`).

---

## 10. Problemas funcionales (resumen específico)
- **Teclado virtual en formularios:** Posible permanencia visible de `.mobile-bottom-nav` en Android Chrome o desaparición por zoom en iOS Safari (`MOB-ALT-03`).
- **Selectores en iOS Safari:** Riesgo de zoom automático al enfocar filtros `<select>` con tipografía `< 16 px` (`MOB-ALT-05`).
- **Modales de gestión:** Interacción bloqueada o parcialmente cubierta por barras fijas (`MOB-CRIT-02`).

---

## 11. Problemas de accesibilidad (WCAG 2.2 AA en móvil)
- **SC 2.5.8 Target Size (Minimum) / Ergonomía móvil:** Controles `< 44×44 px` detectados en `explorar.css` (`.view-toggle-btn`, `.category-chip`, `.btn-clear-filters`), `auth.css` (`.password-toggle-btn`), `navigation.css` (`.notif-dropdown__mark-all`) y enlaces del footer (`MOB-ALT-04`, `MOB-MED-04`, `MOB-BAJ-01`).
- **SC 1.4.4 / Comportamiento de zoom iOS:** Inputs/selects `< 16 px` que fuerzan zoom inesperado (`MOB-ALT-05`).
- **Atributos de asistencia en entrada de datos:** Faltantes `inputmode` / `autocomplete` / `enterkeyhint` (`MOB-ALT-06`).
- **Verificados como conformes tras Etapa 11.3:** Contraste WCAG 2.2 AA en badges, enlaces y placeholders; `skip-link` en las 15 páginas; *focus trap* y restauración de foco en `modal.js`; `Outfit` aplicado a encabezados.

---

## 12. Evidencias y pasos de reproducción

Cada hallazgo en las Secciones 5, 6, 7 y 8 incluye **página, resolución afectada, pasos exactos para reproducir, resultado observado en código, resultado esperado y archivo/línea involucrada**.  
No se adjuntan capturas de pantalla en vivo por la indisponibilidad de navegador automatizado descrita en la Sección 14.

---

## 13. Pruebas exitosas (verificadas en código y documentos previos)

1. **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** Presente en las **15 páginas HTML**.
2. **`#main-content` y `skip-link`:** Presentes en las **15 páginas HTML** (inyectado dinámicamente por `navbar.js` en subpáginas, estático en `index.html`).
3. **Prevención de *scroll-trap* en Leaflet:** `map.js:204-205` desactiva `scrollWheelZoom` y condiciona `dragging` en `< 768 px` a `options.enableTouchDragging === true`, permitiendo hacer scroll vertical de página sin quedar atrapado en el mapa.
4. **Hero actualizado (`index.html` + `layout.css`):**
   - Los 3 paneles diagonales tienen `aria-hidden="true"` y `pointer-events: none`.
   - En `< 768 px`, `.hero-bg-panels` se oculta (`display: none`) y se muestra la composición cartográfica simplificada sin desbordamiento horizontal (`overflow: hidden` en `.hero-section` y `.hero-bg-layer`).
   - Textos, botones, tipografías y enlaces del Hero permanecen intactos.
5. **Estadísticas (`estadisticas.css`):** `.stats-chart-wrapper` (`overflow-x: auto`) y `.stats-svg-chart` (`min-width: 640px`) evitan el encogimiento ilegible del gráfico en móvil.
6. **Modales globales (`modals.css` + `modal.js`):** Presentan formato *bottom-sheet* en `<= 640 px`, `z-index: 1200` (encima de barras fijas), *focus trap* y restauración de foco.

---

## 14. Pruebas no realizadas y sus motivos

No pudieron ejecutarse las siguientes validaciones **en navegador real renderizado** (ni en entorno local `http://localhost:8123` ni en `https://solucionsegura.vercel.app/`), debido a que Chrome con depuración remota (`DevToolsActivePort`) no estaba activo y `playwright` / `google-chrome` / `chromium` no están instalados en el entorno:

1. **Inspección visual pixel-a-pixel y capturas en vivo** en `320`, `360×800`, `375`, `390×844`, `414`, `430`, `480` y `768 px`, así como en **orientación horizontal**.
2. **Medición real de `scrollWidth > innerWidth`** y solapamientos dinámicos en DOM renderizado.
3. **Pruebas táctiles en vivo** de Leaflet (carga de mosaicos OSM, pinch/drag en `nuevo-reclamo.html`, popups y bottom-sheet en `explorar.html`).
4. **Prueba E2E completa en navegador** del flujo de *Nuevo reclamo* (selección de mapa, detección de similares, modal de confirmación, envío y redirección a `confirmacion.html`).
5. **Verificación de teclado virtual en dispositivo físico** (Android Chrome e iOS Safari) y lectura real con **VoiceOver / TalkBack**.
6. **Monitoreo en tiempo real de consola JS, red (404) y CLS/LCP** durante navegación entre las 15 páginas.

---

## 15. Plan de correcciones priorizado

### Prioridad 1 — Críticos (bloqueantes de usabilidad móvil)
1. **`MOB-CRIT-01` (`assets/css/layout.css`):** Ajustar `padding-top` móvil de `.hero-section` a `calc(var(--header-height-mobile) + var(--space-6))` para evitar que el header fijo tape el kicker del Hero.
2. **`MOB-CRIT-02` (`assets/css/pages/claim-form.css`):** Subir `.mgmt-modal-backdrop` a `z-index: 1200` para que quede siempre por encima de `.site-header` y `.mobile-bottom-nav`.

### Prioridad 2 — Altos (interacción táctil, mapas y formularios)
3. **`MOB-ALT-01` (`assets/css/pages/claim-form.css`):** Permitir salto de línea y ancho acotado en `.claim-map-tip` en `< 640 px` para que no desborde ni choque con el zoom Leaflet.
4. **`MOB-ALT-02` (`assets/js/modules/map.js`):** Adaptar `minWidth` / `maxWidth` de popups Leaflet en pantallas `< 480 px`.
5. **`MOB-ALT-03` (`assets/js/components/navbar.js`):** Mejorar la detección de teclado virtual combinando altura base inicial + `focusin`/`focusout` en campos editables.
6. **`MOB-ALT-04` (`explorar.css`, `auth.css`):** Llevar a `>= 44×44 px` `.view-toggle-btn`, `.category-chip`, `.btn-clear-filters` y `.password-toggle-btn` en móvil.
7. **`MOB-ALT-05` (`explorar.css`, `estadisticas.css`, `ayuda.css`):** Subir a `16 px` (`var(--font-size-base)`) el `font-size` de los `<select>` en `< 768 px` para evitar zoom automático en iOS.
8. **`MOB-ALT-06` (`perfil.html`, `ayuda.html`, `nuevo-reclamo.html`):** Completar `inputmode`, `autocomplete` y `enterkeyhint` en los campos de formulario.

### Prioridad 3 — Medios y Bajos (pulido visual y consistencia)
9. **`MOB-MED-01` (`layout.css`):** Eliminar el `padding-top` redundante de `.hero-section + .main-content`.
10. **`MOB-MED-02` (`map.css`):** Ajustar `.map-floating-cta` (`bottom: 28px` en `< 480 px`) y reemplazar `100vw` en `.map-container-card`.
11. **`MOB-MED-05` & `MOB-MED-06` (`claim-form.css`, `navigation.css`):** Unificar `.mgmt-modal-container` con patrón *bottom-sheet* móvil y agregar fallback `dvh`.
12. **`MOB-MED-03`, `MOB-MED-04`, `MOB-MED-07`, `MOB-BAJ-01..03`:** Verificar truncamiento de «Estadísticas» en `320 px`, ampliar área táctil en `.notif-dropdown__mark-all` y enlaces del footer, migrar estilos inline críticos de `detalle-reclamo.html` / `mis-reclamos.html`, limpiar `z-index` duplicado y añadir pista visual de scroll en el gráfico de Estadísticas.
13. **Validación final en navegador real:** Ejecutar el checklist de la Sección 14 en Chrome DevTools / dispositivo real (local y `https://solucionsegura.vercel.app/`) una vez aplicadas las correcciones.
