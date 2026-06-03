/* ============================================================
   accordion.js — Expansão inline. 1 aberto por vez dentro de
   cada .accordion. Delegação no documento → funciona inclusive
   para accordions criados dinamicamente (cargos da trajetória).
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  function closeItem(item) {
    item.classList.remove("is-open");
    var t = item.querySelector(".accordion__trigger");
    var p = item.querySelector(".accordion__panel");
    if (t) t.setAttribute("aria-expanded", "false");
    if (p) p.style.maxHeight = null;
  }
  function openItem(item) {
    item.classList.add("is-open");
    var t = item.querySelector(".accordion__trigger");
    var p = item.querySelector(".accordion__panel");
    if (t) t.setAttribute("aria-expanded", "true");
    if (p) p.style.maxHeight = p.scrollHeight + "px";
  }
  LP.openAccordionItem = openItem;

  function handle(container, trigger) {
    var item = trigger.closest(".accordion__item");
    if (!item) return;
    var isOpen = item.classList.contains("is-open");
    container.querySelectorAll(".accordion__item.is-open").forEach(function (o) {
      if (o !== item) closeItem(o);
    });
    if (isOpen) {
      closeItem(item);
    } else {
      openItem(item);
      var title = item.querySelector(".accordion__title");
      if (LP.track) LP.track("Accordion Open", {
        section: container.getAttribute("data-accordion"),
        item: title ? title.textContent : ""
      });
    }
  }

  LP.initAccordions = function () {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest(".accordion__trigger");
      if (!trigger) return;
      var container = trigger.closest(".accordion");
      if (container) handle(container, trigger);
    });
    // recalcula painéis abertos ao redimensionar
    window.addEventListener("resize", function () {
      document.querySelectorAll(".accordion__item.is-open .accordion__panel").forEach(function (p) {
        p.style.maxHeight = p.scrollHeight + "px";
      });
    });
  };
})();
