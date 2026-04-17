// Per-table auto-fit: if a validation table is wider than its container
// (typical on mobile), scale it down with transform:scale so it fits
// without forcing the mobile browser to zoom out the whole page.
//
// Recalculated on window resize and whenever a <details> is toggled
// (tables inside a closed <details> have zero width until opened).
//
// Graceful degradation: without JS, `.table-wrap { overflow-x: auto }`
// from style.css falls back to per-table horizontal scroll.

function fitTables() {
    document.querySelectorAll('.table-wrap').forEach((wrap) => {
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
    });
}

fitTables();
window.addEventListener('resize', fitTables);
document.addEventListener('toggle', fitTables, true);
