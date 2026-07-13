import { commandCategories, commandRecipes, validateCommandCatalog } from './catalog/index.js';
import { filterRecipes } from './filter.js';
import type { CommandCategory, CommandFilters, CommandRecipe, CommandTool, RiskLevel } from './model.js';

const riskLabels: Record<RiskLevel, string> = {
  safe: '安全',
  caution: '注意',
  danger: '危険'
};

const toolLabels: Record<CommandTool, string> = {
  git: 'Git',
  gh: 'GitHub CLI'
};

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  children: Array<Node | string> = []
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

function firstCommandLine(command: string): string {
  return command.split('\n')[0] ?? command;
}

function renderCodeBlock(recipe: CommandRecipe): HTMLElement {
  return el('div', { class: 'code-shell' }, [
    el('div', { class: 'code-head' }, [
      el('span', { class: 'dot red', 'aria-hidden': 'true' }),
      el('span', { class: 'dot yellow', 'aria-hidden': 'true' }),
      el('span', { class: 'dot green', 'aria-hidden': 'true' }),
      el('span', { class: 'code-title' }, [recipe.tool]),
      el('button', {
        class: 'copy copy-button',
        type: 'button',
        'data-copy-command': recipe.command,
        'aria-label': `${recipe.title}のコマンドをコピー`
      }, ['copy'])
    ]),
    el('pre', {}, [el('code', {}, [recipe.command])])
  ]);
}

function renderRecipe(recipe: CommandRecipe): HTMLDetailsElement {
  const summary = el('summary', { class: 'recipe-summary' }, [
    el('span', { class: 'recipe-number' }, [String(recipe.number).padStart(3, '0')]),
    el('code', { class: 'recipe-command' }, [firstCommandLine(recipe.command)]),
    el('span', { class: 'recipe-summary-text' }, [
      el('strong', {}, [recipe.title]),
      ` — ${recipe.summary}`
    ]),
    el('span', { class: `risk-badge risk-${recipe.risk}` }, [riskLabels[recipe.risk]])
  ]);

  const options = el('dl', { class: 'option-list' });
  for (const option of recipe.options) {
    options.append(
      el('dt', { class: 'option-term' }, [el('code', {}, [option.syntax])]),
      el('dd', { class: 'option-description' }, [option.description])
    );
  }

  const detailChildren: Node[] = [
    el('p', { class: 'recipe-usage' }, [recipe.usage]),
    renderCodeBlock(recipe),
    el('h3', {}, ['主要Option']),
    options
  ];

  detailChildren.push(el('p', { class: `recipe-warning warning-${recipe.risk}` }, [
    el('strong', {}, [`${riskLabels[recipe.risk]}: `]),
    recipe.warning
  ]));

  detailChildren.push(el('a', {
    class: 'official-link',
    href: recipe.docsUrl,
    target: '_blank',
    rel: 'noreferrer'
  }, ['公式リファレンスを開く']));

  return el('details', {
    class: 'command-recipe',
    id: recipe.id,
    'data-recipe-id': recipe.id,
    'data-category': recipe.category
  }, [summary, el('div', { class: 'recipe-content' }, detailChildren)]);
}

function renderCategory(category: CommandCategory): HTMLElement {
  const recipes = commandRecipes.filter((recipe) => recipe.category === category.id);
  return el('section', {
    class: 'command-category',
    id: category.id,
    'data-category-section': category.id
  }, [
    el('div', { class: 'category-heading' }, [
      el('span', { class: 'badge' }, [toolLabels[category.tool]]),
      el('h2', {}, [category.label])
    ]),
    el('p', { class: 'category-description' }, [category.description]),
    ...recipes.map(renderRecipe)
  ]);
}

function renderHero(): HTMLElement {
  return el('header', { class: 'commands-hero', id: 'top' }, [
    el('div', { class: 'commands-hero-copy' }, [
      el('p', { class: 'eyebrow' }, ['GIT / GITHUB CLI // FIELD GUIDE']),
      el('h1', {
        class: 'glitch',
        'data-text': 'コマンド100選',
        'aria-label': 'コマンド100選'
      }, ['コマンド100選']),
      el('p', { class: 'hero-lead' }, [
        'Git 50件とGitHub CLI 50件を, 作業の流れに沿って引ける実践リファレンス. Optionの意味と危険度を確認してからコピーできる.'
      ]),
      el('div', { class: 'hero-actions' }, [
        el('a', { class: 'neon-button', href: '#catalog' }, ['100選を探す']),
        el('a', { class: 'ghost-button', href: './index.html#commands' }, ['基本10件へ戻る'])
      ])
    ]),
    el('div', { class: 'commands-stats', 'aria-label': '収録件数' }, [
      el('div', {}, [el('strong', {}, ['50']), el('span', {}, ['Git recipes'])]),
      el('div', {}, [el('strong', {}, ['50']), el('span', {}, ['gh recipes'])]),
      el('div', {}, [el('strong', {}, ['100']), el('span', {}, ['total'])])
    ])
  ]);
}

