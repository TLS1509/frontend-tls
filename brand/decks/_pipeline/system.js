const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const FA = require("react-icons/fa");

// ---- TLS tokens ----
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

let BG = {}, ICON = {};
async function assets() {
  BG.cover = "assets/cover-bg.png"; BG.content = "assets/content-bg.png";
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
  const W_ = C.white;
  ICON.grad = await icon(FA.FaGraduationCap, W_); ICON.users = await icon(FA.FaUserFriends, W_);
  ICON.laptop = await icon(FA.FaLaptopCode, W_); ICON.chart = await icon(FA.FaChartLine, W_);
  ICON.check = await icon(FA.FaCheckCircle, W_); ICON.star = await icon(FA.FaStar, W_);
  ICON.clock = await icon(FA.FaRegClock, W_); ICON.bolt = await icon(FA.FaBolt, W_);
  ICON.quote = await icon(FA.FaQuoteLeft, C.a400); ICON.flag = await icon(FA.FaFlag, W_);
  ICON.target = await icon(FA.FaBullseye, W_); ICON.rocket = await icon(FA.FaRocket, W_);
  ICON.compass = await icon(FA.FaCompass, W_); ICON.bulb = await icon(FA.FaRegLightbulb, W_);
  ICON.alert = await icon(FA.FaExclamationCircle, C.s600); ICON.ok = await icon(FA.FaCheck, C.p600);
  ICON.arrow = await icon(FA.FaArrowRight, C.p900); ICON.mail = await icon(FA.FaEnvelope, W_);
  ICON.globe = await icon(FA.FaGlobe, W_); ICON.users2 = await icon(FA.FaUsers, W_);
}

// ---- shared chrome ----
function head(s, eyebrow, title) {
  s.addText(eyebrow, { x: MX, y: 0.55, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.p600, charSpacing: 2.2 });
  s.addText(title, { x: MX - 0.03, y: 0.86, w: CW, h: 0.82, margin: 0, fontFace: DISPLAY, fontSize: 32, bold: true, color: C.ink });
}
function footer(s, n, total) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 5.29, w: 0.1, h: 0.1, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.16, y: 5.21, w: 3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: C.faint, valign: "middle" });
  s.addText(`${n} / ${total}`, { x: W - 1.6, y: 5.21, w: 1, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, color: C.faint, align: "right" });
}
function bubble(s, x, y, d, fill, ic, ics) {
  s.addShape(P.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill } });
  if (ic) { const i = d * (ics || 0.46); s.addImage({ data: ic, x: x + (d - i) / 2, y: y + (d - i) / 2, w: i, h: i }); }
}

let P; // current pres

// ================= LAYOUTS =================
const L = {};

L.cover = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 2.55, w: 8.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12.5, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.05, y: 2.9, w: 8.5, h: 1.55, margin: 0, fontFace: DISPLAY, fontSize: 39, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  if (p.tagline) s.addText(p.tagline.map((t, i) => ({ text: t, options: { color: i % 2 ? C.p500 : C.white, bold: i % 2 === 0 } })),
    { x: MX, y: 4.55, w: 8.6, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13.5 });
  s.addText(p.meta, { x: MX, y: 5.08, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, color: "9FBEC6" });
};

