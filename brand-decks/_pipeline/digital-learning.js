// brand-decks/_pipeline/digital-learning.js
// Deck gabarit : Formation Digital Learning / LMS / Tutoriel vidéo
// 12 slides · 16:9 · League Spartan + Nunito embarquées

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const FA = require("react-icons/fa");

const C = {
  p50: "E8F4F7", p500: "55A1B4", p600: "4A8FA1", p700: "3D7786", p800: "2F5F6A", p900: "1F3E45",
  s500: "ED843A", s600: "C06920", a400: "F8B044", a100: "FDF3D6",
  ink: "252B37", muted: "6B7280", faint: "9AA3AB", border: "E6EDEF", white: "FFFFFF",
  success: "9DBEBA",
};
const DISPLAY = "League Spartan", BODY = "Nunito";
const W = 10, H = 5.625, MX = 0.7;
const s2png = (svg) => sharp(Buffer.from(svg)).png().toBuffer();
async function icon(IC, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color: "#" + color, size: String(size) }));
  return "image/png;base64," + (await s2png(svg)).toString("base64");
}
let BG = {}, ICON = {}, P;

async function assets() {
  // Cover / dark gradient (reuse from system if exists, else generate)
  if (!fs.existsSync("assets/cover-bg.png")) {
    const cover = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F5F6A"/><stop offset="0.55" stop-color="#28525C"/><stop offset="1" stop-color="#1F3E45"/></linearGradient>
      <radialGradient id="gl" cx="0.85" cy="0.12" r="0.55"><stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/><stop offset="1" stop-color="#F8B044" stop-opacity="0"/></radialGradient>
      <radialGradient id="gl2" cx="0.05" cy="0.95" r="0.5"><stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/><stop offset="1" stop-color="#55A1B4" stop-opacity="0"/></radialGradient>
      </defs><rect width="2000" height="1125" fill="url(#g)"/><rect width="2000" height="1125" fill="url(#gl)"/><rect width="2000" height="1125" fill="url(#gl2)"/></svg>`;
    fs.writeFileSync("assets/cover-bg.png", await s2png(cover));
  }
  BG.cover = "assets/cover-bg.png";

  // Light pastel gradient bg (for content slides)
  const light = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E8F4F7"/>
      <stop offset="0.5" stop-color="#FBF7F2"/>
      <stop offset="1" stop-color="#FFF3EB"/>
    </linearGradient></defs>
    <rect width="2000" height="1125" fill="url(#g)"/></svg>`;
  fs.writeFileSync("assets/dl-light-bg.png", await s2png(light));
  BG.light = "assets/dl-light-bg.png";

  // Orange accent bg (for pratique / challenge slides)
  const warm = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#C06920"/>
      <stop offset="1" stop-color="#ED843A"/>
    </linearGradient></defs>
    <rect width="2000" height="1125" fill="url(#g)"/>
    <rect width="2000" height="1125" fill="#F8B044" opacity="0.08"/></svg>`;
  fs.writeFileSync("assets/dl-warm-bg.png", await s2png(warm));
  BG.warm = "assets/dl-warm-bg.png";

  ICON.play    = await icon(FA.FaPlay, C.white);
  ICON.check   = await icon(FA.FaCheckCircle, C.p600);
  ICON.checkW  = await icon(FA.FaCheckCircle, C.white);
  ICON.bulb    = await icon(FA.FaRegLightbulb, C.a400);
  ICON.pen     = await icon(FA.FaPen, C.s500);
  ICON.penW    = await icon(FA.FaPen, C.white);
  ICON.quiz    = await icon(FA.FaQuestion, C.a400);
  ICON.star    = await icon(FA.FaStar, C.a400);
  ICON.starW   = await icon(FA.FaStar, C.white);
  ICON.next    = await icon(FA.FaArrowRight, C.white);
  ICON.nextD   = await icon(FA.FaArrowRight, C.p900);
  ICON.badge   = await icon(FA.FaMedal, C.a400);
  ICON.book    = await icon(FA.FaBookOpen, C.p600);
  ICON.target  = await icon(FA.FaBullseye, C.p600);
  ICON.journal = await icon(FA.FaJournalWhills, C.p600);
}

// ─── Shared elements ─────────────────────────────────────────────────────────

function mark(s, color) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.38, w: 0.17, h: 0.17, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.24, y: 0.32, w: 5, h: 0.32, margin: 0, fontFace: DISPLAY, fontSize: 12, bold: true, color: color || C.white, valign: "middle" });
}

// Progress bar at bottom: current/total
function progressBar(s, current, total) {
  const barW = W - 2 * MX;
  const pct = current / total;
  s.addShape(P.shapes.RECTANGLE, { x: MX, y: H - 0.22, w: barW, h: 0.1, fill: { color: C.white, transparency: 80 } });
  s.addShape(P.shapes.RECTANGLE, { x: MX, y: H - 0.22, w: barW * pct, h: 0.1, fill: { color: C.a400 } });
  s.addText(`${current} / ${total}`, { x: W - MX - 1.2, y: H - 0.46, w: 1.2, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9, color: C.white, opacity: 0.55, align: "right", valign: "middle" });
}

function moduleTag(s, mod, dark) {
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: H - 0.46, w: 1.8, h: 0.28, rectRadius: 0.14, fill: { color: dark ? C.a400 : C.p500 } });
  s.addText(mod, { x: MX, y: H - 0.46, w: 1.8, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: dark ? C.p900 : C.white, align: "center", valign: "middle" });
}

// ─── Layouts ─────────────────────────────────────────────────────────────────

const L = {};

// 01 — Thumbnail / Cover (style YouTube / LMS)
L.dlThumbnail = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  // Big module number watermark
  s.addText(p.num || "01", { x: 5.5, y: -0.3, w: 5, h: 5, margin: 0, fontFace: DISPLAY, fontSize: 320, bold: true, color: C.p700, align: "right", valign: "middle", opacity: 0.18 });
  // Eyebrow (module / parcours)
  s.addText(p.eyebrow, { x: MX, y: 1.7, w: 7, h: 0.32, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 2.2 });
  // Title
  s.addText(p.title, { x: MX - 0.05, y: 2.05, w: 7.5, h: 2.0, margin: 0, fontFace: DISPLAY, fontSize: 56, bold: true, color: C.white, lineSpacingMultiple: 0.94 });
  // Duration chip
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 4.35, w: 1.6, h: 0.4, rectRadius: 0.2, fill: { color: C.white, transparency: 85 } });
  s.addText(p.duration || "{{X min}}", { x: MX + 0.08, y: 4.35, w: 1.44, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle" });
  // Level chip
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX + 1.76, y: 4.35, w: 2.0, h: 0.4, rectRadius: 0.2, fill: { color: C.white, transparency: 85 } });
  s.addText(p.level || "{{Niveau}}", { x: MX + 1.84, y: 4.35, w: 1.84, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle" });
  progressBar(s, 0, 10);
};

// 02 — Intro module : objectifs d'apprentissage
L.dlIntro = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText("CE QUE TU VAS APPRENDRE", { x: MX, y: 1.1, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.04, y: 1.46, w: 8.5, h: 1.1, margin: 0, fontFace: DISPLAY, fontSize: 40, bold: true, color: C.white, lineSpacingMultiple: 0.96 });
  (p.objectifs || []).forEach((o, i) => {
    s.addImage({ data: ICON.checkW, x: MX, y: 2.95 + i * 0.64, w: 0.28, h: 0.28 });
    s.addText(o, { x: MX + 0.46, y: 2.88 + i * 0.64, w: 8, h: 0.5, margin: 0, fontFace: BODY, fontSize: 16, bold: true, color: C.white, valign: "middle" });
  });
  progressBar(s, 1, 10);
};

// 03 — Plan de la leçon (roadmap visuel)
L.dlPlan = (s, p) => {
  s.background = { path: BG.light };
  mark(s, C.p800);
  s.addText(p.eyebrow || "PLAN DE LA LEÇON", { x: MX, y: 1.0, w: 8, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.3, w: 8.5, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 32, bold: true, color: C.ink });
  const steps = p.steps || [];
  const sw = (W - 2 * MX - (steps.length - 1) * 0.3) / steps.length;
  steps.forEach((st, i) => {
    const x = MX + i * (sw + 0.3);
    const isActive = i === (p.activeStep || 0);
    const bg = isActive ? C.p800 : C.white;
    const tc = isActive ? C.white : C.ink;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: 2.3, w: sw, h: 2.5, rectRadius: 0.12, fill: { color: bg }, line: { color: isActive ? C.p800 : C.border, width: 1.5 }, shadow: isActive ? undefined : { type: "outer", blur: 6, offset: 2, angle: 90, opacity: 0.06 } });
    s.addShape(P.shapes.OVAL, { x: x + sw / 2 - 0.24, y: 2.5, w: 0.48, h: 0.48, fill: { color: isActive ? C.a400 : C.p50 } });
    s.addText(String(i + 1), { x: x + sw / 2 - 0.24, y: 2.5, w: 0.48, h: 0.48, margin: 0, fontFace: DISPLAY, fontSize: 16, bold: true, color: isActive ? C.p900 : C.p600, align: "center", valign: "middle" });
    s.addText(st.t, { x: x + 0.14, y: 3.1, w: sw - 0.28, h: 0.44, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: tc, align: "center", lineSpacingMultiple: 1.0 });
    if (st.d) s.addText(st.d, { x: x + 0.14, y: 3.58, w: sw - 0.28, h: 1.0, margin: 0, fontFace: BODY, fontSize: 10.5, color: isActive ? "C9DEE4" : C.muted, align: "center", lineSpacingMultiple: 1.15, valign: "top" });
    if (i < steps.length - 1) s.addShape(P.shapes.LINE, { x: x + sw + 0.01, y: 3.55, w: 0.28, h: 0, line: { color: C.border, width: 1.5 } });
  });
  moduleTag(s, p.mod || "{{Module 01}}", false);
};

// 04 — Contenu principal (texte + zone illustration)
L.dlContent = (s, p) => {
  s.background = { path: BG.light };
  mark(s, C.p800);
  s.addText(p.eyebrow || "CONCEPT CLÉ", { x: MX, y: 1.0, w: 5, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.3, w: 5.2, h: 0.96, margin: 0, fontFace: DISPLAY, fontSize: 30, bold: true, color: C.ink, lineSpacingMultiple: 0.96 });
  let y = 2.55;
  (p.points || []).forEach((pt) => {
    s.addImage({ data: ICON.check, x: MX, y: y + 0.04, w: 0.22, h: 0.22 });
    s.addText([{ text: pt.b + "  ", options: { bold: true, color: C.p800 } }, { text: pt.d || "", options: { color: C.muted } }],
      { x: MX + 0.38, y: y - 0.04, w: 4.8, h: 0.56, margin: 0, fontFace: BODY, fontSize: 13, lineSpacingMultiple: 1.2, valign: "top" });
    y += 0.68;
  });
  // Right illustration placeholder
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 6.2, y: 1.0, w: 3.2, h: 4.0, rectRadius: 0.16, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
  s.addText("{{ Illustration\nou capture }}", { x: 6.2, y: 2.5, w: 3.2, h: 1.0, margin: 0, fontFace: BODY, fontSize: 11.5, italic: true, color: C.faint, align: "center" });
  moduleTag(s, p.mod || "{{Module 01}}", false);
};

// 05 — Citation / Concept fort
L.dlQuote = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText(p.eyebrow || "À RETENIR", { x: MX, y: 1.6, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText("«", { x: MX - 0.2, y: 1.95, w: 0.9, h: 0.9, margin: 0, fontFace: DISPLAY, fontSize: 80, bold: true, color: C.a400, valign: "top" });
  s.addText(p.quote, { x: MX + 0.55, y: 2.0, w: 8.0, h: 2.4, margin: 0, fontFace: DISPLAY, fontSize: 32, bold: true, color: C.white, lineSpacingMultiple: 1.06 });
  if (p.source) s.addText(p.source, { x: MX + 0.6, y: 4.6, w: 7, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400 });
  progressBar(s, p.step || 5, 10);
};

// 06 — Exercice pratique "Maintenant à toi"
L.dlPratique = (s, p) => {
  s.background = { path: BG.warm }; mark(s);
  s.addText("✋  MAINTENANT À TOI", { x: MX, y: 1.1, w: 8, h: 0.34, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.white, charSpacing: 2.0, opacity: 0.9 });
  s.addText(p.title, { x: MX - 0.05, y: 1.52, w: 8.8, h: 1.4, margin: 0, fontFace: DISPLAY, fontSize: 44, bold: true, color: C.white, lineSpacingMultiple: 0.96 });
  s.addText(p.consigne, { x: MX, y: 3.1, w: 6.5, h: 1.2, margin: 0, fontFace: BODY, fontSize: 16, color: C.white, lineSpacingMultiple: 1.35, opacity: 0.9, valign: "top" });
  // Timer chip
  if (p.timer) {
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 4.5, w: 2.2, h: 0.5, rectRadius: 0.25, fill: { color: C.white, transparency: 80 } });
    s.addText("⏱  " + p.timer, { x: MX + 0.1, y: 4.5, w: 2.0, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, bold: true, color: C.white, align: "center", valign: "middle" });
  }
  progressBar(s, p.step || 6, 10);
};

// 07 — Démo / Screen capture
L.dlDemo = (s, p) => {
  s.background = { path: BG.light };
  mark(s, C.p800);
  s.addText(p.eyebrow || "DÉMONSTRATION", { x: MX, y: 1.0, w: 3.5, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.3, w: 3.5, h: 1.0, margin: 0, fontFace: DISPLAY, fontSize: 28, bold: true, color: C.ink, lineSpacingMultiple: 0.96 });
  if (p.steps) {
    let y = 2.55;
    p.steps.forEach((st, i) => {
      s.addShape(P.shapes.OVAL, { x: MX, y, w: 0.38, h: 0.38, fill: { color: C.p600 } });
      s.addText(String(i + 1), { x: MX, y, w: 0.38, h: 0.38, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle" });
      s.addText(st, { x: MX + 0.54, y: y + 0.02, w: 3.2, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.15, valign: "top" });
      y += 0.62;
    });
  }
  // Screen placeholder
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 4.4, y: 0.7, w: 5.3, h: 4.3, rectRadius: 0.16, fill: { color: C.p900 }, line: { color: C.p700, width: 1.5 } });
  // Browser chrome bar
  s.addShape(P.shapes.RECTANGLE, { x: 4.4, y: 0.7, w: 5.3, h: 0.38, fill: { color: C.p800 } });
  s.addShape(P.shapes.OVAL, { x: 4.56, y: 0.82, w: 0.14, h: 0.14, fill: { color: "E87B6A" } });
  s.addShape(P.shapes.OVAL, { x: 4.76, y: 0.82, w: 0.14, h: 0.14, fill: { color: "F8B044" } });
  s.addShape(P.shapes.OVAL, { x: 4.96, y: 0.82, w: 0.14, h: 0.14, fill: { color: "9DBEBA" } });
  s.addText("app.thelearningsociety.fr / {{feature}}", { x: 5.2, y: 0.73, w: 3.6, h: 0.3, margin: 0, fontFace: BODY, fontSize: 8.5, color: C.faint, valign: "middle" });
  s.addText("{{ Capture écran\nou démo animée }}", { x: 4.4, y: 2.3, w: 5.3, h: 1.1, margin: 0, fontFace: BODY, fontSize: 12, italic: true, color: C.faint, align: "center" });
  moduleTag(s, p.mod || "{{Module 01}}", false);
};

// 08 — Quiz (QCM 4 choix)
L.dlQuiz = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText("⚡  VÉRIFIE TA COMPRÉHENSION", { x: MX, y: 1.0, w: 8, h: 0.32, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.a400, charSpacing: 2.0 });
  s.addText(p.question, { x: MX - 0.03, y: 1.4, w: 8.8, h: 1.4, margin: 0, fontFace: DISPLAY, fontSize: 30, bold: true, color: C.white, lineSpacingMultiple: 1.02 });
  const opts = p.options || ["{{ Réponse A }}", "{{ Réponse B }}", "{{ Réponse C }}", "{{ Réponse D }}"];
  const LETTERS = ["A", "B", "C", "D"];
  opts.forEach((o, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = MX + col * 4.8, y = 3.1 + row * 1.08;
    const isCorrect = i === (p.correct ?? -1);
    const fill = isCorrect ? { color: C.p500 } : { color: "FFFFFF", transparency: 90 };
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.5, h: 0.86, rectRadius: 0.1, fill });
    s.addShape(P.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.46, h: 0.46, fill: { color: isCorrect ? C.a400 : C.p600 } });
    s.addText(LETTERS[i], { x: x + 0.2, y: y + 0.2, w: 0.46, h: 0.46, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(o, { x: x + 0.82, y, w: 3.5, h: 0.86, margin: 0, fontFace: BODY, fontSize: 13.5, color: C.white, valign: "middle", lineSpacingMultiple: 1.1 });
  });
  progressBar(s, p.step || 7, 10);
};

// 09 — Récap "Les 3 points clés"
L.dlRecap = (s, p) => {
  s.background = { path: BG.light };
  mark(s, C.p800);
  s.addText(p.eyebrow || "RÉCAPITULATIF", { x: MX, y: 1.0, w: 8, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title || "Les 3 points à retenir", { x: MX - 0.03, y: 1.3, w: 8.5, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 34, bold: true, color: C.ink });
  (p.points || []).forEach((pt, i) => {
    const TONES = [C.p600, C.s500, C.a400];
    const y = 2.3 + i * 1.0;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y, w: W - 2 * MX, h: 0.82, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: { type: "outer", blur: 6, offset: 2, angle: 90, opacity: 0.06 } });
    s.addShape(P.shapes.OVAL, { x: MX + 0.2, y: y + 0.16, w: 0.5, h: 0.5, fill: { color: TONES[i] } });
    s.addText(String(i + 1), { x: MX + 0.2, y: y + 0.16, w: 0.5, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText([{ text: pt.t + "  ", options: { bold: true, color: C.p800 } }, { text: pt.d || "", options: { color: C.muted } }],
      { x: MX + 0.88, y, w: W - 2 * MX - 1.0, h: 0.82, margin: 0, fontFace: BODY, fontSize: 13.5, lineSpacingMultiple: 1.2, valign: "middle" });
  });
  moduleTag(s, p.mod || "{{Module 01}}", false);
};

// 10 — Journal de bord réflexif
L.dlJournal = (s, p) => {
  s.background = { path: BG.light };
  mark(s, C.p800);
  s.addImage({ data: ICON.pen, x: MX, y: 1.0, w: 0.36, h: 0.36 });
  s.addText("JOURNAL DE BORD", { x: MX + 0.48, y: 1.05, w: 4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.s500, charSpacing: 2, valign: "middle" });
  s.addText(p.title || "Qu'est-ce que tu retiens ?", { x: MX - 0.03, y: 1.44, w: 8.5, h: 0.8, margin: 0, fontFace: DISPLAY, fontSize: 34, bold: true, color: C.ink });
  (p.prompts || ["{{ Qu'est-ce que tu retiens de ce module ? }}", "{{ Comment vas-tu appliquer ça dans ta pratique ? }}", "{{ Qu'est-ce que ça change pour toi ? }}"]).forEach((pr, i) => {
    const y = 2.55 + i * 1.02;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y, w: W - 2 * MX, h: 0.84, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.border, width: 1 } });
    s.addShape(P.shapes.RECTANGLE, { x: MX, y, w: 0.05, h: 0.84, fill: { color: i === 0 ? C.p500 : i === 1 ? C.s500 : C.a400 } });
    s.addText(pr, { x: MX + 0.26, y, w: W - 2 * MX - 0.36, h: 0.84, margin: 0, fontFace: BODY, fontSize: 13, italic: true, color: C.muted, valign: "middle" });
  });
  s.addText("Accessible depuis ta Learning App → Journal de Bord", { x: MX, y: H - 0.56, w: 7, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: C.faint });
  moduleTag(s, p.mod || "{{Module 01}}", false);
};

// 11 — Prochaine leçon / CTA
L.dlNext = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText("TU AS TERMINÉ CE MODULE 🎉", { x: MX, y: 1.3, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 2.0 });
  s.addText(p.praise || "Bien joué !", { x: MX - 0.05, y: 1.68, w: 7, h: 0.92, margin: 0, fontFace: DISPLAY, fontSize: 46, bold: true, color: C.white });
  // Next preview card
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 2.9, w: 6.0, h: 1.7, rectRadius: 0.14, fill: { color: C.white, opacity: 0.1 }, line: { color: C.white, transparency: 802, width: 1 } });
  s.addText("PROCHAIN MODULE", { x: MX + 0.3, y: 3.06, w: 4, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.a400, charSpacing: 1.8 });
  s.addText(p.nextTitle || "{{ Titre du prochain module }}", { x: MX + 0.3, y: 3.38, w: 5.2, h: 0.6, margin: 0, fontFace: DISPLAY, fontSize: 22, bold: true, color: C.white });
  s.addText(p.nextDuration || "{{X min}}", { x: MX + 0.3, y: 4.0, w: 2, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: "C9DEE4" });
  s.addImage({ data: ICON.next, x: 5.5, y: 3.45, w: 0.36, h: 0.36 });
  // CTA
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 4.82, w: 2.8, h: 0.54, rectRadius: 0.27, fill: { color: C.a400 } });
  s.addText("Commencer →", { x: MX + 0.1, y: 4.82, w: 2.6, h: 0.54, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addText("ou revenir au parcours", { x: MX + 3.1, y: 4.9, w: 3, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11.5, color: "C9DEE4", valign: "middle" });
  progressBar(s, 9, 10);
};

// 12 — Badge / Certification module complété
L.dlBadge = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  // Glow cercle badge
  s.addShape(P.shapes.OVAL, { x: W / 2 - 1.1, y: 0.7, w: 2.2, h: 2.2, fill: { color: C.a400, opacity: 0.12 } });
  s.addShape(P.shapes.OVAL, { x: W / 2 - 0.8, y: 1.0, w: 1.6, h: 1.6, fill: { color: C.a400, opacity: 0.18 } });
  s.addShape(P.shapes.OVAL, { x: W / 2 - 0.55, y: 1.25, w: 1.1, h: 1.1, fill: { color: C.a400 } });
  s.addImage({ data: ICON.starW, x: W / 2 - 0.28, y: 1.5, w: 0.56, h: 0.56 });
  s.addText("BADGE DÉBLOQUÉ", { x: 0, y: 3.0, w: W, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 3.0, align: "center" });
  s.addText(p.badgeName || "{{ Nom du badge }}", { x: 0, y: 3.4, w: W, h: 0.8, margin: 0, fontFace: DISPLAY, fontSize: 42, bold: true, color: C.white, align: "center" });
  s.addText(p.desc || "{{ Ce badge atteste que tu maîtrises : {{ compétence clé }}. }}", { x: MX, y: 4.32, w: W - 2 * MX, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, color: "C9DEE4", align: "center" });
  s.addText("Open Badge 2.0 · Émis par The Learning Society", { x: 0, y: H - 0.44, w: W, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9.5, italic: true, color: C.faint, align: "center" });
};

// ─── Build ───────────────────────────────────────────────────────────────────

function build(file, specs) {
  P = new pptxgen();
  P.defineLayout({ name: "WIDE", width: W, height: H }); P.layout = "WIDE";
  P.author = "The Learning Society"; P.title = "TLS — Formation Digital Learning";
  specs.forEach((sp) => { const s = P.addSlide(); L[sp.type](s, sp); });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();
  await build("TLS-deck-formation-digital-learning.pptx", [
    // 01 — Thumbnail cover
    { type: "dlThumbnail",
      num: "{{01}}",
      eyebrow: "{{NOM DU PARCOURS}} · MODULE {{01}}",
      title: "{{Titre du\nmodule}}", duration: "{{X min}}", level: "{{Débutant / Avancé}}" },

    // 02 — Objectifs
    { type: "dlIntro",
      title: "{{Ce que tu vas apprendre dans ce module}}",
      objectifs: [
        "{{ Objectif 1 : ce que tu sauras faire à la fin de ce module. }}",
        "{{ Objectif 2 : la compétence clé développée. }}",
        "{{ Objectif 3 : le bénéfice concret pour ta pratique. }}",
      ] },

    // 03 — Plan de la leçon (4 étapes)
    { type: "dlPlan",
      title: "Ce qu'on va parcourir ensemble",
      mod: "{{Module 01}}",
      activeStep: 0,
      steps: [
        { t: "Concept", d: "La notion clé expliquée." },
        { t: "Exemple", d: "Un cas concret illustré." },
        { t: "Pratique", d: "Tu expérimentes." },
        { t: "Bilan", d: "Tu consolides." },
      ] },

    // 04 — Contenu principal A
    { type: "dlContent",
      eyebrow: "CONCEPT CLÉ",
      title: "{{La notion principale du module}}",
      mod: "{{Module 01}}",
      points: [
        { b: "{{Point 1}}", d: "— {{ Explication concise, une phrase maximum. }}" },
        { b: "{{Point 2}}", d: "— {{ Ce qui distingue ce concept des approches classiques. }}" },
        { b: "{{Point 3}}", d: "— {{ L'implication directe pour l'apprenant. }}" },
      ] },

    // 05 — Citation / concept fort
    { type: "dlQuote",
      eyebrow: "À RETENIR",
      quote: "{{ La formule ou la phrase forte qui résume le concept. Elle doit être mémorable. }}",
      source: "{{ Auteur / Source — ou laisser vide }}", step: 5 },

    // 06 — Exercice pratique
    { type: "dlPratique",
      title: "À toi de jouer",
      consigne: "{{ Décris l'exercice ou la mise en situation. Sois précis·e : quoi faire, comment, avec quoi. Exemple : « Prenez une compétence de votre équipe et positionnez-la sur le modèle Dreyfus. »}}",
      timer: "10 min", step: 6 },

    // 07 — Démo / screen
    { type: "dlDemo",
      eyebrow: "DANS LA LEARNING APP",
      title: "Comment ça\nmarche en pratique",
      mod: "{{Module 01}}",
      steps: [
        "{{ Étape 1 : navigation ou action dans l'app. }}",
        "{{ Étape 2 : paramétrage ou remplissage. }}",
        "{{ Étape 3 : résultat attendu. }}",
      ] },

    // 08 — Quiz
    { type: "dlQuiz",
      question: "{{ La question de vérification — une seule bonne réponse. }}",
      options: [
        "{{ Option A }}",
        "{{ Option B — bonne réponse si correct: 1 }}",
        "{{ Option C }}",
        "{{ Option D }}",
      ],
      correct: -1, // -1 = pas encore révélée (à animer en présentiel / logique LMS)
      step: 8 },

    // 09 — Récap
    { type: "dlRecap",
      title: "Les 3 points à retenir",
      mod: "{{Module 01}}",
      points: [
        { t: "{{Point 1}}", d: "— {{ Ce que l'apprenant doit absolument retenir. }}" },
        { t: "{{Point 2}}", d: "— {{ Le deuxième enseignement clé. }}" },
        { t: "{{Point 3}}", d: "— {{ Ce qui change concrètement dans leur pratique. }}" },
      ] },

    // 10 — Journal de bord
    { type: "dlJournal",
      title: "Prends 5 min pour noter",
      mod: "{{Module 01}}",
      prompts: [
        "{{ Qu'est-ce que tu retiens de ce module ? }}",
        "{{ Comment vas-tu appliquer ça dans ta pratique dès cette semaine ? }}",
        "{{ Quelle question te reste-t-il après ce module ? }}",
      ] },

    // 11 — CTA prochain module
    { type: "dlNext",
      praise: "Module terminé !",
      nextTitle: "{{ Titre du prochain module }}",
      nextDuration: "{{X min}}" },

    // 12 — Badge / certification
    { type: "dlBadge",
      badgeName: "{{ Nom du Badge }}",
      desc: "Ce badge atteste que tu maîtrises : {{ compétence clé }}." },
  ]);

  console.log("✅ digital-learning deck écrit");
})();
