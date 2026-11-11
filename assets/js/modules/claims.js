/**
 * SoluciónSegura — Módulo de Gestión de Reclamos
 * Manejo de datos, adhesiones, filtros y persistencia de casos
 */

import { storage } from '../utils/storage.js';
import { INITIAL_RECLAMOS } from '../data/seed-reclamos.js';
import { getSamplePhotosForCategory } from '../data/sample-photos.js';
import { auth } from './auth.js';
import { notificationsService } from './notifications.js';

export function generateNaturalTitle(categoria, direccion, localidadId) {
  let locationText = (direccion || '').trim();
  // Limpiar prefijos automáticos como "Punto seleccionado en"
  locationText = locationText.replace(/^Punto seleccionado en\s+/i, '');
  if (!locationText) {
    locationText = 'La Matanza';
  }

  switch (categoria) {
    case 'residuos':
      return `Acumulación de residuos en ${locationText}`;
    case 'pavimento':
      return `Bache o calzada deteriorada en ${locationText}`;
    case 'alumbrado':
      return `Falla de alumbrado público en ${locationText}`;
    default:
      return `Reclamo de servicios urbanos en ${locationText}`;
  }
}

export const claimsService = {
  /**
   * Inicializa la colección de reclamos si el almacenamiento está vacío
   */
  init() {
    const existing = storage.get(storage.KEYS.RECLAMOS, null);
    if (!existing || !Array.isArray(existing) || existing.length === 0) {
      storage.set(storage.KEYS.RECLAMOS, INITIAL_RECLAMOS);
      return INITIAL_RECLAMOS;
    }
    // Sincronizar reclamos seed que falten (p.ej. LM-48350, LM-48220, LM-48150, LM-48120, LM-48050, LM-48010)
    let needsUpdate = false;
    let list = [...existing];
    INITIAL_RECLAMOS.forEach(seed => {
      const idx = list.findIndex(r => r.id === seed.id);
      if (idx === -1) {
        list.push(seed);
        needsUpdate = true;
      }
    });

    const migrated = list.map(r => {
      let updatedClaim = { ...r };
      if (r.id === 'LM-48255' && Array.isArray(r.participantes) && !r.participantes.includes('usr_vecino_demo')) {
        updatedClaim.participantes = [...r.participantes, 'usr_vecino_demo'];
        needsUpdate = true;
      }
      const validCategoryPhotos = getSamplePhotosForCategory(r.categoria).map(p => p.url);
      const hasObsoletePhotos = Array.isArray(r.fotos) && r.fotos.some(f =>
        typeof f === 'string' && (f.endsWith('.svg') || f.includes('basura-2') || f.includes('basura-3') || f.includes('alumbrado-2') || f.includes('alumbrado-3'))
      );
      if (hasObsoletePhotos || !Array.isArray(r.fotos) || r.fotos.length === 0) {
        needsUpdate = true;
        updatedClaim.fotos = validCategoryPhotos;
      }
      return updatedClaim;
    });

    if (needsUpdate) {
      storage.set(storage.KEYS.RECLAMOS, migrated);
      return migrated;
    }
    return existing;
  },

  getAll() {
    return this.init();
  },

  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  /**
   * Filtra reclamos por múltiples criterios
   */
  filter({ categoria = 'todas', localidad = 'todas', estado = 'activos', query = '' } = {}) {
    let results = this.getAll();

    if (categoria && categoria !== 'todas') {
      results = results.filter(r => r.categoria === categoria);
    }

    if (localidad && localidad !== 'todas') {
      results = results.filter(r => r.localidadId === localidad);
    }

    if (estado === 'activos') {
      // Activos por defecto: recibido, en_revision, en_proceso, reabierto
      const activos = ['recibido', 'en_revision', 'en_proceso', 'reabierto'];
      results = results.filter(r => activos.includes(r.estado));
    } else if (estado === 'resuelto' || estado === 'resueltos') {
      results = results.filter(r => r.estado === 'resuelto');
    } else if (estado === 'todos') {
      // Para la exploración pública: se excluyen cancelados y rechazados por defecto
      results = results.filter(r => r.estado !== 'cancelado' && r.estado !== 'rechazado');
    } else if (estado && estado !== 'todos_con_historial') {
      results = results.filter(r => r.estado === estado);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(r =>
        (r.titulo && r.titulo.toLowerCase().includes(q)) ||
        (r.direccion && r.direccion.toLowerCase().includes(q)) ||
        (r.descripcion && r.descripcion.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Ordena reclamos por criterio: 'recientes' (defecto), 'apoyos' o 'cercania'
   */
  sort(claims = [], criterion = 'recientes', refLat = null, refLng = null) {
    const list = [...claims];
    if (criterion === 'apoyos') {
      return list.sort((a, b) => {
        const countA = Array.isArray(a.participantes) ? a.participantes.length : 1;
        const countB = Array.isArray(b.participantes) ? b.participantes.length : 1;
        if (countB !== countA) return countB - countA;
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      });
    }

    if (criterion === 'cercania' && refLat != null && refLng != null) {
      return list.sort((a, b) => {
        if (!a.lat || !a.lng) return 1;
        if (!b.lat || !b.lng) return -1;
        const distA = Math.hypot((a.lat - refLat) * 111.32, (a.lng - refLng) * 111.32 * Math.cos((refLat * Math.PI) / 180));
        const distB = Math.hypot((b.lat - refLat) * 111.32, (b.lng - refLng) * 111.32 * Math.cos((refLat * Math.PI) / 180));
        return distA - distB;
      });
    }

    // Por defecto: Más recientes primero
    return list.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  },

  /**
   * Reclamos creados por el usuario actual
   */
  getByCurrentUser() {
    const user = auth.getCurrentUser();
    if (!user) return [];
    return this.getAll().filter(r => r.creadorId === user.id);
  },

  /**
   * Reclamos a los que el usuario actual se sumó (sin ser el creador)
   */
  getJoinedByCurrentUser() {
    const user = auth.getCurrentUser();
    if (!user) return [];
    return this.getAll().filter(r =>
      r.creadorId !== user.id && r.participantes && r.participantes.includes(user.id)
    );
  },

  /**
   * Sumarse a un reclamo existente (1 apoyo por cuenta)
   */
  joinClaim(claimId) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    // No permitir sumarse a un reporte creado por el mismo usuario
    if (claim.creadorId === user.id) {
      return { success: false, reason: 'is_creator' };
    }

    if (!claim.participantes) claim.participantes = [];

    if (claim.participantes.includes(user.id)) {
      return { success: false, reason: 'already_joined' };
    }

    claim.participantes.push(user.id);
    storage.set(storage.KEYS.RECLAMOS, list);

    // Generar avisos de adhesión (al creador y confirmación al participante)
    notificationsService.notifyNewAdhesion(claim, user);

    return { success: true, count: claim.participantes.length };
  },

  /**
   * Simula solicitud de revisión técnica cuando un reclamo resuelto continúa presente
   */
  reportStillPresent(claimId) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (!claim.historial) claim.historial = [];
    claim.solicitudesRevision = (claim.solicitudesRevision || 0) + 1;
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: claim.estado,
      nota: `El vecino ${user.nombre || 'Vecino'} indicó que el problema continúa presente y solicitó revisión técnica.`
    });
    storage.set(storage.KEYS.RECLAMOS, list);
    return { success: true };
  },

  /**
   * Retirar el apoyo a un reclamo
   */
  leaveClaim(claimId) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim || !claim.participantes) return { success: false, reason: 'not_found' };

    claim.participantes = claim.participantes.filter(id => id !== user.id);
    storage.set(storage.KEYS.RECLAMOS, list);
    return { success: true, count: claim.participantes.length };
  },

  /**
   * Actualiza los datos de un reclamo existente por su creador
   * Aplica para reclamos en estado 'recibido' o 'rechazado' (cuando es subsanable)
   */
  updateClaim(claimId, { titulo, categoria, descripcion, direccion, localidadId, lat, lng, fotos }) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (claim.creadorId !== user.id) {
      return { success: false, reason: 'forbidden' };
    }

    const modifiableStates = ['recibido', 'rechazado'];
    if (!modifiableStates.includes(claim.estado)) {
      return { success: false, reason: 'invalid_state' };
    }

    if (claim.estado === 'rechazado' && claim.subsanable === false) {
      return { success: false, reason: 'not_fixable' };
    }

    const previousCategoria = claim.categoria;
    if (categoria) claim.categoria = categoria;
    if (direccion !== undefined) claim.direccion = direccion;
    if (localidadId !== undefined) claim.localidadId = localidadId;
    if (lat !== undefined) claim.lat = lat;
    if (lng !== undefined) claim.lng = lng;
    if (descripcion !== undefined) claim.descripcion = descripcion;

    // Actualizar título natural si corresponde
    claim.titulo = titulo || generateNaturalTitle(claim.categoria, claim.direccion, claim.localidadId);

    // Actualizar fotos según categoría o parámetro
    if (fotos && Array.isArray(fotos) && fotos.length > 0) {
      claim.fotos = fotos;
    } else if (categoria && categoria !== previousCategoria) {
      claim.fotos = getSamplePhotosForCategory(categoria).map(p => p.url);
    }

    const fueRechazado = claim.estado === 'rechazado';
    if (fueRechazado) {
      // Reenvío de reclamo rechazado subsanable
      claim.estado = 'recibido';
      claim.subsanable = undefined;
    }

    if (!claim.historial) claim.historial = [];
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: claim.estado,
      nota: fueRechazado
        ? `Reclamo subsanado y reenviado por el creador (${user.nombre || 'Vecino'}).`
        : `Información del reclamo actualizada por el creador (${user.nombre || 'Vecino'}).`
    });

    storage.set(storage.KEYS.RECLAMOS, list);

    // Notificar a los vecinos que respaldan sobre actualización relevante
    notificationsService.notifyRelevantUpdate(claim, user);

    return { success: true, claim };
  },

  /**
   * Cancela un reclamo en estado 'recibido' por su creador
   */
  cancelClaim(claimId, motivo = '') {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (claim.creadorId !== user.id) {
      return { success: false, reason: 'forbidden' };
    }

    if (claim.estado !== 'recibido') {
      return { success: false, reason: 'invalid_state' };
    }

    claim.estado = 'cancelado';
    if (!claim.historial) claim.historial = [];
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: 'cancelado',
      nota: motivo ? `Reclamo cancelado por el creador: ${motivo}` : 'Reclamo cancelado por el creador.'
    });

    storage.set(storage.KEYS.RECLAMOS, list);

    // Notificar a creador y vecinos adheridos sobre la cancelación
    notificationsService.notifyClaimCancelled(claim, user, motivo);

    return { success: true, claim };
  },

  /**
   * Registra una solicitud de corrección o cancelación en reclamos 'en_revision', 'en_proceso' o 'reabierto'
   * NO modifica el estado activo del reclamo
   */
  requestAction(claimId, { tipo, motivo }) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (claim.creadorId !== user.id) {
      return { success: false, reason: 'forbidden' };
    }

    if (!claim.solicitudesPendientes) claim.solicitudesPendientes = [];
    const nuevaSolicitud = {
      id: `SOL-${Date.now()}`,
      tipo, // 'correccion' | 'cancelacion'
      motivo,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };
    claim.solicitudesPendientes.push(nuevaSolicitud);

    if (!claim.historial) claim.historial = [];
    const labelTipo = tipo === 'cancelacion' ? 'cancelación' : 'corrección';
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: claim.estado,
      nota: `Solicitud de ${labelTipo} enviada por el creador: "${motivo}". En análisis por el área operativa.`
    });

    storage.set(storage.KEYS.RECLAMOS, list);
    return { success: true, solicitud: nuevaSolicitud };
  },

  /**
   * Confirma la solución y registra valoración por estrellas (1 a 5) y comentario
   * Aplica a reclamos en estado 'resuelto' por su creador
   */
  evaluateSolution(claimId, { estrellas, comentario = '' }) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (claim.creadorId !== user.id) {
      return { success: false, reason: 'forbidden' };
    }

    if (claim.estado !== 'resuelto') {
      return { success: false, reason: 'invalid_state' };
    }

    const score = Math.max(1, Math.min(5, parseInt(estrellas, 10) || 5));
    claim.evaluacion = {
      estrellas: score,
      comentario: comentario.trim(),
      fecha: new Date().toISOString(),
      confirmado: true
    };

    if (!claim.historial) claim.historial = [];
    const starsText = '★'.repeat(score) + '☆'.repeat(5 - score);
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: 'resuelto',
      nota: `Solución confirmada por el creador. Calificación: ${starsText} (${score}/5).${comentario ? ` Comentario: "${comentario}"` : ''}`
    });

    storage.set(storage.KEYS.RECLAMOS, list);
    return { success: true, evaluacion: claim.evaluacion };
  },

  /**
   * Solicita la reapertura de un reclamo en estado 'resuelto' por su creador («El problema continúa»)
   */
  requestReopen(claimId, { motivo }) {
    const user = auth.getCurrentUser();
    if (!user) return { success: false, reason: 'unauthorized' };

    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    if (claim.creadorId !== user.id) {
      return { success: false, reason: 'forbidden' };
    }

    if (claim.estado !== 'resuelto') {
      return { success: false, reason: 'invalid_state' };
    }

    claim.solicitudReapertura = {
      motivo: motivo.trim(),
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };

    if (!claim.historial) claim.historial = [];
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: 'resuelto',
      nota: `Solicitud de reapertura enviada por el creador: "${motivo}". En revisión por la cuadrilla.`
    });

    storage.set(storage.KEYS.RECLAMOS, list);

    // Confirmación al solicitante de la reapertura
    notificationsService.notifyReopenRequest(claim, user, motivo);

    return { success: true, claim };
  },

  /**
   * Crea un nuevo reclamo y lo persiste
   */
  createClaim({ titulo, categoria, descripcion, direccion, localidadId, lat, lng, fotos = [] }) {
    const user = auth.getCurrentUser();
    const idNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `LM-${idNum}`;

    // Asignar fotos de muestra de la categoría si no se proporcionaron
    const categoryPhotos = getSamplePhotosForCategory(categoria).map(p => p.url);
    const resolvedFotos = (Array.isArray(fotos) && fotos.length > 0) ? fotos : categoryPhotos;

    const newClaim = {
      id: newId,
      titulo: titulo || generateNaturalTitle(categoria, direccion, localidadId),
      categoria,
      descripcion: descripcion || '',
      direccion: direccion || 'Ubicación señalada en el mapa',
      localidadId: localidadId || 'san-justo',
      lat: lat || -34.6791,
      lng: lng || -58.5574,
      creadorId: user ? user.id : 'usr_anonimo',
      creadorNombre: user ? user.nombre.split(' ')[0] + ' ' + (user.nombre.split(' ')[1] ? user.nombre.split(' ')[1].charAt(0) + '.' : '') : 'Vecino',
      fecha: new Date().toISOString(),
      estado: 'recibido',
      prioridad: 'media',
      fotos: resolvedFotos,
      participantes: [user ? user.id : 'usr_anonimo'],

      historial: [
        {
          fecha: new Date().toISOString(),
          estado: 'recibido',
          nota: 'Reclamo registrado exitosamente en la plataforma.'
        }
      ]
    };

    const list = this.getAll();
    list.unshift(newClaim);
    storage.set(storage.KEYS.RECLAMOS, list);

    // Notificar al creador la confirmación del nuevo reclamo
    if (user && user.id !== 'usr_anonimo') {
      notificationsService.notifyClaimCreated(newClaim, user);
    }

    return newClaim;
  },

  /**
   * Detección simulada de reclamos similares cercanos
   */
  findSimilar(categoria, lat, lng, radioAprox = 0.015) {
    const list = this.getAll();
    return list.find(r => {
      if (r.categoria !== categoria) return false;
      const dLat = Math.abs(r.lat - lat);
      const dLng = Math.abs(r.lng - lng);
      return (dLat < radioAprox && dLng < radioAprox);
    }) || null;
  },

  /**
   * Encuentra reclamos existentes cercanos a una coordenada (todas las categorías)
   * Ordenados por distancia en metros
   */
  findNearby(lat, lng, radiusKm = 0.6) {
    const list = this.getAll();
    return list.filter(r => {
      if (!r.lat || !r.lng) return false;
      const dLat = (r.lat - lat) * 111.32;
      const dLng = (r.lng - lng) * 111.32 * Math.cos((lat * Math.PI) / 180);
      const distKm = Math.hypot(dLat, dLng);
      return distKm <= radiusKm;
    }).map(r => {
      const dLat = (r.lat - lat) * 111.32;
      const dLng = (r.lng - lng) * 111.32 * Math.cos((lat * Math.PI) / 180);
      const distKm = Math.hypot(dLat, dLng);
      return { ...r, distanceMeters: Math.round(distKm * 1000) };
    }).sort((a, b) => a.distanceMeters - b.distanceMeters);
  },

  /**
   * Actualiza el estado de un reclamo (transición técnica o simulada)
   * Registra el cambio en el historial y dispara las notificaciones correspondientes
   * al creador y vecinos adheridos según sus preferencias.
   */
  updateStatus(claimId, newStatus, nota = '') {
    const list = this.getAll();
    const claim = list.find(r => r.id === claimId);
    if (!claim) return { success: false, reason: 'not_found' };

    const oldStatus = claim.estado;
    if (oldStatus === newStatus) return { success: true, claim };

    claim.estado = newStatus;
    if (!claim.historial) claim.historial = [];
    claim.historial.push({
      fecha: new Date().toISOString(),
      estado: newStatus,
      nota: nota || `Estado actualizado a «${newStatus}».`
    });

    storage.set(storage.KEYS.RECLAMOS, list);

    // Notificar a creador y vecinos adheridos según preferencias
    notificationsService.notifyStatusChange(claim, oldStatus, newStatus, nota);

    return { success: true, claim };
  },

  /**
   * Restablece los datos de prueba a los valores iniciales
   */
  resetToSeed() {
    storage.set(storage.KEYS.RECLAMOS, INITIAL_RECLAMOS);
    return INITIAL_RECLAMOS;
  }
};

