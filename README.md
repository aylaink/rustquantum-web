# RustQuantumWeb

Public site for [RustQuantum](https://www.rustquantum.com) — the validation
reports and documentation for a pure-Rust molecular quantum simulator.

Static HTML + CSS. No build step, no framework, no runtime dependencies.

See [`style_guide.md`](./style_guide.md) for all coding, design, and structural
conventions. See [`reminder.md`](./reminder.md) for everything not yet closed —
binary assets to produce and verifications to run against the deployed URL.

## Local preview

From the repo root, start any static file server:

```sh
python -m http.server 8000
# or: npx serve .
# or: caddy file-server --listen :8000
```

Open <http://localhost:8000>. All links resolve identically to production
because paths are relative throughout the site.

## Deploy

Hosted on **Cloudflare Pages** (free tier — 500 builds/month, unlimited
bandwidth). Same platform already hosts the Worker behind the contact form
(`rustquantum-contact.aylaink.workers.dev`).

Deploy flow:

1. Connect this repo to Cloudflare Pages (Pages → Create a project → Connect
   to Git). Build command: _none_. Output directory: _root_.
2. Add the custom domain `www.rustquantum.com` in the Pages project settings.
3. Add apex `rustquantum.com` and create a Cloudflare **Bulk Redirect** (or a
   Page Rule) forwarding `https://rustquantum.com/*` → `https://www.rustquantum.com/:1` (301).
4. Every push to `main` redeploys. Preview deployments are created for PRs.

Deploy-time contract (enforced by `_headers` / `_redirects` in the repo root):

- HTTPS only; HSTS preload; CSP, X-Frame-Options, Referrer-Policy set globally.
- HTML cached 5 min, CSS / JS / fonts cached 1 year (immutable), images 30 days.
- Legacy `/pages/*` URLs → new paths via 301 (see `_redirects`).

## Structure

See `style_guide.md` §7.

- Pipeline stage pages at the root.
- `reports/` — validation reports (one file per system studied).
- `legal/` — privacy / terms / cookies.
- `contact.html` at the root.
- `assets/` — CSS, fonts, favicon, Open Graph image, and minimal JS.

## Contributing

This is a personal project. There is no open contribution flow — everything
goes through the owner. Feedback via the [Contact](./contact.html) page.

---

© 2026 Ignacio Lopez Rodriguez · RustQuantum · All Rights Reserved
