---
name: publish-article
description: >-
  Publishes one Board Activity News article from drafts/ to posts/, creates a
  unique cover SVG, updates index.html, and runs the publication checklist. Use
  when the user invokes /publish-article, asks to publish a draft, or names a
  file under drafts/*.md.
---

# Publish Article (Board Activity News)

`drafts/*.md` から公開用 HTML を1本作成し、カバー SVG と `index.html` まで更新する。

## Input

- ユーザーが `drafts/xxx.md` を指定 → そのファイルを使う
- 未指定 → 開いているファイルまたは `drafts/` の最新 `.md` を確認。不明ならユーザーに聞く

## Must read

- `posts/テンプレート.html`
- 直近の記事（例: `posts/2026-05-28-meeting-3.html`）
- `docs/ai-prompt.md` / `docs/publication-checklist.md`
- `assets/images/covers/README.md`

## Workflow (strict order)

```
- [ ] 0. Read draft; confirm date / slug / tag (会議|メンバー|訪問|調査)
- [ ] 1. Create assets/images/covers/YYYY-MM-DD-slug.svg (BEFORE HTML)
- [ ] 2. Write posts/YYYY-MM-DD-slug.html
- [ ] 3. Prepend post-card to index.html
- [ ] 4. Run publication checklist; report results
- [ ] 5. Optional: python3 -m http.server 8080 for preview
```

## Rules

- **Public only**: no personal names, unreleased figures, internal criticism, politics
- Tone: transparent, positive, concise (Japanese)
- No header/footer markup in article HTML — use `site-header` / `site-footer` divs + `data-base=".."` + `site-config.js` + `layout.js`
- **Never** `git add drafts/`
- **Never** commit/push unless user explicitly asks

## Cover SVG (required)

Path: `assets/images/covers/YYYY-MM-DD-slug.svg` (same slug as `posts/` file)

- New file per article — do not reuse `cards/*.svg` for index thumbnails
- Layout: text left (x &lt; 420), decoration right (x &gt; 480)
- Differentiate from other covers: gradient colors + shapes + title text
- Japanese in SVG: use XML numeric refs (`&#31532;` = 第) to avoid corruption
- Validate: `xmllint --noout assets/images/covers/FILE.svg`

Index thumb uses the **same** cover path:

```html
<img src="assets/images/covers/YYYY-MM-DD-slug.svg" alt="" ...>
```

## Article HTML

Follow `posts/テンプレート.html`: `article__cover`, `highlight-box`, h2 sections, `このあと`.
Tag メンバー → `class="tag tag--members"`.

## Git (only when asked)

```bash
git status   # drafts/ must NOT be staged
git add posts/ assets/images/covers/ index.html
git commit -m "update: 【記事タイトル】を追加"
```

## Completion report (required)

1. Created/updated file paths
2. Article title + one-line summary
3. Checklist result (OK / items to review)
4. Remaining human review items
5. Next action (preview URL, commit?)

## Do not

- Add article without cover SVG
- Use `cards/*.svg` for index thumbnails
- Copy another cover with only text changed (change colors/shapes too)
- Modify `posts/テンプレート.html` for publishing
- Push without user request

## Reference

Full step detail: `.cursor/commands/publish-article.md`
