/* ============================================================
   effects.js — Typewriter do nome (hero) + count-up dos KPIs.
   Chamados a partir de LP.render() (i18n) a cada idioma.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Typewriter do nome ---- */
  var typeToken = 0;
  LP.typeHero = function (name) {
    var heroEl = document.getElementById("hero-name");
    if (!heroEl) return;
    var host = heroEl.querySelector(".type-text");
    if (!host) return;
    var str = String(name || "");
    typeToken += 1;
    var my = typeToken;

    if (reduce) {
      host.textContent = str;
      heroEl.classList.add("is-typing-done");
      return;
    }
    host.textContent = "";
    heroEl.classList.remove("is-typing-done");
    var i = 0;
    (function step() {
      if (my !== typeToken) return; // cancelado por novo render
      host.textContent = str.slice(0, i);
      if (i < str.length) {
        var ch = str.charAt(i);
        i += 1;
        setTimeout(step, ch === " " ? 130 : 78);
      } else {
        heroEl.classList.add("is-typing-done");
      }
    })();
  };

  /* ---- Count-up dos KPIs ---- */
  var NUM = /^(\d+)(\D*)$/;
  var kpiIO = null;

  function animateValue(el) {
    var target = (el.getAttribute("data-target") || el.textContent).trim();
    var m = NUM.exec(target);
    if (!m) { el.textContent = target; return; }
    var end = parseInt(m[1], 10);
    var suffix = m[2] || "";
    if (reduce) { el.textContent = end + suffix; return; }
    var dur = 1100, t0 = null;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- Tilt 3D genérico ([data-tilt]) — retrato do Sobre ---- */
  LP.initTilt = function () {
    if (reduce) return;
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var inner = el.querySelector(".portrait__inner") || el;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform =
          "rotateY(" + (nx * 14).toFixed(2) + "deg) rotateX(" + (-ny * 14).toFixed(2) + "deg)";
      });
      el.addEventListener("pointerleave", function () { inner.style.transform = ""; });
    });
  };

  LP.observeKpis = function () {
    var vals = [].slice.call(document.querySelectorAll(".kpi__value"));
    if (!vals.length) return;
    vals.forEach(function (el) {
      if (!el.getAttribute("data-target")) el.setAttribute("data-target", el.textContent);
      var target = el.getAttribute("data-target").trim();
      var m = NUM.exec(target);
      el.textContent = m ? "0" + (m[2] || "") : target; // estado inicial
    });
    if (!("IntersectionObserver" in window)) { vals.forEach(animateValue); return; }
    if (kpiIO) kpiIO.disconnect();
    kpiIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateValue(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    vals.forEach(function (el) { kpiIO.observe(el); });
  };
})();
