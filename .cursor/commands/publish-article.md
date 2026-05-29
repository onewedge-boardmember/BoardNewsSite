---
description: Board Activity News の記事を1本公開する（drafts → posts → index → チェック）。議事録パスを引数で渡せる。
---

# 記事を1本公開する（Board Activity News）

Board Activity News の定例フローに従い、**1本の記事を公開可能な状態**まで進める。  
詳細: `docs/operating-flow.md` / `docs/ai-prompt.md` / `docs/publication-checklist.md`

## 引数

- ユーザーが `drafts/xxx.md` を指定していれば、そのファイルを入力とする
- 未指定なら、開いているファイルまたは `drafts/` 内の最新 `.md` を確認し、足りなければユーザーにパスを聞く

## 前提

- リポジトリルート: `BoardNewsSite/`
- `drafts/*` は **絶対に git add しない**（`.gitignore` 済み）
- 応答は **日本語**

---

## 手順（この順で実行）

### 0. 入力の確認

1. 対象の議事録（`drafts/*.md`）を読む
2. 記事の日付・slug・タグ（会議 / メンバー / 訪問 / 調査）を議事録から推定し、ユーザーに1行で確認する（明らかならスキップ可）

### 1. 公開用 HTML を生成

必ず読むファイル:

- `posts/テンプレート.html`（骨組み）
- `posts/2026-05-14-kickoff.html` または直近の記事（文体・長さの参考）
- `docs/ai-prompt.md`（ルール）

**厳守ルール**

- パブリック公開用。不要な個人名・未公開数値・内部批判・社内政治は載せない
- トーン: 透明・前向き・簡潔
- header / footer は HTML に書かない  
  → `<div id="site-header"></div>` / `<div id="site-footer"></div>` / `<body data-base="..">` / `site-config.js` + `layout.js`
- 画像:
  - **カバー（必須・記事ごとに1枚）**: `assets/images/covers/YYYY-MM-DD-slug.svg`
  - 記事本文・**index 一覧のサムネ**の両方で**同じカバー**を使う（`cards/*.svg` の流用はしない＝同じ見た目になるため）
- 出力先: `posts/YYYY-MM-DD-slug.html`（slug は英小文字・ハイフン）

### 2. カバー SVG を作成（必須・HTML より先にやる）

記事ごとに `assets/images/covers/YYYY-MM-DD-slug.svg` が**無いとカバー画像が壊れる**ため、必ず新規作成する。

1. パスを決める: `assets/images/covers/【YYYY-MM-DD-slug】.svg`（`posts/【YYYY-MM-DD-slug】.html` と同じ slug）
2. **新規作成**（既存のコピーだけで済ませない）。**テキストは左・装飾は右**（一覧サムネで左優先表示のため切れ防止）。他記事と被らないよう、次も変える:
   - グラデーションの色（例: 橙系＝発信、紫系＝柱連携、青緑＝キックオフ）
   - 装飾図形（円／棒／波／三角など記事テーマに合わせる）
   - タイトル・サブタイトルの `<text>`
3. **日本語は XML 数値参照**（`&#31532;` = 第 など）— 生 UTF-8 は文字化けで invalid になる
4. 検証: `xmllint --noout assets/images/covers/【ファイル】.svg`
5. 記事 HTML の `og:image` / `article__cover` と **index の `post-card__thumb`** が同じ `covers/【YYYY-MM-DD-slug】.svg` を指すこと

詳細: `assets/images/covers/README.md`

### 3. `posts/` に HTML を書き込む

- 新規作成または上書き（ユーザー指示がある場合のみ）
- `posts/テンプレート.html` は変更しない

### 4. `index.html` を更新

`<ul class="post-list">` の **先頭** に post-card を1件追加:

- `href` が `posts/` のファイルと一致
- `post-card__thumb` の `img src` は **`assets/images/covers/YYYY-MM-DD-slug.svg`**（記事カバーと同じ。`cards/meeting.svg` など共通画像は使わない）
- `datetime` / 表示日付 / `tag` / タイトル / 1行要約

既に同じ記事のカードがある場合は重複追加しない（更新のみ）。

### 5. 公開前チェック

`docs/publication-checklist.md` の項目を確認し、問題があれば修正する。  
チェック結果を短い箇条書きで報告する。

### 6. ローカルプレビュー（可能なら）

```bash
python3 -m http.server 8080
```

- トップ: http://localhost:8080/
- 記事: http://localhost:8080/posts/【ファイル名】.html  
（`file://` では partials が読めないため HTTP 必須）

### 7. Git（ユーザーが明示したときのみ）

**ユーザーが commit / push を頼むまで実行しない。**

依頼があった場合:

```bash
git status   # drafts/ が含まれていないこと
git add posts/ assets/images/covers/ index.html
git commit -m "update: 【記事タイトル】を追加"
```

`git push` はユーザーが明示したときのみ。

---

## 完了報告（必ず含める）

1. 作成・更新したファイルパス
2. 記事タイトルと一覧用要約
3. チェックリストの結果（OK / 要確認）
4. 人間が確認すべき残り（あれば）
5. 次のアクション（プレビュー URL、commit するか）

---

## やってはいけないこと

- `drafts/` 配下をコミットに含める
- `posts/テンプレート.html` を index に載せる
- 各記事 HTML に header/footer のマークアップを直書きする
- **カバー SVG なしで記事だけ追加する**（`covers/YYYY-MM-DD-slug.svg` は必須）
- **一覧に `cards/*.svg` を使う**（記事ごとの `covers/` と被って同じサムネになる）
- **他記事のカバーをコピーしただけ**でテキストだけ変える（配色・図形も変えて差別化する）
- ユーザーの確認なしに `git push` する
