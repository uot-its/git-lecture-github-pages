import type { CommandRecipe } from '../model.js';

export const ghOperationsRecipes = [
  {
    id: 'gh-issue-create',
    number: 76,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueを作成する',
    summary: 'titleとfile本文を指定し, label付きIssueを登録する.',
    usage: 'bug, 改善案, 作業項目をrepositoryで追跡し始めるときに使う.',
    command: 'gh issue create --title "不具合の概要" --body-file issue.md --label bug',
    options: [
      { syntax: '--title <TEXT>', description: 'Issueのtitleを指定する.' },
      { syntax: '--body-file <FILE>', description: 'fileからIssue本文を読み込む. -で標準入力を使える.' },
      { syntax: '--label <NAME>', description: 'Issueへ付けるlabelを指定する. 複数回指定できる.' }
    ],
    risk: 'caution',
    warning: 'GitHub上にIssueを作成して通知を発生させる. repository, title, 本文, 機密情報の有無を確認する.',
    keywords: ['issue', 'create', 'title', 'body-file', 'label', '課題', '不具合'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_create'
  },
  {
    id: 'gh-issue-list',
    number: 77,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueを一覧する',
    summary: 'open中のIssueをlabelと件数で絞り込む.',
    usage: '着手候補のbugを探すときや, 未解決Issueを棚卸しするときに使う.',
    command: 'gh issue list --state open --label bug --limit 50',
    options: [
      { syntax: '--state <STATE>', description: 'open, closed, allのいずれかで絞り込む.' },
      { syntax: '--label <NAME>', description: '指定labelが付いたIssueだけを表示する.' },
      { syntax: '--limit <INT>', description: '取得するIssueの最大件数を指定する.' }
    ],
    risk: 'safe',
    warning: '既定の取得件数には上限がある. 棚卸しではstateとlimitを明示する.',
    keywords: ['issue', 'list', 'state', 'label', 'limit', '一覧', 'open'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_list'
  },
  {
    id: 'gh-issue-status',
    number: 78,
    tool: 'gh',
    category: 'gh-issue',
    title: '自分に関係するIssueを確認する',
    summary: '自分が担当・作成・mentionされたIssueの状態をまとめて表示する.',
    usage: '作業開始時に, 自分が対応すべきIssueを確認するときに使う.',
    command: 'gh issue status --repo OWNER/REPO',
    options: [
      { syntax: '--repo <OWNER/REPO>', description: '現在地ではなく指定repositoryを対象にする.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' },
      { syntax: '--jq <EXPRESSION>', description: 'JSON出力をjq式で絞り込む.' }
    ],
    risk: 'safe',
    warning: '自分に関係するIssueの要約であり, repository内の全Issueはgh issue listで確認する.',
    keywords: ['issue', 'status', 'assignee', 'mention', 'created', '自分', '状態'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_status'
  },
  {
    id: 'gh-issue-view',
    number: 79,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueの内容とcommentを読む',
    summary: 'Issue本文, metadata, commentをterminalで確認する.',
    usage: '対応前に再現条件, 議論, 現在の担当を把握するときに使う.',
    command: 'gh issue view 123 --comments',
    options: [
      { syntax: '--comments', description: 'Issue本文に加えてcommentも表示する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' },
      { syntax: '--web', description: '対象IssueをGitHubのWebページで開く.' }
    ],
    risk: 'safe',
    warning: '番号123は対象Issue番号へ置き換える. 別repositoryでは--repoも明示する.',
    keywords: ['issue', 'view', 'comments', '詳細', '読む', 'metadata'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_view'
  },
  {
    id: 'gh-issue-edit',
    number: 80,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueの担当者とlabelを更新する',
    summary: '既存Issueへassigneeとlabelを追加する.',
    usage: 'Issueの担当を引き受け, 分類を整えてから作業を始めるときに使う.',
    command: 'gh issue edit 123 --add-assignee @me --add-label bug',
    options: [
      { syntax: '--add-assignee <LOGIN>', description: 'Issueへ担当者を追加する. @meで自分を指定できる.' },
      { syntax: '--add-label <NAME>', description: 'Issueへlabelを追加する.' },
      { syntax: '--title <TEXT>', description: 'Issueのtitleを更新する.' }
    ],
    risk: 'caution',
    warning: 'GitHub上のIssue情報と通知先が変わる. Issue番号, assignee, labelを確認してから実行する.',
    keywords: ['issue', 'edit', 'assignee', 'label', 'title', '担当', '更新'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_edit'
  },
  {
    id: 'gh-issue-comment',
    number: 81,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueへcommentする',
    summary: 'Issueの会話へ対応状況や質問を投稿する.',
    usage: '調査結果, 再現可否, 次の対応をIssue参加者へ共有するときに使う.',
    command: 'gh issue comment 123 --body "再現手順を確認しました。"',
    options: [
      { syntax: '--body <TEXT>', description: '投稿するcomment本文を指定する.' },
      { syntax: '--body-file <FILE>', description: 'fileからcomment本文を読み込む. -で標準入力を使える.' },
      { syntax: '--edit-last', description: '新規投稿せず, 自分の直近commentを編集する.' }
    ],
    risk: 'caution',
    warning: 'commentは関係者へ通知される. Issue番号, repository, 内容を確認してから投稿する.',
    keywords: ['issue', 'comment', 'body', '投稿', 'コメント', '状況共有'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_comment'
  },
  {
    id: 'gh-issue-close',
    number: 82,
    tool: 'gh',
    category: 'gh-issue',
    title: 'Issueを理由付きでcloseする',
    summary: '完了理由とcommentを残してIssueを閉じる.',
    usage: '修正や合意が完了し, Issueを未解決一覧から外すときに使う.',
    command: 'gh issue close 123 --reason completed --comment "対応済みです。"',
    options: [
      { syntax: '--reason <REASON>', description: 'completed, not planned, duplicateのいずれかをclose理由として記録する.' },
      { syntax: '--comment <TEXT>', description: 'closeと同時にcommentを投稿する.' },
      { syntax: '--duplicate-of <ISSUE>', description: '別Issueの番号またはURLを指定し, duplicateとしてcloseする.' }
    ],
    risk: 'caution',
    warning: 'Issueの状態と通知が変わる. 未完了ならcloseせずcommentし, 誤って閉じた場合はgh issue reopenで戻す.',
    keywords: ['issue', 'close', 'completed', 'not planned', 'comment', '完了'],
    docsUrl: 'https://cli.github.com/manual/gh_issue_close'
  },
  {
    id: 'gh-workflow-list',
    number: 83,
    tool: 'gh',
    category: 'gh-actions',
    title: 'workflowを一覧する',
    summary: 'activeとdisabledを含むworkflowを最大件数付きで表示する.',
    usage: 'workflow名やIDを調べ, 手動実行・run確認の対象を選ぶときに使う.',
    command: 'gh workflow list --all --limit 100',
    options: [
      { syntax: '--all', description: 'activeだけでなくdisabled workflowも表示する.' },
      { syntax: '--limit <INT>', description: '取得するworkflowの最大件数を指定する.' },
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' }
    ],
    risk: 'safe',
    warning: '表示名は重複することがある. automationではpathまたはIDも確認する.',
    keywords: ['actions', 'workflow', 'list', 'disabled', '一覧', 'ci'],
    docsUrl: 'https://cli.github.com/manual/gh_workflow_list'
  },
  {
    id: 'gh-workflow-view',
    number: 84,
    tool: 'gh',
    category: 'gh-actions',
    title: 'workflow定義を確認する',
    summary: '指定workflowのYAMLをGitHubから取得して表示する.',
    usage: '手動実行前にinput, trigger, job内容を確認するときに使う.',
    command: 'gh workflow view ci.yml --yaml',
    options: [
      { syntax: '--yaml', description: 'workflow定義をYAMLで表示する.' },
      { syntax: '--ref <BRANCH|TAG>', description: '特定ref上のworkflow定義を表示する.' },
      { syntax: '--web', description: 'workflowページをGitHubで開く.' }
    ],
    risk: 'safe',
    warning: '既定branch上の定義と実行対象refの定義が異なる場合がある. 必要なら--refを明示する.',
    keywords: ['actions', 'workflow', 'view', 'yaml', 'ref', '定義', 'ci'],
    docsUrl: 'https://cli.github.com/manual/gh_workflow_view'
  },
  {
    id: 'gh-workflow-run',
    number: 85,
    tool: 'gh',
    category: 'gh-actions',
    title: 'workflowを手動実行する',
    summary: 'workflow_dispatchへrefとinputを渡してrunを開始する.',
    usage: '手動triggerに対応したCI, build, deploy workflowを明示的に起動するときに使う.',
    command: 'gh workflow run ci.yml --ref main --field environment=staging',
    options: [
      { syntax: '--ref <BRANCH|TAG>', description: 'workflowを実行するbranchまたはtagを指定する.' },
      { syntax: '--field <KEY=VALUE>', description: '@構文を解釈して文字列のworkflow inputを渡す.' },
      { syntax: '--raw-field <KEY=VALUE>', description: '@構文を解釈せず文字列のworkflow inputを渡す.' }
    ],
    risk: 'danger',
    warning: 'workflowはdeploy, 課金, 外部更新を実行し得る. 先にgh workflow view ci.yml --yamlで内容を読み, refとinputをstagingなど安全な対象で確認する.',
    keywords: ['actions', 'workflow', 'run', 'workflow_dispatch', 'field', 'ref', '手動実行'],
    docsUrl: 'https://cli.github.com/manual/gh_workflow_run'
  },
  {
    id: 'gh-run-list',
    number: 86,
    tool: 'gh',
    category: 'gh-actions',
    title: 'workflow runを一覧する',
    summary: 'workflowとbranchを指定して最近のrunを取得する.',
    usage: '対象runのID, status, conclusionを調べて詳細確認へ進むときに使う.',
    command: 'gh run list --workflow ci.yml --branch main --limit 20',
    options: [
      { syntax: '--workflow <WORKFLOW>', description: 'workflow名, ID, file名のいずれかで絞り込む.' },
      { syntax: '--branch <BRANCH>', description: '指定branchに紐づくrunだけを表示する.' },
      { syntax: '--limit <INT>', description: '取得するrunの最大件数を指定する.' }
    ],
    risk: 'safe',
    warning: '表示件数には上限がある. 古いrunを探す場合はlimitやstatusなどの条件を調整する.',
    keywords: ['actions', 'run', 'list', 'workflow', 'branch', '一覧', 'ci'],
    docsUrl: 'https://cli.github.com/manual/gh_run_list'
  },
  {
    id: 'gh-run-view',
    number: 87,
    tool: 'gh',
    category: 'gh-actions',
    title: '失敗したrun logを読む',
    summary: 'workflow runのうち失敗stepのlogを表示する.',
    usage: 'CI失敗の原因を絞り込み, localで再現する箇所を特定するときに使う.',
    command: 'gh run view RUN_ID --log-failed',
    options: [
      { syntax: '--log-failed', description: '失敗したstepのlogだけを表示する.' },
      { syntax: '--job <JOB_ID>', description: '特定jobだけを表示する.' },
      { syntax: '--web', description: 'run詳細をGitHubのWebページで開く.' }
    ],
    risk: 'safe',
    warning: 'logに秘密情報や個人情報が含まれる可能性がある. 共有・保存前に内容を確認する.',
    keywords: ['actions', 'run', 'view', 'log-failed', 'job', 'ci', '失敗ログ'],
    docsUrl: 'https://cli.github.com/manual/gh_run_view'
  },
  {
    id: 'gh-run-watch',
    number: 88,
    tool: 'gh',
    category: 'gh-actions',
    title: 'workflow runの完了を待つ',
    summary: '指定runを監視し, 結果をprocessの終了codeへ反映する.',
    usage: '手動実行したrunの完了をterminalで待つときや, 後続scriptへ成否を渡すときに使う.',
    command: 'gh run watch RUN_ID --exit-status --interval 5',
    options: [
      { syntax: '--exit-status', description: 'run失敗時に0以外の終了codeを返す.' },
      { syntax: '--interval <SECONDS>', description: '更新間隔を秒で指定する. 既定は3秒.' },
      { syntax: '--compact', description: '関係するstepと失敗stepだけを簡潔に表示する.' }
    ],
    risk: 'safe',
    warning: 'run完了までprocessを占有する. automationでは別途timeoutを設ける.',
    keywords: ['actions', 'run', 'watch', 'exit-status', 'interval', '監視', 'ci'],
    docsUrl: 'https://cli.github.com/manual/gh_run_watch'
  },
  {
    id: 'gh-run-rerun',
    number: 89,
    tool: 'gh',
    category: 'gh-actions',
    title: '失敗jobだけを再実行する',
    summary: '指定workflow runの失敗jobと依存jobを再実行する.',
    usage: '一時的な外部障害など, code変更なしで失敗部分を再試行するときに使う.',
    command: 'gh run rerun RUN_ID --failed',
    options: [
      { syntax: '--failed', description: '失敗したjobとその依存jobだけを再実行する.' },
      { syntax: '--job <JOB_ID>', description: '特定jobと依存jobだけを再実行する.' },
      { syntax: '--debug', description: 'debug loggingを有効にして再実行する.' }
    ],
    risk: 'danger',
    warning: 'runはdeploy, 課金, 外部更新を再度行う可能性がある. 先にgh run view RUN_ID --log-failedで原因を確認し, 全体ではなく--failedを使う.',
    keywords: ['actions', 'run', 'rerun', 'failed', 'job', '再実行', 'ci'],
    docsUrl: 'https://cli.github.com/manual/gh_run_rerun'
  },
  {
    id: 'gh-run-download',
    number: 90,
    tool: 'gh',
    category: 'gh-actions',
    title: 'run artifactをdownloadする',
    summary: '指定runの名前付きartifactをlocal directoryへ展開する.',
    usage: 'CIが生成したbuild成果物, report, screenshotを確認するときに使う.',
    command: 'gh run download RUN_ID --name ARTIFACT_NAME --dir ./artifacts',
    options: [
      { syntax: '--name <NAME>', description: 'downloadするartifact名を指定する. 複数回指定できる.' },
      { syntax: '--dir <PATH>', description: 'artifactを展開する保存先directoryを指定する.' },
      { syntax: '--pattern <GLOB>', description: 'artifact名をglob patternで絞り込む.' }
    ],
    risk: 'caution',
    warning: 'artifactはlocal fileを作成する. 信頼できるrunか確認し, 専用の空directoryへ展開してから内容を開く.',
    keywords: ['actions', 'run', 'download', 'artifact', 'dir', '成果物'],
    docsUrl: 'https://cli.github.com/manual/gh_run_download'
  },
  {
    id: 'gh-release-list',
    number: 91,
    tool: 'gh',
    category: 'gh-release',
    title: '公開済みreleaseを一覧する',
    summary: 'draftとpre-releaseを除き, 最近のreleaseを表示する.',
    usage: '最新の安定版tagや過去のreleaseを確認するときに使う.',
    command: 'gh release list --exclude-drafts --exclude-pre-releases --limit 50',
    options: [
      { syntax: '--exclude-drafts', description: 'draft releaseを一覧から除外する.' },
      { syntax: '--exclude-pre-releases', description: 'pre-releaseを一覧から除外する.' },
      { syntax: '--limit <INT>', description: '取得するreleaseの最大件数を指定する.' }
    ],
    risk: 'safe',
    warning: 'draftやpre-releaseも確認したい場合は除外Optionを外す.',
    keywords: ['release', 'list', 'draft', 'pre-release', 'tag', '一覧', '安定版'],
    docsUrl: 'https://cli.github.com/manual/gh_release_list'
  },
  {
    id: 'gh-release-view',
    number: 92,
    tool: 'gh',
    category: 'gh-release',
    title: 'release情報をJSONで確認する',
    summary: 'tagに紐づくrelease名とURLを機械可読形式で取得する.',
    usage: '配布前後のrelease情報を確認するときや, scriptへURLを渡すときに使う.',
    command: 'gh release view TAG --json name,tagName,url',
    options: [
      { syntax: '--json <FIELDS>', description: '指定fieldをJSONで出力する.' },
      { syntax: '--jq <EXPRESSION>', description: 'JSON出力をjq式で絞り込む.' },
      { syntax: '--web', description: '対象releaseをGitHubのWebページで開く.' }
    ],
    risk: 'safe',
    warning: 'TAGは実在するtagへ置き換える. 引数を省くとlatest releaseが対象になる.',
    keywords: ['release', 'view', 'tag', 'json', 'url', '詳細'],
    docsUrl: 'https://cli.github.com/manual/gh_release_view'
  },
  {
    id: 'gh-release-create',
    number: 93,
    tool: 'gh',
    category: 'gh-release',
    title: 'draft releaseを作成する',
    summary: '既存tagを検証し, 自動生成note付きのdraftを作る.',
    usage: '公開前にrelease noteとassetを確認できる状態をGitHub上へ用意するときに使う.',
    command: 'gh release create v1.2.3 ./dist/* --draft --generate-notes --verify-tag',
    options: [
      { syntax: '--draft', description: 'すぐ公開せずdraft releaseとして作成する.' },
      { syntax: '--generate-notes', description: '前回release以降の変更からtitleとnoteを生成する.' },
      { syntax: '--verify-tag', description: 'remoteにtagがない場合は失敗させ, 自動作成を防ぐ.' }
    ],
    risk: 'caution',
    warning: 'GitHub上にreleaseとassetを作成する. 例は--draftを安全な代替として使う. POSIX shellの*展開はPowerShellと異なるため対象fileも確認する.',
    keywords: ['release', 'create', 'draft', 'generate-notes', 'verify-tag', 'asset', '公開準備'],
    docsUrl: 'https://cli.github.com/manual/gh_release_create'
  },
  {
    id: 'gh-release-upload',
    number: 94,
    tool: 'gh',
    category: 'gh-release',
    title: 'release assetを置き換える',
    summary: '同名assetがあれば上書きして新しいfileをuploadする.',
    usage: '同じtagの配布assetを修正版へ差し替える必要があるときに使う.',
    command: 'gh release upload v1.2.3 ./dist/app.zip --clobber',
    options: [
      { syntax: '--clobber', description: '同じ名前の既存assetを削除して置き換える.' }
    ],
    risk: 'danger',
    warning: '既存assetを削除してからuploadするため, upload失敗時は元assetも失われる. 先にgh release view v1.2.3で確認し, 新規assetなら--clobberを外す.',
    keywords: ['release', 'upload', 'asset', 'clobber', '上書き', '配布'],
    docsUrl: 'https://cli.github.com/manual/gh_release_upload'
  },
  {
    id: 'gh-release-download',
    number: 95,
    tool: 'gh',
    category: 'gh-release',
    title: 'release assetをdownloadする',
    summary: 'tagとpatternを指定してrelease assetをlocalへ保存する.',
    usage: '配布物の動作確認やchecksum検証のため, 必要な形式のassetだけを取得するときに使う.',
    command: 'gh release download v1.2.3 --pattern "*.zip" --dir ./downloads',
    options: [
      { syntax: '--pattern <GLOB>', description: 'downloadするasset名をglob patternで絞り込む.' },
      { syntax: '--dir <PATH>', description: 'assetの保存先directoryを指定する.' },
      { syntax: '--skip-existing', description: '同名local fileがある場合に上書きせずskipする.' }
    ],
    risk: 'caution',
    warning: '取得fileを実行する前に配布元とchecksumを確認する. 既存fileを守るには--skip-existingも使う.',
    keywords: ['release', 'download', 'asset', 'pattern', 'dir', 'zip', '配布物'],
    docsUrl: 'https://cli.github.com/manual/gh_release_download'
  },
  {
    id: 'gh-search-repos',
    number: 96,
    tool: 'gh',
    category: 'gh-search',
    title: 'repositoryを横断検索する',
    summary: 'queryと言語を組み合わせてGitHub上のrepositoryを探す.',
    usage: '参考実装, library, 類似projectをGitHub全体から探すときに使う.',
    command: 'gh search repos "static site" --language typescript --limit 20',
    options: [
      { syntax: '--language <LANGUAGE>', description: '主要programming languageで絞り込む.' },
      { syntax: '--limit <INT>', description: '取得する検索結果の最大件数を指定する.' },
      { syntax: '--sort <SORT>', description: 'forks, stars, updatedなどで結果を並べ替える.' }
    ],
    risk: 'safe',
    warning: '検索結果のlicense, 更新日, 安全性は別途確認し, codeをそのまま取り込まない.',
    keywords: ['search', 'repos', 'repository', 'language', 'query', '検索', '参考実装'],
    docsUrl: 'https://cli.github.com/manual/gh_search_repos'
  },
  {
    id: 'gh-search-prs',
    number: 97,
    tool: 'gh',
    category: 'gh-search',
    title: 'review依頼中のPull Requestを検索する',
    summary: 'repository, 状態, review依頼先を組み合わせてPRを探す.',
    usage: '複数repositoryをまたぐ検索条件を使い, 自分のreview待ちPRを確認するときに使う.',
    command: 'gh search prs --repo OWNER/REPO --state open --review-requested @me',
    options: [
      { syntax: '--repo <OWNER/REPO>', description: '検索対象を指定repositoryへ限定する. 複数回指定できる.' },
      { syntax: '--state <STATE>', description: 'openまたはclosedで絞り込む.' },
      { syntax: '--review-requested <USER|TEAM>', description: '指定userまたはteamへreview依頼中のPRに絞り込む.' }
    ],
    risk: 'safe',
    warning: 'gh pr listは現在のrepository中心, gh search prsはGitHub検索であり, 対象範囲と検索indexの反映時間が異なる.',
    keywords: ['search', 'prs', 'pull request', 'review-requested', 'state', 'repo', '検索'],
    docsUrl: 'https://cli.github.com/manual/gh_search_prs'
  },
  {
    id: 'gh-search-issues',
    number: 98,
    tool: 'gh',
    category: 'gh-search',
    title: '担当Issueを横断検索する',
    summary: 'repository, 状態, assigneeを組み合わせてIssueを探す.',
    usage: '担当Issueを検索条件で絞り込み, 複数repositoryの作業候補を確認するときに使う.',
    command: 'gh search issues --repo OWNER/REPO --state open --assignee @me',
    options: [
      { syntax: '--repo <OWNER/REPO>', description: '検索対象を指定repositoryへ限定する. 複数回指定できる.' },
      { syntax: '--state <STATE>', description: 'openまたはclosedで絞り込む.' },
      { syntax: '--assignee <USER>', description: '指定userが担当するIssueに絞り込む.' }
    ],
    risk: 'safe',
    warning: '検索indexの更新には時間差があり得る. 直前に更新したIssueはgh issue viewでも確認する.',
    keywords: ['search', 'issues', 'assignee', 'state', 'repo', '担当', '検索'],
    docsUrl: 'https://cli.github.com/manual/gh_search_issues'
  },
  {
    id: 'gh-search-code',
    number: 99,
    tool: 'gh',
    category: 'gh-search',
    title: 'repository内のcodeを検索する',
    summary: '検索語, repository, 拡張子を指定してcodeを探す.',
    usage: '型名, API利用箇所, 設定例をGitHub上のcodeから探すときに使う.',
    command: 'gh search code "CommandRecipe" --repo OWNER/REPO --extension ts',
    options: [
      { syntax: '--repo <OWNER/REPO>', description: '検索対象を指定repositoryへ限定する. 複数回指定できる.' },
      { syntax: '--extension <EXTENSION>', description: 'file拡張子で検索結果を絞り込む.' },
      { syntax: '--limit <INT>', description: '取得する検索結果の最大件数を指定する.' }
    ],
    risk: 'safe',
    warning: 'APIはlegacy code searchを使うためgithub.comの結果と異なる場合があり, localの未push変更も含まない. local作業treeはgit grepやrgで検索する.',
    keywords: ['search', 'code', 'repo', 'extension', '検索', '型名', 'api'],
    docsUrl: 'https://cli.github.com/manual/gh_search_code'
  },
  {
    id: 'gh-api-paginate',
    number: 100,
    tool: 'gh',
    category: 'gh-api',
    title: 'REST APIをpagination付きで読み取る',
    summary: 'GET endpointの全pageを取得し, 応答を一定時間cacheする.',
    usage: '組み込みcommandでは取得できない一覧を, 読み取り専用のREST APIで収集するときに使う.',
    command: 'gh api --paginate --cache 1h "repos/OWNER/REPO/issues?state=open&per_page=100"',
    options: [
      { syntax: '--paginate', description: 'Link headerをたどり, 結果がなくなるまで次pageを取得する.' },
      { syntax: '--cache <DURATION>', description: '応答を指定時間cacheする. 例では1時間保持する.' },
      { syntax: '--jq <EXPRESSION>', description: '各応答をjq式で絞り込んで出力する.' }
    ],
    risk: 'safe',
    warning: '例はGETの読み取り専用endpoint. --fieldは既定methodをPOSTへ変えるため安易に追加せず, API権限とrate limitにも注意する.',
    keywords: ['api', 'rest', 'paginate', 'pagination', 'cache', 'get', '読み取り', 'rate limit'],
    docsUrl: 'https://cli.github.com/manual/gh_api'
  }
] satisfies readonly CommandRecipe[];
