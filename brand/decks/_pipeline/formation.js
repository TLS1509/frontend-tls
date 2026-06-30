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
const MX = 0.6, W = 10, H = 5.625, CW = 8.8;
const shadow = () => ({ type: "outer", color: C.p900, blur: 9, offset: 3, angle: 90, opacity: 0.1 });
const s2png = (svg) => sharp(Buffer.from(svg)).png().toBuffer();
async function icon(IC, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color: "#" + color, size: String(size) }));
  return "image/png;base64," + (await s2png(svg)).toString("base64");
}
let BG = {}, ICON = {}, P;
async function assets() {
  const cover = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F5F6A"/><stop offset="0.55" stop-color="#28525C"/><stop offset="1" stop-color="#1F3E45"/></linearGradient>
    <radialGradient id="gl" cx="0.85" cy="0.12" r="0.55"><stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/><stop offset="1" stop-color="#F8B044" stop-opacity="0"/></radialGradient>
    <radialGradient id="gl2" cx="0.05" cy="0.95" r="0.5"><stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/><stop offset="1" stop-color="#55A1B4" stop-opacity="0"/></radialGradient>
    </defs><rect width="2000" height="1125" fill="url(#g)"/><rect width="2000" height="1125" fill="url(#gl)"/><rect width="2000" height="1125" fill="url(#gl2)"/></svg>`;
  const content = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F4F7"/><stop offset="0.5" stop-color="#FBF7F2"/><stop offset="1" stop-color="#FFF3EB"/></linearGradient>
    </defs><rect width="2000" height="1125" fill="url(#cg)"/></svg>`;
  fs.writeFileSync("assets/cover-bg.png", await s2png(cover));
  fs.writeFileSync("assets/content-bg.png", await s2png(content));
  BG.cover = "assets/cover-bg.png"; BG.content = "assets/content-bg.png";
  ICON.checkT = await icon(FA.FaCheckCircle, C.p600); ICON.starT = await icon(FA.FaStar, C.s500);
  ICON.arrowT = await icon(FA.FaArrowRight, C.p600); ICON.bulbT = await icon(FA.FaRegLightbulb, C.p600);
  ICON.award = await icon(FA.FaAward, C.white); ICON.arrowD = await icon(FA.FaArrowRight, C.p900);
  ICON.quote = await icon(FA.FaQuoteLeft, C.a400);
}
function footer(s, n, t) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 5.31, w: 0.1, h: 0.1, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.16, y: 5.23, w: 3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: C.faint, valign: "middle" });
  s.addText(`${n} / ${t}`, { x: W - 1.6, y: 5.23, w: 1, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, color: C.faint, align: "right" });
}
function chip(s, x, y, text) {
  const w = 0.34 + text.length * 0.084;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color: "FFFFFF", transparency: 84 }, line: { color: "FFFFFF", transparency: 55, width: 1 } });
  s.addText(text, { x, y, w, h: 0.34, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  return w;
}
function tag(s, x, y, label, fill, dark) {
  const w = 0.36 + label.length * 0.108;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color: fill } });
  s.addText(label, { x, y, w, h: 0.34, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: dark ? C.p900 : C.white, align: "center", valign: "middle", charSpacing: 1 });
  return w;
}
function phead(s, label, fill, title, dark) {
  tag(s, MX, 0.55, label, fill, dark);
  s.addText(title, { x: MX - 0.03, y: 1.0, w: CW, h: 0.82, margin: 0, fontFace: DISPLAY, fontSize: 28, bold: true, color: C.ink });
}

