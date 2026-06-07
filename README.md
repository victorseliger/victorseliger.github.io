# victorseliger.github.io

Landing page de carreira do **Victor Seliger** — Senior Implementation & Solutions Engineer · Applied AI Delivery.

> Página feita pra recrutador ler em **3 minutos** e sair sabendo se vale a conversa.
> Complementar ao LinkedIn, é o canal principal de conversão de recrutadores qualificados.

Repositório público de propósito — transparência é parte da mensagem.

## Stack

Vanilla por escolha. Sem framework, sem build step, sem dependência. HTML5 + CSS3 + JavaScript.
Conteúdo **embutido em JS** (sem `fetch`) → abre direto no navegador e funciona offline.

```
index.html              # estrutura semântica das seções + footer + dotnav
styles/
  fonts.css             # @font-face das fontes próprias (woff2 locais)
  tokens.css            # design system: paleta, tipografia, espaçamento, sombras
  main.css              # layout base, topbar, hero, seções, footer, responsivo
  components.css        # CTAs, accordions, cards, KPIs, logos/foto
  v2.css                # camada de refino: snapshot, timeline, cronômetro, fit Sim/Não
scripts/
  v2-content.js         # TODOS os textos PT + EN + config (single source of truth)
  v2-app.js             # bind PT/EN, render de listas, timeline, accordion,
                        # fit Sim/Não, dotnav, reveal e cronômetro
assets/
  favicon.svg
  logo-itau.svg · logo-itau-bba.png · logo-dattos.svg · logo-vantis.svg
  photo-victor-cut.webp · photo-victor.webp
  fonts/                # woff2 (Spectral + Space Grotesk subsetados)
```

## Seções

`00` Resumo · `01` Sobre · `02` Trajetória · `03` IA aplicada · `04` Stack ·
`05` Objetivo · Contato · `06` Bastidores (epílogo, depois do contato).

## Rodar local

Como o conteúdo é embutido em JS (sem `fetch`), basta abrir o `index.html` no navegador.
Para servir por HTTP (opcional):

```bash
python -m http.server 8000
# ou
npx serve .
```

## Princípios de design

- Tema escuro de marca; acento elétrico **apenas** em links, CTAs e destaques de leitura.
- Hierarquia por tipografia (Spectral display + Space Grotesk para números/labels).
- Reforço de leitura dinâmica: palavras-chave destacadas pra recrutador ler "correndo".
- Animação só em `transform`/`opacity`; tudo respeita `prefers-reduced-motion`.
- Bilíngue PT/EN com toggle sem reload.

## Editar conteúdo

Tudo vive em [`scripts/v2-content.js`](scripts/v2-content.js):

- `V2_CONFIG` — `linkedin_url`, `github_repo_url`, `whatsapp_number` (DDI+DDD, só dígitos) e mensagens.
- `V2_CONTENT.pt` / `V2_CONTENT.en` — textos das duas línguas (estrutura idêntica).

## Deploy (GitHub Pages)

Repositório `victorseliger/victorseliger.github.io` → Settings → Pages → branch `main` / root.
Publica em `https://victorseliger.github.io`. O `.nojekyll` desativa o processamento Jekyll.

---

Construído com [Claude Code](https://claude.com/claude-code).
