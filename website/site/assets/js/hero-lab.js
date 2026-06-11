/*
 * HERO LAB — logique du device glimpse (directions A & B).
 * A : interactif, autoplay doux qui s'arrête au premier clic.
 * B : cinématique, auto-défilement continu + barre de progression.
 * Bento (C) et diagramme (D) sont 100% CSS.
 */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initGlimpse(root, opts) {
    opts = opts || {};
    var tabs = [].slice.call(root.querySelectorAll('.glimpse__tab'));
    var panels = [].slice.call(root.querySelectorAll('.glimpse__panel'));
    var indicator = root.querySelector('.glimpse__indicator');
    if (!tabs.length) return;

    var i = tabs.findIndex(function (t) { return t.classList.contains('is-active'); });
    if (i < 0) i = 0;
    var timer = null, stopped = false;
    if (opts.interval) root.style.setProperty('--cine-int', opts.interval + 'ms');

    function move(tab) {
      if (!indicator) return;
      indicator.style.width = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    }
    function activate(idx) {
      i = idx;
      tabs.forEach(function (t, n) { t.classList.toggle('is-active', n === idx); t.setAttribute('aria-selected', String(n === idx)); });
      var key = tabs[idx].dataset.panel;
      panels.forEach(function (p) { p.classList.toggle('is-active', p.dataset.panel === key); });
      move(tabs[idx]);
      restartProgress();
    }
    function restartProgress() {
      if (!opts.progress) return;
      root.classList.remove('is-advancing');
      void root.offsetWidth; /* reflow pour relancer l'animation CSS */
      root.classList.add('is-advancing');
    }
    function next() { activate((i + 1) % tabs.length); }
    function start() {
      if (reduce || stopped) return;
      clearInterval(timer);
      restartProgress();
      timer = setInterval(next, opts.interval || 4500);
    }

    tabs.forEach(function (tab, n) {
      tab.addEventListener('click', function () {
        activate(n);
        if (opts.stopOnClick) { stopped = true; clearInterval(timer); root.classList.remove('is-advancing'); }
        else { start(); /* recale le timer sur le clic */ }
      });
    });

    function place() { move(tabs[i]); }
    place();
    window.addEventListener('load', place);
    window.addEventListener('resize', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);

    if (opts.autoplay && !reduce) {
      /* démarre quand le device entre dans le viewport */
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { start(); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(root);
      } else { start(); }
    }
  }

  window.HeroLab = { initGlimpse: initGlimpse };
})();
