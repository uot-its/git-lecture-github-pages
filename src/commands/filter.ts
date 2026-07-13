import type { CommandFilters, CommandRecipe } from './model.js';

export function normalizeSearchText(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ja').trim();
}

function searchableText(recipe: CommandRecipe): string {
  const optionText = recipe.options
    .flatMap((option) => [option.syntax, option.description])
    .join(' ');

  return normalizeSearchText([
    recipe.id,
    recipe.title,
    recipe.summary,
    recipe.usage,
    recipe.command,
    recipe.category,
    optionText,
    ...recipe.keywords
  ].join(' '));
}

export function matchesRecipe(recipe: CommandRecipe, filters: CommandFilters): boolean {
  if (filters.tool !== 'all' && recipe.tool !== filters.tool) return false;
  if (filters.category !== 'all' && recipe.category !== filters.category) return false;
  if (filters.risk !== 'all' && recipe.risk !== filters.risk) return false;

  const terms = normalizeSearchText(filters.query).split(/\s+/u).filter(Boolean);
  if (terms.length === 0) return true;

  const target = searchableText(recipe);
  return terms.every((term) => target.includes(term));
}

export function filterRecipes(
  recipes: readonly CommandRecipe[],
  filters: CommandFilters
): CommandRecipe[] {
  return recipes.filter((recipe) => matchesRecipe(recipe, filters));
}
