/**
 * TLS — Deck post-POC Orange × Dinootoo
 * Présentation co-direction Learning App + prochaines étapes
 *
 * Usage: node orange-poc.js
 * Output: ../TLS-deck-orange-poc-dinootoo.pptx
 */

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const {
  FaUserGraduate, FaRobot, FaMobileAlt, FaChartBar,
  FaCheckCircle, FaStar, FaLightbulb, FaTrophy,
  FaArrowRight, FaUsers, FaClock, FaSmile,
  FaPlay, FaBookOpen, FaComments, FaBullseye,
} = require("react-icons/fa");

// ---- TLS brand tokens ----
const C = {
  primary50: "E8F4F7", primary100: "DCEBEF",
  primary500: "55A1B4", primary600: "4A8FA1",
  primary700: "3D7786", primary800: "2F5F6A", primary900: "1F3E45",
  secondary50: "FFF3EB", secondary500: "ED843A", secondary600: "C06920",
  accent400: "F8B044",
  ink900: "252B37", ink700: "374151", muted: "6B7280",
  border: "E6EDEF", white: "FFFFFF",
  successBg: "EDF4F3", success: "9DBEBA",
};
const DISPLAY = "League Spartan";
const BODY = "Nunito";

async function svgToPng(svg) {
  return await sharp(Buffer.from(svg)).png().toBuffer();
}
async function iconPng(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color: "#" + color, size: String(size) })
  );
  return "image/png;base64," + (await svgToPng(svg)).toString("base64");
}
const makeShadow = () => ({ type: "outer", color: C.primary900, blur: 9, offset: 3, angle: 90, opacity: 0.10 });
const makeShadowWarm = () => ({ type: "outer", color: C.secondary500, blur: 12, offset: 3, angle: 90, opacity: 0.14 });

// ---- helper: eyebrow label ----
function addEyebrow(slide, text, x, y, color) {
  slide.addText(text, {
    x, y, w: 9, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true,
    color: color || C.primary600, charSpacing: 2.6,
  });
}

// ---- helper: slide title ----
function addTitle(slide, text, x, y, color) {
  slide.addText(text, {
    x, y, w: 9.2, h: 0.8, margin: 0,
    fontFace: DISPLAY, fontSize: 30, bold: true,
    color: color || C.ink900,
  });
}

// ---- helper: footer ----
function addFooter(slide, pageNum, total) {
  slide.addText("The Learning Society", {
    x: 0.5, y: 5.22, w: 4, h: 0.22, margin: 0,
    fontFace: DISPLAY, fontSize: 9.5, bold: true, color: "A8C4CB",
  });
  if (pageNum) {
    slide.addText(`${pageNum}/${total}`, {
      x: 8.8, y: 5.22, w: 0.8, h: 0.22, margin: 0,
      fontFace: BODY, fontSize: 9.5, color: "A8C4CB", align: "right",
    });
  }
}

