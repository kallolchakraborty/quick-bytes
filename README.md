# Quick Bytes

Concise technical references, software engineering guides, and engineering career resources.

**Site:** https://kallolchakraborty.github.io/quick-bytes/

---

## Overview

Quick Bytes is a static documentation site focused on Large Language Models (LLMs). It features **17 animated SVG diagrams** that explain core concepts visually, with all animations implemented as pure SMIL (no JavaScript dependencies).

The site is a hash-routed single-page application — content is authored in a JavaScript data file (`js/content.js`), rendered via Markdown at runtime, and navigated through a sidebar-driven UI.

---

## Features

- **17 animated SVG diagrams** — tokenization, embeddings, self-attention, transformer architecture, FFN, normalization, training pipeline, encoder-only (BERT), decoder-only (GPT), encoder-decoder (T5), dense vs sparse (MoE) models, decision framework, and more
- **SMIL animations** — all diagram motion uses SVG-native animation (cross-browser, no JS)
- **Markdown-rendered content** via [marked](https://marked.js.org/) with output sanitization
- **Syntax highlighting** via [Prism.js](https://prismjs.com/)
- **Dark mode** with system preference detection and manual toggle
- **Full-text search** — pre-built index, O(1) queries (not per-keystroke scan)
- **Reading time estimation** (200 wpm, cached per guide)
- **Bookmarking** persisted to `localStorage`
- **Mark-as-complete** progress tracking
- **Browser back/forward** — popstate handler enables proper navigation
- **Focus management** — keyboard focus moves to content heading on guide switch
- **Error boundaries** — graceful fallback UI on render failures
- **Responsive layout** with collapsible sidebar, scrollspy-driven table of contents, and glass-morphism nav
- **PWA-ready** — manifest.json for installability, .nojekyll for reliable GitHub Pages deployment
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
| Types of LLMs | `assets/diagrams/types-of-llms.svg` | 5-axis categorization — architecture, context, modality, access, size |
| Encoder-Only (BERT) | `assets/diagrams/encoder-only-bert.svg` | Bidirectional self-attention, MLM training, downstream tasks |
| Decoder-Only (GPT) | `assets/diagrams/decoder-only-gpt.svg` | Causal attention mask, autoregressive generation, KV-cache |
| Encoder-Decoder (T5) | `assets/diagrams/encoder-decoder-t5.svg` | Bidirectional encoder + causal decoder with cross-attention |
| Dense Models | `assets/diagrams/dense-models.svg` | All-neurons-active FFN, full capacity per token |
| Sparse Models (MoE) | `assets/diagrams/sparse-models-moe.svg` | Router/gate, top-k expert selection, weighted sum |
| Decision Framework | `assets/diagrams/decision-framework.svg` | When to use which model — 3-column decision tree |

All diagrams use `font-family="Ubuntu, sans-serif"` with `@import` loading from Google Fonts, and are embedded via `<object>` tags so external fonts render correctly.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **CSS** | [Tailwind CSS v3](https://tailwindcss.com/) — CLI build, no PostCSS |
| **JavaScript** | Vanilla JS — no framework |
| **Markdown** | [marked](https://marked.js.org/) with HTML sanitization |
| **Syntax Highlighting** | [Prism](https://prismjs.com/) |
| **Routing** | Hash-based SPA with popstate handler |
| **State** | localStorage with decoupled read/write |
| **Font** | Ubuntu + Ubuntu Mono (Google Fonts) |
| **Icons** | Material Symbols Outlined |
| **Theme** | Orange brand (#E95420) — matching git-bytes design system |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |

---

## Project Structure

```
.
├── index.html                  # Landing page with hero, search, stats
├── docs.html                   # Documentation viewer with sidebar + outline
├── 404.html                    # Custom error page
├── manifest.json               # PWA manifest
├── .nojekyll                   # Disables GitHub Pages Jekyll processing
├── css/
│   ├── main.css                # Tailwind input source (CSS variables, custom styles)
│   └── tailwind.css            # Compiled Tailwind output (gitignored)
├── js/
│   ├── content.js              # Content data — phases, guides, sections, all text + diagram refs
│   ├── app.js                  # Application logic — rendering, search, bookmarks, progress, routing
│   └── theme.js                # Dark mode toggle and system preference detection
├── assets/
│   ├── logo.svg                # Animated SMIL logo (hamburger → checkmark with pulse ring)
│   └── diagrams/               # 17 animated SVG diagrams (see table above)
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

The `docs.html` page renders the active guide's sections. Each section's `content` is parsed through `marked.parse()` with output sanitization (strips `<script>`, `on*` handlers, `javascript:` protocol). Diagrams are inserted inline as `<object>` tags within the Markdown. Parsed output is cached per content string — switching guides is O(1) after first render.

The search index is built once on first interaction and cached — subsequent searches query the pre-built index rather than scanning content.

---

## Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Hash-based routing | GitHub Pages only serves static files — no server-side rewrite support |
| SMIL over JS animations | Cross-browser SVG animation without JavaScript dependency |
| `<object>` over `<img>` for SVGs | External fonts load correctly only in `<object>` tags |
| Pre-built search index | Avoids O(n) scan on every keystroke — builds once on first search |
| Markdown output sanitization | Strips script tags and event handlers before `innerHTML` injection |
| Scrollspy with cleanup | Named listener function prevents memory leak on repeated guide switches |
| Popstate handler | Enables browser back/forward navigation in SPA |
| Focus management | Moves keyboard focus to content heading on guide switch for a11y |

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

**Note:** The site is pure static HTML — no build step beyond Tailwind is needed. The `marked`, `prism`, and `Material Symbols` libraries are loaded from CDN.

---

## Adding a New Diagram

1. Create an SVG file in `assets/diagrams/` using the existing diagrams as style reference (Ubuntu font, orange brand colors, `<object>`-safe `@import` for fonts)
2. Add an `<object>` tag referencing the diagram at the appropriate location in a section's `content` string in `js/content.js`
3. Verify no duplicate references exist (`rg 'your-diagram-name' js/content.js`)
4. Run `npm run build` if Tailwind classes were added

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
