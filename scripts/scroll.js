/* ============================================================
   scroll.js — Fade-in ao scroll (IntersectionObserver) +
   scroll depth events (25/50/75/100%). Sem libs.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  LP.initReveal = function () {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  };

  LP.initNavScroll = function () {
    var topbar = document.querySelector(".topbar");
    if (!topbar) return;
    function onScroll() {
      topbar.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  LP.initScrollDepth = function () {
    var marks = [25, 50, 75, 100];
    var fired = {};
    function onScroll() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var pct = (window.scrollY / scrollable) * 100;
      marks.forEach(function (m) {
        if (!fired[m] && pct >= m) {
          fired[m] = true;
          LP.track("Scroll Depth", { percent: m });
        }
      });
      if (fired[100]) window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  };
})();
