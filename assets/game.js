'use strict';

// Caça aos bugs: 20 s, joaninha dourada vale 5, acertos seguidos multiplicam (até ×5).
(() => {
  const board = document.querySelector('[data-game]');
  if (!board || !document.documentElement.classList.contains('os')) return;

  const data = JSON.parse(document.getElementById('page-data').textContent);
  const G = data.play.game;
  const canvas = board.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const startButton = board.querySelector('[data-start]');
  const result = board.querySelector('[data-result]');
  const hud = {
    score: board.querySelector('[data-score]'),
    combo: board.querySelector('[data-combo]'),
    time: board.querySelector('[data-time]'),
    best: board.querySelector('[data-best]'),
  };
  const DURATION = 20_000;
  const COMBO_WINDOW = 900;
  const palette = ['#6c4cf1', '#ff4f9a', '#19c3b1', '#ff7a3d', '#3d8bff'];
  board.hidden = false;

  let best = 0;
  try {
    best = Number(localStorage.getItem('bughunt-best')) || 0;
  } catch {
    /* recorde só na sessão */
  }
  hud.best.textContent = String(best);

  let width = 0;
  let height = 0;
  let bugs = [];
  let splats = [];
  let state = 'idle';
  let score = 0;
  let combo = 1;
  let lastHit = 0;
  let endsAt = 0;
  let nextSpawn = 0;
  let raf = 0;

  // Canvas nítido em telas de alta densidade, acompanhando o tamanho da janela.
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (state !== 'running') draw(performance.now());
  };
  new ResizeObserver(resize).observe(canvas);

  function spawn(now) {
    const golden = Math.random() < 0.12;
    const edge = Math.floor(Math.random() * 4);
    const x = edge === 0 ? -20 : edge === 1 ? width + 20 : Math.random() * width;
    const y = edge === 2 ? -20 : edge === 3 ? height + 20 : Math.random() * height;
    const angle = Math.atan2(height / 2 - y, width / 2 - x) + (Math.random() - 0.5);
    const progress = 1 - Math.max(0, endsAt - now) / DURATION;
    bugs.push({
      x,
      y,
      angle,
      speed: (golden ? 2.6 : 1.3) + progress * 1.6 + Math.random() * 0.6,
      size: golden ? 14 : 16 + Math.random() * 5,
      color: golden ? '#ffd23f' : palette[Math.floor(Math.random() * palette.length)],
      golden,
      phase: Math.random() * 10,
    });
  }

  function drawBug(b, t) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle + Math.PI / 2);
    const s = b.size;
    const wiggle = Math.sin(t / 60 + b.phase) * 0.35;
    ctx.strokeStyle = '#16121f';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) {
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * s * 0.4, i * s * 0.35);
        ctx.lineTo(side * s * 0.95, i * s * 0.45 + (i === 0 ? wiggle : -wiggle) * s * 0.4 * side);
        ctx.stroke();
      }
    }
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.ellipse(0, s * 0.1, s * 0.55, s * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.55);
    ctx.lineTo(0, s * 0.85);
    ctx.stroke();
    if (b.golden) {
      ctx.fillStyle = '#16121f';
      for (const [dx, dy] of [
        [-0.25, -0.05],
        [0.25, -0.05],
        [-0.22, 0.4],
        [0.22, 0.4],
      ]) {
        ctx.beginPath();
        ctx.arc(dx * s, dy * s, s * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = '#16121f';
    ctx.beginPath();
    ctx.arc(0, -s * 0.75, s * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    for (const sp of splats) {
      const k = Math.min(1, (now - sp.at) / 500);
      ctx.globalAlpha = 1 - k;
      ctx.fillStyle = sp.color;
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + sp.seed;
        const r = 6 + k * 22;
        ctx.beginPath();
        ctx.arc(sp.x + Math.cos(a) * r, sp.y + Math.sin(a) * r, 4 * (1 - k) + 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#16121f';
      ctx.fillText(sp.label, sp.x, sp.y - 14 - k * 22);
      ctx.globalAlpha = 1;
    }
    for (const b of bugs) drawBug(b, now);
  }

  function step(now) {
    if (state !== 'running') return;
    if (now >= nextSpawn && bugs.length < 14) {
      spawn(now);
      const progress = 1 - Math.max(0, endsAt - now) / DURATION;
      nextSpawn = now + 620 - progress * 330;
    }
    for (const b of bugs) {
      b.angle += (Math.random() - 0.5) * 0.25;
      b.x += Math.cos(b.angle) * b.speed;
      b.y += Math.sin(b.angle) * b.speed;
      // Volta para dentro quando encosta na borda.
      if (b.x < 10 || b.x > width - 10 || b.y < 10 || b.y > height - 10) {
        const target = Math.atan2(height / 2 - b.y, width / 2 - b.x);
        b.angle += (target - b.angle) * 0.2;
      }
    }
    splats = splats.filter(sp => now - sp.at < 500);
    const left = Math.max(0, endsAt - now);
    hud.time.textContent = String(Math.ceil(left / 1000));
    if (now - lastHit > COMBO_WINDOW && combo > 1) setCombo(1);
    draw(now);
    if (left <= 0) finish();
    else raf = requestAnimationFrame(step);
  }

  function setCombo(value) {
    combo = value;
    hud.combo.textContent = `×${combo}`;
  }

  function start() {
    cancelAnimationFrame(raf);
    resize();
    bugs = [];
    splats = [];
    score = 0;
    setCombo(1);
    hud.score.textContent = '0';
    result.textContent = '';
    board.classList.add('is-running');
    state = 'running';
    const now = performance.now();
    endsAt = now + DURATION;
    nextSpawn = now;
    for (let i = 0; i < 4; i++) spawn(now);
    canvas.focus?.();
    raf = requestAnimationFrame(step);
  }

  function finish() {
    state = 'over';
    cancelAnimationFrame(raf);
    board.classList.remove('is-running');
    const rank = [...G.ranks].reverse().find(([min]) => score >= min)?.[1] ?? '';
    let text = data.play.game.result.replace('{score}', String(score)).replace('{rank}', rank);
    if (score > best) {
      best = score;
      hud.best.textContent = String(best);
      try {
        localStorage.setItem('bughunt-best', String(best));
      } catch {
        /* recorde só na sessão */
      }
      if (score > 0) {
        text += ` ${G.record}`;
        window.JuliaOS?.confetti();
      }
    }
    result.textContent = text;
    startButton.textContent = G.again;
    startButton.focus({ preventScroll: true });
  }

  canvas.addEventListener('pointerdown', event => {
    if (state !== 'running') return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const reach = event.pointerType === 'touch' ? 34 : 26;
    let hit = -1;
    let bestD = Infinity;
    bugs.forEach((b, i) => {
      const d = Math.hypot(b.x - x, b.y - y);
      if (d < reach + b.size * 0.4 && d < bestD) {
        bestD = d;
        hit = i;
      }
    });
    const now = performance.now();
    if (hit < 0) {
      setCombo(1);
      return;
    }
    const [bug] = bugs.splice(hit, 1);
    setCombo(now - lastHit <= COMBO_WINDOW ? Math.min(5, combo + 1) : 1);
    lastHit = now;
    const points = (bug.golden ? 5 : 1) * combo;
    score += points;
    hud.score.textContent = String(score);
    splats.push({ x: bug.x, y: bug.y, at: now, color: bug.color, seed: Math.random() * 6, label: `+${points}` });
    navigator.vibrate?.(12);
  });

  startButton.addEventListener('click', start);
  document.addEventListener('game:start', () => setTimeout(start, 250));
  // Fechar a janela encerra a partida.
  board.closest('.window')?.addEventListener('window:close', () => {
    if (state === 'running') finish();
  });
})();
