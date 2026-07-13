import type { CommandRecipe } from '../model.js';

export const ghFoundationRecipes = [
  {
    id: 'gh-auth-login',
    number: 51,
    tool: 'gh',
    category: 'gh-auth',
    title: 'ブラウザでGitHubへ認証する',
    summary: 'GitHub CLIをWeb認証し, Gitで使う通信方式も選ぶ.',
    usage: '初回セットアップや認証情報を作り直すときに使う. GitHub Enterpriseではhostnameを置き換える.',
    command: 'gh auth login --web --git-protocol https',
    options: [
      { syntax: '--web', description: 'ブラウザを開く認証フローを開始する.' },
      { syntax: '--git-protocol <ssh|https>', description: 'このhostでGit操作に使うprotocolを選ぶ.' },
      { syntax: '--hostname <HOST>', description: 'GitHub Enterpriseなど認証先のhostを指定する.' }
    ],
    risk: 'caution',
    warning: '共有端末では認証を残さない. Tokenを引数へ直接書かず, 認証後はgh auth statusでaccountを確認する.',
    keywords: ['認証', 'login', 'oauth', 'browser', 'token', 'protocol', '初期設定'],
    docsUrl: 'https://cli.github.com/manual/gh_auth_login'
  },
  {
    id: 'gh-auth-status',
    number: 52,
    tool: 'gh',
    category: 'gh-auth',
    title: '現在の認証状態を確認する',
    summary: '利用中のaccountと認証エラーをhostごとに確認する.',
    usage: 'repository操作の前や, 権限不足・別accountでの実行を疑うときに使う.',
    command: 'gh auth status --active --hostname github.com',
    options: [
      { syntax: '--active', description: '現在有効なaccountだけを表示する.' },
      { syntax: '--hostname <HOST>', description: '確認するGitHub hostを限定する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' }
    ],
    risk: 'safe',
    warning: '--show-tokenはTokenを平文表示するため, 画面共有中やlogへ残る環境では使わない.',
    keywords: ['認証', 'status', 'account', 'host', '権限', 'token'],
    docsUrl: 'https://cli.github.com/manual/gh_auth_status'
  },
  {
    id: 'gh-auth-switch',
    number: 53,
    tool: 'gh',
    category: 'gh-auth',
    title: '利用するaccountを切り替える',
    summary: '同じhostに登録した複数accountから実行主体を選ぶ.',
    usage: '個人用と業務用など, 複数accountを使い分けるときに実行する.',
    command: 'gh auth switch --hostname github.com --user USERNAME',
    options: [
      { syntax: '--hostname <HOST>', description: '切り替え対象のGitHub hostを指定する.' },
      { syntax: '--user <USERNAME>', description: '有効にするaccount名を指定する.' }
    ],
    risk: 'caution',
    warning: '以後のgh操作すべての実行主体が変わる. 切り替え後にgh auth status --activeで確認する.',
    keywords: ['認証', 'switch', 'account', 'user', '複数アカウント'],
    docsUrl: 'https://cli.github.com/manual/gh_auth_switch'
  },
  {
    id: 'gh-auth-setup-git',
    number: 54,
    tool: 'gh',
    category: 'gh-auth',
    title: 'Gitの認証をGitHub CLIへ接続する',
    summary: 'ghをGit credential helperとして設定する.',
    usage: 'ghで認証済みのaccountをgit fetchやgit pushでも使えるようにするときに実行する.',
    command: 'gh auth setup-git --hostname github.com',
    options: [
      { syntax: '--hostname <HOST>', description: 'credential helperを設定するGitHub hostを限定する.' }
    ],
    risk: 'caution',
    warning: 'Gitのcredential helper設定が変わる. 既存設定がある場合は先にgit config --global --show-origin --get-regexp ^credentialで確認する.',
    keywords: ['認証', 'setup-git', 'credential', 'helper', 'git config'],
    docsUrl: 'https://cli.github.com/manual/gh_auth_setup-git'
  },
  {
    id: 'gh-auth-refresh',
    number: 55,
    tool: 'gh',
    category: 'gh-auth',
    title: '認証scopeを追加する',
    summary: '有効なaccountの認証権限を更新する.',
    usage: 'project操作などで追加scopeを要求されたときに, 必要な権限だけを付与する.',
    command: 'gh auth refresh --hostname github.com --scopes read:project',
    options: [
      { syntax: '--hostname <HOST>', description: '認証を更新するGitHub hostを指定する.' },
      { syntax: '--scopes <SCOPES>', description: '追加するOAuth scopeをcomma区切りで指定する.' },
      { syntax: '--remove-scopes <SCOPES>', description: '不要になった追加scopeを削除する.' }
    ],
    risk: 'caution',
    warning: '権限は必要最小限にする. 複数accountがある場合は先にgh auth switchで対象を確認する.',
    keywords: ['認証', 'refresh', 'scope', 'permission', '権限', 'oauth'],
    docsUrl: 'https://cli.github.com/manual/gh_auth_refresh'
  },
  {
    id: 'gh-repo-clone',
    number: 56,
    tool: 'gh',
    category: 'gh-repo',
    title: 'repositoryをcloneする',
    summary: 'OWNER/REPO指定でGitHub repositoryをlocalへ取得する.',
    usage: 'URLを調べずにGitHub上のrepositoryから作業を始めるときに使う.',
    command: 'gh repo clone OWNER/REPO -- --depth=1',
    options: [
      { syntax: '-- <gitflags>...', description: '--以降をgit cloneへそのまま渡す.' },
      { syntax: '--depth=<DEPTH>', description: '取得する履歴の深さを制限するgit cloneのOption.' },
      { syntax: '--upstream-remote-name <NAME>', description: 'fork元を追加するときのremote名を指定する.' }
    ],
    risk: 'safe',
    warning: '--depth=1は過去履歴を省く. 履歴調査や古いbranchが必要ならこのOptionを外す.',
    keywords: ['repository', 'repo', 'clone', '取得', 'shallow', 'depth'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_clone'
  },
  {
    id: 'gh-repo-create',
    number: 57,
    tool: 'gh',
    category: 'gh-repo',
    title: 'local repositoryからGitHub repositoryを作る',
    summary: '現在のdirectoryをprivate repositoryとして作成し, commitをpushする.',
    usage: 'localで始めたprojectを新しいGitHub repositoryとして共有するときに使う.',
    command: 'gh repo create REPO --private --source=. --push',
    options: [
      { syntax: '--private', description: '新しいrepositoryをprivateで作成する.' },
      { syntax: '--source <PATH>', description: '新しいrepositoryの元にするlocal repositoryを指定する.' },
      { syntax: '--push', description: 'local commitを作成したremoteへpushする.' }
    ],
    risk: 'caution',
    warning: 'GitHub上にrepositoryを作成してcommitを送信する. account, OWNER, repository名, 公開範囲を実行前に確認する.',
    keywords: ['repository', 'repo', 'create', 'private', 'source', 'push', '新規作成'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_create'
  },
  {
    id: 'gh-repo-list',
    number: 58,
    tool: 'gh',
    category: 'gh-repo',
    title: '所有repositoryを一覧する',
    summary: 'userまたはorganizationが所有するrepositoryを絞り込んで表示する.',
    usage: '対象repository名を探すときや, forkを除いた一覧を確認するときに使う.',
    command: 'gh repo list OWNER --source --limit 100',
    options: [
      { syntax: '--source', description: 'forkではないrepositoryだけを表示する.' },
      { syntax: '--limit <INT>', description: '取得するrepositoryの最大件数を指定する.' },
      { syntax: '--visibility <VISIBILITY>', description: 'public, private, internalのいずれかで絞り込む.' }
    ],
    risk: 'safe',
    warning: '一覧は指定OWNERが所有するrepositoryだけが対象で, forkの所有境界はたどらない.',
    keywords: ['repository', 'repo', 'list', '一覧', 'owner', 'organization', 'source'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_list'
  },
  {
    id: 'gh-repo-view',
    number: 59,
    tool: 'gh',
    category: 'gh-repo',
    title: 'repositoryをブラウザで開く',
    summary: '指定repositoryのGitHubページを既定browserで開く.',
    usage: '設定, file, IssueなどをWeb画面で続けて確認したいときに使う.',
    command: 'gh repo view OWNER/REPO --web',
    options: [
      { syntax: '--web', description: 'terminal表示ではなくGitHubのWebページを開く.' },
      { syntax: '--branch <BRANCH>', description: '特定branchを対象にrepository情報を表示する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' }
    ],
    risk: 'safe',
    warning: 'remote操作は行わないが, 機密repositoryを画面共有中に開く場合は表示内容に注意する.',
    keywords: ['repository', 'repo', 'view', 'web', 'browser', '表示'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_view'
  },
  {
    id: 'gh-repo-fork',
    number: 60,
    tool: 'gh',
    category: 'gh-repo',
    title: 'repositoryをforkしてcloneする',
    summary: 'GitHub上にforkを作り, localへcloneする.',
    usage: '直接push権限がないrepositoryへ変更を提案する作業を始めるときに使う.',
    command: 'gh repo fork OWNER/REPO --clone',
    options: [
      { syntax: '--clone', description: '作成したforkをlocalへcloneする.' },
      { syntax: '--default-branch-only', description: 'forkへdefault branchだけを含める.' },
      { syntax: '--org <ORGANIZATION>', description: '自分のaccountではなく指定organization内にforkを作る.' }
    ],
    risk: 'caution',
    warning: 'GitHub上にforkを作成する. 所有先とclone先を確認し, 同名のlocal directoryがない状態で実行する.',
    keywords: ['repository', 'repo', 'fork', 'clone', 'remote', 'contribution'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_fork'
  },
  {
    id: 'gh-repo-sync',
    number: 61,
    tool: 'gh',
    category: 'gh-repo',
    title: 'forkをupstreamへ同期する',
    summary: 'fork側branchを元repositoryのbranchへ追従させる.',
    usage: 'forkのmain branchをupstreamの最新状態へ更新してから作業するときに使う.',
    command: 'gh repo sync OWNER/FORK --source UPSTREAM_OWNER/REPO --branch main',
    options: [
      { syntax: '--source <OWNER/REPO>', description: '同期元のupstream repositoryを明示する.' },
      { syntax: '--branch <BRANCH>', description: '同期するbranchを指定する.' }
    ],
    risk: 'caution',
    warning: 'fork側の指定branchがGitHub上で更新される. 未統合commitがある場合は先に比較し, 強制同期は使わない.',
    keywords: ['repository', 'repo', 'sync', 'fork', 'upstream', 'branch', '同期'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_sync'
  },
  {
    id: 'gh-repo-set-default',
    number: 62,
    tool: 'gh',
    category: 'gh-repo',
    title: '既定repositoryを設定する',
    summary: 'remoteを自動判定できないdirectoryでghの対象repositoryを固定する.',
    usage: '複数remoteがあるlocal repositoryで, ghが使う既定の対象を設定する.',
    command: 'gh repo set-default OWNER/REPO',
    options: [
      { syntax: '--view', description: '現在設定されている既定repositoryを表示する.' },
      { syntax: '--unset', description: '既定repositoryの設定を解除する.' }
    ],
    risk: 'caution',
    warning: '以後のgh commandが意図しないrepositoryを対象にしないよう, 設定後にgh repo set-default --viewで確認する.',
    keywords: ['repository', 'repo', 'set-default', 'default', 'remote', '既定'],
    docsUrl: 'https://cli.github.com/manual/gh_repo_set-default'
  },
  {
    id: 'gh-pr-create',
    number: 63,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestを作成する',
    summary: 'baseとheadを明示し, commit情報から本文を作ってPRを開く.',
    usage: '作業branchをpushした後, review依頼をGitHubへ登録するときに使う.',
    command: 'gh pr create --base main --head feature/topic --fill',
    options: [
      { syntax: '--base <BRANCH>', description: 'merge先のbase branchを指定する.' },
      { syntax: '--head <BRANCH>', description: '提案元のhead branchを指定する.' },
      { syntax: '--fill', description: 'commit情報からtitleとbodyを生成する.' }
    ],
    risk: 'caution',
    warning: 'GitHub上にPRを作成する. baseとheadの向き, commit内容, 機密情報の混入を確認してから実行する.',
    keywords: ['pull request', 'pr', 'create', 'base', 'head', 'fill', 'レビュー依頼'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_create'
  },
  {
    id: 'gh-pr-list',
    number: 64,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestを一覧する',
    summary: '条件に合うPRをJSON field付きで取得する.',
    usage: 'open中のPRを棚卸しするときや, scriptで番号・title・authorを扱うときに使う.',
    command: 'gh pr list --state open --limit 50 --json number,title,author',
    options: [
      { syntax: '--state <STATE>', description: 'open, closed, merged, allのいずれかで絞り込む.' },
      { syntax: '--limit <INT>', description: '取得するPRの最大件数を指定する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' }
    ],
    risk: 'safe',
    warning: '既定ではopen中の30件まで. 全件確認が必要ならstateとlimitを明示する.',
    keywords: ['pull request', 'pr', 'list', '一覧', 'state', 'json', 'open'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_list'
  },
  {
    id: 'gh-pr-status',
    number: 65,
    tool: 'gh',
    category: 'gh-pr',
    title: '自分に関係するPull Requestを確認する',
    summary: '現在のrepositoryで自分が関与するPRの状態をまとめて表示する.',
    usage: '作業開始時に, 自分のPRやreview依頼の状況を確認するときに使う.',
    command: 'gh pr status --repo OWNER/REPO',
    options: [
      { syntax: '--repo <OWNER/REPO>', description: '現在地ではなく指定repositoryを対象にする.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' },
      { syntax: '--conflict-status', description: '各PRのmerge conflict状態も確認する.' }
    ],
    risk: 'safe',
    warning: '表示対象は自分に関係するPRであり, repository内の全PR一覧ではない. 全件はgh pr listで確認する.',
    keywords: ['pull request', 'pr', 'status', 'review', '自分', '状態'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_status'
  },
  {
    id: 'gh-pr-view',
    number: 66,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestの内容とcommentを読む',
    summary: 'PRの説明, 状態, review commentをterminalで確認する.',
    usage: 'review前にPRの背景と議論を把握するときに使う.',
    command: 'gh pr view 123 --comments',
    options: [
      { syntax: '--comments', description: 'PR本文に加えてcommentも表示する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' },
      { syntax: '--web', description: '対象PRをGitHubのWebページで開く.' }
    ],
    risk: 'safe',
    warning: '番号123は対象PR番号へ置き換える. 別repositoryでは--repoも明示する.',
    keywords: ['pull request', 'pr', 'view', 'comments', '詳細', '読む'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_view'
  },
  {
    id: 'gh-pr-checkout',
    number: 67,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestのbranchをcheckoutする',
    summary: 'PRのhead branchを取得し, review用local branchへ切り替える.',
    usage: 'PRのcodeをlocalで動かし, testや詳細reviewを行うときに使う.',
    command: 'gh pr checkout 123 --branch review/pr-123',
    options: [
      { syntax: '--branch <LOCAL_BRANCH>', description: 'checkout時に作るlocal branch名を指定する.' },
      { syntax: '--detach', description: 'branchを作らずdetached HEADでcheckoutする.' },
      { syntax: '--recurse-submodules', description: 'submoduleも再帰的に更新する.' }
    ],
    risk: 'caution',
    warning: '現在のworktreeとbranchが切り替わる. 未commit変更は先にcommitまたはstashし, 強制切り替えは使わない.',
    keywords: ['pull request', 'pr', 'checkout', 'branch', 'review', 'local'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_checkout'
  },
  {
    id: 'gh-pr-diff',
    number: 68,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestの変更fileを確認する',
    summary: 'PRで変更されるfile名だけを素早く一覧する.',
    usage: 'review範囲を把握してからpatchや各fileを詳しく読むときに使う.',
    command: 'gh pr diff 123 --name-only',
    options: [
      { syntax: '--name-only', description: 'patchではなく変更file名だけを表示する.' },
      { syntax: '--patch', description: '変更をpatch形式で表示する.' },
      { syntax: '--web', description: 'GitHubのFiles changed画面を開く.' }
    ],
    risk: 'safe',
    warning: '生成fileやbinaryは差分だけで判断せず, 必要に応じてlocal checkout後に確認する.',
    keywords: ['pull request', 'pr', 'diff', 'patch', 'name-only', '変更ファイル'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_diff'
  },
  {
    id: 'gh-pr-checks',
    number: 69,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestのcheck完了を待つ',
    summary: 'PRに紐づくCI checkを監視し, 失敗時に終了codeを返す.',
    usage: 'merge前に必須checkの完了をterminalで待ち, automationへ結果を渡すときに使う.',
    command: 'gh pr checks 123 --watch --fail-fast',
    options: [
      { syntax: '--watch', description: 'checkが完了するまで定期的に更新する.' },
      { syntax: '--fail-fast', description: 'watch中にcheckが失敗した時点で監視を終了する.' },
      { syntax: '--interval <SECONDS>', description: 'watch中の更新間隔を秒で指定する. 既定は10秒.' }
    ],
    risk: 'safe',
    warning: '--watchは完了までprocessを占有する. automationではtimeoutも別途設定する.',
    keywords: ['pull request', 'pr', 'checks', 'ci', 'watch', 'fail-fast', 'actions'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_checks'
  },
  {
    id: 'gh-pr-edit',
    number: 70,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestのreviewerとlabelを更新する',
    summary: '既存PRへreviewerとlabelを追加する.',
    usage: 'PR作成後にreview担当や分類を整えるときに使う.',
    command: 'gh pr edit 123 --add-reviewer USERNAME --add-label bug',
    options: [
      { syntax: '--add-reviewer <LOGIN>', description: 'reviewを依頼するuserまたはteamを追加する.' },
      { syntax: '--add-label <NAME>', description: 'PRへlabelを追加する.' },
      { syntax: '--title <TEXT>', description: 'PRのtitleを更新する.' }
    ],
    risk: 'caution',
    warning: 'GitHub上のPR情報と通知先が変わる. USERNAME, label, PR番号を確認してから実行する.',
    keywords: ['pull request', 'pr', 'edit', 'reviewer', 'label', 'title', '更新'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_edit'
  },
  {
    id: 'gh-pr-review',
    number: 71,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestをapproveする',
    summary: 'review結果を承認としてGitHubへ送信する.',
    usage: '差分とcheckを確認し, mergeしてよいと判断したPRを承認するときに使う.',
    command: 'gh pr review 123 --approve',
    options: [
      { syntax: '--approve', description: 'PRを承認するreviewを送信する.' },
      { syntax: '--comment', description: '承認・変更要求を付けずcomment reviewを送信する.' },
      { syntax: '--request-changes', description: '変更要求としてreviewを送信する.' }
    ],
    risk: 'caution',
    warning: 'reviewはmerge判断に影響する. gh pr diffとgh pr checksで対象commitを確認してから送信する.',
    keywords: ['pull request', 'pr', 'review', 'approve', 'request changes', '承認'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_review'
  },
  {
    id: 'gh-pr-ready',
    number: 72,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Draft Pull Requestをreview可能にする',
    summary: 'Draft PRをReady for reviewへ切り替える.',
    usage: '実装と自己確認が終わり, 正式にreviewを依頼するときに使う.',
    command: 'gh pr ready 123',
    options: [
      { syntax: '--undo', description: 'Ready for reviewのPRをDraftへ戻す.' }
    ],
    risk: 'caution',
    warning: 'reviewerへ通知される可能性がある. 説明, test結果, 未完了項目を整えてから切り替える.',
    keywords: ['pull request', 'pr', 'ready', 'draft', 'review', 'レビュー開始'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_ready'
  },
  {
    id: 'gh-pr-update-branch',
    number: 73,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Request branchをbaseへ追従させる',
    summary: 'PRのhead branchへbase branchの最新変更を取り込む.',
    usage: 'baseが進んだためcheckをやり直すときや, merge条件を満たすために更新するときに使う.',
    command: 'gh pr update-branch 123',
    options: [
      { syntax: '--rebase', description: '既定のmergeではなくrebaseでbaseの変更を取り込む.' },
      { syntax: '--repo <OWNER/REPO>', description: '現在地ではなく指定repositoryのPRを対象にする.' }
    ],
    risk: 'caution',
    warning: 'GitHub上のhead branchが更新され, CIが再実行されることがある. --rebaseはcommit IDを変えるため共同作業中は避ける.',
    keywords: ['pull request', 'pr', 'update-branch', 'base', 'merge', 'rebase', '追従'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_update-branch'
  },
  {
    id: 'gh-pr-merge',
    number: 74,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestをsquash mergeする',
    summary: '確認済みPRを1 commitにまとめ, head branchを削除する.',
    usage: '必須reviewとcheckを通過したPRをbase branchへ統合するときに使う.',
    command: 'gh pr merge 123 --squash --delete-branch --match-head-commit HEAD_SHA',
    options: [
      { syntax: '--squash', description: 'PRのcommitを1つにまとめてmergeする.' },
      { syntax: '--delete-branch', description: 'merge後にlocalとremoteのhead branchを削除する.' },
      { syntax: '--match-head-commit <SHA>', description: 'headが指定commitのままの場合だけmergeする.' }
    ],
    risk: 'danger',
    warning: 'base branchとremote branchを変更する. 先にgh pr diff 123とgh pr checks 123を実行し, branchを残すなら--delete-branchを外す.',
    keywords: ['pull request', 'pr', 'merge', 'squash', 'delete branch', 'head sha', '統合'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_merge'
  },
  {
    id: 'gh-pr-comment',
    number: 75,
    tool: 'gh',
    category: 'gh-pr',
    title: 'Pull Requestへcommentする',
    summary: 'PRの会話へ短いcommentを投稿する.',
    usage: '確認結果, 質問, 対応状況をPR参加者へ共有するときに使う.',
    command: 'gh pr comment 123 --body "確認しました。"',
    options: [
      { syntax: '--body <TEXT>', description: '投稿するcomment本文を指定する.' },
      { syntax: '--body-file <FILE>', description: 'fileからcomment本文を読み込む. -で標準入力を使える.' },
      { syntax: '--edit-last', description: '新規投稿せず, 自分の直近commentを編集する.' }
    ],
    risk: 'caution',
    warning: 'commentは関係者へ通知される. PR番号, repository, 内容を確認し, 長文は--body-fileで誤引用を避ける.',
    keywords: ['pull request', 'pr', 'comment', 'body', '投稿', 'コメント'],
    docsUrl: 'https://cli.github.com/manual/gh_pr_comment'
  }
] satisfies readonly CommandRecipe[];
