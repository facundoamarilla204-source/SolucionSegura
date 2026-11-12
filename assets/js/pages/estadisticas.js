/**
 * SoluciónSegura — Módulo de Estadísticas Públicas
 * Lógica de datos de demostración, filtrado reactivo, visualización de datos y accesibilidad
 */

import { LOCALIDADES_LA_MATANZA } from '../data/localidades.js';

// Estado global de la vista de estadísticas
const statsState = {
  localidad: 'todas',
  periodo: '12m' // '30d' | '6m' | '12m'
};

// Base de datos de demostración consistente y matemáticamente exacta
// Vista general de 12 meses:
// Total: 1.284 | Activos: 86 | Resueltos: 1.156 | Rechazados/Cancelados: 42 (86 + 1156 + 42 = 1284)
// Tasa de resolución: 90.0%
const DEMO_STATS = {
  todas: {
    nombre: 'Todo el municipio',
    totales: {
      registrados: 1284,
      activos: 86,
      resueltos: 1156,
      desestimados: 42 // 26 rechazados + 16 cancelados
    },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 603, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 411, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 270, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 28, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 22, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 31, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 5, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 1156, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 26, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 16, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 84 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 92 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 78 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 89 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 106 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 114 },
      { mes: 'May', label: 'May 2026', cantidad: 122 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 118 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 112 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 125 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 128 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 116 }
    ],
    ranking: [
      { id: 'san-justo', nombre: 'San Justo (Cabecera)', cantidad: 312 },
      { id: 'laferrere', nombre: 'Gregorio de Laferrere', cantidad: 248 },
      { id: 'gonzalez-catan', nombre: 'González Catán', cantidad: 195 },
      { id: 'ramos-mejia', nombre: 'Ramos Mejía', cantidad: 172 },
      { id: 'isidro-casanova', nombre: 'Isidro Casanova', cantidad: 146 }
    ]
  },
  'san-justo': {
    nombre: 'San Justo',
    totales: { registrados: 312, activos: 21, resueltos: 281, desestimados: 10 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 142, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 98, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 72, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 7, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 5, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 8, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 1, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 281, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 6, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 4, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 20 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 22 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 18 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 21 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 26 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 28 },
      { mes: 'May', label: 'May 2026', cantidad: 30 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 29 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 27 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 31 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 32 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 28 }
    ],
    ranking: [
      { id: 'san-justo', nombre: 'Centro comercial y cívico', cantidad: 138 },
      { id: 'san-justo', nombre: 'Barrio San Alberto', cantidad: 74 },
      { id: 'san-justo', nombre: 'Zona Universidad (UNLaM)', cantidad: 56 },
      { id: 'san-justo', nombre: 'Límite con Villegas', cantidad: 44 }
    ]
  },
  'laferrere': {
    nombre: 'Gregorio de Laferrere',
    totales: { registrados: 248, activos: 18, resueltos: 221, desestimados: 9 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 118, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 82, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 48, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 6, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 4, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 7, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 1, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 221, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 6, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 3, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 16 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 17 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 14 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 17 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 21 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 22 },
      { mes: 'May', label: 'May 2026', cantidad: 24 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 23 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 21 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 25 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 25 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 23 }
    ],
    ranking: [
      { id: 'laferrere', nombre: 'Av. Luro y Centro Estación', cantidad: 104 },
      { id: 'laferrere', nombre: 'Barrio La Palangana', cantidad: 62 },
      { id: 'laferrere', nombre: 'Barrio El Cencerro', cantidad: 48 },
      { id: 'laferrere', nombre: 'Zona Ruta 21', cantidad: 34 }
    ]
  },
  'gonzalez-catan': {
    nombre: 'González Catán',
    totales: { registrados: 195, activos: 14, resueltos: 174, desestimados: 7 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 92, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 66, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 37, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 4, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 3, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 6, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 1, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 174, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 4, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 3, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 12 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 14 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 11 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 13 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 16 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 17 },
      { mes: 'May', label: 'May 2026', cantidad: 19 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 18 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 17 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 20 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 20 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 18 }
    ],
    ranking: [
      { id: 'gonzalez-catan', nombre: 'Casco urbano Catán', cantidad: 78 },
      { id: 'gonzalez-catan', nombre: 'Barrio Las Casitas', cantidad: 52 },
      { id: 'gonzalez-catan', nombre: 'Zona Km 32', cantidad: 41 },
      { id: 'gonzalez-catan', nombre: 'Barrio El Talita', cantidad: 24 }
    ]
  },
  'ramos-mejia': {
    nombre: 'Ramos Mejía',
    totales: { registrados: 172, activos: 11, resueltos: 156, desestimados: 5 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 78, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 48, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 46, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 4, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 3, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 3, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 1, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 156, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 3, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 2, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 11 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 12 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 10 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 11 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 14 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 15 },
      { mes: 'May', label: 'May 2026', cantidad: 16 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 16 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 15 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 17 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 18 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 17 }
    ],
    ranking: [
      { id: 'ramos-mejia', nombre: 'Centro Av. de Mayo', cantidad: 75 },
      { id: 'ramos-mejia', nombre: 'Ramos Norte', cantidad: 46 },
      { id: 'ramos-mejia', nombre: 'Ramos Sur Residencial', cantidad: 33 },
      { id: 'ramos-mejia', nombre: 'Límite con Haedo', cantidad: 18 }
    ]
  },
  'isidro-casanova': {
    nombre: 'Isidro Casanova',
    totales: { registrados: 146, activos: 10, resueltos: 131, desestimados: 5 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 69, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 45, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 32, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 3, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 3, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 3, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 1, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 131, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 3, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 2, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 9 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 10 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 8 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 10 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 12 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 13 },
      { mes: 'May', label: 'May 2026', cantidad: 14 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 14 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 13 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 15 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 15 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 13 }
    ],
    ranking: [
      { id: 'isidro-casanova', nombre: 'Centro y Estación', cantidad: 58 },
      { id: 'isidro-casanova', nombre: 'Barrio San Carlos', cantidad: 42 },
      { id: 'isidro-casanova', nombre: 'Barrio Borgward', cantidad: 28 },
      { id: 'isidro-casanova', nombre: 'Zona Juan Manuel de Rosas', cantidad: 18 }
    ]
  },
  'virrey-del-pino': {
    nombre: 'Virrey del Pino',
    totales: { registrados: 88, activos: 6, resueltos: 79, desestimados: 3 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 44, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 26, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 18, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 2, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 2, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 2, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 79, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 2, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 1, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 5 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 6 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 5 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 6 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 7 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 8 },
      { mes: 'May', label: 'May 2026', cantidad: 8 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 9 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 8 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 9 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 9 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 8 }
    ],
    ranking: [
      { id: 'virrey-del-pino', nombre: 'Km 35 a Km 38', cantidad: 36 },
      { id: 'virrey-del-pino', nombre: 'Barrio Esperanza', cantidad: 26 },
      { id: 'virrey-del-pino', nombre: 'Barrio La Foresta', cantidad: 16 },
      { id: 'virrey-del-pino', nombre: 'Zona Ruta 3 Sur', cantidad: 10 }
    ]
  },
  'lomas-del-mirador': {
    nombre: 'Lomas del Mirador',
    totales: { registrados: 42, activos: 3, resueltos: 38, desestimados: 1 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 18, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 13, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 11, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 1, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 1, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 1, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 38, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 1, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 3 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 3 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 2 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 3 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 4 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 4 },
      { mes: 'May', label: 'May 2026', cantidad: 4 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 4 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 3 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 4 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 4 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 4 }
    ],
    ranking: [
      { id: 'lomas-del-mirador', nombre: 'Av. Juan Manuel de Rosas', cantidad: 20 },
      { id: 'lomas-del-mirador', nombre: 'Barrio Los Cedros', cantidad: 12 },
      { id: 'lomas-del-mirador', nombre: 'Límite con Gral. Paz', cantidad: 10 }
    ]
  },
  'villa-luzuriaga': {
    nombre: 'Villa Luzuriaga',
    totales: { registrados: 35, activos: 2, resueltos: 32, desestimados: 1 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 16, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 11, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 8, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 1, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 0, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 1, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 32, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 1, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 2 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 2 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 2 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 2 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 3 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 3 },
      { mes: 'May', label: 'May 2026', cantidad: 4 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 3 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 3 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 4 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 4 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 3 }
    ],
    ranking: [
      { id: 'villa-luzuriaga', nombre: 'Barrio Los Pinos', cantidad: 16 },
      { id: 'villa-luzuriaga', nombre: 'Centro Luzuriaga', cantidad: 11 },
      { id: 'villa-luzuriaga', nombre: 'Barrio Marina', cantidad: 8 }
    ]
  },
  'ciudad-evita': {
    nombre: 'Ciudad Evita',
    totales: { registrados: 24, activos: 1, resueltos: 22, desestimados: 1 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 10, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 8, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 6, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 0, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 1, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 0, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 22, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 1, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 2 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 2 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 1 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 1 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 2 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 2 },
      { mes: 'May', label: 'May 2026', cantidad: 3 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 2 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 2 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 2 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 3 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 2 }
    ],
    ranking: [
      { id: 'ciudad-evita', nombre: 'Circunscripción 1', cantidad: 11 },
      { id: 'ciudad-evita', nombre: 'Circunscripción 2 y 3', cantidad: 8 },
      { id: 'ciudad-evita', nombre: 'Zona Querandí', cantidad: 5 }
    ]
  },
  'tapiales': {
    nombre: 'Tapiales',
    totales: { registrados: 12, activos: 0, resueltos: 11, desestimados: 1 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 6, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 4, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 2, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 0, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 0, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 0, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 11, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 1, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 1 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 1 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 1 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 1 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 1 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 1 },
      { mes: 'May', label: 'May 2026', cantidad: 1 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 1 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 1 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 1 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 1 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 1 }
    ],
    ranking: [
      { id: 'tapiales', nombre: 'Centro Estación', cantidad: 7 },
      { id: 'tapiales', nombre: 'Zona Autopista Riccheri', cantidad: 5 }
    ]
  },
  'aldo-bonzi': {
    nombre: 'Aldo Bonzi',
    totales: { registrados: 5, activos: 0, resueltos: 5, desestimados: 0 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 3, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 1, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 1, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 0, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 0, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 0, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 5, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 0 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 1 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 0 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 0 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 1 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 0 },
      { mes: 'May', label: 'May 2026', cantidad: 1 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 0 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 0 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 1 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 1 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 0 }
    ],
    ranking: [
      { id: 'aldo-bonzi', nombre: 'Plaza Martín Fierro', cantidad: 3 },
      { id: 'aldo-bonzi', nombre: 'Zona Estación', cantidad: 2 }
    ]
  },
  'villa-madero': {
    nombre: 'Villa Madero',
    totales: { registrados: 3, activos: 0, resueltos: 3, desestimados: 0 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 2, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 1, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 0, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 0, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 0, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 0, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 3, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 0 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 0 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 0 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 0 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 1 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 0 },
      { mes: 'May', label: 'May 2026', cantidad: 1 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 0 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 0 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 0 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 1 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 0 }
    ],
    ranking: [
      { id: 'villa-madero', nombre: 'Av. Vélez Sársfield', cantidad: 2 },
      { id: 'villa-madero', nombre: 'Barrio Fournier', cantidad: 1 }
    ]
  },
  'villa-celina': {
    nombre: 'Villa Celina',
    totales: { registrados: 2, activos: 0, resueltos: 2, desestimados: 0 },
    categorias: {
      pavimento: { nombre: 'Calles y pavimento', cantidad: 1, color: 'var(--cat-pavimento)' },
      residuos: { nombre: 'Basura y residuos', cantidad: 1, color: 'var(--cat-residuos)' },
      alumbrado: { nombre: 'Alumbrado público', cantidad: 0, color: 'var(--cat-alumbrado)' }
    },
    estados: {
      recibido: { nombre: 'Recibido', cantidad: 0, grupo: 'activos', color: 'var(--state-recibido)' },
      revision: { nombre: 'En revisión', cantidad: 0, grupo: 'activos', color: 'var(--state-revision)' },
      proceso: { nombre: 'En proceso', cantidad: 0, grupo: 'activos', color: 'var(--state-proceso)' },
      reabierto: { nombre: 'Reabierto', cantidad: 0, grupo: 'activos', color: 'var(--state-reabierto)' },
      resuelto: { nombre: 'Resuelto', cantidad: 2, grupo: 'resueltos', color: 'var(--state-resuelto)' },
      rechazado: { nombre: 'Rechazado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-rechazado)' },
      cancelado: { nombre: 'Cancelado', cantidad: 0, grupo: 'desestimados', color: 'var(--state-cancelado)' }
    },
    evolucion: [
      { mes: 'Nov', label: 'Nov 2025', cantidad: 0 },
      { mes: 'Dic', label: 'Dic 2025', cantidad: 0 },
      { mes: 'Ene', label: 'Ene 2026', cantidad: 0 },
      { mes: 'Feb', label: 'Feb 2026', cantidad: 0 },
      { mes: 'Mar', label: 'Mar 2026', cantidad: 1 },
      { mes: 'Abr', label: 'Abr 2026', cantidad: 0 },
      { mes: 'May', label: 'May 2026', cantidad: 0 },
      { mes: 'Jun', label: 'Jun 2026', cantidad: 0 },
      { mes: 'Jul', label: 'Jul 2026', cantidad: 0 },
      { mes: 'Ago', label: 'Ago 2026', cantidad: 0 },
      { mes: 'Sep', label: 'Sep 2026', cantidad: 1 },
      { mes: 'Oct', label: 'Oct 2026', cantidad: 0 }
    ],
    ranking: [
      { id: 'villa-celina', nombre: 'Barrio Vicente López', cantidad: 2 }
    ]
  }
  // 'la-tablada', 'rafael-castillo', 'veinte-de-junio' se configuran sin datos (0)
  // para verificar el Estado Vacío pedido explícitamente en el requerimiento.
};

