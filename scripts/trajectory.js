/* ============================================================
   trajectory.js — Logos selecionáveis. Tile cresce/encolhe; o
   painel transiciona suavemente da altura antiga p/ a nova
   (sem colapsar a zero) e, no clique, rola até o painel depois
   que o conteúdo assenta. Tilt 3D no ponteiro.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  LP.trajSelected = 0;
  var DUR = 360;
  var animToken = 0;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resetTile(tile) {
    var inner = tile.querySelector(".logo-tile__inner");
    if (inner) inner.style.transform = "";
    tile.classList.remove("is-hover");
  }

  function markSelected(container, i) {
    container.querySelectorAll(".logo-tile").forEach(function (t) {
      var sel = parseInt(t.getAttribute("data-traj-index"), 10) === i;
      t.setAttribute("aria-selected", sel ? "true" : "false");
      t.classList.toggle("is-selected", sel);
    });
  }

  function scrollToDetail(detail) {
    var bar = document.querySelector(".topbar");
    var off = (bar ? bar.offsetHeight : 60) + 16;
    var top = detail.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
  }

  LP.selectTraj = function (i, doScroll) {
    var container = document.querySelector("[data-trajectory]");
    if (!container || !LP._trajData || !LP._trajData[i]) return;
    LP.trajSelected = i;
    markSelected(container, i);

    var detail = document.getElementById("traj-detail");
    if (!detail || !LP.trajectoryDetailHtml) return;
    var html = LP.trajectoryDetailHtml(LP._trajData[i]);
    var empty = !detail.innerHTML.trim();

    if (reduce || empty) {
      detail.innerHTML = html;
      detail.style.maxHeight = "none";
      detail.style.opacity = "1";
      if (doScroll) scrollToDetail(detail);
      return;
    }

    animToken += 1;
    var my = animToken;
    var h0 = detail.offsetHeight;
    detail.style.maxHeight = h0 + "px";
    detail.style.opacity = "0";

    setTimeout(function () {
      if (my !== animToken) return;
      detail.innerHTML = html;
      detail.style.maxHeight = "none";
      var h1 = detail.offsetHeight; // altura natural do novo conteúdo
      detail.style.maxHeight = h0 + "px";
      void detail.offsetHeight; // reflow
      detail.style.maxHeight = h1 + "px"; // anima altura antiga → nova
      detail.style.opacity = "1";
      if (doScroll) scrollToDetail(detail); // página já tem altura final → scroll não trava
      setTimeout(function () {
        if (my === animToken) detail.style.maxHeight = "none";
      }, DUR);
    }, 170);
  };

  LP.initTrajectory = function () {
    var container = document.querySelector("[data-trajectory]");
    if (!container) return;

    container.addEventListener("click", function (e) {
      var tile = e.target.closest(".logo-tile");
      if (!tile || !container.contains(tile)) return;
      var i = parseInt(tile.getAttribute("data-traj-index"), 10);
      if (i === LP.trajSelected) return;
      LP.selectTraj(i, true);
      LP.track("Trajectory Select", { company: LP._trajData[i] && LP._trajData[i].name });
    });

    if (reduce) return;
    container.addEventListener("pointermove", function (e) {
      var tiles = container.querySelectorAll(".logo-tile");
      tiles.forEach(resetTile);
      var tile = e.target.closest(".logo-tile");
      if (!tile) return;
      var r = tile.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      var inner = tile.querySelector(".logo-tile__inner");
      if (inner) inner.style.transform =
        "rotateY(" + (nx * 14).toFixed(2) + "deg) rotateX(" + (-ny * 14).toFixed(2) + "deg)";
      tile.style.setProperty("--mx", (nx * 100 + 50).toFixed(1) + "%");
      tile.style.setProperty("--my", (ny * 100 + 50).toFixed(1) + "%");
      tile.classList.add("is-hover");
    });
    container.addEventListener("pointerleave", function () {
      container.querySelectorAll(".logo-tile").forEach(resetTile);
    });
  };
})();
