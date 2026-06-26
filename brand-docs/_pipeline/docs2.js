// brand-docs/_pipeline/docs2.js
// Gabarits A4 : Rapport de Mission STRIDE · CR Coaching · Devis
// Moteur identique à docs.js (pptxgenjs A4 portrait 8.27×11.69)

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const FA = require("react-icons/fa");

const C = {
  p50: "E8F4F7", p500: "55A1B4", p600: "4A8FA1", p700: "3D7786", p800: "2F5F6A", p900: "1F3E45",
  s50: "FFF3EB", s500: "ED843A", s600: "C06920", a400: "F8B044",
  ink: "252B37", muted: "6B7280", faint: "9AA3AB", border: "E6EDEF", white: "FFFFFF",
};
const DISPLAY = "League Spartan", BODY = "Nunito";
const PW = 8.27, PH = 11.69, MX = 0.85, CW = PW - 2 * MX;
const shadow = () => ({ type: "outer", color: C.p900, blur: 9, offset: 3, angle: 90, opacity: 0.10 });
const s2png = (svg) => sharp(Buffer.from(svg)).png().toBuffer();
async function icon(IC, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color: "#" + color, size: String(size) }));
  return "image/png;base64," + (await s2png(svg)).toString("base64");
}
let BG = {}, ICON = {}, P;

async function assets() {
  // Reuse existing cover bg if present, else generate
  if (!fs.existsSync("assets/doc-cover.png")) {
    const cover = `<svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg"><defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F5F6A"/><stop offset="0.55" stop-color="#28525C"/><stop offset="1" stop-color="#1F3E45"/></linearGradient>
      <radialGradient id="gl" cx="0.85" cy="0.1" r="0.5"><stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/><stop offset="1" stop-color="#F8B044" stop-opacity="0"/></radialGradient>
      <radialGradient id="gl2" cx="0.05" cy="0.92" r="0.45"><stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/><stop offset="1" stop-color="#55A1B4" stop-opacity="0"/></radialGradient>
      </defs><rect width="1240" height="1754" fill="url(#g)"/><rect width="1240" height="1754" fill="url(#gl)"/><rect width="1240" height="1754" fill="url(#gl2)"/></svg>`;
    fs.writeFileSync("assets/doc-cover.png", await s2png(cover));
  }
  BG.cover = "assets/doc-cover.png";
  ICON.check  = await icon(FA.FaCheckCircle, C.p600);
  ICON.bulb   = await icon(FA.FaRegLightbulb, C.p600);
  ICON.arrow  = await icon(FA.FaArrowRight, C.white);
  ICON.arrowD = await icon(FA.FaArrowRight, C.p900);
  ICON.clock  = await icon(FA.FaRegClock, C.p600);
  ICON.star   = await icon(FA.FaStar, C.a400);
  ICON.target = await icon(FA.FaBullseye, C.p600);
  ICON.euro   = await icon(FA.FaEuroSign, C.p600);
  ICON.pen    = await icon(FA.FaEdit, C.p600);
  ICON.chat   = await icon(FA.FaComments, C.p600);
}

// ─── Shared header / footer ─────────────────────────────────────────────────
function dheader(s) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.62, w: 0.14, h: 0.14, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.2, y: 0.55, w: 4, h: 0.3, margin: 0, fontFace: DISPLAY, fontSize: 11, bold: true, color: C.p800, valign: "middle" });
  s.addShape(P.shapes.LINE, { x: MX, y: 0.95, w: CW, h: 0, line: { color: C.border, width: 1 } });
}
function dfooter(s, n, label) {
  s.addShape(P.shapes.LINE, { x: MX, y: PH - 0.75, w: CW, h: 0, line: { color: C.border, width: 1 } });
  s.addText(label || "Confidentiel", { x: MX, y: PH - 0.68, w: 3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 8.5, color: C.faint, valign: "middle" });
  s.addText(n, { x: PW - MX - 2, y: PH - 0.68, w: 2, h: 0.26, margin: 0, fontFace: BODY, fontSize: 8.5, color: C.faint, align: "right", valign: "middle" });
}