/**
 * Función auxiliar para dar formato a números con separador de miles
 */
function formatNumber(num) {
  return new Intl.NumberFormat('es-AR').format(num);
}

/**
 * Ajusta los datos del modelo según el período seleccionado
 */
function getFilteredDataset(localidadKey, periodo) {
  const baseData = DEMO_STATS[localidadKey];
  if (!baseData || baseData.totales.registrados === 0) {
    return null; // Caso sin datos (Empty State)
  }

  // Si el período es 12m, se retorna el conjunto base completo
  if (periodo === '12m') {
    return {
      nombre: baseData.nombre,
      totales: { ...baseData.totales },
      categorias: { ...baseData.categorias },
      estados: { ...baseData.estados },
      evolucion: [...baseData.evolucion],
      ranking: [...baseData.ranking]
    };
  }

  // Si el período es 6m, tomamos los últimos 6 meses (May a Oct)
  if (periodo === '6m') {
    const evol6m = baseData.evolucion.slice(6);
    const sum6m = evol6m.reduce((acc, curr) => acc + curr.cantidad, 0);
    const factor = sum6m / baseData.totales.registrados;

    const resueltos = Math.round(baseData.totales.resueltos * factor);
    const activos = Math.round(baseData.totales.activos * factor);
    const desestimados = Math.max(0, sum6m - resueltos - activos);

    // Categorías escaladas
    const catPav = Math.round(baseData.categorias.pavimento.cantidad * factor);
    const catRes = Math.round(baseData.categorias.residuos.cantidad * factor);
    const catAlum = Math.max(0, sum6m - catPav - catRes);

    // Estados escalados
    const estados = {};
    for (const [key, item] of Object.entries(baseData.estados)) {
      estados[key] = {
        ...item,
        cantidad: Math.round(item.cantidad * factor)
      };
    }
    // Asegurar que resuelto coincida exactamente
    estados.resuelto.cantidad = resueltos;

    const ranking = baseData.ranking.map(item => ({
      ...item,
      cantidad: Math.round(item.cantidad * factor)
    }));

    return {
      nombre: baseData.nombre,
      totales: {
        registrados: sum6m,
        activos,
        resueltos,
        desestimados
      },
      categorias: {
        pavimento: { ...baseData.categorias.pavimento, cantidad: catPav },
        residuos: { ...baseData.categorias.residuos, cantidad: catRes },
        alumbrado: { ...baseData.categorias.alumbrado, cantidad: catAlum }
      },
      estados,
      evolucion: evol6m,
      ranking
    };
  }

  // Si el período es 30d, tomamos el último mes / 4 semanas
  if (periodo === '30d') {
    const ultimoMes = baseData.evolucion[baseData.evolucion.length - 1];
    const total30d = ultimoMes.cantidad;
    const factor = total30d / baseData.totales.registrados;

    const resueltos = Math.round(baseData.totales.resueltos * factor);
    const activos = Math.max(1, Math.round(baseData.totales.activos * factor));
    const desestimados = Math.max(0, total30d - resueltos - activos);

    const catPav = Math.round(baseData.categorias.pavimento.cantidad * factor);
    const catRes = Math.round(baseData.categorias.residuos.cantidad * factor);
    const catAlum = Math.max(0, total30d - catPav - catRes);

    const estados = {};
    for (const [key, item] of Object.entries(baseData.estados)) {
      estados[key] = {
        ...item,
        cantidad: Math.round(item.cantidad * factor)
      };
    }
    estados.resuelto.cantidad = resueltos;

    // Desglose de 4 semanas para los últimos 30 días
    const semana1 = Math.round(total30d * 0.22);
    const semana2 = Math.round(total30d * 0.26);
    const semana3 = Math.round(total30d * 0.28);
    const semana4 = total30d - semana1 - semana2 - semana3;

    const evol30d = [
      { mes: 'Sem 1', label: '1 - 7 Oct', cantidad: semana1 },
      { mes: 'Sem 2', label: '8 - 14 Oct', cantidad: semana2 },
      { mes: 'Sem 3', label: '15 - 21 Oct', cantidad: semana3 },
      { mes: 'Sem 4', label: '22 - 31 Oct', cantidad: semana4 }
    ];

    const ranking = baseData.ranking.map(item => ({
      ...item,
      cantidad: Math.round(item.cantidad * factor)
    }));

    return {
      nombre: baseData.nombre,
      totales: {
        registrados: total30d,
        activos,
        resueltos,
        desestimados
      },
      categorias: {
        pavimento: { ...baseData.categorias.pavimento, cantidad: catPav },
        residuos: { ...baseData.categorias.residuos, cantidad: catRes },
        alumbrado: { ...baseData.categorias.alumbrado, cantidad: catAlum }
      },
      estados,
      evolucion: evol30d,
      ranking
    };
  }

  return baseData;
}

