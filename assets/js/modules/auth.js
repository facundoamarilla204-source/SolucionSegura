/**
 * SoluciónSegura — Módulo de Autenticación Simulada
 * Sesión persistente mediante localStorage con Web Crypto API (hash con sal)
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

/**
 * Genera una sal criptográfica pseudoaleatoria en formato hexadecimal
 */
function generateSalt(length = 16) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback seguro para entornos sin getRandomValues
  let str = '';
  for (let i = 0; i < length * 2; i++) {
    str += Math.floor(Math.random() * 16).toString(16);
  }
  return str;
}

/**
 * Calcula el hash SHA-256 de una contraseña combinada con su sal
 * usando la Web Crypto API nativa del navegador
 */
async function hashPassword(password, salt) {
  const normalizedPass = (password || '').toString();
  const input = `${salt}:${normalizedPass}`;

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(input);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(digest))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (e) {
      console.warn('[Auth] Error al generar digest Web Crypto:', e);
    }
  }

  // Fallback determinístico con murmur/djb2 para contextos sin Web Crypto
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 5) + hash2) ^ char;
  }
  return (Math.abs(hash1).toString(16) + Math.abs(hash2).toString(16)).padStart(64, '0');
}

export const auth = {
  /**
   * Obtiene la lista completa de usuarios registrados en localStorage
   */
  getUsers() {
    return storage.get(storage.KEYS.USERS, []);
  },

  /**
   * Inicializa la colección de usuarios con el usuario semilla (Mariana Gómez)
   * asegurando que siempre exista una cuenta demo con credenciales conocidas
   */
  async initUsers() {
    let users = this.getUsers();
    if (!Array.isArray(users)) {
      users = [];
    }

    // Comprobar si Mariana Gómez ya está presente
    const demoExists = users.some(u => u.id === DEMO_USER.id || u.email.toLowerCase() === DEMO_USER.email.toLowerCase());
    if (!demoExists) {
      const demoSalt = '7f8a9b0c1d2e3f4a';
      const demoHash = await hashPassword('contrasena123', demoSalt);
      const seedUser = {
        id: DEMO_USER.id,
        nombre: DEMO_USER.nombre,
        email: DEMO_USER.email.toLowerCase(),
        localidadPreferida: DEMO_USER.localidadPreferida || 'san-justo',
        salt: demoSalt,
        passwordHash: demoHash,
        loginMethod: 'email',
        notificaciones: DEMO_USER.notificaciones || { app: true, email: true },
        createdAt: new Date('2026-01-15T10:00:00Z').toISOString()
      };
      users.unshift(seedUser);
      storage.set(storage.KEYS.USERS, users);
    }
    return users;
  },

  /**
   * Busca un usuario por correo electrónico normalizado
   */
  getUserByEmail(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === normalized) || null;
  },

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
  async loginWithGoogle(callbackUrl = null, autoRedirect = true) {
    await this.initUsers();
    const email = 'mariana.gomez@ejemplo.com';
    let user = this.getUserByEmail(email);

    if (!user) {
      const salt = generateSalt(16);
      const hash = await hashPassword('google_oauth_simulado', salt);
      user = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        nombre: 'Mariana Gómez (Google)',
        email: email,
        localidadPreferida: 'san-justo',
        salt,
        passwordHash: hash,
        loginMethod: 'google',
        notificaciones: { app: true, email: true },
        createdAt: new Date().toISOString()
      };
      const users = this.getUsers();
      users.push(user);
      storage.set(storage.KEYS.USERS, users);
    }

    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      localidadPreferida: user.localidadPreferida,
      loginMethod: 'google',
      notificaciones: user.notificaciones
    };
    storage.set(storage.KEYS.CURRENT_USER, sessionUser);

    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return { success: true, user: sessionUser };
  },

  /**
   * Inicio de sesión verificando email y contraseña con Web Crypto (hash + sal)
   */
  async loginWithEmail(email, password, callbackUrl = null, autoRedirect = true) {
    await this.initUsers();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPass = (password || '').toString();

    if (!normalizedEmail || !normalizedPass) {
      return { success: false, error: 'Por favor, completá todos los campos.' };
    }

    const user = this.getUserByEmail(normalizedEmail);
    if (!user) {
      return { success: false, error: 'Correo electrónico o contraseña incorrectos.' };
    }

    const calculatedHash = await hashPassword(normalizedPass, user.salt);
    if (calculatedHash !== user.passwordHash) {
      return { success: false, error: 'Correo electrónico o contraseña incorrectos.' };
    }

    // Sesión activa sin exponer hashes ni sales en CURRENT_USER
    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      localidadPreferida: user.localidadPreferida || 'san-justo',
      loginMethod: 'email',
      notificaciones: user.notificaciones || { app: true, email: true }
    };

    storage.set(storage.KEYS.CURRENT_USER, sessionUser);

    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return { success: true, user: sessionUser };
  },

  /**
   * Registro de una nueva cuenta ciudadana
   * - Comprueba que no exista otra cuenta con el mismo correo normalizado
   * - Genera sal aleatoria y calcula hash con Web Crypto API (SHA-256)
   * - NUNCA guarda la contraseña en texto plano
   * - Inicia la sesión activa automáticamente
   */
  async register(nombre, email, password, callbackUrl = null, autoRedirect = true) {
    await this.initUsers();

    const cleanName = (nombre || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').toString();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return { success: false, error: 'Todos los campos son obligatorios.' };
    }

    if (cleanPassword.length < 6) {
      return { success: false, error: 'La contraseña debe contener al menos 6 caracteres.' };
    }

    // Verificar unicidad de correo electrónico
    const existing = this.getUserByEmail(cleanEmail);
    if (existing) {
      return {
        success: false,
        field: 'email',
        error: 'Ya existe una cuenta registrada con este correo electrónico.'
      };
    }

    // Generar sal y hash criptográfico
    const salt = generateSalt(16);
    const passwordHash = await hashPassword(cleanPassword, salt);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newUserRecord = {
      id: userId,
      nombre: cleanName,
      email: cleanEmail,
      localidadPreferida: 'san-justo',
      salt,
      passwordHash,
      loginMethod: 'email',
      notificaciones: { app: true, email: true },
      createdAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(newUserRecord);
    storage.set(storage.KEYS.USERS, users);

    // Iniciar sesión activa inmediatamente
    const sessionUser = {
      id: userId,
      nombre: cleanName,
      email: cleanEmail,
      localidadPreferida: 'san-justo',
      loginMethod: 'email',
      notificaciones: { app: true, email: true }
    };
    storage.set(storage.KEYS.CURRENT_USER, sessionUser);

    if (autoRedirect) {
      this.handleRedirect(callbackUrl);
    }
    return { success: true, user: sessionUser };
  },

  /**
   * Cierra la sesión activa en el navegador
   * Solo elimina CURRENT_USER; mantiene intactas cuentas, reclamos y apoyos
   */
  logout() {
    storage.remove(storage.KEYS.CURRENT_USER);
  }
};
