# Quick Bytes

Compact, interview-ready technical references — built to clear FAANG interviews.

**Site:** https://kallolchakraborty.github.io/quick-bytes/

---

## Overview

Quick Bytes is a static documentation site. Content lives in **OKF Markdown files** under `okf/` — it is *not* hardcoded in the HTML. At build time a small script generates `okf/index.json` (a structure manifest listing phases → guides → sections and their file paths). At runtime the loader fetches the manifest, then fetches each section `.md` file dynamically, parses the body, and renders it.

**Data flow:**

```
okf/ai-llms/llms/<guide>/<section>.md   (source of truth)
        │  npm run build → scripts/build-manifest.js
        ▼
okf/index.json                           (structure only — no content bodies)
        │  js/okf-loader.js (runtime)
        ▼
QUICK_BYTES global → js/app.js renders sidebar, search, diagrams
```

---

## Features

- **OKF-driven content** — every guide/section is fetched from `okf/**/*.md` at runtime; no document content is hardcoded
- **Markdown rendering** via [marked](https://marked.js.org/) with output sanitization
- **Interactive diagrams** — `## Pipeline Diagram` / `## Tree Data` + JSON blocks in `.md` files render as animated pipeline/tree visualizations
- **Syntax highlighting** via [Prism.js](https://prismjs.com/)
- **Dark/light theme** toggle
- **Full-text search** — pre-built index from loaded content
- **Reading time**, **bookmarks**, **mark-as-complete** progress (localStorage)
- **Browser back/forward** — hash-based routing
- **Responsive layout** — collapsible sidebar, scrollspy TOC

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **CSS** | [Tailwind CSS v3](https://tailwindcss.com/) — CLI build, no PostCSS |
| **JavaScript** | Vanilla JS — no framework |
| **Markdown** | [marked](https://marked.js.org/) (CDN) with sanitization |
| **Syntax Highlighting** | [Prism](https://prismjs.com/) (CDN) |
| **Content** | OKF Markdown (`okf/*.md`) + generated manifest (`okf/index.json`) |
| **Hosting** | GitHub Pages |

---

## Project Structure

```
.
├── index.html                  # Landing page (hero, topic chips, search)
├── docs.html                   # Docs viewer (sidebar, outline, content)
├── 404.html
├── manifest.json               # PWA manifest
├── .nojekyll                   # Disables GitHub Pages Jekyll processing
├── okf/                        # OKF content — the source of truth
│   ├── index.json              # Generated structure manifest (do not edit)
│   └── ai-llms/llms/<guide>/   # Phase + guide index.md + section .md files
├── js/
│   ├── okf-loader.js           # Fetches manifest + section .md files, builds QUICK_BYTES
│   ├── app.js                  # Rendering, search, bookmarks, progress, diagrams
│   └── theme.js                # Theme (defaults to light)
├── scripts/
│   └── build-manifest.js       # Generates okf/index.json from okf/**/*.md
├── css/
│   ├── main.css                # Tailwind input source
│   └── tailwind.css            # Compiled output (gitignored, built in CI)
├── assets/logo.svg
├── tailwind.config.js
├── package.json
└── .github/workflows/deploy.yml
```

---

## Content Format (OKF)

Content is a hierarchy of three document types, each a Markdown file with YAML frontmatter:

**Phase** — `okf/ai-llms/llms/index.md`
```yaml
---
type: Phase
title: AI & LLMs
phase: llms
level: Interview
icon: school
order: 1
---
```

**Guide** — `okf/ai-llms/llms/<guide>/index.md`
```yaml
---
type: Guide
title: Caching
description: What caching is and why it matters.
guide: caching
phase: llms
icon: memory
order: 7
---
```

**Section** — `okf/ai-llms/llms/<guide>/<section>.md`
```yaml
---
type: Section
title: KV Cache Overview
section: kv-cache-overview
guide: caching
phase: llms
icon: layers
order: 2
---
```

The body is Markdown. Two special headings map JSON to interactive diagrams:

```markdown
## Pipeline Diagram

```json
{ "stages": [ { "label": "Input", "note": "...", "icon": "text_fields" } ] }
```
```

```markdown
## Tree Data

```json
{ "label": "AI Model", "children": [ { "label": "..." } ] }
```
```

`order` controls display order inside each container (fallback: filename order). Boilerplate (`# title`, `**Icon:**`) is stripped by the loader at runtime.

---

## Adding Content

1. Add a section file `okf/ai-llms/llms/<guide>/<new-section>.md` with the frontmatter above (new guide needs an `index.md` too).
2. Set `order` to place it correctly.
3. Run `npm run manifest` (or `npm run build`) to regenerate `okf/index.json` and commit both.
4. Verify: `node --check js/okf-loader.js js/app.js` and load the site locally.

Run `node scripts/build-manifest.js` anytime to refresh the manifest — it walks `okf/**` and never touches content bodies.

---

## Development

```bash
# Install dependencies
npm install

# Generate manifest + compile Tailwind CSS
npm run build

# Serve locally
python3 -m http.server 8000
```

**Note:** `css/tailwind.css` and `okf/index.json` are build outputs — run `npm run build` before serving.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: `npm ci` → `npm run build` (manifest + Tailwind) → deploy to GitHub Pages. GitHub Pages must use the **"GitHub Actions"** source.

---

## Author

**Kallol Chakraborty** — [LinkedIn](https://www.linkedin.com/in/kallol-chakraborty-9728a699/)