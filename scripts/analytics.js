/* ============================================================
   analytics.js — Microsoft Clarity + Google Analytics 4 (GA4)
   + eventos de navegação (CTA, fit Sim/Não, idioma, scroll,
   "até onde foram" = seção alcançada).

   >>> COLE SEUS IDS AQUI <<<
   - GA4_ID:     Measurement ID do GA4   (formato "G-XXXXXXXXXX")
   - CLARITY_ID: Project ID do Clarity   (ex.: "abcd1234ef")
   Enquanto ficarem vazios, nada é carregado (sem erros).
   ============================================================ */
(function () {
  "use strict";

  var GA4_ID = "";              // ex.: "G-XXXXXXXXXX" (aguardando)
  var CLARITY_ID = "x40wqrc9ye"; // Microsoft Clarity — ativo

  var hasGA = /^G-[A-Z0-9]+$/i.test(GA4_ID);
  var hasClarity = CLARITY_ID && CLARITY_ID.length > 4;

  /* ---- GA4 (gtag) ---- */
  if (hasGA) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { anonymize_ip: true });
  }

  /* ---- Microsoft Clarity ---- */
  if (hasClarity) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  /* ---- envia um evento pros dois ---- */
  function track(name, params) {
    params = params || {};
    try { if (window.gtag) window.gtag("event", name, params); } catch (e) {}
    try {
      if (window.clarity) {
        window.clarity("event", name);
        Object.keys(params).forEach(function (k) { window.clarity("set", k, String(params[k])); });
      }
    } catch (e) {}
  }
  window.LPTrack = track; // exposto caso queira disparar manualmente

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (!hasGA && !hasClarity) return; // nada configurado → não instrumenta

    /* CTAs (LinkedIn / InMail / WhatsApp / connect / repo) */
    document.querySelectorAll("[data-cta]").forEach(function (a) {
      a.addEventListener("click", function () {
        track("cta_click", { type: a.getAttribute("data-cta"), lang: document.documentElement.lang || "pt" });
      });
    });

    /* Fit Sim/Não */
    document.querySelectorAll("[data-fit]").forEach(function (b) {
      b.addEventListener("click", function () {
        track("fit_choice", { choice: b.getAttribute("data-fit") });
      });
    });

    /* Toggle idioma */
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.addEventListener("click", function () {
        track("lang_toggle", { to: b.getAttribute("data-lang-btn") });
      });
    });

    /* Profundidade de scroll: 25 / 50 / 75 / 100 % */
    var marks = [25, 50, 75, 100], fired = {};
    function onScroll() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var pct = (window.scrollY / scrollable) * 100;
      marks.forEach(function (m) {
        if (!fired[m] && pct >= m) { fired[m] = true; track("scroll_depth", { percent: m }); }
      });
      if (fired[100]) window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    /* "Até onde foram": dispara quando cada seção entra na tela (1x cada) */
    if ("IntersectionObserver" in window) {
      var seen = {};
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.id;
            if (!seen[id]) {
              seen[id] = true;
              var label = e.target.getAttribute("data-screen-label") || id;
              track("section_view", { section: label });
            }
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll("main > section[id]").forEach(function (s) { io.observe(s); });
    }
  });
})();
