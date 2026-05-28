# BoardNewsSite

推進メンバーの活動を **GitHub Pages** で公開する静的サイトです。

## 目的（社内共有用メモ）

| 層 | 内容 |
| --- | --- |
| 表 | 活動の透明性、広報・ブランディング |
| 運用 | 社内には要点 PDF を Slack / Notion で随時共有（公開サイトと役割分担） |

**注意**: パブリックリポジトリのため、機密・個人名・未公開数字などは絶対にコミットしない。

**運用ルール（詳細）**: [docs/operating-flow.md](./docs/operating-flow.md)  
（AI プロンプト・公開前チェック: [docs/](./docs/)）  
**記事公開**: チャットで `/publish-article`（`drafts/xxx.md` を引数で指定可）

---

## リポジトリ構成（A）

```
BoardNewsSite/
├── index.html              # トップ（記事一覧）
├── partials/               # 共通 header / footer（JS で読み込み）
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/site.css        # 共通スタイル
│   ├── images/             # favicon・ロゴ・カード/カバー画像（README あり）
│   └── js/
│       ├── layout.js       # partials 読み込み
│       └── site-config.js  # OG 用の公開 URL（任意）
├── posts/                  # 公開記事（HTML のみ）
│   ├── テンプレート.html   # 新規記事用（index には載せない）
│   └── YYYY-MM-DD-slug.html
├── drafts/                 # 議事録原稿（.gitignore・ローカルのみ）
├── docs/                   # 運用フロー・プロンプト・チェックリスト
├── .github/workflows/      # Pages 自動デプロイ
└── README.md               # 概要（運用の詳細は docs/）
```

| パス | 役割 | Git |
| --- | --- | --- |
| `drafts/` | 議事録・AI 入力用の下書き | コミットしない |
| `posts/` | 公開用 HTML | コミットする |
| `assets/` | CSS・layout.js | コミットする |
| `partials/` | 共通ヘッダー・フッター | コミットする |

---

## 運用フロー（概要）

1. `drafts/` へ議事録を追加（Git に含めない）
2. AI で公開用 HTML を生成（[docs/ai-prompt.md](./docs/ai-prompt.md)）
3. `posts/` へ HTML を追加
4. `index.html` の一覧を更新
5. [公開前チェック](./docs/publication-checklist.md) → `git push`

詳細は **[docs/operating-flow.md](./docs/operating-flow.md)** を参照。

---

## GitHub Pages の初回セットアップ

リポジトリを GitHub に作成（**Public**）して push したあと:

1. **Settings → Pages**
2. **Build and deployment**: Source = **GitHub Actions**
3. 初回 push 後、Actions タブで `Deploy GitHub Pages` が成功することを確認
4. 表示 URL: `https://<org-or-user>.github.io/BoardNewsSite/`

---

## 第一弾（B）— 済み

| 項目 | 内容 |
| --- | --- |
| 記事 | `posts/2026-05-14-kickoff.html`（キックオフ合意の要点） |
| トップ | `index.html` に掲載 |
| デザイン | 透明感・ガラス風・記事テンプレ |

次回は `drafts/` に実議事録を置き、同手順で 2 本目以降を追加してください。

---

## ローカルプレビュー

```bash
cd BoardNewsSite
python3 -m http.server 8080
# http://localhost:8080/
```

---

## 画像・ブランディング

- favicon / ロゴ / カード・カバー用 SVG は `assets/images/` に配置済み
- 実写写真は `assets/images/posts/【slug】/` に置き、記事から参照（[assets/images/README.md](./assets/images/README.md)）
- SNS プレビュー: `assets/js/site-config.js` の `origin` に GitHub Pages の URL を設定

## 未決・次の検討（任意）

- サイト正式名称・ロゴ（写真版への差し替え）
- カテゴリ（会議 / 訪問 / 調査）の増減
- Notion / Slack PDF との見出し対応表