// ─── Cover (réutilisé identique) ────────────────────────────────────────────
function dCover(s, p) {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.85, w: 0.2, h: 0.2, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.28, y: 0.78, w: 5, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.white, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 6.4, w: CW, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.04, y: 6.85, w: CW, h: 2.0, margin: 0, fontFace: DISPLAY, fontSize: 42, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  s.addShape(P.shapes.RECTANGLE, { x: MX, y: 9.05, w: 0.7, h: 0.05, fill: { color: C.s500 } });
  if (p.subtitle) s.addText(p.subtitle, { x: MX, y: 9.3, w: CW, h: 0.8, margin: 0, fontFace: BODY, fontSize: 14.5, color: "C9DEE4", lineSpacingMultiple: 1.2 });
  (p.meta || []).forEach((m, i) => s.addText(
    [{ text: m.k + "   ", options: { color: "8FB0B8" } }, { text: m.v, options: { bold: true, color: C.white } }],
    { x: MX, y: 10.35 + i * 0.34, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5 }
  ));
}

// ─── RAPPORT DE MISSION layouts ─────────────────────────────────────────────

// Page synthèse narrative (intro / contexte)
function dRapportIntro(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  let y = 2.7;
  (p.paras || []).forEach((para) => {
    s.addText(para, { x: MX, y, w: CW, h: 1.4, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.35, valign: "top" });
    y += 1.4;
  });
  // Résumé stats en 3 colonnes
  if (p.kpis) {
    const kw = (CW - 0.4) / 3;
    p.kpis.forEach((k, i) => {
      const x = MX + i * (kw + 0.2);
      s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: 7.5, w: kw, h: 1.8, rectRadius: 0.1, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
      s.addText(k.v, { x, y: 7.72, w: kw, h: 0.72, margin: 0, fontFace: DISPLAY, fontSize: 34, bold: true, color: C.p700, align: "center" });
      s.addText(k.l, { x, y: 8.5, w: kw, h: 0.6, margin: 0, fontFace: BODY, fontSize: 11, color: C.muted, align: "center", lineSpacingMultiple: 1.1 });
    });
  }
  dfooter(s, n, "Rapport de mission · Confidentiel");
}

