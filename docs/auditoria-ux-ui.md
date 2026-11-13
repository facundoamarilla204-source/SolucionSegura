# Auditoría Integral UX/UI, Accesibilidad y Consistencia — SoluciónSegura (Etapa 11.2)

**Fecha de diagnóstico:** 13 de noviembre de 2026  
**Alcance:** 13 pantallas HTML, 17 hojas de estilo CSS y módulos JavaScript de soporte  
**Naturaleza de esta fase:** Exclusivamente diagnóstica (sin modificaciones sobre código de producción, estilos, scripts ni datos almacenados)

---

## 1. Resumen ejecutivo

SoluciónSegura presenta una base arquitectónica y visual sólida para una plataforma cívica de reclamos urbanos: la paleta institucional (`#062F66`, `#0284C7`, `#F98001`) está bien acotada en su propósito, los flujos principales (como la creación de reclamos con detección de duplicados cercanos y el centro de ayuda en única página) responden a modelos mentales claros, y la aplicación móvil adopta patrones nativos pertinentes (barra inferior de 5 destinos, ocultamiento ante teclado virtual y *bottom-sheet* en modales).

Sin embargo, el diagnóstico estático y programático detectó **25 hallazgos confirmados** que requieren corrección antes de las pruebas funcionales finales:

| Gravedad | Cantidad | Principales focos de impacto |
| :--- | :---: | :--- |
| **Crítico** | 3 | Contraste insuficiente en 6 de 7 badges de estado y enlaces `#0284C7`; modales sin *focus trap* ni restauración de foco y con fuga de *listener*; ausencia de `skip-link` en las 12 subpáginas. |
| **Alto** | 9 | Gráfico SVG de Estadísticas ilegible en móviles (texto escala a ~4 px); 7 variables CSS indefinidas que rompen estilos y alturas; falla de tipografía global (`Outfit` no se aplica a `h1–h6` en `base.css`); controles táctiles `< 44 px` (hasta `24×24 px`); elementos interactivos anidados/no semánticos en Notificaciones; pérdida de descubribilidad de *Ayuda* y *Mis reclamos* en móvil; `outline: none` sin reemplazo visible en controles de filtro. |
| **Medio** | 8 | Inconsistencias de copy en el CTA principal del header (`Nuevo reclamo` vs `Realizar reclamo`); salto de jerarquía de encabezados (`h1 → h3`) en *Explorar*; uso de `transition: all` (18 ocurrencias); bloqueo agresivo de `prefers-reduced-motion` (`0.01ms !important`); `aria-selected`/`aria-pressed` faltante en píldoras móviles de *Ayuda*; emojis en UI en lugar de iconografía SVG coherente; placeholder de buscador en *Ayuda* con contraste 2.56:1; sección de fotografías en *Nuevo reclamo* sin selector real de archivos. |
| **Bajo** | 5 | Comentario engañoso sobre nivel AAA en `variables.css`; estilos en línea excesivos en `detalle-reclamo.html` y `perfil.html`; clase inexistente `.form-control` en lugar de `.form-textarea`; falta de enlace directo a *Ayuda* desde *Mi perfil*; discrepancia menor en formato de botones de cierre de lightbox (`✕` texto vs SVG). |

> [!IMPORTANT]
> **Nota de transparencia metodológica:** Se levantó el servidor local (`http://localhost:8765`), pero el entorno de inspección automática con Chrome DevTools MCP no pudo conectarse (`DevToolsActivePort` inexistente en el perfil local de Chrome). Por este motivo, **ninguna pantalla fue verificada visualmente en navegador renderizado en esta sesión**. Todos los hallazgos aquí documentados provienen de inspección exhaustiva de código fuente HTML/CSS/JS y cálculo programático de luminancia/contraste WCAG 2.2. Los aspectos dependientes de renderizado en vivo (solapamientos reales en `320–1920 px`, comportamiento de Leaflet y teclado virtual) quedan explícitamente separados como **verificaciones manuales requeridas** en la Sección 10.

---

## 2. Metodología

1. **Relevamiento e interpretación de skills:** Se verificaron las rutas e instrucciones reales de las skills instaladas en el workspace y en el entorno global antes de definir la matriz de evaluación.
2. **Inspección estática integral de código:**
   - **HTML (13 pantallas):** `index.html` y las 12 páginas en `pages/`. Se verificó semántica (`header`, `nav`, `main`, `footer`), enlaces de salto (`skip-link`), jerarquía de encabezados (`h1–h6`), atributos ARIA, formularios, etiquetas y consistencia de copy.
   - **CSS (17 archivos):** `variables.css`, `main.css`, `base.css`, `layout.css`, `responsive.css`, 10 parciales en `assets/css/components/` y 7 hojas en `assets/css/pages/`. Se auditó el uso de tokens, variables indefinidas, reglas de foco, transiciones, tamaños mínimos de toque (`< 44 px`), responsive y `@media (prefers-reduced-motion)`.
   - **JavaScript:** `main.js`, `components/navbar.js`, `components/modal.js`, `modules/map.js`, `utils/validators.js`, `pages/estadisticas.js` y `pages/ayuda.js`.
3. **Auditoría programática automatizada (Python):**
   - Cálculo exacto de relación de contraste WCAG 2.2 (luminancia relativa sRGB) sobre todos los pares de color de botones, enlaces, badges de estado, badges de categoría, notificaciones, footer, hero y buscador de ayuda.
   - Detección sistemática de variables CSS `var(--*)` utilizadas pero no declaradas en `variables.css`.
   - Escaneo de `transition: all`, supresiones `outline: none` / `0` y dimensiones `< 44 px` en controles interactivos.
4. **Criterio de certeza:** Se distingue estrictamente entre **defectos confirmados en código/cálculo** y **puntos a confirmar manualmente en navegador**.

---

## 3. Skills verificadas y utilizadas

Se verificó la disponibilidad real en disco (sin instalar dependencias ni skills nuevas):

