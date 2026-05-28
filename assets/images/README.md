# 画像アセット

サイト全体で使うイラスト・favicon・記事用ビジュアルを置きます。

## ディレクトリ

| パス | 用途 |
| --- | --- |
| `favicon.svg` / `logo.svg` / `apple-touch-icon.svg` | ブラウザタブ・ヘッダー・ホーム画面（重なった書類＝活動報告の記号。文字の B ではない） |
| `og-default.svg` | SNS シェア用（デフォルト） |
| `hero-open.svg` | トップのヒーロー |
| `cards/` | 一覧カードのサムネイル |
| `covers/` | 記事ヘッダー（カバー） |
| `icons/` | タグ横の小アイコン |
| `posts/【slug】/` | 記事本文用の写真（任意・公開可のみ） |

## 写真を足すとき

1. `assets/images/posts/2026-05-21-boradnews/` など slug ごとにフォルダを作成
2. WebP または JPEG を置く（幅 1200px 程度にリサイズ推奨）
3. 記事 HTML で `<figure class="article-figure">` を使う（テンプレート参照）

**注意**: パブリック公開のため、個人が特定できる写真・機密は載せない。

## GitHub Pages の OG 画像

`assets/js/site-config.js` の `origin` に公開 URL を設定すると、SNS プレビューが安定します。

```js
window.SITE_CONFIG = {
  origin: "https://your-org.github.io/BoardNewsSite",
  // ...
};
```