/**
 * Inicializa el selector de localidades en la barra de filtros
 */
function initLocalidadesSelect() {
  const selectEl = document.getElementById('stats-select-localidad');
  if (!selectEl) return;

  // Limpiar opciones previas excepto la primera
  selectEl.innerHTML = '<option value="todas">Todas las localidades (La Matanza)</option>';

  LOCALIDADES_LA_MATANZA.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc.id;
    opt.textContent = loc.nombre + (loc.esCabecera ? ' (Cabecera)' : '');
    selectEl.appendChild(opt);
  });
}

/**
 * Renderiza los 4 indicadores numéricos principales
 */
function renderKPIs(totales) {
  const elTotal = document.getElementById('kpi-total-val');
  const elActivos = document.getElementById('kpi-activos-val');
  const elResueltos = document.getElementById('kpi-resueltos-val');
  const elTasa = document.getElementById('kpi-tasa-val');
  const elTasaSub = document.getElementById('kpi-tasa-sub');

  if (!elTotal) return;

  const tasa = totales.registrados > 0
    ? ((totales.resueltos / totales.registrados) * 100).toFixed(1)
    : '0';

  elTotal.textContent = formatNumber(totales.registrados);
  elActivos.textContent = formatNumber(totales.activos);
  elResueltos.textContent = formatNumber(totales.resueltos);
  elTasa.textContent = `${tasa}%`;

  if (elTasaSub) {
    elTasaSub.textContent = `${formatNumber(totales.resueltos)} de ${formatNumber(totales.registrados)} reclamos solucionados`;
  }
}

