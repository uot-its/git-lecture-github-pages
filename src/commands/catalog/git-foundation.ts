import type { CommandRecipe } from '../model.js';

export const gitFoundationRecipes = [
  {
    id: 'git-config-user-name',
    number: 1,
    tool: 'git',
    category: 'git-setup',
    title: 'commit作者名を設定する',
    summary: 'commitに記録する作者名をユーザー単位で設定する.',
    usage: 'Gitを使い始めるときに, commitへ記録する名前を設定する. メールアドレスは同じ形式でuser.emailへ設定する.',
    command: 'git config --global user.name "YOUR NAME"',
    options: [
      { syntax: '--global', description: '現在のOSユーザーに共通する設定ファイルへ書き込む.' },
      { syntax: '--local', description: '現在のrepositoryだけに設定する. repository内で実行する.' },
      { syntax: '--get <name>', description: '指定した設定値を1件取得する.' }
    ],
    risk: 'caution',
    warning: '既存のuser.nameを上書きする. 設定後にgit config --global --get user.nameで値を確認し, user.emailも別途確認する.',
    keywords: ['作者', 'ユーザー名', 'user.name', '初期設定', 'メール'],
    docsUrl: 'https://git-scm.com/docs/git-config'
  },
  {
    id: 'git-config-show-origin',
    number: 2,
    tool: 'git',
    category: 'git-setup',
    title: '設定値と設定元を確認する',
    summary: '有効なGit設定と, それを読み込んだファイルを一覧表示する.',
    usage: 'global設定とrepository固有設定のどちらが有効かを調べ, 意図しない上書きを見つける.',
    command: 'git config --list --show-origin',
    options: [
      { syntax: '--list', description: '利用可能な設定を一覧表示する.' },
      { syntax: '--show-origin', description: '各設定値を読み込んだファイルや入力元を併記する.' },
      { syntax: '--show-scope', description: 'system, global, localなどの設定範囲を併記する.' }
    ],
    risk: 'safe',
    warning: '設定一覧には認証情報を埋め込んだURLなどが含まれる場合がある. 出力を共有する前に機密値がないか確認する.',
    keywords: ['設定確認', 'config', 'origin', 'scope', 'トラブルシュート'],
    docsUrl: 'https://git-scm.com/docs/git-config'
  },
  {
    id: 'git-init-main',
    number: 3,
    tool: 'git',
    category: 'git-setup',
    title: 'repositoryを初期化する',
    summary: 'mainを初期branchとして新しいGit repositoryを作る.',
    usage: '既存のローカルディレクトリをGitで管理し始める. 実行前に対象ディレクトリが正しいか確認する.',
    command: 'git init -b main',
    options: [
      { syntax: '-b <branch-name>, --initial-branch=<branch-name>', description: '最初に作るbranch名を指定する.' },
      { syntax: '--bare', description: '作業ツリーを持たない共有用repositoryを作る.' },
      { syntax: '--template=<directory>', description: '指定したtemplate directoryの内容を初期ファイルとして使う.' }
    ],
    risk: 'caution',
    warning: '実行場所をpwdなどで確認する. 親repository内へ意図しないnested repositoryを作らない.',
    keywords: ['初期化', '新規repository', 'main', 'initial branch', 'init'],
    docsUrl: 'https://git-scm.com/docs/git-init'
  },
  {
    id: 'git-clone-repository',
    number: 4,
    tool: 'git',
    category: 'git-setup',
    title: 'repositoryを複製する',
    summary: 'remote repositoryの履歴と作業ツリーを手元へ取得する.',
    usage: 'GitHub上のrepositoryへ参加するときに, SSH URLを使ってローカルコピーを作る. OWNER/REPOは対象に置き換える.',
    command: 'git clone git@github.com:OWNER/REPO.git',
    options: [
      { syntax: '--branch <name>', description: 'clone後にcheckoutするbranchまたはtagを指定する.' },
      { syntax: '--depth <depth>', description: '指定した世代数に履歴を限定したshallow cloneを作る.' },
      { syntax: '--recurse-submodules', description: '登録されたsubmoduleも初期化して取得する.' }
    ],
    risk: 'caution',
    warning: 'URLと取得先directoryを確認する. SSH認証が未設定の場合は失敗するため, repositoryの案内に合うURLを使う.',
    keywords: ['取得', '複製', 'clone', 'SSH', 'GitHub'],
    docsUrl: 'https://git-scm.com/docs/git-clone'
  },
  {
    id: 'git-status',
    number: 5,
    tool: 'git',
    category: 'git-inspect',
    title: '現在の状態を確認する',
    summary: '現在branchと, staged・未staged・未追跡の変更を確認する.',
    usage: '作業の開始前, commit前, branch切り替え前に実行し, 次に扱う変更を把握する.',
    command: 'git status',
    options: [
      { syntax: '-s, --short', description: '変更状態を短い2文字形式で表示する.' },
      { syntax: '-b, --branch', description: 'short形式にbranchと追跡先の情報を加える.' },
      { syntax: '--show-stash', description: '退避しているstashの件数も表示する.' }
    ],
    risk: 'safe',
    warning: '差分の内容までは表示しない. commit前はgit diffとgit diff --stagedも併用する.',
    keywords: ['状態', 'working tree', 'staging', '未追跡', 'status'],
    docsUrl: 'https://git-scm.com/docs/git-status'
  },
  {
    id: 'git-diff-working-tree',
    number: 6,
    tool: 'git',
    category: 'git-inspect',
    title: '未stageの差分を確認する',
    summary: '作業ツリーとindexを比較し, まだstageしていない変更を表示する.',
    usage: 'git addの前に変更内容を読み直し, 不要な編集やdebugコードが含まれていないか確認する.',
    command: 'git diff',
    options: [
      { syntax: '--stat', description: 'ファイルごとの変更行数を要約表示する.' },
      { syntax: '--name-only', description: '変更されたファイル名だけを表示する.' },
      { syntax: '--word-diff', description: '行単位ではなく単語単位で差分を表示する.' }
    ],
    risk: 'safe',
    warning: 'stage済みの変更は表示されない. commitへ入る全変更を確認するにはgit diff --stagedも実行する.',
    keywords: ['差分', '未stage', 'working tree', 'index', 'diff'],
    docsUrl: 'https://git-scm.com/docs/git-diff'
  },
  {
    id: 'git-diff-staged',
    number: 7,
    tool: 'git',
    category: 'git-inspect',
    title: 'stage済みの差分を確認する',
    summary: 'indexとHEADを比較し, 次のcommitへ入る変更を表示する.',
    usage: 'commit直前に, stageした変更が意図した単位に収まっているか確認する.',
    command: 'git diff --staged',
    options: [
      { syntax: '--staged, --cached', description: 'HEADに対するindexの差分を表示する.' },
      { syntax: '--stat', description: 'ファイルごとの変更行数を要約表示する.' },
      { syntax: '--check', description: '末尾空白などのwhitespace errorを警告する.' }
    ],
    risk: 'safe',
    warning: '未stageの変更と未追跡ファイルの内容は表示されない. git statusとgit diffも併用する.',
    keywords: ['差分', 'stage済み', 'staged', 'cached', 'commit前'],
    docsUrl: 'https://git-scm.com/docs/git-diff'
  },
  {
    id: 'git-diff-branches',
    number: 8,
    tool: 'git',
    category: 'git-inspect',
    title: 'branch間の差分を確認する',
    summary: '分岐元からfeature branchまでに加わった変更を比較する.',
    usage: 'Pull Requestを作る前に, mainとの共通祖先から作業branchまでの変更範囲を確認する.',
    command: 'git diff main...feature/add-login-button',
    options: [
      { syntax: '--stat', description: 'ファイルごとの変更行数を要約表示する.' },
      { syntax: '--name-status', description: 'ファイル名と追加・変更・削除の状態を表示する.' },
      { syntax: '--check', description: '差分に含まれるwhitespace errorを警告する.' }
    ],
    risk: 'safe',
    warning: '三点指定は共通祖先から右側branchまでを比較する. branch名の順序と比較元が意図どおりか確認する.',
    keywords: ['branch比較', '三点リーダー', 'merge base', 'Pull Request', 'diff'],
    docsUrl: 'https://git-scm.com/docs/git-diff'
  },
  {
    id: 'git-log-graph',
    number: 9,
    tool: 'git',
    category: 'git-inspect',
    title: '履歴をグラフ表示する',
    summary: 'commit履歴とbranchの分岐・統合を1行ずつ表示する.',
    usage: 'branchがどこから分かれ, どこでmergeされたかを短い一覧で把握する.',
    command: 'git log --oneline --graph --all',
    options: [
      { syntax: '--oneline', description: 'commit IDの短縮形と件名を1行で表示する.' },
      { syntax: '--graph', description: '履歴の分岐と統合をASCII graphで描く.' },
      { syntax: '--all', description: 'すべてのrefから到達できるcommitを対象にする.' }
    ],
    risk: 'safe',
    warning: 'remote-tracking refは直前のfetch時点の情報である. remoteの最新履歴が必要なら先にgit fetchする.',
    keywords: ['履歴', 'graph', 'branch', 'commit', 'log'],
    docsUrl: 'https://git-scm.com/docs/git-log'
  },
  {
    id: 'git-log-follow-file',
    number: 10,
    tool: 'git',
    category: 'git-inspect',
    title: 'ファイルの履歴を追跡する',
    summary: 'renameをまたいで, 指定ファイルのcommit履歴を表示する.',
    usage: 'ファイル名が変わったコードの変更理由や, 問題が入った時点を調べる.',
    command: 'git log --follow --oneline -- path/to/file',
    options: [
      { syntax: '--follow', description: '単一ファイルのrename前の履歴も追跡する.' },
      { syntax: '--oneline', description: '各commitを短縮IDと件名の1行で表示する.' },
      { syntax: '-p, --patch', description: '各commitが加えた差分も表示する.' }
    ],
    risk: 'safe',
    warning: '--followは単一path向けで, rename検出はheuristicである. 重要な判断では関連commitの差分も確認する.',
    keywords: ['ファイル履歴', 'rename', '変更理由', 'follow', 'log'],
    docsUrl: 'https://git-scm.com/docs/git-log'
  },
  {
    id: 'git-show-commit',
    number: 11,
    tool: 'git',
    category: 'git-inspect',
    title: 'commitの内容を表示する',
    summary: '指定したcommitのmetadataとpatchを確認する.',
    usage: '直近または特定のcommitが何を変更したかを, commit messageと差分で確認する.',
    command: 'git show --stat HEAD',
    options: [
      { syntax: '--stat', description: 'patchの代わりにファイルごとの変更量を表示する.' },
      { syntax: '--name-only', description: '変更されたファイル名を表示する.' },
      { syntax: '--format=<format>', description: 'commit metadataの表示形式を指定する.' }
    ],
    risk: 'safe',
    warning: '--statは変更量の要約で, 行ごとのpatchを省略する. 詳細確認では--statを外して表示する.',
    keywords: ['commit確認', 'HEAD', 'patch', '変更量', 'show'],
    docsUrl: 'https://git-scm.com/docs/git-show'
  },
  {
    id: 'git-blame-lines',
    number: 12,
    tool: 'git',
    category: 'git-inspect',
    title: '行ごとの変更元を調べる',
    summary: '指定範囲の各行を最後に変更したcommitと作者を表示する.',
    usage: 'コードの背景を調べる入口として, 関連commitを特定する. 人を責める用途ではなく履歴調査に使う.',
    command: 'git blame -L 20,40 src/main.ts',
    options: [
      { syntax: '-L <start>,<end>', description: '表示する行範囲を限定する.' },
      { syntax: '-w', description: '空白だけの変更を無視して変更元を追跡する.' },
      { syntax: '-C', description: '同じcommit内の別ファイルから移動・コピーされた行も検出する.' }
    ],
    risk: 'safe',
    warning: '表示される作者は最後に行を変更した記録であり, 設計意図や現在の担当者を示すとは限らない. 関連commitも確認する.',
    keywords: ['行履歴', '作者', 'commit調査', '変更元', 'blame'],
    docsUrl: 'https://git-scm.com/docs/git-blame'
  },
  {
    id: 'git-grep-text',
    number: 13,
    tool: 'git',
    category: 'git-inspect',
    title: '追跡ファイル内を検索する',
    summary: 'Gitが把握しているファイルから文字列やpatternを高速に検索する.',
    usage: '関数名, TODO, 設定キーなどが使われている場所をrepository内で探す.',
    command: 'git grep -n "TODO" -- "*.ts"',
    options: [
      { syntax: '-n, --line-number', description: '一致した行の行番号を表示する.' },
      { syntax: '-i, --ignore-case', description: '英字の大文字・小文字を区別せず検索する.' },
      { syntax: '-l, --files-with-matches', description: '一致した行ではなくファイル名だけを表示する.' }
    ],
    risk: 'safe',
    warning: '引用符を外すとshellが*.tsを先に展開する場合がある. pathspecは引用したまま使う.',
    keywords: ['文字列検索', 'コード検索', 'TODO', 'pathspec', 'grep'],
    docsUrl: 'https://git-scm.com/docs/git-grep'
  },
  {
    id: 'git-check-ignore',
    number: 14,
    tool: 'git',
    category: 'git-inspect',
    title: 'ignoreされた理由を確認する',
    summary: 'pathに一致したignore規則と, その定義場所を表示する.',
    usage: '追加したいファイルがgit statusに現れないときに, どの.gitignore規則が作用したか調べる.',
    command: 'git check-ignore -v path/to/file',
    options: [
      { syntax: '-v, --verbose', description: '一致したpattern, 定義ファイル, 行番号を表示する.' },
      { syntax: '--no-index', description: 'すでに追跡されているファイルも確認対象にする.' },
      { syntax: '-q, --quiet', description: '出力せず, 終了statusだけで一致を判定する.' }
    ],
    risk: 'safe',
    warning: '既に追跡されているファイルは通常の確認対象外である. 追跡済みpathも調べる場合は--no-indexを使う.',
    keywords: ['gitignore', '無視', 'pattern', '追跡されない', 'check-ignore'],
    docsUrl: 'https://git-scm.com/docs/git-check-ignore'
  },
  {
    id: 'git-add-file',
    number: 15,
    tool: 'git',
    category: 'git-record',
    title: 'ファイルをstageする',
    summary: '指定したファイルの現在の内容を次のcommit候補へ加える.',
    usage: 'commitへ含める変更をファイル単位で選ぶ. 実行後はgit diff --stagedで内容を確認する.',
    command: 'git add README.md',
    options: [
      { syntax: '-n, --dry-run', description: '実際にはstageせず, 対象になるpathを表示する.' },
      { syntax: '-v, --verbose', description: 'stageしたpathを表示する.' },
      { syntax: '-N, --intent-to-add', description: '内容はstageせず, pathを追加予定として記録する.' }
    ],
    risk: 'caution',
    warning: 'stage後に同じファイルを編集しても追加分は自動更新されない. git diff --stagedでcommit対象を確認する.',
    keywords: ['stage', 'staging area', 'index', 'ファイル追加', 'add'],
    docsUrl: 'https://git-scm.com/docs/git-add'
  },
  {
    id: 'git-add-patch',
    number: 16,
    tool: 'git',
    category: 'git-record',
    title: '変更の一部だけをstageする',
    summary: '差分をhunkごとに確認し, commitへ含める部分を対話的に選ぶ.',
    usage: '1ファイルに複数の目的の変更が混在したときに, commit単位を分ける.',
    command: 'git add -p src/main.ts',
    options: [
      { syntax: '-p, --patch', description: '差分の各hunkを対話形式でstageする.' },
      { syntax: '-e, --edit', description: '適用するpatchをeditorで直接編集する.' },
      { syntax: '-n, --dry-run', description: '実際にはstageせず, 対象になるpathを表示する.' }
    ],
    risk: 'caution',
    warning: 'hunkの分け方によってはcommit単体でbuildやtestが通らなくなる. stage後の差分を確認して検証する.',
    keywords: ['部分stage', 'hunk', '対話', 'commit分割', 'add patch'],
    docsUrl: 'https://git-scm.com/docs/git-add'
  },
  {
    id: 'git-add-all',
    number: 17,
    tool: 'git',
    category: 'git-record',
    title: '全変更をstageする',
    summary: '作業ツリー全体の追加・変更・削除をindexへ反映する.',
    usage: 'repository内の全変更を1つのcommitへ含めると決めたときに使う. 先にgit statusで対象を確認する.',
    command: 'git add -A',
    options: [
      { syntax: '-A, --all', description: 'pathの追加・変更・削除をすべてindexへ反映する.' },
      { syntax: '-n, --dry-run', description: '実際にはstageせず, 対象になるpathを表示する.' },
      { syntax: '-v, --verbose', description: 'stageしたpathを表示する.' }
    ],
    risk: 'caution',
    warning: '秘密情報や一時ファイルまで含めないよう, 実行前後にgit statusとgit diff --stagedを確認する.',
    keywords: ['全stage', '追加', '変更', '削除', 'add all'],
    docsUrl: 'https://git-scm.com/docs/git-add'
  },
  {
    id: 'git-restore-staged',
    number: 18,
    tool: 'git',
    category: 'git-record',
    title: 'stageを取り消す',
    summary: '作業ツリーの編集を残したまま, 指定ファイルをindexから外す.',
    usage: '誤ってstageした変更を次のcommitから除外し, 編集内容は手元に残す.',
    command: 'git restore --staged path/to/file',
    options: [
      { syntax: '--staged', description: '作業ツリーではなくindexを復元対象にする.' },
      { syntax: '--source=<tree>', description: '復元元にするcommitやtreeを指定する.' },
      { syntax: '-p, --patch', description: '復元するhunkを対話形式で選ぶ.' }
    ],
    risk: 'caution',
    warning: '既定の復元元はHEADで, 作業ツリーの編集は残る. 実行後にgit statusとgit diffで状態を確認する.',
    keywords: ['stage取消', 'unstage', 'index', '編集を残す', 'restore staged'],
    docsUrl: 'https://git-scm.com/docs/git-restore'
  },
  {
    id: 'git-commit-message',
    number: 19,
    tool: 'git',
    category: 'git-record',
    title: '変更をcommitする',
    summary: 'stage済みの変更をmessage付きのsnapshotとして履歴へ記録する.',
    usage: 'レビューできる意味のまとまりごとに変更を記録する. messageは変更理由が分かる内容にする.',
    command: 'git commit -m "docs: update README"',
    options: [
      { syntax: '-m <message>, --message=<message>', description: 'command lineでcommit messageを指定する.' },
      { syntax: '--dry-run', description: 'commitされるpathと残るpathを表示し, commitは作らない.' },
      { syntax: '-v, --verbose', description: 'message編集画面にstage済み差分を表示する.' }
    ],
    risk: 'caution',
    warning: 'commitされるのはstage済み変更だけである. git statusとgit diff --stagedで漏れや秘密情報がないか確認する.',
    keywords: ['記録', 'snapshot', 'message', '履歴', 'commit'],
    docsUrl: 'https://git-scm.com/docs/git-commit'
  },
  {
    id: 'git-commit-amend',
    number: 20,
    tool: 'git',
    category: 'git-record',
    title: '直前のcommitを修正する',
    summary: 'stage済み変更を取り込み, 直前のcommitを新しいcommitへ置き換える.',
    usage: 'push前の直前commitに入れ忘れた変更を足すか, 作者情報やmessageを修正する.',
    command: 'git commit --amend --no-edit',
    options: [
      { syntax: '--amend', description: '現在のHEADを親にせず, 直前のcommitを置き換える.' },
      { syntax: '--no-edit', description: '直前のcommit messageを変更せず再利用する.' },
      { syntax: '--reset-author', description: '作者を現在の利用者へ変更し, 作者日時も更新する.' }
    ],
    risk: 'caution',
    warning: 'commit IDが変わる. 共有済みcommitには原則使わず, 新しいcommitで訂正する.',
    keywords: ['直前commit', '修正', 'message変更', '履歴書換え', 'amend'],
    docsUrl: 'https://git-scm.com/docs/git-commit'
  },
  {
    id: 'git-rm-cached',
    number: 21,
    tool: 'git',
    category: 'git-record',
    title: '追跡だけを解除する',
    summary: '作業ツリーのファイルを残し, Gitのindexから指定pathを削除する.',
    usage: '誤って追跡した設定ファイルなどをローカルに残したまま, 次のcommitでrepositoryから除く.',
    command: 'git rm --cached path/to/file',
    options: [
      { syntax: '--cached', description: '作業ツリーのファイルを残し, indexだけから削除する.' },
      { syntax: '-r', description: 'directory配下を再帰的に処理する.' },
      { syntax: '-n, --dry-run', description: '実際には削除せず, 対象pathを表示する.' }
    ],
    risk: 'caution',
    warning: '再びstageされないよう, 必要なら対象pathを.gitignoreへ追加する. 秘密情報が過去の履歴から消える操作ではない.',
    keywords: ['追跡解除', 'index削除', 'ファイルを残す', 'gitignore', 'rm cached'],
    docsUrl: 'https://git-scm.com/docs/git-rm'
  },
  {
    id: 'git-switch-create',
    number: 22,
    tool: 'git',
    category: 'git-branch',
    title: '新しいbranchを作って切り替える',
    summary: '現在位置から新規branchを作成し, そのbranchへ移動する.',
    usage: 'mainを最新にした後, 機能追加や修正ごとの作業branchを開始する.',
    command: 'git switch -c feature/add-login-button',
    options: [
      { syntax: '-c <new-branch>', description: '新しいbranchを作成して切り替える.' },
      { syntax: '--track[=(direct|inherit)]', description: '新規branchのupstream設定方法を指定する.' },
      { syntax: '--no-track', description: '開始点にかかわらずupstreamを設定しない.' }
    ],
    risk: 'caution',
    warning: '新規branchは現在のHEADから作られる. mainから始める場合は, mainへ切り替えて更新済みか確認する.',
    keywords: ['branch作成', '作業branch', 'feature', '切替', 'switch'],
    docsUrl: 'https://git-scm.com/docs/git-switch'
  },
  {
    id: 'git-switch-existing',
    number: 23,
    tool: 'git',
    category: 'git-branch',
    title: '既存branchへ切り替える',
    summary: '作業ツリーとHEADを指定したbranchへ切り替える.',
    usage: '別の作業へ移るときや, mainを更新するときに対象branchへ移動する.',
    command: 'git switch main',
    options: [
      { syntax: '--guess', description: 'localにないbranch名から, 対応するremote-tracking branchを推測する.' },
      { syntax: '--detach', description: 'branchを動かさず, 指定commitを直接checkoutする.' },
      { syntax: '-m, --merge', description: '作業ツリーの変更と切替先の差分を3-way mergeする.' }
    ],
    risk: 'caution',
    warning: '未commitの変更があると切り替えに失敗するか競合する. 先にgit statusを確認し, 必要ならcommitまたはstashする.',
    keywords: ['branch切替', 'main', '前のbranch', 'checkout', 'switch'],
    docsUrl: 'https://git-scm.com/docs/git-switch'
  },
  {
    id: 'git-branch-verbose',
    number: 24,
    tool: 'git',
    category: 'git-branch',
    title: 'branchと追跡先を確認する',
    summary: 'local branchの先端commitとupstreamとの差を一覧表示する.',
    usage: '削除やpushの前に, branchがどのremote branchを追跡し, ahead・behindかを確認する.',
    command: 'git branch -vv',
    options: [
      { syntax: '-v, -vv, --verbose', description: '先端commitを表示し, 2回指定するとworktree pathやupstream名も加える.' },
      { syntax: '-a, --all', description: 'local branchとremote-tracking branchを表示する.' },
      { syntax: '--sort=<key>', description: 'refnameやcommitterdateなどのkeyで並べ替える.' }
    ],
    risk: 'safe',
    warning: 'ahead・behindとupstream情報はlocalのremote-tracking refを基準にする. 最新情報が必要なら先にgit fetchする.',
    keywords: ['branch一覧', 'upstream', 'ahead', 'behind', 'branch verbose'],
    docsUrl: 'https://git-scm.com/docs/git-branch'
  },
  {
    id: 'git-branch-delete-merged',
    number: 25,
    tool: 'git',
    category: 'git-branch',
    title: '統合済みbranchを削除する',
    summary: '指定branchがupstreamまたはHEADへ統合済みの場合にlocal refを削除する.',
    usage: 'merge後の作業branchをローカルから片付ける. 削除対象以外のbranchへ切り替えてから実行する.',
    command: 'git branch -d feature/done',
    options: [
      { syntax: '-d, --delete', description: '統合済みと判定できるbranchだけを削除する.' },
      { syntax: '--merged [<commit>]', description: '指定commitへ到達済みのbranchだけを一覧表示する.' },
      { syntax: '--no-merged [<commit>]', description: '指定commitへ未統合のbranchだけを一覧表示する.' }
    ],
    risk: 'caution',
    warning: '先にgit branch --mergedで対象を確認する. 未統合branchも消す強制削除はこのページでは扱わない.',
    keywords: ['branch削除', '統合済み', 'merged', '掃除', 'branch delete'],
    docsUrl: 'https://git-scm.com/docs/git-branch'
  },
  {
    id: 'git-tag-annotated',
    number: 26,
    tool: 'git',
    category: 'git-branch',
    title: '注釈付きtagを作る',
    summary: 'releaseなどの節目に, 作者・日時・messageを持つannotated tagを付ける.',
    usage: 'release対象commitを確認し, version名と説明を記録する. tagのpushはbranchのpushと別に確認する.',
    command: 'git tag -a v1.0.0 -m "Release v1.0.0"',
    options: [
      { syntax: '-a, --annotate', description: 'tag objectを持つannotated tagを作る.' },
      { syntax: '-m <message>, --message=<message>', description: 'tag messageをcommand lineで指定する.' },
      { syntax: '-s, --sign', description: '既定の署名鍵でGPG署名付きtagを作る.' }
    ],
    risk: 'caution',
    warning: 'tagは既定で現在のHEADに作られ, 作成しただけではremoteへ送られない. 対象commitを確認してから共有する.',
    keywords: ['tag', 'release', 'version', 'annotated', '署名'],
    docsUrl: 'https://git-scm.com/docs/git-tag'
  }
] as const satisfies readonly CommandRecipe[];
