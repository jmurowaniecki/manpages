#!/usr/bin/env node
/**
 * Static checks for grammar JSON and package metadata.
 * Fails on invalid JSON or missing required extension fields.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

function readJson(relPath) {
  const full = path.join(root, relPath);
  const raw = fs.readFileSync(full, 'utf8');
  try {
    return { full, data: JSON.parse(raw) };
  } catch (err) {
    console.error(`Invalid JSON: ${relPath}`);
    console.error(err.message);
    process.exit(1);
  }
}

const files = [
  'package.json',
  'language-configuration.json',
  'syntaxes/manpage.tmLanguage.json',
];

for (const rel of files) {
  readJson(rel);
  console.log(`OK  ${rel}`);
}

const { data: pkg } = readJson('package.json');
const { data: grammar } = readJson('syntaxes/manpage.tmLanguage.json');

const requiredPkg = ['name', 'publisher', 'version', 'engines', 'contributes'];
for (const key of requiredPkg) {
  if (pkg[key] == null) {
    console.error(`package.json missing required field: ${key}`);
    process.exit(1);
  }
}

if (!pkg.contributes?.grammars?.length) {
  console.error('package.json contributes.grammars is empty');
  process.exit(1);
}

if (!pkg.contributes?.languages?.length) {
  console.error('package.json contributes.languages is empty');
  process.exit(1);
}

if (grammar.scopeName !== 'source.man') {
  console.error(`Expected grammar scopeName "source.man", got "${grammar.scopeName}"`);
  process.exit(1);
}

if (!Array.isArray(grammar.patterns) || grammar.patterns.length === 0) {
  console.error('Grammar patterns must be a non-empty array');
  process.exit(1);
}

const grammarPath = pkg.contributes.grammars[0].path?.replace(/^\.\//, '');
if (grammarPath && !fs.existsSync(path.join(root, grammarPath))) {
  console.error(`Grammar file listed in package.json not found: ${grammarPath}`);
  process.exit(1);
}

console.log('Static analysis passed.');
