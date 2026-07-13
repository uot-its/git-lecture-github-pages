"use strict";
const commands = [
    {
        group: '取得',
        name: 'clone',
        use: 'GitHub上のリポジトリを手元にコピーする.',
        code: 'git clone git@github.com:ORG/REPO.git'
    },
    {
        group: '確認',
        name: 'status',
        use: '作業前, 作業中, 作業後に現在状態を見る.',
        code: 'git status'
    },
    {
        group: '確認',
        name: 'diff',
        use: 'まだaddしていない変更の差分を見る.',
        code: 'git diff'
    },
    {
        group: '記録',
        name: 'add',
        use: '次のcommitに入れる変更を選ぶ.',
        code: 'git add README.md'
    },
    {
        group: '記録',
        name: 'commit',
        use: '意味のある単位で変更を記録する.',
        code: 'git commit -m "docs: update README"'
    },
    {
        group: '共有',
        name: 'push',
        use: '手元のcommitをGitHubへ送る.',
        code: 'git push -u origin feature/add-profile'
    },
    {
        group: '更新',
        name: 'pull --ff-only',
        use: '現在ブランチをリモートの最新版へ安全に進める.',
        code: 'git pull --ff-only'
    },
    {
        group: 'ブランチ',
        name: 'switch',
        use: 'ブランチを切り替える. `-c`で新規作成する.',
        code: 'git switch -c feature/add-login-button'
    },
    {
        group: '退避',
        name: 'stash',
        use: '途中の変更を一時退避する.',
        code: 'git stash push -m "before fixing conflict"'
    },
    {
        group: '復旧',
        name: 'restore',
        use: '作業ツリーの変更を取り消す.',
        code: 'git restore path/to/file'
    }
];
const flowSteps = [
    {
        id: '01',
        title: 'mainを最新にする',
        summary: '本流の最新版から始める.',
        detail: 'git switch main と git pull --ff-only で, 自分の開始地点を揃える.'
    },
    {
        id: '02',
        title: 'ブランチを作る',
        summary: '作業部屋を分ける.',
        detail: 'feature, fix, docsなどの接頭辞を使い, 作業内容が分かる名前にする.'
    },
    {
        id: '03',
        title: '小さくcommitする',
        summary: '1 commit 1意図.',
        detail: 'あとから読んだ時に理由が分かる粒度で履歴を残す.'
    },
    {
        id: '04',
        title: 'pushする',
        summary: 'GitHubへ共有する.',
        detail: '最初のpushでは -u origin ブランチ名 を付けると以後が楽になる.'
    },
    {
        id: '05',
        title: 'Pull Requestを出す',
        summary: '本流へ入れてよいか相談する.',
        detail: '背景, 変更内容, 確認方法, 見てほしい点を書く.'
    },
    {
        id: '06',
        title: 'Review後にmergeする',
        summary: '合意してから本流へ入れる.',
        detail: 'approve, checks成功, conflictなしを確認してmergeする.'
    }
];
const rules = [
    {
        level: 'critical',
        title: 'main直push禁止',
        body: '本流はPull Request経由で守る. 直接pushできる設定でも, 原則として使わない.'
    },
    {
        level: 'critical',
        title: 'secretをcommitしない',
        body: 'API key, token, password, private keyを入れない. 入れた場合は削除ではなく無効化も必要.'
    },
    {
        level: 'critical',
        title: '共有履歴を書き換えない',
        body: 'force pushやresetは他人の作業を壊すことがある. 個人ブランチ以外では相談する.'
    },
    {
        level: 'safe',
        title: 'PRは小さく出す',
        body: 'レビュー可能な単位にする. 大きなPRはバグも議論も混ざる.'
    },
    {
        level: 'safe',
        title: '出す前に自分で差分を読む',
        body: 'Files changedを見て, 不要な差分, debug print, 余計な整形変更を消す.'
    },
    {
        level: 'culture',
        title: 'レビューは具体的に書く',
        body: '事実, 理由, 提案を分ける. 人格ではなくコードを見る.'
    }
];
const exercises = [
    {
        title: '演習1, cloneしてcommitする',
        goal: '研修用リポジトリを手元にコピーし, 自分のプロフィールを追加する.',
        steps: [
            'git cloneで取得する.',
            'feature/add-your-profileブランチを作る.',
            'profiles/your-name.mdを追加する.',
            'git add, git commit, git pushを行う.'
        ],
        done: 'GitHub上に自分のブランチが存在し, commitが見える.'
    },
    {
        title: '演習2, Pull Requestを作る',
        goal: '変更内容を説明し, レビュー可能な状態にする.',
        steps: [
            'baseがmainであることを確認する.',
            'compareが自分のfeatureブランチであることを確認する.',
            '概要, 変更内容, 確認方法を書く.',
            'Files changedを自分で読む.'
        ],
        done: 'レビュアーがPRの目的と確認方法を理解できる.'
    },
    {
        title: '演習3, ペアレビュー',
        goal: 'レビューを出す側と受ける側を両方体験する.',
        steps: [
            '1つ以上質問する.',
            '1つ以上良い点を書く.',
            '改善提案は理由付きで書く.',
            '作成者は返信し, 必要なら修正commitを積む.'
        ],
        done: 'approveまたはrequest changesまで到達する.'
    },
    {
        title: '演習4, コンフリクトを直す',
        goal: '同じ行を別々に変更し, conflict markerを読んで解消する.',
        steps: [
            '2人が同じファイルの同じ行を変更する.',
            '片方を先にmergeする.',
            'もう片方でconflictを発生させる.',
            'markerを消し, 意図した内容へ編集してcommitする.'
        ],
        done: 'conflictが消え, PRがmerge可能になる.'
    }
];
const quiz = [
    {
        question: 'GitとGitHubの関係として正しいものはどれか.',
        choices: [
            'GitはGitHubの別名である.',
            'Gitは履歴管理の道具で, GitHubはそれを使った共同開発の場所である.',
            'GitHubがないとGitは使えない.'
        ],
        answer: 1,
        explain: 'Gitはローカルでも使える. GitHubはリモート共有, PR, Reviewなどを提供するサービス.'
    },
    {
        question: '作業を始める前に最初に確認すべきコマンドはどれか.',
        choices: ['git status', 'git push --force', 'git reset --hard'],
        answer: 0,
        explain: 'まず現在ブランチと変更状態を確認する. 危険コマンドを先に打たない.'
    },
    {
        question: 'Pull Requestの主目的はどれか.',
        choices: [
            '変更を本流へ入れてよいか相談する.',
            'コードを暗号化する.',
            'ローカルのファイルを全部削除する.'
        ],
        answer: 0,
        explain: 'PRは変更内容, 背景, テスト結果, 議論をまとめる場所.'
    },
    {
        question: 'secretをcommitした場合の初動として不十分なものはどれか.',
        choices: [
            'チームへ共有する.',
            '該当keyやtokenを無効化する.',
            'ファイルから消して追加commitすれば完全に解決と考える.'
        ],
        answer: 2,
        explain: '履歴に残るため, 単に削除commitするだけでは不十分. 無効化と履歴対応が必要.'
    }
];
const templates = {
    pr: `## 概要\n何を変えたかを1から3行で書く.\n\n## 背景\nなぜ必要か. 関連Issueや仕様へのリンク.\n\n## 変更内容\n- 主な変更点\n- 影響範囲\n\n## 確認方法\n- npm test\n- 手動確認手順\n\n## レビューしてほしい点\n不安な箇所や設計判断.`,
    issue: `## 概要\n何をしたいか. 何が困っているか.\n\n## 背景\nなぜ必要か. 誰が困るか.\n\n## 完了条件\n- 条件1\n- 条件2\n\n## 参考\n関連資料, Slack, 仕様書など.`
};
const checklist = [
    '作業前に現在ブランチとgit statusを確認できる.',
    'mainからfeatureブランチを作って作業できる.',
    '意味のある単位でcommitできる.',
    'pushしてPull Requestを作れる.',
    'PR本文に背景, 変更内容, 確認方法を書ける.',
    'レビューコメントに返信し, 修正commitを積める.',
    'コンフリクトマーカーを読んで解消できる.',
    '危険コマンドを打つ前に相談できる.'
];
const aiReviewTools = [
    {
        name: 'Gemini Code Assist',
        summary: 'GitHubのPull Request上で, 差分の要約やコードレビューコメントを返すAIレビュアー.',
        points: [
            'PR作成時に初回レビューを行う.',
            '重要度付きの指摘や修正提案を出す.',
            '/gemini reviewなどのコメントで追加レビューを依頼できる.'
        ],
        link: 'https://docs.cloud.google.com/gemini/docs/code-review/use-code-assist-github'
    },
    {
        name: 'CodeRabbit',
        summary: 'Pull Requestを自動解析し, バグ候補, セキュリティ, 品質, 改善提案をコメントするAIコードレビューサービス.',
        points: [
            '新規PRと追加commitを自動でレビューする.',
            '変更要約, 改善提案, one-click fixを提示する.',
            '@coderabbitaiへのメンションで質問やレビュー制御ができる.'
        ],
        link: 'https://docs.coderabbit.ai/guides/code-review-overview'
    },
    {
        name: '使い方の前提',
        summary: 'AIレビューは最初の見落とし防止に強いが, 最終判断は人間のレビュアーが行う.',
        points: [
            '設計意図, 仕様背景, チーム方針はPR本文に書く.',
            'AI指摘は根拠を確認してから反映する.',
            '機密情報や不要な内部情報をPRに含めない.'
        ],
        link: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews'
    }
];
function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (key === 'class')
            node.className = value;
        else if (key.startsWith('data-'))
            node.setAttribute(key, value);
        else
            node.setAttribute(key, value);
    }
    for (const child of children) {
        node.append(child instanceof Node ? child : document.createTextNode(child));
    }
    return node;
}
function codeBlock(code) {
    const wrapper = el('div', { class: 'code-shell' });
    const header = el('div', { class: 'code-head' }, [
        el('span', { class: 'dot red' }),
        el('span', { class: 'dot yellow' }),
        el('span', { class: 'dot green' }),
        el('span', { class: 'code-title' }, ['terminal']),
        el('button', { class: 'copy', type: 'button', 'data-code': code }, ['copy'])
    ]);
    const pre = el('pre', {}, [el('code', {}, [code])]);
    wrapper.append(header, pre);
    return wrapper;
}
function section(id, label, title, body, children = []) {
    const sec = el('section', { class: 'panel', id, 'data-title': title });
    const marker = el('p', { class: 'section-kicker' }, [`${label} // ${id}`]);
    const heading = el('h2', {}, [title]);
    const intro = el('p', { class: 'lead' }, [body]);
    sec.append(marker, heading, intro, ...children);
    return sec;
}
function renderHero() {
    const hero = el('header', { class: 'hero', id: 'top' });
    const left = el('div', { class: 'hero-copy' });
    left.append(el('p', { class: 'eyebrow' }, ['NEW ENGINEER TRAINING // GITHUB']), el('h1', { class: 'glitch', 'data-text': 'GitHub研修' }, ['GitHub研修']), el('p', { class: 'hero-lead' }, ['GitHubを知らない状態から, 安全にチーム開発へ参加できる状態まで進む. コマンド暗記ではなく, 変更を小さくし, 意図を残し, PRで合意する型を身につける.']), el('div', { class: 'hero-actions' }, [
        el('a', { class: 'neon-button', href: '#flow' }, ['GitHub Flowを見る']),
        el('a', { class: 'ghost-button', href: '#commands' }, ['コマンド表へ'])
    ]));
    const terminal = codeBlock('$ git status\n$ git switch -c feature/first-pr\n$ git add README.md\n$ git commit -m "docs: add profile"\n$ git push -u origin feature/first-pr');
    terminal.classList.add('hero-terminal');
    hero.append(left, terminal);
    return hero;
}
function renderConcept() {
    const cards = el('div', { class: 'dual-grid' }, [
        el('article', { class: 'concept-card git' }, [
            el('span', { class: 'tag' }, ['Git']),
            el('h3', {}, ['履歴管理の道具']),
            el('p', {}, ['ファイルの変更を, 誰が, いつ, なぜ行ったか追跡する. 手元のPCだけでも動く.']),
            codeBlock('git status\ngit add README.md\ngit commit -m "docs: update README"')
        ]),
        el('article', { class: 'concept-card hub' }, [
            el('span', { class: 'tag' }, ['GitHub']),
            el('h3', {}, ['共同開発の場所']),
            el('p', {}, ['リポジトリ共有, Pull Request, Review, Issue, CIなどで開発プロセスを管理する.']),
            codeBlock('git push origin feature/task\n# GitHub上でPull Requestを作成')
        ])
    ]);
    return section('concept', 'CORE', 'GitとGitHubは別物', 'Gitは道具. GitHubは道具を使った共同作業の場所.', [cards]);
}
function renderVocabulary() {
    const terms = [
        ['Repository', 'プロジェクトのファイルと履歴のまとまり.'],
        ['Commit', '変更のセーブポイント.'],
        ['Branch', '本流を壊さず作業する分岐.'],
        ['Remote', 'GitHub上のリポジトリ.'],
        ['Pull Request', '変更を本流に入れてよいか相談する申請.'],
        ['Review', '変更を読み, 質問し, 改善する場.']
    ];
    const grid = el('div', { class: 'term-grid' }, terms.map(([title, body], index) => {
        return el('article', { class: 'term-card', 'data-index': String(index + 1) }, [
            el('h3', {}, [title]),
            el('p', {}, [body])
        ]);
    }));
    return section('vocabulary', 'WORDS', '最初に覚える用語', 'GitHubの画面とコマンドを読むための最低限の語彙.', [grid]);
}
function renderThreeStates() {
    const states = [
        ['Working Tree', '実際に編集しているファイル.', 'git status\ngit diff'],
        ['Staging Area', '次のcommitに入れる変更の置き場.', 'git add README.md'],
        ['Local Repository', 'commitとして保存された履歴.', 'git commit -m "docs: update"']
    ];
    const rail = el('div', { class: 'state-rail' }, states.map(([name, body, code], index) => {
        const card = el('article', { class: 'state-card' }, [
            el('span', { class: 'state-number' }, [`0${index + 1}`]),
            el('h3', {}, [name]),
            el('p', {}, [body]),
            codeBlock(code)
        ]);
        return card;
    }));
    return section('states', 'MODEL', 'Gitの3つの場所', '`status`, `add`, `commit`は, 3場所の移動として理解する.', [rail]);
}
function renderFlow() {
    const timeline = el('div', { class: 'flow-timeline' }, flowSteps.map((step) => {
        return el('article', { class: 'flow-step' }, [
            el('span', { class: 'flow-id' }, [step.id]),
            el('h3', {}, [step.title]),
            el('strong', {}, [step.summary]),
            el('p', {}, [step.detail])
        ]);
    }));
    const command = codeBlock('git switch main\ngit pull --ff-only\ngit switch -c feature/task-name\n# edit files\ngit add .\ngit commit -m "feat: add task"\ngit push -u origin feature/task-name');
    return section('flow', 'FLOW', 'GitHub Flow', '新人が最初に覚える標準ルート. branch, commit, push, PR, review, mergeの順で進める.', [timeline, command]);
}
function renderCommands() {
    const search = el('input', { class: 'search', id: 'command-search', type: 'search', placeholder: 'コマンドや用途で検索, 例: push, 退避, 確認' });
    const grid = el('div', { class: 'command-grid', id: 'command-grid' }, commands.map((command) => {
        return el('article', { class: 'command-card', 'data-search': `${command.name} ${command.group} ${command.use}` }, [
            el('div', { class: 'command-meta' }, [
                el('span', { class: 'badge' }, [command.group]),
                el('span', { class: 'command-name' }, [`git ${command.name}`])
            ]),
            el('p', {}, [command.use]),
            codeBlock(command.code)
        ]);
    }));
    return section('commands', 'CLI', '最低限覚えるコマンド', '迷ったら最初に `git status`. コマンドは場面とセットで覚える.', [search, grid]);
}
function renderPrReview() {
    const pr = el('article', { class: 'template-card' }, [
        el('h3', {}, ['Pull Requestテンプレート']),
        codeBlock(templates.pr)
    ]);
    const issue = el('article', { class: 'template-card' }, [
        el('h3', {}, ['Issueテンプレート']),
        codeBlock(templates.issue)
    ]);
    const review = el('div', { class: 'review-grid' }, [
        el('article', { class: 'review-card good' }, [
            el('h3', {}, ['レビューする側']),
            el('ul', {}, [
                el('li', {}, ['事実と理由を書く.']),
                el('li', {}, ['必須指摘と任意提案を分ける.']),
                el('li', {}, ['良い点も明示する.'])
            ])
        ]),
        el('article', { class: 'review-card receive' }, [
            el('h3', {}, ['レビューを受ける側']),
            el('ul', {}, [
                el('li', {}, ['指摘を攻撃と受け取らない.']),
                el('li', {}, ['修正したら返信する.']),
                el('li', {}, ['反映しない時も理由を書く.'])
            ])
        ])
    ]);
    const aiReview = el('div', { class: 'ai-review-grid' }, aiReviewTools.map((tool) => {
        return el('article', { class: 'ai-review-card' }, [
            el('h3', {}, [tool.name]),
            el('p', {}, [tool.summary]),
            el('ul', {}, tool.points.map((point) => el('li', {}, [point]))),
            el('a', { href: tool.link, target: '_blank', rel: 'noreferrer' }, ['公式資料を見る'])
        ]);
    }));
    return section('pr-review', 'PR', 'Pull RequestとReviewの作法', 'PRは「できました」ではなく, 「この変更を入れてよいですか」の相談.', [
        review,
        aiReview,
        el('div', { class: 'template-grid' }, [pr, issue])
    ]);
}
function renderRules() {
    const grid = el('div', { class: 'rules-grid' }, rules.map((rule) => {
        return el('article', { class: `rule-card ${rule.level}` }, [
            el('span', { class: 'rule-level' }, [rule.level.toUpperCase()]),
            el('h3', {}, [rule.title]),
            el('p', {}, [rule.body])
        ]);
    }));
    return section('rules', 'RULES', '作法と不文律', '明文化されていなくても, チーム開発の事故を避けるために守る基準.', [grid]);
}
function renderEmergency() {
    const steps = [
        ['01', '作業を止める', '慌ててpushやresetを追加しない.'],
        ['02', '状態を見る', 'git status, 現在ブランチ, 直近logを確認する.'],
        ['03', '退避する', '必要ならstashで作業中差分を保存する.'],
        ['04', '共有する', '何をしたか, 何が起きたかをチームへ説明する.'],
        ['05', '一緒に直す', '危険コマンドは相談後に実行する.']
    ];
    const list = el('div', { class: 'emergency-list' }, steps.map(([num, title, body]) => {
        return el('article', { class: 'emergency-step' }, [
            el('span', {}, [num]),
            el('div', {}, [el('h3', {}, [title]), el('p', {}, [body])])
        ]);
    }));
    const command = codeBlock('git status\ngit branch --show-current\ngit log --oneline --graph -5\ngit stash push -m "before fixing mistake"');
    return section('emergency', 'ALERT', '事故った時の初動', '黙って直そうとすると被害が広がる. 状態を保存し, 事実を共有する.', [el('div', { class: 'split' }, [list, command])]);
}
function renderExercises() {
    const grid = el('div', { class: 'exercise-grid' }, exercises.map((exercise, index) => {
        return el('article', { class: 'exercise-card' }, [
            el('span', { class: 'exercise-number' }, [`0${index + 1}`]),
            el('h3', {}, [exercise.title]),
            el('p', { class: 'goal' }, [exercise.goal]),
            el('ol', {}, exercise.steps.map((step) => el('li', {}, [step]))),
            el('p', { class: 'done' }, [`完了条件: ${exercise.done}`])
        ]);
    }));
    return section('hands-on', 'LAB', 'ハンズオン', '講義で概念を入れたら, すぐに手を動かす. clone, PR, review, conflictを一周する.', [grid]);
}
function renderChecklist() {
    const saved = new Set(JSON.parse(localStorage.getItem('github-training-checks') ?? '[]'));
    const list = el('div', { class: 'checklist' }, checklist.map((item, index) => {
        const input = el('input', { type: 'checkbox', id: `check-${index}` });
        input.checked = saved.has(index);
        input.addEventListener('change', () => {
            const current = new Set(JSON.parse(localStorage.getItem('github-training-checks') ?? '[]'));
            if (input.checked)
                current.add(index);
            else
                current.delete(index);
            localStorage.setItem('github-training-checks', JSON.stringify([...current]));
            updateProgress();
        });
        return el('label', { class: 'check-item', for: `check-${index}` }, [input, el('span', {}, [item])]);
    }));
    const meter = el('div', { class: 'completion' }, [
        el('span', { id: 'completion-label' }, ['0% complete']),
        el('div', { class: 'completion-bar' }, [el('div', { id: 'completion-fill' })])
    ]);
    return section('checklist', 'READY', '到達度チェック', 'ここまでできれば, 初回のチーム開発に入れる.', [meter, list]);
}
function renderQuiz() {
    const cards = el('div', { class: 'quiz-grid' }, quiz.map((q, qi) => {
        const choiceButtons = q.choices.map((choice, ci) => {
            return el('button', { class: 'choice', type: 'button', 'data-q': String(qi), 'data-choice': String(ci) }, [choice]);
        });
        return el('article', { class: 'quiz-card' }, [
            el('h3', {}, [`Q${qi + 1}. ${q.question}`]),
            el('div', { class: 'choices' }, choiceButtons),
            el('p', { class: 'quiz-explain', id: `quiz-explain-${qi}` }, [''])
        ]);
    }));
    return section('quiz', 'TEST', 'ミニクイズ', '正解すると解説が表示される. 研修の最後に5分で確認する.', [cards]);
}
function renderClosing() {
    return section('closing', 'END', '最後に覚える3つ', 'GitHubはコマンド暗記だけでは使いこなせない. 重要なのは安全な型を反復すること.', [
        el('div', { class: 'closing-grid' }, [
            el('article', {}, [el('span', {}, ['01']), el('h3', {}, ['作業前に状態確認']), el('p', {}, ['git statusと現在ブランチを見る.'])]),
            el('article', {}, [el('span', {}, ['02']), el('h3', {}, ['PR前に自分で差分確認']), el('p', {}, ['Files changedを読み, 不要な差分を消す.'])]),
            el('article', {}, [el('span', {}, ['03']), el('h3', {}, ['危険コマンドは相談']), el('p', {}, ['分からないままforce pushやresetを打たない.'])])
        ]),
        el('p', { class: 'final-message' }, ['GitHubの本質は, コードの保存ではなく, 安全に共同開発するための合意形成である.'])
    ]);
}
function renderNav() {
    const items = [
        ['top', 'Top'],
        ['concept', 'Git / GitHub'],
        ['vocabulary', 'Words'],
        ['states', '3 States'],
        ['flow', 'Flow'],
        ['commands', 'Commands'],
        ['pr-review', 'PR / Review'],
        ['rules', 'Rules'],
        ['emergency', 'Emergency'],
        ['hands-on', 'Hands-on'],
        ['checklist', 'Checklist'],
        ['quiz', 'Quiz']
    ];
    const toggle = el('button', {
        class: 'nav-toggle',
        type: 'button',
        'aria-controls': 'page-nav',
        'aria-expanded': 'false',
        'aria-label': 'Navigationを開く'
    }, [
        el('span', { class: 'nav-toggle-line' }),
        el('span', { class: 'nav-toggle-line' }),
        el('span', { class: 'nav-toggle-line' })
    ]);
    const nav = el('nav', { class: 'side-nav', id: 'page-nav', 'aria-label': 'page sections' }, items.map(([href, label]) => {
        return el('a', { href: `#${href}`, 'data-nav': href }, [label]);
    }));
    return el('div', { class: 'nav-system' }, [
        el('div', { class: 'nav-hover-rail', 'aria-hidden': 'true' }),
        toggle,
        nav
    ]);
}
function updateProgress() {
    const checked = document.querySelectorAll('.check-item input:checked').length;
    const ratio = Math.round((checked / checklist.length) * 100);
    const label = document.getElementById('completion-label');
    const fill = document.getElementById('completion-fill');
    if (label)
        label.textContent = `${ratio}% complete`;
    if (fill)
        fill.style.width = `${ratio}%`;
}
function setupInteractions() {
    document.addEventListener('click', async (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement))
            return;
        const copyButton = target.closest('.copy');
        if (copyButton) {
            const code = copyButton.dataset.code ?? '';
            try {
                await navigator.clipboard.writeText(code);
                copyButton.textContent = 'copied';
                window.setTimeout(() => (copyButton.textContent = 'copy'), 1200);
            }
            catch {
                copyButton.textContent = 'failed';
                window.setTimeout(() => (copyButton.textContent = 'copy'), 1200);
            }
            return;
        }
        const choice = target.closest('.choice');
        if (choice) {
            const qIndex = Number(choice.dataset.q);
            const cIndex = Number(choice.dataset.choice);
            const item = quiz[qIndex];
            if (!item)
                return;
            const parent = choice.closest('.quiz-card');
            parent?.querySelectorAll('.choice').forEach((button) => button.classList.remove('correct', 'wrong'));
            if (cIndex === item.answer)
                choice.classList.add('correct');
            else
                choice.classList.add('wrong');
            const explain = document.getElementById(`quiz-explain-${qIndex}`);
            if (explain)
                explain.textContent = item.explain;
        }
    });
    const search = document.getElementById('command-search');
    search?.addEventListener('input', () => {
        const query = search.value.trim().toLowerCase();
        document.querySelectorAll('.command-card').forEach((card) => {
            const value = (card.dataset.search ?? '').toLowerCase();
            card.hidden = Boolean(query) && !value.includes(query);
        });
    });
    const navSystem = document.querySelector('.nav-system');
    const navToggle = document.querySelector('.nav-toggle');
    const setNavOpen = (isOpen) => {
        navSystem?.classList.toggle('nav-open', isOpen);
        navToggle?.setAttribute('aria-expanded', String(isOpen));
        navToggle?.setAttribute('aria-label', isOpen ? 'Navigationを閉じる' : 'Navigationを開く');
    };
    navToggle?.addEventListener('click', () => {
        setNavOpen(!navSystem?.classList.contains('nav-open'));
    });
    navSystem?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setNavOpen(false));
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape')
            setNavOpen(false);
    });
    const progress = el('div', { class: 'read-progress', id: 'read-progress' });
    document.body.append(progress);
    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max <= 0 ? 0 : window.scrollY / max;
        progress.style.transform = `scaleX(${ratio})`;
    }, { passive: true });
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible)
            return;
        const id = visible.target.id;
        document.querySelectorAll('.side-nav a').forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-nav') === id);
        });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.2, 0.4] });
    document.querySelectorAll('header[id], section[id]').forEach((target) => observer.observe(target));
    updateProgress();
}
function renderApp() {
    const app = document.getElementById('app');
    if (!app)
        throw new Error('Missing #app');
    app.append(renderNav(), el('div', { class: 'page-shell' }, [
        renderHero(),
        renderConcept(),
        renderVocabulary(),
        renderThreeStates(),
        renderFlow(),
        renderCommands(),
        renderPrReview(),
        renderRules(),
        renderEmergency(),
        renderExercises(),
        renderChecklist(),
        renderQuiz(),
        renderClosing()
    ]));
    setupInteractions();
}
renderApp();
//# sourceMappingURL=main.js.map