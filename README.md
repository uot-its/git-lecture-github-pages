# GitHub Training Cyberpunk Pages

新人エンジニア向けGitHub研修を, GitHub Pagesで公開するためのTypeScript製静的ページです.
外部UIライブラリなしで, TypeScript, HTML, CSSのみで構成しています.

## ローカル確認

```bash
npm install
npm run preview
```

ブラウザで `http://localhost:4173` を開きます.

## ビルド

```bash
npm run build
```

`dist/` がGitHub Pagesへ配信する成果物です.

## GitHub Pagesへ公開

1. このフォルダの中身をGitHubリポジトリへpushします.
2. GitHubのSettingsからPagesを開きます.
3. SourceをGitHub Actionsにします.
4. mainへpushすると `.github/workflows/deploy.yml` が `dist/` を公開します.

`Get Pages site failed` / `Not Found` が出る場合は, GitHub側でPagesが未有効化, またはSourceがGitHub Actionsになっていない状態です.
`actions/configure-pages` の `enablement: true` は `GITHUB_TOKEN` では使えないため, このリポジトリではSettingsから手動で有効化します.

## 内容

- GitとGitHubの違い.
- 主要用語.
- GitHub Flow.
- 基本コマンド.
- Pull RequestとReviewの作法.
- Gemini Code AssistやCodeRabbitを使ったAIコードレビューの位置づけ.
- 事故対応.
- ハンズオン.
- チェックリスト.
- ミニクイズ.

## 研修での使い方

投影用はPowerPointを使い, このページは受講者の手元用資料として使う想定です.
コマンド例はコピー可能です.
チェックリストとクイズはブラウザ内で動作します.
