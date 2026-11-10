/**
 * SoluciónSegura — Módulo de Autenticación Simulada
 * Sesión persistente mediante localStorage sin credenciales reales ni padrón
 * Validación estricta de rutas de retorno internas para continuidad segura del flujo
 */

import { storage } from '../utils/storage.js';
import { DEMO_USER } from '../data/seed-reclamos.js';

const ALLOWED_PAGES = [
  'index.html',
  'nuevo-reclamo.html',
  'explorar.html',
  'estadisticas.html',
  'ayuda.html',
  'mis-reclamos.html',
  'perfil.html',
  'notificaciones.html',
  'detalle-reclamo.html'
];

export const auth = {
  getCurrentUser() {
    return storage.get(storage.KEYS.CURRENT_USER, null);
  },

  isLoggedIn() {
    return Boolean(this.getCurrentUser());
  },

  /**
   * Sanitiza la URL de retorno para admitir exclusivamente rutas internas
   * seguras de la aplicación y prevenir ataques de redirección abierta.
   */
  sanitizeRedirectUrl(rawUrl, fallbackUrl = null) {
    if (!rawUrl || typeof rawUrl !== 'string') return fallbackUrl;

    // Bloquear esquemas maliciosos o javascript: / data:
    if (/^\s*(javascript|data|vbscript):/i.test(rawUrl)) {
      return fallbackUrl;
    }

    try {
      const currentOrigin = window.location.origin;
      const parsed = new URL(rawUrl, window.location.href);

      // Si es un protocolo web estándar (http/https), debe coincidir el origen
      if (window.location.protocol.startsWith('http') && parsed.origin !== currentOrigin) {
        return fallbackUrl;
      }

      // Validar que el archivo de destino sea una de las páginas permitidas
      const pathname = parsed.pathname.toLowerCase();
      const filename = pathname.split('/').pop() || 'index.html';

      const isAllowed = ALLOWED_PAGES.some(allowed => filename === allowed || filename === '');
      if (!isAllowed) {
        return fallbackUrl;
      }

      return parsed.href;
    } catch (e) {
      console.warn('[Auth] URL de redirección no válida:', rawUrl);
      return fallbackUrl;
    }
  },

  /**
   * Guarda en sessionStorage la URL de destino deseada antes de autenticar
   */
  setRedirectUrl(url) {
    if (url) {
      sessionStorage.setItem('solucionsegura_redirect', url);
    }
  },

  /**
   * Obtiene la URL de redirección priorizando:
   * 1. Parámetro ?redirect= en la URL actual
   * 2. Valor guardado en sessionStorage
   */
  getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    const paramRedirect = params.get('redirect');
    if (paramRedirect) {
      return paramRedirect;
    }
    return sessionStorage.getItem('solucionsegura_redirect');
  },

  clearRedirectUrl() {
    sessionStorage.removeItem('solucionsegura_redirect');
  },

  /**
   * Devuelve la URL de destino sanitizada sin navegar inmediatamente
   */
  getTargetUrl(fallbackUrl = '../index.html') {
    const rawTarget = this.getRedirectUrl();
    const sanitized = this.sanitizeRedirectUrl(rawTarget, fallbackUrl);
    return sanitized || fallbackUrl;
  },

  /**
   * Detecta si hay una categoría pendiente en la redirección guardada
   * para brindar contexto claro al usuario («Continuar reporte de Basura», etc.)
   */
  getPendingCategory() {
    const target = this.getRedirectUrl();
    if (!target) return null;
    try {
      const parsed = new URL(target, window.location.href);
      return parsed.searchParams.get('cat');
    } catch {
      return null;
    }
  },

  /**
   * Navega hacia la URL sanitizada y limpia el almacenamiento temporal
   */
  handleRedirect(fallbackUrl = '../index.html') {
    const target = this.getTargetUrl(fallbackUrl);
    this.clearRedirectUrl();
    if (target) {
      window.location.href = target;
    }
  },

  /**
   * Simula el inicio de sesión con Google
   */
  loginWithGoogle(callbackUrl = null, autoRedirect = true) {
    const user = {
      ...DEMO_USER,
      nombre: 'Mariana Gómez (Google)',
      loginMethod: 'google'
    };
    storage.set(storage.KEYS.CURRENT_USER, user);
    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return user;
  },

  /**
   * Simula el inicio de sesión con correo y contraseña
   */
  loginWithEmail(email, password, callbackUrl = null, autoRedirect = true) {
    const user = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
      loginMethod: 'email'
    };
    storage.set(storage.KEYS.CURRENT_USER, user);
    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return user;
  },

  /**
   * Simula el registro mínimo (Nombre, Email, Clave) sin padrón ni DNI
   * NUNCA almacena contraseñas en memoria persistente
   */
  register(nombre, email, password, callbackUrl = null, autoRedirect = true) {
    const newUser = {
      id: `usr_${Date.now()}`,
      nombre: (nombre || 'Nuevo Vecino').trim(),
      email: (email || '').trim().toLowerCase(),
      localidadPreferida: 'san-justo',
      loginMethod: 'email',
      notificaciones: { app: true, email: true }
    };
    storage.set(storage.KEYS.CURRENT_USER, newUser);
    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return newUser;
  },

  /**
   * Cierra la sesión activa en el navegador
   */
  logout() {
    storage.remove(storage.KEYS.CURRENT_USER);
  }
};