function renderIntro(): HTMLElement {
  const categoryNav = el('nav', { class: 'commands-category-nav', 'aria-label': 'カテゴリへ移動' },
    commandCategories.map((category) => el('a', { class: 'category-link', href: `#${category.id}` }, [
      `${category.tool === 'git' ? 'git' : 'gh'} / ${category.label}`
    ]))
  );

  return el('section', { class: 'panel commands-intro-panel', 'aria-labelledby': 'guide-title' }, [
    el('p', { class: 'section-kicker' }, ['GUIDE // BEFORE COPY']),
    el('h2', { id: 'guide-title' }, ['このページの読み方']),
    el('div', { class: 'commands-intro-grid term-grid' }, [
      el('article', { class: 'term-card' }, [
        el('h3', {}, ['Gitとghを分ける']),
        el('p', {}, [
          el('code', {}, ['git']),
          'は履歴管理, ',
          el('code', {}, ['gh']),
          'はPull RequestやIssueなどGitHub上の操作を行うCLI. ',
          el('code', {}, ['gh']),
          'は別途installと認証が必要.'
        ])
      ]),
      el('article', { class: 'term-card' }, [
        el('h3', {}, ['プレースホルダーを置換する']),
        el('p', {}, [
          el('code', {}, ['OWNER/REPO']),
          ', branch名, file名, ',
          el('code', {}, ['<sha>']),
          'は実際の値へ置き換える. 実行前に対象repositoryと現在branchを確認する.'
        ])
      ]),
      el('article', { class: 'term-card' }, [
        el('h3', {}, ['shellの違いに注意する']),
        el('p', {}, ['例はPOSIX shell基準. PowerShellでは引用符や特殊文字の扱いが異なるため, API例などは環境に合わせて調整する.'])
      ])
    ]),
    el('p', { class: 'verified-date' }, ['公式マニュアル確認日: 2026-07-13']),
    categoryNav
  ]);
}

function option(value: string, label: string): HTMLOptionElement {
  return el('option', { value }, [label]);
}

function renderCatalog(): HTMLElement {
  const search = el('input', {
    id: 'catalog-search',
    type: 'search',
    placeholder: '例: push 共有, --draft, 競合',
    autocomplete: 'off'
  });

  const toolSelect = el('select', { id: 'tool-filter' }, [
    option('all', 'すべて'),
    option('git', 'Git'),
    option('gh', 'GitHub CLI')
  ]);

  const categorySelect = el('select', { id: 'category-filter' }, [
    option('all', 'すべてのカテゴリ'),
    ...commandCategories.map((category) => {
      const item = option(category.id, `${toolLabels[category.tool]} / ${category.label}`);
      item.dataset.tool = category.tool;
      return item;
    })
  ]);

  const riskSelect = el('select', { id: 'risk-filter' }, [
    option('all', 'すべて'),
    option('safe', '安全'),
    option('caution', '注意'),
    option('danger', '危険')
  ]);

  const reset = el('button', { class: 'filter-reset reset-filters', type: 'button', id: 'reset-filters' }, ['条件をリセット']);
  const resultCount = el('p', { class: 'result-count', id: 'result-count', 'aria-live': 'polite' }, ['100 / 100件']);
  const copyStatus = el('p', { class: 'copy-status', id: 'copy-status', 'aria-live': 'polite', 'aria-atomic': 'true' });

  return el('section', { class: 'catalog-shell', id: 'catalog', 'aria-labelledby': 'catalog-title' }, [
    el('div', { class: 'catalog-toolbar panel' }, [
      el('p', { class: 'section-kicker' }, ['SEARCH // FILTER']),
      el('h2', { id: 'catalog-title' }, ['用途からコマンドを探す']),
      el('div', { class: 'command-filters' }, [
        el('label', { class: 'filter-field filter-search', for: 'catalog-search' }, [
          el('span', { class: 'filter-label' }, ['検索']),
          search
        ]),
        el('label', { class: 'filter-field', for: 'tool-filter' }, [
          el('span', { class: 'filter-label' }, ['CLI']),
          toolSelect
        ]),
        el('label', { class: 'filter-field', for: 'category-filter' }, [
          el('span', { class: 'filter-label' }, ['カテゴリ']),
          categorySelect
        ]),
        el('label', { class: 'filter-field', for: 'risk-filter' }, [
          el('span', { class: 'filter-label' }, ['安全度']),
          riskSelect
        ])
      ]),
      el('div', { class: 'filter-actions' }, [resultCount, reset]),
      copyStatus
    ]),
    el('div', { class: 'catalog-content command-list' }, commandCategories.map(renderCategory)),
    el('div', { class: 'panel no-results', id: 'no-results', hidden: '' }, [
      el('h2', {}, ['該当するコマンドがありません']),
      el('p', {}, ['検索語を減らすか, filterをリセットしてください.'])
    ])
  ]);
}

