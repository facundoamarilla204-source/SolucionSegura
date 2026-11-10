/**
 * SoluciónSegura — Datos Semilla Iniciales (Seed Data)
 * Reclamos ficticios distribuidos en La Matanza para la maqueta
 */

export const INITIAL_RECLAMOS = [
  {
    id: 'LM-48291',
    titulo: 'Bache de gran tamaño en cruce transitado',
    categoria: 'pavimento',
    descripcion: 'Pozo profundo sobre el carril derecho frente a la parada de colectivos. Dificulta el paso y daña vehículos.',
    direccion: 'Almafuerte 3150, San Justo',
    localidadId: 'san-justo',
    lat: -34.6791,
    lng: -58.5574,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.', // En vista pública no se expone correo ni datos privados
    fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 días
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-2.jpg',
      'assets/img/reclamos/calles/calle-3.jpg'
    ],
    participantes: ['usr_vecino_demo', 'usr_vecino_02', 'usr_vecino_03', 'usr_vecino_04'],
    historial: [
      {
        fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo registrado por el vecino en la plataforma.'
      },
      {
        fecha: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        estado: 'en_revision',
        nota: 'Verificación técnica completada por personal de inspección.'
      },
      {
        fecha: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Cuadrilla técnica asignada para reparación asfáltica.'
      }
    ]
  },
  {
    id: 'LM-48255',
    titulo: 'Acumulación de residuos en esquina de plaza',
    categoria: 'residuos',
    descripcion: 'Montículo de restos de poda y bolsas de residuos domiciliarios que obstaculizan la vereda de la plaza.',
    direccion: 'Av. de Mayo y Humboldt, Ramos Mejía',
    localidadId: 'ramos-mejia',
    lat: -34.6512,
    lng: -58.5621,
    creadorId: 'usr_vecino_05',
    creadorNombre: 'Carlos R.',
    fecha: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'en_revision',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png',
      'assets/img/reclamos/residuos/basura-2.webp',
      'assets/img/reclamos/residuos/basura-3.webp'
    ],
    participantes: ['usr_vecino_05', 'usr_vecino_06', 'usr_vecino_07'],
    historial: [
      {
        fecha: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo registrado correctamente.'
      },
      {
        fecha: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        estado: 'en_revision',
        nota: 'Caso derivado a coordinación de servicios urbanos.'
      }
    ]
  },
  {
    id: 'LM-48190',
    titulo: 'Luminaria titilando y dos apagadas en la cuadra',
    categoria: 'alumbrado',
    descripcion: 'Tramo de 100 metros a oscuras por falla en tres columnas consecutivas de alumbrado público.',
    direccion: 'República de Portugal 2800, Isidro Casanova',
    localidadId: 'isidro-casanova',
    lat: -34.7095,
    lng: -58.5815,
    creadorId: 'usr_vecino_08',
    creadorNombre: 'Lucía P.',
    fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png',
      'assets/img/reclamos/alumbrado/alumbrado-2.png',
      'assets/img/reclamos/alumbrado/alumbrado-3.webp'
    ],
    participantes: ['usr_vecino_08', 'usr_vecino_09'],
    historial: [
      {
        fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido. Pendiente de evaluación técnica.'
      }
    ]
  },
  {
    id: 'LM-47910',
    titulo: 'Bacheo concluido en acceso principal',
    categoria: 'pavimento',
    descripcion: 'Hundimiento de calzada sobre calle principal ya reparado y habilitado al tránsito.',
    direccion: 'Monseñor Bufano 1200, San Justo',
    localidadId: 'san-justo',
    lat: -34.6730,
    lng: -58.5490,
    creadorId: 'usr_vecino_10',
    creadorNombre: 'Esteban M.',
    fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'resuelto',
    prioridad: 'media',
    calificacionEstrellas: 5,
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-2.jpg',
      'assets/img/reclamos/calles/calle-3.jpg'
    ],
    participantes: ['usr_vecino_10', 'usr_vecino_11', 'usr_vecino_12', 'usr_vecino_13', 'usr_vecino_14'],
    historial: [
      {
        fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo ingresado.'
      },
      {
        fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Trabajo de repavimentación en marcha.'
      },
      {
        fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'resuelto',
        nota: 'Reparación finalizada. Creador confirmó la solución con 5 estrellas.'
      }
    ]
  },
  {
    id: 'LM-48310',
    titulo: 'Contenedor desbordado y residuos en la vereda',
    categoria: 'residuos',
    descripcion: 'Contenedor roto que no da abasto para la cantidad de vecinos del sector.',
    direccion: 'Juan Manuel de Rosas 14200, González Catán',
    localidadId: 'gonzalez-catan',
    lat: -34.7720,
    lng: -58.6270,
    creadorId: 'usr_vecino_15',
    creadorNombre: 'Valeria S.',
    fecha: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png',
      'assets/img/reclamos/residuos/basura-2.webp',
      'assets/img/reclamos/residuos/basura-3.webp'
    ],
    participantes: ['usr_vecino_15'],
    historial: [
      {
        fecha: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado hace pocas horas.'
      }
    ]
  }
];

export const DEMO_USER = {
  id: 'usr_vecino_demo',
  nombre: 'Mariana Gómez',
  email: 'mariana.gomez@ejemplo.com',
  localidadPreferida: 'san-justo',
  notificaciones: {
    app: true,
    email: true
  }
};

