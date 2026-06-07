# DEPLOY — site v2 (GitHub Pages)

Esta pasta contém a **versão v2 oficial** do site, pronta pra publicar.

## Como usar

1. Esta pasta foi colocada **dentro** do repositório `victorseliger.github.io`
   (ex.: como uma subpasta chamada `v2/`).
2. Abra o Claude Code na raiz do repositório e cole o prompt abaixo.

## Prompt pro Claude Code

```
Dentro deste repositório existe uma subpasta `v2/` com a nova versão do site.
Quero publicá-la no GitHub Pages substituindo COMPLETAMENTE a versão atual.

Faça, com cuidado:
1. Apague todos os arquivos e pastas da RAIZ do repositório, EXCETO:
   - a pasta `.git`
   - a própria pasta `v2`
2. Mova TODO o conteúdo de dentro de `v2/` para a raiz do repositório
   (incluindo arquivos ocultos como `.nojekyll` e `.gitignore`).
3. Remova a pasta `v2/`, agora vazia.
4. Rode `git add -A` e me mostre o `git status` pra eu conferir
   (devo ver: novos `scripts/v2-*.js`, `styles/v2.css`, e os scripts antigos como `deleted`).
5. `git commit -m "site v2 oficial — substitui versão anterior"`
6. `git push origin main`
7. Confirme quando o push terminar.
```

## Conferência final

- Acesse https://victorseliger.github.io e faça hard refresh (Ctrl/Cmd + Shift + R).
- O `.nojekyll` (incluído aqui) garante o build correto no Pages.

---

Conteúdo desta pasta:

```
index.html
README.md
.nojekyll · .gitignore · LICENSE
styles/   → fonts, tokens, main, components, v2.css
scripts/  → v2-content.js, v2-app.js
assets/   → favicon, logos (itau/itau-bba/dattos/vantis), foto, fonts/
```
