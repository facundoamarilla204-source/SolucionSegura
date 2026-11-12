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
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_05', 'usr_vecino_06', 'usr_vecino_07', 'usr_vecino_demo'],
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
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
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
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_15'],
    historial: [
      {
        fecha: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado hace pocas horas.'
      }
    ]
  },
  {
    id: 'LM-48350',
    titulo: 'Bache profundo sobre calle Almafuerte',
    categoria: 'pavimento',
    descripcion: 'Pozo de reciente formación a 20 metros de la intersección. Dificulta la salida de vehículos particulares.',
    direccion: 'Almafuerte 3150, San Justo',
    localidadId: 'san-justo',
    lat: -34.6791,
    lng: -58.5574,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-2.jpg'
    ],
    participantes: ['usr_vecino_demo'],
    historial: [
      {
        fecha: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido en la plataforma ciudadana.'
      }
    ]
  },
  {
    id: 'LM-48220',
    titulo: 'Reparación de calzada en Av. de Mayo',
    categoria: 'pavimento',
    descripcion: 'Reparación de bache sobre carril principal reportado la semana pasada.',
    direccion: 'Av. de Mayo y Belgrano, Ramos Mejía',
    localidadId: 'ramos-mejia',
    lat: -34.6480,
    lng: -58.5645,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'resuelto',
    prioridad: 'media',
    calificacionEstrellas: null,
    evaluacionSolucion: null,
    fotos: [
      'assets/img/reclamos/calles/calle-3.jpg'
    ],
    participantes: ['usr_vecino_demo', 'usr_vecino_02'],
    historial: [
      {
        fecha: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo creado por el vecino.'
      },
      {
        fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Cuadrilla técnica intervino la calzada.'
      },
      {
        fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'resuelto',
        nota: 'Trabajo finalizado. Esperando validación del vecino creador.'
      }
    ]
  },
  {
    id: 'LM-48150',
    titulo: 'Basural clandestino sobre terreno baldío',
    categoria: 'residuos',
    descripcion: 'Acumulación de restos de obra y ramas en terreno sin cerco perimetral.',
    direccion: 'Monseñor Marcón 3050, San Justo',
    localidadId: 'san-justo',
    lat: -34.6812,
    lng: -58.5541,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'rechazado',
    subsanable: true,
    motivoRechazo: 'La altura catastral informada no coincide con el trazado oficial de La Matanza. Por favor precisar la numeración correcta o calle transversal.',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_demo'],
    historial: [
      {
        fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido.'
      },
      {
        fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'rechazado',
        nota: 'Rechazado temporalmente: altura catastral no localizada (subsanable).'
      }
    ]
  },
  {
    id: 'LM-48120',
    titulo: 'Falla lumínica sobre colectora de Autopista',
    categoria: 'alumbrado',
    descripcion: 'Columna apagada en tramo de alta velocidad de acceso autopista.',
    direccion: 'Av. Juan Manuel de Rosas 10500, Isidro Casanova',
    localidadId: 'isidro-casanova',
    lat: -34.7125,
    lng: -58.5770,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'rechazado',
    subsanable: false,
    motivoRechazo: 'El tramo informado pertenece a jurisdicción nacional de Autopistas / DNV. No corresponde a mantenimiento municipal de La Matanza.',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_demo'],
    historial: [
      {
        fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido.'
      },
      {
        fecha: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'rechazado',
        nota: 'Rechazo definitivo por competencia interjurisdiccional federal.'
      }
    ]
  },
  {
    id: 'LM-48050',
    titulo: 'Contenedor averiado en San Justo',
    categoria: 'residuos',
    descripcion: 'Tapa rota de contenedor verde.',
    direccion: 'Av. Dr. Ignacio Arieta 2200, San Justo',
    localidadId: 'san-justo',
    lat: -34.6745,
    lng: -58.5598,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'cancelado',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_demo'],
    historial: [
      {
        fecha: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido.'
      },
      {
        fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'cancelado',
        nota: 'Reclamo cancelado por el creador.'
      }
    ]
  },
  {
    id: 'LM-48010',
    titulo: 'Luminaria intermitente en Ramos Mejía',
    categoria: 'alumbrado',
    descripcion: 'Lámpara titilando luego de la última tormenta.',
    direccion: 'Av. Rivadavia 14200, Ramos Mejía',
    localidadId: 'ramos-mejia',
    lat: -34.6465,
    lng: -58.5682,
    creadorId: 'usr_vecino_demo',
    creadorNombre: 'Mariana G.',
    fecha: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    estado: 'reabierto',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_demo'],
    historial: [
      {
        fecha: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido.'
      },
      {
        fecha: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'resuelto',
        nota: 'Caso cerrado tras cambio de fusible.'
      },
      {
        fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estado: 'reabierto',
        nota: 'Caso reabierto por persistencia de falla eléctrica.'
      }
    ]
  },
  {
    id: 'LM-48401',
    titulo: 'Bache con agua acumulada sobre arteria principal',
    categoria: 'pavimento',
    descripcion: 'Desgaste importante de la calzada que genera charcos profundos y rotura de neumáticos frente a zona comercial.',
    direccion: 'Av. Pte. Perón 3250, San Justo',
    localidadId: 'san-justo',
    lat: -34.6765,
    lng: -58.5520,
    creadorId: 'usr_vecino_16',
    creadorNombre: 'Guillermo F.',
    fecha: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-2.jpg'
    ],
    participantes: ['usr_vecino_16', 'usr_vecino_02', 'usr_vecino_05', 'usr_vecino_08', 'usr_vecino_11', 'usr_vecino_14'],
    historial: [
      {
        fecha: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo registrado por vecinos del centro comercial.'
      },
      {
        fecha: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Cuadrilla técnica programada para asfalto en caliente.'
      }
    ]
  },
  {
    id: 'LM-48402',
    titulo: 'Tres luminarias apagadas en pasaje vecinal',
    categoria: 'alumbrado',
    descripcion: 'Cuadra muy oscura a la noche tras la rotura de las lámparas en las columnas de mitad de cuadra.',
    direccion: 'Necochea 450, Ramos Mejía',
    localidadId: 'ramos-mejia',
    lat: -34.6535,
    lng: -58.5660,
    creadorId: 'usr_vecino_17',
    creadorNombre: 'Patricia B.',
    fecha: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_17', 'usr_vecino_03', 'usr_vecino_09'],
    historial: [
      {
        fecha: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado por vecinos del pasaje.'
      }
    ]
  },
  {
    id: 'LM-48403',
    titulo: 'Microbasural acumulado en esquina comercial',
    categoria: 'residuos',
    descripcion: 'Acumulación constante de bolsas, cartones y restos de verdulería sobre la vereda obstaculizando el paso peatonal.',
    direccion: 'Av. Luro 5850, Gregorio de Laferrere',
    localidadId: 'laferrere',
    lat: -34.7485,
    lng: -58.5840,
    creadorId: 'usr_vecino_18',
    creadorNombre: 'Jorge S.',
    fecha: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    estado: 'en_revision',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_18', 'usr_vecino_04', 'usr_vecino_06', 'usr_vecino_12', 'usr_vecino_15'],
    historial: [
      {
        fecha: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado en la plataforma comunitaria.'
      },
      {
        fecha: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        estado: 'en_revision',
        nota: 'Derivado al área de higiene urbana para operativo de limpieza.'
      }
    ]
  },
  {
    id: 'LM-48404',
    titulo: 'Pozo profundo en calzada frente a escuela',
    categoria: 'pavimento',
    descripcion: 'Pozo de gran profundidad que obliga a los transportes escolares y vehículos a realizar maniobras peligrosas.',
    direccion: 'Olegario Andrade 6200, Gregorio de Laferrere',
    localidadId: 'laferrere',
    lat: -34.7520,
    lng: -58.5890,
    creadorId: 'usr_vecino_19',
    creadorNombre: 'Natalia V.',
    fecha: new Date(Date.now() - 60 * 60 * 1000 * 24).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-2.jpg',
      'assets/img/reclamos/calles/calle-3.jpg'
    ],
    participantes: ['usr_vecino_19', 'usr_vecino_07', 'usr_vecino_10', 'usr_vecino_13'],
    historial: [
      {
        fecha: new Date(Date.now() - 60 * 60 * 1000 * 24).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado por la comunidad educativa.'
      }
    ]
  },
  {
    id: 'LM-48405',
    titulo: 'Lámpara rota y brazo doblado por tormenta',
    categoria: 'alumbrado',
    descripcion: 'La luminaria quedó colgando y sin encender luego de los fuertes vientos en el sector del boulevard.',
    direccion: 'La Quila y El Hornero, Ciudad Evita',
    localidadId: 'ciudad-evita',
    lat: -34.7160,
    lng: -58.5310,
    creadorId: 'usr_vecino_20',
    creadorNombre: 'Fernando D.',
    fecha: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    estado: 'en_revision',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_20', 'usr_vecino_02'],
    historial: [
      {
        fecha: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo generado tras la tormenta.'
      },
      {
        fecha: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        estado: 'en_revision',
        nota: 'Verificación técnica en curso por cuadrilla eléctrica.'
      }
    ]
  },
  {
    id: 'LM-48406',
    titulo: 'Rotura de asfalto y bache peligroso en curva',
    categoria: 'pavimento',
    descripcion: 'Desprendimiento de carpeta asfáltica en curva pronunciada; varios vehículos sufrieron roturas de tren delantero.',
    direccion: 'Garibaldi 2450, Villa Luzuriaga',
    localidadId: 'villa-luzuriaga',
    lat: -34.6820,
    lng: -58.5930,
    creadorId: 'usr_vecino_21',
    creadorNombre: 'Rocío M.',
    fecha: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-3.jpg'
    ],
    participantes: ['usr_vecino_21', 'usr_vecino_03', 'usr_vecino_05', 'usr_vecino_08', 'usr_vecino_14'],
    historial: [
      {
        fecha: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo ingresado con soporte fotográfico.'
      },
      {
        fecha: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Bacheo asfáltico en ejecución por el municipio.'
      }
    ]
  },
  {
    id: 'LM-48407',
    titulo: 'Contenedor metálico desbordado y residuos esparcidos',
    categoria: 'residuos',
    descripcion: 'Contenedor colapsado con acumulación de bolsas en la vereda que generan focos de suciedad y malos olores.',
    direccion: 'Simón Pérez 4150, González Catán',
    localidadId: 'gonzalez-catan',
    lat: -34.7680,
    lng: -58.6230,
    creadorId: 'usr_vecino_22',
    creadorNombre: 'Marcos T.',
    fecha: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_22', 'usr_vecino_06', 'usr_vecino_09', 'usr_vecino_11', 'usr_vecino_15', 'usr_vecino_18'],
    historial: [
      {
        fecha: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado con apoyo vecinal del barrio.'
      }
    ]
  },
  {
    id: 'LM-48408',
    titulo: 'Zanja y calzada deteriorada en acceso barrial',
    categoria: 'pavimento',
    descripcion: 'Falta de mantenimiento en la entrada del barrio; los días de lluvia se inunda y los pozos quedan ocultos.',
    direccion: 'Colectora Ruta 3 Km 38, Virrey del Pino',
    localidadId: 'virrey-del-pino',
    lat: -34.8230,
    lng: -58.6510,
    creadorId: 'usr_vecino_23',
    creadorNombre: 'Beatriz L.',
    fecha: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-2.jpg'
    ],
    participantes: ['usr_vecino_23', 'usr_vecino_04', 'usr_vecino_07'],
    historial: [
      {
        fecha: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo ingresado. Requiere nivelación y consolidado.'
      }
    ]
  },
  {
    id: 'LM-48409',
    titulo: 'Columna con cables expuestos e intermitencia',
    categoria: 'alumbrado',
    descripcion: 'Riesgo eléctrico en columna de alumbrado sobre la avenida. La tapa de inspección está rota y la luz parpadea.',
    direccion: 'Av. San Martín 3850, Lomas del Mirador',
    localidadId: 'lomas-del-mirador',
    lat: -34.6620,
    lng: -58.5350,
    creadorId: 'usr_vecino_24',
    creadorNombre: 'Agustín P.',
    fecha: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_24', 'usr_vecino_02', 'usr_vecino_05', 'usr_vecino_08', 'usr_vecino_10', 'usr_vecino_13', 'usr_vecino_17'],
    historial: [
      {
        fecha: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo recibido con alerta de seguridad.'
      },
      {
        fecha: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Cuadrilla eléctrica en el lugar asegurando el cableado.'
      }
    ]
  },
  {
    id: 'LM-48410',
    titulo: 'Acumulación de restos de poda en vereda pública',
    categoria: 'residuos',
    descripcion: 'Ramas secas y bolsas de hojas ocupando todo el ancho de la vereda, obligando a los peatones a caminar por la calle.',
    direccion: 'Los Nogales 820, Tapiales',
    localidadId: 'tapiales',
    lat: -34.7030,
    lng: -58.5090,
    creadorId: 'usr_vecino_25',
    creadorNombre: 'Elena F.',
    fecha: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'baja',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_25', 'usr_vecino_03'],
    historial: [
      {
        fecha: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo vecinal para recolección diferenciada de ramas.'
      }
    ]
  },
  {
    id: 'LM-48411',
    titulo: 'Deterioro de carpeta asfáltica en cruce de vías',
    categoria: 'pavimento',
    descripcion: 'Desnivel pronunciado entre las vías del ferrocarril y el asfalto. Provoca frenadas bruscas y congestión vehicular.',
    direccion: 'Defensa 1250, Aldo Bonzi',
    localidadId: 'aldo-bonzi',
    lat: -34.7170,
    lng: -58.5150,
    creadorId: 'usr_vecino_26',
    creadorNombre: 'Martín K.',
    fecha: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    estado: 'en_revision',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/calles/calle-1.jpg',
      'assets/img/reclamos/calles/calle-2.jpg'
    ],
    participantes: ['usr_vecino_26', 'usr_vecino_04', 'usr_vecino_09', 'usr_vecino_12'],
    historial: [
      {
        fecha: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reporte ingresado por conductores frecuentes.'
      },
      {
        fecha: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        estado: 'en_revision',
        nota: 'Inspección técnica coordinada con ferrocarriles.'
      }
    ]
  },
  {
    id: 'LM-48412',
    titulo: 'Cuatro columnas consecutivas apagadas en zona residencial',
    categoria: 'alumbrado',
    descripcion: 'Toda la manzana permanece a oscuras desde el fin de semana pasado, generando inseguridad para los vecinos que regresan del trabajo.',
    direccion: 'Granville 2150, Rafael Castillo',
    localidadId: 'rafael-castillo',
    lat: -34.7200,
    lng: -58.6160,
    creadorId: 'usr_vecino_27',
    creadorNombre: 'Camila Z.',
    fecha: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_27', 'usr_vecino_06', 'usr_vecino_11', 'usr_vecino_16'],
    historial: [
      {
        fecha: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Ingresado por vecinos de Granville y aledañas.'
      }
    ]
  },
  {
    id: 'LM-48413',
    titulo: 'Basural clandestino sobre calle lateral',
    categoria: 'residuos',
    descripcion: 'Camionetas particulares arrojan escombros y basura doméstica en el descampado lateral de la calle.',
    direccion: 'Cristianía 1950, Isidro Casanova',
    localidadId: 'isidro-casanova',
    lat: -34.7060,
    lng: -58.5830,
    creadorId: 'usr_vecino_28',
    creadorNombre: 'Federico H.',
    fecha: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/residuos/basura-1.png'
    ],
    participantes: ['usr_vecino_28', 'usr_vecino_02', 'usr_vecino_07', 'usr_vecino_14', 'usr_vecino_19'],
    historial: [
      {
        fecha: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo ingresado con ubicación precisa.'
      },
      {
        fecha: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Operativo con maquinaria pesada asignado.'
      }
    ]
  },
  {
    id: 'LM-48414',
    titulo: 'Bache profundo en bocacalle de alto tránsito',
    categoria: 'pavimento',
    descripcion: 'Hundimiento profundo justo en la salida de una parada de colectivo. Provoca roturas de tren delantero continuas.',
    direccion: 'Rosas 260, Ramos Mejía',
    localidadId: 'ramos-mejia',
    lat: -34.6470,
    lng: -58.5610,
    creadorId: 'usr_vecino_29',
    creadorNombre: 'Silvia Q.',
    fecha: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
    estado: 'en_proceso',
    prioridad: 'alta',
    fotos: [
      'assets/img/reclamos/calles/calle-3.jpg',
      'assets/img/reclamos/calles/calle-1.jpg'
    ],
    participantes: ['usr_vecino_29', 'usr_vecino_03', 'usr_vecino_05', 'usr_vecino_08', 'usr_vecino_10', 'usr_vecino_12', 'usr_vecino_15', 'usr_vecino_17', 'usr_vecino_20'],
    historial: [
      {
        fecha: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Reclamo vecinal con alto número de adhesiones.'
      },
      {
        fecha: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        estado: 'en_proceso',
        nota: 'Reparación asfáltica en progreso.'
      }
    ]
  },
  {
    id: 'LM-48415',
    titulo: 'Falla y parpadeo intermitente de luminarias en plaza',
    categoria: 'alumbrado',
    descripcion: 'Las luminarias perimetrales de la plaza titilan constantemente encendiéndose y apagándose cada 5 segundos.',
    direccion: 'Villegas 2650, San Justo',
    localidadId: 'san-justo',
    lat: -34.6770,
    lng: -58.5600,
    creadorId: 'usr_vecino_30',
    creadorNombre: 'Gonzalo T.',
    fecha: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    estado: 'recibido',
    prioridad: 'media',
    fotos: [
      'assets/img/reclamos/alumbrado/alumbrado-1.png'
    ],
    participantes: ['usr_vecino_30', 'usr_vecino_04', 'usr_vecino_08'],
    historial: [
      {
        fecha: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
        estado: 'recibido',
        nota: 'Aviso sobre intermitencia en el sistema LED.'
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

