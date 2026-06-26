const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const {
  FaGraduationCap, FaUserFriends, FaLaptopCode,
  FaChartLine, FaCheckCircle, FaStar,
} = require("react-icons/fa");

// ---- TLS brand tokens (source: src/index.css @theme) ----
const C = {
  primary50: "E8F4F7", primary500: "55A1B4", primary600: "4A8FA1",
  primary700: "3D7786", primary800: "2F5F6A", primary900: "1F3E45",
  secondary500: "ED843A", secondary600: "C06920",
  accent400: "F8B044",
  ink900: "252B37", muted: "6B7280", border: "E6EDEF", white: "FFFFFF",
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
  const buf = await svgToPng(svg);
  return "image/png;base64," + buf.toString("base64");
}
const makeShadow = () => ({ type: "outer", color: C.primary900, blur: 9, offset: 3, angle: 90, opacity: 0.1 });

(async () => {
  // Cover gradient background (gradients aren't native in pptx → bake an image)
  const coverSvg = `<svg width="2000" height="1125" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2F5F6A"/>
        <stop offset="0.55" stop-color="#28525C"/>
        <stop offset="1" stop-color="#1F3E45"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.85" cy="0.12" r="0.55">
        <stop offset="0" stop-color="#F8B044" stop-opacity="0.20"/>
        <stop offset="1" stop-color="#F8B044" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="0.05" cy="0.95" r="0.5">
        <stop offset="0" stop-color="#55A1B4" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#55A1B4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="2000" height="1125" fill="url(#g)"/>
    <rect width="2000" height="1125" fill="url(#glow)"/>
    <rect width="2000" height="1125" fill="url(#glow2)"/>
  </svg>`;
  fs.writeFileSync("assets/cover-bg.png", await svgToPng(coverSvg));

  // Content pastel gradient (pale teal → warm cream) — matches Chloé's Canva edit, TLS-50 tokens
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

  // Icons
  const icFormation = await iconPng(FaGraduationCap, C.white);
  const icAccomp = await iconPng(FaUserFriends, C.white);
  const icApp = await iconPng(FaLaptopCode, C.white);
  const icStat1 = await iconPng(FaChartLine, C.white);
  const icStat2 = await iconPng(FaCheckCircle, C.white);
  const icStat3 = await iconPng(FaStar, C.white);

  const pres = new pptxgen();
  pres.defineLayout({ name: "TLS", width: 10, height: 5.625 });
  pres.layout = "TLS";
  pres.author = "The Learning Society";
  pres.title = "Gabarits TLS — échantillon";

  // ============ SLIDE 1 — COVER (immersive) ============
  const s1 = pres.addSlide();
  s1.background = { path: "assets/cover-bg.png" };
  // wordmark
  s1.addShape(pres.shapes.OVAL, { x: 0.55, y: 0.52, w: 0.18, h: 0.18, fill: { color: C.accent400 } });
  s1.addText("The Learning Society", {
    x: 0.8, y: 0.45, w: 5, h: 0.34, margin: 0,
    fontFace: DISPLAY, fontSize: 13, bold: true, color: C.white, charSpacing: 0.4, valign: "middle",
  });
  // eyebrow
  s1.addText("PRÉSENTATION COMMERCIALE", {
    x: 0.6, y: 2.62, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: C.accent400, charSpacing: 2.4,
  });
  // title
  s1.addText("Construire l'organisation\napprenante de demain", {
    x: 0.55, y: 2.95, w: 8.4, h: 1.5, margin: 0,
    fontFace: DISPLAY, fontSize: 40, bold: true, color: C.white, lineSpacingMultiple: 0.98,
  });
  // tagline
  s1.addText([
    { text: "Formation", options: { color: C.white, bold: true } },
    { text: "   ·   ", options: { color: C.primary500 } },
    { text: "Accompagnement", options: { color: C.white, bold: true } },
    { text: "   ·   ", options: { color: C.primary500 } },
    { text: "Learning App", options: { color: C.white, bold: true } },
  ], { x: 0.6, y: 4.55, w: 8.5, h: 0.34, margin: 0, fontFace: BODY, fontSize: 13.5 });
  // meta bottom
  s1.addText("2026  ·  thelearningsociety.fr", {
    x: 0.6, y: 5.08, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, color: "9FBEC6",
  });

  // ============ SLIDE 2 — APPROCHE (clean, 3 cards) ============
  const s2 = pres.addSlide();
  s2.background = { path: "assets/content-bg.png" };
  s2.addText("NOTRE APPROCHE", {
    x: 0.6, y: 0.55, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: C.primary600, charSpacing: 2.2,
  });
  s2.addText("Trois leviers, un parcours", {
    x: 0.57, y: 0.88, w: 8.8, h: 0.7, margin: 0,
    fontFace: DISPLAY, fontSize: 33, bold: true, color: C.ink900,
  });

  const cards = [
    { ic: icFormation, t: "Formation", d: "Des parcours certifiants, conçus avec des experts métier." },
    { ic: icAccomp, t: "Accompagnement", d: "Du coaching 1-1 et des corrections personnalisées." },
    { ic: icApp, t: "Learning App", d: "L'apprentissage en autonomie, gamifié et mobile-first." },
  ];
  const cardW = 2.73, gap = 0.3, cardY = 2.0, cardH = 2.85;
  cards.forEach((c, i) => {
    const x = 0.6 + i * (cardW + gap);
    s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH, rectRadius: 0.14,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
    });
    s2.addShape(pres.shapes.OVAL, { x: x + 0.32, y: cardY + 0.36, w: 0.78, h: 0.78, fill: { color: C.primary600 } });
    s2.addImage({ data: c.ic, x: x + 0.32 + 0.21, y: cardY + 0.36 + 0.21, w: 0.36, h: 0.36 });
    s2.addText(c.t, {
      x: x + 0.28, y: cardY + 1.34, w: cardW - 0.46, h: 0.42, margin: 0,
      fontFace: DISPLAY, fontSize: 16.5, bold: true, color: C.primary800,
    });
    s2.addText(c.d, {
      x: x + 0.3, y: cardY + 1.82, w: cardW - 0.56, h: 0.9, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.05,
    });
  });

  // ============ SLIDE 3 — IMPACT (clean stats) ============
  const s3 = pres.addSlide();
  s3.background = { path: "assets/content-bg.png" };
  s3.addText("RÉSULTATS", {
    x: 0.6, y: 0.55, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: C.primary600, charSpacing: 2.2,
  });
  s3.addText("L'impact, en chiffres", {
    x: 0.57, y: 0.88, w: 8.8, h: 0.7, margin: 0,
    fontFace: DISPLAY, fontSize: 33, bold: true, color: C.ink900,
  });

  const stats = [
    { ic: icStat1, n: "+38%", l: "d'engagement formation", circ: C.primary600, num: C.primary800 },
    { ic: icStat2, n: "92%", l: "de taux de complétion", circ: C.primary600, num: C.primary800 },
    { ic: icStat3, n: "4,8/5", l: "de satisfaction apprenant", circ: C.secondary500, num: C.secondary600 },
  ];
  const tW = 2.73, tGap = 0.3, tY = 2.05, tH = 2.5;
  stats.forEach((s, i) => {
    const x = 0.6 + i * (tW + tGap);
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: tY, w: tW, h: tH, rectRadius: 0.14,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: makeShadow(),
    });
    s3.addShape(pres.shapes.OVAL, { x: x + 0.32, y: tY + 0.34, w: 0.66, h: 0.66, fill: { color: s.circ } });
    s3.addImage({ data: s.ic, x: x + 0.32 + 0.18, y: tY + 0.34 + 0.18, w: 0.3, h: 0.3 });
    s3.addText(s.n, {
      x: x + 0.3, y: tY + 1.12, w: tW - 0.6, h: 0.7, margin: 0,
      fontFace: DISPLAY, fontSize: 40, bold: true, color: s.num,
    });
    s3.addText(s.l, {
      x: x + 0.32, y: tY + 1.86, w: tW - 0.6, h: 0.5, margin: 0,
      fontFace: BODY, fontSize: 12.5, color: C.muted,
    });
  });
  s3.addText("Données illustratives — à remplacer par tes chiffres réels.", {
    x: 0.6, y: 5.02, w: 8.8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, italic: true, color: "9AA3AB",
  });

  await pres.writeFile({ fileName: "TLS-gabarits-echantillon.pptx" });
  console.log("written");
})();
