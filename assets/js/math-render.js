// Triggers KaTeX auto-render on pages that opt in by loading the KaTeX
// classic scripts (katex.min.js + auto-render.min.js). Degrades to plain
// Unicode text if KaTeX is not present — no error, no flash.
//
// Delimiters:  $ … $   → inline math
//              $$ … $$ → display math
//
// KaTeX files belong in assets/katex/; see reminder.md for download steps.

window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderMathInElement !== 'function') return;

    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true  },
            { left: '$',  right: '$',  display: false },
            { left: '\\[', right: '\\]', display: true  },
            { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false,
        strict: 'ignore'
    });
});
