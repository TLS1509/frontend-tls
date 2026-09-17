// Inventaire de la vitrine /components : quelles fiches deviennent des cartes Claude Design, avec leur groupe et leur source.
// Lit src/pages/Components.tsx (tableau COMPONENTS, par l'AST TypeScript) et src/pages/components/registry.ts (CATALOG).
// Usage : REPO=<racine frontend-tls> node showcase.mjs   → out/showcase.json
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import esbuild from 'esbuild';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(process.env.REPO || path.join(HERE, '../..'));
const require = createRequire(path.join(REPO, 'package.json'));
const ts = require('typescript');

// 1. Le registre : pur TS, sans import — transpilé et évalué tel quel.
const regSrc = fs.readFileSync(path.join(REPO, 'src/pages/components/registry.ts'), 'utf8');
const regJs = (await esbuild.transform(regSrc, { loader: 'ts', format: 'cjs' })).code;
const mod = { exports: {} }; new Function('module', 'exports', regJs)(mod, mod.exports);
const { CATALOG, CONVENTIONS } = mod.exports;

// 2. Les fiches de la vitrine : name, codeName, description (littéraux seulement).
const file = path.join(REPO, 'src/pages/Components.tsx');
const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const lit = n => {
  if (!n) return undefined;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken) { const a = lit(n.left), b = lit(n.right); return a != null && b != null ? a + b : undefined; }
  if (ts.isParenthesizedExpression(n)) return lit(n.expression);
  return undefined;
};
let entries = [];
ts.forEachChild(sf, function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === 'COMPONENTS' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
    for (const el of node.initializer.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      const o = {};
      for (const p of el.properties) if (ts.isPropertyAssignment(p)) o[p.name.getText()] = lit(p.initializer);
      entries.push(o);
    }
  }
  ts.forEachChild(node, visit);
});

// 3. Ce qui existe déjà en carte écrite à la main, et ce qu'on écarte.
const curated = new Set(JSON.parse(fs.readFileSync(path.join(HERE, 'entries.json'), 'utf8')).flatMap(e => e.cards || []));
const alsoCurated = { EditorialHero: 'PageHero' };          // la fiche vitrine EditorialHero = la carte PageHero
const SKIP = { 'Toast + useToast': 'la carte Toast la couvre' };
const cardId = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^A-Za-z0-9]+/).filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join('');

// Index des fichiers de src/components par nom de base (codeName omet parfois le dossier).
const byBase = new Map();
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, f.name);
  if (f.isDirectory()) walk(p); else if (/\.tsx?$/.test(f.name) && !byBase.has(f.name)) byBase.set(f.name, path.relative(path.join(REPO, 'src/components'), p));
} })(path.join(REPO, 'src/components'));
const cards = [], skipped = [];
for (const e of entries) {
  if (!e.name) continue;
  if (CONVENTIONS.has(e.name)) { skipped.push([e.name, 'fiche de convention (brand book)']); continue; }
  if (curated.has(e.name) || alsoCurated[e.name]) { skipped.push([e.name, 'carte écrite à la main']); continue; }
  if (SKIP[e.name]) { skipped.push([e.name, SKIP[e.name]]); continue; }
  const meta = CATALOG[e.name] || { category: 'Non classé', subCategory: '' };
  // Fichiers sources : codeName peut en citer plusieurs (« a.tsx · b.tsx »), on garde ceux qui existent.
  const sources = [...new Set((e.codeName || '').match(/[\w./-]+\.tsx?/g) || [])]
    .map(s => s.replace(/^src\/components\//, ''))
    .map(s => fs.existsSync(path.join(REPO, 'src/components', s)) ? s : byBase.get(path.basename(s)))
    .filter(Boolean);
  // Le composant homonyme est-il exporté par sa source ? Alors le bundle l'expose aussi.
  const exportFrom = sources.find(s => new RegExp(`export\\s+(?:const|function|class)\\s+${cardId(e.name)}\\b|export\\s*\\{[^}]*\\b${cardId(e.name)}\\b`).test(fs.readFileSync(path.join(REPO, 'src/components', s), 'utf8'))) || null;
  const exported = !!exportFrom;
  const summary = (e.description || '').split(/(?<=[.!?])\s/)[0].slice(0, 160);
  cards.push({ id: cardId(e.name), name: e.name, group: meta.category, subCategory: meta.subCategory, sources, exported, exportFrom, summary, description: e.description || '' });
}
const ids = cards.map(c => c.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) throw new Error('identifiants de carte en double : ' + dup.join(', '));
fs.mkdirSync(path.join(HERE, 'out'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'out/showcase.json'), JSON.stringify({ cards, skipped }, null, 1));
console.log('vitrine :', entries.length, 'fiches →', cards.length, 'cartes nouvelles,', skipped.length, 'écartées');
