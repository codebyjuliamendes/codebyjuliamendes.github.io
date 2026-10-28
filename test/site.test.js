import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const content = JSON.parse(readFileSync('src/content.json', 'utf8'));
const html = { pt: readFileSync('dist/index.html', 'utf8'), en: readFileSync('dist/en/index.html', 'utf8') };

// Mesmas chaves nos dois idiomas, para nenhum texto sumir em uma versão.
const shape = value =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === 'object'
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map(k => [k, shape(value[k])]),
        )
      : typeof value;

test('textos pt e en têm a mesma estrutura', () => {
  const { lang: _a, path: _b, ...pt } = content.i18n.pt;
  const { lang: _c, path: _d, ...en } = content.i18n.en;
  assert.deepEqual(shape(pt), shape(en));
  for (const project of content.projects) assert.deepEqual(shape(project.pt), shape(project.en), project.slug);
});

test('todo projeto tem dados completos e slug único', () => {
  const slugs = new Set();
  for (const p of content.projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    assert.ok(!slugs.has(p.slug), `slug duplicado: ${p.slug}`);
    slugs.add(p.slug);
    for (const lang of ['pt', 'en']) {
      assert.ok(p[lang].summary.length > 20, `${p.slug}.${lang}.summary`);
      assert.equal(p[lang].highlights.length, 3, `${p.slug}.${lang}.highlights`);
    }
    assert.ok(p.tags.length >= 3);
  }
  assert.ok(content.projects.filter(p => p.featured).length % 2 === 0, 'destaques em número par para o grid de 2 colunas');
});

test('cada página lista todos os projetos com link para o repositório', () => {
  for (const page of Object.values(html)) {
    for (const p of content.projects) assert.ok(page.includes(`${content.site.github}/${p.repo ?? p.slug}"`), p.slug);
  }
});

test('SEO: canonical, hreflang, descrição e Open Graph', () => {
  for (const [lang, page] of Object.entries(html)) {
    assert.match(page, /<link rel="canonical" href="https:\/\/codebyjuliamendes\.github\.io\//, lang);
    assert.equal((page.match(/hreflang=/g) || []).length >= 3, true, lang);
    assert.match(page, /<meta name="description" content="[^"]{80,}">/, lang);
    assert.match(page, /<meta property="og:title"/, lang);
  }
  assert.match(html.pt, /<html lang="pt-BR">/);
  assert.match(html.en, /<html lang="en">/);
});

test('acessibilidade básica: um h1, imagens com alt, skip link, CSP sem inline', () => {
  for (const page of Object.values(html)) {
    assert.equal((page.match(/<h1[\s>]/g) || []).length, 1);
    for (const img of page.match(/<img [^>]*>/g) || []) assert.match(img, /alt="/, img);
    assert.match(page, /class="skip"/);
    assert.doesNotMatch(page, /style="/);
    assert.doesNotMatch(page.match(/Content-Security-Policy" content="([^"]+)"/)[1], /unsafe-inline/);
  }
});

test('assets referenciados existem no build', () => {
  for (const page of Object.values(html)) {
    for (const [, src] of page.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) assert.ok(existsSync(`dist${src}`), src);
  }
});
