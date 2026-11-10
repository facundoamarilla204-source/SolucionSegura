/**
 * SoluciónSegura — Modal Dialog Component
 * Diálogos modales accesibles y centrados (WCAG 2.2 y Emil Kowalski)
 */

export const modal = {
  open(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');

    // Foco en el primer elemento interactivo
    const focusable = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    // Bloquear scroll de fondo
    document.body.style.overflow = 'hidden';

    // Cerrar con Escape
    const onKey = (e) => {
      if (e.key === 'Escape') {
        this.close(modalId);
        window.removeEventListener('keydown', onKey);
      }
    };
    window.addEventListener('keydown', onKey);
  },

  close(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

