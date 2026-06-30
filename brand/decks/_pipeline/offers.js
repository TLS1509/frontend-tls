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
  const w = C.white;
  ICON.grad = await icon(FA.FaGraduationCap, w); ICON.users = await icon(FA.FaUserFriends, w);
  ICON.laptop = await icon(FA.FaLaptopCode, w); ICON.chart = await icon(FA.FaChartLine, w);
  ICON.star = await icon(FA.FaStar, w); ICON.rocket = await icon(FA.FaRocket, w);
  ICON.target = await icon(FA.FaBullseye, w); ICON.robot = await icon(FA.FaRobot, w);
  ICON.globe = await icon(FA.FaGlobe, w); ICON.quote = await icon(FA.FaQuoteLeft, C.a400);
  ICON.users2 = await icon(FA.FaUsers, w); ICON.book = await icon(FA.FaBookOpen, w);
  ICON.checkT = await icon(FA.FaCheckCircle, C.p600); ICON.alert = await icon(FA.FaExclamationCircle, C.s600);
  ICON.ok = await icon(FA.FaCheck, C.p600); ICON.img = await icon(FA.FaRegImage, "BBC6CD");
  ICON.arrow = await icon(FA.FaArrowRight, C.p900);
}
function head(s, eyebrow, title) {
  s.addText(eyebrow, { x: MX, y: 0.55, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.p600, charSpacing: 2.2 });
  s.addText(title, { x: MX - 0.03, y: 0.86, w: CW, h: 0.82, margin: 0, fontFace: DISPLAY, fontSize: 31, bold: true, color: C.ink });
}
function footer(s, n, t) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 5.29, w: 0.1, h: 0.1, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.16, y: 5.21, w: 3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: C.faint, valign: "middle" });
  s.addText(`${n} / ${t}`, { x: W - 1.6, y: 5.21, w: 1, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9, color: C.faint, align: "right" });
}
function bubble(s, x, y, d, fill, ic, ics) {
  s.addShape(P.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill } });
  if (ic) { const i = d * (ics || 0.46); s.addImage({ data: ic, x: x + (d - i) / 2, y: y + (d - i) / 2, w: i, h: i }); }
}