/**
 * Renderiza la distribución por categorías
 */
function renderCategorias(categorias, totalRegistrados) {
  const listEl = document.getElementById('stats-cat-list');
  if (!listEl) return;

  const keys = ['pavimento', 'residuos', 'alumbrado'];
  listEl.innerHTML = keys.map(key => {
    const cat = categorias[key];
    const pct = totalRegistrados > 0
      ? ((cat.cantidad / totalRegistrados) * 100).toFixed(1)
      : '0.0';

    return `
      <div class="stats-cat-item">
        <div class="stats-cat-item__meta">
          <div class="stats-cat-item__info">
            <span class="stats-cat-dot stats-cat-dot--${key}" aria-hidden="true"></span>
            <span class="stats-cat-item__name">${cat.nombre}</span>
          </div>
          <div class="stats-cat-item__numbers">
            <span>${formatNumber(cat.cantidad)}</span>
            <span class="stats-cat-item__pct">(${pct}%)</span>
          </div>
        </div>
        <div class="stats-progress-track" role="progressbar" aria-valuenow="${cat.cantidad}" aria-valuemin="0" aria-valuemax="${totalRegistrados}" aria-label="${cat.nombre}: ${cat.cantidad} reclamos (${pct}%)">
          <div class="stats-progress-bar stats-progress-bar--${key}" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renderiza la distribución por estado de reclamo
 */
function renderEstados(estados, totales) {
  const barEl = document.getElementById('stats-status-bar');
  const groupsEl = document.getElementById('stats-status-groups');
  if (!barEl || !groupsEl) return;

  const total = totales.registrados;

  // 1. Barra segmentada
  if (total > 0) {
    const pctActivos = ((totales.activos / total) * 100).toFixed(1);
    const pctResueltos = ((totales.resueltos / total) * 100).toFixed(1);
    const pctDesestimados = ((totales.desestimados / total) * 100).toFixed(1);

    barEl.innerHTML = `
      <div class="stats-status-bar__seg" style="width: ${pctResueltos}%; background-color: var(--state-resuelto);" title="Resueltos: ${totales.resueltos} (${pctResueltos}%)" aria-label="Resueltos: ${totales.resueltos}"></div>
      <div class="stats-status-bar__seg" style="width: ${pctActivos}%; background-color: var(--color-brand-sky);" title="Activos en gestión: ${totales.activos} (${pctActivos}%)" aria-label="Activos en gestión: ${totales.activos}"></div>
      <div class="stats-status-bar__seg" style="width: ${pctDesestimados}%; background-color: var(--color-text-muted);" title="Rechazados o cancelados: ${totales.desestimados} (${pctDesestimados}%)" aria-label="Rechazados o cancelados: ${totales.desestimados}"></div>
    `;
  } else {
    barEl.innerHTML = '';
  }

  // 2. Grupos de estados
  const activeKeys = ['recibido', 'revision', 'proceso', 'reabierto'];
  const resolvedKeys = ['resuelto'];
  const dismissedKeys = ['rechazado', 'cancelado'];

  const renderGroupRows = (keys) => {
    return keys.map(key => {
      const item = estados[key];
      const pct = total > 0 ? ((item.cantidad / total) * 100).toFixed(1) : '0';
      return `
        <div class="stats-status-item-row">
          <div class="stats-status-item-label">
            <span class="stats-status-item-dot" style="background-color: ${item.color};" aria-hidden="true"></span>
            <span>${item.nombre}</span>
          </div>
          <div class="stats-status-item-counts">
            <span>${formatNumber(item.cantidad)}</span>
            <span style="font-size: 11px; font-weight: normal; color: var(--color-text-muted); margin-left: 4px;">(${pct}%)</span>
          </div>
        </div>
      `;
    }).join('');
  };

  groupsEl.innerHTML = `
    <div class="stats-status-group-block">
      <div class="stats-status-group-heading">
        <span>Resueltos</span>
        <span>${formatNumber(totales.resueltos)}</span>
      </div>
      ${renderGroupRows(resolvedKeys)}
    </div>

    <div class="stats-status-group-block">
      <div class="stats-status-group-heading">
        <span>Activos en gestión</span>
        <span>${formatNumber(totales.activos)}</span>
      </div>
      ${renderGroupRows(activeKeys)}
    </div>

    <div class="stats-status-group-block">
      <div class="stats-status-group-heading">
        <span>Finalizados sin intervención</span>
        <span>${formatNumber(totales.desestimados)}</span>
      </div>
      ${renderGroupRows(dismissedKeys)}
    </div>
  `;
}

/**
 * Renderiza el gráfico SVG interactivo de evolución mensual
 */
function renderEvolucionChart(evolucionData, periodo) {
  const container = document.getElementById('stats-chart-container');
  const tooltip = document.getElementById('stats-chart-tooltip');
  if (!container) return;

  if (!evolucionData || evolucionData.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">Sin datos en el período seleccionado.</p>';
    return;
  }

  // Dimensiones del canvas SVG
  const width = 860;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Rango Y
  const maxVal = Math.max(...evolucionData.map(d => d.cantidad), 10);
  const yCeil = Math.ceil((maxVal * 1.15) / 10) * 10; // Redondear hacia arriba

  // Coordenadas de los puntos
  const n = evolucionData.length;
  const stepX = chartW / (n > 1 ? n - 1 : 1);

  const points = evolucionData.map((d, i) => {
    const x = paddingLeft + i * stepX;
    const y = paddingTop + chartH - (d.cantidad / yCeil) * chartH;
    return { x, y, data: d };
  });

  // Línea poligonal y área sombreada
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `${acc} L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(paddingTop + chartH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(paddingTop + chartH).toFixed(1)} Z`;

  // Grilla horizontal (4 líneas de referencia)
  const gridLines = [];
  const gridCount = 4;
  for (let i = 0; i <= gridCount; i++) {
    const val = Math.round((yCeil / gridCount) * i);
    const yPos = paddingTop + chartH - (val / yCeil) * chartH;
    gridLines.push(`
      <line x1="${paddingLeft}" y1="${yPos}" x2="${width - paddingRight}" y2="${yPos}" stroke="#E2E8F0" stroke-dasharray="3,3" stroke-width="1" />
      <text x="${paddingLeft - 8}" y="${yPos + 4}" fill="#64748B" font-size="11" font-family="Inter, sans-serif" text-anchor="end">${val}</text>
    `);
  }

  // Etiquetas del eje X
  const xLabels = points.map(p => `
    <text x="${p.x}" y="${height - 12}" fill="#64748B" font-size="11" font-family="Inter, sans-serif" font-weight="500" text-anchor="middle">${p.data.mes}</text>
  `).join('');

  // Puntos interactivos
  const circles = points.map((p, idx) => `
    <circle cx="${p.x}" cy="${p.y}" r="5" fill="#0284C7" stroke="#FFFFFF" stroke-width="2.5" 
      class="stats-chart-point" 
      data-idx="${idx}"
      data-label="${p.data.label || p.data.mes}"
      data-value="${p.data.cantidad}"
      role="graphics-symbol"
      aria-label="${p.data.label || p.data.mes}: ${p.data.cantidad} reclamos"
      tabindex="0"
      style="cursor: pointer; transition: r 150ms ease-out, fill 150ms ease-out;"
    />
  `).join('');

  const svgHtml = `
    <svg viewBox="0 0 ${width} ${height}" class="stats-svg-chart" role="img" aria-label="Gráfico de evolución temporal de reclamos">
      <defs>
        <linearGradient id="chartSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284C7" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0.01" />
        </linearGradient>
      </defs>

      <!-- Grilla y Ejes -->
      ${gridLines.join('')}

      <!-- Área sombreada bajo la curva -->
      <path d="${areaD}" fill="url(#chartSkyGrad)" />

      <!-- Línea principal -->
      <path d="${pathD}" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Etiquetas Eje X -->
      ${xLabels}

      <!-- Puntos interactivos -->
      ${circles}
    </svg>
  `;

  container.innerHTML = svgHtml;

  // Interacción de tooltips
  const svgEl = container.querySelector('svg');
  if (!svgEl || !tooltip) return;

  const showTooltipAtPoint = (circle) => {
    const label = circle.getAttribute('data-label');
    const val = circle.getAttribute('data-value');
    circle.setAttribute('r', '7');
    circle.setAttribute('fill', '#062F66');

    const rect = circle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    tooltip.textContent = `${label}: ${formatNumber(val)} reclamos`;
    tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - containerRect.top}px`;
    tooltip.classList.add('is-visible');
  };

  const hideTooltipAtPoint = (circle) => {
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', '#0284C7');
    tooltip.classList.remove('is-visible');
  };

  container.querySelectorAll('.stats-chart-point').forEach(c => {
    c.addEventListener('mouseenter', () => showTooltipAtPoint(c));
    c.addEventListener('mouseleave', () => hideTooltipAtPoint(c));
    c.addEventListener('focus', () => showTooltipAtPoint(c));
    c.addEventListener('blur', () => hideTooltipAtPoint(c));
  });
}

/**
 * Renderiza el ranking territorial de localidades
 */
function renderRankingTerritorial(rankingData, totalRegistrados) {
  const rankingListEl = document.getElementById('stats-ranking-list');
  const panelTitleEl = document.getElementById('stats-territorial-title');
  const panelSubEl = document.getElementById('stats-territorial-subtitle');
  if (!rankingListEl) return;

  if (statsState.localidad === 'todas') {
    if (panelTitleEl) panelTitleEl.textContent = 'Top 5 localidades con más reclamos';
    if (panelSubEl) panelSubEl.textContent = 'Distribución de reportes cívicos en los principales centros urbanos del partido';
  } else {
    if (panelTitleEl) panelTitleEl.textContent = `Zonas con más actividad en ${DEMO_STATS[statsState.localidad]?.nombre || 'la localidad'}`;
    if (panelSubEl) panelSubEl.textContent = 'Subzonas y barrios con mayor cantidad de incidencias reportadas';
  }

  const maxVal = rankingData.length > 0 ? rankingData[0].cantidad : 1;

  rankingListEl.innerHTML = rankingData.map((item, idx) => {
    const pctRelative = maxVal > 0 ? ((item.cantidad / maxVal) * 100).toFixed(1) : 0;
    const pctTotal = totalRegistrados > 0 ? ((item.cantidad / totalRegistrados) * 100).toFixed(1) : 0;

    return `
      <div class="stats-ranking-item">
        <span class="stats-ranking-pos">#${idx + 1}</span>
        <span class="stats-ranking-name" title="${item.nombre}">${item.nombre}</span>
        <div class="stats-ranking-bar-wrap" aria-hidden="true">
          <div class="stats-ranking-bar" style="width: ${pctRelative}%;"></div>
        </div>
        <div class="stats-ranking-value">
          ${formatNumber(item.cantidad)}
          <span>(${pctTotal}%)</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Actualiza el enlace hacia la pantalla Explorar conservando la localidad activa
 */
function updateExplorarLinks() {
  const btnMapTerritorial = document.getElementById('btn-map-territorial');
  const btnCtaExplorar = document.getElementById('btn-cta-explorar');

  const targetUrl = statsState.localidad !== 'todas'
    ? `explorar.html?localidad=${statsState.localidad}`
    : 'explorar.html';

  if (btnMapTerritorial) btnMapTerritorial.setAttribute('href', targetUrl);
  if (btnCtaExplorar) btnCtaExplorar.setAttribute('href', targetUrl);
}

/**
 * Función central de actualización de la vista según el estado actual
 */
function updateStatsView() {
  const data = getFilteredDataset(statsState.localidad, statsState.periodo);

  const mainStatsContent = document.getElementById('stats-main-content');
  const emptyState = document.getElementById('stats-empty-state');
  const emptyLocalityName = document.getElementById('stats-empty-locality-name');

  if (!data) {
    // Mostrar Estado Vacío amigable
    if (mainStatsContent) mainStatsContent.style.display = 'none';
    if (emptyState) emptyState.classList.add('is-visible');

    const locObj = LOCALIDADES_LA_MATANZA.find(l => l.id === statsState.localidad);
    const locName = locObj ? locObj.nombre : statsState.localidad;
    if (emptyLocalityName) emptyLocalityName.textContent = locName;
    return;
  }

  // Ocultar estado vacío y mostrar contenido
  if (emptyState) emptyState.classList.remove('is-visible');
  if (mainStatsContent) mainStatsContent.style.display = 'block';

  // Renderizar secciones
  renderKPIs(data.totales);
  renderCategorias(data.categorias, data.totales.registrados);
  renderEstados(data.estados, data.totales);
  renderEvolucionChart(data.evolucion, statsState.periodo);
  renderRankingTerritorial(data.ranking, data.totales.registrados);
  updateExplorarLinks();
}

/**
 * Sincroniza controles de formulario con el estado
 */
function syncFilterControls() {
  const selectLoc = document.getElementById('stats-select-localidad');
  if (selectLoc) selectLoc.value = statsState.localidad;

  document.querySelectorAll('.js-period-btn').forEach(btn => {
    const val = btn.getAttribute('data-period');
    const isActive = val === statsState.periodo;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });
}

/**
 * Lee parámetros de la URL para inicializar filtros si provienen de otra página
 */
function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const loc = params.get('localidad') || params.get('loc');
  const per = params.get('periodo');

  if (loc && (DEMO_STATS[loc] || LOCALIDADES_LA_MATANZA.some(l => l.id === loc))) {
    statsState.localidad = loc;
  }
  if (per && ['30d', '6m', '12m'].includes(per)) {
    statsState.periodo = per;
  }
}

/**
 * Restablece los filtros al valor predeterminado
 */
function resetFilters() {
  statsState.localidad = 'todas';
  statsState.periodo = '12m';

  // Limpiar URL params sin recargar
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url.pathname);

  syncFilterControls();
  updateStatsView();
}

/**
 * Inicializador principal de la pantalla de Estadísticas
 */
export function initEstadisticasPage() {
  initLocalidadesSelect();
  readUrlParams();
  syncFilterControls();

  // Event Listeners
  const selectLoc = document.getElementById('stats-select-localidad');
  if (selectLoc) {
    selectLoc.addEventListener('change', (e) => {
      statsState.localidad = e.target.value;
      updateStatsView();
    });
  }

  document.querySelectorAll('.js-period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const per = btn.getAttribute('data-period');
      if (per && per !== statsState.periodo) {
        statsState.periodo = per;
        syncFilterControls();
        updateStatsView();
      }
    });
  });

  const btnReset = document.getElementById('stats-btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', resetFilters);
  }

  const btnEmptyReset = document.getElementById('stats-empty-btn-reset');
  if (btnEmptyReset) {
    btnEmptyReset.addEventListener('click', resetFilters);
  }

  // Redibujar gráfico SVG al redimensionar ventana para garantizar nitidez y proporciones
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const data = getFilteredDataset(statsState.localidad, statsState.periodo);
      if (data) {
        renderEvolucionChart(data.evolucion, statsState.periodo);
      }
    }, 150);
  });

  // Render inicial
  updateStatsView();
}

