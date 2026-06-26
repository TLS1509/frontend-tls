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
const PW = 8.27, PH = 11.69, MX = 0.85, CW = PW - 2 * 0.85;
const shadow = () => ({ type: "outer", color: C.p900, blur: 9, offset: 3, angle: 90, opacity: 0.1 });
const s2png = (svg) => sharp(Buffer.from(svg)).png().toBuffer();
async function icon(IC, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(IC, { color: "#" + color, size: String(size) }));
  return "image/png;base64," + (await s2png(svg)).toString("base64");
}
let BG = {}, ICON = {}, P;
async function assets() {
  const cover = `<svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F5F6A"/><stop offset="0.55" stop-color="#28525C"/><stop offset="1" stop-color="#1F3E45"/></linearGradient>
    <radialGradient id="gl" cx="0.85" cy="0.1" r="0.5"><stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/><stop offset="1" stop-color="#F8B044" stop-opacity="0"/></radialGradient>
    <radialGradient id="gl2" cx="0.05" cy="0.92" r="0.45"><stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/><stop offset="1" stop-color="#55A1B4" stop-opacity="0"/></radialGradient>
    </defs><rect width="1240" height="1754" fill="url(#g)"/><rect width="1240" height="1754" fill="url(#gl)"/><rect width="1240" height="1754" fill="url(#gl2)"/></svg>`;
  fs.writeFileSync("assets/doc-cover.png", await s2png(cover));
  BG.cover = "assets/doc-cover.png";
  ICON.checkT = await icon(FA.FaCheckCircle, C.p600); ICON.bulbT = await icon(FA.FaRegLightbulb, C.p600);
  ICON.arrowD = await icon(FA.FaArrowRight, C.p900); ICON.grad = await icon(FA.FaGraduationCap, C.white);
  ICON.users = await icon(FA.FaUserFriends, C.white); ICON.laptop = await icon(FA.FaLaptopCode, C.white);
}
function dheader(s) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.62, w: 0.14, h: 0.14, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.2, y: 0.55, w: 4, h: 0.3, margin: 0, fontFace: DISPLAY, fontSize: 11, bold: true, color: C.p800, valign: "middle" });
  s.addShape(P.shapes.LINE, { x: MX, y: 0.95, w: CW, h: 0, line: { color: C.border, width: 1 } });
}
function dfooter(s, n) {
  s.addShape(P.shapes.LINE, { x: MX, y: PH - 0.75, w: CW, h: 0, line: { color: C.border, width: 1 } });
  s.addText("Confidentiel", { x: MX, y: PH - 0.68, w: 3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 8.5, color: C.faint, valign: "middle" });
  s.addText(n, { x: PW - MX - 2, y: PH - 0.68, w: 2, h: 0.26, margin: 0, fontFace: BODY, fontSize: 8.5, color: C.faint, align: "right", valign: "middle" });
}

