*© 2026 Ignacio Lopez Rodriguez · RustQuantum (www.rustquantum.com) · Licensed under CC BY 4.0*

*Doc v0.0.1 · 2026-04-16*

Style guide for RustQuantumWeb — the static public site documenting RustQuantum's validation reports.

──────────────────────────────────────────────────────────────────

1. HTML
   1.1. SEMANTICS AND STRUCTURE
   1.2. ACCESSIBILITY
   1.3. METADATA AND SEO
   1.4. CROSS-PAGE CONSISTENCY
2. CSS
   2.1. SINGLE SOURCE OF TRUTH
   2.2. DESIGN TOKENS
   2.3. NAMING
   2.4. RESPONSIVE
   2.5. HYGIENE
3. DESIGN
   3.1. PALETTE
   3.2. TYPOGRAPHY
   3.3. COMPONENTS
4. CONTENT
   4.1. TONE
   4.2. VALIDATION TABLES
   4.3. NOTATION
5. PERFORMANCE AND QUALITY
   5.1. LIGHTHOUSE
   5.2. VALIDATION
   5.3. IMAGES
   5.4. JAVASCRIPT
6. DEPLOYMENT
   6.1. HOSTING AND DOMAIN
   6.2. CACHE AND INDEXING
7. PROJECT STRUCTURE
   7.1. DIRECTORY LAYOUT
   7.2. NAMING
   7.3. WHEN TO ADD A FOLDER

──────────────────────────────────────────────────────────────────

## 1. HTML

### 1.1. SEMANTICS AND STRUCTURE

- One `<h1>` per page. Heading hierarchy never skips levels (`h1 → h2 → h3`).
- Use landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. Sections of content inside `<main>` use `<section>` with an inner heading.
- Lists (`<ul>`, `<ol>`) for enumerations, not stacked `<div>`s.
- Links (`<a>`) for navigation, buttons (`<button>`) for actions. Never a `<div>` with `onclick`.
- Tables (`<table>`) only for tabular data — never for layout. Always include `<thead>` and `<tbody>`.

### 1.2. ACCESSIBILITY

- Every `<img>` has a meaningful `alt`. Decorative images use `alt=""`.
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text (WCAG AA).
- Visible focus state on every interactive element (`:focus-visible`). Never `outline: none` without a replacement.
- Logical tab order — no `tabindex` > 0.
- Form fields (if added) always paired with a `<label>`.
- Current page marked with `aria-current="page"` in the nav, in addition to `class="active"`.
- `lang="en"` on `<html>`. Matches the content language of the site.

### 1.3. METADATA AND SEO

