#!/usr/bin/env node
// Regenerates the DS showcase catalog from Components.tsx.
// Usage: node scripts/generate-ds-catalog.js
// Output: ~/Desktop/design-system-site copie/data/catalog.js

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COMPONENTS_TSX = path.join(ROOT, 'src/pages/Components.tsx');
const OUTPUT = path.join(
  process.env.HOME,
  'Desktop/design-system-site copie/data/catalog.js'
);

const src = fs.readFileSync(COMPONENTS_TSX, 'utf-8');

// ── 1. Parse REMAP for new-taxonomy category + subCategory ─────────────────
// Matches:  Button: { category: 'Atoms', subCategory: 'Form fields' },
// Also:     'Dialog Modals': { category: 'Modals', subCategory: 'Confirm/Status' },
const remap = {};
{
  const remapStart = src.indexOf('const REMAP:');
  const remapEnd = src.indexOf('\n};', remapStart) + 3;
  const block = src.slice(remapStart, remapEnd);
  const re = /^\s+['"]?([^'":\n]+?)['"]?\s*:\s*\{\s*category:\s*'([^']+)',\s*subCategory:\s*'([^']+)'\s*\}/gm;
  let m;
  while ((m = re.exec(block)) !== null) {
    remap[m[1].trim()] = { category: m[2], subCategory: m[3] };
  }
}

// ── 2. Locate COMPONENTS array ─────────────────────────────────────────────
const arrStart = src.indexOf('const COMPONENTS: ComponentEntry[] = [');
if (arrStart === -1) throw new Error('Could not find COMPONENTS array in Components.tsx');
const content = src.slice(arrStart);

// ── 3. Helpers ─────────────────────────────────────────────────────────────

function extractString(block, key) {
  // Single-quoted
  let m = new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(block);
  if (m) return m[1];
  // Double-quoted
  m = new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's').exec(block);
  if (m) return m[1];
  // Backtick (potentially multiline)
  const btKey = `${key}: \``;
  const btIdx = block.indexOf(btKey);
  if (btIdx !== -1) {
    const inner = block.slice(btIdx + btKey.length);
    const end = inner.indexOf('`');
    if (end !== -1) return inner.slice(0, end);
  }
  return '';
}

function extractArray(block, key) {
  const idx = block.indexOf(`${key}: [`);
  if (idx === -1) return [];
  const open = block.indexOf('[', idx);
  const close = block.indexOf(']', open);
  if (open === -1 || close === -1) return [];
  const inner = block.slice(open + 1, close);
  const items = [];
  const re = /['"]([^'"]*)['"]/g;
  let m;
  while ((m = re.exec(inner)) !== null) items.push(m[1]);
  return items;
}

function extractBool(block, key) {
  const m = new RegExp(`${key}:\\s*(true|false)`).exec(block);
  return m ? m[1] === 'true' : false;
}

function inferLayer(codeName) {
  if (!codeName || !codeName.includes('/')) return 'ui';
  return codeName.split('/')[0];
}

function buildImport(name) {
  // Strip special chars to get a valid identifier for the first export name
  const id = name.split(/[\s+·,\/]/)[0].trim().replace(/[^a-zA-Z0-9]/g, '');
  if (!id) return '';
  return `import { ${id} } from '@/components';`;
}

// ── 4. Extract each entry (from name: up to render:) ──────────────────────
const entries = [];
let pos = 0;

while (true) {
  // Find the next name: declaration
  const candidates = [
    content.indexOf("    name: '", pos),
    content.indexOf('    name: "', pos),
    content.indexOf('    name: `', pos),
  ].filter(p => p !== -1);

  if (candidates.length === 0) break;
  const namePos = Math.min(...candidates);

  // Find the render: that belongs to this entry
  const renderPos = content.indexOf('    render:', namePos);
  if (renderPos === -1) break;

  const metaBlock = content.slice(namePos, renderPos);

  const name        = extractString(metaBlock, 'name');
  const codeName    = extractString(metaBlock, 'codeName');
  const legacyCat   = extractString(metaBlock, 'category');
  const description = extractString(metaBlock, 'description');
  const keywords    = extractArray(metaBlock, 'keywords');
  const usedBy      = extractArray(metaBlock, 'usedBy');
  const showcaseOnly = extractBool(metaBlock, 'showcaseOnly');

  if (name) {
    const mapped = remap[name];
    entries.push({
      name,
      codeName,
      category:    mapped ? mapped.category    : legacyCat,
      subCategory: mapped ? mapped.subCategory : '',
      description,
      keywords,
      usedBy,
      showcaseOnly,
      layer:  inferLayer(codeName),
      import: buildImport(name),
    });
  }

  pos = renderPos + 1;
}

// ── 5. Write catalog.js ────────────────────────────────────────────────────
const header = [
  '// AUTO-GENERATED from src/pages/Components.tsx — TLS Design System catalog',
  '// Run: node scripts/generate-ds-catalog.js to regenerate',
].join('\n');

const output = `${header}\nwindow.DS_COMPONENTS = ${JSON.stringify(entries, null, 1)};\n`;

fs.writeFileSync(OUTPUT, output, 'utf-8');
console.log(`✓ ${entries.length} components written → ${OUTPUT}`);