| Skill | Ubicación verificada | Criterios aplicados a la auditoría |
| :--- | :--- | :--- |
| `antislop` / `antislop-ui` / `antislop-human` / `antislop-layoutmobile` | `C:\Users\Facundo-PC\.gemini\config\plugins\anti-slop\skills\` | Prohibición de emojis en UI de producción, detección de contenido genérico/simulado, cálculo de contraste real, prevención de overflow horizontal y reglas de layout móvil (`320–430 px`). |
| `emil-design-eng` | `j:\PROYECTOS\SolucionSegura\.agents\skills\emil-design-eng\SKILL.md` | Prohibición de `transition: all`, animaciones solo con `transform`/`opacity`, respeto granular a `prefers-reduced-motion`, áreas táctiles y detalles de microinteracción. |
| `impeccable` (+ `reference/audit.md`) | `j:\PROYECTOS\SolucionSegura\.agents\skills\impeccable\.agent\skills\impeccable\` | Detección de fallos técnicos de diseño, supresión agresiva de animaciones (`0.01ms`), variables rotas y coherencia tipográfica. |
| `ux-audit` & `ui-review` | `j:\PROYECTOS\SolucionSegura\.agents\skills\ux-audit\SKILL.md` y `ui-review\SKILL.md` | Flujo de usuario, fricción en tareas críticas, consistencia de componentes y jerarquía visual. |
| `ui-a11y`, `wcag-audit-patterns`, `fixing-accessibility` | `j:\PROYECTOS\SolucionSegura\.agents\skills\ui-a11y\`, `wcag-audit-patterns\`, `fixing-accessibility\` | Criterios WCAG 2.2 AA: contraste (1.4.3, 1.4.11), teclado y *focus trap* (2.1.1, 2.1.2, 2.4.3), *skip-link* (2.4.1), foco visible (2.4.7), semántica y ARIA (1.3.1, 4.1.2), tamaño de objetivo (2.5.8). |
| `mobile-design` | `j:\PROYECTOS\SolucionSegura\.agents\skills\mobile-design\SKILL.md` | Ergonomía *thumb-zone*, objetivos táctiles `≥ 44×44 px`, separación de controles en mapas y formularios frente a la barra inferior. |
| `form-cro` | `j:\PROYECTOS\SolucionSegura\.agents\skills\form-cro\SKILL.md` | Claridad de etiquetas, campos opcionales vs obligatorios, validación en línea y recuperación de errores sin pérdida de datos. |
| `data-storytelling` | `j:\PROYECTOS\SolucionSegura\.agents\skills\data-storytelling\SKILL.md` | Jerarquía de KPIs, consistencia matemática entre gráficos, legibilidad de ejes y no dependencia exclusiva del color. |
| `motion-foundations`, `motion-patterns`, `fixing-motion-performance` | `j:\PROYECTOS\SolucionSegura\.agents\skills\motion-foundations\`, `motion-patterns\`, `fixing-motion-performance\` | Propiedades animables en GPU, duración de transiciones y manejo correcto de movimiento reducido. |
| `web-design-guidelines` | `j:\PROYECTOS\SolucionSegura\.agents\skills\web-design-guidelines\SKILL.md` | Buenas prácticas generales de interfaz web, enlaces, formularios y estados vacíos. |
| `responsive-design` | **No instalada** en el entorno global ni en el workspace | Reemplazada por las reglas verificadas de `antislop-layoutmobile`, `mobile-design` e `impeccable`. |

---

## 4. Hallazgos críticos y altos

### Hallazgos Críticos

#### `AUD-CRIT-01` — Incumplimiento generalizado de contraste WCAG 2.2 AA en badges de estado y enlaces `#0284C7`
- **Pantalla / componente afectado:** Sistema de badges (`assets/css/components/badges.css`), enlaces globales (`#0284C7`), badge del icono de notificaciones (`navigation.css`), y badge inline en `pages/detalle-reclamo.html`.
- **Problema detectado:** Los textos de 10–12 px sobre fondos pastel de estado y el color de enlace `#0284C7` sobre blanco/gris claro no alcanzan el mínimo de **4.5:1** exigido para texto normal. En particular, *En revisión* (`2.86:1`) ni siquiera alcanza el umbral de **3.0:1** para texto grande o componentes gráficos.
- **Evidencia concreta (cálculo de luminancia WCAG):**
  - `.badge--revision` (`#D97706` sobre `#FEF3C7`): **2.86:1** (FALLA AA).
  - `.badge--resuelto` (`#16A34A` sobre `#DCFCE7`): **3.00:1** (FALLA AA).
  - `.badge--reabierto` (`#EA580C` sobre `#FFEDD5`): **3.11:1** (FALLA AA).
  - `.badge--recibido` (`#0284C7` sobre `#E0F2FE`) y `#detail-photos-badge` (`pages/detalle-reclamo.html:259`): **3.57:1** (FALLA AA).
  - `.badge--rechazado` (`#DC2626` sobre `#FEE2E2`): **3.95:1** (FALLA AA).
  - `.badge--cancelado` (`#64748B` sobre `#F1F5F9`): **4.34:1** (FALLA AA).
  - `--color-link` (`#0284C7` sobre `#FFFFFF` / `#F8FAFC`): **4.10:1** / **3.91:1** (FALLA AA en texto normal).
  - Badge numérico de campana (`#FFFFFF` sobre `#0284C7`, 10 px): **4.10:1** (FALLA AA).
- **Gravedad:** **Crítico**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 1.4.3 Contrast (Minimum) Nivel AA.
- **Corrección recomendada:**
  1. Oscurecer el texto de los badges manteniendo el tinte del fondo: `--state-revision` texto `#92400E` sobre `#FEF3C7`; `--state-resuelto` texto `#15803D` sobre `#DCFCE7`; `--state-reabierto` texto `#C2410C` sobre `#FFEDD5`; `--state-recibido` texto `#0369A1` sobre `#E0F2FE`; `--state-rechazado` texto `#B91C1C` sobre `#FEE2E2`; `--state-cancelado` texto `#475569` sobre `#F1F5F9` (como ya hace correctamente `notificaciones.css:85` con `#0369A1` sobre `#E0F2FE`).
  2. Cambiar `--color-link` y texto sobre fondo claro de `#0284C7` a `#0369A1` (contraste `≥ 5.9:1` sobre `#FFFFFF`), reservando `#0284C7` para bordes, iconos decorativos o fondos con texto oscuro.
  3. En el badge numérico de la campana de notificaciones, usar fondo `#062F66` o `#0369A1` con texto `#FFFFFF`.
- **Archivos relacionados:** `assets/css/variables.css`, `assets/css/components/badges.css`, `assets/css/components/navigation.css`, `pages/detalle-reclamo.html`.

