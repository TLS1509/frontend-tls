const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const FA = require("react-icons/fa");

const C = {
  p50: "E8F4F7", p500: "55A1B4", p600: "4A8FA1", p700: "3D7786", p800: "2F5F6A", p900: "1F3E45",
  s500: "ED843A", a400: "F8B044", ink: "252B37", muted: "6B7280", white: "FFFFFF",
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
  const cover = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F5F6A"/><stop offset="0.55" stop-color="#28525C"/><stop offset="1" stop-color="#1F3E45"/></linearGradient>
    <radialGradient id="gl" cx="0.85" cy="0.12" r="0.55"><stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/><stop offset="1" stop-color="#F8B044" stop-opacity="0"/></radialGradient>
    <radialGradient id="gl2" cx="0.05" cy="0.95" r="0.5"><stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/><stop offset="1" stop-color="#55A1B4" stop-opacity="0"/></radialGradient>
    </defs><rect width="2000" height="1125" fill="url(#g)"/><rect width="2000" height="1125" fill="url(#gl)"/><rect width="2000" height="1125" fill="url(#gl2)"/></svg>`;
  fs.writeFileSync("assets/cover-bg.png", await s2png(cover));
  BG.cover = "assets/cover-bg.png";
  ICON.quote = await icon(FA.FaQuoteLeft, C.a400); ICON.arrowD = await icon(FA.FaArrowRight, C.p900);
  ICON.play = await icon(FA.FaPlay, C.white);
}
function mark(s, color) {
  s.addShape(P.shapes.OVAL, { x: MX, y: 0.5, w: 0.2, h: 0.2, fill: { color: C.a400 } });
  s.addText("The Learning Society", { x: MX + 0.28, y: 0.42, w: 5, h: 0.36, margin: 0, fontFace: DISPLAY, fontSize: 14, bold: true, color: color || C.white, valign: "middle" });
}

const L = {};
L.vIntro = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText(p.eyebrow, { x: MX, y: 2.5, w: 8.6, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.05, y: 2.9, w: 8.7, h: 1.7, margin: 0, fontFace: DISPLAY, fontSize: 44, bold: true, color: C.white, lineSpacingMultiple: 0.96 });
  if (p.sub) s.addText(p.sub, { x: MX, y: 4.75, w: 8.4, h: 0.4, margin: 0, fontFace: BODY, fontSize: 15, color: "C9DEE4" });
};
L.vSection = (s, p) => {
  s.background = { path: BG.cover };
  s.addText(p.num, { x: 5.6, y: 0.2, w: 4.0, h: 5.2, margin: 0, fontFace: DISPLAY, fontSize: 280, bold: true, color: C.p700, align: "right", valign: "middle" });
  s.addText(p.kicker, { x: MX, y: 2.3, w: 6, h: 0.34, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.a400, charSpacing: 2.4 });
  s.addText(p.title, { x: MX - 0.05, y: 2.7, w: 6.4, h: 1.8, margin: 0, fontFace: DISPLAY, fontSize: 46, bold: true, color: C.white, lineSpacingMultiple: 0.96 });
};
L.vQuote = (s, p) => {
  s.background = { path: BG.cover };
  s.addImage({ data: ICON.quote, x: MX, y: 1.2, w: 0.7, h: 0.7 });
  s.addText(p.quote, { x: MX - 0.03, y: 2.0, w: 8.7, h: 2.4, margin: 0, fontFace: DISPLAY, fontSize: 36, bold: true, color: C.white, lineSpacingMultiple: 1.04 });
  if (p.by) s.addText(p.by, { x: MX, y: 4.6, w: 8, h: 0.34, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.a400 });
};
L.vStat = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText(p.stat, { x: MX - 0.08, y: 1.85, w: 9, h: 1.9, margin: 0, fontFace: DISPLAY, fontSize: 130, bold: true, color: C.a400, valign: "middle" });
  s.addText(p.label, { x: MX, y: 3.95, w: 8.6, h: 0.7, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.white });
};
L.vLowerThird = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  const by = 4.05, bh = 1.1;
  s.addShape(P.shapes.RECTANGLE, { x: 0, y: by, w: 0.12, h: bh, fill: { color: C.a400 } });
  s.addShape(P.shapes.RECTANGLE, { x: 0.12, y: by, w: 5.6, h: bh, fill: { color: C.white, transparency: 8 } });
  s.addText(p.name, { x: 0.5, y: by + 0.18, w: 5.0, h: 0.5, margin: 0, fontFace: DISPLAY, fontSize: 26, bold: true, color: C.p900 });
  s.addText(p.role, { x: 0.52, y: by + 0.66, w: 5.0, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13.5, bold: true, color: C.s600 });
};
L.vOutro = (s, p) => {
  s.background = { path: BG.cover }; mark(s);
  s.addText(p.title, { x: MX - 0.05, y: 2.0, w: 8.7, h: 1.5, margin: 0, fontFace: DISPLAY, fontSize: 44, bold: true, color: C.white, lineSpacingMultiple: 0.96 });
  if (p.sub) s.addText(p.sub, { x: MX, y: 3.5, w: 8.2, h: 0.5, margin: 0, fontFace: BODY, fontSize: 15, color: "C9DEE4" });
  const cy = 4.35;
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: MX, y: cy, w: 2.6, h: 0.62, rectRadius: 0.31, fill: { color: C.a400 } });
  s.addText(p.cta || "Abonnez-vous", { x: MX + 0.1, y: cy, w: 2.0, h: 0.62, margin: 0, fontFace: BODY, fontSize: 14, bold: true, color: C.p900, align: "center", valign: "middle" });
  s.addImage({ data: ICON.arrowD, x: MX + 2.15, y: cy + 0.22, w: 0.18, h: 0.18 });
  s.addText("thelearningsociety.fr  ·  @thelearningsociety", { x: MX + 3.0, y: cy, w: 6, h: 0.62, margin: 0, fontFace: BODY, fontSize: 12.5, bold: true, color: "C9DEE4", valign: "middle" });
};

function build(file, specs) {
  P = new pptxgen(); P.defineLayout({ name: "V", width: W, height: H }); P.layout = "V";
  P.author = "The Learning Society"; P.title = "TLS — Video frames";
  specs.forEach((sp) => { const s = P.addSlide(); L[sp.type](s, sp); });
  return P.writeFile({ fileName: file });
}

(async () => {
  await assets();
  await build("TLS-video-frames.pptx", [
    { type: "vIntro", eyebrow: "{{NOM DE LA SÉRIE}}", title: "{{Titre de la vidéo}}", sub: "{{ Le sous-titre / le sujet en une ligne }}" },
    { type: "vSection", num: "01", kicker: "CHAPITRE", title: "{{Titre du chapitre}}" },
    { type: "vQuote", quote: "{{ La phrase forte à mettre en avant. }}", by: "{{Auteur · rôle}}" },
    { type: "vStat", stat: "{{ X% }}", label: "{{ ce que ce chiffre représente }}" },
    { type: "vLowerThird", name: "{{Prénom Nom}}", role: "{{Rôle · The Learning Society}}" },
    { type: "vOutro", title: "Merci d'avoir regardé !", sub: "Abonnez-vous pour ne rien manquer.", cta: "Abonnez-vous" },
  ]);

  // Lower-thirds transparents (overlay sur footage) — PNG avec alpha
  const lt = (name, role, theme) => {
    const barTeal = theme === "dark";
    const panelFill = barTeal ? "rgba(31,62,69,0.86)" : "rgba(255,255,255,0.94)";
    const nameCol = barTeal ? "#FFFFFF" : "#1F3E45";
    const roleCol = barTeal ? "#F8B044" : "#C06920";
    return `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <rect x="120" y="820" width="24" height="150" fill="#F8B044"/>
      <rect x="144" y="820" width="760" height="150" rx="14" fill="${panelFill}"/>
      <text x="186" y="888" font-family="League Spartan, sans-serif" font-weight="800" font-size="46" fill="${nameCol}">${name}</text>
      <text x="188" y="934" font-family="Nunito, sans-serif" font-weight="700" font-size="24" fill="${roleCol}">${role}</text>
    </svg>`;
  };
  fs.writeFileSync("assets/lower-third-light.png", await s2png(lt("{{ Prénom Nom }}", "{{ Rôle · The Learning Society }}", "light")));
  fs.writeFileSync("assets/lower-third-dark.png", await s2png(lt("{{ Prénom Nom }}", "{{ Rôle · The Learning Society }}", "dark")));
  console.log("video frames + lower-thirds written");
})();
