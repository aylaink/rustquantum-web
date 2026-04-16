*© 2026 Ignacio Lopez Rodriguez · RustQuantum (www.rustquantum.com) · All Rights Reserved*

*Doc v0.0.1 · 2026-04-16*

# RustQuantumWeb

Public site for [RustQuantum](https://www.rustquantum.com) — the validation
reports and documentation for a pure-Rust molecular quantum simulator.

Static HTML + CSS. No build step, no framework, no runtime dependencies.

See [`style_guide.md`](./style_guide.md) for all coding, design, and structural
conventions. See [`reminder.md`](./reminder.md) for items the style guide
anticipates that aren't violations yet.

## Local preview

From the repo root, start any static file server:

```sh
python -m http.server 8000
# or: npx serve .
# or: caddy file-server --listen :8000
```

Open <http://localhost:8000>. All links resolve identically to production
because paths are relative throughout the site.

## Production

Live at <https://www.rustquantum.com>, served by **Cloudflare Pages** from
this repo's `main` branch. Every push to `main` redeploys automatically in
~30 s; pull requests get preview URLs.

`_headers` and `_redirects` at the repo root drive Cloudflare's HTTP
behaviour (CSP, HSTS, cache, legacy 301s). Apex `rustquantum.com` 301s to
`www` via a Cloudflare Redirect Rule. Email at `@rustquantum.com` is handled
by Cloudflare Email Routing (forwarding-only).

## Structure

See `style_guide.md` §7.

- Pipeline stage pages at the root (`molecule.html` … `scf.html`).
- `pipeline.html` — overview hub linking to each stage.
- `legal/` — privacy / terms / cookies.
- `contact.html` at the root.
- `assets/` — CSS, fonts, KaTeX bundle, favicon, OG image, minimal JS.

## Contributing

This is a personal project. There is no open contribution flow — everything
goes through the owner. Feedback via the [Contact](./contact.html) page.

---

*© 2026 Ignacio Lopez Rodriguez · RustQuantum · All Rights Reserved*
