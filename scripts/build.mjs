import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const pages = [
  {
    source: 'index.html',
    output: 'dist/index.html',
    replacements: [
      ['./src/styles.css', './assets/styles.css'],
      ['./src/main.ts', './assets/main.js']
    ]
  },
  {
    source: 'commands.html',
    output: 'dist/commands.html',
    replacements: [
      ['./src/styles.css', './assets/styles.css'],
      ['./src/commands/styles.css', './assets/commands/styles.css'],
      ['./src/commands/main.ts', './assets/commands/main.js']
    ]
  }
];

const stylesheets = [
  ['src/styles.css', 'dist/assets/styles.css'],
  ['src/commands/styles.css', 'dist/assets/commands/styles.css']
];

for (const page of pages) {
  let html = readFileSync(page.source, 'utf8');
  for (const [sourcePath, outputPath] of page.replacements) {
    if (!html.includes(sourcePath)) {
      throw new Error(`${page.source}: required reference not found: ${sourcePath}`);
    }
    html = html.replace(sourcePath, outputPath);
  }
  if (html.includes('./src/')) {
    throw new Error(`${page.source}: source reference remains after build.`);
  }
  mkdirSync(dirname(page.output), { recursive: true });
  writeFileSync(page.output, html);
}

for (const [sourcePath, outputPath] of stylesheets) {
  mkdirSync(dirname(outputPath), { recursive: true });
  copyFileSync(sourcePath, outputPath);
}

writeFileSync('dist/.nojekyll', '');