// Page chantiers STRIDE — liste structurée par étape
function dRapportStride(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  const STRIDE_COLORS = { S: C.p600, T: C.p600, R: C.s500, I: C.s500, D: C.p600, E: C.a400 };
  let y = 2.65;
  (p.steps || []).forEach((st) => {
    const col = STRIDE_COLORS[st.letter] || C.p600;
    s.addShape(P.shapes.OVAL, { x: MX, y, w: 0.56, h: 0.56, fill: { color: col } });
    s.addText(st.letter, { x: MX, y, w: 0.56, h: 0.56, margin: 0, fontFace: DISPLAY, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.label, { x: MX + 0.72, y: y - 0.02, w: CW - 0.72, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.ink });
    s.addText(st.done, { x: MX + 0.72, y: y + 0.38, w: CW - 0.72, h: 1.0, margin: 0, fontFace: BODY, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.25, valign: "top" });
    y += 1.52;
  });
  dfooter(s, n, "Rapport de mission · Confidentiel");
}

// Page résultats & recommandations
function dRapportResultats(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  let y = 2.7;
  (p.resultats || []).forEach((r) => {
    s.addImage({ data: ICON.star, x: MX, y: y + 0.03, w: 0.22, h: 0.22 });
    s.addText([{ text: r.t + "  ", options: { bold: true, color: C.p800 } }, { text: r.d || "", options: { color: C.muted } }],
      { x: MX + 0.38, y: y - 0.04, w: CW - 0.46, h: 0.55, margin: 0, fontFace: BODY, fontSize: 12.5, valign: "top" });
    y += 0.66;
  });
  if (p.recommandations) {
    y += 0.4;
    s.addShape(P.shapes.RECTANGLE, { x: MX, y, w: 0.06, h: p.recommandations.length * 0.62 + 0.3, fill: { color: C.a400 } });
    s.addText("RECOMMANDATIONS", { x: MX + 0.22, y: y, w: CW - 0.22, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, bold: true, color: C.p700, charSpacing: 1.8 });
    y += 0.42;
    p.recommandations.forEach((r) => {
      s.addText("→  " + r, { x: MX + 0.22, y, w: CW - 0.22, h: 0.52, margin: 0, fontFace: BODY, fontSize: 12, color: C.ink, lineSpacingMultiple: 1.2, valign: "top" });
      y += 0.6;
    });
  }
  dfooter(s, n, "Rapport de mission · Confidentiel");
}

// Page suites proposées + signature
function dRapportSuite(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  let y = 2.7;
  (p.etapes || []).forEach((e, i) => {
    const col = i === 0 ? C.p600 : i === 1 ? C.s500 : C.a400;
    s.addShape(P.shapes.OVAL, { x: MX, y, w: 0.56, h: 0.56, fill: { color: col } });
    s.addText(String(i + 1), { x: MX, y, w: 0.56, h: 0.56, margin: 0, fontFace: DISPLAY, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(e.t, { x: MX + 0.72, y: y - 0.02, w: CW - 1.6, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.ink });
    if (e.when) s.addText(e.when, { x: PW - MX - 1.0, y: y, w: 1.0, h: 0.36, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: C.faint, align: "right" });
    s.addText(e.d, { x: MX + 0.72, y: y + 0.38, w: CW - 0.72, h: 0.7, margin: 0, fontFace: BODY, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.2, valign: "top" });
    y += 1.38;
    if (i < (p.etapes.length - 1)) {
      s.addShape(P.shapes.LINE, { x: MX + 0.27, y, w: 0, h: 0.2, line: { color: C.border, width: 1 } });
      y += 0.2;
    }
  });
  const sy = 8.4, bw = (CW - 0.5) / 2;
  s.addShape(P.shapes.LINE, { x: MX, y: sy - 0.1, w: CW, h: 0, line: { color: C.border, width: 1 } });
  [["Pour The Learning Society", "{{Chloé Mimault · Co-fondatrice}}"], ["Pour {{Client}}", "{{Nom · fonction}}"]].forEach((b, i) => {
    const x = MX + i * (bw + 0.5);
    s.addText(b[0], { x, y: sy, w: bw, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: C.p700 });
    s.addShape(P.shapes.LINE, { x, y: sy + 1.2, w: bw, h: 0, line: { color: C.ink, width: 1 } });
    s.addText(b[1], { x, y: sy + 1.28, w: bw, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10, color: C.muted });
    s.addText("Date & signature", { x, y: sy + 1.56, w: bw, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9, italic: true, color: C.faint });
  });
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: PH - 2.2, w: CW, h: 1.0, rectRadius: 0.1, fill: { color: C.p800 } });
  s.addText([{ text: "hello@thelearningsociety.fr     ", options: { bold: true } }, { text: "thelearningsociety.fr" }],
    { x: MX + 0.4, y: PH - 1.95, w: CW - 0.8, h: 0.56, margin: 0, fontFace: BODY, fontSize: 11.5, color: "C9DEE4", valign: "middle" });
  dfooter(s, n, "Rapport de mission · Confidentiel");
}

// ─── CR COACHING layouts ─────────────────────────────────────────────────────

function dCrSummary(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  // Meta bloc (date, participants, type)
  const mw = (CW - 0.4) / 3;
  (p.meta || []).forEach((m, i) => {
    const x = MX + i * (mw + 0.2);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: 2.65, w: mw, h: 1.1, rectRadius: 0.08, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
    s.addText(m.k, { x: x + 0.14, y: 2.78, w: mw - 0.28, h: 0.24, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: C.p700, charSpacing: 1.2 });
    s.addText(m.v, { x: x + 0.14, y: 3.04, w: mw - 0.28, h: 0.56, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.ink, lineSpacingMultiple: 1.0 });
  });
  // Thème & objectif de séance
  let y = 4.1;
  s.addText("THÈME DE LA SÉANCE", { x: MX, y, w: CW, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.p600, charSpacing: 1.5 });
  y += 0.3;
  s.addText(p.theme || "{{ Le thème principal abordé en séance. }}", { x: MX, y, w: CW, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.ink });
  y += 0.7;
  // Points clés
  s.addText("POINTS CLÉS DISCUTÉS", { x: MX, y, w: CW, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.p600, charSpacing: 1.5 });
  y += 0.34;
  (p.points || []).forEach((pt) => {
    s.addImage({ data: ICON.chat, x: MX, y: y + 0.02, w: 0.2, h: 0.2 });
    s.addText(pt, { x: MX + 0.36, y: y - 0.02, w: CW - 0.44, h: 0.52, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.2, valign: "top" });
    y += 0.6;
  });
  // Prise de conscience
  if (p.insight) {
    y += 0.2;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y, w: CW, h: 1.4, rectRadius: 0.1, fill: { color: C.s50 }, line: { color: "F9D4B0", width: 1 } });
    s.addImage({ data: ICON.bulb, x: MX + 0.3, y: y + 0.32, w: 0.28, h: 0.28 });
    s.addText("PRISE DE CONSCIENCE", { x: MX + 0.72, y: y + 0.32, w: 4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.s600, charSpacing: 1.2, valign: "middle" });
    s.addText(p.insight, { x: MX + 0.32, y: y + 0.76, w: CW - 0.64, h: 0.55, margin: 0, fontFace: DISPLAY, fontSize: 14.5, bold: true, color: C.s600, lineSpacingMultiple: 1.0 });
  }
  dfooter(s, n, "Compte-rendu de séance · Confidentiel");
}

