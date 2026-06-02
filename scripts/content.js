/* ============================================================
   content.js — Single source of truth loader.
   Carrega content/content_lp.json e expõe namespace global LP.
   Sem framework, sem imports — script defer simples.
   ============================================================ */
(function () {
  "use strict";

  // Namespace global compartilhado entre os módulos.
  window.LP = window.LP || {};

  LP.data = null; // { pt:{...}, en:{...} }
  LP.config = null; // _config (links, whatsapp)

  /** Retorna o objeto de conteúdo do idioma atual. */
  LP.getContent = function (lang) {
    if (!LP.data) return null;
    return LP.data[lang] || LP.data.pt;
  };

  /** Resolve "a.b.c" dentro de um objeto. */
  LP.resolve = function (obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  };

  /** Carrega o JSON. Retorna Promise. */
  LP.loadContent = function () {
    return fetch("content/content_lp.json", { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (json) {
        LP.data = { pt: json.pt, en: json.en };
        LP.config = json._config || {};
        return LP.data;
      });
  };
})();
