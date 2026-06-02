/* ============================================================
   accordion.js — Expansão inline de cards. 1 aberto por vez
   dentro de cada accordion. Event delegation (sobrevive ao
   re-render do toggle PT/EN). Teclado + ARIA.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  function closeItem(item) {
    item.classList.remove("is-open");
    var trigger = item.querySelector(".accordion__trigger");
    var panel = item.querySelector(".accordion__panel");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (panel) panel.style.maxHeight = null;
  }

  function openItem(item) {
    item.classList.add("is-open");
    var trigger = item.querySelector(".accordion__trigger");
    var panel = item.querySelector(".accordion__panel");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
  }

  function handleTrigger(container, trigger) {
    var item = trigger.closest(".accordion__item");
    if (!item) return;
    var isOpen = item.classList.contains("is-open");

    // fecha todos os outros do mesmo accordion
    container.querySelectorAll(".accordion__item.is-open").forEach(function (other) {
      if (other !== item) closeItem(other);
    });

    if (isOpen) {
      closeItem(item);
    } else {
      openItem(item);
      var title = item.querySelector(".accordion__title");
      LP.track("Accordion Open", {
        section: container.getAttribute("data-accordion"),
        item: title ? title.textContent : ""
      });
    }
  }

  LP.initAccordions = function () {
    document.querySelectorAll("[data-accordion]").forEach(function (container) {
      container.addEventListener("click", function (e) {
        var trigger = e.target.closest(".accordion__trigger");
        if (trigger && container.contains(trigger)) handleTrigger(container, trigger);
      });
    });

    // Recalcula max-height de item aberto ao redimensionar (texto reflui)
    window.addEventListener("resize", function () {
      document.querySelectorAll(".accordion__item.is-open .accordion__panel").forEach(function (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  };
})();
