'use strict';

// JúliaOS: gerenciador de janelas, dock, boot e efeitos. Só roda com a classe `os` (theme.js).
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('os')) return;

  const data = JSON.parse(document.getElementById('page-data').textContent);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  const finePointer = matchMedia('(pointer: fine)');
  const desktop = document.querySelector('.desktop');
  const wins = new Map([...document.querySelectorAll('.window')].map(w => [w.dataset.app, w]));
  const activeLabel = document.querySelector('[data-active-app]');

  // Posição inicial relativa à área útil e largura preferida de cada app.
  const layout = {
    sobre: { w: 660, x: 0.14, y: 0.07 },
    projetos: { w: 1040, x: 0.2, y: 0.05 },
    'como-trabalho': { w: 820, x: 0.26, y: 0.12 },
    stack: { w: 680, x: 0.34, y: 0.1 },
    jogar: { w: 760, x: 0.3, y: 0.06 },
    terminal: { w: 720, x: 0.4, y: 0.16 },
    contato: { w: 580, x: 0.46, y: 0.2 },
  };
  const placed = new Set();
  let z = 20;
  let opener = null;

  const isOpen = win => win.classList.contains('is-open');
  const focused = () => [...wins.values()].find(w => w.classList.contains('is-focused'));

  function place(id, win) {
    if (placed.has(id) || mobile.matches) return;
    const area = desktop.getBoundingClientRect();
    const g = layout[id] ?? { w: 680, x: 0.3, y: 0.1 };
    const width = Math.min(g.w, area.width - 140);
    const left = Math.max(120, Math.min(area.width * g.x, area.width - width - 24));
    const top = Math.max(12, Math.min(area.height * g.y, area.height - 260));
    win.style.width = `${width}px`;
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
    // Não deixa a janela passar por baixo do dock.
    win.style.maxHeight = `${Math.max(240, area.height - top - 96)}px`;
    placed.add(id);
  }

  function focus(id) {
    for (const [key, win] of wins) win.classList.toggle('is-focused', key === id);
    const win = wins.get(id);
    if (!win) return;
    win.style.zIndex = String(++z);
    if (activeLabel) activeLabel.textContent = win.querySelector('.win-title')?.textContent ?? '';
    syncDock();
  }

  function open(id, { focusContent = true, from = null } = {}) {
    const win = wins.get(id);
    if (!win) return;
    opener = from ?? document.activeElement;
    place(id, win);
    const wasOpen = isOpen(win) && !win.classList.contains('is-min');
    win.classList.remove('is-min', 'is-leaving');
    win.classList.add('is-open');
    if (!wasOpen && !reduce.matches) {
      win.classList.remove('is-entering');
      void win.offsetWidth; // reinicia a animação
      win.classList.add('is-entering');
    }
    focus(id);
    if (history.replaceState) history.replaceState(null, '', `#${id}`);
    if (focusContent) {
      const target = win.querySelector('[data-autofocus]') ?? win.querySelector('h1, h2');
      if (target) {
        if (!target.matches('input, button, a')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
    win.dispatchEvent(new CustomEvent('window:open', { bubbles: true }));
  }

  function hide(id, cls) {
    const win = wins.get(id);
    if (!win || !isOpen(win)) return;
    const done = () => {
      win.classList.remove('is-open', 'is-focused', 'is-leaving', 'is-max');
      if (cls === 'is-min') win.classList.add('is-min');
      const next = [...wins.values()]
        .filter(w => isOpen(w) && w !== win)
        .sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
      if (next) focus(next.dataset.app);
      else {
        if (activeLabel) activeLabel.textContent = '';
        if (history.replaceState) history.replaceState(null, '', location.pathname);
        syncDock();
      }
      win.dispatchEvent(new CustomEvent('window:close', { bubbles: true }));
    };
    if (reduce.matches) done();
    else {
      win.classList.add('is-leaving');
      setTimeout(done, 180);
    }
    if (opener && document.contains(opener) && !win.contains(opener)) opener.focus({ preventScroll: true });
  }

  const close = id => hide(id, null);
  const minimize = id => hide(id, 'is-min');
  const toggleMax = id => {
    const win = wins.get(id);
    if (win && !mobile.matches) win.classList.toggle('is-max');
  };

  function syncDock() {
    for (const item of document.querySelectorAll('.dock-item')) {
      const win = wins.get(item.dataset.openApp);
      item.classList.toggle('is-running', Boolean(win && (isOpen(win) || win.classList.contains('is-min'))));
    }
  }

  // Links e ícones abrem apps em vez de rolar a página.
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-open-app]');
    if (!link) return;
    event.preventDefault();
    if (link.classList.contains('dock-item')) {
      link.classList.remove('is-bouncing');
      void link.offsetWidth;
      if (!reduce.matches) link.classList.add('is-bouncing');
    }
    open(link.dataset.openApp, { from: link });
  });

  // Semáforo e foco ao clicar na janela.
  for (const [id, win] of wins) {
    win.addEventListener('pointerdown', () => focus(id));
    win.addEventListener('focusin', () => {
      if (!win.classList.contains('is-focused')) focus(id);
    });
    win.querySelector('.win-bar').addEventListener('click', event => {
      const action = event.target.closest('[data-win]')?.dataset.win;
      if (action === 'close') close(id);
      else if (action === 'minimize') minimize(id);
      else if (action === 'maximize') toggleMax(id);
    });
    win.querySelector('.win-bar').addEventListener('dblclick', event => {
      if (!event.target.closest('[data-win]')) toggleMax(id);
    });
    makeDraggable(win, win.querySelector('.win-bar'), () => !mobile.matches && !win.classList.contains('is-max'));
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const win = focused();
    if (win && win.contains(document.activeElement)) close(win.dataset.app);
  });

  // Arrastar com ponteiro (mouse, toque ou caneta), sempre dentro da área visível.
  function makeDraggable(el, handle, enabled) {
    let start = null;
    handle.addEventListener('pointerdown', event => {
      if (!enabled() || event.button !== 0 || event.target.closest('button, a, input')) return;
      const rect = el.getBoundingClientRect();
      const area = desktop.getBoundingClientRect();
      start = { x: event.clientX - rect.left, y: event.clientY - rect.top, area, w: rect.width };
      handle.setPointerCapture(event.pointerId);
      el.classList.add('is-dragging');
    });
    handle.addEventListener('pointermove', event => {
      if (!start) return;
      const { area } = start;
      const left = Math.min(Math.max(event.clientX - area.left - start.x, 80 - start.w), area.width - 80);
      const top = Math.min(Math.max(event.clientY - area.top - start.y, 0), area.height - 48);
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    });
    const end = () => {
      start = null;
      el.classList.remove('is-dragging');
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  // Stickers do papel de parede também podem ser arrastados.
  for (const sticker of document.querySelectorAll('.sticker')) {
    makeDraggable(sticker, sticker, () => finePointer.matches);
  }

  // Estado inicial: desktop abre o "Sobre"; celular mostra a tela inicial. O hash tem prioridade.
  function boot() {
    const first = document.querySelector('.window[data-open]');
    first?.removeAttribute('data-open');
    const fromHash = decodeURIComponent(location.hash.slice(1));
    if (!mobile.matches && first) open(first.dataset.app, { focusContent: false });
    if (wins.has(fromHash)) open(fromHash, { focusContent: false });
    syncDock();
  }
  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (wins.has(id)) open(id);
  });

  // Tela de boot curta, uma vez por sessão, pulada com clique ou tecla.
  const bootScreen = document.querySelector('[data-boot]');
  let booted = true;
  try {
    booted = sessionStorage.getItem('booted') === '1';
    sessionStorage.setItem('booted', '1');
  } catch {
    /* sem armazenamento: não mostra o boot */
  }
  if (bootScreen && !booted && !reduce.matches) {
    bootScreen.hidden = false;
    const finish = () => {
      bootScreen.classList.add('is-done');
      setTimeout(() => (bootScreen.hidden = true), 400);
      removeEventListener('keydown', finish);
    };
    bootScreen.addEventListener('click', finish);
    addEventListener('keydown', finish, { once: true });
    setTimeout(finish, 1400);
  }
  boot();

  // Relógio da barra de menus.
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat(document.documentElement.lang, {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
    const tick = () => (clock.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 15000);
  }

  // Texto rotativo do "Sobre".
  const rotate = document.querySelector('[data-rotate]');
  if (rotate && !reduce.matches) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % data.play.rotate.length;
      rotate.classList.remove('is-swapping');
      void rotate.offsetWidth;
      rotate.textContent = data.play.rotate[i];
      rotate.dataset.i = String(i % 5);
      rotate.classList.add('is-swapping');
    }, 2400);
  }

  // Paralaxe do papel de parede e inclinação dos cards com o mouse.
  if (!reduce.matches && finePointer.matches) {
    const wall = document.querySelector('.wallpaper');
    addEventListener('pointermove', event => {
      wall.style.setProperty('--px', (event.clientX / innerWidth - 0.5).toFixed(3));
      wall.style.setProperty('--py', (event.clientY / innerHeight - 0.5).toFixed(3));
    });
    for (const card of document.querySelectorAll('.card-featured')) {
      card.addEventListener('pointermove', event => {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => (card.style.transform = ''));
    }
  }

  // Cards aparecem ao rolar dentro da janela de projetos.
  const projectsBody = wins.get('projetos')?.querySelector('.win-body');
  if (projectsBody && !reduce.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { root: projectsBody, threshold: 0.12 },
    );
    for (const card of projectsBody.querySelectorAll('.card')) {
      card.classList.add('reveal');
      io.observe(card);
    }
  }

  // Confete em canvas temporário (Konami code, recorde no jogo, "sudo contratar").
  function confetti() {
    if (reduce.matches) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.append(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const colors = ['#6c4cf1', '#ff4f9a', '#ffd23f', '#2ee6a6', '#ff7a3d', '#3d8bff'];
    const bits = Array.from({ length: 180 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      s: 6 + Math.random() * 8,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
    const startedAt = performance.now();
    const frame = now => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const b of bits) {
        b.vy += 0.35;
        b.vx *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.r += b.vr;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.r);
        ctx.fillStyle = b.c;
        ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
        ctx.restore();
      }
      if (now - startedAt < 3200) requestAnimationFrame(frame);
      else canvas.remove();
    };
    requestAnimationFrame(frame);
  }

  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;
  addEventListener('keydown', event => {
    progress = event.key === konami[progress] ? progress + 1 : event.key === konami[0] ? 1 : 0;
    if (progress === konami.length) {
      progress = 0;
      confetti();
    }
  });

  window.JuliaOS = { open, close, minimize, focus, confetti, isOpen: id => Boolean(wins.get(id) && isOpen(wins.get(id))) };
})();
