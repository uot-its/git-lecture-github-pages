import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist/assets', { recursive: true });
const html = readFileSync('index.html', 'utf8')
  .replace('./src/styles.css', './assets/styles.css')
  .replace('./src/main.ts', './assets/main.js');
writeFileSync('dist/index.html', html);
copyFileSync('src/styles.css', 'dist/assets/styles.css');
writeFileSync('dist/.nojekyll', '');