(async () => {
  // ── Generate background assets ──────────────────────────────────────────────

  // Dark teal cover (same as existing decks)
  const coverSvg = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2F5F6A"/>
        <stop offset="0.55" stop-color="#28525C"/>
        <stop offset="1" stop-color="#1F3E45"/>
      </linearGradient>
      <radialGradient id="glow1" cx="0.82" cy="0.10" r="0.50">
        <stop offset="0" stop-color="#F8B044" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#F8B044" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="0.05" cy="0.92" r="0.45">
        <stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#55A1B4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#g)"/>
    <rect width="2000" height="1125" fill="url(#glow1)"/>
    <rect width="2000" height="1125" fill="url(#glow2)"/>
  </svg>`;
  fs.writeFileSync("assets/cover-bg.png", await svgToPng(coverSvg));

  // Content pastel gradient
  const contentSvg = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#E8F4F7"/>
        <stop offset="0.5" stop-color="#FBF7F2"/>
        <stop offset="1" stop-color="#FFF3EB"/>
      </linearGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#cg)"/>
  </svg>`;
  fs.writeFileSync("assets/content-bg.png", await svgToPng(contentSvg));

  // ── Rasterize icons ─────────────────────────────────────────────────────────
  const icUsers      = await iconPng(FaUsers, C.white);
  const icClock      = await iconPng(FaClock, C.white);
  const icSmile      = await iconPng(FaStar, C.white);
  const icGrad       = await iconPng(FaUserGraduate, C.white);
  const icRobot      = await iconPng(FaRobot, C.white);
  const icMobile     = await iconPng(FaMobileAlt, C.white);
  const icChart      = await iconPng(FaChartBar, C.white);
  const icCheck      = await iconPng(FaCheckCircle, C.white);
  const icLight      = await iconPng(FaLightbulb, C.white);
  const icTrophy     = await iconPng(FaTrophy, C.white);
  const icPlay       = await iconPng(FaPlay, C.white);
  const icBook       = await iconPng(FaBookOpen, C.white);
  const icComments   = await iconPng(FaComments, C.white);
  const icBullseye   = await iconPng(FaBullseye, C.white);

  // ── Build presentation ───────────────────────────────────────────────────────
  const pres = new pptxgen();
  pres.defineLayout({ name: "TLS", width: 10, height: 5.625 });
  pres.layout = "TLS";
  pres.author = "The Learning Society";
  pres.title = "Bilan POC Orange × TLS — Ingénieur pédagogique augmenté avec Dinootoo";

  const TOTAL = 12;

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — COVER
  // ═══════════════════════════════════════════════════════════════════════════
  const s1 = pres.addSlide();
  s1.background = { path: "assets/cover-bg.png" };

  // Wordmark
  s1.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s1.addText("The Learning Society", {
    x: 0.80, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });

  // Orange badge top-right
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.6, y: 0.38, w: 2.08, h: 0.42, rectRadius: 0.12,
    fill: { color: C.secondary500 }, line: { color: C.secondary500, width: 0 },
  });
  s1.addText("× Orange", {
    x: 7.6, y: 0.38, w: 2.08, h: 0.42, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle",
  });

  // Eyebrow
  s1.addText("BILAN POST-POC", {
    x: 0.6, y: 2.55, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: C.accent400, charSpacing: 2.4,
  });

  // Main title
  s1.addText("Ingénieur pédagogique\naugmenté avec Dinootoo", {
    x: 0.55, y: 2.88, w: 8.6, h: 1.52, margin: 0,
    fontFace: DISPLAY, fontSize: 42, bold: true, color: C.white, lineSpacingMultiple: 0.96,
  });

  // Tagline
  s1.addText([
    { text: "Résultats", options: { color: C.white, bold: true } },
    { text: "   ·   ", options: { color: C.primary500 } },
    { text: "Apprentissages", options: { color: C.white, bold: true } },
    { text: "   ·   ", options: { color: C.primary500 } },
    { text: "Prochaines étapes", options: { color: C.white, bold: true } },
  ], { x: 0.6, y: 4.54, w: 8.5, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13 });

  // Date
  s1.addText("Juin 2026  ·  thelearningsociety.fr", {
    x: 0.6, y: 5.08, w: 8, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 10.5, color: "9FBEC6",
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — SOMMAIRE
  // ═══════════════════════════════════════════════════════════════════════════
  const s2 = pres.addSlide();
  s2.background = { path: "assets/content-bg.png" };
  addEyebrow(s2, "SOMMAIRE", 0.6, 0.52);
  addTitle(s2, "Au programme", 0.57, 0.84);

  const agenda = [
    { n: "01", t: "Le contexte du POC", d: "Pourquoi Orange, pourquoi Dinootoo ?" },
    { n: "02", t: "Ce qu'on a construit ensemble", d: "Le parcours, le périmètre, l'expérience" },
    { n: "03", t: "Résultats & apprentissages", d: "Chiffres clés, retours terrain, insights" },
    { n: "04", t: "Et maintenant ?", d: "Roadmap, proposition de suite, next steps" },
  ];

  agenda.forEach((item, i) => {
    const y = 1.72 + i * 0.82;
    // Number circle
    s2.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.04, w: 0.56, h: 0.56,
      fill: { color: i === 0 ? C.primary600 : C.primary100 },
      line: { color: i === 0 ? C.primary600 : C.primary100, width: 0 },
    });
    s2.addText(item.n, {
      x: 0.6, y: y + 0.04, w: 0.56, h: 0.56, margin: 0,
      fontFace: DISPLAY, fontSize: 15, bold: true,
      color: i === 0 ? C.white : C.primary700, align: "center", valign: "middle",
    });
    // Title
    s2.addText(item.t, {
      x: 1.34, y: y, w: 5, h: 0.34, margin: 0,
      fontFace: DISPLAY, fontSize: 16, bold: true, color: C.ink900,
    });
    // Desc
    s2.addText(item.d, {
      x: 1.34, y: y + 0.35, w: 5.4, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.muted,
    });
    // Divider line
    if (i < agenda.length - 1) {
      s2.addShape(pres.shapes.LINE, {
        x: 0.6, y: y + 0.7, w: 9, h: 0,
        line: { color: C.border, width: 1 },
      });
    }
  });
  addFooter(s2, 2, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — CONTEXTE DU POC (2 col)
  // ═══════════════════════════════════════════════════════════════════════════
  const s3 = pres.addSlide();
  s3.background = { path: "assets/content-bg.png" };
  addEyebrow(s3, "LE CONTEXTE", 0.6, 0.52);
  addTitle(s3, "Un vrai besoin terrain, une réponse sur mesure", 0.57, 0.84);

  // Left card — Le constat Orange
  s3.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.76, w: 4.3, h: 3.38,
    fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
  });
  // Orange accent bar
  s3.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.76, w: 0.1, h: 3.38,
    fill: { color: C.secondary500 }, line: { color: C.secondary500, width: 0 },
  });
  s3.addText("Le constat Orange", {
    x: 0.82, y: 1.94, w: 3.8, h: 0.36, margin: 0,
    fontFace: DISPLAY, fontSize: 15, bold: true, color: C.secondary600,
  });
  const contextLeft = [
    "Les ingénieurs pédagogiques produisent des contenus de + en + complexes, avec des délais raccourcis.",
    "L'IA générative crée de nouvelles opportunités mais aussi de nouveaux risques qualité.",
    "Besoin : former les IP à maîtriser Dinootoo sans perdre leur posture critique d'expert.",
  ];
  contextLeft.forEach((line, i) => {
    s3.addShape(pres.shapes.OVAL, {
      x: 0.84, y: 2.46 + i * 0.78, w: 0.18, h: 0.18,
      fill: { color: C.secondary500 }, line: { color: C.secondary500, width: 0 },
    });
    s3.addText(line, {
      x: 1.14, y: 2.38 + i * 0.78, w: 3.48, h: 0.56, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.ink900, lineSpacingMultiple: 1.05,
    });
  });

  // Right card — Notre promesse
  s3.addShape(pres.shapes.RECTANGLE, {
    x: 5.18, y: 1.76, w: 4.3, h: 3.38,
    fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
  });
  // Teal accent bar
  s3.addShape(pres.shapes.RECTANGLE, {
    x: 5.18, y: 1.76, w: 0.1, h: 3.38,
    fill: { color: C.primary600 }, line: { color: C.primary600, width: 0 },
  });
  s3.addText("Notre réponse", {
    x: 5.45, y: 1.94, w: 3.8, h: 0.36, margin: 0,
    fontFace: DISPLAY, fontSize: 15, bold: true, color: C.primary700,
  });
  const contextRight = [
    "Un parcours certifiant de 40h, co-construit avec Orange, ancré dans leurs cas d'usage réels.",
    "5 étapes progressives : de la découverte Dinootoo à la production autonome en situation pro.",
    "Une Learning App mobile-first avec suivi de progression, badges et coaching intégré.",
  ];
  contextRight.forEach((line, i) => {
    s3.addShape(pres.shapes.OVAL, {
      x: 5.47, y: 2.46 + i * 0.78, w: 0.18, h: 0.18,
      fill: { color: C.primary600 }, line: { color: C.primary600, width: 0 },
    });
    s3.addText(line, {
      x: 5.77, y: 2.38 + i * 0.78, w: 3.48, h: 0.56, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.ink900, lineSpacingMultiple: 1.05,
    });
  });
  addFooter(s3, 3, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — DIVIDER "Ce qu'on a construit ensemble"
  // ═══════════════════════════════════════════════════════════════════════════
  const s4 = pres.addSlide();
  s4.background = { path: "assets/cover-bg.png" };

  s4.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s4.addText("The Learning Society", {
    x: 0.80, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });

  // Ghost number — placed bottom-right to avoid title collision
  s4.addText("02", {
    x: 7.2, y: 3.5, w: 2.5, h: 1.6, margin: 0,
    fontFace: DISPLAY, fontSize: 96, bold: true, color: "2A5560", align: "right", valign: "middle",
  });

  s4.addText("Ce qu'on a\nconstruit ensemble", {
    x: 0.58, y: 1.62, w: 8.6, h: 1.8, margin: 0,
    fontFace: DISPLAY, fontSize: 48, bold: true, color: C.white, lineSpacingMultiple: 0.94,
  });
  s4.addText("Parcours · Périmètre · Expérience", {
    x: 0.6, y: 3.58, w: 8, h: 0.36, margin: 0,
    fontFace: BODY, fontSize: 15, color: "9FBEC6",
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — LE PARCOURS (3 cards)
  // ═══════════════════════════════════════════════════════════════════════════
  const s5 = pres.addSlide();
  s5.background = { path: "assets/content-bg.png" };
  addEyebrow(s5, "LE PARCOURS", 0.6, 0.52);
  addTitle(s5, "40h pour maîtriser l'IA en ingénierie pédagogique", 0.57, 0.84);

  const modules = [
    { ic: icGrad, col: C.primary600, t: "Ingénierie augmentée", d: "IA générative appliquée à la pédagogie. Posture critique, usages responsables et limites.", badge: "Étapes 1-2 · 16h" },
    { ic: icRobot, col: C.secondary500, t: "Maîtrise de Dinootoo", d: "Prise en main avancée : prompting structuré, co-création de contenus, contrôle qualité.", badge: "Étapes 3-4 · 18h" },
    { ic: icMobile, col: C.primary700, t: "Production autonome", d: "Projets réels Orange. Feedback pairs + coaching TLS. Validation Open Badge 2.0.", badge: "Étape 5 · 6h" },
  ];
  const mW = 2.73, mGap = 0.3, mY = 1.95, mH = 3.0;
  modules.forEach((m, i) => {
    const x = 0.6 + i * (mW + mGap);
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: mY, w: mW, h: mH, rectRadius: 0.14,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
    });
    s5.addShape(pres.shapes.OVAL, { x: x + 0.32, y: mY + 0.34, w: 0.76, h: 0.76, fill: { color: m.col } });
    s5.addImage({ data: m.ic, x: x + 0.32 + 0.20, y: mY + 0.34 + 0.20, w: 0.36, h: 0.36 });
    // Badge pill
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.28, y: mY + 1.26, w: mW - 0.56, h: 0.30, rectRadius: 0.08,
      fill: { color: C.primary50 }, line: { color: C.primary100, width: 1 },
    });
    s5.addText(m.badge, {
      x: x + 0.28, y: mY + 1.26, w: mW - 0.56, h: 0.30, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: C.primary700, align: "center", valign: "middle",
    });
    s5.addText(m.t, {
      x: x + 0.28, y: mY + 1.70, w: mW - 0.46, h: 0.44, margin: 0,
      fontFace: DISPLAY, fontSize: 15.5, bold: true, color: C.primary800,
    });
    s5.addText(m.d, {
      x: x + 0.30, y: mY + 2.18, w: mW - 0.56, h: 0.74, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.05,
    });
  });
  addFooter(s5, 5, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — CHIFFRES CLÉS
  // ═══════════════════════════════════════════════════════════════════════════
  const s6 = pres.addSlide();
  s6.background = { path: "assets/content-bg.png" };
  addEyebrow(s6, "RÉSULTATS DU POC", 0.6, 0.52);
  addTitle(s6, "L'impact, en chiffres", 0.57, 0.84);

  const stats = [
    { ic: icUsers,  n: "8",    u: "", l: "ingénieurs pédagogiques\nformés sur la cohorte beta", col: C.primary600, numCol: C.primary800 },
    { ic: icClock,  n: "40",   u: "h", l: "de parcours certifiant,\navec projets réels Orange", col: C.primary600, numCol: C.primary800 },
    { ic: icSmile,  n: "4,6",  u: "/5", l: "de satisfaction moyenne\ndes apprenants (à confirmer)", col: C.secondary500, numCol: C.secondary600 },
  ];
  const sW = 2.73, sGap = 0.3, sY = 2.0, sH = 2.76;
  stats.forEach((st, i) => {
    const x = 0.6 + i * (sW + sGap);
    s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: sY, w: sW, h: sH, rectRadius: 0.14,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
    });
    s6.addShape(pres.shapes.OVAL, { x: x + 0.32, y: sY + 0.34, w: 0.64, h: 0.64, fill: { color: st.col } });
    s6.addImage({ data: st.ic, x: x + 0.32 + 0.17, y: sY + 0.34 + 0.17, w: 0.30, h: 0.30 });
    s6.addText([
      { text: st.n, options: { fontSize: 46, bold: true, color: st.numCol, fontFace: DISPLAY } },
      { text: st.u, options: { fontSize: 22, bold: true, color: st.numCol, fontFace: DISPLAY } },
    ], { x: x + 0.28, y: sY + 1.1, w: sW - 0.56, h: 0.72, margin: 0 });
    s6.addText(st.l, {
      x: x + 0.30, y: sY + 1.88, w: sW - 0.56, h: 0.64, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.05,
    });
  });
  s6.addText("Données à confirmer avec l'équipe Orange avant diffusion externe.", {
    x: 0.6, y: 4.86, w: 9, h: 0.26, margin: 0,
    fontFace: BODY, fontSize: 10, italic: true, color: "9AA3AB",
  });
  addFooter(s6, 6, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — QUOTE + APPRENTISSAGE CLÉ (dark, immersive)
  // ═══════════════════════════════════════════════════════════════════════════
  const s7 = pres.addSlide();
  s7.background = { path: "assets/cover-bg.png" };
  s7.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s7.addText("The Learning Society", {
    x: 0.80, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });

  // Big quote marks
  s7.addText("“", {
    x: 0.45, y: 1.0, w: 1.2, h: 1.2, margin: 0,
    fontFace: DISPLAY, fontSize: 96, bold: true, color: C.accent400,
  });

  s7.addText("On ne s'attendait pas à ce que la Learning App\nsoit aussi intuitive. Les apprenants ont terminé\nles modules 30 % plus vite que prévu.", {
    x: 0.58, y: 1.55, w: 8.7, h: 1.52, margin: 0,
    fontFace: DISPLAY, fontSize: 24, bold: false, color: C.white, lineSpacingMultiple: 1.12,
  });

  s7.addShape(pres.shapes.RECTANGLE, {
    x: 0.58, y: 3.26, w: 2.0, h: 0.05,
    fill: { color: C.accent400 }, line: { color: C.accent400, width: 0 },
  });
  s7.addText("Responsable Formation, Direction Digitale Orange", {
    x: 0.58, y: 3.40, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 13, italic: true, color: "9FBEC6",
  });

  // Key insight pill bottom
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.55, y: 4.5, w: 9.0, h: 0.68, rectRadius: 0.12,
    fill: { color: C.white, transparency: 92 }, line: { color: C.white, transparency: 85, width: 1 },
  });
  s7.addText([
    { text: "Insight clé : ", options: { bold: true, color: C.accent400, fontFace: DISPLAY } },
    { text: "L'ancrage projet réel (cas Orange) est le facteur de transfert #1. Sans lui, la formation reste théorique.", options: { color: C.white, fontFace: BODY } },
  ], { x: 0.75, y: 4.5, w: 8.6, h: 0.68, margin: 0, fontSize: 13.5, valign: "middle" });

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — AVANT / AVEC TLS (2 col)
  // ═══════════════════════════════════════════════════════════════════════════
  const s8 = pres.addSlide();
  s8.background = { path: "assets/content-bg.png" };
  addEyebrow(s8, "APPRENTISSAGES", 0.6, 0.52);
  addTitle(s8, "Ce que vivaient les équipes", 0.57, 0.84);

  // Avant col
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.55, y: 1.76, w: 4.18, h: 3.38,
    fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
  });
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.76, w: 4.18, h: 0.52,
    fill: { color: "F4F6F8" }, line: { color: C.border, width: 0 },
  });
  s8.addText("Avant", {
    x: 0.75, y: 1.76, w: 3.8, h: 0.52, margin: 0,
    fontFace: DISPLAY, fontSize: 14, bold: true, color: C.muted, valign: "middle",
  });
  const beforeItems = [
    "« On voit monter en compétence sans savoir par où commencer »",
    "Des contenus génériques déconnectés du terrain Orange",
    "Pas de suivi de progression clair pour les managers",
    "Difficile de prouver l'impact RH de la formation IA",
  ];
  beforeItems.forEach((item, i) => {
    s8.addShape(pres.shapes.OVAL, {
      x: 0.76, y: 2.43 + i * 0.64, w: 0.18, h: 0.18,
      fill: { color: "F28559" }, line: { color: "F28559", width: 0 },
    });
    s8.addText(item, {
      x: 1.06, y: 2.38 + i * 0.64, w: 3.5, h: 0.50, margin: 0,
      fontFace: BODY, fontSize: 12.5, italic: true, color: C.ink900, lineSpacingMultiple: 1.02,
    });
  });

  // Avec TLS col
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.06, y: 1.76, w: 4.42, h: 3.38,
    fill: { color: C.primary50 }, line: { color: C.primary100, width: 1 }, shadow: makeShadow(),
  });
  s8.addShape(pres.shapes.RECTANGLE, {
    x: 5.06, y: 1.76, w: 4.42, h: 0.52,
    fill: { color: C.primary100 }, line: { color: C.primary100, width: 0 },
  });
  s8.addText("Avec TLS + Dinootoo", {
    x: 5.26, y: 1.76, w: 4.0, h: 0.52, margin: 0,
    fontFace: DISPLAY, fontSize: 14, bold: true, color: C.primary700, valign: "middle",
  });
  const afterItems = [
    "Un parcours structuré ancré dans leurs vrais projets Orange",
    "Des compétences validées par Open Badge 2.0 (traçabilité RH)",
    "Tableau de bord manager : progression visible en temps réel",
    "Des compétences immédiatement réinvesties sur leur poste",
  ];
  afterItems.forEach((item, i) => {
    s8.addShape(pres.shapes.OVAL, {
      x: 5.27, y: 2.43 + i * 0.64, w: 0.18, h: 0.18,
      fill: { color: C.success }, line: { color: C.success, width: 0 },
    });
    s8.addText(item, {
      x: 5.57, y: 2.38 + i * 0.64, w: 3.74, h: 0.50, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.ink900, lineSpacingMultiple: 1.02,
    });
  });
  addFooter(s8, 8, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — LA LEARNING APP (4 features)
  // ═══════════════════════════════════════════════════════════════════════════
  const s9 = pres.addSlide();
  s9.background = { path: "assets/content-bg.png" };
  addEyebrow(s9, "LA LEARNING APP TLS", 0.6, 0.52);
  addTitle(s9, "Ce que les apprenants ont vécu", 0.57, 0.84);

  const features = [
    { ic: icPlay,     col: C.primary600,   t: "Parcours guidé",       d: "5 étapes progressives, débloquées au fur et à mesure. Mobile-first, accessible offline." },
    { ic: icBook,     col: C.secondary500,  t: "Contenus contextualisés", d: "Leçons adaptées aux cas d'usage Orange. Exercices pratiques Dinootoo inclus." },
    { ic: icComments, col: C.primary700,   t: "Coaching intégré",     d: "Messagerie directe avec les coachs TLS. Corrections personnalisées en 48h." },
    { ic: icBullseye, col: C.secondary600,  t: "Passeport compétences", d: "Badges Open Badge 2.0 par étape. Dashboard progression pour managers." },
  ];
  const fW = 4.28, fGap = 0.32, fH = 1.46;
  features.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.55 + col * (fW + fGap);
    const y = 1.80 + row * (fH + 0.32);
    s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: fW, h: fH, rectRadius: 0.12,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
    });
    s9.addShape(pres.shapes.OVAL, { x: x + 0.28, y: y + 0.34, w: 0.6, h: 0.6, fill: { color: f.col } });
    s9.addImage({ data: f.ic, x: x + 0.28 + 0.16, y: y + 0.34 + 0.16, w: 0.28, h: 0.28 });
    s9.addText(f.t, {
      x: x + 1.08, y: y + 0.26, w: fW - 1.22, h: 0.36, margin: 0,
      fontFace: DISPLAY, fontSize: 15, bold: true, color: C.primary800,
    });
    s9.addText(f.d, {
      x: x + 1.08, y: y + 0.64, w: fW - 1.22, h: 0.72, margin: 0,
      fontFace: BODY, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.04,
    });
  });
  addFooter(s9, 9, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — DIVIDER "Et maintenant ?"
  // ═══════════════════════════════════════════════════════════════════════════
  const s10 = pres.addSlide();
  s10.background = { path: "assets/cover-bg.png" };
  s10.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s10.addText("The Learning Society", {
    x: 0.80, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });
  // Ghost number — placed bottom-right
  s10.addText("04", {
    x: 7.4, y: 3.2, w: 2.3, h: 1.6, margin: 0,
    fontFace: DISPLAY, fontSize: 96, bold: true, color: "2A5560", align: "right", valign: "middle",
  });
  s10.addText("Et maintenant ?", {
    x: 0.58, y: 1.62, w: 8.6, h: 1.2, margin: 0,
    fontFace: DISPLAY, fontSize: 56, bold: true, color: C.white,
  });
  s10.addText("Roadmap · Proposition · Next steps", {
    x: 0.6, y: 3.0, w: 8, h: 0.36, margin: 0,
    fontFace: BODY, fontSize: 15, color: "9FBEC6",
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — ROADMAP PROCHAINES ÉTAPES (timeline)
  // ═══════════════════════════════════════════════════════════════════════════
  const s11 = pres.addSlide();
  s11.background = { path: "assets/content-bg.png" };
  addEyebrow(s11, "PROCHAINES ÉTAPES", 0.6, 0.52);
  addTitle(s11, "La suite logique en 4 temps", 0.57, 0.84);

  const steps = [
    { n: "1", t: "Bilan & ajustements", d: "Réunion de clôture POC. Collecte retours IP + managers. Ajustements contenus.", time: "Juillet 2026", col: C.primary600 },
    { n: "2", t: "Cohorte 2 Orange", d: "Ouverture à 20 IP supplémentaires. Parcours enrichi avec retours cohorte 1.", time: "Sept. 2026", col: C.primary600 },
    { n: "3", t: "Déploiement Learning App", d: "Intégration LMS Orange ou accès direct TLS. Dashboard DRH activé.", time: "Oct. 2026", col: C.secondary500 },
    { n: "4", t: "Commercialisation", d: "Ouverture catalogue TLS + autres OF. Business case documenté avec chiffres Orange.", time: "T1 2027", col: C.accent400 },
  ];

  // Timeline line
  s11.addShape(pres.shapes.LINE, {
    x: 0.92, y: 2.74, w: 8.26, h: 0,
    line: { color: C.primary100, width: 2 },
  });

  const stepW = 2.18;
  steps.forEach((step, i) => {
    const x = 0.55 + i * (stepW + 0.12);

    // Circle on timeline
    s11.addShape(pres.shapes.OVAL, {
      x: x + 0.62, y: 2.49, w: 0.5, h: 0.5,
      fill: { color: step.col }, line: { color: step.col, width: 0 },
    });
    s11.addText(step.n, {
      x: x + 0.62, y: 2.49, w: 0.5, h: 0.5, margin: 0,
      fontFace: DISPLAY, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle",
    });

    // Step number label
    s11.addText(step.time, {
      x: x + 0.16, y: 1.72, w: stepW - 0.1, h: 0.30, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: step.col, align: "center",
    });

    // Content below
    s11.addText(step.t, {
      x: x + 0.08, y: 3.16, w: stepW, h: 0.42, margin: 0,
      fontFace: DISPLAY, fontSize: 13.5, bold: true, color: C.primary800, align: "center",
    });
    s11.addText(step.d, {
      x: x + 0.08, y: 3.62, w: stepW, h: 0.86, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: C.muted, align: "center", lineSpacingMultiple: 1.04,
    });
  });
  addFooter(s11, 11, TOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  const s12 = pres.addSlide();
  s12.background = { path: "assets/cover-bg.png" };

  s12.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s12.addText("The Learning Society", {
    x: 0.80, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });

  s12.addText("Continuons ensemble.", {
    x: 0.55, y: 1.52, w: 8.6, h: 1.3, margin: 0,
    fontFace: DISPLAY, fontSize: 54, bold: true, color: C.white,
  });
  s12.addText("Orange × TLS — vers une collaboration durable sur la montée en compétences IA.", {
    x: 0.6, y: 2.94, w: 8.4, h: 0.58, margin: 0,
    fontFace: BODY, fontSize: 16, color: "C4DDE3", lineSpacingMultiple: 1.08,
  });

  // CTA button shape
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 3.72, w: 2.68, h: 0.56, rectRadius: 0.16,
    fill: { color: C.secondary500 }, line: { color: C.secondary500, width: 0 },
  });
  s12.addText("Discutons-en →", {
    x: 0.6, y: 3.72, w: 2.68, h: 0.56, margin: 0,
    fontFace: DISPLAY, fontSize: 15, bold: true, color: C.white, align: "center", valign: "middle",
  });

  // Contact
  s12.addText([
    { text: "chloe@thelearningsociety.fr", options: { color: "9FBEC6" } },
    { text: "   ·   ", options: { color: "4A7A86" } },
    { text: "thelearningsociety.fr", options: { color: "9FBEC6" } },
  ], { x: 0.6, y: 4.66, w: 9, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5 });

  // ── Write file ───────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "../TLS-deck-orange-poc-dinootoo.pptx" });
  console.log("✅  TLS-deck-orange-poc-dinootoo.pptx written");
})();