#### `AUD-CRIT-02` — Modales sin *focus trap*, sin restauración de foco y con fuga de *listener* de teclado
- **Pantalla / componente afectado:** Componente global `modal.js` (usado en revisión de `nuevo-reclamo.html`, acciones de `detalle-reclamo.html`, etc.).
- **Problema detectado:** Al abrir un modal (`modal.open`), el foco inicial se mueve al diálogo o botón de cierre, pero al presionar `Tab` el usuario puede escapar del modal hacia los elementos ocultos detrás del backdrop. Al cerrarse (`modal.close`), el foco no vuelve al botón que abrió el modal. Además, el `keydown` de `Escape` solo se desuscribe si se cerró con `Escape`, acumulando *listeners* si el usuario cierra con el botón `×`.
- **Evidencia concreta:** `assets/js/components/modal.js:6-37` implementa `overlay.classList.add('is-open')` y un `handleKeyDown` puntual para `Escape`, sin gestionar `Tab`/`Shift+Tab`, sin guardar `document.activeElement` previo y sin remover `handleKeyDown` dentro de `modal.close()`.
- **Gravedad:** **Crítico**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 2.4.3 (Focus Order), SC 2.1.2 (No Keyboard Trap / Modal containment), WAI-ARIA Authoring Practices (Dialog Pattern).
- **Corrección recomendada:** Guardar `previousActiveElement = document.activeElement` al abrir; atrapar `Tab` y `Shift+Tab` entre los elementos enfocables visibles dentro de `.modal-dialog`; registrar un único `keydown` activo por modal abierto y removerlo siempre en `modal.close()`; devolver el foco a `previousActiveElement.focus()` al cerrar; cerrar también al hacer clic en el backdrop si no es destructivo.
- **Archivos relacionados:** `assets/js/components/modal.js`, `assets/css/components/modals.css`, `pages/nuevo-reclamo.html`, `pages/detalle-reclamo.html`.

#### `AUD-CRIT-03` — Ausencia del enlace de salto («Ir al contenido principal») en 12 de las 13 páginas
- **Pantalla / componente afectado:** Todas las páginas dentro de `pages/*.html`.
- **Problema detectado:** Solo `index.html` incluye `<a href="#main-content" class="skip-link">`. Quienes navegan por teclado o lector de pantalla en cualquiera de las 12 subpáginas deben tabular a través de toda la barra de navegación superior en cada carga de página.
- **Evidencia concreta:** Verificación estática sobre los 13 HTML: `index.html:31` tiene `.skip-link`; las 12 páginas en `pages/` (`ayuda.html`, `confirmacion.html`, `detalle-reclamo.html`, `estadisticas.html`, `explorar.html`, `iniciar-sesion.html`, `mis-reclamos.html`, `notificaciones.html`, `nuevo-reclamo.html`, `perfil.html`, `recuperar-contrasena.html`, `registro.html`) devuelven `skip-link=False` y `navbar.js` tampoco lo inyecta.
- **Gravedad:** **Crítico**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 2.4.1 (Bypass Blocks) Nivel A.
- **Corrección recomendada:** Inyectar dinámicamente el `<a href="#main-content" class="skip-link">Ir al contenido principal</a>` al inicio de `document.body` desde `setupNavigation()` en `assets/js/components/navbar.js` (si no existe ya en el DOM), asegurando que `#main-content` exista en el `<main>` de todas las páginas.
- **Archivos relacionados:** `assets/js/components/navbar.js`, `pages/*.html`.

---

### Hallazgos Altos

#### `AUD-ALT-01` — Gráfico SVG de evolución temporal en Estadísticas ilegible en pantallas móviles (320–430 px)
- **Pantalla / componente afectado:** `pages/estadisticas.html` — sección «Evolución mensual de reclamos».
- **Problema detectado:** El SVG se genera con `viewBox="0 0 860 240"` y textos de `font-size="11"` (`estadisticas.js:858,897,903`), pero en `estadisticas.css:641-646` `.stats-svg-chart` define `width: 100%; height: auto; min-height: 240px;` sin `min-width`. En un celular de `360 px` (contenedor de ~`328 px`), el SVG se comprime a `0.38×`, reduciendo los números de los ejes a **~4.2 px** efectivos y dejando bandas vacías arriba y abajo por el `min-height: 240px`.
- **Evidencia concreta:** `assets/js/pages/estadisticas.js:858-921` + `assets/css/pages/estadisticas.css:634-646`.
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 1.4.4 (Resize text) / Legibilidad en visualización de datos (`data-storytelling`, `mobile-design`).
- **Corrección recomendada:** Establecer `min-width: 640px` en `.stats-svg-chart` dentro de `.stats-chart-wrapper` (`overflow-x: auto` ya está declarado, pero hoy no se activa porque `width: 100%` encoge el SVG), o bien generar un `viewBox` compacto en móvil (`< 640 px`) con menos etiquetas X alternadas y `font-size="14"`. Además, agregar un indicador visual sutil de desplazamiento horizontal o tabla de datos accesible alternativa.
- **Archivos relacionados:** `assets/css/pages/estadisticas.css`, `assets/js/pages/estadisticas.js`.

#### `AUD-ALT-02` — 7 variables CSS referenciadas que no existen en `variables.css`
- **Pantalla / componente afectado:** Global (`layout.css`, `steps.css`, `navigation.css`), Autenticación (`auth.css`), Nuevo reclamo (`claim-form.css`, `nuevo-reclamo.html`), Detalle (`detalle-reclamo.html`).
- **Problema detectado:** Se utilizan tokens CSS inexistentes sin *fallback*, provocando que propiedades de color, altura mínima, interlineado y espaciado sean ignoradas por el navegador.
- **Evidencia concreta:**
  - `--color-success` en `assets/css/layout.css:299` (el punto verde `.hero-trust-proof__dot` queda sin `background-color`).
  - `--header-height` en `assets/css/pages/auth.css:15` (`min-height: calc(100vh - var(--header-height) - 120px)` se invalida por completo).
  - `--color-surface-subtle` en 8 lugares (`claim-form.css:1498,1597`, `detalle-reclamo.html:52,112,114,133,368`, `nuevo-reclamo.html:1254`).
  - `--color-text-primary` en 3 lugares (`layout.css:463`, `detalle-reclamo.html:223,365`).
  - `--line-height-normal` en 17 lugares (`navigation.css:716`, `auth.css:127,296`, `claim-form.css`, `detalle-reclamo.html`, `nuevo-reclamo.html`).
  - `--font-weight-normal` en `claim-form.css:191`.
  - `--space-7` en `assets/css/components/steps.css:43`.
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** Consistencia del sistema de diseño / Integridad visual.
- **Corrección recomendada:** Declarar explícitamente estos tokens en `assets/css/variables.css` (`--header-height: 72px;`, `--color-success: #16A34A;`, `--color-surface-subtle: #F1F5F9;`, `--color-text-primary: var(--color-text-main);`, `--line-height-normal: 1.5;`, `--font-weight-normal: 400;`, `--space-7: 1.75rem;`) o reemplazar cada referencia por el token canónico existente.
- **Archivos relacionados:** `assets/css/variables.css`, `assets/css/layout.css`, `assets/css/components/steps.css`, `assets/css/components/navigation.css`, `assets/css/pages/auth.css`, `assets/css/pages/claim-form.css`, `pages/detalle-reclamo.html`, `pages/nuevo-reclamo.html`.

