/**
 * TLS Theme — JS
 * - Nav scroll glass effect
 * - Mobile drawer
 * - Reading progress bar
 * - Article TOC active state
 * - Smooth scroll to anchors
 */

(function () {
  'use strict';

  // ─── Nav scroll glass ─────────────────────────────────────────────────────

  const nav = document.querySelector('.tls-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 16) {
        nav.classList.add('tls-nav--scrolled');
        nav.classList.remove('tls-nav--transparent');
      } else {
        nav.classList.remove('tls-nav--scrolled');
        nav.classList.add('tls-nav--transparent');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile drawer ────────────────────────────────────────────────────────

  const hamburger = document.querySelector('.tls-nav__hamburger');
  const drawer    = document.querySelector('.tls-nav__mobile-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('tls-nav__mobile-drawer--open');
      hamburger.classList.toggle('tls-nav__hamburger--open', !isOpen);
      drawer.classList.toggle('tls-nav__mobile-drawer--open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on outside tap
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && drawer.classList.contains('tls-nav__mobile-drawer--open')) {
        hamburger.classList.remove('tls-nav__hamburger--open');
        drawer.classList.remove('tls-nav__mobile-drawer--open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── Reading progress bar ─────────────────────────────────────────────────

  const progressBar = document.querySelector('.tls-reading-progress__bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ─── TOC active state ─────────────────────────────────────────────────────

  const tocLinks = document.querySelectorAll('.tls-toc__item a');
  if (tocLinks.length > 0) {
    const headings = Array.from(
      document.querySelectorAll('.tls-content h2, .tls-content h3')
    );

    const onScrollToc = () => {
      const scrollY = window.scrollY + 120;
      let activeId = headings[0]?.id ?? null;

      for (const h of headings) {
        if (h.offsetTop <= scrollY) activeId = h.id;
        else break;
      }

      tocLinks.forEach((link) => {
        const item = link.closest('.tls-toc__item');
        const isActive = link.getAttribute('href') === '#' + activeId;
        item.classList.toggle('tls-toc__item--active', isActive);
      });
    };

    window.addEventListener('scroll', onScrollToc, { passive: true });
    onScrollToc();

    // Smooth scroll
    tocLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ─── Auto-slug headings for TOC ────────────────────────────────────────────

  const contentHeadings = document.querySelectorAll('.tls-content h2, .tls-content h3');
  contentHeadings.forEach((h) => {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
  });

  // ─── Filter buttons (magazine / archive) ──────────────────────────────────

  const filterBtns = document.querySelectorAll('.tls-filter-btn[data-filter]');
  const articleCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0 && articleCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('tls-filter-btn--active'));
        btn.classList.add('tls-filter-btn--active');

        const filter = btn.dataset.filter;
        articleCards.forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ─── Smooth scroll for anchor links ───────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
