'use strict';

// Filtro de projetos por linguagem; sem JS, todos os cards continuam visíveis.
const chips = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.card[data-language]')];
const groups = [...document.querySelectorAll('.grid')];

for (const chip of chips) {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    for (const other of chips) other.setAttribute('aria-pressed', String(other === chip));
    for (const card of cards) card.hidden = filter !== 'all' && card.dataset.language !== filter;
    // Esconde o título do grupo quando nenhum card dele sobra.
    for (const grid of groups) {
      const title = grid.previousElementSibling;
      if (title?.classList.contains('group-title')) title.hidden = ![...grid.children].some(card => !card.hidden);
    }
  });
}