#### `AUD-ALT-03` — Tipografía `Outfit` declarada en identidad pero anulada globalmente por `Inter` en `base.css`
- **Pantalla / componente afectado:** Global (`h1–h6` en todas las pantallas que no sobreescriben explícitamente `font-family`).
- **Problema detectado:** `assets/css/base.css:44-49` define `h1, h2, h3, h4, h5, h6 { font-family: var(--font-family-base); }`, que apunta a `Inter` en lugar de `var(--font-family-display)` (`Outfit`). Esto obliga a repetir `font-family: var(--font-family-display)` en múltiples clases sueltas y provoca que títulos estándar (`h2` de secciones en `detalle-reclamo.html`, `perfil.html`, `mis-reclamos.html`, `notificaciones.html`) se muestren en `Inter`.
- **Evidencia concreta:** `assets/css/base.css:44-46` vs `assets/css/variables.css` (`--font-family-display: 'Outfit', ...`).
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** Identidad visual y jerarquía tipográfica (Gestalt / Mordecki: contraste tipográfico entre título y cuerpo).
- **Corrección recomendada:** Cambiar `font-family: var(--font-family-display);` en la regla base `h1, h2, h3, h4, h5, h6` de `assets/css/base.css:45` y eliminar sobrescrituras redundantes.
- **Archivos relacionados:** `assets/css/base.css`.

#### `AUD-ALT-04` — Objetivos táctiles por debajo de 44×44 px en botones secundarios, cierres de modal/popup y switches
- **Pantalla / componente afectado:** Global (`.btn--sm`, `.modal-close-btn`), Mapas (`.leaflet-popup-close-button`), Explorar, Nuevo reclamo, Detalle, Ayuda y Perfil.
- **Problema detectado:** Varios controles interactivos clave en móvil tienen áreas táctiles de `24 px` a `40 px`, dificultando el toque preciso con el pulgar y aumentando errores de pulsación accidental.
- **Evidencia concreta:**
  - `.custom-leaflet-popup a.leaflet-popup-close-button`: `24px × 24px` (`assets/css/components/map.css:409-410`).
  - `.existing-claim-panel__close-btn`: `28px × 28px` (`assets/css/pages/claim-form.css:659-660`).
  - `.explorar-mobile-card__close`: `28px × 28px` (`assets/css/pages/explorar.css:338-339`).
  - `.ui-switch`: `height: 28px` sin área táctil extendida (`assets/css/pages/perfil.css:268`).
  - `#btn-sim-advance-status`: `min-height: 34px` inline (`pages/detalle-reclamo.html:340`).
  - `.btn--sm`: `min-height: 38px` (`assets/css/components/buttons.css:212`).
  - `.help-search-bar__clear`: `min-width: 38px; min-height: 38px` (`assets/css/pages/ayuda.css:140-141`).
  - `.modal-header .icon-btn`: `40px × 40px` (`assets/css/components/modals.css:86-88`).
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 2.5.8 (Target Size Minimum) / `mobile-design` (mínimo ergonómico 44×44 px en móvil).
- **Corrección recomendada:** Llevar los botones de cierre de modales, paneles y popups de Leaflet a un mínimo de `44×44 px` (o usar `padding` transparente / pseudo-elemento `::after` de `44×44 px` para mantener el ícono visual compacto sin sacrificar área táctil); aumentar `.btn--sm` en móvil (`< 768 px`) a `min-height: 44px` y envolver `.ui-switch` en un contenedor clickable de al menos `44 px` de alto.
- **Archivos relacionados:** `assets/css/components/buttons.css`, `assets/css/components/modals.css`, `assets/css/components/map.css`, `assets/css/pages/claim-form.css`, `assets/css/pages/explorar.css`, `assets/css/pages/ayuda.css`, `assets/css/pages/perfil.css`, `pages/detalle-reclamo.html`.

#### `AUD-ALT-05` — Elementos interactivos anidados e implementados con `<div role="listitem">` / `<article role="button">` en Notificaciones
- **Pantalla / componente afectado:** Dropdown de notificaciones (`navbar.js`) y pantalla `pages/notificaciones.html`.
- **Problema detectado:** En `navbar.js:582`, las notificaciones clicables se renderizan como `<div role="listitem" tabindex="0">`, careciendo de rol de botón o enlace nativo. En `pages/notificaciones.html:235`, cada tarjeta de notificación es un `<article role="button" tabindex="0">` que contiene enlaces `<a>` y botones `<button>` en su interior: esto viola HTML5 y ARIA (*interactive content inside interactive element*), confundiendo a lectores de pantalla y rompiendo la activación por teclado.
- **Evidencia concreta:** `assets/js/components/navbar.js:582` y `pages/notificaciones.html:235`.
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 4.1.2 (Name, Role, Value) y SC 1.3.1 (Info and Relationships).
- **Corrección recomendada:** En `notificaciones.html`, quitar `role="button"` y `tabindex="0"` del `<article>`, convirtiendo el título/cuerpo en un enlace `<a href="...">` principal (o usando técnica de *stretched link* con `z-index` mayor en el botón secundario de «Marcar como leída»). En `navbar.js`, usar `<a href="...">` o `<button type="button">` dentro de `<li>` en una lista `<ul>`.
- **Archivos relacionados:** `pages/notificaciones.html`, `assets/js/components/navbar.js`.

#### `AUD-ALT-06` — Pérdida de descubribilidad de «Ayuda» en móvil y de «Mis reclamos» en escritorio
- **Pantalla / componente afectado:** Navegación global (`navbar.js`, `pages/perfil.html`).
- **Problema detectado:**
  1. **Móvil:** La barra inferior tiene 5 destinos (`Inicio`, `Explorar`, `Reportar`, `Estadísticas`, `Perfil`). *Ayuda* no figura en la barra inferior, tampoco en la cabecera móvil (solo logo + campana), y `pages/perfil.html` enlaza a `mis-reclamos.html` (`perfil.html:192`) pero **no incluye ningún enlace a `ayuda.html`**. Un usuario móvil debe hacer scroll hasta el footer para encontrar el Centro de Ayuda.
  2. **Escritorio:** En el header desktop, *Mis reclamos* está oculto dentro del menú desplegable del avatar de usuario (`navbar.js`), por lo que no es visible a simple vista ni accesible cuando el usuario no ha iniciado sesión (solo aparece en el footer).
