// Build the TLS design-system bundle from the frontend-tls snapshot.
// Usage: REPO=<racine frontend-tls> node build.mjs   → out/components/bundle.js + bundle.css
import esbuild from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(process.env.REPO || path.join(HERE, '../..'));
const OUT = process.env.OUT || path.join(HERE, 'out/components');
const NS = 'TheLearningSocietyDesignSystem_96f558';
const entries = JSON.parse(fs.readFileSync(path.join(HERE, 'entries.json'), 'utf8'));
// entries: [{ name, from }]  from = path relative to src/components
fs.mkdirSync(OUT, { recursive: true });

let entrySrc = entries.map(e => e.raw ? e.raw : e.pkg
  ? `export { ${e.names.join(', ')} } from ${JSON.stringify(e.pkg)};`
  : `export { ${(e.names || [e.name]).join(', ')} } from ${JSON.stringify(path.join(REPO, 'src/components', e.from))};`).join('\n');
const cards = entries.flatMap(e => e.cards || (e.name ? [e.name] : []));

// La vitrine /components : chaque fiche devient une carte dont l'aperçu rejoue son rendu (Showcase[nom]).
// out/showcase.json vient de showcase.mjs ; absent, le bundle ne contient que les cartes écrites à la main.
const SHOW = path.join(HERE, 'out/showcase.json');
const showcase = fs.existsSync(SHOW) ? JSON.parse(fs.readFileSync(SHOW, 'utf8')).cards : [];
if (showcase.length) {
  const already = new Set(entries.flatMap(e => e.names || (e.name ? [e.name] : [])));
  const lines = showcase.filter(c => c.exportFrom && !already.has(c.id))
    .map(c => `export { ${c.id} } from ${JSON.stringify(path.join(REPO, 'src/components', c.exportFrom))};`);
  const extra = `\nimport { __SHOWCASE } from ${JSON.stringify(path.join(REPO, 'src/pages/Components.tsx'))};\n`
    + `export const Showcase = Object.fromEntries(__SHOWCASE.map(c => [c.name, c.render]));\n` + lines.join('\n');
  entrySrc += extra;
  cards.push(...showcase.map(c => c.id));
}

const globals = {
  name: 'react-globals',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?(\/.*)?$/ }, a => ({ path: a.path, namespace: 'g' }));
    // COMPONENTS n'est pas exporté par la page vitrine : on l'expose à la compilation, sans toucher au fichier.
    b.onLoad({ filter: /src[\\/]pages[\\/]Components\.tsx$/ }, a => ({ contents: fs.readFileSync(a.path, 'utf8') + '\nexport { COMPONENTS as __SHOWCASE };\n', loader: 'tsx' }));
    // Export PDF et capture d'écran : inutiles dans un aperçu, 700 Ko de moins.
    b.onResolve({ filter: /^(jspdf|html2canvas)$/ }, a => ({ path: a.path, namespace: 'stub' }));
    b.onLoad({ filter: /.*/, namespace: 'stub' }, a => ({ contents: `const no = () => { throw new Error('${a.path} indisponible dans Claude Design'); }; export default no; export const jsPDF = no;`, loader: 'js' }));
    b.onLoad({ filter: /.*/, namespace: 'g' }, a => {
      if (a.path === 'react/jsx-runtime' || a.path === 'react/jsx-dev-runtime') {
        return { contents: `const R = window.React;
          function j(t, p, k) { const q = k === undefined ? p : Object.assign({}, p, { key: k }); return R.createElement(t, q); }
          export const jsx = j, jsxs = j, jsxDEV = j; export const Fragment = R.Fragment;`, loader: 'js' };
      }
      if (a.path.startsWith('react-dom')) return { contents: `module.exports = window.ReactDOM;`, loader: 'js' };
      return { contents: `module.exports = window.React;`, loader: 'js' };
    });
  },
};

const r = await esbuild.build({
  stdin: { contents: entrySrc, resolveDir: REPO, loader: 'ts' },
  bundle: true, format: 'iife', globalName: '__tls', minify: true, write: false,
  jsx: 'automatic', target: 'es2020', platform: 'browser',
  define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env': '{"DEV":false,"PROD":true,"MODE":"production","BASE_URL":"/"}' },
  nodePaths: [path.join(HERE, 'node_modules'), path.join(REPO, 'node_modules')],
  plugins: [globals], logLevel: 'warning',
  loader: { '.svg': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl', '.jpeg': 'dataurl', '.webp': 'dataurl', '.css': 'empty' },
});
let js = r.outputFiles[0].text;
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: NS, components: cards.map(name => ({ name })) })} */`;
js = `${header}\n${js}\nwindow.${NS} = __tls;\n`;
if (/<\/script|<!--/i.test(js)) {
  js = js.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
}
fs.writeFileSync(path.join(OUT, 'bundle.js'), js);

// CSS: the app's real stylesheet, compiled by Tailwind v4 over the whole src tree
// Vite résout les @import url(...) ; le plugin Tailwind seul les laisse passer tels quels (et globals.css,
// design-tokens.css, modals.css manqueraient). On les réécrit en @import '...' que Tailwind inline.
const cssIn = fs.readFileSync(path.join(REPO, 'src/index.css'), 'utf8')
  .replace(/@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)/g, "@import '$1'");
const res = await postcss([tailwind({ base: path.join(REPO, 'src') })]).process(cssIn, { from: path.join(REPO, 'src/index.css') });
let css = res.css;
// fonts are provided by the design system's tokens.css (@font-face per type.fonts): drop the app's /fonts/ urls
css = css.replace(/@font-face\s*\{[^}]*url\(["']?\/fonts\/[^}]*\}/g, '');
if (/<\/style/i.test(css)) throw new Error('</style in css');
const left = css.match(/@import[^;]*;/g); if (left) throw new Error('@import non résolu : ' + left.join(' '));
fs.writeFileSync(path.join(OUT, 'bundle.css'), css);
console.log('js', js.length, 'css', css.length);
