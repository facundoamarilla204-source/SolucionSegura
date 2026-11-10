# SoluciónSegura — Plataforma Conceptual de Reclamos Urbanos

> **Trabajo Práctico Final — Visualización e Interfaces**  
> **Universidad Nacional de La Matanza (UNLaM)**

---

## 1. Naturaleza y Propósito

**SoluciónSegura** es una maqueta académica funcional desarrollada con tecnologías web estándar (**HTML5, CSS3 modular y JavaScript Vanilla con ES Modules**).

El objetivo es demostrar principios avanzados de **interacción persona-ordenador (HCI), heurísticas de usabilidad (Nielsen, Norman, Mordecki, Scolari, Shneiderman), diseño visual accesible (WCAG 2.2 AA) y una experiencia mobile-first** orientada a la participación comunitaria en el partido de **La Matanza**, Provincia de Buenos Aires.

> [!NOTE]  
> **Aviso de prototipo académico:** Este proyecto es una propuesta conceptual independiente para fines pedagógicos y evaluativos. No es un canal oficial de la Municipalidad de La Matanza ni se conecta a dependencias gubernamentales reales.

---

## 2. Cómo Ejecutar el Proyecto Localmente

Al utilizar **JavaScript ES Modules (`import`/`export`)**, los navegadores modernos exigen que los archivos se sirvan a través del protocolo HTTP/HTTPS (no mediante `file:///`) para respetar las políticas de seguridad CORS del navegador.

Podés ejecutar la plataforma con cualquiera de las siguientes alternativas ligeras:

### Opción A: Con Node.js (Recomendada)
```bash
# Desde la raíz del proyecto:
npx serve .
# o también:
npx http-server . -p 8080
```
Abrí en tu navegador: `http://localhost:3000` (o el puerto indicado en la terminal).

### Opción B: Con Python 3
```bash
# Desde la raíz del proyecto:
python -m http.server 8000
```
Abrí en tu navegador: `http://localhost:8000`.

### Opción C: Con VS Code
* Instalá la extensión **Live Server** (Ritwick Dey).
* Hacé clic derecho sobre `index.html` y seleccioná **"Open with Live Server"**.

---

## 3. Arquitectura del Proyecto (MPA)

El proyecto está organizado como una **arquitectura multipágina (MPA)** limpia y predecible:

