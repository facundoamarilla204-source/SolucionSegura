/**
 * SoluciónSegura — Módulo de Gestión de Notificaciones
 * Almacenamiento, filtrado, conteo y generación reactiva de avisos ciudadanos
 * Exclusivamente HTML, CSS, JavaScript Vanilla y localStorage
 */

import { storage } from '../utils/storage.js';
import { auth } from './auth.js';
import { DEMO_USER } from '../data/seed-reclamos.js';

const DEMO_SEEDED_KEY = 'solucionsegura_notifs_demo_seeded';

export const notificationsService = {
  /**
   * Obtiene la colección completa de notificaciones sin filtrar de localStorage
   */
  _getAllRaw() {
    return storage.get(storage.KEYS.NOTIFICACIONES, []);
  },

  /**
   * Guarda la colección completa de notificaciones en localStorage
   * y dispara evento personalizado para reactividad instantánea
   */
  _saveAll(list) {
    storage.set(storage.KEYS.NOTIFICACIONES, list);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('notifications:updated', { detail: { count: list.length } }));
    }
  },

  /**
   * Inicializa notificaciones demo para la cuenta de demostración (Mariana Gómez)
   * Solo se ejecuta una vez para evitar duplicaciones en recargas
   */
  initSeed() {
    const isSeeded = storage.get(DEMO_SEEDED_KEY, false);
    if (isSeeded) {
      return;
    }

    let allNotifs = this._getAllRaw();
    // Comprobar si Mariana ya tiene notificaciones
    const hasDemoNotifs = allNotifs.some(n => n.userId === DEMO_USER.id);
    if (!hasDemoNotifs) {
      const now = Date.now();
      const demoSeed = [
        {
          id: 'notif_demo_01',
          userId: DEMO_USER.id,
          tipo: 'cambio_estado',
          titulo: 'Avance en tu reclamo #LM-48291',
          mensaje: 'El reclamo por «Bache en Almafuerte 3150» cambió a estado «En proceso». Se asignó cuadrilla municipal para reparación asfáltica.',
          fecha: new Date(now - 12 * 60 * 60 * 1000).toISOString(), // Hace 12 horas
          leida: false,
          claimId: 'LM-48291'
        },
        {
          id: 'notif_demo_02',
          userId: DEMO_USER.id,
          tipo: 'nueva_adhesion',
          titulo: 'Nuevo vecino apoyó tu reclamo #LM-48291',
          mensaje: 'Un vecino de San Justo se sumó al reclamo. Ya son 4 participantes respaldando la solución.',
          fecha: new Date(now - 24 * 60 * 60 * 1000).toISOString(), // Hace 1 día
          leida: false,
          claimId: 'LM-48291'
        },
        {
          id: 'notif_demo_03',
          userId: DEMO_USER.id,
          tipo: 'cambio_estado',
          titulo: 'Novedades en reclamo respaldado #LM-48255',
          mensaje: 'El reclamo por «Acumulación de residuos en Av. de Mayo y Humboldt» pasó a estado «En revisión». Personal técnico realiza verificación.',
          fecha: new Date(now - 48 * 60 * 60 * 1000).toISOString(), // Hace 2 días
          leida: true,
          claimId: 'LM-48255'
        },
        {
          id: 'notif_demo_04',
          userId: DEMO_USER.id,
          tipo: 'reclamo_creado',
          titulo: 'Reclamo #LM-48291 registrado con éxito',
          mensaje: 'Tu reporte en Almafuerte 3150 fue ingresado en la plataforma con estado inicial «Recibido».',
          fecha: new Date(now - 72 * 60 * 60 * 1000).toISOString(), // Hace 3 días
          leida: true,
          claimId: 'LM-48291'
        }
      ];

      allNotifs = [...demoSeed, ...allNotifs];
      storage.set(storage.KEYS.NOTIFICACIONES, allNotifs);
    }
    storage.set(DEMO_SEEDED_KEY, true);
  },

  /**
   * Obtiene las notificaciones del usuario especificado (o del usuario activo)
   * Ordenadas de más reciente a más antigua
   */
  getByUser(userId = null) {
    this.initSeed();
    const targetUserId = userId || (auth.getCurrentUser() ? auth.getCurrentUser().id : null);
    if (!targetUserId) return [];

    const all = this._getAllRaw();
    return all
      .filter(n => n.userId === targetUserId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  },

  /**
   * Conteo de notificaciones no leídas para un usuario
   */
  getUnreadCount(userId = null) {
    const list = this.getByUser(userId);
    return list.filter(n => !n.leida).length;
  },

  /**
   * Obtiene las N notificaciones más recientes para el panel de la navbar
   */
  getRecent(userId = null, limit = 5) {
    const list = this.getByUser(userId);
    return list.slice(0, limit);
  },

  /**
   * Verifica si las preferencias del usuario permiten recibir un tipo de aviso determinado
   */
  isNotificationEnabledForUser(userId, tipo) {
    let user = null;
    const currentUser = auth.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      user = currentUser;
    } else {
      const users = auth.getUsers();
      user = users.find(u => u.id === userId);
    }

    if (!user) return true;
    const prefs = user.notificaciones || {};

    // Si las notificaciones de la app están globalmente desactivadas
    if (prefs.app === false) return false;

    switch (tipo) {
      case 'reclamo_creado':
        return prefs.ownClaims !== false;
      case 'cambio_estado':
        return prefs.ownClaims !== false;
      case 'cambio_estado_adherido':
        return prefs.joinedClaims !== false;
      case 'nueva_adhesion':
        // Si existe preferencia específica para adhesiones, respetarla; de lo contrario, propia de reclamos
        if (prefs.newAdhesions !== undefined) {
          return prefs.newAdhesions === true;
        }
        return prefs.ownClaims !== false;
      case 'reclamo_resuelto':
      case 'solicitud_reapertura':
        return prefs.resolution !== false;
      case 'reclamo_cancelado':
        return prefs.ownClaims !== false;
      case 'modificacion_relevante':
        return prefs.joinedClaims !== false;
      default:
        return true;
    }
  },

  /**
   * Crea una nueva notificación asociada a un usuario, validando sus preferencias
   */
  create({ userId, tipo, titulo, mensaje, claimId = null, fecha = null }) {
    if (!userId || !titulo || !mensaje) {
      return null;
    }

    // Verificar preferencias del destinatario
    if (!this.isNotificationEnabledForUser(userId, tipo)) {
      return null;
    }

    const newNotif = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      tipo,
      titulo: titulo.trim(),
      mensaje: mensaje.trim(),
      fecha: fecha || new Date().toISOString(),
      leida: false,
      claimId: claimId || null
    };

    const all = this._getAllRaw();
    all.unshift(newNotif);
    this._saveAll(all);

    return newNotif;
  },

  /**
   * Marca una notificación específica como leída
   */
  markAsRead(notificationId) {
    if (!notificationId) return false;
    const all = this._getAllRaw();
    const notif = all.find(n => n.id === notificationId);
    if (!notif) return false;

    if (!notif.leida) {
      notif.leida = true;
      this._saveAll(all);
    }
    return true;
  },

  /**
   * Marca todas las notificaciones de un usuario como leídas
   */
  markAllAsRead(userId = null) {
    const targetUserId = userId || (auth.getCurrentUser() ? auth.getCurrentUser().id : null);
    if (!targetUserId) return 0;

    const all = this._getAllRaw();
    let updatedCount = 0;

    all.forEach(n => {
      if (n.userId === targetUserId && !n.leida) {
        n.leida = true;
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      this._saveAll(all);
    }
    return updatedCount;
  },

  /**
   * Notificación de bienvenida al registrarse una nueva cuenta ciudadana
   */
  sendWelcomeNotification(user) {
    if (!user || !user.id) return null;
    return this.create({
      userId: user.id,
      tipo: 'bienvenida',
      titulo: '¡Te damos la bienvenida a SoluciónSegura!',
      mensaje: 'Tu cuenta ya está activa. Podrás realizar nuevos reclamos barriales, sumar tu apoyo a pedidos comunitarios y hacer seguimiento transparente.',
      claimId: null
    });
  },

  /**
   * Notificación cuando se crea un nuevo reclamo
   */
  notifyClaimCreated(claim, user) {
    if (!claim || !user) return;
    this.create({
      userId: user.id,
      tipo: 'reclamo_creado',
      titulo: `Reclamo #${claim.id} registrado`,
      mensaje: `Tu reclamo por «${claim.titulo}» fue ingresado con estado inicial «Recibido». Te notificaremos cuando haya avances.`,
      claimId: claim.id
    });
  },

  /**
   * Notificación cuando un vecino se suma a un reclamo
   * Avisa al creador del reclamo (sin filtrar datos privados del nuevo participante)
   * y envía una confirmación al participante que se unió
   */
  notifyNewAdhesion(claim, joinedUser) {
    if (!claim || !joinedUser) return;

    // 1. Aviso al creador del reclamo (si no es el mismo usuario)
    if (claim.creadorId && claim.creadorId !== joinedUser.id) {
      const totalParticipantes = Array.isArray(claim.participantes) ? claim.participantes.length : 1;
      this.create({
        userId: claim.creadorId,
        tipo: 'nueva_adhesion',
        titulo: `Nuevo vecino apoyó tu reclamo #${claim.id}`,
        mensaje: `Un vecino se sumó al respaldo de «${claim.titulo}». Ya son ${totalParticipantes} participantes impulsando la solución.`,
        claimId: claim.id
      });
    }

    // 2. Confirmación al usuario que acaba de sumarse
    this.create({
      userId: joinedUser.id,
      tipo: 'cambio_estado_adherido',
      titulo: `Te sumaste al reclamo #${claim.id}`,
      mensaje: `Ahora respaldás «${claim.titulo}». Recibirás avisos ante cada avance técnico y resolución.`,
      claimId: claim.id
    });
  },

  /**
   * Notificación cuando cambia el estado de un reclamo
   * Avisa al creador y a los participantes adheridos
   */
  notifyStatusChange(claim, oldStatus, newStatus, nota = '') {
    if (!claim || !newStatus || oldStatus === newStatus) return;

    const labelNew = this._formatStateLabel(newStatus);
    const labelOld = this._formatStateLabel(oldStatus);
    const isResolution = newStatus === 'resuelto';

    // 1. Notificar al creador
    if (claim.creadorId) {
      const tipo = isResolution ? 'reclamo_resuelto' : 'cambio_estado';
      const titulo = isResolution
        ? `Reclamo #${claim.id} resuelto`
        : `Avance en tu reclamo #${claim.id}`;
      const mensaje = isResolution
        ? `El reclamo por «${claim.titulo}» fue marcado como «Resuelto». Por favor valorá la solución técnica brindada.`
        : `El reclamo «${claim.titulo}» pasó de «${labelOld}» a «${labelNew}».${nota ? ` ${nota}` : ''}`;

      this.create({
        userId: claim.creadorId,
        tipo,
        titulo,
        mensaje,
        claimId: claim.id
      });
    }

    // 2. Notificar a los vecinos adheridos (excluyendo al creador)
    const participantes = Array.isArray(claim.participantes) ? claim.participantes : [];
    participantes.forEach(partId => {
      if (partId !== claim.creadorId && partId !== 'usr_anonimo') {
        const tipo = isResolution ? 'reclamo_resuelto' : 'cambio_estado_adherido';
        const titulo = isResolution
          ? `Reclamo #${claim.id} al que te sumaste fue resuelto`
          : `Actualización en reclamo respaldado #${claim.id}`;
        const mensaje = isResolution
          ? `El reclamo «${claim.titulo}» que apoyaste fue marcado como «Resuelto». Gracias por tu participación comunitaria.`
          : `El reclamo «${claim.titulo}» avanzó a estado «${labelNew}».`;

        this.create({
          userId: partId,
          tipo,
          titulo,
          mensaje,
          claimId: claim.id
        });
      }
    });
  },

  /**
   * Notificación cuando se cancela un reclamo
   */
  notifyClaimCancelled(claim, cancellingUser, motivo = '') {
    if (!claim) return;

    // Notificar al creador si quien cancela es otro (o confirmación al creador)
    if (claim.creadorId) {
      this.create({
        userId: claim.creadorId,
        tipo: 'reclamo_cancelado',
        titulo: `Reclamo #${claim.id} cancelado`,
        mensaje: motivo
          ? `El reclamo por «${claim.titulo}» fue cancelado: ${motivo}.`
          : `El reclamo por «${claim.titulo}» fue cancelado.`,
        claimId: claim.id
      });
    }

    // Notificar a los vecinos que respaldaban el reclamo
    const participantes = Array.isArray(claim.participantes) ? claim.participantes : [];
    participantes.forEach(partId => {
      if (partId !== claim.creadorId && partId !== 'usr_anonimo') {
        this.create({
          userId: partId,
          tipo: 'reclamo_cancelado',
          titulo: `Reclamo #${claim.id} cancelado`,
          mensaje: `El reclamo «${claim.titulo}» al que te habías sumado fue cancelado por su creador.`,
          claimId: claim.id
        });
      }
    });
  },

  /**
   * Notificación cuando el creador solicita la reapertura de un caso resuelto
   */
  notifyReopenRequest(claim, user, motivo = '') {
    if (!claim || !user) return;
    this.create({
      userId: user.id,
      tipo: 'solicitud_reapertura',
      titulo: `Solicitud de reapertura enviada (#${claim.id})`,
      mensaje: `Registramos tu solicitud de reapertura para «${claim.titulo}». El equipo técnico inspeccionará nuevamente el sector reportado.`,
      claimId: claim.id
    });
  },

  /**
   * Notificación cuando el creador realiza una modificación relevante en el reclamo
   */
  notifyRelevantUpdate(claim, user) {
    if (!claim || !user) return;

    // Notificar a los vecinos adheridos sobre la modificación
    const participantes = Array.isArray(claim.participantes) ? claim.participantes : [];
    participantes.forEach(partId => {
      if (partId !== claim.creadorId && partId !== 'usr_anonimo') {
        this.create({
          userId: partId,
          tipo: 'modificacion_relevante',
          titulo: `Actualización de información en #${claim.id}`,
          mensaje: `Se actualizaron datos descriptivos o de ubicación en el reclamo «${claim.titulo}» que apoyás.`,
          claimId: claim.id
        });
      }
    });
  },

  _formatStateLabel(estado) {
    const map = {
      recibido: 'Recibido',
      en_revision: 'En revisión',
      en_proceso: 'En proceso',
      resuelto: 'Resuelto',
      rechazado: 'Rechazado',
      reabierto: 'Reabierto',
      cancelado: 'Cancelado'
    };
    return map[estado] || estado;
  }
};

