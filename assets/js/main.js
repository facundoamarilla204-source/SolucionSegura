/**
 * SoluciónSegura — Script Principal Compartido (ES Module)
 * Carga común en todas las páginas de la MPA
 */

import { claimsService } from './modules/claims.js';
import { auth } from './modules/auth.js';
import { setupNavigation } from './components/navbar.js';
import { showToast } from './components/toast.js';

// Inicializar almacenamiento y estado
claimsService.init();

export {
  claimsService,
  auth,
  setupNavigation,
  showToast
};