function dCrActions(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  // Tableau actions : Quoi / Qui / Quand / Statut
  const cols = [{ w: 3.2, t: "ACTION" }, { w: 1.4, t: "QUI" }, { w: 1.2, t: "POUR LE" }, { w: 0.68, t: "STATUT" }];
  let tx = MX, ty = 2.7;
  // Header
  cols.forEach((c) => {
    s.addShape(P.shapes.RECTANGLE, { x: tx, y: ty, w: c.w, h: 0.42, fill: { color: C.p800 } });
    s.addText(c.t, { x: tx + 0.1, y: ty, w: c.w - 0.2, h: 0.42, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.white, charSpacing: 1.0, valign: "middle" });
    tx += c.w;
  });
  ty += 0.42;
  (p.actions || []).forEach((a, i) => {
    const bg = i % 2 === 0 ? C.white : "F6FAFB";
    tx = MX;
    cols.forEach((c, ci) => {
      s.addShape(P.shapes.RECTANGLE, { x: tx, y: ty, w: c.w, h: 0.7, fill: { color: bg }, line: { color: C.border, width: 0.5 } });
      const val = ci === 0 ? a.a : ci === 1 ? a.who : ci === 2 ? a.when : a.status || "⬜";
      const isStatus = ci === 3;
      const col = isStatus ? (a.status === "✅" ? C.p600 : a.status === "🔄" ? C.s500 : C.muted) : (ci === 0 ? C.ink : C.muted);
      s.addText(val, { x: tx + 0.1, y: ty, w: c.w - 0.2, h: 0.7, margin: 0, fontFace: BODY, fontSize: isStatus ? 16 : 11.5, bold: ci === 0, color: col, valign: "middle", lineSpacingMultiple: 1.1 });
      tx += c.w;
    });
    ty += 0.7;
  });
  // Prochaine séance
  if (p.prochaine) {
    ty += 0.5;
    s.addImage({ data: ICON.clock, x: MX, y: ty + 0.08, w: 0.26, h: 0.26 });
    s.addText("PROCHAINE SÉANCE", { x: MX + 0.4, y: ty, w: 3, h: 0.44, margin: 0, fontFace: BODY, fontSize: 10, bold: true, color: C.p700, charSpacing: 1.2, valign: "middle" });
    s.addText(p.prochaine, { x: MX + 0.4, y: ty + 0.42, w: CW - 0.4, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 13.5, bold: true, color: C.ink });
    if (p.sujet) s.addText("Sujet envisagé : " + p.sujet, { x: MX + 0.4, y: ty + 0.86, w: CW - 0.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, italic: true, color: C.muted });
  }
  // Engagement final
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: PH - 2.6, w: CW, h: 1.4, rectRadius: 0.1, fill: { color: C.p800 } });
  s.addText("ENGAGEMENT DE SÉANCE", { x: MX + 0.4, y: PH - 2.38, w: CW - 0.8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.a400, charSpacing: 1.5 });
  s.addText(p.engagement || "{{ La résolution que l'apprenant prend en quittant la séance. }}", { x: MX + 0.4, y: PH - 2.0, w: CW - 0.8, h: 0.8, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.white, lineSpacingMultiple: 1.05 });
  dfooter(s, n, "Compte-rendu de séance · Confidentiel");
}

