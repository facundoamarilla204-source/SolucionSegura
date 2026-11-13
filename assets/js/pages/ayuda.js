/**
 * SoluciónSegura — Centro de Ayuda (pages/ayuda.html)
 * Contenido categorizado interactivo en vista única (SPA)
 * Redacción cívica directa, sin jerga de plantilla ni estructuras repetitivas
 */

import { auth } from '../modules/auth.js';

// ==========================================================================
// 1. BASE DE CONOCIMIENTO (CONTENIDO ESPECÍFICO SEGÚN LA NECESIDAD DE CADA TEMA)
// ==========================================================================
export const HELP_CATEGORIES = {
  'primeros-pasos': {
    id: 'primeros-pasos',
    title: 'Primeros pasos en la plataforma',
    lead: 'Qué podés hacer en SoluciónSegura, cómo consultar reclamos en tu barrio y qué funciones requieren una cuenta gratuita.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="12 8 8 12 12 16 12 8"></polygon>
      <line x1="16" y1="12" x2="12" y2="12"></line>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          SoluciónSegura es una herramienta vecinal para reportar y seguir problemas de calles, luminarias y basura en las <strong>16 localidades de La Matanza</strong>. No reemplaza a las cuadrillas operativas, pero reúne en un mapa público las prioridades de cada barrio para que ningún desperfecto quede olvidado.
        </p>

        <!-- Comparativa funcional clara: Sin cuenta vs Con cuenta -->
        <div class="help-comparison-grid">
          <div class="help-comparison-card">
            <div class="help-comparison-card__header">
              <span class="help-comparison-card__tag help-comparison-card__tag--open">Sin registrarte</span>
              <h3 class="help-comparison-card__title">Consulta pública abierta</h3>
            </div>
            <ul class="help-feature-list">
              <li>Recorrer el mapa completo de La Matanza con todos los reclamos activos.</li>
              <li>Filtrar por tu localidad (San Justo, Ramos Mejía, González Catán, etc.).</li>
              <li>Ver fotos, descripciones, ubicación exacta y estado de cada caso.</li>
              <li>Consultar las estadísticas públicas de resolución de problemas.</li>
            </ul>
          </div>

          <div class="help-comparison-card help-comparison-card--highlight">
            <div class="help-comparison-card__header">
              <span class="help-comparison-card__tag help-comparison-card__tag--member">Con cuenta gratuita</span>
              <h3 class="help-comparison-card__title">Participación activa</h3>
            </div>
            <ul class="help-feature-list">
              <li><strong>Sumarte con tu apoyo</strong> a reclamos existentes para visibilizar la urgencia.</li>
              <li><strong>Publicar un reclamo nuevo</strong> con fotos y ubicación exacta.</li>
              <li>Recibir avisos cuando las cuadrillas comiencen los trabajos o se cierre el caso.</li>
              <li>Solicitar la reapertura de un reporte si el problema sigue presente.</li>
            </ul>
          </div>
        </div>

        <!-- Dónde está cada función en la plataforma -->
        <h3 class="help-section-subtitle">Dónde encontrar cada herramienta</h3>
        <div class="help-site-map-grid">
          <div class="help-site-map-item">
            <div class="help-site-map-item__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Explorar</span>
            </div>
            <p>El mapa interactivo y el listado de reclamos ordenables por cercanía o cantidad de apoyos.</p>
          </div>

          <div class="help-site-map-item">
            <div class="help-site-map-item__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              <span>Realizar reclamo</span>
            </div>
            <p>Asistente de 4 pasos para ubicar el punto, cargar fotos y generar el código de seguimiento.</p>
          </div>

          <div class="help-site-map-item">
            <div class="help-site-map-item__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>Mis reclamos</span>
            </div>
            <p>Tu panel personal donde revisás tus publicaciones y los reclamos que respaldaste.</p>
          </div>

          <div class="help-site-map-item">
            <div class="help-site-map-item__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              <span>Estadísticas</span>
            </div>
            <p>Métricas transparentes sobre porcentaje de soluciones y tiempos de atención por barrio.</p>
          </div>
        </div>
      </div>
    `,
    contextual: {
      title: 'Empezá a recorrer los reclamos de tu zona',
      desc: 'Podés navegar el mapa interactivo ahora mismo o crear tu usuario para respaldar a tus vecinos.',
      actions: [
        {
          label: 'Abrir mapa de reclamos',
          href: 'explorar.html',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
        },
        {
          label: 'Crear cuenta gratuita',
          href: 'registro.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-costo',
        question: '¿Tiene algún costo reportar o apoyar un reclamo?',
        answer: 'No. SoluciónSegura es un canal vecinal público y totalmente gratuito. No hay suscripciones, cargos ni donaciones obligatorias.'
      },
      {
        id: 'faq-dni',
        question: '¿Necesito DNI, número de partida o padrón para registrarme?',
        answer: 'No. Para facilitar la participación vecinal solo se pide nombre, un correo electrónico y una contraseña. No tenés que subir fotos de tu documento ni comprobantes de domicilio.'
      },
      {
        id: 'faq-celular',
        question: '¿Se puede usar desde el celular sin descargar nada?',
        answer: 'Sí. El sitio funciona directamente desde el navegador de tu celular (Chrome, Safari, Firefox) sin necesidad de instalar aplicaciones desde tiendas de descarga.'
      },
      {
        id: 'faq-datos-privados',
        question: '¿Otros vecinos pueden ver mi correo electrónico o contraseña?',
        answer: 'No. En el mapa y en las fichas públicas solo se ve la dirección del desperfecto, las fotos y la descripción. Tus datos de contacto nunca quedan a la vista de terceros.'
      }
    ]
  },

  'realizar-reclamo': {
    id: 'realizar-reclamo',
    title: 'Realizar un reclamo',
    lead: 'Pasos para registrar un desperfecto, fijar la ubicación exacta y evitar duplicar reclamos ya existentes.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          El formulario de reclamo está pensado para completarse en menos de dos minutos. El paso más importante es marcar con exactitud dónde está el problema para que los vecinos reconozcan el punto y las cuadrillas no pierdan tiempo buscando la altura.
        </p>

        <!-- Secuencia real del formulario -->
        <div class="help-timeline-sequence">
          <div class="help-seq-step">
            <div class="help-seq-step__indicator">01</div>
            <div class="help-seq-step__content">
              <h3 class="help-seq-step__title">Ubicación en el mapa</h3>
              <p>Ingresá la calle y número o hacé clic directamente sobre el mapa para fijar el marcador en la cuadra o intersección exacta.</p>
            </div>
          </div>

          <div class="help-seq-step">
            <div class="help-seq-step__indicator">02</div>
            <div class="help-seq-step__content">
              <h3 class="help-seq-step__title">Comprobación de reclamos cercanos</h3>
              <p>El sistema te muestra si a menos de 100 metros ya existe un reclamo similar. Si ya está cargado, <strong>conviene sumarte con un toque</strong> para concentrar los apoyos en un único reporte.</p>
            </div>
          </div>

          <div class="help-seq-step">
            <div class="help-seq-step__indicator">03</div>
            <div class="help-seq-step__content">
              <h3 class="help-seq-step__title">Categoría, descripción y fotos</h3>
              <p>Elegí si corresponde a <em>Calles y pavimento</em>, <em>Basura y residuos</em> o <em>Alumbrado público</em>. Agregá fotos claras del pozo, basural o poste para dimensionar el trabajo.</p>
            </div>
          </div>

          <div class="help-seq-step">
            <div class="help-seq-step__indicator">04</div>
            <div class="help-seq-step__content">
              <h3 class="help-seq-step__title">Confirmación y código identificador</h3>
              <p>Revisá el resumen y confirmá. Al instante se genera tu código único (por ejemplo <code>LM-48350</code>), que podés usar para consultar el avance o compartirlo con vecinos.</p>
            </div>
          </div>
        </div>

        <div class="help-note-box">
          <h3 class="help-note-box__title">Por qué es importante no crear reclamos duplicados</h3>
          <p class="help-note-box__text">
            Si cuatro vecinos abren cuatro reportes distintos sobre el mismo bache en la misma esquina, cada reclamo tiene 1 solo apoyo y parece un problema aislado. En cambio, si un vecino lo publica y los otros tres se suman, ese reporte muestra 4 familias afectadas y sube en la lista de prioridades de la localidad.
          </p>
        </div>
      </div>
    `,
    contextual: {
      title: '¿Tenés un problema para reportar en tu cuadra?',
      desc: 'Ingresá al formulario guiado para registrar la ubicación y subir fotos del desperfecto.',
      actions: [
        {
          label: 'Realizar un reclamo',
          href: 'nuevo-reclamo.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`
        },
        {
          label: 'Consultar reclamos cercanos',
          href: 'explorar.html',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-que-problemas',
        question: '¿Qué problemas se pueden reportar hoy en la plataforma?',
        answer: 'Podés informar: 1) Calles y pavimento (pozos, zanjas sin señalizar, roturas de asfalto); 2) Basura y residuos (microbasurales, restos de poda, contenedores desbordados); 3) Alumbrado público (focos quemados, cables caídos, postes inclinados).'
      },
      {
        id: 'faq-fotos-obligatorias',
        question: '¿Es obligatorio adjuntar una foto?',
        answer: 'No es obligatorio, pero ayuda mucho. Una foto clara permite evaluar si se necesita asfalto en caliente, un camión almeja o una grúa de altura para alumbrado.'
      },
      {
        id: 'faq-direccion-inexacta',
        question: '¿Qué pasa si el buscador no reconoce la numeración de mi calle?',
        answer: 'Buscá la esquina más próxima y luego tocá directamente en el mapa para situar el pin sobre la vereda o calzada correcta.'
      },
      {
        id: 'faq-modificar-reclamo',
        question: '¿Puedo corregir los datos o cancelar el reclamo si ya se solucionó?',
        answer: 'Sí. Mientras el estado figure en «Recibido», podés entrar al detalle del reclamo desde tu panel de «Mis reclamos» para actualizar la descripción, sumar fotos o cancelarlo.'
      }
    ]
  },

  'explorar-reclamos': {
    id: 'explorar-reclamos',
    title: 'Explorar reclamos',
    lead: 'Cómo usar la vista de mapa, la vista de lista y los filtros por localidad para conocer los reportes de tu barrio.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          La pantalla de exploración reúne todos los reclamos del municipio. Podés alternar entre el mapa interactivo y la lista ordenada según lo que te resulte más práctico.
        </p>

        <!-- Dos modalidades reales de navegación -->
        <div class="help-two-views-grid">
          <div class="help-view-box">
            <h3 class="help-view-box__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
              <span>Vista de mapa</span>
            </h3>
            <p>Muestra cada reclamo como un marcador geográfico con el color de su servicio:</p>
            <ul class="help-legend-list">
              <li><span class="help-legend-dot help-legend-dot--pavimento"></span> <strong>Calles y pavimento:</strong> Marcadores de tono naranja.</li>
              <li><span class="help-legend-dot help-legend-dot--residuos"></span> <strong>Basura y residuos:</strong> Marcadores de tono verde.</li>
              <li><span class="help-legend-dot help-legend-dot--alumbrado"></span> <strong>Alumbrado público:</strong> Marcadores de tono violeta.</li>
            </ul>
            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: var(--space-2);">
              Cuando hay varios reclamos cercanos, el mapa los agrupa en un círculo con un número. Al acercar el zoom, los puntos se separan.
            </p>
          </div>

          <div class="help-view-box">
            <h3 class="help-view-box__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              <span>Vista de lista</span>
            </h3>
            <p>Presenta tarjetas con foto, dirección, estado y cantidad de adhesiones. Podés ordenarlas por:</p>
            <ul class="help-feature-list">
              <li><strong>Más recientes:</strong> Los últimos reportes ingresados por la comunidad.</li>
              <li><strong>Más apoyos:</strong> Casos con mayor respaldo vecinal acumulado.</li>
              <li><strong>Cercanía:</strong> Ordena según los metros de distancia con tu ubicación actual (requiere GPS activado).</li>
            </ul>
          </div>
        </div>

        <div class="help-note-box">
          <h3 class="help-note-box__title">Filtrar por localidad</h3>
          <p class="help-note-box__text">
            Arriba de los reclamos tenés un menú desplegable con las 16 localidades del partido. Si elegís tu localidad (por ejemplo, González Catán o Isidro Casanova), el mapa se traslada automáticamente a esa zona y la lista muestra únicamente los reportes de tu barrio.
          </p>
        </div>
      </div>
    `,
    contextual: {
      title: 'Consultá qué pasa en las calles de tu zona',
      desc: 'Abrí el explorador para buscar reclamos en tu localidad o filtrar por tipo de problema.',
      actions: [
        {
          label: 'Explorar reclamos',
          href: 'explorar.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
        },
        {
          label: 'Ver ranking por localidades',
          href: 'estadisticas.html',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-buscar-localidad',
        question: '¿Por qué no veo reclamos en otras partes del mapa?',
        answer: 'Verificá si tenés seleccionado un filtro específico de localidad. Si ponés «Todas las localidades», vas a ver los reclamos distribuidos por todo el partido.'
      },
      {
        id: 'faq-cercania-gps',
        question: '¿Cómo calcula la distancia cuando ordeno por cercanía?',
        answer: 'El navegador te pide permiso para leer tu ubicación por GPS o antena de red, y calcula la distancia en línea recta hasta las coordenadas de cada reclamo.'
      },
      {
        id: 'faq-popups-mapa',
        question: '¿Qué información aparece al tocar un pin en el mapa?',
        answer: 'Se abre una pequeña ventana con el tipo de problema, la foto si existe, el estado (Recibido, En revisión, etc.), la cantidad de vecinos sumados y el botón para ver la ficha completa.'
      },
      {
        id: 'faq-reclamos-resueltos-mapa',
        question: '¿Los reclamos resueltos desaparecen del mapa?',
        answer: 'Por defecto el mapa muestra los reclamos en curso para evitar confusiones. Podés ver los problemas ya reparados cambiando el filtro de estado a «Resueltos».'
      }
    ]
  },

  'participacion-vecinal': {
    id: 'participacion-vecinal',
    title: 'Participación vecinal',
    lead: 'Cómo respaldar reclamos de otros vecinos, seguir su avance conjunto y qué hacer cuando un problema vuelve a aparecer.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          La fuerza de SoluciónSegura está en los apoyos. Un reclamo respaldado por 20 vecinos de una misma cuadra tiene un peso muy distinto al de un reclamo aislado.
        </p>

        <!-- Pautas claras de participación -->
        <div class="help-guidelines-grid">
          <div class="help-guideline-item">
            <h3 class="help-guideline-item__title">¿Qué significa sumarse a un reclamo?</h3>
            <p>
              Al presionar el botón <strong>«Sumarme a este reclamo»</strong> en la ficha de un reporte, se suma tu apoyo al contador público. No se crea otro reporte en el mapa: se le da más respaldo al que ya existe.
            </p>
          </div>

          <div class="help-guideline-item">
            <h3 class="help-guideline-item__title">Un apoyo por vecino</h3>
            <p>
              Cada cuenta registrada puede emitir un único apoyo por reclamo. Esto impide votaciones falsas o duplicaciones y mantiene números confiables para todos los vecinos.
            </p>
          </div>

          <div class="help-guideline-item">
            <h3 class="help-guideline-item__title">Dónde ver los reclamos que apoyás</h3>
            <p>
              En la barra superior hacé clic en tu usuario y elegí <strong>«Mis reclamos»</strong>. En la pestaña <strong>«Reclamos apoyados»</strong> podés consultar todos los reportes a los que te sumaste.
            </p>
          </div>

          <div class="help-guideline-item">
            <h3 class="help-guideline-item__title">Posibilidad de retirar tu adhesión</h3>
            <p>
              Si te sumaste por equivocación o te mudaste de zona, podés volver a entrar a la ficha del reporte y pulsar <strong>«Retirar apoyo»</strong> para dar de baja tu adhesión.
            </p>
          </div>
        </div>

        <!-- Alerta cívica: Qué hacer si figura resuelto pero el problema sigue -->
        <div class="help-note-box help-note-box--alert">
          <h3 class="help-note-box__title">Qué hacer si el reclamo figura como resuelto pero el problema sigue ahí</h3>
          <p class="help-note-box__text">
            A veces una cuadrilla cambia una lámpara pero la falla era del cableado subterráneo y a las 24 horas vuelve a cortarse la luz. En estos casos no hace falta empezar de cero:
          </p>
          <ul class="help-feature-list" style="margin-top: var(--space-2);">
            <li><strong>Si creaste el reclamo:</strong> podés pulsar el botón <em>«Reabrir reclamo»</em> para que vuelva a estar activo con su historial intacto.</li>
            <li><strong>Si sos vecino sumado:</strong> tenés el botón <em>«El problema sigue presente»</em>, que registra una solicitud de revisión técnica y deja asentado en el historial que la solución fue parcial o fallida.</li>
          </ul>
        </div>
      </div>
    `,
    contextual: {
      title: 'Revisá tus apoyos vecinales activos',
      desc: 'Entrá a tu panel de Mis reclamos para ver qué novedades hay sobre los temas que apoyás.',
      actions: [
        {
          label: 'Ir a Mis reclamos',
          href: 'mis-reclamos.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
        },
        {
          label: 'Buscar reclamos para apoyar',
          href: 'explorar.html',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-cuantos-apoyos',
        question: '¿A cuántos reclamos puedo sumarme en total?',
        answer: 'No hay límite. Podés apoyar todos los problemas reales que encuentres en tu cuadra, barrio o zonas por donde te traslades habitualmente.'
      },
      {
        id: 'faq-apoyo-propio',
        question: '¿Puedo sumar mi apoyo a un reclamo que creé yo mismo?',
        answer: 'No. Al haber creado el reclamo, tu respaldo ya cuenta como el primer vecino del reporte. El botón de apoyo está habilitado para el resto de la comunidad.'
      },
      {
        id: 'faq-aviso-apoyo',
        question: '¿El vecino que publicó el reclamo sabe quién se sumó?',
        answer: 'El autor recibe un aviso indicando que un nuevo vecino respaldó el caso para que sepa que no está solo en el pedido, pero tus datos de contacto personales se mantienen protegidos.'
      },
      {
        id: 'faq-compromiso-apoyo',
        question: '¿Sumarme a un reclamo me compromete a algún trámite municipal?',
        answer: 'No. Es una adhesión comunitaria para dar peso al reporte dentro de la plataforma; no te genera ninguna obligación administrativa ni trámite presencial.'
      }
    ]
  },

  'seguimiento-reclamos': {
    id: 'seguimiento-reclamos',
    title: 'Seguimiento de reclamos',
    lead: 'Qué significa cada estado, cómo funciona la línea de tiempo y qué acciones puede realizar cada vecino según la etapa del reporte.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          Cada reclamo registrado cuenta con un historial público. Cuando los equipos operativos o supervisores actualizan un caso, la línea de tiempo se mueve y se envía un aviso a todos los vecinos involucrados.
        </p>

        <!-- Componente de los 4 estados principales -->
        <h3 class="help-section-subtitle">Los 4 momentos de un reclamo en curso</h3>
        <div class="help-status-flow">
          <div class="help-status-card help-status-card--recibido">
            <div class="help-status-card__top">
              <span class="help-status-badge help-status-badge--recibido">1. Recibido</span>
            </div>
            <p class="help-status-card__desc">
              El reporte fue publicado con éxito y ya tiene asignado su código (ej. <code>LM-48350</code>). Está visible en el mapa para que otros vecinos sumen su apoyo.
            </p>
          </div>

          <div class="help-status-card help-status-card--revision">
            <div class="help-status-card__top">
              <span class="help-status-badge help-status-badge--revision">2. En revisión</span>
            </div>
            <p class="help-status-card__desc">
              El área técnica evaluó las fotos y la ubicación para verificar si corresponde a la red municipal y qué materiales o equipos se necesitan.
            </p>
          </div>

          <div class="help-status-card help-status-card--proceso">
            <div class="help-status-card__top">
              <span class="help-status-badge help-status-badge--proceso">3. En proceso</span>
            </div>
            <p class="help-status-card__desc">
              Las cuadrillas están trabajando en el lugar o tienen la obra en el cronograma de la semana con fecha de intervención programada.
            </p>
          </div>

          <div class="help-status-card help-status-card--resuelto">
            <div class="help-status-card__top">
              <span class="help-status-badge help-status-badge--resuelto">4. Resuelto</span>
            </div>
            <p class="help-status-card__desc">
              Las tareas fueron terminadas en la calle. El reclamo queda cerrado y el creador puede calificar el resultado de los trabajos.
            </p>
          </div>
        </div>

        <!-- Estados excepcionales -->
        <h3 class="help-section-subtitle">Estados excepcionales</h3>
        <div class="help-special-grid">
          <div class="help-special-row">
            <span class="help-status-badge help-status-badge--reabierto">Reabierto</span>
            <p>Se utiliza cuando la obra se cerró pero el problema resurgió (por ejemplo, el asfalto cedió a los pocos días o la luz volvió a cortarse).</p>
          </div>

          <div class="help-special-row">
            <span class="help-status-badge help-status-badge--rechazado">Rechazado</span>
            <p>Ocurre si el reporte corresponde a una propiedad privada, está fuera del partido de La Matanza o los datos resultan falsos. Siempre incluye el motivo escrito.</p>
          </div>

          <div class="help-special-row">
            <span class="help-status-badge help-status-badge--cancelado">Cancelado</span>
            <p>El creador decide dar de baja el reclamo voluntariamente antes de que entre en revisión (por ejemplo, si el problema fue resuelto por un frentista).</p>
          </div>
        </div>

        <!-- Acciones disponibles según el rol -->
        <div class="help-roles-table-wrapper">
          <table class="help-roles-table">
            <thead>
              <tr>
                <th scope="col">Estado actual</th>
                <th scope="col">Acciones de quien creó el reclamo</th>
                <th scope="col">Acciones de los vecinos que apoyaron</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Recibido</strong></td>
                <td>Puede editar la descripción, cambiar fotos o cancelar el reporte.</td>
                <td>Pueden retirar su apoyo si lo consideran necesario.</td>
              </tr>
              <tr>
                <td><strong>En revisión / proceso</strong></td>
                <td>Consulta el avance y recibe notas de inspección técnica.</td>
                <td>Reciben notificaciones de cada actualización.</td>
              </tr>
              <tr>
                <td><strong>Resuelto</strong></td>
                <td>Califica el trabajo (1 a 5 estrellas) o solicita la reapertura.</td>
                <td>Pueden marcar «El problema sigue presente».</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    contextual: {
      title: 'Consultá el estado de los reclamos de tu barrio',
      desc: 'Entrá al detalle de cualquier reporte para ver su historial con fechas y notas de las cuadrillas.',
      actions: [
        {
          label: 'Ver mis reclamos',
          href: 'mis-reclamos.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
        },
        {
          label: 'Ver casos resueltos en el mapa',
          href: 'explorar.html?estado=resueltos',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-codigo-id',
        question: '¿Dónde encuentro el código de mi reclamo?',
        answer: 'En la parte superior de la ficha de detalle (por ejemplo, LM-48350) y en tu lista de «Mis reclamos». Sirve para cualquier consulta o para pasárselo a vecinos de la cuadra.'
      },
      {
        id: 'faq-tiempo-resolucion',
        question: '¿Cuánto tiempo tarda un reclamo en resolverse?',
        answer: 'Depende de la magnitud del trabajo y de la disponibilidad de materiales de las áreas municipales. Casos sencillos de luminarias suelen resolverse antes que obras mayores de bacheo estructural.'
      },
      {
        id: 'faq-aviso-cambio-estado',
        question: '¿Me avisan si hay novedades en un reclamo que sigo?',
        answer: 'Sí. Cada cambio de estado genera una alerta en el icono de campana de la barra superior y un correo electrónico si tenés activadas las notificaciones.'
      },
      {
        id: 'faq-obra-incompleta',
        question: '¿Qué pasa si cerraron el reclamo pero el pozo sigue abierto?',
        answer: 'El creador puede pulsar «Reabrir reclamo» y los vecinos sumados pueden pulsar «El problema sigue presente». Ambos caminos reactivan el expediente para una nueva inspección.'
      }
    ]
  },

  'cuenta-seguridad': {
    id: 'cuenta-seguridad',
    title: 'Cuenta y seguridad',
    lead: 'Cómo configurar tus datos, cambiar tu localidad preferida, administrar notificaciones y proteger tu usuario.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`,
    guideHtml: `
      <div class="help-topic-body">
        <p class="help-lead-text">
          Tu cuenta en SoluciónSegura te permite respaldar reclamos de vecinos, crear reportes propios y recibir alertas cuando haya novedades en tu cuadra. Podés modificar tus datos o tus preferencias cuando quieras.
        </p>

        <!-- Lista de tareas reales de cuenta -->
        <div class="help-account-tasks">
          <div class="help-account-task">
            <div class="help-account-task__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="help-account-task__text">
              <h3 class="help-account-task__title">Configurar tu localidad en «Mi perfil»</h3>
              <p>Al elegir tu localidad principal (por ejemplo, Ramos Mejía, San Justo o Laferrere), el explorador de reclamos y las sugerencias se ajustan automáticamente a tu zona.</p>
            </div>
          </div>

          <div class="help-account-task">
            <div class="help-account-task__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div class="help-account-task__text">
              <h3 class="help-account-task__title">Preferencias de notificaciones</h3>
              <p>En tu perfil podés decidir qué avisos recibir: cambios de estado en tus reclamos, avisos cuando un vecino apoye tu reporte o alertas comunitarias en tu barrio.</p>
            </div>
          </div>

          <div class="help-account-task">
            <div class="help-account-task__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div class="help-account-task__text">
              <h3 class="help-account-task__title">Recuperación de contraseña</h3>
              <p>Si no recordás tu clave, podés solicitar el restablecimiento desde la pantalla de ingreso escribiendo tu correo registrado. Recibís un enlace seguro para crear una nueva clave.</p>
            </div>
          </div>

          <div class="help-account-task">
            <div class="help-account-task__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </div>
            <div class="help-account-task__text">
              <h3 class="help-account-task__title">Cierre de sesión seguro</h3>
              <p>Si usás una computadora en un ciber, biblioteca o dispositivo compartido, recordá pulsar en tu nombre arriba a la derecha y seleccionar <em>«Cerrar sesión»</em> para proteger tu cuenta.</p>
            </div>
          </div>
        </div>

        <div class="help-note-box">
          <h3 class="help-note-box__title">Privacidad de tus datos</h3>
          <p class="help-note-box__text">
            SoluciónSegura no comparte tus datos con fines comerciales ni vende listados de vecinos. Tu correo solo se usa para mantener tu acceso y notificarte sobre el estado de tus reclamos.
          </p>
        </div>
      </div>
    `,
    contextual: {
      title: 'Administrá tu información de usuario',
      desc: 'Ingresá a tu perfil para actualizar tus datos de contacto o cambiar tu localidad.',
      actions: [
        {
          label: 'Ir a Mi perfil',
          href: 'perfil.html',
          variant: 'btn--primary',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
        },
        {
          label: 'Recuperar contraseña',
          href: 'recuperar-contrasena.html',
          variant: 'btn--outline',
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
        }
      ]
    },
    faqs: [
      {
        id: 'faq-cambiar-localidad',
        question: '¿Cómo cambio mi localidad de interés?',
        answer: 'Entrá a «Mi perfil» desde el menú superior, elegí tu nueva localidad en la lista desplegable y tocá «Guardar cambios». A partir de ese momento, el mapa y los filtros van a abrir por defecto en esa zona.'
      },
      {
        id: 'faq-olvido-clave',
        question: '¿Qué hago si no puedo entrar porque olvidé la clave?',
        answer: 'En la pantalla de inicio de sesión hacé clic en «¿Olvidaste tu contraseña?», ingresá tu dirección de correo y vas a poder configurar una nueva clave de acceso de manera inmediata.'
      },
      {
        id: 'faq-desactivar-emails',
        question: '¿Puedo desactivar los correos sin cerrar la cuenta?',
        answer: 'Sí. En la sección de preferencias de «Mi perfil» podés desmarcar los envíos por correo y seguir viendo las notificaciones directamente dentro de la plataforma.'
      },
      {
        id: 'faq-eliminar-cuenta',
        question: '¿Puedo solicitar la baja definitiva de mi cuenta?',
        answer: 'Sí. Podés solicitar la eliminación desde el apartado de privacidad de tu perfil. Al confirmar, tu usuario se da de baja y los reclamos que hayas creado quedan desvinculados de tus datos personales.'
      }
    ]
  }
};

// ==========================================================================
// 2. ÍNDICE DE BÚSQUEDA INTERNA
// ==========================================================================
function buildSearchIndex() {
  const index = [];

  Object.values(HELP_CATEGORIES).forEach(category => {
    // Categoría
    index.push({
      type: 'category',
      categoryId: category.id,
      categoryName: category.title,
      targetId: null,
      title: category.title,
      text: category.lead,
      keywords: `${category.title} ${category.lead}`.toLowerCase()
    });

    // Preguntas frecuentes
    category.faqs.forEach(faq => {
      index.push({
        type: 'faq',
        categoryId: category.id,
        categoryName: category.title,
        targetId: faq.id,
        title: faq.question,
        text: faq.answer,
        keywords: `${faq.question} ${faq.answer}`.toLowerCase()
      });
    });
  });

  return index;
}

// ==========================================================================
// 3. CONTROLADOR INTERACTIVO
// ==========================================================================
export function initHelpCenter() {
  const searchIndex = buildSearchIndex();
  let currentCategoryId = 'primeros-pasos';

  const contentPanel = document.getElementById('help-content-panel');
  const desktopNavContainer = document.getElementById('help-desktop-nav-list');
  const mobilePillsContainer = document.getElementById('help-mobile-pills');
  const mobileSelect = document.getElementById('help-mobile-select');

  const searchInput = document.getElementById('help-search-input');
  const searchClearBtn = document.getElementById('help-search-clear');
  const searchResultsBox = document.getElementById('help-search-results');
  const searchResultsCount = document.getElementById('help-search-count');
  const searchResultsList = document.getElementById('help-search-list');
  const quickTags = document.querySelectorAll('.js-quick-tag');

  if (!contentPanel) return;

  // Renderizar menú lateral desktop
  if (desktopNavContainer) {
    desktopNavContainer.innerHTML = Object.values(HELP_CATEGORIES).map(cat => `
      <li class="help-nav-item" role="none">
        <button type="button" 
                class="help-nav-btn js-help-cat-btn ${cat.id === currentCategoryId ? 'is-active' : ''}" 
                data-category="${cat.id}"
                role="tab"
                aria-selected="${cat.id === currentCategoryId ? 'true' : 'false'}"
                id="tab-${cat.id}"
                aria-controls="help-content-panel">
          <span class="help-nav-btn__icon" aria-hidden="true">${cat.icon}</span>
          <span class="help-nav-btn__text">${cat.title}</span>
        </button>
      </li>
    `).join('');
  }

  // Renderizar pills y select móvil
  if (mobilePillsContainer) {
    mobilePillsContainer.innerHTML = Object.values(HELP_CATEGORIES).map(cat => `
      <button type="button" 
              class="help-mobile-pill js-help-mobile-pill ${cat.id === currentCategoryId ? 'is-active' : ''}"
              data-category="${cat.id}">
        <span>${cat.title}</span>
      </button>
    `).join('');
  }

  if (mobileSelect) {
    mobileSelect.innerHTML = Object.values(HELP_CATEGORIES).map(cat => `
      <option value="${cat.id}" ${cat.id === currentCategoryId ? 'selected' : ''}>
        ${cat.title}
      </option>
    `).join('');
  }

  // Renderizado del contenido del tema
  function renderCategory(catId, targetFaqId = null) {
    const category = HELP_CATEGORIES[catId] || HELP_CATEGORIES['primeros-pasos'];
    currentCategoryId = category.id;

    // Sincronizar botones desktop
    document.querySelectorAll('.js-help-cat-btn').forEach(btn => {
      const isCurrent = btn.dataset.category === currentCategoryId;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Sincronizar pills móviles
    document.querySelectorAll('.js-help-mobile-pill').forEach(pill => {
      const isCurrent = pill.dataset.category === currentCategoryId;
      pill.classList.toggle('is-active', isCurrent);
      pill.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    // Sincronizar select móvil
    if (mobileSelect) {
      mobileSelect.value = currentCategoryId;
    }

    // Transición suave
    contentPanel.classList.add('is-animating');

    setTimeout(() => {
      contentPanel.innerHTML = `
        <article class="help-topic-article" aria-labelledby="topic-title">
          <header class="help-topic-header">
            <h2 id="topic-title" class="help-topic-header__title">${category.title}</h2>
            <p class="help-topic-header__lead">${category.lead}</p>
          </header>

          ${category.guideHtml}

          <!-- Preguntas Frecuentes del Tema -->
          <section class="help-faqs-section" aria-labelledby="faqs-heading">
            <h3 id="faqs-heading" class="help-faqs-section__title">Preguntas frecuentes</h3>
            
            <div class="help-faq-list">
              ${category.faqs.map(faq => `
                <details class="help-faq-item js-faq-item" id="${faq.id}">
                  <summary class="help-faq-summary">
                    <span>${faq.question}</span>
                    <span class="help-faq-summary__icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div class="help-faq-body">
                    <p>${faq.answer}</p>
                  </div>
                </details>
              `).join('')}
            </div>
          </section>

          <!-- Acceso Contextual a Funcionalidades Reales -->
          <section class="help-contextual-box" aria-label="Accesos directos a la funcionalidad">
            <div class="help-contextual-box__info">
              <h4 class="help-contextual-box__title">${category.contextual.title}</h4>
              <p class="help-contextual-box__desc">${category.contextual.desc}</p>
            </div>
            <div class="help-contextual-box__actions">
              ${category.contextual.actions.map(action => `
                <a href="${action.href}" class="btn ${action.variant || 'btn--primary'}">
                  ${action.icon || ''}
                  <span>${action.label}</span>
                </a>
              `).join('')}
            </div>
          </section>
        </article>
      `;

      contentPanel.classList.remove('is-animating');

      // Si se indicó un FAQ específico para abrir y enfocar
      if (targetFaqId) {
        setTimeout(() => {
          const faqEl = document.getElementById(targetFaqId);
          if (faqEl) {
            faqEl.setAttribute('open', '');
            faqEl.classList.add('is-highlighted');
            faqEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            const summaryEl = faqEl.querySelector('summary');
            if (summaryEl) summaryEl.focus();

            setTimeout(() => {
              faqEl.classList.remove('is-highlighted');
            }, 2500);
          }
        }, 50);
      }
    }, 50);
  }

  // Navegación vía URL Hash
  function handleHashNavigation() {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash) {
      renderCategory('primeros-pasos');
      return;
    }

    if (HELP_CATEGORIES[rawHash]) {
      renderCategory(rawHash);
      return;
    }

    let foundCat = null;
    let foundFaq = null;
    for (const cat of Object.values(HELP_CATEGORIES)) {
      const match = cat.faqs.find(f => f.id === rawHash);
      if (match) {
        foundCat = cat.id;
        foundFaq = match.id;
        break;
      }
    }

    if (foundCat) {
      renderCategory(foundCat, foundFaq);
    } else {
      renderCategory('primeros-pasos');
    }
  }

  function selectCategory(catId, pushHistory = true) {
    if (pushHistory) {
      window.history.pushState(null, '', `#${catId}`);
    }
    renderCategory(catId);
  }

  // Clics en navegación lateral desktop y pills móviles
  document.addEventListener('click', (e) => {
    const catBtn = e.target.closest('.js-help-cat-btn');
    if (catBtn) {
      const catId = catBtn.dataset.category;
      if (catId && catId !== currentCategoryId) {
        selectCategory(catId, true);
      }
      return;
    }

    const pillBtn = e.target.closest('.js-help-mobile-pill');
    if (pillBtn) {
      const catId = pillBtn.dataset.category;
      if (catId && catId !== currentCategoryId) {
        selectCategory(catId, true);
      }
      return;
    }
  });

  if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => {
      const catId = e.target.value;
      if (catId && catId !== currentCategoryId) {
        selectCategory(catId, true);
      }
    });
  }

  window.addEventListener('hashchange', () => {
    handleHashNavigation();
  });

  // Búsqueda en tiempo real
  function normalizeQuery(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function performSearch(query) {
    const cleanQuery = normalizeQuery(query);
    if (!cleanQuery || cleanQuery.length < 2) {
      searchResultsBox.hidden = true;
      searchClearBtn.hidden = true;
      return;
    }

    searchClearBtn.hidden = false;
    const words = cleanQuery.split(/\s+/).filter(w => w.length > 0);

    const matches = searchIndex.filter(item => {
      const targetNorm = normalizeQuery(`${item.title} ${item.text} ${item.keywords}`);
      return words.every(word => targetNorm.includes(word));
    });

    if (matches.length === 0) {
      searchResultsBox.hidden = false;
      searchResultsCount.textContent = '0 resultados';
      searchResultsList.innerHTML = `
        <div class="help-search-results__empty">
          <p style="font-weight: var(--font-weight-bold); margin-bottom: 4px;">No encontramos coincidencias para «${query}»</p>
          <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin: 0;">Probá con términos directos como <em>bache, fotos, seguimiento, contraseña</em> o elegí un tema en el menú.</p>
        </div>
      `;
      return;
    }

    searchResultsBox.hidden = false;
    searchResultsCount.textContent = `${matches.length} ${matches.length === 1 ? 'coincidencia' : 'coincidencias'}`;

    searchResultsList.innerHTML = matches.slice(0, 8).map(match => `
      <a href="#${match.categoryId}" 
         class="help-search-result-item js-search-result-item" 
         data-category="${match.categoryId}" 
         data-target="${match.targetId || ''}"
         role="option">
        <span class="help-search-result-item__cat">${match.categoryName}</span>
        <div class="help-search-result-item__title">${match.title}</div>
        <div class="help-search-result-item__snippet">${match.text}</div>
      </a>
    `).join('');
  }

  let searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        performSearch(e.target.value);
      }, 120);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchResultsBox.hidden = true;
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      searchClearBtn.hidden = true;
      searchResultsBox.hidden = true;
    });
  }

  if (searchResultsBox) {
    searchResultsBox.addEventListener('click', (e) => {
      const item = e.target.closest('.js-search-result-item');
      if (!item) return;

      e.preventDefault();
      const catId = item.dataset.category;
      const targetId = item.dataset.target || null;

      searchResultsBox.hidden = true;

      if (targetId) {
        window.history.pushState(null, '', `#${targetId}`);
      } else {
        window.history.pushState(null, '', `#${catId}`);
      }

      renderCategory(catId, targetId);
    });
  }

  document.addEventListener('click', (e) => {
    if (searchResultsBox && !searchResultsBox.hidden && !e.target.closest('.help-search-container')) {
      searchResultsBox.hidden = true;
    }
  });

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();
      if (searchInput) {
        searchInput.value = text;
        searchInput.focus();
        performSearch(text);
      }
    });
  });

  handleHashNavigation();
}
