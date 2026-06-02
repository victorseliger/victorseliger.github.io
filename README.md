# victorseliger.github.io

Landing page de carreira do **Victor Seliger** — Senior Implementation & Solutions Engineer · AI-Native Delivery.

> Página feita pra recrutador ler em **3 minutos** e sair sabendo se vale a conversa.
> Complementar ao LinkedIn, é o canal principal de conversão de recrutadores qualificados.

Repositório público de propósito — transparência é parte da mensagem.

## Stack

Vanilla por escolha. Sem framework, sem build step, sem dependência. HTML5 + CSS3 + JavaScript.

```
index.html              # esqueleto semântico das 9 seções (0–8) + footer
styles/
  tokens.css            # design system: paleta Apple HIG, tipografia, espaçamento
  main.css              # layout, topbar sticky, hero, seções, footer, responsivo
  components.css        # CTAs, accordions, cards, KPI grid, logos/foto fallback
scripts/
  content.js            # carrega content/content_lp.json (single source of truth)
  i18n.js               # render + toggle PT/EN sem reload
  accordion.js          # expansão inline dos cards (1 aberto por vez)
  scroll.js             # fade-in via IntersectionObserver + scroll depth
  analytics.js          # eventos (CTA, toggle, scroll) — inativo até plugar Plausible
  main.js               # bootstrap
content/
  content_lp.json       # TODOS os textos PT + EN (estrutura idêntica entre idiomas)
assets/
  favicon.svg
```

## Rodar local

O conteúdo é carregado via `fetch`, então é preciso servir por HTTP (abrir o arquivo
direto no navegador bloqueia o fetch):

```bash
python -m http.server 8000
# ou
npx serve .
```

Depois abra `http://localhost:8000`.

## Princípios de design (Apple HIG)

- Paleta neutra; azul `#0071E3` **apenas** em links e CTAs.
- Hierarquia por tipografia (SF Pro → Inter → Arial), sem fonte custom carregada.
- Linhas finíssimas (0.5px), bullets `▸` em cor de texto, espaço em branco generoso.
- Animação só em `transform`/`opacity`; respeita `prefers-reduced-motion`.

## ⚙️ Placeholders a preencher antes do deploy

Editáveis em [`content/content_lp.json`](content/content_lp.json):

- [ ] `_config.whatsapp_number` — número real (DDI+DDD, só dígitos). Ex.: `5511999998888`
- [ ] KPIs do bloco "Em números": `[X]` agentes, `[Y]` horas/semana, `[Z%]` redução
- [ ] `ai_section.proof_text` e `footer.credits`: trocar `[N horas]` pelo tempo real de construção
- [ ] `stack_section` IA Aplicada: `[X] agentes orquestrados`

Assets a substituir:

- [ ] `assets/photo-victor.jpg` (1080×1080 mín., quadrada) — hoje é placeholder "VS".
      Trocar `.photo-placeholder` por `<img class="about__photo">` no `index.html`.
- [ ] Logos oficiais Dattos / Itaú (opcional) — hoje os cards usam fallback text-only.

## Analytics

Snippet do Plausible está comentado no `<head>` do `index.html`. Para ativar: criar conta,
descomentar e ajustar `data-domain`. Sem isso, os eventos viram no-op silencioso.

## Deploy (GitHub Pages)

Repositório `victorseliger/victorseliger.github.io` → Settings → Pages → branch `main` /root.
Publica em `https://victorseliger.github.io`.

---

Construído com [Claude Code](https://claude.com/claude-code).
