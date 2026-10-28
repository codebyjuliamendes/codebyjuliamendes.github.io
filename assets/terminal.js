'use strict';

// Terminal do JúliaOS: comandos em pt e en, histórico (↑/↓) e autocompletar (Tab).
(() => {
  const win = document.getElementById('terminal');
  const form = win?.querySelector('.terminal-form');
  if (!win || !form || !document.documentElement.classList.contains('os')) return;

  const data = JSON.parse(document.getElementById('page-data').textContent);
  const T = data.play.term;
  const out = win.querySelector('.terminal-out');
  const input = form.querySelector('input');
  const history = [];
  let cursor = 0;
  form.hidden = false;
  input.dataset.autofocus = '';

  const fill = (text, vars = {}) => text.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const findProject = name => {
    const q = norm(name);
    return data.projects.find(p => p.slug === q || norm(p.name) === q) ?? data.projects.find(p => p.slug.startsWith(q));
  };

  // Toda saída é montada com textContent: nada do que se digita vira HTML.
  function line(parts, cls) {
    const row = document.createElement('p');
    if (cls) row.className = cls;
    for (const part of [].concat(parts)) {
      if (typeof part === 'string') row.append(part);
      else if (part.href) {
        const a = document.createElement('a');
        a.href = part.href;
        a.textContent = part.text;
        a.rel = 'noopener';
        a.target = '_blank';
        row.append(a);
      } else {
        const span = document.createElement('span');
        span.className = part.cls;
        span.textContent = part.text;
        row.append(span);
      }
    }
    out.append(row);
  }
  const scroll = () => (out.scrollTop = out.scrollHeight);

  const commands = {
    help: () => {
      for (const [cmd, desc] of T.help) line([{ cls: 't-cmd', text: cmd.padEnd(26) }, desc]);
    },
    about: () => line(T.about),
    projects: () => {
      for (const p of data.projects)
        line([{ cls: 't-cmd', text: p.slug.padEnd(16) }, { cls: 't-dim', text: `${p.language.padEnd(11)}` }, p.name]);
    },
    show: ([name]) => {
      if (!name) return line(fill(T.usage, { usage: T.help[3][0] }), 't-err');
      const p = findProject(name);
      if (!p) return line(fill(T.noProject, { name }), 't-err');
      line({ cls: 't-title', text: `${p.name} · ${p.language}` });
      line(p.summary);
      line([{ cls: 't-dim', text: `${T.fields.problem}: ` }, p.problem]);
      line([{ cls: 't-dim', text: `${T.fields.stack}: ` }, p.tags.join(', ')]);
      line([
        { cls: 't-dim', text: `${T.fields.repo}: ` },
        { href: p.repo, text: p.repo },
      ]);
      if (p.demo)
        line([
          { cls: 't-dim', text: `${T.fields.demo}: ` },
          { href: p.demo, text: p.demo },
        ]);
    },
    open: ([name]) => {
      if (!name) return line(fill(T.usage, { usage: T.help[4][0] }), 't-err');
      const p = findProject(name);
      if (!p) return line(fill(T.noProject, { name }), 't-err');
      line(fill(T.opening, { name: p.name }));
      window.open(p.repo, '_blank', 'noopener');
    },
    filter: ([name = '']) => {
      const q = norm(name);
      const lang =
        data.languages.find(l => l.filter === q || norm(l.name) === q) ??
        (['all', 'todos', 'todas'].includes(q) ? { filter: 'all', name: '*', count: data.projects.length } : null);
      if (!lang) return line(fill(T.noLang, { list: data.languages.map(l => l.name).join(', ') }), 't-err');
      document.querySelector(`[data-filter="${lang.filter}"]`)?.click();
      window.JuliaOS?.open('projetos', { focusContent: false });
      line(fill(T.filtered, { count: lang.count, lang: lang.name }));
    },
    stack: () => {
      for (const g of data.stack) line([{ cls: 't-cmd', text: `${g.name}: ` }, g.items.join(', ')]);
    },
    contact: () => {
      line([
        { cls: 't-dim', text: 'LinkedIn  ' },
        { href: data.site.linkedin, text: data.site.linkedin },
      ]);
      line([
        { cls: 't-dim', text: 'GitHub    ' },
        { href: data.site.github, text: data.site.github },
      ]);
    },
    theme: ([name = '']) => {
      const q = norm(name);
      const mode = T.themes.find(([alias, value]) => alias === q || value === q)?.[1];
      if (!mode) return line(fill(T.usage, { usage: T.help[8][0] }), 't-err');
      window.portfolioTheme?.set(mode);
      line(fill(T.theme, { mode: name }));
    },
    lang: () => {
      location.href = `${data.altPath}#terminal`;
    },
    play: () => {
      line(T.game);
      window.JuliaOS?.open('jogar', { focusContent: false });
      document.dispatchEvent(new CustomEvent('game:start'));
    },
    clear: () => out.replaceChildren(),
    exit: () => window.JuliaOS?.close('terminal'),
    sudo: args => {
      const what = norm(args.join(' '));
      if (/^(contratar|hire)( julia)?$/.test(what)) {
        line([T.hire.replace('LinkedIn', ''), { href: data.site.linkedin, text: 'LinkedIn' }], 't-ok');
        window.JuliaOS?.confetti();
      } else line(T.sudo, 't-err');
    },
    rm: () => line(T.rm, 't-err'),
    coffee: () => line(T.coffee),
    hello: () => line(T.hello),
  };

  // Apelidos em português e inglês para o mesmo comando.
  const aliases = {
    ajuda: 'help',
    '?': 'help',
    sobre: 'about',
    whoami: 'about',
    projetos: 'projects',
    ls: 'projects',
    ver: 'show',
    cat: 'show',
    abrir: 'open',
    filtrar: 'filter',
    contato: 'contact',
    tema: 'theme',
    idioma: 'lang',
    language: 'lang',
    jogar: 'play',
    game: 'play',
    limpar: 'clear',
    cls: 'clear',
    sair: 'exit',
    quit: 'exit',
    cafe: 'coffee',
    oi: 'hello',
    ola: 'hello',
    hi: 'hello',
  };
  const names = [...new Set([...T.help.map(([c]) => c.split(' ')[0]), ...Object.keys(commands)])];

  function run(raw) {
    const text = raw.trim();
    line([{ cls: 't-prompt', text: '~ $ ' }, text]);
    if (!text) return;
    history.push(text);
    cursor = history.length;
    const [head, ...args] = text.split(/\s+/);
    const key = norm(head);
    const fn = commands[aliases[key] ?? key];
    if (fn) fn(args);
    else line(fill(T.notFound, { cmd: head }), 't-err');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    run(input.value);
    input.value = '';
    scroll();
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      cursor = Math.max(0, Math.min(history.length, cursor + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[cursor] ?? '';
    } else if (event.key === 'Tab') {
      const [head, ...rest] = input.value.split(' ');
      const pool = rest.length ? data.projects.map(p => p.slug) : names;
      const prefix = rest.length ? norm(rest.at(-1)) : norm(head);
      const match = pool.filter(n => n.startsWith(prefix));
      if (!prefix || !match.length) return;
      event.preventDefault();
      if (match.length === 1) input.value = rest.length ? `${head} ${match[0]}` : `${match[0]} `;
      else {
        line(match.join('  '), 't-dim');
        scroll();
      }
    }
  });

  out.addEventListener('click', () => {
    if (!getSelection()?.toString()) input.focus();
  });
  win.addEventListener('window:open', () => {
    if (!out.childElementCount) {
      line(T.welcome, 't-ok');
      const pt = data.lang === 'pt';
      line([
        { cls: 't-dim', text: pt ? 'tente: ' : 'try: ' },
        { cls: 't-cmd', text: pt ? 'projetos · ver safecat · sudo contratar' : 'projects · show safecat · sudo hire' },
      ]);
    }
    setTimeout(() => input.focus({ preventScroll: true }), 30);
  });

  // "/" ou "`" abre o terminal de qualquer lugar (fora de campos de texto).
  addEventListener('keydown', event => {
    if ((event.key !== '/' && event.key !== '`') || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, [contenteditable="true"]')) return;
    event.preventDefault();
    window.JuliaOS?.open('terminal');
  });
})();
