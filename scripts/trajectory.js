/* ============================================================
   trajectory.js — Logos 3D lado a lado. Clique seleciona a
   empresa e expande os detalhes abaixo. Tilt 3D no ponteiro.
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  LP.trajSelected = 0;
  var reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resetTile(tile) {
    var inner = tile.querySelector(".logo-tile__inner");
    if (inner) inner.style.transform = "";
  }

  LP.selectTraj = function (i) {
    var container = document.querySelector("[data-trajectory]");
    if (!container || !LP._trajData || !LP._trajData[i]) return;
    LP.trajSelected = i;

    container.querySelectorAll(".logo-tile").forEach(function (t) {
      var sel = parseInt(t.getAttribute("data-traj-index"), 10) === i;
      t.setAttribute("aria-selected", sel ? "true" : "false");
      t.classList.toggle("is-selected", sel);
    });

    var detail = document.getElementById("traj-detail");
    if (detail && LP.trajectoryDetailHtml) {
      detail.innerHTML = LP.trajectoryDetailHtml(LP._trajData[i]);
    }
  };

  LP.initTrajectory = function () {
    var container = document.querySelector("[data-trajectory]");
    if (!container) return;

    container.addEventListener("click", function (e) {
      var tile = e.target.closest(".logo-tile");
      if (!tile || !container.contains(tile)) return;
      var i = parseInt(tile.getAttribute("data-traj-index"), 10);
      LP.selectTraj(i);
      LP.track("Trajectory Select", {
        company: LP._trajData[i] && LP._trajData[i].name
      });
    });

    if (reduce) return;

    container.addEventListener("pointermove", function (e) {
      var tiles = container.querySelectorAll(".logo-tile");
      tiles.forEach(resetTile);
      var tile = e.target.closest(".logo-tile");
      if (!tile) return;
      var r = tile.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      var inner = tile.querySelector(".logo-tile__inner");
      if (inner) {
        inner.style.transform =
          "rotateY(" + (px * 16).toFixed(2) + "deg) rotateX(" + (-py * 16).toFixed(2) + "deg)";
      }
    });
    container.addEventListener("pointerleave", function () {
      container.querySelectorAll(".logo-tile").forEach(resetTile);
    });
  };
})();
