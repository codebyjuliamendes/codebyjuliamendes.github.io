# codebyjuliamendes.github.io

Portfólio de **Júlia Mendes**, desenvolvedora full stack. Publicado em <https://codebyjuliamendes.github.io> (português) e <https://codebyjuliamendes.github.io/en/> (inglês).

## Como funciona

Site estático gerado por um script Node sem dependências de runtime:

- `src/content.json` é a única fonte de conteúdo: textos em pt e en, e os dados de cada projeto.
- `scripts/build.mjs` gera `dist/` com uma página por idioma (`/` e `/en/`), `404.html`, `sitemap.xml` e `robots.txt`.
- `assets/` guarda CSS, scripts, ícone, imagem de Open Graph e screenshots dos projetos (`assets/projects/<slug>-light|dark|mobile.webp`). Sem screenshot, o card mostra um placeholder.

Decisões:

- **HTML pré-renderizado** nos dois idiomas, com `canonical`, `hreflang`, Open Graph e JSON-LD (`Person`), para SEO e prévias de link.
- **Sem framework e sem JS obrigatório**: o JavaScript só alterna o tema e filtra projetos por linguagem; sem ele, todo o conteúdo continua visível.
- **CSP sem `unsafe-inline`** via `<meta>`; o tema é aplicado por `assets/theme.js` antes da primeira pintura, sem piscar.
- **Tema claro/escuro** por tokens CSS, seguindo o sistema ou a escolha salva; screenshots trocam de variante junto.
- **Acessibilidade**: skip link, um único `h1`, foco visível, `aria-pressed` nos filtros, `prefers-reduced-motion`.

## Desenvolvimento

```bash
npm install
npm run dev      # build + servidor local em http://localhost:4173
npm run check    # Prettier + build + testes (node:test)
```

Para adicionar um projeto, inclua um item em `projects` no `src/content.json` (textos em `pt` e `en`, 3 destaques cada). Use `repo` quando o nome do repositório for diferente do `slug` e `demo` para um link de demonstração. Se quiser, adicione as screenshots em `assets/projects/`. Os testes garantem que os dois idiomas têm a mesma estrutura, que todo projeto aparece com link para o repositório e que os assets referenciados existem.

## Deploy

O workflow `.github/workflows/deploy.yml` roda `npm run check` em todo push e PR e publica `dist/` no GitHub Pages a cada push na `main`. Em **Settings → Pages**, a fonte deve ser **GitHub Actions**.