L.divider = (s, p) => {
  s.background = { path: BG.cover };
  s.addText(p.num, { x: 6.0, y: 0.4, w: 3.6, h: 4.8, margin: 0, fontFace: DISPLAY, fontSize: 230, bold: true, color: C.p700, align: "right", valign: "middle" });
  s.addText(p.kicker, { x: MX, y: 2.25, w: 6, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12.5, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.05, y: 2.6, w: 6.2, h: 1.6, margin: 0, fontFace: DISPLAY, fontSize: 42, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
};

L.agenda = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "SOMMAIRE", p.title);
  const startY = 1.95, rowH = (5.0 - startY) / Math.max(p.items.length, 1);
  p.items.forEach((it, i) => {
    const y = startY + i * rowH;
    bubble(s, MX, y + (rowH - 0.46) / 2, 0.46, C.p600, null, 0); // circle then number text
    s.addText(String(i + 1).padStart(2, "0"), { x: MX, y: y + (rowH - 0.46) / 2, w: 0.46, h: 0.46, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(it, { x: MX + 0.72, y, w: CW - 0.9, h: rowH, margin: 0, fontFace: DISPLAY, fontSize: 18, bold: true, color: C.p800, valign: "middle" });
    if (i < p.items.length - 1) s.addShape(P.shapes.LINE, { x: MX + 0.72, y: y + rowH, w: CW - 1.0, h: 0, line: { color: C.border, width: 1 } });
  });
  footer(s, n, t);
};

L.statement = (s, p) => {
  s.background = { path: BG.cover };
  s.addImage({ data: ICON.quote, x: MX, y: 1.35, w: 0.6, h: 0.6 });
  s.addText(p.quote, { x: MX - 0.03, y: 2.05, w: 8.7, h: 2.0, margin: 0, fontFace: DISPLAY, fontSize: 33, bold: true, color: C.white, lineSpacingMultiple: 1.02 });
  if (p.attribution) s.addText(p.attribution, { x: MX, y: 4.25, w: 8, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400 });
};

L.offers = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "NOTRE APPROCHE", p.title);
  const cw = 2.73, gap = 0.3, cy = 2.0, ch = 2.85;
  p.cards.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    bubble(s, x + 0.32, cy + 0.36, 0.78, c.circ || C.p600, c.ic, 0.46);
    s.addText(c.t, { x: x + 0.28, y: cy + 1.34, w: cw - 0.46, h: 0.42, margin: 0, fontFace: DISPLAY, fontSize: 16.5, bold: true, color: C.p800 });
    s.addText(c.d, { x: x + 0.3, y: cy + 1.82, w: cw - 0.56, h: 0.9, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.05 });
  });
  footer(s, n, t);
};

L.steps = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "MÉTHODE", p.title);
  const k = p.steps.length, cw = CW / k, cy = 2.2;
  p.steps.forEach((st, i) => {
    const cx = MX + i * cw + cw / 2;
    bubble(s, cx - 0.36, cy, 0.72, st.circ || C.p600, null, 0);
    s.addText(String(i + 1), { x: cx - 0.36, y: cy, w: 0.72, h: 0.72, margin: 0, fontFace: DISPLAY, fontSize: 24, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.t, { x: MX + i * cw + 0.1, y: cy + 0.92, w: cw - 0.2, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, align: "center" });
    s.addText(st.d, { x: MX + i * cw + 0.14, y: cy + 1.42, w: cw - 0.28, h: 1.1, margin: 0, fontFace: BODY, fontSize: 11.5, color: C.muted, align: "center", lineSpacingMultiple: 1.05 });
  });
  footer(s, n, t);
};

L.metrics = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "RÉSULTATS", p.title);
  const cw = 2.73, gap = 0.3, ty = 2.05, th = 2.5;
  p.stats.forEach((st, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: ty, w: cw, h: th, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    bubble(s, x + 0.32, ty + 0.34, 0.66, st.circ || C.p600, st.ic, 0.42);
    s.addText(st.n, { x: x + 0.3, y: ty + 1.12, w: cw - 0.6, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 38, bold: true, color: st.num || C.p800 });
    s.addText(st.l, { x: x + 0.32, y: ty + 1.86, w: cw - 0.6, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted });
  });
  if (p.note) s.addText(p.note, { x: MX, y: 4.78, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: C.faint });
  footer(s, n, t);
};

