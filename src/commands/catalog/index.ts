import type { CommandCategory, CommandRecipe } from '../model.js';
import { ghFoundationRecipes } from './gh-foundation.js';
import { ghOperationsRecipes } from './gh-operations.js';
import { gitCollaborationRecipes } from './git-collaboration.js';
import { gitFoundationRecipes } from './git-foundation.js';

export const commandCategories: readonly CommandCategory[] = [
  { id: 'git-setup', tool: 'git', label: '初期設定・取得', description: '作業者情報を設定し, repositoryを用意する.' },
  { id: 'git-inspect', tool: 'git', label: '状態・差分・履歴', description: '変更内容と履歴を安全に調べる.' },
  { id: 'git-record', tool: 'git', label: 'stage・commit', description: '次のcommitへ入れる変更を選び, 履歴へ記録する.' },
  { id: 'git-branch', tool: 'git', label: 'branch・tag', description: '作業の分岐とrelease地点を管理する.' },
  { id: 'git-remote', tool: 'git', label: 'remote・共有', description: 'remoteの更新を取得し, localの履歴を共有する.' },
  { id: 'git-integrate', tool: 'git', label: '統合・競合対応', description: 'branchやcommitを統合し, 競合を解消する.' },
  { id: 'git-stash', tool: 'git', label: 'stash', description: '未完了の変更を一時的に退避・復元する.' },
  { id: 'git-recover', tool: 'git', label: '取消・復旧・危険操作', description: '変更を取り消し, 失った参照を探し, 危険操作を安全に扱う.' },
  { id: 'gh-auth', tool: 'gh', label: '認証・初期設定', description: 'GitHub CLIを認証し, Gitとの接続を設定する.' },
  { id: 'gh-repo', tool: 'gh', label: 'repository', description: 'GitHub上のrepositoryを作成・取得・同期する.' },
  { id: 'gh-pr', tool: 'gh', label: 'Pull Request・review', description: 'Pull Requestの作成からreview・mergeまでを操作する.' },
  { id: 'gh-issue', tool: 'gh', label: 'Issue', description: 'Issueの登録・確認・更新を行う.' },
  { id: 'gh-actions', tool: 'gh', label: 'GitHub Actions', description: 'workflowとrunを確認・実行する.' },
  { id: 'gh-release', tool: 'gh', label: 'Release', description: 'releaseと配布assetを管理する.' },
  { id: 'gh-search', tool: 'gh', label: '横断検索', description: 'repository, PR, Issue, codeをGitHub全体から探す.' },
  { id: 'gh-api', tool: 'gh', label: 'API', description: '組み込みcommandにない情報を読み取りAPIで取得する.' }
];

export const commandRecipes: readonly CommandRecipe[] = [
  ...gitFoundationRecipes,
  ...gitCollaborationRecipes,
  ...ghFoundationRecipes,
  ...ghOperationsRecipes
];

export function validateCommandCatalog(recipes: readonly CommandRecipe[] = commandRecipes): void {
  const errors: string[] = [];
  const ids = new Set<string>();
  const commands = new Set<string>();
  const categoryIds = new Set(commandCategories.map((category) => category.id));

  if (recipes.length !== 100) errors.push(`件数が100ではありません: ${recipes.length}`);
  if (recipes.filter((recipe) => recipe.tool === 'git').length !== 50) errors.push('Gitが50件ではありません.');
  if (recipes.filter((recipe) => recipe.tool === 'gh').length !== 50) errors.push('ghが50件ではありません.');

  recipes.forEach((recipe, index) => {
    const expectedNumber = index + 1;
    if (recipe.number !== expectedNumber) errors.push(`${recipe.id}: numberは${expectedNumber}である必要があります.`);
    if (ids.has(recipe.id)) errors.push(`${recipe.id}: IDが重複しています.`);
    if (commands.has(recipe.command)) errors.push(`${recipe.id}: 実行例が重複しています.`);
    if (!categoryIds.has(recipe.category)) errors.push(`${recipe.id}: 未定義categoryです.`);
    if (recipe.options.length < 1 || recipe.options.length > 3) errors.push(`${recipe.id}: Optionは1〜3件必要です.`);
    if (!recipe.warning.trim()) errors.push(`${recipe.id}: 注意点が空です.`);
    if (recipe.risk === 'danger' && !recipe.warning.trim()) errors.push(`${recipe.id}: 危険操作には警告文が必要です.`);
    if (recipe.tool === 'git' && !recipe.docsUrl.startsWith('https://git-scm.com/docs/')) errors.push(`${recipe.id}: Git公式URLではありません.`);
    if (recipe.tool === 'gh' && !recipe.docsUrl.startsWith('https://cli.github.com/manual/')) errors.push(`${recipe.id}: gh公式URLではありません.`);
    const recipeText = [recipe.command, ...recipe.options.map((item) => item.syntax), recipe.warning].join(' ');
    if (/(?:^|\s)--force(?:[=\s]|$)/u.test(recipeText)) errors.push(`${recipe.id}: 通常の--forceは禁止です.`);
    ids.add(recipe.id);
    commands.add(recipe.command);
  });

  if (errors.length > 0) throw new Error(`Command catalog validation failed:\n${errors.join('\n')}`);
}
