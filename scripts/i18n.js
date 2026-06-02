/* ============================================================
   i18n.js — Render do conteúdo + toggle PT/EN sem reload.
   Estratégia: render(lang) reconstrói tudo a partir do JSON.
   - [data-bind="a.b"] → textContent
   - listas (trajetória/stack/objetivo/kpi/ai bullets) → templates
   - CTAs → hrefs a partir de _config
   - meta (title/description) → atualizados
   ============================================================ */
(function () {
  "use strict";
  window.LP = window.LP || {};

  var STORAGE_KEY = "lp_lang";

  /* ---- util: escape pra montar innerHTML com segurança ---- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bulletList(items, cls) {
    return (
      '<ul class="' + cls + '">' +
      items.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
      "</ul>"
    );
  }

  /* ---- templates de painel ---- */
  function trajectoryPanelInner(c) {
    if (c.sub_roles) {
      return c.sub_roles
        .map(function (sr) {
          return (
            '<div class="subrole">' +
            '<p class="subrole__period">' + esc(sr.period) + "</p>" +
            '<p class="panel__role">' + esc(sr.role) + "</p>" +
            '<p class="panel__manifesto">' + esc(sr.manifesto) + "</p>" +
            bulletList(sr.bullets, "panel__bullets") +
            '<p class="panel__stack">' + esc(sr.stack) + "</p>" +
            "</div>"
          );
        })
        .join("");
    }
    return (
      '<p class="panel__role">' + esc(c.role) + "</p>" +
      '<p class="panel__manifesto">' + esc(c.manifesto) + "</p>" +
      bulletList(c.bullets, "panel__bullets") +
      '<p class="panel__stack">' + esc(c.stack) + "</p>"
    );
  }

  function stackPanelInner(cat) {
    return (
      '<p class="panel__label">' + esc(cat.value_label) + "</p>" +
      bulletList(cat.value_generated, "panel__bullets") +
      '<p class="panel__label">' + esc(cat.case_label) + "</p>" +
      '<p class="panel__case">' + esc(cat.case_text) + "</p>"
    );
  }

  function objectivePanelInner(v) {
    return (
      '<div class="objective__cols">' +
      "<div>" +
      '<p class="panel__label">' + esc(v.fit_label) + "</p>" +
      bulletList(v.fit_bullets, "panel__bullets") +
      "</div>" +
      "<div>" +
      '<p class="panel__label">' + esc(v.application_label) + "</p>" +
      bulletList(v.application_bullets, "panel__bullets") +
      "</div>" +
      "</div>"
    );
  }

  /* ---- Trajetória: tile 3D ---- */
  function trajTile(c, i) {
    return (
      '<button class="logo-tile" type="button" role="tab" data-traj-index="' + i + '" aria-selected="false">' +
      '<span class="logo-tile__inner">' +
      '<span class="logo3d" style="--accent:' + esc(c.accent || "#2f6bff") + '">' +
      '<span class="logo3d__mark">' + esc(c.mark || c.name.charAt(0)) + "</span>" +
      "</span>" +
      '<span class="logo-tile__name">' + esc(c.name) + "</span>" +
      '<span class="logo-tile__period">' + esc(c.period) + "</span>" +
      "</span>" +
      "</button>"
    );
  }

  /* HTML do painel de detalhe de uma empresa (exposto pra trajectory.js) */
  LP.trajectoryDetailHtml = function (c) {
    return (
      '<p class="traj-detail__company">' + esc(c.name) + " · " + esc(c.period) + "</p>" +
      trajectoryPanelInner(c)
    );
  };

  function accordionItem(idBase, idx, title, subtitle, panelInnerHtml) {
    var pid = idBase + "-panel-" + idx;
    var sub = subtitle
      ? '<span class="accordion__subtitle">' + esc(subtitle) + "</span>"
      : "";
    return (
      '<div class="accordion__item">' +
      '<button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="' + pid + '">' +
      '<span class="accordion__marker" aria-hidden="true">&#9656;</span>' +
      '<span class="accordion__title-wrap">' +
      '<span class="accordion__title">' + esc(title) + "</span>" +
      sub +
      "</span>" +
      "</button>" +
      '<div class="accordion__panel" id="' + pid + '" role="region">' +
      '<div class="accordion__panel-inner">' + panelInnerHtml + "</div>" +
      "</div>" +
      "</div>"
    );
  }

  /* ---- render das listas dinâmicas ---- */
  function renderLists(content) {
    var t = document.getElementById("trajectory-list");
    if (t) {
      LP._trajData = content.trajectory.companies;
      t.innerHTML =
        '<div class="logo-row" role="tablist">' +
        LP._trajData.map(trajTile).join("") +
        "</div>" +
        '<div class="traj-detail" id="traj-detail" role="region" aria-live="polite"></div>';
      // re-aplica seleção (preserva ao trocar idioma; default = 0)
      if (LP.selectTraj) LP.selectTraj(LP.trajSelected || 0);
    }

    var s = document.getElementById("stack-list");
    if (s) {
      s.innerHTML = content.stack_section.categories
        .map(function (cat, i) {
          return accordionItem("stack", i, cat.name, cat.technologies, stackPanelInner(cat));
        })
        .join("");
    }

    var o = document.getElementById("objective-list");
    if (o) {
      o.innerHTML = content.career_objective.vertices
        .map(function (v, i) {
          return accordionItem("obj", i, v.title, "", objectivePanelInner(v));
        })
        .join("");
    }

    var ab = document.getElementById("ai-bullets");
    if (ab) {
      ab.innerHTML = content.ai_section.bullets
        .map(function (b) {
          return (
            '<li class="ai-bullet">' +
            '<span class="ai-bullet__label">' + esc(b.label) + "</span> " +
            '<span class="ai-bullet__text">' + esc(b.text) + "</span>" +
            "</li>"
          );
        })
        .join("");
    }

    var kg = document.getElementById("kpi-grid");
    if (kg) {
      kg.innerHTML = content.ai_section.kpis
        .map(function (k) {
          var ph = k.placeholder ? " is-placeholder" : "";
          return (
            '<div class="kpi">' +
            '<span class="kpi__value' + ph + '">' + esc(k.value) + "</span>" +
            '<span class="kpi__label">' + esc(k.label) + "</span>" +
            "</div>"
          );
        })
        .join("");
    }
  }

  /* ---- binds estáticos via [data-bind] ---- */
  function renderBinds(content) {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var val = LP.resolve(content, el.getAttribute("data-bind"));
      if (val != null && typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-bind-aria-label]").forEach(function (el) {
      var val = LP.resolve(content, el.getAttribute("data-bind-aria-label"));
      if (val != null) el.setAttribute("aria-label", val);
    });
    document.querySelectorAll("[data-bind-alt]").forEach(function (el) {
      var val = LP.resolve(content, el.getAttribute("data-bind-alt"));
      if (val != null) el.setAttribute("alt", val);
    });
  }

  /* ---- CTAs (hrefs a partir de _config) ---- */
  function renderCtaLinks(lang) {
    var cfg = LP.config || {};
    var linkedin = cfg.linkedin_url || "#";
    var repo = cfg.github_repo_url || "#";
    var num = cfg.whatsapp_number || "";
    var msg = (lang === "en" ? cfg.whatsapp_message_en : cfg.whatsapp_message_pt) || "";
    var wa = "https://wa.me/" + num + (msg ? "?text=" + encodeURIComponent(msg) : "");

    document.querySelectorAll('[data-cta="inmail"]').forEach(function (a) { a.href = linkedin; });
    document.querySelectorAll('[data-cta="whatsapp"]').forEach(function (a) { a.href = wa; });
    document.querySelectorAll('[data-cta="repo"]').forEach(function (a) { a.href = repo; });
  }

  /* ---- meta ---- */
  function renderMeta(content) {
    if (!content.meta) return;
    if (content.meta.title) document.title = content.meta.title;
    var d = document.querySelector('meta[name="description"]');
    if (d && content.meta.description) d.setAttribute("content", content.meta.description);
  }

  /* ---- API pública ---- */
  LP.render = function (lang) {
    var content = LP.getContent(lang);
    if (!content) return;
    renderBinds(content);
    renderLists(content);
    renderCtaLinks(lang);
    renderMeta(content);
  };

  LP.setLang = function (lang) {
    if (lang !== "pt" && lang !== "en") lang = "pt";
    var html = document.documentElement;
    html.dataset.lang = lang;
    html.lang = lang === "en" ? "en" : "pt-BR";

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });

    LP.render(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    LP.currentLang = lang;
  };

  LP.getSavedLang = function () {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") return saved;
    } catch (e) {}
    // fallback: idioma do navegador
    var nav = (navigator.language || "pt").toLowerCase();
    return nav.indexOf("en") === 0 ? "en" : "pt";
  };

  /** Liga os botões de toggle. Chamado uma vez no bootstrap. */
  LP.initLangToggle = function () {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        if (lang === LP.currentLang) return;
        LP.setLang(lang);
        LP.track("Toggle Lang", { to: lang });
      });
    });
  };
})();
