/**
 * SoluciónSegura — Módulo de Gestión de Reclamos
 * Manejo de datos, adhesiones, filtros y persistencia de casos
 */

import { storage } from '../utils/storage.js';
import { INITIAL_RECLAMOS } from '../data/seed-reclamos.js';
import { getSamplePhotosForCategory } from '../data/sample-photos.js';
import { auth } from './auth.js';

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
    // Migración limpia: actualizar fotos si referencian rutas obsoletas
    let needsUpdate = false;
    const migrated = existing.map(r => {
      const validCategoryPhotos = getSamplePhotosForCategory(r.categoria).map(p => p.url);
      const hasObsoletePhotos = Array.isArray(r.fotos) && r.fotos.some(f =>
        typeof f === 'string' && (f.endsWith('.svg') || f.includes('basura-2') || f.includes('basura-3') || f.includes('alumbrado-2') || f.includes('alumbrado-3'))
      );
      if (hasObsoletePhotos || !Array.isArray(r.fotos) || r.fotos.length === 0) {
        needsUpdate = true;
        return {
          ...r,
          fotos: validCategoryPhotos
        };
      }
      return r;
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
    } else if (estado && estado !== 'todos') {
      results = results.filter(r => r.estado === estado);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(r =>
        r.titulo.toLowerCase().includes(q) ||
        r.direccion.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q)
      );
    }

    return results;
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

    if (!claim.participantes) claim.participantes = [];

    if (claim.participantes.includes(user.id)) {
      return { success: false, reason: 'already_joined' };
    }

    claim.participantes.push(user.id);
    storage.set(storage.KEYS.RECLAMOS, list);
    return { success: true, count: claim.participantes.length };
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
      titulo: titulo || `${categoria.charAt(0).toUpperCase() + categoria.slice(1)} en ${direccion || 'La Matanza'}`,
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
   * Restablece los datos de prueba a los valores iniciales
   */
  resetToSeed() {
    storage.set(storage.KEYS.RECLAMOS, INITIAL_RECLAMOS);
    return INITIAL_RECLAMOS;
  }
};

