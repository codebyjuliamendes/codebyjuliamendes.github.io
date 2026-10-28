// Gera o site estático em dist/ a partir de src/content.json (sem dependências).
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const content = JSON.parse(readFileSync(join(root, 'src/content.json'), 'utf8'));
const { site, i18n, projects } = content;

const escapeHtml = value =>
  String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const slugify = value =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Screenshot opcional por variante; prefere WebP e cai para PNG.
function shot(slug, variant) {
  for (const ext of ['webp', 'png']) {
    const file = `assets/projects/${slug}-${variant}.${ext}`;
    if (existsSync(join(root, file))) return `/${file}`;
  }
  return null;
}

const icons = {
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/></svg>',
};

function projectCard(project, t, { featured }) {
  const copy = project[t.key];
  const light = shot(project.slug, 'light');
  const dark = shot(project.slug, 'dark');
  const alt = escapeHtml(t.projects.shotAlt.replace('{name}', project.name));
  const media = light
    ? `<div class="card-media">
        <img class="shot shot-light" src="${light}" alt="${alt}" width="1440" height="900" loading="lazy" decoding="async">
        ${dark ? `<img class="shot shot-dark" src="${dark}" alt="" width="1440" height="900" loading="lazy" decoding="async">` : ''}
      </div>`
    : `<div class="card-media card-media-empty" aria-hidden="true"><span>${escapeHtml(project.name)}</span></div>`;
  // `repo` cobre repositórios cujo nome difere do slug; `demo` é opcional.
  const repo = `${site.github}/${project.repo ?? project.slug}`;
  const demo = project.demo
    ? `<a class="card-link" href="${escapeHtml(project.demo)}" rel="noopener">${escapeHtml(t.projects.demo)} <span class="sr-only">${escapeHtml(project.name)}</span>${icons.arrow}</a>`
    : '';

  return `<article class="card${featured ? ' card-featured' : ''}" data-language="${escapeHtml(slugify(project.language))}">
    ${featured ? media : ''}
    <div class="card-body">
      <div class="card-head">
        <h3>${escapeHtml(project.name)}</h3>
        <span class="badge">${escapeHtml(project.language)}</span>
      </div>
      <p class="card-summary">${escapeHtml(copy.summary)}</p>
      ${
        featured
          ? `<dl class="card-detail">
        <dt>${escapeHtml(t.projects.problem)}</dt><dd>${escapeHtml(copy.problem)}</dd>
        <dt>${escapeHtml(t.projects.highlights)}</dt>
        <dd><ul>${copy.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></dd>
      </dl>`
          : `<ul class="card-points">${copy.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      }
      <ul class="tags" aria-label="Stack">${project.tags.map(tag => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
      <div class="card-links">
        <a class="card-link" href="${repo}" rel="noopener">${escapeHtml(t.projects.repo)} <span class="sr-only">${escapeHtml(project.name)}</span>${icons.arrow}</a>
        ${demo}
      </div>
    </div>
  </article>`;
}

// JSON embutido em <script>: escapa '<' para nenhum texto fechar a tag.
const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c');

// Dados que os scripts interativos (terminal, constelação) leem da página.
function pageData(t, altLang) {
  const languages = [...new Set(projects.map(p => p.language))];
  return {
    lang: t.key,
    altPath: altLang.path,
    site,
    play: t.play,
    stack: t.stack.groups,
    languages: languages.map(name => ({
      name,
      filter: slugify(name),
      count: projects.filter(p => p.language === name).length,
    })),
    projects: projects.map(p => ({
      slug: p.slug,
      name: p.name,
      language: p.language,
      filter: slugify(p.language),
      tags: p.tags,
      summary: p[t.key].summary,
      problem: p[t.key].problem,
      repo: `${site.github}/${p.repo ?? p.slug}`,
      demo: p.demo ?? null,
    })),
  };
}

// Ícones dos apps: glifo branco sobre o "squircle" colorido definido no CSS.
const appGlyphs = {
  sobre: '<circle cx="12" cy="9" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  projetos: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/>',
  'como-trabalho': '<path d="m4 12 5 5L20 6"/>',
  stack: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  jogar: '<ellipse cx="12" cy="14" rx="5" ry="6"/><path d="M12 8V20M9 4l1.5 2.5M15 4l-1.5 2.5M7 11H3M7 15H3M17 11h4M17 15h4"/>',
  terminal: '<path d="m5 8 4 4-4 4M12 17h7"/>',
  contato: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
};
const appIcon = id =>
  `<span class="app-icon app-${id}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${appGlyphs[id]}</svg></span>`;

// Janela: no modo desktop vira janela arrastável; sem JS é uma seção comum da página.
function win(t, id, body, { open = false } = {}) {
  const [, , file] = t.os.apps_list.find(([key]) => key === id);
  return `<section class="window" id="${id}" data-app="${id}" aria-labelledby="${id}-titulo"${open ? ' data-open' : ''}>
      <header class="win-bar">
        <span class="win-lights">
          <button type="button" class="light light-close" data-win="close" aria-label="${escapeHtml(t.os.close)}"></button>
          <button type="button" class="light light-min" data-win="minimize" aria-label="${escapeHtml(t.os.minimize)}"></button>
          <button type="button" class="light light-max" data-win="maximize" aria-label="${escapeHtml(t.os.maximize)}"></button>
        </span>
        <span class="win-title">${escapeHtml(file)}</span>
      </header>
      <div class="win-body">${body}</div>
    </section>`;
}

function page(t, altLang) {
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  const languages = [...new Set(projects.map(p => p.language))];
  const canonical = `${site.url}${t.path}`;
  const altUrl = `${site.url}${altLang.path}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: t.hero.eyebrow,
    url: canonical,
    sameAs: [site.github, site.linkedin],
  };
  const appLinks = cls =>
    t.os.apps_list
      .map(
        ([id, label]) =>
          `<li><a class="${cls}" href="#${id}" data-open-app="${id}">${appIcon(id)}<span class="app-label">${escapeHtml(label)}</span></a></li>`,
      )
      .join('');

  const about = `
        <p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p>
        <h1 id="sobre-titulo">${escapeHtml(t.hero.title)}</h1>
        <p class="lead">${escapeHtml(t.hero.lead)}</p>
        <p class="rotator">${escapeHtml(t.play.rotateLabel)} <span class="rotate" data-rotate>${escapeHtml(t.play.rotate[0])}</span></p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projetos" data-open-app="projetos">${escapeHtml(t.hero.ctaProjects)}</a>
          <a class="button" href="#contato" data-open-app="contato">${escapeHtml(t.hero.ctaContact)}</a>
        </div>
        <ul class="facts">${t.hero.facts.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`;

  const work = `
        <div class="section-head">
          <h2 id="projetos-titulo">${escapeHtml(t.projects.title)}</h2>
          <p>${escapeHtml(t.projects.lead)}</p>
        </div>
        <div class="filters" role="group" aria-label="${escapeHtml(t.projects.title)}">
          <button type="button" class="chip" data-filter="all" aria-pressed="true">${escapeHtml(t.projects.filterAll)}</button>
          ${languages.map(l => `<button type="button" class="chip" data-filter="${escapeHtml(slugify(l))}" aria-pressed="false">${escapeHtml(l)}</button>`).join('')}
        </div>
        <h3 class="group-title">${escapeHtml(t.projects.featured)}</h3>
        <div class="grid grid-featured">${featured.map(p => projectCard(p, t, { featured: true })).join('')}</div>
        <h3 class="group-title">${escapeHtml(t.projects.more)}</h3>
        <div class="grid grid-more">${others.map(p => projectCard(p, t, { featured: false })).join('')}</div>`;

  const approach = `
        <div class="section-head"><h2 id="como-trabalho-titulo">${escapeHtml(t.approach.title)}</h2></div>
        <ol class="principles">${t.approach.items
          .map((item, i) => `<li><span class="num">0${i + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></li>`)
          .join('')}</ol>`;

  const stack = `
        <div class="section-head"><h2 id="stack-titulo">${escapeHtml(t.stack.title)}</h2></div>
        <div class="stack">${t.stack.groups
          .map(
            g =>
              `<div class="stack-group"><h3>${escapeHtml(g.name)}</h3><ul class="tags">${g.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul></div>`,
          )
          .join('')}</div>`;

  const game = `
        <div class="section-head">
          <h2 id="jogar-titulo">${escapeHtml(t.play.game.title)}</h2>
          <p>${escapeHtml(t.play.game.lead)}</p>
        </div>
        <div class="game-board" data-game hidden>
          <div class="game-hud" aria-hidden="true">
            <span>${escapeHtml(t.play.game.score)} <strong data-score>0</strong></span>
            <span>${escapeHtml(t.play.game.combo)} <strong data-combo>×1</strong></span>
            <span>${escapeHtml(t.play.game.time)} <strong data-time>20</strong></span>
            <span>${escapeHtml(t.play.game.best)} <strong data-best>0</strong></span>
          </div>
          <canvas class="game-canvas" role="img" aria-label="${escapeHtml(t.play.game.canvas)}"></canvas>
          <div class="game-overlay">
            <p class="game-result" data-result role="status" aria-live="polite"></p>
            <button class="button button-primary" type="button" data-start>${escapeHtml(t.play.game.start)}</button>
          </div>
        </div>`;

  const terminal = `
        <h2 class="sr-only" id="terminal-titulo">Terminal</h2>
        <div class="terminal-out" role="log" aria-live="polite"></div>
        <form class="terminal-form" novalidate hidden>
          <label class="terminal-prompt" for="terminal-input">~ $</label>
          <input id="terminal-input" name="cmd" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${escapeHtml(t.play.terminalInput)}">
        </form>
        <noscript><p>${escapeHtml(t.play.term.welcome)}</p></noscript>`;

  const contact = `
        <h2 id="contato-titulo">${escapeHtml(t.contact.title)}</h2>
        <p>${escapeHtml(t.contact.lead)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="${site.linkedin}" rel="noopener me">${icons.linkedin}${escapeHtml(t.contact.linkedin)}</a>
          <a class="button" href="${site.github}" rel="noopener me">${icons.github}${escapeHtml(t.contact.github)}</a>
        </div>`;

  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'none'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${escapeHtml(t.title)}</title>
  <meta name="description" content="${escapeHtml(t.description)}">
  <meta name="author" content="${escapeHtml(site.name)}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#fff4e6" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#120f1f" media="(prefers-color-scheme: dark)">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="${t.lang}" href="${canonical}">
  <link rel="alternate" hreflang="${altLang.lang}" href="${altUrl}">
  <link rel="alternate" hreflang="x-default" href="${site.url}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(t.title)}">
  <meta property="og:description" content="${escapeHtml(t.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/assets/og.png">
  <meta property="og:locale" content="${t.lang.replace('-', '_')}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/theme.js"></script>
  <script src="/assets/app.js" defer></script>
  <script src="/assets/os.js" defer></script>
  <script src="/assets/terminal.js" defer></script>
  <script src="/assets/game.js" defer></script>
  <script type="application/ld+json">${safeJson(jsonLd)}</script>
  <script type="application/json" id="page-data">${safeJson(pageData(t, altLang))}</script>
</head>
<body>
  <a class="skip" href="#main">${escapeHtml(t.nav.skip)}</a>
  <div class="boot" data-boot hidden>
    <img src="/assets/favicon.svg" alt="" width="72" height="72">
    <p>${escapeHtml(t.os.boot)}</p>
    <span class="boot-bar" aria-hidden="true"><span></span></span>
    <small>${escapeHtml(t.os.bootSkip)}</small>
  </div>

  <header class="menubar">
    <div class="menubar-inner">
      <a class="logo" href="${t.path}" aria-label="${escapeHtml(site.name)}"><img src="/assets/favicon.svg" alt="" width="26" height="26"><span class="logo-name">${escapeHtml(site.name)}</span><span class="logo-os">${escapeHtml(t.os.name)}</span></a>
      <span class="menubar-app" data-active-app aria-hidden="true"></span>
      <nav aria-label="Principal">
        <ul class="nav">
          <li><a href="#projetos" data-open-app="projetos">${escapeHtml(t.nav.projects)}</a></li>
          <li><a href="#como-trabalho" data-open-app="como-trabalho">${escapeHtml(t.nav.approach)}</a></li>
          <li><a href="#stack" data-open-app="stack">${escapeHtml(t.nav.stack)}</a></li>
          <li><a href="#jogar" data-open-app="jogar">${escapeHtml(t.nav.play)}</a></li>
          <li><a href="#contato" data-open-app="contato">${escapeHtml(t.nav.contact)}</a></li>
        </ul>
      </nav>
      <div class="menubar-actions">
        <a class="lang" href="${altLang.path}" hreflang="${altLang.lang}" lang="${altLang.lang}">${escapeHtml(t.nav.switch)}</a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="${escapeHtml(t.nav.theme)}"></button>
        <time class="clock" data-clock aria-hidden="true"></time>
      </div>
    </div>
  </header>

  <main id="main" class="desktop" aria-label="${escapeHtml(t.os.desktop)}">
    <div class="wallpaper" aria-hidden="true">
      <span class="blob blob-1"></span><span class="blob blob-2"></span><span class="blob blob-3"></span><span class="blob blob-4"></span>
      ${t.os.stickers.map((s, i) => `<span class="sticker sticker-${i + 1}">${escapeHtml(s)}</span>`).join('')}
    </div>
    <a class="widget" href="#sobre" data-open-app="sobre">
      <span class="widget-eyebrow">${escapeHtml(t.hero.eyebrow)}</span>
      <strong>${escapeHtml(site.name)}</strong>
      <span class="widget-facts">${t.hero.facts.map(escapeHtml).join(' · ')}</span>
    </a>
    <nav class="desk-icons" aria-label="${escapeHtml(t.os.apps)}"><ul>${appLinks('desk-icon')}</ul></nav>

    ${win(t, 'sobre', about, { open: true })}
    ${win(t, 'projetos', work)}
    ${win(t, 'como-trabalho', approach)}
    ${win(t, 'stack', stack)}
    ${win(t, 'jogar', game)}
    ${win(t, 'terminal', terminal)}
    ${win(t, 'contato', contact)}
  </main>

  <nav class="dock" aria-label="${escapeHtml(t.os.dock)}"><ul>${appLinks('dock-item')}</ul></nav>

  <footer class="footer">
    <div class="wrap footer-inner">
      <span>© ${new Date().getFullYear()} ${escapeHtml(site.name)}</span>
      <span>${escapeHtml(t.footer)}</span>
    </div>
  </footer>
</body>
</html>
`;
}

const write = (file, data) => {
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), data);
};

rmSync(dist, { recursive: true, force: true });
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
const pt = { ...i18n.pt, key: 'pt' };
const en = { ...i18n.en, key: 'en' };
write('index.html', page(pt, en));
write('en/index.html', page(en, pt));
write('404.html', page(pt, en).replace('<main id="main">', '<main id="main" data-not-found>'));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[pt, en]
    .map(t => `  <url><loc>${site.url}${t.path}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
write('.nojekyll', '');
console.log(`dist/ gerado: ${projects.length} projetos, 2 idiomas`);
