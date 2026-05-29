# 記事カバー（covers）

各公開記事に **1 枚の SVG** を置きます。`posts/` のファイル名と **同じ slug** にしてください。

## 命名規則

```
assets/images/covers/YYYY-MM-DD-slug.svg
```

記事 HTML と一致させる:

```html
<meta property="og:image" content="../assets/images/covers/YYYY-MM-DD-slug.svg">
<img src="../assets/images/covers/YYYY-MM-DD-slug.svg" ...>
```

### 例

| 記事 | カバー |
| --- | --- |
| `posts/2026-05-21-boradnews.html` | `2026-05-21-meeting.svg`（slug は boradnews でもカバー名は運用で meeting 可。推奨は **記事と同じ slug**） |
| `posts/2026-05-28-meeting-3.html` | `2026-05-28-meeting-3.svg` |

**推奨**: 記事 `posts/YYYY-MM-DD-slug.html` とカバー `YYYY-MM-DD-slug.svg` を常に同じ `slug` にする。

## 新規作成手順

1. 既存カバー（例: `2026-05-21-meeting.svg`）をコピー
2. `YYYY-MM-DD-slug.svg` にリネーム
3. タイトル行・サブタイトル行のテキストを記事に合わせて変更
4. 日本語は **XML 数値参照**（`&#31532;` など）を使うと文字化けで SVG が壊れない
5. `xmllint --noout assets/images/covers/新ファイル.svg` で XML 妥当性を確認

## 一覧（index）との関係

**トップのサムネも同じカバーを使う。** `cards/meeting.svg` など共通画像を流用すると、会議記事が同じ見た目になる。

```html
<!-- index.html の post-card__thumb -->
<img src="assets/images/covers/YYYY-MM-DD-slug.svg" alt="" ...>
```

## レイアウト（一覧サムネで切れないように）

カバーは **800×320** の横長。一覧では幅 200px 前後に `object-fit: cover` で表示するため:

- **タイトル・テキストは左寄せ**（おおよそ x &lt; 420）
- **装飾は右側**（x &gt; 480）に置くと、一覧で左が優先表示されても文字が切れにくい

## 記事ごとに見た目を変える

コピー＋テキスト差し替えだけにしない。最低限変えるもの:

| 要素 | 例 |
| --- | --- |
| グラデーション | 橙（発信）／紫（柱連携）／水色（キックオフ） |
| 装飾 | 同心円（発信）／3本の棒 A B C（柱）／三角（キックオフ）／人物円（メンバー） |

`/publish-article` 実行時は **カバー SVG の新規作成が必須** です。
