// Rendu de contrôle : imite le cadre d'aperçu de Claude Design (tokens + polices + bundle.css + React + bundle.js + preview.html).
// Usage : DS=<copie du dossier project/ de l'artefact : tokens.json + fonts/> node render-check.mjs [Nom …]
// Sortie : out/check/<Nom>.png et une ligne par composant « erreurs [] ». Exige playwright (npx playwright ou installation globale).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DS = process.env.DS; if (!DS) throw new Error('DS=<dossier project/ de l’artefact> manquant');
const C = process.env.OUT || path.join(HERE, 'out/components');
const CHECK = path.join(HERE, 'out/check'); fs.mkdirSync(CHECK, { recursive: true });
const t = JSON.parse(fs.readFileSync(path.join(DS, 'tokens.json'), 'utf8'));
const val = v => (typeof v === 'object' ? v.light : v);
const col = x => { const s = val(x); return s.startsWith('{') ? `var(--${s.slice(1, -1)})` : s; };
let css = ':root{';
for (const x of t.color.tokens) css += `--${x.name}:${col(x.value)};`;
for (const [k, f] of Object.entries(t)) if (k !== 'color' && f && f.tokens) for (const x of f.tokens) css += `--${x.name}:${val(x.value)};`;
for (const [k, v] of Object.entries(t.type.families)) css += `--font-${k}:${v};`;
css += '}';
for (const f of t.type.fonts) css += `@font-face{font-family:'${f.family}';src:url(file://${path.join(DS, f.file)});font-weight:${f.weight};font-style:${f.style || 'normal'}}`;

const names = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(C).filter(n => fs.existsSync(path.join(C, n, 'preview.html')));
const browser = await chromium.launch();
let bad = 0;
for (const n of names) {
  const prev = fs.readFileSync(path.join(C, n, 'preview.html'), 'utf8');
  const height = +(prev.match(/height=(\d+)/) || [0, 400])[1]; const width = +(prev.match(/ width=(\d+)/) || [0, 960])[1];
  const page = `<!doctype html><html data-theme="light"><head><style>${css}</style>
<style>${fs.readFileSync(path.join(C, 'bundle.css'), 'utf8')}</style>
<script src="file://${C}/lib/react.production.min.js"></script>
<script src="file://${C}/lib/react-dom.production.min.js"></script>
<script src="file://${C}/bundle.js"></script>
${prev.slice(prev.indexOf('<head>') + 6)}`;
  const file = path.join(CHECK, `${n}.html`); fs.writeFileSync(file, page);
  const p = await browser.newPage({ viewport: { width, height } });
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto('file://' + file); await p.waitForTimeout(800);
  const h = await p.evaluate(() => document.body.scrollHeight);
  await p.setViewportSize({ width, height: Math.max(height, h) });
  await p.screenshot({ path: path.join(CHECK, `${n}.png`) });
  if (errs.length) bad++;
  console.log(n, 'hauteur', h, 'erreurs', JSON.stringify(errs.slice(0, 5)));
  await p.close();
}
await browser.close();
console.log(bad ? `${bad} aperçu(s) en erreur` : `0 erreur sur ${names.length}`);
process.exit(bad ? 1 : 0);
