# 運用フロー

Board Activity News の記事を 1 本公開するときの手順です。

## Cursor スラッシュコマンド

チャットで **`/publish-article`** を実行すると、本ドキュメントに沿って AI が手順を進めます。

- 定義: `.cursor/commands/publish-article.md`
- 例: `/publish-article drafts/2025-05-21-meeting_2.md`（議事録パスを引数で渡せる）

## 全体の流れ（合意版）

```
drafts/ に議事録
    ↓
AI で公開用 HTML を生成（プロンプト・ルールは docs/ai-prompt.md）
    ↓
posts/ に HTML を置く
    ↓
index.html の一覧を更新
    ↓
公開前チェック → git commit → push（GitHub Pages 反映）
```

| # | 作業 | 場所 | Git |
| --- | --- | --- | --- |
| 1 | 議事録を追加 | `drafts/` | **コミットしない** |
| 2 | AI で整形し、外部公開用 HTML を作る | （ローカル作業） | — |
| 3 | 作成した HTML を追加 | `posts/YYYY-MM-DD-slug.html` | コミットする |
| 4 | トップの一覧を更新 | `index.html` | コミットする |
| 5 | 公開前チェック・push | — | コミットする |

**結論**: 上記 4 ステップ＋チェック・push で問題ありません。実務では **5（チェック）と 6（反映）** を明示しておくと安全です（下記「補足」参照）。

---

## ステップ詳細

### 1. `drafts/` へ議事録を追加

- ファイル名の例: `2025-05-21-meeting_2.md`
- テンプレ: `drafts/README.md`
- **議事録の全文・社内限定の数字や発言はここだけ**に置く
- `drafts/*` は `.gitignore` 済み（パブリックリポジトリに載らない）

### 2. AI で `drafts/` の原稿から公開用 HTML を生成

- 入力: `drafts/[日付や議題].md`（「today.md」でも可。命名はチームで統一推奨）
- 出力: `posts/` 用の HTML 1 ファイル
- **ルール・プロンプト**: [ai-prompt.md](./ai-prompt.md)（設計・改善はここで管理）
- 参照デザイン:
  - 骨組み: `posts/テンプレート.html`
  - 記事例: `posts/2025-05-14-kickoff.html` など
- **header / footer は各 HTML に書かない**  
  → `partials/header.html`・`partials/footer.html` を `layout.js` が読み込む（`<body data-base="..">` 必須）

### 3. `posts/` へ HTML を追加

- ファイル名: `YYYY-MM-DD-slug.html`（例: `2025-05-21-boardnews.html`）
- `posts/テンプレート.html` は index に載せない（コピー元のみ）

### 4. `index.html` を修正

`<ul class="post-list">` の**先頭**にカードを 1 件追加（新しい記事が上）。

```html
<li>
  <a class="post-card" href="posts/YYYY-MM-DD-slug.html">
    <div class="post-card__meta">
      <span class="tag">会議</span>
      <time datetime="YYYY-MM-DD">YYYY年M月D日</time>
    </div>
    <h2>【一覧用タイトル】</h2>
    <p>【一覧用の1行要約】</p>
    <span class="post-card__arrow" aria-hidden="true">読む →</span>
  </a>
</li>
```

### 5. 公開前チェック（必須）

[publication-checklist.md](./publication-checklist.md) をすべて確認。

### 6. コミット・push

```bash
git status   # drafts/ が含まれていないこと
git add posts/ index.html
git commit -m "update: 【記事タイトル】を追加"
git push origin main
```

`main` への push で GitHub Actions が Pages にデプロイします。

---

## 補足（運用上のおすすめ）

| 項目 | 内容 |
| --- | --- |
| 社内共有 | 詳細は従来どおり Slack / Notion の要点 PDF（公開サイトは要約のみ） |
| ローカル確認 | `python3 -m http.server 8080` で http://localhost:8080/（`file://` では partials が読めない） |
| 共通パーツの変更 | ロゴ・フッターは `partials/` のみ編集 |
| プロンプト改善 | 都度 [ai-prompt.md](./ai-prompt.md) を更新し、チームで共有 |

---

## ディレクトリと Git の対応

```
drafts/     … 議事録（ローカルのみ・非公開）
posts/      … 公開 HTML
index.html  … 記事一覧
partials/   … 共通 header/footer
docs/       … 本運用ルール・プロンプト（コミット可・社内手順の共有用）
```

## 未決・要検討

- [ ] AI プロンプトの確定版（[ai-prompt.md](./ai-prompt.md)）
- [ ] `drafts/` のファイル命名規則（`YYYY-MM-DD-meeting_N.md` など）
- [ ] タグ一覧（会議 / メンバー / 訪問 / 調査 …）の固定
- [ ] コミットメッセージの prefix 統一（`update:` / `fix:` など）
