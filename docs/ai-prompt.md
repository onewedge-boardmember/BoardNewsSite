# AI プロンプト・ルール（要設計・要検討）

`drafts/` の議事録から `posts/` 用 HTML を生成するときのたたき台です。  
運用しながら [operating-flow.md](./operating-flow.md) とあわせて更新してください。

---

## 入力

- ファイル: `drafts/【議事録.md】` の全文
- 参考 HTML: `posts/テンプレート.html` または直近の記事

## 出力

- 1 ファイル: `posts/YYYY-MM-DD-slug.html`
- あわせて `index.html` 用のカード HTML（タイトル・要約・日付・タグ）を提案

---

## プロンプト（たたき台）

以下を AI に渡す。`【】` は都度置き換え。

```
あなたは Board Activity News（推進メンバー活動の公開サイト）の編集者です。
次の議事録から、GitHub Pages 公開用の HTML を1本作成してください。

## ルール（厳守）
- パブリック公開用。個人名・未公開数値・内部批判・社内政治は載せない
- トーン: 透明・前向き・簡潔。キャッチーで読みやすく
- 既存デザインに合わせる: posts/テンプレート.html の構造を使う
- 画像: article__cover（covers/）、index 用 post-card__thumb（cards/）。タグ「メンバー」は class="tag tag--members"
- header / footer は書かない（<div id="site-header"> と site-footer、data-base=".."、site-config.js + layout.js のみ）
- ファイル名案: posts/【YYYY-MM-DD-slug】.html
- index.html 用の post-card ブロックも出力する

## 参考記事
（必要なら posts/2025-05-14-kickoff.html などを貼る or @指定）

## 議事録
---
【drafts/ の内容をここに貼る】
---

## 出力形式
1. posts/ の完全な HTML
2. index.html に追加する <li> ブロック
3. 公開前に人間が確認すべき点（あれば）
```

---

## 整形ルール（AI・人間共通）

| やること | やらないこと |
| --- | --- |
| 決定事項・方針を箇条書きで要約 | 発言者の逐語録 |
| 「ハイライト」ボックスで 3〜5 点 | 販管費・売上の具体額（公開不要なら） |
| 見出しは h2 で 3〜4 セクション | Slack ID・@メンション |
| リード文 1〜2 文 | drafts のコピペそのまま |

## タグ（案）

| タグ | 用途 |
| --- | --- |
| 会議 | 定例MTG・キックオフ |
| メンバー | メンバー決定・体制 |
| 訪問 | 現場・外部訪問 |
| 調査 | ヒアリング・調査結果 |

---

## 要検討（TODO）

- [x] Cursor スラッシュコマンド `/publish-article`（`.cursor/commands/publish-article.md`）
- [ ] プロンプトを Cursor Rule / Skill に固定するか
- [ ] 議事録の必須見出し（日付・議題・決定・次回）を drafts テンプレに統一するか
- [ ] 社内 PDF 用と Web 用で AI を二段階にするか
- [ ] 自動で index まで更新するスクリプトの要否
