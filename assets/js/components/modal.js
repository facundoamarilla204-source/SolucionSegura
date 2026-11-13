/**
 * SoluciónSegura — Modal Dialog Component
 * Diálogos modales accesibles con focus trap, Escape y restauración de foco (WCAG 2.2)
 */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

const activeModals = new Map();

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((node) => {
    return node.offsetParent !== null || node.getClientRects().length > 0;
  });
}

export const modal = {
  open(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;

    // Si ya estaba abierto, evitar registrar listeners duplicados
    if (activeModals.has(modalId)) {
      return;
    }

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const dialog = el.querySelector('.modal-dialog') || el;
    const focusables = getFocusableElements(dialog);
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
      dialog.focus();
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close(modalId);
        return;
      }

      if (e.key === 'Tab') {
        const currentFocusables = getFocusableElements(dialog);
        if (currentFocusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !dialog.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last || !dialog.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const onBackdropClick = (e) => {
      if (e.target === el) {
        this.close(modalId);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    el.addEventListener('click', onBackdropClick);
    activeModals.set(modalId, { previousFocus, onKeyDown, onBackdropClick });
  },

  close(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;

    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');

    const state = activeModals.get(modalId);
    if (state) {
      window.removeEventListener('keydown', state.onKeyDown);
      el.removeEventListener('click', state.onBackdropClick);
      activeModals.delete(modalId);

      if (state.previousFocus && document.contains(state.previousFocus)) {
        state.previousFocus.focus();
      }
    }

    if (activeModals.size === 0) {
      document.body.style.overflow = '';
    }
  }
};

