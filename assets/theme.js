'use strict';

// Carregado sem defer: aplica o tema antes da primeira pintura (a CSP proíbe script inline).
(() => {
  const KEY = 'theme';
  const MODES = ['auto', 'dark', 'light'];
  const svg = body =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    auto: svg('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>'),
    dark: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
    light: svg(
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    ),
  };
  const root = document.documentElement;
  // Ativa o modo "desktop" (janelas, dock); sem JS a página continua uma rolagem comum.
  root.classList.add('os');
  let mode = 'auto';
  try {
    mode = MODES.includes(localStorage.getItem(KEY)) ? localStorage.getItem(KEY) : 'auto';
  } catch {
    /* armazenamento indisponível: segue o sistema */
  }

  function apply() {
    if (mode === 'auto') root.removeAttribute('data-theme');
    else root.dataset.theme = mode;
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.innerHTML = ICONS[mode];
      button.title = mode;
    }
  }

  apply();
  // Usado pelo terminal (comando tema).
  window.portfolioTheme = {
    set(next) {
      if (!MODES.includes(next)) return false;
      mode = next;
      try {
        localStorage.setItem(KEY, mode);
      } catch {
        /* preferência só na sessão */
      }
      apply();
      return true;
    },
    get: () => mode,
  };
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
      try {
        localStorage.setItem(KEY, mode);
      } catch {
        /* preferência só na sessão */
      }
      apply();
    });
  });
})();
