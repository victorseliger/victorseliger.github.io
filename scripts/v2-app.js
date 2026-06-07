/* ============================================================
   v2-app.js — bind de conteúdo (PT/EN), render de listas,
   timeline, accordion, fit Sim/Não, dotnav e reveal.
   Conteúdo embutido (v2-content.js) → funciona offline e sem fetch.
   ============================================================ */
(function () {
  "use strict";
  var CONTENT = window.V2_CONTENT, CFG = window.V2_CONFIG;
  var lang = (localStorage.getItem("v2_lang") || (navigator.language || "pt").slice(0, 2).toLowerCase());
  if (lang !== "en") lang = "pt";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function get(obj, path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj); }

  /* ---------- links de contato ---------- */
  function waLink(d) {
    var msg = lang === "en" ? CFG.whatsapp_message_en : CFG.whatsapp_message_pt;
    return "https://wa.me/" + CFG.whatsapp_number + "?text=" + encodeURIComponent(msg);
  }
  function applyCtas() {
    $$("[data-cta]").forEach(function (a) {
      var t = a.getAttribute("data-cta");
      if (t === "whatsapp") a.href = waLink();
      else if (t === "linkedin" || t === "connect" || t === "inmail") a.href = CFG.linkedin_url;
      else if (t === "repo") a.href = CFG.github_repo_url;
    });
  }

  /* ---------- bind de textos simples ---------- */
  function applyBinds(d) {
    $$("[data-bind]").forEach(function (n) {
      var v = get(d, n.getAttribute("data-bind"));
      if (v != null) n.textContent = v;
    });
    $$("[data-bind-alt]").forEach(function (n) {
      var v = get(d, n.getAttribute("data-bind-alt")); if (v != null) n.setAttribute("alt", v);
    });
    $$("[data-bind-html]").forEach(function (n) {
      var v = get(d, n.getAttribute("data-bind-html")); if (v != null) n.innerHTML = v;
    });
  }

  /* ---------- hero specs (lista rotulada) ---------- */
  function renderHeroSpecs(d) {
    var host = $("#hero-specs"); if (!host) return;
    host.innerHTML = "";
    (d.hero.specs || []).forEach(function (s) {
      var dt = el("dt", "hero__spec-label", esc(s.l));
      var dd = el("dd", "hero__spec-value", esc(s.v));
      host.appendChild(dt); host.appendChild(dd);
    });
  }

  /* ---------- snapshot ---------- */
  function renderSnapshot(d) {
    var s = d.snapshot;
    var pc = $("#snap-proofs"); pc.innerHTML = "";
    s.proofs.forEach(function (p) {
      var c = el("div", "proof-card");
      c.appendChild(el("div", "proof-card__k", esc(p.k)));
      c.appendChild(el("div", "proof-card__t", esc(p.t)));
      c.appendChild(el("div", "proof-card__d", esc(p.d)));
      pc.appendChild(c);
    });
    var rc = $("#snap-roles"); rc.innerHTML = "";
    s.roles.forEach(function (r) { rc.appendChild(el("span", "role-chip", esc(r))); });
  }

  /* ---------- timeline (trajetória achatada, multi-cargo) ---------- */
  function renderRoleBlock(r, aside_label) {
    var wrap = el("div", "tl-role");
    var rhead = el("div", "tl-role__head");
    rhead.appendChild(el("span", "tl-role__title", esc(r.title)));
    if (r.period) rhead.appendChild(el("span", "tl-role__period", esc(r.period)));
    wrap.appendChild(rhead);
    if (r.manifesto) wrap.appendChild(el("p", "tl-entry__manifesto", esc(r.manifesto)));
    if (r.bullets && r.bullets.length) {
      var ul = el("ul", "tl-entry__bullets");
      r.bullets.forEach(function (b) { ul.appendChild(el("li", null, esc(b))); });
      wrap.appendChild(ul);
    }
    if (r.aside) wrap.appendChild(renderAside(r.aside, aside_label));
    if (r.stack) wrap.appendChild(el("div", "tl-entry__stack", esc(r.stack)));
    return wrap;
  }

  function renderAside(a, aside_label) {
    var aside = el("div", "tl-aside");
    aside.appendChild(el("span", "tl-aside__tag", esc(aside_label || "Projeto paralelo")));
    var head = el("div", "tl-aside__head");
    if (a.logo) {
      var lg = el("img", "tl-aside__logo"); lg.src = a.logo; lg.alt = esc(a.company);
      head.appendChild(lg);
    } else {
      head.appendChild(el("span", "tl-aside__company", esc(a.company)));
    }
    if (a.location) head.appendChild(el("span", "tl-aside__loc", esc(a.location)));
    if (a.period) head.appendChild(el("span", "tl-aside__period", esc(a.period)));
    aside.appendChild(head);
    aside.appendChild(el("div", "tl-aside__title", esc(a.title)));
    if (a.manifesto) aside.appendChild(el("p", "tl-aside__manifesto", esc(a.manifesto)));
    if (a.bullets && a.bullets.length) {
      var ul = el("ul", "tl-entry__bullets");
      a.bullets.forEach(function (b) { ul.appendChild(el("li", null, esc(b))); });
      aside.appendChild(ul);
    }
    if (a.stack) aside.appendChild(el("div", "tl-entry__stack", esc(a.stack)));
    return aside;
  }

  function renderTimeline(d) {
    var host = $("#v2-timeline"); host.innerHTML = "";
    var asideLabel = d.trajectory.aside_label;
    d.trajectory.entries.forEach(function (e) {
      var entry = el("div", "tl-entry");
      entry.style.setProperty("--brand", e.accent);
      entry.appendChild(el("span", "tl-entry__dot"));
      var head = el("div", "tl-entry__head");
      var comp = el("span", "tl-entry__company");
      if (e.variant === "bba") {
        comp.classList.add("tl-entry__company--bba");
        var bimg = el("img"); bimg.src = e.logo; bimg.alt = "Itaú BBA"; comp.appendChild(bimg);
      } else if (e.logo) {
        var img = el("img"); img.src = e.logo; img.alt = ""; comp.appendChild(img);
      }
      comp.appendChild(document.createTextNode(e.company));
      head.appendChild(comp);
      head.appendChild(el("span", "tl-entry__period", esc(e.period)));
      entry.appendChild(head);

      var roles = e.roles || [];
      if (roles.length > 1) entry.classList.add("tl-entry--multi");
      roles.forEach(function (r) { entry.appendChild(renderRoleBlock(r, asideLabel)); });

      if (e.stack) entry.appendChild(el("div", "tl-entry__stack tl-entry__stack--company", esc(e.stack)));
      host.appendChild(entry);
    });
  }

  /* ---------- IA: bullets + KPIs ---------- */
  function renderAI(d) {
    var bl = $("#ai-bullets"); bl.innerHTML = "";
    d.ai.bullets.forEach(function (b) {
      var li = el("li", "ai-bullet");
      li.innerHTML = '<span class="ai-bullet__label">' + esc(b.label) + '</span> <span class="ai-bullet__text">' + esc(b.text) + "</span>";
      bl.appendChild(li);
    });
    var kg = $("#kpi-grid"); kg.innerHTML = "";
    d.ai.kpis.forEach(function (k) {
      var box = el("div", "kpi");
      box.appendChild(el("div", "kpi__value", esc(k.value)));
      box.appendChild(el("div", "kpi__label", esc(k.label)));
      kg.appendChild(box);
    });
  }

  /* ---------- accordion genérico ---------- */
  function buildAccordion(host, items, render) {
    host.innerHTML = "";
    items.forEach(function (it, i) {
      var item = el("div", "accordion__item");
      var trig = el("button", "accordion__trigger");
      trig.type = "button";
      trig.setAttribute("aria-expanded", "false");
      trig.innerHTML = '<span class="accordion__marker">›</span>' +
        '<span class="accordion__title-wrap"><span class="accordion__title">' + esc(it.title) +
        '</span>' + (it.subtitle ? '<span class="accordion__subtitle">' + esc(it.subtitle) + "</span>" : "") + "</span>";
      var panel = el("div", "accordion__panel");
      var inner = el("div", "accordion__panel-inner");
      render(inner, it);
      panel.appendChild(inner);
      trig.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        trig.setAttribute("aria-expanded", open ? "true" : "false");
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
      });
      item.appendChild(trig); item.appendChild(panel);
      host.appendChild(item);
    });
  }

  function renderStack(d) {
    buildAccordion($("#stack-list"), d.stack.categories.map(function (c) {
      return { title: c.name, subtitle: c.tech, data: c };
    }), function (inner, it) {
      var c = it.data;
      inner.appendChild(el("p", "panel__label", lang === "en" ? "Value generated" : "Valor gerado"));
      var ul = el("ul", "panel__bullets");
      c.value.forEach(function (v) { ul.appendChild(el("li", null, esc(v))); });
      inner.appendChild(ul);
      inner.appendChild(el("div", "panel__case", esc(c.case)));
    });
  }

  function renderObjective(d) {
    buildAccordion($("#objective-list"), d.objective.vertices.map(function (v) {
      return { title: v.title, data: v };
    }), function (inner, it) {
      var v = it.data;
      inner.appendChild(el("p", "panel__label", esc(v.fit_label)));
      var f = el("ul", "panel__bullets");
      v.fit.forEach(function (x) { f.appendChild(el("li", null, esc(x))); });
      inner.appendChild(f);
      inner.appendChild(el("p", "panel__label", esc(v.app_label)));
      var a = el("ul", "panel__bullets");
      v.app.forEach(function (x) { a.appendChild(el("li", null, esc(x))); });
      inner.appendChild(a);
    });
  }

  /* ---------- skin ---------- */
  function renderSkin(d) {
    var s = d.skin;
    var qa = $("#skin-qa"); qa.innerHTML = "";
    (s.qa || []).forEach(function (x, i) {
      var item = el("div", "skin__qa-item");
      var q = el("p", "skin__q");
      q.appendChild(el("span", "skin__q-num", (i + 1) + "."));
      q.appendChild(document.createTextNode(" " + x.q));
      item.appendChild(q);
      item.appendChild(el("p", "skin__a", esc(x.a)));
      qa.appendChild(item);
    });
    var arch = $("#skin-arch"); arch.innerHTML = "";
    s.architecture.forEach(function (x) {
      var row = el("div", "skin__arch-item");
      row.appendChild(el("span", "skin__weight", esc(x.weight)));
      row.appendChild(el("p", "skin__arch-text", esc(x.text)));
      arch.appendChild(row);
    });
  }

  /* ---------- about narrative ---------- */
  var PIN_SVG = '<svg class="about__pin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';

  /* ---------- about (name, where, lead, stat ring em HTML) ---------- */
  function renderAbout(d) {
    var a = d.about;
    var set = function (id, html) { var n = $(id); if (n) n.innerHTML = html; };
    set("#about-name", a.name);
    var w = $("#about-where");
    if (w) w.innerHTML = a.where.replace("{pin}", PIN_SVG);
    set("#about-family", a.family);
    set("#about-lead", a.lead);
    set("#about-text", a.text);
    set("#about-stat-num", a.stat.num);
    set("#about-stat-lead", a.stat.lead);
    set("#about-stat-text", a.stat.text);
    set("#about-bet", a.bet);
    var m = $("#about-meta"); m.innerHTML = "";
    a.meta.forEach(function (row) {
      var r = el("div", "about__meta-row");
      r.appendChild(el("span", "about__meta-label", esc(row.l)));
      r.appendChild(el("span", "about__meta-value", esc(row.v)));
      m.appendChild(r);
    });
  }

  /* ---- anel 75%: preenche de 0 → 75% ao entrar na tela ---- */
  function wireRing() {
    var ring = $("#about-ring"); if (!ring) return;
    var fill = ring.querySelector(".ring75__fill"); if (!fill) return;
    var C = 2 * Math.PI * 52; // circunferência (r=52)
    var target = 0.75;
    fill.style.strokeDasharray = C.toFixed(2);
    fill.style.strokeDashoffset = C.toFixed(2);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function fillTo() {
      if (reduce) { fill.style.strokeDashoffset = (C * (1 - target)).toFixed(2); return; }
      var dur = 1400, t0 = null;
      function ease(x) { return 1 - Math.pow(1 - x, 3); }
      function frame(t) {
        if (t0 == null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        fill.style.strokeDashoffset = (C * (1 - target * ease(p))).toFixed(2);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) { fillTo(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { fillTo(); io.disconnect(); } });
    }, { threshold: 0.6 });
    io.observe(ring);
  }

  /* ---------- fit Sim/Não ---------- */
  var yesMsgText = "", yesMsgTimer = null;
  function typeYesMsg() {
    var elMsg = $("#fit-yes-msg"); if (!elMsg) return;
    if (yesMsgTimer) { clearInterval(yesMsgTimer); yesMsgTimer = null; }
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { elMsg.textContent = yesMsgText; return; }
    elMsg.textContent = ""; elMsg.classList.add("is-typing");
    var i = 0;
    yesMsgTimer = setInterval(function () {
      i++;
      elMsg.textContent = yesMsgText.slice(0, i);
      if (i >= yesMsgText.length) { clearInterval(yesMsgTimer); yesMsgTimer = null; elMsg.classList.remove("is-typing"); }
    }, 24);
  }
  function wireFit() {
    var yes = $("#fit-yes"), no = $("#fit-no");
    $$(".fit__btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-fit");
        $$(".fit__btn").forEach(function (x) { x.classList.toggle("is-chosen", x === b); });
        [yes, no].forEach(function (r) { r.hidden = true; r.classList.remove("is-in"); });
        var target = v === "yes" ? yes : no;
        target.hidden = false;
        if (v === "yes") typeYesMsg();
        requestAnimationFrame(function () { target.classList.add("is-in"); });
      });
    });
  }

  /* ---------- fit: pergunta com máquina de escrever ---------- */
  var fitState = { text: "", typed: false, inView: false, timer: null };
  function setFitQuestion(text) {
    fitState.text = text || "";
    var q = $("#final-q"); if (q) q.setAttribute("aria-label", fitState.text + "?");
    var typedEl = $("#fit-typed"), qmark = $("#fit-qmark"), caret = $("#fit-caret");
    if (!typedEl) return;
    if (fitState.timer) { clearInterval(fitState.timer); fitState.timer = null; }
    typedEl.textContent = "";
    if (qmark) qmark.classList.remove("is-on");
    if (caret) caret.classList.remove("is-typing");
    fitState.typed = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      typedEl.textContent = fitState.text;
      if (qmark) qmark.classList.add("is-on");
      fitState.typed = true;
      return;
    }
    if (fitState.inView) typeFit();
  }
  function typeFit() {
    if (fitState.typed) return;
    var typedEl = $("#fit-typed"), qmark = $("#fit-qmark"), caret = $("#fit-caret");
    if (!typedEl) return;
    fitState.typed = true;
    var text = fitState.text, i = 0;
    typedEl.textContent = "";
    if (qmark) qmark.classList.remove("is-on");
    if (caret) caret.classList.add("is-typing");
    fitState.timer = setInterval(function () {
      i++;
      typedEl.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(fitState.timer); fitState.timer = null;
        if (caret) caret.classList.remove("is-typing");
        if (qmark) qmark.classList.add("is-on");
      }
    }, 45);
  }
  function wireFitTyping() {
    var fit = $("#fit"); if (!fit) return;
    if (!("IntersectionObserver" in window)) { fitState.inView = true; typeFit(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { fitState.inView = true; typeFit(); } });
    }, { threshold: 0.5 });
    io.observe(fit);
  }

  /* ---------- reveal ---------- */
  function wireReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(function (n) { n.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (n) { io.observe(n); });
  }

  /* ---------- dotnav spy ---------- */
  function wireDotnav() {
    var nav = $(".dotnav");
    var items = $$(".dotnav__item");
    var map = {}; items.forEach(function (a) { map[a.getAttribute("data-spy")] = a; });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          items.forEach(function (x) { x.classList.remove("is-active"); });
          var a = map[e.target.id]; if (a) a.classList.add("is-active");
          /* esconde a barra lateral na seção Sobre (texto largo encosta nela) */
          if (nav) nav.classList.toggle("is-hidden", e.target.id === "s-about");
        }
      });
    }, { threshold: 0.5, rootMargin: "-30% 0px -55% 0px" });
    $$("section[id], .snapshot[id]").forEach(function (s) { io.observe(s); });
  }

  /* ---------- topbar scroll state ---------- */
  function wireTopbar() {
    var tb = $(".topbar");
    var on = function () { tb.classList.toggle("is-scrolled", window.scrollY > 12); };
    on(); window.addEventListener("scroll", on, { passive: true });
  }

  /* ---------- aplica idioma ---------- */
  function applyLang(l) {
    lang = l; localStorage.setItem("v2_lang", l);
    document.documentElement.setAttribute("lang", l === "en" ? "en" : "pt-BR");
    var d = CONTENT[l];
    document.title = d.meta.title;
    applyBinds(d);
    renderHeroSpecs(d); renderSnapshot(d); renderAbout(d); renderTimeline(d);
    renderAI(d); renderStack(d); renderObjective(d); renderSkin(d);
    applyCtas();
    setFitQuestion(d.final.fit_question);
    yesMsgText = d.final.yes_response || "";
    var ym = $("#fit-yes-msg"); if (ym && !$("#fit-yes").hidden) typeYesMsg(); else if (ym) ym.textContent = "";
    $$(".lang-toggle__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang-btn") === l ? "true" : "false");
    });
    // recolhe accordions abertos após troca de idioma
    $$(".accordion__item.is-open").forEach(function (i) { i.classList.remove("is-open"); });
  }

  /* ---- cronômetro: conta 0:00 → 3:00 uma vez ao entrar na tela e para ---- */
  function wireStopwatch() {
    var clock = $(".clock"); if (!clock) return;
    var prog = clock.querySelector(".clock__progress");
    var bead = clock.querySelector(".clock__bead");
    var out = clock.querySelector(".clock__readout");
    if (!prog || !bead || !out) return;
    var C = 2 * Math.PI * 40, R = 40, cx = 50, cy = 50;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function fmt(s) { var m = Math.floor(s / 60), ss = s % 60; return m + ":" + (ss < 10 ? "0" : "") + ss; }
    function setP(p) {
      out.textContent = fmt(Math.round(p * 180));
      prog.style.strokeDashoffset = (C * (1 - p)).toFixed(2);
      var ang = (-90 + p * 360) * Math.PI / 180;
      bead.setAttribute("cx", (cx + R * Math.cos(ang)).toFixed(2));
      bead.setAttribute("cy", (cy + R * Math.sin(ang)).toFixed(2));
    }
    var ran = false;
    function run() {
      if (ran) return; ran = true;
      if (reduce) { setP(1); clock.classList.add("is-done"); return; }
      var dur = 3600, t0 = null;
      function ease(x) { return 1 - Math.pow(1 - x, 3); }
      function frame(t) {
        if (t0 == null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        setP(ease(p));
        if (p < 1) requestAnimationFrame(frame);
        else clock.classList.add("is-done");
      }
      requestAnimationFrame(frame);
    }
    setP(0);
    if (!("IntersectionObserver" in window)) { run(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.5 });
    io.observe(clock);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyLang(lang);
    wireFit(); wireReveal(); wireDotnav(); wireTopbar(); wireStopwatch(); wireRing(); wireFitTyping();
    $$(".lang-toggle__btn").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang-btn")); });
    });
  });
})();