```
SolucionSegura/
├── index.html                   # Pantalla de Inicio (Home y Hero institucional)
├── pages/                       # Vistas secundarias de la plataforma
│   ├── explorar.html            # Explorador de reclamos (Mapa interactivo y Lista)
│   ├── detalle-reclamo.html     # Detalle público con seguimiento y adhesiones
│   ├── nuevo-reclamo.html       # Formulario continuo en vista única
│   ├── confirmacion.html        # Confirmación de envío con código #LM-XXXXX
│   ├── mis-reclamos.html        # Panel privado (Todos, Creados por mí, Me sumé)
│   ├── estadisticas.html        # Indicadores de gestión y tasas de resolución
│   ├── ayuda.html               # Guía en 3 pasos, FAQ interactivo y contacto
│   ├── iniciar-sesion.html      # Acceso simulado (Google y Email/Password)
│   ├── registro.html            # Registro ciudadano mínimo (sin padrón ni DNI)
│   ├── recuperar-contrasena.html# Recuperación de acceso con confirmación
│   ├── perfil.html              # Preferencias del vecino y localidad habitual
│   └── notificaciones.html      # Bandeja de alertas y actualizaciones de casos
│
├── assets/
│   ├── css/                     # Estilos modulares organizados por responsabilidad
│   │   ├── variables.css        # Tokens de diseño: colores (#062F66, #078DFA), tipografía, radios
│   │   ├── base.css             # Normalización, accesibilidad y foco visible
│   │   ├── layout.css           # Desktop container (max-width: 1180px centrado) y shell móvil
│   │   ├── responsive.css       # Media queries transversales y utilidades
│   │   ├── main.css             # Hoja de estilos consolidadora para las páginas
│   │   ├── components/          # Componentes visuales desacoplados
│   │   │   ├── buttons.css      # Botones con respuesta física (:active scale 0.97)
│   │   │   ├── cards.css        # Tarjetas de reclamos e indicadores
│   │   │   ├── forms.css        # Campos touch-friendly y validaciones accesibles
│   │   │   ├── badges.css       # Estados y categorías (Color + Icono + Texto)
│   │   │   ├── navigation.css   # Cabecera desktop y barra inferior fija para celular
│   │   │   ├── modals.css       # Diálogos emergentes accesibles
│   │   │   └── toast.css        # Notificaciones no intrusivas con opción de deshacer
│   │   └── pages/               # Estilos específicos de cada pantalla
│   │
│   ├── js/                      # JavaScript modular (ES Modules)
│   │   ├── main.js              # Punto de entrada compartido para inicialización de vistas
│   │   ├── components/          # Componentes de interacción reutilizables
│   │   │   ├── navbar.js        # Gestión de rutas activas y estado de sesión en cabecera/móvil
│   │   │   ├── toast.js         # Sistema accesible de notificaciones temporales
│   │   │   └── modal.js         # Apertura y cierre de diálogos con foco accesible
│   │   ├── modules/             # Lógica funcional de negocio
│   │   │   ├── auth.js          # Autenticación ficticia y persistencia de usuario
│   │   │   └── claims.js        # CRUD simulado, adhesiones vecinales y filtros
│   │   ├── data/                # Datos semilla y referencias territoriales
│   │   │   ├── seed-reclamos.js # Colección inicial de reclamos en La Matanza
│   │   │   └── localidades.js   # Localidades del partido y coordenadas
│   │   └── utils/               # Funciones utilitarias
│   │       ├── storage.js       # Abstracción reactiva sobre localStorage
│   │       ├── validators.js    # Validaciones de formato sin dependencias
│   │       └── formatters.js    # Fechas relativas cotidianas y códigos #LM-XXXXX
│   │
│   ├── img/                     # Recursos gráficos estructurados
│   │   ├── branding/            # Logotipos institucionales vectoriales (SVG)
│   │   ├── hero/                # Recursos para la sección de bienvenida
│   │   ├── reclamos/            # Fotografías de prueba organizadas por categoría
│   │   │   ├── calles/
│   │   │   ├── residuos/
│   │   │   └── alumbrado/
│   │   ├── illustrations/       # Recursos gráficos conceptuales
│   │   └── icons/               # Iconografía vectorial
│   └── fonts/                   # Tipografías locales opcionales
│
├── docs/                        # Documentación académica y de diseño
│   ├── Documentacion_funcional_Reclamos_La_Matanza_.md  # Especificación de 36 decisiones
│   └── Diagnostico_y_Plan_Preparacion_SolucionSegura.md # Análisis heurístico y plan de trabajo
└── README.md                    # Esta guía
```

---

## 4. Reglas Fundamentales de Diseño y Usabilidad

1. **Layout Desktop Controlado:** La aplicación nunca ocupa el 100% del ancho en monitores de escritorio; utiliza un contenedor centrado con `max-width: 1180px`, márgenes automáticos y espaciado generoso.
2. **Mobile-First Real:** Diseñada para uso con una sola mano en la vía pública (zona del pulgar), con barra inferior fija y objetivos táctiles $\ge 44\times 44\text{ px}$.
3. **Cero Burocracia Innecesaria:** El padrón municipal y el DNI fueron eliminados definitivamente. El registro y el ingreso son mínimos.
4. **Respaldo Comunitario:** Los vecinos pueden sumarse con un solo toque a reclamos existentes para evitar incidencias duplicadas.
5. **Persistencia Transparente:** La sesión, los reclamos creados y los borradores se guardan en el `localStorage` del navegador. Se incluye un botón de restablecimiento en *Mi Perfil* para reiniciar las pruebas docentes.