// ─── DEVIS layouts ───────────────────────────────────────────────────────────

function dDevisTable(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  // Client meta
  (p.meta || []).forEach((m, i) => {
    s.addText([{ text: m.k + "  ", options: { color: C.muted } }, { text: m.v, options: { bold: true, color: C.ink } }],
      { x: MX, y: 2.58 + i * 0.34, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5 });
  });
  // Tableau prestations
  const cols2 = [{ w: 3.8, t: "PRESTATION" }, { w: 0.9, t: "QTÉ" }, { w: 1.2, t: "P.U." }, { w: 0.68, t: "TOTAL" }];
  let ty = 3.9, tx2;
  // Header
  tx2 = MX;
  cols2.forEach((c, ci) => {
    s.addShape(P.shapes.RECTANGLE, { x: tx2, y: ty, w: c.w, h: 0.42, fill: { color: C.p800 } });
    s.addText(c.t, { x: tx2 + 0.1, y: ty, w: c.w - 0.2, h: 0.42, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.white, charSpacing: 1.0, valign: "middle", align: ci > 0 ? "right" : "left" });
    tx2 += c.w;
  });
  ty += 0.42;
  (p.lignes || []).forEach((l, i) => {
    const bg = i % 2 === 0 ? C.white : "F6FAFB";
    tx2 = MX;
    [l.desc, l.qte, l.pu, l.total].forEach((v, ci) => {
      s.addShape(P.shapes.RECTANGLE, { x: tx2, y: ty, w: cols2[ci].w, h: 0.8, fill: { color: bg }, line: { color: C.border, width: 0.5 } });
      s.addText(v, { x: tx2 + 0.1, y: ty, w: cols2[ci].w - 0.2, h: 0.8, margin: 0, fontFace: BODY, fontSize: ci === 0 ? 11.5 : 11, bold: ci === 0, color: ci === 0 ? C.ink : C.muted, valign: "middle", align: ci > 0 ? "right" : "left", lineSpacingMultiple: 1.1 });
      tx2 += cols2[ci].w;
    });
    ty += 0.8;
    // Sous-ligne description
    if (l.detail) {
      s.addText(l.detail, { x: MX + 0.1, y: ty, w: cols2[0].w - 0.2, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: C.faint });
    }
  });
  // Totaux
  ty += 0.4;
  [["Sous-total HT", p.ht || "sur devis"], ["TVA 20%", p.tva || "sur devis"], ["TOTAL TTC", p.ttc || "sur devis"]].forEach(([k, v], i) => {
    const isFinal = i === 2;
    if (isFinal) s.addShape(P.shapes.RECTANGLE, { x: MX + 3.4, y: ty, w: CW - 3.4, h: 0.48, fill: { color: C.p800 } });
    s.addText(k, { x: MX + 3.4, y: ty, w: CW - 3.4 - 1.2, h: 0.42, margin: 0, fontFace: isFinal ? DISPLAY : BODY, fontSize: isFinal ? 14 : 11, bold: isFinal, color: isFinal ? C.white : C.muted, valign: "middle", align: "left" });
    s.addText(v, { x: PW - MX - 1.2, y: ty, w: 1.1, h: isFinal ? 0.48 : 0.42, margin: 0, fontFace: isFinal ? DISPLAY : BODY, fontSize: isFinal ? 14 : 11, bold: isFinal, color: isFinal ? C.white : C.ink, valign: "middle", align: "right" });
    ty += isFinal ? 0.56 : 0.42;
  });
  if (p.note) s.addText("* " + p.note, { x: MX, y: ty + 0.2, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: C.faint });
  dfooter(s, n, "Devis · Confidentiel");
}