function isToolFilter(value: string): value is CommandTool | 'all' {
  return value === 'all' || value === 'git' || value === 'gh';
}

function isRiskFilter(value: string): value is RiskLevel | 'all' {
  return value === 'all' || value === 'safe' || value === 'caution' || value === 'danger';
}

function setupInteractions(): void {
  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  const tool = document.querySelector<HTMLSelectElement>('#tool-filter');
  const category = document.querySelector<HTMLSelectElement>('#category-filter');
  const risk = document.querySelector<HTMLSelectElement>('#risk-filter');
  const resultCount = document.querySelector<HTMLElement>('#result-count');
  const noResults = document.querySelector<HTMLElement>('#no-results');
  const reset = document.querySelector<HTMLButtonElement>('#reset-filters');
  const copyStatus = document.querySelector<HTMLElement>('#copy-status');

  if (!search || !tool || !category || !risk || !resultCount || !noResults || !reset || !copyStatus) {
    throw new Error('Command filter controls are missing.');
  }

  const applyFilters = (): void => {
    const toolValue = isToolFilter(tool.value) ? tool.value : 'all';
    const riskValue = isRiskFilter(risk.value) ? risk.value : 'all';
    const validCategoryIds = new Set(commandCategories.map((item) => item.id));
    const categoryValue = category.value === 'all' || validCategoryIds.has(category.value) ? category.value : 'all';
    const filters: CommandFilters = {
      query: search.value,
      tool: toolValue,
      category: categoryValue,
      risk: riskValue
    };
    const matched = filterRecipes(commandRecipes, filters);
    const matchedIds = new Set(matched.map((recipe) => recipe.id));

    document.querySelectorAll<HTMLElement>('[data-recipe-id]').forEach((node) => {
      node.hidden = !matchedIds.has(node.dataset.recipeId ?? '');
    });
    document.querySelectorAll<HTMLElement>('[data-category-section]').forEach((section) => {
      const categoryId = section.dataset.categorySection ?? '';
      section.hidden = !matched.some((recipe) => recipe.category === categoryId);
    });

    resultCount.textContent = `${matched.length} / ${commandRecipes.length}件`;
    noResults.hidden = matched.length !== 0;
  };

  const syncCategoryOptions = (): void => {
    const toolValue = isToolFilter(tool.value) ? tool.value : 'all';
    Array.from(category.options).forEach((item) => {
      if (item.value === 'all') return;
      const isAvailable = toolValue === 'all' || item.dataset.tool === toolValue;
      item.disabled = !isAvailable;
      item.hidden = !isAvailable;
    });
    const selected = category.selectedOptions[0];
    if (selected?.disabled) category.value = 'all';
  };

  search.addEventListener('input', applyFilters);
  tool.addEventListener('change', () => {
    syncCategoryOptions();
    applyFilters();
  });
  category.addEventListener('change', applyFilters);
  risk.addEventListener('change', applyFilters);
  reset.addEventListener('click', () => {
    search.value = '';
    tool.value = 'all';
    category.value = 'all';
    risk.value = 'all';
    syncCategoryOptions();
    applyFilters();
    search.focus();
  });

  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest<HTMLButtonElement>('[data-copy-command]');
    if (!button) return;

    const command = button.dataset.copyCommand ?? '';
    try {
      await navigator.clipboard.writeText(command);
      button.textContent = 'copied';
      copyStatus.className = 'copy-status copy-status-success';
      copyStatus.textContent = 'コマンドをコピーしました.';
    } catch {
      button.textContent = 'failed';
      copyStatus.className = 'copy-status copy-status-error';
      copyStatus.textContent = 'コピーできませんでした. コマンドを選択してコピーしてください.';
    }
    window.setTimeout(() => {
      button.textContent = 'copy';
    }, 1200);
  });

  applyFilters();
}

function renderApp(): void {
  validateCommandCatalog();
  const app = document.getElementById('commands-app');
  if (!app) throw new Error('Missing #commands-app');

  app.append(el('div', { class: 'commands-shell page-shell' }, [
    renderHero(),
    renderIntro(),
    renderCatalog(),
    el('footer', { class: 'commands-footer' }, [
      el('a', { class: 'ghost-button', href: './index.html#commands' }, ['GitHub研修へ戻る'])
    ])
  ]));
  setupInteractions();
}

renderApp();
