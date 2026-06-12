/* ==========================================================================
   TLS DESIGN SYSTEM — site engine
   ========================================================================== */
(function () {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  const COMPONENTS = window.DS_COMPONENTS || [];
  const SCREENS = window.DS_SCREENS || [];

  /* ---------- HERO STATS ---------- */
  const patternCats = new Set(['Patterns', 'Lists & Feeds', 'Headers & Sections']);
  const nbPatterns = COMPONENTS.filter(c => patternCats.has(c.category)).length;
  $('#stat-comp').textContent = COMPONENTS.length;
  $('#stat-pat').textContent = nbPatterns;
  $('#stat-screen').textContent = SCREENS.length;

  /* ---------- DOCTRINE (creative direction) ---------- */
  const DOCTRINE = [
    ['01', 'La doctrine des trois lumières', 'Teal côtier, ambre chaud, or solaire. Trois présences saturées et souveraines. Aucune autre ne rivalise. Tout le reste recule dans la profondeur navy ou l\'ink neutre.'],
    ['02', 'Glassmorphism comme épistémologie', 'La connaissance ne tient pas : elle réfracte. Verre dépoli, surfaces liquides, couches translucides. Comprendre est toujours en cours, jamais achevé. Calibré à la précision de la physique optique.'],
    ['03', 'Restraint éditorial monumental', 'Quand League Spartan parle, c\'est à 64 points minimum. Puis le silence. Le vide négatif entre un titre massif et un label murmuré est aussi dessiné que la typo elle-même.'],
    ['04', 'Systèmes organiques, ordre géométrique', 'Le mark — trois nœuds, moléculaire, vivant. Des ellipses précises qui semblent vivantes, des grilles qui respirent. Pas de tessellation mécanique mais la répétition de la biologie cellulaire.'],
    ['05', 'Le pacte anti-générique', 'Contre la rigidité bureaucratique, la brillance infantilisante du gamifié, et le vocabulaire creux du dégradé violet IA. Pas de violet. Pas de vert. Pas de rainbow. L\'intelligence se gagne par ce qu\'on refuse.'],
  ];
  $('#doctrine').innerHTML = DOCTRINE.map(([n, t, x]) =>
    `<div class="doctrine__card"><div class="doctrine__num">${n}</div><div class="doctrine__title">${t}</div><p class="doctrine__text">${x}</p></div>`
  ).join('');

  /* ---------- COLOR RAMPS ---------- */
  const RAMPS = [
    ['Primary — Coastal Teal', 'primary', ['50','100','200','300','400','500','600','700','800','900','950']],
    ['Secondary — Warm Amber', 'secondary', ['50','100','200','300','400','500','600','700','800','900']],
    ['Accent — Golden Sun', 'accent', ['50','100','200','300','400','500','600','700','800','900']],
    ['Ink — Neutrals', 'ink', ['0','50','100','200','300','400','500','600','700','800','900','950']],
  ];
  $('#color-ramps').innerHTML = RAMPS.map(([title, fam, steps]) => {
    const cells = steps.map(st => {
      const v = cssVar(`--${fam}-${st}`);
      const dark = ['0','50','100','200','300'].includes(st);
      return `<div class="ramp__step" style="background:${v};color:${dark ? '#1a1a1a' : '#fff'}" data-copy="${v}" title="--${fam}-${st} · ${v}">${st}</div>`;
    }).join('');
    return `<div class="tok" data-tok="${title} --${fam} ${fam} ${steps.map(s=>fam+'-'+s).join(' ')} color couleur" style="margin-bottom:20px"><div class="swatch__name" style="margin-bottom:8px">${title} <code style="font-family:var(--font-mono);font-size:11px;color:var(--text-subtle)">--${fam}-*</code></div><div class="ramp" style="grid-template-columns:repeat(${steps.length},1fr)">${cells}</div></div>`;
  }).join('');

  const SEM = [['success','Success','muted teal-green'],['danger','Danger','soft coral'],['warning','Warning','TLS yellow'],['info','Info','TLS teal']];
  $('#semantic-swatches').innerHTML = SEM.map(([k, name, note]) => {
    const v = cssVar(`--${k}-base`);
    return `<div class="swatch tok" data-tok="${k} ${name} ${note} --${k}-base semantic couleur" data-copy="${v}"><div class="swatch__color" style="background:${v}"></div><div class="swatch__meta"><div class="swatch__name">${name}</div><div class="swatch__hex">${v} · ${note}</div></div></div>`;
  }).join('');

  /* ---------- TYPOGRAPHY ---------- */
  const TYPE = [
    ['display-2xl', 'clamp 56→104', 'var(--font-display)', 'clamp(2rem,4vw,3rem)', 'Trois îles'],
    ['display-xl', 'clamp 44→72', 'var(--font-display)', 'clamp(1.8rem,3.4vw,2.6rem)', 'Liquid Mastery'],
    ['display-lg', 'clamp 36→52', 'var(--font-display)', 'clamp(1.6rem,2.6vw,2.1rem)', 'Maîtrise validée'],
    ['h1 · 36', '700', 'var(--font-display)', '2rem', 'Titre de page'],
    ['h2 · 28', '700', 'var(--font-display)', '1.6rem', 'Titre de section'],
    ['h3 · 22', '600', 'var(--font-display)', '1.35rem', 'Sous-section'],
    ['body-lg · 18', '400', 'var(--font-body)', '1.125rem', 'Texte d\'introduction, plus aéré et lisible.'],
    ['body · 16', '400', 'var(--font-body)', '1rem', 'Corps de texte standard, Nunito.'],
    ['caption · 13', '500', 'var(--font-body)', '0.8125rem', 'Métadonnée, légende, helper.'],
    ['serif · Playfair', 'italic', 'var(--font-serif)', '1.4rem', 'La connaissance réfracte — citations & journal.'],
    ['mono · JetBrains', '400', 'var(--font-mono)', '0.95rem', '--primary-500 · 48.7218° N'],
  ];
  $('#type-specimens').innerHTML = TYPE.map(([label, w, fam, size, sample]) =>
    `<div class="type-row tok" data-tok="${label} typography typo font ${fam}"><div class="type-row__label">${label}</div><div class="type-row__sample" style="font-family:${fam};font-size:${size};font-weight:${/^\d+$/.test(w) ? w : 600};${fam.includes('serif') ? 'font-style:italic;' : ''}${fam.includes('body') || fam.includes('mono') ? 'letter-spacing:0;line-height:1.4;' : ''}">${sample}</div></div>`
  ).join('');

  /* ---------- SPACING ---------- */
  const SPACE = [['tight','2px'],['stack-xs','8px'],['stack','16px'],['stack-lg','24px'],['section','32px'],['section-lg','40px'],['page','48px']];
  $('#spacing-scale').innerHTML = '<div class="panel" style="display:flex;flex-direction:column;gap:14px">' + SPACE.map(([n, v]) =>
    `<div class="tok" data-tok="--space-${n} ${n} spacing espacement gap ${v}" style="display:flex;align-items:center;gap:16px"><code style="width:140px;flex-shrink:0;font-family:var(--font-mono);font-size:13px;color:var(--primary-700)">--space-${n}</code><div style="height:14px;width:${v};background:var(--primary-400);border-radius:3px"></div><span style="font-size:13px;color:var(--text-muted)">${v}</span></div>`
  ).join('') + '</div>';

  const RADII = [['xs','4px'],['sm','6px'],['md','10px'],['lg','14px'],['xl','20px'],['2xl','24px'],['pill','999px']];
  $('#radius-scale').innerHTML = RADII.map(([n, v]) =>
    `<div class="demo-tile tok" data-tok="--r-${n} ${n} radius rayon border ${v}"><div class="demo-box" style="border-radius:${v === '999px' ? '999px' : v};background:var(--primary-50);border-color:var(--primary-200);height:72px"></div><div class="demo-cap">--r-${n} · ${v}</div></div>`
  ).join('');

  /* ---------- SHADOWS ---------- */
  const SHAD = ['xs','sm','md','lg','xl','card','card-hover','card-lift','brand-sm','warm-sm','glow-primary','glow-sun'];
  $('#shadow-scale').innerHTML = SHAD.map(n =>
    `<div class="demo-tile tok" data-tok="--shadow-${n} ${n} shadow ombre elevation glow" style="padding:8px"><div class="demo-box" style="box-shadow:var(--shadow-${n});border:none;border-radius:14px;background:#fff"></div><div class="demo-cap">--shadow-${n}</div></div>`
  ).join('');

  $('#glass-demos').innerHTML = `
    <div style="position:relative;border-radius:20px;overflow:hidden;background:var(--g-cool-deep);padding:32px;min-height:160px;display:grid;place-items:center">
      <div style="background:var(--glass-fill);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-ring);border-radius:16px;padding:20px 28px;color:#1a1a1a;font-weight:600">Glass card · frosted</div>
    </div>
    <div style="position:relative;border-radius:20px;overflow:hidden;background:var(--g-warm);padding:32px;min-height:160px;display:grid;place-items:center">
      <div style="background:rgba(255,255,255,0.18);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);border-radius:16px;padding:20px 28px;color:#fff;font-weight:700">Glass sur fond color</div>
    </div>`;

  /* ---------- MOTION ---------- */
  const MOTION = [
    ['Durée', '--duration-fast', '150ms', 'Micro-feedback (hover, ripple)'],
    ['Durée', '--duration-base', '200ms', 'DEFAULT — transitions composant'],
    ['Durée', '--duration-slow', '300ms', 'Panels, drawers'],
    ['Durée', '--duration-glacial', '600ms', 'Célébration, achievement'],
    ['Easing', '--ease-standard', 'cubic-bezier(.4,0,.2,1)', 'Neutre — défaut'],
    ['Easing', '--ease-decelerate', 'cubic-bezier(0,0,.2,1)', 'Entrées (modal-in)'],
    ['Easing', '--ease-accelerate', 'cubic-bezier(.4,0,1,1)', 'Sorties (dismiss)'],
    ['Easing', '--ease-emphasis', 'cubic-bezier(.22,1,.36,1)', 'Reveals premium'],
  ];
  $('#motion-table').innerHTML = '<thead><tr><th>Type</th><th>Token</th><th>Valeur</th><th>Usage</th></tr></thead><tbody>' +
    MOTION.map(([t, tok, v, u]) => `<tr class="tok" data-tok="${tok} ${t} ${u} motion duration easing animation"><td>${t}</td><td><code>${tok}</code></td><td><code>${v}</code></td><td style="color:var(--text-muted)">${u}</td></tr>`).join('') + '</tbody>';

  const GRAD = [['--g-hero','Hero signature (rare)'],['--g-cool-deep','Backgrounds primary'],['--g-brand-deep','Hero saturé navy→teal'],['--g-warm','Célébration'],['--g-mesh','Ambient décoratif'],['--g-page-ambient','Fond de page DEFAULT']];
  $('#gradient-demos').innerHTML = GRAD.map(([v, label]) =>
    `<div class="demo-tile tok" data-tok="${v} ${label} gradient dégradé" data-copy="var(${v})"><div class="demo-box" style="background:var(${v});border:none;border-radius:14px;height:88px;cursor:pointer"></div><div class="demo-cap">${v} · ${label}</div></div>`
  ).join('');

  /* ---------- UTILITY TOKENS ---------- */
  const SURFACES = [
    ['surface','Page / card (blanc)'],['surface-muted','Recessed léger'],['surface-sunken','Wells, inputs'],
    ['surface-focus','Immersif dark (pratique)'],['surface-paper','Reader · ivoire'],['surface-sepia','Reader · sépia'],['surface-dawn','Reader · teal soft'],
  ];
  if ($('#surface-swatches')) $('#surface-swatches').innerHTML = SURFACES.map(([k, note]) => {
    const v = cssVar(`--${k}`);
    const dark = ['surface-focus'].includes(k);
    return `<div class="swatch tok" data-tok="${k} --color-${k} surface ${note}" data-copy="${v}"><div class="swatch__color" style="background:${v};border-bottom:1px solid var(--border-subtle)"></div><div class="swatch__meta"><div class="swatch__name">${k}</div><div class="swatch__hex">${v}</div></div></div>`;
  }).join('');

  const ROLES = [
    ['text-strong','#1a1a1a'],['text-default','#374151'],['text-muted','#6b7280'],['text-subtle','#9ca3af'],
    ['border-subtle','#f3f4f6'],['border-default','#e5e7eb'],['border-strong','#d1d5db'],
  ];
  if ($('#role-swatches')) $('#role-swatches').innerHTML = ROLES.map(([k, v]) => {
    const isText = k.startsWith('text');
    return `<div class="swatch tok" data-tok="${k} --color-${k} ${isText ? 'text texte' : 'border bordure'}" data-copy="${v}"><div class="swatch__color" style="background:${isText ? '#fff' : v};display:grid;place-items:center;color:${v};font-family:var(--font-display);font-weight:700;font-size:18px;border-bottom:1px solid var(--border-subtle)">${isText ? 'Ag' : ''}</div><div class="swatch__meta"><div class="swatch__name">${k}</div><div class="swatch__hex">${v}</div></div></div>`;
  }).join('');

  const UTIL = [
    ['Opacity','--opacity-faint','5%','wash quasi-invisible'],['Opacity','--opacity-soft','10%','tint léger, hover'],['Opacity','--opacity-tinted','15%','glass, ghost'],['Opacity','--opacity-medium','30%','scrim sous-modal'],['Opacity','--opacity-disabled','50%','éléments désactivés'],['Opacity','--opacity-overlay','70%','scrim modal fort'],
    ['z-index','--z-sticky','20','headers sticky'],['z-index','--z-dropdown','30','menus, popovers'],['z-index','--z-overlay','40','scrims drawer'],['z-index','--z-modal','50','dialogs'],['z-index','--z-toast','60','toasts'],['z-index','--z-tooltip','70','tooltips (max)'],
    ['Blur','--blur-glass-light','8px','glass subtil'],['Blur','--blur-glass-medium','16px','glass DEFAULT'],['Blur','--blur-glass-heavy','24px','overlays forts'],['Blur','--blur-ambient','60px','blobs de fond'],
    ['Container','--container-prose','65ch','lecture long-form'],['Container','--container-content','768px','formulaires'],['Container','--container-page','1152px','pages DEFAULT'],['Container','--container-wide','1280px','dashboards'],
    ['Border','--border-hairline','1px','cards, dividers'],['Border','--border-base','2px','inputs, actifs'],['Border','--border-thick','3px','accents'],['Border','--border-heavy','4px','focus, callouts'],
    ['Touch','--spacing-touch','44px','cible mini (WCAG AA)'],['Touch','--spacing-touch-lg','48px','cible confortable'],
  ];
  if ($('#utility-table')) $('#utility-table').innerHTML = '<thead><tr><th>Famille</th><th>Token</th><th>Valeur</th><th>Usage</th></tr></thead><tbody>' +
    UTIL.map(([f, tok, v, u]) => `<tr class="tok" data-tok="${tok} ${f} ${u} ${f.toLowerCase()}"><td>${f}</td><td><code>${tok}</code></td><td><code>${v}</code></td><td style="color:var(--text-muted)">${u}</td></tr>`).join('') + '</tbody>';

  /* ---------- SPECIMENS — family deep-dives ---------- */
  const specRow = (label, html, dark) =>
    `<div style="display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--border-subtle)"><div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted)">${label}</div><div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;${dark ? 'background:var(--g-cool-deep);border-radius:10px;padding:14px' : ''}">${html}</div></div>`;

  $('#spec-buttons').innerHTML =
    specRow('variants', `<button class="btn btn--primary">Primary</button><button class="btn btn--secondary">Secondary</button><button class="btn btn--accent">Accent</button><button class="btn btn--ghost">Ghost</button><button class="btn btn--outline">Outline</button><button class="btn btn--outline-warm">Outline warm</button><button class="btn btn--destructive">Destructive</button><button class="btn btn--link">Link</button>`) +
    specRow('glass · dark', `<button class="btn btn--glass">glass</button>`, true) +
    specRow('glass · light', `<span style="display:flex;flex-wrap:wrap;gap:10px;background:var(--primary-50);border:1px solid var(--primary-100);border-radius:10px;padding:12px"><button class="btn btn--glass-light">glass-light</button><button class="btn btn--glass-light-ghost">glass-light-ghost</button></span>`) +
    specRow('glass · tinted', `<button class="btn btn--glass-brand">glass-brand</button><button class="btn btn--glass-warm">glass-warm</button><button class="btn btn--glass-sun">glass-sun</button>`) +
    specRow('sizes', `<button class="btn btn--primary btn--sm">Small</button><button class="btn btn--primary">Medium</button><button class="btn btn--primary btn--lg">Large</button>`) +
    specRow('states', `<button class="btn btn--primary">Default</button><button class="btn btn--primary" style="background:var(--primary-700)">Hover</button><button class="btn btn--primary" style="outline:2px solid var(--primary-500);outline-offset:2px">Focus</button><button class="btn btn--primary" style="opacity:.5">Disabled</button>`) +
    specRow('icon', `<button class="btn btn--primary">▶ Continuer</button><button class="btn btn--ghost">Voir détails ›</button>`);

  $('#spec-badges').innerHTML =
    specRow('badge', `<span class="badge badge--brand">Brand</span><span class="badge badge--warm">Warm</span><span class="badge badge--sun">Sun</span><span class="badge badge--success">Success</span><span class="badge badge--danger">Danger</span><span class="badge badge--info">Info</span>`) +
    specRow('status', `<span class="badge badge--success">✓ Terminé</span><span class="badge badge--info">En cours</span><span class="badge" style="background:var(--ink-100);color:var(--ink-500)">🔒 Verrouillé</span><span class="badge" style="background:var(--g-warm);color:#fff">★ Populaire</span>`) +
    specRow('pill', `<span class="pill">⏱ 12 min</span><span class="pill">5 leçons</span><span class="pill">Niveau 2</span>`) +
    specRow('tag', `<span class="pill">React ✕</span><span class="pill">Design ✕</span>`) +
    specRow('filterchip', `<button class="filter-chip is-active">Tous</button><button class="filter-chip">En cours</button><button class="filter-chip">Terminé</button>`);

  $('#spec-forms').innerHTML =
    specRow('input', `<input class="input-demo" style="max-width:220px" placeholder="Défaut" /><input class="input-demo" style="max-width:220px;border-color:var(--primary-400);box-shadow:var(--shadow-brand-sm)" value="Focus" /><input class="input-demo" style="max-width:160px;border-color:var(--danger-base)" value="Erreur" />`) +
    specRow('select', `<div style="position:relative;max-width:220px;width:100%"><input class="input-demo" placeholder="Sélectionner…" /><span style="position:absolute;right:12px;top:11px;color:var(--text-subtle)">▾</span></div>`) +
    specRow('checkbox', `<span style="display:flex;gap:8px;align-items:center"><span class="check">✓</span> <span style="font-size:13px">Coché</span></span><span style="display:flex;gap:8px;align-items:center"><span class="check" style="background:#fff;border:2px solid var(--border-strong);color:transparent"></span> <span style="font-size:13px;color:var(--text-muted)">Décoché</span></span>`) +
    specRow('radio', `<span style="display:flex;gap:8px;align-items:center"><span style="width:18px;height:18px;border-radius:50%;border:5px solid var(--primary-500);background:#fff"></span> <span style="font-size:13px">Sélectionné</span></span>`) +
    specRow('switch', `<span class="switch"></span><span class="switch" style="background:var(--ink-200)"></span>`) +
    specRow('group', `<div style="max-width:240px;width:100%"><div style="font-size:12px;font-weight:600;margin-bottom:6px">Email</div><input class="input-demo" placeholder="ton@email.com" /><div style="font-size:11px;color:var(--text-subtle);margin-top:5px">Helper text.</div></div>`);

  $('#spec-cards').innerHTML =
    specRow('default', `<div class="dcard" style="max-width:220px"><div class="dcard__title">Default</div><div class="dcard__desc">Shadow warm-tintée.</div></div>`) +
    specRow('elevated', `<div class="dcard" style="max-width:220px;box-shadow:var(--shadow-lg)"><div class="dcard__title">Elevated</div><div class="dcard__desc">shadow-lg.</div></div>`) +
    specRow('glass', `<div style="background:var(--glass-fill);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);box-shadow:var(--shadow-md),var(--glass-ring);border-radius:14px;padding:14px;max-width:220px"><div class="dcard__title">Glass</div><div class="dcard__desc" style="color:var(--ink-700)">Frosted surface.</div></div>`, true) +
    specRow('stat', `<div class="dcard" style="text-align:center;max-width:140px"><div style="font-family:var(--font-display);font-size:1.8rem;color:var(--primary-600);font-weight:700">87%</div><div class="dcard__desc">Progression</div></div>`) +
    specRow('course', `<div class="dcard" style="padding:0;overflow:hidden;max-width:200px"><div style="height:44px;background:var(--g-cool-deep)"></div><div style="padding:12px"><div style="font-weight:700;font-size:13px">Parcours</div><div class="progressbar" style="margin-top:8px"><i style="width:45%"></i></div></div></div>`);

  /* ---------- COMPONENT PREVIEWS (bespoke recreations) ---------- */
  const av = (bg, t) => `<span class="av" style="background:var(--${bg})">${t}</span>`;
  const PREVIEWS = {
    // ----- Core -----
    'Button': `<div style="display:flex;flex-direction:column;gap:8px;align-items:center;width:100%"><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"><button class="btn btn--primary">Primary</button><button class="btn btn--secondary">Secondary</button><button class="btn btn--accent">Accent</button><button class="btn btn--ghost">Ghost</button></div><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"><button class="btn btn--outline">Outline</button><button class="btn btn--outline-warm">Outline warm</button></div></div>`,
    'Input': `<div style="width:100%;display:flex;flex-direction:column;gap:8px"><input class="input-demo" placeholder="ton@email.com" /><input class="input-demo" style="border-color:var(--danger-base)" value="invalide" /></div>`,
    'Select': `<div style="position:relative;width:100%"><input class="input-demo" placeholder="Sélectionner…" /><span style="position:absolute;right:12px;top:12px;color:var(--text-subtle)">▾</span></div>`,
    'Checkbox': `<div style="display:flex;gap:14px;align-items:center"><span style="display:flex;gap:8px;align-items:center"><span class="check">✓</span><span style="font-size:13px">Activé</span></span><span style="display:flex;gap:8px;align-items:center"><span class="check" style="background:#fff;border:2px solid var(--border-strong);color:transparent"></span><span style="font-size:13px;color:var(--text-muted)">Inactif</span></span></div>`,
    'Radio': `<div style="display:flex;gap:14px;align-items:center"><span style="display:flex;gap:8px;align-items:center"><span style="width:18px;height:18px;border-radius:50%;border:5px solid var(--primary-500);background:#fff"></span><span style="font-size:13px">A</span></span><span style="display:flex;gap:8px;align-items:center"><span style="width:18px;height:18px;border-radius:50%;border:2px solid var(--border-strong)"></span><span style="font-size:13px;color:var(--text-muted)">B</span></span></div>`,
    'Switch': `<div style="display:flex;gap:14px;align-items:center"><span class="switch"></span><span class="switch" style="background:var(--ink-200)"></span></div>`,
    'FormGroup': `<div style="width:100%"><div style="font-size:12px;font-weight:600;color:var(--text-default);margin-bottom:6px">Email</div><input class="input-demo" placeholder="ton@email.com" /><div style="font-size:11px;color:var(--text-subtle);margin-top:5px">On ne partagera jamais ton email.</div></div>`,
    'Card': `<div class="dcard"><div class="dcard__title">Titre de card</div><div class="dcard__desc">Surface neutre, shadow warm-tintée au repos.</div></div>`,
    'Badge': `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center"><span class="badge badge--brand">Brand</span><span class="badge badge--warm">Warm</span><span class="badge badge--sun">Sun</span><span class="badge badge--success">Réussi</span></div>`,
    'Avatar': `<div style="display:flex;gap:8px;justify-content:center">${av('primary-500','CM')}${av('secondary-500','TL')}${av('accent-400','JS')}</div>`,
    'AvatarGroup': `<div style="display:flex;justify-content:center"><span style="display:flex">${av('primary-500','CM')}<span class="av" style="background:var(--secondary-500);margin-left:-10px;box-shadow:0 0 0 2px #fff">TL</span><span class="av" style="background:var(--ink-300);margin-left:-10px;box-shadow:0 0 0 2px #fff">+5</span></span></div>`,
    'Alert': `<div class="alert alert--info">Une information contextuelle utile.</div>`,
    'Modal': `<div style="width:100%;background:#fff;border:1px solid var(--border-default);border-radius:16px;box-shadow:var(--shadow-xl);padding:16px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="dcard__title" style="margin:0">Confirmer ?</span><span style="color:var(--text-subtle)">✕</span></div><div class="dcard__desc" style="margin:6px 0 12px">Cette action est définitive.</div><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn btn--outline btn--sm">Annuler</button><button class="btn btn--primary btn--sm">Confirmer</button></div></div>`,
    'Toast': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span class="dot-status" style="background:var(--success-base)"></span><span style="font-size:13px">Modifications enregistrées</span></div>`,
    'Skeleton': `<div style="width:100%;display:flex;flex-direction:column;gap:8px"><div class="skel"></div><div class="skel" style="width:70%"></div></div>`,
    'EmptyState': `<div style="text-align:center;color:var(--text-muted)"><div style="font-size:24px">🗂</div><div style="font-size:13px;margin-top:4px">Rien ici pour l'instant</div></div>`,
    'Search': `<div style="position:relative;width:100%"><input class="input-demo" style="padding-left:34px" placeholder="Rechercher…" /><span style="position:absolute;left:12px;top:11px;color:var(--text-subtle)">⌕</span></div>`,
    // ----- Atoms / chips -----
    'Pill': `<div style="display:flex;gap:6px;justify-content:center"><span class="pill">⏱ 12 min</span><span class="pill">Niveau 2</span></div>`,
    'MetaPill': `<div style="display:flex;gap:6px;justify-content:center"><span class="pill">⏱ 12 min</span><span class="pill">5 leçons</span></div>`,
    'MetaItem': `<div style="display:flex;gap:6px;align-items:center;font-size:13px;color:var(--text-muted)">⏱ <b style="color:var(--text-default)">12 min</b></div>`,
    'MetaPillGroup': `<div style="display:flex;gap:6px;justify-content:center"><span class="pill">Niveau 2</span><span class="pill">⏱ 12 min</span><span class="pill">5 leçons</span></div>`,
    'Tag': `<div style="display:flex;gap:6px;justify-content:center"><span class="pill">React ✕</span><span class="pill">Design ✕</span></div>`,
    'FilterChip': `<div style="display:flex;gap:6px;justify-content:center"><button class="filter-chip is-active">Tous</button><button class="filter-chip">En cours</button></div>`,
    'Chip': `<div style="display:flex;gap:6px;justify-content:center"><span class="pill">Chip</span><span class="badge badge--brand">Actif</span></div>`,
    'Divider': `<div style="width:100%;display:flex;align-items:center;gap:10px;color:var(--text-subtle);font-size:12px"><span style="flex:1;height:1px;background:var(--border-default)"></span>ou<span style="flex:1;height:1px;background:var(--border-default)"></span></div>`,
    'Spinner': `<div class="spinner"></div>`,
    'ProgressBar': `<div style="width:100%"><div class="progressbar"><i style="width:68%"></i></div></div>`,
    'ProgressRing': `<div class="ring" style="--p:72%"><span>72%</span></div>`,
    'ProgressDots': `<div style="display:flex;gap:8px"><span class="dot-status" style="background:var(--primary-600)"></span><span class="dot-status" style="background:var(--primary-600)"></span><span class="dot-status" style="background:var(--ink-200)"></span><span class="dot-status" style="background:var(--ink-200)"></span></div>`,
    'StatusBadge': `<div style="display:flex;gap:6px;justify-content:center"><span class="badge badge--success">✓ Terminé</span><span class="badge badge--info">En cours</span><span class="badge" style="background:var(--ink-100);color:var(--ink-500)">🔒 Verrouillé</span></div>`,
    'TrendingBadge': `<span class="badge" style="background:var(--g-warm);color:#fff">★ Populaire</span>`,
    'NotificationBadge': `<div style="position:relative;width:36px;height:36px"><span style="font-size:24px">🔔</span><span style="position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;border-radius:999px;background:var(--danger-base);color:#fff;font-size:11px;display:grid;place-items:center;padding:0 4px">3</span></div>`,
    'MasteryBadge': `<span class="badge badge--sun">Maîtrise · N4</span>`,
    'Tooltip': `<div class="tooltip-demo"><span class="tooltip-bubble">Bulle au survol &amp; focus</span></div>`,
    // ----- Content / actions -----
    'ActionCard': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span style="width:36px;height:36px;border-radius:10px;background:var(--primary-50);display:grid;place-items:center">⚡</span><div><div style="font-weight:700;font-size:13px">Action rapide</div><div style="font-size:12px;color:var(--text-muted)">Description</div></div></div>`,
    'IconFeatureCard': `<div class="dcard" style="text-align:center"><div style="width:40px;height:40px;border-radius:12px;background:var(--accent-50);display:grid;place-items:center;margin:0 auto 8px">🎯</div><div style="font-weight:700;font-size:13px">Feature</div></div>`,
    'QuickActionButton': `<button class="btn btn--ghost" style="flex-direction:column;height:auto;padding:12px 16px;gap:4px">⚡<span style="font-size:11px">Action</span></button>`,
    'UserInfo': `<div style="display:flex;gap:10px;align-items:center">${av('primary-500','CM')}<div><div style="font-weight:700;font-size:13px">Chloé M.</div><div style="font-size:12px;color:var(--text-muted)">Apprenante</div></div></div>`,
    'ActivityItem': `<div style="display:flex;gap:10px;align-items:flex-start"><span class="dot-status" style="background:var(--primary-500);margin-top:5px"></span><div style="font-size:13px"><b>Leçon terminée</b><div style="font-size:11px;color:var(--text-subtle)">Il y a 2h</div></div></div>`,
    // ----- Learning -----
    'StatCard': `<div class="dcard" style="text-align:center"><div style="font-family:var(--font-display);font-size:2rem;color:var(--primary-600);font-weight:700">87%</div><div class="dcard__desc">Progression</div></div>`,
    'Medal': `<div style="width:60px;height:60px;border-radius:50%;background:var(--g-warm);box-shadow:var(--shadow-warm-sm);display:grid;place-items:center;color:#fff;font-size:26px;border:2px dashed rgba(255,255,255,0.5)">★</div>`,
    'Achievement': `<div style="text-align:center"><div style="width:54px;height:54px;border-radius:50%;background:var(--g-warm);display:grid;place-items:center;color:#fff;font-size:24px;margin:0 auto 6px">🏆</div><div style="font-size:12px;font-weight:700">Première semaine</div></div>`,
    'AchievementBadge': `<div style="width:56px;height:56px;border-radius:50%;background:var(--g-warm);display:grid;place-items:center;color:#fff;font-size:24px">🏅</div>`,
    'CompetenceBadge': `<div style="display:flex;gap:8px;align-items:center"><span style="width:30px;height:30px;border-radius:50%;background:var(--primary-500);color:#fff;display:grid;place-items:center;font-weight:700;font-size:13px">3</span><span style="font-size:13px;font-weight:600">Leadership</span></div>`,
    'SkillBar': `<div style="width:100%"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Communication</span><span style="color:var(--primary-700);font-weight:700">N4</span></div><div class="progressbar"><i style="width:80%"></i></div></div>`,
    'GoalProgress': `<div style="width:100%"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Objectif</span><span>7/10</span></div><div class="progressbar"><i style="width:70%;background:var(--secondary-500)"></i></div></div>`,
    'CourseCard': `<div class="dcard" style="padding:0;overflow:hidden"><div style="height:48px;background:var(--g-cool-deep)"></div><div style="padding:12px"><div style="font-weight:700;font-size:13px">Parcours design</div><div class="progressbar" style="margin-top:8px"><i style="width:45%"></i></div></div></div>`,
    'Flashcard': `<div class="dcard" style="text-align:center;min-height:64px;display:grid;place-items:center"><div style="font-weight:700">Recto / Verso<div style="font-size:11px;color:var(--text-subtle);font-weight:400;margin-top:4px">clic pour retourner</div></div></div>`,
    'CompetencyRadar': `<svg width="100" height="100" viewBox="0 0 100 100"><polygon points="50,8 88,32 76,82 24,82 12,32" fill="none" stroke="var(--ink-200)"/><polygon points="50,24 74,38 66,70 34,70 26,38" fill="rgba(85,161,180,0.25)" stroke="var(--primary-500)" stroke-width="1.5"/></svg>`,
    'CompetencyMatrix': `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px">${Array.from({length:8}).map((_,i)=>`<span style="height:18px;border-radius:3px;background:rgba(85,161,180,${0.2+(i%4)*0.2})"></span>`).join('')}</div>`,
    'HeatmapGrid': `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">${Array.from({length:21}).map((_,i)=>`<span style="width:11px;height:11px;border-radius:2px;background:rgba(85,161,180,${(i*7%10)/10*0.8+0.1})"></span>`).join('')}</div>`,
    'AtrophieIndicator': `<div style="display:flex;gap:6px;align-items:center;font-size:13px"><span class="dot-status" style="background:var(--warning-base)"></span>Compétence en déclin</div>`,
    'DreyfusSlider': `<div style="width:100%"><div class="progressbar"><i style="width:60%;background:var(--accent-400)"></i></div><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-subtle);margin-top:4px"><span>Novice</span><span>Expert</span></div></div>`,
    'DreyfusLevelSelector': `<div style="display:flex;gap:5px">${[1,2,3,4,5].map(n=>`<span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;${n<=3?'background:var(--primary-500);color:#fff':'background:var(--ink-100);color:var(--ink-400)'}">${n}</span>`).join('')}</div>`,
    'ProfileCard': `<div class="dcard" style="text-align:center">${av('primary-500','CM')}<div style="font-weight:700;font-size:13px;margin-top:6px">Chloé M.</div><div style="font-size:12px;color:var(--text-muted)">Niveau 3 · 1240 XP</div></div>`,
    'CorrectionCard': `<div class="dcard" style="border-left:3px solid var(--secondary-500)"><div style="font-weight:700;font-size:13px">Correction · Mission 2</div><div class="dcard__desc">Feedback du coach disponible.</div></div>`,
    'ResourceCard': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span style="font-size:22px">📄</span><div><div style="font-weight:700;font-size:13px">Ressource PDF</div><div style="font-size:12px;color:var(--text-muted)">2.4 Mo</div></div></div>`,
    // ----- Navigation -----
    'Breadcrumb': `<div style="font-size:13px;color:var(--text-muted)">Accueil <span style="color:var(--text-subtle)">/</span> Parcours <span style="color:var(--text-subtle)">/</span> <span style="color:var(--text-strong)">Détail</span></div>`,
    'Tabs': `<div style="display:flex;gap:4px;border-bottom:1px solid var(--border-default)"><span style="padding:8px 14px;border-bottom:2px solid var(--primary-600);color:var(--primary-700);font-weight:600;font-size:13px">Aperçu</span><span style="padding:8px 14px;color:var(--text-muted);font-size:13px">Détails</span></div>`,
    'Pagination': `<div style="display:flex;gap:6px"><span class="pill">‹</span><span class="badge badge--brand" style="width:28px;height:28px;justify-content:center">1</span><span class="pill" style="width:28px;height:28px;justify-content:center">2</span><span class="pill">›</span></div>`,
    'Stepper': `<div style="display:flex;align-items:center;gap:6px;font-size:12px"><span style="width:22px;height:22px;border-radius:50%;background:var(--primary-600);color:#fff;display:grid;place-items:center">1</span><span style="width:24px;height:2px;background:var(--primary-300)"></span><span style="width:22px;height:22px;border-radius:50%;background:var(--ink-100);color:var(--ink-400);display:grid;place-items:center">2</span></div>`,
    'Steps': `<div style="display:flex;align-items:center;gap:6px;font-size:12px"><span style="width:22px;height:22px;border-radius:50%;background:var(--success-base);color:#fff;display:grid;place-items:center">✓</span><span style="width:24px;height:2px;background:var(--primary-300)"></span><span style="width:22px;height:22px;border-radius:50%;background:var(--primary-600);color:#fff;display:grid;place-items:center">2</span></div>`,
    'DropdownMenu': `<div class="dcard" style="padding:6px;width:140px"><div style="padding:7px 10px;border-radius:6px;background:var(--primary-50);font-size:13px;display:flex;justify-content:space-between">Éditer <span class="kbd">E</span></div><div style="padding:7px 10px;font-size:13px;color:var(--text-muted)">Dupliquer</div></div>`,
    'NavItem': `<div style="display:flex;gap:10px;align-items:center;padding:8px 12px;border-radius:10px;background:var(--primary-50);color:var(--primary-800);font-weight:600;font-size:13px;width:140px">⬚ Dashboard</div>`,
    'SectionCard': `<div class="dcard"><div class="dcard__title">Section</div><div class="dcard__desc">Card sectionnée titrée.</div></div>`,
    // ----- Composites / patterns -----
    'ErrorPage': `<div style="text-align:center"><div style="font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--primary-700)">404</div><div style="font-size:12px;color:var(--text-muted)">Page non trouvée</div><button class="btn btn--primary btn--sm" style="margin-top:8px">Retour</button></div>`,
    'CardGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${Array.from({length:4}).map(()=>`<div style="height:30px;border-radius:8px;background:var(--surface-sunken);border:1px solid var(--border-subtle)"></div>`).join('')}</div>`,
    'InlineProgress': `<div style="width:100%;display:flex;gap:8px;align-items:center"><span style="font-size:11px;color:var(--text-muted)">3/5</span><div class="progressbar"><i style="width:60%"></i></div></div>`,
    'Sidebar': `<div style="display:flex;gap:8px;width:100%"><div style="width:46px;display:flex;flex-direction:column;gap:5px">${Array.from({length:4}).map((_,i)=>`<span style="height:10px;border-radius:4px;background:${i===0?'var(--primary-300)':'var(--ink-100)'}"></span>`).join('')}</div><div style="flex:1;background:var(--surface-sunken);border-radius:6px"></div></div>`,
    'PositionnementModal': `<div class="dcard"><div class="dcard__title" style="font-size:13px">Test de positionnement</div><div class="progressbar" style="margin:8px 0"><i style="width:40%"></i></div><div style="font-size:11px;color:var(--text-muted)">Question 2 / 5</div></div>`,
    'BookingModal': `<div class="dcard"><div class="dcard__title" style="font-size:13px">Réserver un créneau</div><div style="display:flex;gap:4px;margin-top:8px">${[14,15,16].map(h=>`<span class="pill" style="font-size:11px">${h}h</span>`).join('')}</div></div>`,
    'Dialog Modals': `<div style="width:100%;background:#fff;border:1px solid var(--border-default);border-radius:14px;box-shadow:var(--shadow-lg);padding:14px"><div style="font-weight:700;font-size:13px">Confirmer ?</div><div style="display:flex;gap:6px;justify-content:flex-end;margin-top:10px"><button class="btn btn--outline btn--sm">Non</button><button class="btn btn--primary btn--sm">Oui</button></div></div>`,
    'SessionFeedbackModal': `<div class="dcard" style="text-align:center"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">Note la session</div><div style="color:var(--accent-400);font-size:20px">★★★★☆</div></div>`,
    'VideoPlayerModal': `<div style="width:100%;aspect-ratio:16/9;border-radius:10px;background:var(--ink-900);display:grid;place-items:center;color:#fff;font-size:22px">▶</div>`,
    'Toast + useToast': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span class="dot-status" style="background:var(--success-base)"></span><span style="font-size:13px">Enregistré ✓</span></div>`,
    'CelebrationModal': `<div class="dcard" style="text-align:center;background:var(--g-warm);color:#fff;border:none"><div style="font-size:26px">🎉</div><div style="font-weight:700;font-size:13px">Bravo !</div></div>`,
    'InlineWin': `<div style="display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:10px;background:var(--accent-50);color:var(--accent-800);font-size:13px;font-weight:600">🔥 Série de 7 jours !</div>`,
    'ParcoursCard': `<div class="dcard" style="padding:0;overflow:hidden"><div style="height:42px;background:var(--g-cool-deep)"></div><div style="padding:10px"><div style="font-weight:700;font-size:13px">Parcours UX</div><div class="progressbar" style="margin-top:6px"><i style="width:55%"></i></div></div></div>`,
    'SessionCard': `<div class="dcard" style="display:flex;gap:10px;align-items:center">${av('primary-500','C')}<div><div style="font-weight:700;font-size:13px">Session coaching</div><div style="font-size:11px;color:var(--text-muted)">Demain · 14h</div></div></div>`,
    'QuizComponent': `<div class="dcard"><div style="font-size:12px;font-weight:600;margin-bottom:6px">Quelle est la réponse ?</div><div style="display:flex;flex-direction:column;gap:4px">${['A','B'].map((o,i)=>`<span style="padding:5px 10px;border-radius:8px;border:1px solid ${i===0?'var(--primary-400)':'var(--border-default)'};font-size:12px">${o}</span>`).join('')}</div></div>`,
    'HeroSection (deprecated — use PageHero)': `<div style="width:100%;border-radius:12px;background:var(--g-brand-deep);color:#fff;padding:16px"><div style="font-family:var(--font-display);font-weight:700">Hero</div><div style="font-size:11px;opacity:.8">deprecated → PageHero</div></div>`,
    'ActivityFeed': `<div style="width:100%;display:flex;flex-direction:column;gap:8px">${Array.from({length:3}).map((_,i)=>`<div style="display:flex;gap:8px;align-items:flex-start"><span class="dot-status" style="background:var(--primary-500);margin-top:5px"></span><div style="flex:1"><div class="skel" style="height:8px;width:${70-i*12}%"></div></div></div>`).join('')}</div>`,
    'AuthorStrip': `<div style="display:flex;gap:8px;align-items:center">${av('secondary-500','M')}<div style="font-size:12px"><b>Marie L.</b><div style="font-size:11px;color:var(--text-subtle)">2 juin · 4 min</div></div></div>`,
    'IntroCallout': `<div style="width:100%;border-left:3px solid var(--primary-500);padding:8px 12px;background:var(--primary-50);border-radius:0 8px 8px 0;font-size:13px;color:var(--primary-900)">Une introduction qui pose le contexte.</div>`,
    'KeyFindingCard': `<div class="dcard" style="border-top:3px solid var(--accent-400)"><div style="font-size:11px;color:var(--accent-700);font-weight:700">CHIFFRE CLÉ</div><div style="font-family:var(--font-display);font-size:1.6rem;font-weight:700">+34%</div></div>`,
    'EditorialQuoteCallout': `<div style="width:100%;font-family:var(--font-serif);font-style:italic;font-size:1.05rem;color:var(--text-default);border-left:3px solid var(--accent-400);padding-left:12px">« La connaissance réfracte. »</div>`,
    'ReadingProgress': `<div style="width:100%"><div style="height:4px;border-radius:999px;background:var(--ink-100)"><div style="height:100%;width:42%;border-radius:999px;background:var(--primary-500)"></div></div></div>`,
    'TableOfContents': `<div style="width:100%;font-size:12px;display:flex;flex-direction:column;gap:5px"><span style="border-left:2px solid var(--primary-500);padding-left:8px;color:var(--primary-700);font-weight:600">Introduction</span><span style="border-left:2px solid var(--border-default);padding-left:8px;color:var(--text-muted)">Méthode</span></div>`,
    'FilterBar': `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center"><button class="filter-chip is-active">Tous</button><button class="filter-chip">Vidéo</button><button class="filter-chip">Article</button></div>`,
    'SectionHeader': `<div style="width:100%;display:flex;gap:10px;align-items:center"><span style="width:34px;height:34px;border-radius:10px;background:var(--primary-50);display:grid;place-items:center">◆</span><div><div style="font-family:var(--font-display);font-weight:700;font-size:14px">Titre de section</div><div style="font-size:11px;color:var(--text-muted)">Sous-titre</div></div></div>`,
    'PageHeader': `<div style="width:100%"><div style="font-size:11px;color:var(--text-subtle)">Réglages</div><div style="font-family:var(--font-display);font-weight:700;font-size:18px">Mon compte</div></div>`,
    'ViewerHeader': `<div style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--ink-900);border-radius:10px;color:#fff;font-size:12px"><span>‹ Leçon 3</span><span>✕</span></div>`,
    'MultiStepForm': `<div style="width:100%"><div style="display:flex;align-items:center;gap:5px;margin-bottom:8px"><span style="width:20px;height:20px;border-radius:50%;background:var(--primary-600);color:#fff;display:grid;place-items:center;font-size:11px">1</span><span style="flex:1;height:2px;background:var(--primary-300)"></span><span style="width:20px;height:20px;border-radius:50%;background:var(--ink-100);color:var(--ink-400);display:grid;place-items:center;font-size:11px">2</span></div><input class="input-demo" placeholder="Nom" /></div>`,
    'PageCard': `<div class="dcard"><div class="dcard__title" style="font-size:13px">Page card</div><div class="dcard__desc">Conteneur de contenu page-level.</div></div>`,
    'VeilleCard': `<div class="dcard" style="padding:0;overflow:hidden"><div style="height:36px;background:var(--g-warm)"></div><div style="padding:10px"><span class="badge badge--warm" style="font-size:9px">VEILLE</span><div style="font-weight:700;font-size:12px;margin-top:4px">Tendance IA 2026</div></div></div>`,
    'VeilleCardFeed': `<div style="width:100%;display:flex;flex-direction:column;gap:6px">${Array.from({length:2}).map(()=>`<div style="display:flex;gap:8px;padding:6px;border:1px solid var(--border-subtle);border-radius:8px"><span style="width:30px;height:30px;border-radius:6px;background:var(--surface-sunken)"></span><div style="flex:1"><div class="skel" style="height:8px;width:80%"></div></div></div>`).join('')}</div>`,
    'VeilleFormatShortcutCards': `<div style="display:flex;gap:6px;justify-content:center">${['📄','🎬','🎧'].map(e=>`<div style="width:42px;height:42px;border-radius:10px;background:var(--surface-sunken);display:grid;place-items:center;font-size:18px">${e}</div>`).join('')}</div>`,
    'EditorialCard': `<div class="dcard" style="padding:0;overflow:hidden"><div style="height:44px;background:var(--g-cool-deep)"></div><div style="padding:10px"><div style="font-weight:700;font-size:12px">Article éditorial</div><div style="font-size:11px;color:var(--text-muted)">Magazine</div></div></div>`,
    'NewsletterSignupCard': `<div class="dcard" style="text-align:center"><div style="font-weight:700;font-size:13px">Newsletter</div><div style="display:flex;gap:6px;margin-top:8px"><input class="input-demo" style="height:32px;font-size:12px" placeholder="email" /><button class="btn btn--primary btn--sm">OK</button></div></div>`,
    'PromptCard': `<div style="width:100%;background:#fff;border:1px solid var(--border-default);border-radius:18px 18px 18px 6px;padding:12px;box-shadow:var(--shadow-card);font-size:13px;color:var(--text-default)">Décris une situation où tu as appris de tes erreurs.</div>`,
    'RankingCard': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span style="font-family:var(--font-display);font-weight:700;color:var(--accent-500);font-size:18px">#3</span>${av('primary-500','TL')}<div style="font-size:12px"><b>Thomas L.</b><div style="font-size:11px;color:var(--text-subtle)">1240 XP</div></div></div>`,
    'TlsLogo': `<svg width="48" height="44" viewBox="0 0 439 402"><circle cx="132" cy="48" r="43" fill="#55A1B4"/><circle cx="307" cy="49" r="44" fill="#ED843A"/><circle cx="307" cy="352" r="43" fill="#F8B044"/><circle cx="132" cy="352" r="43" fill="#96C3CF"/><circle cx="216" cy="200" r="26" fill="#8DBAC6"/></svg>`,
    'QuizQuestionCard': `<div class="dcard"><div style="font-size:12px;font-weight:600;margin-bottom:6px">Question 1</div><div style="display:flex;flex-direction:column;gap:4px">${['Vrai','Faux'].map((o,i)=>`<span style="padding:5px 10px;border-radius:8px;border:1px solid ${i===0?'var(--success-base)':'var(--border-default)'};font-size:12px">${o}</span>`).join('')}</div></div>`,
    'DataTable': `<div style="width:100%;font-size:11px"><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;font-weight:700;color:var(--text-subtle);border-bottom:1px solid var(--border-default);padding-bottom:4px">Nom<span>XP</span><span>Niv.</span></div>${[['Chloé','1240','3'],['Tom','980','2']].map(r=>`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:5px 0;border-bottom:1px solid var(--border-subtle)">${r.map(x=>`<span>${x}</span>`).join('')}</div>`).join('')}</div>`,
    'RatingModal': `<div class="dcard" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">Ton avis ?</div><div style="color:var(--accent-400);font-size:22px">★★★★★</div></div>`,
    'ProjectCard': `<div class="dcard"><span class="badge badge--brand" style="font-size:9px">STRIDE</span><div style="font-weight:700;font-size:13px;margin-top:4px">Projet d'équipe</div><div class="progressbar" style="margin-top:6px"><i style="width:35%"></i></div></div>`,
    'FloatingNavButton': `<div style="width:48px;height:48px;border-radius:50%;background:var(--primary-600);color:#fff;display:grid;place-items:center;box-shadow:var(--shadow-lg);font-size:20px">≡</div>`,
    'AmbientBlobs': `<div style="width:100%;height:72px;border-radius:12px;background:var(--g-mesh),var(--surface-muted);background-blend-mode:normal"></div>`,
    'PageHero (alias: EditorialHero)': `<div style="width:100%;border-radius:12px;background:var(--g-brand-deep);color:#fff;padding:16px"><div style="font-size:10px;letter-spacing:.1em;opacity:.8">EYEBROW</div><div style="font-family:var(--font-display);font-weight:700;font-size:18px">Titre de page</div></div>`,
    'EditorialLayout': `<div style="display:flex;gap:8px;width:100%"><div style="flex:2;background:var(--surface-sunken);border-radius:6px;height:56px"></div><div style="flex:1;background:var(--primary-50);border-radius:6px;height:56px"></div></div>`,
    'RelatedItemList': `<div style="width:100%;display:flex;flex-direction:column;gap:6px">${['Article lié','Vidéo liée'].map(t=>`<div style="display:flex;gap:8px;align-items:center;font-size:12px"><span style="width:28px;height:28px;border-radius:6px;background:var(--surface-sunken)"></span>${t}</div>`).join('')}</div>`,
    'AuthShell': `<div style="display:flex;gap:8px;width:100%"><div style="flex:1;background:var(--g-cool-deep);border-radius:8px;height:64px"></div><div style="flex:1;display:flex;flex-direction:column;gap:5px;justify-content:center"><input class="input-demo" style="height:24px" /><button class="btn btn--primary btn--sm">Connexion</button></div></div>`,
    'ResumeLessonCard': `<div class="dcard" style="background:var(--primary-50);border-color:var(--primary-200)"><div style="font-size:11px;color:var(--primary-700);font-weight:700">ÉTAPE 3 / 8</div><div style="font-weight:700;font-size:13px">Reprendre ta leçon</div><button class="btn btn--primary btn--sm" style="margin-top:6px">Continuer</button></div>`,
    'ConsentBanner': `<div style="width:100%;background:#fff;border:1px solid var(--border-default);border-radius:10px;box-shadow:var(--shadow-md);padding:10px;font-size:11px"><div style="color:var(--text-muted);margin-bottom:6px">🍪 Cookies & vie privée</div><div style="display:flex;gap:5px"><button class="btn btn--outline btn--sm">Refuser</button><button class="btn btn--primary btn--sm">Accepter</button></div></div>`,
    'AITransparencyLabel': `<span class="badge" style="background:var(--info-bg);color:var(--info-fg)">✦ Généré par IA</span>`,
    'AIOverrideButton': `<button class="btn btn--outline btn--sm">✦ Ajuster la suggestion IA</button>`,
    'StepTutorial': `<div class="dcard"><div style="font-size:11px;color:var(--primary-700);font-weight:700">ÉTAPE 1 / 4</div><div style="font-weight:700;font-size:13px">Bienvenue 👋</div><div class="dcard__desc">Découvre ton espace.</div></div>`,
    'OptionGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['🎯','📚','🚀','💡'].map((e,i)=>`<div style="padding:8px;border-radius:8px;border:1px solid ${i===0?'var(--primary-400)':'var(--border-default)'};text-align:center;font-size:18px">${e}</div>`).join('')}</div>`,
    'CongratulationsCard': `<div class="dcard" style="text-align:center;background:var(--g-warm);color:#fff;border:none"><div style="font-size:24px">🎊</div><div style="font-weight:700;font-size:13px">Félicitations !</div></div>`,
    'NextStepsGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['Parcours','Coaching'].map(t=>`<div style="padding:8px;border-radius:8px;background:var(--surface-sunken);font-size:11px;text-align:center">${t} ›</div>`).join('')}</div>`,
    'EmptyDashboardState': `<div style="text-align:center;color:var(--text-muted)"><div style="font-size:22px">🌱</div><div style="font-size:12px;margin-top:4px">Commence ton premier parcours</div></div>`,
    'FlipCard': `<div class="dcard" style="text-align:center;min-height:56px;display:grid;place-items:center;background:var(--primary-50);border-color:var(--primary-200)"><span style="font-size:12px;font-weight:600">↻ Carte retournable</span></div>`,
    'LessonNavigation': `<div style="width:100%;display:flex;justify-content:space-between"><button class="btn btn--outline btn--sm">‹ Préc.</button><button class="btn btn--primary btn--sm">Suivant ›</button></div>`,
    // ----- Audit completion (17) -----
    'AccountFamilyNav': `<div style="display:flex;gap:4px;background:var(--surface-sunken);border-radius:10px;padding:4px"><span style="padding:5px 12px;border-radius:7px;background:#fff;font-size:12px;font-weight:600;box-shadow:var(--shadow-xs)">Profil</span><span style="padding:5px 12px;font-size:12px;color:var(--text-muted)">Compte</span><span style="padding:5px 12px;font-size:12px;color:var(--text-muted)">Réglages</span></div>`,
    'ActionCardGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['⚡','🎯','📚','🚀'].map(e=>`<div style="padding:8px;border-radius:8px;background:var(--primary-50);text-align:center;font-size:16px">${e}</div>`).join('')}</div>`,
    'ActivityTimeline': `<div style="width:100%;display:flex;flex-direction:column;gap:10px">${['Leçon terminée','Badge obtenu'].map((t,i)=>`<div style="display:flex;gap:8px;align-items:flex-start"><span style="display:flex;flex-direction:column;align-items:center"><span class="dot-status" style="background:var(--primary-500)"></span>${i===0?'<span style="width:2px;height:14px;background:var(--primary-200)"></span>':''}</span><div style="font-size:12px"><b>${t}</b><div style="font-size:10px;color:var(--text-subtle)">Il y a ${i+1}h</div></div></div>`).join('')}</div>`,
    'AppBreadcrumb': `<div style="font-size:13px;color:var(--text-muted)">Accueil <span style="color:var(--text-subtle)">›</span> Parcours <span style="color:var(--text-subtle)">›</span> <span style="color:var(--primary-700);font-weight:600">UX Design</span></div>`,
    'BehavioralTileGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['Analyser','Agir','Réfléchir','Collaborer'].map((t,i)=>`<div style="padding:8px;border-radius:8px;border:1px solid ${i===1?'var(--primary-400)':'var(--border-default)'};font-size:11px;text-align:center;${i===1?'background:var(--primary-50)':''}">${t}</div>`).join('')}</div>`,
    'CoachCardGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['M','T'].map(l=>`<div class="dcard" style="text-align:center;padding:8px">${av('primary-500',l)}<div style="font-size:11px;font-weight:700;margin-top:4px">Coach</div></div>`).join('')}</div>`,
    'ConversationalChat': `<div style="width:100%;display:flex;flex-direction:column;gap:6px"><div style="align-self:flex-start;background:var(--surface-sunken);border-radius:12px 12px 12px 4px;padding:6px 10px;font-size:12px">Bonjour 👋</div><div style="align-self:flex-end;background:var(--primary-500);color:#fff;border-radius:12px 12px 4px 12px;padding:6px 10px;font-size:12px">Salut !</div></div>`,
    'FormLayout': `<div style="width:100%;display:flex;flex-direction:column;gap:6px"><input class="input-demo" style="height:30px" placeholder="Nom" /><input class="input-demo" style="height:30px" placeholder="Email" /><div style="display:flex;justify-content:flex-end;gap:6px"><button class="btn btn--outline btn--sm">Annuler</button><button class="btn btn--primary btn--sm">Enregistrer</button></div></div>`,
    'LearningPathGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${[0,1].map(()=>`<div class="dcard" style="padding:0;overflow:hidden"><div style="height:24px;background:var(--g-cool-deep)"></div><div style="padding:6px"><div class="progressbar"><i style="width:50%"></i></div></div></div>`).join('')}</div>`,
    'NotificationCard': `<div class="dcard" style="display:flex;gap:10px;align-items:flex-start;border-left:3px solid var(--primary-500)"><span style="font-size:18px">🔔</span><div style="font-size:12px"><b>Nouveau badge</b><div style="font-size:11px;color:var(--text-muted)">Tu as débloqué « Régulier ».</div></div></div>`,
    'ResourceCardGrid': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%">${['📄','🎬'].map(e=>`<div style="display:flex;gap:6px;align-items:center;padding:7px;border:1px solid var(--border-subtle);border-radius:8px;font-size:11px">${e} Ressource</div>`).join('')}</div>`,
    'SkeletonTemplates': `<div style="width:100%;display:flex;gap:8px"><div class="skel" style="width:40px;height:40px;border-radius:8px"></div><div style="flex:1;display:flex;flex-direction:column;gap:6px"><div class="skel" style="width:80%"></div><div class="skel" style="width:55%"></div></div></div>`,
    'StepCard': `<div class="dcard" style="display:flex;gap:10px;align-items:center"><span style="width:30px;height:30px;border-radius:50%;background:var(--primary-600);color:#fff;display:grid;place-items:center;font-weight:700;flex-shrink:0">2</span><div><div style="font-weight:700;font-size:13px">Étape 2</div><div style="font-size:11px;color:var(--text-muted)">Configure ton profil</div></div></div>`,
    'TabsWithContent': `<div style="width:100%"><div style="display:flex;gap:4px;border-bottom:1px solid var(--border-default);margin-bottom:8px"><span style="padding:6px 12px;border-bottom:2px solid var(--primary-600);color:var(--primary-700);font-weight:600;font-size:12px">Aperçu</span><span style="padding:6px 12px;color:var(--text-muted);font-size:12px">Détails</span></div><div class="skel" style="width:70%"></div></div>`,
    'ViewerOverlay': `<div style="width:100%;background:var(--ink-900);border-radius:10px;padding:12px;color:#fff"><div style="display:flex;justify-content:space-between;font-size:11px;opacity:.8"><span>Viewer</span><span>✕</span></div><div style="height:32px;background:rgba(255,255,255,0.08);border-radius:6px;margin-top:8px"></div></div>`,
    'ToastContainer': `<div style="width:100%;display:flex;flex-direction:column;gap:6px;align-items:flex-end">${['Enregistré ✓','Lien copié'].map(t=>`<div class="dcard" style="display:flex;gap:8px;align-items:center;padding:8px 12px"><span class="dot-status" style="background:var(--success-base)"></span><span style="font-size:12px">${t}</span></div>`).join('')}</div>`,
    // ----- Lab & design proposals -----
    'VeilleCard — design proposals': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%"><div style="border-radius:10px;overflow:hidden;border:1px solid var(--border-default)"><div style="height:36px;background:var(--g-cool-deep)"></div><div style="padding:7px"><div style="font-size:10px;font-weight:700">Cover A</div><div style="font-size:9px;color:var(--text-muted)">grid vertical</div></div></div><div style="border-radius:10px;overflow:hidden;background:var(--primary-50);border:1px solid var(--primary-100)"><div style="height:36px;background:linear-gradient(120deg,var(--primary-100),var(--primary-200))"></div><div style="padding:7px"><div style="font-size:10px;font-weight:700">Tinted C</div><div style="font-size:9px;color:var(--text-muted)">grid vertical</div></div></div><div style="border-radius:10px;padding:8px;background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.7)"><div style="font-size:10px;font-weight:700">Glass L</div><div style="font-size:9px;color:var(--text-muted);margin-top:2px">grid vertical</div></div><div style="border-radius:10px;overflow:hidden;position:relative;border:1px solid var(--border-default)"><div style="height:60px;background:var(--g-cool-deep);display:flex;align-items:flex-end;padding:7px"><div style="font-size:10px;font-weight:700;color:#fff">Overlay D</div></div></div></div>`,
    'Lab A: ReflectivePrompt': `<div style="width:100%;background:var(--surface-focus);border-radius:10px;padding:12px"><div style="font-size:10px;color:var(--primary-300);font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px">Prompt du jour</div><div style="font-size:12px;color:var(--ink-200);line-height:1.55;font-style:italic;border-left:2px solid var(--primary-500);padding-left:8px">"Qu'as-tu appris sur toi-même cette semaine ?"</div><div style="margin-top:8px;height:26px;border-radius:6px;background:rgba(85,161,180,0.08);border:1px solid rgba(85,161,180,0.18);display:flex;align-items:center;padding:0 8px"><span style="font-size:10px;color:var(--primary-400)">Écrire ici…</span></div></div>`,
    'Lab B: Serif éditorial': `<div style="width:100%;background:var(--surface-paper);border-radius:10px;padding:14px"><div style="font-family:var(--font-serif);font-size:15px;font-style:italic;color:var(--text-strong);line-height:1.5;margin-bottom:8px">"Search my mind…"</div><div style="font-size:10px;color:var(--text-subtle);letter-spacing:0.05em">Journal réflexif · 15 min</div><div style="margin-top:10px;font-family:var(--font-body);font-size:11px;color:var(--text-muted);line-height:1.5">Playfair italic pour les surfaces réflexives. Sans-serif pour la navigation.</div></div>`,
    'Lab C: Glass ambient Card': `<div style="width:100%;background:var(--g-cool-deep);border-radius:10px;padding:12px"><div style="background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.15)"><div style="font-size:11px;font-weight:700;color:#fff">UX Design Avancé</div><div style="font-size:10px;color:rgba(255,255,255,0.65);margin-top:3px">8 leçons · 2h30</div><div style="margin-top:8px;height:3px;border-radius:3px;background:rgba(255,255,255,0.15)"><div style="width:45%;height:100%;background:rgba(255,255,255,0.55);border-radius:3px"></div></div></div></div>`,
  };

  /* ---------- CATALOG RENDER ---------- */
  const compName = (c) => {
    let n = c.codeName ? c.codeName.split('/').pop().replace('.tsx', '').trim() : c.name.split(' ')[0];
    return n.replace(/[^A-Za-z0-9]/g, '') || 'Component';
  };
  function snippetHTML(c) {
    const n = compName(c);
    const raw = `import { ${n} } from '@/components';`;
    return `<pre class="ccard__code"><button class="ccard__copy" data-copy="${raw}">copy</button><span class="k">import</span> { ${n} } <span class="k">from</span> <span class="s">'@/components'</span>;</pre>`;
  }
  const CAT_STYLE = {
    'Core':       'background:var(--primary-50);color:var(--primary-700)',
    'Patterns':   'background:var(--secondary-50);color:var(--secondary-700)',
    'Learning':   'background:var(--accent-50);color:var(--accent-700)',
    'Navigation': 'background:var(--ink-100);color:var(--ink-600)',
    'Content':    'background:var(--ink-100);color:var(--ink-600)',
    'Feedback':   'background:var(--info-bg);color:var(--info-fg)',
    'Modals':     'background:var(--ink-100);color:var(--ink-700)',
    'Forms':      'background:var(--ink-100);color:var(--ink-600)',
    'Cards':      'background:var(--ink-100);color:var(--ink-600)',
  };
  function cardHTML(c) {
    const preview = PREVIEWS[c.name]
      ? `<div class="ccard__preview">${PREVIEWS[c.name]}</div>`
      : `<div class="ccard__preview ccard__preview--empty">${esc(c.codeName || c.name)}</div>`;
    const kws = (c.keywords || []).slice(0, 4).map(k => `<span class="kw">${esc(k)}</span>`).join('');
    const used = (c.usedBy && c.usedBy.length)
      ? `<div class="ccard__used"><b>Utilisé par</b> · ${c.usedBy.slice(0, 4).map(esc).join(', ')}${c.usedBy.length > 4 ? ` +${c.usedBy.length - 4}` : ''}</div>`
      : '';
    const catStyle = CAT_STYLE[c.category] || 'background:var(--ink-100);color:var(--ink-600)';
    const devBadge = c.showcaseOnly
      ? `<span style="font-size:10px;padding:2px 8px;border-radius:999px;background:var(--warning-bg);color:var(--warning-fg);font-weight:700;line-height:1.5;white-space:nowrap">dev only</span>`
      : '';
    return `<article class="ccard" data-name="${esc(c.name).toLowerCase()}" data-cat="${esc(c.category)}" data-blob="${esc([c.name, c.description, c.category, c.codeName, (c.keywords||[]).join(' '), (c.usedBy||[]).join(' ')].join(' ')).toLowerCase()}">
      ${preview}
      <div class="ccard__body">
        <div class="ccard__head"><span class="ccard__name">${esc(c.name)}</span>${devBadge}<span class="cat-chip" style="${catStyle}">${esc(c.category)}</span></div>
        <div class="ccard__file">${esc(c.codeName || '—')}</div>
        <details class="ccard__details">
          <summary>Code &amp; détails</summary>
          <div class="ccard__reveal">
            <p class="ccard__desc">${md(c.description)}</p>
            ${snippetHTML(c)}
            ${kws ? `<div class="ccard__meta">${kws}</div>` : ''}
            ${used}
          </div>
        </details>
      </div>
    </article>`;
  }

  const sorted = [...COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
  $('#catalog').innerHTML = sorted.map(cardHTML).join('');

  /* ---------- FILTER CHIPS ---------- */
  const counts = {};
  COMPONENTS.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1; });
  const cats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  $('#filters').innerHTML =
    `<button class="filter-chip is-active" data-filter="all">Tous <span class="c">${COMPONENTS.length}</span></button>` +
    cats.map(c => `<button class="filter-chip" data-filter="${esc(c)}">${esc(c)} <span class="c">${counts[c]}</span></button>`).join('');

  /* ---------- SEARCH + FILTER ENGINE ---------- */
  let activeFilter = 'all';
  let query = '';
  const cards = $$('#catalog .ccard');
  const toks = $$('.tok');
  const foundationSections = ['colors', 'typography', 'spacing', 'elevation', 'motion', 'utility-tokens'].map(id => document.getElementById(id));
  function apply() {
    const q = query.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const okCat = activeFilter === 'all' || card.dataset.cat === activeFilter;
      const okQ = !q || card.dataset.blob.includes(q);
      const show = okCat && okQ;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    $('#no-results').hidden = visible > 0;

    // --- token search (foundations) ---
    let tokVisible = 0;
    toks.forEach(t => {
      const show = !q || (t.dataset.tok || '').toLowerCase().includes(q);
      t.style.display = show ? '' : 'none';
      if (show) tokVisible++;
    });
    // hide a foundation section if its tokens all filtered out (only when querying)
    foundationSections.forEach(sec => {
      if (!sec) return;
      if (!q) { sec.style.display = ''; return; }
      const localToks = sec.querySelectorAll('.tok');
      const anyVisible = [...localToks].some(t => t.style.display !== 'none');
      sec.style.display = anyVisible ? '' : 'none';
    });

    $('#result-count').textContent = q
      ? `${visible} composant${visible !== 1 ? 's' : ''} · ${tokVisible} token${tokVisible !== 1 ? 's' : ''}`
      : (activeFilter !== 'all' ? `${visible} / ${COMPONENTS.length}` : '');
  }

  $('#search').addEventListener('input', e => { query = e.target.value; apply(); });
  $('#filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-chip'); if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$('.filter-chip').forEach(b => b.classList.toggle('is-active', b === btn));
    apply();
    document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* keyboard: "/" focuses search */
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); $('#search').focus(); }
    if (e.key === 'Escape' && document.activeElement === $('#search')) { $('#search').value = ''; query = ''; apply(); }
  });

  /* ---------- COPY TO CLIPBOARD ---------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-copy]'); if (!el) return;
    navigator.clipboard?.writeText(el.dataset.copy).then(() => {
      if (el.classList.contains('ccard__copy') || el.classList.contains('copy-btn')) {
        const txt = el.textContent; el.textContent = 'copié ✓'; el.classList.add('copied');
        setTimeout(() => { el.textContent = txt; el.classList.remove('copied'); }, 1200);
      } else {
        const prev = el.getAttribute('title');
        el.setAttribute('title', 'Copié ✓');
        setTimeout(() => prev && el.setAttribute('title', prev), 1200);
      }
    });
  });

  /* ---------- SIDEBAR NAV ---------- */
  const NAV = [
    ['Get started', [['overview', 'Overview'], ['brand', 'Direction créative']]],
    ['Foundations', [['colors', 'Couleur'], ['typography', 'Typographie'], ['spacing', 'Spacing & rayons'], ['elevation', 'Élévation & glass'], ['motion', 'Motion & gradients'], ['utility-tokens', 'Tokens utilitaires']]],
    ['Specimens', [['specimens', 'Familles en détail']]],
    ['Bibliothèque', [['catalog-section', 'Composants & patterns', COMPONENTS.length]]],
  ];
  $('#sidebar').innerHTML = NAV.map(([label, items]) =>
    `<div class="sidebar__group"><div class="sidebar__label">${label}</div>${items.map(([id, name, count]) =>
      `<a class="sidebar__link" href="#${id}" data-id="${id}"><span>${name}</span>${count ? `<span class="count">${count}</span>` : ''}</a>`).join('')}</div>`
  ).join('');

  /* scrollspy */
  const navLinks = $$('.sidebar__link');
  const sections = navLinks.map(a => document.getElementById(a.dataset.id)).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.id === en.target.id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- BACK TO TOP ---------- */
  const totop = $('#totop');
  window.addEventListener('scroll', () => totop.classList.toggle('show', window.scrollY > 600), { passive: true });
})();
