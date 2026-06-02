/* ============================================================
   analytics.js — Wrappers de evento. INATIVO até plugar Plausible.
   Se window.plausible não existir, vira no-op silencioso.
   Eventos: CTA clicks, toggle PT/EN, scroll depth.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  /**
   * Dispara um evento custom. No-op se Plausible não estiver carregado.
   * @param {string} name  ex.: "CTA: InMail"
   * @param {object} [props] propriedades extras
   */
  LP.track = function (name, props) {
    try {
      if (typeof window.plausible === "function") {
        window.plausible(name, props ? { props: props } : undefined);
      }
      // Sem analytics ativo: silencioso. (debug opcional abaixo)
      // else console.debug("[track]", name, props || "");
    } catch (e) {
      /* nunca quebra a página por causa de tracking */
    }
  };

  /** Liga tracking de clique nos CTAs já presentes no DOM. */
  LP.initAnalytics = function () {
    document.querySelectorAll("[data-cta]").forEach(function (el) {
      el.addEventListener("click", function () {
        var kind = el.getAttribute("data-cta");
        LP.track("CTA", { type: kind, lang: document.documentElement.dataset.lang });
      });
    });
  };
})();
