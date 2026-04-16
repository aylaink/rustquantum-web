*Reminder · 2026-04-16*

# Pending work

Everything that cannot be closed from the source tree alone — binary assets to
produce, and verifications that only make sense against the deployed URL. The
code contract in `style_guide.md` is already satisfied; this file tracks what's
left to make the site complete in production.

Delete sections as they get resolved. Delete the file entirely once it is empty.

──────────────────────────────────────────────────────────────────

## 1. Binary assets

### 1.1. Open Graph image (high priority)

**File:** `assets/og-image.png`
**Size:** 1200 × 630 px, PNG or JPG, < 300 KB.
**Content:** "RustQuantum" wordmark on the dark background (`#0e1116`) with the
Rust-orange dot (`#ff6b35`). Simple text-on-dark card; avoid photos or
gradients that compress poorly.

**Status:** meta tags already wired on all 14 pages (`og:image`,
`og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card`). Until the
file exists, social crawlers will serve a broken-image preview — ship the file
before making the site public.

### 1.2. Apple touch icon (medium priority)

**File:** `assets/apple-touch-icon.png`
**Size:** 180 × 180 px, PNG, opaque background (`#0e1116`).
**Content:** rasterised version of `assets/favicon.svg` — dark square with the
orange dot centred.

**Wire-up (add to every `<head>`, adjust depth for sub-pages):**

```html
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
```

### 1.3. Favicon .ico fallback (low priority)

**File:** `favicon.ico` at the site root.
**Size:** multi-resolution (16, 32, 48 px).

**Wire-up:** none — browsers probe `/favicon.ico` automatically. The SVG
already set in every `<head>` takes precedence in modern browsers.

### 1.4. KaTeX bundle (medium priority)

**Files in `assets/katex/`:**

| File                                        | Source                                                       |
|---------------------------------------------|--------------------------------------------------------------|
| `katex.min.css`                             | <https://github.com/KaTeX/KaTeX/releases>                    |
| `katex.min.js`                              | same release zip, `dist/katex.min.js`                        |
| `contrib/auto-render.min.js`                | same release zip, `dist/contrib/auto-render.min.js`          |
| `fonts/` (whole directory)                  | same release zip, `dist/fonts/`                              |

**Status:** `<link>` and `<script>` tags are already wired on `math.html` and
`integrals.html`. Until the files exist, the pages load normally (no JS error)
and formulas in `$ … $` delimiters render as plain text. Drop the files in,
rerender.

**Why KaTeX instead of MathJax:** smaller (~250 KB), synchronous render (no
layout shift), self-contained fonts. License: MIT (KaTeX) + OFL (fonts).

### 1.5. Web fonts (medium priority)

**Files (all 4) in `assets/fonts/`:**

| File                           | Source                                          | License |
|--------------------------------|-------------------------------------------------|---------|
| `Inter-Regular.woff2`          | <https://github.com/rsms/inter/releases>        | OFL     |
| `Inter-Bold.woff2`             | <https://github.com/rsms/inter/releases>        | OFL     |
| `JetBrainsMono-Regular.woff2`  | <https://github.com/JetBrains/JetBrainsMono/releases> | OFL |
| `JetBrainsMono-Bold.woff2`     | <https://github.com/JetBrains/JetBrainsMono/releases> | OFL |

**Status:** `@font-face` declarations already in `assets/style.css`. Until the
files exist, the stack falls back to the system fonts in `--sans` / `--mono`.
No broken behaviour, just the wrong typography.

### Generation notes

- OG image: any design tool (Figma, Inkscape). Export PNG at 1200 × 630.
- Apple touch icon: export `favicon.svg` to PNG at 180 × 180 with a solid
  `#0e1116` background.
- `.ico`: convert `favicon.svg` with `convert` (ImageMagick) or an online
  generator — multi-res output preferred.
- Fonts: download the latest release `.woff2` files from the repos above and
  drop them into `assets/fonts/` with the exact filenames listed.

──────────────────────────────────────────────────────────────────

## 2. Deploy-side verifications

Run these against the production URL once the site is live. None can be
validated from the local tree.

### 2.1. Lighthouse (§5.1)

**Target:** ≥ 95 on all four axes (Performance, Accessibility, Best Practices,
SEO), measured on mobile. Run against every distinct page template at
minimum: `index.html`, one pipeline stage, one report, one legal, `contact.html`.

Regressions block a release. Record the scores in the commit message of any
change that affects them.

### 2.2. W3C validation (§5.2)

- HTML: <https://validator.w3.org/> — 0 errors, 0 warnings across all 14 pages.
- CSS: <https://jigsaw.w3.org/css-validator/> — 0 errors on `assets/style.css`.
- Broken-link check across the site (any crawler) — 0 broken links.

### 2.3. Cache and headers (§6.2)

At the hosting layer, configure:

- HTML: `Cache-Control: public, max-age=300, must-revalidate`.
- CSS / JS / fonts: `Cache-Control: public, max-age=31536000, immutable` —
  requires content-hashed filenames when versioning is introduced.
- Images: `Cache-Control: public, max-age=2592000`.
- HTTPS only; HTTP → HTTPS redirect.
- HSTS header enabled once the site is stable.
- `rustquantum.com` → 301 → `www.rustquantum.com`.

### 2.4. Hosting — Cloudflare Pages (§6.1)

**Decided.** Deploy instructions in `README.md`. Still to complete on Cloudflare
dashboard side:

- Connect the git repo to Cloudflare Pages.
- Add custom domain `www.rustquantum.com` (and apex `rustquantum.com`).
- Create the apex → www Bulk Redirect or Page Rule.
- Verify `_headers` and `_redirects` are picked up by the build (they should be
  automatic — Cloudflare reads them from the repo root).

──────────────────────────────────────────────────────────────────

## 3. Future (not blocking)

Items the style guide anticipates but that aren't violations yet. Revisit when
the triggering condition is met:

- **Mobile-first refactor (§2.4)** — when a second breakpoint is added, flip
  the single `max-width: 640px` override to mobile-first.
- **Spacing tokens (§2.2)** — when any spacing value repeats ≥ 3 times, extract
  it to a CSS custom property (`--space-1`, `--radius-sm`, etc.).
- **stylelint (§2.5)** — add a config and wire it into the deploy pipeline once
  we have one.
- **Syntax highlighting** — no `<pre><code>` blocks exist yet across the 14 pages,
  so Prism.js / highlight.js would highlight nothing. Wire it up only when a
  page actually ships code blocks (Rust snippets, terminal commands, etc.).