const L = {};
L.cover = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 2.5, w: 8.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12.5, bold: true, color: C.a400, charSpacing: 2.2 });
  s.addText(p.title, { x: MX - 0.05, y: 2.85, w: 8.5, h: 1.55, margin: 0, fontFace: DISPLAY, fontSize: 38, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  if (p.tagline) s.addText(p.tagline.map((tt, i) => ({ text: tt, options: { color: i % 2 ? C.p500 : C.white, bold: i % 2 === 0 } })),
    { x: MX, y: 4.5, w: 8.6, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13.5 });
  s.addText(p.meta, { x: MX, y: 5.05, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, color: "9FBEC6" });
};
L.statement = (s, p) => {
  s.background = { path: BG.cover };
  s.addImage({ data: ICON.quote, x: MX, y: 1.3, w: 0.58, h: 0.58 });
  s.addText(p.quote, { x: MX - 0.03, y: 1.95, w: 8.7, h: 2.1, margin: 0, fontFace: DISPLAY, fontSize: 30, bold: true, color: C.white, lineSpacingMultiple: 1.04 });
  if (p.attribution) s.addText(p.attribution, { x: MX, y: 4.3, w: 8, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400 });
};
L.offers = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
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
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const k = p.steps.length, cw = CW / k, cy = 2.2;
  p.steps.forEach((st, i) => {
    const cx = MX + i * cw + cw / 2;
    bubble(s, cx - 0.36, cy, 0.72, st.circ || C.p600, null, 0);
    s.addText(String(i + 1), { x: cx - 0.36, y: cy, w: 0.72, h: 0.72, margin: 0, fontFace: DISPLAY, fontSize: 24, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.t, { x: MX + i * cw + 0.1, y: cy + 0.92, w: cw - 0.2, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, align: "center" });
    s.addText(st.d, { x: MX + i * cw + 0.14, y: cy + 1.42, w: cw - 0.28, h: 1.2, margin: 0, fontFace: BODY, fontSize: 11.5, color: C.muted, align: "center", lineSpacingMultiple: 1.05 });
  });
  footer(s, n, t);
};
L.metrics = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cw = 2.73, gap = 0.3, ty = 2.05, th = 2.5;
  p.stats.forEach((st, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: ty, w: cw, h: th, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    bubble(s, x + 0.32, ty + 0.34, 0.66, st.circ || C.p600, st.ic, 0.42);
    s.addText(st.n, { x: x + 0.3, y: ty + 1.12, w: cw - 0.6, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 36, bold: true, color: st.num || C.p800 });
    s.addText(st.l, { x: x + 0.32, y: ty + 1.86, w: cw - 0.6, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted });
  });
  if (p.note) s.addText(p.note, { x: MX, y: 4.76, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: C.faint });
  footer(s, n, t);
};
L.duo = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cards = [p.left, p.right]; const cw = 4.25, gap = 0.3, cy = 1.98, ch = 3.0;
  cards.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: i === 0 ? C.white : C.p50 }, line: { color: C.border, width: 1 }, shadow: shadow() });
    s.addImage({ data: i === 0 ? ICON.alert : ICON.checkT, x: x + 0.34, y: cy + 0.36, w: 0.34, h: 0.34 });
    s.addText(c.h, { x: x + 0.82, y: cy + 0.34, w: cw - 1.0, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 17, bold: true, color: i === 0 ? C.ink : C.p800, valign: "middle" });
    c.items.forEach((it, j) => {
      const ry = cy + 1.0 + j * 0.62;
      s.addShape(P.shapes.OVAL, { x: x + 0.4, y: ry + 0.07, w: 0.12, h: 0.12, fill: { color: i === 0 ? C.s500 : C.p500 } });
      s.addText(it, { x: x + 0.68, y: ry - 0.05, w: cw - 1.0, h: 0.55, margin: 0, fontFace: BODY, fontSize: 12.5, color: i === 0 ? C.muted : C.p800, valign: "middle" });
    });
  });
  footer(s, n, t);
};
L.pricing = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cw = 2.73, gap = 0.3, cy = 1.95, ch = 3.05;
  p.tiers.forEach((tr, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: C.white }, line: { color: tr.pop ? C.p500 : C.border, width: tr.pop ? 2 : 1 }, shadow: shadow() });
    if (tr.pop) { s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: x + cw - 1.15, y: cy - 0.16, w: 1.05, h: 0.34, rectRadius: 0.17, fill: { color: C.p600 } }); s.addText("Recommandé", { x: x + cw - 1.15, y: cy - 0.16, w: 1.05, h: 0.34, margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle" }); }
    s.addText(tr.name, { x: x + 0.3, y: cy + 0.26, w: cw - 0.6, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 16, bold: true, color: C.p800, valign: "middle" });
    s.addText(tr.price, { x: x + 0.3, y: cy + 0.74, w: cw - 0.6, h: 0.44, margin: 0, fontFace: DISPLAY, fontSize: 20, bold: true, color: tr.pop ? C.s500 : C.ink });
    tr.features.forEach((f, j) => {
      const fy = cy + 1.38 + j * 0.46;
      s.addImage({ data: ICON.ok, x: x + 0.32, y: fy + 0.03, w: 0.16, h: 0.16 });
      s.addText(f, { x: x + 0.56, y: fy - 0.06, w: cw - 0.8, h: 0.42, margin: 0, fontFace: BODY, fontSize: 11, color: C.muted, valign: "middle" });
    });
  });
  if (p.note) s.addText(p.note, { x: MX, y: 5.08, w: CW, h: 0.26, margin: 0, fontFace: BODY, fontSize: 9.5, italic: true, color: C.faint });
};
L.closing = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.25, y: 0.45, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle" });
  s.addText(p.title, { x: MX - 0.05, y: 2.2, w: 8.6, h: 1.3, margin: 0, fontFace: DISPLAY, fontSize: 39, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  if (p.subtitle) s.addText(p.subtitle, { x: MX, y: 3.5, w: 8.2, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, color: "C9DEE4", lineSpacingMultiple: 1.05 });
  const cy = 4.4;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: cy, w: 2.7, h: 0.6, rectRadius: 0.3, fill: { color: C.a400 } });
  s.addText(p.cta, { x: MX + 0.1, y: cy, w: 2.05, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addImage({ data: ICON.arrow, x: MX + 2.2, y: cy + 0.21, w: 0.18, h: 0.18 });
  s.addText([{ text: p.email + "    ", options: { bold: true } }, { text: p.site }], { x: MX + 3.1, y: cy, w: 6, h: 0.6, margin: 0, fontFace: BODY, fontSize: 12.5, color: "C9DEE4", valign: "middle" });
};
L.methodSteps = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cw = 2.73, gap = 0.3, ch = 1.45, rows = [1.95, 3.5];
  p.steps.forEach((st, i) => {
    const col = i % 3, row = Math.floor(i / 3), x = MX + col * (cw + gap), y = rows[row];
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: x + 0.24, y: y + 0.27, w: 0.52, h: 0.52, rectRadius: 0.1, fill: { color: C.p600 } });
    s.addText(st.letter, { x: x + 0.24, y: y + 0.27, w: 0.52, h: 0.52, margin: 0, fontFace: DISPLAY, fontSize: 23, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(st.t, { x: x + 0.9, y: y + 0.29, w: cw - 1.1, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, valign: "middle" });
    s.addText(st.d, { x: x + 0.26, y: y + 0.86, w: cw - 0.48, h: 0.5, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.muted, lineSpacingMultiple: 1.0 });
  });
  footer(s, n, t);
};
L.screen = (s, p, n, t) => {
  s.background = { path: BG.content };
  s.addText(p.eyebrow, { x: MX, y: 1.5, w: 4.4, h: 0.3, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: C.p600, charSpacing: 2.2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.84, w: 4.4, h: 1.0, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink, lineSpacingMultiple: 1.0 });
  p.bullets.forEach((b, i) => {
    const by = 3.0 + i * 0.5;
    s.addImage({ data: ICON.checkT, x: MX, y: by + 0.02, w: 0.22, h: 0.22 });
    s.addText(b, { x: MX + 0.34, y: by - 0.06, w: 4.1, h: 0.42, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.p800, valign: "middle" });
  });
  const fx = 5.3, fy = 1.35, fw = 4.1, fh = 3.45;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: fw, h: fh, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
  ["E2C7B8", "C9DDE2", "D9E2E6"].forEach((c, i) => s.addShape(P.shapes.OVAL, { x: fx + 0.22 + i * 0.16, y: fy + 0.16, w: 0.08, h: 0.08, fill: { color: c } }));
  if (p.shot) {
    s.addImage({ path: p.shot, x: fx + 0.12, y: fy + 0.42, w: fw - 0.24, h: fh - 0.54, sizing: { type: "cover", w: fw - 0.24, h: fh - 0.54 } });
  } else {
    s.addImage({ data: ICON.img, x: fx + fw / 2 - 0.24, y: fy + fh / 2 - 0.42, w: 0.48, h: 0.48 });
    s.addText(p.screen, { x: fx, y: fy + fh / 2 + 0.14, w: fw, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: C.faint, align: "center" });
    s.addText("{{ capture d'écran }}", { x: fx, y: fy + fh / 2 + 0.48, w: fw, h: 0.3, margin: 0, fontFace: BODY, fontSize: 9.5, italic: true, color: "BBC6CD", align: "center" });
  }
  footer(s, n, t);
};
L.grid6 = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const cw = 2.73, gap = 0.3, ch = 1.5, rows = [1.95, 3.55];
  p.tiles.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3), x = MX + col * (cw + gap), y = rows[row];
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    bubble(s, x + 0.26, y + 0.3, 0.6, c.circ || C.p600, c.ic, 0.46);
    s.addText(c.t, { x: x + 0.98, y: y + 0.32, w: cw - 1.1, h: 0.56, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, valign: "middle" });
    s.addText(c.d, { x: x + 0.26, y: y + 0.94, w: cw - 0.48, h: 0.42, margin: 0, fontFace: BODY, fontSize: 11, color: C.muted });
  });
  footer(s, n, t);
};
L.bullets = (s, p, n, t) => {
  s.background = { path: BG.content }; head(s, p.eyebrow, p.title);
  const startY = 2.0, rowH = (5.0 - startY) / Math.max(p.items.length, 1);
  p.items.forEach((it, i) => {
    const y = startY + i * rowH;
    s.addImage({ data: ICON.checkT, x: MX, y: y + (rowH - 0.26) / 2, w: 0.26, h: 0.26 });
    s.addText([{ text: it.b + "  ", options: { bold: true, color: C.p800 } }, { text: "— " + it.d, options: { color: C.muted } }],
      { x: MX + 0.5, y, w: CW - 0.6, h: rowH, margin: 0, fontFace: BODY, fontSize: 13.5, valign: "middle" });
  });
  footer(s, n, t);
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

  // ===== DECK A : CONSEIL — MÉTHODE STRIDE =====
  await buildDeck("TLS-deck-conseil-stride.pptx", "TLS — Conseil · Méthode STRIDE", [
    { type: "cover", eyebrow: "PROPOSITION DE CONSEIL · CONFIDENTIEL", title: "Devenez une organisation\npilotée par les compétences", tagline: ["Méthode STRIDE", "   ·   ", "Accompagnement & Conseil"], meta: "{{Client}}  ·  2026" },
    { type: "statement", quote: "On ne livre pas un rapport.\nOn livre des résultats,\nsur vos projets réels.", attribution: "Notre parti pris" },
    { type: "duo", eyebrow: "LE CONSTAT", title: "Pourquoi changer de modèle", left: { h: "Aujourd'hui", items: ["Les compétences réelles sont invisibles", "La formation se perd, sans preuve d'impact", "Des projets bloqués faute de compétences"] }, right: { h: "Le modèle Skills-Based", items: ["On décide sur les compétences, pas les diplômes", "Chaque formation devient une preuve", "La compétence se voit, se mesure, se mobilise"] } },
    { type: "offers", eyebrow: "NOTRE SIGNATURE", title: "Apprendre → Appliquer → Prouver", cards: [
      { ic: ICON.grad, t: "Apprendre", d: "Des parcours ciblés sur les compétences clés." },
      { ic: ICON.rocket, t: "Appliquer", d: "Sur des projets réels, pas en salle." },
      { ic: ICON.target, t: "Prouver", d: "Un passeport de compétences qui s'enrichit." },
    ] },
    { type: "methodSteps", eyebrow: "LA MÉTHODE", title: "STRIDE — votre feuille de route", steps: [
      { letter: "S", t: "S'orienter", d: "Audit de maturité & Skills Gap." },
      { letter: "T", t: "Tester", d: "Un POC concret sur un parcours." },
      { letter: "R", t: "Réaliser", d: "Référentiels & agents IA construits." },
      { letter: "I", t: "Intégrer", d: "Branchement à votre stack (LMS, RH)." },
      { letter: "D", t: "Déployer", d: "Lancement & conduite du changement." },
      { letter: "É", t: "Évoluer", d: "Amélioration continue par la donnée." },
    ] },
    { type: "steps", eyebrow: "LE PARCOURS", title: "Comment on démarre", steps: [
      { t: "Audit Flash SBO", d: "0,5 à 1 jour pour cartographier vos écarts de compétences." },
      { t: "Mission STRIDE", d: "La transformation, étape par étape." },
      { t: "La plateforme reste", d: "L'outil s'ancre dans votre quotidien." },
    ] },
    { type: "pricing", eyebrow: "NOS MISSIONS", title: "Trois façons d'avancer", note: "Tarifs sur devis — confidentiel, calibrés ensemble après l'Audit Flash.", tiers: [
      { name: "Méthode STRIDE", price: "sur devis", pop: true, features: ["Accompagnement complet 6 étapes", "De l'audit à l'évolution continue", "1 an de Learning App offert"] },
      { name: "Solutions IA", price: "sur devis", features: ["Agents & chatbots sur-mesure", "Automatisations Plug & Play", "Outils auteur IA"] },
      { name: "Upskilling L&D", price: "sur devis", features: ["Masterclasses IA générative", "Coaching de groupe Skills-Data", "Parcours certifiés Open Badges"] },
    ] },
    { type: "bullets", eyebrow: "LIVRABLES", title: "Du tangible à chaque jalon", items: [
      { b: "Audit SBO", d: "maturité + analyse du Skills Gap" },
      { b: "Parcours sur-mesure", d: "contenus créés sur la Learning App" },
      { b: "Interconnexion", d: "LMS, CRM et SIRH branchés" },
      { b: "Référentiels & IA", d: "compétences cibles + agents déployés" },
      { b: "Déploiement", d: "collaborateurs onboardés + conduite du changement" },
      { b: "Pilotage continu", d: "tableaux de données + mise à jour des compétences" },
    ] },
    { type: "metrics", eyebrow: "PREUVES", title: "Notre impact", note: "Données à compléter avec vos preuves — réf. C-Campus : 578 personnes formées en 2023, +93% de satisfaction.", stats: [
      { ic: ICON.users2, n: "{{ X }}", l: "organisations accompagnées" },
      { ic: ICON.chart, n: "{{ X }}%", l: "d'engagement constaté" },
      { ic: ICON.star, n: "{{ X }}/5", l: "de satisfaction", circ: C.s500, num: C.s600 },
    ] },
    { type: "closing", title: "Commençons par un Audit Flash.", subtitle: "0,5 à 1 jour pour révéler vos écarts de compétences et tracer la route.", cta: "Réserver l'audit", email: "hello@thelearningsociety.fr", site: "thelearningsociety.fr" },
  ]);

  // ===== DECK B : LA LEARNING APP =====
  await buildDeck("TLS-deck-learning-app.pptx", "TLS — La Learning App", [
    { type: "cover", eyebrow: "LA LEARNING APP", title: "Apprendre, appliquer,\nprouver ses compétences", tagline: ["Parcours", "   ·   ", "Coaching", "   ·   ", "Journal", "   ·   ", "Passeport"], meta: "thelearningsociety.fr" },
    { type: "statement", quote: "La formation classique s'oublie.\nLa compétence, elle,\nse prouve.", attribution: "Notre conviction" },
    { type: "offers", eyebrow: "LE PRINCIPE", title: "Une boucle vertueuse", cards: [
      { ic: ICON.grad, t: "Apprendre", d: "Des parcours adaptatifs, ciblés compétences." },
      { ic: ICON.rocket, t: "Appliquer", d: "Des missions et projets concrets (JAC)." },
      { ic: ICON.target, t: "Prouver", d: "Un passeport de compétences qui s'enrichit." },
    ] },
    { type: "screen", eyebrow: "PARCOURS", title: "Un parcours qui s'adapte", bullets: ["Positionnement Dreyfus à l'entrée", "Étapes & leçons multi-formats", "Astuces, flashcards, vidéos, quiz"], screen: "Parcours d'apprentissage", shot: "shots/learning-paths.png" },
    { type: "screen", eyebrow: "PASSEPORT", title: "La compétence, rendue visible", bullets: ["Niveaux Dreyfus 1 → 5", "Radar compétences : actuel vs cible", "Preuves & objectifs de progression"], screen: "Passeport de compétences", shot: "shots/passeport.png" },
    { type: "grid6", eyebrow: "L'ÉCOSYSTÈME", title: "Tout au même endroit", tiles: [
      { ic: ICON.laptop, t: "Parcours", d: "Apprentissage adaptatif" },
      { ic: ICON.users, t: "Coaching", d: "Accompagnement humain 1-1" },
      { ic: ICON.quote, t: "Journal", d: "Apprentissage réflexif" },
      { ic: ICON.globe, t: "Veille", d: "Contenus curatés" },
      { ic: ICON.star, t: "Gamification", d: "XP, badges, streaks" },
      { ic: ICON.robot, t: "Assistant IA", d: "Réponses contextualisées" },
    ] },
    { type: "screen", eyebrow: "HUMAIN + IA", title: "Le coaching, augmenté", bullets: ["Sessions 1-1 avec des coachs experts", "Corrections personnalisées itératives", "Un assistant IA qui cite ses sources"], screen: "Coaching & Assistant IA", shot: "shots/coaching.png" },
    { type: "bullets", eyebrow: "CE QUI NOUS REND UNIQUES", title: "Nos différenciateurs", items: [
      { b: "Humain + IA", d: "l'IA augmente les coachs, ne les remplace pas" },
      { b: "Skills-first", d: "tout est relié aux niveaux Dreyfus" },
      { b: "Réflexif", d: "le Journal transforme l'expérience en compétence" },
      { b: "Preuve, pas complétion", d: "Open Badges & preuves vérifiables" },
      { b: "Prêt entreprise", d: "dashboards managers, alertes, skill-gap" },
    ] },
    { type: "duo", eyebrow: "POUR QUI", title: "Apprenants & organisations", left: { h: "Pour l'apprenant", items: ["Un parcours clair et personnalisé", "Du coaching pour débloquer", "Un passeport qui prouve sa valeur"] }, right: { h: "Pour l'organisation", items: ["Pilotage des compétences en temps réel", "Détection des écarts & alertes", "Un ROI individuel ET collectif"] } },
    { type: "closing", title: "Voir la Learning App en action.", subtitle: "Une démo de 20 minutes, sur vos cas d'usage.", cta: "Demander une démo", email: "hello@thelearningsociety.fr", site: "thelearningsociety.fr" },
  ]);

  console.log("decks conseil + app written");
})();
