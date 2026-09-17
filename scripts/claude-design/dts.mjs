// Émet les types des composants exposés (documentation, jamais vérifiés) : out/components/<Name>/<Name>.d.ts
// Usage : REPO=<racine frontend-tls> REF=<commit court> node dts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(process.env.REPO || path.join(HERE, '../..'));
const REF = process.env.REF || execFileSync('git', ['-C', REPO, 'rev-parse', '--short', 'HEAD']).toString().trim();
const OUT = process.env.OUT || path.join(HERE, 'out/components');
const TMP = path.join(HERE, 'out/.dts');
const entries = JSON.parse(fs.readFileSync(path.join(HERE, 'entries.json'), 'utf8')).filter(e => e.from);
const mods = [path.join(HERE, 'node_modules'), path.join(REPO, 'node_modules')];

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const tsconfig = {
  compilerOptions: {
    target: 'ES2020', module: 'ESNext', moduleResolution: 'bundler', jsx: 'react-jsx',
    declaration: true, emitDeclarationOnly: true, outDir: path.join(TMP, 'out'), rootDir: path.join(REPO, 'src'),
    skipLibCheck: true, strict: false, noEmitOnError: false, isolatedModules: false,
    typeRoots: mods.map(m => path.join(m, '@types')), types: [],
    baseUrl: TMP, paths: { '*': mods.flatMap(m => [m + '/*', m + '/@types/*']) },
  },
  files: entries.map(e => path.join(REPO, 'src/components', e.from)),
};
fs.writeFileSync(path.join(TMP, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
const tsc = [path.join(HERE, 'node_modules/.bin/tsc'), path.join(REPO, 'node_modules/.bin/tsc')].find(fs.existsSync);
try { execFileSync(tsc, ['-p', path.join(TMP, 'tsconfig.json')], { stdio: 'pipe' }); }
catch (e) { /* noEmitOnError: false — les erreurs de type n'empêchent pas l'émission */ }

for (const e of entries) {
  const src = path.join(TMP, 'out/components', e.from.replace(/\.tsx?$/, '.d.ts'));
  if (!fs.existsSync(src)) { console.warn('pas de .d.ts pour', e.from); continue; }
  const body = fs.readFileSync(src, 'utf8').replace(/^export default \w+;\n?/m, '');
  for (const name of e.cards) {
    const header = `// Types relevés dans src/components/${e.from} (frontend-tls@${REF}), émis par tsc. Documentation, jamais vérifiés.\n`;
    fs.mkdirSync(path.join(OUT, name), { recursive: true });
    fs.writeFileSync(path.join(OUT, name, `${name}.d.ts`), header + body);
  }
}
console.log('d.ts', entries.flatMap(e => e.cards).length);