L.duo = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cards = [p.left, p.right]; const cw = 4.25, gap = 0.3, cy = 1.98, ch = 3.0;
  cards.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    const tint = i === 0 ? C.white : C.p50;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: tint }, line: { color: C.border, width: 1 }, shadow: shadow() });
    s.addImage({ data: i === 0 ? ICON.alert : ICON.check, x: x + 0.34, y: cy + 0.36, w: 0.34, h: 0.34 });
    s.addText(c.h, { x: x + 0.82, y: cy + 0.34, w: cw - 1.0, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 17, bold: true, color: i === 0 ? C.ink : C.p800, valign: "middle" });
    c.items.forEach((it, j) => {
      const ry = cy + 1.0 + j * 0.62;
      s.addShape(P.shapes.OVAL, { x: x + 0.4, y: ry + 0.07, w: 0.12, h: 0.12, fill: { color: i === 0 ? C.s500 : C.p500 } });
      s.addText(it, { x: x + 0.68, y: ry - 0.05, w: cw - 1.0, h: 0.55, margin: 0, fontFace: BODY, fontSize: 12.5, color: i === 0 ? C.muted : C.p800, lineSpacingMultiple: 1.0, valign: "middle" });
    });
  });
  footer(s, n, t);
};

L.pricing = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "OFFRES", p.title);
  const cw = 2.73, gap = 0.3, cy = 1.95, ch = 3.05;
  p.tiers.forEach((tr, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: C.white }, line: { color: tr.pop ? C.p500 : C.border, width: tr.pop ? 2 : 1 }, shadow: shadow() });
    if (tr.pop) { s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: x + cw - 1.15, y: cy - 0.16, w: 1.05, h: 0.34, rectRadius: 0.17, fill: { color: C.p600 } }); s.addText("Populaire", { x: x + cw - 1.15, y: cy - 0.16, w: 1.05, h: 0.34, margin: 0, fontFace: BODY, fontSize: 9.5, bold: true, color: C.white, align: "center", valign: "middle" }); }
    s.addText(tr.name, { x: x + 0.3, y: cy + 0.26, w: cw - 0.6, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 17, bold: true, color: C.p800 });
    s.addText(tr.price, { x: x + 0.3, y: cy + 0.66, w: cw - 0.6, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 23, bold: true, color: tr.pop ? C.s500 : C.ink });
    tr.features.forEach((f, j) => {
      const fy = cy + 1.34 + j * 0.42;
      s.addImage({ data: ICON.ok, x: x + 0.32, y: fy + 0.03, w: 0.16, h: 0.16 });
      s.addText(f, { x: x + 0.56, y: fy - 0.04, w: cw - 0.82, h: 0.36, margin: 0, fontFace: BODY, fontSize: 11.5, color: C.muted, valign: "middle" });
    });
  });
  if (p.note) s.addText(p.note, { x: MX, y: 5.08, w: CW, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9.5, italic: true, color: C.faint });
};

L.timeline = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow || "PLANNING", p.title);
  const k = p.phases.length, cw = CW / k, lineY = 3.05;
  s.addShape(P.shapes.LINE, { x: MX + cw / 2, y: lineY, w: CW - cw, h: 0, line: { color: C.p200 || "B9D7DF", width: 2 } });
  p.phases.forEach((ph, i) => {
    const cx = MX + i * cw + cw / 2;
    const col = ph.status === "done" ? C.p600 : ph.status === "now" ? C.s500 : "B9D7DF";
    s.addText(ph.date, { x: MX + i * cw + 0.05, y: 2.05, w: cw - 0.1, h: 0.28, margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: C.p600, align: "center", charSpacing: 1 });
    s.addText(ph.t, { x: MX + i * cw + 0.05, y: 2.34, w: cw - 0.1, h: 0.55, margin: 0, fontFace: DISPLAY, fontSize: 14.5, bold: true, color: C.p800, align: "center", valign: "top" });
    s.addShape(P.shapes.OVAL, { x: cx - 0.13, y: lineY - 0.13, w: 0.26, h: 0.26, fill: { color: col }, line: { color: C.white, width: 2.5 } });
    s.addText(ph.d, { x: MX + i * cw + 0.08, y: 3.4, w: cw - 0.16, h: 1.2, margin: 0, fontFace: BODY, fontSize: 11, color: C.muted, align: "center", lineSpacingMultiple: 1.05 });
  });
  footer(s, n, t);
};

