# codebyjuliamendes.github.io

Portfólio de **Júlia Mendes**, desenvolvedora de IA generativa. Publicado em <https://codebyjuliamendes.github.io>.

Site estático em HTML e CSS, sem build. O design vem do arquivo do Figma "Júlia Mendes portfolio" (páginas Home, Work with me e Case Study).

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: experiência, estudos de caso, mais projetos, Jarvis, stack e contato |
| `work-with-me.html` | Serviços para freelas (construir, manter, capacitar) e processo |
| `case-entre-elas.html` | Estudo de caso do Entre Elas (3º lugar, Hackathon Equatorial) |
| `case-safecat-ai.html` | Estudo de caso do SafeCAT AI |
| `case-secretaria-ia.html` | Estudo de caso da Secretária IA |

## Idiomas

O inglês é o texto-fonte no HTML. O botão EN | PT troca para português usando o dicionário `PT` em `i18n.js`. A chave é o texto em inglês exatamente como está no HTML (sem os espaços das pontas). Ao mudar ou acrescentar um texto no HTML, acrescente a tradução com a mesma chave. Textos de `alt` e `aria-label` ficam no dicionário `ATTR`, e o título em português de cada página fica em `data-title-pt` no `<body>`.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Abra <http://localhost:8000>.

## Regras de conteúdo

- Cada afirmação sobre um projeto precisa estar no README do repositório correspondente.
- Nada do Mercado Eletrônico além da linha de experiência, e nenhum repositório privado.

## Deploy

`.github/workflows/deploy.yml` confere se todo link e arquivo local existe e publica o site no GitHub Pages a cada push na `main`. Em **Settings → Pages**, a fonte deve ser **GitHub Actions**.
