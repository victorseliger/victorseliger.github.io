/* ============================================================
   analytics.js — Microsoft Clarity + Google Analytics 4 (GA4)
   com banner de consentimento (LGPD): os trackers só carregam
   após o visitante clicar "Aceitar". Eventos de navegação:
   CTA, fit Sim/Não, idioma, scroll e seção alcançada.
   ============================================================ */
(function () {
  "use strict";

  var GA4_ID = "G-5ZFXND6LZF";   // Google Analytics 4
  var CLARITY_ID = "x40wqrc9ye"; // Microsoft Clarity
  var KEY = "lp_consent";        // "granted" | "denied"

  var hasGA = /^G-[A-Z0-9]+$/i.test(GA4_ID);
  var hasClarity = CLARITY_ID && CLARITY_ID.length > 4;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- carregadores ---- */
  function loadGA() {
    if (!hasGA || window.gtag) return;
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    // idioma (PT/EN) anexado a TODOS os eventos, inclusive page_view → habilita split por idioma
    try { window.gtag("set", { lang: detectLang() }); } catch (e) {}
    window.gtag("config", GA4_ID, { anonymize_ip: true });
  }
  function loadClarity() {
    if (!hasClarity || window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

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
  window.LPTrack = track;

  /* ---- instrumentação dos eventos ---- */
  var instrumented = false;
  function instrument() {
    if (instrumented) return; instrumented = true;
    ready(function () {
      document.querySelectorAll("[data-cta]").forEach(function (a) {
        a.addEventListener("click", function () {
          track("cta_click", { type: a.getAttribute("data-cta"), lang: document.documentElement.lang || "pt" });
        });
      });
      document.querySelectorAll("[data-fit]").forEach(function (b) {
        b.addEventListener("click", function () { track("fit_choice", { choice: b.getAttribute("data-fit") }); });
      });
      document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
        b.addEventListener("click", function () { track("lang_toggle", { to: b.getAttribute("data-lang-btn") }); });
      });
      var marks = [25, 50, 75, 100], fired = {};
      function onScroll() {
        var doc = document.documentElement;
        var scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        var pct = (window.scrollY / scrollable) * 100;
        marks.forEach(function (m) { if (!fired[m] && pct >= m) { fired[m] = true; track("scroll_depth", { percent: m }); } });
        if (fired[100]) window.removeEventListener("scroll", onScroll);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      if ("IntersectionObserver" in window) {
        var seen = {};
        var io = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !seen[e.target.id]) {
              seen[e.target.id] = true;
              track("section_view", { section: e.target.getAttribute("data-screen-label") || e.target.id });
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.5 });
        document.querySelectorAll("main > section[id]").forEach(function (s) { io.observe(s); });
      }
    });
  }

  function start() {
    if (!hasGA && !hasClarity) return;
    loadGA(); loadClarity(); instrument();
  }

  /* ---- consentimento (LGPD) ---- */
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  function injectStyles() {
    if (document.getElementById("lp-consent-css")) return;
    var css =
      ".lp-consent{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;z-index:120;" +
      "background:rgba(18,16,24,.93);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);" +
      "border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:15px 18px;display:flex;gap:14px;" +
      "align-items:center;flex-wrap:wrap;box-shadow:0 18px 50px rgba(0,0,0,.5);color:#f5f1ea;" +
      "font-family:var(--font-grotesk,system-ui,sans-serif);opacity:0;transform:translateY(12px);" +
      "transition:opacity .35s ease,transform .35s ease}" +
      ".lp-consent.is-in{opacity:1;transform:none}" +
      ".lp-consent__txt{font-size:.84rem;line-height:1.45;color:#cfcad6;flex:1;min-width:220px;margin:0}" +
      ".lp-consent__txt a{color:var(--accent-bright,#a48dff)}" +
      ".lp-consent__btns{display:flex;gap:10px}" +
      ".lp-consent__btn{border:0;border-radius:999px;padding:9px 17px;font-size:.82rem;font-weight:600;" +
      "cursor:pointer;font-family:inherit;transition:transform .15s ease,filter .15s ease}" +
      ".lp-consent__btn:hover{transform:translateY(-1px)}" +
      ".lp-consent__btn--ghost{background:rgba(255,255,255,.08);color:#cfcad6}" +
      ".lp-consent__btn--accent{background:linear-gradient(135deg,#7c5cff,#5b3ee0);color:#fff}" +
      "@media(max-width:520px){.lp-consent{flex-direction:column;align-items:stretch}.lp-consent__btns{justify-content:flex-end}}" +
      "@media(prefers-reduced-motion:reduce){.lp-consent{transition:none}}";
    var st = document.createElement("style");
    st.id = "lp-consent-css"; st.textContent = css;
    document.head.appendChild(st);
  }

  function detectLang() {
    // mesma lógica do app: URL > localStorage > <html> > navegador
    try { var u = new URLSearchParams(location.search).get("lang"); if (u) return u.slice(0, 2).toLowerCase() === "en" ? "en" : "pt"; } catch (e) {}
    try { var sv = localStorage.getItem("v2_lang"); if (sv) return sv === "en" ? "en" : "pt"; } catch (e) {}
    var d = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
    if (d) return d === "en" ? "en" : "pt";
    return ((navigator.language || "pt").slice(0, 2).toLowerCase() === "en") ? "en" : "pt";
  }

  function showBanner() {
    ready(function () {
      injectStyles();
      var en = detectLang() === "en";
      var txt = en
        ? 'We use analytics cookies (Google Analytics &amp; Microsoft Clarity) to understand how this page is used. Okay?'
        : 'Usamos cookies de analytics (Google Analytics e Microsoft Clarity) para entender como esta página é usada. Tudo bem?';
      var accept = en ? "Accept" : "Aceitar";
      var decline = en ? "Decline" : "Recusar";

      var bar = document.createElement("div");
      bar.className = "lp-consent";
      bar.setAttribute("role", "dialog");
      bar.setAttribute("aria-label", en ? "Cookie consent" : "Consentimento de cookies");
      bar.innerHTML =
        '<p class="lp-consent__txt">' + txt + "</p>" +
        '<div class="lp-consent__btns">' +
        '<button type="button" class="lp-consent__btn lp-consent__btn--ghost" data-consent="denied">' + decline + "</button>" +
        '<button type="button" class="lp-consent__btn lp-consent__btn--accent" data-consent="granted">' + accept + "</button>" +
        "</div>";
      document.body.appendChild(bar);
      requestAnimationFrame(function () { bar.classList.add("is-in"); });

      bar.addEventListener("click", function (e) {
        var b = e.target.closest("[data-consent]");
        if (!b) return;
        var v = b.getAttribute("data-consent");
        setConsent(v);
        bar.classList.remove("is-in");
        setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 350);
        if (v === "granted") start();
      });
    });
  }

  var consent = getConsent();
  if (consent === "granted") start();
  else if (consent === "denied") { /* não carrega nada */ }
  else showBanner();
})();