L.closing = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addText(p.title, { x: MX - 0.05, y: 2.2, w: 8.6, h: 1.4, margin: 0, fontFace: DISPLAY, fontSize: 40, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  if (p.subtitle) s.addText(p.subtitle, { x: MX, y: 3.55, w: 8.2, h: 0.5, margin: 0, fontFace: BODY, fontSize: 14, color: "C9DEE4", lineSpacingMultiple: 1.05 });
  const cy = 4.35;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: cy, w: 2.5, h: 0.6, rectRadius: 0.3, fill: { color: C.a400 } });
  s.addText(p.cta || "Discutons-en", { x: MX + 0.1, y: cy, w: 1.85, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addImage({ data: ICON.arrow, x: MX + 2.0, y: cy + 0.21, w: 0.18, h: 0.18 });
  s.addText([{ text: p.email + "    ", options: { bold: true } }, { text: p.site }], { x: MX + 2.9, y: cy, w: 6, h: 0.6, margin: 0, fontFace: BODY, fontSize: 12.5, color: "C9DEE4", valign: "middle" });
};

// ================= BUILD =================
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
  const OFFERS = [
    { ic: ICON.grad, t: "Formation", d: "Des parcours certifiants, conçus avec des experts métier." },
    { ic: ICON.users, t: "Accompagnement", d: "Du coaching 1-1 et des corrections personnalisées." },
    { ic: ICON.laptop, t: "Learning App", d: "L'apprentissage en autonomie, gamifié et mobile-first." },
  ];

  // ---------- DECK 1 : COMMERCIAL ----------
  await buildDeck("TLS-deck-commercial.pptx", "TLS — Présentation commerciale", [
    { type: "cover", eyebrow: "PRÉSENTATION COMMERCIALE", title: "Construire l'organisation\napprenante de demain", tagline: ["Formation", "   ·   ", "Accompagnement", "   ·   ", "Learning App"], meta: "2026  ·  thelearningsociety.fr" },
    { type: "agenda", title: "Au programme", items: ["Le défi des compétences", "Notre vision : la Skills Based Organisation", "Trois leviers, un parcours", "La méthode, étape par étape", "L'impact & les formules", "Votre déploiement"] },
    { type: "duo", eyebrow: "LE CONTEXTE", title: "Le défi des compétences", left: { h: "Le constat", items: ["Les compétences se périment en ~30 mois", "Les formations descendantes sont peu suivies", "Difficile de relier apprentissage et terrain"] }, right: { h: "Notre promesse", items: ["Des compétences ancrées dans la pratique", "Un engagement apprenant durable", "Une preuve de progression mesurable"] } },
    { type: "statement", quote: "Une organisation n'apprend pas par hasard.\nElle se conçoit.", attribution: "The Learning Society" },
    { type: "offers", title: "Trois leviers, un parcours", cards: OFFERS },
    { type: "steps", title: "Comment ça marche", steps: [
      { t: "Diagnostic", d: "Cartographie des compétences et des besoins." },
      { t: "Parcours sur-mesure", d: "Un chemin adapté à chaque profil." },
      { t: "Pratique accompagnée", d: "Coaching, mises en situation, feedback." },
      { t: "Passeport", d: "La preuve vivante des compétences acquises." },
    ] },
    { type: "metrics", title: "L'impact, en chiffres", note: "Données illustratives — à remplacer par tes chiffres réels.", stats: [
      { ic: ICON.chart, n: "+38%", l: "d'engagement formation" },
      { ic: ICON.check, n: "92%", l: "de taux de complétion" },
      { ic: ICON.star, n: "4,8/5", l: "de satisfaction apprenant", circ: C.s500, num: C.s600 },
    ] },
    { type: "duo", eyebrow: "CAS CLIENT", title: "Ce que vivent les équipes", left: { h: "Avant", items: ["« On veut monter en compétence sans savoir par où commencer »", "Des formations vite oubliées", "Peu de transfert sur le terrain"] }, right: { h: "Avec TLS", items: ["Un parcours clair et personnalisé", "Une pratique accompagnée au quotidien", "Des compétences visibles et reconnues"] } },
    { type: "pricing", title: "Des formules adaptées", note: "Tarifs sur devis — structure indicative à personnaliser.", tiers: [
      { name: "Essentiel", price: "sur devis", features: ["Accès Learning App", "Parcours certifiants", "Communauté apprenante"] },
      { name: "Équipe", price: "sur devis", pop: true, features: ["Tout Essentiel", "Coaching 1-1", "Tableau de bord manager"] },
      { name: "Entreprise", price: "sur mesure", features: ["Tout Équipe", "Parcours sur-mesure", "Accompagnement dédié", "SSO & reporting"] },
    ] },
    { type: "timeline", title: "Votre déploiement", phases: [
      { date: "SEMAINE 1-2", t: "Cadrage", d: "Objectifs, périmètre, indicateurs de succès.", status: "done" },
      { date: "SEMAINE 3-4", t: "Lancement", d: "Onboarding des équipes, premiers parcours.", status: "now" },
      { date: "MOIS 2-3", t: "Montée en charge", d: "Coaching, suivi de la progression." },
      { date: "MOIS 4", t: "Bilan", d: "Mesure d'impact et plan de suite." },
    ] },
    { type: "closing", title: "Passons à l'action.", subtitle: "Construisons le parcours de montée en compétence de vos équipes.", cta: "Discutons-en", email: "hello@thelearningsociety.fr", site: "thelearningsociety.fr" },
  ]);

  // ---------- DECK 2 : PITCH ----------
  await buildDeck("TLS-deck-pitch.pptx", "TLS — Pitch", [
    { type: "cover", eyebrow: "PITCH", title: "L'apprentissage qui\ntransforme les organisations", tagline: ["La Skills Based Organisation, opérée"], meta: "2026  ·  thelearningsociety.fr" },
    { type: "statement", quote: "Le travail change plus vite\nque les compétences.", attribution: "Le problème que nous résolvons" },
    { type: "duo", eyebrow: "LE MARCHÉ", title: "Un besoin structurel", left: { h: "Le constat", items: ["Requalification massive d'ici 2030", "Les dispositifs actuels n'engagent pas", "L'IA accélère l'obsolescence des savoirs"] }, right: { h: "L'opportunité", items: ["Le marché de l'EdTech B2B en forte croissance", "Les SBO deviennent un standard RH", "L'IA permet enfin le sur-mesure à l'échelle"] } },
    { type: "offers", eyebrow: "LE PRODUIT", title: "Une plateforme, trois piliers", cards: OFFERS },
    { type: "steps", eyebrow: "NOTRE EDGE", title: "Comment on crée de la valeur", steps: [
      { t: "Diagnostic IA", d: "Positionnement précis des compétences." },
      { t: "Parcours adaptatif", d: "Personnalisé en continu." },
      { t: "Coaching humain", d: "L'accompagnement qui ancre." },
      { t: "Passeport", d: "Une preuve de compétence portable." },
    ] },
    { type: "metrics", eyebrow: "TRACTION", title: "Les premiers signaux", note: "Données illustratives — à remplacer par tes chiffres réels.", stats: [
      { ic: ICON.users2, n: "1 200+", l: "apprenants actifs" },
      { ic: ICON.bolt, n: "x3", l: "de rétention vs LMS classique" },
      { ic: ICON.chart, n: "92%", l: "de complétion des parcours", circ: C.s500, num: C.s600 },
    ] },
    { type: "pricing", eyebrow: "BUSINESS MODEL", title: "Des revenus récurrents", note: "Structure indicative.", tiers: [
      { name: "B2B SaaS", price: "par siège", features: ["Abonnement annuel", "Pricing par paliers", "Expansion par équipe"] },
      { name: "Accompagnement", price: "à l'usage", pop: true, features: ["Coaching à la séance", "Parcours sur-mesure", "Marge de service élevée"] },
      { name: "Certification", price: "à l'acte", features: ["Passeport de compétences", "Validation des acquis", "Valeur perçue forte"] },
    ] },
    { type: "timeline", eyebrow: "ROADMAP", title: "Notre trajectoire", phases: [
      { date: "2026", t: "Product-market fit", d: "Premiers clients, boucle produit.", status: "now" },
      { date: "2027", t: "Scale", d: "Croissance commerciale, IA avancée." },
      { date: "2029", t: "Expansion", d: "Nouveaux marchés, écosystème." },
      { date: "2031", t: "Vision", d: "Le standard des SBO en Europe." },
    ] },
    { type: "closing", title: "Rejoignez l'aventure.", subtitle: "Nous construisons l'infrastructure d'apprentissage des organisations de demain.", cta: "Parlons-en", email: "hello@thelearningsociety.fr", site: "thelearningsociety.fr" },
  ]);

  // ---------- DECK 3 : SUIVI DE PROJET ----------
  await buildDeck("TLS-deck-suivi-projet.pptx", "TLS — Suivi de projet", [
    { type: "cover", eyebrow: "SUIVI DE PROJET", title: "Point d'étape", tagline: ["Programme de montée en compétences"], meta: "Juin 2026  ·  Comité de pilotage" },
    { type: "agenda", eyebrow: "AU PROGRAMME", title: "Ordre du jour", items: ["Objectifs & indicateurs", "Les jalons du projet", "État d'avancement par chantier", "Métriques d'usage", "Risques & décisions", "Prochaines étapes"] },
    { type: "metrics", eyebrow: "OBJECTIFS", title: "Nos indicateurs cibles", note: "Données illustratives — à remplacer par les chiffres du projet.", stats: [
      { ic: ICON.target, n: "300", l: "collaborateurs à former" },
      { ic: ICON.check, n: "80%", l: "de complétion visée" },
      { ic: ICON.star, n: "4,5/5", l: "de satisfaction cible", circ: C.s500, num: C.s600 },
    ] },
    { type: "timeline", eyebrow: "JALONS", title: "Où en est-on ?", phases: [
      { date: "T1", t: "Cadrage", d: "Périmètre et KPIs validés.", status: "done" },
      { date: "T2", t: "Lancement", d: "Onboarding en cours.", status: "now" },
      { date: "T3", t: "Déploiement", d: "Généralisation des parcours." },
      { date: "T4", t: "Bilan", d: "Mesure d'impact finale." },
    ] },
    { type: "steps", eyebrow: "AVANCEMENT", title: "État des chantiers", steps: [
      { t: "Contenus", d: "Parcours prêts. ✓", circ: C.p600 },
      { t: "Plateforme", d: "Déployée et configurée. ✓", circ: C.p600 },
      { t: "Onboarding", d: "En cours — 60%.", circ: C.s500 },
      { t: "Coaching", d: "Démarrage T3.", circ: "B9D7DF" },
    ] },
    { type: "metrics", eyebrow: "USAGE", title: "L'adoption en chiffres", note: "Données illustratives — à remplacer par les chiffres du projet.", stats: [
      { ic: ICON.users2, n: "182", l: "comptes activés" },
      { ic: ICON.clock, n: "3h20", l: "temps moyen / apprenant" },
      { ic: ICON.chart, n: "64%", l: "de progression moyenne", circ: C.s500, num: C.s600 },
    ] },
    { type: "duo", eyebrow: "PILOTAGE", title: "Risques & décisions", left: { h: "Points d'attention", items: ["Onboarding plus lent que prévu", "Disponibilité des managers", "Charge de coaching à anticiper"] }, right: { h: "Décisions prises", items: ["Relance ciblée des comptes inactifs", "Créneaux managers bloqués au T3", "Renfort coaching validé"] } },
    { type: "closing", title: "Prochaines étapes.", subtitle: "Accélérer l'onboarding, préparer le coaching T3, prochain COPIL en septembre.", cta: "Voir le détail", email: "hello@thelearningsociety.fr", site: "thelearningsociety.fr" },
  ]);

  console.log("decks written");
})();