Every page must include:
- `<title>` — unique, format: `<Page> — RustQuantum`.
- `<meta name="description">` — one-sentence summary, 120–160 chars.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- `<meta charset="UTF-8">`.
- Canonical URL: `<link rel="canonical" href="https://www.rustquantum.com/<path>">`.
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`) for social previews.

Site-wide:
- `sitemap.xml` lists every public page with `lastmod`.
- `robots.txt` points to the sitemap and allows crawling.
- `favicon` (SVG preferred) linked from `<head>`.

### 1.4. CROSS-PAGE CONSISTENCY

- The `<header>`, `<nav>`, and `<footer>` are **structurally identical** across pages: same element tree, same classes, same link text, same order. Only two kinds of differences are allowed:
  - Relative paths — a link from `benchmarks/vqe.html` to `contact.html` must use `../contact.html`; from a root page like `index.html` or `legal.html`, just `contact.html`.
  - The `class="active"` (+ `aria-current="page"`) marker on the link that points to the current page, if the current page is present in the nav.
- The nav order is: `Home · Pipeline · Molecule · Constants · Basis · Math · Integrals · Core Treatment · SCF`. `Pipeline` is the hub overview page that links to each of the 7 stages; the 7 stage links remain in the top nav for direct access. Sub-pages (reports, legal, contact) show the same 9 nav links with no `.active` marker.
- Any structural change (new page, renamed link, moved section) is applied to every page in the same commit.

──────────────────────────────────────────────────────────────────

## 2. CSS

### 2.1. SINGLE SOURCE OF TRUTH

- One active stylesheet: `assets/style.css`. Any future component or theme must extend this file, never a parallel stylesheet.
- All pages link it via `<link rel="stylesheet" href="assets/style.css">` (top-level) or `<link rel="stylesheet" href="../assets/style.css">` (from `pages/`).
- No inline `<style>` blocks in HTML. Per-page tweaks that cannot be expressed with existing components must be added as a new component in `assets/style.css`.

### 2.2. DESIGN TOKENS

Every color, font, and repeated dimension is a CSS custom property defined on `:root`. No hardcoded hex values or font stacks outside `:root`.

Current token contract (extend, do not rename without updating every consumer):

```
--bg, --bg-alt, --panel, --border
--text, --text-dim
--accent, --accent-soft, --link
--ok            (future: --warn, --err to mirror validation status)
--mono, --sans
```

Rules:
- Add new tokens rather than introduce one-off values.
- Spacing and radii may be added as tokens (`--space-1`, `--radius-sm`) when the same value repeats ≥ 3 times.
- Color values are sRGB hex. Alpha overlays use `rgba(...)` or `color-mix(...)` against a token.

### 2.3. NAMING

- **Low-complexity BEM**: `.block`, `.block__element`, `.block--modifier`. Example: `.card`, `.card .step`, `.pipeline .step-box.active`.
- Class names are semantic (`.report`, `.pipeline`), not visual (`.red-box`, `.big-text`).
- State modifiers: `.active`, `.done`, `.current`, `.is-open`.
- No utility-class framework (Tailwind, etc.) — this is a small static site; tokens + semantic classes are enough.

### 2.4. RESPONSIVE

- Mobile-first: base styles target small screens, `@media (min-width: …)` layers on larger ones. The current single `max-width: 640px` override must be refactored in this direction when a second breakpoint is added.
- Breakpoints: `480px` (phone landscape), `768px` (tablet), `1024px` (desktop). Add only when a real layout change is needed — not pre-emptively.
- Fluid typography for hero and `h1` via `clamp()` (e.g. `font-size: clamp(2rem, 4vw + 1rem, 3rem)`).
- Content column capped at `max-width: 1100px` (matches current `main` and `.header-inner`).
- Never rely on `px`-only for layout. Use `rem` for type and spacing, `%`/`fr`/`minmax` for grids.

### 2.5. HYGIENE

- No inline `style="…"` attributes except for genuinely per-instance values (e.g. a one-off progress bar width).
- No `!important` — if you reach for it, the selector is wrong.
- No vendor prefixes written by hand except `-webkit-backdrop-filter` and the `-webkit-background-clip` pair when used.
- Section dividers in CSS use the existing `/* ---- Section ---- */` block style.
- Properties within a rule are ordered: positioning → box model → typography → visual → transitions.
- 0 warnings from `stylelint` (to be added) and W3C CSS validator.

──────────────────────────────────────────────────────────────────

## 3. DESIGN

### 3.1. PALETTE

Dark-first, single theme (no light mode unless explicitly scoped in a future version).

| Role            | Token           | Value     |
|-----------------|-----------------|-----------|
| Background      | `--bg`          | `#0e1116` |
| Surface         | `--bg-alt`      | `#161b22` |
| Panel / card    | `--panel`       | `#1b2027` |
| Border          | `--border`      | `#2a313c` |
| Text            | `--text`        | `#e6edf3` |
| Text dim        | `--text-dim`    | `#9aa4b2` |
| Accent (Rust)   | `--accent`      | `#ff6b35` |
| Accent soft     | `--accent-soft` | `#ff8c5a` |
| Link            | `--link`        | `#79c0ff` |
| OK / success    | `--ok`          | `#3fb950` |

Accent usage:
- `--accent` marks *current / active* state (nav underline, pipeline active step, card hover border, report left-border).
- `--accent-soft` is for hover on links and secondary accent headings (`h3`).
- Never color body text in `--accent` — reserve it for structural emphasis.

### 3.2. TYPOGRAPHY

- Sans (`--sans`): `Inter` with system fallbacks — body and headings.
- Mono (`--mono`): `JetBrains Mono` / `Fira Code` — brand, nav, pipeline, code, taglines, `step` labels.
- Base line-height: `1.65`. Headings: `1.25`.
- Scale (rem): body `1.0` · `h3` `1.15` · `h2` `1.5` · `h1` `2.4` · hero `h1` `3.0`.
- Letter-spacing: `-0.02em` on `h1`, `0.05em` uppercase on `.subtitle`, `0.08em` on `.card .step`.
- Self-host the web fonts under `assets/fonts/` with `font-display: swap` — do not depend on Google Fonts at runtime.

### 3.3. COMPONENTS

The site is built from a small, stable set of components. Reuse before inventing.

