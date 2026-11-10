/**
 * SoluciónSegura — Toast Notification Component
 * Mensajes no intrusivos accesibles y con soporte de acción (deshacer)
 */

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-label', 'Notificaciones del sistema');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast({ message, type = 'info', actionText = null, onAction = null, duration = 3500 }) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast--success' : ''} ${type === 'error' ? 'toast--error' : ''}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  if (actionText && typeof onAction === 'function') {
    const actionBtn = document.createElement('button');
    actionBtn.className = 'toast__action';
    actionBtn.textContent = actionText;
    actionBtn.onclick = (e) => {
      e.stopPropagation();
      onAction();
      dismissToast(toast);
    };
    toast.appendChild(actionBtn);
  }

  container.appendChild(toast);

  // Trigger animation next frame
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  const timer = setTimeout(() => {
    dismissToast(toast);
  }, duration);

  function dismissToast(el) {
    clearTimeout(timer);
    el.classList.remove('is-visible');
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 250);
  }
}

