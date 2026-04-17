*© 2026 Ignacio Lopez Rodriguez · RustQuantum (www.rustquantum.com) · Licensed under CC BY 4.0*

*Doc v0.0.1 · 2026-04-17*

# Third-Party Licenses

RustQuantumWeb bundles and loads third-party components listed below.
Each component is governed by its own license, which applies only to
that component. The site itself — HTML, CSS, and editorial content — is
licensed under the terms in [`LICENSE`](LICENSE); this document does
**not** relicense the site — it tracks the licenses of external assets
the site serves.

## Bundled fonts

Self-hosted under `assets/fonts/` and linked from every page via
`<link rel="preload">`. Served as `woff2`; no runtime dependency on
Google Fonts.

| Font            | Weights            | License (SPDX) | Source                                             |
|:----------------|:-------------------|:---------------|:---------------------------------------------------|
| Inter           | Regular, Bold      | OFL-1.1        | <https://rsms.me/inter/>                           |
| JetBrains Mono  | Regular, Bold      | OFL-1.1        | <https://www.jetbrains.com/lp/mono/>               |

## Bundled JavaScript and CSS libraries

Self-hosted under `assets/katex/`. Loaded only on pages that render
math (`math.html`, `integrals.html`).

| Library        | Version | License (SPDX) | Source                               |
|:---------------|:--------|:---------------|:-------------------------------------|
| KaTeX          | 0.16    | MIT            | <https://katex.org/>                 |
| KaTeX fonts    | 0.16    | OFL-1.1        | bundled inside `assets/katex/fonts/` |

## External runtime services

Loaded at runtime, **not redistributed** with the site. Governed by
the provider's own terms, not by a conventional open-source license.

| Component                 | Role                                  | Terms / policy                                     |
|:--------------------------|:--------------------------------------|:---------------------------------------------------|
| Google Analytics 4 (gtag) | Cookieless-by-default visitor analytics; consent gated via the banner (`assets/js/analytics.js`) | <https://policies.google.com/technologies/partner-sites> |
| Google Tag Manager        | Loader for `gtag.js`                  | <https://marketingplatform.google.com/about/analytics/terms/us/> |
| Cloudflare Pages          | Static hosting and CDN                | <https://www.cloudflare.com/website-terms/>        |
| Cloudflare Workers        | Contact-form backend (`rustquantum-contact.aylaink.workers.dev`, invoked from `assets/js/contact.js`) | <https://www.cloudflare.com/website-terms/> |

## Data redistribution attribution

### Basis Set Exchange (CC-BY-4.0)

The numerical basis-set values shown in `basis.html` validation
tables (STO-3G, STO-6G, 6-31G, 6-31G(d), 6-311G, def2-SVP exponents
and contraction coefficients) originate from the Basis Set Exchange
and are therefore a **redistribution of CC-BY-4.0 data**. Attribution
is given via:

- The "Basis Set Exchange (BSE)" entry in [`sources.html`](sources.html),
  linking to <https://www.basissetexchange.org>.
- Primary publication citations (Pople family + def2-SVP papers) in
  the "Basis sets" collapsible of the same page.

The BSE web application itself (the Python code) is BSD-3-Clause; only
the **data values** are CC-BY-4.0.

### Public-domain data

Numerical values from CODATA 2022 (constants), IUPAC / CIAAW 2024
(atomic masses), and NIST CCCBDB (molecular geometries) are published
by government-funded bodies and are in the public domain or freely
reproducible with attribution. Attribution is given through
[`sources.html`](sources.html); no license text applies.

## License texts

Full license text for each bundled font and library lives in the
component's own distribution; the SPDX identifier above is sufficient
to locate the exact wording. A local snapshot is not kept in this
repository. If the site ever bundles additional vendored assets,
copies of their `LICENSE` files should be added under a future
`licenses/` directory.

## Scientific publications and external references

The full list of scientific sources (papers, textbooks, databases)
cited across the site is tracked in [`sources.html`](sources.html),
grouped by domain. Those are bibliographic references, not software
licenses.

---

*© 2026 Ignacio Lopez Rodriguez · RustQuantum (www.rustquantum.com) · Licensed under CC BY 4.0*
