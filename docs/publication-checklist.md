# 公開前チェックリスト

`posts/` に HTML を置き、`index.html` を更新したあと、**push する前**に確認する。

## 内容

- [ ] 個人の氏名・連絡先を、公開の必要がない限り載せていない
- [ ] 未発表の売上・利益・契約・人事などの数字がない
- [ ] 他部署・他拠点・取引先への批判・比較がない
- [ ] 社内政治・「本音」など、表向きの目的と矛盾する記述がない
- [ ] 議事録の生データ（`drafts/`）が誤って `git add` されていない

## ファイル・技術

- [ ] ファイル名が `YYYY-MM-DD-slug.html` になっている
- [ ] **カバー SVG** `assets/images/covers/YYYY-MM-DD-slug.svg` があり、記事の `og:image` / `article__cover` と **index のサムネ** が同じパスを指している（`cards/*.svg` の流用なし）
- [ ] 他記事とカバーの見た目が十分に異なる（配色・図形・テキスト）
- [ ] カバー SVG が `xmllint --noout` でエラーにならない（日本語の文字化けで invalid になっていない）
- [ ] 記事ページに `<body data-base="..">` と `layout.js` がある
- [ ] `index.html` にカードが 1 件追加され、リンク先が正しい
- [ ] `meta description` と `title` を記事用に更新した
- [ ] ローカルで http://localhost:8080/ から表示・header/footer を確認した

## Git

```bash
git status
# drafts/ 配下が Staged に含まれていないこと
```