- `.brand` — mono, weight 700, with `.dot` accent circle.
- `nav a` — mono, dim by default, `.active` adds bottom border in `--accent`.
- `.skip-link` — keyboard-only "Skip to content" link, first focusable element.
- `.breadcrumb` — mono path trail on sub-pages (reports/legal). `.separator` is `--accent`.
- `.hero` — large h1, mono tagline with `--accent` spans highlighting keywords.
- `.page-meta` — one-line mono metadata under h1: sources, validation targets, date. `.sep` dots in `--accent`.
- `.grid` + `.card` — landing grid of pipeline stages. `.card .step` = mono step label. `.card-standalone` for single cards outside a grid.
- `.pipeline` + `.step-box` — inline diagram on Home. `.active` = current, `.arrow` = `--accent` separator.
- `.report-list` + `.report` — list of validation reports. Left border in `--accent`, optional `.tag` and `.result`.
- `code` / `pre` — inline and block code. `--panel` background.
- `table` — validation table (see §4.2).
- `.badge-exact / -ok / -fail / -pending` — status pills (green / yellow / red / dim).
- `.stat` (inside `.stats`) — single numeric headline with mono `.number` + small `.label`.
- `.anchor` — hidden `#` link inside `h2`/`h3`, revealed on hover of the heading. Headings carry `id` and `scroll-margin-top: 5rem` (to clear the sticky header).
- `.prev-next` — sequential pipeline nav at the bottom of stage pages. `.prev` and `.next` children with `.direction` label and `.arrow`.
- `.chart` (`<figure>`) — static SVG chart. Children: `.chart-title` (mono label above), `<svg>` with internal classes `.chart-grid`, `.chart-axis-label`, `.chart-ref`, `.chart-line`, `.chart-point`, and `.chart-caption` (`<figcaption>` below). All colors driven by design tokens via CSS classes on SVG elements — no inline fill/stroke.
- Contact form: `.contact-form`, `.form-group`, `.btn-submit`, `.success-msg`.

Before adding a new component, check whether an existing one can be reused or extended with a modifier.

──────────────────────────────────────────────────────────────────

## 4. CONTENT

### 4.1. TONE

- Language: English. Technical but accessible — the reader may be a quantum-chemistry practitioner or a curious engineer.
- Prefer active voice and present tense: "RustQuantum computes …", not "RustQuantum will be computing …".
- No marketing language ("cutting-edge", "revolutionary"). State what the code does and what it is validated against.
- Every claim that a value matches a reference must link or point to the corresponding validation report.

### 4.2. VALIDATION TABLES

The canonical comparison format, mirroring the scientific project's `docs/validation_reports/`:

| Quantity | RustQuantum | Reference | Diff | Status |
|----------|-------------|-----------|------|--------|

Rules:
- Numeric cells use `<td class="mono">` for alignment.
- `RustQuantum` column includes the source year in the column header or a footnote (e.g. "CODATA 2022").
- `Diff` is absolute or relative — label which, consistently within the page.
- `Status` is a badge (`badge-exact`, `badge-ok`, `badge-fail`, `badge-pending`). Thresholds match the Rust code's tolerances; when in doubt, cite the `style_guide.md` of the main project (§1.4).

### 4.3. NOTATION

- Unicode inline for simple formulas and symbols: `α`, `Ψ`, `⟨ϕᵢ|ĥ|ϕⱼ⟩`, `ℏ`, `10⁻¹²`, `≈`, `≤`.
- KaTeX is wired on `pipeline.html` via `$ … $` (inline) and `$$ … $$` (display) delimiters. Load it ONLY on pages that use it. Don't reach for KaTeX when Unicode is enough — reserve it for multi-line derivations, integrals with explicit bounds, fractions, matrices.
- Units in roman, not italic: `1.6 mHa`, `0.529 Å`.
- Chemical formulas use `<sub>` / `<sup>` (`H<sub>2</sub>O`), never hardcoded Unicode subscripts for digits.

──────────────────────────────────────────────────────────────────

## 5. PERFORMANCE AND QUALITY

### 5.1. LIGHTHOUSE

Every page must score ≥ 95 on all four axes (Performance, Accessibility, Best Practices, SEO) on mobile, measured against the deployed production URL. Regressions block a release.

### 5.2. VALIDATION

- HTML: W3C validator — 0 errors, 0 warnings.
- CSS: W3C CSS validator — 0 errors. Warnings reviewed on each change.
- Broken-link check across the site before each deploy.

### 5.3. IMAGES

