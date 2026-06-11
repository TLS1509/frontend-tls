/*
 * TLS Site — couche motion & interactions
 * Vanilla JS, zéro dépendance. ~4 ko.
 *
 * - Reveal au scroll (IntersectionObserver + stagger)
 * - Compteurs animés
 * - Nav glass condensée au scroll
 * - Drawer mobile
 * - Boutons magnétiques (desktop pointer fin uniquement)
 *
 * Tout est désactivé sous prefers-reduced-motion.
 */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Reveal au scroll ─────────────────────────────────────────────── */

  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );

    // Stagger automatique : les .reveal frères dans un même parent [data-stagger]
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const step = parseInt(group.dataset.stagger, 10) || 70;
      group.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * step}ms`);
      });
    });

    revealEls.forEach((el) => io.observe(el));
  }

  /* ─── Compteurs animés ─────────────────────────────────────────────── */

  const counters = document.querySelectorAll('[data-count-to]');

  if (counters.length) {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const decimals = parseInt(el.dataset.countDecimals || '0', 10);
      const suffix = el.dataset.countSuffix || '';
      const duration = 1400;
      let start = null;

      const frame = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const value = target * easeOutCubic(p);
        el.textContent = value.toLocaleString('fr-FR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    if (reduceMotion) {
      counters.forEach((el) => {
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        el.textContent =
          parseFloat(el.dataset.countTo).toLocaleString('fr-FR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + (el.dataset.countSuffix || '');
      });
    } else {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => cio.observe(el));
    }
  }

  /* ─── Nav condensée au scroll ──────────────────────────────────────── */

  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Drawer mobile ────────────────────────────────────────────────── */

  const burger = document.querySelector('.nav__burger');
  const drawer = document.querySelector('.nav-drawer');

  if (burger && drawer) {
    const toggle = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', () => {
      toggle(burger.getAttribute('aria-expanded') !== 'true');
    });

    drawer.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => toggle(false))
    );

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) toggle(false);
    });
  }

  /* ─── Boutons magnétiques ──────────────────────────────────────────── */
  /* Pointer fin + pas de reduced motion uniquement. Amplitude 10 px max. */

  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 10;

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = 'translate(0, 0)';
        setTimeout(() => (el.style.transition = ''), 450);
      });
    });
  }

  /* ─── Glimpse Learning App ──────────────────────────────────────── */
  /* Device produit : onglets cliquables + indicateur glissant.
     Auto-défilement doux qui s'arrête au premier clic. IO-déclenché. */

  document.querySelectorAll('.glimpse').forEach((root) => {
    const tabs = Array.prototype.slice.call(root.querySelectorAll('.glimpse__tab'));
    const panels = Array.prototype.slice.call(root.querySelectorAll('.glimpse__panel'));
    const indicator = root.querySelector('.glimpse__indicator');
    if (!tabs.length) return;

    let i = tabs.findIndex((t) => t.classList.contains('is-active'));
    if (i < 0) i = 0;
    let timer = null;
    let stopped = false;

    const move = (tab) => {
      if (!indicator) return;
      indicator.style.width = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    };
    const activate = (idx) => {
      i = idx;
      tabs.forEach((t, n) => { t.classList.toggle('is-active', n === idx); t.setAttribute('aria-selected', String(n === idx)); });
      const key = tabs[idx].dataset.panel;
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === key));
      move(tabs[idx]);
    };
    const start = () => {
      if (reduceMotion || stopped) return;
      clearInterval(timer);
      timer = setInterval(() => activate((i + 1) % tabs.length), 5000);
    };

    tabs.forEach((tab, n) => tab.addEventListener('click', () => { activate(n); stopped = true; clearInterval(timer); }));

    const place = () => move(tabs[i]);
    place();
    window.addEventListener('load', place);
    window.addEventListener('resize', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);

    if (!reduceMotion && 'IntersectionObserver' in window) {
      const gio = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { start(); gio.disconnect(); } });
      }, { threshold: 0.4 });
      gio.observe(root);
    }
  });
})();
