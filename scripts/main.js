/* ============================================================
   main.js — Bootstrap. Ordem: carregar conteúdo → render idioma
   salvo → ligar listeners (toggle, analytics, accordions) →
   observers de scroll.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  function boot() {
    LP.loadContent()
      .then(function () {
        var lang = LP.getSavedLang();
        LP.setLang(lang); // renderiza tudo

        LP.initLangToggle();
        LP.initAnalytics();
        LP.initAccordions();
        LP.initReveal();
        LP.initScrollDepth();
      })
      .catch(function (err) {
        console.error("[LP] Falha ao carregar conteúdo:", err);
        var main = document.querySelector("main");
        if (main) {
          main.insertAdjacentHTML(
            "afterbegin",
            '<div class="container" style="padding:2rem 0;color:#6e6e73">' +
              "Não foi possível carregar o conteúdo. Sirva a página por um servidor HTTP " +
              "(ex.: <code>python -m http.server</code>) — abrir o arquivo direto bloqueia o fetch do JSON." +
              "</div>"
          );
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