- Formats: `webp` or `avif` for photos, `svg` for icons and diagrams, `png` only when a tool forces it.
- Always set `width` and `height` attributes to reserve layout space.
- `loading="lazy"` on any image below the fold; `decoding="async"` on all.
- Target weights: hero ≤ 80 KB, card thumbnails ≤ 30 KB, icons ≤ 5 KB.

### 5.4. JAVASCRIPT

- The site is HTML + CSS only by default. No JS required for navigation or content.
- If JS is ever added, it must: be a single small vanilla module loaded as `<script type="module" src="…">` (modules are deferred by default — never add an explicit `defer` attribute, the validator flags it as invalid), degrade gracefully without JS, and not pull in a framework.
- No third-party analytics that set cookies without consent. If analytics are added, choose a cookieless provider (e.g. Plausible) and document it in `legal.html#privacy` and `legal.html#cookies`.

──────────────────────────────────────────────────────────────────

## 6. DEPLOYMENT

### 6.1. HOSTING AND DOMAIN

- Production domain: `www.rustquantum.com`.
- Bare domain (`rustquantum.com`) 301-redirects to the `www` subdomain.
- HTTPS only. HTTP redirects to HTTPS. HSTS enabled once stable.
- Hosting provider documented in `README.md` of this repo, along with the deploy command.

### 6.2. CACHE AND INDEXING

- HTML: `Cache-Control: public, max-age=300, must-revalidate` (5 min).
- CSS / JS / fonts: `Cache-Control: public, max-age=31536000, immutable` — filenames must be content-hashed when versioning is added.
- Images: `Cache-Control: public, max-age=2592000` (30 days).
- `sitemap.xml` updated in the same commit as any page addition or URL change.
- `robots.txt` allows all crawlers by default, disallows `/_*` or any draft prefix.

──────────────────────────────────────────────────────────────────

## 7. PROJECT STRUCTURE

### 7.1. DIRECTORY LAYOUT

```
RustQuantumWeb/
├── index.html               ← landing (hero + about + news)
├── pipeline.html            ← single-page pipeline overview with five phases (molecule → hardware)
├── benchmarks/              ← performance measurements (dropdown sibling of pipeline)
│   ├── hardware.html
│   └── vqe.html
├── contact.html             ← contact form
├── sources.html             ← scientific references
├── legal.html               ← unified legal page (#privacy, #cookies, #terms, #license, #credits)
├── 404.html                 ← fallback
├── assets/                  ← all shared binary / static assets
│   ├── style.css
│   ├── favicon.svg
│   ├── og-image.png         (see reminder.md)
│   ├── fonts/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Bold.woff2
│   │   ├── JetBrainsMono-Regular.woff2
│   │   └── JetBrainsMono-Bold.woff2
│   └── js/                  ← only when a page genuinely needs JS
│       └── contact.js
├── robots.txt
├── sitemap.xml
├── style_guide.md           ← this file
├── reminder.md              ← pending binary assets + deploy verifications; delete when empty
└── README.md                ← deploy command + hosting notes
```

### 7.2. NAMING

- **Subfolders are semantic**, not by type. `reports/`, `legal/`, `assets/` say
  *what* the contents are. Forbidden: generic `pages/`, `html/`, `docs/`.
- **Pipeline stages live as anchor sections inside `pipeline.html`** (e.g. `pipeline.html#basis`). The anchor IDs match the corresponding Rust module names (`#basis` ↔ `src/basis/`).
- **Report files are qualified by the system studied**: `reports/basis-h2.html`,
  `reports/scf-h2.html` — never `reports/basis-results.html`. When a second
  molecule is added, the filename disambiguates on its own (`basis-water.html`).
- **Assets are lowercase, hyphenated, versioned-by-content when generated**:
  `og-image.png`, not `OGImage.PNG` or `og_image.png`.

### 7.3. WHEN TO ADD A FOLDER

Add a new top-level subfolder only when all three hold:
1. There will be ≥ 2 pages of the same category.
2. The category is stable — legal, reports, blog, docs — not tied to a single
  feature.
3. A visitor reading the URL would learn something from the folder name.

A one-off page lives at the root. Don't pre-create `docs/` or `blog/` for a
single file — move to a folder the day the second page appears, and update
every internal link and `sitemap.xml` in the same commit.

──────────────────────────────────────────────────────────────────

*© 2026 Ignacio Lopez Rodriguez · RustQuantum (www.rustquantum.com) · Licensed under CC BY 4.0*
