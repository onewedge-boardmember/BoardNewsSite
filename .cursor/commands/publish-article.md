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
- `posts/2025-05-14-kickoff.html` または直近の記事（文体・長さの参考）
- `docs/ai-prompt.md`（ルール）

**厳守ルール**

- パブリック公開用。不要な個人名・未公開数値・内部批判・社内政治は載せない
- トーン: 透明・前向き・簡潔
- header / footer は HTML に書かない  
  → `<div id="site-header"></div>` / `<div id="site-footer"></div>` / `<body data-base="..">` / `../assets/js/layout.js` のみ
- 出力先: `posts/YYYY-MM-DD-slug.html`（slug は英小文字・ハイフン）

### 2. `posts/` に HTML を書き込む

- 新規作成または上書き（ユーザー指示がある場合のみ）
- `posts/テンプレート.html` は変更しない

### 3. `index.html` を更新

`<ul class="post-list">` の **先頭** に post-card を1件追加:

- `href` が `posts/` のファイルと一致
- `datetime` / 表示日付 / `tag` / タイトル / 1行要約

既に同じ記事のカードがある場合は重複追加しない（更新のみ）。

### 4. 公開前チェック

`docs/publication-checklist.md` の項目を確認し、問題があれば修正する。  
チェック結果を短い箇条書きで報告する。

### 5. ローカルプレビュー（可能なら）

```bash
python3 -m http.server 8080
```

- トップ: http://localhost:8080/
- 記事: http://localhost:8080/posts/【ファイル名】.html  
（`file://` では partials が読めないため HTTP 必須）

### 6. Git（ユーザーが明示したときのみ）

**ユーザーが commit / push を頼むまで実行しない。**

依頼があった場合:

```bash
git status   # drafts/ が含まれていないこと
git add posts/ index.html
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
- ユーザーの確認なしに `git push` する
