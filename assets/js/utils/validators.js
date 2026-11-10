/**
 * SoluciónSegura — Validation Utility
 * Validaciones amigables y accesibles para formularios
 */

export const validators = {
  isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    // Validación de formato estándar plausible
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  isNonEmpty(value) {
    if (value === null || value === undefined) return false;
    return String(value).trim().length > 0;
  },

  minLength(value, min) {
    if (!value) return false;
    return String(value).trim().length >= min;
  },

  isAllowedCategory(category) {
    const allowed = ['pavimento', 'residuos', 'alumbrado'];
    return allowed.includes(category);
  }
};

