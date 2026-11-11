/**
 * SoluciónSegura — Formatting Utility
 * Fechas relativas cotidianas y formateo de identificadores
 */

export const formatters = {
  relativeDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'Hace instantes';
    if (diffMin < 60) return `Hace ${diffMin} min`;
    if (diffHours === 1) return 'Hace 1 hora';
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  claimId(id) {
    if (!id) return '';
    return id.startsWith('LM-') ? id : `LM-${id}`;
  },

  stateLabel(estado) {
    const labels = {
      recibido: 'Recibido',
      en_revision: 'En revisión',
      en_proceso: 'En proceso',
      resuelto: 'Resuelto',
      rechazado: 'Rechazado',
      reabierto: 'Reabierto',
      cancelado: 'Cancelado'
    };
    return labels[estado] || estado;
  },

  stateBadgeClass(estado) {
    const map = {
      en_proceso: 'proceso',
      en_revision: 'revision',
      resuelto: 'resuelto',
      rechazado: 'rechazado',
      reabierto: 'reabierto',
      cancelado: 'cancelado',
      recibido: 'recibido'
    };
    return map[estado] || 'recibido';
  },

  categoryLabel(categoria) {
    const labels = {
      pavimento: 'Calles y pavimento',
      residuos: 'Basura y residuos',
      alumbrado: 'Alumbrado público'
    };
    return labels[categoria] || categoria;
  }
};

