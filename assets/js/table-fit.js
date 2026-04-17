// Per-table auto-fit: if a validation table is wider than its container
// (typical on mobile), scale it down with transform:scale so it fits
// without forcing the mobile browser to zoom out the whole page.
//
// Scoping: a full recompute on every <details> toggle would reset every
// table in the document and briefly change their heights, shifting
// scroll position visibly. The toggle listener instead rescales only
// the tables inside the element that was toggled.
//
// Graceful degradation: without JS, `.table-wrap { overflow-x: auto }`
// from style.css falls back to per-table horizontal scroll.

function fitTable(wrap) {
    const table = wrap.querySelector('table');
    if (!table) return;

    // Reset so we measure natural (un-scaled) widths.
    table.style.transform = '';
    wrap.style.height = '';
    wrap.classList.remove('fit-scaled');

    const containerWidth = wrap.clientWidth;
    const tableWidth = table.scrollWidth;

    if (tableWidth > containerWidth && containerWidth > 0) {
        const scale = containerWidth / tableWidth;
        table.style.transformOrigin = 'top left';
        table.style.transform = `scale(${scale})`;
        // Compensate for the visual height shrinkage so no empty gap
        // appears below the scaled table.
        wrap.style.height = `${table.offsetHeight * scale}px`;
        wrap.classList.add('fit-scaled');
    }
}

function fitAllTables() {
    document.querySelectorAll('.table-wrap').forEach(fitTable);
}

fitAllTables();
window.addEventListener('resize', fitAllTables);
document.addEventListener('toggle', (e) => {
    const details = e.target;
    if (details && details.tagName === 'DETAILS') {
        details.querySelectorAll('.table-wrap').forEach(fitTable);
    }
}, true);
