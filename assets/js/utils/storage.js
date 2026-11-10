/**
 * SoluciónSegura — Storage Utility
 * Abstracción segura y reactiva para localStorage
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'solucionsegura_current_user',
  RECLAMOS: 'solucionsegura_reclamos',
  BORRADOR: 'solucionsegura_borrador',
  NOTIFICACIONES: 'solucionsegura_notificaciones',
  INITIALIZED: 'solucionsegura_initialized'
};

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`[Storage] Error al leer la clave "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Disparar evento personalizado para sincronización reactiva en la pestaña si existe dispatchEvent
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('storage:updated', { detail: { key, value } }));
      }
      return true;
    } catch (e) {
      console.error(`[Storage] Error al escribir la clave "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('storage:updated', { detail: { key, value: null } }));
      }
      return true;
    } catch (e) {
      console.warn(`[Storage] Error al eliminar la clave "${key}":`, e);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      window.dispatchEvent(new CustomEvent('storage:cleared'));
      return true;
    } catch (e) {
      console.error('[Storage] Error al limpiar almacenamiento:', e);
      return false;
    }
  },

  KEYS: STORAGE_KEYS
};