function dDevisSign(s, p, n) {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  // Conditions
  let y = 2.7;
  (p.conditions || []).forEach((c) => {
    s.addText("→  " + c, { x: MX, y, w: CW, h: 0.52, margin: 0, fontFace: BODY, fontSize: 12, color: C.ink, lineSpacingMultiple: 1.2, valign: "top" });
    y += 0.6;
  });
  // Zone signature
  y = Math.max(y + 0.6, 5.5);
  const bw = (CW - 0.5) / 2;
  s.addShape(P.shapes.LINE, { x: MX, y: y - 0.1, w: CW, h: 0, line: { color: C.border, width: 1 } });
  [["Pour The Learning Society", "Chloé Mimault · Co-fondatrice"], ["Bon pour accord — {{Client}}", "{{Nom · fonction}}"]].forEach((b, i) => {
    const x = MX + i * (bw + 0.5);
    s.addText(b[0], { x, y, w: bw, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: C.p700 });
    s.addShape(P.shapes.LINE, { x, y: y + 1.3, w: bw, h: 0, line: { color: C.ink, width: 1 } });
    s.addText(b[1], { x, y: y + 1.36, w: bw, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10, color: C.muted });
    s.addText("Date & signature", { x, y: y + 1.62, w: bw, h: 0.28, margin: 0, fontFace: BODY, fontSize: 9, italic: true, color: C.faint });
  });
  // CTA
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: PH - 2.4, w: CW, h: 1.2, rectRadius: 0.1, fill: { color: C.p800 } });
  s.addText("Une question sur ce devis ?", { x: MX + 0.4, y: PH - 2.2, w: CW - 0.8, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.white });
  s.addText([{ text: "hello@thelearningsociety.fr     ", options: { bold: true } }, { text: "thelearningsociety.fr" }],
    { x: MX + 0.4, y: PH - 1.78, w: CW - 0.8, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11.5, color: "C9DEE4", valign: "middle" });
  dfooter(s, n, "Devis · Confidentiel");
}

// ─── Build ───────────────────────────────────────────────────────────────────

