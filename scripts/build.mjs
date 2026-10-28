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

  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'none'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${escapeHtml(t.title)}</title>
  <meta name="description" content="${escapeHtml(t.description)}">
  <meta name="author" content="${escapeHtml(site.name)}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f7f6f2" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0f1115" media="(prefers-color-scheme: dark)">
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/theme.js"></script>
  <script src="/assets/app.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip" href="#main">${escapeHtml(t.nav.skip)}</a>
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="logo" href="${t.path}" aria-label="${escapeHtml(site.name)}"><img src="/assets/favicon.svg" alt="" width="32" height="32"><span>${escapeHtml(site.name)}</span></a>
      <nav aria-label="Principal">
        <ul class="nav">
          <li><a href="#projetos">${escapeHtml(t.nav.projects)}</a></li>
          <li><a href="#como-trabalho">${escapeHtml(t.nav.approach)}</a></li>
          <li><a href="#stack">${escapeHtml(t.nav.stack)}</a></li>
          <li><a href="#contato">${escapeHtml(t.nav.contact)}</a></li>
        </ul>
      </nav>
      <div class="topbar-actions">
        <a class="lang" href="${altLang.path}" hreflang="${altLang.lang}" lang="${altLang.lang}">${escapeHtml(t.nav.switch)}</a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="${escapeHtml(t.nav.theme)}"></button>
      </div>
    </div>
  </header>

  <main id="main">
    <section class="hero wrap">
      <p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p>
      <h1>${escapeHtml(t.hero.title)}</h1>
      <p class="lead">${escapeHtml(t.hero.lead)}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="#projetos">${escapeHtml(t.hero.ctaProjects)}</a>
        <a class="button" href="#contato">${escapeHtml(t.hero.ctaContact)}</a>
      </div>
      <ul class="facts">${t.hero.facts.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
    </section>

    <section class="section wrap" id="projetos" aria-labelledby="projetos-titulo">
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
      <div class="grid grid-more">${others.map(p => projectCard(p, t, { featured: false })).join('')}</div>
    </section>

    <section class="section wrap" id="como-trabalho" aria-labelledby="abordagem-titulo">
      <div class="section-head"><h2 id="abordagem-titulo">${escapeHtml(t.approach.title)}</h2></div>
      <ol class="principles">${t.approach.items
        .map((item, i) => `<li><span class="num">0${i + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></li>`)
        .join('')}</ol>
    </section>

    <section class="section wrap" id="stack" aria-labelledby="stack-titulo">
      <div class="section-head"><h2 id="stack-titulo">${escapeHtml(t.stack.title)}</h2></div>
      <div class="stack">${t.stack.groups
        .map(
          g =>
            `<div class="stack-group"><h3>${escapeHtml(g.name)}</h3><ul class="tags">${g.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul></div>`,
        )
        .join('')}</div>
    </section>

    <section class="section wrap contact" id="contato" aria-labelledby="contato-titulo">
      <h2 id="contato-titulo">${escapeHtml(t.contact.title)}</h2>
      <p>${escapeHtml(t.contact.lead)}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${site.linkedin}" rel="noopener me">${icons.linkedin}${escapeHtml(t.contact.linkedin)}</a>
        <a class="button" href="${site.github}" rel="noopener me">${icons.github}${escapeHtml(t.contact.github)}</a>
      </div>
    </section>
  </main>

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
