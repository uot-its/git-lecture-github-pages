import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  commandCategories,
  commandRecipes,
  validateCommandCatalog
} from '../../dist/assets/commands/catalog/index.js';
import {
  filterRecipes,
  normalizeSearchText
} from '../../dist/assets/commands/filter.js';

const allFilters = {
  query: '',
  tool: 'all',
  category: 'all',
  risk: 'all'
};

test('catalogはGit 50件とgh 50件の連番になっている', () => {
  assert.doesNotThrow(() => validateCommandCatalog());
  assert.equal(commandRecipes.length, 100);
  assert.equal(commandRecipes.filter(({ tool }) => tool === 'git').length, 50);
  assert.equal(commandRecipes.filter(({ tool }) => tool === 'gh').length, 50);
  assert.deepEqual(commandRecipes.map(({ number }) => number), Array.from({ length: 100 }, (_, index) => index + 1));
  assert.equal(new Set(commandRecipes.map(({ id }) => id)).size, 100);
  assert.equal(new Set(commandRecipes.map(({ command }) => command)).size, 100);
  assert.ok(commandRecipes.every(({ options }) => options.length >= 1 && options.length <= 3));
  assert.ok(commandRecipes.every(({ options }) => options.every(({ syntax, description }) => syntax.trim() && description.trim())));
  assert.ok(commandRecipes.every(({ warning }) => warning.trim()));
});

test('catalogは公式URLと危険操作の警告を持つ', () => {
  for (const recipe of commandRecipes) {
    const expectedPrefix = recipe.tool === 'git'
      ? 'https://git-scm.com/docs/'
      : 'https://cli.github.com/manual/';
    assert.ok(recipe.docsUrl.startsWith(expectedPrefix), recipe.id);
    if (recipe.risk === 'danger') assert.ok(recipe.warning.trim(), recipe.id);
    const recipeText = [recipe.command, ...recipe.options.map(({ syntax }) => syntax), recipe.warning].join(' ');
    assert.doesNotMatch(recipeText, /(?:^|\s)--force(?:[=\s]|$)/u, recipe.id);
  }
});

test('検索文字列をNFKCと小文字へ正規化する', () => {
  assert.equal(normalizeSearchText('  ＰＵＳＨ　共有  '), 'push 共有');
});

test('検索語とfilterをAND条件で適用し, 元の順序を維持する', () => {
  const ghOnly = filterRecipes(commandRecipes, { ...allFilters, tool: 'gh' });
  assert.equal(ghOnly.length, 50);
  assert.ok(ghOnly.every(({ tool }) => tool === 'gh'));

  const prOnly = filterRecipes(commandRecipes, { ...allFilters, tool: 'gh', category: 'gh-pr' });
  assert.ok(prOnly.length > 0);
  assert.ok(prOnly.every(({ category }) => category === 'gh-pr'));
  assert.deepEqual(prOnly.map(({ number }) => number), [...prOnly].map(({ number }) => number).sort((a, b) => a - b));

  const dangerousRecovery = filterRecipes(commandRecipes, {
    ...allFilters,
    tool: 'git',
    category: 'git-recover',
    risk: 'danger'
  });
  assert.ok(dangerousRecovery.length > 0);
  assert.ok(dangerousRecovery.every(({ tool, category, risk }) => (
    tool === 'git' && category === 'git-recover' && risk === 'danger'
  )));
  assert.deepEqual(
    dangerousRecovery.map(({ number }) => number),
    commandRecipes
      .filter(({ tool, category, risk }) => tool === 'git' && category === 'git-recover' && risk === 'danger')
      .map(({ number }) => number)
  );

  const forceWithLease = filterRecipes(commandRecipes, { ...allFilters, query: '--force-with-lease' });
  assert.deepEqual(forceWithLease.map(({ number }) => number), [50]);

  const multipleTerms = filterRecipes(commandRecipes, { ...allFilters, query: 'lease 履歴' });
  assert.deepEqual(multipleTerms.map(({ number }) => number), [50]);
  assert.equal(filterRecipes(commandRecipes, { ...allFilters, query: 'lease issue' }).length, 0);

  const noMatch = filterRecipes(commandRecipes, { ...allFilters, query: '存在しない検索語 xyz-404' });
  assert.equal(noMatch.length, 0);
});

test('category定義は全recipeから参照される', () => {
  const categoryIds = new Set(commandCategories.map(({ id }) => id));
  assert.ok(commandRecipes.every(({ category }) => categoryIds.has(category)));
  assert.ok(commandCategories.every(({ id }) => commandRecipes.some(({ category }) => category === id)));
});

test('build成果物は複数ページの配信用参照を持つ', async () => {
  const [indexHtml, commandsHtml, sharedStyles, commandsStyles, mainJavaScript, commandsJavaScript] = await Promise.all([
    readFile('dist/index.html', 'utf8'),
    readFile('dist/commands.html', 'utf8'),
    readFile('dist/assets/styles.css', 'utf8'),
    readFile('dist/assets/commands/styles.css', 'utf8'),
    readFile('dist/assets/main.js', 'utf8'),
    readFile('dist/assets/commands/main.js', 'utf8')
  ]);
  assert.doesNotMatch(indexHtml, /\.\/src\//u);
  assert.doesNotMatch(commandsHtml, /\.\/src\//u);
  assert.match(mainJavaScript, /\.\/commands\.html/u);
  assert.match(commandsJavaScript, /\.\/index\.html#commands/u);
  assert.match(commandsHtml, /\.\/assets\/commands\/main\.js/u);
  assert.match(commandsHtml, /\.\/assets\/commands\/styles\.css/u);
  assert.ok(sharedStyles.length > 0);
  assert.ok(commandsStyles.length > 0);
});
