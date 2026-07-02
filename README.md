# Quick Bytes

Concise technical references, software engineering guides, and engineering career resources.

**Site:** https://kallolchakraborty.github.io/quick-bytes/

---

## Overview

Quick Bytes is a static documentation site focused on Large Language Models (LLMs). It features interactive animated SVG diagrams that explain core concepts visually, with all animations implemented as pure SMIL (no JavaScript dependencies).

The site is built as a single-page application — content is authored in a JavaScript data file (`js/content.js`), rendered via Markdown at runtime, and navigated through a sidebar-driven UI.

---

## Features

- **10 animated SVG diagrams** covering the full LLM stack — tokenization, embeddings, self-attention, transformer architecture, FFN, normalization, training pipeline, and more
- **SMIL animations** — all diagram motion uses SVG-native animation (cross-browser, no JS)
- **Markdown-rendered content** via [marked](https://marked.js.org/)
- **Syntax highlighting** via [Prism.js](https://prismjs.com/)
- **Dark mode** with system preference detection and manual toggle
- **Full-text search** indexing guide titles and section content
- **Reading time estimation** (200 wpm)
- **Bookmarking** persisted to `localStorage`
- **Mark-as-complete** progress tracking
- **Responsive layout** with collapsible sidebar, right-hand table of contents, and glass-morphism nav
- **SEO metadata** with JSON-LD structured data, canonical URLs, and Open Graph / Twitter Card support

---

## Animated Diagrams

| Diagram | File | Covers |
|---------|------|--------|
| LLM Evolution Timeline | `assets/diagrams/llm-evolution.svg` | 5-era timeline from transformers to modern MoE models |
| Tokenization | `assets/diagrams/tokenization.svg` | BPE algorithm — character split, merge steps, token IDs |
| Token & Positional Embeddings | `assets/diagrams/embeddings.svg` | Embedding lookup, embedding matrix, positional encoding variants |
| Transformer Architecture | `assets/diagrams/transformer-architecture.svg` | Full end-to-end data flow from text to output |
| Self-Attention Mechanism | `assets/diagrams/self-attention.svg` | QKV computation, attention matrix, multi-head, variants |
| Feed-Forward Network | `assets/diagrams/ffn.svg` | Up/down projection, ReLU/GELU/SwiGLU activation function cards |
| Normalization & Residuals | `assets/diagrams/norm-residual.svg` | Residual skip path, LayerNorm, Pre-LN vs Post-LN, RMSNorm |
| Full Transformer Block | `assets/diagrams/transformer-block.svg` | Complete decoder layer: Norm → Attn → + → Norm → FFN → + |
| Training Pipeline | `assets/diagrams/training-pipeline.svg` | 3-stage pipeline: pretraining, SFT, RLHF/DPO |
| Inference Optimizations | `assets/diagrams/inference-optimizations.svg` | KV-Cache, speculative decoding, quantization, Flash Attention, continuous batching |

All diagrams use `font-family="Ubuntu, sans-serif"` with `@import` loading from Google Fonts, and are embedded via `<object>` tags so external fonts render correctly.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **CSS** | [Tailwind CSS v3](https://tailwindcss.com/) — CLI build, no PostCSS |
| **JavaScript** | Vanilla JS — no framework |
| **Markdown** | [marked](https://marked.js.org/) |
| **Syntax Highlighting** | [Prism](https://prismjs.com/) |
| **Sticky Nav** | [Headroom.js](https://wicky.nillia.ms/headroom.js/) |
| **Font** | Ubuntu (Google Fonts) |
| **Theme** | Orange brand (#E95420) — matching git-bytes design system |
| **Icons** | Material Symbols Outlined |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |

---

## Project Structure

```
.
├── index.html                  # Landing page with hero, search, stats
├── docs.html                   # Documentation viewer with sidebar
├── 404.html                    # Custom error page
├── css/
│   ├── main.css                # Tailwind input source (CSS variables, custom styles)
│   └── tailwind.css            # Compiled Tailwind output (gitignored)
├── js/
│   ├── content.js              # Content data — phases, guides, sections, all text + diagram refs
│   ├── app.js                  # Application logic — rendering, search, bookmarks, progress
│   └── theme.js                # Dark mode toggle and system preference detection
├── assets/
│   ├── logo.svg                # Animated SMIL logo
│   └── diagrams/               # 10 animated SVG diagrams (see table above)
├── tailwind.config.js          # Tailwind config — orange palette, Ubuntu fonts
├── package.json                # npm scripts (build, version)
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

The `docs.html` page renders the active phase → guide → sections. Each section's `content` is passed through `marked.parse()` and injected into the DOM. Diagrams are inserted inline as `<object>` tags within the Markdown content.

To add new content, add a new section object to the relevant guide's `sections` array.

---

## Development

```bash
# Install dependencies
npm install

# Build Tailwind CSS (compiles css/main.css → css/tailwind.css)
npm run build

# Open index.html in browser (no dev server required)
open index.html
```

**Note:** The site is pure static HTML — no build step beyond Tailwind is needed. The `marked`, `prism`, and `headroom` libraries are loaded from CDN.

---

## Adding a New Diagram

1. Create an SVG file in `assets/diagrams/` using the existing diagrams as style reference (Ubuntu font, orange brand colors, `<object>`-safe `@import` for fonts)
2. Add an `<object>` tag referencing the diagram at the appropriate location in a section's `content` string in `js/content.js`
3. Run `npm run build` if Tailwind classes were added

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:

1. Checks out the repository
2. Installs npm dependencies
3. Builds Tailwind CSS
4. Removes `node_modules/`
5. Deploys to GitHub Pages

The live site is at: https://kallolchakraborty.github.io/quick-bytes/

---

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). The SVG animations use SMIL, which is supported in all modern browsers. Internet Explorer is not supported.

---

## Author

**Kallol Chakraborty** — [LinkedIn](https://www.linkedin.com/in/kallol-chakraborty-9728a699/)