- **Evidencia concreta:** `assets/js/components/navbar.js` (estructura de nav desktop y mobile bottom nav) y `pages/perfil.html:192` (ausencia de enlace a `ayuda.html`).
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** Heurística #6 de Nielsen (Reconocimiento antes que recuerdo) y arquitectura de información.
- **Corrección recomendada:** Agregar un acceso directo claro a «Centro de Ayuda y Preguntas Frecuentes» en `pages/perfil.html` (junto al enlace a «Mis reclamos») y un icono discreto `?` o enlace en la cabecera móvil / menú de usuario. En escritorio, evaluar mostrar «Mis reclamos» en la barra principal cuando el usuario está autenticado o darle mayor prominencia en la zona derecha.
- **Archivos relacionados:** `assets/js/components/navbar.js`, `pages/perfil.html`.

#### `AUD-ALT-07` — Supresión de `outline: none` en foco sin reemplazo visible suficiente en selectores de Explorar y Cards
- **Pantalla / componente afectado:** `pages/explorar.html` (`.explorar-select`) y tarjetas de categoría (`index.html`).
- **Problema detectado:** En `assets/css/pages/explorar.css:134`, `.explorar-select` declara `outline: none;` en su estado base; aunque define `:focus` con `box-shadow`, en modo de alto contraste de Windows (*Forced Colors*) los `box-shadow` desaparecen, dejando al `<select>` sin indicador de foco. Además, en `assets/css/components/cards.css:226`, `.category-card__link` declara `outline: none;` en `:focus` (luego restaurado solo en `:focus-visible`).
- **Evidencia concreta:** `assets/css/pages/explorar.css:134-142` y `assets/css/components/cards.css:215-237`.
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 2.4.7 (Focus Visible) Nivel AA.
- **Corrección recomendada:** Nunca declarar `outline: none` en el selector base; usar `outline: 2px solid transparent` (que se preserva en *Forced Colors*) acompañado de `box-shadow` en `:focus-visible`, o mantener la regla global de `base.css` (`outline: 2px solid var(--color-brand-sky)`).
- **Archivos relacionados:** `assets/css/pages/explorar.css`, `assets/css/components/cards.css`.

#### `AUD-ALT-08` — Barra segmentada de estados en Estadísticas depende de `aria-label` sobre `<div>` sin rol semántico
- **Pantalla / componente afectado:** `pages/estadisticas.html` (`#stats-status-bar`).
- **Problema detectado:** `estadisticas.js:784-788` genera segmentos `<div class="stats-status-bar__seg" aria-label="..." title="...">` sin `role="img"` ni texto accesible interno. Muchos lectores de pantalla ignoran `aria-label` sobre elementos `<div>` genéricos.
- **Evidencia concreta:** `assets/js/pages/estadisticas.js:784-788`.
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** WCAG 2.2 SC 1.1.1 (Non-text Content) y SC 4.1.2 (Name, Role, Value).
- **Corrección recomendada:** Agregar `role="img"` en cada segmento o en el contenedor `#stats-status-bar` con un resumen completo en `aria-label` (ej. `"Distribución: 90% resueltos, 6.7% activos, 3.3% desestimados"`), complementado por las filas textuales que ya existen debajo.
- **Archivos relacionados:** `assets/js/pages/estadisticas.js`.

#### `AUD-ALT-09` — Flujo de «Fotografías adjuntas» en Nuevo Reclamo carece de selector real o explicación clara de maqueta
- **Pantalla / componente afectado:** `pages/nuevo-reclamo.html` — Bloque 3 («Descripción y fotografías»).
- **Problema detectado:** El bloque muestra un contador pre-cargado («3 fotografías adjuntas») e imágenes de muestra sin `<input type="file">` ni botón para subir/quitar fotos propias. El encabezado dice «Añadí referencias o detalles útiles y adjuntá fotos», creando la expectativa de que el usuario puede cargar su foto, cuando en realidad no hay control de carga.
- **Evidencia concreta:** `pages/nuevo-reclamo.html:400-412` y `488-490` (donde recién en el modal de revisión aparece la etiqueta «Fotografías de muestra asociadas»).
- **Gravedad:** **Alto**
- **Principio UX/UI o WCAG:** Heurística #2 de Nielsen (Relación entre el sistema y el mundo real) / Donald Norman (Modelo mental y significantes engañosos).
- **Corrección recomendada:** Si por alcance académico las fotos son simuladas, explicitarlo desde el Bloque 3 («Fotografías de muestra automáticas según categoría — simulación») o habilitar un `<input type="file" accept="image/*" multiple>` con vista previa local (`URL.createObjectURL`) para cumplir con el significante prometido.
- **Archivos relacionados:** `pages/nuevo-reclamo.html`.

---

## 5. Hallazgos medios y bajos

### Hallazgos Medios

