"use strict";
const pptxgen = require("pptxgenjs");
const sharp   = require("sharp");
const fs      = require("fs");

// ── Brand tokens (source: src/index.css @theme) ──────────────────────────────
const C = {
  primary50:  "E8F4F7", primary100: "DCEBEF", primary200: "B9D7DF",
  primary300: "96C3CF", primary400: "73AFBF", primary500: "55A1B4",
  primary600: "4A8FA1", primary700: "3D7786", primary800: "2F5F6A",
  primary900: "1F3E45",
  secondary50:"FFF3EB", secondary500:"ED843A", secondary600:"C06920",
  accent400:  "F8B044",
  ink50:  "F9FAFB", ink100: "F3F4F6", ink200: "E5E7EB", ink300: "D1D5DB",
  ink500: "6B7280", ink900: "1A1A1A",
  dimWhite: "9FBEC6",
  white: "FFFFFF",
};
const DISPLAY = "League Spartan";
const BODY    = "Nunito";
const TOTAL   = 17;

// ── SVG → PNG helper ─────────────────────────────────────────────────────────
async function svgToPng(svg) {
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function bakeBgs() {
  // ga-dark — immersive teal night + glows
  const ga = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stop-color="#253E48"/><stop offset="1" stop-color="#1F3E45"/>
      </linearGradient>
      <radialGradient id="g1" cx="0.82" cy="0.15" r="0.5">
        <stop offset="0" stop-color="#F8B044" stop-opacity="0.16"/>
        <stop offset="1" stop-color="#F8B044" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="0.1" cy="0.88" r="0.45">
        <stop offset="0" stop-color="#55A1B4" stop-opacity="0.20"/>
        <stop offset="1" stop-color="#55A1B4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#g)"/>
    <rect width="2000" height="1125" fill="url(#g1)"/>
    <rect width="2000" height="1125" fill="url(#g2)"/>
  </svg>`;
  fs.writeFileSync("assets/ga-dark.png", await svgToPng(ga));

  // gb-split — left teal panel 45%, right warm cream
  const gb = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="1125" fill="#2F5F6A"/>
    <rect x="900" width="1100" height="1125" fill="#FBF7F2"/>
    <radialGradient id="gs" cx="0.45" cy="0.5" r="0.6" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#55A1B4" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#55A1B4" stop-opacity="0"/>
    </radialGradient>
    <rect width="900" height="1125" fill="url(#gs)"/>
  </svg>`;
  fs.writeFileSync("assets/gb-split.png", await svgToPng(gb));

  // gc-minimal — near-white with subtle teal tint
  const gc = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#EEF5F8"/>
        <stop offset="1" stop-color="#F8FCFD"/>
      </linearGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#gm)"/>
  </svg>`;
  fs.writeFileSync("assets/gc-minimal.png", await svgToPng(gc));

  // gd-content — pastel teal→cream diagonal
  const gd = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gc" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#E8F4F7"/>
        <stop offset="0.5" stop-color="#F5F0EA"/>
        <stop offset="1" stop-color="#FFF3EB"/>
      </linearGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#gc)"/>
  </svg>`;
  fs.writeFileSync("assets/gd-content.png", await svgToPng(gd));

  // ge-closing — dark teal inverted + orange glow bottom-right
  const ge = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1F3E45"/><stop offset="1" stop-color="#2F5F6A"/>
      </linearGradient>
      <radialGradient id="go" cx="0.88" cy="0.82" r="0.5">
        <stop offset="0" stop-color="#ED843A" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#ED843A" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="gt" cx="0.1" cy="0.1" r="0.45">
        <stop offset="0" stop-color="#55A1B4" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#55A1B4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#ge)"/>
    <rect width="2000" height="1125" fill="url(#go)"/>
    <rect width="2000" height="1125" fill="url(#gt)"/>
  </svg>`;
  fs.writeFileSync("assets/ge-closing.png", await svgToPng(ge));
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  fs.mkdirSync("assets", { recursive: true });
  await bakeBgs();

  const pres = new pptxgen();
  pres.defineLayout({ name: "TLS", width: 10, height: 5.625 });
  pres.layout  = "TLS";
  pres.author  = "The Learning Society";
  pres.title   = "Gabarits TLS — bibliothèque éditoriale 2026";

  const R  = pres.shapes.RECTANGLE;
  const OV = pres.shapes.OVAL;

  // Thin horizontal rule
  const rule = (s, x, y, w, color = C.ink200, h = 0.014) =>
    s.addShape(R, { x, y, w, h, fill: { color }, line: { width: 0 } });

  // Eyebrow label (all-caps, tracked)
  const eyebrow = (s, text, x, y, color, opts = {}) =>
    s.addText(text, {
      x, y, w: opts.w || 8, h: 0.25, margin: 0,
      fontFace: BODY, fontSize: opts.sz || 10.5, bold: true,
      color, charSpacing: 2.4,
    });

  // Footer
  const footer = (s, n, dark = false) =>
    s.addText(`The Learning Society  ·  ${n} / ${TOTAL}`, {
      x: 0.5, y: 5.3, w: 9, h: 0.22, margin: 0,
      fontFace: BODY, fontSize: 9.5,
      color: dark ? C.dimWhite : C.ink500, align: "right",
    });

  // Wordmark: dot + name
  const wm = (s, x, y, light = false) => {
    s.addShape(OV, { x, y: y + 0.06, w: 0.14, h: 0.14, fill: { color: C.accent400 }, line: { width: 0 } });
    s.addText("The Learning Society", {
      x: x + 0.22, y, w: 3.2, h: 0.28, margin: 0,
      fontFace: DISPLAY, fontSize: 12, bold: true,
      color: light ? C.white : C.primary800, charSpacing: 0.3, valign: "middle",
    });
  };

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Cover A (dark immersive)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/ga-dark.png" };
    wm(s, 0.55, 0.46, true);

    // Thin orange rule
    rule(s, 0.55, 2.42, 2.0, C.secondary500, 0.022);

    eyebrow(s, "PRÉSENTATION COMMERCIALE", 0.55, 2.62, C.accent400);

    s.addText("Construire l'organisation\napprenante de demain", {
      x: 0.55, y: 2.96, w: 8.2, h: 1.52, margin: 0,
      fontFace: DISPLAY, fontSize: 46, bold: true,
      color: C.white, lineSpacingMultiple: 0.96,
    });

    s.addText([
      { text: "Formation", options: { color: C.white, bold: true } },
      { text: "   ·   ", options: { color: C.primary400 } },
      { text: "Accompagnement", options: { color: C.white, bold: true } },
      { text: "   ·   ", options: { color: C.primary400 } },
      { text: "Learning App", options: { color: C.white, bold: true } },
    ], { x: 0.56, y: 4.6, w: 8.5, h: 0.32, margin: 0, fontFace: BODY, fontSize: 13.5 });

    s.addText("2026  ·  thelearningsociety.fr", {
      x: 6.8, y: 5.2, w: 3.1, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 10, color: C.dimWhite, align: "right",
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 2 — Cover B (split)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gb-split.png" };

    wm(s, 0.55, 0.46, true);

    // Ghost year
    s.addText("2026", {
      x: 0.28, y: 1.1, w: 4.0, h: 2.6, margin: 0,
      fontFace: DISPLAY, fontSize: 118, bold: true, color: C.primary700,
      transparency: 68,
    });

    s.addText("thelearningsociety.fr", {
      x: 0.56, y: 4.8, w: 3.6, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 11, color: C.dimWhite,
    });

    // Right panel
    rule(s, 5.05, 1.72, 1.6, C.primary500, 0.016);

    s.addText("Construire l'organisation\napprenante", {
      x: 5.05, y: 1.9, w: 4.6, h: 1.8, margin: 0,
      fontFace: DISPLAY, fontSize: 38, bold: true,
      color: C.ink900, lineSpacingMultiple: 0.97,
    });

    rule(s, 5.05, 3.8, 0.7, C.secondary500, 0.018);

    s.addText("Formation · Accompagnement · Learning App", {
      x: 5.05, y: 4.0, w: 4.6, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: C.ink500,
    });

    footer(s, 2);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 3 — Cover C (minimal centered)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.42);

    rule(s, 3.1, 0.92, 3.8, C.secondary500, 0.020);

    s.addText("La plateforme de\nl'organisation\napprenante", {
      x: 0.7, y: 1.08, w: 8.6, h: 3.0, margin: 0,
      fontFace: DISPLAY, fontSize: 58, bold: true,
      color: C.ink900, lineSpacingMultiple: 0.95, align: "center",
    });

    s.addText("Formation · Accompagnement · Learning App", {
      x: 1.5, y: 4.2, w: 7.0, h: 0.3, margin: 0,
      fontFace: BODY, fontSize: 13, color: C.ink500, align: "center",
    });

    footer(s, 3);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 4 — Section opener (dark) « 01 »
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/ga-dark.png" };

    s.addText("01", {
      x: -0.5, y: -0.6, w: 6, h: 4, margin: 0,
      fontFace: DISPLAY, fontSize: 180, bold: true, color: C.primary700,
      transparency: 55,
    });

    eyebrow(s, "AU PROGRAMME", 0.6, 2.42, C.dimWhite);
    rule(s, 0.6, 2.72, 1.4, C.accent400, 0.020);

    s.addText("Le contexte &\nles enjeux", {
      x: 0.6, y: 2.88, w: 8, h: 1.5, margin: 0,
      fontFace: DISPLAY, fontSize: 48, bold: true,
      color: C.white, lineSpacingMultiple: 0.96,
    });

    footer(s, 4, true);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Section opener (light) « 02 »
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };

    s.addText("02", {
      x: -0.4, y: -0.5, w: 6, h: 4, margin: 0,
      fontFace: DISPLAY, fontSize: 180, bold: true, color: C.primary100,
    });

    eyebrow(s, "NOTRE APPROCHE", 0.6, 2.42, C.primary600);
    rule(s, 0.6, 2.72, 1.4, C.secondary500, 0.020);

    s.addText("Ce que nous\nproposons", {
      x: 0.6, y: 2.88, w: 8, h: 1.5, margin: 0,
      fontFace: DISPLAY, fontSize: 48, bold: true,
      color: C.ink900, lineSpacingMultiple: 0.96,
    });

    footer(s, 5);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Contexte 2 colonnes
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    rule(s, 0.55, 1.0, 1.6, C.secondary500, 0.018);
    s.addText("Le défi\ndu moment", {
      x: 0.55, y: 1.06, w: 3.7, h: 1.1, margin: 0,
      fontFace: DISPLAY, fontSize: 32, bold: true, color: C.ink900, lineSpacingMultiple: 0.97,
    });

    s.addText("“Les entreprises forment, mais les compétences ne suivent pas le rythme du marché.”", {
      x: 0.55, y: 2.28, w: 3.7, h: 1.0, margin: 0,
      fontFace: DISPLAY, fontSize: 15.5, bold: true,
      color: C.primary700, lineSpacingMultiple: 1.1, italic: true,
    });

    s.addText("En 2026, 40 % des compétences techniques deviennent obsolètes en moins de 18 mois. Les organisations qui ne renforcent pas leur capacité à apprendre en continu prennent du retard.", {
      x: 0.55, y: 3.4, w: 3.7, h: 1.6, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.ink500, lineSpacingMultiple: 1.15,
    });

    s.addShape(R, { x: 4.7, y: 1.0, w: 0.012, h: 4.3, fill: { color: C.ink200 }, line: { width: 0 } });

    const rCol = [
      { ruleColor: C.primary500, title: "Formation",      body: "Des parcours certifiants co-construits avec des experts métier. Courts, actionnables, mis à jour chaque trimestre." },
      { ruleColor: C.primary300, title: "Accompagnement", body: "Du coaching 1-1 et des corrections personnalisées à chaque étape. L'humain au centre de l'apprentissage." },
      { ruleColor: C.ink300,     title: "Learning App",   body: "Une application mobile-first gamifiée pour ancrer les acquis au quotidien, en autonomie." },
    ];

    rCol.forEach((col, i) => {
      const ry = 1.0 + i * 1.52;
      rule(s, 5.0, ry, 4.5, col.ruleColor, 0.014);
      s.addText(col.title, {
        x: 5.0, y: ry + 0.07, w: 4.5, h: 0.36, margin: 0,
        fontFace: DISPLAY, fontSize: 17, bold: true, color: C.primary800,
      });
      s.addText(col.body, {
        x: 5.0, y: ry + 0.5, w: 4.5, h: 0.9, margin: 0,
        fontFace: BODY, fontSize: 12, color: C.ink500, lineSpacingMultiple: 1.12,
      });
    });

    footer(s, 6);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 7 — 3 métriques (no cards)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "RÉSULTATS", 0.55, 1.0, C.primary600);
    rule(s, 0.55, 1.3, 1.4, C.secondary500, 0.018);

    s.addText("L'impact, en chiffres", {
      x: 0.55, y: 1.38, w: 8.5, h: 0.7, margin: 0,
      fontFace: DISPLAY, fontSize: 38, bold: true, color: C.ink900,
    });

    const metrics = [
      { num: "+38 %", label: "d'engagement\nformation",     color: C.primary800, rc: C.primary500 },
      { num: "92 %",  label: "de taux\nde complétion",      color: C.primary700, rc: C.primary300 },
      { num: "4,8/5",      label: "de satisfaction\napprenants", color: C.secondary600, rc: C.secondary500 },
    ];

    const mW = 2.8, mX0 = 0.55, mGap = 0.28;
    metrics.forEach((m, i) => {
      const mx = mX0 + i * (mW + mGap);
      rule(s, mx, 2.52, mW, m.rc, 0.016);
      s.addText(`0${i + 1}`, {
        x: mx, y: 2.6, w: 0.5, h: 0.26, margin: 0,
        fontFace: BODY, fontSize: 10, bold: true, color: C.ink300,
      });
      s.addText(m.num, {
        x: mx, y: 2.94, w: mW, h: 0.9, margin: 0,
        fontFace: DISPLAY, fontSize: 64, bold: true, color: m.color,
      });
      s.addText(m.label, {
        x: mx, y: 3.92, w: mW, h: 0.6, margin: 0,
        fontFace: BODY, fontSize: 13.5, color: C.ink500, lineSpacingMultiple: 1.1,
      });
    });

    s.addText("Données illustratives — à remplacer par vos chiffres réels.", {
      x: 0.55, y: 4.94, w: 8.5, h: 0.24, margin: 0,
      fontFace: BODY, fontSize: 10, italic: true, color: C.ink300,
    });

    footer(s, 7);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Pull quote
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gd-content.png" };
    wm(s, 0.55, 0.38);

    s.addText("«", {
      x: 0.3, y: 0.88, w: 1.2, h: 1.6, margin: 0,
      fontFace: DISPLAY, fontSize: 100, bold: true, color: C.primary200,
    });

    s.addText("L'apprentissage continu n'est plus\nun avantage compétitif — c'est\nune condition de survie.", {
      x: 0.55, y: 1.3, w: 8.5, h: 2.1, margin: 0,
      fontFace: DISPLAY, fontSize: 28, bold: true,
      color: C.primary900, lineSpacingMultiple: 1.08,
    });

    rule(s, 0.7, 3.72, 1.4, C.secondary500, 0.020);

    s.addText("Direction RH, entreprise CAC 40  ·  2025", {
      x: 0.7, y: 3.88, w: 6, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.ink500, italic: true,
    });

    footer(s, 8);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 9 — 3 colonnes éditoriales (no cards)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "NOS PILIERS", 0.55, 1.0, C.primary600);
    s.addText("Trois leviers pour une organisation apprenante", {
      x: 0.55, y: 1.26, w: 8.5, h: 0.55, margin: 0,
      fontFace: DISPLAY, fontSize: 28, bold: true, color: C.ink900,
    });

    const cols = [
      { num: "01", rc: C.primary500, nc: C.primary600, title: "Formation",      body: "Des parcours courts et certifiants, co-construits avec des experts métier. Mis à jour chaque trimestre pour suivre l'évolution des métiers." },
      { num: "02", rc: C.primary300, nc: C.primary500, title: "Accompagnement", body: "Coaching 1-1, corrections personnalisées, suivi de progression. L'humain au centre de chaque parcours d'apprentissage." },
      { num: "03", rc: C.secondary500, nc: C.secondary600, title: "Learning App", body: "Mobile-first, gamifiée, intégrée aux outils existants. L'apprentissage s'inscrit dans les pratiques quotidiennes." },
    ];

    const cW = 2.84, cX0 = 0.55, cGap = 0.24;
    cols.forEach((col, i) => {
      const cx = cX0 + i * (cW + cGap);
      rule(s, cx, 2.08, cW, col.rc, 0.016);
      s.addText(col.num, {
        x: cx, y: 2.15, w: 0.5, h: 0.26, margin: 0,
        fontFace: BODY, fontSize: 9.5, bold: true, color: col.nc, charSpacing: 1.2,
      });
      s.addText(col.title, {
        x: cx, y: 2.46, w: cW, h: 0.5, margin: 0,
        fontFace: DISPLAY, fontSize: 21, bold: true, color: C.primary800,
      });
      s.addText(col.body, {
        x: cx, y: 3.04, w: cW, h: 1.8, margin: 0,
        fontFace: BODY, fontSize: 12, color: C.ink500, lineSpacingMultiple: 1.14,
      });
    });

    footer(s, 9);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Processus 4 étapes
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "MÉTHODOLOGIE", 0.55, 1.0, C.primary600);
    s.addText("Un parcours en 4 étapes", {
      x: 0.55, y: 1.26, w: 8.5, h: 0.55, margin: 0,
      fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink900,
    });

    rule(s, 0.88, 2.74, 8.24, C.ink200, 0.012);

    const steps = [
      { n: "1", title: "Diagnostic",  desc: "Audit des compétences actuelles et des besoins stratégiques." },
      { n: "2", title: "Conception",  desc: "Co-design des parcours avec vos experts métier." },
      { n: "3", title: "Déploiement", desc: "Lancement, onboarding et activation des apprenants." },
      { n: "4", title: "Mesure",      desc: "Suivi des indicateurs et ajustement continu." },
    ];

    const sW = 2.08, sX0 = 0.7, sGap = 0.3;
    steps.forEach((step, i) => {
      const sx = sX0 + i * (sW + sGap);
      const isFirst = i === 0;
      s.addShape(OV, {
        x: sx + 0.84, y: 2.4, w: 0.4, h: 0.4,
        fill: { color: isFirst ? C.primary600 : C.white },
        line: isFirst ? { width: 0 } : { color: C.primary300, width: 1.5 },
      });
      s.addText(step.n, {
        x: sx + 0.84, y: 2.4, w: 0.4, h: 0.4, margin: 0,
        fontFace: BODY, fontSize: 12, bold: true,
        color: isFirst ? C.white : C.primary600, align: "center", valign: "middle",
      });
      s.addText(step.title, {
        x: sx, y: 2.96, w: sW, h: 0.36, margin: 0,
        fontFace: DISPLAY, fontSize: 16, bold: true, color: C.primary800, align: "center",
      });
      s.addText(step.desc, {
        x: sx, y: 3.38, w: sW, h: 1.2, margin: 0,
        fontFace: BODY, fontSize: 11.5, color: C.ink500, align: "center", lineSpacingMultiple: 1.12,
      });
    });

    footer(s, 10);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Comparaison 2 panneaux
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    s.addText("Avant vs. Après", {
      x: 0.55, y: 0.94, w: 8.5, h: 0.55, margin: 0,
      fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink900,
    });

    s.addShape(R, { x: 4.94, y: 1.72, w: 0.012, h: 3.6, fill: { color: C.ink200 }, line: { width: 0 } });

    eyebrow(s, "LE DÉFI ACTUEL", 0.55, 1.74, C.ink500, { sz: 9.5 });

    const leftItems = [
      "Formations longues et peu actionnables",
      "Pas de suivi individualisé de la progression",
      "Compétences difficiles à mesurer et valoriser",
    ];
    leftItems.forEach((t, i) => {
      const iy = 2.22 + i * 1.04;
      rule(s, 0.55, iy, 4.0, C.ink200, 0.012);
      s.addText(t, {
        x: 0.55, y: iy + 0.08, w: 4.0, h: 0.8, margin: 0,
        fontFace: BODY, fontSize: 12.5, color: C.ink500, lineSpacingMultiple: 1.12,
      });
    });

    eyebrow(s, "NOTRE RÉPONSE", 5.22, 1.74, C.primary600, { sz: 9.5 });

    const rightItems = [
      "Parcours courts, certifiants et mis à jour en continu",
      "Coaching 1-1 et corrections personnalisées par expert",
      "Passeport compétences intégré et exportable",
    ];
    rightItems.forEach((t, i) => {
      const iy = 2.22 + i * 1.04;
      rule(s, 5.22, iy, 4.28, C.primary300, 0.012);
      s.addText(t, {
        x: 5.22, y: iy + 0.08, w: 4.28, h: 0.8, margin: 0,
        fontFace: BODY, fontSize: 12.5, color: C.primary800, lineSpacingMultiple: 1.12,
      });
    });

    footer(s, 11);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Statement pleine page
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gd-content.png" };
    wm(s, 0.55, 0.38);

    s.addText([
      { text: "L'apprentissage ", options: { color: C.ink900 } },
      { text: "continu",          options: { color: C.primary600 } },
      { text: "\nchange tout.",    options: { color: C.ink900 } },
    ], {
      x: 0.55, y: 1.28, w: 8.8, h: 2.0, margin: 0,
      fontFace: DISPLAY, fontSize: 54, bold: true, lineSpacingMultiple: 0.96,
    });

    rule(s, 0.55, 3.48, 8.9, C.ink200, 0.012);

    [
      "01  Engagement · rétention · performance",
      "02  Des compétences mesurables, valorisables, exportables",
      "03  Un avantage compétitif documenté",
    ].forEach((t, i) => {
      s.addText(t, {
        x: 0.55, y: 3.66 + i * 0.34, w: 8.8, h: 0.3, margin: 0,
        fontFace: BODY, fontSize: 13.5, color: C.ink500, charSpacing: 0.5,
      });
    });

    footer(s, 12);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 13 — Équipe 2×2
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "L'ÉQUIPE", 0.55, 1.0, C.primary600);
    s.addText("Des expertises complémentaires", {
      x: 0.55, y: 1.26, w: 8.5, h: 0.55, margin: 0,
      fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink900,
    });

    const team = [
      { name: "Chloé M.",    role: "Fondatrice & CEO",           bio: "10 ans en EdTech B2B. Ancienne resp. L&D CAC 40. Spécialiste organisation apprenante." },
      { name: "Nom Prénom",  role: "Directeur Pédagogique",      bio: "Expert en ingénierie pédagogique. 200+ parcours conçus pour des ETI et grands groupes." },
      { name: "Nom Prénom",  role: "Lead Coach & Qualité",       bio: "Coach certifiée ICF. 1 500 h d'accompagnement individuel. Spécialiste compétences soft." },
      { name: "Nom Prénom",  role: "CTO & Learning Engineering", bio: "Full-stack developer, ex-startup SaaS RH. Architecture de la plateforme TLS depuis 2023." },
    ];

    const tW = 4.2, tGap = 0.5;
    team.forEach((p, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const tx = 0.55 + col * (tW + tGap);
      const ty = 2.16 + row * 1.56;
      rule(s, tx, ty, tW, col === 0 ? C.primary400 : C.ink200, 0.014);
      s.addText(p.name, {
        x: tx, y: ty + 0.08, w: tW, h: 0.34, margin: 0,
        fontFace: DISPLAY, fontSize: 16.5, bold: true, color: C.primary800,
      });
      s.addText(p.role, {
        x: tx, y: ty + 0.44, w: tW, h: 0.26, margin: 0,
        fontFace: BODY, fontSize: 10.5, bold: true, color: C.primary600, charSpacing: 0.5,
      });
      s.addText(p.bio, {
        x: tx, y: ty + 0.72, w: tW, h: 0.7, margin: 0,
        fontFace: BODY, fontSize: 11, color: C.ink500, lineSpacingMultiple: 1.1,
      });
    });

    footer(s, 13);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 14 — Pricing éditorial (no card containers)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "OFFRES & TARIFS", 0.55, 1.0, C.primary600);
    s.addText("Choisissez votre formule", {
      x: 0.55, y: 1.26, w: 8.5, h: 0.55, margin: 0,
      fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink900,
    });

    const offers = [
      {
        tier: "ESSENTIEL", price: "490 €", per: "/mois", featured: false,
        features: ["Accès plateforme · 5 apprenants", "3 parcours inclus", "Support email", "Passeport compétences"],
        cta: "Démarrer →",
      },
      {
        tier: "RECOMMANDÉ", price: "1 290 €", per: "/mois", featured: true,
        features: ["Accès plateforme · 25 apprenants", "Parcours illimités", "Coaching 1-1 mensuel", "Corrections personnalisées", "Analytics avancés"],
        cta: "Choisir cette offre →",
      },
      {
        tier: "ENTREPRISE", price: "Sur devis", per: "", featured: false,
        features: ["Apprenants illimités", "Accompagnement dédié", "Intégration SIRH/LMS", "SLA + support 7j/7", "Formation formateurs"],
        cta: "Nous contacter →",
      },
    ];

    const oW = 2.86, oX0 = 0.44, oGap = 0.24;
    offers.forEach((o, i) => {
      const ox = oX0 + i * (oW + oGap);

      rule(s, ox, 2.12, oW, o.featured ? C.primary500 : C.ink200, o.featured ? 0.028 : 0.014);

      s.addText(o.tier, {
        x: ox, y: 2.22, w: oW, h: 0.22, margin: 0,
        fontFace: BODY, fontSize: 9, bold: true,
        color: o.featured ? C.primary600 : C.ink300, charSpacing: 1.8,
      });

      s.addText(o.price, {
        x: ox, y: 2.5, w: oW - 0.5, h: 0.7, margin: 0,
        fontFace: DISPLAY, fontSize: 34, bold: true,
        color: o.featured ? C.primary800 : C.ink900,
      });
      if (o.per) {
        s.addText(o.per, {
          x: ox + 1.72, y: 2.72, w: 1.0, h: 0.26, margin: 0,
          fontFace: BODY, fontSize: 12, color: C.ink500, valign: "bottom",
        });
      }

      rule(s, ox, 3.3, oW, C.ink200, 0.010);

      o.features.forEach((f, fi) => {
        s.addText(`— ${f}`, {
          x: ox, y: 3.42 + fi * 0.29, w: oW, h: 0.27, margin: 0,
          fontFace: BODY, fontSize: 10.5, color: C.ink500,
        });
      });

      s.addText(o.cta, {
        x: ox, y: 4.92, w: oW, h: 0.28, margin: 0,
        fontFace: BODY, fontSize: 12, bold: true,
        color: o.featured ? C.primary600 : C.ink500,
      });
    });

    footer(s, 14);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 15 — Cas client (split panel)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };

    s.addShape(R, {
      x: 0, y: 0, w: 4.15, h: 5.625,
      fill: { color: C.primary800 }, line: { width: 0 },
    });

    s.addText("«", {
      x: 0.25, y: 0.48, w: 1.5, h: 1.2, margin: 0,
      fontFace: DISPLAY, fontSize: 56, bold: true, color: C.primary600,
    });

    s.addText("“Depuis TLS, nos managers ont enfin un vocabulaire commun autour des compétences. Et ça, ça change tout dans les évaluations.”", {
      x: 0.32, y: 1.32, w: 3.56, h: 2.4, margin: 0,
      fontFace: DISPLAY, fontSize: 16.5, bold: true,
      color: C.white, lineSpacingMultiple: 1.1, italic: true,
    });

    rule(s, 0.32, 3.86, 1.2, C.accent400, 0.018);

    s.addText("Directrice RH\nGroupe industriel, 1 200 salariés", {
      x: 0.32, y: 4.04, w: 3.5, h: 0.6, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: C.dimWhite, lineSpacingMultiple: 1.1,
    });

    wm(s, 4.55, 0.38);

    eyebrow(s, "CAS CLIENT", 4.55, 1.02, C.primary600);
    s.addText("Groupe industriel\n1 200 collaborateurs", {
      x: 4.55, y: 1.28, w: 5.1, h: 0.9, margin: 0,
      fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink900, lineSpacingMultiple: 0.97,
    });

    const kpis = [
      { num: "×2,4", label: "taux d'engagement",     sub: "vs. année précédente" },
      { num: "89 %", label: "rétention à 6 mois",    sub: "des compétences acquises" },
      { num: "–18 %", label: "turnover direction", sub: "sur le périmètre L&D" },
    ];

    kpis.forEach((k, i) => {
      const ky = 2.42 + i * 0.96;
      rule(s, 4.55, ky, 5.0, C.ink200, 0.012);
      s.addText(k.num, {
        x: 4.55, y: ky + 0.08, w: 1.5, h: 0.52, margin: 0,
        fontFace: DISPLAY, fontSize: 30, bold: true, color: C.primary700,
      });
      s.addText(k.label, {
        x: 6.14, y: ky + 0.1, w: 3.4, h: 0.28, margin: 0,
        fontFace: BODY, fontSize: 13.5, bold: true, color: C.ink900, valign: "middle",
      });
      s.addText(k.sub, {
        x: 6.14, y: ky + 0.38, w: 3.4, h: 0.24, margin: 0,
        fontFace: BODY, fontSize: 10.5, color: C.ink500,
      });
    });

    footer(s, 15);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 16 — 2 col contenu (EN PRATIQUE)
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/gc-minimal.png" };
    wm(s, 0.55, 0.38);

    eyebrow(s, "EN PRATIQUE", 0.55, 1.0, C.primary600);
    rule(s, 0.55, 1.3, 1.6, C.secondary500, 0.018);

    s.addText("Comment ça\nse passe ?", {
      x: 0.55, y: 1.38, w: 3.8, h: 1.1, margin: 0,
      fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink900, lineSpacingMultiple: 0.97,
    });

    s.addText("De la signature à la première session : 10 jours ouvrés. Onboarding clé en main, sans charge IT de votre côté.", {
      x: 0.55, y: 2.6, w: 3.8, h: 0.9, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: C.primary700, lineSpacingMultiple: 1.12,
    });

    s.addText("PRÊT EN", {
      x: 0.55, y: 3.6, w: 1.5, h: 0.22, margin: 0,
      fontFace: BODY, fontSize: 9.5, bold: true, color: C.ink300, charSpacing: 1.5,
    });
    s.addText("10 jours", {
      x: 0.55, y: 3.84, w: 3.5, h: 0.56, margin: 0,
      fontFace: DISPLAY, fontSize: 38, bold: true, color: C.primary800,
    });

    s.addShape(R, { x: 4.7, y: 1.0, w: 0.012, h: 4.3, fill: { color: C.ink200 }, line: { width: 0 } });

    const subs = [
      { title: "Intégration",           body: "Connexion SSO, import RH ou invitations manuelles. Compatible SIRH et LMS existants." },
      { title: "Onboarding apprenants", body: "Positionnement initial automatisé. Parcours recommandé dès J+1. Notification et relances intégrées." },
      { title: "Pilotage & reporting",  body: "Dashboard manager en temps réel. Export mensuel automatique. Bilan trimestriel avec votre coach dédié." },
    ];

    subs.forEach((sub, i) => {
      const sy = 1.0 + i * 1.52;
      rule(s, 5.0, sy, 4.5, C.primary300, 0.014);
      s.addText(sub.title, {
        x: 5.0, y: sy + 0.08, w: 4.5, h: 0.34, margin: 0,
        fontFace: DISPLAY, fontSize: 16.5, bold: true, color: C.primary800,
      });
      s.addText(sub.body, {
        x: 5.0, y: sy + 0.48, w: 4.5, h: 0.88, margin: 0,
        fontFace: BODY, fontSize: 12, color: C.ink500, lineSpacingMultiple: 1.12,
      });
    });

    footer(s, 16);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SLIDE 17 — Clôture
  // ═══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { path: "assets/ge-closing.png" };
    wm(s, 0.55, 0.46, true);

    s.addText("Et\nmaintenant ?", {
      x: 0.55, y: 1.24, w: 7.5, h: 2.2, margin: 0,
      fontFace: DISPLAY, fontSize: 72, bold: true,
      color: C.white, lineSpacingMultiple: 0.94,
    });

    rule(s, 0.55, 3.52, 2.4, C.accent400, 0.022);

    s.addText("Un appel de 30 min pour comprendre votre contexte et vous proposer une roadmap sur-mesure — sans engagement.", {
      x: 0.55, y: 3.72, w: 6.8, h: 0.68, margin: 0,
      fontFace: BODY, fontSize: 14, color: C.dimWhite, lineSpacingMultiple: 1.12,
    });

    s.addShape(R, {
      x: 0.55, y: 4.56, w: 2.9, h: 0.56,
      fill: { color: C.secondary500 }, line: { width: 0 },
    });
    s.addText("Prendre rendez-vous", {
      x: 0.55, y: 4.56, w: 2.9, h: 0.56, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true,
      color: C.white, align: "center", valign: "middle",
    });

    s.addText("chloe@thelearningsociety.fr", {
      x: 4.0, y: 4.68, w: 5.6, h: 0.32, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.dimWhite, align: "right",
    });
  }

  // ── Write ─────────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "../TLS-gabarits-bibliotheque.pptx" });
  console.log("✅  TLS-gabarits-bibliotheque.pptx written — 17 slides");
})();
