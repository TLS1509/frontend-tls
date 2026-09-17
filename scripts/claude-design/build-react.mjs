// React et ReactDOM de l'app, reconditionnés en scripts classiques pour components/lib/ (window.React, window.ReactDOM).
// Usage : node build-react.mjs   → out/components/lib/react.production.min.js + react-dom.production.min.js
import esbuild from 'esbuild';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(process.env.REPO || path.join(HERE, '../..'));
const LIB = path.join(process.env.OUT || path.join(HERE, 'out/components'), 'lib');
const opts = { bundle: true, format: 'iife', minify: true, write: true, platform: 'browser', target: 'es2020',
  define: { 'process.env.NODE_ENV': '"production"' }, nodePaths: [path.join(HERE, 'node_modules'), path.join(REPO, 'node_modules')] };
await esbuild.build({ ...opts, stdin: { contents: "import * as R from 'react'; window.React = R;", resolveDir: HERE }, outfile: path.join(LIB, 'react.production.min.js') });
const toGlobal = { name: 'g', setup(b) {
  b.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'g' }));
  b.onLoad({ filter: /.*/, namespace: 'g' }, () => ({ contents: 'module.exports = window.React;', loader: 'js' }));
} };
await esbuild.build({ ...opts, plugins: [toGlobal], stdin: { contents: "import * as D from 'react-dom'; import * as C from 'react-dom/client'; window.ReactDOM = Object.assign({}, D, C);", resolveDir: HERE }, outfile: path.join(LIB, 'react-dom.production.min.js') });
console.log('lib →', LIB);
