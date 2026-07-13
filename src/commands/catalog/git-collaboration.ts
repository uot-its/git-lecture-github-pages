import type { CommandRecipe } from '../model.js';

export const gitCollaborationRecipes = [
  {
    id: 'git-remote-list',
    number: 27,
    tool: 'git',
    category: 'git-remote',
    title: 'remoteのURLを確認する',
    summary: '登録済みremoteの名前とfetch・push URLを一覧表示する.',
    usage: 'fetchやpushの前に, originが意図したrepositoryを指しているか確認する.',
    command: 'git remote -v',
    options: [
      { syntax: '-v, --verbose', description: 'remote名に対応するfetch・push URLを表示する.' }
    ],
    risk: 'safe',
    warning: 'URLへ認証情報が埋め込まれている場合は出力にも現れる. 結果を共有する前に機密値がないか確認する.',
    keywords: ['remote', 'origin', 'URL', 'fetch先', 'push先'],
    docsUrl: 'https://git-scm.com/docs/git-remote'
  },
  {
    id: 'git-remote-add',
    number: 28,
    tool: 'git',
    category: 'git-remote',
    title: 'remoteを追加する',
    summary: '名前とURLを指定して新しいremoteを登録する.',
    usage: 'ローカルで始めたrepositoryをGitHubへ接続するか, upstream repositoryを追加する.',
    command: 'git remote add origin git@github.com:OWNER/REPO.git',
    options: [
      { syntax: '-f', description: 'remoteの登録直後にgit fetchを実行する.' },
      { syntax: '-t <branch>', description: '追跡対象にするremote branchを限定する. 複数回指定できる.' },
      { syntax: '--no-tags', description: 'remoteからtagを自動取得しない設定にする.' }
    ],
    risk: 'caution',
    warning: '同名remoteがないこととURLを確認する. 追加後はgit remote -vでfetch・push先を再確認する.',
    keywords: ['remote追加', 'origin', 'upstream', 'SSH URL', 'remote add'],
    docsUrl: 'https://git-scm.com/docs/git-remote'
  },
  {
    id: 'git-fetch-prune',
    number: 29,
    tool: 'git',
    category: 'git-remote',
    title: 'remoteの最新状態を取得する',
    summary: 'originからrefとobjectを取得し, 消えたremote-tracking refを整理する.',
    usage: '作業開始時や統合前に, 作業ツリーを変えずにremoteのbranch・tag情報を更新する.',
    command: 'git fetch --prune origin',
    options: [
      { syntax: '-p, --prune', description: 'remoteに存在しなくなったremote-tracking refを取得前に削除する.' },
      { syntax: '--dry-run', description: '実際には更新せず, 行われる変更を表示する.' },
      { syntax: '--prune-tags', description: 'refspecで取得するlocal tagもprune対象にする.' }
    ],
    risk: 'caution',
    warning: 'local branchは削除しないが, --prune-tagsはlocal tagを削除し得る. 必要なら先に--dry-runで対象を確認する.',
    keywords: ['取得', 'remote更新', 'prune', 'remote-tracking branch', 'fetch'],
    docsUrl: 'https://git-scm.com/docs/git-fetch'
  },
  {
    id: 'git-pull-ff-only',
    number: 30,
    tool: 'git',
    category: 'git-remote',
    title: 'fast-forwardだけで更新する',
    summary: 'remoteの変更を取得し, 分岐がなければ現在branchを前へ進める.',
    usage: 'mainなどの共有branchを更新するときに, 意図しないmerge commitを作らず同期する.',
    command: 'git pull --ff-only',
    options: [
      { syntax: '--ff-only', description: 'fast-forwardできない場合は統合せず失敗させる.' },
      { syntax: '--rebase[=true|merges|interactive]', description: 'mergeの代わりにlocal commitを取得先へ積み直す.' },
      { syntax: '--autostash', description: '処理前に一時stashを作り, 処理後に適用する.' }
    ],
    risk: 'caution',
    warning: '作業ツリーの状態と現在branchをgit statusで確認してから実行する. 分岐して失敗した場合は, mergeかrebaseかを選ぶ.',
    keywords: ['更新', 'fast-forward', '同期', 'main', 'pull'],
    docsUrl: 'https://git-scm.com/docs/git-pull'
  },
  {
    id: 'git-push-set-upstream',
    number: 31,
    tool: 'git',
    category: 'git-remote',
    title: '新しいbranchを初回pushする',
    summary: 'local branchをoriginへ送り, 今後のpush・pull先として設定する.',
    usage: '作業branchを初めてGitHubへ共有し, Pull Requestを作れる状態にする.',
    command: 'git push -u origin feature/add-profile',
    options: [
      { syntax: '-u, --set-upstream', description: 'pushに成功したbranchのupstreamを設定する.' },
      { syntax: '-n, --dry-run', description: '実際には送信せず, 更新予定のrefを確認する.' },
      { syntax: '--porcelain', description: '処理結果をscriptで扱いやすいtab区切り形式でstdoutへ出す.' }
    ],
    risk: 'caution',
    warning: '秘密情報や不要なcommitがないか確認し, 不安な場合は--dry-runで送信先branchを確かめる.',
    keywords: ['初回push', 'upstream', '作業branch', '共有', 'set-upstream'],
    docsUrl: 'https://git-scm.com/docs/git-push'
  },
  {
    id: 'git-push-current',
    number: 32,
    tool: 'git',
    category: 'git-remote',
    title: '現在branchをpushする',
    summary: '設定済みupstreamへ, 現在branchの新しいcommitを送る.',
    usage: '初回pushでupstreamを設定した後に, 追加commitを同じremote branchへ共有する.',
    command: 'git push',
    options: [
      { syntax: '-n, --dry-run', description: '実際には送信せず, 更新予定のrefを確認する.' },
      { syntax: '--porcelain', description: '処理結果をscriptで扱いやすいtab区切り形式でstdoutへ出す.' },
      { syntax: '--follow-tags', description: 'push対象commitから到達できる, remoteにないannotated tagも送る.' }
    ],
    risk: 'caution',
    warning: 'git statusとgit logでbranch・commitを確認する. upstreamが不明な場合はgit branch -vvで送信先を確認する.',
    keywords: ['通常push', 'upstream', 'commit共有', 'remote branch', 'push'],
    docsUrl: 'https://git-scm.com/docs/git-push'
  },
  {
    id: 'git-merge-no-ff',
    number: 33,
    tool: 'git',
    category: 'git-integrate',
    title: 'merge commitを作って統合する',
    summary: 'fast-forward可能でもmerge commitを作り, branchのまとまりを履歴に残す.',
    usage: 'feature branchの境界を履歴上に残す運用で, 統合先branchから作業branchをmergeする.',
    command: 'git merge --no-ff feature/add-login-button',
    options: [
      { syntax: '--no-ff', description: 'fast-forward可能な場合もmerge commitを作る.' },
      { syntax: '--no-commit', description: 'merge結果を作業ツリーとindexへ反映し, commit直前で停止する.' },
      { syntax: '-e, --edit', description: '自動生成されたmerge messageをcommit前に編集する.' }
    ],
    risk: 'caution',
    warning: '統合先branchと作業ツリーが正しいか確認する. 結果を先に確認したい場合は--no-commitを併用する.',
    keywords: ['統合', 'merge commit', 'no-ff', 'feature branch', 'merge'],
    docsUrl: 'https://git-scm.com/docs/git-merge'
  },
  {
    id: 'git-merge-abort',
    number: 34,
    tool: 'git',
    category: 'git-integrate',
    title: '進行中のmergeを中止する',
    summary: '競合解消中のmergeを中止し, merge開始前の状態への復元を試みる.',
    usage: '競合の解消方針を見直したいときに, mergeを完了せず元の状態へ戻す.',
    command: 'git merge --abort',
    options: [
      { syntax: '--abort', description: '競合中のmergeを中止し, merge前の状態への復元を試みる.' },
      { syntax: '--quit', description: 'indexと作業ツリーを保ったまま, 進行中mergeのmetadataを消す.' },
      { syntax: '--continue', description: '競合を解消してstageした後, merge処理を再開する.' }
    ],
    risk: 'caution',
    warning: 'merge開始前から未commit変更があった場合, 完全に復元できないことがある. 統合前にcommitまたはstashしておく.',
    keywords: ['merge中止', '競合', 'conflict', '復元', 'abort'],
    docsUrl: 'https://git-scm.com/docs/git-merge'
  },
  {
    id: 'git-rebase-onto-main',
    number: 35,
    tool: 'git',
    category: 'git-integrate',
    title: 'commitをmainへ積み直す',
    summary: '現在branch固有のcommitを, 更新されたmainの先端へ順に適用し直す.',
    usage: 'merge前に作業branchの開始点をmainの最新版へ揃え, 直線的な履歴にする.',
    command: 'git rebase main',
    options: [
      { syntax: '-i, --interactive', description: '適用順, squash, message変更などを対話的に指定する.' },
      { syntax: '--autostash', description: '開始前に一時stashを作り, 終了後に適用する.' },
      { syntax: '--rebase-merges', description: 'merge commitを捨てず, branch構造の再現を試みる.' }
    ],
    risk: 'caution',
    warning: '対象commitのIDが変わる. 共有済みbranchでは共同作業者と合意し, 開始前にbackup branchを作る.',
    keywords: ['積み直し', '履歴整理', 'main', 'commit ID', 'rebase'],
    docsUrl: 'https://git-scm.com/docs/git-rebase'
  },
  {
    id: 'git-rebase-continue',
    number: 36,
    tool: 'git',
    category: 'git-integrate',
    title: 'rebaseを再開する',
    summary: '競合を解消してstageした後, 残りのcommitの適用を続ける.',
    usage: 'rebase中のconflictを修正し, git addで解消済みにしてから処理を進める.',
    command: 'git rebase --continue',
    options: [
      { syntax: '--continue', description: '競合解消後にrebase処理を再開する.' },
      { syntax: '--skip', description: '現在適用中のpatchを省略して次へ進む.' },
      { syntax: '--show-current-patch', description: '現在適用しようとしているpatchを表示する.' }
    ],
    risk: 'caution',
    warning: '--skipは変更を失う可能性がある. git diffと--show-current-patchで内容を確認し, 不明なら--abortを選ぶ.',
    keywords: ['rebase再開', '競合解消', 'conflict', 'patch', 'continue'],
    docsUrl: 'https://git-scm.com/docs/git-rebase'
  },
  {
    id: 'git-rebase-abort',
    number: 37,
    tool: 'git',
    category: 'git-integrate',
    title: 'rebaseを中止する',
    summary: '進行中のrebaseを中止し, 開始前のbranchへ戻す.',
    usage: '競合解消や履歴編集の方針を見直すため, rebase全体を取り消す.',
    command: 'git rebase --abort',
    options: [
      { syntax: '--abort', description: 'rebaseを中止し, 元のbranchとHEADへ戻す.' },
      { syntax: '--quit', description: 'HEADと作業ツリーを保ったまま, rebaseの進行状態だけを消す.' },
      { syntax: '--continue', description: '競合解消後にrebase処理を再開する.' }
    ],
    risk: 'caution',
    warning: '中止後も作業ツリーやstashの状態をgit statusとgit stash listで確認し, 必要な変更が残っているか確かめる.',
    keywords: ['rebase中止', '元に戻す', '競合', '履歴編集', 'abort'],
    docsUrl: 'https://git-scm.com/docs/git-rebase'
  },
  {
    id: 'git-cherry-pick-commit',
    number: 38,
    tool: 'git',
    category: 'git-integrate',
    title: '特定commitだけを取り込む',
    summary: '別branchの指定commitが導入した変更を現在branchへ適用する.',
    usage: '緊急修正など, branch全体ではなく選んだcommitだけが必要なときに使う. COMMIT_SHAは対象IDへ置き換える.',
    command: 'git cherry-pick COMMIT_SHA',
    options: [
      { syntax: '-n, --no-commit', description: '変更を作業ツリーとindexへ適用し, commitは作らない.' },
      { syntax: '-e, --edit', description: 'commitを作る前にmessageを編集する.' },
      { syntax: '-s, --signoff', description: 'commit message末尾にSigned-off-by trailerを追加する.' }
    ],
    risk: 'caution',
    warning: '新しいcommit IDが作られ, 同じ変更を後でmergeすると競合する場合がある. --no-commitで差分確認してから記録できる.',
    keywords: ['commit取込', '選択統合', 'hotfix', 'COMMIT_SHA', 'cherry-pick'],
    docsUrl: 'https://git-scm.com/docs/git-cherry-pick'
  },
  {
    id: 'git-stash-push',
    number: 39,
    tool: 'git',
    category: 'git-stash',
    title: '作業途中の変更を退避する',
    summary: '追跡ファイルの変更をstashへ保存し, 作業ツリーを戻す.',
    usage: 'commit前の作業を保ったままbranchを切り替えるか, 緊急対応を始める.',
    command: 'git stash push -m "before fixing conflict"',
    options: [
      { syntax: '-m <message>, --message=<message>', description: 'stashの目的が分かる説明を付ける.' },
      { syntax: '-u, --include-untracked', description: '未追跡ファイルもstashへ含める.' },
      { syntax: '-k, --keep-index', description: 'indexの内容をstashへ記録しつつ, stage済み変更を作業ツリーに残す.' }
    ],
    risk: 'caution',
    warning: '既定では未追跡ファイルを退避しない. 実行後にgit statusとgit stash listで退避結果を確認する.',
    keywords: ['一時退避', '作業途中', 'branch切替', 'stash message', 'stash push'],
    docsUrl: 'https://git-scm.com/docs/git-stash'
  },
  {
    id: 'git-stash-list',
    number: 40,
    tool: 'git',
    category: 'git-stash',
    title: 'stashを一覧表示する',
    summary: '保存されているstashを新しい順に表示する.',
    usage: '復元するstashの識別子と, 退避時のbranch・messageを確認する.',
    command: 'git stash list',
    options: [
      { syntax: '--oneline', description: '各stashを1行の短い形式で表示する.' },
      { syntax: '--date=<format>', description: 'stash reflogの日付表示形式を指定する.' },
      { syntax: '--format=<format>', description: '表示するref情報の書式を指定する.' }
    ],
    risk: 'safe',
    warning: '一覧だけでは退避内容を判断できない. 復元や削除の前にgit stash show --patchで対象を確認する.',
    keywords: ['stash一覧', 'stash識別子', 'stash@{0}', '退避確認', 'stash list'],
    docsUrl: 'https://git-scm.com/docs/git-stash'
  },
  {
    id: 'git-stash-show-patch',
    number: 41,
    tool: 'git',
    category: 'git-stash',
    title: 'stashの差分を確認する',
    summary: '指定stashに保存された変更をpatchで表示する.',
    usage: 'stashを適用する前に, 退避した内容が現在の作業に必要かを確認する.',
    command: 'git stash show --patch stash@{0}',
    options: [
      { syntax: '-p, --patch', description: '変更量の要約ではなくpatch全体を表示する.' },
      { syntax: '--stat', description: 'ファイルごとの変更行数を要約表示する.' },
      { syntax: '-u, --include-untracked', description: 'stashに保存された未追跡ファイルも差分へ含める.' }
    ],
    risk: 'safe',
    warning: 'patchには秘密情報が含まれる場合がある. 出力を共有する前に内容を確認する.',
    keywords: ['stash差分', 'patch', '退避内容', 'stash@{0}', 'stash show'],
    docsUrl: 'https://git-scm.com/docs/git-stash'
  },
  {
    id: 'git-stash-pop',
    number: 42,
    tool: 'git',
    category: 'git-stash',
    title: 'stashを適用して削除する',
    summary: '指定stashを作業ツリーへ適用し, 成功したstashを一覧から取り除く.',
    usage: '一時退避していた作業を元のbranchへ戻し, 作業を再開する.',
    command: 'git stash pop stash@{0}',
    options: [
      { syntax: '--index', description: '作業ツリーに加え, 退避前のstage状態の復元も試みる.' },
      { syntax: '-q, --quiet', description: 'error以外のfeedbackを表示しない.' }
    ],
    risk: 'caution',
    warning: '先にgit stash show --patchで内容を確認する. 確認後もstashを残したい場合はgit stash applyを使う.',
    keywords: ['stash復元', '適用', '削除', '競合', 'stash pop'],
    docsUrl: 'https://git-scm.com/docs/git-stash'
  },
  {
    id: 'git-revert-commit',
    number: 43,
    tool: 'git',
    category: 'git-recover',
    title: 'commitを打ち消す',
    summary: '指定commitの変更を逆向きに適用する新しいcommitを作る.',
    usage: '共有済み履歴を書き換えずに, 問題のある変更を取り消す. COMMIT_SHAは対象IDへ置き換える.',
    command: 'git revert --no-edit COMMIT_SHA',
    options: [
      { syntax: '--no-edit', description: '自動生成されたrevert messageを編集せず使う.' },
      { syntax: '-n, --no-commit', description: '逆向きの変更をindexと作業ツリーへ適用し, commitは作らない.' },
      { syntax: '-m <parent-number>, --mainline <parent-number>', description: 'merge commitを戻すときに基準とする親を指定する.' }
    ],
    risk: 'caution',
    warning: '対象commitと影響範囲をgit showで確認する. 複雑な変更は--no-commitで結果を検証してからcommitする.',
    keywords: ['取消', '共有済みcommit', '打消しcommit', 'COMMIT_SHA', 'revert'],
    docsUrl: 'https://git-scm.com/docs/git-revert'
  },
  {
    id: 'git-reflog',
    number: 44,
    tool: 'git',
    category: 'git-recover',
    title: 'HEADの移動履歴を調べる',
    summary: 'commit, reset, rebaseなどによるlocal refの更新履歴を表示する.',
    usage: 'branchやcommitを誤って動かした後に, 復旧元となる以前のcommit IDを探す.',
    command: 'git reflog --date=iso',
    options: [
      { syntax: '--date=<format>', description: 'reflog entryの日付表示形式を指定する.' },
      { syntax: '--all', description: 'すべてのrefのreflogを表示する.' },
      { syntax: '--format=<format>', description: 'entryの表示書式を指定する.' }
    ],
    risk: 'safe',
    warning: 'reflogはlocal固有で, 保持期限後のentryは失われる. 復旧対象を見つけたらbackup branchなどで参照を残す.',
    keywords: ['復旧', 'HEAD履歴', '消えたcommit', 'reset調査', 'reflog'],
    docsUrl: 'https://git-scm.com/docs/git-reflog'
  },
  {
    id: 'git-reset-soft',
    number: 45,
    tool: 'git',
    category: 'git-recover',
    title: '直前commitだけを取り消す',
    summary: 'HEADを1つ前へ戻し, indexと作業ツリーの変更は保持する.',
    usage: 'push前の直前commitを分け直すかmessageを作り直すため, 変更をstage済みのまま戻す.',
    command: 'git reset --soft HEAD~1',
    options: [
      { syntax: '--soft', description: 'HEADだけを移動し, indexと作業ツリーは変更しない.' },
      { syntax: '--mixed', description: 'HEADとindexを戻し, 作業ツリーの変更は残す. resetの既定mode.' },
      { syntax: '--keep', description: 'HEADを移動し, local変更と競合する場合は中止する.' }
    ],
    risk: 'caution',
    warning: '共有済みbranchの履歴は戻さない. 実行前のcommit IDをgit rev-parse HEADなどで控え, 必要ならbackup branchを作る.',
    keywords: ['commit取消', '変更保持', 'HEAD移動', 'commit分割', 'reset soft'],
    docsUrl: 'https://git-scm.com/docs/git-reset'
  },
  {
    id: 'git-restore-working-tree',
    number: 46,
    tool: 'git',
    category: 'git-recover',
    title: '作業ツリーの変更を破棄する',
    summary: '指定ファイルの未stage変更を復元元の内容へ戻す.',
    usage: '不要と確認できたローカル編集だけを取り消す. path/to/fileは対象ファイルへ置き換える.',
    command: 'git restore path/to/file',
    options: [
      { syntax: '--source=<tree>', description: '復元元にするcommit, branch, tagなどを指定する.' },
      { syntax: '-p, --patch', description: '破棄するhunkを対話形式で選ぶ.' },
      { syntax: '-W, --worktree', description: '作業ツリーを復元対象にする. 未指定時の既定動作.' }
    ],
    risk: 'danger',
    warning: '未stage変更は通常のGit操作では復旧できない. 先にgit diff -- path/to/fileで差分を確認し, 必要ならgit stash push -m "backup before restore"で退避する.',
    keywords: ['変更破棄', 'ファイル復元', '未stage', 'working tree', 'restore'],
    docsUrl: 'https://git-scm.com/docs/git-restore'
  },
  {
    id: 'git-push-delete-remote-branch',
    number: 47,
    tool: 'git',
    category: 'git-recover',
    title: 'remote branchを削除する',
    summary: 'origin上の指定branch refを削除する.',
    usage: 'Pull Requestのmerge後など, 不要になった共有branchをremoteから片付ける.',
    command: 'git push origin --delete feature/obsolete',
    options: [
      { syntax: '-d, --delete', description: '指定したremote refを削除する.' },
      { syntax: '-n, --dry-run', description: '実際には削除せず, 更新予定のrefを表示する.' },
      { syntax: '--porcelain', description: '処理結果をscriptで扱いやすいtab区切り形式でstdoutへ出す.' }
    ],
    risk: 'danger',
    warning: '共同作業者とPull Requestの状態を確認する. 先にgit push --dry-run origin --delete feature/obsoleteで削除対象を確認する.',
    keywords: ['remote branch削除', 'origin', '共有branch', 'cleanup', 'push delete'],
    docsUrl: 'https://git-scm.com/docs/git-push'
  },
  {
    id: 'git-reset-hard',
    number: 48,
    tool: 'git',
    category: 'git-recover',
    title: 'HEADへ完全に戻す',
    summary: 'indexと作業ツリーをHEADに合わせ, 追跡ファイルの変更を破棄する.',
    usage: '現在の追跡済み変更をすべて捨てて, 直近commitと同じ状態へ戻す必要がある場合だけ使う.',
    command: 'git reset --hard HEAD',
    options: [
      { syntax: '--hard', description: 'HEADを移動し, indexと作業ツリーを指定commitへ合わせる.' }
    ],
    risk: 'danger',
    warning: '追跡ファイルの未commit変更を失い, reset先のtracked pathと衝突する未追跡pathも削除され得る. dry-runはないため, 先にgit statusとgit diffを確認し, git stash push -u -m "backup before reset"またはbackup branchで退避する.',
    keywords: ['全変更破棄', 'HEAD', 'index', 'working tree', 'reset hard'],
    docsUrl: 'https://git-scm.com/docs/git-reset'
  },
  {
    id: 'git-clean-force-directories',
    number: 49,
    tool: 'git',
    category: 'git-recover',
    title: '未追跡ファイルを削除する',
    summary: 'ignore規則に一致しない未追跡ファイルと未追跡directoryを作業ツリーから削除する.',
    usage: 'ignore対象ではない一時ファイルや生成物を消し, 作業ツリーを整理する必要がある場合だけ使う.',
    command: 'git clean -fd',
    options: [
      { syntax: '-n, --dry-run', description: '削除せず, 対象になるpathだけを表示する.' },
      { syntax: '-f', description: 'clean.requireForceの既定設定下で削除を許可する.' },
      { syntax: '-d', description: '未追跡directoryも削除対象にする.' }
    ],
    risk: 'danger',
    warning: '削除した未追跡pathはGitから復旧できない. 必ず先にgit clean -ndで対象を確認し, 必要なファイルはrepository外へ退避する.',
    keywords: ['未追跡削除', 'directory削除', '生成物', 'dry-run', 'clean'],
    docsUrl: 'https://git-scm.com/docs/git-clean'
  },
  {
    id: 'git-push-force-with-lease',
    number: 50,
    tool: 'git',
    category: 'git-recover',
    title: 'lease付きで履歴を更新する',
    summary: 'remote refが想定状態のときだけ, non-fast-forwardのpushを許可する.',
    usage: '共有済み作業branchをrebaseした後など, 合意のうえでremote履歴を置き換える必要がある場合だけ使う.',
    command: 'git push --force-with-lease origin feature/rebased',
    options: [
      { syntax: '--force-with-lease[=<refname>[:<expect>]]', description: 'remote refが期待値と一致する場合だけnon-fast-forward更新を許可する.' },
      { syntax: '-n, --dry-run', description: '実際には送信せず, 更新予定のrefを確認する.' },
      { syntax: '--porcelain', description: '処理結果をscriptで扱いやすいtab区切り形式でstdoutへ出す.' }
    ],
    risk: 'danger',
    warning: '共同作業者のcommitを失う恐れがある. 先にgit fetch originとgit logでremote側を確認し, git push --dry-run --force-with-lease origin feature/rebasedで対象を検証する. 可能ならrefnameと期待commit IDも明示する.',
    keywords: ['履歴上書き', 'rebase後push', 'lease', 'non-fast-forward', 'force-with-lease'],
    docsUrl: 'https://git-scm.com/docs/git-push'
  }
] as const satisfies readonly CommandRecipe[];
