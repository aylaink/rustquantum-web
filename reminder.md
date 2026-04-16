*Reminder · 2026-04-16*

# Future-conditional work

The site is fully deployed on Cloudflare Pages at <https://www.rustquantum.com>
with all binary assets in place (fonts, OG image, favicons, KaTeX bundle) and
the W3C validators clean on HTML and CSS. This file now tracks only items the
style guide anticipates that aren't violations yet — revisit each one when the
triggering condition is met.

──────────────────────────────────────────────────────────────────

- **Mobile-first refactor (§2.4)** — when a second breakpoint is added, flip
  the single `max-width: 640px` override to mobile-first.

- **Spacing tokens (§2.2)** — when any spacing value repeats ≥ 3 times, extract
  it to a CSS custom property (`--space-1`, `--radius-sm`, etc.).

- **stylelint (§2.5)** — add a config and wire it into the deploy pipeline once
  we introduce one.

- **Syntax highlighting** — no `<pre><code>` blocks exist yet across the
  pages, so Prism.js / highlight.js would highlight nothing. Wire it up only
  when a page actually ships code blocks (Rust snippets, terminal commands,
  etc.).

- **Performance 100 on mobile** — currently at 94. Render-blocking `style.css`
  is the only lever; unblocking it requires either inlining CSS into every HTML
  (bad DX, breaks cross-page caching) or introducing a build step that does it
  at deploy time (`node build.js` as Cloudflare Pages build command). Defer
  unless certifications demand it.

- **Critical SEO image** — Google Search ignores `og:image`; for first-class
  Google rich results consider adding schema.org JSON-LD with an image
  property, or a real `<img>` with proper `alt` near the `<h1>` of `index`.

──────────────────────────────────────────────────────────────────

Delete this file entirely once every item above has been addressed or
explicitly closed as out of scope.
