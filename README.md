# Quick Bytes

Compact, interview-ready technical references — built to clear FAANG interviews.

**Site:** https://kallolchakraborty.github.io/quick-bytes/

---

## Overview

Quick Bytes is a static documentation site. It is a hash-routed single-page application: content is authored in a JavaScript data file (`js/content.js`), rendered via Markdown at runtime, and navigated through a sidebar-driven UI.

**Current content:** a single SAP RAP guide — *Determinations & Validations in RAP* — with ABAP code examples, execution-order cheatsheet, and detailed interview Q&A.

---

## Features

- **Markdown-rendered content** via [marked](https://marked.js.org/) with output sanitization
- **ABAP syntax highlighting** via [Prism.js](https://prismjs.com/) (light + dark themes)
- **Dark/light theme** — manual toggle, defaults to light
- **Full-text search** — pre-built index, cached
- **Reading time estimation** (200 wpm, cached per guide)
- **Bookmarking** persisted to `localStorage`
- **Mark-as-complete** progress tracking
- **Browser back/forward** — popstate handler
- **Responsive layout** with collapsible sidebar, scrollspy table of contents, glass-morphism nav
- **PWA-ready** — `manifest.json`, `.nojekyll` for reliable GitHub Pages deployment

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **CSS** | [Tailwind CSS v3](https://tailwindcss.com/) — CLI build, no PostCSS |
| **JavaScript** | Vanilla JS — no framework |
| **Markdown** | [marked](https://marked.js.org/) with HTML sanitization |
| **Syntax Highlighting** | [Prism](https://prismjs.com/) |
| **Routing** | Hash-based SPA with popstate handler |
| **State** | localStorage |
| **Font** | Ubuntu + Ubuntu Mono (Google Fonts) |
| **Theme** | Orange brand (#E95420) |
| **Hosting** | GitHub Pages |

---

## Project Structure

```
.
├── index.html                  # Landing page
├── docs.html                   # Documentation viewer with sidebar + outline
├── 404.html                    # Custom error page
├── manifest.json               # PWA manifest
├── .nojekyll                   # Disables GitHub Pages Jekyll processing
├── css/
│   ├── main.css                # Tailwind input source (CSS variables, custom styles)
│   └── tailwind.css            # Compiled Tailwind output (gitignored, built in CI)
├── js/
│   ├── content.js              # Content data — phases, guides, sections (all text + code)
│   ├── app.js                  # Application logic — rendering, search, bookmarks, progress
│   └── theme.js                # Theme toggle (defaults to light)
├── assets/
│   ├── logo.svg                # Animated SMIL logo (hamburger → checkmark)
│   └── favicon.svg
├── tailwind.config.js          # Tailwind config — orange palette, Ubuntu fonts
├── package.json                # npm scripts (build)
├── .github/workflows/deploy.yml # GitHub Actions deployment
├── robots.txt                  # SEO crawl directives
├── sitemap.xml                 # SEO sitemap
└── README.md
```

---

## Content Architecture

Content is defined in `js/content.js` under the `QUICK_BYTES` global object:

```
QUICK_BYTES
├── site          — metadata (name, tagline, URL, author)
├── stats         — guide/phase counts
└── phases        — array of phases
    └── guides    — array of guides
        └── sections — array of sections (id, title, content as Markdown)
```

The `docs.html` page renders the active guide's sections. Each section's `content` is parsed through `marked.parse()` with output sanitization (strips `<script>`, `on*` handlers, `javascript:` protocol). Parsed output is cached per content string.

---

## Adding Content

1. Add a phase (or reuse `sap-rap`) and a guide with sections to `js/content.js`.
2. Section `content` is Markdown. Use fenced code blocks for ABAP:

   ```abap
   METHOD my_determination.
     " code
   ENDMETHOD.
   ```

   Inside the JS template literal, escape code-fence backticks as `\`\`\``.
3. Update `stats.guides` / `stats.phases` to match.
4. Verify: `node --check js/content.js`.

---

## Development

```bash
# Install dependencies
npm install

# Build Tailwind CSS (compiles css/main.css → css/tailwind.css)
npm run build

# Serve locally
python3 -m http.server 8000
```

**Note:** The site is pure static HTML — no build step beyond Tailwind. `marked`, `prism`, and `Material Symbols` are loaded from CDN.

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Checks out the repository
2. Installs npm dependencies
3. Builds Tailwind CSS
4. Deploys to GitHub Pages

**Requirement:** GitHub Pages must be enabled on the repo with source **"GitHub Actions"** (Settings → Pages).

---

## Author

**Kallol Chakraborty** — [LinkedIn](https://www.linkedin.com/in/kallol-chakraborty-9728a699/)