const L = {};
L.pcover = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 2.28, w: 8.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.a400, charSpacing: 2.2 });
  s.addText(p.title, { x: MX - 0.05, y: 2.64, w: 8.6, h: 1.4, margin: 0, fontFace: DISPLAY, fontSize: 36, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  let cx = MX; (p.chips || []).forEach((tt) => { cx += chip(s, cx, 4.4, tt) + 0.16; });
  s.addText(p.meta, { x: MX, y: 5.08, w: 8.5, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, color: "9FBEC6" });
};
L.hook = (s, p) => {
  s.background = { path: BG.cover };
  s.addImage({ data: ICON.quote, x: MX, y: 1.3, w: 0.52, h: 0.52 });
  s.addText(p.kicker || "ACCROCHE", { x: MX, y: 1.95, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.a400, charSpacing: 2.2 });
  s.addText(p.question, { x: MX - 0.03, y: 2.3, w: 8.7, h: 1.7, margin: 0, fontFace: DISPLAY, fontSize: 32, bold: true, color: C.white, lineSpacingMultiple: 1.02 });
  if (p.sub) s.addText(p.sub, { x: MX, y: 4.35, w: 8.2, h: 0.4, margin: 0, fontFace: BODY, fontSize: 14, color: "C9DEE4" });
};
L.list = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag, p.fill, p.title, p.dark);
  const ic = p.icon === "star" ? ICON.starT : p.icon === "arrow" ? ICON.arrowT : ICON.checkT;
  const startY = 2.05, rh = (4.75 - startY) / Math.max(p.items.length, 1);
  p.items.forEach((it, i) => {
    const y = startY + i * rh;
    s.addImage({ data: ic, x: MX, y: y + (rh - 0.28) / 2, w: 0.28, h: 0.28 });
    s.addText([{ text: it.b + (it.d ? "  " : ""), options: { bold: true, color: C.p800 } }, { text: it.d ? "— " + it.d : "", options: { color: C.muted } }],
      { x: MX + 0.52, y, w: CW - 0.6, h: rh, margin: 0, fontFace: BODY, fontSize: 14, valign: "middle" });
  });
  if (p.note) s.addText(p.note, { x: MX, y: 4.86, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: C.faint });
  footer(s, n, t);
};
L.psteps = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag, p.fill, p.title, p.dark);
  const k = p.steps.length, cw = CW / k, cy = 2.3;
  p.steps.forEach((st, i) => {
    const cx = MX + i * cw + cw / 2;
    s.addShape(P.shapes.OVAL, { x: cx - 0.36, y: cy, w: 0.72, h: 0.72, fill: { color: C.p600 } });
    s.addText(String(i + 1), { x: cx - 0.36, y: cy, w: 0.72, h: 0.72, margin: 0, fontFace: DISPLAY, fontSize: 24, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.t, { x: MX + i * cw + 0.1, y: cy + 0.92, w: cw - 0.2, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, align: "center" });
    s.addText(st.d, { x: MX + i * cw + 0.14, y: cy + 1.42, w: cw - 0.28, h: 1.1, margin: 0, fontFace: BODY, fontSize: 11.5, color: C.muted, align: "center", lineSpacingMultiple: 1.05 });
  });
  footer(s, n, t);
};
L.concept = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "CONCEPT CLÉ", C.p600, p.title);
  s.addText(p.definition, { x: MX, y: 2.15, w: 4.5, h: 2.5, margin: 0, fontFace: BODY, fontSize: 14, color: C.ink, lineSpacingMultiple: 1.25, valign: "top" });
  const fx = 5.4, fy = 2.05, fw = 4.0, fh = 2.65;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.14, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
  s.addImage({ data: ICON.bulbT, x: fx + 0.3, y: fy + 0.3, w: 0.32, h: 0.32 });
  s.addText("À RETENIR", { x: fx + 0.74, y: fy + 0.3, w: fw - 1, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p700, charSpacing: 1.5, valign: "middle" });
  s.addText(p.retain, { x: fx + 0.32, y: fy + 0.84, w: fw - 0.64, h: fh - 1.05, margin: 0, fontFace: DISPLAY, fontSize: 17, bold: true, color: C.p800, lineSpacingMultiple: 1.08, valign: "top" });
  footer(s, n, t);
};
L.example = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "EXEMPLE", C.p600, p.title);
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 2.05, w: CW, h: 2.65, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
  p.steps.forEach((st, i) => {
    const y = 2.38 + i * 0.66;
    s.addShape(P.shapes.OVAL, { x: MX + 0.38, y, w: 0.4, h: 0.4, fill: { color: C.p600 } });
    s.addText(String(i + 1), { x: MX + 0.38, y, w: 0.4, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st, { x: MX + 1.0, y: y - 0.04, w: CW - 1.5, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13.5, color: C.ink, valign: "middle" });
  });
  footer(s, n, t);
};
L.activity = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "ACTIVITÉ", C.s500, p.title);
  p.steps.forEach((st, i) => {
    const y = 2.15 + i * 0.52;
    s.addShape(P.shapes.OVAL, { x: MX, y: y + 0.05, w: 0.12, h: 0.12, fill: { color: C.s500 } });
    s.addText(st, { x: MX + 0.32, y: y - 0.05, w: 4.3, h: 0.45, margin: 0, fontFace: BODY, fontSize: 13, color: C.ink, valign: "middle" });
  });
  (p.chips || []).forEach((tt, ci) => { tag(s, MX, 3.95 + ci * 0.46, tt, C.s50, true); });
  const fx = 5.15, fy = 2.05, fw = 4.25, fh = 2.65;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.14, fill: { color: C.white }, line: { color: "D8C3B4", width: 1.25, dashType: "dash" } });
  s.addText("{{ Zone de réponse / prise de notes }}", { x: fx + 0.3, y: fy + 0.26, w: fw - 0.6, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11, italic: true, color: "B9A491" });
  footer(s, n, t);
};
L.quiz = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "QUIZ", C.a400, p.title, true);
  const startY = 2.1, rh = 0.62;
  p.options.forEach((o, i) => {
    const y = startY + i * rh;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y, w: CW, h: 0.5, rectRadius: 0.1, fill: { color: o.correct ? C.p50 : C.white }, line: { color: o.correct ? C.p500 : C.border, width: o.correct ? 1.5 : 1 } });
    s.addShape(P.shapes.OVAL, { x: MX + 0.14, y: y + 0.09, w: 0.32, h: 0.32, fill: { color: o.correct ? C.p600 : "DCE6EA" } });
    s.addText(String.fromCharCode(65 + i), { x: MX + 0.14, y: y + 0.09, w: 0.32, h: 0.32, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: o.correct ? C.white : C.p700, align: "center", valign: "middle" });
    s.addText(o.t, { x: MX + 0.62, y, w: CW - 1.4, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, color: C.ink, valign: "middle" });
    if (o.correct) s.addImage({ data: ICON.checkT, x: W - 1.02, y: y + 0.13, w: 0.24, h: 0.24 });
  });
  if (p.reveal) s.addText([{ text: "Réponse : ", options: { bold: true, color: C.p700 } }, { text: p.reveal, options: { color: C.muted } }],
    { x: MX, y: startY + p.options.length * rh + 0.06, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 12, italic: true, valign: "middle" });
  footer(s, n, t);
};
L.psituation = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "MISE EN SITUATION", C.s500, p.title);
  const cards = [p.left, p.right]; const cw = 4.25, gap = 0.3, cy = 2.05, ch = 2.85;
  cards.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: i === 0 ? C.white : C.p50 }, line: { color: C.border, width: 1 }, shadow: shadow() });
    s.addText(c.h, { x: x + 0.34, y: cy + 0.3, w: cw - 0.6, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: i === 0 ? C.s600 : C.p800, valign: "middle" });
    c.items.forEach((it, j) => {
      const ry = cy + 0.9 + j * 0.58;
      s.addShape(P.shapes.OVAL, { x: x + 0.38, y: ry + 0.07, w: 0.12, h: 0.12, fill: { color: i === 0 ? C.s500 : C.p500 } });
      s.addText(it, { x: x + 0.64, y: ry - 0.05, w: cw - 0.95, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12, color: i === 0 ? C.muted : C.p800, valign: "middle" });
    });
  });
  footer(s, n, t);
};
L.reflection = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "RÉFLEXION", C.s600, p.title);
  s.addText(p.prompt, { x: MX, y: 2.15, w: CW, h: 1.0, margin: 0, fontFace: DISPLAY, fontSize: 21, bold: true, color: C.p800, lineSpacingMultiple: 1.05 });
  for (let i = 0; i < 3; i++) s.addShape(P.shapes.LINE, { x: MX, y: 3.45 + i * 0.48, w: CW, h: 0, line: { color: "D9E2E6", width: 1 } });
  s.addText(p.note || "Notez votre réponse dans votre Journal d'apprentissage sur la Learning App.", { x: MX, y: 4.86, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, italic: true, color: C.p600 });
  footer(s, n, t);
};
L.pclosing = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addShape(P.shapes.OVAL, { x: 7.95, y: 1.65, w: 1.4, h: 1.4, fill: { color: C.p600 } });
  s.addImage({ data: ICON.award, x: 8.35, y: 2.05, w: 0.6, h: 0.6 });
  s.addText(p.title, { x: MX - 0.05, y: 2.15, w: 7.0, h: 1.0, margin: 0, fontFace: DISPLAY, fontSize: 38, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  s.addText(p.subtitle, { x: MX, y: 3.3, w: 7.0, h: 0.8, margin: 0, fontFace: BODY, fontSize: 14, color: "C9DEE4", lineSpacingMultiple: 1.1 });
  const cy = 4.45;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: cy, w: 2.4, h: 0.58, rectRadius: 0.29, fill: { color: C.a400 } });
  s.addText(p.cta || "Continuer", { x: MX + 0.1, y: cy, w: 1.8, h: 0.58, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addImage({ data: ICON.arrowD, x: MX + 1.95, y: cy + 0.2, w: 0.18, h: 0.18 });
  if (p.next) s.addText(p.next, { x: MX + 2.75, y: cy, w: 6, h: 0.58, margin: 0, fontFace: BODY, fontSize: 12.5, color: "C9DEE4", valign: "middle" });
};

function buildDeck(file, title, specs) {
  P = new pptxgen();
  P.defineLayout({ name: "TLS", width: W, height: H }); P.layout = "TLS";
  P.author = "The Learning Society"; P.title = title;
  const total = specs.length;
  specs.forEach((sp, i) => { const s = P.addSlide(); L[sp.type](s, sp, i + 1, total); });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();
  await buildDeck("TLS-deck-formation-module.pptx", "TLS — Module de formation (gabarit)", [
    { type: "pcover", eyebrow: "FORMATION · {{Nom du parcours}}", title: "{{Titre du module}}", chips: ["{{45 min}}", "{{Niveau}}", "{{Présentiel / Distanciel}}"], meta: "Module {{X}} / {{Y}}  ·  {{Formateur·trice}}" },
    { type: "hook", kicker: "POURQUOI C'EST IMPORTANT", question: "{{ Posez ici une question qui accroche vos apprenants. }}", sub: "Prenez 30 secondes pour y réfléchir avant de continuer." },
    { type: "list", tag: "OBJECTIFS", fill: C.p600, title: "À la fin de ce module, vous saurez :", icon: "check", items: [
      { b: "{{Verbe d'action}}", d: "{{objectif d'apprentissage 1}}" },
      { b: "{{Verbe d'action}}", d: "{{objectif d'apprentissage 2}}" },
      { b: "{{Verbe d'action}}", d: "{{objectif d'apprentissage 3}}" },
    ], note: "Astuce : 1 objectif = 1 verbe d'action mesurable (identifier, analyser, appliquer…)." },
    { type: "psteps", tag: "LE PARCOURS", fill: C.p600, title: "Au programme de ce module", steps: [
      { t: "{{Chapitre 1}}", d: "{{idée clé}}" }, { t: "{{Chapitre 2}}", d: "{{idée clé}}" },
      { t: "{{Chapitre 3}}", d: "{{idée clé}}" }, { t: "{{Chapitre 4}}", d: "{{idée clé}}" },
    ] },
    { type: "concept", title: "{{Nom du concept clé}}", definition: "{{ Expliquez le concept clé en 2 à 3 phrases simples et concrètes. Privilégiez un exemple parlant à une définition abstraite. }}", retain: "{{ Le point essentiel à mémoriser, en une phrase. }}" },
    { type: "example", title: "{{Un exemple concret}}", steps: ["{{Élément / étape 1 de l'exemple}}", "{{Élément / étape 2 de l'exemple}}", "{{Élément / étape 3 de l'exemple}}"] },
    { type: "activity", title: "{{Consigne de l'activité}}", steps: ["{{Instruction 1}}", "{{Instruction 2}}", "{{Instruction 3}}"], chips: ["Durée : {{10 min}}", "Mode : {{Individuel}}"] },
    { type: "quiz", title: "{{ Posez votre question de vérification ? }}", options: [
      { t: "{{Réponse A}}" }, { t: "{{Réponse B}}", correct: true }, { t: "{{Réponse C}}" }, { t: "{{Réponse D}}" },
    ], reveal: "{{B}} — {{courte explication de la bonne réponse}}" },
    { type: "psituation", title: "{{Cas pratique}}", left: { h: "La situation", items: ["{{Contexte de la situation}}", "{{Élément 2}}", "{{Élément 3}}"] }, right: { h: "À vous d'analyser", items: ["{{Question 1}}", "{{Question 2}}", "{{Question 3}}"] } },
    { type: "list", tag: "À RETENIR", fill: C.p600, title: "Les points clés", icon: "star", items: [
      { b: "{{Point clé 1}}", d: "{{précision}}" }, { b: "{{Point clé 2}}", d: "{{précision}}" }, { b: "{{Point clé 3}}", d: "{{précision}}" },
    ] },
    { type: "reflection", title: "Prenez un temps de recul", prompt: "{{ Quelle est la première chose que vous allez mettre en pratique, et comment ? }}", note: "Notez votre réponse dans votre Journal d'apprentissage sur la Learning App." },
    { type: "list", tag: "POUR ALLER PLUS LOIN", fill: C.p600, title: "Ressources", icon: "arrow", items: [
      { b: "{{Ressource 1}}", d: "{{type / lien}}" }, { b: "{{Ressource 2}}", d: "{{type / lien}}" }, { b: "{{Ressource 3}}", d: "{{type / lien}}" },
    ] },
    { type: "pclosing", title: "Bravo, module terminé.", subtitle: "Vous avez gagné {{XP}} points et débloqué le badge « {{Nom du badge}} ».", cta: "Continuer", next: "Module suivant : {{Titre}}" },
  ]);
  console.log("formation written");
})();