function buildDoc(file, title, specs) {
  P = new pptxgen();
  P.defineLayout({ name: "A4P", width: PW, height: PH }); P.layout = "A4P";
  P.author = "The Learning Society"; P.title = title;
  specs.forEach((sp, i) => {
    const s = P.addSlide();
    const pg = String(i + 1);
    if (sp.type === "dCover")            dCover(s, sp);
    else if (sp.type === "dRapportIntro")    dRapportIntro(s, sp, pg);
    else if (sp.type === "dRapportStride")   dRapportStride(s, sp, pg);
    else if (sp.type === "dRapportResultats") dRapportResultats(s, sp, pg);
    else if (sp.type === "dRapportSuite")    dRapportSuite(s, sp, pg);
    else if (sp.type === "dCrSummary")   dCrSummary(s, sp, pg);
    else if (sp.type === "dCrActions")   dCrActions(s, sp, pg);
    else if (sp.type === "dDevisTable")  dDevisTable(s, sp, pg);
    else if (sp.type === "dDevisSign")   dDevisSign(s, sp, pg);
  });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();

  // ── DOC 1 : Rapport de Mission STRIDE ──────────────────────────────────────
  await buildDoc("TLS-doc-rapport-mission.pptx", "TLS — Rapport de Mission STRIDE", [
    { type: "dCover",
      eyebrow: "RAPPORT DE MISSION · CONFIDENTIEL",
      title: "Rapport de\nMission",
      subtitle: "{{ Titre de la mission — ex. Diagnostic SBO & Plan de Transformation }}",
      meta: [{ k: "Client", v: "{{Organisation}}" }, { k: "Mission", v: "{{Audit Flash STRIDE / Accompagnement / Formation}}" }, { k: "Période", v: "{{Mois YYYY – Mois YYYY}}" }, { k: "Référence", v: "{{REF-000}}" }] },

    { type: "dRapportIntro",
      eyebrow: "01 · CONTEXTE & OBJECTIFS",
      title: "Ce que nous avons fait ensemble",
      paras: [
        "{{ Rappel du contexte de départ : situation de l'organisation, enjeux identifiés, ce qui a motivé la mission. 3-4 lignes. }}",
        "{{ Objectifs fixés au démarrage et périmètre d'intervention. }}",
      ],
      kpis: [
        { v: "{{X}}", l: "participants impliqués" },
        { v: "{{X}}", l: "semaines de mission" },
        { v: "{{X}}", l: "livrables produits" },
      ] },

    { type: "dRapportStride",
      eyebrow: "02 · CE QUE NOUS AVONS RÉALISÉ",
      title: "Les 6 étapes STRIDE",
      steps: [
        { letter: "S", label: "S'orienter — Audit de maturité SBO", done: "{{ Ce qui a été fait, observé, livré à cette étape. Inclure les outils utilisés et les personnes rencontrées. }}" },
        { letter: "T", label: "Tester — Prototypage & expérimentation", done: "{{ Description des actions menées, ateliers, tests pilote. }}" },
        { letter: "R", label: "Réaliser — Déploiement opérationnel", done: "{{ Ce qui a été construit, paramétré, formé. }}" },
        { letter: "I", label: "Intégrer — Ancrage dans les pratiques", done: "{{ Comment les équipes ont intégré les changements. }}" },
        { letter: "D", label: "Déployer — Généralisation", done: "{{ Périmètre du déploiement, jalons franchis. }}" },
        { letter: "E", label: "Évoluer — Pilotage & amélioration continue", done: "{{ Indicateurs mis en place, boucles de feedback, feuille de route. }}" },
      ] },

    { type: "dRapportResultats",
      eyebrow: "03 · RÉSULTATS & RECOMMANDATIONS",
      title: "Où nous en sommes",
      resultats: [
        { t: "{{Résultat 1}}", d: "— {{ description et preuve mesurable si disponible. }}" },
        { t: "{{Résultat 2}}", d: "— {{ description }}" },
        { t: "{{Résultat 3}}", d: "— {{ description }}" },
        { t: "{{Résultat 4}}", d: "— {{ description }}" },
      ],
      recommandations: [
        "{{ Recommandation prioritaire 1 — action à mener dans les 30 jours. }}",
        "{{ Recommandation 2 — à horizon 3 mois. }}",
        "{{ Recommandation 3 — axe stratégique à 6-12 mois. }}",
      ] },

    { type: "dRapportSuite",
      eyebrow: "04 · PROCHAINES ÉTAPES",
      title: "Pour continuer sur cette lancée",
      etapes: [
        { t: "{{Étape 1}}", when: "{{Mois YYYY}}", d: "{{ Description de la prochaine action concrète. }}" },
        { t: "{{Étape 2}}", when: "{{Mois YYYY}}", d: "{{ Suite logique de l'accompagnement proposée. }}" },
        { t: "{{Étape 3}}", when: "{{T3 YYYY}}", d: "{{ Vision à moyen terme et format d'intervention suggéré. }}" },
      ] },
  ]);

  // ── DOC 2 : Compte-Rendu de Coaching ──────────────────────────────────────
  await buildDoc("TLS-doc-compte-rendu-coaching.pptx", "TLS — Compte-Rendu de Séance Coaching", [
    { type: "dCover",
      eyebrow: "COMPTE-RENDU DE SÉANCE · CONFIDENTIEL",
      title: "Compte-Rendu\nde Coaching",
      subtitle: "{{ Intitulé du parcours ou de l'objectif de coaching }}",
      meta: [{ k: "Apprenant", v: "{{Prénom Nom}}" }, { k: "Coach", v: "{{Prénom Nom · The Learning Society}}" }, { k: "Date", v: "{{JJ mois YYYY}}" }, { k: "Séance", v: "{{N° / total — ex. Séance 3 sur 6}}" }] },

    { type: "dCrSummary",
      eyebrow: "01 · RÉSUMÉ DE SÉANCE",
      title: "Ce que nous avons exploré",
      meta: [{ k: "DATE", v: "{{JJ mois YYYY}}" }, { k: "DURÉE", v: "{{60 / 90 min}}" }, { k: "FORMAT", v: "{{Visio / Présentiel}}" }],
      theme: "{{ Le thème central de la séance en une ligne. }}",
      points: [
        "{{ Premier point clé abordé — reformulez la situation ou la problématique explorée. }}",
        "{{ Deuxième point : une tension, une croyance, un levier identifié. }}",
        "{{ Troisième point : une décision, un changement de posture, une clarification. }}",
      ],
      insight: "« {{ La prise de conscience principale de l'apprenant, idéalement dans ses propres mots. }} »" },

    { type: "dCrActions",
      eyebrow: "02 · PLAN D'ACTION & SUITE",
      title: "Engagements et prochaine séance",
      actions: [
        { a: "{{ Action 1 : ce que l'apprenant s'engage à faire avant la prochaine séance. }}", who: "{{Prénom}}", when: "{{JJ/MM}}", status: "⬜" },
        { a: "{{ Action 2 : expérimentation ou observation à mener. }}", who: "{{Prénom}}", when: "{{JJ/MM}}", status: "⬜" },
        { a: "{{ Action 3 : lecture, ressource ou réflexion suggérée par le coach. }}", who: "{{Prénom}}", when: "{{JJ/MM}}", status: "⬜" },
        { a: "{{ Action 4 (optionnelle). }}", who: "{{Prénom}}", when: "{{JJ/MM}}", status: "⬜" },
      ],
      prochaine: "{{JJ mois YYYY à HHhMM}}",
      sujet: "{{ Thème envisagé pour la prochaine séance, à confirmer. }}",
      engagement: "« {{ La résolution de séance — ce que l'apprenant emporte comme intention forte. }} »" },
  ]);

  // ── DOC 3 : Devis ──────────────────────────────────────────────────────────
  await buildDoc("TLS-doc-devis.pptx", "TLS — Devis (gabarit)", [
    { type: "dCover",
      eyebrow: "DEVIS · CONFIDENTIEL",
      title: "Proposition\nChiffrée",
      subtitle: "{{ Objet de la prestation en une ligne. }}",
      meta: [{ k: "Établi pour", v: "{{Organisation / Contact}}" }, { k: "Par", v: "The Learning Society" }, { k: "Date d'émission", v: "{{JJ mois YYYY}}" }, { k: "Valable jusqu'au", v: "{{JJ mois YYYY}}" }, { k: "Référence", v: "{{DEV-000}}" }] },

    { type: "dDevisTable",
      eyebrow: "01 · DÉTAIL DES PRESTATIONS",
      title: "Ce qui est proposé",
      meta: [{ k: "Client", v: "{{Organisation}}" }, { k: "Contact", v: "{{Prénom Nom · fonction}}" }, { k: "Objet", v: "{{Intitulé de la prestation}}" }],
      lignes: [
        { desc: "{{Prestation 1 — ex. Audit Flash SBO (1 jour)}}",       detail: "{{ Détail : livrables, modalités, durée. }}", qte: "{{1 j}}",   pu: "sur devis", total: "sur devis" },
        { desc: "{{Prestation 2 — ex. Formation Formateur Augmenté}}",    detail: "{{ 7 modules e-learning + 2 classes virtuelles. }}",             qte: "{{1 acc}}", pu: "sur devis", total: "sur devis" },
        { desc: "{{Prestation 3 — ex. Accès Learning App (12 mois)}}",   detail: "{{ X utilisateurs, support inclus. }}",                          qte: "{{X util}}", pu: "sur devis", total: "sur devis" },
        { desc: "{{Prestation 4 — ex. Séances de coaching individuel}}", detail: "{{ X séances de 60 min en visio. }}",                             qte: "{{X séa}}", pu: "sur devis", total: "sur devis" },
      ],
      ht:  "sur devis",
      tva: "sur devis",
      ttc: "sur devis",
      note: "Les tarifs sont communiqués sur demande et calibrés ensemble après échange de cadrage. Toute prestation fait l'objet d'un devis écrit signé avant démarrage." },

    { type: "dDevisSign",
      eyebrow: "02 · CONDITIONS & ACCORD",
      title: "Conditions générales simplifiées",
      conditions: [
        "Validité du devis : 30 jours à compter de la date d'émission.",
        "Acompte de 30 % à la commande, solde à 30 jours date de facture.",
        "Annulation : remboursement intégral jusqu'à J-15 ; 50 % au-delà sauf force majeure.",
        "Formation : convention de formation disponible sur demande (Qualiopi n° {{XXXXX}}).",
        "Données personnelles : traitement conforme au RGPD — notre DPA est disponible sur demande.",
        "Litige : droit français applicable ; tribunal compétent : Paris (75).",
      ] },
  ]);

  console.log("✅ docs2 : rapport-mission + compte-rendu-coaching + devis écrits");
})();
