# Implementation Policy

## Project State

- このリポジトリは `README.md` に基づき、GitHub Pages公開用の静的なTypeScript/CSS/HTMLページとして扱う。
- 公開済みか本番投入前かは明示されていない。確認できるまでは公開済み相当として扱い、作業要件がない限りセクションID、ページ本文、URL、ビルド/公開手順を変更しない。

## Implementation Constraints

- 既存依存で明らかに不足しない限り、TypeScript、HTML、CSSのみで実装する。
- ページの挙動とスタイルの正本は `src/main.ts` と `src/styles.css` とする。
- `dist/` はGitHub Pages配信用の成果物であるため、ソース変更後は `npm run build` で再生成する。
- コード変更時は `npm run typecheck` と `npm run build` を実行する。
- UI変更では、キーボード操作、レスポンシブ表示、可読コンテンツへの常時重なり防止を維持する。