const L = {};
L.dCover = (s, p) => {
  s.background = { path: BG.cover };
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.85, w: 0.2, h: 0.2, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.28, y: 0.78, w: 5, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.white, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 6.4, w: CW, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.04, y: 6.85, w: CW, h: 2.0, margin: 0, fontFace: DISPLAY, fontSize: 42, bold: true, color: C.white, lineSpacingMultiple: 0.98 });
  s.addShape(P.shapes.RECTANGLE, { x: MX, y: 9.05, w: 0.7, h: 0.05, fill: { color: C.s500 } });
  if (p.subtitle) s.addText(p.subtitle, { x: MX, y: 9.3, w: CW, h: 0.8, margin: 0, fontFace: BODY, fontSize: 14.5, color: "C9DEE4", lineSpacingMultiple: 1.2 });
  (p.meta || []).forEach((m, i) => s.addText([{ text: m.k + "   ", options: { color: "8FB0B8" } }, { text: m.v, options: { bold: true, color: C.white } }],
    { x: MX, y: 10.35 + i * 0.34, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5 }));
};
L.dPage = (s, p, n) => {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  let y = 2.7;
  (p.paras || []).forEach((para) => {
    s.addText(para, { x: MX, y, w: CW, h: 1.4, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.35, valign: "top" });
    y += 1.35;
  });
  (p.bullets || []).forEach((b) => {
    s.addImage({ data: ICON.checkT, x: MX, y: y + 0.03, w: 0.22, h: 0.22 });
    s.addText([{ text: b.b + (b.d ? "  " : ""), options: { bold: true, color: C.p800 } }, { text: b.d ? "— " + b.d : "", options: { color: C.muted } }],
      { x: MX + 0.4, y: y - 0.04, w: CW - 0.5, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, valign: "top" });
    y += 0.62;
  });
  if (p.callout) {
    y += 0.2;
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y, w: CW, h: 1.5, rectRadius: 0.12, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
    s.addImage({ data: ICON.bulbT, x: MX + 0.32, y: y + 0.32, w: 0.32, h: 0.32 });
    s.addText("À RETENIR", { x: MX + 0.76, y: y + 0.32, w: 4, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p700, charSpacing: 1.5, valign: "middle" });
    s.addText(p.callout, { x: MX + 0.34, y: y + 0.78, w: CW - 0.68, h: 0.6, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.p800, lineSpacingMultiple: 1.05, valign: "top" });
  }
  dfooter(s, n);
};
L.dProposal = (s, p, n) => {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  p.points.forEach((pt, i) => {
    const y = 2.85 + i * 1.95;
    s.addShape(P.shapes.OVAL, { x: MX, y, w: 0.6, h: 0.6, fill: { color: C.p600 } });
    s.addText(String(i + 1), { x: MX, y, w: 0.6, h: 0.6, margin: 0, fontFace: DISPLAY, fontSize: 20, bold: true, color: C.white, align: "center", valign: "middle" });
    s.addText(pt.t, { x: MX + 0.85, y: y - 0.02, w: CW - 0.85, h: 0.45, margin: 0, fontFace: DISPLAY, fontSize: 16.5, bold: true, color: C.p800 });
    s.addText(pt.d, { x: MX + 0.85, y: y + 0.46, w: CW - 0.85, h: 1.2, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.3, valign: "top" });
  });
  if (p.note) s.addText(p.note, { x: MX, y: PH - 1.3, w: CW, h: 0.4, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: C.faint });
  dfooter(s, n);
};
L.dSign = (s, p, n) => {
  s.background = { color: C.white }; dheader(s);
  s.addText(p.eyebrow, { x: MX, y: 1.35, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p600, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.68, w: CW, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.ink });
  s.addText(p.body, { x: MX, y: 2.7, w: CW, h: 1.6, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.4, valign: "top" });
  const sy = 5.0, bw = (CW - 0.5) / 2;
  [["Pour The Learning Society", "{{Nom · fonction}}"], ["Pour {{Client}}", "{{Nom · fonction}}"]].forEach((b, i) => {
    const x = MX + i * (bw + 0.5);
    s.addText(b[0], { x, y: sy, w: bw, h: 0.32, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.p700, charSpacing: 0.5 });
    s.addShape(P.shapes.LINE, { x, y: sy + 1.3, w: bw, h: 0, line: { color: C.ink, width: 1 } });
    s.addText(b[1], { x, y: sy + 1.36, w: bw, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.muted });
    s.addText("Date & signature", { x, y: sy + 1.66, w: bw, h: 0.3, margin: 0, fontFace: BODY, fontSize: 9.5, italic: true, color: C.faint });
  });
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: PH - 2.5, w: CW, h: 1.2, rectRadius: 0.12, fill: { color: C.p800 } });
  s.addText("Une question ?", { x: MX + 0.4, y: PH - 2.25, w: CW - 0.8, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 15, bold: true, color: C.white });
  s.addText([{ text: "hello@thelearningsociety.fr     ", options: { bold: true } }, { text: "thelearningsociety.fr" }],
    { x: MX + 0.4, y: PH - 1.85, w: CW - 0.8, h: 0.34, margin: 0, fontFace: BODY, fontSize: 12, color: "C9DEE4", valign: "middle" });
  dfooter(s, n);
};
L.dOnePager = (s, p, n) => {
  s.background = { color: C.white };
  s.addShape(P.shapes.RECTANGLE, { x: 0, y: 0, w: PW, h: 2.7, fill: { color: C.p800 } });
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.6, w: 0.18, h: 0.18, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.26, y: 0.53, w: 5, h: 0.34, margin: 0, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, valign: "middle" });
  s.addText(p.eyebrow, { x: MX, y: 1.2, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color: C.a400, charSpacing: 2 });
  s.addText(p.title, { x: MX - 0.03, y: 1.5, w: CW, h: 0.9, margin: 0, fontFace: DISPLAY, fontSize: 27, bold: true, color: C.white });
  s.addText(p.intro, { x: MX, y: 3.0, w: CW, h: 1.0, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.35, valign: "top" });
  const cw = (CW - 0.6) / 3, cy = 4.4, ch = 3.0;
  p.cards.forEach((c, i) => {
    const x = MX + i * (cw + 0.3);
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
    s.addShape(P.shapes.OVAL, { x: x + 0.28, y: cy + 0.32, w: 0.7, h: 0.7, fill: { color: C.p600 } });
    const isz = 0.34; s.addImage({ data: c.ic, x: x + 0.28 + 0.18, y: cy + 0.32 + 0.18, w: isz, h: isz });
    s.addText(c.t, { x: x + 0.26, y: cy + 1.2, w: cw - 0.5, h: 0.4, margin: 0, fontFace: DISPLAY, fontSize: 14.5, bold: true, color: C.p800 });
    s.addText(c.d, { x: x + 0.28, y: cy + 1.64, w: cw - 0.56, h: 1.2, margin: 0, fontFace: BODY, fontSize: 11, color: C.muted, lineSpacingMultiple: 1.2, valign: "top" });
  });
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 8.1, w: CW, h: 1.5, rectRadius: 0.12, fill: { color: C.p50 }, line: { color: "CDE6EC", width: 1 } });
  s.addText(p.stat || "{{ Le chiffre clé / la promesse }}", { x: MX + 0.4, y: 8.35, w: CW - 0.8, h: 1.0, margin: 0, fontFace: DISPLAY, fontSize: 19, bold: true, color: C.p800, lineSpacingMultiple: 1.05, valign: "middle" });
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: 9.95, w: 2.4, h: 0.62, rectRadius: 0.31, fill: { color: C.a400 } });
  s.addText(p.cta || "Discutons-en", { x: MX + 0.1, y: 9.95, w: 1.8, h: 0.62, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addImage({ data: ICON.arrowD, x: MX + 1.95, y: 10.16, w: 0.18, h: 0.18 });
  s.addText([{ text: "hello@thelearningsociety.fr    ", options: { bold: true, color: C.p800 } }, { text: "thelearningsociety.fr", options: { color: C.muted } }],
    { x: MX + 2.7, y: 9.95, w: CW - 2.7, h: 0.62, margin: 0, fontFace: BODY, fontSize: 11.5, valign: "middle" });
  dfooter(s, n);
};

function buildDoc(file, title, specs) {
  P = new pptxgen();
  P.defineLayout({ name: "A4P", width: PW, height: PH }); P.layout = "A4P";
  P.author = "The Learning Society"; P.title = title;
  specs.forEach((sp, i) => { const s = P.addSlide(); L[sp.type](s, sp, String(i + 1)); });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();
  // DOC 1 — Proposition / document multi-pages
  await buildDoc("TLS-doc-proposition.pptx", "TLS — Proposition (gabarit document)", [
    { type: "dCover", eyebrow: "PROPOSITION · CONFIDENTIEL", title: "{{Titre de la proposition}}", subtitle: "{{ Sous-titre : le bénéfice principal en une phrase. }}", meta: [{ k: "Préparé pour", v: "{{Client}}" }, { k: "Par", v: "The Learning Society" }, { k: "Date", v: "{{2026}}" }, { k: "Référence", v: "{{REF-000}}" }] },
    { type: "dPage", eyebrow: "01 · CONTEXTE", title: "Votre enjeu", paras: ["{{ Reformulez le contexte et l'enjeu du client en 3-4 phrases. Montrez que vous avez compris sa situation : c'est ce qui inspire confiance. }}", "{{ Ajoutez un second paragraphe si besoin : l'impact de l'inaction, l'urgence, l'opportunité. }}"], callout: "{{ La phrase qui résume l'enjeu, à retenir. }}" },
    { type: "dProposal", eyebrow: "02 · NOTRE PROPOSITION", title: "Ce que nous proposons", points: [
      { t: "{{Volet 1}}", d: "{{ Décrivez le premier volet de la prestation et le livrable associé. }}" },
      { t: "{{Volet 2}}", d: "{{ Décrivez le deuxième volet et sa valeur pour le client. }}" },
      { t: "{{Volet 3}}", d: "{{ Décrivez le troisième volet, le résultat attendu. }}" },
    ], note: "Tarifs et calendrier détaillés sur demande — calibrés ensemble après l'Audit Flash." },
    { type: "dSign", eyebrow: "03 · ACCORD", title: "Pour avancer ensemble", body: "{{ Récapitulez l'engagement, les prochaines étapes et la durée de validité de l'offre. Une signature de part et d'autre vaut bon pour accord de démarrage. }}" },
  ]);
  // DOC 2 — One-pager
  await buildDoc("TLS-doc-one-pager.pptx", "TLS — One-pager (gabarit)", [
    { type: "dOnePager", eyebrow: "EN BREF", title: "{{Titre de l'offre}}", intro: "{{ Une accroche de 2-3 lignes : à qui s'adresse l'offre, le problème résolu, et pourquoi vous. }}", cards: [
      { ic: ICON.grad, t: "{{Pilier 1}}", d: "{{ Bénéfice concret en une phrase. }}" },
      { ic: ICON.users, t: "{{Pilier 2}}", d: "{{ Bénéfice concret en une phrase. }}" },
      { ic: ICON.laptop, t: "{{Pilier 3}}", d: "{{ Bénéfice concret en une phrase. }}" },
    ], stat: "{{ Votre chiffre clé ou votre promesse forte — ce qui reste en tête. }}", cta: "Discutons-en" },
  ]);
  console.log("docs written");
})();