| ID | Pantalla / Componente | Problema detectado | Evidencia concreta | Principio / WCAG | Corrección recomendada | Archivos |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `AUD-MED-01` | Header Desktop (`index.html` vs `navbar.js`) | Inconsistencia de etiqueta del CTA principal: el HTML estático dice «Nuevo reclamo» y `navbar.js` lo sobreescribe por «Realizar reclamo». | `index.html:62` vs `assets/js/components/navbar.js:131,150` | Consistencia y estándares (Nielsen #4) | Unificar el texto a «Realizar reclamo» en `index.html` para evitar *flash* de cambio de texto al hidratar. | `index.html`, `navbar.js` |
| `AUD-MED-02` | `pages/explorar.html` | Salto en la jerarquía de encabezados (`h1` → `h3` antes del primer `h2`). | Escaneo HTML: `headings=['1', '3', '2', '3']` en `pages/explorar.html` | WCAG 1.3.1 (Info and Relationships) | Convertir el primer `<h3>` en `<h2>` (o ajustar niveles en el panel de filtros/lista) para mantener secuencia estricta. | `pages/explorar.html` |
| `AUD-MED-03` | Global (7 hojas CSS) | Uso de `transition: all` en 18 reglas CSS, animando propiedades de layout innecesarias y generando riesgo de *jank*. | `steps.css:415,563`, `layout.css:576`, `auth.css:163`, `claim-form.css` (10 líneas), `explorar.css:161`, `notificaciones.css:42,107,320`, `perfil.css:325` | `emil-design-eng` / `fixing-motion-performance` | Reemplazar `all` por propiedades explícitas (`background-color`, `border-color`, `color`, `transform`, `opacity`). | `layout.css`, `steps.css`, `pages/*.css` |
| `AUD-MED-04` | Global (`base.css`) | Regla `* { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` dentro de `prefers-reduced-motion: reduce` elimina incluso transiciones suaves de opacidad. | `assets/css/base.css:94-101` | `impeccable` / `motion-foundations` | Desactivar animaciones de desplazamiento/escala (`transform`) y loops infinitos, permitiendo disolvencias cortas de `opacity` (`≤ 150ms`) para no perder feedback de estado. | `assets/css/base.css` |
| `AUD-MED-05` | `pages/ayuda.html` (`ayuda.js`) | Las píldoras de categoría móvil (`.js-help-mobile-pill`) no actualizan `aria-pressed` o `aria-selected` al activarse (a diferencia de los botones desktop). | `assets/js/pages/ayuda.js:785-794` | WCAG 4.1.2 (Name, Role, Value) | Agregar `aria-pressed="${isCurrent}"` a `.js-help-mobile-pill` y corregir `role="list"` sin `role="listitem"` en `.help-faq-list` (`ayuda.js:818`). | `assets/js/pages/ayuda.js` |
| `AUD-MED-06` | `explorar.html`, `nuevo-reclamo.html`, `mis-reclamos.html`, `detalle-reclamo.html` | Uso de emojis (`📍`, `🔍`, `👥`, `💡`) mezclados con iconografía SVG lineal, rompiendo consistencia visual entre OS. | `explorar.html:179`, `nuevo-reclamo.html:190,207`, `mis-reclamos.html:162`, `detalle-reclamo.html:326` | `antislop-ui` / Consistencia visual | Reemplazar todos los emojis por iconos SVG del set lineal (`stroke-width="2"`) usados en el resto de la app. | `pages/explorar.html`, `nuevo-reclamo.html`, `mis-reclamos.html`, `detalle-reclamo.html` |
| `AUD-MED-07` | `pages/ayuda.html` (`ayuda.css`) | El placeholder del buscador `#94A3B8` sobre `#FFFFFF` tiene contraste **2.56:1** (por debajo de 4.5:1). | `assets/css/pages/ayuda.css:125-128` | WCAG 1.4.3 (Contrast) | Oscurecer el placeholder a `#64748B` (**4.76:1** sobre `#FFFFFF`). | `assets/css/pages/ayuda.css` |
| `AUD-MED-08` | `pages/estadisticas.html` & `index.html` | Coherencia de datos: `estadisticas.js` suma exacto (`86 + 1156 + 42 = 1284`), pero los datos son estáticos de demostración y no reflejan nuevos reclamos creados en `localStorage` durante la sesión. | `assets/js/pages/estadisticas.js:18-40` | Heurística #1 de Nielsen (Visibilidad del estado del sistema) | Documentar en un aviso sutil en *Estadísticas* si los KPIs corresponden al corte histórico municipal demo o integrar el conteo dinámico de `claimsService`. | `assets/js/pages/estadisticas.js` |

### Hallazgos Bajos

| ID | Pantalla / Componente | Problema detectado | Evidencia concreta | Principio / WCAG | Corrección recomendada | Archivos |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `AUD-BAJ-01` | `assets/css/variables.css` | Comentario técnico afirma erróneamente que `#062F66` sobre `#F98001` cumple AAA (`> 6.6:1`), cuando su contraste real calculado es **5.05:1** (cumple **AA**, no AAA que exige 7:1). | `assets/css/variables.css` (cálculo verificado: 5.05:1) | Precisión documental | Corregir el comentario en `variables.css` a `AA (5.05:1)`. | `assets/css/variables.css` |
| `AUD-BAJ-02` | `pages/detalle-reclamo.html`, `pages/perfil.html` | Proliferación de estilos `style="..."` inline para márgenes, tipografías y colores que duplican clases utilitarias o de tarjeta. | `pages/detalle-reclamo.html:52,112,223,252,259,323-340`, `pages/perfil.html:192` | Mantenibilidad / Consistencia CSS | Mover esos estilos a clases semánticas en una hoja dedicada `assets/css/pages/detalle.css` y en `perfil.css`. | `pages/detalle-reclamo.html`, `pages/perfil.html` |
| `AUD-BAJ-03` | `pages/detalle-reclamo.html` | Uso de clase inexistente `.form-control` en `<textarea>` en lugar de `.form-textarea` de `forms.css`. | `pages/detalle-reclamo.html:229` | Consistencia de componentes | Reemplazar `.form-control` por `.form-textarea`. | `pages/detalle-reclamo.html` |
| `AUD-BAJ-04` | `pages/nuevo-reclamo.html` | Botón de cierre del lightbox usa carácter Unicode `✕` (`btn-close-lightbox`) en vez de SVG como los modales. | `pages/nuevo-reclamo.html:524` | Consistencia de iconografía | Usar el mismo SVG de cierre de `modals.css` y asegurar tamaño mínimo `44×44 px`. | `pages/nuevo-reclamo.html` |
| `AUD-BAJ-05` | `pages/recuperar-contrasena.html` | El subtítulo dice explícitamente «enlace de recuperación **simulado**», rompiendo la inmersión del usuario final (a diferencia del resto del copy cívico). | `pages/recuperar-contrasena.html:38` | `antislop` / UX Writing | Cambiar a «Ingresá tu correo electrónico y te enviaremos instrucciones para restablecer tu acceso.» | `pages/recuperar-contrasena.html` |

---

## 6. Evaluación por pantalla (13 pantallas)

| Pantalla | Estado general | Hallazgos confirmados principales | Verificación manual requerida en navegador |
| :--- | :---: | :--- | :--- |
| `index.html` | Bueno | Único con `skip-link`; `AUD-MED-01` (texto CTA `Nuevo` vs `Realizar`), `AUD-ALT-02` (`--color-success` y `--color-text-primary`), `AUD-ALT-07` (`cards.css` focus). | Colapso de `.hero-collage` y mapa preview entre `320–430 px` y `768–1024 px`. |
| `pages/explorar.html` | Regular | Falta `skip-link` (`AUD-CRIT-03`), `AUD-ALT-04` (`28px` mobile card close, `24px` popup close), `AUD-ALT-07` (`outline: none`), `AUD-MED-02` (salto `h1→h3`), `AUD-MED-06` (`📍`). | Superposición de controles Leaflet con barra inferior móvil y filtros en `320–390 px`. |
| `pages/nuevo-reclamo.html` | Regular | Falta `skip-link`, `AUD-CRIT-02` (modal de revisión sin *focus trap*), `AUD-ALT-02` (`--color-surface-subtle`, `--line-height-normal`), `AUD-ALT-04` (`28px` panel cercano), `AUD-ALT-09` (fotos sin upload real), `AUD-MED-06` (`🔍`, `👥`). | Interacción táctil con mapa Leaflet en `320–430 px` y apertura del teclado virtual al buscar dirección. |
| `pages/confirmacion.html` | Bueno | Falta `skip-link` (`AUD-CRIT-03`), sin `mobile-bottom-nav` en HTML (inyectado dinámicamente por `navbar.js:176`). | Alineación de tarjeta de código único y botones de acción en `320 px`. |
| `pages/detalle-reclamo.html` | Regular | Falta `skip-link`, `AUD-CRIT-01` (badges y `#detail-photos-badge` 3.57:1), `AUD-CRIT-02` (modales), `AUD-ALT-02` (`--color-surface-subtle`, `--color-text-primary`), `AUD-ALT-04` (`min-height: 34px`), `AUD-BAJ-02/03`. | Distribución de 2 columnas vs 1 columna en `768–1024 px` y timeline vertical en móvil. |
| `pages/mis-reclamos.html` | Bueno | Falta `skip-link`, `AUD-CRIT-01` (badges de estado), `AUD-ALT-06` (descubribilidad en desktop), `AUD-MED-06` (`📍`). | Tabs «Mis reportes» / «Apoyados» y tarjetas en `320–360 px`. |
| `pages/estadisticas.html` | Requiere atención | Falta `skip-link`, `AUD-ALT-01` (SVG ilegible en móvil), `AUD-ALT-08` (barra segmentada sin `role="img"`), `AUD-MED-08`. | Legibilidad real del gráfico de líneas y barras de ranking en `320–430 px`. |
| `pages/ayuda.html` | Bueno | Falta `skip-link`, `AUD-ALT-04` (`38px` limpiar búsqueda, ~`26px` tags rápidos), `AUD-ALT-06` (acceso desde móvil), `AUD-MED-05` (`aria-pressed` en píldoras y `role="list"` en FAQs), `AUD-MED-07` (placeholder 2.56:1). | Dropdown de resultados de búsqueda en `320 px` y scroll al abrir FAQ desde hash. |
| `pages/perfil.html` | Bueno | Falta `skip-link`, `AUD-ALT-04` (`.ui-switch` `28px`), `AUD-ALT-06` (sin enlace a *Ayuda*), `AUD-BAJ-02`. | Layout de 2 columnas en `900 px` y manejo de emails largos en `320 px`. |
| `pages/notificaciones.html` | Requiere atención | Falta `skip-link`, `AUD-ALT-05` (`<article role="button">` con botones/links anidados), `AUD-MED-03` (`transition: all`). | Botones de filtro «Todas / Sin leer» y «Marcar todas» en `320–360 px`. |
| `pages/iniciar-sesion.html` | Bueno | Falta `skip-link`, `AUD-ALT-02` (`--header-height` roto en `auth.css:15` y `--line-height-normal`). | Centrado vertical en `1440–1920 px` y comportamiento con teclado virtual en móvil. |
| `pages/registro.html` | Bueno | Falta `skip-link`, `AUD-ALT-02` (`--header-height`, `--line-height-normal`). | Validación en vivo de campos y visibilidad de errores sobre teclado virtual. |
| `pages/recuperar-contrasena.html` | Bueno | Falta `skip-link`, `AUD-ALT-02` (`--header-height`), `AUD-BAJ-05` (copy «simulado»). | Centrado y mensajes de estado tras envío en `320–1920 px`. |

---

## 7. Problemas transversales

1. **Sistema de color y contraste (`WCAG 1.4.3`):** Excelente uso del naranja `#F98001` con texto `#062F66` (**5.05:1**, AA aprobado) y de categorías (`pavimento` **4.52:1**, `residuos` **4.84:1**, `alumbrado` **5.98:1**). En contraste, 6 de 7 badges de estado y el celeste `#0284C7` usado como texto de enlace (**4.10:1**) fallan 4.5:1.
2. **Higiene de tokens CSS:** 7 variables indefinidas y 18 reglas con `transition: all` dispersas entre `layout.css`, `steps.css` y hojas `pages/*.css`.
3. **Tipografía de identidad:** `Outfit` está importada y declarada en `--font-family-display`, pero `base.css:45` asigna `Inter` a `h1–h6`.
4. **Accesibilidad de teclado y lectores de pantalla:** Solo `index.html` posee `skip-link`; `modal.js` no atrapa ni restaura el foco; `notificaciones.html` anida elementos interactivos.
5. **Ergonomía táctil móvil:** Múltiples botones de cierre (`24–40 px`) y `.btn--sm` (`38 px`) incumplen el umbral ergonómico de `44×44 px`.

---

## 8. Buenas decisiones de diseño que deben conservarse

- **Contraste del CTA principal:** La decisión de usar azul oscuro `#062F66` sobre naranja `#F98001` (**5.05:1**) en lugar de blanco sobre naranja (**2.59:1**, que habría fallado gravemente) es acertada y debe mantenerse intacta.
- **Contraste en categorías:** `#C2410C` sobre `#FFEDD5` (4.52:1), `#047857` sobre `#D1FAE5` (4.84:1) y `#6D28D9` sobre `#EDE9FE` (5.98:1) cumplen AA con claridad semántica.
- **Arquitectura móvil *app-like*:** La barra inferior fija de 5 destinos con botón central elevado *Reportar*, combinada con la detección `visualViewport` en `navbar.js` (`body.keyboard-is-open`) que oculta la barra al abrir el teclado virtual, evita uno de los errores más frecuentes en web apps móviles.
- **Modales como *bottom-sheet* en móviles (`modals.css`):** Adaptar los diálogos a hojas inferiores en `< 640 px` con manija visual mejora la ergonomía de una mano.
- **Consistencia matemática en `estadisticas.js`:** Todos los subtotales por localidad y estado cuadran exactamente (`activos + resueltos + desestimados = registrados`) y se acompañan de valores numéricos + porcentajes sin depender solo del color en las listas.
- **Prevención de duplicados en `nuevo-reclamo.html`:** El panel de reclamos cercanos antes de confirmar reduce la fragmentación de apoyos vecinales.

---

## 9. Relación con los principios académicos

- **Jakob Nielsen:**
  - *Prevención de errores (#5):* Bien lograda en el borrador automático y modal de confirmación de `nuevo-reclamo.html` y en la detección de reclamos cercanos. Falla en `modal.js` (posibilidad de tabular fuera del diálogo).
  - *Consistencia y estándares (#4):* Afectada por el texto distinto del CTA (`Nuevo reclamo` vs `Realizar reclamo`), emojis mezclados con SVG (`AUD-MED-06`) y encabezados `h1–h6` en `Inter` en algunas páginas y `Outfit` en otras (`AUD-ALT-03`).
  - *Reconocimiento antes que recuerdo (#6):* Debilitada al ocultar *Ayuda* en móvil fuera de Perfil/Bottom Nav y *Mis reclamos* dentro del dropdown de usuario en desktop (`AUD-ALT-06`).
- **Donald Norman:**
  - *Significantes y modelo mental:* El Bloque 3 de `nuevo-reclamo.html` promete «adjuntá fotos» pero muestra imágenes precargadas sin selector (`AUD-ALT-09`), creando un desajuste entre significante y capacidad real. Por otro lado, los botones de categoría con color + icono + descripción breve son excelentes significantes.
  - *Feedback:* Los toasts (`toast.css`), estados de carga con spinner (`.btn-spinner`) y el indicador «Guardado en borrador» comunican bien el estado del sistema.
- **Daniel Mordecki (*Mirar, leer y pensar*):**
  - *Mirar (escaneo visual):* La jerarquía visual en *Home* y *Ayuda* guía rápidamente la vista hacia el CTA naranja y las categorías. Sin embargo, el bajo contraste de badges pastel como *En revisión* (2.86:1) reduce el escaneo rápido de estados.
  - *Leer y pensar:* El lenguaje cívico en *Ayuda* (`ayuda.js`) es directo y libre de jerga burocrática, minimizando la carga cognitiva.
- **Leyes de la Gestalt:**
  - *Proximidad y Región Común:* Las tarjetas de formularios en `nuevo-reclamo.html` (3 bloques numerados) y los paneles de KPIs en `estadisticas.html` agrupan correctamente controles relacionados.
  - *Similitud:* La consistencia cromática de categorías (naranja calles, verde residuos, violeta alumbrado) aplicada de forma idéntica entre tarjetas, badges y marcadores de Leaflet refuerza la asociación instantánea.

---

## 10. Plan de correcciones priorizado

### Prioridad 0 — Bloqueantes / Críticos (hacer primero)
1. **Corregir contraste en `variables.css`, `badges.css`, `navigation.css` y `detalle-reclamo.html` (`AUD-CRIT-01`):** Ajustar colores de texto de los 6 badges con falla, cambiar `--color-link` a `#0369A1` y oscurecer el badge de campana.
2. **Implementar *focus trap*, restauración de foco y limpieza de *listener* en `assets/js/components/modal.js` (`AUD-CRIT-02`).**
3. **Inyectar `.skip-link` globalmente desde `assets/js/components/navbar.js` (`AUD-CRIT-03`).**

### Prioridad 1 — Altos (usabilidad móvil, tokens y semántica)
4. **Hacer legible el gráfico SVG de Estadísticas en móviles (`AUD-ALT-01`):** Añadir `min-width: 640px` a `.stats-svg-chart` o adaptar `viewBox` y `font-size` bajo `< 640 px`; añadir `role="img"` en `#stats-status-bar` (`AUD-ALT-08`).
5. **Definir las 7 variables CSS faltantes en `variables.css` (`AUD-ALT-02`)** y aplicar `--font-family-display` (`Outfit`) a `h1–h6` en `base.css` (`AUD-ALT-03`).
6. **Llevar todos los controles interactivos a `≥ 44×44 px` en móvil (`AUD-ALT-04`):** cierres de popup Leaflet, cierres de paneles en Explorar/Nuevo reclamo, `.btn--sm`, `.modal-close-btn` y `.ui-switch`.
7. **Corregir semántica de tarjetas en `notificaciones.html` y `navbar.js` (`AUD-ALT-05`)** eliminando elementos interactivos anidados.
8. **Mejorar descubribilidad de *Ayuda* en `perfil.html` y de *Mis reclamos* (`AUD-ALT-06`),** y reemplazar `outline: none` por indicadores compatibles con *Forced Colors* (`AUD-ALT-07`).
9. **Alinear el significante de fotografías en `nuevo-reclamo.html` (`AUD-ALT-09`).**

### Prioridad 2 — Medios y Bajos (pulido y consistencia)
10. Unificar texto de CTA en `index.html` (`AUD-MED-01`), corregir `h1 → h2` en `explorar.html` (`AUD-MED-02`), reemplazar 18 `transition: all` por propiedades específicas (`AUD-MED-03`), suavizar `prefers-reduced-motion` (`AUD-MED-04`), agregar `aria-pressed` a píldoras móviles de *Ayuda* (`AUD-MED-05`), reemplazar emojis por SVG (`AUD-MED-06`), oscurecer placeholder de *Ayuda* (`AUD-MED-07`) y limpiar estilos inline / clases en `detalle-reclamo.html` (`AUD-BAJ-01..05`).

### Checklist de verificación manual requerida en navegador (`320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px`)
- [ ] Confirmar ausencia de scroll horizontal (`document.documentElement.scrollWidth <= window.innerWidth`) en las 13 pantallas a `320 px` y `360 px`.
- [ ] Verificar que los controles de zoom de Leaflet (`Explorar` y `Nuevo reclamo`) y popups abiertos no queden tapados por `.mobile-bottom-nav` en `360×640 px` y `390×844 px`.
- [ ] Probar foco real del teclado (`Tab` / `Shift+Tab` / `Enter` / `Escape`) en navbar, dropdown de usuario/notificaciones, modales, acordeones de *Ayuda* y puntos del gráfico SVG de *Estadísticas*.
- [ ] Probar apertura del teclado virtual en móvil sobre formularios (`iniciar-sesion.html`, `registro.html`, `nuevo-reclamo.html`) para validar que `.mobile-bottom-nav` se oculta y los campos no quedan cubiertos.

