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
  ICON.quote = await icon(FA.FaQuoteLeft, C.a400); ICON.clock = await icon(FA.FaRegClock, C.p600);
  ICON.users = await icon(FA.FaUsers, C.s600);
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
function timingBadge(s, text) {
  const w = 0.6 + text.length * 0.078;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: W - MX - w, y: 0.56, w, h: 0.34, rectRadius: 0.17, fill: { color: C.white }, line: { color: C.p500, width: 1 } });
  s.addImage({ data: ICON.clock, x: W - MX - w + 0.16, y: 0.635, w: 0.18, h: 0.18 });
  s.addText(text, { x: W - MX - w + 0.4, y: 0.56, w: w - 0.42, h: 0.34, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: C.p700, valign: "middle" });
}
function phead(s, label, fill, title, dark, time) {
  tag(s, MX, 0.55, label, fill, dark);
  if (time) timingBadge(s, time);
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
  s.background = { path: BG.content }; phead(s, p.tag, p.fill, p.title, p.dark, p.time);
  const ic = p.icon === "star" ? ICON.starT : p.icon === "arrow" ? ICON.arrowT : ICON.checkT;
  const startY = 2.05, rh = (4.75 - startY) / Math.max(p.items.length, 1);
  p.items.forEach((it, i) => {
    const y = startY + i * rh;
    s.addImage({ data: ic, x: MX, y: y + (rh - 0.28) / 2, w: 0.28, h: 0.28 });
    s.addText([{ text: it.b + (it.d ? "  " : ""), options: { bold: true, color: C.p800 } }, { text: it.d ? "— " + it.d : "", options: { color: C.muted } }],
      { x: MX + 0.52, y, w: CW - 0.6, h: rh, margin: 0, fontFace: BODY, fontSize: 14, valign: "middle" });
  });
  footer(s, n, t);
};
L.psteps = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag, p.fill, p.title, p.dark, p.time);
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
  s.background = { path: BG.content }; phead(s, p.tag || "APPORT", C.p600, p.title, false, p.time);
  s.addText(p.definition, { x: MX, y: 2.15, w: 4.5, h: 2.5, margin: 0, fontFace: BODY, fontSize: 14, color: C.ink, lineSpacingMultiple: 1.25, valign: "top" });
  const fx = 5.4, fy = 2.05, fw = 4.0, fh = 2.65;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.14, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
  s.addImage({ data: ICON.bulbT, x: fx + 0.3, y: fy + 0.3, w: 0.32, h: 0.32 });
  s.addText("À RETENIR", { x: fx + 0.74, y: fy + 0.3, w: fw - 1, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p700, charSpacing: 1.5, valign: "middle" });
  s.addText(p.retain, { x: fx + 0.32, y: fy + 0.84, w: fw - 0.64, h: fh - 1.05, margin: 0, fontFace: DISPLAY, fontSize: 17, bold: true, color: C.p800, lineSpacingMultiple: 1.08, valign: "top" });
  footer(s, n, t);
};
L.groupwork = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "EN SOUS-GROUPES", C.s500, p.title, false, p.time);
  (p.steps || []).forEach((st, i) => {
    const y = 2.15 + i * 0.5;
    s.addShape(P.shapes.OVAL, { x: MX, y: y + 0.05, w: 0.12, h: 0.12, fill: { color: C.s500 } });
    s.addText(st, { x: MX + 0.32, y: y - 0.05, w: 4.3, h: 0.45, margin: 0, fontFace: BODY, fontSize: 13, color: C.ink, valign: "middle" });
  });
  (p.chips || []).forEach((tt, ci) => { tag(s, MX, 3.95 + ci * 0.46, tt, C.s50, true); });
  const fx = 5.15, fy = 2.05, fw = 4.25, fh = 2.65;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
  s.addImage({ data: ICON.users, x: fx + 0.3, y: fy + 0.3, w: 0.32, h: 0.28 });
  s.addText("RESTITUTION", { x: fx + 0.74, y: fy + 0.28, w: fw - 1, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.s600, charSpacing: 1.5, valign: "middle" });
  s.addText(p.restitution || "{{ Ce que chaque groupe restitue }}", { x: fx + 0.32, y: fy + 0.82, w: fw - 0.64, h: fh - 1.05, margin: 0, fontFace: DISPLAY, fontSize: 15.5, bold: true, color: C.p800, lineSpacingMultiple: 1.1, valign: "top" });
  footer(s, n, t);
};
L.quiz = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "QUIZ", C.a400, p.title, true, p.time);
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
  s.background = { path: BG.content }; phead(s, p.tag || "MISE EN SITUATION", C.s500, p.title, false, p.time);
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
L.actionplan = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "PLAN D'ACTION", C.p600, p.title, false, p.time);
  const cols = p.cols || ["Quoi ?", "Qui ?", "Quand ?"];
  const xs = [MX, MX + 4.6, MX + 6.7], ws = [4.4, 2.0, 2.0];
  const hy = 2.15;
  cols.forEach((c, i) => s.addText(c, { x: xs[i], y: hy, w: ws[i], h: 0.36, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p700, charSpacing: 1, valign: "middle" }));
  s.addShape(P.shapes.LINE, { x: MX, y: hy + 0.44, w: CW, h: 0, line: { color: C.p500, width: 1.5 } });
  (p.rows || []).forEach((r, i) => {
    const y = hy + 0.62 + i * 0.62;
    r.forEach((cell, j) => s.addText(cell, { x: xs[j], y, w: ws[j], h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, bold: j === 0, color: j === 0 ? C.ink : C.muted, valign: "middle" }));
    s.addShape(P.shapes.LINE, { x: MX, y: y + 0.5, w: CW, h: 0, line: { color: C.border, width: 1 } });
  });
  footer(s, n, t);
};
L.priomatrix = (s, p, n, t) => {
  s.background = { path: BG.content }; phead(s, p.tag || "PRIORISATION", C.p600, p.title, false, p.time);
  const ox = 3.0, oy = 2.0, sz = 2.95, h2 = sz / 2;
  const q = p.q || ["Quick wins", "Chantiers clés", "Plus tard", "À challenger"];
  const subs = ["Fort impact · faible effort", "Fort impact · fort effort", "Faible impact · faible effort", "Faible impact · fort effort"];
  const fills = [C.p50, C.white, C.white, C.s50];
  const pos = [[ox, oy], [ox + h2, oy], [ox, oy + h2], [ox + h2, oy + h2]];
  pos.forEach((pp, i) => {
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: pp[0] + 0.04, y: pp[1] + 0.04, w: h2 - 0.08, h: h2 - 0.08, rectRadius: 0.08, fill: { color: fills[i] }, line: { color: C.border, width: 1 } });
    s.addText(q[i], { x: pp[0] + 0.18, y: pp[1] + 0.22, w: h2 - 0.34, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.p800 });
    s.addText(subs[i], { x: pp[0] + 0.18, y: pp[1] + 0.64, w: h2 - 0.34, h: 0.5, margin: 0, fontFace: BODY, fontSize: 9, color: C.muted });
  });
  s.addText("IMPACT ↑", { x: ox - 1.5, y: oy + 0.1, w: 1.35, h: 0.3, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.faint, align: "right" });
  s.addText("EFFORT →", { x: ox + sz - 1.4, y: oy + sz + 0.08, w: 1.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.faint, align: "right" });
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
  specs.forEach((sp, i) => { const s = P.addSlide(); L[sp.type](s, sp, i + 1, total); if (sp.notes) s.addNotes(sp.notes); });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();

  // ===== VARIANTE ② : PRÉSENTIEL — MODE PRÉSENTATION =====
  await buildDeck("TLS-deck-formation-presentiel.pptx", "TLS — Formation présentiel (gabarit animateur)", [
    { type: "pcover", eyebrow: "SESSION DE FORMATION · {{Thème}}", title: "{{Titre de la session}}", chips: ["{{Durée : 1 jour}}", "{{Présentiel}}", "{{8-12 participants}}"], meta: "{{Formateur·trice}}  ·  {{Date}}" },
    { type: "hook", kicker: "ON FAIT CONNAISSANCE", question: "{{ Question brise-glace pour le tour de table }}", sub: "Prénom, rôle, et une attente pour aujourd'hui.", notes: "ANIMATION — Tour de table (5-8 min). Notez les attentes au paperboard, vous y reviendrez en clôture. Donnez le ton : bienveillant, participatif." },
    { type: "list", tag: "OBJECTIFS", fill: C.p600, time: "{{5 min}}", title: "À la fin de la journée, vous saurez :", icon: "check", items: [
      { b: "{{Verbe d'action}}", d: "{{objectif 1}}" }, { b: "{{Verbe d'action}}", d: "{{objectif 2}}" }, { b: "{{Verbe d'action}}", d: "{{objectif 3}}" },
    ] },
    { type: "psteps", tag: "AU PROGRAMME", fill: C.p600, time: "{{Journée}}", title: "Le déroulé", steps: [
      { t: "{{Séquence 1}}", d: "{{~9h - 10h30}}" }, { t: "{{Séquence 2}}", d: "{{~10h45 - 12h}}" },
      { t: "{{Séquence 3}}", d: "{{~13h30 - 15h}}" }, { t: "{{Séquence 4}}", d: "{{~15h15 - 17h}}" },
    ] },
    { type: "concept", tag: "APPORT", time: "{{20 min}}", title: "{{Le concept clé}}", definition: "{{ Gardez peu de texte sur la slide — vous développez à l'oral. Une idée par puce, illustrée d'un exemple vécu. }}", retain: "{{ Le message à ancrer. }}", notes: "ANIMATION — Apport magistral court (max 10 min) puis questions. Ancrez avec une anecdote terrain. Demandez : « ça résonne avec quoi chez vous ? »" },
    { type: "groupwork", tag: "EN SOUS-GROUPES", time: "{{25 min}}", title: "{{Consigne de l'atelier}}", steps: ["{{Étape 1 de la consigne}}", "{{Étape 2}}", "{{Étape 3}}"], chips: ["Groupes de {{4}}", "Restitution {{2 min / groupe}}"], restitution: "{{ Chaque groupe partage 1 idée clé au paperboard. }}", notes: "ANIMATION — Constituez les groupes, distribuez le support. Circulez, relancez les groupes silencieux. Time-keeper visible. Restitution croisée." },
    { type: "list", tag: "DÉBRIEF COLLECTIF", fill: C.s500, time: "{{15 min}}", title: "On en discute ensemble", icon: "arrow", items: [
      { b: "{{Question ouverte 1}}", d: "" }, { b: "{{Question ouverte 2}}", d: "" }, { b: "{{Question ouverte 3}}", d: "" },
    ], notes: "ANIMATION — Faites parler le groupe avant de conclure. Reformulez, valorisez. Reliez aux objectifs de départ." },
    { type: "quiz", tag: "QUIZ FLASH", time: "{{5 min}}", title: "{{ Question à main levée ? }}", options: [
      { t: "{{Réponse A}}" }, { t: "{{Réponse B}}", correct: true }, { t: "{{Réponse C}}" }, { t: "{{Réponse D}}" },
    ], reveal: "{{B}} — {{explication courte}}", notes: "ANIMATION — Faites voter à main levée AVANT de révéler. Demandez à un participant de justifier, puis dévoilez." },
    { type: "list", tag: "À RETENIR", fill: C.p600, time: "{{5 min}}", title: "Les 3 messages clés", icon: "star", items: [
      { b: "{{Message clé 1}}", d: "{{précision}}" }, { b: "{{Message clé 2}}", d: "{{précision}}" }, { b: "{{Message clé 3}}", d: "{{précision}}" },
    ] },
    { type: "actionplan", tag: "PLAN D'ACTION", time: "{{10 min}}", title: "Et concrètement, dès demain ?", cols: ["Quoi ?", "Qui ?", "Quand ?"], rows: [
      ["{{Action 1}}", "{{Moi}}", "{{Cette semaine}}"], ["{{Action 2}}", "{{Moi}}", "{{Ce mois-ci}}"], ["{{Action 3}}", "{{Équipe}}", "{{Ce trimestre}}"],
    ], notes: "ANIMATION — Chacun écrit SES actions (engagement individuel). Quelques volontaires partagent à l'oral." },
    { type: "pclosing", title: "Merci pour votre énergie !", subtitle: "Pensez à l'évaluation à chaud — vos retours nourrissent la suite. On reste en contact.", cta: "Évaluer", next: "Support & ressources : {{lien}}" },
  ]);

  // ===== VARIANTE ③ : ATELIER — CADRE CONSEIL / STRIDE =====
  await buildDeck("TLS-deck-formation-atelier-conseil.pptx", "TLS — Atelier conseil STRIDE (gabarit)", [
    { type: "pcover", eyebrow: "ATELIER DE TRAVAIL · {{Client}}", title: "{{Titre de l'atelier}}", chips: ["{{Demi-journée}}", "{{Mission STRIDE}}", "{{Comité projet}}"], meta: "Animé par The Learning Society  ·  {{Date}}" },
    { type: "hook", kicker: "L'OBJECTIF DU JOUR", question: "{{ Aujourd'hui, on co-construit ______. }}", sub: "Un atelier de travail — pas une présentation. Votre matière première : vos réalités terrain." },
    { type: "list", tag: "OBJECTIFS DE L'ATELIER", fill: C.p600, title: "Ce qu'on produit ensemble", icon: "check", items: [
      { b: "{{Livrable 1}}", d: "{{ex : cartographie des compétences cibles}}" }, { b: "{{Livrable 2}}", d: "{{ex : priorisation des chantiers}}" }, { b: "{{Livrable 3}}", d: "{{ex : plan d'action partagé}}" },
    ] },
    { type: "list", tag: "LE CADRE", fill: C.p600, title: "Où on en est dans la méthode STRIDE", icon: "arrow", items: [
      { b: "Déjà fait", d: "Étape {{S'orienter}} — {{l'audit SBO}}" }, { b: "Aujourd'hui", d: "Cet atelier — {{co-construction}}" }, { b: "Ensuite", d: "Étape {{Réaliser}} — {{prochaine étape}}" },
    ] },
    { type: "psituation", tag: "LE DIAGNOSTIC PARTAGÉ", title: "Ce que révèle l'audit", left: { h: "Constats", items: ["{{Constat 1}}", "{{Constat 2}}", "{{Constat 3}}"] }, right: { h: "Enjeux", items: ["{{Enjeu 1}}", "{{Enjeu 2}}", "{{Enjeu 3}}"] } },
    { type: "groupwork", tag: "CO-CONSTRUCTION", time: "{{30 min}}", title: "{{Cartographions ensemble}}", steps: ["{{Consigne 1}}", "{{Consigne 2}}", "{{Consigne 3}}"], chips: ["En {{2}} groupes", "Restitution {{5 min}}"], restitution: "{{ Sortie attendue : une première cartographie des compétences cibles, par pôle. }}" },
    { type: "priomatrix", title: "Qu'est-ce qu'on lance en premier ?", q: ["Quick wins", "Chantiers structurants", "À temporiser", "À challenger"] },
    { type: "actionplan", tag: "PLAN D'ACTION PRIORISÉ", title: "Nos prochains pas", cols: ["Chantier", "Pilote", "Échéance"], rows: [
      ["{{Chantier prioritaire 1}}", "{{Pilote}}", "{{T_}}"], ["{{Chantier 2}}", "{{Pilote}}", "{{T_}}"], ["{{Chantier 3}}", "{{Pilote}}", "{{T_}}"],
    ] },
    { type: "list", tag: "ENGAGEMENTS", fill: C.s500, title: "Ce sur quoi on s'engage", icon: "check", items: [
      { b: "Côté TLS", d: "{{engagement / livrable}}" }, { b: "Côté {{Client}}", d: "{{engagement / disponibilité}}" }, { b: "Prochain point", d: "{{date du prochain jalon}}" },
    ] },
    { type: "pclosing", title: "On embarque ensemble.", subtitle: "Compte-rendu de l'atelier sous 48h. On enchaîne sur la prochaine étape de la mission STRIDE.", cta: "Voir la suite", next: "Mission STRIDE — étape {{suivante}}" },
  ]);

  console.log("variantes formation written");
})();
